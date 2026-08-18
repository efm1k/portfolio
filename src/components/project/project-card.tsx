import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ProjectMedia } from "@/components/project/project-media";
import { DEMO_BADGE, STUDY_BADGE } from "@/data/copy";
import { cn } from "@/lib/cn";
import type { Project } from "@/types/project";

type CardVariant = "flagship" | "medium" | "index" | "study";

type ProjectCardProps = {
  project: Project;
  variant?: CardVariant;
  priority?: boolean;
};

export function ProjectCard({
  project,
  variant = "medium",
  priority = false,
}: ProjectCardProps) {
  if (variant === "index" || variant === "study") {
    return <IndexCard project={project} variant={variant} />;
  }

  return (
    <article
      className={cn(
        "group h-full border border-border bg-elevated",
        "transition-colors hover:border-border-strong",
      )}
    >
      <Link href={`/projects/${project.slug}`} className="flex h-full flex-col">
        <ProjectMedia
          image={project.coverImage}
          priority={priority}
          sizes={
            variant === "flagship"
              ? "(max-width: 768px) 100vw, 50vw"
              : "(max-width: 768px) 100vw, 40vw"
          }
          className={
            variant === "flagship"
              ? undefined
              : "max-h-56 sm:max-h-64"
          }
        />
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="accent">{DEMO_BADGE}</Badge>
            {project.highlight ? (
              <span className="font-mono text-xs tracking-wide text-accent">
                {project.highlight}
              </span>
            ) : null}
          </div>
          <h3
            className={cn(
              "mt-3 font-semibold tracking-tight group-hover:text-accent",
              variant === "flagship" ? "text-2xl sm:text-3xl" : "text-xl",
            )}
          >
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-foreground">{project.cardLine}</p>
          <p className="mt-2 flex-1 text-sm text-muted">{project.shortTask}</p>
          <p className="mt-4 font-mono text-xs tracking-wide text-muted">
            {project.cardStack.join(" · ")}
          </p>
          <p className="mt-5 font-mono text-xs tracking-wide text-accent uppercase">
            Кейс →
          </p>
        </div>
      </Link>
    </article>
  );
}

function IndexCard({
  project,
  variant,
}: {
  project: Project;
  variant: "index" | "study";
}) {
  return (
    <article className="group border-b border-border py-5 last:border-b-0">
      <Link
        href={`/projects/${project.slug}`}
        className="grid gap-4 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:items-center"
      >
        <ProjectMedia
          image={project.coverImage}
          className="max-h-28 sm:max-h-none"
          sizes="140px"
        />
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {variant === "study" ? (
              <Badge>{STUDY_BADGE}</Badge>
            ) : (
              <Badge tone="accent">{DEMO_BADGE}</Badge>
            )}
            {project.highlight ? (
              <span className="font-mono text-xs text-accent">
                {project.highlight}
              </span>
            ) : null}
          </div>
          <h3 className="mt-2 text-lg font-semibold tracking-tight group-hover:text-accent">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-foreground">{project.cardLine}</p>
          <p className="mt-1 text-sm text-muted">{project.shortTask}</p>
          <p className="mt-2 font-mono text-xs text-muted">
            {project.cardStack.join(" · ")}
          </p>
        </div>
      </Link>
    </article>
  );
}
