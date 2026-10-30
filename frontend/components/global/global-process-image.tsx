"use client";

import { useState, type ReactNode } from "react";

import type { GlobalPageImage } from "@/lib/types";

/** Retain the network artwork when optional CMS process media cannot load. */
export function GlobalProcessImage({
  children,
  image,
}: {
  children: ReactNode;
  image: GlobalPageImage;
}) {
  const [loadedSource, setLoadedSource] = useState<string | null>(null);
  const loaded = loadedSource === image.src;

  return (
    <figure className="relative m-0 aspect-[4/3] overflow-hidden rounded-[20px] border border-cobalt-700/18 bg-navy-800 p-3 shadow-[0_18px_45px_rgba(3,19,47,0.08)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {children}
      </div>
      <img
        alt={image.alt}
        aria-hidden={!loaded}
        className={`absolute inset-0 h-full w-full bg-cloud p-3 object-contain ${loaded ? "opacity-100" : "opacity-0"}`}
        loading="lazy"
        onError={() => setLoadedSource(null)}
        onLoad={() => setLoadedSource(image.src)}
        src={image.src}
      />
    </figure>
  );
}
