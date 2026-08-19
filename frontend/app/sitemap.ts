import type { MetadataRoute } from "next";

import { companyRegistrationSlugs } from "@/data/company-registration-pages-fallback";
import {
  getFssaiServiceSlugs,
  getBureauIndianStandardsSlugs,
  getFundRaisingSlugs,
  getGovernmentLicenseCertificationSlugs,
  getIprServiceSlugs,
  getImportExportServiceSlugs,
  getLabourComplianceSlugs,
  getMcaServiceSlugs,
  getSebiBusinessRegistrationSlugs,
  getTaxAccountingSlugs,
  getPollutionAdvisorySlugs,
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
    ...[...new Set([...bureauIndianStandardsSlugs, ...pollutionAdvisorySlugs])].map(
      (routePath) => ({
        url: new URL(`/approval/${routePath}`, siteUrl).toString(),
        changeFrequency: "monthly" as const,
        priority: 0.75,
      }),
    ),
  ];
}
