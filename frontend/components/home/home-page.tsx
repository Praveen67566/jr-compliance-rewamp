import { SitePageShell } from "@/components/site-page-shell";
import { RouteClosingCta } from "@/components/editorial/route-closing-cta";
import { Faq } from "@/components/home/faq";
import { Hero } from "@/components/home/hero";
import { KeychainRevealSection } from "@/components/home/keychain-reveal-section";
import { ServiceStack } from "@/components/home/service-stack";
import { TrustedBrandsMarquee } from "@/components/home/trusted-brands-marquee";
import { linkTargetProps } from "@/lib/link-props";
import type { HomepageContent, Logo } from "@/lib/types";

type HomePageProps = {
  content: HomepageContent;
};

type RegulatorLogoEntry = {
  isFiller: boolean;
  logo: Logo;
  sourceIndex: number;
};

type RegulatorLogoListProps = {
  entries: RegulatorLogoEntry[];
  isClone?: boolean;
  isDecorative?: boolean;
  label?: string;
  listKey: string;
};

const MINIMUM_REGULATOR_MARQUEE_ITEMS = 18;

function buildRegulatorLogoEntries(logos: Logo[]): RegulatorLogoEntry[] {
  if (!logos.length) {
    return [];
  }

  return Array.from(
    { length: Math.max(MINIMUM_REGULATOR_MARQUEE_ITEMS, logos.length) },
    (_, index) => ({
      isFiller: index >= logos.length,
      logo: logos[index % logos.length],
      sourceIndex: index % logos.length,
    }),
  );
}

