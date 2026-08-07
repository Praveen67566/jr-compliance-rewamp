import type { Metadata } from "next";

import { CareersPage } from "@/components/careers/careers-page";
import { getCareersPage } from "@/lib/content";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getCareersPage();

  return {
    title: content.seo.title,
    description: content.seo.description,
  };
}

export default async function Page() {
  const content = await getCareersPage();

  return <CareersPage content={content} />;
}
