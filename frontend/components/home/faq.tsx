"use client";

import { PreferenceIcon } from "@/components/accessibility/preference-icons";
import { motionPreference } from "@/lib/motion-preference";

import { type FocusEvent, useEffect, useState } from "react";

import type { HomepageContent } from "@/lib/types";

type FaqProps = {
  faqs: HomepageContent["faqs"];
};

type FaqCategoryIdentifier = Pick<HomepageContent["faqs"]["categories"][number], "id">;

export const FAQ_CATEGORY_ROTATION_MS = 60_000;

export function nextFaqCategoryId(
  categories: readonly FaqCategoryIdentifier[],
  activeCategoryId: string | undefined,
): string | undefined {
  if (!categories.length) {
    return undefined;
  }

  const activeIndex = categories.findIndex((category) => category.id === activeCategoryId);
  return categories[activeIndex < 0 ? 0 : (activeIndex + 1) % categories.length]?.id;
}

export function Faq({ faqs }: FaqProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string | undefined>(
    faqs.categories[0]?.id,
  );
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [rotationPaused, setRotationPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = motionPreference("(prefers-reduced-motion: reduce)");
    const handleMotionPreferenceChange = () => setPrefersReducedMotion(motionQuery.matches);

    handleMotionPreferenceChange();
    motionQuery.addEventListener("change", handleMotionPreferenceChange);

    return () => motionQuery.removeEventListener("change", handleMotionPreferenceChange);
  }, []);

  useEffect(() => {
    if (
      faqs.categories.length < 2 ||
      isFocused ||
      rotationPaused ||
      openQuestion !== null ||
      prefersReducedMotion
    ) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setActiveCategoryId((currentId) => nextFaqCategoryId(faqs.categories, currentId));
      setOpenQuestion(null);
    }, FAQ_CATEGORY_ROTATION_MS);

    return () => window.clearTimeout(timeout);
  }, [activeCategoryId, faqs.categories, isFocused, rotationPaused, openQuestion, prefersReducedMotion]);

  const activeCategory =
    faqs.categories.find((category) => category.id === activeCategoryId) ?? faqs.categories[0];

  if (!activeCategory) {
    return null;
  }

  const selectCategory = (categoryId: string) => {
    setActiveCategoryId(categoryId);
    setOpenQuestion(null);
  };

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsFocused(false);
    }
  };

  return (
    <section
      className="faq-section section"
      id="faq"
      onBlurCapture={handleBlur}
      onFocusCapture={() => setIsFocused(true)}
    >
      <span className="faq-network-orbit" aria-hidden="true" />
      <div className="site-container mx-auto w-full max-w-[1320px] px-8 max-[820px]:px-[22px] max-[560px]:px-[18px] faq-layout">
        <div className="faq-intro">
          {faqs.eyebrow ? <span className="eyebrow">{faqs.eyebrow}</span> : null}
          <h2 id="home-faq-heading">{faqs.title}</h2>
          {faqs.description ? <p>{faqs.description}</p> : null}
          <div className="faq-category-list" role="tablist" aria-orientation="vertical" aria-label="Frequently asked question categories">
            {faqs.categories.map((category, index) => (
              <button
                className={activeCategory.id === category.id ? "active" : ""}
                key={category.id}
                onClick={() => selectCategory(category.id)}
                role="tab"
                id={`faq-tab-${category.id}`}
                aria-controls="home-faq-panel"
                tabIndex={activeCategory.id === category.id ? 0 : -1}
                onKeyDown={(event) => {
                  const length = faqs.categories.length;
                  const next = event.key === "ArrowDown" || event.key === "ArrowRight" ? (index + 1) % length
                    : event.key === "ArrowUp" || event.key === "ArrowLeft" ? (index - 1 + length) % length
                    : event.key === "Home" ? 0 : event.key === "End" ? length - 1 : -1;
                  if (next < 0) return;
                  event.preventDefault();
                  selectCategory(faqs.categories[next].id);
                  document.getElementById(`faq-tab-${faqs.categories[next].id}`)?.focus();
                }}
                aria-selected={activeCategory.id === category.id}
                type="button"
              >
                {category.icon ? <img src={category.icon} alt="" /> : null}
                {category.title}
              </button>
            ))}
          </div>
          {faqs.categories.length > 1 ? (
            <button className="mt-5 inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full border border-sky/30 bg-navy-950/35 px-3.5 py-2 text-xs font-semibold text-sky transition hover:border-sky/60 hover:bg-sky/10" type="button" aria-label={`${rotationPaused ? "Resume" : "Pause"} automatic FAQ categories`} aria-pressed={rotationPaused} onClick={() => setRotationPaused((paused) => !paused)}>
              <PreferenceIcon name={rotationPaused ? "play" : "pause"} className="size-3.5" />
              {rotationPaused ? "Resume rotation" : "Pause rotation"}
            </button>
          ) : null}
        </div>

        <div className="faq-list" role="tabpanel" id="home-faq-panel" aria-labelledby={`faq-tab-${activeCategory.id}`} tabIndex={0}>
          {activeCategory.items.map((item, index) => {
            const id = `${activeCategory.id}-${index}`;
            const isOpen = openQuestion === id;

            return (
              <article className={`faq-item ${isOpen ? "is-open" : ""}`} key={item.question}>
                <h3 className="m-0 font-sans"><button
                  className="faq-question"
                  aria-controls={`${id}-answer`}
                  aria-expanded={isOpen}
                  onClick={() => setOpenQuestion(isOpen ? null : id)}
                  type="button"
                >
                  <span>{item.question}</span>
                  <span className="faq-toggle" aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button></h3>
                <div className="faq-answer" id={`${id}-answer`} hidden={!isOpen}>
                  <p>{item.answer}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
