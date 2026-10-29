import { serviceCategory } from "@/lib/service-route-config";

export type PublicGlobalLink = {
  kind: "country" | "certificate";
  country: string;
  slug: string;
  canonicalPath: string;
};

/** Only one record may own each direct public URL. */
export function uniquePublicLinks<T extends { canonicalPath: string }>(entries: readonly T[]): T[] {
  const counts = new Map<string, number>();
  for (const entry of entries) counts.set(entry.canonicalPath, (counts.get(entry.canonicalPath) ?? 0) + 1);
  return entries.filter((entry) => counts.get(entry.canonicalPath) === 1);
}

/** Existing nested CMS slugs keep their identity; only the last segment is public. */
export function publicServiceSlug(servicePath: string): string {
  return servicePath.split("/").at(-1) ?? "";
}

/** A colliding public slug must never select an arbitrary CMS record. */
export function uniqueServicePath(paths: readonly string[], slug: string): string | null {
  const matches = [...new Set(paths)].filter((path) => publicServiceSlug(path) === slug);
  return matches.length === 1 ? matches[0] : null;
}

export type RouteSearchParams = Record<string, string | string[] | undefined>;

/** Keep campaign parameters when redirecting bookmarks and old search results. */
export function redirectPath(pathname: string, searchParams: RouteSearchParams): string {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    for (const item of Array.isArray(value) ? value : value === undefined ? [] : [value]) {
      query.append(key, item);
    }
  }
  return query.size ? `${pathname}?${query}` : pathname;
}

export function publicHref(
  href: string,
  siteOrigin?: string,
  globalEntries: readonly PublicGlobalLink[] = [],
): string {
  if (href.startsWith("//") || href.includes("\\")) return href;

  const relative = href.startsWith("/");
  let url: URL;
  try {
    url = new URL(href, siteOrigin ?? "https://www.jrcompliance.com");
  } catch {
    return href;
  }
  if (!relative && (
    !["http:", "https:"].includes(url.protocol) ||
    url.username || url.password ||
    !["jrcompliance.com", "www.jrcompliance.com", "test.jrcompliance.com", siteOrigin && new URL(siteOrigin).hostname].includes(url.hostname)
  )) return href;

  const segments = url.pathname.split("/").filter(Boolean);
  const [family, categorySlug, ...rest] = segments;
  let pathname: string | undefined;
  if ((family === "globals" || family === "global") && categorySlug) {
    pathname = `/global/${publicServiceSlug(segments.slice(1).join("/"))}`;
  } else if (family === "corporate" || family === "approval") {
    pathname = `/${family}/${publicServiceSlug(segments.slice(1).join("/"))}`;
  } else {
    const category = serviceCategory(family);
    if (category && categorySlug && !rest.length) {
      pathname = `/${category.family}/${categorySlug}`;
    } else {
      const matches = globalEntries.filter((entry) => entry.kind === "country"
        ? segments.length === 1 && entry.country === family
        : segments.length === 2 && entry.country === family && entry.slug === categorySlug);
      if (matches.length === 1) pathname = matches[0].canonicalPath;
    }
  }
  return pathname ? `${pathname}${url.search}${url.hash}` : href;
}

/** Normalize link fields in mapped CMS/fallback content without changing prose or media. */
export function publicContentLinks<T>(content: T, siteOrigin: string, globalEntries: readonly PublicGlobalLink[] = []): T {
  function visit(value: unknown): unknown {
    if (Array.isArray(value)) return value.map(visit);
    if (!value || typeof value !== "object") return value;
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [
      key,
      typeof child === "string" && ["href", "url", "canonicalUrl"].includes(key)
        ? publicHref(child, siteOrigin, globalEntries)
        : visit(child),
    ]));
  }
  return visit(content) as T;
}
