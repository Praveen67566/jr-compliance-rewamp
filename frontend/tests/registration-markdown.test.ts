import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { renderRegistrationMarkdown } from "@/lib/registration-markdown";

describe("registration rich-text markdown", () => {
  it("renders the formatting exposed by the Strapi rich-text editor", () => {
    const html = renderRegistrationMarkdown(`**Bold heading**
Second line

## Section heading

1. First item
2. Second item

> Quoted guidance

<u>Underlined</u> and ~~removed~~ with \`inline code\`.

[External link](https://example.com)

![Diagram](https://example.com/diagram.png)`);

    assert.match(html, /<strong>Bold heading<\/strong><br\s*\/?>\s*Second line/);
    assert.match(html, /<h2>Section heading<\/h2>/);
    assert.match(html, /<ol>[\s\S]*?<li>First item<\/li>[\s\S]*?<li>Second item<\/li>/);
    assert.match(html, /<blockquote>[\s\S]*?Quoted guidance[\s\S]*?<\/blockquote>/);
    assert.match(html, /<u>Underlined<\/u>/);
    assert.match(html, /<s>removed<\/s>/);
    assert.match(html, /<code>inline code<\/code>/);
    assert.match(html, /href="https:\/\/example\.com"/);
    assert.match(html, /rel="noreferrer"/);
    assert.match(html, /target="_blank"/);
    assert.match(html, /<img[^>]+alt="Diagram"/);
    assert.match(html, /<img[^>]+loading="lazy"/);
    assert.doesNotMatch(html, /\*\*Bold heading\*\*/);
  });

  it("removes unsafe rich-text HTML and URL schemes", () => {
    const html = renderRegistrationMarkdown(
      '<script>alert("unsafe")</script> [unsafe](javascript:alert(1)) <img src="data:text/html,unsafe" onerror="alert(1)">',
    );

    assert.doesNotMatch(html, /<script/i);
    assert.doesNotMatch(html, /onerror/i);
    assert.doesNotMatch(html, /href="javascript:/i);
    assert.doesNotMatch(html, /src="data:/i);
  });

  it("resolves Strapi Media Library paths without changing site links", () => {
    const html = renderRegistrationMarkdown(
      "[CMS file](/uploads/guide.pdf) ![CMS image](/uploads/diagram.png) [Site page](/contact-us)",
      "https://cms.example.com",
    );

    assert.match(html, /href="https:\/\/cms\.example\.com\/uploads\/guide\.pdf"/);
    assert.match(html, /src="https:\/\/cms\.example\.com\/uploads\/diagram\.png"/);
    assert.match(html, /href="\/contact-us"/);
  });
});
