"use client";

import { useEffect, useRef, useState } from "react";

import { linkTargetProps } from "@/lib/link-props";
import type { StickyBarContent } from "@/lib/types";

type StickyCtaBarProps = {
  content: StickyBarContent;
};

const REVEAL_SCROLL_OFFSET = 240;

/** CMS-managed bottom CTA that enters once the reader has begun scrolling. */
export function StickyCtaBar({ content }: StickyCtaBarProps) {
  const barRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setIsVisible(window.scrollY >= REVEAL_SCROLL_OFFSET);

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

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
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-sky/20 bg-[linear-gradient(115deg,rgba(3,15,43,0.97),rgba(6,40,95,0.97),rgba(3,19,47,0.97))] text-white shadow-[0_-12px_40px_rgba(0,8,34,0.28)] backdrop-blur-xl transition-[transform,opacity,visibility] duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
        isVisible
          ? "visible translate-y-0 opacity-100"
          : "invisible pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--blue-electric),var(--blue-sky),var(--blue-electric),transparent)]"
      />
      <div className="relative mx-auto grid w-full max-w-[1320px] grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-2 px-[18px] pb-[calc(0.625rem+env(safe-area-inset-bottom))] pt-2.5 min-[560px]:gap-x-4 min-[560px]:px-[22px] min-[821px]:grid-cols-[auto_minmax(0,1fr)_auto] min-[821px]:gap-x-5 min-[821px]:px-8 min-[821px]:pb-[calc(0.5rem+env(safe-area-inset-bottom))] min-[821px]:pt-2 min-[1441px]:pb-[calc(0.75rem+env(safe-area-inset-bottom))] min-[1441px]:pt-3">
        <span className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-xl border border-sky/30 bg-[linear-gradient(145deg,var(--blue-cobalt-700),var(--blue-electric))] text-white shadow-[inset_0_1px_rgba(255,255,255,0.2),0_4px_14px_rgba(22,140,245,0.18)] min-[1441px]:size-11">
          {content.icon ? (
            <img
              alt={content.iconAlt ?? ""}
              className="size-6 object-contain"
              decoding="async"
              height={28}
              src={content.icon}
              width={28}
            />
          ) : (
            <svg aria-hidden="true" className="size-6" fill="none" viewBox="0 0 24 24">
              <path d="M7 3.75h7l3 3V20.25H7z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
              <path d="M14 3.75v3h3M9.25 12.25l1.65 1.65 3.85-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
            </svg>
          )}
        </span>

        <div className="min-w-0">
          <p className="mb-0 break-words text-sm font-extrabold leading-5 text-white min-[1441px]:text-base">
            {content.title}
          </p>
          <p className="mb-0 mt-0.5 line-clamp-2 break-words text-[0.7rem] leading-4 text-ice/75 min-[560px]:text-xs">
            {content.description}
          </p>
        </div>

        <div className="col-span-2 min-w-0 min-[821px]:col-span-1 min-[821px]:max-w-[320px] min-[821px]:text-center">
          <a
            className="inline-flex min-h-11 max-w-full items-center justify-center rounded-full border border-sky/45 bg-[linear-gradient(120deg,var(--blue-electric),var(--blue-cobalt-700))] px-4 py-1.5 text-center text-xs font-extrabold text-white shadow-[inset_0_1px_rgba(255,255,255,0.2),0_4px_16px_rgba(22,140,245,0.24)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_22px_rgba(22,140,245,0.4)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky motion-reduce:transition-none min-[560px]:px-5 min-[821px]:min-h-9 min-[1441px]:min-h-10 min-[1441px]:text-sm"
            href={content.cta.href}
            tabIndex={isVisible ? undefined : -1}
            {...linkTargetProps(content.cta)}
          >
            {content.cta.label}
          </a>
          {content.supportingText ? (
            <p className="mb-0 mt-1 truncate text-[0.625rem] leading-3 text-ice/65 min-[560px]:text-[0.6875rem]">
              {content.supportingText}
            </p>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
