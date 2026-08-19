import { createHmac } from "node:crypto";

import type { Core } from "@strapi/strapi";

type RevalidationEvent = "entry.publish" | "entry.unpublish" | "entry.delete" | "media.update";

type StrapiWithRevalidationFlag = Core.Strapi & {
  __jrRevalidationSuppressed?: boolean;
};

const ALL_PAGE_TAGS = [
  "jr-site-settings",
  "jr-homepage",
  "jr-about-page",
  "jr-careers-page",
  "jr-contact-page",
  "jr-company-registration-pages",
  "jr-mca-service-pages",
  "jr-import-export-service-pages",
  "jr-government-license-certification-pages",
  "jr-ipr-service-pages",
  "jr-fssai-service-pages",
  "jr-sebi-business-registration-pages",
  "jr-tax-accounting-pages",
  "jr-labour-compliance-pages",
  "jr-fund-raising-pages",
  "jr-bureau-indian-standards-pages",
  "jr-pollution-advisory-pages",
  "jr-telecommunication-engineering-centre-pages",
  "jr-wireless-planning-coordination-pages",
  "jr-bureau-energy-efficiency-pages",
  "jr-cdsco-registration-pages",
  "jr-aerb-approval-pages",
  "jr-lmpc-certification-pages",
  "jr-stqc-pages",
] as const;

/**
 * A collection entry can be selected by more than one page. Keep this routing
 * beside the CMS schema instead of asking the frontend to trust arbitrary tags
 * supplied by a webhook caller.
 */
const cacheTagsByUid: Record<string, readonly string[]> = {
  "api::site-setting.site-setting": ["jr-site-settings"],
  "api::home-page.home-page": ["jr-homepage"],
  "api::about-page.about-page": ["jr-about-page"],
  "api::careers-page.careers-page": ["jr-careers-page"],
  "api::contact-page.contact-page": ["jr-contact-page"],
  "api::company-registration-page.company-registration-page": [
    "jr-company-registration-pages",
  ],
  "api::mca-service-page.mca-service-page": ["jr-mca-service-pages"],
  "api::import-export-service-page.import-export-service-page": [
    "jr-import-export-service-pages",
  ],
  "api::government-license-certification-page.government-license-certification-page": [
    "jr-government-license-certification-pages",
  ],
  "api::ipr-service-page.ipr-service-page": ["jr-ipr-service-pages"],
  "api::fssai-service-page.fssai-service-page": ["jr-fssai-service-pages"],
  "api::sebi-business-registration-page.sebi-business-registration-page": [
    "jr-sebi-business-registration-pages",
  ],
  "api::tax-accounting-page.tax-accounting-page": ["jr-tax-accounting-pages"],
  "api::labour-compliance-page.labour-compliance-page": [
    "jr-labour-compliance-pages",
  ],
  "api::fund-raising-page.fund-raising-page": ["jr-fund-raising-pages"],
  "api::bureau-indian-standards-page.bureau-indian-standards-page": [
    "jr-bureau-indian-standards-pages",
  ],
  "api::pollution-advisory-page.pollution-advisory-page": [
    "jr-pollution-advisory-pages",
  ],
  "api::telecommunication-engineering-centre-page.telecommunication-engineering-centre-page": [
    "jr-telecommunication-engineering-centre-pages",
  ],
  "api::wireless-planning-coordination-page.wireless-planning-coordination-page": [
    "jr-wireless-planning-coordination-pages",
  ],
  "api::bureau-energy-efficiency-page.bureau-energy-efficiency-page": [
    "jr-bureau-energy-efficiency-pages",
  ],
  "api::cdsco-registration-page.cdsco-registration-page": [
    "jr-cdsco-registration-pages",
  ],
  "api::aerb-approval-page.aerb-approval-page": ["jr-aerb-approval-pages"],
  "api::lmpc-certification-page.lmpc-certification-page": [
    "jr-lmpc-certification-pages",
  ],
  "api::stqc-page.stqc-page": ["jr-stqc-pages"],
  "api::service-category.service-category": ["jr-homepage"],
  "api::service.service": ["jr-homepage"],
  "api::brand-logo.brand-logo": ["jr-homepage"],
  "api::testimonial.testimonial": ["jr-homepage"],
  "api::recognition.recognition": ["jr-homepage"],
  "api::faq-category.faq-category": ["jr-homepage"],
  "api::faq.faq": ["jr-homepage", "jr-careers-page"],
  "api::insight.insight": ["jr-homepage"],
  "api::timeline-event.timeline-event": ["jr-about-page"],
  "api::team-member.team-member": ["jr-about-page"],
  "api::achievement.achievement": ["jr-about-page"],
  "api::job-opening.job-opening": ["jr-careers-page"],
  "api::career-testimonial.career-testimonial": ["jr-careers-page"],
  "api::career-gallery-item.career-gallery-item": ["jr-careers-page"],
};

