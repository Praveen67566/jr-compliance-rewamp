import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

import { CompanyRegistrationPage } from "@/components/company-registration/company-registration-page";
import { pageMetadata } from "@/lib/page-metadata";
import { getServiceRouteEntries, resolveApprovalService } from "@/lib/service-routes";

type ApprovalRouteProps = {
  params: Promise<{ slug: string[] }>;
};

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getServiceRouteEntries("approval")).map((entry) => ({
    slug: [entry.categorySlug, ...entry.servicePath.split("/")],
  }));
}

export async function generateMetadata({ params }: ApprovalRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const resolution = await resolveApprovalService(slug.join("/"));

  return resolution.kind === "canonical"
    ? pageMetadata(resolution.content.seo, resolution.canonicalPath, {
        forcePathnameCanonical: true,
      })
    : {};
}

export default async function Page({ params }: ApprovalRouteProps) {
  const { slug } = await params;
  const resolution = await resolveApprovalService(slug.join("/"));

  if (resolution.kind === "redirect") {
    permanentRedirect(resolution.canonicalPath);
  }

  if (resolution.kind !== "canonical") {
    notFound();
  }

  return (
    <CompanyRegistrationPage
      breadcrumb={{
        areaLabel: "Approval",
        categoryLabel: resolution.category.categoryLabel,
      }}
      content={resolution.content}
      showHeroGlobe
    />
  );
}
