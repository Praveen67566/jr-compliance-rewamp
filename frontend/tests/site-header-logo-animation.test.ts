import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { registerHooks } from "node:module";
import { after, afterEach, before, describe, it } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { SiteHeader } from "@/components/site-header";
import { fallbackHomepage } from "@/data/homepage-fallback";
import type { SiteSettings } from "@/lib/types";

const originalFetch = globalThis.fetch;
const originalUrl = process.env.STRAPI_URL;
const originalToken = process.env.STRAPI_API_TOKEN;
let getHomepage: typeof import("@/lib/strapi").getHomepageFromStrapi;

before(async () => {
  process.env.STRAPI_URL = "https://cms.example.test";
  process.env.STRAPI_API_TOKEN = "test-reader-token";
  // Next normally resolves this marker to its empty server implementation.
  const hooks = registerHooks({
    resolve(specifier, context, nextResolve) {
      return nextResolve(
        specifier === "server-only" ? "next/dist/compiled/server-only/empty.js" : specifier,
        context,
      );
    },
  });
  try {
    getHomepage = (await import("@/lib/strapi")).getHomepageFromStrapi;
  } finally {
    hooks.deregister();
  }
});

afterEach(() => {
  globalThis.fetch = originalFetch;
});

after(() => {
  if (originalUrl === undefined) delete process.env.STRAPI_URL;
  else process.env.STRAPI_URL = originalUrl;
  if (originalToken === undefined) delete process.env.STRAPI_API_TOKEN;
  else process.env.STRAPI_API_TOKEN = originalToken;
});

async function siteFromCms(settings: Record<string, unknown>) {
  const requests: URL[] = [];
  globalThis.fetch = (async (input) => {
    const url = new URL(String(input));
    requests.push(url);
    return Response.json({ data: url.pathname === "/api/site-setting" ? settings : {} });
  }) as typeof fetch;
  const page = await getHomepage(fallbackHomepage);
  assert.ok(page);
  const query = requests.find((url) => url.pathname === "/api/site-setting")?.searchParams;
  assert.equal(query?.get("populate[headerLogoAnimationImage]"), "true");
  assert.equal(query?.has("populate[headerLogoAnimationEnabled]"), false);
  assert.equal(query?.get("status"), "published");
  return page.site;
}

function renderHeader(site: SiteSettings) {
  return renderToStaticMarkup(createElement(SiteHeader, {
    site,
    navigation: fallbackHomepage.navigation,
  }));
}

describe("CMS-controlled header logo animation", () => {
  it("defaults to off without making festival media required", () => {
    assert.deepEqual(fallbackHomepage.site.headerLogoAnimation, { enabled: false });
    const schema = JSON.parse(readFileSync(new URL(
      "../../cms/src/api/site-setting/content-types/site-setting/schema.json",
      import.meta.url,
    ), "utf8"));
    assert.deepEqual(schema.attributes.headerLogoAnimationEnabled, { type: "boolean", default: false });
    assert.deepEqual(schema.attributes.headerLogoAnimationImage, {
      type: "media", multiple: false, allowedTypes: ["images"],
    });
    assert.equal(schema.attributes.headerLogo.required, true);
  });

  it("keeps older CMS records on their normal logo", async () => {
    const site = await siteFromCms({ headerLogo: { url: "/uploads/jr.svg" } });
    assert.equal(site.logo, "https://cms.example.test/uploads/jr.svg");
    assert.deepEqual(site.headerLogoAnimation, { enabled: false });
  });

  it("maps enabled GIF media to an absolute URL without replacing the normal logo", async () => {
    const site = await siteFromCms({
      headerLogo: { url: "/uploads/jr.svg", width: 146, height: 38 },
      headerLogoAnimationEnabled: true,
      headerLogoAnimationImage: { url: "/uploads/festival.gif", width: 146, height: 38 },
    });
    assert.equal(site.logo, "https://cms.example.test/uploads/jr.svg");
    assert.deepEqual(site.headerLogoAnimation, {
      enabled: true, image: "https://cms.example.test/uploads/festival.gif",
    });
  });

  it("stays off for a disabled toggle, missing media, or malformed CMS values", async () => {
    for (const settings of [
      { headerLogoAnimationEnabled: false, headerLogoAnimationImage: { url: "/uploads/festival.gif" } },
      { headerLogoAnimationEnabled: true },
      { headerLogoAnimationEnabled: true, headerLogoAnimationImage: { url: "  " } },
      { headerLogoAnimationEnabled: "true", headerLogoAnimationImage: { url: "/uploads/festival.gif" } },
    ]) {
      assert.deepEqual((await siteFromCms(settings)).headerLogoAnimation, { enabled: false });
    }
  });

  it("preserves absolute CDN media URLs", async () => {
    const image = "https://media.example.test/festival.gif";
    const site = await siteFromCms({
      headerLogo: { url: "/uploads/jr.svg", width: 146, height: 38 },
      headerLogoAnimationEnabled: true,
      headerLogoAnimationImage: { url: image, width: 146, height: 38 },
    });
    assert.deepEqual(site.headerLogoAnimation, { enabled: true, image });
  });

  it("accepts different or missing original dimensions for frontend scaling", async () => {
    for (const dimensions of [{ width: 292, height: 76 }, { width: 146, height: 39 }, { width: 0, height: 38 }, {}]) {
      const site = await siteFromCms({
        headerLogo: { url: "/uploads/jr.svg", width: 146, height: 38 },
        headerLogoAnimationEnabled: true,
        headerLogoAnimationImage: { url: "/uploads/festival.gif", ...dimensions },
      });
      assert.deepEqual(site.headerLogoAnimation, {
        enabled: true, image: "https://cms.example.test/uploads/festival.gif",
      });
    }
  });

  it("omits the festival image when disabled even if an image was saved", () => {
    const markup = renderHeader({
      ...fallbackHomepage.site,
      headerLogoAnimation: { enabled: false, ...{ image: "/festival.gif" } },
    });
    assert.match(markup, /src="\/images\/jr-logo.svg"/);
    assert.doesNotMatch(markup, /festival\.gif|header-logo-primary|header-logo-festival/);
  });

  it("keeps the brand visible before the decorative GIF loads", () => {
    const markup = renderHeader({
      ...fallbackHomepage.site,
      headerLogoAnimation: { enabled: true, image: "/festival.gif" },
    });
    assert.match(markup, /aria-label="JR Compliance home"/);
    assert.match(markup, /src="\/images\/jr-logo.svg" alt="JR Compliance"/);
    assert.match(markup, /src="\/festival.gif" alt="" aria-hidden="true"/);
    assert.doesNotMatch(markup, /animate-\[header-logo/);
  });
});
