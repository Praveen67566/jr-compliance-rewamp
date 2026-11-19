"use client";

import { useState, type ComponentProps } from "react";

/** Keep the floating contact preview dismissible without moving keyboard focus. */
export function DismissibleContactLink(props: ComponentProps<"a">) {
  const [dismissed, setDismissed] = useState(false);
  return <a {...props} data-tooltip-dismissed={dismissed}
    aria-describedby={dismissed ? undefined : props["aria-describedby"]}
    onFocus={() => setDismissed(false)} onPointerEnter={() => setDismissed(false)}
    onKeyDown={(event) => { if (event.key === "Escape") setDismissed(true); }} />;
}
