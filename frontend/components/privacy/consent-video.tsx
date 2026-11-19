"use client";

import { useEffect } from "react";
import { usePrivacy } from "./privacy-provider";

export function ConsentVideo({ src, title }: { src: string; title: string }) {
  const { allowed, register, openPreferences } = usePrivacy();
  useEffect(() => register({ id: "youtube", category: "marketing" }), [register]);
  return allowed("marketing") ? (
    <iframe allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen className="absolute inset-0 h-full w-full border-0" loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin" src={src} title={title} />
  ) : (
    <div className="flex h-full min-h-36 flex-col items-center justify-center gap-3 overflow-y-auto p-4 text-center text-ice">
      <p className="m-0 text-sm">Allow external media in privacy preferences to load “{title}” from YouTube.</p>
      <button type="button" className="preference-button" onClick={openPreferences}>Video privacy preferences</button>
    </div>
  );
}
