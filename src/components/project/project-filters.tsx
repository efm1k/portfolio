import Link from "next/link";
import { TYPE_FILTERS } from "@/data/copy";
import { cn } from "@/lib/cn";
import type { ProjectType } from "@/types/project";

type ProjectFiltersProps = {
  active: ProjectType | "all";
};

export function ProjectFilters({ active }: ProjectFiltersProps) {
  return (
    <nav aria-label="Фильтр по типу проекта">
      <ul className="flex flex-wrap gap-2">
        {TYPE_FILTERS.map((item) => {
          const href =
            item.type === "all" ? "/projects" : `/projects?type=${item.type}`;
          const current = item.type === active;

          return (
            <li key={item.type}>
              <Link
                href={href}
                scroll={false}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "inline-flex h-9 items-center border px-3 font-mono text-xs tracking-wide uppercase",
                  current
                    ? "border-accent text-accent bg-accent/10"
                    : "border-border text-muted hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
