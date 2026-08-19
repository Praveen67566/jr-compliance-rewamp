import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CompanyRegistrationPage } from "@/components/company-registration/company-registration-page";
import {
  getAerbApprovalPage,
  getAerbApprovalSlugs,
  getBureauEnergyEfficiencyPage,
  getBureauEnergyEfficiencySlugs,
  getBureauIndianStandardsPage,
  getBureauIndianStandardsSlugs,
  getCdscoRegistrationPage,
  getCdscoRegistrationSlugs,
  getLmpcCertificationPage,
  getLmpcCertificationSlugs,
  getPollutionAdvisoryPage,
  getPollutionAdvisorySlugs,
  getStqcPage,
  getStqcSlugs,
  getTelecommunicationEngineeringCentrePage,
  getTelecommunicationEngineeringCentreSlugs,
  getWirelessPlanningCoordinationPage,
  getWirelessPlanningCoordinationSlugs,
} from "@/lib/content";
import { pageMetadata } from "@/lib/page-metadata";

type ApprovalRouteProps = {
  params: Promise<{ slug: string[] }>;
};

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const [
    bureauIndianStandardsSlugs,
    pollutionAdvisorySlugs,
    telecommunicationEngineeringCentreSlugs,
    wirelessPlanningCoordinationSlugs,
    bureauEnergyEfficiencySlugs,
    cdscoRegistrationSlugs,
    aerbApprovalSlugs,
    lmpcCertificationSlugs,
    stqcSlugs,
  ] = await Promise.all([
    getBureauIndianStandardsSlugs(),
    getPollutionAdvisorySlugs(),
    getTelecommunicationEngineeringCentreSlugs(),
    getWirelessPlanningCoordinationSlugs(),
    getBureauEnergyEfficiencySlugs(),
    getCdscoRegistrationSlugs(),
    getAerbApprovalSlugs(),
    getLmpcCertificationSlugs(),
    getStqcSlugs(),
  ]);

  return [
    ...new Set([
      ...bureauIndianStandardsSlugs,
      ...pollutionAdvisorySlugs,
      ...telecommunicationEngineeringCentreSlugs,
      ...wirelessPlanningCoordinationSlugs,
      ...bureauEnergyEfficiencySlugs,
      ...cdscoRegistrationSlugs,
      ...aerbApprovalSlugs,
      ...lmpcCertificationSlugs,
      ...stqcSlugs,
    ]),
  ].map((routePath) => ({ slug: routePath.split("/") }));
}

async function getApprovalPage(routePath: string) {
  return (
    (await getBureauIndianStandardsPage(routePath)) ??
    (await getPollutionAdvisoryPage(routePath)) ??
    (await getTelecommunicationEngineeringCentrePage(routePath)) ??
    (await getWirelessPlanningCoordinationPage(routePath)) ??
    (await getBureauEnergyEfficiencyPage(routePath)) ??
    (await getCdscoRegistrationPage(routePath)) ??
    (await getAerbApprovalPage(routePath)) ??
    (await getLmpcCertificationPage(routePath)) ??
    getStqcPage(routePath)
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