function RegulatorLogoList({
  entries,
  isClone = false,
  isDecorative = false,
  label,
  listKey,
}: RegulatorLogoListProps) {
  return (
    <ul
      className={`regulator-logo-list${isClone ? " regulator-logo-list--clone" : ""}`}
      aria-hidden={isDecorative ? "true" : undefined}
      aria-label={isDecorative ? undefined : label}
    >
      {entries.map(({ isFiller, logo, sourceIndex }, index) => {
        const isCardDecorative = isDecorative || isFiller;
        const logoContent = (
          <>
            <img src={logo.src} alt="" />
            <span className="regulator-logo-name">{logo.name}</span>
            {logo.href && !isCardDecorative ? (
              <span className="regulator-logo-arrow" aria-hidden="true">
                ↗
              </span>
            ) : null}
          </>
        );

        return (
          <li
            className={`regulator-logo${isFiller ? " regulator-logo--filler" : ""}`}
            data-index={String(sourceIndex + 1).padStart(2, "0")}
            aria-hidden={isCardDecorative ? "true" : undefined}
            key={`${listKey}-${logo.name}-${index}`}
          >
            {logo.href && !isCardDecorative ? (
              <a
                className="regulator-logo-link"
                href={logo.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${logo.name} website`}
              >
                {logoContent}
              </a>
            ) : (
              <div className="regulator-logo-content">{logoContent}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function RegulatorHeadingTitle({ title }: { title: string }) {
  const normalizedTitle = title.trim();
  const lastWordStart = normalizedTitle.lastIndexOf(" ");

  if (lastWordStart === -1) {
    return <span className="regulators-heading-accent">{normalizedTitle}</span>;
  }

  return (
    <>
      {normalizedTitle.slice(0, lastWordStart)}{" "}
      <span className="regulators-heading-accent">{normalizedTitle.slice(lastWordStart + 1)}</span>
    </>
  );
}

function RegulatorLogoMarquee({ label, logos }: { label: string; logos: Logo[] }) {
  if (!logos.length) {
    return null;
  }

  const entries = buildRegulatorLogoEntries(logos);
  const reverseEntries = [...entries].reverse();
  const offset = Math.max(1, Math.floor(entries.length / 3));
  const offsetEntries = [...entries.slice(offset), ...entries.slice(0, offset)];

  return (
    <div className="regulator-logo-marquee">
      <div className="regulator-logo-row regulator-logo-row--primary">
        <div className="regulator-logo-track">
          <RegulatorLogoList entries={entries} label={label} listKey="primary" />
          <RegulatorLogoList entries={entries} isClone isDecorative listKey="primary-clone" />
        </div>
      </div>

      <div className="regulator-logo-row regulator-logo-row--reverse" aria-hidden="true">
        <div className="regulator-logo-track">
          <RegulatorLogoList entries={reverseEntries} isDecorative listKey="reverse" />
          <RegulatorLogoList entries={reverseEntries} isClone isDecorative listKey="reverse-clone" />
        </div>
      </div>

      <div className="regulator-logo-row regulator-logo-row--tertiary" aria-hidden="true">
        <div className="regulator-logo-track">
          <RegulatorLogoList entries={offsetEntries} isDecorative listKey="tertiary" />
          <RegulatorLogoList entries={offsetEntries} isClone isDecorative listKey="tertiary-clone" />
        </div>
      </div>
    </div>
  );
}

export function HomePage({ content }: HomePageProps) {
  return (
    <SitePageShell footer={content.footer} navigation={content.navigation} site={content.site}>
        <Hero
          hero={content.hero}
          leadForm={content.site.leadForm}
          pageTitle={content.seo.title}
          showConsultationForm={false}
        />

        <TrustedBrandsMarquee logos={content.trustedLogos} />

        <ServiceStack services={content.services} />

        <section className="why-section section" id="about">
          <div className="site-container mx-auto w-full max-w-[1320px] px-8 max-[820px]:px-[22px] max-[560px]:px-[18px] why-layout">
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
          <div className="site-container mx-auto w-full max-w-[1320px] px-8 max-[820px]:px-[22px] max-[560px]:px-[18px]">
            <div className="section-heading regulators-heading">
              <span className="eyebrow">{content.regulators.eyebrow}</span>
              <h2 id="regulators-heading">
                <RegulatorHeadingTitle title={content.regulators.title} />
              </h2>
              {content.regulators.description ? <p>{content.regulators.description}</p> : null}
            </div>
          </div>

          <RegulatorLogoMarquee label={content.regulators.title} logos={content.regulators.logos} />
        </section>

        <section className="metrics-section section">
          <div className="site-container mx-auto w-full max-w-[1320px] px-8 max-[820px]:px-[22px] max-[560px]:px-[18px]">
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

        <KeychainRevealSection
          className="testimonials-section section"
          itemCount={content.testimonials.items.length}
          labelledBy="testimonials-heading"
        >
          <div className="site-container mx-auto w-full max-w-[1320px] px-8 max-[820px]:px-[22px] max-[560px]:px-[18px]">
            <div className="section-heading compact-heading">
              <span className="eyebrow">{content.testimonials.eyebrow}</span>
              <h2 id="testimonials-heading">{content.testimonials.title}</h2>
              {content.testimonials.description ? <p>{content.testimonials.description}</p> : null}
            </div>
            <div className="testimonial-grid">
              {content.testimonials.items.map((testimonial) => (
                <article className="testimonial-card" key={`${testimonial.name}-${testimonial.quote}`}>
                  <span className="keychain-card-anchor" aria-hidden="true" />
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
        </KeychainRevealSection>

        <KeychainRevealSection
          className="recognitions-section section"
          itemCount={content.recognitions.items.length}
          labelledBy="recognitions-heading"
        >
          <div className="site-container mx-auto w-full max-w-[1320px] px-8 max-[820px]:px-[22px] max-[560px]:px-[18px]">
            <div className="recognition-heading">
              <div>
                <span className="eyebrow">{content.recognitions.eyebrow}</span>
                <h2 id="recognitions-heading">{content.recognitions.title}</h2>
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
                  <span className="keychain-card-anchor" aria-hidden="true" />
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
        </KeychainRevealSection>

        {content.insights?.items.length ? (
          <section className="insights-section section" aria-labelledby="insights-heading">
            <div className="site-container mx-auto w-full max-w-[1320px] px-8 max-[820px]:px-[22px] max-[560px]:px-[18px]">
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

        <RouteClosingCta id="contact" {...content.closingCta} />
    </SitePageShell>
  );
}
