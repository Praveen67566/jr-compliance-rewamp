"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import { linkTargetProps } from "@/lib/link-props";
import type { HomepageContent } from "@/lib/types";

type HeroProps = {
  hero: HomepageContent["hero"];
};

type FloatingCardProps = {
  card: HomepageContent["hero"]["supportingCards"][number] | undefined;
  className: string;
  children: ReactNode;
};

function FloatingCard({ card, className, children }: FloatingCardProps) {
  return card?.cta ? (
    <a className={className} href={card.cta.href} {...linkTargetProps(card.cta)}>
      {children}
    </a>
  ) : (
    <div className={className}>{children}</div>
  );
}

export function Hero({ hero }: HeroProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const activeWord = hero.rotatingWords[wordIndex] ?? hero.rotatingWords[0];
  const [businessCard, certificationCard, reachCard] = hero.supportingCards;

  useEffect(() => {
    if (hero.rotatingWords.length < 2) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % hero.rotatingWords.length);
    }, 2600);

    return () => window.clearInterval(interval);
  }, [hero.rotatingWords]);

  return (
    <section className="hero" id="top">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-orb hero-orb-one" aria-hidden="true" />
      <div className="hero-orb hero-orb-two" aria-hidden="true" />

      <div className="site-container mx-auto w-full max-w-[1320px] px-8 max-[820px]:px-[22px] max-[560px]:px-[18px] hero-layout">
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span className="status-dot" /> Compliance Consultants
          </div>
          <h1>
            {hero.prefix} <span className="hero-rotating-word">{activeWord}</span>
            <br />
            {hero.suffix}
          </h1>
          <p>{hero.description}</p>
          <a className="button button-light" href={hero.primaryCta.href} {...linkTargetProps(hero.primaryCta)}>
            {hero.primaryCta.label} <span aria-hidden="true">↗</span>
          </a>
          <a className="hero-scroll-cue" href="#services">
            <span className="scroll-dot" /> Explore services
          </a>
        </div>

        <div className="hero-visual" aria-label="JR Compliance specialists">
          <div className="hero-visual-glow" aria-hidden="true" />
          <div className="hero-photo-frame">
            <img src={hero.image} alt={hero.imageAlt} />
          </div>
          <FloatingCard card={businessCard} className="hero-floating-card business-card">
            <span className="card-icon">
              {businessCard?.icon || businessCard?.image ? (
                <img src={businessCard.icon ?? businessCard.image} alt={businessCard.iconAlt ?? businessCard.imageAlt ?? ""} />
              ) : (
                "↗"
              )}
            </span>
            <span>{businessCard?.title}</span>
          </FloatingCard>
          <FloatingCard card={certificationCard} className="hero-floating-card certification-card">
            <span className="mini-seal">
              {certificationCard?.icon || certificationCard?.image ? (
                <img src={certificationCard.icon ?? certificationCard.image} alt={certificationCard.iconAlt ?? certificationCard.imageAlt ?? ""} />
              ) : (
                "✓"
              )}
            </span>
            <div>
              <span>{certificationCard?.title}</span>
              <strong>{certificationCard?.description}</strong>
            </div>
          </FloatingCard>
          <FloatingCard card={reachCard} className="hero-floating-card reach-card">
            <span className="globe-mark">
              {reachCard?.icon || reachCard?.image ? (
                <img src={reachCard.icon ?? reachCard.image} alt={reachCard.iconAlt ?? reachCard.imageAlt ?? ""} />
              ) : (
                "◎"
              )}
            </span>
            <div>
              <span>{reachCard?.title}</span>
              <strong>{reachCard?.description}</strong>
            </div>
          </FloatingCard>
        </div>
      </div>
    </section>
  );
}
