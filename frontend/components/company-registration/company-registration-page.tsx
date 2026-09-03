import type { ReactNode } from "react";

import { RouteClosingCta } from "@/components/editorial/route-closing-cta";
import { ConsultationForm } from "@/components/forms/consultation-form";
import { TrustedBrandsMarquee } from "@/components/home/trusted-brands-marquee";
import { SitePageShell } from "@/components/site-page-shell";
import { RotatingEarthBackground } from "@/components/visuals/rotating-earth-background";
import { linkTargetProps } from "@/lib/link-props";
import { renderRegistrationMarkdown } from "@/lib/registration-markdown";
import type {
  CompanyRegistrationPageContent,
  FssaiServicePageContent,
  FundRaisingPageContent,
  GovernmentLicenseCertificationPageContent,
  ImportExportServicePageContent,
  IprServicePageContent,
  LabourCompliancePageContent,
  LegalContentBlock,
  LegalInlineNode,
  LegalTextNode,
  McaServicePageContent,
  RegistrationDetail,
  RegistrationRichText,
  RegistrationResultsSection,
  SebiBusinessRegistrationPageContent,
  TaxAccountingPageContent,
} from "@/lib/types";

type CompanyRegistrationPageProps = {
  content:
    | CompanyRegistrationPageContent
    | McaServicePageContent
    | ImportExportServicePageContent
    | GovernmentLicenseCertificationPageContent
    | IprServicePageContent
    | FssaiServicePageContent
    | SebiBusinessRegistrationPageContent
    | TaxAccountingPageContent
    | LabourCompliancePageContent
    | FundRaisingPageContent;
  breadcrumb: {
    areaLabel: "Corporate" | "Approval";
    categoryLabel: string;
  };
  showHeroGlobe?: boolean;
};

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  tone?: "dark" | "light";
  compact?: boolean;
  headingId?: string;
};

