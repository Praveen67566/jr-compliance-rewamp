"use client";

import { type FocusEvent, useEffect, useState } from "react";

import type { Logo } from "@/lib/types";

type TrustedBrandsMarqueeProps = {
  logos: Logo[];
};

type LogoSlot = {
  logos: Logo[];
  slotIndex: number;
};

const LOGO_SWAP_INTERVAL = 2_000;

function buildLogoSlots(logos: Logo[], slotCount: number): LogoSlot[] {
  const slots = Array.from({ length: Math.min(slotCount, logos.length) }, (_, slotIndex) => ({
    logos: [] as Logo[],
    slotIndex,
  }));

  logos.forEach((logo, index) => {
    slots[index % slots.length]?.logos.push(logo);
  });

  return slots;
}

function LogoImage({ logo }: { logo: Logo }) {
  return <img src={logo.src} alt={logo.name} />;
}

function ActiveLogo({ logo, staggerMs }: { logo: Logo; staggerMs: number }) {
  return (
    <span className="brand-logo-layer" style={{ animationDelay: `${staggerMs}ms` }}>
      {logo.href ? (
        <a href={logo.href} target="_blank" rel="noreferrer" aria-label={`${logo.name} website`}>
          <LogoImage logo={logo} />
        </a>
      ) : (
        <LogoImage logo={logo} />
      )}
    </span>
  );
}

function LogoRail({ className, phase, slots }: { className: string; phase: number; slots: LogoSlot[] }) {
  return (
    <div className={className}>
      {slots.map((slot, slotIndex) => {
        const logo = slot.logos[phase % slot.logos.length];

        return (
          <div className="brand-slot-group" key={slot.slotIndex}>
            <div className="brand-logo-slot">
              <ActiveLogo key={`${phase}-${logo.name}`} logo={logo} staggerMs={slotIndex * 40} />
            </div>
            {slotIndex < slots.length - 1 ? <span className="brand-logo-separator" /> : null}
          </div>
        );
      })}
    </div>
  );
}

function StaticLogoList({ logos }: { logos: Logo[] }) {
  return (
    <div className="brand-logo-static-list" aria-label="Trusted brand websites">
      {logos.map((logo, index) => (
        <span className="brand-logo-static-item" key={`${logo.name}-${index}`}>
          {logo.href ? (
            <a href={logo.href} target="_blank" rel="noreferrer" aria-label={`${logo.name} website`}>
              <LogoImage logo={logo} />
            </a>
          ) : (
            <LogoImage logo={logo} />
          )}
        </span>
      ))}
    </div>
  );
}

export function TrustedBrandsMarquee({ logos }: TrustedBrandsMarqueeProps) {
  const [phase, setPhase] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionPreferenceChange = () => setPrefersReducedMotion(motionQuery.matches);

    handleMotionPreferenceChange();
    motionQuery.addEventListener("change", handleMotionPreferenceChange);

    return () => motionQuery.removeEventListener("change", handleMotionPreferenceChange);
  }, []);

  useEffect(() => {
    if (!logos.length || isFocused || isHovered || prefersReducedMotion) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setPhase((currentPhase) => (currentPhase + 1) % logos.length);
    }, LOGO_SWAP_INTERVAL);

    return () => window.clearInterval(interval);
  }, [isFocused, isHovered, logos.length, prefersReducedMotion]);

  if (!logos.length) {
    return null;
  }

  const desktopSlots = buildLogoSlots(logos, 5);
  const mobileSlots = buildLogoSlots(logos, 3);
  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsFocused(false);
    }
  };

  return (
    <section className="logo-strip" aria-labelledby="trusted-brands-heading">
      <div className="site-container mx-auto w-full max-w-[1320px] px-8 max-[820px]:px-[22px] max-[560px]:px-[18px] logo-strip-inner">
        <h2 className="logo-strip-label" id="trusted-brands-heading">
          Trusted by leading brands
        </h2>

        <div
          className="logo-marquee"
          onBlurCapture={handleBlur}
          onFocusCapture={() => setIsFocused(true)}
          onPointerEnter={() => setIsHovered(true)}
          onPointerLeave={() => setIsHovered(false)}
        >
          <LogoRail className="brand-logo-rail brand-logo-rail--desktop" phase={phase} slots={desktopSlots} />
          <LogoRail className="brand-logo-rail brand-logo-rail--mobile" phase={phase} slots={mobileSlots} />
          <StaticLogoList logos={logos} />
        </div>
      </div>
    </section>
  );
}
