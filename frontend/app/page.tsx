import { HomePage } from "@/components/home/home-page";
import { getHomepage } from "@/lib/content";

export const revalidate = 60;

export default async function Page() {
  const content = await getHomepage();

  return <HomePage content={content} />;
}
