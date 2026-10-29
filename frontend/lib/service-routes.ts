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
import {
  serviceRouteDefinitions,
  type FixedServiceContentType,
  type ServiceRouteFamily,
} from "@/lib/service-route-config";
import { publicServiceSlug, uniqueServicePath, uniquePublicLinks } from "@/lib/public-paths";
import type { CompanyRegistrationPageContent } from "@/lib/types";

export type { FixedServiceContentType, ServiceRouteFamily } from "@/lib/service-route-config";

export type ServiceRouteCategory = {
  family: ServiceRouteFamily;
  contentType: FixedServiceContentType;
  categorySlug: string;
  categoryLabel: string;
  loadPage: (servicePath: string) => Promise<CompanyRegistrationPageContent | null>;
  loadSlugs: () => Promise<string[]>;
};

const serviceLoaders = {
  "company-registration-page": { loadPage: getCompanyRegistrationPage, loadSlugs: getCompanyRegistrationSlugs },
  "mca-service-page": { loadPage: getMcaServicePage, loadSlugs: getMcaServiceSlugs },
  "import-export-service-page": { loadPage: getImportExportServicePage, loadSlugs: getImportExportServiceSlugs },
  "government-license-certification-page": { loadPage: getGovernmentLicenseCertificationPage, loadSlugs: getGovernmentLicenseCertificationSlugs },
  "ipr-service-page": { loadPage: getIprServicePage, loadSlugs: getIprServiceSlugs },
  "fssai-service-page": { loadPage: getFssaiServicePage, loadSlugs: getFssaiServiceSlugs },
  "sebi-business-registration-page": { loadPage: getSebiBusinessRegistrationPage, loadSlugs: getSebiBusinessRegistrationSlugs },
  "tax-accounting-page": { loadPage: getTaxAccountingPage, loadSlugs: getTaxAccountingSlugs },
  "labour-compliance-page": { loadPage: getLabourCompliancePage, loadSlugs: getLabourComplianceSlugs },
  "fund-raising-page": { loadPage: getFundRaisingPage, loadSlugs: getFundRaisingSlugs },
  "bureau-indian-standards-page": { loadPage: getBureauIndianStandardsPage, loadSlugs: getBureauIndianStandardsSlugs },
  "pollution-advisory-page": { loadPage: getPollutionAdvisoryPage, loadSlugs: getPollutionAdvisorySlugs },
  "telecommunication-engineering-centre-page": { loadPage: getTelecommunicationEngineeringCentrePage, loadSlugs: getTelecommunicationEngineeringCentreSlugs },
  "wireless-planning-coordination-page": { loadPage: getWirelessPlanningCoordinationPage, loadSlugs: getWirelessPlanningCoordinationSlugs },
  "bureau-energy-efficiency-page": { loadPage: getBureauEnergyEfficiencyPage, loadSlugs: getBureauEnergyEfficiencySlugs },
  "cdsco-registration-page": { loadPage: getCdscoRegistrationPage, loadSlugs: getCdscoRegistrationSlugs },
  "aerb-approval-page": { loadPage: getAerbApprovalPage, loadSlugs: getAerbApprovalSlugs },
  "lmpc-certification-page": { loadPage: getLmpcCertificationPage, loadSlugs: getLmpcCertificationSlugs },
  "stqc-page": { loadPage: getStqcPage, loadSlugs: getStqcSlugs },
} satisfies Record<FixedServiceContentType, Pick<ServiceRouteCategory, "loadPage" | "loadSlugs">>;

export const serviceRouteRegistry: ServiceRouteCategory[] = serviceRouteDefinitions.map(
  (category) => ({ ...category, ...serviceLoaders[category.contentType] }),
);

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
  return `/${category.family}/${publicServiceSlug(servicePath)}`;
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

  return uniquePublicLinks(categoryEntries.flat());
}

export type ServiceSitemapEntry = ServiceRouteEntry & {
  updatedAt?: string;
};

export async function getServiceSitemapEntries(
  family: ServiceRouteFamily,
): Promise<ServiceSitemapEntry[]> {
  const routeEntries = await getServiceRouteEntries(family);
  const sitemapEntries = await Promise.all(
    routeEntries.map(async (entry) => {
      const category = getServiceRouteCategory(family, entry.categorySlug);
      const content = category ? await category.loadPage(entry.servicePath) : null;

      if (!content || content.seo.noIndex) {
        return null;
      }

      return {
        ...entry,
        ...(content.updatedAt ? { updatedAt: content.updatedAt } : {}),
      };
    }),
  );

  return sitemapEntries.filter((entry): entry is ServiceSitemapEntry => entry !== null);
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

  const entries = await getServiceRouteEntries(family);
  if (!entries.some((entry) => entry.categorySlug === categorySlug && entry.servicePath === servicePath)) {
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

/** Resolve a direct /corporate/slug or /approval/slug across that family's collections. */
export const getPublicServicePage = cache(async function getPublicServicePage(
  family: ServiceRouteFamily,
  slug: string,
): Promise<CategorizedServicePage | null> {
  if (!isValidServicePath("corporate", slug)) return null;
  const entry = (await getServiceRouteEntries(family)).find((candidate) => publicServiceSlug(candidate.servicePath) === slug);
  return entry ? getCategorizedServicePage(family, entry.categorySlug, entry.servicePath) : null;
});

/** Compatibility lookup for the former /category/slug URLs. */
export const getCategorizedPublicServicePage = cache(async function getCategorizedPublicServicePage(
  categorySlug: string,
  slug: string,
): Promise<CategorizedServicePage | null> {
  const category = serviceRouteRegistry.find((entry) => entry.categorySlug === categorySlug);
  if (!category || !isValidServicePath("corporate", slug)) return null;

  const paths = (await category.loadSlugs()).filter((path) => isValidServicePath(category.family, path));
  const servicePath = uniqueServicePath(paths, slug);
  return servicePath ? getCategorizedServicePage(category.family, categorySlug, servicePath) : null;
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
  if (candidateCategories.length > 1) return { kind: "ambiguous" };
  const matches = (
    await Promise.all(
      candidateCategories.map(async (category) => {
        const resolved = await getCategorizedServicePage(family, category.categorySlug, servicePath);
        return resolved
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

  if (!routePath.includes("/")) {
    const resolved = await getPublicServicePage("approval", routePath);
    return resolved ? { kind: "canonical", ...resolved } : { kind: "not-found" };
  }

  const [possibleCategorySlug, ...serviceSegments] = routePath.split("/");
  const category = getServiceRouteCategory("approval", possibleCategorySlug);

  if (category) {
    if (!serviceSegments.length) {
      return { kind: "not-found" };
    }

    const servicePath = serviceSegments.join("/");
    const resolved = await getCategorizedServicePage("approval", category.categorySlug, servicePath);
    if (resolved) {
      return {
        kind: "redirect",
        canonicalPath: resolved.canonicalPath,
      };
    }
  }

  const legacy = await resolveLegacyService("approval", routePath);
  if (legacy.kind === "found") {
    return { kind: "redirect", canonicalPath: legacy.canonicalPath };
  }

  return { kind: legacy.kind };
});
