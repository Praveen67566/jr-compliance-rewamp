import type { MetadataRoute } from "next";

import { legalPageSlugs } from "@/data/legal-pages-fallback";
import { getGlobalCertificatePaths, getGlobalCountrySlugs } from "@/lib/content";
import { getServiceRouteEntries } from "@/lib/service-routes";
import { publicSiteUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = publicSiteUrl();
  const [corporateEntries, approvalEntries, globalCountrySlugs, globalCertificatePaths] =
    await Promise.all([
      getServiceRouteEntries("corporate"),
      getServiceRouteEntries("approval"),
      getGlobalCountrySlugs(),
      getGlobalCertificatePaths(),
    ]);
  const servicePaths = [
    ...new Set(
      [...corporateEntries, ...approvalEntries].map((entry) => entry.canonicalPath),
    ),
  ];

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
    ...legalPageSlugs.map((slug) => ({
      url: new URL(`/${slug}`, siteUrl).toString(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    ...servicePaths.map((pathname) => ({
      url: new URL(pathname, siteUrl).toString(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...globalCountrySlugs.map((country) => ({
      url: new URL(`/globals/${country}`, siteUrl).toString(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...globalCertificatePaths.map(({ country, slug }) => ({
      url: new URL(`/globals/${country}/${slug}`, siteUrl).toString(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
