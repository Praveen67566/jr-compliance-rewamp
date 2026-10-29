import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GlobalCertificatePage } from "@/components/global/global-certificate-page";
import { GlobalCountryPage } from "@/components/global/global-country-page";
import { getPublicGlobalLinks, getPublicGlobalPage } from "@/lib/global-routes";
import { pageMetadata } from "@/lib/page-metadata";

type GlobalPageProps = { params: Promise<{ slug: string }> };

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getPublicGlobalLinks()).map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: GlobalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolved = await getPublicGlobalPage(slug);
  return resolved ? pageMetadata(resolved.content.seo, resolved.canonicalPath, { forcePathnameCanonical: true }) : {};
}

export default async function Page({ params }: GlobalPageProps) {
  const { slug } = await params;
  const resolved = await getPublicGlobalPage(slug);
  if (!resolved) notFound();
  return resolved.kind === "country"
    ? <GlobalCountryPage content={resolved.content} />
    : <GlobalCertificatePage content={resolved.content} />;
}