function SectionHeading({
  eyebrow,
  title,
  tone = "dark",
  compact = false,
  headingId,
}: SectionHeadingProps) {
  const light = tone === "light";

  return (
    <div className={`${compact ? "mb-8 md:mb-10" : "mb-10 md:mb-14"} min-w-0 max-w-[760px]`}>
      <span
        className={`mb-4 flex items-center gap-2 text-[0.7rem] font-extrabold uppercase tracking-[0.14em] ${
          light ? "text-sky" : "text-cobalt-600"
        }`}
      >
        <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2
        id={headingId}
        className={`break-words font-display text-[clamp(2.5rem,4vw,4.35rem)] leading-[0.97] tracking-[-0.045em] ${compact ? "mb-0" : ""} ${
          light ? "text-white" : "text-navy-950"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}

function safeRegistrationHref(value: string): string | null {
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

function markedRegistrationText(node: LegalTextNode, key: string): ReactNode {
  let content: ReactNode = node.text;

  if (node.code) content = <code className="rounded bg-ice px-1 py-0.5 text-[0.92em]">{content}</code>;
  if (node.strikethrough) content = <s>{content}</s>;
  if (node.underline) content = <u className="underline-offset-2">{content}</u>;
  if (node.italic) content = <em>{content}</em>;
  if (node.bold) content = <strong className="font-extrabold">{content}</strong>;

  // Strapi rich-text text nodes can contain explicit line breaks. HTML normally
  // collapses those breaks into spaces, so preserve them without changing the data.
  return <span className="whitespace-pre-line" key={key}>{content}</span>;
}

function registrationInlineContent(nodes: LegalInlineNode[], keyPrefix: string, light: boolean): ReactNode[] {
  return nodes.map((node, index) => {
    const key = `${keyPrefix}-${index}`;
    if (node.type === "text") {
      return markedRegistrationText(node, key);
    }

    const href = safeRegistrationHref(node.url);
    const children = node.children.map((child, childIndex) =>
      markedRegistrationText(child, `${key}-${childIndex}`),
    );

    return href ? (
      <a
        className={`rounded-sm font-bold underline decoration-sky/55 underline-offset-4 transition-colors hover:text-sky focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 ${
          light ? "text-sky" : "text-cobalt-700 hover:text-cobalt-600"
        }`}
        href={href}
        key={key}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        target={href.startsWith("http") ? "_blank" : undefined}
      >
        {children}
      </a>
    ) : (
      <span key={key}>{children}</span>
    );
  });
}

function RegistrationRichTextView({
  value,
  className,
  light = false,
}: {
  value: RegistrationRichText;
  className: string;
  light?: boolean;
}) {
  const richTextClassName = `${className} min-w-0 [&>*+*]:mt-4 [&_a]:rounded-sm [&_a]:font-bold [&_a]:underline [&_a]:decoration-sky/55 [&_a]:underline-offset-4 [&_a]:transition-colors [&_a]:focus-visible:outline-none [&_a]:focus-visible:ring-2 [&_a]:focus-visible:ring-sky [&_a]:focus-visible:ring-offset-2 [&_blockquote]:rounded-r-xl [&_blockquote]:border-l-2 [&_blockquote]:px-4 [&_blockquote]:py-2 [&_blockquote]:italic [&_code]:break-words [&_code]:rounded [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.88em] [&_h1]:font-display [&_h1]:text-[1.8rem] [&_h1]:leading-[1.05] [&_h2]:font-display [&_h2]:text-[1.55rem] [&_h2]:leading-[1.08] [&_h3]:font-display [&_h3]:text-[1.3rem] [&_h3]:leading-[1.12] [&_h4]:text-[1.05rem] [&_h4]:font-extrabold [&_h5]:text-[1rem] [&_h5]:font-extrabold [&_h6]:text-[0.92rem] [&_h6]:font-extrabold [&_hr]:border-0 [&_hr]:border-t [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-xl [&_img]:border [&_img]:object-contain [&_li]:pl-1 [&_mark]:rounded [&_mark]:bg-sky/35 [&_mark]:px-1 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_p]:whitespace-pre-line [&_pre]:max-w-full [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:border [&_pre]:p-4 [&_pre]:text-sm [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_strong]:font-extrabold [&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto [&_table]:border-collapse [&_td]:border [&_td]:p-2.5 [&_th]:border [&_th]:p-2.5 [&_th]:text-left [&_th]:font-extrabold [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 ${
    light
      ? "[&_a]:text-sky [&_a:hover]:text-white [&_blockquote]:border-sky/50 [&_blockquote]:bg-white/[0.045] [&_code]:bg-navy-950/60 [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_h4]:text-ice [&_h5]:text-ice [&_h6]:text-ice [&_hr]:border-sky/25 [&_img]:border-sky/20 [&_pre]:border-sky/20 [&_pre]:bg-navy-950/80 [&_strong]:text-white [&_td]:border-sky/20 [&_th]:border-sky/25 [&_th]:text-white"
      : "[&_a]:text-cobalt-700 [&_a:hover]:text-cobalt-600 [&_blockquote]:border-cobalt-600/45 [&_blockquote]:bg-ice/75 [&_code]:bg-ice [&_h1]:text-navy-950 [&_h2]:text-navy-950 [&_h3]:text-navy-900 [&_h4]:text-navy-800 [&_h5]:text-navy-800 [&_h6]:text-navy-700 [&_hr]:border-cobalt-700/15 [&_img]:border-cobalt-700/15 [&_pre]:border-cobalt-700/18 [&_pre]:bg-navy-950 [&_pre]:text-ice [&_strong]:text-navy-950 [&_td]:border-cobalt-700/15 [&_th]:border-cobalt-700/20 [&_th]:text-navy-950"
  }`;

  if (typeof value === "string") {
    return (
      <div
        className={richTextClassName}
        dangerouslySetInnerHTML={{ __html: renderRegistrationMarkdown(value) }}
      />
    );
  }

  return (
    <div className={richTextClassName}>
      {value.map((block: LegalContentBlock, index) => {
        const key = `registration-rich-text-${index}`;

        if (block.type === "paragraph") {
          const children = registrationInlineContent(block.children, key, light);
          return <p key={key}>{children}</p>;
        }

        if (block.type === "list") {
          const List = block.format === "ordered" ? "ol" : "ul";
          return (
            <List key={key}>
              {block.children.map((item, itemIndex) => (
                <li key={`${key}-${itemIndex}`}>
                  {registrationInlineContent(item.children, `${key}-${itemIndex}`, light)}
                </li>
              ))}
            </List>
          );
        }

        const Heading = block.level === 2 ? "h2" : block.level === 3 ? "h3" : "h4";
        return (
          <Heading key={key}>
            {registrationInlineContent(block.children, key, light)}
          </Heading>
        );
      })}
    </div>
  );
}

type DecorativeCardIconProps = {
  src: string;
  size: "compact" | "standard";
  surface: "dark" | "light";
};

function DecorativeCardIcon({ src, size, surface }: DecorativeCardIconProps) {
  const standard = size === "standard";

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border shadow-[0_5px_18px_rgba(3,19,47,0.18)] ${
        standard ? "size-12" : "size-8"
      } ${surface === "light" ? "border-sky/45 bg-ice/95" : "border-sky/30 bg-navy-950/90"}`}
    >
      <img
        alt=""
        aria-hidden="true"
        className={`pointer-events-none select-none object-contain ${standard ? "size-10" : "size-7"}`}
        height={standard ? 40 : 28}
        loading="lazy"
        src={src}
        width={standard ? 40 : 28}
      />
    </span>
  );
}

function DetailCard({ item, index, light = false }: { item: RegistrationDetail; index: number; light?: boolean }) {
  return (
    <article
      className={`group relative min-w-0 overflow-hidden rounded-[22px] border p-6 transition-colors md:min-h-[250px] md:p-8 ${
        light
          ? "border-sky/18 bg-white/[0.045] hover:border-sky/45 hover:bg-white/[0.075]"
          : "border-cobalt-700/15 bg-white hover:border-cobalt-600/45"
      }`}
    >
      <div
        className={`absolute -right-14 -top-14 size-36 rounded-full border ${
          light ? "border-sky/10" : "border-cobalt-600/10"
        }`}
        aria-hidden="true"
      />
      {item.icon ? (
        <span className="pointer-events-none absolute right-5 top-5 size-16" aria-hidden="true">
          <span
            className={`absolute inset-0 z-0 rounded-full border border-dashed motion-safe:animate-[service-orbit_14s_linear_infinite] ${
              light ? "border-sky/35" : "border-cobalt-600/25"
            }`}
          >
            <span
              className={`absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full ${
                light
                  ? "bg-sky shadow-[0_0_13px_rgba(139,220,255,0.72)]"
                  : "bg-electric shadow-[0_0_13px_rgba(22,140,245,0.68)]"
              }`}
            />
          </span>
          <DecorativeCardIcon size="standard" src={item.icon} surface={light ? "light" : "dark"} />
        </span>
      ) : null}
      <span className={`text-[0.68rem] font-extrabold tracking-[0.14em] ${light ? "text-sky" : "text-cobalt-600"}`}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3
        className={`mt-12 max-w-[22rem] break-words font-display text-[1.75rem] leading-[1.03] tracking-[-0.025em] ${
          light ? "text-white" : "text-navy-950"
        }`}
      >
        {item.title}
      </h3>
      <RegistrationRichTextView
        className={`mt-4 break-words text-[0.94rem] leading-7 ${light ? "text-ice/72" : "text-navy-700/75"}`}
        light={light}
        value={item.description}
      />
    </article>
  );
}

function PlanningCard({ item, index }: { item: RegistrationDetail; index: number }) {
  return (
    <article className="group relative h-full min-w-0 overflow-hidden rounded-[24px] border border-sky/20 bg-[linear-gradient(145deg,rgba(6,40,95,0.92),rgba(3,15,43,0.98))] p-6 shadow-[0_22px_55px_rgba(0,8,34,0.3)] transition-[transform,border-color,box-shadow] duration-300 hover:border-sky/55 hover:shadow-[0_28px_70px_rgba(13,92,184,0.3)] motion-safe:hover:-translate-y-2 md:p-8">
      <div
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(139,220,255,0.82),transparent)] opacity-70"
        aria-hidden="true"
      />
      <div
        className="absolute -right-14 -top-14 size-36 rounded-full border border-sky/10 bg-cobalt-700/5 transition-transform duration-500 motion-safe:group-hover:scale-110"
        aria-hidden="true"
      />
      <div className="relative flex items-center gap-3" aria-hidden="true">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-sky/45 bg-electric/15 text-[0.68rem] font-extrabold tracking-[0.12em] text-sky shadow-[0_0_24px_rgba(22,140,245,0.16)]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="relative h-px flex-1 overflow-hidden bg-sky/15">
          <span className="absolute inset-0 origin-left scale-x-0 bg-[linear-gradient(90deg,transparent,var(--blue-sky),transparent)] transition-transform duration-500 motion-safe:group-hover:scale-x-100" />
        </span>
        {item.icon ? (
          <span className="pointer-events-none relative size-14 shrink-0" aria-hidden="true">
            <span className="absolute inset-0 z-0 rounded-full border border-dashed border-sky/45 motion-safe:animate-[service-orbit_14s_linear_infinite]">
              <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-sky shadow-[0_0_14px_rgba(139,220,255,0.72)]" />
            </span>
            <DecorativeCardIcon size="standard" src={item.icon} surface="light" />
          </span>
        ) : (
          <span className="size-2 rounded-full border border-sky/70 bg-sky shadow-[0_0_14px_rgba(139,220,255,0.72)]" />
        )}
      </div>
      <h3 className="relative mb-0 mt-8 max-w-[22rem] break-words font-display text-[1.9rem] leading-[1.02] tracking-[-0.03em] text-white">
        {item.title}
      </h3>
      <RegistrationRichTextView
        className="relative mb-0 mt-4 break-words text-[0.94rem] leading-7 text-ice/72"
        light
        value={item.description}
      />
    </article>
  );
}

function AdvantageCard({ item, index }: { item: RegistrationDetail; index: number }) {
  return (
    <article className="group relative h-full min-w-0 overflow-hidden rounded-[24px] border border-cobalt-700/15 bg-[linear-gradient(145deg,var(--blue-cloud),rgba(234,246,255,0.76))] p-6 shadow-[0_18px_48px_rgba(3,19,47,0.09)] transition-[transform,border-color,box-shadow] duration-300 hover:border-cobalt-600/45 hover:shadow-[0_28px_65px_rgba(13,92,184,0.16)] motion-safe:hover:-translate-y-2 md:p-8">
      <div
        className="pointer-events-none absolute right-5 top-5 size-16"
        aria-hidden="true"
      >
        <span className="absolute inset-0 z-0 rounded-full border border-cobalt-600/15 motion-safe:animate-[service-orbit_14s_linear_infinite]">
          <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-electric shadow-[0_0_13px_rgba(22,140,245,0.75)]" />
        </span>
        {item.icon ? <DecorativeCardIcon size="standard" src={item.icon} surface="dark" /> : null}
      </div>
      <div className="relative flex items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-cobalt-600/25 bg-electric text-[0.68rem] font-extrabold tracking-[0.12em] text-white shadow-[0_10px_26px_rgba(22,140,245,0.22)]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="h-px flex-1 bg-[linear-gradient(90deg,rgba(22,140,245,0.34),transparent)]" aria-hidden="true" />
      </div>
      <h3 className="relative mb-0 mt-9 max-w-[22rem] break-words font-display text-[1.9rem] leading-[1.02] tracking-[-0.03em] text-navy-950">
        {item.title}
      </h3>
      <RegistrationRichTextView
        className="relative mb-0 mt-4 break-words text-[0.94rem] leading-7 text-navy-700/76"
        value={item.description}
      />
      <div className="absolute inset-x-6 bottom-0 h-px overflow-hidden bg-cobalt-700/10 md:inset-x-8" aria-hidden="true">
        <span
          className="block h-full w-full origin-left bg-[linear-gradient(90deg,transparent,var(--blue-electric),transparent)] motion-safe:animate-[service-route-sweep_4.8s_ease-in-out_infinite]"
          style={{ animationDelay: `${index * -0.8}s` }}
        />
      </div>
    </article>
  );
}

function ResultsSection({ section }: { section: RegistrationResultsSection }) {
  const attribution = [section.role, section.company].filter(Boolean).join(" · ");
  const statsGrid =
    section.stats.length === 1
      ? "grid-cols-1"
      : section.stats.length === 2
        ? "grid-cols-1 min-[560px]:grid-cols-2"
        : "grid-cols-1 min-[560px]:grid-cols-3";

  return (
    <section
      aria-labelledby="service-results-heading"
      className="relative isolate scroll-mt-28 overflow-hidden border-t border-cobalt-700/10 bg-ice py-14 text-navy-950 min-[560px]:py-18 min-[821px]:py-28"
      id="results"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_82%_18%,rgba(22,140,245,0.09),transparent_30%),radial-gradient(circle_at_8%_88%,rgba(13,92,184,0.06),transparent_30%)]"
        aria-hidden="true"
      />
      <div className="mx-auto w-full max-w-[1180px] px-[18px] min-[560px]:px-[22px] min-[821px]:px-8">
        <div className="grid min-w-0 items-start gap-5 min-[821px]:gap-6 min-[1100px]:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
          <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[22px] border border-cobalt-700/12 bg-cloud p-5 shadow-[0_20px_55px_rgba(3,19,47,0.08)] min-[560px]:p-7 min-[821px]:p-8">
            <span
              className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--blue-cobalt-700),var(--blue-electric),var(--blue-sky))]"
              aria-hidden="true"
            />
            <div className="flex w-fit max-w-full flex-wrap items-center gap-x-3 gap-y-2 rounded-full border border-cobalt-700/10 bg-ice/70 px-3 py-2 text-xs text-navy-700/80">
              <strong className="font-extrabold text-navy-950">{section.rating.label}</strong>
              <span className="flex items-center gap-1" aria-hidden="true">
                {Array.from({ length: 5 }, (_, index) => (
                  <span
                    className="flex size-[18px] items-center justify-center rounded-[4px] border border-cobalt-700/15 bg-electric text-[0.58rem] leading-none text-white shadow-[0_3px_8px_rgba(22,140,245,0.16)]"
                    key={index}
                  >
                    ★
                  </span>
                ))}
              </span>
              <span className="font-bold text-cobalt-700">{section.rating.source}</span>
            </div>

            <h2
              className="mb-0 mt-6 max-w-[540px] break-words font-sans text-[clamp(1.75rem,2.2vw,2.4rem)] font-bold leading-[1.08] tracking-[-0.035em] text-navy-950"
              id="service-results-heading"
            >
              {section.title}
            </h2>
            <p className="mb-0 mt-3 max-w-[540px] break-words text-sm leading-6 text-navy-700/75">
              {section.description}
            </p>

            <dl className={`mt-8 grid gap-5 border-t border-cobalt-700/10 pt-6 ${statsGrid}`}>
              {section.stats.map((stat, index) => (
                <div className="flex min-w-0 flex-col border-l-2 border-electric/25 pl-4" key={`${stat.label}-${index}`}>
                  <dt className="order-2 mt-1.5 break-words text-[0.7rem] font-semibold leading-5 text-navy-700/75">
                    {stat.label}
                  </dt>
                  <dd className="order-1 m-0 break-words font-display text-[1.75rem] leading-none tracking-[-0.02em] text-navy-950">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <blockquote className="relative mx-0 mb-0 flex min-w-0 flex-col overflow-hidden rounded-[22px] border border-cobalt-700/12 bg-cloud p-5 shadow-[0_20px_55px_rgba(3,19,47,0.08)] min-[560px]:p-7 min-[821px]:p-8">
            <div className="flex items-center gap-4" aria-hidden="true">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-cobalt-700/12 bg-cloud font-display text-[1.8rem] leading-none text-cobalt-600/55 shadow-[0_8px_20px_rgba(13,92,184,0.08)]">
                “
              </span>
              <span className="h-px flex-1 bg-[linear-gradient(90deg,rgba(13,92,184,0.2),transparent)]" />
            </div>
            <p className="mb-0 mt-5 max-w-[60ch] break-words text-[0.95rem] font-normal leading-7 text-navy-800">
              {section.quote}
            </p>
            <footer className="mt-7 border-t border-cobalt-700/10 pt-5 text-xs leading-5 text-navy-700/75">
              <cite className="not-italic">
                <span className="flex items-start gap-3">
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-electric shadow-[0_0_10px_rgba(22,140,245,0.35)]" aria-hidden="true" />
                  <span className="min-w-0">
                    <strong className="block break-words text-sm font-bold text-cobalt-700">{section.name}</strong>
                    {attribution ? <span className="mt-0.5 block break-words">{attribution}</span> : null}
                  </span>
                </span>
              </cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

export function CompanyRegistrationPage({
  breadcrumb,
  content,
  showHeroGlobe = false,
}: CompanyRegistrationPageProps) {
  return (
    <SitePageShell footer={content.footer} navigation={content.navigation} site={content.site}>
      <section
        className="relative isolate overflow-hidden border-b border-sky/15 bg-navy-950 pb-16 pt-10 text-white min-[560px]:pb-20 min-[560px]:pt-12 min-[821px]:pb-24 min-[821px]:pt-14"
        id="top"
      >
        {showHeroGlobe ? <RotatingEarthBackground variant="registration" /> : null}
        <div
          className="pointer-events-none absolute -inset-16 -z-20 opacity-35 [background-image:linear-gradient(rgba(139,220,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(139,220,255,0.12)_1px,transparent_1px)] [background-size:54px_54px] motion-safe:animate-[service-ambient-drift_18s_ease-in-out_infinite_alternate]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_78%_24%,rgba(22,140,245,0.42),transparent_27%),radial-gradient(circle_at_8%_88%,rgba(13,92,184,0.3),transparent_30%),linear-gradient(115deg,rgba(3,15,43,0.1),rgba(6,40,95,0.22))]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-[260px] -top-[260px] -z-10 size-[620px] rounded-full border border-sky/16 shadow-[0_0_0_54px_rgba(22,140,245,0.035),0_0_0_116px_rgba(22,140,245,0.025)] motion-safe:animate-[service-orbit_22s_linear_infinite] min-[821px]:-right-[220px] min-[821px]:size-[820px]"
          aria-hidden="true"
        >
          <span className="absolute left-[17%] top-[17%] size-3 rounded-full border-2 border-ice/80 bg-electric shadow-[0_0_24px_rgba(139,220,255,0.92)]" />
          <span className="absolute bottom-[12%] right-[27%] size-2 rounded-full bg-sky shadow-[0_0_18px_rgba(139,220,255,0.82)]" />
        </div>
        <div
          className="pointer-events-none absolute right-[6%] top-[10%] -z-10 hidden size-[520px] rounded-full border border-dashed border-sky/22 motion-safe:animate-[service-orbit_17s_linear_infinite_reverse] min-[821px]:block"
          aria-hidden="true"
        >
          <span className="absolute -left-1 top-1/2 size-2.5 rounded-full bg-sky shadow-[0_0_20px_rgba(139,220,255,0.9)]" />
        </div>
        <div
          className="pointer-events-none absolute left-[-8%] top-[46%] -z-10 w-[74%] -rotate-[7deg] opacity-60 min-[821px]:top-[72%]"
          aria-hidden="true"
        >
          <span className="block h-px origin-left bg-[linear-gradient(90deg,transparent,rgba(139,220,255,0.72),rgba(22,140,245,0.16),transparent)] motion-safe:animate-[service-route-sweep_7s_ease-in-out_infinite]" />
          <span className="absolute left-[24%] top-[-4px] size-2 rounded-full bg-sky shadow-[0_0_18px_rgba(139,220,255,0.88)]" />
          <span className="absolute right-[18%] top-[-3px] size-1.5 rounded-full bg-electric shadow-[0_0_14px_rgba(22,140,245,0.78)]" />
        </div>
        <div
          className="pointer-events-none absolute bottom-[14%] left-[18%] -z-10 size-64 rounded-full bg-cobalt-700/15 blur-3xl motion-safe:animate-[route-orbit-drift_15s_ease-in-out_infinite]"
          aria-hidden="true"
        />

        <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 items-start gap-10 px-[18px] min-[560px]:px-[22px] min-[821px]:px-8 min-[980px]:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] min-[980px]:gap-12">
          <div className="min-w-0">
            <nav aria-label="Breadcrumb" className="mb-6 inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-sky/18 bg-navy-900/70 px-4 py-2.5 text-xs font-bold text-sky shadow-[inset_0_1px_rgba(255,255,255,0.06)] backdrop-blur-sm">
              <a
                className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky"
                href="/"
              >
                Home
              </a>
              <span aria-hidden="true">/</span>
              <a
                className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky"
                href="/#services"
              >
                {breadcrumb.areaLabel}
              </a>
              <span aria-hidden="true">/</span>
              <span className="min-w-0 break-words text-ice/75">
                {breadcrumb.categoryLabel}
              </span>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="min-w-0 break-words text-ice/75">
                {content.menuLabel}
              </span>
            </nav>
            <span className="mb-5 flex items-center gap-2 text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-sky">
              <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
              {content.hero.eyebrow}
            </span>
            <h1 className="mb-2 max-w-[880px] break-words font-display text-[clamp(3.25rem,5vw,5.8rem)] leading-[0.92] tracking-[-0.055em] text-white">
              {content.hero.title}
            </h1>
            <p className="mb-0 mt-7 max-w-[760px] break-words text-base leading-8 text-ice/78 md:text-lg">
              {content.hero.description}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <a
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-sky bg-electric px-6 text-sm font-extrabold text-white shadow-[0_10px_34px_rgba(22,140,245,0.32)] transition hover:bg-cobalt-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky"
                href={content.hero.cta.href}
                {...linkTargetProps(content.hero.cta)}
              >
                {content.hero.cta.label} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          {content.site.leadForm.enabled ? (
            <div className="relative z-[2] mx-auto w-full max-w-[540px] self-start">
              <ConsultationForm pageTitle={content.seo.title} settings={content.site.leadForm} />
            </div>
          ) : (
          <div
            className="relative mx-auto aspect-[1.06] w-full max-w-[520px] overflow-hidden rounded-[30px] border border-sky/35 bg-navy-800/80 shadow-[0_30px_80px_rgba(0,8,34,0.42)]"
            aria-hidden="true"
          >
            <div
              className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(139,220,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,220,255,0.1)_1px,transparent_1px)] [background-size:36px_36px]"
              aria-hidden="true"
            />
            <div className="absolute left-1/2 top-1/2 size-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky/18" aria-hidden="true" />
            <div className="absolute left-1/2 top-1/2 size-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky/35 bg-cobalt-700/15" aria-hidden="true" />
            <div className="absolute left-1/2 top-1/2 flex size-[25%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-sky/60 bg-navy-950/80 shadow-[0_0_55px_rgba(22,140,245,0.35)]">
              <span className="font-display text-[clamp(2.4rem,5vw,4.4rem)] leading-none text-white">JR</span>
            </div>
            {[
              "left-[15%] top-[25%]",
              "right-[13%] top-[34%]",
              "bottom-[18%] left-[29%]",
              "bottom-[25%] right-[24%]",
            ].map((position) => (
              <span
                className={`absolute size-2.5 rounded-full bg-sky shadow-[0_0_18px_rgba(139,220,255,0.9)] ${position}`}
                key={position}
                aria-hidden="true"
              />
            ))}
            <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full border border-sky/35 bg-navy-950/80 px-4 py-2 text-[0.62rem] font-extrabold uppercase tracking-[0.12em] text-sky">
              <span className="size-1.5 rounded-full bg-sky" aria-hidden="true" />
              Connected expertise
            </span>
          </div>
          )}
        </div>
      </section>

      {content.trustedLogos ? <TrustedBrandsMarquee logos={content.trustedLogos} /> : null}

      <section className="relative isolate scroll-mt-28 overflow-hidden bg-ice py-14 text-navy-950 min-[560px]:py-18 min-[821px]:py-28" id="overview">
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_18%,rgba(22,140,245,0.1),transparent_24%),radial-gradient(circle_at_88%_78%,rgba(13,92,184,0.08),transparent_26%)]"
          aria-hidden="true"
        />
        <div className="mx-auto w-full max-w-[1320px] px-[18px] min-[560px]:px-[22px] min-[821px]:px-8">
          <article className="grid min-w-0 overflow-hidden rounded-[30px] border border-cobalt-700/18 bg-cloud shadow-[0_28px_75px_rgba(3,19,47,0.12)] min-[1100px]:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
            <div className="relative isolate min-w-0 overflow-hidden bg-[linear-gradient(145deg,var(--blue-navy-800),var(--blue-navy-950))] p-7 text-white min-[560px]:p-10 min-[821px]:p-12">
              <div
                className="pointer-events-none absolute inset-0 -z-10 opacity-25 [background-image:linear-gradient(rgba(139,220,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(139,220,255,0.16)_1px,transparent_1px)] [background-size:38px_38px]"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-28 -right-24 -z-10 size-64 rounded-full border border-sky/20 shadow-[0_0_0_36px_rgba(22,140,245,0.04)]"
                aria-hidden="true"
              />
              <span className="mb-5 flex items-center gap-2 text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-sky">
                <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
                {content.overview.eyebrow}
              </span>
              <h2 className="mb-0 max-w-[560px] break-words font-display text-[clamp(2.5rem,4vw,4.35rem)] leading-[0.97] tracking-[-0.045em] text-white">
                {content.overview.title}
              </h2>
              <div className="mt-10 flex items-center gap-3" aria-hidden="true">
                <span className="size-2.5 rounded-full border-2 border-sky bg-electric shadow-[0_0_18px_rgba(139,220,255,0.72)]" />
                <span className="h-px flex-1 bg-[linear-gradient(90deg,var(--blue-sky),rgba(139,220,255,0.08))]" />
                <span className="size-1.5 rounded-full bg-sky/75" />
              </div>
            </div>
            <div className="min-w-0 bg-[linear-gradient(150deg,var(--blue-cloud),rgba(234,246,255,0.72))] p-7 min-[560px]:p-10 min-[821px]:p-12">
              {content.overview.paragraphs.map((paragraph, index) => (
                <div
                  className="grid min-w-0 grid-cols-1 gap-3 border-b border-cobalt-700/12 py-5 first:pt-0 last:border-0 last:pb-0 min-[560px]:grid-cols-[2.65rem_minmax(0,1fr)] min-[560px]:gap-4"
                  key={`${index}-${typeof paragraph === "string" ? paragraph : index}`}
                >
                  <span className="flex size-10 items-center justify-center rounded-xl border border-cobalt-600/18 bg-ice text-[0.65rem] font-extrabold tracking-[0.12em] text-cobalt-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <RegistrationRichTextView
                    className="mb-0 min-w-0 break-words text-base leading-8 text-navy-700/80 md:text-lg"
                    value={paragraph}
                  />
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-navy-950 py-14 min-[560px]:py-18 min-[821px]:py-28">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-30 [background-image:linear-gradient(rgba(139,220,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,220,255,0.1)_1px,transparent_1px)] [background-size:52px_52px] [mask-image:linear-gradient(115deg,black,transparent_78%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-32 bottom-[-180px] -z-10 size-[460px] rounded-full border border-sky/12 shadow-[0_0_0_52px_rgba(22,140,245,0.03)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-[1320px] px-[18px] min-[560px]:px-[22px] min-[821px]:px-8">
          <SectionHeading eyebrow={content.challenges.eyebrow} title={content.challenges.title} tone="light" compact />
          <div className="relative grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {content.challenges.items.map((item, index) => (
              <PlanningCard item={item} index={index} key={item.title} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-ice py-14 min-[560px]:py-18 min-[821px]:py-28">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(rgba(13,92,184,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(13,92,184,0.07)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-20 top-[12%] -z-10 size-72 rounded-full bg-electric/10 blur-3xl motion-safe:animate-[service-ambient-drift_16s_ease-in-out_infinite_alternate]"
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-[1320px] px-[18px] min-[560px]:px-[22px] min-[821px]:px-8">
          <SectionHeading eyebrow={content.advantages.eyebrow} title={content.advantages.title} compact />
          <div className="relative grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div
              className="pointer-events-none absolute left-[7%] right-[7%] top-5 hidden h-px bg-[linear-gradient(90deg,transparent,rgba(22,140,245,0.28),transparent)] xl:block"
              aria-hidden="true"
            />
            {content.advantages.items.map((item, index) => (
              <AdvantageCard item={item} index={index} key={item.title} />
            ))}
          </div>
        </div>
      </section>

      <section className="scroll-mt-28 bg-navy-800 py-14 min-[560px]:py-18 min-[821px]:py-28" id="process">
        <div className="mx-auto w-full max-w-[1320px] px-[18px] min-[560px]:px-[22px] min-[821px]:px-8">
          <SectionHeading eyebrow={content.process.eyebrow} title={content.process.title} tone="light" />
          <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-[26px] border border-sky/15 bg-sky/15 md:grid-cols-2 lg:grid-cols-3">
            {content.process.items.map((item, index) => (
              <li className="min-w-0 min-h-[230px] bg-navy-950 p-7 md:p-9" key={`${item.title}-${index}`}>
                {item.icon ? (
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-sky/35 text-xs font-extrabold text-sky">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="pointer-events-none relative size-10 shrink-0" aria-hidden="true">
                      <span className="absolute inset-0 z-0 rounded-full border border-dashed border-sky/35 motion-safe:animate-[service-orbit_12s_linear_infinite]">
                        <span className="absolute -top-0.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-sky shadow-[0_0_10px_rgba(139,220,255,0.72)]" />
                      </span>
                      <DecorativeCardIcon size="compact" src={item.icon} surface="light" />
                    </span>
                  </div>
                ) : (
                  <span className="inline-flex size-11 items-center justify-center rounded-full border border-sky/35 text-xs font-extrabold text-sky">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                )}
                <h3 className="mt-8 break-words font-display text-[1.75rem] leading-[1.05] text-white">{item.title}</h3>
                <RegistrationRichTextView
                  className="mt-4 break-words text-sm leading-7 text-ice/70"
                  light
                  value={item.description}
                />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative overflow-hidden bg-cobalt-700 py-14 min-[560px]:py-18 min-[821px]:py-28">
        <div
          className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(139,220,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(139,220,255,0.18)_1px,transparent_1px)] [background-size:46px_46px]"
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-[1320px] px-[18px] min-[560px]:px-[22px] min-[821px]:px-8">
          <SectionHeading eyebrow={content.whyChoose.eyebrow} title={content.whyChoose.title} tone="light" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {content.whyChoose.items.map((item, index) => (
              <DetailCard item={item} index={index} key={item.title} light />
            ))}
          </div>
        </div>
      </section>

      {content.extraContent?.length ? (
        <section
          aria-label="Additional service information"
          className="relative isolate overflow-hidden border-y border-cobalt-700/10 bg-[linear-gradient(155deg,var(--blue-cloud),var(--blue-ice))] py-14 text-navy-950 min-[560px]:py-18 min-[821px]:py-28"
          id="extra-content"
        >
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-45 [background-image:linear-gradient(rgba(13,92,184,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(13,92,184,0.07)_1px,transparent_1px)] [background-size:46px_46px] [mask-image:radial-gradient(circle_at_center,black,transparent_84%)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -right-28 top-16 -z-10 size-80 rounded-full bg-electric/10 blur-3xl"
            aria-hidden="true"
          />
          <ol
            className={`relative mx-auto grid w-full max-w-[1320px] list-none grid-cols-1 gap-5 px-[18px] min-[560px]:px-[22px] min-[821px]:px-8 ${
              content.extraContent.length === 1 ? "min-[821px]:max-w-[960px]" : "min-[981px]:grid-cols-2"
            }`}
          >
            {content.extraContent.map((item, index) => (
              <li className="min-w-0" key={`${item.title}-${index}`}>
                <article className="group relative h-full min-w-0 overflow-hidden rounded-[28px] border border-cobalt-700/16 bg-cloud p-7 shadow-[0_22px_60px_rgba(3,19,47,0.1)] transition-[transform,border-color,box-shadow] duration-300 hover:border-cobalt-600/42 hover:shadow-[0_30px_76px_rgba(13,92,184,0.16)] motion-safe:hover:-translate-y-2 min-[560px]:p-9">
                  <span
                    className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--blue-cobalt-700),var(--blue-electric),var(--blue-sky))]"
                    aria-hidden="true"
                  />
                  <span
                    className="pointer-events-none absolute -right-20 -top-20 size-52 rounded-full border border-cobalt-600/10 shadow-[0_0_0_28px_rgba(22,140,245,0.025)] transition-transform duration-500 motion-safe:group-hover:scale-110"
                    aria-hidden="true"
                  />
                  <div className="relative flex items-center gap-3" aria-hidden="true">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-cobalt-600/20 bg-ice text-[0.65rem] font-extrabold tracking-[0.12em] text-cobalt-700 shadow-[0_8px_22px_rgba(13,92,184,0.12)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px flex-1 bg-[linear-gradient(90deg,rgba(22,140,245,0.34),transparent)]" />
                    <span className="size-2 rounded-full bg-electric shadow-[0_0_13px_rgba(22,140,245,0.7)]" />
                  </div>
                  <h2 className="relative mt-8 break-words font-display text-[clamp(2rem,3vw,2.75rem)] leading-[1.02] tracking-[-0.035em] text-navy-950">
                    {item.title}
                  </h2>
                  <RegistrationRichTextView
                    className="relative mt-6 break-words text-[0.98rem] leading-7 text-navy-700/80 md:text-base md:leading-8"
                    value={item.description}
                  />
                </article>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {content.youtubeVideos ? (
        <section
          className="relative isolate overflow-hidden bg-navy-950 py-14 min-[560px]:py-18 min-[821px]:py-28"
          aria-labelledby="youtube-videos-heading"
          id="youtube-videos"
        >
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-25 [background-image:linear-gradient(rgba(139,220,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(139,220,255,0.12)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(circle_at_center,black,transparent_82%)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -right-28 top-10 -z-10 size-80 rounded-full bg-electric/12 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative mx-auto w-full max-w-[1320px] px-[18px] min-[560px]:px-[22px] min-[821px]:px-8">
            <SectionHeading
              eyebrow={content.youtubeVideos.eyebrow}
              headingId="youtube-videos-heading"
              title={content.youtubeVideos.title}
              tone="light"
            />
            {content.youtubeVideos.description ? (
              <p className="-mt-5 mb-10 max-w-[760px] text-base leading-8 text-ice/72 md:text-lg">
                {content.youtubeVideos.description}
              </p>
            ) : null}
            <div
              className={`grid grid-cols-1 gap-6 ${
                content.youtubeVideos.videos.length === 1
                  ? "mx-auto w-full min-[821px]:max-w-[calc(50%_-_0.75rem)]"
                  : "min-[821px]:grid-cols-2"
              }`}
            >
              {content.youtubeVideos.videos.map((video, index) => (
                <figure
                  className="m-0 min-w-0 overflow-hidden rounded-[26px] border border-sky/20 bg-navy-800/80 shadow-[0_24px_62px_rgba(0,8,34,0.34)]"
                  key={`${video.embedUrl}-${index}`}
                >
                  <div className="relative aspect-video overflow-hidden border-b border-sky/15 bg-navy-900">
                    <iframe
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full border-0"
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                      src={video.embedUrl}
                      title={video.title}
                    />
                  </div>
                  <figcaption className="flex min-w-0 items-start gap-4 p-6 md:p-7">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-sky/30 bg-electric/12 text-[0.65rem] font-extrabold tracking-[0.12em] text-sky">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mb-0 min-w-0 break-words font-display text-[1.65rem] leading-[1.05] text-white">
                      {video.title}
                    </h3>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="relative isolate scroll-mt-28 overflow-hidden bg-[linear-gradient(180deg,var(--blue-cloud),var(--blue-ice))] py-14 text-navy-950 min-[560px]:py-18 min-[821px]:py-28" id="breakdown">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-50 [background-image:linear-gradient(rgba(13,92,184,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(13,92,184,0.07)_1px,transparent_1px)] [background-size:46px_46px] [mask-image:linear-gradient(100deg,black,transparent_88%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-44 top-16 -z-10 size-[420px] rounded-full border border-cobalt-600/12 shadow-[0_0_0_46px_rgba(22,140,245,0.035),0_0_0_96px_rgba(22,140,245,0.025)] motion-safe:animate-[route-orbit-drift_18s_ease-in-out_infinite]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-32 right-[5%] -z-10 size-80 rounded-full bg-cobalt-600/8 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-[1320px] px-[18px] min-[560px]:px-[22px] min-[821px]:px-8">
          <SectionHeading eyebrow={content.breakdown.eyebrow} title={content.breakdown.title} compact />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {content.breakdown.groups.map((group, groupIndex) => (
              <article
                className="group min-w-0 overflow-hidden rounded-[26px] border border-cobalt-700/18 bg-cloud shadow-[0_22px_58px_rgba(3,19,47,0.1)] transition-[transform,border-color,box-shadow] duration-300 hover:border-cobalt-600/40 hover:shadow-[0_30px_72px_rgba(13,92,184,0.15)] motion-safe:hover:-translate-y-2"
                key={group.title}
              >
                <div className="relative isolate overflow-hidden border-b border-sky/18 bg-[linear-gradient(140deg,var(--blue-navy-800),var(--blue-navy-950))] p-7 text-white md:p-8">
                  <div
                    className="pointer-events-none absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(139,220,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(139,220,255,0.16)_1px,transparent_1px)] [background-size:30px_30px]"
                    aria-hidden="true"
                  />
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex min-h-8 items-center rounded-full border border-sky/30 bg-sky/10 px-3 text-[0.68rem] font-extrabold tracking-[0.14em] text-sky">
                      {String(groupIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="pointer-events-none relative size-9" aria-hidden="true">
                      <span className="absolute inset-0 z-0 rounded-full border border-dashed border-sky/35 motion-safe:animate-[service-orbit_13s_linear_infinite]">
                        <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-sky shadow-[0_0_12px_rgba(139,220,255,0.75)]" />
                      </span>
                      {group.icon ? <DecorativeCardIcon size="compact" src={group.icon} surface="light" /> : null}
                    </span>
                  </div>
                  <h3 className="mb-0 mt-8 break-words font-display text-[2rem] leading-none tracking-[-0.03em] text-white">
                    {group.title}
                  </h3>
                </div>
                <ul className="m-0 list-none p-7 md:p-8">
                  {group.items.map((item, itemIndex) => (
                    <li
                      className="relative grid grid-cols-[1.5rem_minmax(0,1fr)] gap-3 border-b border-cobalt-700/10 py-4 text-sm leading-6 text-navy-700/80 before:absolute before:bottom-[-1rem] before:left-[0.7rem] before:top-[2rem] before:w-px before:bg-cobalt-700/15 first:pt-0 last:border-0 last:pb-0 last:before:hidden"
                      key={`${group.title}-${itemIndex}`}
                    >
                      <span className="relative z-10 mt-0.5 flex size-6 items-center justify-center rounded-full border border-cobalt-600/25 bg-ice shadow-[0_4px_12px_rgba(13,92,184,0.1)]" aria-hidden="true">
                        <span className="size-1.5 rounded-full bg-electric" />
                      </span>
                      <RegistrationRichTextView
                        className="min-w-0 break-words"
                        value={item}
                      />
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {content.resultsSection ? <ResultsSection section={content.resultsSection} /> : null}

      {content.tickerCta ? (
        <section
          className="contact-ticker"
          aria-label={content.tickerCta.description ?? content.tickerCta.title}
        >
          <a
            aria-label={`${content.tickerCta.title}: ${content.tickerCta.cta.label}`}
            href={content.tickerCta.cta.href}
            {...linkTargetProps(content.tickerCta.cta)}
          >
            <span aria-hidden="true">{content.tickerCta.title}</span>
            <i aria-hidden="true">✦</i>
            <span aria-hidden="true">{content.tickerCta.title}</span>
            <i aria-hidden="true">✦</i>
            <span aria-hidden="true">{content.tickerCta.title}</span>
            <i aria-hidden="true">✦</i>
            <span aria-hidden="true">{content.tickerCta.title}</span>
            <i aria-hidden="true">✦</i>
          </a>
        </section>
      ) : null}

      <section className="scroll-mt-28 bg-ice py-14 text-navy-950 min-[560px]:py-18 min-[821px]:py-28" id="faq">
        <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-10 px-[18px] min-[560px]:px-[22px] min-[821px]:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] min-[821px]:px-8">
          <SectionHeading eyebrow={content.faqs.eyebrow} title={content.faqs.title} />
          <div className="min-w-0 divide-y divide-cobalt-700/15 border-y border-cobalt-700/15">
            {content.faqs.items.map((faq, index) => (
              <details className="group py-2" key={faq.question} open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 rounded-lg py-5 text-base font-extrabold marker:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric [&::-webkit-details-marker]:hidden">
                  <span className="min-w-0 break-words">{faq.question}</span>
                  <span
                    className="flex size-8 shrink-0 items-center justify-center rounded-full border border-cobalt-600/30 text-electric transition group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-[800px] break-words pb-6 pr-10 text-sm leading-7 text-navy-700/75 md:text-base">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <RouteClosingCta {...content.closingCta} />
    </SitePageShell>
  );
}
