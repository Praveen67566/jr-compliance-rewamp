import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import { after, afterEach, before, describe, it } from "node:test";

import { fallbackHomepage } from "@/data/homepage-fallback";
import { legalPageFallback } from "@/data/legal-pages-fallback";
import type { LegalPageContent, LegalPageSlug } from "@/lib/types";

const originalFetch = globalThis.fetch;
const originalUrl = process.env.STRAPI_URL;
const originalToken = process.env.STRAPI_API_TOKEN;
let loadPage: typeof import("@/lib/strapi").getLegalPageFromStrapi;

before(async () => {
  process.env.STRAPI_URL = "https://cms.example.test";
  process.env.STRAPI_API_TOKEN = "test-reader-token";
  const hooks = registerHooks({
    resolve(specifier, context, nextResolve) {
      return nextResolve(
        specifier === "server-only" ? "next/dist/compiled/server-only/empty.js" : specifier,
        context,
      );
    },
  });
  try {
    loadPage = (await import("@/lib/strapi")).getLegalPageFromStrapi;
  } finally {
    hooks.deregister();
  }
});

afterEach(() => {
  globalThis.fetch = originalFetch;
});

after(() => {
  if (originalUrl === undefined) delete process.env.STRAPI_URL;
  else process.env.STRAPI_URL = originalUrl;
  if (originalToken === undefined) delete process.env.STRAPI_API_TOKEN;
  else process.env.STRAPI_API_TOKEN = originalToken;
});

const paragraph = (text: string) => ({ type: "paragraph", children: [{ type: "text", text }] });

function fallbackFor(slug: LegalPageSlug): LegalPageContent {
  return {
    ...legalPageFallback(slug)!,
    site: fallbackHomepage.site,
    navigation: fallbackHomepage.navigation,
    footer: fallbackHomepage.footer,
  };
}

async function publishedPage(raw: Record<string, unknown>, slug: LegalPageSlug = "privacy-policy") {
  globalThis.fetch = (async (input) => {
    const url = new URL(String(input));
    assert.equal(url.searchParams.get("status"), "published");
    return Response.json({ data: url.pathname === "/api/legal-pages" ? [{ ...raw, slug }] : {} });
  }) as typeof fetch;
  const page = await loadPage(slug, fallbackFor(slug));
  assert.ok(page);
  return page;
}

describe("published Privacy Policy content", () => {
  it("renders updated introduction and sections with editor-created blank paragraphs", async () => {
    const introduction = paragraph("Updated published introduction.");
    const body = {
      type: "paragraph",
      children: [
        { type: "text", text: "Read ", bold: true },
        { type: "link", url: "/contact-us", children: [{ type: "text", text: "our contact details" }] },
        { type: "text", text: " for help." },
      ],
    };
    const list = {
      type: "list", format: "unordered",
      children: [{ type: "list-item", children: [{ type: "text", text: "Published list item" }] }],
    };
    const raw = {
      introduction: [paragraph(""), introduction, paragraph(" \t ")],
      sections: [
        { title: "GENERAL PROVISIONS", body: [paragraph(""), body, paragraph(""), list] },
        { title: "GRIEVANCE AND CONTACT", body: [paragraph(""), paragraph("Current contact text.")] },
      ],
    };
    const original = structuredClone(raw);
    const page = await publishedPage(raw);

    assert.deepEqual(page.introduction, [introduction]);
    assert.deepEqual(page.sections, [
      { title: "GENERAL PROVISIONS", body: [body, list] },
      { title: "GRIEVANCE AND CONTACT", body: [paragraph("Current contact text.")] },
    ]);
    assert.deepEqual(raw, original);
  });

  it("allows an intentionally blank introduction without borrowing old introduction text", async () => {
    const page = await publishedPage({
      introduction: [paragraph(""), paragraph(" ")],
      sections: [{ title: "Published section", body: [paragraph("Current policy.")] }],
    });
    assert.deepEqual(page.introduction, []);
  });

  it("retains fallback validation for malformed, unsupported, or entirely blank section content", async () => {
    for (const body of [
      [paragraph("")],
      [{ type: "paragraph", children: [{ type: "text", text: 123 }] }],
      [{ type: "paragraph" }],
      [{ type: "heading", level: 1, children: [{ type: "text", text: "Unsupported heading" }] }],
    ]) {
      const page = await publishedPage({
        introduction: [paragraph("Current introduction.")],
        sections: [{ title: "Invalid section", body }],
      });
      assert.deepEqual(page.introduction, [paragraph("Current introduction.")]);
      assert.deepEqual(page.sections, fallbackFor("privacy-policy").sections);
    }
  });

  it("preserves existing blank-paragraph handling on the other legal pages", async () => {
    for (const slug of ["terms-and-conditions", "purchase-and-billing"] as const) {
      const page = await publishedPage({
        introduction: [paragraph("New introduction."), paragraph("")],
        sections: [{ title: "New section", body: [paragraph("New text."), paragraph("")] }],
      }, slug);
      assert.deepEqual(page.introduction, fallbackFor(slug).introduction);
      assert.deepEqual(page.sections, fallbackFor(slug).sections);
    }
  });
});
