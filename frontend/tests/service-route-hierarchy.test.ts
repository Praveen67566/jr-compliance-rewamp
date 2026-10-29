import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

import { pageMetadata } from "@/lib/page-metadata";

const repositoryRoot = fileURLToPath(new URL("../..", import.meta.url));

function source(path: string): string {
  return readFileSync(resolve(repositoryRoot, path), "utf8");
}

const expectedRegistry = [
  [
    "corporate",
    "company-registration-page",
    "company-registration",
    "Company Registration",
    "getCompanyRegistrationPage",
    "getCompanyRegistrationSlugs",
  ],
  [
    "corporate",
    "mca-service-page",
    "mca-services",
    "MCA Services",
    "getMcaServicePage",
    "getMcaServiceSlugs",
  ],
  [
    "corporate",
    "import-export-service-page",
    "import-export",
    "Import Export",
    "getImportExportServicePage",
    "getImportExportServiceSlugs",
  ],
  [
    "corporate",
    "government-license-certification-page",
    "government-license-certification",
    "Government License & Certification",
    "getGovernmentLicenseCertificationPage",
    "getGovernmentLicenseCertificationSlugs",
  ],
  [
    "corporate",
    "ipr-service-page",
    "ipr-services",
    "IPR Services",
    "getIprServicePage",
    "getIprServiceSlugs",
  ],
  [
    "corporate",
    "fssai-service-page",
    "fssai",
    "FSSAI",
    "getFssaiServicePage",
    "getFssaiServiceSlugs",
  ],
  [
    "corporate",
    "sebi-business-registration-page",
    "sebi-business-registration",
    "SEBI Business Registration",
    "getSebiBusinessRegistrationPage",
    "getSebiBusinessRegistrationSlugs",
  ],
  [
    "corporate",
    "tax-accounting-page",
    "tax-accounting",
    "Tax & Accounting",
    "getTaxAccountingPage",
    "getTaxAccountingSlugs",
  ],
  [
    "corporate",
    "labour-compliance-page",
    "labour-compliance",
    "Labour Compliance",
    "getLabourCompliancePage",
    "getLabourComplianceSlugs",
  ],
  [
    "corporate",
    "fund-raising-page",
    "fund-raising",
    "Fund Raising",
    "getFundRaisingPage",
    "getFundRaisingSlugs",
  ],
  [
    "approval",
    "bureau-indian-standards-page",
    "bureau-indian-standards",
    "Bureau of Indian Standards",
    "getBureauIndianStandardsPage",
    "getBureauIndianStandardsSlugs",
  ],
  [
    "approval",
    "pollution-advisory-page",
    "pollution-advisory",
    "Pollution Advisory",
    "getPollutionAdvisoryPage",
    "getPollutionAdvisorySlugs",
  ],
  [
    "approval",
    "telecommunication-engineering-centre-page",
    "telecommunication-engineering-centre",
    "Telecommunication Engineering Centre",
    "getTelecommunicationEngineeringCentrePage",
    "getTelecommunicationEngineeringCentreSlugs",
  ],
  [
    "approval",
    "wireless-planning-coordination-page",
    "wireless-planning-coordination",
    "Wireless Planning and Coordination",
    "getWirelessPlanningCoordinationPage",
    "getWirelessPlanningCoordinationSlugs",
  ],
  [
    "approval",
    "bureau-energy-efficiency-page",
    "bureau-energy-efficiency",
    "Bureau of Energy Efficiency",
    "getBureauEnergyEfficiencyPage",
    "getBureauEnergyEfficiencySlugs",
  ],
  [
    "approval",
    "cdsco-registration-page",
    "cdsco-registration",
    "CDSCO Registration",
    "getCdscoRegistrationPage",
    "getCdscoRegistrationSlugs",
  ],
  [
    "approval",
    "aerb-approval-page",
    "aerb-approval",
    "AERB Approval",
    "getAerbApprovalPage",
    "getAerbApprovalSlugs",
  ],
  [
    "approval",
    "lmpc-certification-page",
    "lmpc-certification",
    "LMPC Certification",
    "getLmpcCertificationPage",
    "getLmpcCertificationSlugs",
  ],
  [
    "approval",
    "stqc-page",
    "stqc",
    "STQC",
    "getStqcPage",
    "getStqcSlugs",
  ],
] as const;

