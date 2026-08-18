import assert from "node:assert/strict";
import { describe, it } from "node:test";

import governmentLicenseCertificationSeedPages from "../../cms/src/seed/government-license-certification-pages.json";
import fssaiServiceSeedPages from "../../cms/src/seed/fssai-service-pages.json";
import importExportServiceSeedPages from "../../cms/src/seed/import-export-service-pages.json";
import iprServiceSeedPages from "../../cms/src/seed/ipr-service-pages.json";
import sebiBusinessRegistrationSeedPages from "../../cms/src/seed/sebi-business-registration-pages.json";
import { companyRegistrationSlugs } from "@/data/company-registration-pages-fallback";
import {
  fallbackGovernmentLicenseCertificationPages,
  governmentLicenseCertificationFallback,
  governmentLicenseCertificationSlugs,
} from "@/data/government-license-certification-pages-fallback";
import { fallbackHomepage } from "@/data/homepage-fallback";
import {
  fallbackFssaiServicePages,
  fssaiServiceFallback,
  fssaiServiceSlugs,
} from "@/data/fssai-service-pages-fallback";
import {
  fallbackImportExportServicePages,
  importExportServiceFallback,
  importExportServiceSlugs,
} from "@/data/import-export-service-pages-fallback";
import { mcaServiceSlugs } from "@/data/mca-service-pages-fallback";
import {
  fallbackIprServicePages,
  iprServiceFallback,
  iprServiceSlugs,
} from "@/data/ipr-service-pages-fallback";
import {
  fallbackSebiBusinessRegistrationPages,
  sebiBusinessRegistrationFallback,
  sebiBusinessRegistrationSlugs,
} from "@/data/sebi-business-registration-pages-fallback";

describe("service-detail content mirrors", () => {
  it("keeps IEC Code fallback content identical to its CMS migration mirror", () => {
    assert.deepEqual(fallbackImportExportServicePages, importExportServiceSeedPages);
  });

  it("keeps Ayush License fallback content identical to its CMS migration mirror", () => {
    assert.deepEqual(
      fallbackGovernmentLicenseCertificationPages,
      governmentLicenseCertificationSeedPages,
    );
  });

  it("keeps the three new first-page fallbacks identical to their CMS mirrors", () => {
    assert.deepEqual(fallbackIprServicePages, iprServiceSeedPages);
    assert.deepEqual(fallbackFssaiServicePages, fssaiServiceSeedPages);
    assert.deepEqual(fallbackSebiBusinessRegistrationPages, sebiBusinessRegistrationSeedPages);
  });

  it("retains every approved fixed section from both legacy sources", () => {
    for (const [page, expectedWhyChooseItems] of [
      [fallbackImportExportServicePages[0], 4],
      [fallbackGovernmentLicenseCertificationPages[0], 4],
      [fallbackIprServicePages[0], 6],
      [fallbackFssaiServicePages[0], 3],
      [fallbackSebiBusinessRegistrationPages[0], 4],
    ] as const) {
      assert.ok(page);
      assert.ok(page.overview.paragraphs.length >= 1);
      assert.ok(page.challenges.items.length >= 4);
      assert.ok(page.advantages.items.length >= 4);
      assert.equal(page.process.items.length, 6);
      assert.equal(page.whyChoose.items.length, expectedWhyChooseItems);
      assert.equal(page.breakdown.groups.length, 3);
      assert.equal(page.faqs.items.length, 5);
    }
  });

  it("keeps every local corporate route slug globally unique", () => {
    const slugs = [
      ...companyRegistrationSlugs,
      ...mcaServiceSlugs,
      ...importExportServiceSlugs,
      ...governmentLicenseCertificationSlugs,
      ...iprServiceSlugs,
      ...fssaiServiceSlugs,
      ...sebiBusinessRegistrationSlugs,
    ];

    assert.equal(new Set(slugs).size, slugs.length);
  });

  it("resolves only the approved first-page fallbacks", () => {
    assert.equal(importExportServiceFallback("iec-registration")?.menuLabel, "IEC Code");
    assert.equal(governmentLicenseCertificationFallback("ayush-license")?.menuLabel, "Ayush License");
    assert.equal(importExportServiceFallback("ad-code-registration"), undefined);
    assert.equal(governmentLicenseCertificationFallback("trade-license"), undefined);
    assert.equal(iprServiceFallback("trademark-registration")?.menuLabel, "TRADEMARK Registration");
    assert.equal(fssaiServiceFallback("fssai-certificate")?.menuLabel, "Fssai Basic Registration");
    assert.equal(
      sebiBusinessRegistrationFallback("portfolio-manager-registration")?.menuLabel,
      "Portfolio Manager Registration",
    );
    assert.equal(iprServiceFallback("trademark-search"), undefined);
    assert.equal(fssaiServiceFallback("fssai-state-license"), undefined);
    assert.equal(sebiBusinessRegistrationFallback("sebi-mutual-fund"), undefined);
  });

  it("keeps unimplemented links in both new categories on the services placeholder", () => {
    const corporate = fallbackHomepage.navigation.find((item) => item.label === "Corporate");
    const importExport = corporate?.categories?.find(
      (category) => category.title === "Import Export Service",
    );
    const government = corporate?.categories?.find(
      (category) => category.title === "Government License & Certification",
    );
    const ipr = corporate?.categories?.find((category) => category.title === "IPR Services");
    const fssai = corporate?.categories?.find((category) => category.title === "FSSAI");
    const sebi = corporate?.categories?.find(
      (category) => category.title === "SEBI Business Registration",
    );

    assert.equal(importExport?.links[0]?.href, "/corporate/iec-registration");
    assert.ok(importExport?.links.slice(1).every((link) => link.href === "/#services"));
    assert.equal(government?.links[0]?.href, "/corporate/ayush-license");
    assert.ok(government?.links.slice(1).every((link) => link.href === "/#services"));
    assert.equal(ipr?.links[0]?.href, "/corporate/trademark-registration");
    assert.ok(ipr?.links.slice(1).every((link) => link.href === "/#services"));
    assert.equal(fssai?.links[0]?.href, "/corporate/fssai-certificate");
    assert.ok(fssai?.links.slice(1).every((link) => link.href === "/#services"));
    assert.equal(sebi?.links[0]?.href, "/corporate/portfolio-manager-registration");
    assert.ok(sebi?.links.slice(1).every((link) => link.href === "/#services"));
  });
});
