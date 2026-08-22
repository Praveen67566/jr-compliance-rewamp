import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

import { companyRegistrationSlugs } from "@/data/company-registration-pages-fallback";

const repositoryRoot = fileURLToPath(new URL("../..", import.meta.url));

function source(path: string): string {
  return readFileSync(resolve(repositoryRoot, path), "utf8");
}

const expectedCompanyRegistrationSlugs = [
  "sole-proprietorship-registration",
  "nidhi-company-registration",
  "ngo-registration",
  "section-8-company-registration",
  "partnership-firm-registration",
  "producer-company-registration",
  "indian-subsidiary",
  "private-limited-company-registration-consultant",
  "insurance-company-registration",
  "microfinance-company-registration",
  "opc-registration",
  "public-limited-company-registration",
  "nbfc-registration",
  "llp-registration",
  "asset-reconstruction-company-registration",
  "mutual-fund-company-registration",
  "foreign-company-registration",
  "trust-registration",
  "society-registration",
];

describe("rotating Earth hero scope", () => {
  it("uses high-detail local night-Earth surfaces without a duplicated light layer", () => {
    const visual = source(
      "frontend/components/visuals/rotating-earth-background.tsx",
    );
    const visualStyles = source(
      "frontend/components/visuals/rotating-earth-background.module.css",
    );

    assert.match(
      visual,
      /EARTH_SURFACE_TEXTURE_4K = "\/images\/earth\/earth-night\.webp"/,
    );
    assert.match(
      visual,
      /EARTH_SURFACE_TEXTURE_8K = "\/images\/earth\/earth-night-8k\.webp"/,
    );
    assert.match(visual, /new THREE\.MeshBasicMaterial/);
    assert.doesNotMatch(visual, /EARTH_CITY_LIGHTS_TEXTURE|fallbackLights/);
    assert.match(
      visualStyles,
      /background-image: url\("\/images\/earth\/earth-night-fallback\.webp"\)/,
    );
  });

  it("renders the home variant in the homepage hero", () => {
    const homeHero = source("frontend/components/home/hero.tsx");

    assert.match(
      homeHero,
      /import \{ RotatingEarthBackground \} from "@\/components\/visuals\/rotating-earth-background"/,
    );
    assert.match(homeHero, /<RotatingEarthBackground variant="home" \/>/);
  });

  it("enables the globe for all Corporate service collections", () => {
    const corporateRoute = source("frontend/app/corporate/[slug]/page.tsx");

    assert.equal(companyRegistrationSlugs.length, 19);
    assert.deepEqual(companyRegistrationSlugs, expectedCompanyRegistrationSlugs);
    assert.match(
      corporateRoute,
      /<CompanyRegistrationPage content=\{content\} showHeroGlobe \/>/,
    );
    assert.doesNotMatch(corporateRoute, /companyRegistrationSlugs\.includes\(slug\)/);
  });

  it("keeps the shared service template default-off and renders the globe only in its hero", () => {
    const template = source(
      "frontend/components/company-registration/company-registration-page.tsx",
    );
    const heroStart = template.indexOf('id="top"');
    const heroEnd = template.indexOf("</section>", heroStart);
    const globe = template.indexOf(
      '{showHeroGlobe ? <RotatingEarthBackground variant="registration" /> : null}',
    );

    assert.match(template, /showHeroGlobe\?: boolean/);
    assert.match(template, /showHeroGlobe = false/);
    assert.ok(heroStart >= 0);
    assert.ok(globe > heroStart);
    assert.ok(globe < heroEnd);
  });

  it("enables the globe for all Approval service collections", () => {
    const approvalRoute = source("frontend/app/approval/[...slug]/page.tsx");

    assert.match(
      approvalRoute,
      /<CompanyRegistrationPage content=\{content\} showHeroGlobe \/>/,
    );
    assert.doesNotMatch(approvalRoute, /RotatingEarthBackground/);
  });
});
