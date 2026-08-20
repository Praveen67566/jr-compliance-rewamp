import { RouteClosingCta } from "@/components/editorial/route-closing-cta";
import { ConsultationForm } from "@/components/forms/consultation-form";
import { SitePageShell } from "@/components/site-page-shell";
import { linkTargetProps } from "@/lib/link-props";
import type {
  CompanyRegistrationPageContent,
  FssaiServicePageContent,
  FundRaisingPageContent,
  GovernmentLicenseCertificationPageContent,
  ImportExportServicePageContent,
  IprServicePageContent,
  LabourCompliancePageContent,
  McaServicePageContent,
  RegistrationDetail,
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
      <p className={`mt-4 break-words text-[0.94rem] leading-7 ${light ? "text-ice/72" : "text-navy-700/75"}`}>
        {item.description}
      </p>
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
        <span className="size-2 rounded-full border border-sky/70 bg-sky shadow-[0_0_14px_rgba(139,220,255,0.72)]" />
      </div>
      <h3 className="relative mb-0 mt-8 max-w-[22rem] break-words font-display text-[1.9rem] leading-[1.02] tracking-[-0.03em] text-white">
        {item.title}
      </h3>
      <p className="relative mb-0 mt-4 break-words text-[0.94rem] leading-7 text-ice/72">
        {item.description}
      </p>
    </article>
  );
}

function AdvantageCard({ item, index }: { item: RegistrationDetail; index: number }) {
  return (
    <article className="group relative h-full min-w-0 overflow-hidden rounded-[24px] border border-cobalt-700/15 bg-[linear-gradient(145deg,var(--blue-cloud),rgba(234,246,255,0.76))] p-6 shadow-[0_18px_48px_rgba(3,19,47,0.09)] transition-[transform,border-color,box-shadow] duration-300 hover:border-cobalt-600/45 hover:shadow-[0_28px_65px_rgba(13,92,184,0.16)] motion-safe:hover:-translate-y-2 md:p-8">
      <div
        className="absolute right-5 top-5 size-16 rounded-full border border-cobalt-600/15 motion-safe:animate-[service-orbit_14s_linear_infinite]"
        aria-hidden="true"
      >
        <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-electric shadow-[0_0_13px_rgba(22,140,245,0.75)]" />
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
      <p className="relative mb-0 mt-4 break-words text-[0.94rem] leading-7 text-navy-700/76">
        {item.description}
      </p>
      <div className="absolute inset-x-6 bottom-0 h-px overflow-hidden bg-cobalt-700/10 md:inset-x-8" aria-hidden="true">
        <span
          className="block h-full w-full origin-left bg-[linear-gradient(90deg,transparent,var(--blue-electric),transparent)] motion-safe:animate-[service-route-sweep_4.8s_ease-in-out_infinite]"
          style={{ animationDelay: `${index * -0.8}s` }}
        />
      </div>
    </article>
  );
}

export function CompanyRegistrationPage({ content }: CompanyRegistrationPageProps) {
  return (
    <SitePageShell footer={content.footer} navigation={content.navigation} site={content.site}>
      <section
        className="relative isolate overflow-hidden border-b border-sky/15 bg-navy-950 pb-16 pt-10 text-white min-[560px]:pb-20 min-[560px]:pt-12 min-[821px]:pb-24 min-[821px]:pt-14"
        id="top"
      >
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
                {content.hero.eyebrow}
              </a>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="min-w-0 break-words text-ice/75">
                {content.menuLabel}
              </span>
            </nav>
            <span className="mb-5 flex items-center gap-2 text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-sky">
              <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
              {content.hero.eyebrow}
            </span>
            <h1 className="mb-0 max-w-[880px] break-words font-display text-[clamp(3.25rem,5vw,5.8rem)] leading-[0.92] tracking-[-0.055em] text-white">
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
                  key={`${index}-${paragraph}`}
                >
                  <span className="flex size-10 items-center justify-center rounded-xl border border-cobalt-600/18 bg-ice text-[0.65rem] font-extrabold tracking-[0.12em] text-cobalt-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mb-0 min-w-0 break-words text-base leading-8 text-navy-700/80 md:text-lg">
                    {paragraph}
                  </p>
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
                <span className="inline-flex size-11 items-center justify-center rounded-full border border-sky/35 text-xs font-extrabold text-sky">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-8 break-words font-display text-[1.75rem] leading-[1.05] text-white">{item.title}</h3>
                <p className="mt-4 break-words text-sm leading-7 text-ice/70">{item.description}</p>
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
            <div className="grid grid-cols-1 gap-6 min-[821px]:grid-cols-2">
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
                    <span className="relative size-9 rounded-full border border-dashed border-sky/35 motion-safe:animate-[service-orbit_13s_linear_infinite]" aria-hidden="true">
                      <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-sky shadow-[0_0_12px_rgba(139,220,255,0.75)]" />
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
                      key={`${itemIndex}-${item}`}
                    >
                      <span className="relative z-10 mt-0.5 flex size-6 items-center justify-center rounded-full border border-cobalt-600/25 bg-ice shadow-[0_4px_12px_rgba(13,92,184,0.1)]" aria-hidden="true">
                        <span className="size-1.5 rounded-full bg-electric" />
                      </span>
                      <span className="min-w-0 break-words">{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

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
