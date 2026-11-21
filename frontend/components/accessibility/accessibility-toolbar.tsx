"use client";

import { useEffect, useId, useState } from "react";
import { PreferenceDialog } from "./preference-dialog";
import { PreferenceIcon, type PreferenceIconName } from "./preference-icons";
import { ACCESSIBILITY_STORAGE_KEY, defaultAccessibility, parseAccessibility, readLocal, resolveAccessibility, writeLocal, type AccessibilityPreferences, type AccessibilityProfile } from "@/lib/browser-preferences";

const profiles: { id: AccessibilityProfile; label: string; description: string; icon: PreferenceIconName }[] = [
  { id: "seizureSafe", icon: "seizure", label: "Seizure Safe", description: "Stops animations and transitions, hides GIFs and animated artwork, and blocks embedded videos. Cannot guarantee seizure prevention." },
  { id: "blind", icon: "blind", label: "Blind", description: "Shortcuts to main content, navigation, footer and headings. Stops automatic motion. Use with your screen reader. Enabling reloads this page." },
  { id: "adhdFriendly", icon: "attention", label: "ADHD Friendly", description: "Stops automatic motion, hides decorative layers and highlights the control you focus." },
  { id: "cognitive", icon: "reading", label: "Cognitive", description: "Adds reading space, clear headings, underlined links and heading shortcuts. Keeps all page content." },
  { id: "motorImpaired", icon: "hand", label: "Motor Impaired", description: "Enlarges targets to at least 44 × 44 px and strengthens focus indicators. All controls support keyboard navigation." },
  { id: "lowVision", icon: "zoom", label: "Low Vision", description: "Applies high contrast, underlines links and enlarges text to at least 150%. Increase up to 200%." },
];

// The footer can hydrate before the root toolbar registers its event listener.
let pendingAccessibilityOpen = false;

function Toggle({ label, description, active, disabled, icon, onClick }: { label: string; description: string; active: boolean; disabled?: boolean; icon?: PreferenceIconName; onClick: () => void }) {
  const id = useId();
  const control = <span className="preference-switch relative block h-6 w-11 shrink-0 rounded-full border border-sky/40 bg-navy-700" aria-hidden="true"><span className="absolute left-[3px] top-1/2 size-4 -translate-y-1/2 rounded-full bg-ice transition-transform" /></span>;
  return <button className={`preference-toggle w-full min-w-0 cursor-pointer rounded-2xl border border-sky/20 bg-navy-800/75 text-left transition-colors hover:border-sky/65 disabled:cursor-default ${icon ? "accessibility-profile flex flex-col items-stretch p-4" : "flex min-h-14 items-center gap-4 px-4 py-3"}`} type="button" aria-labelledby={`${id}-label`} aria-describedby={`${id}-description`} aria-pressed={active} disabled={disabled} onClick={onClick}>
    {icon ? <span className="mb-3 flex items-center justify-between gap-3"><span className="grid size-9 shrink-0 place-items-center rounded-xl border border-sky/10 bg-cobalt-700/20 text-sky"><PreferenceIcon name={icon} /></span>{control}</span> : null}
    <span className="min-w-0 flex-1">
      <span className={`block font-bold text-cloud ${icon ? "mb-1.5 text-base" : "text-sm"}`} id={`${id}-label`}>{label}</span>
      <span className={`block text-sm text-ice/80 ${icon ? "leading-[1.5]" : "mt-0.5 leading-snug"}`} id={`${id}-description`}>{description}</span>
    </span>
    {!icon ? control : null}
  </button>;
}

export function AccessibilityPreferencesButton() {
  return <button type="button" aria-haspopup="dialog" className="min-h-11 cursor-pointer rounded border-0 bg-transparent px-1 text-sm underline underline-offset-4" onClick={(event) => { event.currentTarget.focus(); pendingAccessibilityOpen = true; window.dispatchEvent(new Event("jr-open-accessibility")); }}>Accessibility settings</button>;
}

