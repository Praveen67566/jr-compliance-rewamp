import { cache } from "react";

import {
  getAerbApprovalPage,
  getAerbApprovalSlugs,
  getBureauEnergyEfficiencyPage,
  getBureauEnergyEfficiencySlugs,
  getBureauIndianStandardsPage,
  getBureauIndianStandardsSlugs,
  getCdscoRegistrationPage,
  getCdscoRegistrationSlugs,
  getCompanyRegistrationPage,
  getCompanyRegistrationSlugs,
  getFssaiServicePage,
  getFssaiServiceSlugs,
  getFundRaisingPage,
  getFundRaisingSlugs,
  getGovernmentLicenseCertificationPage,
  getGovernmentLicenseCertificationSlugs,
  getImportExportServicePage,
  getImportExportServiceSlugs,
  getIprServicePage,
  getIprServiceSlugs,
  getLabourCompliancePage,
  getLabourComplianceSlugs,
  getLmpcCertificationPage,
  getLmpcCertificationSlugs,
  getMcaServicePage,
  getMcaServiceSlugs,
  getPollutionAdvisoryPage,
  getPollutionAdvisorySlugs,
  getSebiBusinessRegistrationPage,
  getSebiBusinessRegistrationSlugs,
  getStqcPage,
  getStqcSlugs,
  getTaxAccountingPage,
  getTaxAccountingSlugs,
  getTelecommunicationEngineeringCentrePage,
  getTelecommunicationEngineeringCentreSlugs,
  getWirelessPlanningCoordinationPage,
  getWirelessPlanningCoordinationSlugs,
} from "@/lib/content";
import type { CompanyRegistrationPageContent } from "@/lib/types";

export type ServiceRouteFamily = "corporate" | "approval";

export type FixedServiceContentType =
  | "company-registration-page"
  | "mca-service-page"
  | "import-export-service-page"
  | "government-license-certification-page"
  | "ipr-service-page"
  | "fssai-service-page"
  | "sebi-business-registration-page"
  | "tax-accounting-page"
  | "labour-compliance-page"
  | "fund-raising-page"
  | "bureau-indian-standards-page"
  | "pollution-advisory-page"
  | "telecommunication-engineering-centre-page"
  | "wireless-planning-coordination-page"
  | "bureau-energy-efficiency-page"
  | "cdsco-registration-page"
  | "aerb-approval-page"
  | "lmpc-certification-page"
  | "stqc-page";

export type ServiceRouteCategory = {
  family: ServiceRouteFamily;
  contentType: FixedServiceContentType;
  categorySlug: string;
  categoryLabel: string;
  loadPage: (servicePath: string) => Promise<CompanyRegistrationPageContent | null>;
  loadSlugs: () => Promise<string[]>;
};

