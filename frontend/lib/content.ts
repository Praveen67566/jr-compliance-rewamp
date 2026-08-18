import { cache } from "react";

import { fallbackAboutPage } from "@/data/about-page-fallback";
import { fallbackCareersPage } from "@/data/careers-page-fallback";
import { companyRegistrationFallback } from "@/data/company-registration-pages-fallback";
import { fallbackContactPage } from "@/data/contact-page-fallback";
import {
  fssaiServiceFallback,
  fssaiServiceSlugs,
} from "@/data/fssai-service-pages-fallback";
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
import { mcaServiceFallback, mcaServiceSlugs } from "@/data/mca-service-pages-fallback";
import {
  sebiBusinessRegistrationFallback,
  sebiBusinessRegistrationSlugs,
} from "@/data/sebi-business-registration-pages-fallback";
import {
  getAboutPageFromStrapi,
  getCareersPageFromStrapi,
  getCompanyRegistrationPageFromStrapi,
  getContactPageFromStrapi,
  getFssaiServicePageFromStrapi,
  getFssaiServiceSlugsFromStrapi,
  getGovernmentLicenseCertificationPageFromStrapi,
  getGovernmentLicenseCertificationSlugsFromStrapi,
  getHomepageFromStrapi,
  getIprServicePageFromStrapi,
  getIprServiceSlugsFromStrapi,
  getImportExportServicePageFromStrapi,
  getImportExportServiceSlugsFromStrapi,
  getMcaServicePageFromStrapi,
  getMcaServiceSlugsFromStrapi,
  getSebiBusinessRegistrationPageFromStrapi,
  getSebiBusinessRegistrationSlugsFromStrapi,
} from "@/lib/strapi";
import type {
  AboutPageContent,
  CareersPageContent,
  CompanyRegistrationPageContent,
  ContactPageContent,
  FssaiServicePageContent,
  GovernmentLicenseCertificationPageContent,
  HomepageContent,
  ImportExportServicePageContent,
  IprServicePageContent,
  McaServicePageContent,
  SebiBusinessRegistrationPageContent,
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
