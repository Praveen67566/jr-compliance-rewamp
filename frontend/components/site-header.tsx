"use client";

import { useState } from "react";

import { linkTargetProps } from "@/lib/link-props";
import type { NavigationItem, SiteSettings } from "@/lib/types";

type SiteHeaderProps = {
  navigation: NavigationItem[];
  site: SiteSettings;
};

function sharedHref(href: string) {
  return href.startsWith("#") ? `/${href}` : href;
}

export function SiteHeader({ navigation, site }: SiteHeaderProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeAll = () => {
    setOpenMenu(null);
    setActiveCategory(null);
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
      <div className="header-shell site-container mx-auto w-full max-w-[1320px] px-8 max-[820px]:px-[22px] max-[560px]:px-[18px]">
        <div className="header-brand-area">
          <a className="brand" href="/" aria-label={`${site.name} home`} onClick={closeAll}>
            <img src={site.logo} alt={site.name} />
          </a>
        </div>

        <div className="header-navigation-shell">
          <nav className="desktop-navigation" aria-label="Primary navigation">
            {navigation.map((item) => {
              const isOpen = openMenu === item.label;
              const hasChildren = Boolean(item.children?.length);
              const hasCategories = Boolean(item.categories?.length);
              const hasMenu = hasCategories || hasChildren;
              const menuId = `menu-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
              const selectedCategory = item.categories?.find((category) => category.title === activeCategory) ?? item.categories?.[0];

              return (
                <div className="navigation-item" key={item.label}>
                  {hasMenu ? (
                    <button
                      className="nav-link nav-menu-trigger"
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={menuId}
                      onClick={() => {
                        if (isOpen) {
                          setOpenMenu(null);
                          setActiveCategory(null);
                          return;
                        }

                        setOpenMenu(item.label);
                        setActiveCategory(item.categories?.[0]?.title ?? null);
                      }}
                    >
                      {item.label}
                      <span className="chevron" aria-hidden="true">
                        ↓
                      </span>
                    </button>
                  ) : (
                    <a
                      className="nav-link"
                      href={sharedHref(item.href)}
                      {...linkTargetProps(item)}
                      onClick={closeAll}
                    >
                      {item.label}
                    </a>
                  )}

                  {hasCategories && isOpen && selectedCategory ? (
                    <div
                      className="fixed left-1/2 top-[94px] z-[60] h-[min(620px,calc(100vh-118px))] w-[min(92vw,1320px)] -translate-x-1/2 overflow-hidden rounded-[30px] border border-sky/45 bg-navy-900 shadow-[0_34px_84px_rgba(0,8,34,0.46)] motion-safe:animate-[popover-in_180ms_ease_both]"
                      id={menuId}
                    >
                      <div className="grid h-full grid-cols-[minmax(290px,25%)_minmax(0,1fr)] overflow-hidden">
                        <nav
                          className="overflow-y-auto border-r border-sky/25 bg-[linear-gradient(160deg,var(--blue-navy-800),var(--blue-navy-950))] px-2 py-4"
                          aria-label={`${item.label} service categories`}
                          role="tablist"
                        >
                          {item.categories?.map((category) => {
                            const isSelected = category.title === selectedCategory.title;

                            return (
                              <button
                                className={`mb-1.5 flex min-h-12 w-full appearance-none items-center justify-between rounded-2xl bg-transparent px-5 py-3.5 text-left text-[0.93rem] font-extrabold leading-tight transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky ${
                                  isSelected
                                    ? "border border-sky bg-[linear-gradient(135deg,var(--blue-cobalt-700),var(--blue-navy-700))] text-cloud shadow-[inset_0_1px_rgba(255,255,255,0.22),0_10px_26px_rgba(0,64,155,0.2)]"
                                    : "border border-transparent text-[#c7e7fb] hover:border-sky/30 hover:bg-sky/10 hover:text-cloud"
                                }`}
                                key={category.title}
                                type="button"
                                role="tab"
                                aria-selected={isSelected}
                                aria-controls={`${menuId}-panel`}
                                onClick={() => setActiveCategory(category.title)}
                              >
                                <span>{category.title}</span>
                                <span className="ml-3 text-sky" aria-hidden="true">
                                  ›
                                </span>
                              </button>
                            );
                          })}
                        </nav>

                        <section
                          className="min-w-0 overflow-y-auto bg-[linear-gradient(135deg,#f8fcff,#edf7ff)] p-9 text-[#0b315f]"
                          id={`${menuId}-panel`}
                          role="tabpanel"
                        >
                          <div className="flex items-start justify-between gap-6 border-b border-cobalt-700/15 pb-7">
                            <h2 className="font-display text-[clamp(2rem,2.5vw,3.2rem)] leading-[0.96] tracking-[-0.05em] text-[#071b43]">
                              {selectedCategory.title}{" "}
                              <span className="align-middle text-electric" aria-hidden="true">
                                •
                              </span>
                            </h2>
                            <span
                              className="grid size-10 shrink-0 place-items-center rounded-full border border-cobalt-700/20 font-display text-lg text-[#0b315f]"
                              aria-hidden="true"
                            >
                              R
                            </span>
                          </div>
                          <div className="grid grid-cols-3 gap-x-9 gap-y-5 pt-8 max-[1100px]:grid-cols-2">
                            {selectedCategory.links.map((link) => (
                              <a
                                className="rounded-md text-[1rem] font-extrabold leading-[1.25] text-[#123665] outline-none transition hover:text-cobalt-700 focus-visible:bg-sky/20 focus-visible:text-cobalt-700"
                                href={sharedHref(link.href)}
                                key={link.label}
                                {...linkTargetProps(link)}
                                onClick={closeAll}
                              >
                                {link.label}
                              </a>
                            ))}
                          </div>
                        </section>
                      </div>
                    </div>
                  ) : hasChildren && isOpen ? (
                    <div className="nav-popover">
                      <span className="popover-kicker">{item.label}</span>
                      {item.children?.map((child) => (
                        <a
                          href={sharedHref(child.href)}
                          key={child.label}
                          {...linkTargetProps(child)}
                          onClick={closeAll}
                        >
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
          <a className="header-cta" href={sharedHref(site.headerCta.href)} {...linkTargetProps(site.headerCta)}>
            {site.headerCta.label} <span aria-hidden="true">↗</span>
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
        <nav className="mobile-navigation site-container mx-auto w-full max-w-[1320px] px-8 max-[820px]:px-[22px] max-[560px]:px-[18px]" aria-label="Mobile navigation">
          {navigation.map((item) => (
            <div className="mobile-nav-group" key={item.label}>
              <a href={sharedHref(item.href)} {...linkTargetProps(item)} onClick={closeAll}>
                {item.label}
                <span aria-hidden="true">↗</span>
              </a>
              {item.categories?.map((category) => (
                <details className="border-t border-sky/15 py-1 first:border-t-0" key={category.title}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-2 pl-3 text-[0.82rem] font-bold text-[#c7e7fb] marker:content-none">
                    {category.title}
                    <span className="text-sky" aria-hidden="true">+</span>
                  </summary>
                  <div className="grid gap-1 pb-2 pl-3">
                    {category.links.map((link) => (
                      <a
                        className="py-1 text-[0.77rem] text-[#b7daf2] hover:text-cloud focus-visible:rounded focus-visible:outline-2 focus-visible:outline-sky"
                        href={sharedHref(link.href)}
                        key={link.label}
                        {...linkTargetProps(link)}
                        onClick={closeAll}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </details>
              ))}
              {!item.categories?.length
                ? item.children?.map((child) => (
                    <a
                      className="mobile-subnav-link"
                      href={sharedHref(child.href)}
                      key={child.label}
                      {...linkTargetProps(child)}
                      onClick={closeAll}
                    >
                      {child.label}
                    </a>
                  ))
                : null}
            </div>
          ))}
          <a
            className="mobile-contact-link"
            href={sharedHref(site.headerCta.href)}
            {...linkTargetProps(site.headerCta)}
            onClick={closeAll}
          >
            {site.headerCta.label}
          </a>
        </nav>
      ) : null}
    </header>
  );
}
