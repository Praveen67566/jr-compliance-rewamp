"use client";

import { useEffect, useId, useRef, useState } from "react";

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

function ServiceShield({ icon }: { icon?: string }) {
  const gradientId = useId();

  return (
    <span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-6 hidden h-[92px] w-20 drop-shadow-[0_5px_10px_rgba(13,92,184,0.3)] min-[821px]:block">
      <svg className="size-full" fill="none" viewBox="0 0 84 100">
        <defs>
          <linearGradient id={gradientId} x1="8" x2="76" y1="4" y2="94" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--blue-sky)" />
            <stop offset="0.38" stopColor="var(--blue-electric)" />
            <stop offset="1" stopColor="var(--blue-navy-700)" />
          </linearGradient>
        </defs>
        <path d="M42 2 75 15a8 8 0 0 1 5 7.5V51c0 22-15 39-38 47C19 90 4 73 4 51V22.5A8 8 0 0 1 9 15Z" fill={`url(#${gradientId})`} fillOpacity="0.94" stroke="var(--blue-sky-strong)" strokeWidth="1.5" />
        <path d="M42 5 74 18a5 5 0 0 1 3 4.5V37C53 51 29 31 7 50V22.5a5 5 0 0 1 3-4.5Z" fill="var(--blue-cloud)" fillOpacity="0.2" />
        <path d="M11 25v26c0 18 12 32 31 40 19-8 31-22 31-40V25" stroke="var(--blue-sky)" strokeOpacity="0.32" />
      </svg>
      {icon ? (
        <img alt="" className="absolute left-1/2 top-7 size-11 -translate-x-1/2 object-contain" decoding="async" height={44} src={icon} width={44} />
      ) : (
        <svg className="absolute left-1/2 top-7 size-10 -translate-x-1/2 text-cloud" fill="none" viewBox="0 0 24 24">
          <path d="m6 12 4 4 8-8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      )}
    </span>
  );
}

/** CMS-managed bottom CTA that enters once the reader has begun scrolling. */
export function StickyCtaBar({ content }: StickyCtaBarProps) {
  const barRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [activePoint, setActivePoint] = useState(0);
  const [isRotationStopped, setIsRotationStopped] = useState(false);
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
    if (!isVisible || !isCompact || reduceMotion || isRotationStopped || isHovered || highlights.length < 2) return;

    const timer = window.setInterval(() => {
      if (!document.hidden) setActivePoint((current) => (current + 1) % highlights.length);
    }, HIGHLIGHT_INTERVAL);

    return () => window.clearInterval(timer);
  }, [isVisible, isCompact, reduceMotion, isRotationStopped, isHovered, highlights.length]);

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
      onFocusCapture={() => setIsRotationStopped(true)}
      ref={barRef}
      className={`sticky-cta-bar fixed inset-x-0 bottom-0 z-30 isolate border-b-2 border-t border-b-cobalt-700 border-t-cobalt-600/25 bg-[linear-gradient(110deg,var(--blue-ice),var(--blue-cloud)_42%,var(--blue-ice))] text-navy-950 shadow-[0_-10px_36px_rgba(3,19,47,0.12)] transition-[transform,opacity,visibility] duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none min-[821px]:rounded-b-xl min-[821px]:border-b-0 min-[821px]:border-t-sky/35 min-[821px]:bg-[linear-gradient(100deg,var(--blue-navy-950),var(--blue-navy-700)_28%,var(--blue-cobalt-700)_70%,var(--blue-electric))] min-[821px]:text-ice ${
        isVisible
          ? "visible translate-y-0 opacity-100"
          : "invisible pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden rounded-[inherit] min-[821px]:block"
      >
        <span className="sticky-cta-sweep absolute inset-y-0 left-0 w-[35%] bg-[linear-gradient(105deg,transparent,rgba(139,220,255,0.12),rgba(22,140,245,0.18),transparent)] motion-reduce:hidden" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--blue-sky),var(--blue-electric),transparent)]"
      />
      <div className="relative grid w-full grid-cols-[minmax(0,1fr)_minmax(132px,min(44%,224px))] items-center bg-navy-900 max-[820px]:bg-[linear-gradient(110deg,var(--blue-navy-950),var(--blue-navy-700))] min-[821px]:grid-cols-[minmax(0,1fr)_auto] min-[821px]:gap-x-5 min-[821px]:bg-transparent min-[821px]:pb-[env(safe-area-inset-bottom)] min-[1440px]:gap-x-8">
        <div className="contents min-[821px]:col-start-1 min-[821px]:row-start-1 min-[821px]:flex min-[821px]:min-w-0 min-[821px]:items-center min-[821px]:gap-5 min-[1440px]:gap-8">
          <div className="relative order-1 flex min-h-[72px] min-w-0 items-center gap-2 py-3 pl-3.5 pr-7 min-[560px]:gap-3 min-[560px]:pl-[22px] min-[821px]:max-w-[40%] min-[821px]:flex-[0_1_auto] min-[821px]:pl-32 min-[821px]:pr-0">
            <ServiceShield icon={content.icon} />
            <div className="min-w-0">
              <p className="mb-0 line-clamp-2 break-words text-sm font-bold leading-[1.25] tracking-[-0.015em] text-white min-[560px]:text-base min-[821px]:block min-[821px]:truncate min-[821px]:text-base min-[821px]:font-semibold min-[821px]:text-cloud min-[1440px]:text-lg" title={content.title}>
                {content.title}
              </p>
              <p className="mb-0 mt-1 line-clamp-2 break-words text-[0.6875rem] leading-[1.4] text-ice/85 min-[821px]:line-clamp-1 min-[821px]:text-ice min-[1440px]:text-xs" title={content.description}>
                {content.description}
              </p>
            </div>
          </div>

          {hasProof ? (
            <div
              aria-label={content.title}
              className="order-3 hidden min-w-0 flex-1 items-center gap-4 border-l border-sky/25 py-1 pl-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky min-[821px]:flex min-[1440px]:pl-8"
              role="group"
              tabIndex={isVisible ? 0 : -1}
            >
              {content.points?.length ? (
                <ul className="m-0 flex min-w-0 flex-1 list-none items-center divide-x divide-sky/20 p-0">
                  {content.points.slice(0, 2).map((point, index) => (
                    <li className="flex min-w-0 flex-1 items-center gap-2 px-3 first:pl-0 last:pr-0 min-[1440px]:gap-3 min-[1440px]:px-5" key={`${point.title}-${index}`}>
                      <span aria-hidden="true" className="grid size-6 shrink-0 place-items-center text-sky min-[1440px]:size-8">
                        {point.icon ? (
                          <img alt="" className="size-full object-contain" decoding="async" height={32} src={point.icon} width={32} />
                        ) : (
                          <SupportPointIcon index={index} />
                        )}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[0.6875rem] font-semibold leading-[1.3] text-cloud min-[981px]:text-xs min-[1440px]:text-sm" title={point.title}>{point.title}</span>
                        {point.description ? <span className="sr-only mt-0.5 text-[0.6875rem] leading-[1.4] text-ice min-[1100px]:not-sr-only min-[1100px]:block min-[1100px]:truncate" title={point.description}>{point.description}</span> : null}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
              {content.logos?.length ? (
                <ul className={`m-0 flex list-none items-center gap-3 p-0 ${content.points?.length ? "sr-only min-[1440px]:not-sr-only min-[1440px]:shrink-0 min-[1440px]:border-l min-[1440px]:border-sky/25 min-[1440px]:pl-4" : ""}`}>
                  {content.logos.map((logo, index) => (
                    <li className="flex h-5 items-center" key={`${logo.src}-${index}`}>
                      <img alt={logo.alt} className="h-full w-auto !max-w-[88px] object-contain" decoding="async" height={20} src={logo.src} width={88} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="relative order-2 flex w-full min-w-0 flex-col items-center justify-center self-stretch bg-cloud py-3 pl-0 pr-3.5 text-center before:pointer-events-none before:absolute before:inset-y-0 before:right-full before:w-7 before:bg-cloud before:content-[''] before:[mask-image:radial-gradient(ellipse_100%_100%_at_0_100%,transparent_98%,#000_100%)] min-[560px]:pr-[22px] min-[821px]:col-start-2 min-[821px]:row-start-1 min-[821px]:w-auto min-[821px]:max-w-[264px] min-[821px]:bg-transparent min-[821px]:pr-8 min-[821px]:before:hidden">
          <a
            className="inline-flex min-h-11 max-w-full items-center justify-center gap-1.5 rounded-full border border-cloud/80 bg-[linear-gradient(115deg,var(--blue-cobalt-700),var(--blue-cobalt-700)_65%,var(--blue-navy-700))] px-2.5 py-2 text-center text-[0.6875rem] font-extrabold !text-white shadow-[inset_0_1px_rgba(255,255,255,0.25),0_6px_18px_rgba(13,92,184,0.2)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(13,92,184,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky motion-reduce:transition-none max-[820px]:w-full max-[820px]:text-xs max-[820px]:font-semibold max-[820px]:leading-[1.3] min-[560px]:text-xs min-[821px]:gap-2.5 min-[821px]:whitespace-nowrap min-[821px]:border-sky/50 min-[821px]:bg-[linear-gradient(135deg,#67e8f9,#22d3ee)] min-[821px]:px-6 min-[821px]:py-2.5 min-[821px]:font-semibold min-[821px]:text-navy-950! min-[821px]:shadow-[0_0_24px_rgba(34,211,238,0.3)] min-[821px]:hover:shadow-[0_0_32px_rgba(34,211,238,0.5)] min-[821px]:focus-visible:outline-cloud min-[1100px]:text-sm"
            href={content.cta.href}
            tabIndex={isVisible ? undefined : -1}
            {...linkTargetProps(content.cta)}
          >
            <span className="min-w-0 break-words max-[820px]:text-balance">{content.cta.label}</span>
          </a>
          {content.supportingText ? (
            <p className="sr-only">
              {content.supportingText}
            </p>
          ) : null}
        </div>

        <div
          className="order-3 col-span-2 flex min-w-0 items-center gap-3 border-t border-cobalt-600/20 bg-[linear-gradient(100deg,var(--blue-cloud),var(--blue-ice))] px-3.5 pb-[env(safe-area-inset-bottom)] text-navy-950 min-[560px]:px-[22px] min-[821px]:hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {content.brandLogo ? (
            <span className="shrink-0 border-r border-cobalt-700/15 pr-3">
              <img alt={content.brandLogo.alt} className="h-6 w-auto !max-w-[76px] object-contain object-left min-[560px]:!max-w-[96px]" decoding="async" height={24} src={content.brandLogo.src} width={80} />
            </span>
          ) : null}
          {content.points?.length ? (
            <ul className="sr-only">
              {content.points.map((point, index) => (
                <li key={`${point.title}-${index}`}>{point.title}{point.description ? `: ${point.description}` : ""}</li>
              ))}
            </ul>
          ) : null}
          {highlights.length > 1 ? <button
            aria-label={`Next support highlight (stops automatic rotation). Current: ${highlights[selectedPoint].title}`}
            className="group/highlight relative h-14 min-w-0 flex-1 overflow-hidden border-0 bg-transparent p-0 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-cobalt-700"
            onClick={() => {
              setActivePoint((current) => (current + 1) % highlights.length);
              setIsRotationStopped(true);
            }}
            tabIndex={isVisible ? 0 : -1}
            type="button"
          >
            {highlights.map((point, index) => (
              <span
                aria-hidden="true"
                className={`absolute inset-y-0 left-0 right-5 flex items-center gap-2 transition-[opacity,transform] duration-400 motion-reduce:transition-none ${index === selectedPoint ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"}`}
                key={`${point.title}-${index}`}
              >
                <span className="size-6 shrink-0 text-cobalt-700">
                  {point.icon ? <img alt="" className="size-full object-contain" decoding="async" height={24} src={point.icon} width={24} /> : <SupportPointIcon index={index} />}
                </span>
                <span className="min-w-0 leading-[1.3]">
                  <strong className="line-clamp-2 text-xs font-semibold text-cobalt-700">{point.title}</strong>
                  {point.description ? <span className="mt-0.5 block truncate text-[0.6875rem] text-navy-700">{point.description}</span> : null}
                </span>
              </span>
            ))}
            <svg aria-hidden="true" className="absolute right-0 top-1/2 size-4 -translate-y-1/2 text-cobalt-700 transition-transform duration-200 group-hover/highlight:translate-x-0.5 motion-reduce:transition-none" fill="none" viewBox="0 0 24 24">
              <path d="m9 6 6 6-6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </button> : (
            <div className="flex min-h-14 min-w-0 flex-1 items-center gap-2 py-1.5">
              <span aria-hidden="true" className="size-6 shrink-0 text-cobalt-700">
                {highlights[0].icon ? <img alt="" className="size-full object-contain" decoding="async" height={24} src={highlights[0].icon} width={24} /> : <SupportPointIcon index={0} />}
              </span>
              <p className="m-0 min-w-0 text-[0.6875rem] leading-[1.4]">
                <strong className="line-clamp-2 font-semibold">{highlights[0].title}</strong>
                {highlights[0].description ? <span className="block truncate text-navy-700">{highlights[0].description}</span> : null}
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
