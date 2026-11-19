export const ACCESSIBILITY_STORAGE_KEY = "jr-accessibility-v1";
export const CONSENT_STORAGE_KEY = "jr-consent";
export const CONSENT_POLICY_VERSION = 1;

export type AccessibilityPreferences = {
  textScale: number;
  highContrast: boolean;
  reduceMotion: boolean;
};
export const defaultAccessibility: AccessibilityPreferences = {
  textScale: 100, highContrast: false, reduceMotion: false,
};
export type OptionalCategory = "preferences" | "analytics" | "marketing";
export type ConsentChoices = Record<OptionalCategory, boolean>;
export type ConsentRecord = ConsentChoices & { version: number; updatedAt: string };
export const rejectedChoices: ConsentChoices = { preferences: false, analytics: false, marketing: false };

export function readLocal(key: string): unknown {
  try { return JSON.parse(window.localStorage.getItem(key) ?? "null"); } catch { return null; }
}

export function writeLocal(key: string, value: unknown): boolean {
  try { window.localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; }
}

export function parseAccessibility(value: unknown): AccessibilityPreferences {
  if (!value || typeof value !== "object") return { ...defaultAccessibility };
  const record = value as Partial<AccessibilityPreferences>;
  return {
    textScale: typeof record.textScale === "number" && Number.isFinite(record.textScale)
      ? Math.max(100, Math.min(200, record.textScale)) : 100,
    highContrast: record.highContrast === true,
    reduceMotion: record.reduceMotion === true,
  };
}

export function parseConsent(value: unknown): ConsentRecord | null {
  if (!value || typeof value !== "object") return null;
  const record = value as ConsentRecord;
  if (record.version !== CONSENT_POLICY_VERSION || typeof record.updatedAt !== "string" || !Number.isFinite(Date.parse(record.updatedAt))
    || ![record.preferences, record.analytics, record.marketing].every((choice) => typeof choice === "boolean")) return null;
  return record;
}

export function categoryAllowed(category: OptionalCategory, record: ConsentRecord | null, gpc: boolean): boolean {
  return Boolean(record?.[category]) && !(gpc && category === "marketing");
}
