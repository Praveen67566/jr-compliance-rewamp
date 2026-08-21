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

      <div className="site-container mx-auto w-full max-w-[1320px] px-8 max-[820px]:px-[22px] max-[560px]:px-[18px] footer-top">
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
            {site.whatsAppHref ? (
              <a className="footer-contact-whatsapp" href={site.whatsAppHref} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            ) : null}
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

        <div className="footer-link-columns">
          {linkGroups.map((group, index) => {
            const useCompactGrid = index === 1 || group.title.toLowerCase().includes("popular");
            const links = group.links.map((link) => (
              <a href={sharedHref(link.href)} key={link.label} {...linkTargetProps(link)}>
                {link.label}
              </a>
            ));

            return (
              <div
                className={`footer-link-column${useCompactGrid ? " footer-popular-column" : ""}`}
                key={`${group.title}-${index}`}
              >
                <span className="footer-label">{group.title}</span>
                {useCompactGrid ? <div className="footer-popular-links">{links}</div> : links}
              </div>
            );
          })}
        </div>
      </div>

      {/* <div className="site-container mx-auto w-full max-w-[1320px] px-8 max-[820px]:px-[22px] max-[560px]:px-[18px] footer-disclaimer">
        {legalNotices.map((notice, index) => (
          <div className="footer-notice" key={`${notice.title}-${index}`}>
            <span className="footer-label">{notice.title}</span>
            <div>
              {notice.body.split("\n\n").map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        ))}
      </div> */}
      <div
        className="
    site-container
    relative
    mx-auto
    w-full
    max-w-[1320px]
    px-8
    py-10
    max-[820px]:px-[22px]
    max-[560px]:px-[18px]
  "
      >
        <div
          className="
      relative
      overflow-hidden
      rounded-[28px]
      border
      border-sky/25

      bg-[linear-gradient(145deg,rgba(3,19,47,0.94),rgba(4,26,67,0.82))]

      p-3

      shadow-[0_28px_70px_rgba(0,8,34,0.28),inset_0_1px_rgba(139,220,255,0.10)]

      max-[560px]:rounded-[22px]
      max-[560px]:p-2
    "
        >
          {/* blueprint background */}
          <div
            aria-hidden="true"
            className="
        pointer-events-none
        absolute
        inset-0
        opacity-[0.12]

        bg-[linear-gradient(rgba(139,220,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(139,220,255,0.18)_1px,transparent_1px)]
        bg-[size:58px_58px]
      "
          />

          {/* soft glow */}
          <div
            aria-hidden="true"
            className="
        pointer-events-none
        absolute
        -left-20
        top-1/3
        size-72
        rounded-full
        bg-electric/10
        blur-[90px]
      "
          />

          <div
            aria-hidden="true"
            className="
        pointer-events-none
        absolute
        -right-24
        -top-24
        size-72
        rounded-full
        bg-cobalt-700/15
        blur-[90px]
      "
          />

          <div className="relative grid grid-cols-2 gap-3 max-[820px]:grid-cols-1">
            {legalNotices.map((notice, index) => (
              <div
                key={`${notice.title}-${index}`}
                className="
            group
            relative
            overflow-hidden

            rounded-[20px]
            border
            border-sky/15

            bg-[linear-gradient(135deg,rgba(6,40,95,0.66),rgba(3,19,47,0.78))]

            p-6

            shadow-[inset_0_1px_rgba(168,228,255,0.08)]

            transition-[transform,border-color,background-color,box-shadow]
            duration-300

            hover:-translate-y-1
            hover:border-sky/35
            hover:shadow-[0_14px_32px_rgba(0,10,40,0.20),inset_0_1px_rgba(168,228,255,0.12)]

            max-[560px]:rounded-[17px]
            max-[560px]:p-5
          "
              >
                {/* top signal line */}
                <span
                  aria-hidden="true"
                  className="
              absolute
              left-6
              top-0
              h-px
              w-12
              bg-[linear-gradient(90deg,var(--blue-electric),transparent)]

              transition-all
              duration-300

              group-hover:w-24
            "
                />

                <div className="flex items-start gap-4">
                  {/* network node / number */}
                  <div
                    className="
                relative
                mt-0.5
                grid
                size-9
                shrink-0
                place-items-center
                rounded-[11px]

                border
                border-sky/25

                bg-electric/10

                font-mono
                text-[10px]
                font-bold
                tracking-[0.08em]
                text-sky

                shadow-[inset_0_1px_rgba(255,255,255,0.08)]
              "
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}

                    <span
                      className="
                  absolute
                  -right-1
                  -top-1
                  size-2
                  rounded-full
                  border
                  border-navy-900
                  bg-electric
                  shadow-[0_0_8px_rgba(22,140,245,0.85)]
                "
                    />
                  </div>

                  <div className="min-w-0">
                    {/* CMS title */}
                    <span
                      className="
                  block
                  text-[11px]
                  font-extrabold
                  uppercase
                  tracking-[0.15em]
                  text-sky
                "
                    >
                      {notice.title}
                    </span>

                    {/* CMS body */}
                    <div className="mt-3 space-y-2.5">
                      {notice.body
                        .split("\n\n")
                        .map((paragraph, paragraphIndex) => (
                          <p
                            key={`${paragraph}-${paragraphIndex}`}
                            className="
                      max-w-[58ch]
                      text-[13px]
                      font-medium
                      leading-[1.7]
                      text-[#b8d5eb]
                    "
                          >
                            {paragraph}
                          </p>
                        ))}
                    </div>
                  </div>
                </div>

                {/* corner network decoration */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 120 60"
                  className="
              pointer-events-none
              absolute
              -right-3
              bottom-0
              h-[55px]
              w-[110px]
              opacity-[0.12]
            "
                >
                  <path
                    d="M4 52 L38 30 L70 38 L116 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-sky"
                  />

                  <circle
                    cx="38"
                    cy="30"
                    r="2.5"
                    fill="currentColor"
                    className="text-electric"
                  />
                  <circle
                    cx="70"
                    cy="38"
                    r="2"
                    fill="currentColor"
                    className="text-sky"
                  />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="site-container mx-auto w-full max-w-[1320px] px-8 max-[820px]:px-[22px] max-[560px]:px-[18px] footer-bottom">
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
    </footer>
  );
}
