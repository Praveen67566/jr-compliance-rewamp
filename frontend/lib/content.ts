import { cache } from "react";

import { fallbackAboutPage } from "@/data/about-page-fallback";
import { fallbackCareersPage } from "@/data/careers-page-fallback";
import {
  bureauIndianStandardsFallback,
  bureauIndianStandardsSlugs,
} from "@/data/bureau-indian-standards-pages-fallback";
import { companyRegistrationFallback } from "@/data/company-registration-pages-fallback";
import { fallbackContactPage } from "@/data/contact-page-fallback";
import {
  fssaiServiceFallback,
  fssaiServiceSlugs,
} from "@/data/fssai-service-pages-fallback";
import {
  fundRaisingFallback,
  fundRaisingSlugs,
} from "@/data/fund-raising-pages-fallback";
import {
  governmentLicenseCertificationFallback,
  governmentLicenseCertificationSlugs,
} from "@/data/government-license-certification-pages-fallback";
import { fallbackHomepage } from "@/data/homepage-fallback";
import {
  iprServiceFallback,
  iprServiceSlugs,
} from "@/data/ipr-service-pages-fallback";
import {
  importExportServiceFallback,
  importExportServiceSlugs,
} from "@/data/import-export-service-pages-fallback";
import {
  labourComplianceFallback,
  labourComplianceSlugs,
} from "@/data/labour-compliance-pages-fallback";
import { legalPageFallback } from "@/data/legal-pages-fallback";
import {
  pollutionAdvisoryFallback,
  pollutionAdvisorySlugs,
} from "@/data/pollution-advisory-pages-fallback";
import { mcaServiceFallback, mcaServiceSlugs } from "@/data/mca-service-pages-fallback";
import {
  sebiBusinessRegistrationFallback,
  sebiBusinessRegistrationSlugs,
} from "@/data/sebi-business-registration-pages-fallback";
import {
  taxAccountingFallback,
  taxAccountingSlugs,
} from "@/data/tax-accounting-pages-fallback";
import {
  getAerbApprovalPageFromStrapi,
  getAerbApprovalSlugsFromStrapi,
  getAboutPageFromStrapi,
  getCareersPageFromStrapi,
  getBureauEnergyEfficiencyPageFromStrapi,
  getBureauEnergyEfficiencySlugsFromStrapi,
  getBureauIndianStandardsPageFromStrapi,
  getBureauIndianStandardsSlugsFromStrapi,
  getCdscoRegistrationPageFromStrapi,
  getCdscoRegistrationSlugsFromStrapi,
  getCompanyRegistrationPageFromStrapi,
  getContactPageFromStrapi,
  getFssaiServicePageFromStrapi,
  getFssaiServiceSlugsFromStrapi,
  getFundRaisingPageFromStrapi,
  getFundRaisingSlugsFromStrapi,
  getGovernmentLicenseCertificationPageFromStrapi,
  getGovernmentLicenseCertificationSlugsFromStrapi,
  getGlobalCertificatePageFromStrapi,
  getGlobalCertificatePathsFromStrapi,
  getGlobalCountryPageFromStrapi,
  getGlobalCountrySlugsFromStrapi,
  getHomepageFromStrapi,
  getIprServicePageFromStrapi,
  getIprServiceSlugsFromStrapi,
  getImportExportServicePageFromStrapi,
  getImportExportServiceSlugsFromStrapi,
  getLabourCompliancePageFromStrapi,
  getLabourComplianceSlugsFromStrapi,
  getLegalPageFromStrapi,
  getLmpcCertificationPageFromStrapi,
  getLmpcCertificationSlugsFromStrapi,
  getPollutionAdvisoryPageFromStrapi,
  getPollutionAdvisorySlugsFromStrapi,
  getMcaServicePageFromStrapi,
  getMcaServiceSlugsFromStrapi,
  getSebiBusinessRegistrationPageFromStrapi,
  getSebiBusinessRegistrationSlugsFromStrapi,
  getStqcPageFromStrapi,
  getStqcSlugsFromStrapi,
  getTaxAccountingPageFromStrapi,
  getTaxAccountingSlugsFromStrapi,
  getTelecommunicationEngineeringCentrePageFromStrapi,
  getTelecommunicationEngineeringCentreSlugsFromStrapi,
  getWirelessPlanningCoordinationPageFromStrapi,
  getWirelessPlanningCoordinationSlugsFromStrapi,
} from "@/lib/strapi";
import type {
  AboutPageContent,
  AerbApprovalPageContent,
  BureauEnergyEfficiencyPageContent,
  CareersPageContent,
  BureauIndianStandardsPageContent,
  CdscoRegistrationPageContent,
  CompanyRegistrationPageContent,
  ContactPageContent,
  FssaiServicePageContent,
  FundRaisingPageContent,
  GovernmentLicenseCertificationPageContent,
  GlobalCertificatePageContent,
  GlobalCountryPageContent,
  HomepageContent,
  ImportExportServicePageContent,
  IprServicePageContent,
  LabourCompliancePageContent,
  LegalPageContent,
  LegalPageSlug,
  LmpcCertificationPageContent,
  PollutionAdvisoryPageContent,
  McaServicePageContent,
  SebiBusinessRegistrationPageContent,
  StqcPageContent,
  TaxAccountingPageContent,
  TelecommunicationEngineeringCentrePageContent,
  WirelessPlanningCoordinationPageContent,
} from "@/lib/types";

