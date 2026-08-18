const DEVELOPMENT_ORIGIN = "http://localhost:3000";

export class SiteUrlError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SiteUrlError";
  }
}

function isProductionEnv(nodeEnv: string | undefined): boolean {
  return nodeEnv === "production";
}

function isLocalHostname(hostname: string): boolean {
  const host = hostname.toLowerCase();
  return (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "0.0.0.0" ||
    host === "::1" ||
    host === "[::1]"
  );
}

/**
 * Public site origin used in canonical, Open Graph, and JSON-LD.
 * Development may fall back to localhost. Production must set
 * NEXT_PUBLIC_SITE_URL to a real http(s) origin — never localhost.
 */
export function resolvePublicSiteUrl(
  raw: string | undefined,
  nodeEnv: string | undefined = process.env.NODE_ENV,
): string {
  const value = raw?.trim();

  if (!value) {
    if (isProductionEnv(nodeEnv)) {
      throw new SiteUrlError(
        "NEXT_PUBLIC_SITE_URL is required for production builds. Set an absolute origin such as https://example.com (no trailing slash, not localhost).",
      );
    }
    return DEVELOPMENT_ORIGIN;
  }

  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    throw new SiteUrlError(
      `NEXT_PUBLIC_SITE_URL is not a valid absolute URL: "${value}". Use https://example.com with a scheme and hostname.`,
    );
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new SiteUrlError(
      `NEXT_PUBLIC_SITE_URL must use http or https, received "${parsed.protocol}".`,
    );
  }

  if (!parsed.hostname) {
    throw new SiteUrlError(
      "NEXT_PUBLIC_SITE_URL must include a hostname.",
    );
  }

  if (isProductionEnv(nodeEnv) && isLocalHostname(parsed.hostname)) {
    throw new SiteUrlError(
      "NEXT_PUBLIC_SITE_URL must not be a localhost address in production. That would bake localhost into canonical, Open Graph, and JSON-LD.",
    );
  }

  const origin = parsed.origin.replace(/\/$/, "");
  if (parsed.username || parsed.password) {
    throw new SiteUrlError(
      "NEXT_PUBLIC_SITE_URL must not include credentials.",
    );
  }

  if (parsed.search || parsed.hash || (parsed.pathname && parsed.pathname !== "/")) {
    throw new SiteUrlError(
      "NEXT_PUBLIC_SITE_URL must be an origin only (no path, query, or fragment). Example: https://example.com",
    );
  }

  return origin;
}
