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
    const routes = source("frontend/lib/service-routes.ts");
    const registry = routes.slice(
      routes.indexOf("export const serviceRouteRegistry = ["),
      routes.indexOf("] as const satisfies readonly ServiceRouteCategory[]"),
    );
    const mappings = [...registry.matchAll(
      /family: "(corporate|approval)",\s+contentType: "([^"]+)",\s+categorySlug: "([^"]+)",\s+categoryLabel: "([^"]+)",\s+loadPage: ([A-Za-z0-9]+),\s+loadSlugs: ([A-Za-z0-9]+),/g,
    )].map((match) => match.slice(1));

    assert.deepEqual(mappings, expectedRegistry);
    assert.equal(mappings.length, 19);
    assert.equal(mappings.filter(([family]) => family === "corporate").length, 10);
    assert.equal(mappings.filter(([family]) => family === "approval").length, 9);
    assert.equal(new Set(mappings.map(([family, , slug]) => `${family}/${slug}`)).size, 19);
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

  it("keeps categorized Corporate resolution exact and rejects invalid or wrong categories", () => {
    const routes = source("frontend/lib/service-routes.ts");
    const categorized = routes.slice(
      routes.indexOf("export const getCategorizedServicePage"),
      routes.indexOf("export type LegacyServiceResolution"),
    );
    const corporatePage = source(
      "frontend/app/corporate/[category]/[slug]/page.tsx",
    );

    assert.match(
      routes,
      /category\.family === family && category\.categorySlug === categorySlug/,
    );
    assert.match(
      routes,
      /\(family === "approval" \|\| segments\.length === 1\)/,
    );
    assert.match(
      categorized,
      /if \(!category \|\| !isValidServicePath\(family, servicePath\)\) \{\s+return null;/,
    );
    assert.match(categorized, /const content = await category\.loadPage\(servicePath\)/);
    assert.doesNotMatch(categorized, /resolveLegacyService/);
    assert.match(
      corporatePage,
      /getCategorizedServicePage\("corporate", category, slug\)/,
    );
    assert.match(corporatePage, /if \(!resolved\) \{\s+notFound\(\);/);
    assert.match(
      corporatePage,
      /category: entry\.categorySlug,\s+slug: entry\.servicePath/,
    );
  });

  it("preserves multi-segment Approval paths without cross-category fallback", () => {
    const routes = source("frontend/lib/service-routes.ts");
    const approvalResolver = routes.slice(
      routes.indexOf("export const resolveApprovalService"),
    );
    const approvalPage = source("frontend/app/approval/[...slug]/page.tsx");

    assert.match(
      approvalPage,
      /slug: \[entry\.categorySlug, \.\.\.entry\.servicePath\.split\("\/"\)\]/,
    );
    assert.match(approvalPage, /resolveApprovalService\(slug\.join\("\/"\)\)/);
    assert.match(
      approvalResolver,
      /const \[possibleCategorySlug, \.\.\.serviceSegments\] = routePath\.split\("\/"\)/,
    );
    assert.match(
      approvalResolver,
      /const servicePath = serviceSegments\.join\("\/"\);\s+const content = await category\.loadPage\(servicePath\)/,
    );
    assert.match(
      approvalResolver,
      /resolveLegacyService\("approval", routePath\)/,
    );
    assert.doesNotMatch(
      approvalResolver,
      /resolveLegacyService\("approval", servicePath\)/,
    );
    assert.match(
      routes,
      /return `\/\$\{category\.family\}\/\$\{category\.categorySlug\}\/\$\{servicePath\}`/,
    );
  });

  it("fails closed for ambiguous and unknown legacy paths and permanently redirects exact matches", () => {
    const routes = source("frontend/lib/service-routes.ts");
    const legacyResolver = routes.slice(
      routes.indexOf("export const resolveLegacyService"),
      routes.indexOf("export type ApprovalServiceResolution"),
    );
    const corporateLegacy = source("frontend/app/corporate/[category]/page.tsx");
    const approvalPage = source("frontend/app/approval/[...slug]/page.tsx");

    assert.match(legacyResolver, /if \(matches\.length === 1\)/);
    assert.match(
      legacyResolver,
      /return \{ kind: matches\.length \? "ambiguous" : "not-found" \}/,
    );
    assert.match(
      corporateLegacy,
      /if \(resolution\.kind !== "found"\) \{\s+notFound\(\);\s+\}\s+permanentRedirect\(resolution\.canonicalPath\)/,
    );
    assert.match(
      approvalPage,
      /if \(resolution\.kind === "redirect"\) \{\s+permanentRedirect\(resolution\.canonicalPath\);/,
    );
    assert.match(corporateLegacy, /import \{ notFound, permanentRedirect \}/);
    assert.match(approvalPage, /import \{ notFound, permanentRedirect \}/);
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

  it("forces canonical service metadata to the categorized pathname", () => {
    const previousSiteUrl = process.env.SITE_URL;
    process.env.SITE_URL = "https://www.jr.test";

    try {
      const seo = {
        title: "Service",
        description: "Service description",
        canonicalUrl: "https://legacy.example/corporate/legacy-service",
      };
      const canonicalPath =
        "/corporate/company-registration/private-limited-company-registration-consultant";

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
      "frontend/app/corporate/[category]/[slug]/page.tsx",
      "frontend/app/approval/[...slug]/page.tsx",
    ]) {
      assert.match(
        source(route),
        /pageMetadata\([\s\S]*?\.canonicalPath, \{\s+forcePathnameCanonical: true,/,
      );
    }
  });

  it("publishes canonical categorized service URLs only in the sitemap", () => {
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
