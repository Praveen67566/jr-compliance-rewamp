import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import { after, before, beforeEach, describe, it } from "node:test";

const originalFetch = globalThis.fetch;
const originalEnvironment = {
  STRAPI_URL: process.env.STRAPI_URL,
  STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN,
  SITE_URL: process.env.SITE_URL,
};
let routes: typeof import("@/lib/service-routes");
let content: typeof import("@/lib/content");
let globals: typeof import("@/lib/global-routes");
let records: Record<string, Record<string, unknown>[]>;
let requests: URL[];
const stamp = "2026-10-29T00:00:00.000Z";
const cta = { label: "Contact us", href: "/contact-us" };

function service(slug: string) {
  return {
    slug, title: "CMS service", menuLabel: "CMS service", publishedAt: stamp, updatedAt: stamp,
    hero: { eyebrow: "Service", description: "CMS service description", cta },
    faqs: { eyebrow: "FAQs", title: "Questions", items: [{ question: "How?", answer: "Contact us." }] },
    finalCta: { title: "Speak with us", cta },
    seo: { metaTitle: "CMS service", metaDescription: "CMS service description" },
  };
}

before(async () => {
  process.env.STRAPI_URL = "https://cms.example.test";
  process.env.STRAPI_API_TOKEN = "test-reader-token";
  process.env.SITE_URL = "https://test.jrcompliance.com";
  const hooks = registerHooks({
    resolve(specifier, context, nextResolve) {
      return nextResolve(specifier === "server-only" ? "next/dist/compiled/server-only/empty.js" : specifier, context);
    },
  });
  try {
    routes = await import("@/lib/service-routes");
    content = await import("@/lib/content");
    globals = await import("@/lib/global-routes");
  } finally {
    hooks.deregister();
  }
});

beforeEach(() => {
  records = {
    "mca-service-pages": [service("cms-service")],
    "cdsco-registration-pages": [service("cdsco-registration/drug-cdsco-registration")],
  };
  requests = [];
  globalThis.fetch = (async (input) => {
    const url = new URL(String(input));
    requests.push(url);
    assert.equal(url.origin, "https://cms.example.test");
    assert.equal(url.searchParams.get("status"), "published");
    if (url.pathname === "/api/site-setting") {
      return Response.json({ data: { headerMenu: [{ label: "Corporate", categories: [{
        title: "MCA Services", links: [{ label: "CMS service", href: "/corporate/cms-service" }],
      }] }] } });
    }
    let data = records[url.pathname.slice("/api/".length)] ?? [];
    const slug = url.searchParams.get("filters[slug][$eq]");
    const country = url.searchParams.get("filters[countrySlug][$eq]");
    if (slug) data = data.filter((record) => record.slug === slug);
    if (country) data = data.filter((record) => record.countrySlug === country);
    return Response.json({ data, meta: { pagination: { page: 1, pageCount: 1 } } });
  }) as typeof fetch;
});

