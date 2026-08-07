import type { Metadata } from "next";

import { ContactPage } from "@/components/contact/contact-page";
import { getContactPage } from "@/lib/content";
import { pageMetadata } from "@/lib/page-metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContactPage();

  return pageMetadata(content.seo, "/contact-us");
}

export default async function Page() {
  const content = await getContactPage();

  return <ContactPage content={content} />;
}
