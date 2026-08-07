import type { Metadata } from "next";

import { HomePage } from "@/components/home/home-page";
import { getHomepage } from "@/lib/content";
import { pageMetadata } from "@/lib/page-metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata((await getHomepage()).seo, "/");
}

export default async function Page() {
  const content = await getHomepage();

  return <HomePage content={content} />;
}
