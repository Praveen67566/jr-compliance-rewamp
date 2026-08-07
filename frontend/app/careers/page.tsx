import type { Metadata } from "next";

import { CareersPage } from "@/components/careers/careers-page";
import { getCareersPage } from "@/lib/content";
import { pageMetadata } from "@/lib/page-metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getCareersPage();

  return pageMetadata(content.seo, "/careers");
}

export default async function Page() {
  const content = await getCareersPage();

  return <CareersPage content={content} />;
}
