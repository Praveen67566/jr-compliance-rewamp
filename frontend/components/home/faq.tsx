"use client";

import { type FocusEvent, useEffect, useState } from "react";

import type { HomepageContent } from "@/lib/types";

type FaqProps = {
  faqs: HomepageContent["faqs"];
};

type FaqCategoryIdentifier = Pick<HomepageContent["faqs"]["categories"][number], "id">;

export const FAQ_CATEGORY_ROTATION_MS = 2_000;

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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionPreferenceChange = () => setPrefersReducedMotion(motionQuery.matches);

    handleMotionPreferenceChange();
    motionQuery.addEventListener("change", handleMotionPreferenceChange);

    return () => motionQuery.removeEventListener("change", handleMotionPreferenceChange);
  }, []);

  useEffect(() => {
    if (
      faqs.categories.length < 2 ||
      isFocused ||
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
  }, [activeCategoryId, faqs.categories, isFocused, openQuestion, prefersReducedMotion]);

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
          <h2>{faqs.title}</h2>
          {faqs.description ? <p>{faqs.description}</p> : null}
          <div className="faq-category-list" role="tablist" aria-label="Frequently asked question categories">
            {faqs.categories.map((category) => (
              <button
                className={activeCategory.id === category.id ? "active" : ""}
                key={category.id}
                onClick={() => selectCategory(category.id)}
                role="tab"
                aria-selected={activeCategory.id === category.id}
                type="button"
              >
                {category.icon ? <img src={category.icon} alt="" /> : null}
                {category.title}
              </button>
            ))}
          </div>
        </div>

        <div className="faq-list" role="tabpanel">
          {activeCategory.items.map((item, index) => {
            const id = `${activeCategory.id}-${index}`;
            const isOpen = openQuestion === id;

            return (
              <article className={`faq-item ${isOpen ? "is-open" : ""}`} key={item.question}>
                <button
                  aria-controls={`${id}-answer`}
                  aria-expanded={isOpen}
                  onClick={() => setOpenQuestion(isOpen ? null : id)}
                  type="button"
                >
                  <span>{item.question}</span>
                  <span className="faq-toggle" aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
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
