"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useId, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { PreferenceDialog } from "@/components/accessibility/preference-dialog";
import { PreferenceIcon } from "@/components/accessibility/preference-icons";
import {
  categoryAllowed, CONSENT_POLICY_VERSION, CONSENT_STORAGE_KEY, parseConsent, readLocal,
  rejectedChoices, writeLocal, type ConsentChoices, type ConsentRecord, type OptionalCategory,
} from "@/lib/browser-preferences";

type Integration = { id: string; category: OptionalCategory };
type PrivacyContextValue = {
  ready: boolean; record: ConsentRecord | null; gpc: boolean;
  allowed: (category: OptionalCategory) => boolean;
  register: (integration: Integration) => () => void;
  openPreferences: () => void;
};
const PrivacyContext = createContext<PrivacyContextValue | null>(null);
export function usePrivacy() {
  const context = useContext(PrivacyContext);
  if (!context) throw new Error("Privacy controls require PrivacyProvider");
  return context;
}

/** start must return a cleanup that stops future processing and removes owned resources.
 * Integrations without a reliable stop API must use an isolated, removable frame instead. */
export function useOptionalIntegration(id: string, category: OptionalCategory, start: () => () => void) {
  const { register, allowed } = usePrivacy();
  const permitted = allowed(category);
  useEffect(() => register({ id, category }), [register, id, category]);
  useEffect(() => permitted ? start() : undefined, [permitted, start]);
}

const descriptions: Record<OptionalCategory, { title: string; description: string }> = {
  preferences: { title: "Optional preferences", description: "Remember optional choices to personalise your visits." },
  analytics: { title: "Analytics", description: "Help us understand how visitors use the website." },
  marketing: { title: "External media and marketing", description: "Allow YouTube videos and optional marketing features. These providers may use browser storage and process viewing activity." },
};