export const serviceRouteRegistry = [
  {
    family: "corporate",
    contentType: "company-registration-page",
    categorySlug: "company-registration",
    categoryLabel: "Company Registration",
    loadPage: getCompanyRegistrationPage,
    loadSlugs: getCompanyRegistrationSlugs,
  },
  {
    family: "corporate",
    contentType: "mca-service-page",
    categorySlug: "mca-services",
    categoryLabel: "MCA Services",
    loadPage: getMcaServicePage,
    loadSlugs: getMcaServiceSlugs,
  },
  {
    family: "corporate",
    contentType: "import-export-service-page",
    categorySlug: "import-export",
    categoryLabel: "Import Export",
    loadPage: getImportExportServicePage,
    loadSlugs: getImportExportServiceSlugs,
  },
  {
    family: "corporate",
    contentType: "government-license-certification-page",
    categorySlug: "government-license-certification",
    categoryLabel: "Government License & Certification",
    loadPage: getGovernmentLicenseCertificationPage,
    loadSlugs: getGovernmentLicenseCertificationSlugs,
  },
  {
    family: "corporate",
    contentType: "ipr-service-page",
    categorySlug: "ipr-services",
    categoryLabel: "IPR Services",
    loadPage: getIprServicePage,
    loadSlugs: getIprServiceSlugs,
  },
  {
    family: "corporate",
    contentType: "fssai-service-page",
    categorySlug: "fssai",
    categoryLabel: "FSSAI",
    loadPage: getFssaiServicePage,
    loadSlugs: getFssaiServiceSlugs,
  },
  {
    family: "corporate",
    contentType: "sebi-business-registration-page",
    categorySlug: "sebi-business-registration",
    categoryLabel: "SEBI Business Registration",
    loadPage: getSebiBusinessRegistrationPage,
    loadSlugs: getSebiBusinessRegistrationSlugs,
  },
  {
    family: "corporate",
    contentType: "tax-accounting-page",
    categorySlug: "tax-accounting",
    categoryLabel: "Tax & Accounting",
    loadPage: getTaxAccountingPage,
    loadSlugs: getTaxAccountingSlugs,
  },
  {
    family: "corporate",
    contentType: "labour-compliance-page",
    categorySlug: "labour-compliance",
    categoryLabel: "Labour Compliance",
    loadPage: getLabourCompliancePage,
    loadSlugs: getLabourComplianceSlugs,
  },
  {
    family: "corporate",
    contentType: "fund-raising-page",
    categorySlug: "fund-raising",
    categoryLabel: "Fund Raising",
    loadPage: getFundRaisingPage,
    loadSlugs: getFundRaisingSlugs,
  },
  {
    family: "approval",
    contentType: "bureau-indian-standards-page",
    categorySlug: "bureau-indian-standards",
    categoryLabel: "Bureau of Indian Standards",
    loadPage: getBureauIndianStandardsPage,
    loadSlugs: getBureauIndianStandardsSlugs,
  },
  {
    family: "approval",
    contentType: "pollution-advisory-page",
    categorySlug: "pollution-advisory",
    categoryLabel: "Pollution Advisory",
    loadPage: getPollutionAdvisoryPage,
    loadSlugs: getPollutionAdvisorySlugs,
  },
  {
    family: "approval",
    contentType: "telecommunication-engineering-centre-page",
    categorySlug: "telecommunication-engineering-centre",
    categoryLabel: "Telecommunication Engineering Centre",
    loadPage: getTelecommunicationEngineeringCentrePage,
    loadSlugs: getTelecommunicationEngineeringCentreSlugs,
  },
  {
    family: "approval",
    contentType: "wireless-planning-coordination-page",
    categorySlug: "wireless-planning-coordination",
    categoryLabel: "Wireless Planning and Coordination",
    loadPage: getWirelessPlanningCoordinationPage,
    loadSlugs: getWirelessPlanningCoordinationSlugs,
  },
  {
    family: "approval",
    contentType: "bureau-energy-efficiency-page",
    categorySlug: "bureau-energy-efficiency",
    categoryLabel: "Bureau of Energy Efficiency",
    loadPage: getBureauEnergyEfficiencyPage,
    loadSlugs: getBureauEnergyEfficiencySlugs,
  },
  {
    family: "approval",
    contentType: "cdsco-registration-page",
    categorySlug: "cdsco-registration",
    categoryLabel: "CDSCO Registration",
    loadPage: getCdscoRegistrationPage,
    loadSlugs: getCdscoRegistrationSlugs,
  },
  {
    family: "approval",
    contentType: "aerb-approval-page",
    categorySlug: "aerb-approval",
    categoryLabel: "AERB Approval",
    loadPage: getAerbApprovalPage,
    loadSlugs: getAerbApprovalSlugs,
  },
  {
    family: "approval",
    contentType: "lmpc-certification-page",
    categorySlug: "lmpc-certification",
    categoryLabel: "LMPC Certification",
    loadPage: getLmpcCertificationPage,
    loadSlugs: getLmpcCertificationSlugs,
  },
  {
    family: "approval",
    contentType: "stqc-page",
    categorySlug: "stqc",
    categoryLabel: "STQC",
    loadPage: getStqcPage,
    loadSlugs: getStqcSlugs,
  },
] as const satisfies readonly ServiceRouteCategory[];

const servicePathSegmentPattern = /^[A-Za-z0-9-_.~]+$/;

export function getServiceRouteCategories(family: ServiceRouteFamily): ServiceRouteCategory[] {
  return serviceRouteRegistry.filter((category) => category.family === family);
}

export function getServiceRouteCategory(
  family: ServiceRouteFamily,
  categorySlug: string,
): ServiceRouteCategory | undefined {
  return serviceRouteRegistry.find(
    (category) => category.family === family && category.categorySlug === categorySlug,
  );
}

export function serviceFamilyLabel(family: ServiceRouteFamily): "Corporate" | "Approval" {
  return family === "corporate" ? "Corporate" : "Approval";
}

export function isValidServicePath(family: ServiceRouteFamily, servicePath: string): boolean {
  const segments = servicePath.split("/");

  return (
    Boolean(servicePath) &&
    (family === "approval" || segments.length === 1) &&
    segments.every((segment) => servicePathSegmentPattern.test(segment))
  );
}

