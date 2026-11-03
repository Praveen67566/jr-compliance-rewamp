"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import { BisAdForm, useBisAdForm } from "@/components/bis-ad/bis-ad-form";
import type { BisCertificationAdPageData, LeadFormTrustItem, Metric } from "@/lib/types";
import styles from "./bis-certification-ad.module.css";

const shell = "mx-auto w-full max-w-[1320px] px-[18px] min-[560px]:px-[22px] min-[1100px]:px-8";
const primary = "inline-flex min-h-14 cursor-pointer items-center justify-center gap-2 rounded-xl border border-sky/50 bg-linear-to-r from-electric to-cobalt-700 px-5 py-3 text-sm font-bold text-white transition-[translate,filter] hover:brightness-110 motion-safe:hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky";
const secondary = "inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border border-sky/35 bg-sky/10 px-5 py-3 text-sm font-bold text-cloud hover:bg-sky/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky";
const darkCard = "rounded-[20px] border border-sky/20 bg-linear-to-br from-navy-700/70 to-navy-950 p-5 min-[560px]:p-6";

function WhatsAppIcon() {
  return <svg className="size-6 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.44.79 3.06 1.2 4.72 1.2h.01c5.46 0 9.91-4.45 9.91-9.91.01-5.46-4.44-9.91-9.9-9.91zm0 18.14h-.01c-1.46 0-2.89-.39-4.14-1.13l-.3-.18-3.11.82.83-3.03-.19-.31a8.19 8.19 0 0 1-1.26-4.4c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.22-8.3 8.22zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.15.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.23.89 2.41 1.02 2.58.12.17 1.76 2.69 4.27 3.77.6.26 1.06.41 1.43.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29z" /></svg>;
}

function Metrics({ items }: { items: Metric[] }) {
  return <dl className="m-0 grid grid-cols-2 gap-3 min-[820px]:grid-cols-4 min-[820px]:gap-5">
    {items.map((item) => <div className={`${darkCard} text-center`} key={item.label}>
      <dt className="text-xs leading-relaxed text-ice/80 min-[560px]:text-sm">{item.label}</dt>
      <dd className="m-0 mt-2 font-display text-[clamp(1.8rem,3vw,3rem)] leading-none text-sky">{item.value}</dd>
    </div>)}
  </dl>;
}

function MediaMark({ item }: { item: LeadFormTrustItem }) {
  const [failed, setFailed] = useState(false);
  const image = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // A cached image failure can happen before React attaches onError.
    if (image.current?.complete && image.current.naturalWidth === 0) {
      setFailed(true);
    }
  }, [item.logo]);

  return item.logo && !failed ? (
    <img
      className={`max-h-6 w-full object-contain ${item.name === "Communications Today" ? "" : "brightness-[0.65] contrast-[10] grayscale invert"}`}
      src={item.logo}
      alt=""
      ref={image}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  ) : <span className="text-center text-xs font-bold text-cloud">{item.name}</span>;
}

