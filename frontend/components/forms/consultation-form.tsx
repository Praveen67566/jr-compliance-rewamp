"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { linkTargetProps } from "@/lib/link-props";
import { LEAD_MESSAGE_MAX_LENGTH, normalizeLeadPhone } from "@/lib/leads";
import type { LeadFormSettings } from "@/lib/types";

type ConsultationFormProps = {
  settings: LeadFormSettings;
  pageTitle: string;
  className?: string;
  id?: string;
};

type FormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
  website: string;
};

type FormField = "name" | "email" | "phone" | "message" | "consent";
type FormErrors = Partial<Record<FormField, string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
  consent: false,
  website: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (name.length < 3 || name.length > 120) {
    errors.name = "Please enter at least 3 characters.";
  }
  if (!emailPattern.test(email) || email.length > 254) {
    errors.email = "Please enter a valid email address.";
  }
  if (!/^\d{10}$/.test(values.phone)) {
    errors.phone = "Please enter a 10 digit mobile number.";
  }
  if (message.length < 5 || message.length > LEAD_MESSAGE_MAX_LENGTH) {
    errors.message = `Please enter 5 to ${LEAD_MESSAGE_MAX_LENGTH} characters.`;
  }
  if (!values.consent) {
    errors.consent = "Please provide consent before submitting.";
  }

  return errors;
}

function safeRedirectPath(value: string): string {
  if (!value.startsWith("/") || value.startsWith("//") || value.includes("\\")) {
    return "/thank-you";
  }

  try {
    const base = new URL("https://jr-compliance.invalid");
    const target = new URL(value, base);
    return target.origin === base.origin
      ? `${target.pathname}${target.search}${target.hash}`
      : "/thank-you";
  } catch {
    return "/thank-you";
  }
}

function campaignParameters() {
  const search = new URLSearchParams(window.location.search);
  const values = {
    utm_source: search.get("utm_source")?.trim() ?? "",
    utm_medium: search.get("utm_medium")?.trim() ?? "",
    utm_campaign: search.get("utm_campaign")?.trim() ?? "",
  };

  return Object.fromEntries(Object.entries(values).filter(([, value]) => value));
}

