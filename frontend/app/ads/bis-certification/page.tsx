import { BisAdsPage } from "@/components/bis-ads/bis-ads-page";
import { getBisAdsPage } from "@/lib/content";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(getBisAdsPage().seo, "/ads/bis-certification", { forcePathnameCanonical: true });

export default function Page() {
  return <BisAdsPage content={getBisAdsPage()} />;
}
