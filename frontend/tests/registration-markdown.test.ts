import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  renderRegistrationArticleMarkdown,
  renderRegistrationMarkdown,
} from "@/lib/registration-markdown";

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

  it("normalizes pasted check lines only for article rich text", () => {
    const value = `Introductory paragraph

Supporting paragraph.

Types of registrations

✓ First benefit
✔ Second benefit — Supporting detail
☑ Third benefit`;
    const html = renderRegistrationArticleMarkdown(value);

    assert.match(html, /<p>Introductory paragraph<\/p>/);
    assert.match(html, /<p>Supporting paragraph\.<\/p>/);
    assert.match(html, /<h2>Types of registrations<\/h2>/);
    assert.match(
      html,
      /<ul>[\s\S]*?<li>First benefit<\/li>[\s\S]*?<li><strong>Second benefit<\/strong> — Supporting detail<\/li>[\s\S]*?<li>Third benefit<\/li>[\s\S]*?<\/ul>/,
    );
    assert.doesNotMatch(html, /[✓✔☑]/);
  });

  it("promotes a standalone pasted question after body copy to an article heading", () => {
    const html = renderRegistrationArticleMarkdown(`Opening paragraph.

What happens next?

Answer paragraph.`);

    assert.match(html, /<p>Opening paragraph\.<\/p>/);
    assert.match(html, /<h2>What happens next\?<\/h2>/);
    assert.match(html, /<p>Answer paragraph\.<\/p>/);
  });

  it("omits only a duplicated leading article heading", () => {
    const duplicate = renderRegistrationArticleMarkdown(
      `# Startup India Registration Online in India

Opening paragraph.`,
      { articleTitle: "Startup India Registration Online in India" },
    );
    const different = renderRegistrationArticleMarkdown(
      `# Eligibility overview

Opening paragraph.`,
      { articleTitle: "Startup India Registration Online in India" },
    );

    assert.doesNotMatch(duplicate, /<h1>/);
    assert.match(duplicate, /<p>Opening paragraph\.<\/p>/);
    assert.match(different, /<h1>Eligibility overview<\/h1>/);
  });
});
