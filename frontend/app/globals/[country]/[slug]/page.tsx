import { notFound, permanentRedirect } from "next/navigation";

import { redirectPath, type RouteSearchParams } from "@/lib/public-paths";

import { getLegacyGlobalPage } from "@/lib/global-routes";

export const revalidate = 60;
export const dynamicParams = true;

export default async function Page({ params, searchParams }: { params: Promise<{ country: string; slug: string }>; searchParams: Promise<RouteSearchParams> }) {
  const { country, slug } = await params;
  const content = await getLegacyGlobalPage(country, slug);
  if (!content) notFound();
  permanentRedirect(redirectPath(content.canonicalPath, await searchParams));
}
