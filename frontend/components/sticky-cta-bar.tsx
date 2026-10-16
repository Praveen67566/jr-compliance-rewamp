"use client";

import { useEffect, useRef, useState } from "react";

import { linkTargetProps } from "@/lib/link-props";
import type { StickyBarContent, StickyBarPoint } from "@/lib/types";

type StickyCtaBarProps = {
  content: StickyBarContent;
};

const REVEAL_SCROLL_OFFSET = 240;
const HIGHLIGHT_INTERVAL = 4_000;

export function shouldRevealStickyBar(
  scrollY: number,
  isCompact: boolean,
  formBottom: number | null,
): boolean {
  return isCompact && formBottom !== null
    ? formBottom <= 0
    : scrollY >= REVEAL_SCROLL_OFFSET;
}

function SupportPointIcon({ index }: { index: number }) {
  return (
    <svg className="size-full" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 32 32">
      {index === 0 ? (
        <>
          <path d="M7 3.5h12l5 5V18M7 3.5v25h10M19 3.5v6h5M11 13h7M11 17h5M11 21h3" />
          <circle cx="23" cy="23" r="6" />
          <path d="m20.3 23 1.8 1.8 3.6-3.6" />
        </>
      ) : index === 1 ? (
        <>
          <path d="M5 18v-3a11 11 0 0 1 22 0v5M7 15H5a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h3V14M25 15h2a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-3V14M26 24c0 3-3 4-7 4" />
          <rect height="3" rx="1.5" width="6" x="14" y="26.5" />
        </>
      ) : (
        <>
          <path d="m16 2 3.2 2.4 4-.1 1.1 3.8 3.3 2.3-1.3 3.8.6 4-3.5 1.9-1.8 3.6-3.9-.7-3.8 1.3-2.4-3.2-3.8-1.2.2-4L4 12.7l2.6-3.1.5-4 3.9-.6zM10 23l-2 7 7-3M22 23l2 7-7-3" />
          <circle cx="16" cy="13.5" r="6.5" />
          <path d="m12.8 13.5 2.1 2.1 4.3-4.3" />
        </>
      )}
    </svg>
  );
}

