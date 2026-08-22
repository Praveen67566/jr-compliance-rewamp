"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  getCountries,
  getCountryCallingCode,
  type CountryCode,
} from "libphonenumber-js/min";

import { linkTargetProps } from "@/lib/link-props";
import {
  DEFAULT_LEAD_COUNTRY,
  LEAD_MESSAGE_MAX_LENGTH,
  normalizeLeadPhoneForCountry,
} from "@/lib/leads";
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
  phoneCountry: CountryCode;
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
  phoneCountry: DEFAULT_LEAD_COUNTRY,
  phone: "",
  message: "",
  consent: false,
  website: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneErrorMessage = "Please enter a valid phone number for the selected country.";
const initialPhoneCountries = getCountries()
  .map((country) => ({
    country,
    name: String(country),
    callingCode: getCountryCallingCode(country),
  }))
  .sort((left, right) =>
    left.country < right.country ? -1 : left.country > right.country ? 1 : 0,
  );

function englishPhoneCountries() {
  let displayNames: Intl.DisplayNames | null = null;

  try {
    displayNames =
      typeof Intl.DisplayNames === "function"
        ? new Intl.DisplayNames(["en"], { type: "region" })
        : null;
  } catch {
    return initialPhoneCountries;
  }

  if (!displayNames) {
    return initialPhoneCountries;
  }

  return initialPhoneCountries
    .map((option) => {
      let name = option.name;

      try {
        name = displayNames.of(option.country) ?? option.name;
      } catch {
        // Keep the ISO code when a browser cannot resolve a region display name.
      }

      return { ...option, name };
    })
    .sort((left, right) => left.name.localeCompare(right.name, "en"));
}

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
  if (!normalizeLeadPhoneForCountry(values.phone, values.phoneCountry)) {
    errors.phone = phoneErrorMessage;
  }
  if (message && (message.length < 5 || message.length > LEAD_MESSAGE_MAX_LENGTH)) {
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
  const [phoneCountries, setPhoneCountries] = useState(initialPhoneCountries);
  const [errors, setErrors] = useState<FormErrors>({});
  const [messageExpanded, setMessageExpanded] = useState(false);
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

  useEffect(() => {
    setPhoneCountries(englishPhoneCountries());
  }, []);

  if (!settings.enabled) {
    return null;
  }

  const completedStages = [
    values.name.trim().length >= 3,
    emailPattern.test(values.email.trim()),
    Boolean(normalizeLeadPhoneForCountry(values.phone, values.phoneCountry)),
  ];
  const selectedCallingCode = getCountryCallingCode(values.phoneCountry);

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

  function updatePhoneCountry(country: CountryCode) {
    setValues((current) => ({ ...current, phoneCountry: country }));
    if (errors.phone) {
      setErrors((current) => ({
        ...current,
        phone: normalizeLeadPhoneForCountry(values.phone, country)
          ? undefined
          : phoneErrorMessage,
      }));
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

    const normalizedPhone = normalizeLeadPhoneForCountry(
      values.phone,
      values.phoneCountry,
    );
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus("error");
      setFeedback("Please check the highlighted fields.");
      const firstInvalidField = (["name", "email", "phone", "message", "consent"] as const).find(
        (field) => nextErrors[field],
      );
      if (firstInvalidField) {
        const focusInvalidField = () => {
          document.getElementById(`${fieldId}-${firstInvalidField}`)?.focus();
        };
        if (firstInvalidField === "message" && !messageExpanded) {
          setMessageExpanded(true);
          window.setTimeout(focusInvalidField, 0);
        } else {
          focusInvalidField();
        }
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
          phone: normalizedPhone,
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
    "group/field relative flex min-h-12 items-center rounded-xl border border-sky/20 bg-navy-950/45 text-ice shadow-[inset_0_1px_rgba(255,255,255,0.06)] transition-[border-color,background-color,box-shadow] duration-200 hover:border-sky/35 focus-within:border-sky/70 focus-within:bg-navy-950/70 focus-within:shadow-[0_0_0_3px_rgba(22,140,245,0.12),inset_0_1px_rgba(255,255,255,0.08)]";
  const inputClass =
    "m-0 h-12 w-full appearance-none rounded-xl border-0 bg-transparent pr-3.5 font-sans text-[0.9rem] text-white outline-none placeholder:text-ice/60 disabled:cursor-wait disabled:opacity-60";

  return (
    <section
      className={`relative isolate mx-auto w-full max-w-[480px] max-[560px]:max-w-[calc(100vw-2.25rem)] scroll-mt-[102px] overflow-hidden rounded-[24px] border border-sky/30 bg-[linear-gradient(160deg,rgba(4,26,67,0.98),rgba(3,15,43,0.985))] font-sans text-white shadow-[0_26px_70px_rgba(0,8,34,0.42)] backdrop-blur-xl before:pointer-events-none before:absolute before:inset-x-10 before:top-0 before:z-[2] before:h-px before:bg-[linear-gradient(90deg,transparent,rgba(139,220,255,0.85),transparent)] before:content-[''] ${className}`}
      id={id}
      aria-labelledby={`${fieldId}-heading`}
    >
      <div className="relative border-b border-sky/18 bg-[radial-gradient(circle_at_18%_0%,rgba(22,140,245,0.28),transparent_48%),linear-gradient(120deg,rgba(13,92,184,0.2),rgba(3,15,43,0.12))] px-5 pb-4 pt-[18px] sm:px-[22px]">
        <h2 className="font-sans text-[clamp(1.4rem,3vw,1.75rem)] font-extrabold leading-tight tracking-[-0.025em]" id={`${fieldId}-heading`}>
          {settings.heading}
        </h2>
        <p className="mb-0 mt-1.5 text-[0.8rem] text-ice/62">{settings.subtitle}</p>
        <div className="mt-4 grid grid-cols-3 gap-2" aria-label="Contact detail progress" role="list">
          {completedStages.map((complete, index) => (
            <span
              className={`h-1.5 rounded-full transition-[background-color,box-shadow] duration-200 ${
                complete
                  ? "bg-[linear-gradient(90deg,var(--blue-electric),var(--blue-sky))] shadow-[0_0_12px_rgba(22,140,245,0.42)]"
                  : "bg-white/12"
              }`}
              key={index}
              role="listitem"
              aria-label={`${[settings.nameLabel, settings.emailLabel, settings.phoneLabel][index]} ${complete ? "complete" : "incomplete"}`}
            />
          ))}
        </div>
      </div>

      <form
        aria-busy={status === "submitting"}
        className="space-y-3 px-5 py-[18px] sm:px-[22px]"
        noValidate
        onSubmit={submit}
      >
        <fieldset
          className="m-0 min-w-0 space-y-3 border-0 p-0"
          disabled={status === "submitting" || status === "success"}
        >
          <legend className="sr-only">Consultation contact details</legend>
          <div>
            <label className="sr-only" htmlFor={`${fieldId}-name`}>{settings.nameLabel}</label>
            <div className={`${fieldShell} ${errors.name ? "border-sky-strong" : ""}`}>
              <span className="pointer-events-none absolute left-3 grid size-8 place-items-center rounded-lg border border-sky/12 bg-white/[0.055] text-sky/70 transition-colors group-focus-within/field:text-sky"><InputIcon kind="name" /></span>
              <input
                aria-describedby={errors.name ? `${fieldId}-name-error` : undefined}
                aria-invalid={Boolean(errors.name)}
                autoComplete="name"
                className={`${inputClass} pl-[3.25rem]`}
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
            {errors.name ? <p className="mb-0 mt-1 text-xs text-sky-strong" id={`${fieldId}-name-error`}>{errors.name}</p> : null}
          </div>

          <div>
            <label className="sr-only" htmlFor={`${fieldId}-email`}>{settings.emailLabel}</label>
            <div className={`${fieldShell} ${errors.email ? "border-sky-strong" : ""}`}>
              <span className="pointer-events-none absolute left-3 grid size-8 place-items-center rounded-lg border border-sky/12 bg-white/[0.055] text-sky/70 transition-colors group-focus-within/field:text-sky"><InputIcon kind="email" /></span>
              <input
                aria-describedby={errors.email ? `${fieldId}-email-error` : undefined}
                aria-invalid={Boolean(errors.email)}
                autoComplete="email"
                className={`${inputClass} pl-[3.25rem]`}
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
            {errors.email ? <p className="mb-0 mt-1 text-xs text-sky-strong" id={`${fieldId}-email-error`}>{errors.email}</p> : null}
          </div>

          <div>
            <label className="sr-only" htmlFor={`${fieldId}-phone`} id={`${fieldId}-phone-label`}>{settings.phoneLabel}</label>
            <div
              aria-labelledby={`${fieldId}-phone-label`}
              className={`${fieldShell} ${errors.phone ? "border-sky-strong" : ""}`}
              role="group"
            >
              <div className="absolute inset-y-0 left-0 w-28 rounded-l-xl border-r border-sky/15 bg-white/[0.055]">
                <label className="sr-only" htmlFor={`${fieldId}-phone-country`}>
                  Country calling code
                </label>
                <select
                  aria-describedby={`${fieldId}-phone-hint${errors.phone ? ` ${fieldId}-phone-error` : ""}`}
                  className="peer absolute inset-0 z-10 size-full cursor-pointer opacity-0 disabled:cursor-wait"
                  id={`${fieldId}-phone-country`}
                  name="phone-country"
                  onChange={(event) => updatePhoneCountry(event.target.value as CountryCode)}
                  value={values.phoneCountry}
                >
                  {phoneCountries.map(({ country, name, callingCode }) => (
                    <option key={country} value={country}>
                      {name} (+{callingCode})
                    </option>
                  ))}
                </select>
                <span
                  aria-hidden="true"
                  className="pointer-events-none flex h-full items-center gap-1.5 rounded-l-[11px] px-2.5 text-[0.72rem] font-extrabold text-sky transition-[background-color,box-shadow] peer-focus-visible:bg-white/[0.09] peer-focus-visible:shadow-[inset_0_0_0_2px_var(--blue-sky)]"
                >
                  <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24">
                    <path d="M7 5.5a13.7 13.7 0 0 0 11.5 11.5l1.4-1.4a1.5 1.5 0 0 1 1.54-.36l2.06.69v4.57A1.5 1.5 0 0 1 22 22C10.95 22 2 13.05 2 2A1.5 1.5 0 0 1 3.5.5h4.57l.69 2.06A1.5 1.5 0 0 1 8.4 4.1L7 5.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
                  </svg>
                  <span className="whitespace-nowrap">
                    {values.phoneCountry} +{selectedCallingCode}
                  </span>
                  <svg className="size-3 shrink-0" fill="none" viewBox="0 0 12 12">
                    <path d="m3 4.5 3 3 3-3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  </svg>
                </span>
              </div>
              <input
                aria-describedby={`${fieldId}-phone-hint${errors.phone ? ` ${fieldId}-phone-error` : ""}`}
                aria-invalid={Boolean(errors.phone)}
                autoComplete="tel-national"
                className={`${inputClass} pl-[7.5rem]`}
                id={`${fieldId}-phone`}
                inputMode="numeric"
                maxLength={32}
                name="phone"
                onChange={(event) => updateValue("phone", event.target.value.replace(/\D/g, "").slice(0, 15))}
                placeholder={settings.phonePlaceholder}
                required
                type="tel"
                value={values.phone}
              />
            </div>
            <span className="sr-only" id={`${fieldId}-phone-hint`}>
              Choose a country code, then enter the national phone number. The calling code is added automatically.
            </span>
            {errors.phone ? <p className="mb-0 mt-1 text-xs text-sky-strong" id={`${fieldId}-phone-error`}>{errors.phone}</p> : null}
          </div>

          <div>
            <button
              aria-controls={`${fieldId}-message-panel`}
              aria-expanded={messageExpanded}
              className={`group/message flex min-h-11 w-full items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left text-[0.82rem] font-semibold transition-[border-color,background-color,color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky ${
                errors.message
                  ? "border-sky-strong bg-sky/10 text-white"
                  : "border-sky/15 bg-white/[0.035] text-ice/72 hover:border-sky/35 hover:bg-white/[0.065] hover:text-white"
              }`}
              id={`${fieldId}-message-toggle`}
              onClick={() => setMessageExpanded((expanded) => !expanded)}
              type="button"
            >
              <svg
                aria-hidden="true"
                className={`size-4 flex-none text-sky transition-transform duration-200 motion-reduce:transition-none ${messageExpanded ? "rotate-90" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path d="m9 5 7 7-7 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
              </svg>
              <span className="min-w-0 flex-1 leading-4">
                {settings.messageLabel} <span className="font-medium text-sky">(optional)</span>
              </span>
            </button>
            <div className="pt-2.5" hidden={!messageExpanded} id={`${fieldId}-message-panel`}>
              <label className="sr-only" htmlFor={`${fieldId}-message`}>
                {settings.messageLabel} (optional)
              </label>
              <textarea
                aria-describedby={`${fieldId}-message-hint${errors.message ? ` ${fieldId}-message-error` : ""}`}
                aria-invalid={Boolean(errors.message)}
                className={`m-0 min-h-20 w-full appearance-none resize-y rounded-xl border bg-navy-950/45 px-3.5 py-3 font-sans text-[0.9rem] leading-5 text-white outline-none transition-[border-color,background-color,box-shadow] duration-200 placeholder:text-ice/60 focus:border-sky/70 focus:bg-navy-950/70 focus:shadow-[0_0_0_3px_rgba(22,140,245,0.12)] disabled:cursor-wait disabled:opacity-60 ${errors.message ? "border-sky-strong" : "border-sky/20"}`}
                id={`${fieldId}-message`}
                maxLength={LEAD_MESSAGE_MAX_LENGTH}
                minLength={5}
                name="message"
                onChange={(event) => updateValue("message", event.target.value)}
                placeholder={settings.messagePlaceholder}
                rows={3}
                value={values.message}
              />
              <span className="sr-only" id={`${fieldId}-message-hint`}>
                Optional; if provided, enter 5 to {LEAD_MESSAGE_MAX_LENGTH} characters.
              </span>
              {errors.message ? <p className="mb-0 mt-1 text-xs text-sky-strong" id={`${fieldId}-message-error`}>{errors.message}</p> : null}
            </div>
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

          <div
            className={`rounded-xl border px-3 py-2.5 transition-[border-color,background-color] duration-200 ${
              errors.consent ? "border-sky-strong bg-sky/10" : "border-sky/12 bg-white/[0.025]"
            }`}
          >
            <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-[1.15rem] text-ice/68" htmlFor={`${fieldId}-consent`}>
              <input
                aria-describedby={errors.consent ? `${fieldId}-consent-error` : undefined}
                aria-invalid={Boolean(errors.consent)}
                checked={values.consent}
                className="mt-px size-4 shrink-0 accent-[var(--blue-electric)] outline-offset-2 focus-visible:outline-2 focus-visible:outline-sky"
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
            {errors.consent ? <p className="mb-0 mt-1 pl-[1.65rem] text-xs text-sky-strong" id={`${fieldId}-consent-error`}>{errors.consent}</p> : null}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-0.5 pt-0.5 text-[0.72rem] text-ice/58">
            <span className="inline-flex items-center gap-1.5"><ReassuranceIcon kind="secure" /> {settings.secureLabel}</span>
            <span className="inline-flex items-center gap-1.5"><ReassuranceIcon kind="time" /> {settings.durationLabel}</span>
            <span className="ml-auto">{settings.noSpamLabel}</span>
          </div>

          <button
            className="group flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl border border-sky/55 bg-[linear-gradient(115deg,var(--blue-electric),var(--blue-cobalt-700))] px-5 text-[0.92rem] font-extrabold text-white shadow-[0_12px_26px_rgba(13,116,239,0.28)] transition-[translate,filter,box-shadow] duration-200 motion-safe:hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_15px_32px_rgba(13,116,239,0.36)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-sky disabled:translate-y-0 disabled:cursor-wait disabled:opacity-70"
            type="submit"
          >
            {status === "submitting" ? (
              <span className="size-4 animate-spin rounded-full border-2 border-white/35 border-t-white" aria-hidden="true" />
            ) : null}
            {status === "submitting" ? settings.submittingLabel : settings.submitLabel}
            {status !== "submitting" ? <span className="text-lg transition-transform duration-200 motion-safe:group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true">→</span> : null}
          </button>
        </fieldset>

        <div role={status === "error" ? "alert" : "status"} aria-live="polite">
          {feedback ? (
            <p className={`mb-0 text-center text-[0.7rem] leading-4 ${status === "success" ? "text-sky" : "text-sky-strong"}`}>
              {feedback}
            </p>
          ) : null}
        </div>
      </form>

      {settings.trustItems.length ? (
        <div className="border-t border-sky/18 bg-white/[0.045] px-5 py-4 text-center sm:px-[22px]">
          {settings.trustHeading ? <h3 className="text-xs font-extrabold text-ice/72">{settings.trustHeading}</h3> : null}
          {settings.trustDescription ? <p className="mb-0 mt-1 text-[0.7rem] text-ice/50">{settings.trustDescription}</p> : null}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5">
            {settings.trustItems.map((item) => {
              const mark = item.logo ? <img className="max-h-6 max-w-28 object-contain opacity-72 grayscale" src={item.logo} alt={item.name} /> : <span className="text-[0.7rem] font-extrabold text-ice/62">{item.name}</span>;
              return item.link ? (
                <a href={item.link.href} key={item.name} {...linkTargetProps(item.link)} aria-label={item.link.label}>{mark}</a>
              ) : <span key={item.name}>{mark}</span>;
            })}
          </div>
        </div>
      ) : null}

      {settings.experienceText ? (
        <div className="flex items-center justify-center gap-2 border-t border-sky/15 bg-white/[0.025] px-5 py-2.5 text-[0.72rem] text-ice/58">
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