export function serviceCanonicalPath(
  category: Pick<ServiceRouteCategory, "family" | "categorySlug">,
  servicePath: string,
): string {
  return `/${category.family}/${category.categorySlug}/${servicePath}`;
}

export type ServiceRouteEntry = {
  family: ServiceRouteFamily;
  contentType: FixedServiceContentType;
  categorySlug: string;
  categoryLabel: string;
  servicePath: string;
  canonicalPath: string;
};

export async function getServiceRouteEntries(
  family: ServiceRouteFamily,
): Promise<ServiceRouteEntry[]> {
  const categoryEntries = await Promise.all(
    getServiceRouteCategories(family).map(async (category) => {
      const servicePaths = [...new Set(await category.loadSlugs())].filter((servicePath) =>
        isValidServicePath(family, servicePath),
      );

      return servicePaths.map((servicePath) => ({
        family,
        contentType: category.contentType,
        categorySlug: category.categorySlug,
        categoryLabel: category.categoryLabel,
        servicePath,
        canonicalPath: serviceCanonicalPath(category, servicePath),
      }));
    }),
  );

  return [
    ...new Map(
      categoryEntries.flat().map((entry) => [entry.canonicalPath, entry] as const),
    ).values(),
  ];
}

export type CategorizedServicePage = {
  category: ServiceRouteCategory;
  content: CompanyRegistrationPageContent;
  servicePath: string;
  canonicalPath: string;
};

export const getCategorizedServicePage = cache(async function getCategorizedServicePage(
  family: ServiceRouteFamily,
  categorySlug: string,
  servicePath: string,
): Promise<CategorizedServicePage | null> {
  const category = getServiceRouteCategory(family, categorySlug);
  if (!category || !isValidServicePath(family, servicePath)) {
    return null;
  }

  const content = await category.loadPage(servicePath);
  return content
    ? {
        category,
        content,
        servicePath,
        canonicalPath: serviceCanonicalPath(category, servicePath),
      }
    : null;
});

type LegacyServiceMatch = {
  category: ServiceRouteCategory;
  servicePath: string;
  canonicalPath: string;
};

export type LegacyServiceResolution =
  | ({ kind: "found" } & LegacyServiceMatch)
  | { kind: "not-found" | "ambiguous" };

export const resolveLegacyService = cache(async function resolveLegacyService(
  family: ServiceRouteFamily,
  servicePath: string,
): Promise<LegacyServiceResolution> {
  if (!isValidServicePath(family, servicePath)) {
    return { kind: "not-found" };
  }

  const candidateCategories = (
    await Promise.all(
      getServiceRouteCategories(family).map(async (category) => {
        const slugs = await category.loadSlugs();
        return slugs.includes(servicePath) ? category : null;
      }),
    )
  ).filter((category): category is ServiceRouteCategory => category !== null);
  const matches = (
    await Promise.all(
      candidateCategories.map(async (category) => {
        const content = await category.loadPage(servicePath);
        return content
          ? {
              category,
              servicePath,
              canonicalPath: serviceCanonicalPath(category, servicePath),
            }
          : null;
      }),
    )
  ).filter((match): match is LegacyServiceMatch => match !== null);

  if (matches.length === 1) {
    return { kind: "found", ...matches[0] };
  }

  return { kind: matches.length ? "ambiguous" : "not-found" };
});

export type ApprovalServiceResolution =
  | ({ kind: "canonical" } & CategorizedServicePage)
  | { kind: "redirect"; canonicalPath: string }
  | { kind: "not-found" | "ambiguous" };

export const resolveApprovalService = cache(async function resolveApprovalService(
  routePath: string,
): Promise<ApprovalServiceResolution> {
  if (!isValidServicePath("approval", routePath)) {
    return { kind: "not-found" };
  }

  const [possibleCategorySlug, ...serviceSegments] = routePath.split("/");
  const category = getServiceRouteCategory("approval", possibleCategorySlug);

  if (category) {
    if (!serviceSegments.length) {
      return { kind: "not-found" };
    }

    const servicePath = serviceSegments.join("/");
    const content = await category.loadPage(servicePath);
    if (content) {
      return {
        kind: "canonical",
        category,
        content,
        servicePath,
        canonicalPath: serviceCanonicalPath(category, servicePath),
      };
    }
  }

  const legacy = await resolveLegacyService("approval", routePath);
  if (legacy.kind === "found") {
    return { kind: "redirect", canonicalPath: legacy.canonicalPath };
  }

  return { kind: legacy.kind };
});
