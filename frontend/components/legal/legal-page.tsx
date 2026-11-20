import type { ReactNode } from "react";

import { SitePageShell } from "@/components/site-page-shell";
import type {
  LegalContentBlock,
  LegalInlineNode,
  LegalPageContent,
  LegalTextNode,
} from "@/lib/types";

type LegalPageProps = {
  content: LegalPageContent;
};

function safeLegalHref(value: string): string | null {
  if ((value.startsWith("/") && !value.startsWith("//")) || value.startsWith("#")) {
    return value;
  }

  try {
    const url = new URL(value);
    return ["http:", "https:", "mailto:", "tel:"].includes(url.protocol) ? value : null;
  } catch {
    return null;
  }
}

function markedText(node: LegalTextNode, key: string): ReactNode {
  let content: ReactNode = node.text;

  if (node.code) content = <code className="rounded bg-ice px-1 py-0.5 text-[0.92em]">{content}</code>;
  if (node.strikethrough) content = <s>{content}</s>;
  if (node.underline) content = <u className="underline-offset-2">{content}</u>;
  if (node.italic) content = <em>{content}</em>;
  if (node.bold) content = <strong className="font-extrabold text-navy-900">{content}</strong>;

  return <span key={key}>{content}</span>;
}

function inlineContent(nodes: LegalInlineNode[], keyPrefix: string): ReactNode[] {
  return nodes.map((node, index) => {
    const key = `${keyPrefix}-${index}`;
    if (node.type === "text") {
      return markedText(node, key);
    }

    const href = safeLegalHref(node.url);
    const children = node.children.map((child, childIndex) =>
      markedText(child, `${key}-${childIndex}`),
    );

    return href ? (
      <a
        className="rounded-sm font-bold text-cobalt-700 underline decoration-cobalt-600/35 underline-offset-4 transition-colors hover:text-cobalt-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-600 focus-visible:ring-offset-2"
        href={href}
        key={key}
      >
        {children}
      </a>
    ) : (
      <span key={key}>{children}</span>
    );
  });
}

