import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { renderPrivacyPolicyRichText } from "@/app/privacy-policy/rich-text";
import { legalPageFallback } from "@/data/legal-pages-fallback";
import type { LegalContentBlock } from "@/lib/types";

const paragraph = (text: string): LegalContentBlock => ({
  type: "paragraph", children: [{ type: "text", text }],
});

describe("privacy policy rich text", () => {
  it("renders pasted HTML from existing Blocks fields with nested headings, tables and lists", () => {
    const html = renderPrivacyPolicyRichText([paragraph(
      '<h1>Data rights</h1><p>Keep <strong>control</strong> of your data.</p><blockquote>Contact us for help.</blockquote><ul><li>Access</li><li>Erasure</li></ul><table><thead><tr><th>Right</th><th>Action</th></tr></thead><tbody><tr><td>Access</td><td>Email us</td></tr></tbody></table>',
    )]);

    assert.match(html, /<h3>Data rights<\/h3>/);
    assert.match(html, /<p>Keep <strong>control<\/strong> of your data\.<\/p>/);
    assert.match(html, /<blockquote>Contact us for help\.<\/blockquote>/);
    assert.match(html, /<ul><li>Access<\/li><li>Erasure<\/li><\/ul>/);
    assert.match(html, /<table><thead>[\s\S]*?<th>Right<\/th>[\s\S]*?<td>Email us<\/td>[\s\S]*?<\/table>/);
    assert.doesNotMatch(html, /&lt;h1|<p><h[1-6]|<h[12]>/);
  });

  it("keeps HTML valid when pasted across multiple editor paragraphs", () => {
    const html = renderPrivacyPolicyRichText([
      paragraph("<table><tbody>"),
      paragraph("<tr><td>Data</td><td>Purpose</td></tr>"),
      paragraph("</tbody></table>"),
    ]);
    assert.match(html, /<table><tbody>\s*<tr><td>Data<\/td><td>Purpose<\/td><\/tr>\s*<\/tbody><\/table>/);
  });

  it("preserves structured text marks, links, lists, literal characters and line breaks", () => {
    const html = renderPrivacyPolicyRichText([
      {
        type: "paragraph",
        children: [
          { type: "text", text: "First\nSecond & < 5", bold: true, italic: true, underline: true, strikethrough: true },
          { type: "link", url: "/contact-us", children: [{ type: "text", text: "Contact" }] },
          { type: "text", text: "<h2>literal code</h2>", code: true },
        ],
      },
      { type: "heading", level: 2, children: [{ type: "text", text: "Details" }] },
      { type: "list", format: "ordered", children: [{ type: "list-item", children: [{ type: "text", text: "Ask us" }] }] },
    ]);
    assert.match(html, /<strong><em><u><s>First<br\s*\/?>Second &amp; &lt; 5<\/s><\/u><\/em><\/strong>/);
    assert.match(html, /href="\/contact-us">Contact<\/a>/);
    assert.match(html, /<code>&lt;h2&gt;literal code&lt;\/h2&gt;<\/code>/);
    assert.match(html, /<h3>Details<\/h3>/);
    assert.match(html, /<ol><li>Ask us<\/li><\/ol>/);
  });

  it("uses the service-page sanitizer for unsafe HTML and links", () => {
    const html = renderPrivacyPolicyRichText([
      paragraph('<script>alert(1)</script><p onclick="alert(1)" style="position:fixed">Policy</p><a href="javascript:alert(1)">Unsafe</a><img src="data:text/html,unsafe" onerror="alert(1)"><iframe src="https://example.com"></iframe><a href="https://example.com">Reference</a>'),
      { type: "paragraph", children: [{ type: "link", url: 'javascript:alert(1)', children: [{ type: "text", text: "Unsafe structured link" }] }] },
    ]);
    assert.doesNotMatch(html, /<script|<iframe|onclick|onerror|style=|href="javascript:|src="data:/i);
    assert.match(html, /<p>Policy<\/p>/);
    assert.match(html, /href="https:\/\/example.com" rel="noreferrer" target="_blank"/);
    assert.match(html, /Unsafe structured link/);
  });

  it("retains the existing policy's labels and body text", () => {
    const policy = legalPageFallback("privacy-policy")!;
    const html = renderPrivacyPolicyRichText(policy.introduction);
    assert.match(html, /<h3>Consent -<\/h3>/);
    assert.match(html, /By using our website, you hereby consent to our Privacy Policy and agree to its terms\./);
    for (const section of policy.sections) {
      assert.ok(renderPrivacyPolicyRichText(section.body));
    }
  });
});
