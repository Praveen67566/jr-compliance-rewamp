import { cache } from "react";

import { fallbackAboutPage } from "@/data/about-page-fallback";
import { fallbackCareersPage } from "@/data/careers-page-fallback";
import { companyRegistrationFallback } from "@/data/company-registration-pages-fallback";
import { fallbackContactPage } from "@/data/contact-page-fallback";
import { fallbackHomepage } from "@/data/homepage-fallback";
import { mcaServiceFallback, mcaServiceSlugs } from "@/data/mca-service-pages-fallback";
import {
  getAboutPageFromStrapi,
  getCareersPageFromStrapi,
  getCompanyRegistrationPageFromStrapi,
  getContactPageFromStrapi,
  getHomepageFromStrapi,
  getMcaServicePageFromStrapi,
  getMcaServiceSlugsFromStrapi,
} from "@/lib/strapi";
import type {
  AboutPageContent,
  CareersPageContent,
  CompanyRegistrationPageContent,
  ContactPageContent,
  HomepageContent,
  McaServicePageContent,
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
