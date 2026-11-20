import {
  nestRegistrationHeadings,
  renderRegistrationMarkdown,
} from "@/lib/registration-markdown";
import type { LegalContentBlock, LegalInlineNode, LegalTextNode } from "@/lib/types";

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]!);
}

function textHtml(node: LegalTextNode): string {
  let html = escapeHtml(node.text);

  if (node.code) html = `<code>${html}</code>`;
  else html = html.replace(/\r?\n/g, "<br>");
  if (node.strikethrough) html = `<s>${html}</s>`;
  if (node.underline) html = `<u>${html}</u>`;
  if (node.italic) html = `<em>${html}</em>`;
  if (node.bold) html = `<strong>${html}</strong>`;

  return html;
}

function inlineHtml(nodes: LegalInlineNode[]): string {
  return nodes.map((node) => node.type === "text"
    ? textHtml(node)
    : `<a href="${escapeHtml(node.url)}">${node.children.map(textHtml).join("")}</a>`,
  ).join("");
}

/** Keep the existing Blocks fields, while allowing HTML pasted as plain text. */
export function renderPrivacyPolicyRichText(blocks: LegalContentBlock[]): string {
  const source = blocks.map((block) => {
    if (block.type === "paragraph") {
      const isPlainText = block.children.every((node) => node.type === "text" && !(
        node.bold || node.italic || node.underline || node.strikethrough || node.code
      ));
      const text = isPlainText
        ? block.children.map((node) => (node as LegalTextNode).text).join("")
        : "";

      // Do not wrap pasted block elements (headings, tables, lists) in a <p>.
      // Joining first also supports HTML split across editor paragraphs.
      if (/<\/?[a-z][^>]*>/i.test(text)) return text;

      // Retain the short subheadings used in the existing policy copy.
      if (text.length <= 110 && (
        /^\d{1,2}\.\s+[A-Z][A-Z\d\s/&(),’'—–-]+$/.test(text.trim()) ||
        /^[A-Z][A-Za-z\s]{3,65}\s*[-–:]$/.test(text.trim())
      )) return `<h2>${inlineHtml(block.children)}</h2>`;

      return `<p>${inlineHtml(block.children)}</p>`;
    }

    if (block.type === "list") {
      const tag = block.format === "ordered" ? "ol" : "ul";
      return `<${tag}>${block.children.map((item) => `<li>${inlineHtml(item.children)}</li>`).join("")}</${tag}>`;
    }

    return `<h${block.level}>${inlineHtml(block.children)}</h${block.level}>`;
  }).join("\n\n");

  // Reuse the service-page sanitizer, URL handling, and heading hierarchy.
  return nestRegistrationHeadings(renderRegistrationMarkdown(source));
}