type NotificationPayload = {
  event: RevalidationEvent;
  model: string;
  tags: string[];
  documentIds: string[];
  occurredAt: string;
};

function documentIdsFrom(result: unknown): string[] {
  const candidates = Array.isArray(result)
    ? result
    : result && typeof result === "object" && "entries" in result && Array.isArray(result.entries)
      ? result.entries
      : [result];

  return candidates.flatMap((entry) => {
    if (!entry || typeof entry !== "object" || !("documentId" in entry)) {
      return [];
    }

    const documentId = entry.documentId;
    return typeof documentId === "string" ? [documentId] : [];
  });
}

function entriesFrom(result: unknown): unknown[] {
  if (Array.isArray(result)) {
    return result;
  }

  if (result && typeof result === "object" && "entries" in result && Array.isArray(result.entries)) {
    return result.entries;
  }

  return [result];
}

/** A create/update only changes the live site when its result is published. */
function hasPublishedResult(result: unknown): boolean {
  return entriesFrom(result).some(
    (entry) =>
      entry !== null &&
      entry !== undefined &&
      typeof entry === "object" &&
      "publishedAt" in entry &&
      Boolean(entry.publishedAt),
  );
}

function isRevalidationSuppressed(strapi: Core.Strapi): boolean {
  return Boolean((strapi as StrapiWithRevalidationFlag).__jrRevalidationSuppressed);
}

/**
 * Avoid one synchronous outbound request per document/media record while the
 * opt-in local seed is creating a fresh site. The flag is instance-local and
 * is always restored, so normal editor publishes remain live-invalidated.
 */
export async function withNextRevalidationSuppressed<T>(
  strapi: Core.Strapi,
  work: () => Promise<T>,
): Promise<T> {
  const target = strapi as StrapiWithRevalidationFlag;
  const previous = target.__jrRevalidationSuppressed;
  target.__jrRevalidationSuppressed = true;

  try {
    return await work();
  } finally {
    target.__jrRevalidationSuppressed = previous;
  }
}

async function notifyFrontend(
  strapi: Core.Strapi,
  event: RevalidationEvent,
  model: string,
  tags: readonly string[],
  result: unknown,
) {
  if (isRevalidationSuppressed(strapi)) {
    return;
  }

  const endpoint = process.env.NEXT_REVALIDATE_URL;
  const secret = process.env.STRAPI_REVALIDATE_SECRET;

  if (!endpoint || !secret) {
    return;
  }

  const payload: NotificationPayload = {
    event,
    model,
    tags: [...tags],
    documentIds: documentIdsFrom(result),
    occurredAt: new Date().toISOString(),
  };
  const body = JSON.stringify(payload);
  const signature = createHmac("sha256", secret).update(body).digest("hex");

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-strapi-event": event,
        "x-strapi-signature": `sha256=${signature}`,
      },
      body,
      signal: AbortSignal.timeout(5_000),
    });

    if (!response.ok) {
      strapi.log.warn(
        `Next.js cache revalidation returned ${response.status} for ${model}. Content was published, but its cache may wait for normal ISR.`,
      );
    }
  } catch (error) {
    // A temporarily unavailable frontend must never prevent editors from
    // publishing content. The regular 60-second Next.js revalidation remains
    // the safe fallback.
    strapi.log.warn(`Could not notify Next.js after ${event} for ${model}: ${String(error)}`);
  }
}

/** Register signed, best-effort publish invalidation for the Next.js reader. */
export function registerNextRevalidation(strapi: Core.Strapi) {
  strapi.documents.use(async (context, next) => {
    const result = await next();
    const tags = cacheTagsByUid[context.uid];

    if (tags) {
      const action = context.action as string;
      const requestedStatus = (context.params as { status?: unknown }).status;
      const event =
        action === "unpublish"
          ? "entry.unpublish"
          : action === "delete"
            ? "entry.delete"
            : action === "publish" ||
                ((action === "create" || action === "update") &&
                  (requestedStatus === "published" || hasPublishedResult(result)))
              ? "entry.publish"
              : null;

      if (event) {
        await notifyFrontend(strapi, event, context.uid, tags, result);
      }
    }

    return result;
  });

  strapi.db.lifecycles.subscribe({
    models: ["plugin::upload.file"],
    async afterCreate(event) {
      await notifyFrontend(strapi, "media.update", event.model.uid, ALL_PAGE_TAGS, event.result);
    },
    async afterUpdate(event) {
      await notifyFrontend(strapi, "media.update", event.model.uid, ALL_PAGE_TAGS, event.result);
    },
    async afterDelete(event) {
      await notifyFrontend(strapi, "media.update", event.model.uid, ALL_PAGE_TAGS, event.result);
    },
  });
}
