import { notFound, permanentRedirect } from "next/navigation";

import { redirectPath, type RouteSearchParams } from "@/lib/public-paths";
import { getCategorizedPublicServicePage, getCategorizedServicePage } from "@/lib/service-routes";

export const revalidate = 60;
export const dynamicParams = true;

/** Compatibility entry point for /corporate/category/service. */
export default async function Page({ params, searchParams }: {
  params: Promise<{ slug: string; service: string }>;
  searchParams: Promise<RouteSearchParams>;
}) {
  const { slug: category, service } = await params;
  const resolved = category === "fssai"
    ? await getCategorizedPublicServicePage(category, service)
    : await getCategorizedServicePage("corporate", category, service);
  if (!resolved) notFound();
  permanentRedirect(redirectPath(resolved.canonicalPath, await searchParams));
}
