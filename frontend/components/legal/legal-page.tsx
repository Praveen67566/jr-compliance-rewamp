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

function LegalBlocks({ blocks, keyPrefix }: { blocks: LegalContentBlock[]; keyPrefix: string }) {
  return blocks.map((block, index) => {
    const key = `${keyPrefix}-${index}`;

    if (block.type === "paragraph") {
      return (
        <p className="mt-5 break-words text-[1rem] leading-8 text-navy-700/85 first:mt-0" key={key}>
          {inlineContent(block.children, key)}
        </p>
      );
    }

    if (block.type === "list") {
      const List = block.format === "ordered" ? "ol" : "ul";
      return (
        <List
          className={`mt-6 space-y-3 pl-6 text-[1rem] leading-8 text-navy-700/85 marker:font-bold marker:text-cobalt-600 ${
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
          className="mt-12 break-words font-display text-[clamp(2rem,4vw,3rem)] leading-[1.02] tracking-[-0.035em] text-navy-950 first:mt-0"
          key={key}
        >
          {heading}
        </h2>
      );
    }

    if (block.level === 3) {
      return (
        <h3
          className="mt-10 break-words font-display text-[clamp(1.55rem,3vw,2.1rem)] leading-[1.08] tracking-[-0.025em] text-navy-900 first:mt-0"
          key={key}
        >
          {heading}
        </h3>
      );
    }

    return (
      <h4
        className="mt-8 break-words text-[1.08rem] font-extrabold leading-7 text-navy-800 first:mt-0"
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
  const usedAnchors = new Map<string, number>();
  const sections = content.sections.map((section, index) => ({
    ...section,
    anchor: sectionAnchor(section.title, index, usedAnchors),
  }));

  return (
    <SitePageShell footer={content.footer} navigation={content.navigation} site={content.site}>
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
        <div className="site-container mx-auto w-full max-w-[1320px] px-8 py-28 max-[820px]:px-[22px] max-[820px]:py-[72px] max-[560px]:px-[18px] max-[560px]:py-14">
          <span className="eyebrow">{content.eyebrow}</span>
          <h1
            className="mt-6 max-w-[980px] break-words font-display text-[clamp(3.25rem,7vw,5.8rem)] leading-[0.92] tracking-[-0.055em] text-cloud"
            id="legal-page-title"
          >
            {content.title}
          </h1>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,var(--blue-cloud),var(--blue-ice))] py-28 max-[820px]:py-[72px] max-[560px]:py-14">
        <div className="site-container mx-auto grid w-full max-w-[1320px] grid-cols-[250px_minmax(0,1fr)] items-start gap-12 px-8 max-[980px]:grid-cols-1 max-[820px]:px-[22px] max-[560px]:px-[18px]">
          <nav
            aria-label={`${content.title} sections`}
            className="sticky top-[122px] max-h-[calc(100vh-148px)] overflow-y-auto rounded-[22px] border border-cobalt-700/15 bg-cloud/85 p-5 shadow-[0_18px_48px_rgba(13,92,184,0.1)] backdrop-blur max-[980px]:static max-[980px]:max-h-none"
          >
            <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-cobalt-700">
              On this page
            </p>
            <ol className="mt-4 space-y-1.5 border-l border-cobalt-700/15 pl-3">
              {sections.map((section, index) => (
                <li key={section.anchor}>
                  <a
                    className="block rounded-lg px-3 py-2.5 text-[0.84rem] font-bold leading-5 text-navy-700/80 transition-colors hover:bg-ice hover:text-cobalt-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-600"
                    href={`#${section.anchor}`}
                  >
                    <span className="mr-2 text-[0.66rem] tracking-[0.1em] text-cobalt-600" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="min-w-0 rounded-[28px] border border-cobalt-700/15 bg-cloud p-10 shadow-[0_24px_70px_rgba(13,92,184,0.11)] max-[820px]:p-7 max-[560px]:rounded-[22px] max-[560px]:p-5">
            {content.introduction.length ? (
              <div className="border-b border-cobalt-700/15 pb-10">
                <LegalBlocks blocks={content.introduction} keyPrefix="introduction" />
              </div>
            ) : null}

            <div className={content.introduction.length ? "pt-2" : ""}>
              {sections.map((section, index) => (
                <section
                  className="scroll-mt-[118px] border-b border-cobalt-700/15 py-10 first:pt-8 last:border-b-0 last:pb-0"
                  id={section.anchor}
                  key={section.anchor}
                >
                  <span className="text-[0.68rem] font-extrabold tracking-[0.14em] text-cobalt-600" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-3 break-words font-display text-[clamp(2rem,4vw,3.15rem)] leading-[1.02] tracking-[-0.04em] text-navy-950">
                    {section.title}
                  </h2>
                  <div className="mt-7">
                    <LegalBlocks blocks={section.body} keyPrefix={section.anchor} />
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
