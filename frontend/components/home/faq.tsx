"use client";

import { useState } from "react";

import type { HomepageContent } from "@/lib/types";

type FaqProps = {
  faqs: HomepageContent["faqs"];
};

export function Faq({ faqs }: FaqProps) {
  const [activeCategoryId, setActiveCategoryId] = useState(faqs.categories[0]?.id);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const activeCategory =
    faqs.categories.find((category) => category.id === activeCategoryId) ?? faqs.categories[0];

  if (!activeCategory) {
    return null;
  }

  return (
    <section className="faq-section section" id="faq">
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
                onClick={() => {
                  setActiveCategoryId(category.id);
                  setOpenQuestion(null);
                }}
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
