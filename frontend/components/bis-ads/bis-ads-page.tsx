import type { ReactNode } from "react";

import { ConsultationForm } from "@/components/forms/consultation-form";
import { ServiceFaqList } from "@/components/company-registration/service-faq-list";
import { SitePageShell } from "@/components/site-page-shell";
import { BisAdsInteractions } from "@/components/bis-ads/bis-ads-interactions";
import { BisAdsHeader, ContactIcon } from "@/components/bis-ads/bis-ads-header";
import type { BisAdsCard, BisAdsCardSection, BisAdsPageContent } from "@/lib/types";

type Content = BisAdsPageContent;
const container = "mx-auto w-full max-w-[1320px] px-[18px] min-[560px]:px-[22px] min-[1100px]:px-8";
const rhythm = "py-14 min-[821px]:py-[72px] min-[1100px]:py-20";
const primary = "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-sky/40 bg-linear-to-r from-cobalt-700 to-electric px-6 py-3 text-center text-base font-semibold text-white! shadow-[0_8px_20px_rgba(13,92,184,0.18)] transition-colors hover:border-sky focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric";
const secondary = "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-current/30 px-6 py-3 text-center text-base font-semibold transition-colors hover:bg-cobalt-700/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric";
const bluefield = "relative isolate overflow-hidden bg-[radial-gradient(ellipse_at_top_right,rgba(22,140,245,0.28),transparent_58%),linear-gradient(115deg,var(--blue-navy-950),var(--blue-navy-700)_62%,var(--blue-cobalt-700))] text-cloud";

function Icon({ kind = 0 }: { kind?: number }) {
  const paths = [
    <path key="shield" d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Zm-4 9 3 3 5-6" />,
    <path key="lab" d="M9 3h6M10 3v7L4 20h16l-6-10V3M7 15h10M10 18h4" />,
    <path key="file" d="M14 3H5v18h14V8l-5-5Zm0 0v5h5M8 12h8M8 16h5" />,
    <path key="factory" d="M3 21V10l6 3V8l6 4V3h4v18H3Zm4-4h1m3 0h1m3 0h1" />,
    <path key="chat" d="M21 11a8 8 0 0 1-8 8H7l-4 3V11a9 9 0 0 1 18 0ZM8 9h8M8 13h5" />,
    <path key="renewal" d="M20 7v5h-5M4 17v-5h5M20 12a8 8 0 0 0-14-5M4 12a8 8 0 0 0 14 5" />,
  ];
  return <svg aria-hidden="true" className="size-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{paths[kind % paths.length]}</svg>;
}

function PenaltyIcon({ kind }: { kind: number }) {
  const symbols = [
    <path key="prison" d="M4 21V3h16v18M8 3v18m8-18v18M4 8h16M4 16h16M2 21h20" />,
    <path key="import" d="M3 10v11h18V10M3 10l4-6h3m4 0h3l4 6M3 10h6m6 0h6M12 2v12m-3-3 3 3 3-3" />,
    <g key="fine"><circle cx="9" cy="9" r="6" /><path d="M9 5v8M6.5 7H12m-5.5 3H11m5-2a6 6 0 1 1-8 8m8-4v7m-2-5h4" /></g>,
    <path key="marketplace" d="M3 10V5h18v5M5 10v11h14V10M3 10a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0M9 21v-5h6v5M3 3l18 18" />,
    <path key="seizure" d="m3 7 9-5 9 5v11l-9 4-9-4V7Zm0 0 9 5 9-5M12 12v10M8 5l9 5M6 16l12-5" />,
    <path key="court" d="m14 3 7 7-3 3-7-7 3-3ZM9 8l7 7-3 3-7-7 3-3Zm2 6-8 8M12 22h10M17 18l3 3" />,
  ];
  return <svg aria-hidden="true" className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{symbols[kind % symbols.length]}</svg>;
}

function GridArtwork() {
  return <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(var(--blue-sky)_1px,transparent_1px),linear-gradient(90deg,var(--blue-sky)_1px,transparent_1px)] bg-size-[64px_64px] opacity-[0.045]" />;
}

