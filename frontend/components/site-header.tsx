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

// const headerContactActionClass =
//   "grid size-9 shrink-0 place-items-center rounded-full border text-white transition-[background-color,border-color,box-shadow,transform] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric motion-safe:hover:-translate-y-0.5";

export function SiteHeader({ navigation, site }: SiteHeaderProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);

  const closeAll = () => {
    setOpenMenu(null);
    setActiveCategory(null);
    setMobileOpen(false);
    setMobileSection(null);
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
          {/* <a
            className={`${headerContactActionClass} border-cobalt-600/55 bg-electric shadow-[inset_0_1px_rgba(255,255,255,0.3),0_7px_16px_rgba(13,92,184,0.25)] hover:border-cobalt-700 hover:bg-cobalt-700 hover:shadow-[0_10px_20px_rgba(13,92,184,0.3)]`}
            href={site.phoneHref}
            aria-label={`Call ${site.phone}`}
            onClick={closeAll}
          >
            <svg
              aria-hidden="true"
              className="size-[18px]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#ffffff"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.69A2 2 0 0 1 22 16.92Z" />
            </svg>
          </a> */}

          {/* {site.whatsAppHref ? (
            <a
              className={`${headerContactActionClass} border-[#1fbd5b] bg-[#25d366] shadow-[inset_0_1px_rgba(255,255,255,0.35),0_7px_16px_rgba(37,211,102,0.25)] hover:border-[#199f4c] hover:bg-[#20bd5a] hover:shadow-[0_10px_20px_rgba(37,211,102,0.3)]`}
              href={site.whatsAppHref}
              target="_blank"
              rel="noreferrer"
              aria-label={`Chat with ${site.name} on WhatsApp`}
              onClick={closeAll}
            >
              <svg
                aria-hidden="true"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#ffffff"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.5 11.7a8.5 8.5 0 0 1-12.64 7.43L3.5 20.5l1.37-4.36A8.5 8.5 0 1 1 20.5 11.7Z" />
                <path
                  d="M8.3 7.9c.2-.43.42-.44.72-.45h.38c.12 0 .3.04.46.38.16.35.55 1.35.6 1.45.05.1.08.22.02.35-.06.14-.1.22-.2.34-.1.12-.21.26-.3.35-.1.1-.2.2-.09.4.12.2.5.82 1.08 1.33.74.66 1.36.86 1.56.96.2.1.31.08.43-.05.12-.14.5-.58.63-.78.13-.2.27-.16.45-.1.19.07 1.18.56 1.38.66.2.1.34.15.39.23.05.09.05.5-.12.98-.17.48-.98.92-1.35.97-.35.05-.8.08-1.3-.08-.3-.1-.7-.22-1.2-.44-.5-.22-2.2-.81-3.72-2.77-.43-.55-.9-1.47-.9-2.8 0-1.32.68-1.97.93-2.24Z"
                  fill="#ffffff"
                  stroke="none"
                />
              </svg>
            </a>
          ) : null} */}

          <a
            className="group hidden h-10 shrink-0 items-center gap-2 rounded-full border border-cobalt-700/20 bg-ice/90 px-2.5 text-navy-950 shadow-[inset_0_1px_rgba(255,255,255,0.9),0_6px_14px_rgba(3,15,43,0.1)] transition-[background-color,border-color,box-shadow,transform] duration-200 hover:border-electric/45 hover:bg-cloud hover:shadow-[0_8px_18px_rgba(3,15,43,0.14)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric motion-safe:hover:-translate-y-0.5 min-[981px]:flex max-[1100px]:size-10 max-[1100px]:justify-center max-[1100px]:p-0"
            href={site.phoneHref}
            aria-label={`Call ${site.phone}`}
            onClick={closeAll}
          >
            <span
              aria-hidden="true"
              className="grid size-7 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,var(--blue-electric),var(--blue-cobalt-700))] text-white shadow-[inset_0_1px_rgba(255,255,255,0.3),0_4px_9px_rgba(22,140,245,0.22)] transition-transform duration-200 group-hover:scale-105"
            >
              <svg
                className="size-[14px]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.69A2 2 0 0 1 22 16.92Z" />
              </svg>
            </span>
            <span className="flex flex-col pr-1 max-[1100px]:hidden">
              <span className="text-[7px] font-extrabold uppercase leading-none tracking-[0.16em] text-cobalt-700/60">
                Call us
              </span>
              <span className="mt-1 whitespace-nowrap text-[11px] font-extrabold leading-none tracking-[0.01em] text-navy-950">
                {site.phone}
              </span>
            </span>
          </a>

          {site.loginButton.enabled ? (
            <a
              className="header-cta max-[980px]:hidden"
              href={sharedHref(site.loginButton.href)}
              onClick={closeAll}
            >
              {site.loginButton.label} <span aria-hidden="true">↗</span>
            </a>
          ) : null}

          <a className="header-cta" href={sharedHref(site.headerCta.href)} {...linkTargetProps(site.headerCta)}>
            {site.headerCta.label} <span aria-hidden="true">↗</span>
          </a>

          <button
            className="mobile-menu-button"
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => {
              setMobileOpen(!mobileOpen);
              if (mobileOpen) {
                setMobileSection(null);
              }
            }}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <nav
          id="mobile-navigation"
          className="mobile-navigation site-container mx-auto max-h-[calc(100dvh-108px)] w-full max-w-[1320px] overflow-y-auto overscroll-contain px-8 [scrollbar-gutter:stable] max-[820px]:px-[22px] max-[560px]:px-[18px]"
          aria-label="Mobile navigation"
        >
          {navigation.map((item) => {
            const hasCategories = Boolean(item.categories?.length);
            const isMobileSectionOpen = mobileSection === item.label;
            const mobileSectionId = `mobile-menu-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

            return (
              <div className="mobile-nav-group" key={item.label}>
                {hasCategories ? (
                  <button
                    className="flex w-full cursor-pointer appearance-none items-center justify-between border-0 bg-transparent py-[9px] text-left text-[0.96rem] font-bold text-cloud focus-visible:rounded focus-visible:outline-2 focus-visible:outline-sky"
                    type="button"
                    aria-label={`${isMobileSectionOpen ? "Collapse" : "Expand"} ${item.label} menu`}
                    aria-expanded={isMobileSectionOpen}
                    aria-controls={mobileSectionId}
                    onClick={() => setMobileSection(isMobileSectionOpen ? null : item.label)}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`text-xl leading-none text-sky transition-transform duration-200 ${isMobileSectionOpen ? "rotate-45" : ""}`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                ) : (
                  <a
                    className="flex items-center justify-between py-[9px] text-[0.96rem] font-bold text-cloud focus-visible:rounded focus-visible:outline-2 focus-visible:outline-sky"
                    href={sharedHref(item.href)}
                    {...linkTargetProps(item)}
                    onClick={closeAll}
                  >
                    {item.label}
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
                {hasCategories && isMobileSectionOpen ? (
                  <div id={mobileSectionId}>
                    {item.categories?.map((category) => (
                      <details
                        className="group/mobile-category border-t border-sky/15 py-1 first:border-t-0"
                        key={category.title}
                        name={`${mobileSectionId}-categories`}
                      >
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-2 pl-3 text-[0.82rem] font-bold text-[#c7e7fb] marker:content-none [&::-webkit-details-marker]:hidden">
                          {category.title}
                          <span
                            className="text-sky transition-transform duration-200 group-open/mobile-category:rotate-45"
                            aria-hidden="true"
                          >
                            +
                          </span>
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
                  </div>
                ) : null}
                {!hasCategories
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
            );
          })}
          {site.loginButton.enabled ? (
            <a
              className="mr-2 mt-4 inline-flex items-center justify-center rounded-full border border-sky/50 bg-ice px-[17px] py-3 text-[0.85rem] font-extrabold text-[#0b315f] transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-sky-strong hover:bg-cloud focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky"
              href={sharedHref(site.loginButton.href)}
              onClick={closeAll}
            >
              {site.loginButton.label}
            </a>
          ) : null}
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
