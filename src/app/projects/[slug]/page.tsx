import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { CasePage } from "@/components/project/case-page";
import { getProject, getProjectSlugs } from "@/data/projects";
import { siteConfig } from "@/config/site";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Кейс не найден" };
  }

  const title = `${project.title} — кейс`;
  const description = project.shortTask;

  return {
    title,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} — ${siteConfig.name}`,
      description,
      url: `/projects/${project.slug}`,
      type: "article",
    },
  };
}

export default async function ProjectCasePage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main id="main">
      <Container className="py-16">
        <CasePage project={project} />
      </Container>
    </main>
  );
}
