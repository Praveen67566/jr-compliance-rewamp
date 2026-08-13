"use client";

import { type FocusEvent, type ReactNode, useCallback, useEffect, useRef, useState } from "react";

type KeychainRevealSectionProps = {
  children: ReactNode;
  className: string;
  itemCount: number;
  labelledBy: string;
};

const SETTLE_DURATION = 1_100;

export function KeychainRevealSection({ children, className, itemCount, labelledBy }: KeychainRevealSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const firstFrameRef = useRef<number | null>(null);
  const secondFrameRef = useRef<number | null>(null);
  const settleTimerRef = useRef<number | null>(null);
  const revealCycleRef = useRef(0);
  const isInViewportRef = useRef(false);
  const hasFocusRef = useRef(false);
  const prefersReducedMotionRef = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const [isSettled, setIsSettled] = useState(false);
  const [isSettling, setIsSettling] = useState(false);

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

    if (settleTimerRef.current !== null) {
      window.clearTimeout(settleTimerRef.current);
      settleTimerRef.current = null;
    }
  }, []);

  const showFinalState = useCallback(() => {
    cancelScheduledReveal();
    setIsSettling(false);
    setIsSettled(true);
  }, [cancelScheduledReveal]);

  const primeCards = useCallback(() => {
    cancelScheduledReveal();
    setIsSettling(false);
    setIsSettled(false);
  }, [cancelScheduledReveal]);

  const replayCards = useCallback(() => {
    cancelScheduledReveal();
    const revealCycle = revealCycleRef.current;

    setIsSettling(false);
    setIsSettled(false);

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

        setIsSettling(true);
        setIsSettled(true);

        settleTimerRef.current = window.setTimeout(() => {
          if (revealCycleRef.current === revealCycle) {
            setIsSettling(false);
          }

          settleTimerRef.current = null;
        }, SETTLE_DURATION);
      });
    });
  }, [cancelScheduledReveal]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
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
        replayCards();
      } else if (!hasFocusRef.current) {
        primeCards();
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

          if (hasFocusRef.current) {
            showFinalState();
            return;
          }

          if (entry.isIntersecting) {
            replayCards();
          } else if (!hasFocusRef.current) {
            primeCards();
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
  }, [cancelScheduledReveal, primeCards, replayCards, showFinalState]);

  const handleFocus = () => {
    hasFocusRef.current = true;
    showFinalState();
  };

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
      return;
    }

    hasFocusRef.current = false;

    if (!isInViewportRef.current && !prefersReducedMotionRef.current) {
      setIsReady(true);
      primeCards();
    }
  };

  const revealClasses = [
    className,
    "keychain-reveal",
    isReady ? "is-reveal-ready" : "",
    isSettled ? "is-settled" : "",
    isSettling ? "is-settling" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      aria-labelledby={labelledBy}
      className={revealClasses}
      data-keychain-count={itemCount}
      onBlurCapture={handleBlur}
      onFocusCapture={handleFocus}
      ref={sectionRef}
    >
      <div className="keychain-motif" aria-hidden="true">
        <span className="keychain-ring" />
        <span className="keychain-tag keychain-tag--back" />
        <span className="keychain-tag keychain-tag--front" />
      </div>
      {children}
    </section>
  );
}
