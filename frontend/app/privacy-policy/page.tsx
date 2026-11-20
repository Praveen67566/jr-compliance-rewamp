import type { Metadata } from "next";

import { getLegalPage } from "@/lib/content";
import { pageMetadata } from "@/lib/page-metadata";

import { PrivacyPolicyContent } from "./privacy-policy-content";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getLegalPage("privacy-policy");
  return pageMetadata(content.seo, "/privacy-policy");
}

export default async function PrivacyPolicyPage() {
  const content = await getLegalPage("privacy-policy");
  return <PrivacyPolicyContent content={content} />;
}
