import { createHmac, timingSafeEqual } from "node:crypto";

import { revalidateTag } from "next/cache";

import {
  strapiCacheTagBySlug,
  type RevalidatableContentSlug,
} from "@/lib/strapi";

export const runtime = "nodejs";

type StrapiWebhookPayload = {
  event?: unknown;
  model?: unknown;
  tags?: unknown;
};

const publishEvents = new Set(["entry.publish", "entry.unpublish", "entry.delete"]);

function isValidSignature(body: string, signature: string | null, secret: string): boolean {
  if (!signature) {
    return false;
  }

  const expected = `sha256=${createHmac("sha256", secret).update(body).digest("hex")}`;
  const received = Buffer.from(signature.trim());
  const expectedBuffer = Buffer.from(expected);

  return received.length === expectedBuffer.length && timingSafeEqual(received, expectedBuffer);
}

function pageSlugFromModel(value: unknown): RevalidatableContentSlug | null {
  if (typeof value !== "string") {
    return null;
  }

  return (
    (Object.keys(strapiCacheTagBySlug) as RevalidatableContentSlug[]).find(
      (slug) => value === slug || value.endsWith(`.${slug}`) || value.includes(`::${slug}.`),
    ) ?? null
  );
}

function knownPayloadTags(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const knownTags = new Set(Object.values(strapiCacheTagBySlug));
  return [...new Set(value.filter((tag): tag is string => typeof tag === "string" && knownTags.has(tag)))];
}

export async function POST(request: Request) {
  const secret = process.env.STRAPI_REVALIDATE_SECRET;
  if (!secret) {
    return Response.json({ revalidated: false, message: "Webhook signing is not configured." }, { status: 503 });
  }

  const body = await request.text();
  if (!isValidSignature(body, request.headers.get("x-strapi-signature"), secret)) {
    return Response.json({ revalidated: false, message: "Invalid webhook signature." }, { status: 401 });
  }

  let payload: StrapiWebhookPayload;
  try {
    payload = JSON.parse(body) as StrapiWebhookPayload;
  } catch {
    return Response.json({ revalidated: false, message: "Invalid webhook payload." }, { status: 400 });
  }

  const payloadTags = knownPayloadTags(payload.tags);
  const event = request.headers.get("x-strapi-event") ?? (typeof payload.event === "string" ? payload.event : undefined);
  if (event && !publishEvents.has(event) && !payloadTags.length) {
    return Response.json({ revalidated: false, ignored: true });
  }

  const slug = pageSlugFromModel(payload.model);
  const tags =
    slug === "site-setting"
      ? Object.values(strapiCacheTagBySlug)
      : [...new Set([...payloadTags, ...(slug ? [strapiCacheTagBySlug[slug]] : [])])];

  if (!tags.length) {
    return Response.json({ revalidated: false, ignored: true }, { status: 202 });
  }

  for (const tag of tags) {
    // Next 16 requires a profile. Webhooks need the next request to fetch fresh content.
    revalidateTag(tag, { expire: 0 });
  }

  return Response.json({ revalidated: true, tags });
}
