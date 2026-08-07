import { SitePageShell } from "@/components/site-page-shell";
import { Faq } from "@/components/home/faq";
import { Hero } from "@/components/home/hero";
import { ServiceStack } from "@/components/home/service-stack";
import { linkTargetProps } from "@/lib/link-props";
import type { HomepageContent } from "@/lib/types";

type HomePageProps = {
  content: HomepageContent;
};

export function HomePage({ content }: HomePageProps) {
  const repeatedLogos = [...content.trustedLogos, ...content.trustedLogos];
  const repeatedRegulatorLogos = [...content.regulators.logos, ...content.regulators.logos];

  return (
    <SitePageShell footer={content.footer} navigation={content.navigation} site={content.site}>
        <Hero hero={content.hero} />

        <section className="logo-strip" aria-label="Trusted client brands">
          <div className="logo-strip-label">Trusted by leading brands</div>
          <div className="logo-marquee">
            <div className="logo-marquee-track">
              {repeatedLogos.map((logo, index) => (
                <div className="brand-logo" key={`${logo.name}-${index}`}>
                  {logo.href ? (
                    <a href={logo.href} target="_blank" rel="noreferrer" aria-label={`${logo.name} website`}>
                      <img src={logo.src} alt={index < content.trustedLogos.length ? logo.name : ""} />
                    </a>
                  ) : (
                    <img src={logo.src} alt={index < content.trustedLogos.length ? logo.name : ""} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <ServiceStack services={content.services} />

        <section className="why-section section" id="about">
          <div className="container why-layout">
            <div className="why-copy">
              <span className="eyebrow eyebrow-light">{content.whyUs.eyebrow}</span>
              <h2>{content.whyUs.title}</h2>
              <p>{content.whyUs.description}</p>
              <a className="text-link text-link-light" href="#contact">
                Let&apos;s Talk Compliance <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="why-highlights">
              <div className="world-arc" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>
              {content.whyUs.cards.map((card, index) => (
                <article className="why-card" key={card.title}>
                  <span>0{index + 1}</span>
                  <div className="why-card-copy">
                    <h3>{card.title}</h3>
                    {card.description ? <p>{card.description}</p> : null}
                  </div>
                  {card.image ? <img className="why-card-image" src={card.image} alt={card.imageAlt ?? ""} /> : null}
                  <span className="why-card-arrow" aria-hidden="true">
                    ↗
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="regulators-section section" aria-labelledby="regulators-heading">
          <div className="container">
            <div className="section-heading regulators-heading">
              <span className="eyebrow">{content.regulators.eyebrow}</span>
              <h2 id="regulators-heading">{content.regulators.title}</h2>
              {content.regulators.description ? <p>{content.regulators.description}</p> : null}
            </div>
            <div className="regulator-logo-grid">
              {repeatedRegulatorLogos.map((logo, index) => (
                <div className="regulator-logo" key={`${logo.name}-${index}`}>
                  {logo.href ? (
                    <a href={logo.href} target="_blank" rel="noreferrer" aria-label={`${logo.name} website`}>
                      <img src={logo.src} alt={index < content.regulators.logos.length ? logo.name : ""} />
                    </a>
                  ) : (
                    <img src={logo.src} alt={index < content.regulators.logos.length ? logo.name : ""} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="metrics-section section">
          <div className="container">
            <div className="metrics-heading">
              <div>
                <span className="eyebrow">{content.metrics.eyebrow}</span>
                <h2>{content.metrics.title}</h2>
                {content.metrics.description ? <p>{content.metrics.description}</p> : null}
              </div>
              <a className="text-link" href={content.metrics.cta.href} {...linkTargetProps(content.metrics.cta)}>
                {content.metrics.cta.label} <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="metric-grid">
              {content.metrics.items.map((metric) => (
                <article className="metric-card" key={metric.label}>
                  {metric.icon ? <img className="metric-card-icon" src={metric.icon} alt="" /> : null}
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </article>
              ))}
            </div>
            {content.metrics.featureImage ? (
              <figure className="metrics-feature">
                <img src={content.metrics.featureImage} alt={content.metrics.featureImageAlt ?? ""} />
                {content.metrics.featureTitle ? <figcaption>{content.metrics.featureTitle}</figcaption> : null}
              </figure>
            ) : null}
          </div>
        </section>

        {content.tickerCta ? (
          <section className="contact-ticker" aria-label={content.tickerCta.description ?? content.tickerCta.title}>
            <a href={content.tickerCta.cta.href} {...linkTargetProps(content.tickerCta.cta)}>
              <span>{content.tickerCta.title}</span>
              <i>✦</i>
              <span>{content.tickerCta.title}</span>
              <i>✦</i>
              <span>{content.tickerCta.title}</span>
              <i>✦</i>
              <span>{content.tickerCta.title}</span>
              <i>✦</i>
            </a>
          </section>
        ) : null}

        <section className="testimonials-section section">
          <div className="container">
            <div className="section-heading compact-heading">
              <span className="eyebrow">{content.testimonials.eyebrow}</span>
              <h2>{content.testimonials.title}</h2>
              {content.testimonials.description ? <p>{content.testimonials.description}</p> : null}
            </div>
            <div className="testimonial-grid">
              {content.testimonials.items.map((testimonial) => (
                <article className="testimonial-card" key={`${testimonial.name}-${testimonial.quote}`}>
                  <span className="quote-mark">“</span>
                  <p>{testimonial.quote}</p>
                  <footer>
                    <div className="testimonial-avatar">
                      {testimonial.image ? <img src={testimonial.image} alt={testimonial.name} /> : testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <strong>{testimonial.name}</strong>
                      <span>{[testimonial.role, testimonial.company].filter(Boolean).join(" · ")}</span>
                    </div>
                    {testimonial.companyLogo ? <img className="testimonial-company-logo" src={testimonial.companyLogo} alt={testimonial.company} /> : null}
                    <small>{testimonial.publishedOn}</small>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="recognitions-section section">
          <div className="container">
            <div className="recognition-heading">
              <div>
                <span className="eyebrow">{content.recognitions.eyebrow}</span>
                <h2>{content.recognitions.title}</h2>
              </div>
              <p>{content.recognitions.description}</p>
            </div>
            <div className="recognition-grid">
              {content.recognitions.items.map((recognition, index) => (
                <a
                  className="recognition-card"
                  href={recognition.href}
                  key={recognition.title}
                  {...linkTargetProps(recognition)}
                >
                  {recognition.coverImage ? <img className="recognition-cover" src={recognition.coverImage} alt="" /> : null}
                  <span className="recognition-index">0{index + 1}</span>
                  {recognition.category ? <span className="recognition-category">{recognition.category}</span> : null}
                  <h3>{recognition.title}</h3>
                  <p>{recognition.summary}</p>
                  {recognition.sourceName || recognition.sourceLogo ? (
                    <span className="recognition-source">
                      {recognition.sourceLogo ? <img src={recognition.sourceLogo} alt={recognition.sourceName ?? ""} /> : null}
                      {recognition.sourceName ? <span>{recognition.sourceName}</span> : null}
                    </span>
                  ) : null}
                  <span className="recognition-link">{recognition.linkLabel ?? "Read more"} <b aria-hidden="true">↗</b></span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {content.insights?.items.length ? (
          <section className="insights-section section" aria-labelledby="insights-heading">
            <div className="container">
              <div className="section-heading compact-heading">
                {content.insights.eyebrow ? <span className="eyebrow">{content.insights.eyebrow}</span> : null}
                <h2 id="insights-heading">{content.insights.title}</h2>
                {content.insights.description ? <p>{content.insights.description}</p> : null}
              </div>
              <div className="insights-grid">
                {content.insights.items.map((insight) => (
                  <a className="insight-card" href={insight.href} key={insight.title} {...linkTargetProps(insight)}>
                    <img src={insight.image} alt={insight.imageAlt} />
                    <span>{insight.kind === "video" ? "Video" : "Article"}</span>
                    <h3>{insight.title}</h3>
                    <p>{insight.summary}</p>
                    <footer>
                      {insight.publishedOn ? <small>{insight.publishedOn}</small> : <span />}
                      <b>{insight.linkLabel} <i aria-hidden="true">↗</i></b>
                    </footer>
                  </a>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <Faq faqs={content.faqs} />

        <section className="closing-cta" id="contact">
          <div className="container closing-cta-inner">
            <div>
              <span className="eyebrow eyebrow-light">Let&apos;s Talk Compliance</span>
              <h2>{content.closingCta.title}</h2>
              <p>{content.closingCta.description}</p>
            </div>
            <a
              className="button button-light closing-button"
              href={content.closingCta.cta.href}
              {...linkTargetProps(content.closingCta.cta)}
            >
              {content.closingCta.cta.label} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
    </SitePageShell>
  );
}