export const getHomepage = cache(async function getHomepage(): Promise<HomepageContent> {
  return (await getHomepageFromStrapi(fallbackHomepage)) ?? fallbackHomepage;
});

export const getAboutPage = cache(async function getAboutPage(): Promise<AboutPageContent> {
  return (await getAboutPageFromStrapi(fallbackAboutPage)) ?? fallbackAboutPage;
});

export const getCareersPage = cache(async function getCareersPage(): Promise<CareersPageContent> {
  return (await getCareersPageFromStrapi(fallbackCareersPage)) ?? fallbackCareersPage;
});

export const getContactPage = cache(async function getContactPage(): Promise<ContactPageContent> {
  return (await getContactPageFromStrapi(fallbackContactPage)) ?? fallbackContactPage;
});

export const getLegalPage = cache(async function getLegalPage(
  slug: LegalPageSlug,
): Promise<LegalPageContent> {
  const page = legalPageFallback(slug);
  if (!page) {
    // LegalPageSlug is fixed, so this protects runtime JavaScript callers only.
    throw new Error(`Missing legal-page fallback for ${slug}.`);
  }

  const fallback: LegalPageContent = {
    ...page,
    site: fallbackHomepage.site,
    navigation: fallbackHomepage.navigation,
    footer: fallbackHomepage.footer,
  };

  return (await getLegalPageFromStrapi(slug, fallback)) ?? fallback;
});

export const getCompanyRegistrationPage = cache(async function getCompanyRegistrationPage(
  slug: string,
): Promise<CompanyRegistrationPageContent | null> {
  const page = companyRegistrationFallback(slug);
  if (!page) {
    return null;
  }

  const fallback: CompanyRegistrationPageContent = {
    ...page,
    site: fallbackHomepage.site,
    navigation: fallbackHomepage.navigation,
    footer: fallbackHomepage.footer,
  };

  return (await getCompanyRegistrationPageFromStrapi(slug, fallback)) ?? fallback;
});

export const getMcaServicePage = cache(async function getMcaServicePage(
  slug: string,
): Promise<McaServicePageContent | null> {
  const page = mcaServiceFallback(slug);
  const chromeFallback = {
    site: fallbackHomepage.site,
    navigation: fallbackHomepage.navigation,
    footer: fallbackHomepage.footer,
  };
  const fallback: McaServicePageContent | null = page
    ? {
        ...page,
        ...chromeFallback,
      }
    : null;

  return (await getMcaServicePageFromStrapi(slug, fallback, chromeFallback)) ?? fallback;
});

export const getMcaServiceSlugs = cache(async function getMcaServiceSlugs(): Promise<string[]> {
  const strapiSlugs = await getMcaServiceSlugsFromStrapi();
  return [...new Set([...mcaServiceSlugs, ...strapiSlugs])];
});

export const getImportExportServicePage = cache(async function getImportExportServicePage(
  slug: string,
): Promise<ImportExportServicePageContent | null> {
  const page = importExportServiceFallback(slug);
  const chromeFallback = {
    site: fallbackHomepage.site,
    navigation: fallbackHomepage.navigation,
    footer: fallbackHomepage.footer,
  };
  const fallback: ImportExportServicePageContent | null = page
    ? {
        ...page,
        ...chromeFallback,
      }
    : null;

  return (
    (await getImportExportServicePageFromStrapi(slug, fallback, chromeFallback)) ?? fallback
  );
});

