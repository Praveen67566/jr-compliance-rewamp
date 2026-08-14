import type { Metadata } from "next";

import { SitePageShell } from "@/components/site-page-shell";
import { getHomepage } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Thank You | JR Compliance",
  description: "Your consultation request has been received by JR Compliance.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ThankYouPage() {
  const content = await getHomepage();

  return (
    <SitePageShell footer={content.footer} navigation={content.navigation} site={content.site}>
      <section className="relative isolate flex min-h-[680px] items-center overflow-hidden bg-navy-950 px-[18px] pb-24 pt-[150px] text-white sm:px-[22px] lg:px-8">
        <div className="absolute inset-0 -z-20 opacity-40 [background-image:linear-gradient(rgba(139,220,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(139,220,255,0.12)_1px,transparent_1px)] [background-size:54px_54px]" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(22,140,245,0.38),transparent_30%),radial-gradient(circle_at_10%_90%,rgba(13,92,184,0.28),transparent_35%)]" aria-hidden="true" />
        <div className="mx-auto w-full max-w-[760px] rounded-[30px] border border-sky/35 bg-navy-900/88 p-8 text-center shadow-[0_30px_90px_rgba(0,8,34,0.45)] backdrop-blur sm:p-12">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full border border-sky/60 bg-electric/25 text-3xl text-sky" aria-hidden="true">✓</span>
          <p className="mb-0 mt-7 text-xs font-extrabold uppercase tracking-[0.14em] text-sky">Request received</p>
          <h1 className="mt-4 font-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.92] tracking-[-0.055em]">Thank you for contacting us.</h1>
          <p className="mx-auto mb-0 mt-6 max-w-[580px] text-base leading-8 text-ice/75">
            A JR Compliance expert will review your requirements and get in touch with you shortly.
          </p>
          <a className="mt-9 inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-sky bg-electric px-6 text-sm font-extrabold text-white shadow-[0_12px_30px_rgba(22,140,245,0.28)] transition hover:bg-cobalt-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky" href="/">
            Return to homepage <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </SitePageShell>
  );
}
