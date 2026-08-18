import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Tag } from "@/components/ui/tag";
import {
  CASE_SECTIONS,
  DEMO_BADGE,
  DEMO_DISCLAIMER,
  STUDY_BADGE,
  STUDY_NOTICE,
} from "@/data/copy";
import { CaseSection } from "@/components/project/case-section";
import { liveDemoCtaLabel, resolveDemo } from "@/lib/demo";
import type { Project } from "@/types/project";

type CasePageProps = {
  project: Project;
};

export function CasePage({ project }: CasePageProps) {
  const demo = resolveDemo(project);
  const githubAvailable = Boolean(project.githubUrl);
  const isStudy = project.presentation === "study";

  const sections = CASE_SECTIONS.filter((section) => {
    if (section.id === "demo") {
      return demo.mode !== "unavailable";
    }
    if (section.id === "source") {
      return githubAvailable;
    }
    return true;
  }).map((section) =>
    section.id === "demo" && demo.mode === "local"
      ? { ...section, label: "Локальное демо" }
      : section,
  );

  return (
    <article>
      <header className="border-b border-border pb-10">
        <p className="font-mono text-xs text-muted">
          <Link href="/projects" className="hover:text-accent">
            Проекты
          </Link>
          <span aria-hidden="true"> / </span>
          <span>{project.title}</span>
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {isStudy ? (
            <Badge>{STUDY_BADGE}</Badge>
          ) : (
            <Badge tone="accent">{DEMO_BADGE}</Badge>
          )}
          {project.highlight ? (
            <Badge tone="warning">{project.highlight}</Badge>
          ) : null}
        </div>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-foreground">{project.cardLine}</p>
        <p className="mt-3 max-w-3xl text-muted">{project.shortTask}</p>
        <p className="mt-3 max-w-3xl font-mono text-xs tracking-wide text-muted">
          {project.cardStack.join(" · ")}
        </p>
        <p className="mt-4 max-w-3xl text-sm text-muted">
          {isStudy ? STUDY_NOTICE : DEMO_DISCLAIMER}
        </p>
      </header>

      <div className="grid gap-12 pt-10 lg:grid-cols-[14rem_minmax(0,1fr)]">
        <nav
          aria-label="Содержание кейса"
          className="lg:sticky lg:top-24 lg:self-start"
        >
          <p className="font-mono text-xs tracking-wide text-muted uppercase">
            Содержание
          </p>
          <ol className="mt-3 space-y-2 text-sm">
            {sections.map((section, index) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="text-muted hover:text-accent">
                  {String(index + 1).padStart(2, "0")} {section.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="space-y-12">
          <CaseSection id="problem" title="01 Что это / задача">
            <p>{project.problem}</p>
            <p className="mt-4">{project.context}</p>
          </CaseSection>

          <CaseSection id="implemented" title="02 Что реализовано">
            <ul className="list-disc space-y-2 pl-5">
              {project.implemented.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CaseSection>

          <CaseSection id="architecture" title="03 Architecture">
            <p>{project.architecture.summary}</p>
            <ol className="mt-4 list-decimal space-y-2 pl-5">
              {project.architecture.layers.map((layer) => (
                <li key={layer}>{layer}</li>
              ))}
            </ol>
          </CaseSection>

          <CaseSection id="decisions" title="04 Technical decisions">
            <ul className="list-disc space-y-2 pl-5">
              {project.technicalDecisions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CaseSection>

          <CaseSection id="screenshots" title="05 Скриншоты">
            <div className="grid gap-6">
              {project.screenshots.map((shot, index) => {
                const portrait = shot.height / shot.width > 1.15;
                return (
                  <figure key={shot.src} className="border border-border bg-elevated">
                    <div
                      className={
                        portrait
                          ? "mx-auto max-w-sm bg-background p-3 sm:p-4"
                          : "bg-background"
                      }
                    >
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        width={shot.width}
                        height={shot.height}
                        loading={index === 0 ? "eager" : "lazy"}
                        sizes={
                          portrait
                            ? "(max-width: 640px) 90vw, 24rem"
                            : "(max-width: 768px) 100vw, 800px"
                        }
                        className="h-auto w-full"
                      />
                    </div>
                    <figcaption className="border-t border-border px-4 py-3">
                      <p className="font-medium text-foreground">{shot.title}</p>
                      <p className="mt-1 text-sm text-muted">{shot.caption}</p>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </CaseSection>

          <CaseSection id="technologies" title="06 Стек">
            <dl className="divide-y divide-border border border-border">
              {project.technologies.map((tech) => (
                <div
                  key={tech.name}
                  className="grid gap-2 px-4 py-3 sm:grid-cols-[12rem_minmax(0,1fr)]"
                >
                  <dt className="font-mono text-sm text-foreground">
                    {tech.name}
                  </dt>
                  <dd>{tech.purpose}</dd>
                </div>
              ))}
            </dl>
          </CaseSection>

          {demo.mode === "live" ? (
            <CaseSection id="demo" title="07 Live Demo">
              <div className="border border-border bg-elevated p-5">
                <Badge tone="accent">Live demo</Badge>
                <p className="mt-3 text-sm">
                  Публичное развёрнутое приложение.
                  {isStudy
                    ? " Креативное исследование интерфейса."
                    : " Данные синтетические."}
                </p>
                <div className="mt-4">
                  <ButtonLink href={demo.url} external>
                    {liveDemoCtaLabel(project.slug)}
                  </ButtonLink>
                </div>
              </div>
            </CaseSection>
          ) : null}

          {demo.mode === "local" ? (
            <CaseSection id="demo" title="07 Локальное демо">
              <div className="border border-dashed border-accent/50 bg-accent/5 p-5">
                <Badge tone="warning">Local demo</Badge>
                <p className="mt-3 text-sm">
                  Это локальный адрес на этой машине, не публичный Live Demo.
                </p>
                <div className="mt-4">
                  <ButtonLink href={demo.url} external variant="secondary">
                    Открыть локальное демо →
                  </ButtonLink>
                </div>
              </div>
            </CaseSection>
          ) : null}

          {githubAvailable && project.githubUrl ? (
            <CaseSection id="source" title="07 GitHub">
              <ButtonLink href={project.githubUrl} external variant="secondary">
                Репозиторий на GitHub
              </ButtonLink>
            </CaseSection>
          ) : null}

          <CaseSection id="requirements" title="Требования">
            <ul className="list-disc space-y-2 pl-5">
              {project.requirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CaseSection>

          <p className="border-t border-border pt-8 text-sm">
            {isStudy ? STUDY_NOTICE : DEMO_DISCLAIMER}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
