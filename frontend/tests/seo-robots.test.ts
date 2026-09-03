import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

import { pageMetadata } from "@/lib/page-metadata";

const repositoryRoot = fileURLToPath(new URL("../..", import.meta.url));

describe("CMS robots metadata", () => {
  it("exposes an index,follow default in the shared Strapi SEO component", () => {
    const schema = JSON.parse(
      readFileSync(resolve(repositoryRoot, "cms/src/components/shared/seo.json"), "utf8"),
    ) as { attributes: Record<string, unknown> };

    assert.deepEqual(schema.attributes.robots, {
      type: "string",
      default: "index,follow",
    });
  });

  it("emits the CMS robots directive and defaults fallback pages to index,follow", () => {
    const baseSeo = {
      title: "SEO test page",
      description: "SEO test description",
    };

    assert.equal(pageMetadata(baseSeo, "/seo-test").robots, "index,follow");
    assert.equal(
      pageMetadata({ ...baseSeo, robots: "noindex,follow" }, "/seo-test").robots,
      "noindex,follow",
    );
    assert.equal(pageMetadata({ ...baseSeo, noIndex: true }, "/seo-test").robots, "noindex,nofollow");
  });
});
