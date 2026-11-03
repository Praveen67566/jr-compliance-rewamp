import "server-only";

import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";

import { getCrawlerContent } from "@/lib/content";
import { publicHref } from "@/lib/public-paths";
import { renderRegistrationMarkdown } from "@/lib/registration-markdown";
import { publicSiteUrl } from "@/lib/site-url";
import type { CrawlerContent, CrawlerPage, LegalInlineNode, RegistrationRichText } from "@/lib/types";

const markdown = new MarkdownIt();

function absoluteLink(href: string, baseUrl: string): string {
  try {
    const url = new URL(publicHref(href, new URL(baseUrl).origin), baseUrl);
    return ["http:", "https:", "mailto:", "tel:"].includes(url.protocol) ? url.toString() : "";
  } catch {
    return "";
  }
}

/** Convert only sanitized editor content, retaining readable headings, links and lists. */
export function crawlerMarkdown(value: RegistrationRichText, baseUrl: string): string {
  if (Array.isArray(value)) {
    const inline = (nodes: LegalInlineNode[]): string => nodes.map((node) => {
      if (node.type === "text") return node.text;
      const label = node.children.map((child) => child.text).join("");
      try {
        const href = absoluteLink(node.url, baseUrl);
        return href ? `[${label}](${href})` : label;
      } catch { return label; }
    }).join("");
    return value.map((block) => block.type === "list"
      ? block.children.map((item, index) => `${block.format === "ordered" ? `${index + 1}.` : "-"} ${inline(item.children)}`).join("\n")
      : `${block.type === "heading" ? `${"#".repeat(block.level)} ` : ""}${inline(block.children)}`,
    ).join("\n\n");
  }

  let html = renderRegistrationMarkdown(value);
  html = html
    .replace(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g, (_match, href: string, label: string) => {
      try {
        const url = absoluteLink(markdown.utils.unescapeAll(href), baseUrl);
        return url ? `[${label}](${url})` : label;
      } catch { return label; }
    })
    .replace(/<h([1-6])\b[^>]*>/g, (_match, level: string) => `\n\n${"#".repeat(Number(level))} `)
    .replace(/<\/h[1-6]>/g, "\n\n")
    .replace(/<ol\b[^>]*>([\s\S]*?)<\/ol>/g, (_match, list: string) => {
      let index = 0;
      return `\n${list.replace(/<li\b[^>]*>/g, () => `\n${++index}. `)}\n`;
    })
    .replace(/<li\b[^>]*>/g, "\n- ")
    .replace(/<br\s*\/?\s*>/g, "\n")
    .replace(/<\/?(?:strong|b)>/g, "**")
    .replace(/<\/?(?:em|i)>/g, "*")
    .replace(/<pre\b[^>]*>/g, "\n\n```\n")
    .replace(/<\/pre>/g, "\n```\n\n")
    .replace(/<tr\b[^>]*>/g, "\n| ")
    .replace(/<\/(?:td|th)>/g, " | ")
    .replace(/<\/(?:p|div|ul|ol|table|blockquote)>/g, "\n\n");
  return markdown.utils.unescapeAll(sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} }))
    .replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

function line(value: string, baseUrl: string): string {
  return crawlerMarkdown(value, baseUrl).replace(/\s+/g, " ").trim();
}

