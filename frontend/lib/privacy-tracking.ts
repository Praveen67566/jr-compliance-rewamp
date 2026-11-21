/** Only existing, non-PII events can cross the optional tracking boundary. */
export function trackingEvent(value: unknown): Record<string, string> | null {
  if (!value || typeof value !== "object") return null;
  const event = value as Record<string, unknown>;
  if (!["page_view", "cta_click", "whatsapp_click"].includes(String(event.event))
    || typeof event.page_path !== "string" || !/^\/[a-zA-Z0-9/_-]*$/.test(event.page_path)) return null;
  const safe: Record<string, string> = { event: String(event.event), page_path: event.page_path };
  for (const key of ["cta_type", "cta_location"]) {
    if (typeof event[key] === "string" && /^[a-zA-Z0-9_-]{1,64}$/.test(event[key])) safe[key] = event[key];
  }
  return safe;
}

/** No dynamic HTML, URLs, form values, query strings, or identifiers from visitors. */
export function trackingFrameDocument(origin: string, pathname: string) {
  const config = JSON.stringify({ origin, path: trackingEvent({ event: "page_view", page_path: pathname })?.page_path ?? "/" }).replace(/</g, "\\u003c");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="referrer" content="no-referrer"><title>Optional measurement</title></head><body><script>
  (() => {
    const config = ${config};
    window.dataLayer = [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag("consent", "default", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
    gtag("set", { page_location: config.origin + config.path, page_referrer: "", ads_data_redaction: true, url_passthrough: false });
    gtag("consent", "update", { analytics_storage: "granted", ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted" });
    gtag("js", new Date());
    const fbq = function () { if (fbq.callMethod) fbq.callMethod.apply(fbq, arguments); else fbq.queue.push(Array.from(arguments)); };
    fbq.queue = []; fbq.push = fbq; fbq.loaded = true; fbq.version = "2.0";
    window.fbq = window._fbq = fbq;
    fbq("consent", "grant"); fbq("init", "1027798165813441");
    dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js", page_path: config.path });
    let lastPath = config.path;
    let started = false;
    addEventListener("message", (message) => {
      if (message.source !== parent || message.origin !== config.origin) return;
      if (message.data?.type === "jr-tracking-start" && !started) {
        started = true;
        for (const [id, src] of [["meta-pixel-base", "https://connect.facebook.net/en_US/fbevents.js"], ["gtm-container", "https://www.googletagmanager.com/gtm.js?id=GTM-K938HN3"]]) {
          const script = document.createElement("script"); script.id = id; script.src = src; script.async = true; document.head.append(script);
        }
        return;
      }
      if (message.data?.type !== "jr-tracking-event") return;
      const event = message.data.event;
      if (!event || !["page_view", "cta_click", "whatsapp_click"].includes(event.event) || typeof event.page_path !== "string" || !/^\\/[a-zA-Z0-9/_-]*$/.test(event.page_path)) return;
      if (event.event === "page_view" && event.page_path === lastPath) return;
      if (event.event === "page_view") { lastPath = event.page_path; gtag("set", { page_location: config.origin + lastPath }); }
      dataLayer.push(event);
    });
  })();</script></body></html>`;
}

/** Retire known first-party identifiers left by the previous parent-page loader.
 * HttpOnly/third-party cookies and already transmitted data remain vendor-owned. */
export function clearOptionalStorage(analytics: boolean, marketing: boolean) {
  const denied = (name: string) => (!analytics && /^(?:_ga(?:_|$)|_gid$|_gat|_hj|hj[A-Z]|_clck$|_clsk$)/.test(name))
    || (!marketing && /^(?:_fbp$|_fbc$|_gcl_)/.test(name));
  try {
    const parts = location.hostname.split(".");
    const domains = ["", ...parts.map((_, index) => parts.slice(index).join(".")).filter((domain) => domain.includes("."))];
    const segments = location.pathname.split("/");
    const paths = new Set(["/", location.pathname, ...segments.map((_, index) => segments.slice(0, index + 1).join("/") || "/")]);
    for (const cookie of document.cookie.split(";")) {
      const name = cookie.split("=")[0].trim();
      if (denied(name)) for (const domain of domains) for (const path of paths) {
        document.cookie = `${name}=; Max-Age=0; Path=${path}${domain ? `; Domain=${domain}` : ""}; SameSite=Lax`;
      }
    }
  } catch { /* Storage restrictions must never disrupt the page. */ }
  for (const name of ["localStorage", "sessionStorage"] as const) {
    try {
      const storage = window[name];
      for (let index = storage.length - 1; index >= 0; index--) {
        const key = storage.key(index);
        if (key && denied(key)) storage.removeItem(key);
      }
    } catch { /* Consent can still be held in memory. */ }
  }
}
