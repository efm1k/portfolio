export const PROJECT_TYPES = [
  "web-app",
  "telegram-mini-app",
  "ai-integration",
  "commercial-site",
  "seo-catalog",
  "legacy-upgrade",
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  "web-app": "Web-приложение",
  "telegram-mini-app": "Telegram Mini App",
  "ai-integration": "AI-интеграция",
  "commercial-site": "Коммерческий сайт",
  "seo-catalog": "SEO-каталог",
  "legacy-upgrade": "Доработка legacy",
};

export type DemoStatus = "planned" | "in-progress" | "ready" | "live";

export type ProjectPresentation = "primary" | "secondary" | "study";

export type TechItem = {
  name: string;
  purpose: string;
};

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ProjectScreenshot = ProjectImage & {
  title: string;
  caption: string;
};

export type ProjectArchitecture = {
  summary: string;
  layers: string[];
};

export type Project = {
  slug: string;
  title: string;
  /** One-line product definition for cards and case headers. */
  cardLine: string;
  /** Short engineering description — not marketing copy. */
  shortTask: string;
  type: ProjectType;
  stack: string[];
  /** 3–5 tags shown on cards. Full stack lives on the case page. */
  cardStack: string[];
  role: string;
  features: string[];
  year: string;
  featured: boolean;
  /**
   * Homepage / selected-work order. Null = not in the featured flow.
   * UI must sort by this field, not by array position.
   */
  featuredOrder: number | null;
  presentation: ProjectPresentation;
  nda: boolean;
  demoStatus: DemoStatus;
  demoDir: string;
  liveUrl?: string;
  /** Local runnable demo. Shown only in development when liveUrl is absent. */
  localUrl?: string;
  /** Local admin demo. Stored for workspace use; not shown on the public case card. */
  localAdminUrl?: string;
  githubUrl?: string;
  coverImage: ProjectImage;
  /** Optional metric for the card, e.g. "309 → 3 SQL". */
  highlight?: string;
  problem: string;
  context: string;
  requirements: string[];
  architecture: ProjectArchitecture;
  implemented: string[];
  responsibility: string[];
  technologies: TechItem[];
  technicalDecisions: string[];
  challenges: string[];
  outcome: string;
  screenshots: ProjectScreenshot[];
};

export function isProjectType(value: string): value is ProjectType {
  return (PROJECT_TYPES as readonly string[]).includes(value);
}
