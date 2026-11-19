"use client";

import { useEffect, useState } from "react";
import { PreferenceDialog } from "./preference-dialog";
import { PreferenceIcon } from "./preference-icons";
import { ACCESSIBILITY_STORAGE_KEY, defaultAccessibility, parseAccessibility, readLocal, writeLocal, type AccessibilityPreferences } from "@/lib/browser-preferences";

export function AccessibilityToolbar() {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(defaultAccessibility);
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [osMotion, setOsMotion] = useState(false);
  const [osContrast, setOsContrast] = useState(false);
  useEffect(() => {
    setPreferences(parseAccessibility(readLocal(ACCESSIBILITY_STORAGE_KEY)));
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const contrast = window.matchMedia("(prefers-contrast: more)");
    const sync = () => { setOsMotion(motion.matches); setOsContrast(contrast.matches); };
    const storage = (event: StorageEvent) => {
      if (event.key === ACCESSIBILITY_STORAGE_KEY || event.key === null) setPreferences(parseAccessibility(readLocal(ACCESSIBILITY_STORAGE_KEY)));
    };
    sync();
    motion.addEventListener("change", sync); contrast.addEventListener("change", sync);
    window.addEventListener("storage", storage);
    return () => {
      motion.removeEventListener("change", sync); contrast.removeEventListener("change", sync);
      window.removeEventListener("storage", storage);
    };
  }, []);
  useEffect(() => {
    const root = document.documentElement;
    root.style.fontSize = `${preferences.textScale}%`;
    root.dataset.textEnlarged = String(preferences.textScale > 100);
    root.dataset.highContrast = String(preferences.highContrast || osContrast);
    root.dataset.reduceMotion = String(preferences.reduceMotion || osMotion);
    window.dispatchEvent(new Event("jr-accessibility-change"));
  }, [preferences, osMotion, osContrast]);
  const update = (next: AccessibilityPreferences, message: string) => {
    setPreferences(next);
    setNotice(`${message}${writeLocal(ACCESSIBILITY_STORAGE_KEY, next) ? "" : " Browser storage is unavailable; settings apply for this visit."}`);
  };
  return <>
    <button className="accessibility-launcher site-floating-control site-floating-control--left group fixed z-[45] grid size-[60px] cursor-pointer place-items-center rounded-full border border-sky/60 bg-[linear-gradient(145deg,var(--blue-cobalt-700),var(--blue-navy-800))] text-cloud shadow-[0_8px_28px_rgba(0,8,34,0.4),inset_0_1px_rgba(168,228,255,0.3)] transition hover:border-sky hover:brightness-110" type="button" aria-label="Accessibility" aria-haspopup="dialog" title="Accessibility settings" onClick={() => setOpen(true)}>
      <PreferenceIcon name="accessibility" className="size-[28px]" />
    </button>
    {open ? <PreferenceDialog title="Accessibility settings" description="Adjust your reading experience. Your choices are remembered on this browser." onClose={() => setOpen(false)}>
      <fieldset className="m-0 min-w-0 rounded-2xl border border-sky/25 bg-navy-800/70 p-4">
        <legend className="px-2 text-sm font-semibold text-ice">Text size</legend>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm text-ice/80">Reading scale</span>
          <span className="font-sans text-2xl font-bold tabular-nums text-sky">{preferences.textScale}%</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button className="preference-size-button flex min-w-0 cursor-pointer flex-col items-center gap-1 rounded-xl border border-sky/35 bg-navy-950/70 p-3 text-cloud transition hover:border-sky hover:bg-sky/10 disabled:cursor-default disabled:opacity-45" type="button" aria-label="Decrease text size" disabled={preferences.textScale <= 100} onClick={() => update({ ...preferences, textScale: Math.max(100, preferences.textScale - 25) }, "Text size decreased.")}><span className="text-2xl leading-none" aria-hidden="true">−</span><span className="text-xs font-semibold">Smaller</span></button>
          <button className="preference-size-button flex min-w-0 cursor-pointer flex-col items-center gap-1 rounded-xl border border-sky/50 bg-cobalt-700 p-3 text-cloud transition hover:border-sky hover:bg-navy-700 disabled:cursor-default disabled:opacity-45" type="button" aria-label="Increase text size" disabled={preferences.textScale >= 200} onClick={() => update({ ...preferences, textScale: Math.min(200, preferences.textScale + 25) }, "Text size increased.")}><span className="text-2xl leading-none" aria-hidden="true">+</span><span className="text-xs font-semibold">Larger</span></button>
          <button className="preference-size-button flex min-w-0 cursor-pointer flex-col items-center gap-1 rounded-xl border border-sky/35 bg-navy-950/70 p-3 text-cloud transition hover:border-sky hover:bg-sky/10" type="button" aria-label="Reset text size" onClick={() => update({ ...preferences, textScale: 100 }, "Text size reset.")}><span className="text-2xl leading-none" aria-hidden="true">=</span><span className="text-xs font-semibold">Default</span></button>
        </div>
      </fieldset>
      <div className="my-4 grid gap-3">
        <button className="preference-toggle flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-sky/25 bg-navy-800/70 p-4 text-left transition hover:border-sky/60 disabled:cursor-default" type="button" aria-label="High contrast" aria-pressed={preferences.highContrast || osContrast} disabled={osContrast} onClick={() => update({ ...preferences, highContrast: !preferences.highContrast }, `High contrast ${preferences.highContrast ? "disabled" : "enabled"}.`)}>
          <PreferenceIcon name="contrast" className="size-5 shrink-0 text-sky max-[560px]:hidden" />
          <span className="min-w-0 flex-1"><span className="block text-sm font-bold text-cloud">High contrast</span><span className="mt-1 block text-xs leading-relaxed text-ice/80">{osContrast ? "Enabled by your system" : "Stronger separation for easier reading"}</span></span>
          <span className="preference-switch relative h-6 w-11 shrink-0 rounded-full border border-sky/50 bg-navy-950" aria-hidden="true"><span className="absolute left-[3px] top-1/2 size-4 -translate-y-1/2 rounded-full bg-sky transition-transform" /></span>
        </button>
        <button className="preference-toggle flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-sky/25 bg-navy-800/70 p-4 text-left transition hover:border-sky/60 disabled:cursor-default" type="button" aria-label="Reduced motion" aria-pressed={preferences.reduceMotion || osMotion} disabled={osMotion} onClick={() => update({ ...preferences, reduceMotion: !preferences.reduceMotion }, `Reduced motion ${preferences.reduceMotion ? "disabled" : "enabled"}.`)}>
          <PreferenceIcon name="motion" className="size-5 shrink-0 text-sky max-[560px]:hidden" />
          <span className="min-w-0 flex-1"><span className="block text-sm font-bold text-cloud">Reduced motion</span><span className="mt-1 block text-xs leading-relaxed text-ice/80">{osMotion ? "Enabled by your system" : "Limit animation and automatic movement"}</span></span>
          <span className="preference-switch relative h-6 w-11 shrink-0 rounded-full border border-sky/50 bg-navy-950" aria-hidden="true"><span className="absolute left-[3px] top-1/2 size-4 -translate-y-1/2 rounded-full bg-sky transition-transform" /></span>
        </button>
      </div>
      <p className="mb-4 text-xs leading-relaxed text-ice/80">Text scales up to 200%. System accessibility preferences always apply.</p>
      <button className="flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-sky/30 bg-navy-950 px-3 py-2 text-sm font-semibold text-sky transition hover:border-sky hover:bg-sky/10" type="button" aria-label="Reset all accessibility preferences" onClick={() => update({ ...defaultAccessibility }, "Accessibility preferences reset. System preferences still apply.")}><PreferenceIcon name="reset" className="size-4 shrink-0" />Reset all settings</button>
      <p className="mb-0 mt-3 empty:mt-0 text-xs leading-relaxed text-sky" role="status" aria-atomic="true">{notice}</p>
    </PreferenceDialog> : null}
  </>;
}
