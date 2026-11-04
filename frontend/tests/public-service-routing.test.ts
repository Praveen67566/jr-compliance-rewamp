import assert from "node:assert/strict";
import { AsyncLocalStorage } from "node:async_hooks";
import { registerHooks } from "node:module";
import { after, before, beforeEach, describe, it } from "node:test";

import nextConfig from "../next.config";
import { legacyFssaiServiceAliases, legacyFssaiServiceSlugs } from "@/lib/service-route-config";

const originalFetch = globalThis.fetch;
const originalEnvironment = {
  STRAPI_URL: process.env.STRAPI_URL,
  STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN,
  SITE_URL: process.env.SITE_URL,
};
let routes: typeof import("@/lib/service-routes");
let content: typeof import("@/lib/content");
let globals: typeof import("@/lib/global-routes");
let corporatePage: typeof import("@/app/corporate/[slug]/page");
let corporateLegacyPage: typeof import("@/app/corporate/[slug]/[service]/page");
let categoryLegacyPage: typeof import("@/app/[category]/[slug]/page");
let approvalPage: typeof import("@/app/approval/[slug]/page");
let sitemap: typeof import("@/app/sitemap");
let configTesting: typeof import("next/experimental/testing/server");
let records: Record<string, Record<string, unknown>[]>;
let siteSettings: Record<string, unknown>;
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
  Object.assign(globalThis, { AsyncLocalStorage });
  process.env.STRAPI_URL = "https://cms.example.test";
  process.env.STRAPI_API_TOKEN = "test-reader-token";
  process.env.SITE_URL = "https://test.jrcompliance.com";
  const hooks = registerHooks({
    resolve(specifier, context, nextResolve) {
      if (specifier.endsWith(".css")) return nextResolve("next/dist/compiled/server-only/empty.js", context);
      return nextResolve(specifier === "server-only" ? "next/dist/compiled/server-only/empty.js" : specifier, context);
    },
  });
  try {
    configTesting = await import("next/experimental/testing/server");
    routes = await import("@/lib/service-routes");
    content = await import("@/lib/content");
    globals = await import("@/lib/global-routes");
    corporatePage = await import("@/app/corporate/[slug]/page");
    corporateLegacyPage = await import("@/app/corporate/[slug]/[service]/page");
    categoryLegacyPage = await import("@/app/[category]/[slug]/page");
    approvalPage = await import("@/app/approval/[slug]/page");
    sitemap = await import("@/app/sitemap");
  } finally {
    hooks.deregister();
  }
});

