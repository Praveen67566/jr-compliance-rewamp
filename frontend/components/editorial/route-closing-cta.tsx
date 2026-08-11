import { linkTargetProps } from "@/lib/link-props";
import type { Link } from "@/lib/types";

type RouteClosingCtaProps = {
  eyebrow?: string;
  title: string;
  description: string;
  cta: Link;
};

export function RouteClosingCta({
  eyebrow = "Let's Talk Compliance",
  title,
  description,
  cta,
}: RouteClosingCtaProps) {
  return (
    <section className="route-closing-cta">
      <div className="route-closing-grid" aria-hidden="true" />
      <div className="site-container mx-auto w-full max-w-[1320px] px-8 max-[820px]:px-[22px] max-[560px]:px-[18px] route-closing-inner">
        <div>
          <span className="eyebrow eyebrow-light">{eyebrow}</span>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <a className="button button-light" href={cta.href} {...linkTargetProps(cta)}>
          {cta.label} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
