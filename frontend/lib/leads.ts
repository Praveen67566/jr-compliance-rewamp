export const LEAD_BODY_LIMIT_BYTES = 16 * 1024;
export const LEAD_MESSAGE_MAX_LENGTH = 1000;

export type LeadType = "technical" | "corporate" | "global";

export type LeadPageParameters = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

export type ValidatedLead = {
  name: string;
  email: string;
  phone: string;
  message: string;
  pageTitle: string;
  pathname: string;
  pageParameters?: LeadPageParameters;
};

export type LeadWebhookPayload = {
  name: string;
  email: string;
  phone: string;
  message: string;
  page_name: string;
  page_parameters?: LeadPageParameters;
};

type LeadField =
  | "name"
  | "email"
  | "phone"
  | "message"
  | "consent"
  | "pageTitle"
  | "pathname"
  | "pageParameters";

export type LeadValidationResult =
  | { success: true; data: ValidatedLead }
  | { success: false; errors: Partial<Record<LeadField, string>> };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const utmKeys = ["utm_source", "utm_medium", "utm_campaign"] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function normalizedSingleLine(value: unknown): string {
  return typeof value === "string"
    ? value
        .trim()
        .replace(/[\u0000-\u001f\u007f]+/g, " ")
        .replace(/\s+/g, " ")
    : "";
}

export function normalizeLeadPhone(value: unknown): string {
  const digits = typeof value === "string" ? value.replace(/\D/g, "") : "";
  const supportedPrefixes = ["0091", "91", "0"];

  for (const prefix of supportedPrefixes) {
    if (digits.length === 10 + prefix.length && digits.startsWith(prefix)) {
      return digits.slice(prefix.length);
    }
  }

  return digits;
}

export function normalizeLeadPathname(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const candidate = value.trim();
  if (
    !candidate.startsWith("/") ||
    candidate.startsWith("//") ||
    candidate.length > 2048 ||
    candidate.includes("\\") ||
    /[\u0000-\u001f\u007f]/.test(candidate)
  ) {
    return null;
  }

  try {
    const base = new URL("https://jr-compliance.invalid");
    const parsed = new URL(candidate, base);
    return parsed.origin === base.origin && !parsed.username && !parsed.password
      ? parsed.pathname
      : null;
  } catch {
    return null;
  }
}

export function leadTypeFromPath(pathname: string): LeadType {
  if (pathname === "/approval" || pathname.startsWith("/approval/")) {
    return "technical";
  }

  if (pathname === "/corporate" || pathname.startsWith("/corporate/")) {
    return "corporate";
  }

  if (pathname === "/ad" || pathname.startsWith("/ad/")) {
    return "technical";
  }

  return "global";
}

export function validateLeadRequest(value: unknown): LeadValidationResult {
  if (!isRecord(value)) {
    return { success: false, errors: { pageTitle: "Invalid request." } };
  }

  const errors: Partial<Record<LeadField, string>> = {};
  const name = normalizedSingleLine(value.name);
  const email = normalizedSingleLine(value.email).toLowerCase();
  const phone = normalizeLeadPhone(value.phone);
  const message = typeof value.message === "string" ? value.message.trim() : "";
  const pageTitle = normalizedSingleLine(value.pageTitle);
  const pathname = normalizeLeadPathname(value.pathname);

  if (name.length < 3 || name.length > 120) {
    errors.name = "Enter a name between 3 and 120 characters.";
  }

  if (!emailPattern.test(email) || email.length > 254) {
    errors.email = "Enter a valid email address.";
  }

  if (!/^\d{10}$/.test(phone)) {
    errors.phone = "Enter a valid 10 digit mobile number.";
  }

  if (message.length < 5 || message.length > LEAD_MESSAGE_MAX_LENGTH) {
    errors.message = `Enter your requirements in 5 to ${LEAD_MESSAGE_MAX_LENGTH} characters.`;
  } else if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(message)) {
    errors.message = "Remove unsupported control characters from your requirements.";
  }

  if (value.consent !== true) {
    errors.consent = "Consent is required.";
  }

  if (!pageTitle || pageTitle.length > 200) {
    errors.pageTitle = "Invalid page title.";
  }

  if (!pathname) {
    errors.pathname = "Invalid page path.";
  }

  const pageParameters: LeadPageParameters = {};
  if (value.pageParameters !== undefined) {
    if (!isRecord(value.pageParameters)) {
      errors.pageParameters = "Invalid campaign parameters.";
    } else {
      for (const key of utmKeys) {
        const rawParameter = value.pageParameters[key];
        if (rawParameter === undefined || rawParameter === null || rawParameter === "") {
          continue;
        }

        const parameter = normalizedSingleLine(rawParameter);
        if (!parameter || parameter.length > 200 || typeof rawParameter !== "string") {
          errors.pageParameters = "Invalid campaign parameters.";
          break;
        }

        pageParameters[key] = parameter;
      }
    }
  }

  if (Object.keys(errors).length || !pathname) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      name,
      email,
      phone,
      message,
      pageTitle,
      pathname,
      ...(Object.keys(pageParameters).length ? { pageParameters } : {}),
    },
  };
}

export function buildLeadWebhookPayload(lead: ValidatedLead): LeadWebhookPayload {
  return {
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    message: lead.message,
    page_name: `${lead.pageTitle} - ${lead.pathname}`,
    ...(lead.pageParameters ? { page_parameters: lead.pageParameters } : {}),
  };
}
