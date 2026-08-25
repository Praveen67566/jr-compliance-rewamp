import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CompanyRegistrationPage } from "@/components/company-registration/company-registration-page";
import { pageMetadata } from "@/lib/page-metadata";
import { getCategorizedServicePage, getServiceRouteEntries } from "@/lib/service-routes";

type CorporateServiceRouteProps = {
  params: Promise<{ category: string; slug: string }>;
};

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getServiceRouteEntries("corporate")).map((entry) => ({
    category: entry.categorySlug,
    slug: entry.servicePath,
  }));
}

export async function generateMetadata({
  params,
}: CorporateServiceRouteProps): Promise<Metadata> {
  const { category, slug } = await params;
  const resolved = await getCategorizedServicePage("corporate", category, slug);

  return resolved
    ? pageMetadata(resolved.content.seo, resolved.canonicalPath, {
        forcePathnameCanonical: true,
      })
    : {};
}

export default async function Page({ params }: CorporateServiceRouteProps) {
  const { category, slug } = await params;
  const resolved = await getCategorizedServicePage("corporate", category, slug);

  if (!resolved) {
    notFound();
  }

  return (
    <CompanyRegistrationPage
      breadcrumb={{
        areaLabel: "Corporate",
        categoryLabel: resolved.category.categoryLabel,
      }}
      content={resolved.content}
      showHeroGlobe
    />
  );
}
