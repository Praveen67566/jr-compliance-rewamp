import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { categoryAllowed, CONSENT_POLICY_VERSION, parseAccessibility, parseConsent, rejectedChoices } from "@/lib/browser-preferences";

describe("versioned browser preferences", () => {
  it("rejects corrupt, missing, old-version and non-boolean consent", () => {
    for (const record of [null, {}, "yes", { ...rejectedChoices, version: 0, updatedAt: new Date().toISOString() }, { ...rejectedChoices, analytics: "true", version: CONSENT_POLICY_VERSION, updatedAt: "invalid" }]) {
      assert.equal(parseConsent(record), null);
    }
  });
  it("blocks every category before consent and lets GPC override marketing", () => {
    for (const category of ["preferences", "analytics", "marketing"] as const) assert.equal(categoryAllowed(category, null, false), false);
    const record = parseConsent({ preferences: true, analytics: true, marketing: true, version: CONSENT_POLICY_VERSION, updatedAt: new Date().toISOString() });
    assert.ok(record);
    assert.equal(categoryAllowed("analytics", record, true), true);
    assert.equal(categoryAllowed("marketing", record, true), false);
    assert.equal(categoryAllowed("marketing", record, false), true);
  });
  it("bounds text enlargement and treats malformed stored values as defaults", () => {
    assert.equal(parseAccessibility({ textScale: 500 }).textScale, 200);
    assert.equal(parseAccessibility({ textScale: -1 }).textScale, 100);
    assert.equal(parseAccessibility({ textScale: NaN }).textScale, 100);
    assert.deepEqual(parseAccessibility({ highContrast: "false", reduceMotion: 1 }), { textScale: 100, highContrast: false, reduceMotion: false });
  });
});
