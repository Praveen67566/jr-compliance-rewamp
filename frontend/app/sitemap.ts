import type { MetadataRoute } from "next";

import { companyRegistrationSlugs } from "@/data/company-registration-pages-fallback";
import { getMcaServiceSlugs } from "@/lib/content";
import { publicSiteUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = publicSiteUrl();
  const mcaServiceSlugs = await getMcaServiceSlugs();

  return [
    {
      url: new URL("/", siteUrl).toString(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: new URL("/about-us", siteUrl).toString(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: new URL("/careers", siteUrl).toString(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: new URL("/contact-us", siteUrl).toString(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...[...new Set([...companyRegistrationSlugs, ...mcaServiceSlugs])].map((slug) => ({
      url: new URL(`/corporate/${slug}`, siteUrl).toString(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
