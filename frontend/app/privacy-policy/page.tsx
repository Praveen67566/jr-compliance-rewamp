import type { Metadata } from "next";

import { LegalPage } from "@/components/legal/legal-page";
import { getLegalPage } from "@/lib/content";
import { pageMetadata } from "@/lib/page-metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getLegalPage("privacy-policy");
  return pageMetadata(content.seo, "/privacy-policy");
}

export default async function PrivacyPolicyPage() {
  const content = await getLegalPage("privacy-policy");
  return <LegalPage content={content} />;
}
