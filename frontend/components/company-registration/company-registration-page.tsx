import { RouteClosingCta } from "@/components/editorial/route-closing-cta";
import { SitePageShell } from "@/components/site-page-shell";
import { linkTargetProps } from "@/lib/link-props";
import type {
  CompanyRegistrationPageContent,
  RegistrationDetail,
} from "@/lib/types";

type CompanyRegistrationPageProps = {
  content: CompanyRegistrationPageContent;
};

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  tone?: "dark" | "light";
};

function SectionHeading({ eyebrow, title, tone = "dark" }: SectionHeadingProps) {
  const light = tone === "light";

  return (
    <div className="mb-10 min-w-0 max-w-[760px] md:mb-14">
      <span
        className={`mb-4 flex items-center gap-2 text-[0.7rem] font-extrabold uppercase tracking-[0.14em] ${
          light ? "text-sky" : "text-cobalt-600"
        }`}
      >
        <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2
        className={`break-words font-display text-[clamp(2.5rem,4vw,4.35rem)] leading-[0.97] tracking-[-0.045em] ${
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

export function CompanyRegistrationPage({ content }: CompanyRegistrationPageProps) {
  return (
    <SitePageShell footer={content.footer} navigation={content.navigation} site={content.site}>
      <section
        className="relative isolate overflow-hidden border-b border-sky/15 bg-navy-950 pb-20 pt-[142px] text-white md:pb-28 md:pt-[172px]"
        id="top"
      >
        <div
          className="absolute inset-0 -z-20 opacity-35 [background-image:linear-gradient(rgba(139,220,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(139,220,255,0.12)_1px,transparent_1px)] [background-size:54px_54px]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_28%,rgba(22,140,245,0.42),transparent_28%),radial-gradient(circle_at_8%_94%,rgba(13,92,184,0.28),transparent_30%)]"
          aria-hidden="true"
        />

        <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 items-center gap-14 px-[18px] min-[560px]:px-[22px] min-[821px]:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] min-[821px]:px-8">
          <div className="min-w-0">
            <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-2 text-xs font-bold text-sky">
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
                Company Registration
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
            <h1 className="max-w-[880px] break-words font-display text-[clamp(3.25rem,5vw,5.8rem)] leading-[0.92] tracking-[-0.055em] text-white">
              {content.hero.title}
            </h1>
            <p className="mt-7 max-w-[760px] break-words text-base leading-8 text-ice/78 md:text-lg">
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
        </div>
      </section>

      <section className="scroll-mt-28 bg-ice py-14 text-navy-950 min-[560px]:py-18 min-[821px]:py-28" id="overview">
        <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-12 px-[18px] min-[560px]:px-[22px] min-[821px]:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] min-[821px]:px-8">
          <SectionHeading eyebrow={content.overview.eyebrow} title={content.overview.title} />
          <div className="min-w-0 rounded-[26px] border border-cobalt-700/15 bg-cloud p-7 shadow-[0_20px_55px_rgba(3,19,47,0.08)] md:p-10">
            {content.overview.paragraphs.map((paragraph) => (
              <p className="mb-5 break-words text-base leading-8 text-navy-700/78 last:mb-0 md:text-lg" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-14 min-[560px]:py-18 min-[821px]:py-28">
        <div className="mx-auto w-full max-w-[1320px] px-[18px] min-[560px]:px-[22px] min-[821px]:px-8">
          <SectionHeading eyebrow={content.challenges.eyebrow} title={content.challenges.title} tone="light" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {content.challenges.items.map((item, index) => (
              <DetailCard item={item} index={index} key={item.title} light />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ice py-14 min-[560px]:py-18 min-[821px]:py-28">
        <div className="mx-auto w-full max-w-[1320px] px-[18px] min-[560px]:px-[22px] min-[821px]:px-8">
          <SectionHeading eyebrow={content.advantages.eyebrow} title={content.advantages.title} />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {content.advantages.items.map((item, index) => (
              <DetailCard item={item} index={index} key={item.title} />
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

      <section className="scroll-mt-28 bg-cloud py-14 text-navy-950 min-[560px]:py-18 min-[821px]:py-28" id="breakdown">
        <div className="mx-auto w-full max-w-[1320px] px-[18px] min-[560px]:px-[22px] min-[821px]:px-8">
          <SectionHeading eyebrow={content.breakdown.eyebrow} title={content.breakdown.title} />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {content.breakdown.groups.map((group, groupIndex) => (
              <article className="min-w-0 rounded-[24px] border border-cobalt-700/15 bg-ice p-7 md:p-9" key={group.title}>
                <span className="text-[0.68rem] font-extrabold tracking-[0.14em] text-cobalt-600">
                  {String(groupIndex + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 break-words font-display text-[2rem] leading-none tracking-[-0.03em]">{group.title}</h3>
                <ul className="mt-7 space-y-4">
                  {group.items.map((item) => (
                    <li className="grid grid-cols-[8px_minmax(0,1fr)] gap-3 text-sm leading-6 text-navy-700/80" key={item}>
                      <span className="mt-2 size-1.5 rounded-full bg-electric" aria-hidden="true" />
                      <span className="break-words">{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

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
