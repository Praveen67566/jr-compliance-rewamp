import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import { resolve } from "node:path";

import legalPageSeed from "../../cms/src/seed/legal-pages.json";
import { initialSite } from "../../cms/src/seed/content";
import { fallbackHomepage } from "@/data/homepage-fallback";
import {
  fallbackLegalPages,
  legalPageFallback,
  legalPageSlugs,
} from "@/data/legal-pages-fallback";
import type { LegalPageData } from "@/lib/types";

const repositoryRoot = fileURLToPath(new URL("../..", import.meta.url));
const expectedSlugs = [
  "privacy-policy",
  "terms-and-conditions",
  "purchase-and-billing",
] as const;

function repositoryFile(path: string): string {
  return resolve(repositoryRoot, path);
}

function source(path: string): string {
  return readFileSync(repositoryFile(path), "utf8");
}

function readJson(path: string): Record<string, unknown> {
  return JSON.parse(source(path)) as Record<string, unknown>;
}

function pageText(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(pageText).join(" ");
  }

  if (!value || typeof value !== "object") {
    return "";
  }

  const entry = value as Record<string, unknown>;
  return Object.values(entry).map(pageText).join(" ");
}

function blockCounts(page: LegalPageData) {
  const blocks = [...page.introduction, ...page.sections.flatMap(({ body }) => body)];
  return {
    paragraphs: blocks.filter(({ type }) => type === "paragraph").length,
    headings3: blocks.filter((block) => block.type === "heading" && block.level === 3).length,
    headings4: blocks.filter((block) => block.type === "heading" && block.level === 4).length,
    lists: blocks.filter(({ type }) => type === "list").length,
  };
}