function LegalBlocks({ blocks, keyPrefix, privacy = false }: {
  blocks: LegalContentBlock[];
  keyPrefix: string;
  privacy?: boolean;
}) {
  return blocks.map((block, index) => {
    const key = `${keyPrefix}-${index}`;

    if (block.type === "paragraph") {
      const plainText = privacy && block.children.every((node) => node.type === "text")
        ? block.children.map((node) => (node as LegalTextNode).text).join("").trim()
        : "";
      const isSubheading = privacy && plainText.length <= 110 && (
        /^\d{1,2}\.\s+[A-Z][A-Z\d\s/&(),’'—–-]+$/.test(plainText) ||
        /^[A-Z][A-Za-z\s]{3,65}\s*[-–:]$/.test(plainText)
      );
      if (isSubheading) {
        return (
          <h3 className="mt-9 border-l-[3px] border-cobalt-600 pl-4 text-[1.05rem] font-bold leading-7 tracking-[-0.01em] text-navy-900 first:mt-0" key={key}>
            {inlineContent(block.children, key)}
          </h3>
        );
      }
      return (
        <p className={privacy
          ? "mt-4 break-words text-[0.98rem] leading-[1.9] text-navy-700/85 first:mt-0"
          : "mt-5 break-words text-[1rem] leading-8 text-navy-700/85 first:mt-0"} key={key}>
          {inlineContent(block.children, key)}
        </p>
      );
    }

    if (block.type === "list") {
      const List = block.format === "ordered" ? "ol" : "ul";
      return (
        <List
          className={`${privacy ? "mt-5 space-y-2.5 pl-5 text-[0.98rem] leading-[1.9]" : "mt-6 space-y-3 pl-6 text-[1rem] leading-8"} text-navy-700/85 marker:font-bold marker:text-cobalt-600 ${
            block.format === "ordered" ? "list-decimal" : "list-disc"
          }`}
          key={key}
        >
          {block.children.map((item, itemIndex) => (
            <li className="break-words pl-2" key={`${key}-${itemIndex}`}>
              {inlineContent(item.children, `${key}-${itemIndex}`)}
            </li>
          ))}
        </List>
      );
    }

    const heading = inlineContent(block.children, key);
    if (block.level === 2) {
      return (
        <h2
          className={privacy
            ? "mt-9 break-words font-display text-[clamp(1.35rem,2.5vw,1.75rem)] leading-[1.35] tracking-[-0.025em] text-navy-950 first:mt-0"
            : "mt-12 break-words font-display text-[clamp(2rem,4vw,3rem)] leading-[1.02] tracking-[-0.035em] text-navy-950 first:mt-0"}
          key={key}
        >
          {heading}
        </h2>
      );
    }

    if (block.level === 3) {
      return (
        <h3
          className={privacy
            ? "mt-8 border-l-[3px] border-cobalt-600 pl-4 text-[1.08rem] font-bold leading-7 tracking-[-0.015em] text-navy-900 first:mt-0"
            : "mt-10 break-words font-display text-[clamp(1.55rem,3vw,2.1rem)] leading-[1.08] tracking-[-0.025em] text-navy-900 first:mt-0"}
          key={key}
        >
          {heading}
        </h3>
      );
    }

    return (
      <h4
        className={privacy
          ? "mt-7 break-words text-[1rem] font-bold leading-7 text-navy-800 first:mt-0"
          : "mt-8 break-words text-[1.08rem] font-extrabold leading-7 text-navy-800 first:mt-0"}
        key={key}
      >
        {heading}
      </h4>
    );
  });
}

function sectionAnchor(title: string, index: number, used: Map<string, number>): string {
  const base =
    title
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || `section-${index + 1}`;
  const occurrence = used.get(base) ?? 0;
  used.set(base, occurrence + 1);
  return occurrence ? `${base}-${occurrence + 1}` : base;
}

export function LegalPage({ content }: LegalPageProps) {
  const isPrivacy = content.slug === "privacy-policy";
  const updatedAt = isPrivacy && content.updatedAt ? new Date(content.updatedAt) : null;
  const updatedDate = updatedAt && Number.isFinite(updatedAt.getTime())
    ? new Intl.DateTimeFormat("en-IN", {
        day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata",
      }).format(updatedAt)
    : null;
  const usedAnchors = new Map<string, number>();
  const sections = content.sections.map((section, index) => ({
    ...section,
    anchor: sectionAnchor(section.title, index, usedAnchors),
  }));
  const sectionLinks = sections.map((section, index) => (
    <li key={section.anchor}>
      <a
        className={isPrivacy
          ? "group flex items-start gap-3 rounded-xl px-2.5 py-3 text-[0.82rem] font-semibold leading-5 text-navy-700/85! transition-colors hover:bg-ice hover:text-cobalt-700! focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-600"
          : "block rounded-lg px-3 py-2.5 text-[0.84rem] font-bold leading-5 text-navy-700/80! transition-colors hover:bg-ice hover:text-cobalt-700! focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-600"}
        href={`#${section.anchor}`}
      >
        <span
          className={isPrivacy
            ? "grid size-6 shrink-0 place-items-center rounded-md border border-cobalt-700/10 bg-ice text-[0.63rem] font-bold tabular-nums text-cobalt-700 transition-colors group-hover:border-cobalt-600/25 group-hover:bg-cloud"
            : "mr-2 text-[0.66rem] tracking-[0.1em] text-cobalt-700"}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        {section.title}
      </a>
    </li>
  ));

  return (
    <SitePageShell
      footer={content.footer}
      navigation={content.navigation}
      seo={content.seo}
      site={content.site}
    >
      <section
        aria-labelledby="legal-page-title"
        className="relative isolate overflow-hidden border-b border-sky/15 bg-[radial-gradient(circle_at_78%_18%,rgba(22,140,245,0.3),transparent_34%),linear-gradient(145deg,var(--blue-navy-950),var(--blue-navy-700))]"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-30 [background-image:linear-gradient(rgba(139,220,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(139,220,255,0.12)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:linear-gradient(to_bottom,black,transparent_92%)]"
        />
        <div
          aria-hidden="true"
          className="absolute -right-24 top-10 -z-10 size-[360px] rounded-full border border-sky/20 max-[560px]:size-[250px]"
        />
        {isPrivacy ? (
          <svg aria-hidden="true" className="absolute right-[12%] top-1/2 hidden h-36 w-28 -translate-y-1/2 text-sky/35 min-[981px]:block" viewBox="0 0 64 80" fill="none">
            <path d="M32 4 58 14v22c0 18-11 31-26 40C17 67 6 54 6 36V14L32 4Z" stroke="currentColor" strokeWidth="1.5" />
            <rect x="22" y="32" width="20" height="17" rx="4" stroke="currentColor" strokeWidth="1.5" />
            <path d="M26 32v-5a6 6 0 0 1 12 0v5M32 39v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ) : null}
        <div className={isPrivacy
          ? "site-container mx-auto w-full max-w-[1240px] px-8 pb-16 pt-10 max-[820px]:px-[22px] max-[560px]:px-[18px] max-[560px]:pb-12 max-[560px]:pt-7"
          : "site-container mx-auto w-full max-w-[1320px] px-8 py-28 max-[820px]:px-[22px] max-[820px]:py-[72px] max-[560px]:px-[18px] max-[560px]:py-14"}>
          {isPrivacy ? (
            <nav aria-label="Breadcrumb" className="mb-9 flex items-center gap-2.5 text-[0.75rem] font-medium text-ice/65 max-[560px]:mb-7">
              <a className="rounded-sm text-ice/80! transition-colors hover:text-cloud! focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky" href="/">Home</a>
              <span aria-hidden="true" className="text-sky/50">/</span>
              <span aria-current="page">{content.title}</span>
            </nav>
          ) : null}
          <span className="eyebrow">{content.eyebrow}</span>
          <h1
            className={isPrivacy
              ? "mt-4 max-w-[800px] break-words font-display text-[clamp(2.8rem,6vw,4.6rem)] leading-[1.06] tracking-[-0.045em] text-cloud"
              : "mt-6 max-w-[980px] break-words font-display text-[clamp(3.25rem,7vw,5.8rem)] leading-[0.92] tracking-[-0.055em] text-cloud"}
            id="legal-page-title"
          >
            {content.title}
          </h1>
          {isPrivacy ? (
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.75rem] font-medium tracking-[0.015em] text-ice/80">
              <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="size-1.5 rounded-full bg-sky" />{sections.length} sections</span>
              {updatedDate ? <span className="border-l border-sky/25 pl-5">Last updated <time dateTime={content.updatedAt}>{updatedDate}</time></span> : null}
            </div>
          ) : null}
        </div>
      </section>

      <section className={isPrivacy
        ? "bg-[linear-gradient(180deg,var(--blue-cloud),var(--blue-ice))] py-16 max-[820px]:py-10 max-[560px]:py-7"
        : "bg-[linear-gradient(180deg,var(--blue-cloud),var(--blue-ice))] py-28 max-[820px]:py-[72px] max-[560px]:py-14"}>
        <div className={isPrivacy
          ? "site-container mx-auto grid w-full max-w-[1240px] grid-cols-[240px_minmax(0,1fr)] items-start gap-8 px-8 max-[980px]:grid-cols-1 max-[980px]:gap-5 max-[820px]:px-[22px] max-[560px]:px-[18px]"
          : "site-container mx-auto grid w-full max-w-[1320px] grid-cols-[250px_minmax(0,1fr)] items-start gap-12 px-8 max-[980px]:grid-cols-1 max-[820px]:px-[22px] max-[560px]:px-[18px]"}>
          <nav
            aria-label={`${content.title} sections`}
            className={isPrivacy
              ? "sticky top-[122px] hidden max-h-[calc(100vh-148px)] overflow-y-auto rounded-[20px] border border-cobalt-700/12 bg-cloud p-4 shadow-[0_12px_32px_rgba(13,92,184,0.05)] min-[981px]:block"
              : "sticky top-[122px] max-h-[calc(100vh-148px)] overflow-y-auto rounded-[22px] border border-cobalt-700/15 bg-cloud/85 p-5 shadow-[0_18px_48px_rgba(13,92,184,0.1)] backdrop-blur max-[980px]:static max-[980px]:max-h-none"}
          >
            <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-cobalt-700">
              On this page
            </p>
            <ol role={isPrivacy ? "list" : undefined} className={isPrivacy ? "mt-4 list-none space-y-0.5 border-t border-cobalt-700/10 pl-0 pt-2" : "mt-4 space-y-1.5 border-l border-cobalt-700/15 pl-3"}>
              {sectionLinks}
            </ol>
          </nav>

          {isPrivacy ? (
            <details className="group rounded-2xl border border-cobalt-700/15 bg-cloud shadow-[0_8px_24px_rgba(13,92,184,0.04)] min-[981px]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-5 py-4 text-[0.85rem] font-bold text-navy-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt-600 [&::-webkit-details-marker]:hidden">
                On this page <span className="ml-auto text-[0.72rem] font-medium text-cobalt-700">{sections.length} sections</span>
                <svg aria-hidden="true" className="size-4 transition-transform group-open:rotate-180 motion-reduce:transition-none" viewBox="0 0 20 20" fill="none"><path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </summary>
              <nav aria-label={`${content.title} sections`} className="border-t border-cobalt-700/10 px-2 py-2"><ol role="list" className="m-0 list-none p-0">{sectionLinks}</ol></nav>
            </details>
          ) : null}

          <article className={isPrivacy
            ? "min-w-0 space-y-6"
            : "min-w-0 rounded-[28px] border border-cobalt-700/15 bg-cloud p-10 shadow-[0_24px_70px_rgba(13,92,184,0.11)] max-[820px]:p-7 max-[560px]:rounded-[22px] max-[560px]:p-5"}>
            {content.introduction.length ? (
              <div className={isPrivacy
                ? "rounded-[20px] border border-cobalt-700/12 bg-[linear-gradient(135deg,var(--blue-cloud),var(--blue-ice))] p-8 shadow-[0_12px_36px_rgba(13,92,184,0.04)] max-[560px]:p-5"
                : "border-b border-cobalt-700/15 pb-10"}>
                {isPrivacy ? <h2 className="mb-5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-cobalt-700">Overview</h2> : null}
                <LegalBlocks blocks={content.introduction} keyPrefix="introduction" privacy={isPrivacy} />
              </div>
            ) : null}

            <div className={isPrivacy ? "space-y-6" : content.introduction.length ? "pt-2" : ""}>
              {sections.map((section, index) => (
                <section
                  className={isPrivacy
                    ? "scroll-mt-[118px] rounded-[20px] border border-cobalt-700/12 bg-cloud p-8 shadow-[0_12px_36px_rgba(13,92,184,0.04)] max-[560px]:p-5"
                    : "scroll-mt-[118px] border-b border-cobalt-700/15 py-10 first:pt-8 last:border-b-0 last:pb-0"}
                  id={section.anchor}
                  key={section.anchor}
                >
                  {isPrivacy ? (
                    <header className="flex items-start gap-4 border-b border-cobalt-700/10 pb-5 max-[560px]:gap-3">
                      <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-cobalt-700/10 bg-ice text-[0.73rem] font-bold tabular-nums text-cobalt-700" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                      <h2 className="min-w-0 pt-0.5 font-display text-[clamp(1.4rem,2.5vw,1.85rem)] leading-[1.3] tracking-[-0.025em] text-navy-950">{section.title}</h2>
                    </header>
                  ) : (
                    <>
                      <span className="text-[0.68rem] font-extrabold tracking-[0.14em] text-cobalt-700" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                      <h2 className="mt-3 break-words font-display text-[clamp(2rem,4vw,3.15rem)] leading-[1.02] tracking-[-0.04em] text-navy-950">{section.title}</h2>
                    </>
                  )}
                  <div className={isPrivacy ? "mt-6 max-w-[76ch]" : "mt-7"}>
                    <LegalBlocks blocks={section.body} keyPrefix={section.anchor} privacy={isPrivacy} />
                  </div>
                </section>
              ))}
            </div>
          </article>
        </div>
      </section>
    </SitePageShell>
  );
}
