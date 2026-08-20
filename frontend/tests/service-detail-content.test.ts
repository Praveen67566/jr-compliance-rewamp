import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

import bureauIndianStandardsSeedPages from "../../cms/src/seed/bureau-indian-standards-pages.json";
import governmentLicenseCertificationSeedPages from "../../cms/src/seed/government-license-certification-pages.json";
import fssaiServiceSeedPages from "../../cms/src/seed/fssai-service-pages.json";
import fundRaisingSeedPages from "../../cms/src/seed/fund-raising-pages.json";
import importExportServiceSeedPages from "../../cms/src/seed/import-export-service-pages.json";
import iprServiceSeedPages from "../../cms/src/seed/ipr-service-pages.json";
import labourComplianceSeedPages from "../../cms/src/seed/labour-compliance-pages.json";
import pollutionAdvisorySeedPages from "../../cms/src/seed/pollution-advisory-pages.json";
import sebiBusinessRegistrationSeedPages from "../../cms/src/seed/sebi-business-registration-pages.json";
import taxAccountingSeedPages from "../../cms/src/seed/tax-accounting-pages.json";
import { companyRegistrationSlugs } from "@/data/company-registration-pages-fallback";
import {
  bureauIndianStandardsFallback,
  bureauIndianStandardsSlugs,
  fallbackBureauIndianStandardsPages,
} from "@/data/bureau-indian-standards-pages-fallback";
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
  fallbackFundRaisingPages,
  fundRaisingFallback,
  fundRaisingSlugs,
} from "@/data/fund-raising-pages-fallback";
import {
  fallbackImportExportServicePages,
  importExportServiceFallback,
  importExportServiceSlugs,
} from "@/data/import-export-service-pages-fallback";
import {
  fallbackLabourCompliancePages,
  labourComplianceFallback,
  labourComplianceSlugs,
} from "@/data/labour-compliance-pages-fallback";
import { mcaServiceSlugs } from "@/data/mca-service-pages-fallback";
import {
  fallbackPollutionAdvisoryPages,
  pollutionAdvisoryFallback,
  pollutionAdvisorySlugs,
} from "@/data/pollution-advisory-pages-fallback";
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
import {
  fallbackTaxAccountingPages,
  taxAccountingFallback,
  taxAccountingSlugs,
} from "@/data/tax-accounting-pages-fallback";

const repositoryRoot = fileURLToPath(new URL("../..", import.meta.url));

function repositoryFile(path: string): string {
  return resolve(repositoryRoot, path);
}

function readJson(path: string): Record<string, unknown> {
  return JSON.parse(readFileSync(repositoryFile(path), "utf8")) as Record<string, unknown>;
}

const fixedServiceSchemaNames = [
  "company-registration-page",
  "mca-service-page",
  "import-export-service-page",
  "government-license-certification-page",
  "ipr-service-page",
  "fssai-service-page",
  "sebi-business-registration-page",
  "tax-accounting-page",
  "labour-compliance-page",
  "fund-raising-page",
  "bureau-indian-standards-page",
  "pollution-advisory-page",
  "telecommunication-engineering-centre-page",
  "wireless-planning-coordination-page",
  "bureau-energy-efficiency-page",
  "cdsco-registration-page",
  "aerb-approval-page",
  "lmpc-certification-page",
  "stqc-page",
] as const;

