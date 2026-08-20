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
      className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-sky bg-electric px-6 text-sm font-extrabold text-white shadow-[0_12px_34px_rgba(22,140,245,0.3)] transition-[background-color,box-shadow,transform] duration-200 hover:bg-cobalt-700 hover:shadow-[0_16px_42px_rgba(22,140,245,0.38)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky motion-safe:hover:-translate-y-0.5"
      href={link.href}
      {...linkTargetProps(link)}
    >
      {link.label}
      <span aria-hidden="true">↗</span>
    </a>
  );
}

/** Shared CMS-driven template for every `/globals/[country]` landing page. */
export function GlobalCountryPage({ content }: GlobalCountryPageProps) {
  return (
    <SitePageShell footer={content.footer} navigation={content.navigation} site={content.site}>
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

        <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 items-center gap-10 px-[18px] min-[560px]:px-[22px] min-[821px]:px-8 min-[980px]:grid-cols-[minmax(0,1.03fr)_minmax(380px,0.97fr)] min-[980px]:gap-14">
          <div className="min-w-0">
            <nav
              aria-label="Breadcrumb"
              className="mb-7 inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-sky/18 bg-navy-900/70 px-4 py-2.5 text-xs font-bold text-sky shadow-[inset_0_1px_rgba(255,255,255,0.06)] backdrop-blur-sm"
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
                href={`/globals/${content.slug}`}
              >
                {content.menuLabel}
              </a>
            </nav>

            <span className="mb-5 flex items-center gap-2 text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-sky">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
              {content.hero.eyebrow}
            </span>
            <h1 className="mb-0 max-w-[820px] break-words font-display text-[clamp(3.25rem,5vw,5.8rem)] leading-[0.92] tracking-[-0.055em] text-white">
              {content.hero.title}
            </h1>
            <p className="mb-0 mt-7 max-w-[720px] break-words text-base leading-8 text-ice/78 md:text-lg">
              {content.hero.description}
            </p>
            <div className="mt-9">
              <PrimaryLink link={content.hero.cta} />
            </div>
          </div>

          <figure className="relative mx-auto w-full max-w-[600px] min-w-0 overflow-hidden rounded-[30px] border border-sky/35 bg-navy-800/80 p-2 shadow-[0_32px_85px_rgba(0,8,34,0.46)] min-[560px]:p-3">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,transparent_56%,rgba(3,15,43,0.72)),radial-gradient(circle_at_76%_18%,rgba(139,220,255,0.2),transparent_28%)]"
            />
            <img
              alt={content.hero.image.alt}
              className="aspect-[1.12] h-auto w-full rounded-[22px] object-cover"
              fetchPriority="high"
              src={content.hero.image.src}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[9%] bottom-[10%] z-20 flex items-center gap-3"
            >
              <span className="size-2.5 shrink-0 rounded-full border-2 border-sky bg-electric shadow-[0_0_20px_rgba(139,220,255,0.9)]" />
              <span className="h-px flex-1 bg-[linear-gradient(90deg,var(--blue-sky),rgba(139,220,255,0.12))]" />
              <span className="size-1.5 shrink-0 rounded-full bg-sky" />
            </div>
          </figure>
        </div>
      </section>

      <section
        className="relative isolate scroll-mt-28 overflow-hidden bg-[linear-gradient(180deg,var(--blue-cloud),var(--blue-ice))] py-14 text-navy-950 min-[560px]:py-18 min-[821px]:py-28"
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
          <div className="mb-10 max-w-[780px] min-w-0 md:mb-14">
            <span className="mb-4 flex items-center gap-2 text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-cobalt-600">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
              {content.certificates.eyebrow}
            </span>
            <h2 className="mb-0 break-words font-display text-[clamp(2.5rem,4vw,4.35rem)] leading-[0.97] tracking-[-0.045em] text-navy-950">
              {content.certificates.title}
            </h2>
            {content.certificates.description ? (
              <p className="mb-0 mt-6 max-w-[720px] break-words text-base leading-8 text-navy-700/78 md:text-lg">
                {content.certificates.description}
              </p>
            ) : null}
          </div>

          <ul className="m-0 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-2 xl:grid-cols-3">
            {content.certificates.items.map((certificate, index) => (
              <li className="min-w-0" key={`${certificate.title}-${index}`}>
                <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[26px] border border-sky/22 bg-[linear-gradient(145deg,var(--blue-navy-800),var(--blue-navy-950))] p-6 text-white shadow-[0_22px_58px_rgba(3,19,47,0.2)] transition-[transform,border-color,box-shadow] duration-300 hover:border-sky/55 hover:shadow-[0_30px_72px_rgba(13,92,184,0.28)] motion-safe:hover:-translate-y-2 min-[560px]:p-8">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 size-44 rounded-full border border-sky/12 bg-cobalt-700/10 transition-transform duration-500 motion-safe:group-hover:scale-110"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(139,220,255,0.82),transparent)] opacity-75"
                  />

                  <div className="relative flex min-h-28 items-center justify-center overflow-hidden rounded-[20px] border border-sky/18 bg-cloud p-5 shadow-[inset_0_1px_rgba(255,255,255,0.7)]">
                    <img
                      alt={certificate.logo.alt}
                      className="h-16 w-full max-w-[210px] object-contain"
                      loading="lazy"
                      src={certificate.logo.src}
                    />
                  </div>
                  <span className="relative mt-7 text-[0.68rem] font-extrabold tracking-[0.14em] text-sky" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="relative mb-0 mt-3 break-words font-display text-[1.95rem] leading-[1.02] tracking-[-0.03em] text-white">
                    {certificate.title}
                  </h3>
                  <p className="relative mb-0 mt-4 flex-1 break-words text-[0.94rem] leading-7 text-ice/72">
                    {certificate.description}
                  </p>
                  <a
                    className="relative mt-7 inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-sky/35 px-5 text-sm font-extrabold text-sky transition-[background-color,border-color,color] duration-200 hover:border-sky hover:bg-electric hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky"
                    href={certificate.link.href}
                    {...linkTargetProps(certificate.link)}
                  >
                    {certificate.link.label}
                    <span aria-hidden="true">↗</span>
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