describe("fixed legal-page system", () => {
  it("keeps all three typed fallbacks identical to the CMS migration mirror", () => {
    assert.deepEqual(fallbackLegalPages, legalPageSeed);
    assert.deepEqual(legalPageSlugs, expectedSlugs);
    assert.equal(new Set(legalPageSlugs).size, expectedSlugs.length);

    for (const slug of expectedSlugs) {
      const page = legalPageFallback(slug);
      assert.equal(page?.slug, slug);
      assert.equal(page?.seo.canonicalUrl, undefined);
    }
    assert.equal(legalPageFallback("not-a-legal-page"), undefined);
  });

  it("retains the approved paragraph, heading, section, and list hierarchy", () => {
    const [privacy, terms, purchase] = fallbackLegalPages;

    assert.equal(privacy.introduction.length, 5);
    assert.equal(privacy.sections.length, 5);
    assert.deepEqual(blockCounts(privacy), {
      paragraphs: 31,
      headings3: 4,
      headings4: 0,
      lists: 1,
    });

    assert.equal(terms.introduction.length, 7);
    assert.equal(terms.sections.length, 16);
    assert.deepEqual(blockCounts(terms), {
      paragraphs: 38,
      headings3: 0,
      headings4: 0,
      lists: 2,
    });

    assert.equal(purchase.introduction.length, 0);
    assert.deepEqual(
      purchase.sections.map(({ title }) => title),
      [
        "General Term and Conditions of purchase « Services »",
        'General Terms and Conditions of Purchase "Products"',
      ],
    );
    assert.deepEqual(blockCounts(purchase), {
      paragraphs: 198,
      headings3: 30,
      headings4: 47,
      lists: 3,
    });
  });

  it("preserves legal contact details while excluding legacy marketing and transport code", () => {
    const text = pageText(fallbackLegalPages);
    const serialized = JSON.stringify(fallbackLegalPages);

    for (const required of [
      "admin@jrcompliance.com",
      "support@jrcompliance.com",
      "K8, Sector- 3, Bawana Industrial Area, Delhi-110034 (India)",
      "K8, Sector 3, Bhawana Industrial Area, Delhi - 110034 (India)",
    ]) {
      assert.ok(text.includes(required), `missing approved legal text: ${required}`);
    }

    for (const forbidden of [
      "Have Questions? We’ve got answers",
      "data-wf-",
      "w-richtext",
      "site/assets",
      "<script",
      "â",
      "Â",
      "\u200d",
    ]) {
      assert.ok(!serialized.includes(forbidden), `unexpected legacy artifact: ${forbidden}`);
    }
  });

  it("uses the completed local routes in fallback and CMS-managed footer data", () => {
    const expectedLinks = expectedSlugs.map((slug, index) => ({
      label: ["Privacy Policy", "Terms and Conditions", "Purchase and Billing"][index],
      href: `/${slug}`,
    }));

    assert.deepEqual(fallbackHomepage.site.legalLinks, expectedLinks);
    assert.deepEqual(
      initialSite.legalLinks,
      expectedLinks.map((link) => ({ ...link, target: "same_tab" })),
    );
    assert.equal(fallbackHomepage.site.leadForm.privacyLink.href, "/privacy-policy");
    assert.equal(initialSite.leadForm.privacyLink.href, "/privacy-policy");
  });

  it("keeps one fixed Draft and Publish collection instead of a page builder", () => {
    const schema = readJson(
      "cms/src/api/legal-page/content-types/legal-page/schema.json",
    );
    const attributes = schema.attributes as Record<string, Record<string, unknown>>;

    assert.equal(schema.kind, "collectionType");
    assert.deepEqual(schema.options, { draftAndPublish: true });
    assert.deepEqual(Object.keys(attributes), [
      "title",
      "slug",
      "eyebrow",
      "introduction",
      "sections",
      "seo",
      "sortOrder",
    ]);
    assert.equal(attributes.slug.regex, "^(privacy-policy|terms-and-conditions|purchase-and-billing)$");
    assert.equal(attributes.introduction.type, "blocks");
    assert.equal(attributes.sections.component, "shared.legal-notice");
    assert.equal(attributes.sections.repeatable, true);
    assert.equal(attributes.sections.min, 1);
    assert.equal(attributes.seo.component, "shared.seo");
    assert.equal(attributes.sortOrder.min, 0);
    assert.equal(attributes.sortOrder.max, 2);
    assert.equal("dynamiczone" in attributes, false);
  });

  it("uses static metadata routes, explicit Strapi population, and matching signed tags", () => {
    for (const slug of expectedSlugs) {
      const route = source(`frontend/app/${slug}/page.tsx`);
      assert.match(route, /export const revalidate = 60/);
      assert.match(route, /generateMetadata/);
      assert.ok(route.includes(`pageMetadata(content.seo, "/${slug}")`));
      assert.match(route, /<LegalPage content=\{content\} \/>/);
    }

    const adapter = source("frontend/lib/strapi.ts");
    const cmsRevalidation = source("cms/src/revalidation.ts");
    const cmsBootstrap = source("cms/src/seed/index.ts");
    const signedReceiver = source("frontend/app/api/revalidate/route.ts");
    const sitemap = source("frontend/app/sitemap.ts");

    assert.ok(adapter.includes('"legal-page": "jr-legal-pages"'));
    assert.match(
      adapter,
      /const legalPagePopulateTree:[\s\S]*?sections: true,[\s\S]*?seo: \{ shareImage: true \}/,
    );
    assert.ok(adapter.includes("addPopulateTree(params, legalPagePopulateTree)"));
    assert.ok(!adapter.includes("populate=deep"));
    assert.ok(cmsRevalidation.includes('"api::legal-page.legal-page": ["jr-legal-pages"]'));
    assert.ok(cmsRevalidation.includes('createHmac("sha256", secret)'));
    assert.ok(cmsBootstrap.includes("migrateLegacySiteSettingLinks"));
    assert.ok(cmsBootstrap.includes("hasLegacyLegalLinks"));
    assert.ok(cmsBootstrap.includes("CONTENT_TYPES.legalPage"));
    assert.ok(cmsBootstrap.includes("legalPages.entries()"));
    assert.ok(signedReceiver.includes("strapiCacheTagBySlug"));
    assert.ok(signedReceiver.includes("isValidSignature"));
    assert.ok(sitemap.includes("...legalPageSlugs.map"));
  });
});
