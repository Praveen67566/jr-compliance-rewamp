import { notFound, permanentRedirect } from "next/navigation";

import { getLegacyGlobalPage } from "@/lib/global-routes";
import { redirectPath, type RouteSearchParams } from "@/lib/public-paths";

export const revalidate = 60;
export const dynamicParams = true;

export default async function Page({ params, searchParams }: {
  params: Promise<{ category: string }>;
  searchParams: Promise<RouteSearchParams>;
}) {
  const { category } = await params;
  const resolved = await getLegacyGlobalPage(category);
  if (!resolved) notFound();
  permanentRedirect(redirectPath(resolved.canonicalPath, await searchParams));
}
