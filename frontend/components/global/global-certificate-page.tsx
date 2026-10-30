import { RouteClosingCta } from "@/components/editorial/route-closing-cta";
import { ConsultationForm } from "@/components/forms/consultation-form";
import { GlobalProcessImage } from "@/components/global/global-process-image";
import { SitePageShell } from "@/components/site-page-shell";
import { linkTargetProps } from "@/lib/link-props";
import type { GlobalCertificatePageContent, Link } from "@/lib/types";

type GlobalCertificatePageProps = {
  content: GlobalCertificatePageContent;
};

type SectionHeadingProps = {
  description?: string;
  eyebrow: string;
  title: string;
  tone?: "dark" | "light";
};

function SectionHeading({ description, eyebrow, title, tone = "dark" }: SectionHeadingProps) {
  const light = tone === "light";

  return (
    <div className="min-w-0 max-w-[780px]">
      <span
        className={`mb-4 flex items-center gap-2 text-[0.7rem] font-extrabold uppercase tracking-[0.14em] ${
          light ? "text-sky" : "text-cobalt-700"
        }`}
      >
        <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
        {eyebrow}
      </span>
      <h2
        className={`mb-0 break-words text-balance font-display text-[clamp(2.5rem,4vw,4.35rem)] leading-[0.97] tracking-[-0.045em] ${
          light ? "text-white" : "text-navy-950"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mb-0 mt-6 break-words text-base leading-8 ${light ? "text-ice/80" : "text-navy-700/85"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

function PrimaryLink({ link, light = false }: { link: Link; light?: boolean }) {
  return (
    <a
      className={`inline-flex min-h-12 max-w-full items-center justify-center gap-4 rounded-full border px-6 py-3 text-sm font-extrabold transition-[background-color,border-color,box-shadow,transform] duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 motion-safe:hover:-translate-y-0.5 ${
        light
          ? "border-cobalt-600/30 bg-cloud text-cobalt-700! shadow-[0_12px_30px_rgba(3,19,47,0.14)] hover:border-sky hover:bg-ice focus-visible:outline-sky"
          : "border-sky/40 bg-[linear-gradient(115deg,var(--blue-electric),var(--blue-cobalt-700))] text-white shadow-[0_12px_34px_rgba(22,140,245,0.24)] hover:shadow-[0_16px_42px_rgba(22,140,245,0.38)] focus-visible:outline-sky"
      }`}
      href={link.href}
      {...linkTargetProps(link)}
    >
      {link.label}
      <span aria-hidden="true">↗</span>
    </a>
  );
}

function ComplianceNetworkVisual() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-[1.06] w-full max-w-[540px] overflow-hidden rounded-[30px] border border-sky/35 bg-[linear-gradient(145deg,rgba(6,40,95,0.95),rgba(3,15,43,0.98))] shadow-[0_32px_85px_rgba(0,8,34,0.48)]"
    >
      <div className="absolute inset-0 opacity-55 [background-image:linear-gradient(rgba(139,220,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,220,255,0.1)_1px,transparent_1px)] [background-size:36px_36px]" />
      <div className="absolute left-1/2 top-1/2 size-[74%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky/16 motion-safe:animate-[service-orbit_19s_linear_infinite]">
        <span className="absolute left-[9%] top-[18%] size-2.5 rounded-full bg-sky shadow-[0_0_20px_rgba(139,220,255,0.9)]" />
        <span className="absolute bottom-[8%] right-[28%] size-2 rounded-full bg-electric shadow-[0_0_16px_rgba(22,140,245,0.8)]" />
      </div>
      <div className="absolute left-1/2 top-1/2 size-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-sky/30 motion-safe:animate-[service-orbit_14s_linear_infinite_reverse]">
        <span className="absolute -right-1 top-1/2 size-2.5 rounded-full border border-ice bg-electric shadow-[0_0_20px_rgba(139,220,255,0.9)]" />
      </div>
      <div className="absolute left-1/2 top-1/2 flex size-[27%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-sky/50 bg-navy-950/86 shadow-[0_0_60px_rgba(22,140,245,0.4)]">
        <svg className="size-[52%] text-sky" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M24 4 40 10v13c0 10-7 17-16 21C15 40 8 33 8 23V10L24 4Z" />
          <path d="m16 23 6 6 12-13" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="absolute left-[10%] right-[10%] top-1/2 h-px bg-[linear-gradient(90deg,transparent,var(--blue-sky),transparent)] opacity-70">
        <span className="block h-full origin-left bg-[linear-gradient(90deg,transparent,var(--blue-electric),transparent)] motion-safe:animate-[service-route-sweep_5.5s_ease-in-out_infinite]" />
      </div>
      <div className="absolute bottom-[13%] left-[14%] right-[14%] flex items-center gap-3">
        <span className="size-2 rounded-full bg-sky shadow-[0_0_18px_rgba(139,220,255,0.9)]" />
        <span className="h-px flex-1 bg-sky/30" />
        <span className="size-1.5 rounded-full bg-electric" />
        <span className="h-px w-[22%] bg-sky/20" />
        <span className="size-2 rounded-full border border-sky/70" />
      </div>
    </div>
  );
}

/** Shared CMS-driven template for every `/global/[slug]` certificate page. */
export function GlobalCertificatePage({ content }: GlobalCertificatePageProps) {
  const processImage = content.process.image;
  const sections = [
    { id: "overview", label: content.overview.eyebrow },
    { id: "scope", label: content.scope.eyebrow },
    { id: "process", label: content.process.eyebrow },
    { id: "our-role", label: content.ourRole.eyebrow },
    { id: "conclusion", label: content.conclusion.eyebrow },
  ];

  return (
    <SitePageShell
      footer={content.footer}
      navigation={content.navigation}
      seo={content.seo}
      site={content.site}
    >
      <section
        className="relative isolate overflow-hidden border-b border-sky/15 bg-navy-950 pb-16 pt-10 text-white min-[560px]:pb-20 min-[560px]:pt-12 min-[821px]:pb-24 min-[821px]:pt-14"
        id="top"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-16 -z-20 opacity-35 [background-image:linear-gradient(rgba(139,220,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(139,220,255,0.12)_1px,transparent_1px)] [background-size:54px_54px] motion-safe:animate-[service-ambient-drift_18s_ease-in-out_infinite_alternate]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_80%_22%,rgba(22,140,245,0.4),transparent_29%),radial-gradient(circle_at_7%_90%,rgba(13,92,184,0.3),transparent_31%),linear-gradient(116deg,rgba(3,15,43,0.08),rgba(6,40,95,0.25))]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[260px] -top-[260px] -z-10 size-[620px] rounded-full border border-sky/16 shadow-[0_0_0_54px_rgba(22,140,245,0.035),0_0_0_116px_rgba(22,140,245,0.025)] motion-safe:animate-[service-orbit_22s_linear_infinite] min-[821px]:-right-[220px] min-[821px]:size-[820px]"
        >
          <span className="absolute left-[17%] top-[17%] size-3 rounded-full border-2 border-ice/80 bg-electric shadow-[0_0_24px_rgba(139,220,255,0.92)]" />
          <span className="absolute bottom-[12%] right-[27%] size-2 rounded-full bg-sky shadow-[0_0_18px_rgba(139,220,255,0.82)]" />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[-8%] top-[68%] -z-10 w-[74%] -rotate-[7deg] opacity-60"
        >
          <span className="block h-px origin-left bg-[linear-gradient(90deg,transparent,rgba(139,220,255,0.72),rgba(22,140,245,0.16),transparent)] motion-safe:animate-[service-route-sweep_7s_ease-in-out_infinite]" />
          <span className="absolute left-[24%] top-[-4px] size-2 rounded-full bg-sky shadow-[0_0_18px_rgba(139,220,255,0.88)]" />
          <span className="absolute right-[18%] top-[-3px] size-1.5 rounded-full bg-electric shadow-[0_0_14px_rgba(22,140,245,0.78)]" />
        </div>

        <div className="mx-auto w-full max-w-[1320px] px-[18px] min-[560px]:px-[22px] min-[821px]:px-8">
          <nav
            aria-label="Breadcrumb"
            className="mb-10 flex max-w-full flex-wrap items-center gap-x-3 gap-y-2 border-b border-sky/15 pb-5 text-xs font-semibold text-sky min-[821px]:mb-14"
          >
            <a
              className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky"
              href="/"
            >
              Home
            </a>
            <span aria-hidden="true">/</span>
            <span>Global</span>
            <span aria-hidden="true">/</span>
            <a
              className="min-w-0 rounded-sm break-words focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky"
              href={`/global/${content.countrySlug}`}
            >
              {content.countryName}
            </a>
            <span aria-hidden="true">/</span>
            <a
              aria-current="page"
              className="min-w-0 rounded-sm break-words text-ice/75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky"
              href={`/global/${content.slug}`}
            >
              {content.menuLabel}
            </a>
          </nav>

          <div className="grid grid-cols-1 items-center gap-10 min-[980px]:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)] min-[1100px]:gap-20">
            <div className="min-w-0">
              <span className="mb-5 flex items-center gap-2 text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-sky">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
                {content.hero.eyebrow}
              </span>
              <h1 className="mb-0 max-w-[880px] break-words text-balance font-display text-[clamp(3.25rem,5vw,5.8rem)] leading-[0.98] tracking-[-0.045em] text-cloud">
                {content.hero.title}
              </h1>
              <p className="mb-0 mt-6 max-w-[650px] break-words text-base leading-[1.85] text-ice/80">
                {content.hero.description}
              </p>
              <div className="mt-8">
                <PrimaryLink link={content.hero.cta} />
              </div>
            </div>

            {content.site.leadForm.enabled ? (
              <div className="relative z-[2] mx-auto w-full max-w-[480px]">
                <ConsultationForm pageTitle={content.seo.title} settings={content.site.leadForm} />
              </div>
            ) : (
              <ComplianceNetworkVisual />
            )}
          </div>
        </div>
      </section>

      <nav aria-label="On this page" className="border-b border-cobalt-700/15 bg-cloud text-navy-700">
        <ol className="mx-auto my-0 flex w-full max-w-[1320px] list-none flex-wrap gap-x-6 gap-y-1 px-[18px] py-4 min-[560px]:px-[22px] min-[821px]:justify-between min-[821px]:px-8">
          {sections.map((section, index) => (
            <li className="min-w-0" key={section.id}>
              <a className="inline-flex min-h-11 items-center gap-2.5 rounded-sm py-2 text-xs font-semibold transition-colors hover:text-cobalt-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt-700" href={`#${section.id}`}>
                <span aria-hidden="true" className="text-cobalt-700/65">{String(index + 1).padStart(2, "0")}</span>
                <span className="min-w-0 break-words">{section.label}</span>
                <span aria-hidden="true" className="text-cobalt-700">↓</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <section
        className="relative isolate scroll-mt-[102px] overflow-hidden bg-[linear-gradient(180deg,var(--blue-cloud),var(--blue-ice))] py-14 text-navy-950 min-[560px]:py-18 min-[821px]:py-28"
        id="overview"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_18%,rgba(22,140,245,0.1),transparent_24%),radial-gradient(circle_at_88%_78%,rgba(13,92,184,0.08),transparent_26%)]"
        />
        <div className="mx-auto w-full max-w-[1320px] px-[18px] min-[560px]:px-[22px] min-[821px]:px-8">
          <article className="relative isolate grid min-w-0 grid-cols-1 gap-8 overflow-hidden rounded-[24px] border border-cobalt-700/15 bg-cloud p-6 shadow-[0_18px_50px_rgba(3,19,47,0.07)] min-[560px]:p-10 min-[980px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] min-[980px]:gap-16 min-[1100px]:p-12">
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--blue-navy-700),var(--blue-electric),var(--blue-sky))]" />
            <div className="min-w-0">
              <SectionHeading eyebrow={content.overview.eyebrow} title={content.overview.title} />
              <div aria-hidden="true" className="mt-8 flex max-w-40 items-center gap-2">
                <span className="size-2 rounded-full bg-electric" />
                <span className="h-px flex-1 bg-cobalt-700/25" />
                <span className="size-1.5 rounded-full border border-cobalt-700/40" />
              </div>
            </div>
            <div className="min-w-0 space-y-5">
              {content.overview.paragraphs.map((paragraph, index) => (
                <p
                  className="mb-0 min-w-0 break-words text-base leading-8 text-navy-700/85"
                  key={`${paragraph}-${index}`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section
        className="relative isolate scroll-mt-[102px] overflow-hidden bg-[linear-gradient(125deg,var(--blue-navy-950),var(--blue-navy-800))] py-14 text-white min-[560px]:py-18 min-[821px]:py-28"
        id="scope"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-30 [background-image:linear-gradient(rgba(139,220,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,220,255,0.1)_1px,transparent_1px)] [background-size:52px_52px] [mask-image:linear-gradient(115deg,black,transparent_82%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-36 bottom-[-190px] -z-10 size-[480px] rounded-full border border-sky/12 shadow-[0_0_0_52px_rgba(22,140,245,0.03)]"
        />
        <div className="relative mx-auto w-full max-w-[1320px] px-[18px] min-[560px]:px-[22px] min-[821px]:px-8">
          <SectionHeading
            description={content.scope.description}
            eyebrow={content.scope.eyebrow}
            title={content.scope.title}
            tone="light"
          />
          <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-3 p-0 md:mt-12 md:grid-cols-2 xl:grid-cols-3">
            {content.scope.items.map((item, index) => (
              <li
                className="relative min-w-0 overflow-hidden rounded-xl border border-sky/18 bg-cobalt-700/10 px-5 py-5 text-ice/85 min-[560px]:px-6"
                key={`${item}-${index}`}
              >
                <div className="relative flex min-w-0 items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-2 flex size-3 shrink-0 items-center justify-center rounded-full border border-sky/50 bg-electric/20"
                  >
                    <span className="size-1 rounded-full bg-sky" />
                  </span>
                  <span className="min-w-0 break-words text-[0.96rem] leading-7">{item}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="relative isolate scroll-mt-[102px] overflow-hidden bg-ice py-14 text-navy-950 min-[560px]:py-18 min-[821px]:py-28"
        id="process"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-45 [background-image:linear-gradient(rgba(13,92,184,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(13,92,184,0.07)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(circle_at_center,black,transparent_80%)]"
        />
        <div className="relative mx-auto w-full max-w-[1320px] px-[18px] min-[560px]:px-[22px] min-[821px]:px-8">
          <SectionHeading
            description={content.process.description}
            eyebrow={content.process.eyebrow}
            title={content.process.title}
          />

          <div
            className={`mt-10 grid grid-cols-1 items-start gap-8 md:mt-12 ${
              processImage ? "min-[1100px]:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] min-[1100px]:gap-12" : ""
            }`}
          >
            <ol className={`m-0 grid list-none grid-cols-1 gap-4 p-0 ${processImage ? "" : "md:grid-cols-2 min-[1100px]:grid-cols-3"}`}>
              {content.process.steps.map((step, index) => (
                <li
                  className="relative grid min-w-0 grid-cols-[2.75rem_minmax(0,1fr)] gap-4 rounded-[18px] border border-cobalt-700/15 bg-cloud p-5 shadow-[0_8px_24px_rgba(3,19,47,0.04)] min-[560px]:gap-5 min-[560px]:p-7"
                  key={`${step.title}-${index}`}
                >
                  <div className="relative flex flex-col items-center gap-3" aria-hidden="true">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-cobalt-700/20 bg-ice text-xs font-extrabold tracking-[0.08em] text-cobalt-700">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-h-5 w-px flex-1 bg-[linear-gradient(180deg,rgba(22,140,245,0.4),transparent)]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="mb-0 break-words font-display text-[1.65rem] leading-[1.1] tracking-[-0.025em] text-navy-950">
                      {step.title}
                    </h3>
                    <p className="mb-0 mt-3 break-words text-[0.94rem] leading-7 text-navy-700/85">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            {processImage ? (
              <GlobalProcessImage image={processImage}>
                <ComplianceNetworkVisual />
              </GlobalProcessImage>
            ) : null}
          </div>
        </div>
      </section>

      <section
        className="relative isolate scroll-mt-[102px] overflow-hidden bg-[linear-gradient(120deg,var(--blue-navy-800),var(--blue-cobalt-700))] py-14 text-white min-[560px]:py-18 min-[821px]:py-28"
        id="our-role"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-25 [background-image:linear-gradient(rgba(139,220,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(139,220,255,0.18)_1px,transparent_1px)] [background-size:46px_46px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-40 -z-10 size-[420px] rounded-full border border-sky/20 shadow-[0_0_0_48px_rgba(139,220,255,0.04)] motion-safe:animate-[route-orbit-drift_17s_ease-in-out_infinite]"
        />
        <div className="relative mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-10 px-[18px] min-[560px]:px-[22px] min-[821px]:px-8 min-[980px]:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] min-[980px]:gap-16">
          <div className="min-w-0">
            <SectionHeading
              description={content.ourRole.description}
              eyebrow={content.ourRole.eyebrow}
              title={content.ourRole.title}
              tone="light"
            />
            <div className="mt-8">
              <PrimaryLink link={content.ourRole.cta} />
            </div>
          </div>

          <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 md:grid-cols-2">
            {content.ourRole.items.map((item, index) => (
              <li
                className="relative min-w-0 overflow-hidden rounded-[16px] border border-sky/22 bg-navy-950/40 p-5 shadow-[inset_0_1px_rgba(139,220,255,0.06)] min-[560px]:p-6"
                key={`${item}-${index}`}
              >
                <div className="flex min-w-0 items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-sky/35 bg-electric/20 text-sky"
                  >
                    ✓
                  </span>
                  <span className="min-w-0 break-words text-[0.94rem] leading-7 text-ice/82">{item}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="relative isolate scroll-mt-[102px] overflow-hidden bg-[linear-gradient(180deg,var(--blue-cloud),var(--blue-ice))] py-14 text-navy-950 min-[560px]:py-18 min-[821px]:py-28"
        id="conclusion"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-36 -left-36 -z-10 size-[420px] rounded-full border border-cobalt-600/12 shadow-[0_0_0_44px_rgba(22,140,245,0.035),0_0_0_94px_rgba(22,140,245,0.025)] motion-safe:animate-[route-orbit-drift_18s_ease-in-out_infinite]"
        />
        <div className="mx-auto w-full max-w-[1320px] px-[18px] min-[560px]:px-[22px] min-[821px]:px-8">
          <article className="grid min-w-0 overflow-hidden rounded-[24px] border border-cobalt-700/15 bg-cloud shadow-[0_18px_50px_rgba(3,19,47,0.07)] min-[980px]:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
            <div className="relative isolate min-w-0 overflow-hidden bg-[linear-gradient(145deg,var(--blue-navy-800),var(--blue-navy-950))] p-7 text-white min-[560px]:p-10 min-[821px]:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 opacity-25 [background-image:linear-gradient(rgba(139,220,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(139,220,255,0.16)_1px,transparent_1px)] [background-size:38px_38px]"
              />
              <SectionHeading eyebrow={content.conclusion.eyebrow} title={content.conclusion.title} tone="light" />
              <div className="mt-8">
                <PrimaryLink link={content.conclusion.cta} light />
              </div>
            </div>
            <div className="min-w-0 p-7 min-[560px]:p-10 min-[821px]:p-12">
              {content.conclusion.paragraphs.map((paragraph, index) => (
                <p
                  className="mb-0 min-w-0 break-words py-3 text-base leading-8 text-navy-700/85 first:pt-0 last:pb-0"
                  key={`${paragraph}-${index}`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        </div>
      </section>

      <RouteClosingCta {...content.closingCta} />
    </SitePageShell>
  );
}
