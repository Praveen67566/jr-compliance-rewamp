"use client";

import { useEffect, useState } from "react";

import { linkTargetProps } from "@/lib/link-props";
import type { StickyBarContent } from "@/lib/types";

type StickyCtaBarProps = {
  content: StickyBarContent;
};

const REVEAL_SCROLL_OFFSET = 240;

/** CMS-managed bottom CTA that enters once the reader has begun scrolling. */
export function StickyCtaBar({ content }: StickyCtaBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setIsVisible(window.scrollY >= REVEAL_SCROLL_OFFSET);

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <aside
      aria-hidden={!isVisible}
      aria-label={content.title}
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-sky/25 bg-[linear-gradient(115deg,rgba(3,15,43,0.98),rgba(3,19,47,0.98))] text-white shadow-[0_-18px_55px_rgba(0,8,34,0.35)] backdrop-blur-xl transition-[transform,opacity,visibility] duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
        isVisible
          ? "visible translate-y-0 opacity-100"
          : "invisible pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(139,220,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,220,255,0.1)_1px,transparent_1px)] [background-size:40px_40px]"
      />
      <div className="relative mx-auto grid w-full max-w-[1320px] grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-3 px-[18px] pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 pr-24 min-[560px]:gap-x-4 min-[560px]:px-[22px] min-[560px]:pr-28 min-[821px]:grid-cols-[auto_minmax(0,1fr)_minmax(250px,auto)] min-[821px]:gap-6 min-[821px]:px-8 min-[821px]:py-4">
        <span className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-[13px] border border-sky/35 bg-[linear-gradient(145deg,var(--blue-cobalt-700),var(--blue-electric))] text-white shadow-[0_10px_24px_rgba(22,140,245,0.24)] min-[560px]:size-12">
          {content.icon ? (
            <img
              alt={content.iconAlt ?? ""}
              className="size-7 object-contain"
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
          <p className="mb-0 break-words text-sm font-extrabold leading-5 text-white min-[560px]:text-base">
            {content.title}
          </p>
          <p className="mb-0 mt-0.5 line-clamp-2 break-words text-[0.7rem] leading-4 text-ice/68 min-[560px]:text-xs">
            {content.description}
          </p>
        </div>

        <div className="col-span-2 min-w-0 min-[821px]:col-span-1 min-[821px]:text-center">
          <a
            className="inline-flex min-h-10 max-w-full items-center justify-center gap-2 rounded-[12px] border border-sky/45 bg-[linear-gradient(120deg,var(--blue-electric),var(--blue-cobalt-600))] px-4 text-center text-xs font-extrabold text-white shadow-[0_10px_26px_rgba(22,140,245,0.28)] transition-[transform,background-color] duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky motion-reduce:transition-none min-[560px]:min-h-11 min-[560px]:px-5 min-[560px]:text-sm"
            href={content.cta.href}
            tabIndex={isVisible ? undefined : -1}
            {...linkTargetProps(content.cta)}
          >
            {content.cta.label}
            <span aria-hidden="true" className="text-base leading-none">→</span>
          </a>
          {content.supportingText ? (
            <p className="mb-0 mt-1.5 truncate text-[0.625rem] leading-4 text-ice/52 min-[560px]:text-[0.6875rem]">
              {content.supportingText}
            </p>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
