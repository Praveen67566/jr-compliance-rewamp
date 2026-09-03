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
