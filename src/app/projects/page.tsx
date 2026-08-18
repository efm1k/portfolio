import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ProjectCard } from "@/components/project/project-card";
import {
  getFeaturedProjects,
  getProjectsByType,
  getStudyProjects,
} from "@/data/projects";
import { ProjectFilters } from "@/components/project/project-filters";
import { isProjectType, type ProjectType } from "@/types/project";

export const metadata: Metadata = {
  title: "Проекты",
  description:
    "Публичные demo-проекты: web-приложения, Telegram Mini Apps, AI-контуры, PHP, SEO-каталоги и модернизация legacy. Не клиентские работы.",
  alternates: { canonical: "/projects" },
};

type ProjectsPageProps = {
  searchParams: Promise<{ type?: string }>;
};

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const params = await searchParams;
  const requested = params.type;
  const active: ProjectType | "all" =
    requested && isProjectType(requested) ? requested : "all";

  if (active === "all") {
    const featured = getFeaturedProjects();
    const studies = getStudyProjects();

    return (
      <main id="main">
        <Container className="py-16">
          <PageHeader
            eyebrow="Проекты"
            title="Избранные и остальные публичные кейсы"
            description="Порядок задан в данных кейса. Сначала операционные системы, затем PHP/SEO, ниже — experimental studies. Это не портфолио клиентских названий."
          />
          <div className="mt-10">
            <ProjectFilters active={active} />
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {featured.slice(0, 4).map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                variant={index < 2 ? "flagship" : "medium"}
                priority={index === 0}
              />
            ))}
          </div>
          <div className="mt-12 border-t border-border">
            {featured.slice(4).map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                variant="index"
              />
            ))}
          </div>
          {studies.length > 0 ? (
            <section className="mt-16">
              <h2 className="font-mono text-xs tracking-[0.16em] text-accent uppercase">
                Experimental / creative studies
              </h2>
              <div className="mt-4 border-t border-border">
                {studies.map((project) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    variant="study"
                  />
                ))}
              </div>
            </section>
          ) : null}
        </Container>
      </main>
    );
  }

  const list = getProjectsByType(active);

  return (
    <main id="main">
      <Container className="py-16">
        <PageHeader
          eyebrow="Проекты"
          title="Публичные кейсы"
          description="Фильтр по типу. Nova и Aurelia остаются experimental studies, даже если тип совпадает с коммерческим сайтом."
        />
        <div className="mt-10">
          <ProjectFilters active={active} />
        </div>
        {list.length > 0 ? (
          <div className="mt-8 border-t border-border">
            {list.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                variant={project.presentation === "study" ? "study" : "index"}
              />
            ))}
          </div>
        ) : (
          <p className="mt-8 text-muted" role="status">
            Для выбранного типа проектов пока нет кейсов.
          </p>
        )}
      </Container>
    </main>
  );
}
