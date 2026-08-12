import { RouteClosingCta } from "@/components/editorial/route-closing-cta";
import { RouteHero } from "@/components/editorial/route-hero";
import { SitePageShell } from "@/components/site-page-shell";
import { linkTargetProps } from "@/lib/link-props";
import type { AboutPageContent, TeamMember } from "@/lib/types";

type AboutPageProps = {
  content: AboutPageContent;
};

type AboutParallaxVariant = "proof" | "story" | "pioneers" | "achievements";

/** Decorative, CSS-driven depth layers for the quieter ice-blue About sections. */
function AboutParallaxBackdrop({ variant }: { variant: AboutParallaxVariant }) {
  return (
    <div className={`about-parallax about-parallax--${variant}`} aria-hidden="true">
      <span className="about-parallax-grid" />
      <span className="about-parallax-orbit" />
      <span className="about-parallax-route" />
      <span className="about-parallax-signal about-parallax-signal--one" />
      <span className="about-parallax-signal about-parallax-signal--two" />
    </div>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  const content = (
    <>
      <div className="about-team-photo">
        {member.image ? <img src={member.image} alt={member.name} /> : <span>{member.name.charAt(0)}</span>}
      </div>
      <div>
        <strong>{member.name}</strong>
        <span>{member.role}</span>
      </div>
      {member.profileHref ? <b aria-hidden="true">↗</b> : null}
    </>
  );

  return member.profileHref ? (
    <a
      className="about-team-card"
      href={member.profileHref}
      {...linkTargetProps({ target: member.profileTarget ?? "_blank" })}
      aria-label={member.profileLabel ?? `View ${member.name}'s profile`}
    >
      {content}
    </a>
  ) : (
    <article className="about-team-card">{content}</article>
  );
}

export function AboutPage({ content }: AboutPageProps) {
  return (
    <SitePageShell footer={content.footer} navigation={content.navigation} site={content.site}>
      <RouteHero {...content.hero} />

      <section className="about-proof-section">
        <AboutParallaxBackdrop variant="proof" />
        <div className="site-container mx-auto w-full max-w-[1320px] px-8 max-[820px]:px-[22px] max-[560px]:px-[18px] about-proof-grid">
          <div className="about-proof-copy">
            <span className="eyebrow">Our foundation</span>
            <h2>{content.overview.title}</h2>
            <p>{content.overview.description}</p>
          </div>
          <div className="about-proof-stats">
            {content.overview.stats.map((stat, index) => (
              <article className="about-proof-stat" key={stat.label}>
                <span>0{index + 1}</span>
                <strong>{stat.value}</strong>
                <p>{stat.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-mantra-section section">
        <div className="site-container mx-auto w-full max-w-[1320px] px-8 max-[820px]:px-[22px] max-[560px]:px-[18px]">
          <div className="route-section-heading about-section-heading">
            <div>
              <span className="eyebrow eyebrow-light">{content.mantra.eyebrow}</span>
              <h2>{content.mantra.title}</h2>
            </div>
            <p>{content.mantra.description}</p>
          </div>
          <div className="about-mantra-grid">
            {content.mantra.values.map((item, index) => (
              <article className="about-mantra-card" key={item.title}>
                {item.image ? <img src={item.image} alt="" /> : null}
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <i aria-hidden="true">↗</i>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-story-section section">
        <AboutParallaxBackdrop variant="story" />
        <div className="site-container mx-auto w-full max-w-[1320px] px-8 max-[820px]:px-[22px] max-[560px]:px-[18px]">
          <div className="route-section-heading">
            <div>
              <span className="eyebrow">{content.story.eyebrow}</span>
              <h2>{content.story.title}</h2>
            </div>
            {content.story.description ? <p>{content.story.description}</p> : null}
          </div>
          <div className="about-timeline" role="list">
            {content.story.milestones.map((milestone, index) => (
              <article className="about-timeline-card" key={`${milestone.period}-${milestone.title}`} role="listitem">
                <span className="about-timeline-index">0{index + 1}</span>
                <span className="about-timeline-period">{milestone.period}</span>
                <h3>{milestone.title}</h3>
                <p>{milestone.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-reasons-section section">
        <div className="site-container mx-auto w-full max-w-[1320px] px-8 max-[820px]:px-[22px] max-[560px]:px-[18px]">
          <div className="route-section-heading route-section-heading--light">
            <div>
              <span className="eyebrow eyebrow-light">{content.reasons.eyebrow}</span>
              <h2>{content.reasons.title}</h2>
            </div>
            {content.reasons.description ? <p>{content.reasons.description}</p> : null}
          </div>
          <div className="about-reasons-grid">
            {content.reasons.items.map((item, index) => (
              <article className="about-reason-card" key={item.title}>
                <span>0{index + 1}</span>
                {item.image ? <img className="about-reason-image" src={item.image} alt={item.imageAlt ?? ""} /> : null}
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-pioneers-section section">
        <AboutParallaxBackdrop variant="pioneers" />
        <div className="site-container mx-auto w-full max-w-[1320px] px-8 max-[820px]:px-[22px] max-[560px]:px-[18px] about-pioneers-layout">
          <div>
            <span className="eyebrow">{content.pioneers.eyebrow}</span>
            <h2>{content.pioneers.title}</h2>
            <p>{content.pioneers.description}</p>
          </div>
          <div className="about-pioneers-stats">
            {content.pioneers.stats.map((stat) => (
              <article key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-team-section section" id="team">
        <div className="site-container mx-auto w-full max-w-[1320px] px-8 max-[820px]:px-[22px] max-[560px]:px-[18px]">
          <div className="about-team-heading">
            <div>
              <span className="eyebrow eyebrow-light">{content.team.eyebrow}</span>
              <h2>{content.team.title}</h2>
              <p>{content.team.description}</p>
            </div>
            {content.team.image ? (
              <figure>
                <img src={content.team.image} alt={content.team.imageAlt} />
              </figure>
            ) : null}
          </div>
          <div className="about-team-grid">
            {content.team.members.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
          <a className="text-link text-link-light" href={content.team.cta.href} {...linkTargetProps(content.team.cta)}>
            {content.team.cta.label} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="about-achievements-section section">
        <AboutParallaxBackdrop variant="achievements" />
        <div className="site-container mx-auto w-full max-w-[1320px] px-8 max-[820px]:px-[22px] max-[560px]:px-[18px]">
          <div className="route-section-heading">
            <div>
              <span className="eyebrow">{content.achievements.eyebrow}</span>
              <h2>{content.achievements.title}</h2>
            </div>
            {content.achievements.description ? <p>{content.achievements.description}</p> : null}
          </div>
          <div className="about-achievements-grid">
            {content.achievements.items.map((item, index) => (
              <article className="about-achievement-card" key={item.title}>
                <span>0{index + 1}</span>
                {item.image ? <img src={item.image} alt="" /> : null}
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <RouteClosingCta {...content.closingCta} />
    </SitePageShell>
  );
}
