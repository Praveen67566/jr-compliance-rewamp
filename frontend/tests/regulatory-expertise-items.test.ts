import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

import { fallbackHomepage } from "@/data/homepage-fallback";

const repositoryRoot = fileURLToPath(new URL("../..", import.meta.url));

function source(path: string): string {
  return readFileSync(resolve(repositoryRoot, path), "utf8");
}

function readSchema(path: string): {
  attributes: Record<string, Record<string, unknown>>;
} {
  return JSON.parse(source(path)) as {
    attributes: Record<string, Record<string, unknown>>;
  };
}

describe("homepage Regulatory Expertise items", () => {
  it("uses a dedicated collection where only the name is required", () => {
    const itemSchema = readSchema(
      "cms/src/api/regulatory-expertise-item/content-types/regulatory-expertise-item/schema.json",
    );
    const homeSchema = readSchema(
      "cms/src/api/home-page/content-types/home-page/schema.json",
    );
    const brandLogoSchema = readSchema(
      "cms/src/api/brand-logo/content-types/brand-logo/schema.json",
    );

    assert.deepEqual(itemSchema.attributes.name, {
      type: "string",
      required: true,
    });
    assert.deepEqual(itemSchema.attributes.logo, {
      type: "media",
      multiple: false,
      allowedTypes: ["images"],
    });
    assert.deepEqual(itemSchema.attributes.websiteUrl, { type: "string" });
    assert.deepEqual(itemSchema.attributes.sortOrder, {
      type: "integer",
      min: 0,
    });
    assert.deepEqual(
      Object.entries(itemSchema.attributes)
        .filter(([, attribute]) => attribute.required === true)
        .map(([name]) => name),
      ["name"],
    );
    assert.deepEqual(homeSchema.attributes.regulatorLogos, {
      type: "relation",
      relation: "oneToMany",
      target: "api::regulatory-expertise-item.regulatory-expertise-item",
    });
    assert.deepEqual(homeSchema.attributes.trustedLogos, {
      type: "relation",
      relation: "oneToMany",
      target: "api::brand-logo.brand-logo",
    });
    assert.equal(brandLogoSchema.attributes.logo.required, true);
  });

  it("keeps population explicit and maps name-only records before falling back", () => {
    const adapter = source("frontend/lib/strapi.ts");
    const homePopulate = adapter.slice(
      adapter.indexOf('"home-page": {'),
      adapter.indexOf('"about-page": {'),
    );
    const mapper = adapter.slice(
      adapter.indexOf("function mapRegulatoryExpertiseItems("),
      adapter.indexOf("function mapServiceCategories("),
    );

    assert.match(homePopulate, /regulatorLogos: \{ logo: true \}/);
    assert.match(mapper, /const name = text\(item\.name\)/);
    assert.match(mapper, /const src = mediaUrl\(item\.logo\)/);
    assert.match(mapper, /return name\s+\? \{ name, \.\.\.\(src \? \{ src \} : \{\}\)/);
    assert.match(mapper, /return items\.length \? items : fallback/);
    assert.match(adapter, /logos: mapRegulatoryExpertiseItems\(/);
    assert.equal(adapter.includes("populate=deep"), false);
    assert.ok(fallbackHomepage.regulators.logos.every((item) => item.name && item.src));
  });

  it("renders either a larger centered logo or a larger centered name", () => {
    const component = source("frontend/components/home/home-page.tsx");
    const styles = source("frontend/components/home/home.css");

    assert.match(component, /\{logo\.src \? \(/);
    assert.match(component, /alt=\{logo\.href \|\| isCardDecorative \? "" : logo\.name\}/);
    assert.match(component, /\) : \(\s*<span className="regulator-logo-name">\{logo\.name\}<\/span>/);
    assert.match(styles, /\.regulator-logo img \{[^}]*max-height: 48px;[^}]*max-width: min\(128px, 78%\)/);
    assert.match(styles, /\.regulator-logo-name \{[^}]*font-size: 1rem/);
    assert.match(styles, /\.regulator-logo img \{[^}]*max-height: 40px;[^}]*max-width: 110px/);
    assert.match(styles, /\.regulator-logo-name \{[^}]*font-size: 0\.9rem/);
    assert.match(styles, /justify-content: center;[^}]*text-align: center/);
  });

  it("invalidates the homepage when a dedicated item changes", () => {
    const revalidation = source("cms/src/revalidation.ts");

    assert.match(
      revalidation,
      /"api::regulatory-expertise-item\.regulatory-expertise-item": \["jr-homepage"\]/,
    );
  });
});
