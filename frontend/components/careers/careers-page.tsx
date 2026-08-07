import { RouteClosingCta } from "@/components/editorial/route-closing-cta";
import { RouteHero } from "@/components/editorial/route-hero";
import { SitePageShell } from "@/components/site-page-shell";
import type { CareersPageContent } from "@/lib/types";

type CareersPageProps = {
  content: CareersPageContent;
};

export function CareersPage({ content }: CareersPageProps) {
  return (
    <SitePageShell footer={content.footer} navigation={content.navigation} site={content.site}>
      <RouteHero {...content.hero} />

      <section className="careers-purpose-section section">
        <div className="container">
          <div className="route-section-heading">
            <div>
              <span className="eyebrow">{content.purpose.eyebrow}</span>
              <h2>{content.purpose.title}</h2>
            </div>
          </div>
          <div className="careers-purpose-grid">
            <article className="careers-purpose-card">
              <span>01</span>
              <h3>Vision</h3>
              <p>{content.purpose.vision}</p>
            </article>
            <article className="careers-purpose-card">
              <span>02</span>
              <h3>Mission</h3>
              <p>{content.purpose.mission}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="careers-values-section section">
        <div className="container">
          <div className="route-section-heading route-section-heading--light">
            <div>
              <span className="eyebrow eyebrow-light">{content.values.eyebrow}</span>
              <h2>{content.values.title}</h2>
            </div>
          </div>
          <div className="careers-values-grid">
            {content.values.items.map((item, index) => (
              <article className="careers-value-card" key={item.title}>
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="careers-life-section section">
        <div className="container">
          <div className="route-section-heading careers-life-heading">
            <div>
              <span className="eyebrow">{content.lifeAtJr.eyebrow}</span>
              <h2>{content.lifeAtJr.title}</h2>
            </div>
            {content.lifeAtJr.description ? <p>{content.lifeAtJr.description}</p> : null}
          </div>
          <div className="careers-gallery">
            {content.lifeAtJr.gallery.map((item, index) => (
              <figure className={`careers-gallery-item careers-gallery-item--${index + 1}`} key={item.src}>
                <img src={item.src} alt={item.alt} />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="careers-openings-section section" id="current-openings">
        <div className="container">
          <div className="route-section-heading route-section-heading--light careers-openings-heading">
            <div>
              <span className="eyebrow eyebrow-light">{content.openings.eyebrow}</span>
              <h2>{content.openings.title}</h2>
            </div>
            <p>{content.openings.description}</p>
          </div>
          <div className="career-role-list">
            {content.openings.roles.map((role, index) => (
              <article className="career-role-card" key={role.title}>
                <span className="career-role-index">0{index + 1}</span>
                <div className="career-role-main">
                  <div className="career-role-meta">
                    <span>{role.department}</span>
                    <i aria-hidden="true">•</i>
                    <span>{role.location}</span>
                    <i aria-hidden="true">•</i>
                    <span>{role.employmentType}</span>
                  </div>
                  <h3>{role.title}</h3>
                  <p>{role.summary}</p>
                </div>
                <a className="career-role-link" href={role.href}>
                  Express interest <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="careers-benefits-section section">
        <div className="container">
          <div className="route-section-heading">
            <div>
              <span className="eyebrow">{content.benefits.eyebrow}</span>
              <h2>{content.benefits.title}</h2>
            </div>
          </div>
          <div className="careers-benefits-grid">
            {content.benefits.items.map((item, index) => (
              <article className="careers-benefit-card" key={item.title}>
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="careers-testimonials-section section">
        <div className="container">
          <div className="route-section-heading route-section-heading--light">
            <div>
              <span className="eyebrow eyebrow-light">{content.testimonials.eyebrow}</span>
              <h2>{content.testimonials.title}</h2>
            </div>
          </div>
          <div className="careers-testimonial-grid">
            {content.testimonials.items.map((testimonial) => (
              <article className="careers-testimonial-card" key={`${testimonial.name}-${testimonial.quote}`}>
                <span className="careers-quote-mark">“</span>
                <p>{testimonial.quote}</p>
                <footer>
                  {testimonial.image ? <img src={testimonial.image} alt={testimonial.name} /> : null}
                  <div>
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.role}</span>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="careers-faq-section section">
        <div className="container careers-faq-layout">
          <div>
            <span className="eyebrow">{content.faqs.eyebrow}</span>
            <h2>{content.faqs.title}</h2>
          </div>
          <div className="careers-faq-list">
            {content.faqs.items.map((faq, index) => (
              <details key={faq.question} open={index === 0}>
                <summary>
                  <span>{faq.question}</span>
                  <b aria-hidden="true">+</b>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <RouteClosingCta {...content.closingCta} />
    </SitePageShell>
  );
}
