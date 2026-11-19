"use client";

import { motionPreference } from "@/lib/motion-preference";

import { type FocusEvent, useCallback, useEffect, useRef, useState } from "react";

import { linkTargetProps } from "@/lib/link-props";
import type { Link } from "@/lib/types";

type RouteClosingCtaProps = {
  cta: Link;
  description: string;
  eyebrow?: string;
  id?: string;
  title: string;
};

export function RouteClosingCta({
  cta,
  description,
  eyebrow = "Let's Talk Compliance",
  id,
  title,
}: RouteClosingCtaProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const firstFrameRef = useRef<number | null>(null);
  const secondFrameRef = useRef<number | null>(null);
  const revealCycleRef = useRef(0);
  const isInViewportRef = useRef(false);
  const prefersReducedMotionRef = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);

  const cancelScheduledReveal = useCallback(() => {
    revealCycleRef.current += 1;

    if (firstFrameRef.current !== null) {
      window.cancelAnimationFrame(firstFrameRef.current);
      firstFrameRef.current = null;
    }

    if (secondFrameRef.current !== null) {
      window.cancelAnimationFrame(secondFrameRef.current);
      secondFrameRef.current = null;
    }
  }, []);

  const showFinalState = useCallback(() => {
    cancelScheduledReveal();
    setIsInView(true);
  }, [cancelScheduledReveal]);

  const primeReveal = useCallback(() => {
    cancelScheduledReveal();
    setIsInView(false);
  }, [cancelScheduledReveal]);

  const replayReveal = useCallback(() => {
    cancelScheduledReveal();
    const revealCycle = revealCycleRef.current;

    setIsInView(false);

    firstFrameRef.current = window.requestAnimationFrame(() => {
      firstFrameRef.current = null;
      secondFrameRef.current = window.requestAnimationFrame(() => {
        secondFrameRef.current = null;

        if (
          revealCycleRef.current !== revealCycle ||
          !isInViewportRef.current ||
          prefersReducedMotionRef.current
        ) {
          return;
        }

        setIsInView(true);
      });
    });
  }, [cancelScheduledReveal]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const motionQuery = motionPreference("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | null = null;

    const applyMotionPreference = () => {
      prefersReducedMotionRef.current = motionQuery.matches;

      if (motionQuery.matches || !("IntersectionObserver" in window)) {
        setIsReady(false);
        showFinalState();
        return;
      }

      setIsReady(true);

      if (isInViewportRef.current) {
        replayReveal();
      } else {
        primeReveal();
      }
    };

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry) {
            return;
          }

          isInViewportRef.current = entry.isIntersecting;

          if (prefersReducedMotionRef.current) {
            showFinalState();
            return;
          }

          if (section.contains(document.activeElement)) {
            showFinalState();
            return;
          }

          if (entry.isIntersecting) {
            replayReveal();
          } else if (!section.contains(document.activeElement)) {
            primeReveal();
          }
        },
        {
          rootMargin: "-12% 0px -12% 0px",
          threshold: 0,
        },
      );

      observer.observe(section);
    }

    motionQuery.addEventListener("change", applyMotionPreference);
    applyMotionPreference();

    return () => {
      observer?.disconnect();
      motionQuery.removeEventListener("change", applyMotionPreference);
      cancelScheduledReveal();
    };
  }, [cancelScheduledReveal, primeReveal, replayReveal, showFinalState]);

  const handleFocus = () => {
    setHasFocus(true);
    showFinalState();
  };

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
      return;
    }

    setHasFocus(false);

    if (!isInViewportRef.current && !prefersReducedMotionRef.current) {
      setIsReady(true);
      primeReveal();
    }
  };

  const sectionClasses = [
    "route-closing-cta",
    isReady ? "is-reveal-ready" : "",
    isInView ? "is-in-view" : "",
    hasFocus ? "is-focus-within" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      className={sectionClasses}
      id={id}
      onBlurCapture={handleBlur}
      onFocusCapture={handleFocus}
      ref={sectionRef}
    >
      <div className="route-closing-surface" aria-hidden="true" />
      <div className="route-closing-grid" aria-hidden="true" />
      <div className="route-closing-chevron-mark" aria-hidden="true">
        <span className="route-closing-chevron route-closing-chevron--one" />
        <span className="route-closing-chevron route-closing-chevron--two" />
      </div>
      <div className="site-container mx-auto w-full max-w-[1320px] px-8 max-[820px]:px-[22px] max-[560px]:px-[18px] route-closing-inner">
        <div>
          <span className="eyebrow eyebrow-light">{eyebrow}</span>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <a className="button button-light route-closing-button" href={cta.href} {...linkTargetProps(cta)}>
          {cta.label} <span className="route-closing-button-arrow" aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
