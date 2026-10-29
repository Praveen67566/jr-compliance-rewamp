import { notFound, permanentRedirect } from "next/navigation";

import { redirectPath, type RouteSearchParams } from "@/lib/public-paths";
import { resolveApprovalService } from "@/lib/service-routes";

export const revalidate = 60;
export const dynamicParams = true;

export default async function Page({ params, searchParams }: {
  params: Promise<{ slug: string; legacy: string[] }>;
  searchParams: Promise<RouteSearchParams>;
}) {
  const { slug, legacy } = await params;
  const resolved = await resolveApprovalService([slug, ...legacy].join("/"));
  if (resolved.kind !== "redirect") notFound();
  permanentRedirect(redirectPath(resolved.canonicalPath, await searchParams));
}
