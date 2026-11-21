import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { CONSENT_POLICY_VERSION, defaultConsentPolicy, parseConsent, rejectedChoices } from "@/lib/browser-preferences";
import { resolveConsentPolicy } from "@/lib/privacy-policy";
import { trackingEvent } from "@/lib/privacy-tracking";
import { GET } from "@/app/api/privacy/context/route";

const now = Date.parse("2026-11-21T12:00:00.000Z");
const record = { ...rejectedChoices, analytics: true, marketing: true, version: CONSENT_POLICY_VERSION, updatedAt: new Date(now).toISOString(), region: "unknown", revision: "2" };
const secret = "test-proxy-secret-with-at-least-32-characters";

describe("consent renewal and trusted regional context", () => {
  it("does not invent an expiry interval", () => {
    assert.equal(resolveConsentPolicy(new Headers(), {}).maxAgeDays, null);
    assert.ok(parseConsent({ ...record, updatedAt: "2000-01-01T00:00:00.000Z" }, defaultConsentPolicy, now));
  });
  it("expires exactly at the configured boundary and never restores future, legacy or changed-policy grants", () => {
    const policy = { ...defaultConsentPolicy, maxAgeDays: 30 };
    const saved = { ...record, updatedAt: new Date(now - 30 * 86_400_000).toISOString() };
    assert.ok(parseConsent(saved, policy, now - 1));
    assert.equal(parseConsent(saved, policy, now), null);
    assert.equal(parseConsent(saved, policy, now + 1), null);
    assert.equal(parseConsent(record, policy, now - 1), null);
    assert.equal(parseConsent({ ...record, version: 1 }, policy, now), null);
    assert.equal(parseConsent(record, { ...policy, revision: "3" }, now), null);
    assert.equal(parseConsent(record, { ...policy, region: "india" }, now), null);
    assert.equal(parseConsent({ ...record, updatedAt: "invalid" }, policy, now), null);
  });
  it("ignores spoofable location claims without a configured proxy secret and matching attestation", () => {
    const headers = new Headers({ "x-jr-country": "IN", "cf-ipcountry": "US", "x-vercel-ip-country": "GB", "x-jr-geo-token": secret });
    assert.equal(resolveConsentPolicy(headers, {}).region, "unknown");
    assert.equal(resolveConsentPolicy(headers, { PRIVACY_GEO_SHARED_SECRET: "wrong" }).region, "unknown");
    headers.set("x-jr-geo-token", "forged-token-with-at-least-32-characters");
    assert.equal(resolveConsentPolicy(headers, { PRIVACY_GEO_SHARED_SECRET: secret }).region, "unknown");
  });
  it("maps authenticated coarse regions, configurable header names and HTTP GPC", () => {
    for (const [country, region] of [["IN", "india"], ["DE", "eea-uk"], ["NO", "eea-uk"], ["GB", "eea-uk"], ["US", "us"], ["AU", "other"], ["XX", "unknown"], ["T1", "unknown"], ["", "unknown"]]) {
      const policy = resolveConsentPolicy(new Headers({ "x-jr-geo-token": secret, "x-trusted-country": country, "sec-gpc": "1" }), {
        PRIVACY_GEO_SHARED_SECRET: secret, PRIVACY_GEO_COUNTRY_HEADER: "x-trusted-country", PRIVACY_CONSENT_MAX_AGE_DAYS: "30", PRIVACY_CONSENT_REVISION: "review-3",
      });
      assert.equal(policy.region, region); assert.equal(policy.gpc, true);
      assert.equal(policy.maxAgeDays, 30); assert.equal(policy.revision, "review-3");
    }
  });
  it("rejects invalid configured renewal rules", () => {
    for (const value of ["0", "-1", "1.5", "NaN", "Infinity", "999999999999999999999"]) {
      assert.throws(() => resolveConsentPolicy(new Headers(), { PRIVACY_CONSENT_MAX_AGE_DAYS: value }));
    }
    assert.throws(() => resolveConsentPolicy(new Headers(), { PRIVACY_CONSENT_REVISION: "<script>" }));
  });
  it("forwards only approved event fields and drops query strings and arbitrary payloads", () => {
    assert.deepEqual(trackingEvent({ event: "cta_click", page_path: "/ads/bis-certification", cta_type: "call", cta_location: "hero", email: "private@example.com", query: "utm_id=123" }), {
      event: "cta_click", page_path: "/ads/bis-certification", cta_type: "call", cta_location: "hero",
    });
    for (const value of [null, { event: "unknown", page_path: "/" }, { event: "page_view", page_path: "/?email=private@example.com" }, { event: "page_view", page_path: "https://example.com" }]) assert.equal(trackingEvent(value), null);
  });
  it("serves authenticated regional rules without caching or exposing location/secrets, and rejects broken setup", async () => {
    const keys = ["PRIVACY_GEO_SHARED_SECRET", "PRIVACY_GEO_COUNTRY_HEADER", "PRIVACY_CONSENT_MAX_AGE_DAYS", "PRIVACY_CONSENT_REVISION"] as const;
    const previous = keys.map((key) => process.env[key]);
    try {
      Object.assign(process.env, { PRIVACY_GEO_SHARED_SECRET: secret, PRIVACY_GEO_COUNTRY_HEADER: "x-test-country", PRIVACY_CONSENT_MAX_AGE_DAYS: "30", PRIVACY_CONSENT_REVISION: "test-3" });
      const response = GET(new Request("https://example.com/api/privacy/context", { headers: { "x-jr-geo-token": secret, "x-test-country": "IN", "sec-gpc": "1" } }));
      assert.equal(response.status, 200);
      assert.match(response.headers.get("cache-control")!, /private, no-store/);
      assert.equal(response.headers.get("set-cookie"), null);
      assert.deepEqual(await response.json(), { region: "india", maxAgeDays: 30, revision: "test-3", gpc: true });
      process.env.PRIVACY_CONSENT_MAX_AGE_DAYS = "invalid";
      const invalid = GET(new Request("https://example.com/api/privacy/context"));
      assert.equal(invalid.status, 503);
      assert.deepEqual(await invalid.json(), { error: "Privacy configuration unavailable" });
    } finally {
      keys.forEach((key, index) => { if (previous[index] === undefined) delete process.env[key]; else process.env[key] = previous[index]; });
    }
  });
});
