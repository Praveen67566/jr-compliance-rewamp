import type { Metadata } from "next";

import { LegalPage } from "@/components/legal/legal-page";
import { getLegalPage } from "@/lib/content";
import { pageMetadata } from "@/lib/page-metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getLegalPage("terms-and-conditions");
  return pageMetadata(content.seo, "/terms-and-conditions");
}

export default async function TermsAndConditionsPage() {
  const content = await getLegalPage("terms-and-conditions");
  return <LegalPage content={content} />;
}
