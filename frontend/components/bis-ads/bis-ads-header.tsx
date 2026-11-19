"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { BisAdsPageContent } from "@/lib/types";

export function ContactIcon({ kind }: { kind: "call" | "whatsapp" | "consultation" }) {
  return <svg aria-hidden="true" className="size-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {kind === "call" ? <path d="m7 3 3 5-2 2a15 15 0 0 0 6 6l2-2 5 3-1 4C10 22 2 14 3 4l4-1Z" /> : <>
      <path d="M21 11.5a9 9 0 0 1-9 9c-1.5 0-3-.4-4.3-1.1L3 21l1.5-4.5A9 9 0 1 1 21 11.5Z" />
      {kind === "whatsapp" ? <path d="m9 7 1.5 2-1 1a9 9 0 0 0 4 4l1-1L17 14c-1 4-9 0-10-5l2-2Z" /> : <path d="M8 9h8M8 13h5" />}
    </>}
  </svg>;
}

export function BisAdsHeader({ content }: { content: BisAdsPageContent }) {
  const [announcement, announcementProof] = content.header.message.split(" | ");
  const headerRef = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const measure = () => document.documentElement.style.setProperty("--site-header-height", `${header.offsetHeight}px`);
    const observer = new ResizeObserver(measure);
    observer.observe(header);
    measure();
    const desktop = window.matchMedia("(min-width: 1100px)");
    const closeMenu = () => setOpen(false);
    desktop.addEventListener("change", closeMenu);
    return () => { observer.disconnect(); desktop.removeEventListener("change", closeMenu); document.documentElement.style.removeProperty("--site-header-height"); };
  }, []);

  useEffect(() => {
    const sync = () => setActive(window.location.hash);
    window.addEventListener("hashchange", sync);
    sync();
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  function followSection(event: React.MouseEvent<HTMLElement>) {
    const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link) return;
    const id = link.hash.slice(1);
    setOpen(false);
    setActive(link.hash);
    // Let the compact menu close before measuring the anchor's sticky clearance.
    requestAnimationFrame(() => {
      const target = document.getElementById(id);
      if (!target) return;
      target.scrollIntoView({ behavior: "instant", block: "start" });
      const focusTarget = target.querySelector<HTMLElement>("h2, input") ?? target;
      focusTarget.setAttribute("tabindex", "-1");
      focusTarget.focus({ preventScroll: true });
    });
  }

  const contactButton = "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-cloud! min-[1280px]:px-4";
  return <header ref={headerRef} data-bis-header className="sticky top-0 z-50 bg-cloud text-navy-900 shadow-[0_2px_14px_rgba(3,19,47,0.08)]" onClick={followSection} onKeyDown={(event) => {
    if (event.key === "Escape" && open) { setOpen(false); menuButton.current?.focus(); }
  }}>
    <div className="hidden bg-linear-to-r from-navy-950 via-navy-700 to-navy-950 min-[1100px]:block">
      <p data-bis-announcement className="mx-auto mb-0 flex min-h-10 max-w-[1320px] items-center justify-center px-8 py-2 text-center text-sm leading-6 text-ice">
        <span>{announcement}{" | "}<strong className="font-semibold text-sky">{announcementProof}</strong></span>
      </p>
    </div>
    <div className="mx-auto flex min-h-[74px] max-w-[1320px] flex-wrap items-center justify-between gap-x-4 gap-y-2 px-[18px] py-3 min-[560px]:px-[22px] min-[1100px]:gap-x-5 min-[1100px]:px-8">
      <a href="/" className="shrink-0 rounded" aria-label={`${content.site.name} home`}>
        <img src={content.site.logo} alt={content.site.name} width={172} height={48} className="h-auto w-[124px] min-[390px]:w-[150px] min-[560px]:w-[172px]" />
      </a>
      <nav id={menuId} aria-label="BIS certification sections" className={`${open ? "flex" : "hidden"} order-3 w-full flex-col gap-1 border-t border-cobalt-700/15 pt-3 min-[1100px]:order-none min-[1100px]:flex min-[1100px]:w-auto min-[1100px]:flex-row min-[1100px]:flex-wrap min-[1100px]:border-0 min-[1100px]:pt-0`}>
        {content.sectionNavigation.map((link) => <a key={link.href} href={link.href} aria-current={active === link.href ? "location" : undefined} className="inline-flex min-h-11 items-center rounded-lg px-2.5 text-sm font-semibold underline-offset-4 hover:bg-ice aria-[current=location]:bg-ice aria-[current=location]:text-cobalt-700 aria-[current=location]:underline" data-bis-cta="navigation" data-bis-location="header">{link.label}</a>)}
        <a href="#expert-consultation" className={`${contactButton} mt-2 bg-cobalt-700 min-[1100px]:hidden!`} data-bis-cta="consultation" data-bis-location="mobile-menu">{content.header.consultationLabel}</a>
      </nav>
      <div className="flex items-center gap-2">
        <a href={content.whatsAppHref} target="_blank" rel="noreferrer" aria-label={`${content.header.whatsAppLabel} (opens in a new tab)`} className={`${contactButton} bg-cobalt-700 hover:bg-navy-700`} data-bis-cta="whatsapp" data-bis-location="header"><ContactIcon kind="whatsapp" /><span className="hidden min-[560px]:inline">{content.header.whatsAppLabel}</span></a>
        <a href={content.site.phoneHref} aria-label={content.header.callLabel} className={`${contactButton} bg-navy-700 hover:bg-navy-950`} data-bis-cta="call" data-bis-location="header"><ContactIcon kind="call" /><span className="hidden min-[560px]:inline">{content.header.callLabel}</span></a>
        <a href="#expert-consultation" className={`${contactButton} hidden! bg-linear-to-r from-cobalt-700 to-electric min-[1100px]:inline-flex!`} data-bis-cta="consultation" data-bis-location="header"><ContactIcon kind="consultation" />{content.header.consultationLabel}</a>
        <button ref={menuButton} type="button" aria-label={content.header.menuLabel} aria-expanded={open} aria-controls={menuId} onClick={() => setOpen((value) => !value)} className="grid min-h-11! min-w-11! cursor-pointer place-items-center rounded-lg border border-cobalt-700/15 bg-ice text-navy-700 min-[1100px]:hidden">
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d={open ? "m6 6 12 12M6 18 18 6" : "M4 6h16M4 12h16M4 18h16"} /></svg>
        </button>
      </div>
    </div>
  </header>;
}
