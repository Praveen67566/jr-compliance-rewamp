import { notFound, permanentRedirect } from "next/navigation";

import { getLegacyGlobalPage } from "@/lib/global-routes";
import { redirectPath, type RouteSearchParams } from "@/lib/public-paths";
import { serviceCategory } from "@/lib/service-route-config";
import { getCategorizedPublicServicePage } from "@/lib/service-routes";

export const revalidate = 60;
export const dynamicParams = true;

/** Compatibility for the former /category/slug and /country/certificate URLs. */
export default async function Page({ params, searchParams }: {
  params: Promise<{ category: string; slug: string }>;
  searchParams: Promise<RouteSearchParams>;
}) {
  const { category, slug } = await params;
  const resolved = serviceCategory(category)
    ? await getCategorizedPublicServicePage(category, slug)
    : await getLegacyGlobalPage(category, slug);
  if (!resolved) notFound();
  permanentRedirect(redirectPath(resolved.canonicalPath, await searchParams));
}
