import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

import {
  FAQ_CATEGORY_ROTATION_MS,
  nextFaqCategoryId,
} from "@/components/home/faq";

const repositoryRoot = fileURLToPath(new URL("../..", import.meta.url));

describe("homepage FAQ category rotation", () => {
  const categories = [
    { id: "registration" },
    { id: "compliance" },
    { id: "tax-audits" },
  ];

  it("uses a one-minute delay and loops through the configured order", () => {
    assert.equal(FAQ_CATEGORY_ROTATION_MS, 60_000);
    assert.equal(nextFaqCategoryId(categories, "registration"), "compliance");
    assert.equal(nextFaqCategoryId(categories, "compliance"), "tax-audits");
    assert.equal(nextFaqCategoryId(categories, "tax-audits"), "registration");
  });

  it("handles empty, single, and stale category state safely", () => {
    assert.equal(nextFaqCategoryId([], undefined), undefined);
    assert.equal(nextFaqCategoryId([{ id: "registration" }], "registration"), "registration");
    assert.equal(nextFaqCategoryId(categories, "removed-category"), "registration");
  });

  it("wires a cleaned-up timer with reading and motion safeguards", () => {
    const source = readFileSync(
      resolve(repositoryRoot, "frontend/components/home/faq.tsx"),
      "utf8",
    );

    assert.match(source, /window\.setTimeout/);
    assert.match(source, /window\.clearTimeout/);
    assert.match(source, /prefers-reduced-motion: reduce/);
    assert.match(source, /isFocused \|\|/);
    assert.match(source, /openQuestion !== null/);
    assert.match(source, /setOpenQuestion\(null\)/);
  });
});