describe("service-detail content mirrors", () => {
  it("adds the optional YouTube and ticker components to all fixed service schemas", () => {
    for (const schemaName of fixedServiceSchemaNames) {
      const schema = readJson(
        `cms/src/api/${schemaName}/content-types/${schemaName}/schema.json`,
      );
      const attributes = schema.attributes as Record<string, Record<string, unknown>>;

      assert.deepEqual(attributes.youtubeVideos, {
        type: "component",
        component: "registration.youtube-video-section",
        repeatable: false,
      });
      assert.deepEqual(attributes.tickerCta, {
        type: "component",
        component: "home.cta-band",
        repeatable: false,
      });

      const fields = Object.keys(attributes);
      assert.ok(fields.indexOf("whyChoose") < fields.indexOf("youtubeVideos"));
      assert.ok(fields.indexOf("youtubeVideos") < fields.indexOf("breakdown"));
      assert.ok(fields.indexOf("breakdown") < fields.indexOf("tickerCta"));
      assert.ok(fields.indexOf("tickerCta") < fields.indexOf("faqs"));
    }
  });

  it("keeps the YouTube component contract fixed and editor ordered", () => {
    const video = readJson("cms/src/components/registration/youtube-video.json");
    const section = readJson(
      "cms/src/components/registration/youtube-video-section.json",
    );
    const videoAttributes = video.attributes as Record<string, Record<string, unknown>>;
    const sectionAttributes = section.attributes as Record<string, Record<string, unknown>>;

    assert.deepEqual(videoAttributes.title, { type: "string", required: true });
    assert.deepEqual(videoAttributes.youtubeUrl, { type: "string", required: true });
    assert.deepEqual(sectionAttributes.eyebrow, { type: "string", required: true });
    assert.deepEqual(sectionAttributes.title, { type: "string", required: true });
    assert.deepEqual(sectionAttributes.description, { type: "text" });
    assert.deepEqual(sectionAttributes.videos, {
      type: "component",
      component: "registration.youtube-video",
      repeatable: true,
      required: true,
      min: 1,
    });
  });

  it("renders the optional sections in order with accessible lazy embeds", () => {
    const component = readFileSync(
      repositoryFile(
        "frontend/components/company-registration/company-registration-page.tsx",
      ),
      "utf8",
    );
    const strapiAdapter = readFileSync(
      repositoryFile("frontend/lib/strapi.ts"),
      "utf8",
    );

    const whyChooseIndex = component.indexOf("{content.whyChoose.items.map");
    const youtubeIndex = component.indexOf("{content.youtubeVideos ?");
    const breakdownIndex = component.indexOf('id="breakdown"');
    const tickerIndex = component.indexOf("{content.tickerCta ?");
    const faqIndex = component.indexOf('id="faq"');

    assert.ok(whyChooseIndex >= 0);
    assert.ok(whyChooseIndex < youtubeIndex);
    assert.ok(youtubeIndex < breakdownIndex);
    assert.ok(breakdownIndex < tickerIndex);
    assert.ok(tickerIndex < faqIndex);
    assert.match(component, /loading="lazy"/);
    assert.match(component, /referrerPolicy="strict-origin-when-cross-origin"/);
    assert.match(component, /allowFullScreen/);
    assert.match(component, /src=\{video\.embedUrl\}/);
    assert.match(component, /title=\{video\.title\}/);
    assert.match(component, /<figcaption/);
    assert.doesNotMatch(component, /autoplay/i);
    assert.match(component, /className="contact-ticker"/);
    assert.match(strapiAdapter, /youtubeVideos: \{ videos: true \}/);
    assert.match(strapiAdapter, /tickerCta: \{ cta: true \}/);
    assert.ok(!strapiAdapter.includes("populate=deep"));
  });

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

  it("keeps the Tax, Labour, and Fund Raising fallbacks identical to their CMS mirrors", () => {
    assert.deepEqual(fallbackTaxAccountingPages, taxAccountingSeedPages);
    assert.deepEqual(fallbackLabourCompliancePages, labourComplianceSeedPages);
    assert.deepEqual(fallbackFundRaisingPages, fundRaisingSeedPages);
  });

  it("keeps the BIS and Pollution Advisory fallbacks identical to their CMS mirrors", () => {
    assert.deepEqual(fallbackBureauIndianStandardsPages, bureauIndianStandardsSeedPages);
    assert.deepEqual(fallbackPollutionAdvisoryPages, pollutionAdvisorySeedPages);
  });

  it("retains every approved fixed section from both legacy sources", () => {
    for (const [page, expectedWhyChooseItems] of [
      [fallbackImportExportServicePages[0], 4],
      [fallbackGovernmentLicenseCertificationPages[0], 4],
      [fallbackIprServicePages[0], 6],
      [fallbackFssaiServicePages[0], 3],
      [fallbackSebiBusinessRegistrationPages[0], 4],
      [fallbackLabourCompliancePages[0], 4],
      [fallbackFundRaisingPages[0], 4],
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

    const gst = fallbackTaxAccountingPages[0];
    assert.ok(gst);
    assert.ok(gst.overview.paragraphs.length >= 1);
    assert.equal(gst.challenges.items.length, 4);
    assert.equal(gst.advantages.items.length, 3);
    assert.equal(gst.process.items.length, 6);
    assert.equal(gst.whyChoose.items.length, 4);
    assert.equal(gst.breakdown.groups.length, 3);
    assert.equal(gst.faqs.items.length, 5);
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
      ...taxAccountingSlugs,
      ...labourComplianceSlugs,
      ...fundRaisingSlugs,
    ];

    assert.equal(new Set(slugs).size, slugs.length);
  });

  it("keeps every local Approval route path unique", () => {
    const routePaths = [...bureauIndianStandardsSlugs, ...pollutionAdvisorySlugs];
    assert.equal(new Set(routePaths).size, routePaths.length);
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
    assert.equal(taxAccountingFallback("gst-registration")?.menuLabel, "GST Registration");
    assert.equal(
      labourComplianceFallback("shop-and-establishment-act-registration")?.menuLabel,
      "Shop & Establishment Registration",
    );
    assert.equal(fundRaisingFallback("msme-registration")?.menuLabel, "MSME");
    assert.equal(taxAccountingFallback("gst-return"), undefined);
    assert.equal(labourComplianceFallback("esic-registration"), undefined);
    assert.equal(fundRaisingFallback("startup-india-registration"), undefined);
    assert.equal(
      bureauIndianStandardsFallback("isi-certificate")?.menuLabel,
      "ISI Certification",
    );
    assert.equal(
      pollutionAdvisoryFallback("epr-certification")?.menuLabel,
      "Extended Producer's Responsibility (EPR)",
    );
    assert.equal(bureauIndianStandardsFallback("bis-certification/fmcs-bis-certification"), undefined);
    assert.equal(pollutionAdvisoryFallback("epr-certification/e-waste-compliance"), undefined);
  });

  it("keeps later BIS and Pollution Advisory links on the services placeholder", () => {
    const approval = fallbackHomepage.navigation.find((item) => item.label === "Approval");
    const bis = approval?.categories?.find(
      (category) => category.title === "Bureau of Indian Standards (BIS)",
    );
    const pollution = approval?.categories?.find(
      (category) => category.title === "Pollution Advisory",
    );

    assert.equal(bis?.links[0]?.href, "/approval/isi-certificate");
    assert.ok(bis?.links.slice(1).every((link) => link.href === "/#services"));
    assert.equal(pollution?.links[0]?.href, "/approval/epr-certification");
    assert.ok(pollution?.links.slice(1).every((link) => link.href === "/#services"));
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
    const taxAccounting = corporate?.categories?.find(
      (category) => category.title === "Tax and Accounting",
    );
    const labourCompliance = corporate?.categories?.find(
      (category) => category.title === "Labour Compliance",
    );
    const fundRaising = corporate?.categories?.find(
      (category) => category.title === "Fund Raising",
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
    assert.equal(taxAccounting?.links[0]?.href, "/corporate/gst-registration");
    assert.ok(taxAccounting?.links.slice(1).every((link) => link.href === "/#services"));
    assert.equal(
      labourCompliance?.links[0]?.href,
      "/corporate/shop-and-establishment-act-registration",
    );
    assert.ok(labourCompliance?.links.slice(1).every((link) => link.href === "/#services"));
    assert.equal(fundRaising?.links[0]?.href, "/corporate/msme-registration");
    assert.ok(fundRaising?.links.slice(1).every((link) => link.href === "/#services"));
  });
});
