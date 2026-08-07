import { fallbackAboutPage } from "@/data/about-page-fallback";
import { fallbackCareersPage } from "@/data/careers-page-fallback";
import { fallbackContactPage } from "@/data/contact-page-fallback";
import { fallbackHomepage } from "@/data/homepage-fallback";
import {
  getAboutPageFromStrapi,
  getCareersPageFromStrapi,
  getContactPageFromStrapi,
  getHomepageFromStrapi,
} from "@/lib/strapi";
import type { AboutPageContent, CareersPageContent, ContactPageContent, HomepageContent } from "@/lib/types";

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
import { cache } from "react";