export function PrivacyProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const fieldId = useId();
  const [ready, setReady] = useState(false);
  const [record, setRecord] = useState<ConsentRecord | null>(null);
  const [gpc, setGpc] = useState(false);
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<ConsentChoices>({ ...rejectedChoices });
  const [notice, setNotice] = useState("");
  const categories = useMemo(() => [...new Set(integrations.map((item) => item.category))], [integrations]);

  useEffect(() => {
    const sync = () => {
      setRecord(parseConsent(readLocal(CONSENT_STORAGE_KEY)));
      setGpc((navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true);
    };
    sync(); setReady(true);
    const onStorage = (event: StorageEvent) => { if (event.key === CONSENT_STORAGE_KEY || event.key === null) sync(); };
    const syncSignal = () => setGpc((navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true);
    window.addEventListener("storage", onStorage);
    window.addEventListener("pageshow", syncSignal);
    document.addEventListener("visibilitychange", syncSignal);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("pageshow", syncSignal);
      document.removeEventListener("visibilitychange", syncSignal);
    };
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);

  const register = useCallback((integration: Integration) => {
    // Each mount owns one registration; duplicate video players share a category.
    setIntegrations((current) => [...current, integration]);
    return () => setIntegrations((current) => current.filter((item) => item !== integration));
  }, []);
  const allowed = useCallback((category: OptionalCategory) => ready && categoryAllowed(category, record, gpc), [ready, record, gpc]);
  const openPreferences = useCallback(() => {
    setDraft(record ? { preferences: record.preferences, analytics: record.analytics, marketing: record.marketing && !gpc } : { ...rejectedChoices });
    setOpen(true);
  }, [record, gpc]);
  const save = (choices: ConsentChoices, close = true) => {
    const next = { ...choices, marketing: choices.marketing && !gpc, version: CONSENT_POLICY_VERSION, updatedAt: new Date().toISOString() };
    const persisted = writeLocal(CONSENT_STORAGE_KEY, next);
    setRecord(next); setDraft(next);
    setNotice(persisted ? "Privacy preferences saved." : "Privacy preferences applied for this visit. Browser storage is unavailable; choices cannot be remembered after reload.");
    if (close) setOpen(false);
  };
  const acceptAvailable = () => save({ preferences: categories.includes("preferences"), analytics: categories.includes("analytics"), marketing: categories.includes("marketing") && !gpc });

  return (
    <PrivacyContext.Provider value={{ ready, record, gpc, allowed, register, openPreferences }}>
      {children}
      <p className="sr-only" role="status">{notice}</p>
      {ready && !record && categories.length > 0 ? (
        <section className="consent-banner fixed inset-x-3 bottom-3 z-[90] mx-auto max-h-[60dvh] max-w-3xl overflow-y-auto rounded-2xl border border-cobalt-700 bg-cloud p-5 text-navy-950 shadow-2xl" aria-labelledby="cookie-consent-title">
          <h2 className="mb-2 font-sans text-lg font-bold" id="cookie-consent-title">Your privacy choices</h2>
          <p className="mb-4 text-sm leading-relaxed">This page offers optional {categories.map((category) => descriptions[category].title.toLowerCase()).join(", ")}. These features stay off until you allow them. Essential navigation and inquiry forms work without optional tracking.</p>
          {gpc ? <p className="text-sm">Global Privacy Control is enabled. External media and marketing remain off.</p> : null}
          <div className="flex flex-wrap gap-3">
            <button className="preference-button" onClick={acceptAvailable} type="button">Accept All</button>
            <button className="preference-button" onClick={() => save({ ...rejectedChoices })} type="button">Reject All</button>
            <button className="preference-button" onClick={openPreferences} type="button">Customize Preferences</button>
            <a className="inline-flex min-h-11 items-center text-sm underline" href="/privacy-policy">Privacy policy</a>
          </div>
        </section>
      ) : null}
      {open ? (
        <PreferenceDialog title="Privacy preferences" icon="shield" description="Choose what you allow across this website. Optional features stay off until you give permission." onClose={() => setOpen(false)}>
          <div className="mb-4 flex flex-wrap items-start gap-3 rounded-xl border border-sky/25 bg-sky/5 p-3">
            <PreferenceIcon name="lock" className="mt-0.5 size-4 shrink-0 text-sky" />
            <span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-cloud">Necessary features</span><span className="mt-1 block text-xs leading-relaxed text-ice/80">Navigation, inquiry forms and saving your choices.</span></span>
            <span className="shrink-0 rounded-full border border-sky/30 px-2 py-1 text-[0.625rem] font-bold uppercase tracking-wide text-sky">Always on</span>
          </div>
          {gpc ? <p className="mb-4 rounded-xl border border-sky/40 bg-sky/10 p-3 text-sm leading-relaxed text-ice" id={`${fieldId}-gpc`}>Global Privacy Control is active. External media and marketing stay off to respect your browser's privacy signal.</p> : null}
          <fieldset className="m-0 min-w-0 space-y-3 border-0 p-0">
            <legend className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-sky">Optional choices</legend>
            {(["preferences", "analytics", "marketing"] as const).map((category) => {
              const restricted = gpc && category === "marketing";
              return (
                <label className={`privacy-choice flex cursor-pointer items-start gap-3 rounded-2xl border border-sky/25 bg-navy-800/70 p-4 transition hover:border-sky/60 ${restricted ? "cursor-default opacity-70" : ""}`} key={category}>
                  <span className="relative mt-0.5 block size-6 shrink-0">
                    <input className="peer m-0 size-6 cursor-pointer appearance-none rounded-md border border-sky/60 bg-navy-950 checked:border-sky checked:bg-sky disabled:cursor-default" type="checkbox" aria-labelledby={`${fieldId}-${category}-label`} aria-describedby={`${fieldId}-${category}-description${restricted ? ` ${fieldId}-gpc` : ""}`} checked={draft[category] && !restricted} disabled={restricted}
                      onChange={(event) => setDraft((current) => ({ ...current, [category]: event.target.checked }))} />
                    <PreferenceIcon name="check" className="pointer-events-none absolute inset-1 hidden size-4 text-navy-950 peer-checked:block" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold leading-snug text-cloud" id={`${fieldId}-${category}-label`}>{descriptions[category].title}</span>
                    <span className="mt-1.5 block text-xs leading-relaxed text-ice/80" id={`${fieldId}-${category}-description`}>{descriptions[category].description}</span>
                    <span className="mt-2 block text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-sky">{restricted ? "Controlled by your browser" : categories.includes(category) ? "Available on this page" : "Not used on this page"}</span>
                  </span>
                </label>
              );
            })}
          </fieldset>
          <div className="mt-5 grid grid-cols-1 gap-2 min-[400px]:grid-cols-2">
            <button className="preference-button preference-button--primary" type="button" onClick={() => save(draft)}><PreferenceIcon name="check" className="size-4 shrink-0" />Save preferences</button>
            <button className="preference-button" type="button" onClick={() => save({ ...rejectedChoices })}>Withdraw consent</button>
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <button className="inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-lg border-0 bg-transparent px-1 text-xs font-semibold text-sky underline underline-offset-4" type="button" onClick={() => save({ ...rejectedChoices }, false)}><PreferenceIcon name="reset" className="size-3.5 shrink-0" />Reset optional preferences</button>
            <a className="inline-flex min-h-10 items-center rounded px-1 text-xs font-semibold text-ice underline underline-offset-4" href="/privacy-policy">Privacy policy</a>
          </div>
          <p className="mb-0 mt-2 text-[0.6875rem] leading-relaxed text-ice/80">{record ? `Last saved ${new Date(record.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}` : "Save to apply your preferences."}</p>
          <p className="mb-0 mt-3 empty:mt-0 text-xs leading-relaxed text-sky" role="status">{notice}</p>
        </PreferenceDialog>
      ) : null}
    </PrivacyContext.Provider>
  );
}

export function PrivacyPreferencesButton() {
  const { openPreferences } = usePrivacy();
  return <button type="button" data-privacy-trigger className="min-h-11 cursor-pointer rounded border-0 bg-transparent px-1 text-sm underline underline-offset-4" onClick={openPreferences}>Privacy preferences</button>;
}
