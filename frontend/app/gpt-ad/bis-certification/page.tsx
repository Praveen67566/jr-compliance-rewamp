import { BisCertificationAdPage } from "@/components/bis-ad/bis-certification-ad-page";
import { getBisCertificationAdPage } from "@/lib/content";
import { pageMetadata } from "@/lib/page-metadata";

export function generateMetadata() {
  return pageMetadata(
    getBisCertificationAdPage().seo,
    "/gpt-ad/bis-certification",
    { forcePathnameCanonical: true },
  );
}

export default function Page() {
  return <BisCertificationAdPage content={getBisCertificationAdPage()} />;
}