describe("fixed service route hierarchy", () => {
  it("maps all nineteen content collections to unique frontend-owned categories", () => {
    const definitions = source("frontend/lib/service-route-config.ts");
    const loaders = source("frontend/lib/service-routes.ts");
    const mappings = [...definitions.matchAll(
      /family: "(corporate|approval)", contentType: "([^"]+)", categorySlug: "([^"]+)", categoryLabel: "([^"]+)"/g,
    )].map((match) => {
      const loader = loaders.match(new RegExp(`"${match[2]}": \{ loadPage: (\\w+), loadSlugs: (\\w+) \}`));
      assert.ok(loader, `Missing loaders for ${match[2]}`);
      return [...match.slice(1), ...loader.slice(1)];
    });

    assert.deepEqual(mappings, expectedRegistry);
    assert.equal(mappings.length, 19);
    assert.equal(mappings.filter(([family]) => family === "corporate").length, 10);
    assert.equal(mappings.filter(([family]) => family === "approval").length, 9);
    assert.equal(new Set(mappings.map(([, , slug]) => slug)).size, 19);
    assert.equal(new Set(mappings.map(([, contentType]) => contentType)).size, 19);
  });

  it("discovers CMS-only Company Registration slugs and maps complete records strictly", () => {
    const content = source("frontend/lib/content.ts");
    const strapi = source("frontend/lib/strapi.ts");
    const companyLoader = content.slice(
      content.indexOf("export const getCompanyRegistrationPage"),
      content.indexOf("export const getMcaServicePage"),
    );

    assert.match(
      companyLoader,
      /getCompanyRegistrationPageFromStrapi\(slug, fallback, chromeFallback\)/,
    );
    assert.doesNotMatch(companyLoader, /if \(!page\) \{\s+return null;/);
    assert.match(companyLoader, /getCompanyRegistrationSlugsFromStrapi\(\)/);
    assert.match(
      companyLoader,
      /new Set\(\[\.\.\.companyRegistrationSlugs, \.\.\.strapiSlugs\]\)/,
    );
    assert.match(
      strapi,
      /export function getCompanyRegistrationSlugsFromStrapi\(\): Promise<string\[\]>/,
    );
    assert.match(
      strapi,
      /getCompanyRegistrationPageFromStrapi\([\s\S]*?fallback: CompanyRegistrationPageContent \| null,[\s\S]*?getFixedServiceCategoryPageFromStrapi/,
    );
    assert.match(
      strapi,
      /return fallback\s+\? mapFixedServiceDetailPage\(fallback, rawPage, rawSettings\)\s+: mapCmsOnlyFixedServiceDetailPage/,
    );
  });

  it("renders service pages directly under their family", () => {
    const corporate = source("frontend/app/corporate/[slug]/page.tsx");
    const approval = source("frontend/app/approval/[slug]/page.tsx");
    assert.match(corporate, /getPublicServicePage\("corporate", slug\)/);
    assert.match(corporate, /<CompanyRegistrationPage/);
    assert.match(approval, /getPublicServicePage\("approval", slug\)/);
    assert.match(approval, /<CompanyRegistrationPage/);
    assert.match(source("frontend/lib/service-routes.ts"), /uniquePublicLinks\(categoryEntries.flat\(\)\)/);
  });

  it("keeps categories internal and exposes only family plus the final service slug", () => {
    const routes = source("frontend/lib/service-routes.ts");
    assert.match(routes, /return `\/\$\{category.family\}\/\$\{publicServiceSlug\(servicePath\)\}`/);
    assert.match(routes, /getCategorizedServicePage\(family, entry.categorySlug, entry.servicePath\)/);
  });

  it("redirects former category URLs instead of rendering duplicate pages", () => {
    for (const route of [
      "frontend/app/[category]/[slug]/page.tsx",
      "frontend/app/corporate/[slug]/[service]/page.tsx",
    ]) {
      const page = source(route);
      assert.match(page, /notFound\(\)/);
      assert.match(page, /permanentRedirect\(/);
      assert.doesNotMatch(page, /<CompanyRegistrationPage/);
    }
    assert.match(source("frontend/app/approval/[slug]/[...legacy]/page.tsx"), /resolved.kind !== "redirect"/);
  });

  it("renders a four-level accessible breadcrumb from fixed route context", () => {
    const component = source(
      "frontend/components/company-registration/company-registration-page.tsx",
    );
    const breadcrumb = component.slice(
      component.indexOf('<nav aria-label="Breadcrumb"'),
      component.indexOf("</nav>", component.indexOf('<nav aria-label="Breadcrumb"')),
    );
    const levels = [
      breadcrumb.indexOf("Home"),
      breadcrumb.indexOf("{breadcrumb.areaLabel}"),
      breadcrumb.indexOf("{breadcrumb.categoryLabel}"),
      breadcrumb.indexOf("{content.menuLabel}"),
    ];

    assert.ok(levels.every((index) => index >= 0));
    assert.deepEqual([...levels].sort((left, right) => left - right), levels);
    assert.equal(breadcrumb.match(/<span aria-hidden="true">\/<\/span>/g)?.length, 3);
    assert.match(breadcrumb, /aria-current="page"/);
    assert.match(component, /areaLabel: "Corporate" \| "Approval"/);
  });

  it("forces canonical metadata to the direct family pathname", () => {
    const previousSiteUrl = process.env.SITE_URL;
    process.env.SITE_URL = "https://www.jr.test";

    try {
      const seo = {
        title: "Service",
        description: "Service description",
        canonicalUrl: "https://legacy.example/corporate/legacy-service",
      };
      const canonicalPath =
        "/corporate/private-limited-company-registration-consultant";

      assert.equal(
        pageMetadata(seo, canonicalPath, { forcePathnameCanonical: true }).alternates
          ?.canonical,
        `https://www.jr.test${canonicalPath}`,
      );
      assert.equal(
        pageMetadata(seo, canonicalPath).alternates?.canonical,
        seo.canonicalUrl,
      );
    } finally {
      if (previousSiteUrl === undefined) {
        delete process.env.SITE_URL;
      } else {
        process.env.SITE_URL = previousSiteUrl;
      }
    }

    for (const route of [
      "frontend/app/corporate/[slug]/page.tsx",
      "frontend/app/approval/[slug]/page.tsx",
      "frontend/app/global/[slug]/page.tsx",
    ]) {
      assert.match(
        source(route),
        /pageMetadata\([\s\S]*?forcePathnameCanonical: true/,
      );
    }
  });

  it("publishes only direct canonical service URLs in the sitemap", () => {
    const sitemap = source("frontend/app/sitemap.ts");
    const serviceRoutes = source("frontend/lib/service-routes.ts");

    assert.match(sitemap, /getServiceSitemapEntries\("corporate"\)/);
    assert.match(sitemap, /getServiceSitemapEntries\("approval"\)/);
    assert.match(sitemap, /new URL\(entry\.canonicalPath, siteUrl\)/);
    assert.match(sitemap, /lastModified\(entry\.updatedAt\)/);
    assert.match(serviceRoutes, /if \(!content \|\| content\.seo\.noIndex\)/);
    assert.doesNotMatch(sitemap, /`\/corporate\/\$\{slug\}`/);
    assert.doesNotMatch(sitemap, /`\/approval\/\$\{routePath\}`/);
  });
});