function Heading({ id, title, eyebrow, description, dark = false, danger = false }: { id: string; title: string; eyebrow?: string; description?: string; dark?: boolean; danger?: boolean }) {
  return <div className="mx-auto mb-9 max-w-[860px] text-center min-[821px]:mb-12">
    {eyebrow ? <p className={`mx-auto mb-3 w-fit rounded-full px-4 py-1 text-xs font-bold uppercase tracking-[0.08em] ${danger ? "bg-red-100 text-red-800" : dark ? "bg-sky/15 text-sky" : "bg-ice text-cobalt-700"}`}>{eyebrow}</p> : null}
    <h2 id={`${id}-heading`} className={`mb-0 text-balance font-sans text-[clamp(1.65rem,2.7vw,2.25rem)] font-extrabold! leading-[1.2] tracking-[-0.035em] ${danger ? "text-red-950" : dark ? "text-cloud" : "text-navy-950"}`}>{title}</h2>
    {description ? <p className={`mx-auto mb-0 mt-5 max-w-[760px] text-pretty text-base leading-7 ${dark ? "text-ice" : "text-navy-700"}`}>{description}</p> : null}
  </div>;
}

function Actions({ content, location, consultationLabel = content.consultationLabel, whatsAppLabel = content.whatsAppLabel, dark = false, includeCall = false }: { content: Content; location: string; consultationLabel?: string; whatsAppLabel?: string; dark?: boolean; includeCall?: boolean }) {
  return <div className={`flex flex-wrap justify-center gap-3 max-[559px]:flex-col max-[559px]:items-stretch ${dark ? "text-sky" : "text-cobalt-700"}`}>
    <a className={primary} href="#expert-consultation" data-bis-cta="consultation" data-bis-location={location}><ContactIcon kind="consultation" />{consultationLabel}</a>
    {includeCall ? <a className={secondary} href={content.site.phoneHref} data-bis-cta="call" data-bis-location={location}><ContactIcon kind="call" />{content.closing.callLabel}: {content.site.phone}</a> : null}
    <a className={secondary} href={content.whatsAppHref} target="_blank" rel="noreferrer" data-bis-cta="whatsapp" data-bis-location={location}><ContactIcon kind="whatsapp" />{whatsAppLabel}<span className="sr-only"> (opens in a new tab)</span></a>
  </div>;
}

function Card({ card, index, dark = false, centered = false, danger = false, aligned = false }: { card: BisAdsCard; index: number; dark?: boolean; centered?: boolean; danger?: boolean; aligned?: boolean }) {
  return <article className={`relative h-full min-w-0 rounded-xl border p-6 ${aligned ? "row-span-4 grid grid-rows-subgrid gap-y-4 text-left" : ""} ${danger ? "border-red-200 bg-white text-navy-700 shadow-[0_8px_28px_rgba(185,28,28,0.06)]" : dark ? "border-sky/25 bg-navy-900/65 text-ice" : "border-cobalt-700/15 bg-white text-navy-700 shadow-[0_8px_28px_rgba(3,19,47,0.04)]"} ${centered ? danger ? "border-b-2 border-b-red-500" : "border-b-2 border-b-electric" : ""}`}>
    <span className={`${aligned ? "self-start" : "mb-4"} grid size-11 place-items-center rounded-xl ${centered ? "mx-auto" : ""} ${danger ? "bg-red-50 text-red-700 ring-1 ring-red-100" : dark ? "bg-cobalt-700/30 text-sky" : "bg-ice text-cobalt-700"}`}>{danger ? <PenaltyIcon kind={index} /> : <Icon kind={index} />}</span>
    <h3 className={`${aligned ? "mb-0" : "mb-3"} text-lg font-bold! leading-snug tracking-[-0.02em] ${centered ? "text-center" : ""} ${danger ? "text-red-900" : dark ? "text-cloud" : "text-navy-950"}`}>{card.title}</h3>
    {card.description ? <p className={`mb-0 text-base leading-7 ${centered ? "text-center" : ""}`}>{card.description}</p> : null}
    {card.items ? <ul className={`mb-0 ${aligned ? "mt-0 self-start" : "mt-3"} list-none space-y-2 p-0`}>{card.items.map((item) => <li className="flex items-start gap-2.5 text-base leading-7" key={item}><span aria-hidden="true" className={`mt-[0.65rem] size-1.5 shrink-0 rounded-full ${dark ? "bg-sky" : "bg-cobalt-700"}`} /><span>{item}</span></li>)}</ul> : null}
  </article>;
}

