import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { leadTypeFromPath } from "@/lib/leads";
import { publicContentLinks, publicHref, publicServiceSlug, redirectPath, uniquePublicLinks, uniqueServicePath } from "@/lib/public-paths";
import { isPublicCountrySlug, serviceRouteDefinitions } from "@/lib/service-route-config";

const entries = [
  { family: "corporate" as const, categorySlug: "company-registration", servicePath: "nidhi-company-registration", canonicalPath: "/corporate/nidhi-company-registration" },
  { family: "approval" as const, categorySlug: "cdsco-registration", servicePath: "cdsco-registration/drug-cdsco-registration", canonicalPath: "/approval/drug-cdsco-registration" },
];

describe("direct family URLs", () => {
  it("retains single and repeated query parameters on permanent redirects", () => {
    assert.equal(redirectPath("/corporate/nidhi-company-registration", {
      utm_source: "google", tag: ["one", "two"], empty: "", omitted: undefined,
    }), "/corporate/nidhi-company-registration?utm_source=google&tag=one&tag=two&empty=");
    assert.equal(redirectPath("/india", {}), "/india");
  });
  it("normalizes old categorized, flat and nested URLs while retaining queries and fragments", () => {
    for (const [oldHref, expected] of [
      ["/corporate/company-registration/nidhi-company-registration", entries[0].canonicalPath],
      ["/company-registration/nidhi-company-registration", entries[0].canonicalPath],
      ["/bureau-indian-standards/isi-certificate", "/approval/isi-certificate"],
      ["/corporate/nidhi-company-registration?utm_source=google#faq", `${entries[0].canonicalPath}?utm_source=google#faq`],
      ["/approval/cdsco-registration/cdsco-registration/drug-cdsco-registration", entries[1].canonicalPath],
      ["/approval/cdsco-registration/drug-cdsco-registration", entries[1].canonicalPath],
      ["/globals/india", "/global/india"],
      ["/globals/india/bis-certification", "/global/bis-certification"],
      ["https://www.jrcompliance.com/corporate/nidhi-company-registration", entries[0].canonicalPath],
      ["https://test.jrcompliance.com/globals/india", "/global/india"],
    ]) assert.equal(publicHref(oldHref, "https://test.jrcompliance.com"), expected);
  });

  it("leaves external, media, unsafe, unknown and already canonical links unchanged", () => {
    for (const href of [
      "https://other.example/corporate/nidhi-company-registration",
      "https://cms.jrcompliance.com/uploads/logo.svg", "/images/logo.svg", "/uploads/logo.svg",
      "//other.example/globals/india", "javascript:alert(1)", "mailto:info@jrcompliance.com",
      "/corporate/unknown-service", "/#services", entries[0].canonicalPath,
    ]) assert.equal(publicHref(href, "https://test.jrcompliance.com"), href);
  });

  it("excludes every owner of a colliding direct URL", () => {
    const duplicate = { ...entries[0], categorySlug: "mca-services" };
    assert.deepEqual(uniquePublicLinks([...entries, duplicate]), [entries[1]]);
  });

  it("normalizes discovered country URLs without treating static pages as countries", () => {
    const globals = [
      { kind: "country" as const, country: "india", slug: "india", canonicalPath: "/global/india" },
      { kind: "certificate" as const, country: "india", slug: "certificate", canonicalPath: "/global/certificate" },
    ];
    assert.equal(publicHref("/india", undefined, globals), "/global/india");
    assert.equal(publicHref("/india/certificate?source=menu#scope", undefined, globals), "/global/certificate?source=menu#scope");
    assert.equal(publicHref("/about-us", undefined, globals), "/about-us");
    assert.equal(publicHref("/other-country/certificate", undefined, globals), "/other-country/certificate");
  });

  it("normalizes navigation, sidebar and SEO link fields without mutating input or prose", () => {
    const content = {
      navigation: [{ links: [{ href: "/corporate/nidhi-company-registration" }] }],
      sidebar: { links: [{ href: "/globals/india/bis-certification", target: "_blank" }] },
      seo: { canonicalUrl: "/corporate/company-registration/nidhi-company-registration" },
      description: "Keep /corporate/nidhi-company-registration as written in prose.",
      media: { url: "https://cms.jrcompliance.com/uploads/photo.jpg" },
    };
    const before = structuredClone(content);
    const normalized = publicContentLinks(content, "https://test.jrcompliance.com");
    assert.deepEqual(content, before);
    assert.equal(normalized.navigation[0].links[0].href, entries[0].canonicalPath);
    assert.equal(normalized.sidebar.links[0].href, "/global/bis-certification");
    assert.equal(normalized.sidebar.links[0].target, "_blank");
    assert.equal(normalized.seo.canonicalUrl, entries[0].canonicalPath);
    assert.equal(normalized.description, content.description);
    assert.deepEqual(normalized.media, content.media);
  });

  it("resolves nested identities only when their public slug is unique", () => {
    assert.equal(publicServiceSlug("cdsco-registration/drug-cdsco-registration"), "drug-cdsco-registration");
    assert.equal(uniqueServicePath(["old/path", "old/path"], "path"), "old/path");
    assert.equal(uniqueServicePath(["old/path", "other/path"], "path"), null);
    assert.equal(uniqueServicePath(["path", "old/path"], "path"), null);
    assert.equal(uniqueServicePath(["old/path"], "missing"), null);
  });

  it("allows country names inside /global without permitting path traversal", () => {
    for (const slug of [".", "..", "../india", "", "india/certificate"]) assert.equal(isPublicCountrySlug(slug), false);
    for (const slug of ["india", "about-us", "mca-services"]) assert.equal(isPublicCountrySlug(slug), true);
  });

  it("keeps the correct lead destination for every category and for Global country pages", () => {
    for (const category of serviceRouteDefinitions) {
      assert.equal(leadTypeFromPath(`/${category.family}/service`), category.family === "corporate" ? "corporate" : "technical");
    }
    assert.equal(leadTypeFromPath("/global/bis-certification"), "global");
    assert.equal(leadTypeFromPath("/company-registration-extra/service"), "global");
  });
});
