import type { Metadata } from "next";

import { configuredSiteUrl } from "@/lib/site-url";
import type { Seo } from "@/lib/types";

/** Converts the shared Strapi SEO component into Next's page metadata shape. */
export function pageMetadata(seo: Seo, pathname: string): Metadata {
  const image = seo.shareImage ? [seo.shareImage] : undefined;
  const metadataBase = configuredSiteUrl();
  const canonicalUrl = seo.canonicalUrl ?? pathname;
  const canonical =
    canonicalUrl && metadataBase ? new URL(canonicalUrl, metadataBase).toString() : seo.canonicalUrl;

  return {
    title: seo.title,
    description: seo.description,
    ...(metadataBase ? { metadataBase } : {}),
    ...(canonical ? { alternates: { canonical } } : {}),
    ...(seo.noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website",
      ...(image ? { images: image } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: seo.title,
      description: seo.description,
      ...(image ? { images: image } : {}),
    },
  };
}
