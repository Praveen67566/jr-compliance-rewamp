"use client";

import { useEffect, useSyncExternalStore } from "react";
import { ACCESSIBILITY_STORAGE_KEY, parseAccessibility, readLocal } from "@/lib/browser-preferences";
import { usePrivacy } from "./privacy-provider";

function subscribe(listener: () => void) {
  window.addEventListener("jr-accessibility-change", listener);
  return () => window.removeEventListener("jr-accessibility-change", listener);
}
function seizureSafeSnapshot() {
  return document.documentElement.dataset.seizureSafe === "true"
    || (document.documentElement.dataset.seizureSafe === undefined && parseAccessibility(readLocal(ACCESSIBILITY_STORAGE_KEY)).profiles.includes("seizureSafe"));
}

export function ConsentVideo({ src, title }: { src: string; title: string }) {
  const { allowed, register, openPreferences } = usePrivacy();
  const seizureSafe = useSyncExternalStore(subscribe, seizureSafeSnapshot, () => false);
  useEffect(() => register({ id: "youtube", category: "marketing" }), [register]);
  if (seizureSafe) return <div className="flex h-full min-h-36 items-center justify-center overflow-y-auto p-4 text-center text-sm text-ice">Video “{title}” is blocked by the Seizure Safe profile. Turn off that profile in accessibility settings to load it.</div>;
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
