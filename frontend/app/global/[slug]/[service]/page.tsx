import { notFound, permanentRedirect } from "next/navigation";

import { getLegacyGlobalPage } from "@/lib/global-routes";
import { redirectPath, type RouteSearchParams } from "@/lib/public-paths";

export const revalidate = 60;
export const dynamicParams = true;

export default async function Page({ params, searchParams }: {
  params: Promise<{ slug: string; service: string }>;
  searchParams: Promise<RouteSearchParams>;
}) {
  const { slug: country, service } = await params;
  const resolved = await getLegacyGlobalPage(country, service);
  if (!resolved) notFound();
  permanentRedirect(redirectPath(resolved.canonicalPath, await searchParams));
}