export const getImportExportServiceSlugs = cache(
  async function getImportExportServiceSlugs(): Promise<string[]> {
    const strapiSlugs = await getImportExportServiceSlugsFromStrapi();
    return [...new Set([...importExportServiceSlugs, ...strapiSlugs])];
  },
);

export const getGovernmentLicenseCertificationPage = cache(
  async function getGovernmentLicenseCertificationPage(
    slug: string,
  ): Promise<GovernmentLicenseCertificationPageContent | null> {
    const page = governmentLicenseCertificationFallback(slug);
    const chromeFallback = {
      site: fallbackHomepage.site,
      navigation: fallbackHomepage.navigation,
      footer: fallbackHomepage.footer,
    };
    const fallback: GovernmentLicenseCertificationPageContent | null = page
      ? {
          ...page,
          ...chromeFallback,
        }
      : null;

    return (
      (await getGovernmentLicenseCertificationPageFromStrapi(
        slug,
        fallback,
        chromeFallback,
      )) ?? fallback
    );
  },
);

export const getGovernmentLicenseCertificationSlugs = cache(
  async function getGovernmentLicenseCertificationSlugs(): Promise<string[]> {
    const strapiSlugs = await getGovernmentLicenseCertificationSlugsFromStrapi();
    return [...new Set([...governmentLicenseCertificationSlugs, ...strapiSlugs])];
  },
);

export const getIprServicePage = cache(async function getIprServicePage(
  slug: string,
): Promise<IprServicePageContent | null> {
  const page = iprServiceFallback(slug);
  const chromeFallback = {
    site: fallbackHomepage.site,
    navigation: fallbackHomepage.navigation,
    footer: fallbackHomepage.footer,
  };
  const fallback: IprServicePageContent | null = page
    ? { ...page, ...chromeFallback }
    : null;

  return (await getIprServicePageFromStrapi(slug, fallback, chromeFallback)) ?? fallback;
});

export const getIprServiceSlugs = cache(async function getIprServiceSlugs(): Promise<string[]> {
  const strapiSlugs = await getIprServiceSlugsFromStrapi();
  return [...new Set([...iprServiceSlugs, ...strapiSlugs])];
});

export const getFssaiServicePage = cache(async function getFssaiServicePage(
  slug: string,
): Promise<FssaiServicePageContent | null> {
  const page = fssaiServiceFallback(slug);
  const chromeFallback = {
    site: fallbackHomepage.site,
    navigation: fallbackHomepage.navigation,
    footer: fallbackHomepage.footer,
  };
  const fallback: FssaiServicePageContent | null = page
    ? { ...page, ...chromeFallback }
    : null;

  return (await getFssaiServicePageFromStrapi(slug, fallback, chromeFallback)) ?? fallback;
});

export const getFssaiServiceSlugs = cache(async function getFssaiServiceSlugs(): Promise<string[]> {
  const strapiSlugs = await getFssaiServiceSlugsFromStrapi();
  return [...new Set([...fssaiServiceSlugs, ...strapiSlugs])];
});

export const getSebiBusinessRegistrationPage = cache(
  async function getSebiBusinessRegistrationPage(
    slug: string,
  ): Promise<SebiBusinessRegistrationPageContent | null> {
    const page = sebiBusinessRegistrationFallback(slug);
    const chromeFallback = {
      site: fallbackHomepage.site,
      navigation: fallbackHomepage.navigation,
      footer: fallbackHomepage.footer,
    };
    const fallback: SebiBusinessRegistrationPageContent | null = page
      ? { ...page, ...chromeFallback }
      : null;

    return (
      (await getSebiBusinessRegistrationPageFromStrapi(slug, fallback, chromeFallback)) ?? fallback
    );
  },
);

export const getSebiBusinessRegistrationSlugs = cache(
  async function getSebiBusinessRegistrationSlugs(): Promise<string[]> {
    const strapiSlugs = await getSebiBusinessRegistrationSlugsFromStrapi();
    return [...new Set([...sebiBusinessRegistrationSlugs, ...strapiSlugs])];
  },
);

export const getTaxAccountingPage = cache(async function getTaxAccountingPage(
  slug: string,
): Promise<TaxAccountingPageContent | null> {
  const page = taxAccountingFallback(slug);
  const chromeFallback = {
    site: fallbackHomepage.site,
    navigation: fallbackHomepage.navigation,
    footer: fallbackHomepage.footer,
  };
  const fallback: TaxAccountingPageContent | null = page
    ? { ...page, ...chromeFallback }
    : null;

  return (await getTaxAccountingPageFromStrapi(slug, fallback, chromeFallback)) ?? fallback;
});

