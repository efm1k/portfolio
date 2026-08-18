import { describe, expect, it } from "vitest";
import { resolvePublicSiteUrl, SiteUrlError } from "./site-url";

describe("resolvePublicSiteUrl", () => {
  it("allows localhost when NEXT_PUBLIC_SITE_URL is absent in development", () => {
    expect(resolvePublicSiteUrl(undefined, "development")).toBe(
      "http://localhost:3000",
    );
    expect(resolvePublicSiteUrl("  ", "development")).toBe(
      "http://localhost:3000",
    );
  });

  it("does not silently canonicalize localhost in production when env is missing", () => {
    expect(() => resolvePublicSiteUrl(undefined, "production")).toThrow(
      SiteUrlError,
    );
    expect(() => resolvePublicSiteUrl("", "production")).toThrow(
      /NEXT_PUBLIC_SITE_URL is required/,
    );
  });

  it("rejects an explicit localhost production origin", () => {
    expect(() =>
      resolvePublicSiteUrl("http://localhost:3000", "production"),
    ).toThrow(/must not be a localhost/);
  });

  it("uses https://example.com as a test fixture origin in production", () => {
    expect(resolvePublicSiteUrl("https://example.com", "production")).toBe(
      "https://example.com",
    );
    expect(resolvePublicSiteUrl("https://example.com/", "production")).toBe(
      "https://example.com",
    );
  });

  it("rejects a broken production URL", () => {
    expect(() => resolvePublicSiteUrl("not-a-url", "production")).toThrow(
      SiteUrlError,
    );
    expect(() => resolvePublicSiteUrl("example.com", "production")).toThrow(
      SiteUrlError,
    );
    expect(() =>
      resolvePublicSiteUrl("https://example.com/portfolio", "production"),
    ).toThrow(/origin only/);
  });
});
