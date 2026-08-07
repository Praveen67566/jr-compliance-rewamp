import { SitePageShell } from "@/components/site-page-shell";
import { Faq } from "@/components/home/faq";
import { Hero } from "@/components/home/hero";
import { ServiceStack } from "@/components/home/service-stack";
import type { HomepageContent } from "@/lib/types";

type HomePageProps = {
  content: HomepageContent;
};

export function HomePage({ content }: HomePageProps) {
  const repeatedLogos = [...content.trustedLogos, ...content.trustedLogos];

  return (
    <SitePageShell footer={content.footer} navigation={content.navigation} site={content.site}>
        <Hero hero={content.hero} />

        <section className="logo-strip" aria-label="Trusted client brands">
          <div className="logo-strip-label">Trusted by leading brands</div>
          <div className="logo-marquee">
            <div className="logo-marquee-track">
              {repeatedLogos.map((logo, index) => (
                <div className="brand-logo" key={`${logo.name}-${index}`}>
                  <img src={logo.src} alt={index < content.trustedLogos.length ? logo.name : ""} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <ServiceStack services={content.services} />

        <div className="contact-ticker" aria-label="Contact JR Compliance">
          <div>
            <span>Contact Us</span>
            <i>✦</i>
            <span>Contact Us</span>
            <i>✦</i>
            <span>Contact Us</span>
            <i>✦</i>
            <span>Contact Us</span>
            <i>✦</i>
          </div>
        </div>

        <section className="why-section section" id="about">
          <div className="container why-layout">
            <div className="why-copy">
              <span className="eyebrow eyebrow-light">Why JR Compliance</span>
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
              {content.whyUs.highlights.map((highlight, index) => (
                <article className="why-card" key={highlight}>
                  <span>0{index + 1}</span>
                  <h3>{highlight}</h3>
                  <span className="why-card-arrow" aria-hidden="true">
                    ↗
                  </span>
                </article>
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
              </div>
              <a className="text-link" href={content.metrics.cta.href}>
                {content.metrics.cta.label} <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="metric-grid">
              {content.metrics.items.map((metric) => (
                <article className="metric-card" key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="testimonials-section section">
          <div className="container">
            <div className="section-heading compact-heading">
              <span className="eyebrow">Client stories</span>
              <h2>{content.testimonials.title}</h2>
            </div>
            <div className="testimonial-grid">
              {content.testimonials.items.map((testimonial) => (
                <article className="testimonial-card" key={`${testimonial.name}-${testimonial.quote}`}>
                  <span className="quote-mark">“</span>
                  <p>{testimonial.quote}</p>
                  <footer>
                    <div className="testimonial-avatar">{testimonial.name.charAt(0)}</div>
                    <div>
                      <strong>{testimonial.name}</strong>
                      <span>{testimonial.company}</span>
                    </div>
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
                <span className="eyebrow">Media</span>
                <h2>{content.recognitions.title}</h2>
              </div>
              <p>{content.recognitions.description}</p>
            </div>
            <div className="recognition-grid">
              {content.recognitions.items.map((recognition, index) => (
                <a className="recognition-card" href={recognition.href} key={recognition.title}>
                  <span className="recognition-index">0{index + 1}</span>
                  <h3>{recognition.title}</h3>
                  <p>{recognition.summary}</p>
                  <span className="recognition-link">Read more <b aria-hidden="true">↗</b></span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <Faq faqs={content.faqs} />

        <section className="closing-cta" id="contact">
          <div className="container closing-cta-inner">
            <div>
              <span className="eyebrow eyebrow-light">Let&apos;s Talk Compliance</span>
              <h2>{content.closingCta.title}</h2>
              <p>{content.closingCta.description}</p>
            </div>
            <a className="button button-light closing-button" href={content.closingCta.cta.href}>
              {content.closingCta.cta.label} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
    </SitePageShell>
  );
}
