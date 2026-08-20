import type { Metadata } from "next";

import { LegalPage } from "@/components/legal/legal-page";
import { getLegalPage } from "@/lib/content";
import { pageMetadata } from "@/lib/page-metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getLegalPage("purchase-and-billing");
  return pageMetadata(content.seo, "/purchase-and-billing");
}

export default async function PurchaseAndBillingPage() {
  const content = await getLegalPage("purchase-and-billing");
  return <LegalPage content={content} />;
}