function pageDetails(page: CrawlerPage, url: string): string {
  const { content } = page;
  const rich = (value: RegistrationRichText) => crawlerMarkdown(value, url);
  const parts = [
    `# ${line(content.hero.title, url)}`,
    `Canonical URL: ${url}`,
    `Category: ${page.category}`,
    `SEO title: ${line(content.seo.title, url)}`,
    `Description: ${line(content.seo.description, url)}`,
    rich(content.hero.description),
    `[${line(content.hero.cta.label, url)}](${absoluteLink(content.hero.cta.href, url)})`,
  ];
  const section = (title: string, ...values: RegistrationRichText[]) => {
    parts.push(`## ${line(title, url)}`, ...values.map(rich));
  };
  const items = (values: RegistrationRichText[]) => values.map((value) => `- ${rich(value)}`).join("\n");

  if (page.kind === "service") {
    const data = page.content;
    if (data.overview) section(data.overview.title, ...data.overview.paragraphs);
    for (const cards of [data.challenges, data.advantages, data.process, data.whyChoose]) {
      if (!cards) continue;
      section(cards.title);
      for (const item of cards.items) parts.push(`### ${line(item.title, url)}`, rich(item.description));
    }
    for (const extra of data.extraContent ?? []) section(extra.title, extra.description);
    for (const links of [data.extraContentSidebarGuides, data.extraContentSidebarServices]) {
      if (links) section(links.title, links.links.map((link) => `[${link.label}](${absoluteLink(link.href, url)})`).join("\n\n"));
    }
    if (data.writtenBy) {
      const author = data.writtenBy;
      section(author.label, `${author.name}, ${author.role}. ${author.experience}`, author.biography);
    }
    if (data.youtubeVideos) section(data.youtubeVideos.title, data.youtubeVideos.description ?? "", ...data.youtubeVideos.videos.map((video) => `[${video.title}](${video.embedUrl})`));
    if (data.breakdown) {
      section(data.breakdown.title);
      for (const group of data.breakdown.groups) parts.push(`### ${line(group.title, url)}`, items(group.items));
    }
    if (data.resultsSection) {
      const result = data.resultsSection;
      section(result.title, result.description, `${result.rating.label} — ${result.rating.source}`,
        ...result.stats.map((stat) => `${stat.value}: ${stat.label}`), result.quote,
        [result.name, result.role, result.company].filter(Boolean).join(", "));
    }
    if (data.tickerCta) section(data.tickerCta.title);
    section(data.faqs.title);
    for (const faq of data.faqs.items) parts.push(`### ${line(faq.question, url)}`, rich(faq.answer));
  } else if (page.kind === "country") {
    const listing = page.content.certificates;
    section(listing.title, ...(listing.description ? [listing.description] : []));
    for (const item of listing.items) parts.push(`### ${line(item.title, url)}`, rich(item.description), absoluteLink(item.link.href, url));
  } else {
    const data = page.content;
    section(data.overview.title, ...data.overview.paragraphs);
    section(data.scope.title, data.scope.description ?? "", items(data.scope.items));
    section(data.process.title, data.process.description ?? "");
    data.process.steps.forEach((step, index) => parts.push(`### ${index + 1}. ${line(step.title, url)}`, rich(step.description)));
    section(data.ourRole.title, data.ourRole.description ?? "", items(data.ourRole.items));
    section(data.conclusion.title, ...data.conclusion.paragraphs);
  }
  section(content.closingCta.title, content.closingCta.description);
  parts.push(`[${line(content.closingCta.cta.label, url)}](${absoluteLink(content.closingCta.cta.href, url)})`);
  return parts.filter(Boolean).join("\n\n");
}

export function renderCrawlerText(content: CrawlerContent, full: boolean, siteUrl: URL): string {
  const origin = siteUrl.origin;
  const company = content.company;
  const parts = [
    `# ${line(company.name, origin)}`,
    `> ${line(company.description, origin)}`,
    `Website: ${origin}/`,
    ...(company.phone ? [`Phone: ${line(company.phone, origin)}`] : []),
    ...(company.email ? [`Email: ${line(company.email, origin)}`] : []),
    `Published service information from the company's CMS. Each service's canonical URL is the source for its current requirements.`,
    `## Resources`,
    `- [Website](${origin}/)\n- [Sitemap](${origin}/sitemap.xml)\n- [${full ? "Service overview" : "Full service content"}](${origin}/${full ? "llms" : "llms-full"}.txt)`,
  ];
  if (full) {
    parts.push(...content.pages.map((page) => `---\n\n${pageDetails(page, new URL(page.canonicalPath, origin).toString())}`));
  } else {
    for (const category of new Set(content.pages.map((page) => page.category))) {
      parts.push(`## ${category}`, content.pages.filter((page) => page.category === category).map((page) => {
        const url = new URL(page.canonicalPath, origin).toString();
        const title = line(page.content.hero.title, url).replace(/([\[\]\\])/g, "\\$1");
        const summary = line(page.content.seo.description, url);
        return `- [${title}](${url}): ${summary}`;
      }).join("\n"));
    }
  }
  return `${parts.filter(Boolean).join("\n\n")}\n`;
}

/** GET handlers stay dynamic; only CMS fetches cache for 60s under existing webhook tags. */
export async function crawlerTextResponse(full: boolean): Promise<Response> {
  const headers = { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" };
  try {
    const content = await getCrawlerContent();
    if (content) return new Response(renderCrawlerText(content, full, publicSiteUrl()), { headers });
  } catch {
    // Do not return upstream bodies, URLs, or authentication details to crawlers.
    console.warn("Published CMS content is unavailable for the AI text export.");
  }
  return new Response("Published content is temporarily unavailable. Please retry later.\n", {
    status: 503, headers: { ...headers, "Retry-After": "60" },
  });
}
