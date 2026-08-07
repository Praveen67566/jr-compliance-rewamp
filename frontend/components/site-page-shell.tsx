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
    </div>
  );
}
