import Link from "next/link";
import { Container } from "@/components/ui/container";
import { buttonClassName } from "@/components/ui/button";
import { getProjectSlugs } from "@/data/projects";
import { demoProjectsPhrase } from "@/lib/plural";

export default function ProjectNotFound() {
  const count = getProjectSlugs().length;

  return (
    <main id="main">
      <Container className="py-16">
        <h1 className="text-2xl font-semibold tracking-tight">
          Такого кейса нет
        </h1>
        <p className="mt-3 max-w-xl text-muted">
          На сайте {demoProjectsPhrase(count)}. Проверьте адрес или откройте
          список.
        </p>
        <Link href="/projects" className={`${buttonClassName({})} mt-6`}>
          Все проекты
        </Link>
      </Container>
    </main>
  );
}
