"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import { useOptionalIntegration, usePrivacy } from "./privacy-provider";

type MetaPixel = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: MetaPixel;
  loaded: boolean;
  version: string;
};

type TagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  fbq?: MetaPixel;
  _fbq?: MetaPixel;
};

// Existing Pixel ID in GTM-K938HN3. GTM owns the PageView and conversion events.
const metaPixelId = "1027798165813441";

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
  const [loadMetaPixel, setLoadMetaPixel] = useState(false);

  useEffect(() => register({ id: "google-tag-manager", category: "analytics" }), [register]);

  const start = useCallback(() => {
    // A tag-manager container can contain both analytics and advertising tags.
    if (!analyticsAllowed) return () => {};

    const tagWindow = window as TagWindow;

    // The container's PageView tag runs while its Meta base tag is paused.
    // Install the standard queue synchronously so events can wait for the SDK.
    if (!tagWindow.fbq) {
      const fbq = function (...args: unknown[]) {
        if (fbq.callMethod) fbq.callMethod.apply(fbq, args);
        else fbq.queue.push(args);
      } as MetaPixel;
      fbq.queue = [];
      fbq.push = fbq;
      fbq.loaded = true;
      fbq.version = "2.0";
      tagWindow.fbq = fbq;
      tagWindow._fbq = tagWindow._fbq || fbq;
      fbq("consent", "grant");
      fbq("init", metaPixelId);
      setLoadMetaPixel(true);
    } else {
      tagWindow.fbq("consent", "grant");
    }

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
      tagWindow.fbq?.("consent", "revoke");
    };
  }, [analyticsAllowed]);

  useOptionalIntegration("google-tag-manager", "marketing", start);

  return enabled ? (
    <>
      {loadMetaPixel ? (
        <Script
          id="meta-pixel-base"
          src="https://connect.facebook.net/en_US/fbevents.js"
          strategy="afterInteractive"
          async
        />
      ) : null}
      <Script
        id="google-tag-manager"
        src="https://www.googletagmanager.com/gtm.js?id=GTM-K938HN3"
        strategy="afterInteractive"
        async
      />
    </>
  ) : null;
}
