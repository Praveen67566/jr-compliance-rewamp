import type { Link } from "@/lib/types";

/** Applies the CMS link target without leaving a new window with an opener. */
export function linkTargetProps(link: Pick<Link, "target">) {
  if (link.target === "_blank") {
    return { target: "_blank", rel: "noreferrer" } as const;
  }

  return link.target === "_self" ? ({ target: "_self" } as const) : {};
}
