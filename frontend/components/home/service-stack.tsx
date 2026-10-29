"use client";

import { type KeyboardEvent, useEffect, useRef, useState } from "react";

import { linkTargetProps } from "@/lib/link-props";
import type { HomepageContent } from "@/lib/types";

type ServiceStackProps = {
  services: HomepageContent["services"];
};

const MOBILE_SLIDE_INTERVAL = 2000;

export function ServiceStack({ services }: ServiceStackProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(services.categories[0]?.id);
  const activeCategory =
    services.categories.find((category) => category.id === activeId) ?? services.categories[0];
  const serviceCount = activeCategory?.services.length ?? 0;

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider || serviceCount <= 2) {
      return;
    }

    const motionQuery = window.matchMedia("(max-width: 560px) and (prefers-reduced-motion: no-preference)");
    let isVisible = !("IntersectionObserver" in window);
    let isHovered = false;
    let isInteracting = false;
    let direction = 1;
    let interval: number | undefined;

    const stopSliding = () => window.clearInterval(interval);
    const updateSliding = () => {
      stopSliding();

      if (!motionQuery.matches || !isVisible || isHovered || isInteracting
        || document.hidden || slider.contains(document.activeElement)) {
        return;
      }

      interval = window.setInterval(() => {
        const cards = slider.querySelectorAll<HTMLElement>(".service-card");

        if (cards.length <= 2) return;

        const step = cards[1].offsetLeft - cards[0].offsetLeft;
        const currentIndex = Math.round(slider.scrollLeft / step);
        const lastIndex = cards.length - 2;

        if (currentIndex >= lastIndex) direction = -1;
        if (currentIndex <= 0) direction = 1;

        const nextIndex = Math.max(0, Math.min(currentIndex + direction, lastIndex));
        slider.scrollTo({ left: cards[nextIndex].offsetLeft - cards[0].offsetLeft });
      }, MOBILE_SLIDE_INTERVAL);
    };

    const observer = "IntersectionObserver" in window ? new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
      updateSliding();
    }, { threshold: 0.5 }) : undefined;
    const handlePointerEnter = (event: PointerEvent) => {
      isHovered = event.pointerType === "mouse";
      updateSliding();
    };
    const handlePointerLeave = () => { isHovered = false; updateSliding(); };
    const handlePointerDown = () => { isInteracting = true; updateSliding(); };
    const handlePointerUp = () => {
      if (isInteracting) {
        isInteracting = false;
        updateSliding();
      }
    };

    observer?.observe(slider);
    motionQuery.addEventListener("change", updateSliding);
    document.addEventListener("visibilitychange", updateSliding);
    slider.addEventListener("focusin", updateSliding);
    slider.addEventListener("focusout", updateSliding);
    slider.addEventListener("pointerenter", handlePointerEnter);
    slider.addEventListener("pointerleave", handlePointerLeave);
    slider.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
    updateSliding();

    return () => {
      stopSliding();
      observer?.disconnect();
      motionQuery.removeEventListener("change", updateSliding);
      document.removeEventListener("visibilitychange", updateSliding);
      slider.removeEventListener("focusin", updateSliding);
      slider.removeEventListener("focusout", updateSliding);
      slider.removeEventListener("pointerenter", handlePointerEnter);
      slider.removeEventListener("pointerleave", handlePointerLeave);
      slider.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [activeCategory?.id, serviceCount]);

  if (!activeCategory) {
    return null;
  }

  const selectCategory = (id: string) => {
    sliderRef.current?.scrollTo({ left: 0, behavior: "instant" });
    setActiveId(id);
  };

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
    selectCategory(nextCategory.id);
    document.getElementById(`${nextCategory.id}-tab`)?.focus();
  };

  return (
    <section className={`services-section services-section--${activeCategory.id} section`} id="services">
      <span className="services-ambient services-ambient--one" aria-hidden="true" />
      <span className="services-ambient services-ambient--two" aria-hidden="true" />
      <div className="site-container mx-auto w-full max-w-[1320px] px-8 max-[820px]:px-[22px] max-[560px]:px-[18px]">
        <div className="section-heading services-heading">
            <div className="services-heading-copy">
              <span className="eyebrow">{services.eyebrow}</span>
              <h2>{services.title}</h2>
              {services.description ? <p>{services.description}</p> : null}
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
                  onClick={() => selectCategory(category.id)}
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
                className={`service-grid service-grid--${category.id} ${isActive
                  ? "max-[561px]:-mx-1 max-[561px]:flex! max-[561px]:gap-[18px]! max-[561px]:overflow-x-auto max-[561px]:overscroll-x-contain max-[561px]:snap-x max-[561px]:snap-mandatory max-[561px]:scroll-px-1 max-[561px]:scroll-smooth max-[561px]:px-1 max-[561px]:py-3 max-[561px]:[scrollbar-width:none] max-[561px]:[&::-webkit-scrollbar]:hidden max-[561px]:motion-reduce:scroll-auto"
                  : "max-[561px]:hidden!"}`}
                hidden={!isActive}
                id={`${category.id}-panel`}
                key={category.id}
                ref={isActive ? sliderRef : undefined}
                role="tabpanel"
              >
                {isActive
                  ? category.services.map((service, index) => (
                      <a
                        className={`service-card max-[561px]:basis-[calc(50%_-_9px)] max-[561px]:shrink-0 max-[561px]:snap-start max-[561px]:motion-safe:animate-[service-mobile-slide-in_500ms_cubic-bezier(0.22,1,0.36,1)_backwards]! max-[561px]:motion-reduce:animate-none! ${isGlobal ? "service-card--global" : ""}`}
                        href={service.href}
                        key={service.label}
                        {...linkTargetProps(service)}
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
                        <span className="service-name min-h-[3.12em] max-[560px]:min-h-[4.16em]">
                          {service.label}
                        </span>
                        {service.summary ? <span className="service-summary">{service.summary}</span> : null}
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
