import { notFound, permanentRedirect } from "next/navigation";

import { resolveLegacyService } from "@/lib/service-routes";

type LegacyCorporateRouteProps = {
  params: Promise<{ category: string }>;
};

export const revalidate = 60;
export const dynamicParams = true;

export default async function Page({ params }: LegacyCorporateRouteProps) {
  const { category: legacySlug } = await params;
  const resolution = await resolveLegacyService("corporate", legacySlug);

  if (resolution.kind !== "found") {
    notFound();
  }

  permanentRedirect(resolution.canonicalPath);
}
