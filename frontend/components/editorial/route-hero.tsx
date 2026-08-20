import { ConsultationForm } from "@/components/forms/consultation-form";
import { linkTargetProps } from "@/lib/link-props";
import type { LeadFormSettings, Link } from "@/lib/types";

type RouteHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  cta?: Link;
  image?: string;
  imageAlt?: string;
  leadForm: LeadFormSettings;
  pageTitle: string;
  showConsultationForm?: boolean;
};

/** Shared bluefield page opening for the editorial routes. */
export function RouteHero({
  eyebrow,
  title,
  description,
  cta,
  image,
  imageAlt,
  leadForm,
  pageTitle,
  showConsultationForm = true,
}: RouteHeroProps) {
  return (
    <section className="route-hero" id="top">
      <div className="route-hero-grid" aria-hidden="true" />
      <div className="route-hero-orbit route-hero-orbit--one" aria-hidden="true" />
      <div className="route-hero-orbit route-hero-orbit--two" aria-hidden="true" />

      <div className="site-container mx-auto w-full max-w-[1320px] px-8 max-[820px]:px-[22px] max-[560px]:px-[18px] route-hero-layout">
        <div className="route-hero-copy">
          <span className="eyebrow eyebrow-light">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
          {cta ? (
            <a className="button button-light" href={cta.href} {...linkTargetProps(cta)}>
              {cta.label} <span aria-hidden="true">↗</span>
            </a>
          ) : null}
        </div>

        {showConsultationForm && leadForm.enabled ? (
          <div className="relative z-[2] mx-auto w-full max-w-[540px] self-center">
            <ConsultationForm pageTitle={pageTitle} settings={leadForm} />
          </div>
        ) : (
          <div className={`route-hero-visual${image ? " route-hero-visual--media" : ""}`}>
            <div className="route-hero-signal route-hero-signal--one" aria-hidden="true" />
            <div className="route-hero-signal route-hero-signal--two" aria-hidden="true" />
            {image ? <img src={image} alt={imageAlt ?? ""} /> : <div className="route-hero-network" aria-hidden="true" />}
            <span className="route-hero-status" aria-hidden="true">
              <i /> Connected expertise
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
