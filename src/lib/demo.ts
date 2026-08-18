import type { Project } from "@/types/project";

export type DemoPresentation =
  | { mode: "live"; url: string }
  | { mode: "local"; url: string }
  | { mode: "unavailable" };

export function isDevelopmentEnv(): boolean {
  return process.env.NODE_ENV === "development";
}

export function liveDemoCtaLabel(slug: string): string {
  return slug === "nova-one" ? "Открыть интерактивное демо" : "Открыть демо";
}

/**
 * Public liveUrl always wins. localUrl is development-only and must never
 * appear in production UI.
 */
export function resolveDemo(
  project: Pick<Project, "liveUrl" | "localUrl">,
): DemoPresentation {
  if (project.liveUrl) {
    return { mode: "live", url: project.liveUrl };
  }

  if (isDevelopmentEnv() && project.localUrl) {
    return { mode: "local", url: project.localUrl };
  }

  return { mode: "unavailable" };
}

export function withoutLocalUrls(project: Project): Project {
  if (isDevelopmentEnv()) {
    return project;
  }

  if (!project.localUrl && !project.localAdminUrl) {
    return project;
  }

  const publicFields = { ...project };
  delete publicFields.localUrl;
  delete publicFields.localAdminUrl;
  return publicFields;
}
