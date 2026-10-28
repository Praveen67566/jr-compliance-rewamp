"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { linkTargetProps } from "@/lib/link-props";
import type { NavigationCategory, NavigationItem, SiteSettings } from "@/lib/types";

type SiteHeaderProps = {
  navigation: NavigationItem[];
  site: SiteSettings;
};

function sharedHref(href: string) {
  return href.startsWith("#") ? `/${href}` : href;
}

function HeaderLogo({ site }: { site: SiteSettings }) {
  const animationImage = site.headerLogoAnimation.enabled ? site.headerLogoAnimation.image : undefined;
  const imageRef = useRef<HTMLImageElement>(null);
  const [loadedImage, setLoadedImage] = useState<string | null>(null);
  const isReady = Boolean(animationImage && loadedImage === animationImage);
  const pauseAnimation = "group-hover/brand:[animation-play-state:paused] group-focus-visible/brand:[animation-play-state:paused]";

  useEffect(() => {
    // A cached GIF can finish loading before React hydrates the server markup.
    const image = imageRef.current;
    setLoadedImage(image?.complete && image.naturalWidth > 0 ? animationImage ?? null : null);
  }, [animationImage]);

  return (
    <span className="relative block h-12 w-full overflow-hidden">
      <img
        className={`h-full w-full object-contain ${isReady ? `motion-safe:animate-[header-logo-primary_8s_ease-in-out_infinite] ${pauseAnimation}` : ""}`}
        src={site.logo}
        alt={site.name}
        width={184}
        height={48}
      />
      {animationImage ? (
        <img
          key={animationImage}
          ref={imageRef}
          className={`pointer-events-none absolute inset-0 h-full w-full object-contain opacity-0 motion-reduce:hidden! ${isReady ? `motion-safe:animate-[header-logo-festival_8s_ease-in-out_infinite] ${pauseAnimation}` : ""}`}
          src={animationImage}
          alt=""
          aria-hidden="true"
          width={184}
          height={48}
          onLoad={() => setLoadedImage(animationImage)}
          onError={() => setLoadedImage(null)}
        />
      ) : null}
    </span>
  );
}

function CategoryLabel({ category }: { category: NavigationCategory }) {
  return (
    <span className="flex min-w-0 items-center gap-3">
      <span className={`grid size-9 shrink-0 place-items-center rounded-lg border border-sky/20 ${category.logo ? "bg-cloud text-cobalt-700" : "bg-electric/10 text-sky"}`}>
        <CategoryIcon title={category.title} logo={category.logo} />
      </span>
      <span className="min-w-0">{category.title}</span>
    </span>
  );
}

