import type { MetadataRoute } from "next";

import { publicSiteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = publicSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin", "/private", "/internal", "/preview", "/thank-you"],
    },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}
