import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { SeoJsonLd } from "@/components/seo-json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import { normalizeSchemaMarkup, normalizeSeoKeywords } from "@/lib/seo";

const repositoryRoot = fileURLToPath(new URL("../..", import.meta.url));

describe("CMS robots metadata", () => {
  it("exposes an index,follow default in the shared Strapi SEO component", () => {
    const schema = JSON.parse(
      readFileSync(resolve(repositoryRoot, "cms/src/components/shared/seo.json"), "utf8"),
    ) as { attributes: Record<string, unknown> };

    assert.deepEqual(schema.attributes.robots, {
      type: "string",
      default: "index,follow",
    });
    assert.deepEqual(schema.attributes.keywords, { type: "text" });
    assert.deepEqual(schema.attributes.schemaMarkup, { type: "json" });
  });

  it("emits the CMS robots directive and defaults fallback pages to index,follow", () => {
    const baseSeo = {
      title: "SEO test page",
      description: "SEO test description",
    };

    assert.equal(pageMetadata(baseSeo, "/seo-test").robots, "index,follow");
    assert.equal(
      pageMetadata({ ...baseSeo, robots: "noindex,follow" }, "/seo-test").robots,
      "noindex,follow",
    );
    assert.equal(pageMetadata({ ...baseSeo, noIndex: true }, "/seo-test").robots, "noindex,nofollow");
  });

  it("normalizes page-specific keywords and structured data", () => {
    assert.deepEqual(
      normalizeSeoKeywords(" AERB License, AERB Certificate, , AERB Approval "),
      ["AERB License", "AERB Certificate", "AERB Approval"],
    );
    assert.equal(normalizeSeoKeywords(" , "), undefined);
    assert.deepEqual(normalizeSchemaMarkup({ "@context": "https://schema.org" }), {
      "@context": "https://schema.org",
    });
    assert.equal(normalizeSchemaMarkup("not-an-object"), undefined);
  });

  it("emits keywords and uses the effective canonical URL for Open Graph", () => {
    const previousSiteUrl = process.env.SITE_URL;
    process.env.SITE_URL = "https://www.jr.test";

    try {
      const metadata = pageMetadata(
        {
          title: "SEO test page",
          description: "SEO test description",
          canonicalUrl: "https://legacy.example/approval/aerb-license",
          keywords: ["AERB License", "AERB Approval"],
        },
        "/approval/aerb-approval/aerb-license",
        { forcePathnameCanonical: true },
      );

      assert.deepEqual(metadata.keywords, ["AERB License", "AERB Approval"]);
      assert.equal(
        metadata.alternates?.canonical,
        "https://www.jr.test/approval/aerb-approval/aerb-license",
      );
      assert.equal(
        metadata.openGraph && "url" in metadata.openGraph
          ? metadata.openGraph.url
          : undefined,
        "https://www.jr.test/approval/aerb-approval/aerb-license",
      );
    } finally {
      if (previousSiteUrl === undefined) {
        delete process.env.SITE_URL;
      } else {
        process.env.SITE_URL = previousSiteUrl;
      }
    }
  });

  it("renders configured JSON-LD once and escapes script-breaking markup", () => {
    const markup = renderToStaticMarkup(
      createElement(SeoJsonLd, {
        schemaMarkup: {
          "@context": "https://schema.org",
          name: "</script><script>alert('xss')</script>",
        },
      }),
    );

    assert.match(markup, /^<script type="application\/ld\+json">/);
    assert.ok(markup.includes("\\u003c/script>"));
    assert.ok(!markup.includes("</script><script>"));
    assert.equal(renderToStaticMarkup(createElement(SeoJsonLd)), "");
  });
});
