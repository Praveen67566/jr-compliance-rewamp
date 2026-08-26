import type { MetadataRoute } from "next";

import { legalPageSlugs } from "@/data/legal-pages-fallback";
import {
  getAboutPage,
  getCareersPage,
  getContactPage,
  getGlobalCertificatePage,
  getGlobalCertificatePaths,
  getGlobalCountryPage,
  getGlobalCountrySlugs,
  getHomepage,
  getLegalPage,
} from "@/lib/content";
import { getServiceSitemapEntries } from "@/lib/service-routes";
import { publicSiteUrl } from "@/lib/site-url";

function lastModified(updatedAt: string | undefined) {
  return updatedAt ? { lastModified: updatedAt } : {};
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = publicSiteUrl();
  const [homepage, aboutPage, careersPage, contactPage, legalPages, serviceEntries] =
    await Promise.all([
      getHomepage(),
      getAboutPage(),
      getCareersPage(),
      getContactPage(),
      Promise.all(legalPageSlugs.map((slug) => getLegalPage(slug))),
      Promise.all([
        getServiceSitemapEntries("corporate"),
        getServiceSitemapEntries("approval"),
      ]).then((entries) => entries.flat()),
    ]);
  const [globalCountryPages, globalCertificatePages] = await Promise.all([
    getGlobalCountrySlugs().then((countries) =>
      Promise.all(
        countries.map(async (country) => ({
          country,
          content: await getGlobalCountryPage(country),
        })),
      ),
    ),
    getGlobalCertificatePaths().then((paths) =>
      Promise.all(
        paths.map(async ({ country, slug }) => ({
          country,
          slug,
          content: await getGlobalCertificatePage(country, slug),
        })),
      ),
    ),
  ]);

  return [
    ...(!homepage.seo.noIndex
      ? [
          {
            url: new URL("/", siteUrl).toString(),
            ...lastModified(homepage.updatedAt),
            changeFrequency: "weekly" as const,
            priority: 1,
          },
        ]
      : []),
    ...(!aboutPage.seo.noIndex
      ? [
          {
            url: new URL("/about-us", siteUrl).toString(),
            ...lastModified(aboutPage.updatedAt),
            changeFrequency: "monthly" as const,
            priority: 0.8,
          },
        ]
      : []),
    ...(!careersPage.seo.noIndex
      ? [
          {
            url: new URL("/careers", siteUrl).toString(),
            ...lastModified(careersPage.updatedAt),
            changeFrequency: "weekly" as const,
            priority: 0.7,
          },
        ]
      : []),
    ...(!contactPage.seo.noIndex
      ? [
          {
            url: new URL("/contact-us", siteUrl).toString(),
            ...lastModified(contactPage.updatedAt),
            changeFrequency: "monthly" as const,
            priority: 0.7,
          },
        ]
      : []),
    ...legalPages.flatMap((content, index) =>
      content.seo.noIndex
        ? []
        : [
            {
              url: new URL(`/${legalPageSlugs[index]}`, siteUrl).toString(),
              ...lastModified(content.updatedAt),
              changeFrequency: "yearly" as const,
              priority: 0.5,
            },
          ],
    ),
    ...serviceEntries.map((entry) => ({
      url: new URL(entry.canonicalPath, siteUrl).toString(),
      ...lastModified(entry.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...globalCountryPages.flatMap(({ country, content }) =>
      !content || content.seo.noIndex
        ? []
        : [
            {
              url: new URL(`/globals/${country}`, siteUrl).toString(),
              ...lastModified(content.updatedAt),
              changeFrequency: "monthly" as const,
              priority: 0.75,
            },
          ],
    ),
    ...globalCertificatePages.flatMap(({ country, slug, content }) =>
      !content || content.seo.noIndex
        ? []
        : [
            {
              url: new URL(`/globals/${country}/${slug}`, siteUrl).toString(),
              ...lastModified(content.updatedAt),
              changeFrequency: "monthly" as const,
              priority: 0.75,
            },
          ],
    ),
  ];
}
