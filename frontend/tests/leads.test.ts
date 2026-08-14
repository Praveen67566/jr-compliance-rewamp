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

  it("requires a non-empty message and consent", () => {
    const result = validateLeadRequest({ ...validRequest, message: "", consent: false });
    assert.equal(result.success, false);
    if (result.success) assert.fail("Expected validation to fail.");

    assert.ok(result.errors.message);
    assert.ok(result.errors.consent);
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
