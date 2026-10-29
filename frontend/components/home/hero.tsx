"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { ConsultationForm } from "@/components/forms/consultation-form";
import { RotatingEarthBackground } from "@/components/visuals/rotating-earth-background";
import { linkTargetProps } from "@/lib/link-props";
import type { HomepageContent, LeadFormSettings } from "@/lib/types";

type HeroProps = {
  hero: HomepageContent["hero"];
  leadForm: LeadFormSettings;
  pageTitle: string;
  showConsultationForm?: boolean;
};

type FloatingCardProps = {
  card: HomepageContent["hero"]["supportingCards"][number] | undefined;
  className: string;
  children: ReactNode;
};

type WordPhase = "deleting" | "holding" | "typing";

const wordHoldDuration = 1800;
const wordDeleteDuration = 52;
const wordTypeDuration = 84;

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}

function useTypedRotatingWord(words: string[], prefersReducedMotion: boolean) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayedWord, setDisplayedWord] = useState(() => words[0] ?? "");
  const [phase, setPhase] = useState<WordPhase>("holding");

  useEffect(() => {
    const firstWord = words[0] ?? "";

    if (prefersReducedMotion || words.length < 2) {
      setWordIndex(0);
      setDisplayedWord(firstWord);
      setPhase("holding");
      return undefined;
    }

    const activeWord = words[wordIndex] ?? firstWord;

    if (phase === "holding") {
      const timeout = window.setTimeout(() => setPhase("deleting"), wordHoldDuration);
      return () => window.clearTimeout(timeout);
    }

    if (phase === "deleting") {
      if (!displayedWord) {
        setWordIndex((current) => (current + 1) % words.length);
        setPhase("typing");
        return undefined;
      }

      const timeout = window.setTimeout(() => {
        setDisplayedWord((current) => current.slice(0, -1));
      }, wordDeleteDuration);

      return () => window.clearTimeout(timeout);
    }

    if (displayedWord.length >= activeWord.length) {
      setPhase("holding");
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setDisplayedWord(activeWord.slice(0, displayedWord.length + 1));
    }, wordTypeDuration);

    return () => window.clearTimeout(timeout);
  }, [displayedWord, phase, prefersReducedMotion, wordIndex, words]);

  const activeWord = words[wordIndex] ?? words[0] ?? "";

  return {
    activeWord,
    displayedWord: prefersReducedMotion ? activeWord : displayedWord,
  };
}

function FloatingCard({ card, className, children }: FloatingCardProps) {
  return card?.cta ? (
    <a className={className} href={card.cta.href} {...linkTargetProps(card.cta)}>
      {children}
    </a>
  ) : (
    <div className={className}>{children}</div>
  );
}

export function Hero({ hero, leadForm, pageTitle, showConsultationForm = true }: HeroProps) {
  const rotatingWords = useMemo(() => hero.rotatingWords.filter(Boolean), [hero.rotatingWords]);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { activeWord, displayedWord } = useTypedRotatingWord(rotatingWords, prefersReducedMotion);
  const [businessCard, certificationCard, reachCard] = hero.supportingCards;

  return (
    <section className="hero" id="top">
      <RotatingEarthBackground variant="home" />
      <div className="hero-grid" aria-hidden="true" />

      <div className="site-container mx-auto w-full max-w-[1320px] px-8 max-[820px]:px-[22px] max-[560px]:px-[18px] hero-layout">
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span className="status-dot" /> Compliance Consultants
          </div>
          <h1>
            {hero.prefix}{" "}
            <span className="hero-rotating-slot mb-[0.1em] mt-[0.1em]">
              <span className="hero-rotating-word-sizer" aria-hidden="true">
                {hero.rotatingWords.map((word, index) => (
                  <span key={`${word}-${index}`}>{word}</span>
                ))}
              </span>
              <span className="hero-rotating-word" aria-hidden="true">{displayedWord}</span>
              <span className="sr-only">{activeWord}</span>
            </span>
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

        {showConsultationForm && leadForm.enabled ? (
          <div className="relative z-[2] mx-auto w-full max-w-[560px] self-center">
            <ConsultationForm pageTitle={pageTitle} settings={leadForm} />
          </div>
        ) : (
        <div
          className="hero-visual max-[561px]:grid max-[561px]:min-h-0! max-[561px]:grid-cols-2 max-[561px]:gap-3"
          aria-label="JR Compliance specialists"
        >
          <div className="hero-visual-glow" aria-hidden="true" />
          <div className="hero-photo-frame max-[561px]:relative! max-[561px]:inset-auto! max-[561px]:order-2 max-[561px]:col-span-2 max-[561px]:transform-none!">
            <img className="max-[561px]:aspect-auto! max-[561px]:h-auto! max-[561px]:object-contain!" src={hero.image} alt={hero.imageAlt} />
          </div>
          <FloatingCard
            card={businessCard}
            className="hero-floating-card business-card max-[561px]:relative! max-[561px]:inset-auto! max-[561px]:order-1 max-[561px]:col-span-2 max-[561px]:justify-self-start max-[561px]:animate-none!"
          >
            <span className="card-icon">
              {businessCard?.icon || businessCard?.image ? (
                <img src={businessCard.icon ?? businessCard.image} alt={businessCard.iconAlt ?? businessCard.imageAlt ?? ""} />
              ) : (
                "↗"
              )}
            </span>
            <span>{businessCard?.title}</span>
          </FloatingCard>
          <FloatingCard
            card={certificationCard}
            className="hero-floating-card certification-card max-[561px]:relative! max-[561px]:inset-auto! max-[561px]:order-3 max-[561px]:max-w-none! max-[561px]:gap-2! max-[561px]:animate-none!"
          >
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
          <FloatingCard
            card={reachCard}
            className="hero-floating-card reach-card max-[561px]:relative! max-[561px]:inset-auto! max-[561px]:order-4 max-[561px]:max-w-none! max-[561px]:gap-2! max-[561px]:animate-none!"
          >
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
        )}
      </div>
    </section>
  );
}
