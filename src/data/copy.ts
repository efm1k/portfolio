import type { ProjectType } from "@/types/project";

export const NDA_BADGE = "Commercial experience / NDA";

export const NDA_NOTICE =
  "Название компании, исходный код и внутренние данные коммерческих проектов не публикуются. Публично можно показать только класс задачи — на самостоятельных demo-проектах с синтетическими данными.";

export const DEMO_BADGE = "Demo-проект";

export const DEMO_DISCLAIMER =
  "Это самостоятельный demo-проект. Он не является работой реального клиента и не использует клиентские данные.";

export const STUDY_BADGE = "Experimental";

export const STUDY_NOTICE =
  "Креативное исследование интерфейса. Это не flagship-кейс и не публичный production-релиз.";

export const CASE_SECTIONS = [
  { id: "problem", label: "Задача" },
  { id: "implemented", label: "Что реализовано" },
  { id: "architecture", label: "Архитектура" },
  { id: "decisions", label: "Технические решения" },
  { id: "screenshots", label: "Скриншоты" },
  { id: "technologies", label: "Стек" },
  { id: "demo", label: "Live Demo" },
  { id: "source", label: "GitHub" },
] as const;

export const TYPE_FILTERS: { type: ProjectType | "all"; label: string }[] = [
  { type: "all", label: "Все" },
  { type: "web-app", label: "Web-приложения" },
  { type: "telegram-mini-app", label: "Telegram Mini Apps" },
  { type: "ai-integration", label: "AI" },
  { type: "commercial-site", label: "Сайты" },
  { type: "seo-catalog", label: "Каталоги" },
  { type: "legacy-upgrade", label: "Legacy" },
];
