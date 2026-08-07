const localSiteUrl = "http://localhost:8123";

/** Returns the configured public origin when it is a valid absolute URL. */
export function configuredSiteUrl(): URL | undefined {
  const value = process.env.SITE_URL;
  if (!value) {
    return undefined;
  }

  try {
    return new URL(value);
  } catch {
    return undefined;
  }
}

/** Provides a safe local origin for metadata routes before production is configured. */
export function publicSiteUrl(): URL {
  return configuredSiteUrl() ?? new URL(localSiteUrl);
}
