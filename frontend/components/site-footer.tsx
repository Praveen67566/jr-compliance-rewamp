import { linkTargetProps } from "@/lib/link-props";
import type { FooterLinkGroup, HomepageContent } from "@/lib/types";

type SiteFooterProps = Pick<HomepageContent, "site" | "footer">;

function sharedHref(href: string) {
  return href.startsWith("#") ? `/${href}` : href;
}

export function SiteFooter({ site, footer }: SiteFooterProps) {
  const linkGroups: FooterLinkGroup[] = footer.linkGroups?.length
    ? footer.linkGroups
    : [
        { title: "Featured services", links: footer.featuredLinks },
        { title: "Popular Services", links: footer.popularServices },
      ];
  const legalNotices = footer.legalNotices?.length
    ? footer.legalNotices
    : [{ title: "Disclaimer", body: footer.disclaimer.join("\n\n") }];

  return (
    <footer className="site-footer" id="legal">
      <div className="footer-network-layer" aria-hidden="true">
        <span className="footer-network-orbit footer-network-orbit--one" />
        <span className="footer-network-orbit footer-network-orbit--two" />
        <span className="footer-network-node footer-network-node--one" />
        <span className="footer-network-node footer-network-node--two" />
      </div>

      <div className="footer-content site-container relative z-1 mx-auto w-full max-w-[1320px] px-8 max-[820px]:px-[22px] max-[560px]:px-[18px]">
        <div className="footer-top grid items-start gap-12 pb-12 min-[821px]:grid-cols-[minmax(260px,0.8fr)_minmax(0,1.7fr)] min-[1101px]:gap-20 max-[560px]:gap-10 max-[560px]:pb-10">
          <div className="footer-brand-block grid min-w-0 content-start justify-items-start gap-6">
            <div className="footer-brand-meta">
              <a className="footer-brand" href="/" aria-label={`${site.name} home`}>
                <img src={site.footerLogo} alt={site.name} />
              </a>
              <p>{site.footerTagline}</p>
            </div>

            <div className="footer-contact-list grid w-full justify-items-start gap-2">
              <a className="footer-contact-phone" href={site.phoneHref}>
                {site.phone}
              </a>
              <a className="footer-contact-email" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              {/* {site.whatsAppHref ? (
                <a className="footer-contact-whatsapp" href={site.whatsAppHref} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              ) : null} */}
            </div>

            {site.footerCta ? (
              <a className="footer-cta" href={sharedHref(site.footerCta.href)} {...linkTargetProps(site.footerCta)}>
                {site.footerCta.label} <span aria-hidden="true">↗</span>
              </a>
            ) : null}

            <div className="social-links" aria-label="Social media">
              {site.socialLinks.map((social) => (
                <a
                  href={social.href}
                  key={social.label}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                >
                  {social.abbreviation}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-link-columns grid min-w-0 gap-10 min-[561px]:grid-cols-[minmax(145px,0.7fr)_minmax(0,1.3fr)] min-[1101px]:gap-14">
            {linkGroups.map((group, index) => {
              const useCompactGrid = index === 1 || group.title.toLowerCase().includes("popular");
              const links = group.links.map((link) => (
                <a className="footer-service-link" href={sharedHref(link.href)} key={link.label} {...linkTargetProps(link)}>
                  {link.label}
                </a>
              ));

              return (
                <div
                  className={`footer-link-column${useCompactGrid ? " footer-popular-column" : ""}`}
                  key={`${group.title}-${index}`}
                >
                  <h2 className="footer-label">{group.title}</h2>
                  <div
                    className={`grid grid-cols-2 gap-x-6 gap-y-3 ${
                      useCompactGrid ? "footer-popular-links" : "footer-featured-links min-[561px]:grid-cols-1"
                    }`}
                  >
                    {links}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="footer-disclaimer grid gap-7 border-t border-sky/15 py-8 max-[560px]:py-7">
          {legalNotices.map((notice, index) => (
            <div
              className="footer-notice grid items-start gap-3 min-[821px]:grid-cols-[minmax(150px,0.75fr)_minmax(0,3fr)] min-[821px]:gap-12"
              key={`${notice.title}-${index}`}
            >
              <h2 className="footer-label">{notice.title}</h2>
              <div className="min-w-0 max-w-[100ch]">
                {notice.body.split("\n\n").map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          {footer.footerBadges.length ? (
            <ul className="footer-badges" aria-label="Certifications and recognitions">
              {footer.footerBadges.map((badge, index) => (
                <li className="footer-badge" key={`${badge.src}-${index}`}>
                  <img src={badge.src} alt={badge.alt} loading="lazy" />
                </li>
              ))}
            </ul>
          ) : null}
          <div className="footer-bottom-identity">
            <span>{site.copyrightText}</span>
          </div>
          <div className="footer-bottom-legal">
            {site.legalLinks.map((link) => (
              <a href={sharedHref(link.href)} key={link.label} {...linkTargetProps(link)}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
