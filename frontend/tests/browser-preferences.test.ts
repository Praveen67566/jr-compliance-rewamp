import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { accessibilityProfileIds, categoryAllowed, CONSENT_POLICY_VERSION, defaultAccessibility, parseAccessibility, parseConsent, rejectedChoices, resolveAccessibility } from "@/lib/browser-preferences";

describe("versioned browser preferences", () => {
  it("rejects corrupt, missing, old-version and non-boolean consent", () => {
    for (const record of [null, {}, "yes", { ...rejectedChoices, version: 0, updatedAt: new Date().toISOString() }, { ...rejectedChoices, analytics: "true", version: CONSENT_POLICY_VERSION, updatedAt: "invalid" }]) {
      assert.equal(parseConsent(record), null);
    }
  });
  it("blocks every category before consent and lets GPC override marketing", () => {
    for (const category of ["preferences", "analytics", "marketing"] as const) assert.equal(categoryAllowed(category, null, false), false);
    const record = parseConsent({ preferences: true, analytics: true, marketing: true, version: CONSENT_POLICY_VERSION, updatedAt: new Date().toISOString(), region: "unknown", revision: "2" });
    assert.ok(record);
    assert.equal(categoryAllowed("analytics", record, true), true);
    assert.equal(categoryAllowed("marketing", record, true), false);
    assert.equal(categoryAllowed("marketing", record, false), true);
  });
  it("bounds text enlargement and treats malformed stored values as defaults", () => {
    assert.equal(parseAccessibility({ textScale: 500 }).textScale, 200);
    assert.equal(parseAccessibility({ textScale: -1 }).textScale, 100);
    assert.equal(parseAccessibility({ textScale: NaN }).textScale, 100);
    assert.deepEqual(parseAccessibility({ highContrast: "false", reduceMotion: 1 }), defaultAccessibility);
  });
  it("preserves existing saved settings and rejects malformed profile/font values", () => {
    assert.deepEqual(parseAccessibility({ textScale: 175, highContrast: true, reduceMotion: true }), { ...defaultAccessibility, textScale: 175, highContrast: true, reduceMotion: true });
    assert.deepEqual(parseAccessibility({ profiles: ["blind", "unknown", "blind", 1, "lowVision"], dyslexiaFont: "true" }).profiles, ["blind", "lowVision"]);
    assert.deepEqual(parseAccessibility({ profiles: "seizureSafe" }), defaultAccessibility);
  });
  it("combines every profile without losing individual choices and restores them when profiles turn off", () => {
    const preferences = parseAccessibility({ textScale: 125, highContrast: false, reduceMotion: false, dyslexiaFont: true, profiles: accessibilityProfileIds });
    const combined = resolveAccessibility(preferences);
    assert.equal(combined.textScale, 150);
    assert.equal(combined.highContrast, true);
    assert.equal(combined.reduceMotion, true);
    assert.equal(combined.dyslexiaFont, true);
    for (const id of accessibilityProfileIds) assert.equal(combined[id], true);
    assert.deepEqual(resolveAccessibility({ ...preferences, profiles: [] }), { textScale: 125, highContrast: false, reduceMotion: false, dyslexiaFont: true, seizureSafe: false, blind: false, adhdFriendly: false, cognitive: false, motorImpaired: false, lowVision: false });
    assert.equal(preferences.textScale, 125);
    assert.equal(resolveAccessibility({ ...preferences, textScale: 200 }).textScale, 200);
  });
  it("keeps system preferences effective through reset", () => {
    const resolved = resolveAccessibility(defaultAccessibility, { highContrast: true, reduceMotion: true });
    assert.equal(resolved.highContrast, true);
    assert.equal(resolved.reduceMotion, true);
    assert.equal(resolved.textScale, 100);
  });
});
