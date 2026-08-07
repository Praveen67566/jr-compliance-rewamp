import type { MetadataRoute } from "next";

import { publicSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = publicSiteUrl();

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
  ];
}
