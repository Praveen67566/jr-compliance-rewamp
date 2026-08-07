"use client";

import { type KeyboardEvent, useState } from "react";

import type { HomepageContent } from "@/lib/types";

type ServiceStackProps = {
  services: HomepageContent["services"];
};

export function ServiceStack({ services }: ServiceStackProps) {
  const [activeId, setActiveId] = useState(services.categories[0]?.id);
  const activeCategory =
    services.categories.find((category) => category.id === activeId) ?? services.categories[0];

  if (!activeCategory) {
    return null;
  }

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const lastIndex = services.categories.length - 1;
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = index === lastIndex ? 0 : index + 1;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = index === 0 ? lastIndex : index - 1;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = lastIndex;
    }

    if (nextIndex === null) {
      return;
    }

    event.preventDefault();
    const nextCategory = services.categories[nextIndex];
    setActiveId(nextCategory.id);
    document.getElementById(`${nextCategory.id}-tab`)?.focus();
  };

  return (
    <section className={`services-section services-section--${activeCategory.id} section`} id="services">
      <span className="services-ambient services-ambient--one" aria-hidden="true" />
      <span className="services-ambient services-ambient--two" aria-hidden="true" />
      <div className="container">
        <div className="section-heading services-heading">
          <div className="services-heading-copy">
            <span className="eyebrow">{services.eyebrow}</span>
            <h2>{services.title}</h2>
          </div>
          <div className="service-tab-shell">
            <div className="service-tab-list" role="tablist" aria-label="Compliance service categories">
              {services.categories.map((category, index) => (
                <button
                  aria-controls={`${category.id}-panel`}
                  aria-selected={activeCategory.id === category.id}
                  className={activeCategory.id === category.id ? "active" : ""}
                  id={`${category.id}-tab`}
                  key={category.id}
                  onClick={() => setActiveId(category.id)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  role="tab"
                  tabIndex={activeCategory.id === category.id ? 0 : -1}
                  type="button"
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="service-stage">
          <span className="service-stage-grid" aria-hidden="true" />
          <span className="service-stage-line" aria-hidden="true" />
          {services.categories.map((category) => {
            const isActive = category.id === activeCategory.id;
            const isGlobal = category.id === "global";

            return (
              <div
                aria-labelledby={`${category.id}-tab`}
                className={`service-grid service-grid--${category.id}`}
                hidden={!isActive}
                id={`${category.id}-panel`}
                key={category.id}
                role="tabpanel"
              >
                {isActive
                  ? category.services.map((service, index) => (
                      <a
                        className={`service-card ${isGlobal ? "service-card--global" : ""}`}
                        href={service.href}
                        key={service.label}
                        style={{ animationDelay: `${index * 90}ms` }}
                      >
                        <span className="service-card-top">
                          <span className="service-number">0{index + 1}</span>
                          <span className="service-card-pulse" aria-hidden="true" />
                        </span>
                        <span
                          className={`service-artwork ${
                            isGlobal ? "service-artwork--flag" : "service-artwork--regulatory"
                          }`}
                          aria-hidden="true"
                        >
                          {service.icon ? (
                            <img src={service.icon} alt="" />
                          ) : (
                            <span className="service-monogram">{service.shortLabel}</span>
                          )}
                        </span>
                        {isGlobal ? (
                          <span className="global-flag-motion" aria-hidden="true">
                            <span />
                            <span />
                            <span />
                          </span>
                        ) : null}
                        <span className="service-name">{service.label}</span>
                        <span className="service-arrow" aria-hidden="true">
                          ↗
                        </span>
                      </a>
                    ))
                  : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
