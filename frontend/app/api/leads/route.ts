import { takeLeadRateLimit } from "@/lib/lead-rate-limit";
import {
  LEAD_BODY_LIMIT_BYTES,
  buildLeadWebhookPayload,
  leadTypeFromPath,
  normalizeLeadPathname,
  validateLeadRequest,
} from "@/lib/leads";

export const runtime = "nodejs";

const downstreamTimeoutMs = 8000;

function jsonResponse(
  body: Record<string, unknown>,
  status = 200,
  extraHeaders: HeadersInit = {},
) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      ...extraHeaders,
    },
  });
}

function expectedOrigins(request: Request): Set<string> {
  const origins = new Set<string>();
  const configuredSiteUrl = process.env.SITE_URL;

  if (configuredSiteUrl) {
    try {
      const siteUrl = new URL(configuredSiteUrl);
      if (
        (siteUrl.protocol === "https:" || siteUrl.protocol === "http:") &&
        !siteUrl.username &&
        !siteUrl.password &&
        siteUrl.pathname === "/" &&
        !siteUrl.search &&
        !siteUrl.hash
      ) {
        origins.add(siteUrl.origin);
      }
    } catch {
      // An invalid configured origin deliberately leaves the allow-list empty.
    }

    return origins;
  }

  // Local development can use the request origin. Production fails closed
  // unless SITE_URL provides the canonical public origin.
  if (process.env.NODE_ENV !== "production") {
    try {
      const requestUrl = new URL(request.url);
      if (
        (requestUrl.protocol === "https:" || requestUrl.protocol === "http:") &&
        !requestUrl.username &&
        !requestUrl.password
      ) {
        origins.add(requestUrl.origin);
      }
    } catch {
      // A non-HTTP request URL cannot establish a safe local fallback origin.
    }
  }

  return origins;
}

function requestHasAllowedOrigin(request: Request, origins: Set<string>): boolean {
  const origin = request.headers.get("origin");
  if (!origin || origin === "null" || request.headers.get("sec-fetch-site") === "cross-site") {
    return false;
  }

  try {
    const parsed = new URL(origin);
    return (
      (parsed.protocol === "https:" || parsed.protocol === "http:") &&
      !parsed.username &&
      !parsed.password &&
      parsed.pathname === "/" &&
      !parsed.search &&
      !parsed.hash &&
      origin === parsed.origin &&
      origins.has(parsed.origin)
    );
  } catch {
    return false;
  }
}

function sameOriginReferrerPath(request: Request, origins: Set<string>): string | null {
  const referrer = request.headers.get("referer");
  if (!referrer) {
    return null;
  }

  try {
    const parsed = new URL(referrer);
    return origins.has(parsed.origin) ? normalizeLeadPathname(parsed.pathname) : null;
  } catch {
    return null;
  }
}

function rateLimitKey(request: Request): string {
  const forwarded =
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const safeKey = forwarded.replace(/[^a-fA-F0-9.:_-]/g, "").slice(0, 64);
  return safeKey || "unknown";
}

function webhookUrlFor(leadType: ReturnType<typeof leadTypeFromPath>): URL | null {
  const rawBaseUrl = process.env.LEAD_WEBHOOK_BASE_URL;
  if (!rawBaseUrl) {
    return null;
  }

  try {
    const baseUrl = new URL(rawBaseUrl);
    if (
      baseUrl.protocol !== "https:" ||
      baseUrl.username ||
      baseUrl.password ||
      baseUrl.search ||
      baseUrl.hash
    ) {
      return null;
    }

    baseUrl.pathname = `${baseUrl.pathname.replace(/\/+$/, "")}/${leadType}`;
    return baseUrl;
  } catch {
    return null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export async function POST(request: Request) {
  const origins = expectedOrigins(request);
  if (!origins.size) {
    return jsonResponse(
      { success: false, message: "Lead submission is temporarily unavailable." },
      503,
    );
  }

  if (!requestHasAllowedOrigin(request, origins)) {
    return jsonResponse({ success: false, message: "Request origin is not allowed." }, 403);
  }

  const contentType = request.headers.get("content-type")?.split(";", 1)[0]?.trim().toLowerCase();
  if (contentType !== "application/json") {
    return jsonResponse({ success: false, message: "Content type must be application/json." }, 415);
  }

  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > LEAD_BODY_LIMIT_BYTES) {
    return jsonResponse({ success: false, message: "Request is too large." }, 413);
  }

  const rateLimit = takeLeadRateLimit(rateLimitKey(request));
  if (!rateLimit.allowed) {
    return jsonResponse(
      { success: false, message: "Too many requests. Please try again later." },
      429,
      { "Retry-After": String(rateLimit.retryAfterSeconds) },
    );
  }

  let bodyText: string;
  try {
    bodyText = await request.text();
  } catch {
    return jsonResponse({ success: false, message: "Unable to read the request." }, 400);
  }

  if (new TextEncoder().encode(bodyText).byteLength > LEAD_BODY_LIMIT_BYTES) {
    return jsonResponse({ success: false, message: "Request is too large." }, 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(bodyText) as unknown;
  } catch {
    return jsonResponse({ success: false, message: "Invalid request data." }, 400);
  }

  if (!isRecord(body)) {
    return jsonResponse({ success: false, message: "Invalid request data." }, 400);
  }

  if (
    (body.website !== undefined && typeof body.website !== "string") ||
    (typeof body.website === "string" && body.website.trim())
  ) {
    return jsonResponse({ success: false, message: "Unable to submit this request." }, 422);
  }

  const referrerPath = sameOriginReferrerPath(request, origins);
  const validation = validateLeadRequest({
    ...body,
    ...(referrerPath ? { pathname: referrerPath } : {}),
  });

  if (!validation.success) {
    return jsonResponse(
      {
        success: false,
        message: "Please check the highlighted fields and try again.",
        errors: validation.errors,
      },
      422,
    );
  }

  const leadType = leadTypeFromPath(validation.data.pathname);
  const downstreamUrl = webhookUrlFor(leadType);
  if (!downstreamUrl) {
    return jsonResponse(
      { success: false, message: "Lead submission is temporarily unavailable." },
      503,
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), downstreamTimeoutMs);

  try {
    const downstreamResponse = await fetch(downstreamUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildLeadWebhookPayload(validation.data)),
      cache: "no-store",
      redirect: "manual",
      signal: controller.signal,
    });

    if (!downstreamResponse.ok) {
      return jsonResponse(
        { success: false, message: "We could not send your request. Please try again." },
        502,
      );
    }

    return jsonResponse({ success: true });
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "AbortError";
    return jsonResponse(
      {
        success: false,
        message: timedOut
          ? "The request timed out, so delivery could not be confirmed. Please do not submit it again immediately."
          : "We could not send your request. Please try again.",
      },
      timedOut ? 504 : 502,
    );
  } finally {
    clearTimeout(timeout);
  }
}