function ProcessCard({ card, index }: { card: BisAdsCard; index: number }) {
  const description = card.description ?? "";
  const timedDescription = description.match(/^(.*) (\([^()]+\))$/);
  return <li className="relative isolate overflow-hidden rounded-2xl border border-cobalt-700/20 bg-white p-6 shadow-[0_14px_36px_rgba(3,19,47,0.065)] min-[1100px]:p-7">
    <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-navy-700 via-electric to-sky" />
    <div className="mb-5 flex items-center justify-between gap-4">
      <span className="grid size-12 place-items-center rounded-2xl border border-sky/30 bg-linear-to-br from-navy-700 to-cobalt-700 text-cloud shadow-[0_8px_18px_rgba(13,92,184,0.18)]"><Icon kind={index === 5 ? 0 : index} /></span>
      <span className="inline-flex rounded-full border border-cobalt-700/20 bg-ice px-4 py-2 text-sm font-bold text-cobalt-700">Step {index + 1}</span>
    </div>
    <h3 className="mb-3 text-lg font-bold! leading-snug text-navy-950">{card.title}</h3>
    <p className="mb-0 text-base leading-7 text-navy-700">{timedDescription ? <>{timedDescription[1]}{" "}<span className="mt-2 inline-block rounded-lg border border-cobalt-700/15 bg-ice px-2.5 py-0.5 text-sm font-semibold text-cobalt-700">{timedDescription[2]}</span></> : description}</p>
  </li>;
}

function CardSection({ id, section, dark = false, tinted = false, centered = false, aligned = false, children }: { id: string; section: BisAdsCardSection; dark?: boolean; tinted?: boolean; centered?: boolean; aligned?: boolean; children?: ReactNode }) {
  const gridColumns = id === "certifications" && section.cards.length === 5
    ? "min-[560px]:grid-cols-4 min-[560px]:[&>article]:col-span-2 min-[560px]:[&>article:last-child]:col-start-2 min-[1100px]:grid-cols-6 min-[1100px]:[&>article:nth-child(4)]:col-start-2 min-[1100px]:[&>article:last-child]:col-start-4"
    : "min-[560px]:grid-cols-2 min-[1100px]:grid-cols-3";
  return <section id={id} aria-labelledby={`${id}-heading`} className={`${rhythm} ${dark ? bluefield : tinted ? "bg-ice text-navy-950" : "bg-cloud text-navy-950"}`}>
    {dark ? <GridArtwork /> : null}
    <div className={container}>
      <Heading id={id} title={section.title} eyebrow={section.eyebrow} description={section.description} dark={dark} />
      <div className={`grid gap-4 min-[1100px]:gap-5 ${gridColumns}`}>{section.cards.map((card, index) => <Card card={card} key={card.title} index={index} dark={dark} centered={centered} aligned={aligned} />)}</div>
      {children ? <div className="mt-9 min-[821px]:mt-12">{children}</div> : null}
    </div>
  </section>;
}

