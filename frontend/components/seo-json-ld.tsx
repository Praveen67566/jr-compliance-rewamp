import { serializeJsonLd } from "@/lib/seo";
import type { JsonLdSchema } from "@/lib/types";

type SeoJsonLdProps = {
  schemaMarkup?: JsonLdSchema;
};

/** Safely renders optional CMS-managed structured data for search engines. */
export function SeoJsonLd({ schemaMarkup }: SeoJsonLdProps) {
  if (!schemaMarkup) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schemaMarkup) }}
    />
  );
}