export function AccessibilityToolbar() {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(defaultAccessibility);
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [osMotion, setOsMotion] = useState(false);
  const [osContrast, setOsContrast] = useState(false);
  const [ready, setReady] = useState(false);
  const [headings, setHeadings] = useState<HTMLElement[]>([]);
  const headingId = useId();
  const effective = resolveAccessibility(preferences, { reduceMotion: osMotion, highContrast: osContrast });
  useEffect(() => {
    setPreferences(parseAccessibility(readLocal(ACCESSIBILITY_STORAGE_KEY)));
    setReady(true);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const contrast = window.matchMedia("(prefers-contrast: more)");
    const sync = () => { setOsMotion(motion.matches); setOsContrast(contrast.matches); };
    const storage = (event: StorageEvent) => {
      if (event.key === ACCESSIBILITY_STORAGE_KEY || event.key === null) setPreferences(parseAccessibility(readLocal(ACCESSIBILITY_STORAGE_KEY)));
    };
    const show = () => { pendingAccessibilityOpen = false; setNotice(""); setOpen(true); };
    sync();
    motion.addEventListener("change", sync); contrast.addEventListener("change", sync);
    window.addEventListener("storage", storage);
    window.addEventListener("jr-open-accessibility", show);
    if (pendingAccessibilityOpen) show();
    return () => {
      motion.removeEventListener("change", sync); contrast.removeEventListener("change", sync);
      window.removeEventListener("storage", storage);
      window.removeEventListener("jr-open-accessibility", show);
    };
  }, []);
  useEffect(() => {
    if (!ready) return;
    const root = document.documentElement;
    const settings = resolveAccessibility(preferences, { reduceMotion: osMotion, highContrast: osContrast });
    root.style.fontSize = `${settings.textScale}%`;
    root.dataset.textEnlarged = String(settings.textScale > 100);
    for (const key of ["highContrast", "reduceMotion", "seizureSafe", "blind", "adhdFriendly", "cognitive", "motorImpaired", "lowVision", "dyslexiaFont"] as const) {
      root.dataset[key] = String(settings[key]);
    }
    window.dispatchEvent(new Event("jr-accessibility-change"));
  }, [preferences, osMotion, osContrast, ready]);
  useEffect(() => {
    if (open) setHeadings([...document.querySelectorAll<HTMLElement>("main h1, main h2, main h3")].filter((heading) => heading.getClientRects().length > 0 && heading.textContent?.trim()));
  }, [open]);
  const update = (next: AccessibilityPreferences, message: string) => {
    setPreferences(next);
    const saved = writeLocal(ACCESSIBILITY_STORAGE_KEY, next);
    setNotice(saved ? message : `${message.replace("saved.", "applied.")} Browser storage is unavailable; settings apply for this visit.`);
    return saved;
  };
  const jumpTo = (target: HTMLElement | null) => {
    if (!target) return;
    setOpen(false);
    // Move focus after the modal restores its trigger during unmount.
    window.requestAnimationFrame(() => {
      if (!target.isConnected) return;
      const tabindex = target.getAttribute("tabindex");
      target.tabIndex = -1;
      target.focus({ preventScroll: true });
      target.scrollIntoView({ behavior: "instant", block: "start" });
      if (tabindex === null) target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
      else target.setAttribute("tabindex", tabindex);
    });
  };
  const motionLocked = osMotion || effective.seizureSafe || effective.blind || effective.adhdFriendly;
  const contrastLocked = osContrast || effective.lowVision;
  return <>
    <button className="accessibility-launcher site-floating-control site-floating-control--left group fixed z-[45] grid size-[60px] cursor-pointer place-items-center rounded-full border border-sky/60 bg-[linear-gradient(145deg,var(--blue-cobalt-700),var(--blue-navy-800))] text-cloud shadow-[0_8px_28px_rgba(0,8,34,0.4),inset_0_1px_rgba(168,228,255,0.3)] transition hover:border-sky hover:brightness-110" type="button" aria-label="Accessibility" aria-haspopup="dialog" title="Accessibility settings" onClick={(event) => { event.currentTarget.focus(); setNotice(""); setOpen(true); }}>
      <PreferenceIcon name="accessibility" className="size-[28px]" />
    </button>
    {open ? <PreferenceDialog className="accessibility-dialog" title="Accessibility settings" description="Combine profiles and individual controls. Changes apply immediately; saving uses this browser's storage." onClose={() => setOpen(false)} footer={<>
      <div className="grid grid-cols-2 gap-2 max-[399px]:grid-cols-1">
        <button className="preference-button preference-button--primary" type="button" aria-label="Save preferences" onClick={() => update(preferences, "Accessibility preferences saved.")}><PreferenceIcon name="check" className="size-4 shrink-0" />Save preferences</button>
        <button className="preference-button" type="button" aria-label="Reset all settings" onClick={() => update({ ...defaultAccessibility, profiles: [] }, "Accessibility preferences reset. System preferences still apply.")}><PreferenceIcon name="reset" className="size-4 shrink-0" />Reset all settings</button>
      </div>
      <p className="mb-0 mt-2 min-h-[1.25em] text-sm leading-snug text-sky" role="status" aria-atomic="true">{notice}</p>
    </>}>
      <fieldset className="m-0 mb-7 min-w-0 border-0 p-0">
        <legend className="sr-only">Accessibility profiles</legend>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-sky" aria-hidden="true">Profiles</p>
        <div className="accessibility-profile-grid grid grid-cols-2 gap-3 max-[479px]:grid-cols-1">
          {profiles.map((profile) => {
            const active = preferences.profiles.includes(profile.id);
            return <Toggle key={profile.id} icon={profile.icon} label={profile.label} description={profile.description} active={active} onClick={() => {
              const saved = update({ ...preferences, profiles: active ? preferences.profiles.filter((item) => item !== profile.id) : [...preferences.profiles, profile.id] }, `${profile.label} profile ${active ? "disabled" : "enabled"}.`);
              // Refresh the reader's document once, after the enabled profile is saved.
              if (profile.id === "blind" && !active && saved) window.location.reload();
            }} />;
          })}
        </div>
      </fieldset>
      {effective.blind || effective.cognitive ? <fieldset className="m-0 mb-5 min-w-0 rounded-2xl border border-sky/25 p-3">
        <legend className="px-2 text-sm font-semibold text-ice">Page navigation</legend>
        {effective.blind ? <div className="flex flex-wrap gap-2">
          <button type="button" className="preference-button" onClick={() => jumpTo(document.querySelector("main"))}>Main content</button>
          <button type="button" className="preference-button" onClick={() => jumpTo([...document.querySelectorAll<HTMLElement>("header nav, .site-header")].find((element) => element.getClientRects().length > 0) ?? null)}>Site navigation</button>
          <button type="button" className="preference-button" onClick={() => jumpTo(document.querySelector("footer"))}>Footer</button>
        </div> : null}
        {headings.length ? <>
          <label className="mb-2 mt-3 block text-sm font-semibold text-ice" htmlFor={headingId}>Jump to a page heading</label>
          <select id={headingId} className="min-h-11 w-full min-w-0 max-w-full rounded-lg border border-sky/50 bg-navy-950 p-2 text-sm text-cloud" defaultValue="" onChange={(event) => { if (event.target.value !== "") jumpTo(headings[Number(event.target.value)]); }}>
            <option value="">Choose a heading</option>
            {headings.map((heading, index) => <option key={index} value={index}>{heading.tagName}: {heading.textContent?.trim()}</option>)}
          </select>
        </> : null}
      </fieldset> : null}
      <fieldset className="m-0 mb-7 min-w-0 border-0 p-0">
        <legend className="sr-only">Text size</legend>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.12em] text-sky" aria-hidden="true">Text size</span>
          <span className="font-sans text-3xl font-bold tabular-nums text-sky"><span className="sr-only">Reading scale: </span>{effective.textScale}%</span>
        </div>
        <div className="accessibility-size-controls grid grid-cols-3 gap-2">
          <button className="preference-button" type="button" aria-label="Smaller text" disabled={effective.textScale <= (effective.lowVision ? 150 : 100)} onClick={() => update({ ...preferences, textScale: Math.max(effective.lowVision ? 150 : 100, effective.textScale - 25) }, "Text size decreased.")}><span aria-hidden="true">−</span>Smaller</button>
          <button className="preference-button preference-button--primary" type="button" aria-label="Larger text" disabled={effective.textScale >= 200} onClick={() => update({ ...preferences, textScale: Math.min(200, effective.textScale + 25) }, "Text size increased.")}><span aria-hidden="true">+</span>Larger</button>
          <button className="preference-button" type="button" aria-label="Default text size" onClick={() => update({ ...preferences, textScale: 100 }, effective.lowVision ? "Text size reset. Low Vision keeps text at 150%." : "Text size reset.")}><span aria-hidden="true">=</span>Default</button>
        </div>
      </fieldset>
      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-sky">Display</legend>
        <div className="grid gap-2">

        <Toggle label="High contrast" active={effective.highContrast} disabled={contrastLocked} description={osContrast ? "Enabled by your system" : effective.lowVision ? "Enabled by Low Vision" : "Stronger separation for easier reading"} onClick={() => update({ ...preferences, highContrast: !preferences.highContrast }, `High contrast ${preferences.highContrast ? "disabled" : "enabled"}.`)} />
        <Toggle label="Reduced motion" active={effective.reduceMotion} disabled={motionLocked} description={osMotion ? "Enabled by your system" : motionLocked ? "Enabled by an active profile" : "Limit animation and automatic movement"} onClick={() => update({ ...preferences, reduceMotion: !preferences.reduceMotion }, `Reduced motion ${preferences.reduceMotion ? "disabled" : "enabled"}.`)} />
        <Toggle label="Dyslexia-friendly font" active={preferences.dyslexiaFont} description="Use Verdana with wider letter and word spacing. Choose the font that feels easiest to read." onClick={() => update({ ...preferences, dyslexiaFont: !preferences.dyslexiaFont }, `Dyslexia-friendly font ${preferences.dyslexiaFont ? "disabled" : "enabled"}.`)} />
        </div>
      </fieldset>
      <p className="mb-0 mt-5 text-sm leading-relaxed text-ice/75">Text scales up to 200%. Profiles and system preferences set minimum text size, contrast and motion. Turn a profile off to remove its effects.</p>
    </PreferenceDialog> : null}
  </>;
}
