"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { usePrivacy } from "./privacy-provider";
import { clearOptionalStorage, trackingFrameDocument, trackingEvent } from "@/lib/privacy-tracking";

type TagWindow = Window & { dataLayer?: unknown[] };

/** Mixed container: require BOTH purposes. The opaque frame cannot observe the
 * parent DOM, install parent timers, access its storage, or survive withdrawal. */
export function GoogleTagManager() {
  const { allowed, register, ready } = usePrivacy();
  const pathname = usePathname();
  const permitted = allowed("analytics") && allowed("marketing");
  const frame = useRef<HTMLIFrameElement | null>(null);
  const permission = useRef(allowed);
  permission.current = allowed;

  useEffect(() => {
    const analytics = register({ id: "google-tag-manager", category: "analytics" });
    const marketing = register({ id: "google-tag-manager", category: "marketing" });
    return () => { analytics(); marketing(); };
  }, [register]);

  useEffect(() => {
    if (ready) clearOptionalStorage(allowed("analytics"), allowed("marketing"));
  }, [ready, allowed]);

  useEffect(() => {
    if (!permitted) return;
    const element = document.createElement("iframe");
    element.id = "google-tag-manager";
    element.title = "Optional measurement";
    element.hidden = true;
    element.setAttribute("aria-hidden", "true");
    element.setAttribute("sandbox", "allow-scripts");
    element.referrerPolicy = "no-referrer";
    element.srcdoc = trackingFrameDocument(location.origin, location.pathname);
    frame.current = element;
    const tagWindow = window as TagWindow;
    const dataLayer = tagWindow.dataLayer ?? [];
    tagWindow.dataLayer = dataLayer;
    const previousPush = dataLayer.push;
    let loaded = false;
    let startupTimer: number | undefined;
    const pending: Record<string, string>[] = [];
    const send = (value: unknown) => {
      if (!permission.current("analytics") || !permission.current("marketing")) return;
      const event = trackingEvent(value);
      if (!event) return;
      if (loaded) element.contentWindow?.postMessage({ type: "jr-tracking-event", event }, "*");
      else if (pending.length < 20) pending.push(event);
    };
    dataLayer.push = (...items) => {
      items.forEach(send);
      return previousPush.apply(dataLayer, items);
    };
    const onLoad = () => {
      if (loaded) return;
      if (!permission.current("analytics") || !permission.current("marketing")) return;
      loaded = true;
      element.contentWindow?.postMessage({ type: "jr-tracking-start" }, "*");
      pending.splice(0).forEach(send);
    };
    // Keep vendor bootstrap outside the frame's document-load work.
    const onDocumentLoad = () => { startupTimer = window.setTimeout(onLoad, 100); };
    element.addEventListener("load", onDocumentLoad);
    document.body.append(element);
    return () => {
      // Destroy the execution context, including arbitrary container timers and SDKs.
      loaded = false; pending.length = 0;
      window.clearTimeout(startupTimer);
      element.remove(); frame.current = null;
      element.removeEventListener("load", onDocumentLoad);
      dataLayer.push = previousPush;
    };
  }, [permitted]);

  useEffect(() => {
    if (!permitted) return;
    const event = { event: "page_view", page_path: pathname };
    frame.current?.contentWindow?.postMessage({ type: "jr-tracking-event", event }, "*");
  }, [pathname, permitted]);

  return null;
}
