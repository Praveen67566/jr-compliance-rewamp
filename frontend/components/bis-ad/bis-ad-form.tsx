"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { LEAD_MESSAGE_MAX_LENGTH, validateLeadRequest } from "@/lib/leads";
import type { LeadFormSettings } from "@/lib/types";

export function useBisAdForm(pageTitle: string, settings: LeadFormSettings) {
  const pathname = usePathname();
  const router = useRouter();
  const pending = useRef(false);
  const controller = useRef<AbortController | null>(null);
  const [values, setValues] = useState({ name: "", email: "", phone: "", message: "", consent: false, website: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "error" | "success">("idle");
  const [feedback, setFeedback] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof typeof values, string>>>({});

  useEffect(() => () => controller.current?.abort(), []);

  function update(field: keyof typeof values, value: string | boolean) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (status === "error") {
      setStatus("idle");
      setFeedback("");
    }
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current || status === "success") return;

    const search = new URLSearchParams(window.location.search);
    const pageParameters = Object.fromEntries(
      ["utm_source", "utm_medium", "utm_campaign"]
        .map((key) => [key, search.get(key)?.trim() ?? ""])
        .filter(([, value]) => value),
    );
    const body = { ...values, pageTitle, pathname, pageParameters };
    const validation = validateLeadRequest(body);
    setErrors(validation.success ? {} : validation.errors);
    if (!validation.success) {
      setStatus("error");
      setFeedback(Object.values(validation.errors)[0] ?? "Please check your contact details.");
      const first = Object.keys(validation.errors)[0];
      if (first) event.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    pending.current = true;
    setStatus("submitting");
    setFeedback("");
    const requestController = new AbortController();
    controller.current = requestController;
    const timeout = window.setTimeout(() => requestController.abort(), 12_000);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...body, phone: validation.data.phone }),
        signal: requestController.signal,
      });
      const result = await response.json().catch(() => null) as { success?: boolean; message?: string } | null;
      if (!response.ok || result?.success !== true) {
        throw new Error(result?.message || "We could not send your request. Please try again or call us directly.");
      }
      setStatus("success");
      setFeedback(`${settings.successTitle} ${settings.successMessage}`);
      router.push(settings.redirectPath);
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error && error.name === "AbortError"
        ? "The request timed out, so delivery could not be confirmed. Please do not submit it again immediately."
        : error instanceof Error ? error.message : "We could not send your request. Please try again.");
    } finally {
      window.clearTimeout(timeout);
      pending.current = false;
    }
  }

  return { values, status, feedback, errors, update, submit };
}

