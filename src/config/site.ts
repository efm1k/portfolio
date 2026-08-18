import { resolvePublicSiteUrl } from "@/lib/site-url";

export const siteConfig = {
  name: "Jored",
  role: "Full-stack разработчик",
  headline: "Разрабатываю веб-продукты и автоматизирую бизнес-процессы",
  summary:
    "Web-приложения, внутренние системы, AI-интеграции и Telegram Mini Apps. PHP и TypeScript — включая модернизацию legacy-контуров.",
  locale: "ru_RU",
  language: "ru",
  /**
   * Public origin. Development falls back to localhost.
   * Production builds require NEXT_PUBLIC_SITE_URL (absolute http(s) origin).
   */
  get url() {
    return resolvePublicSiteUrl(
      process.env.NEXT_PUBLIC_SITE_URL,
      process.env.NODE_ENV,
    );
  },
  /**
   * Empty strings hide the corresponding public links.
   * Do not invent contact methods.
   */
  contacts: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
    telegram: process.env.NEXT_PUBLIC_CONTACT_TELEGRAM ?? "",
    github: process.env.NEXT_PUBLIC_CONTACT_GITHUB ?? "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
