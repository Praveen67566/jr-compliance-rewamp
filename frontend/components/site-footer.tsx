import type { HomepageContent } from "@/lib/types";

type SiteFooterProps = Pick<HomepageContent, "site" | "footer">;

function sharedHref(href: string) {
  return href.startsWith("#") ? `/${href}` : href;
}

export function SiteFooter({ site, footer }: SiteFooterProps) {
  return (
    <footer className="site-footer" id="legal">
      <div className="footer-network-layer" aria-hidden="true">
        <span className="footer-network-orbit footer-network-orbit--one" />
        <span className="footer-network-orbit footer-network-orbit--two" />
        <span className="footer-network-node footer-network-node--one" />
        <span className="footer-network-node footer-network-node--two" />
      </div>

      <div className="container footer-top">
        <div className="footer-brand-block">
          <div className="footer-brand-meta">
            <a className="footer-brand" href="/" aria-label={`${site.name} home`}>
              <img src={site.footerLogo} alt={site.name} />
            </a>
            <p>{site.footerTagline}</p>
          </div>

          <div className="footer-contact-list">
            <a className="footer-contact-phone" href={site.phoneHref}>
              {site.phone}
            </a>
            <a className="footer-contact-email" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </div>

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

        <div className="footer-link-columns">
          <div className="footer-link-column">
            <span className="footer-label">Featured services</span>
            {footer.featuredLinks.map((link) => (
              <a href={sharedHref(link.href)} key={link.label}>
                {link.label}
              </a>
            ))}
          </div>

          <div className="footer-link-column footer-popular-column">
            <span className="footer-label">Popular Services</span>
            <div className="footer-popular-links">
              {footer.popularServices.map((link) => (
                <a href={sharedHref(link.href)} key={link.label}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container footer-disclaimer">
        <span className="footer-label">Disclaimer</span>
        <div>
          {footer.disclaimer.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="container footer-bottom">
        <div className="footer-bottom-identity">
          <span>Copyright © JR Compliance</span>
        </div>
        <div className="footer-bottom-legal">
          {site.legalLinks.map((link) => (
            <a href={sharedHref(link.href)} key={link.label}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
