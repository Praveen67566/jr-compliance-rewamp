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

describe("CMS-managed footer badges", () => {
  it("adds only an optional ordered image field to Site Setting", () => {
    const schema = JSON.parse(
      source("cms/src/api/site-setting/content-types/site-setting/schema.json"),
    ) as { attributes: Record<string, Record<string, unknown>> };

    assert.deepEqual(schema.attributes.footerBadges, {
      type: "media",
      multiple: true,
      allowedTypes: ["images"],
    });
    assert.deepEqual(fallbackHomepage.footer.footerBadges, []);
  });

  it("explicitly populates and safely maps badge media", () => {
    const adapter = source("frontend/lib/strapi.ts");
    const siteSettingPopulate = adapter.slice(
      adapter.indexOf('"site-setting": {'),
      adapter.indexOf('"home-page": {'),
    );

    assert.match(siteSettingPopulate, /footerBadges: true/);
    assert.match(adapter, /const footerBadges = mapFooterBadges\(settings\.footerBadges\)/);
    assert.match(adapter, /return src/);
    assert.match(adapter, /alt: text\(item\.alternativeText\) \?\? ""/);
    assert.equal(adapter.includes("populate=deep"), false);
  });

  it("renders nothing when empty and accessible badge images when populated", () => {
    const footer = source("frontend/components/site-footer.tsx");

    assert.match(footer, /footer\.footerBadges\.length \? \(/);
    assert.match(footer, /aria-label="Certifications and recognitions"/);
    assert.match(footer, /<img src=\{badge\.src\} alt=\{badge\.alt\} loading="lazy" \/>/);
    assert.ok(footer.indexOf("footer-bottom\"") < footer.indexOf("footer.footerBadges.length"));
    assert.ok(footer.indexOf("footer.footerBadges.length") < footer.indexOf("footer-bottom-identity"));
  });
});