function CategoryIcon({ title, logo }: { title: string; logo?: string }) {
  const [failedLogo, setFailedLogo] = useState<string | null>(null);

  if (logo && logo !== failedLogo) {
    return (
      <img
        key={logo}
        className="size-6 shrink-0 object-contain"
        src={logo}
        alt=""
        width={24}
        height={24}
        aria-hidden="true"
        onError={() => setFailedLogo(logo)}
      />
    );
  }

  const path = /company|corporate/i.test(title)
    ? "M4 21V7h10v14M14 11h6v10M8 11h2m-2 4h2m-2 4h2m8-4h.01M2 21h20M7 7V3h4v4"
    : /import|global|asia|africa|america|australia|europe/i.test(title)
      ? "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3a17 17 0 0 1 0 18 17 17 0 0 1 0-18Z"
      : /license|approval|standards|certification|fssai/i.test(title)
        ? "m12 3 8 4v5c0 5-8 9-8 9s-8-4-8-9V7l8-4Zm-4 9 3 3 5-6"
        : /tax|account|fund|sebi/i.test(title)
          ? "M4 20h16M6 16v-4m6 4V8m6 8V4M4 8l6-4 5 2 5-4"
          : /ipr/i.test(title)
            ? "M9 18h6m-5 3h4M8 13a6 6 0 1 1 8 0c-1 1-1 2-1 3H9c0-1 0-2-1-3Z"
            : "M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Zm0 0v6h6M8 13h8m-8 4h6";

  return (
    <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

function HeaderMegaMenu({ item, menuId, site, onClose }: {
  item: NavigationItem;
  menuId: string;
  site: SiteSettings;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(item.categories?.[0]?.title);
  const searchRef = useRef<HTMLInputElement>(null);
  const search = query.trim().toLowerCase();
  const categories = (item.categories ?? []).map((category, index) => ({
    ...category,
    id: `${menuId}-tab-${index}`,
    links: category.title.toLowerCase().includes(search)
      ? category.links
      : category.links.filter((link) => link.label.toLowerCase().includes(search)),
  })).filter((category) => category.links.length > 0);
  const selectedCategory = categories.find((category) => category.title === activeCategory) ?? categories[0];
  const selectedIndex = categories.findIndex((category) => category === selectedCategory);
  const serviceCount = selectedCategory?.links.length ?? 0;

  return (
    <div
      className="fixed left-1/2 top-[86px] z-[60] h-[min(600px,calc(100dvh-106px))] w-[min(calc(100%-48px),1320px)] -translate-x-1/2 overflow-hidden rounded-[24px] border border-sky/40 bg-cloud shadow-[0_28px_80px_rgba(0,8,34,0.4)] motion-safe:animate-[popover-in_180ms_ease_both] max-[980px]:hidden"
      id={menuId}
    >
      <div className="grid h-full grid-cols-[minmax(260px,25%)_minmax(0,1fr)]">
        <div className="flex min-h-0 flex-col border-r border-sky/20 bg-[linear-gradient(155deg,var(--blue-navy-700),var(--blue-navy-950))] p-4">
          <label className="flex min-h-12 shrink-0 items-center gap-2.5 rounded-xl border border-sky/30 bg-cloud/5 px-3 text-sky transition focus-within:border-sky focus-within:ring-2 focus-within:ring-sky/20">
            <svg className="size-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4 4" />
            </svg>
            <span className="sr-only">Search {item.label} services</span>
            <input
              ref={searchRef}
              className="min-w-0 w-full border-0 bg-transparent py-3 font-[inherit] text-sm text-cloud outline-none placeholder:text-sky-strong/65"
              type="search"
              placeholder="Search services…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <p className="mb-3 mt-5! px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-sky/65">{item.label}</p>
          <div
            className="min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-contain pr-2 [scrollbar-color:var(--blue-cobalt-600)_transparent] [scrollbar-width:thin]"
            aria-label={`${item.label} service categories`}
            role={categories.length ? "tablist" : undefined}
            aria-orientation={categories.length ? "vertical" : undefined}
            onKeyDown={(event) => {
              const index = categories.findIndex((category) => category.id === document.activeElement?.id);
              if (index < 0) return;
              const next = event.key === "ArrowDown" ? (index + 1) % categories.length
                : event.key === "ArrowUp" ? (index - 1 + categories.length) % categories.length
                  : event.key === "Home" ? 0 : event.key === "End" ? categories.length - 1 : -1;
              if (next < 0) return;
              event.preventDefault();
              setActiveCategory(categories[next].title);
              document.getElementById(categories[next].id)?.focus();
            }}
          >
            {categories.map((category, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  className={`group/category flex min-h-[58px] w-full cursor-pointer appearance-none items-center gap-3 rounded-xl border px-3 py-3 text-left text-[13px]! leading-snug! transition-[background-color,border-color,color] duration-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sky ${isSelected
                    ? "border-sky/45 bg-electric/20 font-semibold! text-cloud! shadow-[inset_3px_0_var(--blue-sky)]"
                    : "border-transparent bg-transparent font-medium! text-sky-strong/80! hover:border-sky/20 hover:bg-sky/8 hover:text-cloud!"}`}
                  key={category.title}
                  id={category.id}
                  type="button"
                  role="tab"
                  tabIndex={isSelected ? 0 : -1}
                  aria-selected={isSelected}
                  aria-controls={`${menuId}-panel`}
                  onMouseEnter={() => setActiveCategory(category.title)}
                  onClick={() => setActiveCategory(category.title)}
                >
                  <span className={`grid size-9 shrink-0 place-items-center rounded-[10px] border ${category.logo ? "border-sky/30 bg-cloud text-cobalt-700" : isSelected ? "border-sky/30 bg-electric/25 text-sky" : "border-sky/15 bg-cloud/5 text-sky/70"}`}>
                    <CategoryIcon title={category.title} logo={category.logo} />
                  </span>
                  <span className="min-w-0 flex-1">{category.title}</span>
                  <span className={`shrink-0 text-lg ${isSelected ? "text-sky" : "text-sky/45"}`} aria-hidden="true">›</span>
                </button>
              );
            })}
          </div>
        </div>

        <section className="flex min-h-0 min-w-0 flex-col bg-[linear-gradient(135deg,var(--blue-cloud),white_70%,var(--blue-ice))] text-navy-950">
          <div
            className="flex min-h-0 flex-1 flex-col"
            id={`${menuId}-panel`}
            role="tabpanel"
            aria-labelledby={selectedCategory?.id}
            aria-label={selectedCategory ? undefined : "Search results"}
            tabIndex={0}
          >
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 [scrollbar-color:var(--blue-cobalt-600)_transparent] [scrollbar-width:thin] max-[1100px]:px-4">
              {selectedCategory ? (
                <div className="grid grid-cols-3 gap-x-3 gap-y-1 max-[1100px]:grid-cols-2">
                  {selectedCategory.links.map((link) => (
                    <a
                      className="group/service-link flex min-h-[58px] min-w-0 items-center justify-between gap-3 rounded-xl border border-transparent px-3 py-3 text-sm font-medium leading-[1.5] text-navy-700! transition-[background-color,border-color,color] duration-200 hover:border-electric/20 hover:bg-ice hover:text-cobalt-700! focus-visible:border-electric/30 focus-visible:bg-ice focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric"
                      href={sharedHref(link.href)}
                      key={link.label}
                      {...linkTargetProps(link)}
                      onClick={onClose}
                    >
                      <span className="min-w-0">{link.label}</span>
                      <span className="grid size-6 shrink-0 place-items-center rounded-full text-lg leading-none text-cobalt-700/35 transition-[background-color,color] group-hover/service-link:bg-electric/10 group-hover/service-link:text-cobalt-700 group-focus-visible/service-link:text-cobalt-700" aria-hidden="true">›</span>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="grid h-full content-center justify-items-center gap-3 px-6 text-center">
                  <h2 className="m-0 text-lg font-semibold! text-navy-950">No services found</h2>
                  <p className="m-0 text-sm text-navy-700">Try another service or category name.</p>
                  <button className="cursor-pointer rounded-lg border border-cobalt-700/20 bg-ice px-4 py-2 text-sm! font-semibold! text-cobalt-700! focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric" type="button" onClick={() => { setQuery(""); searchRef.current?.focus(); }}>Clear search</button>
                </div>
              )}
            </div>
          </div>
          <div className="flex shrink-0 items-center justify-between gap-4 border-t border-cobalt-700/10 bg-ice/75 px-8 py-4 max-[1100px]:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <span className={`grid size-10 shrink-0 place-items-center rounded-xl border border-electric/15 text-cobalt-700 ${selectedCategory?.logo ? "bg-cloud" : "bg-electric/10"}`}>
                <CategoryIcon title={selectedCategory?.title ?? item.label} logo={selectedCategory?.logo} />
              </span>
              <div className="min-w-0">
                <p className="mb-1 truncate text-[13px] font-semibold text-navy-950">{selectedCategory?.title ?? item.label}</p>
                <p className="m-0 text-xs text-cobalt-700" role="status">{serviceCount} {serviceCount === 1 ? "service" : "services"}{search ? " matching your search" : " available"}</p>
              </div>
            </div>
            <a className="inline-flex shrink-0 items-center gap-3 rounded-xl border border-electric/30 bg-cobalt-700 px-4 py-3 text-[13px] font-semibold text-cloud! transition hover:bg-navy-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric" href={sharedHref(site.headerCta.href)} {...linkTargetProps(site.headerCta)} onClick={onClose}>{site.headerCta.label}<span aria-hidden="true">↗</span></a>
          </div>
        </section>
      </div>
    </div>
  );
}

// const headerContactActionClass =
//   "grid size-9 shrink-0 place-items-center rounded-full border text-white transition-[background-color,border-color,box-shadow,transform] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric motion-safe:hover:-translate-y-0.5";

export function SiteHeader({ navigation, site }: SiteHeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const desktopNavigationRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);

  const closeAll = useCallback(() => {
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileSection(null);
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 981px)");
    desktop.addEventListener("change", closeAll);
    return () => desktop.removeEventListener("change", closeAll);
  }, [closeAll]);

  useEffect(() => {
    if (!openMenu && !mobileOpen) return;

    const closeOnOutsidePointerDown = (event: PointerEvent) => {
      const boundary = window.matchMedia("(min-width: 981px)").matches
        ? desktopNavigationRef.current
        : headerRef.current;

      if (event.target instanceof Node && !boundary?.contains(event.target)) {
        closeAll();
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePointerDown);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePointerDown);
  }, [closeAll, mobileOpen, openMenu]);

  return (
    <header
      ref={headerRef}
      className="site-header min-[981px]:py-2!"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          const trigger = headerRef.current?.querySelector<HTMLButtonElement>('[aria-expanded="true"]');
          closeAll();
          trigger?.focus();
        }
      }}
    >
      <div className="header-shell site-container mx-auto w-full max-w-[1320px] px-8 min-[981px]:min-h-[62px]! min-[981px]:gap-3! min-[981px]:rounded-[18px]! min-[981px]:py-1.5! max-[820px]:px-[22px] max-[560px]:px-[18px]">
        <div className="header-brand-area">
          <a className="group/brand block w-[184px] shrink-0 max-[1100px]:w-[164px] max-[560px]:w-[156px]" href="/" aria-label={`${site.name} home`} onClick={closeAll}>
            <HeaderLogo site={site} />
          </a>
        </div>

        <div className="header-navigation-shell min-[981px]:rounded-xl! min-[981px]:p-[3px]!" ref={desktopNavigationRef}>
          <nav className="desktop-navigation min-[981px]:gap-0.5!" aria-label="Primary navigation">
            {navigation.map((item) => {
              const isOpen = openMenu === item.label;
              const hasChildren = Boolean(item.children?.length);
              const hasCategories = Boolean(item.categories?.length);
              const hasMenu = hasCategories || hasChildren;
              const menuId = `menu-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

              return (
                <div className="navigation-item" key={item.label}>
                  {hasMenu ? (
                    <button
                      className="nav-link nav-menu-trigger min-[981px]:gap-1.5! min-[981px]:px-2.5! min-[981px]:py-2! min-[981px]:max-[1100px]:px-2!"
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={menuId}
                      onClick={() => {
                        if (isOpen) {
                          setOpenMenu(null);
                          return;
                        }

                        setOpenMenu(item.label);
                      }}
                    >
                      {item.label}
                      <span className="chevron" aria-hidden="true">
                        <svg className="block size-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m4 6 4 4 4-4" /></svg>
                      </span>
                    </button>
                  ) : (
                    <a
                      className="nav-link min-[981px]:gap-1.5! min-[981px]:px-2.5! min-[981px]:py-2! min-[981px]:max-[1100px]:px-2!"
                      href={sharedHref(item.href)}
                      {...linkTargetProps(item)}
                      onClick={closeAll}
                    >
                      {item.label}
                    </a>
                  )}

                  {hasCategories && isOpen ? (
                    <HeaderMegaMenu item={item} menuId={menuId} site={site} onClose={closeAll} />
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
              <span className="text-[7px] font-semibold uppercase leading-none tracking-[0.16em] text-cobalt-700/60">
                Call us
              </span>
              <span className="mt-1 whitespace-nowrap text-[11px] font-semibold leading-none tracking-[0.01em] text-navy-950">
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
                    className="flex w-full cursor-pointer appearance-none items-center justify-between border-0 bg-transparent py-[9px] text-left text-[0.96rem]! font-semibold! text-cloud focus-visible:rounded focus-visible:outline-2 focus-visible:outline-sky"
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
                    className="flex items-center justify-between py-[9px] text-[0.96rem] font-semibold text-cloud focus-visible:rounded focus-visible:outline-2 focus-visible:outline-sky"
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
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-2 pl-3 text-[0.82rem] font-medium text-[#c7e7fb] marker:content-none [&::-webkit-details-marker]:hidden">
                          <CategoryLabel category={category} />
                          <span
                            className="text-sky transition-transform duration-200 group-open/mobile-category:rotate-45"
                            aria-hidden="true"
                          >
                            +
                          </span>
                        </summary>
                        <div className="grid gap-1 pb-3 pl-3">
                          {category.links.map((link) => (
                            <a
                              className="rounded-lg border border-sky/10 bg-sky/5 px-3 py-3 text-[0.8rem] font-medium text-sky-strong! transition hover:border-sky/30 hover:bg-sky/10 hover:text-cloud! focus-visible:outline-2 focus-visible:outline-sky"
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
              className="mr-2 mt-4 inline-flex items-center justify-center rounded-full border border-sky/50 bg-ice px-[17px] py-3 text-[0.85rem] font-semibold text-[#0b315f] transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-sky-strong hover:bg-cloud focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky"
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
