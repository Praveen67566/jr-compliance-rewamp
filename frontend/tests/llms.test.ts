import assert from "node:assert/strict";
import { createServer } from "node:http";
import { registerHooks } from "node:module";
import { after, before, beforeEach, describe, it } from "node:test";

import robots from "@/app/robots";

const cta = { label: "Contact us", href: "/contact-us" };
const heading = { eyebrow: "Guidance", title: "Requirements" };
const publishedAt = "2026-11-03T00:00:00.000Z";
const settings = {
  siteName: "JR CMS company",
  footerTagline: "Published compliance and certification guidance.",
  contact: { phoneDisplay: "+91 1234567890", email: "contact@example.test" },
};

function service(slug: string, overrides: Record<string, unknown> = {}) {
  return {
    slug, menuLabel: slug, title: `Service ${slug}`, publishedAt,
    hero: { eyebrow: "Compliance", description: "**CMS hero**\n\n- First point\n- Second point", cta },
    seo: { metaTitle: `SEO ${slug}`, metaDescription: `Description ${slug}`, canonicalUrl: "/old-category/old-slug" },
    faqs: { ...heading, title: "Questions", items: [{ question: "Who can apply?", answer: "Published FAQ answer." }] },
    finalCta: { title: "Speak to an expert", description: "CMS closing copy", cta },
    ...overrides,
  };
}

function globalPage(slug: string) {
  return {
    ...service(slug), countryName: "India", countrySlug: "india",
    hero: { eyebrow: "Global", description: "Global hero", cta, image: { url: "/uploads/india.png", alternativeText: "India" } },
    certificates: { ...heading, title: "Certificates", cards: [{ title: "Certificate card", description: "Card description", logo: { url: "/uploads/logo.png", alternativeText: "Certificate" }, link: { label: "Read", href: "/global/global-certificate" } }] },
    overview: { ...heading, paragraphs: [{ text: "Global overview body" }] },
    scope: { ...heading, title: "Global scope", items: [{ text: "Scope item" }] },
    process: { ...heading, title: "Global process", steps: [{ title: "Apply", description: "Global step body" }] },
    ourRole: { ...heading, title: "Our role", items: [{ text: "Role item" }], cta },
    conclusion: { ...heading, title: "Conclusion", paragraphs: [{ text: "Conclusion body" }], cta },
  };
}

let mode = "normal";
const requests: URL[] = [];
const originalEnvironment = { STRAPI_URL: process.env.STRAPI_URL, STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN, SITE_URL: process.env.SITE_URL };
let llms: typeof import("@/lib/llms");
const server = createServer((request, response) => {
  const url = new URL(request.url!, "http://localhost");
  requests.push(url);
  response.setHeader("Content-Type", "application/json");
  if (request.headers.authorization !== "Bearer crawler-test-token" || url.searchParams.get("status") !== "published") {
    response.writeHead(400).end(JSON.stringify({ error: "Invalid published-content request" }));
    return;
  }
  if (url.pathname === "/api/site-setting") {
    response.end(JSON.stringify({ data: mode === "no-settings" ? null : settings }));
    return;
  }
  if (mode === "failure" && url.pathname === "/api/mca-service-pages") {
    response.writeHead(500).end(JSON.stringify({ error: "CMS failure containing private details" }));
    return;
  }
  if (mode === "malformed" && url.pathname === "/api/mca-service-pages") {
    response.end(JSON.stringify({ data: {} }));
    return;
  }
  let data: unknown[] = [];
  let pageCount = 1;
  if (mode !== "empty") {
    if (url.pathname === "/api/company-registration-pages") {
      pageCount = 2;
      data = url.searchParams.get("pagination[page]") === "2" ? [service("company-beta")] : [
        service(mode === "updated" ? "new-published-service" : "company-alpha", {
          overview: { ...heading, paragraphs: [{ text: "## Eligibility\n\nPublished overview body." }] },
          extraContent: [{ title: "Detailed guidance", description: '<h3>Editor heading</h3><p>CMS &amp; company facts.</p><ul><li>Document item</li></ul><a href="/corporate/company-registration/company-beta">Related service</a><script>PRIVATE_SCRIPT</script>' }],
          internalNotes: "PRIVATE_EDITOR_NOTES",
        }),
        service("hidden", { seo: { metaTitle: "Hidden", metaDescription: "Hidden", robots: "noindex,follow" } }),
        service("legacy-hidden", { seo: { metaTitle: "Hidden", metaDescription: "Hidden", noIndex: true } }),
        service("draft", { publishedAt: null }),
        service("incomplete", { faqs: null }),
        service("collision"),
      ];
    }
    if (url.pathname === "/api/mca-service-pages") data = [service("collision")];
    if (url.pathname === "/api/lmpc-certification-pages") data = [service("lmpc/packaged-commodity-registration")];
    if (url.pathname === "/api/global-country-pages") data = [globalPage("india"), globalPage("global-collision")];
    if (url.pathname === "/api/global-certificate-pages") data = [globalPage("global-certificate"), globalPage("global-collision")];
  }
  response.end(JSON.stringify({ data, meta: { pagination: { pageCount } } }));
});

