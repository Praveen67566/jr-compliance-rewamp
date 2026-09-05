import type { PropsWithChildren } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { PageChromeContent } from "@/lib/types";

type SitePageShellProps = PropsWithChildren<PageChromeContent>;

/** Shared, content-driven chrome for the home page and every editorial route. */
export function SitePageShell({ children, footer, navigation, site }: SitePageShellProps) {
  return (
    <div className="site-shell">
      <SiteHeader navigation={navigation} site={site} />
      <main>{children}</main>
      <SiteFooter footer={footer} site={site} />
      {site.whatsAppHref ? (
        <a
          className="group/whatsapp fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-[calc(1rem+env(safe-area-inset-right))] z-[40] block size-[60px] rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky min-[560px]:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] min-[560px]:right-[calc(1.5rem+env(safe-area-inset-right))]"
          href={site.whatsAppHref}
          target="_blank"
          rel="noreferrer"
          aria-label={`Chat with ${site.name} on WhatsApp`}
          aria-describedby="whatsapp-contact-preview"
        >
          <span
            id="whatsapp-contact-preview"
            role="tooltip"
            className="pointer-events-none absolute bottom-[calc(100%+2.5rem)] right-0 z-[2] block w-[290px] max-w-[calc(100vw_-_2rem_-_env(safe-area-inset-left)_-_env(safe-area-inset-right))] origin-bottom-right translate-y-3 scale-[0.96] rounded-[18px] border border-sky/20 bg-[linear-gradient(155deg,var(--blue-navy-800),var(--blue-navy-950))] px-[1.1rem] pb-[1.1rem] pt-4 text-left text-ice opacity-0 shadow-[0_26px_60px_rgba(0,8,34,0.5)] transition-[opacity,translate,scale] duration-[350ms] ease-[cubic-bezier(.22,1,.36,1)] before:absolute before:-bottom-2 before:right-[22px] before:size-4 before:rotate-45 before:rounded-br-[3px] before:border-b before:border-r before:border-sky/20 before:bg-navy-950 before:content-[''] after:absolute after:inset-x-0 after:-bottom-10 after:h-10 after:content-[''] pointer-fine:group-hover/whatsapp:pointer-events-auto pointer-fine:group-hover/whatsapp:translate-y-0 pointer-fine:group-hover/whatsapp:scale-100 pointer-fine:group-hover/whatsapp:opacity-100 group-focus-visible/whatsapp:pointer-events-auto group-focus-visible/whatsapp:translate-y-0 group-focus-visible/whatsapp:scale-100 group-focus-visible/whatsapp:opacity-100 motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:transition-none"
          >
            <span className="mb-3 flex items-center gap-2.5">
              <span
                className="grid size-[34px] flex-none place-items-center rounded-full border border-sky/50 bg-[radial-gradient(circle_at_30%_22%,#489fff_0%,#1467ca_46%,#08295f_100%)] text-[0.85rem] font-bold text-white"
                aria-hidden="true"
              >
                JR
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[0.82rem] font-bold text-white">{site.name} Assistant</span>
                <span className="mt-0.5 flex items-center gap-1.5 text-[0.68rem] font-semibold text-[#25d366]">
                  <span
                    className="size-1.5 flex-none rounded-full bg-[#25d366] shadow-[0_0_6px_#25d366] motion-safe:animate-pulse"
                    aria-hidden="true"
                  />
                  Online now · 24/7
                </span>
              </span>
            </span>
            <span
              className="mb-2.5 flex w-fit items-center gap-1 py-2 pb-[0.2rem]"
              aria-hidden="true"
            >
              <span className="size-1.5 rounded-full bg-[#a9c8e5]/65 motion-safe:animate-bounce motion-safe:[animation-duration:1.1s]" />
              <span className="size-1.5 rounded-full bg-[#a9c8e5]/65 motion-safe:animate-bounce motion-safe:[animation-delay:150ms] motion-safe:[animation-duration:1.1s]" />
              <span className="size-1.5 rounded-full bg-[#a9c8e5]/65 motion-safe:animate-bounce motion-safe:[animation-delay:300ms] motion-safe:[animation-duration:1.1s]" />
            </span>
            <span className="mb-3.5 block text-[0.82rem] leading-[1.55] text-ice">
              {site.footerTagline}
            </span>
            <span className="flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(150deg,#25d366,#128c7e)] px-4 py-[0.7rem] text-[0.82rem] font-bold text-white shadow-[0_8px_18px_rgba(18,140,126,0.4)]">
              <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.44.79 3.06 1.2 4.72 1.2h.01c5.46 0 9.91-4.45 9.91-9.91.01-5.46-4.44-9.91-9.9-9.91zm0 18.14h-.01c-1.46 0-2.89-.39-4.14-1.13l-.3-.18-3.11.82.83-3.03-.19-.31a8.19 8.19 0 0 1-1.26-4.4c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.22-8.3 8.22zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.15.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.23.89 2.41 1.02 2.58.12.17 1.76 2.69 4.27 3.77.6.26 1.06.41 1.43.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29z" />
              </svg>
              Chat on WhatsApp
            </span>
          </span>
          <span
            className="pointer-events-none absolute -top-[38px] left-1/2 z-[3] flex -translate-x-1/2 items-center gap-[0.35rem] whitespace-nowrap rounded-full bg-[linear-gradient(135deg,#1b95ff,#376bed)] py-[0.4rem] pl-[0.55rem] pr-[0.7rem] text-[0.68rem] font-bold tracking-[0.01em] text-white shadow-[0_8px_18px_rgba(15,113,241,0.45),inset_0_1px_rgba(255,255,255,0.25)] after:absolute after:-bottom-1 after:left-1/2 after:size-[9px] after:-translate-x-1/2 after:rotate-45 after:rounded-br-[2px] after:bg-[#2e7ff0] after:content-['']"
            aria-hidden="true"
          >
            <span className="size-[5px] rounded-full bg-[#5fe3b0] shadow-[0_0_6px_#5fe3b0] motion-safe:animate-pulse" />
            24/7 AI
          </span>
          <span className="relative isolate grid size-[60px] place-items-center rounded-full bg-[linear-gradient(150deg,#25d366,#128c7e)] text-white shadow-[0_12px_28px_rgba(18,140,126,0.45),inset_0_1px_rgba(255,255,255,0.3)] transition-[translate,scale] duration-250 ease-[cubic-bezier(.22,1,.36,1)] pointer-fine:group-hover/whatsapp:-translate-y-[3px] pointer-fine:group-hover/whatsapp:scale-[1.04] group-focus-visible/whatsapp:-translate-y-[3px] group-focus-visible/whatsapp:scale-[1.04] motion-reduce:transition-none">
            <span
              className="pointer-events-none absolute inset-0 rounded-full border-2 border-[#25d366] opacity-[0.55] motion-safe:animate-ping motion-safe:[animation-duration:2.6s] motion-reduce:hidden"
              aria-hidden="true"
            />
            <span
              className="pointer-events-none absolute inset-0 rounded-full border-2 border-[#25d366] opacity-[0.55] motion-safe:animate-ping motion-safe:[animation-delay:900ms] motion-safe:[animation-duration:2.6s] motion-reduce:hidden"
              aria-hidden="true"
            />
            <svg aria-hidden="true" className="relative z-[1] size-[30px]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.44.79 3.06 1.2 4.72 1.2h.01c5.46 0 9.91-4.45 9.91-9.91.01-5.46-4.44-9.91-9.9-9.91zm0 18.14h-.01c-1.46 0-2.89-.39-4.14-1.13l-.3-.18-3.11.82.83-3.03-.19-.31a8.19 8.19 0 0 1-1.26-4.4c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.22-8.3 8.22zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.15.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.23.89 2.41 1.02 2.58.12.17 1.76 2.69 4.27 3.77.6.26 1.06.41 1.43.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29z" />
            </svg>
          </span>
        </a>
      ) : null}
    </div>
  );
}
