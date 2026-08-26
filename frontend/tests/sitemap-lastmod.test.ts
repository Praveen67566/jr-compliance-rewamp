import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../..", import.meta.url));

function source(path: string): string {
  return readFileSync(resolve(repositoryRoot, path), "utf8");
}

describe("sitemap CMS modification dates", () => {
  it("uses each mapped page's validated Strapi updatedAt without deploy-time dates", () => {
    const sitemap = source("frontend/app/sitemap.ts");
    const adapter = source("frontend/lib/strapi.ts");
    const types = source("frontend/lib/types.ts");

    assert.match(types, /updatedAt\?: string/);
    assert.match(adapter, /Number\.isFinite\(Date\.parse\(timestamp\)\)/);
    assert.match(adapter, /function withStrapiUpdatedAt/);
    assert.match(sitemap, /function lastModified\(updatedAt: string \| undefined\)/);
    assert.match(sitemap, /updatedAt \? \{ lastModified: updatedAt \} : \{\}/);
    assert.match(sitemap, /lastModified\(homepage\.updatedAt\)/);
    assert.match(sitemap, /lastModified\(aboutPage\.updatedAt\)/);
    assert.match(sitemap, /lastModified\(careersPage\.updatedAt\)/);
    assert.match(sitemap, /lastModified\(contactPage\.updatedAt\)/);
    assert.match(sitemap, /lastModified\(content\.updatedAt\)/);
    assert.match(sitemap, /lastModified\(entry\.updatedAt\)/);
    assert.doesNotMatch(sitemap, /new Date\s*\(/);
    assert.doesNotMatch(sitemap, /Date\.now\s*\(/);
  });

  it("discovers every published CMS record with explicit pagination", () => {
    const adapter = source("frontend/lib/strapi.ts");

    assert.match(adapter, /new URLSearchParams\(\{ status: "published" \}\)/);
    assert.match(adapter, /"updatedAt", "publishedAt"/);
    assert.match(adapter, /params\.set\("pagination\[page\]", String\(page\)\)/);
    assert.match(
      adapter,
      /params\.set\("pagination\[pageSize\]", String\(sitemapPageSize\)\)/,
    );
    assert.match(adapter, /params\.set\("pagination\[withCount\]", "true"\)/);
    assert.match(adapter, /\.pagination\)\.pageCount/);
    assert.match(adapter, /while \(page <= pageCount\)/);
    assert.match(adapter, /getFixedServiceSitemapPagesFromStrapi/);
    assert.match(adapter, /getGlobalCountrySitemapPagesFromStrapi/);
    assert.match(adapter, /getGlobalCertificateSitemapPagesFromStrapi/);
  });

  it("keeps drafts, noindex records, incomplete CMS pages, and legacy URLs out", () => {
    const sitemap = source("frontend/app/sitemap.ts");
    const serviceRoutes = source("frontend/lib/service-routes.ts");

    assert.match(sitemap, /seo\.noIndex/g);
    assert.match(serviceRoutes, /if \(!content \|\| content\.seo\.noIndex\)/);
    assert.doesNotMatch(sitemap, /`\/corporate\/\$\{slug\}`/);
    assert.doesNotMatch(sitemap, /`\/approval\/\$\{routePath\}`/);
  });
});