/** Standalone campaign: preserve the original conversion flow without CMS reads. */
export function BisCertificationAdPage({ content }: { content: BisCertificationAdPageData }) {
  const form = useBisAdForm(content.title, content.form);
  const inlineForm = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const stickyBar = useRef<HTMLDivElement>(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [stickyHeight, setStickyHeight] = useState(0);
  const [introOpen, setIntroOpen] = useState(false);
  const [typing, setTyping] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const popupTimer = window.setTimeout(() => setPopupOpen(true), 5000);
    const openTimer = window.setTimeout(() => setIntroOpen(true), 1800);
    const typingTimer = window.setTimeout(() => setTyping(false), 2900);
    const closeTimer = window.setTimeout(() => setIntroOpen(false), 3800);
    return () => [popupTimer, openTimer, typingTimer, closeTimer].forEach(window.clearTimeout);
  }, []);

  useEffect(() => {
    const modal = dialog.current;
    if (!modal) return;
    if (!popupOpen) {
      if (modal.open) modal.close();
      return;
    }
    modal.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      if (modal.open) modal.close();
    };
  }, [popupOpen]);

  useEffect(() => {
    const update = () => {
      const formRect = inlineForm.current?.getBoundingClientRect();
      const formVisible = formRect && formRect.top < window.innerHeight && formRect.bottom > 0;
      const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      setStickyVisible(window.scrollY >= 300 && !formVisible && !nearBottom);
      setStickyHeight(stickyBar.current?.offsetHeight ?? 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const observer = new ResizeObserver(update);
    if (stickyBar.current) observer.observe(stickyBar.current);
    if (inlineForm.current) observer.observe(inlineForm.current);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-navy-950 text-ice" style={{ "--bis-ad-sticky-height": `${stickyVisible ? stickyHeight : 0}px` } as CSSProperties}>
      <main className="pb-28">
        <section className="relative isolate overflow-hidden border-b border-sky/20 bg-[radial-gradient(ellipse_at_15%_5%,rgba(22,140,245,0.3),transparent_55%),linear-gradient(140deg,var(--blue-navy-950),var(--blue-navy-700),var(--blue-navy-950))] pb-14 pt-7 min-[820px]:pb-[72px]" aria-labelledby="bis-ad-title">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(139,220,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(139,220,255,0.045)_1px,transparent_1px)] bg-size-[64px_64px]" aria-hidden="true" />
          <div className={shell}>
            <a className="mb-6 inline-flex focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky" href="/" aria-label={`${content.brand.name} home`}>
              <img className="h-auto w-[164px] object-contain min-[560px]:w-[184px]" src={content.brand.src} alt={content.brand.name} width={184} height={48} />
            </a>
            <nav className="mb-8 flex flex-wrap gap-2 text-xs text-ice/75" aria-label="Breadcrumb">
              <a className="hover:text-sky focus-visible:outline-2 focus-visible:outline-sky" href="/">{content.homeLabel}</a><span aria-hidden="true">/</span><span aria-current="page">{content.title}</span>
            </nav>
            <div className="grid items-start gap-10 min-[980px]:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)] min-[1100px]:gap-16">
              <div className="min-w-0 text-center min-[980px]:text-left">
                <div className="mb-5 inline-flex max-w-full items-center gap-3 rounded-full border border-sky/25 bg-sky/5 py-2 pl-2 pr-4 text-left text-xs leading-relaxed text-ice min-[560px]:text-sm">
                  <img className="size-9 shrink-0 rounded-full bg-cloud p-1.5 object-contain" src={content.serviceLogo} alt="" width={36} height={36} />{content.subtitle}
                </div>
                <h1 className="mb-6 font-display text-[clamp(3.25rem,5.5vw,5.8rem)] leading-[0.95] tracking-[-0.035em] text-cloud wrap-anywhere" id="bis-ad-title">{content.title}</h1>
                <p className="mb-7 text-lg leading-relaxed text-sky min-[560px]:text-xl">{content.subtitle}</p>
                <div className="mb-7 min-w-0 overflow-hidden">
                  <p className="mb-4 text-xs text-ice/75">{content.trustedLabel}</p>
                  <div className={styles.logoRail}>
                    <div className={styles.logoTrack}>
                      {[0, 1].map((copy) => <div className="flex shrink-0 items-center gap-7 pr-7" key={copy} aria-hidden={copy === 1 || undefined}>
                        {content.trustedBrands.map((logo) => <img className={`h-9 w-24 shrink-0 object-contain ${logo.name === "Intertek" ? "rounded-md bg-cloud p-1" : ""}`} key={logo.name} src={logo.src} alt={copy === 0 ? logo.name : ""} width={96} height={36} />)}
                      </div>)}
                    </div>
                  </div>
                </div>
                <p className="mb-7 text-base leading-[1.8] text-ice/80 min-[560px]:text-lg">{content.description}</p>
                <div className="grid gap-3 min-[560px]:grid-cols-[1.5fr_1fr]">
                  <button className={primary} type="button" onClick={() => setPopupOpen(true)} aria-haspopup="dialog">{content.consultationLabel}<span aria-hidden="true">↗</span></button>
                  <a className={secondary} href={content.call.href}>{content.call.label}<span aria-hidden="true">↗</span></a>
                </div>
                <ul className="mb-0 mt-6 grid list-none gap-3 p-0 text-left text-xs text-ice/80 min-[560px]:grid-cols-3">
                  {content.trustPoints.map((point) => <li className="flex items-center gap-2" key={point}><span className="text-sky" aria-hidden="true">✓</span>{point}</li>)}
                </ul>
              </div>
              <div className="mx-auto w-full max-w-[480px] scroll-mt-[102px]" id="expert-consultation" ref={inlineForm}>
                <BisAdForm settings={content.form} form={form} />
                <div className="mt-5 border-t border-sky/20 px-1 pt-5 text-center">
                  <h3 className="mb-1 font-sans text-xs font-bold text-cloud">{content.form.trustHeading}</h3>
                  <p className="mb-3 text-[11px] text-ice/70">{content.form.trustDescription}</p>
                  <div className={`${styles.logoRail} py-2`}>
                    <div className={`${styles.logoTrack} mix-blend-screen`}>
                      {[0, 1].map((copy) => <div className="flex shrink-0 items-center gap-7 pr-7" key={copy} aria-hidden={copy === 1 || undefined}>
                        {content.form.trustItems.map((item) => <a className="flex h-9 w-32 shrink-0 items-center justify-center rounded-sm opacity-80 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sky" href={item.link?.href} key={item.name} target="_blank" rel="noreferrer" aria-label={item.name} tabIndex={copy === 1 ? -1 : undefined}>
                          <MediaMark item={item} />
                        </a>)}
                      </div>)}
                    </div>
                  </div>
                  <p className="mb-0 mt-4 border-t border-sky/20 pt-3 text-xs text-ice/75">{content.form.experienceText}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-sky/20 bg-linear-to-r from-navy-800 to-cobalt-700/40 py-10 min-[820px]:py-14" aria-label={content.impactLabel}>
          <div className={shell}><Metrics items={content.impactStats} /></div>
        </section>

        <section className="section bg-navy-950" aria-labelledby="bis-ad-process">
          <div className={shell}>
            <h2 className="mb-9 text-center font-display text-[clamp(2.5rem,4vw,4.35rem)] leading-[0.97] text-cloud" id="bis-ad-process">{content.processTitle}</h2>
            <ol className="m-0 grid list-none gap-4 p-0 min-[560px]:grid-cols-2 min-[1100px]:grid-cols-4">
              {content.process.map((step, index) => <li className={darkCard} key={step.title}>
                <span className="mb-5 grid size-12 place-items-center rounded-full border border-sky/50 bg-cobalt-700/40 font-display text-2xl text-sky" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mb-3 font-sans text-lg font-bold text-cloud">{step.title}</h3><p className="mb-0 text-sm leading-[1.8] text-ice/80">{step.description}</p>
              </li>)}
            </ol>
          </div>
        </section>

        <section className="section bg-linear-to-br from-cloud to-ice text-navy-950" aria-labelledby="bis-ad-documents">
          <div className={shell}>
            <h2 className="mb-9 text-center font-display text-[clamp(2.5rem,4vw,4.35rem)] leading-[0.97]" id="bis-ad-documents">{content.documentsTitle}</h2>
            <ul className="m-0 grid list-none gap-4 p-0 min-[560px]:grid-cols-2 min-[1100px]:grid-cols-3">
              {content.documents.map((document) => <li className="flex items-start gap-3 rounded-2xl border border-cobalt-700/20 bg-cloud p-5 text-sm leading-[1.8]" key={document}><span className="font-bold text-cobalt-700" aria-hidden="true">✓</span>{document}</li>)}
            </ul>
          </div>
        </section>

        <section className="section bg-[radial-gradient(ellipse_at_80%_10%,rgba(22,140,245,0.2),transparent_55%),linear-gradient(140deg,var(--blue-navy-800),var(--blue-navy-950))]" aria-labelledby="bis-ad-why">
          <div className={shell}>
            <h2 className="mb-6 text-center font-display text-[clamp(2.5rem,4vw,4.35rem)] leading-[0.97] text-cloud" id="bis-ad-why">{content.whyTitle}</h2>
            <p className="mx-auto mb-10 max-w-[850px] text-center text-sm leading-[1.9] text-ice/80 min-[560px]:text-base">{content.serviceInfo}</p>
            <div className="mb-8 grid gap-4 min-[820px]:grid-cols-3">
              {content.highlights.map((item) => <div className={`${darkCard} text-center`} key={item.title}><h3 className="mb-2 font-sans text-lg font-bold text-sky">{item.title}</h3><p className="mb-0 text-sm leading-relaxed text-ice/80">{item.description}</p></div>)}
            </div>
            <div className="grid gap-4 min-[560px]:grid-cols-2 min-[1100px]:grid-cols-3">
              {content.benefits.map((item) => <div className={darkCard} key={item.title}>
                <span className="mb-5 grid size-10 place-items-center rounded-full border border-sky/30 bg-electric/20 text-sky" aria-hidden="true">✓</span>
                <h3 className="mb-3 font-sans text-base font-bold text-cloud">{item.title}</h3><p className="mb-0 text-sm leading-[1.8] text-ice/80">{item.description}</p>
              </div>)}
            </div>
          </div>
        </section>

        <section className="section bg-linear-to-br from-ice to-cloud text-navy-950" aria-labelledby="bis-ad-faq">
          <div className={`${shell} max-w-[940px]`}>
            <h2 className="mb-9 text-center font-display text-[clamp(2.5rem,4vw,4.35rem)] leading-[0.97]" id="bis-ad-faq">{content.faqTitle}</h2>
            <div className="space-y-3">
              {content.faqs.map((faq, index) => <div className="overflow-hidden rounded-2xl border border-cobalt-700/20 bg-cloud" key={faq.question}>
                <h3 className="m-0"><button className="flex min-h-16 w-full cursor-pointer items-center justify-between gap-5 border-0 bg-transparent p-5 text-left font-sans text-sm font-bold focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-cobalt-700 min-[560px]:p-6 min-[560px]:text-base" type="button" aria-expanded={openFaq === index} aria-controls={`bis-ad-answer-${index}`} id={`bis-ad-question-${index}`} onClick={() => setOpenFaq(openFaq === index ? null : index)}>{faq.question}<span className="text-xl text-cobalt-700" aria-hidden="true">{openFaq === index ? "−" : "+"}</span></button></h3>
                <div className="px-5 pb-5 min-[560px]:px-6 min-[560px]:pb-6" id={`bis-ad-answer-${index}`} role="region" aria-labelledby={`bis-ad-question-${index}`} hidden={openFaq !== index}><p className="mb-0 text-sm leading-[1.8] text-navy-700">{faq.answer}</p></div>
              </div>)}
            </div>
          </div>
        </section>

        <section className="section bg-linear-to-br from-navy-800 to-navy-950 text-center" aria-labelledby="bis-ad-closing">
          <div className={`${shell} max-w-[1000px]`}>
            <h2 className="mb-6 font-display text-[clamp(2.5rem,4vw,4.35rem)] leading-[0.97] text-cloud" id="bis-ad-closing">{content.closingTitle}</h2>
            <p className="mx-auto mb-7 max-w-[640px] text-base leading-[1.8] text-ice/80">{content.closingDescription}</p>
            <p className="mb-6 text-sm text-ice">{content.closingProof}</p>
            <Metrics items={content.closingStats} />
            <div className="mt-8 flex flex-col justify-center gap-3 min-[560px]:flex-row">
              <a className={primary} href={content.closingCall.href}>{content.closingCall.label}<span aria-hidden="true">↗</span></a>
              <a className={secondary} href={content.closingWhatsApp.href} target="_blank" rel="noreferrer"><WhatsAppIcon />{content.closingWhatsApp.label}</a>
            </div>
          </div>
        </section>
      </main>

      <div ref={stickyBar} hidden={!stickyVisible} className="fixed inset-x-0 bottom-0 z-40 border-t border-sky/40 bg-navy-950/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-12px_40px_rgba(0,8,34,0.35)] backdrop-blur-xl">
        <div className={`${shell} flex items-center justify-between gap-3 py-3 min-[820px]:py-4`}>
          <div className="flex min-w-0 items-center gap-3">
            <img className="hidden size-11 shrink-0 rounded-xl bg-cloud p-2 object-contain min-[560px]:block" src={content.serviceLogo} alt="" width={44} height={44} />
            <div className="min-w-0"><p className="mb-0 font-sans text-sm font-bold text-cloud">{content.title}</p><p className="mb-0 mt-1 hidden text-xs text-ice/80 min-[980px]:block">{content.stickyDescription}</p><p className="mb-0 mt-1 hidden text-[11px] text-ice/65 min-[980px]:block">{content.stickyAudience}</p></div>
          </div>
          <div className="flex shrink-0 flex-col items-center gap-2">
            <button className="group inline-flex h-11 cursor-pointer items-center justify-center gap-2.5 rounded-full border border-sky/35 bg-linear-to-r from-electric to-cobalt-700 px-5 font-sans text-[13px]! font-semibold! leading-none! whitespace-nowrap text-white shadow-[0_4px_16px_rgba(22,140,245,0.2)] transition-[filter,box-shadow] duration-200 hover:brightness-110 hover:shadow-[0_6px_20px_rgba(22,140,245,0.3)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky" type="button" onClick={() => setPopupOpen(true)} aria-haspopup="dialog">
              <span className="hidden min-[820px]:inline">{content.stickyCta}</span>
              <span className="min-[820px]:hidden">{content.stickyMobileCta}</span>
              <svg className="size-4 shrink-0 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M6 18 18 6M6 6h12v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <p className="mb-0 hidden text-[9px] leading-none text-ice/60 min-[980px]:block">{content.stickyNote}</p>
          </div>
        </div>
      </div>

      <div className="fixed right-4 bottom-[calc(1.5rem+env(safe-area-inset-bottom)+var(--bis-ad-sticky-height))] z-50 min-[560px]:right-6">
        {introOpen ? <div className="absolute bottom-[100px] right-0 w-[290px] max-w-[calc(100vw-2rem)] rounded-[20px] border border-sky/30 bg-navy-800 p-5 shadow-[0_24px_60px_rgba(0,8,34,0.4)]" id="bis-ad-whatsapp-preview">
          <button className="absolute right-3 top-3 grid size-8 cursor-pointer place-items-center rounded-full border border-sky/20 bg-navy-950 text-ice hover:text-sky focus-visible:outline-2 focus-visible:outline-sky" type="button" aria-label="Close WhatsApp introduction" onClick={() => setIntroOpen(false)}>×</button>
          <p className="mb-1 pr-6 text-sm font-bold text-cloud">{content.whatsApp.assistant}</p><p className="mb-4 text-xs text-sky">{content.whatsApp.status}</p>
          {typing ? <p className="text-sky" aria-label="Assistant is typing"><span aria-hidden="true" className="motion-safe:animate-pulse">● ● ●</span></p> : <p className="mb-4 text-sm leading-relaxed text-ice">{content.whatsApp.message}</p>}
          <a className={`${primary} min-h-11 w-full px-3`} href={content.whatsApp.href} target="_blank" rel="noreferrer"><WhatsAppIcon />{content.whatsApp.label}</a>
        </div> : null}
        <a className="relative grid size-[60px] place-items-center rounded-full border border-sky/50 bg-linear-to-br from-electric to-cobalt-700 text-white shadow-[0_12px_28px_rgba(22,140,245,0.35)] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky" href={content.whatsApp.href} target="_blank" rel="noreferrer" aria-label={content.whatsApp.label} aria-describedby={introOpen ? "bis-ad-whatsapp-preview" : undefined}>
          <span className="absolute -top-7 rounded-full border border-sky/40 bg-navy-800 px-2 py-1 text-[10px] font-bold whitespace-nowrap text-sky">{content.whatsApp.badge}</span><WhatsAppIcon />
        </a>
      </div>

      <dialog className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[min(480px,calc(100%-2rem))] max-w-none overflow-y-auto rounded-[24px] border-0 bg-transparent p-0 text-ice backdrop:bg-navy-950/85 backdrop:backdrop-blur-sm" ref={dialog} aria-labelledby="bis-ad-popup-title" onCancel={() => setPopupOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) setPopupOpen(false); }}>
        <div className="relative">
          <button className="absolute right-3 top-3 z-10 grid size-9 cursor-pointer place-items-center rounded-full border border-sky/30 bg-navy-950 text-ice hover:text-sky focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky" type="button" onClick={() => setPopupOpen(false)} aria-label="Close consultation form">×</button>
          <BisAdForm settings={content.form} form={form} headingId="bis-ad-popup-title" />
        </div>
      </dialog>
    </div>
  );
}