export function BisAdForm({ settings, form, headingId }: {
  settings: LeadFormSettings;
  form: ReturnType<typeof useBisAdForm>;
  headingId?: string;
}) {
  const id = useId();
  const inputClass = "block min-h-12 w-full min-w-0 rounded-xl border border-sky/60 bg-navy-950/60 px-4 py-3 font-sans text-sm text-cloud outline-none placeholder:text-ice/60 focus-visible:border-sky focus-visible:ring-2 focus-visible:ring-electric/40 max-[559px]:px-3.5 max-[559px]:text-base";
  const stages = [form.values.name.trim().length >= 3, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.values.email), /^\d{10}$/.test(form.values.phone)];

  return (
    <div className="min-w-0 overflow-hidden rounded-[24px] border border-sky/30 bg-navy-800 shadow-[0_24px_60px_rgba(0,8,34,0.34)] max-[559px]:rounded-[20px]">
      <div className="border-b border-sky/20 bg-linear-to-br from-cobalt-700/40 to-navy-900 px-5 py-5 min-[560px]:px-6 max-[559px]:p-4">
        <h2 className={`mb-1 font-sans text-xl font-bold text-cloud max-[559px]:text-lg ${headingId ? "pr-8" : ""}`} id={headingId ?? `${id}-heading`}>{settings.heading}</h2>
        <p className="mb-4 text-xs text-ice/75">{settings.subtitle}</p>
        <ol className="m-0 flex list-none gap-2 p-0" aria-label="Contact detail progress">
          {stages.map((complete, index) => (
            <li className={`flex flex-1 items-center gap-2 text-xs ${complete ? "text-sky" : "text-ice/60"}`} key={index} aria-label={`${[settings.nameLabel, settings.emailLabel, settings.phoneLabel][index]} ${complete ? "complete" : "incomplete"}`}>
              <span className={`grid size-6 shrink-0 place-items-center rounded-full border ${complete ? "border-sky bg-electric text-white" : "border-sky/20"}`} aria-hidden="true">{complete ? "✓" : index + 1}</span>
              {index < 2 ? <span className={`h-px flex-1 ${complete ? "bg-sky" : "bg-sky/20"}`} aria-hidden="true" /> : null}
            </li>
          ))}
        </ol>
      </div>
      <form className="p-5 min-[560px]:p-6 max-[559px]:p-4" onSubmit={form.submit} aria-busy={form.status === "submitting"} aria-labelledby={headingId ?? `${id}-heading`}>
        <fieldset className="m-0 min-w-0 space-y-3 border-0 p-0" disabled={form.status === "submitting" || form.status === "success"}>
          <legend className="sr-only">Consultation contact details</legend>
          <label className="block text-xs font-semibold text-ice" htmlFor={`${id}-name`}>{settings.nameLabel}</label>
          <input className={inputClass} id={`${id}-name`} name="name" aria-invalid={Boolean(form.errors.name)} aria-describedby={form.errors.name ? `${id}-name-error` : undefined} autoComplete="name" placeholder={settings.namePlaceholder} minLength={3} maxLength={120} required value={form.values.name} onChange={(event) => form.update("name", event.target.value)} />
          {form.errors.name ? <p className="text-sm text-sky-strong" id={`${id}-name-error`}>{form.errors.name}</p> : null}
          <label className="block text-xs font-semibold text-ice" htmlFor={`${id}-email`}>{settings.emailLabel}</label>
          <input className={inputClass} id={`${id}-email`} name="email" aria-invalid={Boolean(form.errors.email)} aria-describedby={form.errors.email ? `${id}-email-error` : undefined} type="email" autoComplete="email" placeholder={settings.emailPlaceholder} maxLength={254} required value={form.values.email} onChange={(event) => form.update("email", event.target.value)} />
          {form.errors.email ? <p className="text-sm text-sky-strong" id={`${id}-email-error`}>{form.errors.email}</p> : null}
          <label className="block text-xs font-semibold text-ice" htmlFor={`${id}-phone`}>{settings.phoneLabel}</label>
          <div className="flex min-w-0 gap-2">
            <span className="flex items-center rounded-xl border border-sky/25 bg-cobalt-700/25 px-3 text-sm text-sky" aria-hidden="true">+91</span>
            <input className={inputClass} id={`${id}-phone`} name="phone" aria-invalid={Boolean(form.errors.phone)} aria-describedby={form.errors.phone ? `${id}-phone-error` : undefined} type="tel" autoComplete="tel-national" inputMode="numeric" aria-label={`${settings.phoneLabel}, India +91`} placeholder={settings.phonePlaceholder} pattern="[0-9]{10}" maxLength={10} required value={form.values.phone} onChange={(event) => form.update("phone", event.target.value.replace(/\D/g, ""))} />
          {form.errors.phone ? <p className="text-sm text-sky-strong" id={`${id}-phone-error`}>{form.errors.phone}</p> : null}
          </div>
          <label className="block text-xs font-semibold text-ice" htmlFor={`${id}-message`}>{settings.messageLabel}</label>
          <textarea className={`${inputClass} resize-y`} id={`${id}-message`} name="message" aria-invalid={Boolean(form.errors.message)} aria-describedby={form.errors.message ? `${id}-message-error` : undefined} placeholder={settings.messagePlaceholder} rows={3} minLength={5} maxLength={LEAD_MESSAGE_MAX_LENGTH} required value={form.values.message} onChange={(event) => form.update("message", event.target.value)} />
          {form.errors.message ? <p className="text-sm text-sky-strong" id={`${id}-message-error`}>{form.errors.message}</p> : null}
          <div className="hidden" aria-hidden="true">
            <label htmlFor={`${id}-website`}>Website</label>
            <input id={`${id}-website`} name="website" autoComplete="off" tabIndex={-1} value={form.values.website} onChange={(event) => form.update("website", event.target.value)} />
          </div>
          <label className="flex items-start gap-2 text-xs leading-relaxed text-ice/80">
            <input className="mt-0.5 size-4 shrink-0 accent-electric focus-visible:outline-2 focus-visible:outline-sky" type="checkbox" name="consent" aria-invalid={Boolean(form.errors.consent)} aria-describedby={form.errors.consent ? `${id}-consent-error` : undefined} required checked={form.values.consent} onChange={(event) => form.update("consent", event.target.checked)} />
            <span>{settings.consentText} <a className="text-sky underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-sky" href={settings.privacyLink.href} target="_blank" rel="noreferrer">{settings.privacyLink.label}</a>.</span>
          </label>
          {form.errors.consent ? <p className="text-sm text-sky-strong" id={`${id}-consent-error`}>{form.errors.consent}</p> : null}
          <div className="flex flex-wrap justify-between gap-2 text-[0.6875rem] text-ice/70"><span>✓ {settings.secureLabel}</span><span>{settings.durationLabel}</span><span>{settings.noSpamLabel}</span></div>
          <button className="flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-sky/50 bg-linear-to-r from-electric to-cobalt-700 px-4 py-3 font-sans text-sm font-bold text-white hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky disabled:cursor-wait disabled:opacity-70" type="submit">
            {form.status === "submitting" ? settings.submittingLabel : settings.submitLabel} <span aria-hidden="true">→</span>
          </button>
        </fieldset>
        <p className="mb-0 mt-3 text-sm leading-relaxed text-sky-strong" role="status" aria-atomic="true">{form.feedback}</p>
      </form>
    </div>
  );
}
