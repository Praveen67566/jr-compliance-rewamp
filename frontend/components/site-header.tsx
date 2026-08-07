"use client";

import { useState } from "react";

import type { NavigationItem, SiteSettings } from "@/lib/types";

type SiteHeaderProps = {
  navigation: NavigationItem[];
  site: SiteSettings;
};

export function SiteHeader({ navigation, site }: SiteHeaderProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeAll = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };

  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          closeAll();
        }
      }}
    >
      <div className="header-shell container">
        <div className="header-brand-area">
          <a className="brand" href="#top" aria-label={`${site.name} home`} onClick={closeAll}>
            <img src={site.logo} alt={site.name} />
          </a>
        </div>

        <div className="header-navigation-shell">
          <nav className="desktop-navigation" aria-label="Primary navigation">
            {navigation.map((item) => {
              const isOpen = openMenu === item.label;
              const hasChildren = Boolean(item.children?.length);

              return (
                <div className="navigation-item" key={item.label}>
                  {hasChildren ? (
                    <button
                      className="nav-link nav-menu-trigger"
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenMenu(isOpen ? null : item.label)}
                    >
                      {item.label}
                      <span className="chevron" aria-hidden="true">
                        ↓
                      </span>
                    </button>
                  ) : (
                    <a className="nav-link" href={item.href} onClick={closeAll}>
                      {item.label}
                    </a>
                  )}

                  {hasChildren && isOpen ? (
                    <div className="nav-popover">
                      <span className="popover-kicker">{item.label}</span>
                      {item.children?.map((child) => (
                        <a href={child.href} key={child.label} onClick={closeAll}>
                          <span>{child.label}</span>
                          <span aria-hidden="true">↗</span>
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>
        </div>

        <div className="header-utility-area">
          <a className="header-cta" href="#contact">
            Contact Us <span aria-hidden="true">↗</span>
          </a>

          <button
            className="mobile-menu-button"
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((isOpen) => !isOpen)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <nav className="mobile-navigation container" aria-label="Mobile navigation">
          {navigation.map((item) => (
            <div className="mobile-nav-group" key={item.label}>
              <a href={item.href} onClick={closeAll}>
                {item.label}
                <span aria-hidden="true">↗</span>
              </a>
              {item.children?.map((child) => (
                <a className="mobile-subnav-link" href={child.href} key={child.label} onClick={closeAll}>
                  {child.label}
                </a>
              ))}
            </div>
          ))}
          <a className="mobile-contact-link" href="#contact" onClick={closeAll}>
            Contact Us
          </a>
        </nav>
      ) : null}
    </header>
  );
}
