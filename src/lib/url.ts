import { siteConfig } from "@/config/site";

export function getSiteUrl(): URL {
  return new URL(siteConfig.url);
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, `${siteConfig.url}/`).toString();
}

const TELEGRAM_PREFIX = /^(?:https?:\/\/)?(?:www\.)?(?:t\.me|telegram\.me)\//i;
const GITHUB_PREFIX = /^(?:https?:\/\/)?(?:www\.)?github\.com\//i;

function contactHandle(value: string, prefixes: RegExp): string {
  return value
    .trim()
    .replace(prefixes, "")
    .replace(/^@/, "")
    .replace(/\/+$/, "");
}

export function telegramHandle(value: string): string {
  return contactHandle(value, TELEGRAM_PREFIX);
}

export function telegramUrl(value: string): string {
  return `https://t.me/${telegramHandle(value)}`;
}

export function githubUrl(value: string): string {
  return `https://github.com/${contactHandle(value, GITHUB_PREFIX)}`;
}

export function emailAddress(value: string): string {
  return value.trim().replace(/^mailto:/i, "");
}

export function mailtoHref(value: string): string {
  return `mailto:${emailAddress(value)}`;
}

export function contactSameAs(contacts: {
  github?: string;
  telegram?: string;
}): string[] {
  const urls: string[] = [];
  const github = contacts.github?.trim();
  const telegram = contacts.telegram?.trim();

  if (github) {
    urls.push(githubUrl(github));
  }

  if (telegram) {
    urls.push(telegramUrl(telegram));
  }

  return urls;
}
