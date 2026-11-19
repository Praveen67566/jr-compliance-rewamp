"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import { useOptionalIntegration, usePrivacy } from "./privacy-provider";

type TagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

const deniedConsent = {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
};

export function GoogleTagManager() {
  const { allowed, register } = usePrivacy();
  const analyticsAllowed = allowed("analytics");
  const initialized = useRef(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => register({ id: "google-tag-manager", category: "analytics" }), [register]);

  const start = useCallback(() => {
    // A tag-manager container can contain both analytics and advertising tags.
    if (!analyticsAllowed) return () => {};

    const tagWindow = window as TagWindow;
    tagWindow.dataLayer = tagWindow.dataLayer || [];
    tagWindow.gtag = tagWindow.gtag || function () { tagWindow.dataLayer!.push(arguments); };

    if (!initialized.current) {
      tagWindow.gtag("consent", "default", deniedConsent);
      tagWindow.gtag("js", new Date());
    }
    tagWindow.gtag("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    });
    if (!initialized.current) {
      tagWindow.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
      initialized.current = true;
    }
    setEnabled(true);

    return () => {
      tagWindow.gtag?.("consent", "update", deniedConsent);
    };
  }, [analyticsAllowed]);

  useOptionalIntegration("google-tag-manager", "marketing", start);

  return enabled ? (
    <Script
      id="google-tag-manager"
      src="https://www.googletagmanager.com/gtm.js?id=GTM-K938HN3"
      strategy="afterInteractive"
      async
    />
  ) : null;
}
