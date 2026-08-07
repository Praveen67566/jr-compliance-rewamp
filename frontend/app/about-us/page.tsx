import type { Metadata } from "next";

import { AboutPage } from "@/components/about/about-page";
import { getAboutPage } from "@/lib/content";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getAboutPage();

  return {
    title: content.seo.title,
    description: content.seo.description,
  };
}

export default async function Page() {
  const content = await getAboutPage();

  return <AboutPage content={content} />;
}