before(async () => {
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  process.env.STRAPI_URL = `http://127.0.0.1:${address.port}`;
  process.env.STRAPI_API_TOKEN = "crawler-test-token";
  process.env.SITE_URL = "https://www.jr.test";
  const hooks = registerHooks({
    resolve(specifier, context, nextResolve) {
      return nextResolve(specifier === "server-only" ? "next/dist/compiled/server-only/empty.js" : specifier, context);
    },
  });
  try { llms = await import("@/lib/llms"); } finally { hooks.deregister(); }
});

beforeEach(() => { mode = "normal"; requests.length = 0; });
after(async () => {
  server.closeAllConnections();
  await new Promise<void>((resolve) => server.close(() => resolve()));
  for (const [key, value] of Object.entries(originalEnvironment)) {
    if (value === undefined) delete process.env[key]; else process.env[key] = value;
  }
});

describe("published CMS crawler files", () => {
  it("allows public crawling and lists the configured sitemap while excluding internal paths", () => {
    const result = robots();
    assert.equal(result.sitemap, "https://www.jr.test/sitemap.xml");
    assert.ok(!Array.isArray(result.rules));
    assert.equal(result.rules.allow, "/");
    for (const path of ["/api/", "/admin", "/private", "/internal", "/preview", "/thank-you"]) assert.ok(result.rules.disallow?.includes(path));
    assert.ok(!result.rules.disallow?.includes("/_next/"));
  });

  it("exports CMS company information and every paginated, unambiguous published service", async () => {
    const response = await llms.crawlerTextResponse(false);
    const body = await response.text();
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type")!, /text\/plain; charset=utf-8/);
    assert.match(body, /^# JR CMS company/);
    assert.match(body, /Phone: \+91 1234567890/);
    assert.match(body, /Email: contact@example.test/);
    for (const path of ["/corporate/company-alpha", "/corporate/company-beta", "/approval/packaged-commodity-registration", "/global/india", "/global/global-certificate"]) assert.ok(body.includes(`https://www.jr.test${path}`), path);
    assert.match(body, /## Corporate — Company Registration/);
    assert.match(body, /## Approval — LMPC Certification/);
    assert.match(body, /Description company-beta/);
    assert.doesNotMatch(body, /hidden|draft|incomplete|collision|Sole Proprietorship|old-category|crawler-test-token/);
    assert.ok(requests.some((url) => url.searchParams.get("pagination[page]") === "2"));
    const query = requests.find((url) => url.pathname === "/api/company-registration-pages")!.searchParams;
    assert.equal(query.get("populate[hero][populate][cta]"), "true");
    assert.equal(query.get("populate[extraContent]"), "true");
    assert.equal(query.get("pagination[pageSize]"), "100");
  });

  it("exports rich sections, FAQ and Global content with direct canonical URLs", async () => {
    const body = await (await llms.crawlerTextResponse(true)).text();
    for (const text of ["# Service company-alpha", "## Eligibility", "Published overview body.", "### Editor heading", "CMS & company facts.", "- Document item", "Who can apply?", "Published FAQ answer.", "Global overview body", "Scope item", "Global step body", "Role item", "Conclusion body"]) assert.ok(body.includes(text), text);
    assert.match(body, /Canonical URL: https:\/\/www\.jr\.test\/approval\/packaged-commodity-registration/);
    assert.match(body, /\[Related service\]\(https:\/\/www\.jr\.test\/corporate\/company-beta\)/);
    assert.doesNotMatch(body, /PRIVATE_SCRIPT|PRIVATE_EDITOR_NOTES|<script|<h3|<ul|old-category/);
  });

  it("reads newly published content without a rebuild or a local fallback", async () => {
    assert.match(await (await llms.crawlerTextResponse(false)).text(), /company-alpha/);
    mode = "updated";
    const body = await (await llms.crawlerTextResponse(false)).text();
    assert.match(body, /new-published-service/);
    assert.doesNotMatch(body, /company-alpha/);
    mode = "empty";
    const empty = await (await llms.crawlerTextResponse(false)).text();
    assert.doesNotMatch(empty, /\/corporate\/|\/approval\/|\/global\//);
  });

  it("returns a retryable 503 for unavailable, malformed or missing CMS data", async () => {
    for (mode of ["failure", "malformed", "no-settings"]) {
      for (const full of [false, true]) {
        const response = await llms.crawlerTextResponse(full);
        assert.equal(response.status, 503, mode);
        assert.equal(response.headers.get("cache-control"), "no-store");
        assert.equal(response.headers.get("retry-after"), "60");
        assert.doesNotMatch(await response.text(), /private details|company-alpha|crawler-test-token/);
      }
    }
  });

  it("preserves Blocks and ordered Markdown lists while stripping unsafe HTML", () => {
    const text = llms.crawlerMarkdown("1. First\n2. Second\n\n<script>secret</script><p>Safe &amp; clear</p>", "https://www.jr.test");
    assert.match(text, /1\. First/);
    assert.match(text, /2\. Second/);
    assert.match(text, /Safe & clear/);
    assert.doesNotMatch(text, /secret|<script/);
    assert.equal(llms.crawlerMarkdown([{ type: "heading", level: 2, children: [{ type: "text", text: "Blocks heading" }] }], "https://www.jr.test"), "## Blocks heading");
  });
});