/** CMS-managed bottom CTA that enters once the reader has begun scrolling. */
export function StickyCtaBar({ content }: StickyCtaBarProps) {
  const barRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [activePoint, setActivePoint] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const hasProof = Boolean(content.points?.length || content.logos?.length);
  const highlights: StickyBarPoint[] = content.points?.length
    ? content.points
    : [{ title: content.description }];
  const selectedPoint = activePoint % highlights.length;

  useEffect(() => {
    const compactQuery = window.matchMedia("(max-width: 820px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observedForm: HTMLElement | null = null;
    const formObserver = new ResizeObserver(updateVisibility);

    function updateVisibility() {
      const form = document.getElementById("expert-consultation");

      if (form !== observedForm) {
        formObserver.disconnect();
        observedForm = form;
        if (form) formObserver.observe(form);
      }

      setIsVisible(shouldRevealStickyBar(
        window.scrollY,
        compactQuery.matches,
        form ? form.getBoundingClientRect().bottom : null,
      ));
    }

    const updateViewport = () => {
      setIsCompact(compactQuery.matches);
      updateVisibility();
    };
    const updateMotion = () => setReduceMotion(motionQuery.matches);

    updateViewport();
    updateMotion();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    compactQuery.addEventListener("change", updateViewport);
    motionQuery.addEventListener("change", updateMotion);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
      compactQuery.removeEventListener("change", updateViewport);
      motionQuery.removeEventListener("change", updateMotion);
      formObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isVisible || !isCompact || reduceMotion || isPaused || isHovered || highlights.length < 2) return;

    const timer = window.setInterval(() => {
      if (!document.hidden) setActivePoint((current) => (current + 1) % highlights.length);
    }, HIGHLIGHT_INTERVAL);

    return () => window.clearInterval(timer);
  }, [isVisible, isCompact, reduceMotion, isPaused, isHovered, highlights.length]);

  useEffect(() => {
    const bar = barRef.current;
    const shell = bar?.closest<HTMLElement>(".site-shell");

    if (!bar || !shell) return;

    const updateOffset = () => {
      shell.style.setProperty("--sticky-cta-offset", isVisible ? `${bar.offsetHeight}px` : "0px");
    };

    updateOffset();
    const observer = new ResizeObserver(updateOffset);
    observer.observe(bar);

    return () => {
      observer.disconnect();
      shell.style.removeProperty("--sticky-cta-offset");
    };
  }, [isVisible]);

  return (
    <aside
      aria-hidden={!isVisible}
      aria-label={content.title}
      ref={barRef}
      className={`fixed inset-x-0 bottom-0 z-30 isolate border-b-2 border-t border-b-cobalt-700 border-t-cobalt-600/25 bg-[linear-gradient(110deg,var(--blue-ice),var(--blue-cloud)_42%,var(--blue-ice))] text-navy-950 shadow-[0_-10px_36px_rgba(3,19,47,0.12)] transition-[transform,opacity,visibility] duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
        isVisible
          ? "visible translate-y-0 opacity-100"
          : "invisible pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--blue-sky),var(--blue-electric),transparent)]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden min-[821px]:block">
        <span className="absolute -left-16 top-1/2 h-48 w-80 -translate-y-1/2 rounded-r-full border-r border-cobalt-600/10 bg-cloud/60" />
        <span className="absolute -right-20 inset-y-0 w-80 -skew-x-[28deg] border-l border-cobalt-600/10 bg-sky/15" />
        <span className="absolute -right-8 inset-y-0 w-24 -skew-x-[28deg] bg-sky/20" />
      </div>
      <div className={`relative mx-auto grid w-full max-w-[1320px] grid-cols-[minmax(0,1fr)_auto] items-center bg-navy-900 min-[821px]:gap-x-8 min-[821px]:gap-y-2.5 min-[821px]:bg-transparent min-[821px]:px-8 min-[821px]:pb-[calc(0.625rem+env(safe-area-inset-bottom))] min-[821px]:pt-2.5 min-[1100px]:pb-[calc(0.875rem+env(safe-area-inset-bottom))] min-[1100px]:pt-3.5 ${hasProof ? "min-[1100px]:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)_auto]" : ""}`}>
        <div className="order-1 flex min-h-16 min-w-0 items-center gap-5 py-2.5 pl-[18px] pr-10 min-[821px]:min-h-0 min-[821px]:p-0">
          {content.brandLogo ? (
            <img
              alt={content.brandLogo.alt}
              className="h-12 w-[132px] shrink-0 object-contain object-left max-[821px]:!hidden min-[1100px]:h-14 min-[1100px]:w-[176px]"
              decoding="async"
              height={56}
              src={content.brandLogo.src}
              width={176}
            />
          ) : (
            <span className="hidden size-11 shrink-0 place-items-center overflow-hidden rounded-xl border border-cobalt-600/20 bg-cloud/70 text-cobalt-700 min-[821px]:grid">
              {content.icon ? (
                <img alt={content.iconAlt ?? ""} className="size-6 object-contain" decoding="async" height={28} src={content.icon} width={28} />
              ) : (
                <svg aria-hidden="true" className="size-6" fill="none" viewBox="0 0 24 24">
                  <path d="M7 3.75h7l3 3V20.25H7z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
                  <path d="M14 3.75v3h3M9.25 12.25l1.65 1.65 3.85-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
                </svg>
              )}
            </span>
          )}

          <div className="min-w-0">
            <p className="mb-0 line-clamp-2 break-words text-[0.8125rem] font-extrabold leading-[1.35] tracking-[-0.015em] text-white min-[821px]:line-clamp-none min-[821px]:text-sm min-[821px]:text-navy-950 min-[1100px]:text-base">
              {content.title}
            </p>
            <p className="sr-only text-[0.6875rem] leading-[1.45] text-navy-700 min-[821px]:not-sr-only min-[821px]:mb-0 min-[821px]:mt-1 min-[821px]:line-clamp-2">
              {content.description}
            </p>
          </div>
        </div>

        {hasProof ? (
          <div
            aria-label={content.title}
            className="order-3 col-span-2 hidden min-w-0 border-t border-cobalt-700/15 pt-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt-700 min-[821px]:block min-[1100px]:order-2 min-[1100px]:col-span-1 min-[1100px]:border-l min-[1100px]:border-t-0 min-[1100px]:pl-5 min-[1100px]:pt-0"
            role="group"
            tabIndex={isVisible ? 0 : -1}
          >
            {content.points?.length ? (
              <ul className="m-0 flex list-none divide-x divide-cobalt-700/15 p-0">
                {content.points.map((point, index) => (
                  <li className="flex min-w-0 flex-1 items-center gap-2 px-3 first:pl-0 last:pr-0 min-[560px]:gap-2.5" key={`${point.title}-${index}`}>
                    <span aria-hidden="true" className="grid size-7 shrink-0 place-items-center text-cobalt-700 min-[560px]:size-8">
                      {point.icon ? (
                        <img alt="" className="size-full object-contain" decoding="async" height={32} src={point.icon} width={32} />
                      ) : (
                        <SupportPointIcon index={index} />
                      )}
                    </span>
                    <span className="min-w-0 break-words">
                      <span className="block text-[0.6875rem] font-extrabold leading-[1.3] text-cobalt-700 min-[560px]:text-[0.8125rem]">{point.title}</span>
                      {point.description ? <span className="mt-0.5 block text-[0.625rem] leading-[1.4] text-navy-700 min-[560px]:text-[0.6875rem]">{point.description}</span> : null}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
            {content.logos?.length ? (
              <ul className={`m-0 flex list-none flex-wrap items-center gap-3 p-0 ${content.points?.length ? "mt-2" : ""}`}>
                {content.logos.map((logo, index) => (
                  <li className="flex h-5 items-center" key={`${logo.src}-${index}`}>
                    <img alt={logo.alt} className="h-full w-auto max-w-[88px] object-contain" decoding="async" height={20} src={logo.src} width={88} />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}

        <div className="relative order-2 flex w-[140px] min-w-0 flex-col items-center justify-center self-stretch bg-cloud py-2.5 pl-1 pr-[18px] text-center before:pointer-events-none before:absolute before:inset-y-0 before:right-full before:w-8 before:bg-cloud before:content-[''] before:[mask-image:radial-gradient(ellipse_100%_100%_at_0_100%,transparent_98%,#000_100%)] min-[821px]:w-auto min-[821px]:max-w-[240px] min-[821px]:py-1 min-[821px]:pl-0 min-[821px]:pr-0 min-[1100px]:order-3">
          <a
            className="inline-flex min-h-11 max-w-full items-center justify-center gap-2.5 rounded-full border border-cloud/80 bg-[linear-gradient(115deg,var(--blue-cobalt-700),var(--blue-cobalt-700)_65%,var(--blue-navy-700))] px-3 py-1.5 text-center text-[0.6875rem] font-extrabold !text-white shadow-[inset_0_1px_rgba(255,255,255,0.25),0_6px_18px_rgba(13,92,184,0.2)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(13,92,184,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt-700 motion-reduce:transition-none min-[821px]:px-5 min-[821px]:py-2.5 min-[821px]:text-xs min-[1100px]:text-[0.8125rem]"
            href={content.cta.href}
            tabIndex={isVisible ? undefined : -1}
            {...linkTargetProps(content.cta)}
          >
            <span className="min-w-0 break-words">{content.cta.label}</span>
            <svg aria-hidden="true" className="hidden size-5 shrink-0 min-[821px]:block" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="currentColor" />
              <path d="m10 8 4 4-4 4m-3-4h7" stroke="var(--blue-cobalt-700)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
            </svg>
          </a>
          {content.supportingText ? (
            <p className="sr-only break-words text-[0.6875rem] leading-[1.4] text-navy-700 min-[821px]:not-sr-only min-[821px]:mb-0 min-[821px]:mt-1">
              {content.supportingText}
            </p>
          ) : null}
        </div>

        <div
          className="order-3 col-span-2 flex min-w-0 items-center gap-2 border-t border-sky/15 bg-navy-800 pb-[env(safe-area-inset-bottom)] pl-[18px] pr-2 text-ice min-[821px]:hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {content.points?.length ? (
            <ul className="sr-only">
              {content.points.map((point, index) => (
                <li key={`${point.title}-${index}`}>{point.title}{point.description ? `: ${point.description}` : ""}</li>
              ))}
            </ul>
          ) : null}
          {highlights.length > 1 ? <button
            aria-label={highlights.length > 1 ? `Next support highlight: ${highlights[selectedPoint].title}` : content.description}
            className="relative h-8 min-w-0 flex-1 overflow-hidden border-0 bg-transparent p-0 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-sky"
            onClick={() => {
              setActivePoint((current) => (current + 1) % highlights.length);
              setIsPaused(true);
            }}
            tabIndex={isVisible ? 0 : -1}
            type="button"
          >
            {highlights.map((point, index) => (
              <span
                aria-hidden="true"
                className={`absolute inset-0 flex items-center gap-2 transition-[opacity,transform] duration-400 motion-reduce:transition-none ${index === selectedPoint ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"}`}
                key={`${point.title}-${index}`}
              >
                <span className="size-1.5 shrink-0 rounded-full bg-sky" />
                <span className="min-w-0 truncate text-[0.6875rem] leading-4">
                  <strong className="font-bold">{point.title}</strong>
                  {point.description ? <span className="text-ice/85"> · {point.description}</span> : null}
                </span>
              </span>
            ))}
          </button> : (
            <p className="m-0 min-w-0 flex-1 truncate text-[0.6875rem] leading-8">{highlights[0].title}</p>
          )}
          {highlights.length > 1 ? (
            <>
              <span aria-hidden="true" className="flex shrink-0 gap-1">
                {highlights.map((_, index) => <span className={`size-1 rounded-full ${index === selectedPoint ? "bg-sky" : "bg-sky/30"}`} key={index} />)}
              </span>
              {!reduceMotion ? (
                <button
                  aria-label={isPaused ? "Play support highlights" : "Pause support highlights"}
                  aria-pressed={isPaused}
                  className="grid size-8 shrink-0 place-items-center rounded-full border-0 bg-transparent p-0 hover:bg-sky/10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-sky"
                  onClick={() => setIsPaused((current) => !current)}
                  tabIndex={isVisible ? 0 : -1}
                  type="button"
                >
                  <svg aria-hidden="true" className="size-3.5" fill="currentColor" viewBox="0 0 16 16">
                    {isPaused ? <path d="m5 3 8 5-8 5z" /> : <path d="M4 3h3v10H4zm5 0h3v10H9z" />}
                  </svg>
                </button>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
