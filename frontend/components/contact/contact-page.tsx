import { RouteClosingCta } from "@/components/editorial/route-closing-cta";
import { RouteHero } from "@/components/editorial/route-hero";
import { SitePageShell } from "@/components/site-page-shell";
import { linkTargetProps } from "@/lib/link-props";
import type { ContactPageContent } from "@/lib/types";

type ContactPageProps = {
  content: ContactPageContent;
};

export function ContactPage({ content }: ContactPageProps) {
  return (
    <SitePageShell footer={content.footer} navigation={content.navigation} site={content.site}>
      <RouteHero {...content.hero} />

      <section className="contact-points-section section" id="contact-options">
        <div className="site-container mx-auto w-full max-w-[1320px] px-8 max-[820px]:px-[22px] max-[560px]:px-[18px]">
          <div className="route-section-heading">
            <div>
              <span className="eyebrow">Contact options</span>
              <h2>Choose the route that works for you.</h2>
            </div>
            <p>Connect directly with the JR Compliance team by phone, email, or in person.</p>
          </div>
          <div className="contact-points-grid">
            {content.contactPoints.map((point, index) => {
              const external = /^https?:\/\//i.test(point.href);

              return (
                <a
                  className="contact-point-card"
                  href={point.href}
                  key={point.label}
                  {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  <span className="contact-point-index">0{index + 1}</span>
                  <span className="contact-point-icon">
                    {point.icon ? <img src={point.icon} alt="" /> : <i aria-hidden="true">↗</i>}
                  </span>
                  <h3>{point.label}</h3>
                  <strong>{point.value}</strong>
                  <p>{point.detail}</p>
                  <b aria-hidden="true">↗</b>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="contact-enquiry-section section">
        <div className="site-container mx-auto w-full max-w-[1320px] px-8 max-[820px]:px-[22px] max-[560px]:px-[18px] contact-enquiry-layout">
          <div className="contact-enquiry-copy">
            <span className="eyebrow eyebrow-light">{content.enquiry.eyebrow}</span>
            <h2>{content.enquiry.title}</h2>
            <p>{content.enquiry.description}</p>
            <div className="contact-topic-list" aria-label="Compliance topics">
              {content.enquiry.topics.map((topic) => (
                <span key={topic}>{topic}</span>
              ))}
            </div>
          </div>
          <aside className="contact-enquiry-panel">
            <span className="contact-panel-status">
              <i /> Direct channel available
            </span>
            <h3>Send your requirement securely by email.</h3>
            <p>{content.enquiry.formNote}</p>
            <a
              className="button button-light"
              href={content.enquiry.directCta.href}
              {...linkTargetProps(content.enquiry.directCta)}
            >
              {content.enquiry.directCta.label} <span aria-hidden="true">↗</span>
            </a>
          </aside>
        </div>
      </section>

      <section className="contact-response-section section">
        <div className="site-container mx-auto w-full max-w-[1320px] px-8 max-[820px]:px-[22px] max-[560px]:px-[18px]">
          <div className="route-section-heading">
            <div>
              <span className="eyebrow">{content.response.eyebrow}</span>
              <h2>{content.response.title}</h2>
            </div>
          </div>
          <div className="contact-response-grid">
            {content.response.steps.map((step, index) => (
              <article key={step.title}>
                <span>0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <RouteClosingCta {...content.closingCta} />
    </SitePageShell>
  );
}
