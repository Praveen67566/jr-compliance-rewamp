import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import { resolve } from "node:path";

const repositoryRoot = fileURLToPath(new URL("../..", import.meta.url));

function repositoryFile(path: string): string {
  return resolve(repositoryRoot, path);
}

function readJson(path: string): Record<string, unknown> {
  return JSON.parse(readFileSync(repositoryFile(path), "utf8")) as Record<string, unknown>;
}

describe("CMS-only Global page system", () => {
  it("keeps both Global collections draft-and-publish with fixed contracts", () => {
    const country = readJson(
      "cms/src/api/global-country-page/content-types/global-country-page/schema.json",
    );
    const certificate = readJson(
      "cms/src/api/global-certificate-page/content-types/global-certificate-page/schema.json",
    );

    assert.equal(country.kind, "collectionType");
    assert.equal(certificate.kind, "collectionType");
    assert.deepEqual(country.options, { draftAndPublish: true });
    assert.deepEqual(certificate.options, { draftAndPublish: true });

    const countryAttributes = country.attributes as Record<string, Record<string, unknown>>;
    assert.equal(countryAttributes.hero.component, "global.country-hero");
    assert.equal(countryAttributes.certificates.component, "global.certificate-listing");
    assert.equal(countryAttributes.finalCta.component, "home.cta-band");
    assert.equal(countryAttributes.seo.component, "shared.seo");

    const certificateAttributes = certificate.attributes as Record<
      string,
      Record<string, unknown>
    >;
    assert.equal(certificateAttributes.hero.component, "global.certificate-hero");
    assert.equal(certificateAttributes.overview.component, "global.overview");
    assert.equal(certificateAttributes.scope.component, "global.scope-section");
    assert.equal(certificateAttributes.process.component, "global.process-section");
    assert.equal(certificateAttributes.ourRole.component, "global.role-section");
    assert.equal(certificateAttributes.conclusion.component, "global.conclusion");
    assert.equal(certificateAttributes.finalCta.component, "home.cta-band");
    assert.equal(certificateAttributes.seo.component, "shared.seo");
  });

  it("adds only the two shared dynamic Global route pages", () => {
    const countryRoute = readFileSync(
      repositoryFile("frontend/app/globals/[country]/page.tsx"),
      "utf8",
    );
    const certificateRoute = readFileSync(
      repositoryFile("frontend/app/globals/[country]/[slug]/page.tsx"),
      "utf8",
    );

    for (const route of [countryRoute, certificateRoute]) {
      assert.match(route, /export const dynamicParams = true/);
      assert.match(route, /export const revalidate = 60/);
      assert.match(route, /notFound\(\)/);
      assert.match(route, /generateMetadata/);
      assert.match(route, /generateStaticParams/);
    }
  });

  it("keeps Global content CMS-only with matching revalidation tags", () => {
    for (const path of [
      "frontend/data/global-country-pages-fallback.ts",
      "frontend/data/global-certificate-pages-fallback.ts",
      "cms/src/seed/global-country-pages.json",
      "cms/src/seed/global-certificate-pages.json",
    ]) {
      assert.equal(existsSync(repositoryFile(path)), false, `${path} must not exist`);
    }

    const frontendAdapter = readFileSync(repositoryFile("frontend/lib/strapi.ts"), "utf8");
    const cmsRevalidation = readFileSync(repositoryFile("cms/src/revalidation.ts"), "utf8");

    for (const tag of ["jr-global-country-pages", "jr-global-certificate-pages"]) {
      assert.ok(frontendAdapter.includes(tag));
      assert.ok(cmsRevalidation.includes(tag));
    }

    assert.ok(frontendAdapter.includes("mapCmsOnlyGlobalCountryPage"));
    assert.ok(frontendAdapter.includes("mapCmsOnlyGlobalCertificatePage"));
    assert.ok(!frontendAdapter.includes("populate=deep"));
  });
});
