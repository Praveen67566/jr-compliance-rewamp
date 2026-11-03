import { crawlerTextResponse } from "@/lib/llms";

export const runtime = "nodejs";

export async function GET() {
  return crawlerTextResponse(true);
}
