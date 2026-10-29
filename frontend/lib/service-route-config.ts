/** Public category identifiers are shared by routing, link normalization and lead routing. */
export const serviceRouteDefinitions = [
  { family: "corporate", contentType: "company-registration-page", categorySlug: "company-registration", categoryLabel: "Company Registration" },
  { family: "corporate", contentType: "mca-service-page", categorySlug: "mca-services", categoryLabel: "MCA Services" },
  { family: "corporate", contentType: "import-export-service-page", categorySlug: "import-export", categoryLabel: "Import Export" },
  { family: "corporate", contentType: "government-license-certification-page", categorySlug: "government-license-certification", categoryLabel: "Government License & Certification" },
  { family: "corporate", contentType: "ipr-service-page", categorySlug: "ipr-services", categoryLabel: "IPR Services" },
  { family: "corporate", contentType: "fssai-service-page", categorySlug: "fssai", categoryLabel: "FSSAI" },
  { family: "corporate", contentType: "sebi-business-registration-page", categorySlug: "sebi-business-registration", categoryLabel: "SEBI Business Registration" },
  { family: "corporate", contentType: "tax-accounting-page", categorySlug: "tax-accounting", categoryLabel: "Tax & Accounting" },
  { family: "corporate", contentType: "labour-compliance-page", categorySlug: "labour-compliance", categoryLabel: "Labour Compliance" },
  { family: "corporate", contentType: "fund-raising-page", categorySlug: "fund-raising", categoryLabel: "Fund Raising" },
  { family: "approval", contentType: "bureau-indian-standards-page", categorySlug: "bureau-indian-standards", categoryLabel: "Bureau of Indian Standards" },
  { family: "approval", contentType: "pollution-advisory-page", categorySlug: "pollution-advisory", categoryLabel: "Pollution Advisory" },
  { family: "approval", contentType: "telecommunication-engineering-centre-page", categorySlug: "telecommunication-engineering-centre", categoryLabel: "Telecommunication Engineering Centre" },
  { family: "approval", contentType: "wireless-planning-coordination-page", categorySlug: "wireless-planning-coordination", categoryLabel: "Wireless Planning and Coordination" },
  { family: "approval", contentType: "bureau-energy-efficiency-page", categorySlug: "bureau-energy-efficiency", categoryLabel: "Bureau of Energy Efficiency" },
  { family: "approval", contentType: "cdsco-registration-page", categorySlug: "cdsco-registration", categoryLabel: "CDSCO Registration" },
  { family: "approval", contentType: "aerb-approval-page", categorySlug: "aerb-approval", categoryLabel: "AERB Approval" },
  { family: "approval", contentType: "lmpc-certification-page", categorySlug: "lmpc-certification", categoryLabel: "LMPC Certification" },
  { family: "approval", contentType: "stqc-page", categorySlug: "stqc", categoryLabel: "STQC" },
] as const;

export type ServiceRouteDefinition = (typeof serviceRouteDefinitions)[number];
export type ServiceRouteFamily = ServiceRouteDefinition["family"];
export type FixedServiceContentType = ServiceRouteDefinition["contentType"];

export function serviceCategory(categorySlug: string): ServiceRouteDefinition | undefined {
  return serviceRouteDefinitions.find((category) => category.categorySlug === categorySlug);
}

/** Country identities live under /global, so static page/category names are allowed. */
export function isPublicCountrySlug(country: string): boolean {
  return /^[A-Za-z0-9-_.~]+$/.test(country) && country !== "." && country !== "..";
}
