"use client";

import type { MouseEvent, PropsWithChildren } from "react";
import { usePrivacy } from "@/components/privacy/privacy-provider";

/** Use the root GTM container and its current consent; never queue denied clicks. */
export function BisAdsInteractions({ children }: PropsWithChildren) {
  const { allowed } = usePrivacy();

  function trackClick(event: MouseEvent<HTMLDivElement>) {
    if (!allowed("analytics") || !allowed("marketing")) return;
    const target = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
    if (!target || !event.currentTarget.contains(target)) return;
    const href = target.getAttribute("href") ?? "";
    const type = target.dataset.bisCta ?? (href.startsWith("tel:") ? "call"
      : /^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href) ? "whatsapp"
        : href === "#expert-consultation" ? "consultation" : null);
    if (!type) return;
    const tagWindow = window as Window & { dataLayer?: Record<string, unknown>[] };
    tagWindow.dataLayer ??= [];
    tagWindow.dataLayer.push({
      event: type === "whatsapp" ? "whatsapp_click" : "cta_click",
      page_path: "/ads/bis-certification",
      cta_type: type,
      cta_location: target.dataset.bisLocation ?? "site-chrome",
    });
  }

  return <div onClickCapture={trackClick}>{children}</div>;
}