after(() => {
  globalThis.fetch = originalFetch;
  for (const [key, value] of Object.entries(originalEnvironment)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

describe("public service resolution against CMS fixtures", () => {
  it("discovers CMS-only services, normalizes stored navigation and keeps collection ownership exact", async () => {
    const page = await routes.getPublicServicePage("corporate", "cms-service");
    assert.ok(page);
    assert.equal(page.canonicalPath, "/corporate/cms-service");
    assert.equal(page.content.navigation[0].categories?.[0].links[0].href, "/corporate/cms-service");
    assert.equal(await routes.getCategorizedPublicServicePage("company-registration", "cms-service"), null);
    assert.equal(await routes.getCategorizedPublicServicePage("unknown-category", "cms-service"), null);
    assert.equal(await routes.getPublicServicePage("corporate", "unknown-service"), null);
    assert.ok(requests.some((url) => url.searchParams.get("filters[slug][$eq]") === "cms-service"));
  });

  it("loads nested Approval identities through the final slug and resolves both old URL forms", async () => {
    const page = await routes.getPublicServicePage("approval", "drug-cdsco-registration");
    assert.ok(page);
    assert.equal(page.content.slug, "cdsco-registration/drug-cdsco-registration");
    assert.equal(page.canonicalPath, "/approval/drug-cdsco-registration");
    for (const path of ["cdsco-registration/drug-cdsco-registration", "cdsco-registration/cdsco-registration/drug-cdsco-registration"]) {
      const legacy = await routes.resolveApprovalService(path);
      assert.ok(legacy.kind === "canonical" || legacy.kind === "redirect");
      assert.equal(legacy.canonicalPath, page.canonicalPath);
    }
  });

  it("rejects colliding public slugs and omits them from discovery and the sitemap", async () => {
    records["cdsco-registration-pages"].push(service("other/drug-cdsco-registration"));
    assert.equal(await routes.getPublicServicePage("approval", "drug-cdsco-registration"), null);
    assert.equal(await routes.getCategorizedServicePage("approval", "cdsco-registration", "cdsco-registration/drug-cdsco-registration"), null);
    assert.ok(!(await routes.getServiceRouteEntries("approval")).some((entry) => entry.categorySlug === "cdsco-registration"));
    assert.ok(!(await routes.getServiceSitemapEntries("approval")).some((entry) => entry.categorySlug === "cdsco-registration"));
  });

  it("rejects ambiguous legacy services and incomplete CMS-only records", async () => {
    records["company-registration-pages"] = [service("cms-service")];
    assert.equal((await routes.resolveLegacyService("corporate", "cms-service")).kind, "ambiguous");
    assert.equal(await routes.getPublicServicePage("corporate", "cms-service"), null);
    assert.equal(await routes.getCategorizedServicePage("corporate", "mca-services", "cms-service"), null);
    assert.ok(!(await routes.getServiceRouteEntries("corporate")).some((entry) => entry.servicePath === "cms-service"));
    records["mca-service-pages"] = [{ ...service("incomplete"), hero: null }];
    assert.equal(await routes.getPublicServicePage("corporate", "incomplete"), null);
    assert.ok(!(await routes.getServiceSitemapEntries("corporate")).some((entry) => entry.servicePath === "incomplete"));
  });

  it("allows country pages directly under /global, including names used elsewhere", async () => {
    const country = globalCountry("india");
    records["global-country-pages"] = [country, globalCountry("about-us"), globalCountry("mca-services")];
    const page = await globals.getPublicGlobalPage("india");
    assert.ok(page && page.kind === "country");
    assert.equal(page.canonicalPath, "/global/india");
    assert.equal(page.content.certificates.items[0].link.href, "/global/certificate");
    assert.deepEqual(await content.getGlobalCountrySlugs(), ["india", "about-us", "mca-services"]);
    assert.equal((await globals.getPublicGlobalPage("about-us"))?.canonicalPath, "/global/about-us");
    assert.equal((await globals.getLegacyGlobalPage("india"))?.canonicalPath, "/global/india");
  });

  it("loads complete certificates directly by slug and retains their internal country", async () => {
    records["global-certificate-pages"] = [globalCertificate("india")];
    const page = await globals.getPublicGlobalPage("certificate");
    assert.ok(page && page.kind === "certificate");
    assert.equal(page.content.countrySlug, "india");
    assert.equal(page.content.seo.canonicalUrl, "/global/certificate");
    assert.equal(page.canonicalPath, "/global/certificate");
    assert.equal((await globals.getLegacyGlobalPage("india", "certificate"))?.canonicalPath, page.canonicalPath);
    assert.equal(await globals.getLegacyGlobalPage("other-country", "certificate"), null);
    assert.equal(await globals.getPublicGlobalPage("unknown"), null);
  });

  it("rejects certificate slugs repeated across countries and country/certificate conflicts", async () => {
    records["global-certificate-pages"] = [globalCertificate("india"), globalCertificate("bahrain")];
    assert.equal(await globals.getPublicGlobalPage("certificate"), null);
    assert.deepEqual(await globals.getPublicGlobalLinks(), []);
    records["global-certificate-pages"] = [globalCertificate("india")];
    records["global-country-pages"] = [globalCountry("certificate")];
    assert.equal(await globals.getPublicGlobalPage("certificate"), null);
    assert.equal(await globals.getLegacyGlobalPage("india", "certificate"), null);
    assert.deepEqual(await globals.getPublicGlobalLinks(), []);
  });

  it("keeps identical slugs valid when they belong to different service families", async () => {
    records["cdsco-registration-pages"] = [service("cms-service")];
    assert.equal((await routes.getPublicServicePage("corporate", "cms-service"))?.canonicalPath, "/corporate/cms-service");
    assert.equal((await routes.getPublicServicePage("approval", "cms-service"))?.canonicalPath, "/approval/cms-service");
  });
});

function globalCountry(slug: string) {
  const image = { url: "/uploads/india.jpg", alternativeText: "Country" };
  return {
    ...service(slug),
    hero: { eyebrow: "Country", description: "Country services", image, cta },
    certificates: { eyebrow: "Certificates", title: "Country certificates", cards: [{
      title: "Certificate", description: "Certificate details", logo: image,
      link: { label: "Read more", href: "/globals/india/certificate" },
    }] },
  };
}

function globalCertificate(countrySlug: string) {
  const section = { eyebrow: "Section", title: "Section title" };
  return {
    ...service("certificate"), countrySlug, countryName: countrySlug,
    overview: { ...section, paragraphs: [{ text: "Overview." }] },
    scope: { ...section, items: [{ text: "Scope." }] },
    process: { ...section, steps: [{ title: "Apply", description: "Submit documents." }] },
    ourRole: { ...section, items: [{ text: "Our role." }], cta },
    conclusion: { ...section, paragraphs: [{ text: "Conclusion." }], cta },
    seo: { metaTitle: "Certificate", metaDescription: "Certificate details", canonicalUrl: `/globals/${countrySlug}/certificate` },
  };
}
