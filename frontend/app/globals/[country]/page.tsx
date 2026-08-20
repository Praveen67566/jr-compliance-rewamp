import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GlobalCountryPage } from "@/components/global/global-country-page";
import { getGlobalCountryPage, getGlobalCountrySlugs } from "@/lib/content";
import { pageMetadata } from "@/lib/page-metadata";

type GlobalCountryRouteProps = {
  params: Promise<{ country: string }>;
};

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getGlobalCountrySlugs()).map((country) => ({ country }));
}

export async function generateMetadata({
  params,
}: GlobalCountryRouteProps): Promise<Metadata> {
  const { country } = await params;
  const content = await getGlobalCountryPage(country);

  return content ? pageMetadata(content.seo, `/globals/${country}`) : {};
}

export default async function Page({ params }: GlobalCountryRouteProps) {
  const { country } = await params;
  const content = await getGlobalCountryPage(country);

  if (!content) {
    notFound();
  }

  return <GlobalCountryPage content={content} />;
}
