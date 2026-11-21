import { resolveConsentPolicy } from "@/lib/privacy-policy";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const headers = { "Cache-Control": "private, no-store, max-age=0", "Vary": "Sec-GPC", "X-Robots-Tag": "noindex" };
  try {
    return Response.json(resolveConsentPolicy(request.headers, process.env), { headers });
  } catch {
    return Response.json({ error: "Privacy configuration unavailable" }, { status: 503, headers });
  }
}
