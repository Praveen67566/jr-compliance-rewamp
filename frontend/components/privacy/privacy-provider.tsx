"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useId, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { PreferenceDialog } from "@/components/accessibility/preference-dialog";
import { PreferenceIcon } from "@/components/accessibility/preference-icons";
import {
  categoryAllowed, CONSENT_POLICY_VERSION, CONSENT_STORAGE_KEY, defaultConsentPolicy, parseConsent, readLocal,
  rejectedChoices, writeLocal, type ConsentChoices, type ConsentRecord, type OptionalCategory,
} from "@/lib/browser-preferences";
import type { ConsentPolicy } from "@/lib/types";
import { privacyCopy } from "@/data/privacy-fallback";

type Integration = { id: string; category: OptionalCategory };
type PrivacyContextValue = {
  ready: boolean; record: ConsentRecord | null; gpc: boolean;
  allowed: (category: OptionalCategory) => boolean;
  register: (integration: Integration) => () => void;
  openPreferences: (event?: MouseEvent<HTMLButtonElement>) => void;
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

const descriptions = privacyCopy.categories;

export function PrivacyProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const fieldId = useId();
  const [ready, setReady] = useState(false);
  const [record, setRecord] = useState<ConsentRecord | null>(null);
  const [gpc, setGpc] = useState(false);
  const [policy, setPolicy] = useState<ConsentPolicy>(defaultConsentPolicy);
  const currentRecord = useRef<ConsentRecord | null>(null);
  const contextAvailable = useRef(false);
  const recordPersisted = useRef(true);
  const visitorDecided = useRef(false);
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<ConsentChoices>({ ...rejectedChoices });
  const [notice, setNotice] = useState("");
  const categories = useMemo(() => [...new Set(integrations.map((item) => item.category))], [integrations]);

  useEffect(() => {
    let active = true;
    let resolvedPolicy = defaultConsentPolicy;
    let controller: AbortController | undefined;
    const syncSignal = () => setGpc(resolvedPolicy.gpc || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true);
    const syncRecord = (value: unknown) => {
      currentRecord.current = parseConsent(value, resolvedPolicy);
      setRecord(currentRecord.current);
      syncSignal();
    };
    const refresh = async () => {
      controller?.abort();
      const request = new AbortController();
      controller = request;
      const timeout = window.setTimeout(() => request.abort(), 5000);
      try {
        const response = await fetch("/api/privacy/context", { cache: "no-store", signal: request.signal });
        if (!response.ok) throw new Error("Privacy context unavailable");
        const next = await response.json() as ConsentPolicy;
        if (!["unknown", "eea-uk", "india", "us", "other"].includes(next.region)
          || typeof next.revision !== "string" || !/^[a-zA-Z0-9._-]{1,64}$/.test(next.revision)
          || typeof next.gpc !== "boolean"
          || !(next.maxAgeDays === null || (Number.isSafeInteger(next.maxAgeDays) && next.maxAgeDays > 0))) throw new Error("Invalid privacy context");
        if (!active || controller !== request) return;
        resolvedPolicy = next;
        const wasAvailable = contextAvailable.current;
        contextAvailable.current = true;
        setPolicy(next);
        syncRecord(wasAvailable || visitorDecided.current ? currentRecord.current : readLocal(CONSENT_STORAGE_KEY));
      } catch {
        if (!active || controller !== request) return;
        // No restored grants when regional/renewal rules cannot be verified.
        contextAvailable.current = false;
        resolvedPolicy = defaultConsentPolicy;
        setPolicy(resolvedPolicy);
        syncRecord(null);
      } finally {
        window.clearTimeout(timeout);
        if (active && controller === request) setReady(true);
      }
    };
    syncSignal();
    void refresh();
    const onStorage = (event: StorageEvent) => {
      if (event.key === CONSENT_STORAGE_KEY || event.key === null) {
        recordPersisted.current = true;
        syncRecord(contextAvailable.current ? readLocal(CONSENT_STORAGE_KEY) : null);
      }
    };
    const onResume = () => {
      syncRecord(contextAvailable.current && recordPersisted.current ? readLocal(CONSENT_STORAGE_KEY) : currentRecord.current);
      void refresh();
    };
    const onVisibility = () => { syncSignal(); if (document.visibilityState === "visible") onResume(); };
    window.addEventListener("storage", onStorage);
    window.addEventListener("pageshow", onResume);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      active = false; controller?.abort();
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("pageshow", onResume);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);
  useEffect(() => {
    if (!record || policy.maxAgeDays === null) return;
    let timer: number;
    const check = () => {
      const valid = parseConsent(currentRecord.current, policy);
      currentRecord.current = valid; setRecord(valid);
      if (valid) schedule();
    };
    const schedule = () => {
      const expiresIn = Date.parse(record.updatedAt) + policy.maxAgeDays! * 86_400_000 - Date.now();
      timer = window.setTimeout(check, Math.min(Math.max(expiresIn, 0), 2_147_483_647));
    };
    schedule();
    return () => window.clearTimeout(timer);
  }, [record, policy]);
  useEffect(() => { setOpen(false); }, [pathname]);

  const register = useCallback((integration: Integration) => {
    // Each mount owns one registration; duplicate video players share a category.
    setIntegrations((current) => [...current, integration]);
    return () => setIntegrations((current) => current.filter((item) => item !== integration));
  }, []);
  const allowed = useCallback((category: OptionalCategory) => ready && categoryAllowed(category, parseConsent(record, policy), gpc || (typeof navigator !== "undefined" && (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true)), [ready, record, gpc, policy]);
  const openPreferences = useCallback((event?: MouseEvent<HTMLButtonElement>) => {
    event?.currentTarget.focus({ preventScroll: true });
    setDraft(record ? { preferences: record.preferences, analytics: record.analytics, marketing: record.marketing && !gpc } : { ...rejectedChoices });
    setOpen(true);
  }, [record, gpc]);
  const save = (choices: ConsentChoices, close = true) => {
    if (!ready) return;
    const signal = gpc || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
    const next = { ...choices, marketing: choices.marketing && !signal, version: CONSENT_POLICY_VERSION, updatedAt: new Date().toISOString(), region: policy.region, revision: policy.revision };
    const persisted = contextAvailable.current && writeLocal(CONSENT_STORAGE_KEY, next);
    visitorDecided.current = true;
    recordPersisted.current = persisted;
    if (!persisted) {
      // A previous grant must not outlive a current-visit withdrawal/failed save.
      try { window.localStorage.removeItem(CONSENT_STORAGE_KEY); } catch { /* Storage may be completely blocked. */ }
    }
    currentRecord.current = next;
    setRecord(next); setDraft(next);
    setNotice(persisted ? "Privacy preferences saved." : contextAvailable.current ? "Privacy preferences applied for this visit. Browser storage is unavailable; choices cannot be remembered after reload." : "Privacy preferences applied for this visit. Regional settings are unavailable; please choose again on your next visit.");
    if (close) setOpen(false);
  };
  const acceptAvailable = () => save({ preferences: true, analytics: true, marketing: !gpc });

  return (
    <PrivacyContext.Provider value={{ ready, record, gpc, allowed, register, openPreferences }}>
      {children}
      <p className="sr-only" role="status">{notice}</p>
      {ready && !record && categories.length > 0 ? (
        <section className="consent-banner fixed inset-x-3 bottom-[calc(6rem+max(env(safe-area-inset-bottom),var(--sticky-cta-offset,0px)))] z-[90] mx-auto max-h-[65dvh] max-w-[1320px] overflow-y-auto rounded-[22px] border border-cobalt-700/30 bg-cloud p-5 font-sans text-navy-950 shadow-[0_12px_60px_rgba(3,15,43,0.22)] sm:p-6 lg:p-7 min-[1100px]:inset-x-[100px] min-[1100px]:bottom-[calc(1rem+max(env(safe-area-inset-bottom),var(--sticky-cta-offset,0px)))]" aria-labelledby="cookie-consent-title">
          <div className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-cobalt-700/20 bg-ice text-cobalt-700" aria-hidden="true"><PreferenceIcon name="shield" className="size-6" /></span>
            <h2 className="m-0 font-sans text-lg font-bold leading-tight sm:text-xl" id="cookie-consent-title">{privacyCopy.title}</h2>
          </div>
          <p className="mb-4 mt-3 max-w-[110ch] text-sm leading-relaxed sm:text-base">{privacyCopy.description}</p>
          {gpc ? <p className="mb-4 rounded-lg border border-cobalt-700/20 bg-ice px-3 py-2 text-sm">Global Privacy Control is enabled. External media and marketing remain off.</p> : null}
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3">
            <button className="preference-button" onClick={acceptAvailable} type="button">Accept All</button>
            <button className="preference-button" onClick={() => save({ ...rejectedChoices })} type="button">Reject All</button>
            <button className="preference-button col-span-2" onClick={openPreferences} type="button">Customize Preferences</button>
          </div>
          <a className="inline-flex min-h-11 shrink-0 items-center self-start text-sm font-semibold underline underline-offset-4" href="/privacy-policy">Privacy policy</a>
          </div>
        </section>
      ) : null}
      {open ? (
        <PreferenceDialog title="Privacy preferences" icon="shield" description="Choose what you allow across this website. Optional features stay off until you give permission." onClose={() => setOpen(false)}>
          <p className="mb-4 mt-0 text-sm leading-relaxed text-ice/85">{privacyCopy.regions[policy.region]}</p>
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
          {policy.region === "us" ? <button className="preference-button mt-4 w-full" type="button" onClick={() => save({ preferences: record?.preferences ?? false, analytics: record?.analytics ?? false, marketing: false })}>Opt out of sale or sharing</button> : null}
          <div className="mt-5 grid grid-cols-1 gap-2 min-[400px]:grid-cols-2">
            <button className="preference-button preference-button--primary" type="button" disabled={!ready} onClick={() => save(draft)}><PreferenceIcon name="check" className="size-4 shrink-0" />Save preferences</button>
            <button className="preference-button" type="button" onClick={() => save({ ...rejectedChoices })}>Withdraw consent</button>
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <button className="inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-lg border-0 bg-transparent px-1 text-xs font-semibold text-sky underline underline-offset-4" type="button" onClick={() => save({ ...rejectedChoices }, false)}><PreferenceIcon name="reset" className="size-3.5 shrink-0" />Reset optional preferences</button>
            <a className="inline-flex min-h-10 items-center rounded px-1 text-xs font-semibold text-ice underline underline-offset-4" href="/privacy-policy">Privacy policy</a>
          </div>
          <p className="mb-0 mt-2 text-[0.6875rem] leading-relaxed text-ice/80">{record ? `Last saved ${new Date(record.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}` : "Save to apply your preferences."}</p>
          {policy.maxAgeDays !== null ? <p className="mb-0 mt-2 text-xs leading-relaxed text-ice/80">We ask you to renew your choices after {policy.maxAgeDays} days, or when privacy settings change.</p> : null}
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
