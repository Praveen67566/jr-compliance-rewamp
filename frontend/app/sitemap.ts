import type { MetadataRoute } from "next";

import { companyRegistrationSlugs } from "@/data/company-registration-pages-fallback";
import { legalPageSlugs } from "@/data/legal-pages-fallback";
import {
  getAerbApprovalSlugs,
  getBureauEnergyEfficiencySlugs,
  getFssaiServiceSlugs,
  getBureauIndianStandardsSlugs,
  getCdscoRegistrationSlugs,
  getFundRaisingSlugs,
  getGovernmentLicenseCertificationSlugs,
  getGlobalCertificatePaths,
  getGlobalCountrySlugs,
  getIprServiceSlugs,
  getImportExportServiceSlugs,
  getLabourComplianceSlugs,
  getLmpcCertificationSlugs,
  getMcaServiceSlugs,
  getSebiBusinessRegistrationSlugs,
  getTaxAccountingSlugs,
  getPollutionAdvisorySlugs,
  getStqcSlugs,
  getTelecommunicationEngineeringCentreSlugs,
  getWirelessPlanningCoordinationSlugs,
} from "@/lib/content";
import { publicSiteUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = publicSiteUrl();
  const [
    mcaServiceSlugs,
    importExportServiceSlugs,
    governmentLicenseCertificationSlugs,
    iprServiceSlugs,
    fssaiServiceSlugs,
    sebiBusinessRegistrationSlugs,
    taxAccountingSlugs,
    labourComplianceSlugs,
    fundRaisingSlugs,
    bureauIndianStandardsSlugs,
    pollutionAdvisorySlugs,
    telecommunicationEngineeringCentreSlugs,
    wirelessPlanningCoordinationSlugs,
    bureauEnergyEfficiencySlugs,
    cdscoRegistrationSlugs,
    aerbApprovalSlugs,
    lmpcCertificationSlugs,
    stqcSlugs,
    globalCountrySlugs,
    globalCertificatePaths,
  ] = await Promise.all([
    getMcaServiceSlugs(),
    getImportExportServiceSlugs(),
    getGovernmentLicenseCertificationSlugs(),
    getIprServiceSlugs(),
    getFssaiServiceSlugs(),
    getSebiBusinessRegistrationSlugs(),
    getTaxAccountingSlugs(),
    getLabourComplianceSlugs(),
    getFundRaisingSlugs(),
    getBureauIndianStandardsSlugs(),
    getPollutionAdvisorySlugs(),
    getTelecommunicationEngineeringCentreSlugs(),
    getWirelessPlanningCoordinationSlugs(),
    getBureauEnergyEfficiencySlugs(),
    getCdscoRegistrationSlugs(),
    getAerbApprovalSlugs(),
    getLmpcCertificationSlugs(),
    getStqcSlugs(),
    getGlobalCountrySlugs(),
    getGlobalCertificatePaths(),
  ]);

  return [
    {
      url: new URL("/", siteUrl).toString(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: new URL("/about-us", siteUrl).toString(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: new URL("/careers", siteUrl).toString(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: new URL("/contact-us", siteUrl).toString(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...legalPageSlugs.map((slug) => ({
      url: new URL(`/${slug}`, siteUrl).toString(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    ...[
      ...new Set([
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
      ]),
    ].map((slug) => ({
      url: new URL(`/corporate/${slug}`, siteUrl).toString(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...[
      ...new Set([
        ...bureauIndianStandardsSlugs,
        ...pollutionAdvisorySlugs,
        ...telecommunicationEngineeringCentreSlugs,
        ...wirelessPlanningCoordinationSlugs,
        ...bureauEnergyEfficiencySlugs,
        ...cdscoRegistrationSlugs,
        ...aerbApprovalSlugs,
        ...lmpcCertificationSlugs,
        ...stqcSlugs,
      ]),
    ].map((routePath) => ({
      url: new URL(`/approval/${routePath}`, siteUrl).toString(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...globalCountrySlugs.map((country) => ({
      url: new URL(`/globals/${country}`, siteUrl).toString(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...globalCertificatePaths.map(({ country, slug }) => ({
      url: new URL(`/globals/${country}/${slug}`, siteUrl).toString(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
