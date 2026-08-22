import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  buildLeadWebhookPayload,
  leadTypeFromPath,
  normalizeLeadPhone,
  normalizeLeadPhoneForCountry,
  validateLeadRequest,
} from "@/lib/leads";

describe("leadTypeFromPath", () => {
  const cases = [
    ["/approval", "technical"],
    ["/approval/isi-certificate", "technical"],
    ["/corporate", "corporate"],
    ["/corporate/private-limited-company", "corporate"],
    ["/ad/campaign", "technical"],
    ["/contact-us", "global"],
    ["/corporate-services", "global"],
  ] as const;

  for (const [pathname, expected] of cases) {
    it(`maps ${pathname} to ${expected}`, () => {
      assert.equal(leadTypeFromPath(pathname), expected);
    });
  }
});

describe("lead request validation", () => {
  const validRequest = {
    name: "  Priya Sharma  ",
    email: "PRIYA@EXAMPLE.COM",
    phone: "98765 43210",
    message: "  I need help with company registration.  ",
    consent: true,
    pageTitle: "Private Limited Company Registration",
    pathname: "/corporate/private-limited-company-registration-consultant",
    pageParameters: {
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "registration",
      ignored: "not-forwarded",
    },
  };

  it("normalizes values and builds the exact compatibility payload", () => {
    const result = validateLeadRequest(validRequest);
    assert.equal(result.success, true);
    if (!result.success) assert.fail("Expected a valid lead request.");

    assert.deepEqual(buildLeadWebhookPayload(result.data), {
      name: "Priya Sharma",
      email: "priya@example.com",
      phone: "+919876543210",
      message: "I need help with company registration.",
      page_name:
        "Private Limited Company Registration - /corporate/private-limited-company-registration-consultant",
      page_parameters: {
        utm_source: "google",
        utm_medium: "cpc",
        utm_campaign: "registration",
      },
    });
  });

  it("allows an empty optional message while still requiring consent", () => {
    const optionalMessage = validateLeadRequest({ ...validRequest, message: "" });
    assert.equal(optionalMessage.success, true);
    if (!optionalMessage.success) assert.fail("Expected an empty optional message to be valid.");
    assert.equal(buildLeadWebhookPayload(optionalMessage.data).message, "");

    const { message: _message, ...requestWithoutMessage } = validRequest;
    const omittedMessage = validateLeadRequest(requestWithoutMessage);
    assert.equal(omittedMessage.success, true);
    if (!omittedMessage.success) assert.fail("Expected an omitted optional message to be valid.");
    assert.equal(buildLeadWebhookPayload(omittedMessage.data).message, "");

    const missingConsent = validateLeadRequest({ ...validRequest, message: "", consent: false });
    assert.equal(missingConsent.success, false);
    if (missingConsent.success) assert.fail("Expected missing consent to fail validation.");
    assert.equal(missingConsent.errors.message, undefined);
    assert.ok(missingConsent.errors.consent);
  });

  it("validates a non-empty optional message", () => {
    for (const message of ["Help", "x".repeat(1001), "Valid\u0007message", 42]) {
      const result = validateLeadRequest({ ...validRequest, message });
      assert.equal(result.success, false);
      if (result.success) assert.fail("Expected an invalid optional message to fail validation.");
      assert.ok(result.errors.message);
    }
  });

  it("normalizes cached Indian country and trunk-prefix formats to E.164", () => {
    const cases = [
      ["9876543210", "+919876543210"],
      ["09876543210", "+919876543210"],
      ["919876543210", "+919876543210"],
      ["00919876543210", "+919876543210"],
      ["+91 98765-43210", "+919876543210"],
    ] as const;

    for (const [input, expected] of cases) {
      assert.equal(normalizeLeadPhone(input), expected);
    }

    const result = validateLeadRequest({ ...validRequest, phone: "+91 98765-43210" });
    assert.equal(result.success, true);
    if (!result.success) assert.fail("Expected a prefixed Indian number to be valid.");
    assert.equal(result.data.phone, "+919876543210");
  });

  it("normalizes possible international numbers and preserves significant zeros", () => {
    const cases = [
      ["+1 213 373 4253", "+12133734253"],
      ["+44 20 7946 0018", "+442079460018"],
      ["+39 02 3661 8300", "+390236618300"],
    ] as const;

    for (const [input, expected] of cases) {
      assert.equal(normalizeLeadPhone(input), expected);
    }

    assert.equal(normalizeLeadPhoneForCountry("2133734253", "US"), "+12133734253");
    assert.equal(normalizeLeadPhoneForCountry("4165550123", "CA"), "+14165550123");
    assert.equal(normalizeLeadPhoneForCountry("02079460018", "GB"), "+442079460018");
    assert.equal(normalizeLeadPhoneForCountry("0236618300", "IT"), "+390236618300");
    assert.equal(normalizeLeadPhoneForCountry("1234567890", "ZZ"), "");

    const italianLead = validateLeadRequest({
      ...validRequest,
      phone: "+39 02 3661 8300",
    });
    assert.equal(italianLead.success, true);
    if (!italianLead.success) assert.fail("Expected an Italian lead to be valid.");
    assert.equal(buildLeadWebhookPayload(italianLead.data).phone, "+390236618300");
  });

  it("rejects invalid selected-country phone input", () => {
    for (const phone of [null, "", "12", "1".repeat(16), "213 373 4253", "213ABC4253"]) {
      assert.equal(normalizeLeadPhoneForCountry(phone, "US"), "");
    }
  });

  it("rejects malformed, ambiguous, and non-string phone values", () => {
    const invalidPhoneValues: unknown[] = [
      "",
      "+",
      "+0123456789",
      "+999123456789",
      "+1213373425300000",
      "12133734253",
      "abc9876543210",
      "+1 213 373 4253 x9",
      "tel:+12133734253",
      "++12133734253",
      "+1\u00002133734253",
      "＋１２１３３７３４２５３",
      null,
      12133734253,
      [],
      {},
    ];

    for (const phone of invalidPhoneValues) {
      assert.equal(normalizeLeadPhone(phone), "");
      const result = validateLeadRequest({ ...validRequest, phone });
      assert.equal(result.success, false);
      if (result.success) assert.fail("Expected an invalid phone number to fail validation.");
      assert.ok(result.errors.phone);
    }
  });

  it("omits campaign parameters when supported UTM values are blank", () => {
    const result = validateLeadRequest({ ...validRequest, pageParameters: {} });
    assert.equal(result.success, true);
    if (!result.success) assert.fail("Expected a valid lead request.");

    assert.equal("page_parameters" in buildLeadWebhookPayload(result.data), false);
  });
});
