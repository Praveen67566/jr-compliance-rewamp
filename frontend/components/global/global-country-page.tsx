import { RouteClosingCta } from "@/components/editorial/route-closing-cta";
import { SitePageShell } from "@/components/site-page-shell";
import { linkTargetProps } from "@/lib/link-props";
import type { GlobalCountryPageContent, Link } from "@/lib/types";

type GlobalCountryPageProps = {
  content: GlobalCountryPageContent;
};

function PrimaryLink({ link }: { link: Link }) {
  return (
    <a
      className="inline-flex min-h-12 max-w-full items-center justify-center gap-4 rounded-full border border-sky/40 bg-[linear-gradient(115deg,var(--blue-electric),var(--blue-cobalt-700))] px-6 py-3 text-sm font-extrabold text-white shadow-[0_12px_34px_rgba(22,140,245,0.24)] transition-[box-shadow,transform] duration-200 hover:shadow-[0_16px_42px_rgba(22,140,245,0.38)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky motion-safe:hover:-translate-y-0.5"
      href={link.href}
      {...linkTargetProps(link)}
    >
      {link.label}
      <span aria-hidden="true">↗</span>
    </a>
  );
}

/** Shared CMS-driven template for every `/global/[slug]` landing page. */
export function GlobalCountryPage({ content }: GlobalCountryPageProps) {
  return (
    <SitePageShell
      footer={content.footer}
      navigation={content.navigation}
      seo={content.seo}
      site={content.site}
    >
      <section
        className="relative isolate overflow-hidden border-b border-sky/15 bg-navy-950 pb-16 pt-10 text-white min-[560px]:pb-20 min-[560px]:pt-12 min-[821px]:pb-28 min-[821px]:pt-14"
        id="top"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-16 -z-20 opacity-35 [background-image:linear-gradient(rgba(139,220,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(139,220,255,0.12)_1px,transparent_1px)] [background-size:54px_54px] motion-safe:animate-[service-ambient-drift_18s_ease-in-out_infinite_alternate]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_82%_20%,rgba(22,140,245,0.42),transparent_30%),radial-gradient(circle_at_9%_90%,rgba(13,92,184,0.32),transparent_32%),linear-gradient(118deg,rgba(3,15,43,0.08),rgba(6,40,95,0.28))]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-52 -top-56 -z-10 size-[560px] rounded-full border border-sky/16 shadow-[0_0_0_48px_rgba(22,140,245,0.035),0_0_0_104px_rgba(22,140,245,0.025)] motion-safe:animate-[service-orbit_22s_linear_infinite] min-[821px]:size-[760px]"
        >
          <span className="absolute left-[18%] top-[18%] size-3 rounded-full border-2 border-ice/80 bg-electric shadow-[0_0_24px_rgba(139,220,255,0.92)]" />
          <span className="absolute bottom-[14%] right-[28%] size-2 rounded-full bg-sky shadow-[0_0_18px_rgba(139,220,255,0.82)]" />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[-8%] top-[66%] -z-10 w-[72%] -rotate-[7deg] opacity-65"
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
              aria-current="page"
              className="min-w-0 rounded-sm break-words text-ice/75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky"
              href={`/global/${content.slug}`}
            >
              {content.menuLabel}
            </a>
          </nav>

          <div className="grid grid-cols-1 items-center gap-10 min-[980px]:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] min-[980px]:gap-16">
            <div className="min-w-0">
              <span className="mb-5 flex items-center gap-2 text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-sky">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
                {content.hero.eyebrow}
              </span>
              <h1 className="mb-0 max-w-[820px] break-words text-balance font-display text-[clamp(3.25rem,5vw,5.8rem)] leading-[0.98] tracking-[-0.045em] text-cloud">
                {content.hero.title}
              </h1>
              <p className="mb-0 mt-6 max-w-[650px] break-words text-base leading-[1.85] text-ice/80">
                {content.hero.description}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-5">
                <PrimaryLink link={content.hero.cta} />
                <a
                  className="inline-flex min-h-11 items-center gap-3 rounded-sm text-sm font-semibold text-sky underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky"
                  href="#certificates"
                >
                  {content.certificates.eyebrow}
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>

            <figure className="relative m-0 mx-auto w-full max-w-[580px] min-w-0 rounded-[24px] border border-sky/25 bg-navy-800/70 p-3 shadow-[0_28px_70px_rgba(0,8,34,0.32)] min-[560px]:p-4">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-5 -z-10 rounded-[40px] border border-sky/10"
              />
              <img
                alt={content.hero.image.alt}
                className="aspect-[1.75] h-auto w-full rounded-[14px] bg-navy-900 object-contain"
                fetchPriority="high"
                src={content.hero.image.src}
              />
              <figcaption className="flex items-center gap-3 px-1 pb-1 pt-5 text-sm font-semibold text-ice">
                <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-sky shadow-[0_0_16px_rgba(139,220,255,0.65)]" />
                {content.menuLabel}
                <span aria-hidden="true" className="h-px flex-1 bg-sky/20" />
                <span aria-hidden="true" className="text-sky">↗</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section
        className="relative isolate scroll-mt-[102px] overflow-hidden bg-[linear-gradient(180deg,var(--blue-cloud),var(--blue-ice))] py-14 text-navy-950 min-[560px]:py-18 min-[821px]:py-28"
        id="certificates"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-50 [background-image:linear-gradient(rgba(13,92,184,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(13,92,184,0.07)_1px,transparent_1px)] [background-size:50px_50px] [mask-image:radial-gradient(circle_at_center,black,transparent_80%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-12 -z-10 size-96 rounded-full bg-electric/10 blur-3xl motion-safe:animate-[service-ambient-drift_16s_ease-in-out_infinite_alternate]"
        />

        <div className="mx-auto w-full max-w-[1320px] px-[18px] min-[560px]:px-[22px] min-[821px]:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6 border-b border-cobalt-700/15 pb-8 min-[821px]:mb-10">
            <div className="max-w-[820px] min-w-0">
              <span className="mb-4 flex items-center gap-2 text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-cobalt-700">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
                {content.certificates.eyebrow}
              </span>
              <h2 className="mb-0 break-words text-balance font-display text-[clamp(2.5rem,4vw,4.35rem)] leading-[0.97] tracking-[-0.045em] text-navy-950">
                {content.certificates.title}
              </h2>
              {content.certificates.description ? (
                <p className="mb-0 mt-6 max-w-[720px] break-words text-base leading-8 text-navy-700/78 md:text-lg">
                  {content.certificates.description}
                </p>
              ) : null}
            </div>
            <span aria-hidden="true" className="font-display text-5xl leading-none tracking-[-0.04em] text-cobalt-700/35">
              {String(content.certificates.items.length).padStart(2, "0")}
            </span>
          </div>

          <ul className={`m-0 grid list-none grid-cols-1 gap-5 p-0 min-[820px]:grid-cols-2 ${content.certificates.items.length > 4 ? "min-[1100px]:grid-cols-3" : ""}`}>
            {content.certificates.items.map((certificate, index) => (
              <li className="min-w-0" key={`${certificate.title}-${index}`}>
                <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[20px] border border-sky/22 bg-[linear-gradient(135deg,var(--blue-navy-800),var(--blue-navy-950))] p-6 text-white shadow-[0_12px_32px_rgba(3,19,47,0.12)] transition-[transform,border-color,box-shadow] duration-200 hover:border-sky/55 hover:shadow-[0_22px_48px_rgba(13,92,184,0.2)] focus-within:border-sky/70 focus-within:shadow-[0_22px_48px_rgba(13,92,184,0.2)] motion-safe:hover:-translate-y-2 min-[560px]:p-8">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 size-44 rounded-full border border-sky/12 bg-cobalt-700/10 transition-transform duration-500 motion-safe:group-hover:scale-110"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(139,220,255,0.82),transparent)] opacity-75"
                  />

                  <div className="relative mb-6 flex items-center justify-between gap-5">
                    <div className="flex h-20 w-36 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-sky/18 bg-cloud p-2">
                      <img
                        alt={certificate.logo.alt}
                        className="h-full w-full object-contain"
                        loading="lazy"
                        src={certificate.logo.src}
                      />
                    </div>
                    <span className="font-display text-4xl leading-none tracking-[-0.04em] text-sky/40" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="relative mb-0 max-w-[460px] break-words text-balance font-display text-[clamp(1.65rem,2.4vw,2.2rem)] leading-[1.1] tracking-[-0.025em] text-cloud">
                    {certificate.title}
                  </h3>
                  <p className="relative mb-0 mt-4 flex-1 break-words text-[0.94rem] leading-7 text-ice/80">
                    {certificate.description}
                  </p>
                  <a
                    className="relative mt-7 inline-flex min-h-12 w-full items-center justify-between gap-4 border-t border-sky/20 pt-4 text-sm font-bold text-sky transition-colors duration-200 hover:text-cloud focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky"
                    href={certificate.link.href}
                    {...linkTargetProps(certificate.link)}
                  >
                    {certificate.link.label}
                    <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-full border border-sky/30 bg-electric/10 transition-colors duration-200 group-hover:bg-electric/30 group-focus-within:bg-electric/30">↗</span>
                  </a>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <RouteClosingCta {...content.closingCta} />
    </SitePageShell>
  );
}