beforeEach(() => {
  records = {
    "mca-service-pages": [service("cms-service")],
    "cdsco-registration-pages": [service("cdsco-registration/drug-cdsco-registration")],
  };
  siteSettings = { headerMenu: [{ label: "Corporate", categories: [{
    title: "MCA Services", links: [{ label: "CMS service", href: "/corporate/cms-service" }],
  }] }] };
  requests = [];
  globalThis.fetch = (async (input) => {
    const url = new URL(String(input));
    requests.push(url);
    assert.equal(url.origin, "https://cms.example.test");
    assert.equal(url.searchParams.get("status"), "published");
    if (url.pathname === "/api/site-setting") {
      return Response.json({ data: siteSettings });
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
  const fssaiSlugs = ["fssai-certificate", "fssai-state", "fssai-central", "fssai-modification", "fssai-renewal", "fssai-return", "water-report", "future-food-service"];

  it("moves the published CMS FSSAI header group to Approval while preserving customized navigation", async () => {
    records["fssai-service-pages"] = [service("fssai-certificate")];
    const fssai = {
      title: "FSSAI", logo: { url: "/uploads/fssai-logo.svg" },
      links: fssaiSlugs.slice(0, 7).map((slug) => ({ label: `Editor ${slug}`, href: `/corporate/fssai/${slug}`, target: "new_tab" })),
    };
    siteSettings = { headerMenu: [
      { label: "Corporate", href: "/#services", categories: [
        { title: "Custom MCA", links: [{ label: "Editor DSC", href: "/corporate/dsc-certificate" }] }, fssai,
        { title: "Custom IPR", links: [{ label: "Editor trademark", href: "/corporate/trademark-registration" }] },
      ] },
      { label: "Approval", href: "/#services", categories: [
        { title: "Custom BIS", links: [{ label: "Editor ISI", href: "/approval/isi-certificate" }] },
      ] },
      { label: "About Us", href: "/about-us" },
    ] };
    const original = structuredClone(siteSettings);
    const page = await content.getFssaiServicePage("fssai-certificate");
    assert.ok(page);
    const corporate = page.navigation.find((item) => item.label === "Corporate")!;
    const approval = page.navigation.find((item) => item.label === "Approval")!;
    assert.deepEqual(corporate.categories?.map((category) => category.title), ["Custom MCA", "Custom IPR"]);
    assert.deepEqual(approval.categories?.map((category) => category.title), ["Custom BIS", "FSSAI"]);
    const moved = approval.categories![1];
    assert.equal(moved.logo, "https://cms.example.test/uploads/fssai-logo.svg");
    assert.deepEqual(moved.links, fssaiSlugs.slice(0, 7).map((slug) => ({ label: `Editor ${slug}`, href: `/approval/${slug}`, target: "_blank" })));
    assert.deepEqual(corporate.categories![0].links, [{ label: "Editor DSC", href: "/corporate/dsc-certificate" }]);
    assert.deepEqual(page.navigation[2], { label: "About Us", href: "/about-us" });
    assert.deepEqual(siteSettings, original);

    // A subsequently corrected CMS menu keeps its existing Approval placement.
    const header = siteSettings.headerMenu as { label: string; categories?: unknown[] }[];
    header[0].categories = header[0].categories!.filter((category) => category !== fssai);
    header[1].categories!.unshift(fssai);
    const corrected = await content.getFssaiServicePage("fssai-certificate");
    assert.deepEqual(corrected?.navigation.find((item) => item.label === "Approval")?.categories?.map((category) => category.title), ["FSSAI", "Custom BIS"]);
  });

  it("moves every FSSAI record and future service to Approval with its existing content", async () => {
    records["fssai-service-pages"] = fssaiSlugs.map((slug) => ({ ...service(slug), title: `Existing ${slug}` }));
    for (const slug of fssaiSlugs) {
      const page = await routes.getPublicServicePage("approval", slug);
      assert.ok(page);
      assert.equal(page.content.hero.title, `Existing ${slug}`);
      assert.equal(page.category.contentType, "fssai-service-page");
      assert.equal(page.canonicalPath, `/approval/${slug}`);
      assert.equal(await routes.getPublicServicePage("corporate", slug), null);
      const element = await approvalPage.default({ params: Promise.resolve({ slug }) });
      assert.deepEqual(element.props.breadcrumb, { areaLabel: "Approval", categoryLabel: "FSSAI" });
      const metadata = await approvalPage.generateMetadata({ params: Promise.resolve({ slug }) });
      assert.equal(metadata.alternates?.canonical, `https://test.jrcompliance.com/approval/${slug}`);
      assert.equal(metadata.openGraph?.url, metadata.alternates?.canonical);
    }
    const params = await approvalPage.generateStaticParams();
    const corporateParams = await corporatePage.generateStaticParams();
    const urls = (await sitemap.default()).map((entry) => entry.url);
    for (const slug of fssaiSlugs) {
      assert.ok(params.some((entry) => entry.slug === slug));
      assert.ok(!corporateParams.some((entry) => entry.slug === slug));
      assert.ok(urls.includes(`https://test.jrcompliance.com/approval/${slug}`));
      assert.ok(!urls.includes(`https://test.jrcompliance.com/corporate/${slug}`));
    }
  });

  it("rewrites only historical direct Corporate identities to the validated request-time redirect route", async () => {
    // The config test utility serializes array query values as comma-separated;
    // repeated query preservation is checked on the redirect route and over HTTP.
    const query = "?utm_source=google&empty=";
    const { getRewrittenUrl, unstable_getResponseFromNextConfig } = configTesting;
    for (const slug of [...legacyFssaiServiceSlugs, ...Object.keys(legacyFssaiServiceAliases)]) {
      const response = await unstable_getResponseFromNextConfig({ url: `https://test.jrcompliance.com/corporate/${slug}${query}`, nextConfig });
      assert.equal(getRewrittenUrl(response), `https://test.jrcompliance.com/fssai/${slug}${query}`);
    }
    for (const path of ["/corporate/dsc-certificate", "/corporate/unknown-service", "/approval/fssai-state", "/global/india", "/privacy-policy", "/gpt-ad/bis-certification"]) {
      const response = await unstable_getResponseFromNextConfig({ url: `https://test.jrcompliance.com${path}`, nextConfig });
      assert.equal(getRewrittenUrl(response), null);
    }
  });

  it("permanently redirects direct and categorized FSSAI URLs with repeated and empty queries", async () => {
    records["fssai-service-pages"] = fssaiSlugs.map(service);
    for (const [slug, target] of [
      ...fssaiSlugs.map((slug) => [slug, slug]),
      ["fssai-state-license", "fssai-state"], ["fssai-central-license", "fssai-central"], ["fssai-return-filing", "fssai-return"],
    ]) {
      const searchParams = Promise.resolve({ utm_source: "google", tag: ["one", "two"], empty: "" });
      const calls = [
        corporateLegacyPage.default({ params: Promise.resolve({ slug: "fssai", service: slug }), searchParams }),
        categoryLegacyPage.default({ params: Promise.resolve({ category: "fssai", slug }), searchParams }),
      ];
      await Promise.all(calls.map((call) => assert.rejects(call, {
        digest: `NEXT_REDIRECT;replace;/approval/${target}?utm_source=google&tag=one&tag=two&empty=;308;`,
      })));
    }
  });

  it("keeps unknown, incomplete, draft and colliding FSSAI destinations unavailable", async () => {
    records["fssai-service-pages"] = [service("water-report"), { ...service("incomplete-food"), hero: null }, { ...service("draft-food"), publishedAt: null }];
    records["pollution-advisory-pages"] = [service("water-report")];
    for (const slug of ["water-report", "incomplete-food", "draft-food", "unknown-food", "fssai-state-license", "fssai-central-license", "fssai-return-filing"]) {
      assert.equal(await routes.getPublicServicePage("approval", slug), null);
      const searchParams = Promise.resolve({});
      await Promise.all([
        corporatePage.default({ params: Promise.resolve({ slug }) }),
        corporateLegacyPage.default({ params: Promise.resolve({ slug: "fssai", service: slug }), searchParams }),
        categoryLegacyPage.default({ params: Promise.resolve({ category: "fssai", slug }), searchParams }),
      ].map((call) => assert.rejects(call, { digest: "NEXT_HTTP_ERROR_FALLBACK;404" })));
    }
    const entries = await routes.getServiceSitemapEntries("approval");
    assert.ok(!entries.some((entry) => ["water-report", "incomplete-food", "draft-food"].includes(entry.servicePath)));
    assert.ok(!(await approvalPage.generateStaticParams()).some((entry) => entry.slug === "water-report"));
    records["fssai-service-pages"] = [service("cms-service")];
    assert.equal((await routes.getPublicServicePage("corporate", "cms-service"))?.category.categorySlug, "mca-services");
    records["company-registration-pages"] = [service("cms-service")];
    await assert.rejects(corporatePage.default({ params: Promise.resolve({ slug: "cms-service" }) }), { digest: "NEXT_HTTP_ERROR_FALLBACK;404" });
  });

  it("retains only Basic Registration when the CMS is unavailable", async () => {
    globalThis.fetch = async () => { throw new Error("CMS unavailable"); };
    assert.equal((await routes.getPublicServicePage("approval", "fssai-certificate"))?.canonicalPath, "/approval/fssai-certificate");
    for (const slug of fssaiSlugs.slice(1)) {
      assert.equal(await routes.getPublicServicePage("approval", slug), null);
    }
  });

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
