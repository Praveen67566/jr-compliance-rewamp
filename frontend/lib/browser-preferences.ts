import type { AccessibilityPreferences, AccessibilityProfile, ConsentPolicy, ConsentRecord, ConsentChoices, OptionalCategory } from "./types";
export type { AccessibilityPreferences, AccessibilityProfile, ConsentRecord, ConsentChoices, OptionalCategory } from "./types";

export const ACCESSIBILITY_STORAGE_KEY = "jr-accessibility-v1";
export const CONSENT_STORAGE_KEY = "jr-consent";
export const CONSENT_POLICY_VERSION = 2;
export const defaultConsentPolicy: ConsentPolicy = { region: "unknown", revision: "2", maxAgeDays: null, gpc: false };

export const accessibilityProfileIds: AccessibilityProfile[] = ["seizureSafe", "blind", "adhdFriendly", "cognitive", "motorImpaired", "lowVision"];
export const defaultAccessibility: AccessibilityPreferences = {
  textScale: 100, highContrast: false, reduceMotion: false, dyslexiaFont: false, profiles: [],
};
export const rejectedChoices: ConsentChoices = { preferences: false, analytics: false, marketing: false };

export function readLocal(key: string): unknown {
  try { return JSON.parse(window.localStorage.getItem(key) ?? "null"); } catch { return null; }
}

export function writeLocal(key: string, value: unknown): boolean {
  try { window.localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; }
}

export function parseAccessibility(value: unknown): AccessibilityPreferences {
  if (!value || typeof value !== "object") return { ...defaultAccessibility, profiles: [] };
  const record = value as Partial<AccessibilityPreferences>;
  return {
    textScale: typeof record.textScale === "number" && Number.isFinite(record.textScale)
      ? Math.max(100, Math.min(200, record.textScale)) : 100,
    highContrast: record.highContrast === true,
    reduceMotion: record.reduceMotion === true,
    dyslexiaFont: record.dyslexiaFont === true,
    profiles: Array.isArray(record.profiles)
      ? accessibilityProfileIds.filter((profile) => record.profiles!.includes(profile)) : [],
  };
}

/** Profiles add requirements without overwriting the visitor's individual choices. */
export function resolveAccessibility(preferences: AccessibilityPreferences, system = { reduceMotion: false, highContrast: false }) {
  const active = (profile: AccessibilityProfile) => preferences.profiles.includes(profile);
  return {
    textScale: Math.max(preferences.textScale, active("lowVision") ? 150 : 100),
    highContrast: preferences.highContrast || system.highContrast || active("lowVision"),
    reduceMotion: preferences.reduceMotion || system.reduceMotion || active("seizureSafe") || active("blind") || active("adhdFriendly"),
    seizureSafe: active("seizureSafe"),
    blind: active("blind"),
    adhdFriendly: active("adhdFriendly"),
    cognitive: active("cognitive"),
    motorImpaired: active("motorImpaired"),
    lowVision: active("lowVision"),
    dyslexiaFont: preferences.dyslexiaFont,
  };
}

export function parseConsent(value: unknown, policy: ConsentPolicy = defaultConsentPolicy, now = Date.now()): ConsentRecord | null {
  if (!value || typeof value !== "object") return null;
  const record = value as ConsentRecord;
  const savedAt = typeof record.updatedAt === "string" ? Date.parse(record.updatedAt) : NaN;
  if (record.version !== CONSENT_POLICY_VERSION || !Number.isFinite(savedAt) || savedAt > now
    || record.region !== policy.region || record.revision !== policy.revision
    || (policy.maxAgeDays !== null && now - savedAt >= policy.maxAgeDays * 86_400_000)
    || ![record.preferences, record.analytics, record.marketing].every((choice) => typeof choice === "boolean")) return null;
  return record;
}

export function categoryAllowed(category: OptionalCategory, record: ConsentRecord | null, gpc: boolean): boolean {
  return Boolean(record?.[category]) && !(gpc && category === "marketing");
}
