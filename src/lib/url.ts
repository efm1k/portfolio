import { siteConfig } from "@/config/site";

export function getSiteUrl(): URL {
  return new URL(siteConfig.url);
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, `${siteConfig.url}/`).toString();
}

function contactHandle(
  value: string,
  prefixes: RegExp,
): string {
  return value
    .trim()
    .replace(prefixes, "")
    .replace(/^@/, "")
    .replace(/\/+$/, "");
}

export function telegramUrl(username: string): string {
  const handle = contactHandle(
    username,
    /^(?:https?:\/\/)?(?:www\.)?(?:t\.me|telegram\.me)\//i,
  );
  return `https://t.me/${handle}`;
}

export function githubUrl(username: string): string {
  const handle = contactHandle(
    username,
    /^(?:https?:\/\/)?(?:www\.)?github\.com\//i,
  );
  return `https://github.com/${handle}`;
}
