import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GlobalCertificatePage } from "@/components/global/global-certificate-page";
import {
  getGlobalCertificatePage,
  getGlobalCertificatePaths,
} from "@/lib/content";
import { pageMetadata } from "@/lib/page-metadata";

type GlobalCertificateRouteProps = {
  params: Promise<{ country: string; slug: string }>;
};

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  return getGlobalCertificatePaths();
}

export async function generateMetadata({
  params,
}: GlobalCertificateRouteProps): Promise<Metadata> {
  const { country, slug } = await params;
  const content = await getGlobalCertificatePage(country, slug);

  return content
    ? pageMetadata(content.seo, `/globals/${country}/${slug}`)
    : {};
}

export default async function Page({ params }: GlobalCertificateRouteProps) {
  const { country, slug } = await params;
  const content = await getGlobalCertificatePage(country, slug);

  if (!content) {
    notFound();
  }

  return <GlobalCertificatePage content={content} />;
}
