import { createHash, timingSafeEqual } from "node:crypto";
import type { ConsentPolicy, PrivacyRegion } from "./types";

const eeaUk = new Set("AT BE BG HR CY CZ DK EE FI FR DE GR HU IS IE IT LV LI LT LU MT NL NO PL PT RO SK SI ES SE GB".split(" "));

/** Only a protected proxy can attest location. No IP, query, locale or browser guess. */
export function resolveConsentPolicy(headers: Headers, env: Record<string, string | undefined>): ConsentPolicy {
  const configuredSecret = env.PRIVACY_GEO_SHARED_SECRET;
  const suppliedSecret = headers.get("x-jr-geo-token") ?? "";
  const trusted = Boolean(configuredSecret && configuredSecret.length >= 32 && timingSafeEqual(
    createHash("sha256").update(configuredSecret).digest(), createHash("sha256").update(suppliedSecret).digest(),
  ));
  const country = trusted ? headers.get(env.PRIVACY_GEO_COUNTRY_HEADER || "x-jr-country")?.trim().toUpperCase() : undefined;
  let region: PrivacyRegion = "unknown";
  if (country && /^[A-Z]{2}$/.test(country) && !["XX", "ZZ", "EU"].includes(country)) {
    region = eeaUk.has(country) ? "eea-uk" : country === "IN" ? "india" : country === "US" ? "us" : "other";
  }
  const configuredAge = env.PRIVACY_CONSENT_MAX_AGE_DAYS?.trim();
  const maxAgeDays = configuredAge ? Number(configuredAge) : null;
  if (maxAgeDays !== null && (!Number.isSafeInteger(maxAgeDays) || maxAgeDays <= 0)) throw new Error("Invalid consent renewal interval");
  const revision = env.PRIVACY_CONSENT_REVISION?.trim() || "2";
  if (!/^[a-zA-Z0-9._-]{1,64}$/.test(revision)) throw new Error("Invalid consent revision");
  return { region, revision, maxAgeDays, gpc: headers.get("sec-gpc") === "1" };
}
