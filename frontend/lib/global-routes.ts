import { cache } from "react";

import {
  getGlobalCertificatePage,
  getGlobalCertificatePaths,
  getGlobalCountryPage,
  getGlobalCountrySlugs,
} from "@/lib/content";
import { uniquePublicLinks, type PublicGlobalLink } from "@/lib/public-paths";
import { isPublicCountrySlug } from "@/lib/service-route-config";
import type { GlobalCertificatePageContent, GlobalCountryPageContent } from "@/lib/types";

/** Countries and certificates share /global/slug; ambiguous slugs have no public owner. */
export const getPublicGlobalLinks = cache(async function getPublicGlobalLinks(): Promise<PublicGlobalLink[]> {
  const [countries, certificates] = await Promise.all([
    getGlobalCountrySlugs(),
    getGlobalCertificatePaths(),
  ]);
  return uniquePublicLinks<PublicGlobalLink>([
    ...countries.map((slug) => ({ kind: "country" as const, country: slug, slug, canonicalPath: `/global/${slug}` })),
    ...certificates.map(({ country, slug }) => ({ kind: "certificate" as const, country, slug, canonicalPath: `/global/${slug}` })),
  ]);
});

export type PublicGlobalPage =
  | { kind: "country"; canonicalPath: string; content: GlobalCountryPageContent }
  | { kind: "certificate"; canonicalPath: string; content: GlobalCertificatePageContent };

export const getPublicGlobalPage = cache(async function getPublicGlobalPage(slug: string): Promise<PublicGlobalPage | null> {
  if (!isPublicCountrySlug(slug)) return null;
  const entry = (await getPublicGlobalLinks()).find((candidate) => candidate.slug === slug);
  if (!entry) return null;
  if (entry.kind === "country") {
    const content = await getGlobalCountryPage(entry.country);
    return content ? { kind: "country", content, canonicalPath: entry.canonicalPath } : null;
  }
  const content = await getGlobalCertificatePage(entry.country, entry.slug);
  return content ? { kind: "certificate", content, canonicalPath: entry.canonicalPath } : null;
});

export const getLegacyGlobalPage = cache(async function getLegacyGlobalPage(country: string, slug?: string): Promise<PublicGlobalPage | null> {
  const resolved = await getPublicGlobalPage(slug ?? country);
  if (!resolved) return null;
  return slug
    ? resolved.kind === "certificate" && resolved.content.countrySlug === country ? resolved : null
    : resolved.kind === "country" && resolved.content.slug === country ? resolved : null;
});
