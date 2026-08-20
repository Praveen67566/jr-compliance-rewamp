import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  buildLeadWebhookPayload,
  leadTypeFromPath,
  normalizeLeadPhone,
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
      phone: "9876543210",
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

  it("normalizes pasted Indian country and trunk prefixes", () => {
    assert.equal(normalizeLeadPhone("+91 98765 43210"), "9876543210");
    assert.equal(normalizeLeadPhone("09876543210"), "9876543210");

    const result = validateLeadRequest({ ...validRequest, phone: "+91 98765-43210" });
    assert.equal(result.success, true);
    if (!result.success) assert.fail("Expected a prefixed Indian number to be valid.");
    assert.equal(result.data.phone, "9876543210");
  });

  it("omits campaign parameters when supported UTM values are blank", () => {
    const result = validateLeadRequest({ ...validRequest, pageParameters: {} });
    assert.equal(result.success, true);
    if (!result.success) assert.fail("Expected a valid lead request.");

    assert.equal("page_parameters" in buildLeadWebhookPayload(result.data), false);
  });
});
