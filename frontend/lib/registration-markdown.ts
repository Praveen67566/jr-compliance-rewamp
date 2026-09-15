import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";

const registrationMarkdown = new MarkdownIt({
  breaks: true,
  html: true,
  linkify: true,
  typographer: true,
});

function resolveCmsAssetHref(value: string, strapiUrl: string | undefined): string {
  if (!value.startsWith("/uploads/") || !strapiUrl) {
    return value;
  }

  try {
    return new URL(value, strapiUrl).toString();
  } catch {
    return value;
  }
}

function safeLinkHref(
  value: string | undefined,
  strapiUrl: string | undefined,
): string | null {
  if (!value) {
    return null;
  }

  const resolvedValue = resolveCmsAssetHref(value, strapiUrl);
  if (
    (resolvedValue.startsWith("/") && !resolvedValue.startsWith("//")) ||
    resolvedValue.startsWith("#")
  ) {
    return resolvedValue;
  }

  try {
    return ["http:", "https:", "mailto:", "tel:"].includes(new URL(resolvedValue).protocol)
      ? resolvedValue
      : null;
  } catch {
    return null;
  }
}

function safeImageSrc(
  value: string | undefined,
  strapiUrl: string | undefined,
): string | null {
  if (!value) {
    return null;
  }

  const resolvedValue = resolveCmsAssetHref(value, strapiUrl);
  if (resolvedValue.startsWith("/") && !resolvedValue.startsWith("//")) {
    return resolvedValue;
  }

  try {
    return ["http:", "https:"].includes(new URL(resolvedValue).protocol)
      ? resolvedValue
      : null;
  } catch {
    return null;
  }
}

export function renderRegistrationMarkdown(
  value: string,
  strapiUrl = process.env.STRAPI_URL,
): string {
  return sanitizeHtml(registrationMarkdown.render(value), {
    allowedAttributes: {
      a: ["href", "rel", "target", "title"],
      code: ["class"],
      img: ["alt", "decoding", "loading", "src", "title"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedTags: Array.from(
      new Set([...sanitizeHtml.defaults.allowedTags, "img", "mark", "s", "u"]),
    ),
    allowProtocolRelative: false,
    enforceHtmlBoundary: true,
    transformTags: {
      a: (_tagName, attributes) => {
        const href = safeLinkHref(attributes.href, strapiUrl);
        if (!href) {
          return { tagName: "span", attribs: {} };
        }

        const external = /^https?:\/\//i.test(href);
        return {
          tagName: "a",
          attribs: {
            href,
            ...(attributes.title ? { title: attributes.title } : {}),
            ...(external ? { rel: "noreferrer", target: "_blank" } : {}),
          },
        };
      },
      img: (_tagName, attributes) => {
        const src = safeImageSrc(attributes.src, strapiUrl);
        return src
          ? {
              tagName: "img",
              attribs: {
                alt: attributes.alt ?? "",
                decoding: "async",
                loading: "lazy",
                src,
                ...(attributes.title ? { title: attributes.title } : {}),
              },
            }
          : { tagName: "span", attribs: {} };
      },
    },
  });
}

/**
 * Keeps common pasted Extra Content visually consistent with structured
 * Markdown: check-prefixed lines become lists, while standalone questions and
 * short labels immediately introducing those lists become section headings.
 */
export function renderRegistrationArticleMarkdown(
  value: string,
  options: {
    articleTitle?: string;
    strapiUrl?: string;
  } = {},
): string {
  const sourceLines = value.split(/\r?\n/);
  const firstContentIndex = sourceLines.findIndex((line) => Boolean(line.trim()));
  const firstHeading = sourceLines[firstContentIndex]?.trim().match(/^#{1,6}\s+(.+?)\s*#*$/);
  const normalizeHeading = (heading: string) =>
    heading
      .replace(/[*_`~]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .toLocaleLowerCase();

  if (
    firstContentIndex >= 0 &&
    firstHeading?.[1] &&
    options.articleTitle &&
    normalizeHeading(firstHeading[1]) === normalizeHeading(options.articleTitle)
  ) {
    sourceLines[firstContentIndex] = "";
  }

  const checkLines = sourceLines.map((line) => /^(\s*)[✓✔☑]\s+/.test(line));
  const normalizedLines = sourceLines.map((line) => {
    const match = line.match(/^(\s*)[✓✔☑]\s+(.+)$/);
    if (!match) {
      return line;
    }

    const [, indentation, content] = match;
    const dashIndex = content.indexOf(" — ");
    const listContent =
      dashIndex > 0
        ? `**${content.slice(0, dashIndex)}**${content.slice(dashIndex)}`
        : content;
    return `${indentation}- ${listContent}`;
  });

  const normalizedValue = normalizedLines
    .map((line, index) => {
      const trimmedLine = line.trim();
      const isAlreadyStructured =
        !trimmedLine ||
        /^(?:#{1,6}\s|[-*+]\s|\d+[.)]\s|>|```|<)/.test(trimmedLine);
      if (isAlreadyStructured || checkLines[index]) {
        return line;
      }

      const previousLineIsBlank = index === 0 || !sourceLines[index - 1]?.trim();
      const nextLineIsBlank =
        index === sourceLines.length - 1 || !sourceLines[index + 1]?.trim();
      const hasEarlierContent = sourceLines.slice(0, index).some((item) => item.trim());
      const nextContentIndex = sourceLines.findIndex(
        (item, candidateIndex) => candidateIndex > index && Boolean(item.trim()),
      );
      const introducesCheckList =
        nextContentIndex > index && checkLines[nextContentIndex] === true;
      const isQuestionHeading = trimmedLine.endsWith("?") && trimmedLine.length <= 90;

      return previousLineIsBlank &&
        nextLineIsBlank &&
        hasEarlierContent &&
        (introducesCheckList || isQuestionHeading)
        ? `## ${trimmedLine}`
        : line;
    })
    .join("\n");

  return renderRegistrationMarkdown(normalizedValue, options.strapiUrl);
}
