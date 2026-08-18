import type { Project, ProjectType } from "@/types/project";
import { aiSalesCopilot } from "@/data/projects/ai-sales-copilot";
import { aurelia } from "@/data/projects/aurelia";
import { autoflow } from "@/data/projects/autoflow";
import { buildpro } from "@/data/projects/buildpro";
import { gastrocity } from "@/data/projects/gastrocity";
import { legacyUpgrade } from "@/data/projects/legacy-upgrade";
import { novaOne } from "@/data/projects/nova-one";
import { serviceflow } from "@/data/projects/serviceflow";
import { withoutLocalUrls } from "@/lib/demo";

export const projects: readonly Project[] = [
  serviceflow,
  aiSalesCopilot,
  legacyUpgrade,
  autoflow,
  buildpro,
  gastrocity,
  novaOne,
  aurelia,
].map(withoutLocalUrls);

const projectsBySlug = new Map(
  projects.map((project) => [project.slug, project]),
);

export function getProject(slug: string): Project | undefined {
  return projectsBySlug.get(slug);
}

export function getProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}

export function getProjectsByType(type: ProjectType): Project[] {
  return projects.filter((project) => project.type === type);
}

function byFeaturedOrder(a: Project, b: Project): number {
  return (a.featuredOrder ?? Number.POSITIVE_INFINITY) - (b.featuredOrder ?? Number.POSITIVE_INFINITY);
}

/** Selected work: featuredOrder is set. Sorted from data, not UI hardcoding. */
export function getFeaturedProjects(): Project[] {
  return projects
    .filter((project) => project.featuredOrder !== null)
    .slice()
    .sort(byFeaturedOrder);
}

export function getPrimaryProjects(): Project[] {
  return getFeaturedProjects().filter(
    (project) => project.presentation === "primary",
  );
}

export function getSecondaryProjects(): Project[] {
  return getFeaturedProjects().filter(
    (project) => project.presentation === "secondary",
  );
}

export function getStudyProjects(): Project[] {
  return projects.filter((project) => project.presentation === "study");
}