function InputIcon({ kind }: { kind: "name" | "email" }) {
  return kind === "name" ? (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm13 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  ) : (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24">
      <path d="m3 6 9 6 9-6M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function ReassuranceIcon({ kind }: { kind: "secure" | "time" }) {
  return kind === "secure" ? (
    <svg aria-hidden="true" className="size-4 text-sky" fill="none" viewBox="0 0 24 24">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  ) : (
    <svg aria-hidden="true" className="size-4 text-sky" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

export function ConsultationForm({
  settings,
  pageTitle,
  className = "",
  id = "expert-consultation",
}: ConsultationFormProps) {
  const pathname = usePathname();
  const router = useRouter();
  const fieldId = useId().replace(/:/g, "");
  const redirectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  useEffect(
    () => () => {
      if (redirectTimer.current) {
        clearTimeout(redirectTimer.current);
      }
    },
    [],
  );

  if (!settings.enabled) {
    return null;
  }

  const completedStages = [
    values.name.trim().length >= 3,
    emailPattern.test(values.email.trim()),
    /^\d{10}$/.test(values.phone),
  ];

  function updateValue<Field extends keyof FormValues>(field: Field, value: FormValues[Field]) {
    setValues((current) => ({ ...current, [field]: value }));
    if (field in errors) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
    if (status === "error") {
      setStatus("idle");
      setFeedback("");
    }
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting" || status === "success") {
      return;
    }

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus("error");
      setFeedback("Please check the highlighted fields.");
      const firstInvalidField = (["name", "email", "phone", "message", "consent"] as const).find(
        (field) => nextErrors[field],
      );
      if (firstInvalidField) {
        document.getElementById(`${fieldId}-${firstInvalidField}`)?.focus();
      }
      return;
    }

    setStatus("submitting");
    setFeedback("");
    const controller = new AbortController();
    const requestTimeout = window.setTimeout(() => controller.abort(), 12_000);

    try {
      const pageParameters = campaignParameters();
      const response = await fetch("/api/leads", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          message: values.message,
          consent: values.consent,
          website: values.website,
          pageTitle,
          pathname: pathname || window.location.pathname,
          ...(Object.keys(pageParameters).length ? { pageParameters } : {}),
        }),
        signal: controller.signal,
      });

      let responseBody: unknown;
      try {
        responseBody = await response.json();
      } catch {
        responseBody = null;
      }

      if (!response.ok) {
        const serverMessage =
          responseBody &&
          typeof responseBody === "object" &&
          "message" in responseBody &&
          typeof responseBody.message === "string"
            ? responseBody.message
            : "We could not send your request. Please try again.";
        throw new Error(serverMessage);
      }

      setStatus("success");
      setFeedback(`${settings.successTitle}. ${settings.successMessage}`);
      redirectTimer.current = setTimeout(() => {
        router.push(safeRedirectPath(settings.redirectPath));
      }, 1_800);
    } catch (error) {
      const message =
        error instanceof Error && error.name === "AbortError"
          ? "The request timed out, so delivery could not be confirmed. Please do not submit it again immediately."
          : error instanceof Error
            ? error.message
            : "We could not send your request. Please try again.";
      setStatus("error");
      setFeedback(message);
    } finally {
      window.clearTimeout(requestTimeout);
    }
  }

  const fieldShell =
    "relative flex min-h-13 items-center rounded-2xl border border-sky/25 bg-white/[0.075] text-ice shadow-[inset_0_1px_rgba(255,255,255,0.08)] transition focus-within:border-sky focus-within:bg-white/[0.11]";
  const inputClass =
    "m-0 h-13 w-full appearance-none rounded-2xl border-0 bg-transparent pr-4 font-sans text-[0.94rem] text-white outline-none placeholder:text-ice/60 disabled:cursor-wait disabled:opacity-60";

  return (
    <section
      className={`relative w-full scroll-mt-[102px] overflow-hidden rounded-[28px] border border-sky/40 bg-navy-900/95 font-sans text-white shadow-[0_30px_85px_rgba(0,8,34,0.48)] backdrop-blur-md ${className}`}
      id={id}
      aria-labelledby={`${fieldId}-heading`}
    >
      <div className="border-b border-sky/25 bg-[radial-gradient(circle_at_50%_0%,rgba(22,140,245,0.32),transparent_58%),linear-gradient(120deg,rgba(13,92,184,0.24),rgba(3,15,43,0.18))] px-5 pb-5 pt-5 sm:px-6">
        <h2 className="font-display text-[clamp(1.75rem,3vw,2.35rem)] leading-none tracking-[-0.035em]" id={`${fieldId}-heading`}>
          {settings.heading}
        </h2>
        <p className="mb-0 mt-2 text-sm text-ice/70">{settings.subtitle}</p>
        <div className="mt-5 grid grid-cols-[auto_minmax(24px,1fr)_auto_minmax(24px,1fr)_auto] items-center gap-2" aria-label="Contact detail progress" role="list">
          {completedStages.map((complete, index) => (
            <div className="contents" key={index} role="listitem">
              <span
                className={`flex size-8 items-center justify-center rounded-full border text-xs font-extrabold transition ${
                  complete ? "border-sky bg-electric text-white" : "border-ice/35 bg-white/10 text-ice/55"
                }`}
                aria-label={`${[settings.nameLabel, settings.emailLabel, settings.phoneLabel][index]} ${complete ? "complete" : "incomplete"}`}
              >
                {complete ? "✓" : index + 1}
              </span>
              {index < 2 ? (
                <span className={`h-px ${completedStages[index] ? "bg-sky" : "bg-ice/28"}`} aria-hidden="true" />
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <form
        aria-busy={status === "submitting"}
        className="space-y-3.5 px-5 py-5 sm:px-6"
        noValidate
        onSubmit={submit}
      >
        <fieldset
          className="m-0 min-w-0 space-y-3.5 border-0 p-0"
          disabled={status === "submitting" || status === "success"}
        >
          <legend className="sr-only">Consultation contact details</legend>
          <div>
            <label className="sr-only" htmlFor={`${fieldId}-name`}>{settings.nameLabel}</label>
            <div className={`${fieldShell} ${errors.name ? "border-sky-strong" : ""}`}>
              <span className="pointer-events-none absolute left-4 text-ice/55"><InputIcon kind="name" /></span>
              <input
                aria-describedby={errors.name ? `${fieldId}-name-error` : undefined}
                aria-invalid={Boolean(errors.name)}
                autoComplete="name"
                className={`${inputClass} pl-12`}
                id={`${fieldId}-name`}
                maxLength={120}
                minLength={3}
                name="name"
                onChange={(event) => updateValue("name", event.target.value)}
                placeholder={settings.namePlaceholder}
                required
                type="text"
                value={values.name}
              />
            </div>
            {errors.name ? <p className="mb-0 mt-1.5 text-xs text-sky-strong" id={`${fieldId}-name-error`}>{errors.name}</p> : null}
          </div>

          <div>
            <label className="sr-only" htmlFor={`${fieldId}-email`}>{settings.emailLabel}</label>
            <div className={`${fieldShell} ${errors.email ? "border-sky-strong" : ""}`}>
              <span className="pointer-events-none absolute left-4 text-ice/55"><InputIcon kind="email" /></span>
              <input
                aria-describedby={errors.email ? `${fieldId}-email-error` : undefined}
                aria-invalid={Boolean(errors.email)}
                autoComplete="email"
                className={`${inputClass} pl-12`}
                id={`${fieldId}-email`}
                maxLength={254}
                name="email"
                onChange={(event) => updateValue("email", event.target.value)}
                placeholder={settings.emailPlaceholder}
                required
                type="email"
                value={values.email}
              />
            </div>
            {errors.email ? <p className="mb-0 mt-1.5 text-xs text-sky-strong" id={`${fieldId}-email-error`}>{errors.email}</p> : null}
          </div>

          <div>
            <label className="sr-only" htmlFor={`${fieldId}-phone`}>{settings.phoneLabel}</label>
            <div className={`${fieldShell} ${errors.phone ? "border-sky-strong" : ""}`}>
              <span className="absolute inset-y-0 left-0 flex items-center rounded-l-2xl border-r border-sky/20 bg-white/[0.08] px-3 text-sm font-bold text-sky" aria-hidden="true">🇮🇳 +91</span>
              <input
                aria-describedby={`${fieldId}-phone-hint${errors.phone ? ` ${fieldId}-phone-error` : ""}`}
                aria-invalid={Boolean(errors.phone)}
                autoComplete="tel-national"
                className={`${inputClass} pl-[6.35rem]`}
                id={`${fieldId}-phone`}
                inputMode="numeric"
                maxLength={18}
                name="phone"
                onChange={(event) => updateValue("phone", normalizeLeadPhone(event.target.value).slice(0, 10))}
                pattern="[0-9]{10}"
                placeholder={settings.phonePlaceholder}
                required
                type="tel"
                value={values.phone}
              />
            </div>
            <span className="sr-only" id={`${fieldId}-phone-hint`}>
              Indian mobile number. The +91 country code is added automatically; enter 10 digits.
            </span>
            {errors.phone ? <p className="mb-0 mt-1.5 text-xs text-sky-strong" id={`${fieldId}-phone-error`}>{errors.phone}</p> : null}
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-ice/85" htmlFor={`${fieldId}-message`}>
              {settings.messageLabel} <span className="text-sky" aria-hidden="true">*</span>
            </label>
            <textarea
              aria-describedby={errors.message ? `${fieldId}-message-error` : `${fieldId}-message-hint`}
              aria-invalid={Boolean(errors.message)}
              className={`m-0 min-h-24 w-full appearance-none resize-y rounded-2xl border bg-white/[0.075] px-4 py-3 font-sans text-[0.94rem] leading-6 text-white outline-none transition placeholder:text-ice/60 focus:border-sky focus:bg-white/[0.11] disabled:cursor-wait disabled:opacity-60 ${errors.message ? "border-sky-strong" : "border-sky/25"}`}
              id={`${fieldId}-message`}
              maxLength={LEAD_MESSAGE_MAX_LENGTH}
              minLength={5}
              name="message"
              onChange={(event) => updateValue("message", event.target.value)}
              placeholder={settings.messagePlaceholder}
              required
              value={values.message}
            />
            <span className="sr-only" id={`${fieldId}-message-hint`}>Required, up to {LEAD_MESSAGE_MAX_LENGTH} characters.</span>
            {errors.message ? <p className="mb-0 mt-1.5 text-xs text-sky-strong" id={`${fieldId}-message-error`}>{errors.message}</p> : null}
          </div>

          <div className="absolute -left-[10000px] top-auto size-px overflow-hidden">
            <label htmlFor={`${fieldId}-website`}>Leave this field empty</label>
            <input
              autoComplete="off"
              id={`${fieldId}-website`}
              name="website"
              onChange={(event) => updateValue("website", event.target.value)}
              tabIndex={-1}
              type="text"
              value={values.website}
            />
          </div>

          <div>
            <label className="flex cursor-pointer items-start gap-3 text-xs leading-5 text-ice/72" htmlFor={`${fieldId}-consent`}>
              <input
                aria-describedby={errors.consent ? `${fieldId}-consent-error` : undefined}
                aria-invalid={Boolean(errors.consent)}
                checked={values.consent}
                className="mt-0.5 size-4 shrink-0 accent-[var(--blue-electric)] outline-offset-2 focus-visible:outline-2 focus-visible:outline-sky"
                id={`${fieldId}-consent`}
                name="consent"
                onChange={(event) => updateValue("consent", event.target.checked)}
                required
                type="checkbox"
              />
              <span>
                {settings.consentText}{" "}
                <a className="font-bold text-sky underline decoration-sky/45 underline-offset-2 hover:text-white" href={settings.privacyLink.href} {...linkTargetProps(settings.privacyLink)}>
                  {settings.privacyLink.label}
                </a>
                .
              </span>
            </label>
            {errors.consent ? <p className="mb-0 mt-1.5 text-xs text-sky-strong" id={`${fieldId}-consent-error`}>{errors.consent}</p> : null}
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs text-ice/58">
            <span className="inline-flex items-center gap-1.5"><ReassuranceIcon kind="secure" /> {settings.secureLabel}</span>
            <span className="inline-flex items-center gap-1.5"><ReassuranceIcon kind="time" /> {settings.durationLabel}</span>
            <span className="ml-auto">{settings.noSpamLabel}</span>
          </div>

          <button
            className="group flex min-h-13 w-full items-center justify-center gap-3 rounded-2xl border border-sky/65 bg-[linear-gradient(110deg,#2378ff,#00b9d7)] px-5 text-base font-extrabold text-white shadow-[0_14px_32px_rgba(13,116,239,0.34)] transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky disabled:translate-y-0 disabled:cursor-wait disabled:opacity-70"
            type="submit"
          >
            {status === "submitting" ? (
              <span className="size-4 animate-spin rounded-full border-2 border-white/35 border-t-white" aria-hidden="true" />
            ) : null}
            {status === "submitting" ? settings.submittingLabel : settings.submitLabel}
            {status !== "submitting" ? <span className="text-xl transition group-hover:translate-x-1" aria-hidden="true">→</span> : null}
          </button>
        </fieldset>

        <p
          className={`mb-0 min-h-5 text-center text-xs ${status === "success" ? "text-sky" : status === "error" ? "text-sky-strong" : "text-transparent"}`}
          role={status === "error" ? "alert" : "status"}
          aria-live="polite"
        >
          {feedback || "\u00a0"}
        </p>
      </form>

      {settings.trustItems.length ? (
        <div className="border-t border-sky/20 bg-white/[0.055] px-5 py-5 text-center sm:px-6">
          {settings.trustHeading ? <h3 className="text-sm font-extrabold text-ice/75">{settings.trustHeading}</h3> : null}
          {settings.trustDescription ? <p className="mb-0 mt-1 text-xs text-ice/45">{settings.trustDescription}</p> : null}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {settings.trustItems.map((item) => {
              const mark = item.logo ? <img className="max-h-7 max-w-32 object-contain opacity-75 grayscale" src={item.logo} alt={item.name} /> : <span className="text-xs font-extrabold text-ice/65">{item.name}</span>;
              return item.link ? (
                <a href={item.link.href} key={item.name} {...linkTargetProps(item.link)} aria-label={item.link.label}>{mark}</a>
              ) : <span key={item.name}>{mark}</span>;
            })}
          </div>
        </div>
      ) : null}

      {settings.experienceText ? (
        <div className="flex items-center justify-center gap-2 border-t border-sky/18 bg-white/[0.035] px-5 py-3 text-xs text-ice/55">
          <svg aria-hidden="true" className="size-4 text-sky" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.8" />
            <path d="m9 12-1 9 4-2 4 2-1-9" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
          </svg>
          {settings.experienceText}
        </div>
      ) : null}
    </section>
  );
}
