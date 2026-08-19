import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CompanyRegistrationPage } from "@/components/company-registration/company-registration-page";
import {
  getBureauIndianStandardsPage,
  getBureauIndianStandardsSlugs,
  getPollutionAdvisoryPage,
  getPollutionAdvisorySlugs,
} from "@/lib/content";
import { pageMetadata } from "@/lib/page-metadata";

type ApprovalRouteProps = {
  params: Promise<{ slug: string[] }>;
};

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const [bureauIndianStandardsSlugs, pollutionAdvisorySlugs] = await Promise.all([
    getBureauIndianStandardsSlugs(),
    getPollutionAdvisorySlugs(),
  ]);

  return [...new Set([...bureauIndianStandardsSlugs, ...pollutionAdvisorySlugs])].map(
    (routePath) => ({ slug: routePath.split("/") }),
  );
}

async function getApprovalPage(routePath: string) {
  return (
    (await getBureauIndianStandardsPage(routePath)) ?? getPollutionAdvisoryPage(routePath)
  );
}

export async function generateMetadata({ params }: ApprovalRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const routePath = slug.join("/");
  const content = await getApprovalPage(routePath);

  return content ? pageMetadata(content.seo, `/approval/${routePath}`) : {};
}

export default async function Page({ params }: ApprovalRouteProps) {
  const { slug } = await params;
  const content = await getApprovalPage(slug.join("/"));

  if (!content) {
    notFound();
  }

  return <CompanyRegistrationPage content={content} />;
}
