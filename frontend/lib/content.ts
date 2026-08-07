import { fallbackHomepage } from "@/data/homepage-fallback";
import { getHomepageFromStrapi } from "@/lib/strapi";
import type { HomepageContent } from "@/lib/types";

export async function getHomepage(): Promise<HomepageContent> {
  return (await getHomepageFromStrapi(fallbackHomepage)) ?? fallbackHomepage;
}
