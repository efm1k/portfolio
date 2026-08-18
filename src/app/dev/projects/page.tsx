import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata: Metadata = {
  title: "Local workspace",
  description: "Development-only links to local portfolio apps.",
  robots: { index: false, follow: false },
};

const projects = [
  {
    name: "Portfolio Site",
    description: "Публичный сайт портфолио.",
    href: "http://localhost:3000",
    extra: "http://localhost:3000/dev/projects",
  },
  {
    name: "AutoFlow",
    description: "Telegram Mini App demo. Нужен PostgreSQL :5434.",
    href: "http://localhost:3001/demo",
  },
  {
    name: "ServiceFlow",
    description: "B2B заявки. Нужен PostgreSQL :5435.",
    href: "http://localhost:3002/demo",
  },
  {
    name: "AI Sales Copilot",
    description: "Frontend + FastAPI. PostgreSQL :5436, API :8003.",
    href: "http://localhost:3003/demo",
    extra: "http://localhost:8003/api/health",
  },
  {
    name: "BuildPro",
    description: "Laravel + nginx. Нужен Docker, порт 3004.",
    href: "http://localhost:3004",
    extra: "http://localhost:3004/admin/demo",
  },
  {
    name: "Nova One",
    description: "Next.js / R3F product site. Без отдельной БД.",
    href: "http://localhost:3010",
  },
  {
    name: "Aurelia",
    description: "Editorial architecture study. CSS 3D / GSAP, порт 3011. Needs polish.",
    href: "http://localhost:3011",
  },
  {
    name: "GastroCity",
    description: "SEO-каталог ресторанов. PostgreSQL :5438, порт 3012.",
    href: "http://localhost:3012",
  },
];

export default function DevProjectsPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return (
    <main id="main">
      <Container className="py-16">
        <PageHeader
          eyebrow="Development"
          title="Local portfolio workspace"
          description="Локальные адреса demo-приложений, если они запущены на этой машине. Страница доступна только в development и не попадает в sitemap."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.name}
              className="flex h-full flex-col border border-border bg-elevated p-5"
            >
              <h2 className="text-xl font-semibold tracking-tight">
                {project.name}
              </h2>
              <p className="mt-2 flex-1 text-sm text-muted">
                {project.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={project.href} external size="sm">
                  Открыть
                </ButtonLink>
                {project.extra ? (
                  <ButtonLink
                    href={project.extra}
                    external
                    variant="secondary"
                    size="sm"
                  >
                    Дополнительно
                  </ButtonLink>
                ) : null}
              </div>
              <p className="mt-4 font-mono text-xs text-muted break-all">
                {project.href}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </main>
  );
}
