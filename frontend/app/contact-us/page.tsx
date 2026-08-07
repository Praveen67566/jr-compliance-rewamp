import type { Metadata } from "next";

import { ContactPage } from "@/components/contact/contact-page";
import { getContactPage } from "@/lib/content";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContactPage();

  return {
    title: content.seo.title,
    description: content.seo.description,
  };
}

export default async function Page() {
  const content = await getContactPage();

  return <ContactPage content={content} />;
}