export const getTaxAccountingSlugs = cache(
  async function getTaxAccountingSlugs(): Promise<string[]> {
    const strapiSlugs = await getTaxAccountingSlugsFromStrapi();
    return [...new Set([...taxAccountingSlugs, ...strapiSlugs])];
  },
);

export const getLabourCompliancePage = cache(async function getLabourCompliancePage(
  slug: string,
): Promise<LabourCompliancePageContent | null> {
  const page = labourComplianceFallback(slug);
  const chromeFallback = {
    site: fallbackHomepage.site,
    navigation: fallbackHomepage.navigation,
    footer: fallbackHomepage.footer,
  };
  const fallback: LabourCompliancePageContent | null = page
    ? { ...page, ...chromeFallback }
    : null;

  return (await getLabourCompliancePageFromStrapi(slug, fallback, chromeFallback)) ?? fallback;
});

export const getLabourComplianceSlugs = cache(
  async function getLabourComplianceSlugs(): Promise<string[]> {
    const strapiSlugs = await getLabourComplianceSlugsFromStrapi();
    return [...new Set([...labourComplianceSlugs, ...strapiSlugs])];
  },
);

export const getFundRaisingPage = cache(async function getFundRaisingPage(
  slug: string,
): Promise<FundRaisingPageContent | null> {
  const page = fundRaisingFallback(slug);
  const chromeFallback = {
    site: fallbackHomepage.site,
    navigation: fallbackHomepage.navigation,
    footer: fallbackHomepage.footer,
  };
  const fallback: FundRaisingPageContent | null = page
    ? { ...page, ...chromeFallback }
    : null;

  return (await getFundRaisingPageFromStrapi(slug, fallback, chromeFallback)) ?? fallback;
});

export const getFundRaisingSlugs = cache(
  async function getFundRaisingSlugs(): Promise<string[]> {
    const strapiSlugs = await getFundRaisingSlugsFromStrapi();
    return [...new Set([...fundRaisingSlugs, ...strapiSlugs])];
  },
);

export const getBureauIndianStandardsPage = cache(
  async function getBureauIndianStandardsPage(
    slug: string,
  ): Promise<BureauIndianStandardsPageContent | null> {
    const page = bureauIndianStandardsFallback(slug);
    const chromeFallback = {
      site: fallbackHomepage.site,
      navigation: fallbackHomepage.navigation,
      footer: fallbackHomepage.footer,
    };
    const fallback: BureauIndianStandardsPageContent | null = page
      ? { ...page, ...chromeFallback }
      : null;

    return (
      (await getBureauIndianStandardsPageFromStrapi(slug, fallback, chromeFallback)) ?? fallback
    );
  },
);

export const getBureauIndianStandardsSlugs = cache(
  async function getBureauIndianStandardsSlugs(): Promise<string[]> {
    const strapiSlugs = await getBureauIndianStandardsSlugsFromStrapi();
    return [...new Set([...bureauIndianStandardsSlugs, ...strapiSlugs])];
  },
);

export const getPollutionAdvisoryPage = cache(async function getPollutionAdvisoryPage(
  slug: string,
): Promise<PollutionAdvisoryPageContent | null> {
  const page = pollutionAdvisoryFallback(slug);
  const chromeFallback = {
    site: fallbackHomepage.site,
    navigation: fallbackHomepage.navigation,
    footer: fallbackHomepage.footer,
  };
  const fallback: PollutionAdvisoryPageContent | null = page
    ? { ...page, ...chromeFallback }
    : null;

  return (await getPollutionAdvisoryPageFromStrapi(slug, fallback, chromeFallback)) ?? fallback;
});

export const getPollutionAdvisorySlugs = cache(
  async function getPollutionAdvisorySlugs(): Promise<string[]> {
    const strapiSlugs = await getPollutionAdvisorySlugsFromStrapi();
    return [...new Set([...pollutionAdvisorySlugs, ...strapiSlugs])];
  },
);

const cmsOnlyApprovalChromeFallback = {
  site: fallbackHomepage.site,
  navigation: fallbackHomepage.navigation,
  footer: fallbackHomepage.footer,
};

export const getTelecommunicationEngineeringCentrePage = cache(
  async function getTelecommunicationEngineeringCentrePage(
    slug: string,
  ): Promise<TelecommunicationEngineeringCentrePageContent | null> {
    return getTelecommunicationEngineeringCentrePageFromStrapi(
      slug,
      null,
      cmsOnlyApprovalChromeFallback,
    );
  },
);

