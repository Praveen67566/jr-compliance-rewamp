import { permanentRedirect } from "next/navigation";
import { redirectPath, type RouteSearchParams } from "@/lib/public-paths";

export default async function Page({ searchParams }: { searchParams: Promise<RouteSearchParams> }) {
  permanentRedirect(redirectPath("/ads/bis-certification", await searchParams));
}