export function BisAdsPage({ content }: { content: Content }) {
  const [heroTitle, heroDetail] = content.hero.title.split(" - ");
  return <BisAdsInteractions><SitePageShell site={content.site} navigation={content.navigation} footer={content.footer} seo={content.seo} header={<BisAdsHeader content={content} />} stickyBar={content.stickyBar}>
      <section aria-labelledby="bis-hero-heading" className={`${bluefield} py-8 min-[980px]:py-10`}>
        <GridArtwork />
        <div className={`${container} grid items-center gap-x-7 gap-y-7 min-[980px]:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] min-[980px]:grid-rows-[1fr_1.3fr]`}>
          <div className="min-[980px]:col-start-1 min-[980px]:row-start-1 min-[980px]:self-end">
            <p className="mb-5 hidden w-fit rounded-full border border-sky/30 bg-sky/10 px-5 py-2 text-sm font-semibold leading-6 text-ice min-[980px]:block">{content.hero.eyebrow}</p>
            <h1 id="bis-hero-heading" className="mb-0 text-center font-sans text-[clamp(1.65rem,3.2vw,2.9rem)] font-extrabold! leading-[1.15] tracking-[-0.035em] text-cloud min-[980px]:text-left">{heroTitle} <span className="text-sky">- {heroDetail}</span></h1>
          </div>
          <div className="order-3 min-[980px]:col-start-1 min-[980px]:row-start-2 min-[980px]:self-start">
            <p className="mb-4 text-center text-sm text-ice min-[980px]:hidden">{content.hero.eyebrow}</p>
            <ul className="m-0 flex list-none flex-wrap gap-x-3 gap-y-2 p-0 text-base leading-7 text-ice" aria-label="BIS services">{content.hero.services.map((service, index) => <li key={service}>{index > 0 ? <span aria-hidden="true" className="mr-3 text-sky">·</span> : null}{service}</li>)}</ul>
            <ul className="mb-5 mt-5 flex list-none flex-wrap gap-2 p-0" aria-label="Businesses we assist">{content.hero.audiences.map((audience) => <li key={audience} className="rounded-lg border border-sky/20 bg-sky/10 px-3 py-2.5 text-sm leading-5 text-ice">{audience}</li>)}</ul>
            <ul className="mb-6 mt-0 grid list-none grid-cols-2 gap-5 border-t border-sky/20 px-0 pt-5 min-[560px]:grid-cols-4" aria-label="JR Compliance expertise">{content.hero.proof.map((proof) => {
              const [value, ...label] = proof.split(" ");
              return <li key={proof} className="text-center"><strong className="block text-[clamp(1.35rem,2vw,1.8rem)] font-extrabold leading-tight text-sky">{value}</strong>{" "}<span className="mt-2 block text-sm leading-5 text-ice">{label.join(" ")}</span></li>;
            })}</ul>
            <div className="[&>div]:justify-start"><Actions content={content} location="hero" dark /></div>
          </div>
          <div className="order-2 w-full max-w-[560px] justify-self-center min-[980px]:col-start-2 min-[980px]:row-span-2 min-[980px]:row-start-1">
            <ConsultationForm pageTitle={content.hero.title} settings={content.site.leadForm} />
          </div>
        </div>
      </section>

      <div className="border-b border-cobalt-700/15 bg-white py-5" role="region" aria-label={content.trustedLabel}>
        <div className={`${container} flex flex-wrap items-center justify-center gap-x-8 gap-y-5 min-[1100px]:justify-between`}>
          <p className="mb-0 max-w-[230px] text-center text-xs font-semibold uppercase leading-5 tracking-[0.07em] text-navy-700">{content.trustedLabel}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">{content.trustedBrands.map((brand) => <span key={brand.name} className="rounded-lg border border-sky/25 bg-navy-800 px-4 py-3"><img src={brand.src} alt={brand.name} width={94} height={38} loading="lazy" className="h-[38px] w-[94px] object-contain" /></span>)}</div>
        </div>
      </div>

      <CardSection id="assistance" section={content.assistance}><Actions content={content} location="assistance" /></CardSection>
      <CardSection id="certifications" section={content.certifications} aligned tinted />

      <section id="penalties" aria-labelledby="penalties-heading" className={`${rhythm} bg-linear-to-b from-red-50 to-cloud text-navy-950`}>
        <div className={container}>
          <Heading id="penalties" title={content.penalties.title} eyebrow={content.penalties.eyebrow} danger />
          <div className="mb-8 flex flex-wrap items-center justify-between gap-5 rounded-xl border border-red-200 border-l-4 border-l-red-600 bg-white p-5 shadow-[0_8px_28px_rgba(185,28,28,0.04)]">
            <div className="flex max-w-[850px] items-start gap-4">
              <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-full bg-red-50 text-red-700"><svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3 10 18H2L12 3Zm0 6v5m0 3h.01" /></svg></span>
              <p className="mb-0 text-base leading-7 text-red-950">{content.penalties.description}</p>
            </div>
            <a href="#expert-consultation" className="inline-flex min-h-11 items-center rounded-lg bg-red-700 px-4 py-2 font-semibold text-white! hover:bg-red-800" data-bis-cta="consultation" data-bis-location="penalties-notice">{content.penalties.ctaLabel}</a>
          </div>
          <div className="grid gap-4 min-[560px]:grid-cols-2 min-[1100px]:grid-cols-3">{content.penalties.cards.map((card, index) => <Card key={card.title} card={card} index={index} centered danger />)}</div>
          <div className="mt-8"><Actions content={content} location="penalties" consultationLabel={content.penalties.consultationLabel} whatsAppLabel={content.penalties.whatsAppLabel} /></div>
        </div>
      </section>

      <CardSection id="why-jr" section={content.whyUs} dark />

      <section id="process" aria-labelledby="process-heading" className={`${rhythm} relative isolate overflow-hidden bg-linear-to-b from-ice to-cloud text-navy-950`}>
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(ellipse_at_top,rgba(22,140,245,0.1),transparent_70%)]" />
        <div className={container}>
          <Heading id="process" title={content.process.title} eyebrow={content.process.eyebrow} />
          <div aria-hidden="true" className="relative mb-10 hidden grid-cols-6 gap-3 min-[1100px]:grid">
            <span className="absolute left-[8.33%] right-[8.33%] top-7 h-1 rounded-full bg-linear-to-r from-cobalt-700 via-electric to-sky" />
            {content.process.cards.map((card, index) => <div key={card.title} className="relative text-center"><span className="mx-auto mb-4 grid size-14 place-items-center rounded-2xl border border-sky/40 bg-linear-to-br from-navy-700 to-cobalt-700 text-lg font-bold text-white shadow-[0_8px_22px_rgba(13,92,184,0.2)] ring-8 ring-ice">{index + 1}</span><span className="text-sm font-semibold text-navy-700">{card.title}</span></div>)}
          </div>
          <ol className="m-0 grid list-none gap-5 p-0 min-[560px]:grid-cols-2 min-[1100px]:grid-cols-3">{content.process.cards.map((card, index) => <ProcessCard card={card} index={index} key={card.title} />)}</ol>
          <div className="mt-10"><Actions content={content} location="process" consultationLabel={content.process.consultationLabel} whatsAppLabel={content.process.expertLabel} /></div>
        </div>
      </section>

      <CardSection id="documents" section={content.documents} tinted />

      <section id="eligibility" aria-labelledby="eligibility-heading" className={`${rhythm} bg-cloud text-navy-950`}>
        <div className={container}>
          <Heading id="eligibility" title={content.audience.title} eyebrow="Who needs this" description={content.audience.description} />
          <ul className="m-0 grid list-none gap-3 p-0 min-[821px]:grid-cols-2">{content.audience.items.map((item) => <li key={item} className="flex items-center gap-3 rounded-xl border border-cobalt-700/15 bg-white px-5 py-4 text-base font-medium leading-7 text-navy-700"><span aria-hidden="true" className="grid size-7 shrink-0 place-items-center rounded-full bg-ice text-cobalt-700">✓</span>{item}</li>)}</ul>
          <div className="mt-8"><Actions content={content} location="eligibility" /></div>
        </div>
      </section>

      <section id="faqs" aria-labelledby="faqs-heading" className={`${rhythm} bg-ice text-navy-950`}>
        <div className={container}>
          <Heading id="faqs" title="Frequently Asked Questions" eyebrow={content.faqs.title} />
          <ServiceFaqList items={content.faqs.items} />
        </div>
      </section>

      <section aria-labelledby="bis-closing-heading" className={`${bluefield} ${rhythm}`}>
        <GridArtwork />
        <div className={`${container} text-center`}>
          <h2 id="bis-closing-heading" className="mx-auto mb-4 max-w-[900px] text-balance font-sans text-[clamp(1.8rem,3vw,2.4rem)] font-extrabold! leading-tight tracking-[-0.035em] text-cloud">{content.closing.title}</h2>
          <p className="mb-8 text-xl text-ice">{content.closing.description}</p>
          <Actions content={content} location="closing" dark includeCall />
        </div>
      </section>
  </SitePageShell></BisAdsInteractions>;
}
