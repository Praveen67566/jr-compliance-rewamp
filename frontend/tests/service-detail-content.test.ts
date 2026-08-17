import assert from "node:assert/strict";
import { describe, it } from "node:test";

import governmentLicenseCertificationSeedPages from "../../cms/src/seed/government-license-certification-pages.json";
import importExportServiceSeedPages from "../../cms/src/seed/import-export-service-pages.json";
import { companyRegistrationSlugs } from "@/data/company-registration-pages-fallback";
import {
  fallbackGovernmentLicenseCertificationPages,
  governmentLicenseCertificationFallback,
  governmentLicenseCertificationSlugs,
} from "@/data/government-license-certification-pages-fallback";
import { fallbackHomepage } from "@/data/homepage-fallback";
import {
  fallbackImportExportServicePages,
  importExportServiceFallback,
  importExportServiceSlugs,
} from "@/data/import-export-service-pages-fallback";
import { mcaServiceSlugs } from "@/data/mca-service-pages-fallback";

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

  it("retains every approved fixed section from both legacy sources", () => {
    for (const page of [
      fallbackImportExportServicePages[0],
      fallbackGovernmentLicenseCertificationPages[0],
    ]) {
      assert.ok(page);
      assert.equal(page.overview.paragraphs.length, 1);
      assert.equal(page.challenges.items.length, 4);
      assert.equal(page.advantages.items.length, 4);
      assert.equal(page.process.items.length, 6);
      assert.equal(page.whyChoose.items.length, 4);
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
    ];

    assert.equal(new Set(slugs).size, slugs.length);
  });

  it("resolves only the approved first-page fallbacks", () => {
    assert.equal(importExportServiceFallback("iec-registration")?.menuLabel, "IEC Code");
    assert.equal(governmentLicenseCertificationFallback("ayush-license")?.menuLabel, "Ayush License");
    assert.equal(importExportServiceFallback("ad-code-registration"), undefined);
    assert.equal(governmentLicenseCertificationFallback("trade-license"), undefined);
  });

  it("keeps unimplemented links in both new categories on the services placeholder", () => {
    const corporate = fallbackHomepage.navigation.find((item) => item.label === "Corporate");
    const importExport = corporate?.categories?.find(
      (category) => category.title === "Import Export Service",
    );
    const government = corporate?.categories?.find(
      (category) => category.title === "Government License & Certification",
    );

    assert.equal(importExport?.links[0]?.href, "/corporate/iec-registration");
    assert.ok(importExport?.links.slice(1).every((link) => link.href === "/#services"));
    assert.equal(government?.links[0]?.href, "/corporate/ayush-license");
    assert.ok(government?.links.slice(1).every((link) => link.href === "/#services"));
  });
});