export const getTelecommunicationEngineeringCentreSlugs = cache(
  async function getTelecommunicationEngineeringCentreSlugs(): Promise<string[]> {
    return getTelecommunicationEngineeringCentreSlugsFromStrapi();
  },
);

export const getWirelessPlanningCoordinationPage = cache(
  async function getWirelessPlanningCoordinationPage(
    slug: string,
  ): Promise<WirelessPlanningCoordinationPageContent | null> {
    return getWirelessPlanningCoordinationPageFromStrapi(
      slug,
      null,
      cmsOnlyApprovalChromeFallback,
    );
  },
);

export const getWirelessPlanningCoordinationSlugs = cache(
  async function getWirelessPlanningCoordinationSlugs(): Promise<string[]> {
    return getWirelessPlanningCoordinationSlugsFromStrapi();
  },
);

export const getBureauEnergyEfficiencyPage = cache(
  async function getBureauEnergyEfficiencyPage(
    slug: string,
  ): Promise<BureauEnergyEfficiencyPageContent | null> {
    return getBureauEnergyEfficiencyPageFromStrapi(
      slug,
      null,
      cmsOnlyApprovalChromeFallback,
    );
  },
);

export const getBureauEnergyEfficiencySlugs = cache(
  async function getBureauEnergyEfficiencySlugs(): Promise<string[]> {
    return getBureauEnergyEfficiencySlugsFromStrapi();
  },
);

export const getCdscoRegistrationPage = cache(
  async function getCdscoRegistrationPage(
    slug: string,
  ): Promise<CdscoRegistrationPageContent | null> {
    return getCdscoRegistrationPageFromStrapi(slug, null, cmsOnlyApprovalChromeFallback);
  },
);

export const getCdscoRegistrationSlugs = cache(
  async function getCdscoRegistrationSlugs(): Promise<string[]> {
    return getCdscoRegistrationSlugsFromStrapi();
  },
);

export const getAerbApprovalPage = cache(async function getAerbApprovalPage(
  slug: string,
): Promise<AerbApprovalPageContent | null> {
  return getAerbApprovalPageFromStrapi(slug, null, cmsOnlyApprovalChromeFallback);
});

export const getAerbApprovalSlugs = cache(
  async function getAerbApprovalSlugs(): Promise<string[]> {
    return getAerbApprovalSlugsFromStrapi();
  },
);

export const getLmpcCertificationPage = cache(async function getLmpcCertificationPage(
  slug: string,
): Promise<LmpcCertificationPageContent | null> {
  return getLmpcCertificationPageFromStrapi(slug, null, cmsOnlyApprovalChromeFallback);
});

export const getLmpcCertificationSlugs = cache(
  async function getLmpcCertificationSlugs(): Promise<string[]> {
    return getLmpcCertificationSlugsFromStrapi();
  },
);

export const getStqcPage = cache(async function getStqcPage(
  slug: string,
): Promise<StqcPageContent | null> {
  return getStqcPageFromStrapi(slug, null, cmsOnlyApprovalChromeFallback);
});

export const getStqcSlugs = cache(async function getStqcSlugs(): Promise<string[]> {
  return getStqcSlugsFromStrapi();
});

const cmsOnlyGlobalChromeFallback = {
  site: fallbackHomepage.site,
  navigation: fallbackHomepage.navigation,
  footer: fallbackHomepage.footer,
};

export const getGlobalCountryPage = cache(async function getGlobalCountryPage(
  country: string,
): Promise<GlobalCountryPageContent | null> {
  return getGlobalCountryPageFromStrapi(country, cmsOnlyGlobalChromeFallback);
});

export const getGlobalCountrySlugs = cache(
  async function getGlobalCountrySlugs(): Promise<string[]> {
    return [...new Set(await getGlobalCountrySlugsFromStrapi())];
  },
);

export const getGlobalCertificatePage = cache(async function getGlobalCertificatePage(
  country: string,
  slug: string,
): Promise<GlobalCertificatePageContent | null> {
  return getGlobalCertificatePageFromStrapi(
    country,
    slug,
    cmsOnlyGlobalChromeFallback,
  );
});

export const getGlobalCertificatePaths = cache(
  async function getGlobalCertificatePaths(): Promise<
    Array<{ country: string; slug: string }>
  > {
    const seen = new Set<string>();

    return (await getGlobalCertificatePathsFromStrapi()).filter(({ country, slug }) => {
      const key = `${country}/${slug}`;
      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    });
  },
);
