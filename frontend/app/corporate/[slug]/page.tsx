import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CompanyRegistrationPage } from "@/components/company-registration/company-registration-page";
import { companyRegistrationSlugs } from "@/data/company-registration-pages-fallback";
import {
  getCompanyRegistrationPage,
  getMcaServicePage,
  getMcaServiceSlugs,
} from "@/lib/content";
import { pageMetadata } from "@/lib/page-metadata";

type CompanyRegistrationRouteProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const mcaServiceSlugs = await getMcaServiceSlugs();
  return [...new Set([...companyRegistrationSlugs, ...mcaServiceSlugs])].map((slug) => ({ slug }));
}

async function getCorporateServicePage(slug: string) {
  return (await getCompanyRegistrationPage(slug)) ?? getMcaServicePage(slug);
}

export async function generateMetadata({ params }: CompanyRegistrationRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const content = await getCorporateServicePage(slug);

  return content ? pageMetadata(content.seo, `/corporate/${slug}`) : {};
}

export default async function Page({ params }: CompanyRegistrationRouteProps) {
  const { slug } = await params;
  const content = await getCorporateServicePage(slug);

  if (!content) {
    notFound();
  }

  return <CompanyRegistrationPage content={content} />;
}
