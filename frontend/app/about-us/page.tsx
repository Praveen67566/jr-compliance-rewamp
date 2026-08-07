import type { Metadata } from "next";

import { AboutPage } from "@/components/about/about-page";
import { getAboutPage } from "@/lib/content";
import { pageMetadata } from "@/lib/page-metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getAboutPage();

  return pageMetadata(content.seo, "/about-us");
}

export default async function Page() {
  const content = await getAboutPage();

  return <AboutPage content={content} />;
}
