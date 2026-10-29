import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CompanyRegistrationPage } from "@/components/company-registration/company-registration-page";
import { pageMetadata } from "@/lib/page-metadata";
import { publicServiceSlug } from "@/lib/public-paths";
import { getPublicServicePage, getServiceRouteEntries } from "@/lib/service-routes";

type ApprovalPageProps = { params: Promise<{ slug: string }> };

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getServiceRouteEntries("approval")).map((entry) => ({ slug: publicServiceSlug(entry.servicePath) }));
}

export async function generateMetadata({ params }: ApprovalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolved = await getPublicServicePage("approval", slug);
  return resolved ? pageMetadata(resolved.content.seo, resolved.canonicalPath, { forcePathnameCanonical: true }) : {};
}

export default async function Page({ params }: ApprovalPageProps) {
  const { slug } = await params;
  const resolved = await getPublicServicePage("approval", slug);
  if (!resolved) notFound();
  return <CompanyRegistrationPage
    breadcrumb={{ areaLabel: "Approval", categoryLabel: resolved.category.categoryLabel }}
    content={resolved.content}
    showHeroGlobe
  />;
}
