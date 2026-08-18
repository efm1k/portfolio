import { siteConfig } from "@/config/site";

export function getSiteUrl(): URL {
  return new URL(siteConfig.url);
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, `${siteConfig.url}/`).toString();
}

export function telegramUrl(username: string): string {
  const handle = username.replace(/^@/, "");
  return `https://t.me/${handle}`;
}

export function githubUrl(username: string): string {
  const handle = username.replace(/^@/, "");
  return `https://github.com/${handle}`;
}
