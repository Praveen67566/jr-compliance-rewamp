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
      <div className="container route-closing-inner">
        <div>
          <span className="eyebrow eyebrow-light">{eyebrow}</span>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <a className="button button-light" href={cta.href}>
          {cta.label} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
