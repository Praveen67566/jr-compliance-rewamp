"use client";

import { useId, useState } from "react";

import type { Faq } from "@/lib/types";

export const INITIAL_VISIBLE_FAQS = 10;
export const FAQ_REVEAL_INCREMENT = 10;

type ServiceFaqListProps = {
  items: Faq[];
};

export function ServiceFaqList({ items }: ServiceFaqListProps) {
  const listId = useId();
  const [visibleCount, setVisibleCount] = useState(() =>
    Math.min(INITIAL_VISIBLE_FAQS, items.length),
  );
  const usesTwoColumns = items.length > 5;
  const hasMoreQuestions = visibleCount < items.length;

  const loadMoreQuestions = () => {
    setVisibleCount((currentCount) =>
      Math.min(currentCount + FAQ_REVEAL_INCREMENT, items.length),
    );
  };

  return (
    <div>
      <div
        className={`grid grid-cols-1 gap-3 min-[560px]:gap-4 ${
          usesTwoColumns
            ? "min-[900px]:grid-cols-2 min-[900px]:gap-x-5"
            : "mx-auto max-w-[940px]"
        }`}
        id={listId}
      >
        {items.map((faq, index) => (
          <details
            className="group self-start overflow-hidden rounded-[16px] border border-cobalt-700/14 bg-cloud shadow-[0_8px_24px_rgba(3,19,47,0.045)] transition-[border-color,box-shadow] duration-200 hover:border-cobalt-600/32 hover:shadow-[0_12px_30px_rgba(13,92,184,0.08)] motion-reduce:transition-none"
            hidden={index >= visibleCount}
            key={`${faq.question}-${index}`}
          >
            <summary className="flex min-h-[66px] cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 text-[0.95rem] font-medium leading-6 text-navy-900 marker:hidden focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-electric min-[560px]:px-6 [&::-webkit-details-marker]:hidden">
              <span className="min-w-0 break-words">{faq.question}</span>
              <span
                aria-hidden="true"
                className="flex size-8 shrink-0 items-center justify-center rounded-full border border-cobalt-600/18 bg-ice/70 text-cobalt-600 transition-[background-color,border-color,transform] duration-200 group-hover:border-cobalt-600/32 group-open:rotate-180 group-open:bg-cobalt-600 group-open:text-white motion-reduce:transition-none"
              >
                <svg
                  aria-hidden="true"
                  className="size-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="m7 10 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </summary>
            <div className="border-t border-cobalt-700/10 bg-ice/45 px-5 py-5 min-[560px]:px-6">
              <p className="max-w-[820px] break-words text-sm leading-7 text-navy-700/78">
                {faq.answer}
              </p>
            </div>
          </details>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {Math.min(visibleCount, items.length)} of {items.length} questions.
      </p>

      {hasMoreQuestions ? (
        <button
          aria-controls={listId}
          className="mx-auto mt-8 flex min-h-12 items-center justify-center gap-2 rounded-xl border border-cobalt-600/25 bg-[linear-gradient(135deg,var(--blue-cobalt-700),var(--blue-cobalt-600))] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(13,92,184,0.2)] transition-[border-color,box-shadow,transform] duration-200 hover:border-sky/55 hover:shadow-[0_16px_34px_rgba(13,92,184,0.28)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-electric motion-safe:hover:-translate-y-0.5 motion-reduce:transition-none"
          onClick={loadMoreQuestions}
          type="button"
        >
          Load more questions
          <span aria-hidden="true">↓</span>
        </button>
      ) : null}
    </div>
  );
}
