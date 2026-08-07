"use client";

import { useEffect, useState } from "react";

import type { HomepageContent } from "@/lib/types";

type HeroProps = {
  hero: HomepageContent["hero"];
};

export function Hero({ hero }: HeroProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const activeWord = hero.rotatingWords[wordIndex] ?? hero.rotatingWords[0];

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

      <div className="container hero-layout">
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
          <a className="button button-light" href={hero.primaryCta.href}>
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
          <div className="hero-floating-card business-card">
            <span className="card-icon">↗</span>
            <span>{hero.supportingCards[0]?.title}</span>
          </div>
          <div className="hero-floating-card certification-card">
            <span className="mini-seal">✓</span>
            <div>
              <span>{hero.supportingCards[1]?.title}</span>
              <strong>{hero.supportingCards[1]?.description}</strong>
            </div>
          </div>
          <div className="hero-floating-card reach-card">
            <span className="globe-mark">◎</span>
            <div>
              <span>{hero.supportingCards[2]?.title}</span>
              <strong>{hero.supportingCards[2]?.description}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
