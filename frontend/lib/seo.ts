import type { JsonLdSchema, JsonLdValue } from "@/lib/types";

export function normalizeSeoKeywords(value: unknown): string[] | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const keywords = value
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);

  return keywords.length ? keywords : undefined;
}

function isJsonLdValue(value: unknown): value is JsonLdValue {
  if (
    value === null ||
    typeof value === "string" ||
    typeof value === "boolean"
  ) {
    return true;
  }

  if (typeof value === "number") {
    return Number.isFinite(value);
  }

  if (Array.isArray(value)) {
    return value.every(isJsonLdValue);
  }

  return (
    typeof value === "object" &&
    value !== null &&
    Object.values(value).every(isJsonLdValue)
  );
}

export function normalizeSchemaMarkup(value: unknown): JsonLdSchema | undefined {
  if (Array.isArray(value)) {
    return value.every(isJsonLdValue) ? value : undefined;
  }

  return isJsonLdValue(value) && typeof value === "object" && value !== null
    ? value
    : undefined;
}

export function serializeJsonLd(value: JsonLdSchema): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
