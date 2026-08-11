"use client";

import { type FocusEvent, useEffect, useRef } from "react";

import type { Logo } from "@/lib/types";

type TrustedBrandsMarqueeProps = {
  logos: Logo[];
};

const LOOP_SPEED = -0.054;
const PAUSE_EASING_MS = 340;

export function TrustedBrandsMarquee({ logos }: TrustedBrandsMarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstGroupRef = useRef<HTMLDivElement>(null);
  const logoRefs = useRef<Array<HTMLDivElement | null>>([]);
  const frameRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const speedRef = useRef(LOOP_SPEED);
  const lastTimestampRef = useRef<number | null>(null);
  const hoveringRef = useRef(false);
  const focusedRef = useRef(false);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const track = trackRef.current;
    const firstGroup = firstGroupRef.current;

    if (!marquee || !track || !firstGroup || logos.length === 0) {
      return undefined;
    }

    const updateLogoEmphasis = () => {
      const marqueeBounds = marquee.getBoundingClientRect();
      const center = marqueeBounds.left + marqueeBounds.width / 2;
      const maxDistance = Math.max(marqueeBounds.width * 0.56, 1);

      logoRefs.current.forEach((logo) => {
        if (!logo) {
          return;
        }

        const bounds = logo.getBoundingClientRect();
        const distance = Math.abs(bounds.left + bounds.width / 2 - center);
        const emphasis = Math.max(0, Math.min(1, 1 - distance / maxDistance));

        logo.style.setProperty("--logo-scale", `${0.84 + emphasis * 0.28}`);
        logo.style.setProperty("--logo-opacity", `${0.43 + emphasis * 0.57}`);
        logo.style.setProperty("--logo-blur", `${(1 - emphasis) * 1.15}px`);
        logo.style.setProperty("--logo-card-fill", `${0.045 + emphasis * 0.12}`);
        logo.style.setProperty("--logo-border-opacity", `${0.16 + emphasis * 0.55}`);
        logo.style.setProperty("--logo-glow", `${0.045 + emphasis * 0.44}`);
        logo.style.setProperty("--logo-image-opacity", `${0.6 + emphasis * 0.4}`);
        logo.style.setProperty("--logo-brightness", `${0.82 + emphasis * 0.18}`);
        logo.style.setProperty("--logo-lift", `${-3 * emphasis}px`);
        logo.style.zIndex = `${Math.round(emphasis * 10)}`;
      });
    };

    const getLoopWidth = () => {
      const gap = Number.parseFloat(window.getComputedStyle(track).gap) || 0;
      return firstGroup.getBoundingClientRect().width + gap;
    };

    const normalizeOffset = () => {
      const loopWidth = getLoopWidth();

      if (loopWidth <= 0 || offsetRef.current > -loopWidth) {
        return;
      }

      offsetRef.current = -((Math.abs(offsetRef.current) % loopWidth));
    };

    const updateTrack = () => {
      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      updateLogoEmphasis();
    };

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const animate = (timestamp: number) => {
      const previousTimestamp = lastTimestampRef.current ?? timestamp;
      const elapsed = Math.min(timestamp - previousTimestamp, 64);
      const targetSpeed = hoveringRef.current || focusedRef.current ? 0 : LOOP_SPEED;
      const easing = 1 - Math.exp(-elapsed / PAUSE_EASING_MS);

      speedRef.current += (targetSpeed - speedRef.current) * easing;
      offsetRef.current += speedRef.current * elapsed;
      normalizeOffset();
      updateTrack();

      lastTimestampRef.current = timestamp;
      frameRef.current = window.requestAnimationFrame(animate);
    };

    const stopAnimation = () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };

    const startAnimation = () => {
      if (motionQuery.matches || frameRef.current !== null) {
        return;
      }

      lastTimestampRef.current = null;
      frameRef.current = window.requestAnimationFrame(animate);
    };

    const handleMotionPreferenceChange = () => {
      if (motionQuery.matches) {
        stopAnimation();
        speedRef.current = 0;
      } else {
        startAnimation();
      }

      updateTrack();
    };

    const resizeObserver = new ResizeObserver(() => {
      normalizeOffset();
      updateTrack();
    });

    resizeObserver.observe(marquee);
    resizeObserver.observe(firstGroup);
    motionQuery.addEventListener("change", handleMotionPreferenceChange);
    updateTrack();
    startAnimation();

    return () => {
      stopAnimation();
      resizeObserver.disconnect();
      motionQuery.removeEventListener("change", handleMotionPreferenceChange);
    };
  }, [logos]);

  const pauseForPointer = () => {
    hoveringRef.current = true;
  };

  const resumeForPointer = () => {
    hoveringRef.current = false;
  };

  const pauseForFocus = () => {
    focusedRef.current = true;
  };

  const resumeAfterFocus = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      focusedRef.current = false;
    }
  };

  return (
    <section className="logo-strip" aria-label="Trusted client brands">
      <div className="logo-strip-label">Trusted by leading brands</div>
      <div
        className="logo-marquee"
        onBlurCapture={resumeAfterFocus}
        onFocusCapture={pauseForFocus}
        onPointerEnter={pauseForPointer}
        onPointerLeave={resumeForPointer}
        ref={marqueeRef}
      >
        <div className="logo-marquee-track" ref={trackRef}>
          <div className="logo-marquee-group" ref={firstGroupRef}>
            {logos.map((logo, index) => (
              <div
                className="brand-logo"
                key={logo.name}
                ref={(element) => {
                  logoRefs.current[index] = element;
                }}
              >
                {logo.href ? (
                  <a href={logo.href} target="_blank" rel="noreferrer" aria-label={`${logo.name} website`}>
                    <img src={logo.src} alt={logo.name} />
                  </a>
                ) : (
                  <img src={logo.src} alt={logo.name} />
                )}
              </div>
            ))}
          </div>

          <div className="logo-marquee-group" aria-hidden="true">
            {logos.map((logo, index) => (
              <div
                className="brand-logo brand-logo--clone"
                key={`${logo.name}-clone`}
                ref={(element) => {
                  logoRefs.current[logos.length + index] = element;
                }}
              >
                <img src={logo.src} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
