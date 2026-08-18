import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/project/project-card";
import { siteConfig } from "@/config/site";
import { capabilities, commercialExperience } from "@/data/capabilities";
import {
  getPrimaryProjects,
  getSecondaryProjects,
  getStudyProjects,
} from "@/data/projects";
import { NDA_NOTICE } from "@/data/copy";

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.name} — ${siteConfig.role}`,
  },
  description: siteConfig.summary,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const primary = getPrimaryProjects();
  const flagship = primary.slice(0, 2);
  const medium = primary.slice(2, 4);
  const secondary = getSecondaryProjects();
  const studies = getStudyProjects();
  const { email, telegram, github } = siteConfig.contacts;
  const hasContacts = Boolean(email || telegram || github);

  return (
    <main id="main">
      <section className="border-b border-border">
        <Container className="py-16 sm:py-24">
          <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
            {siteConfig.role}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {siteConfig.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">{siteConfig.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="#work">Смотреть проекты</ButtonLink>
            <ButtonLink href="/about" variant="secondary">
              Опыт
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section id="work" className="scroll-mt-20 border-b border-border">
        <Container className="py-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Избранные проекты"
              title="Системы, которые можно разобрать на собеседовании"
              description="Самостоятельные demo-проекты на синтетических данных. Не клиентские названия и не NDA-кейсы."
            />
            <ButtonLink href="/projects" variant="ghost" size="sm">
              Все кейсы
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {flagship.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                variant="flagship"
                priority={index === 0}
              />
            ))}
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {medium.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                variant="medium"
              />
            ))}
          </div>
        </Container>
      </section>

      <section id="cases" className="scroll-mt-20 border-b border-border">
        <Container className="py-16">
          <SectionHeading
            eyebrow="Selected technical cases"
            title="Ещё два контура того же класса"
            description="Коммерческий PHP-сайт и SEO-платформа. Ниже по приоритету, чем операционные системы выше."
          />
          <div className="mt-8 border-t border-border">
            {secondary.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                variant="index"
              />
            ))}
          </div>
        </Container>
      </section>

      {studies.length > 0 ? (
        <section id="studies" className="scroll-mt-20 border-b border-border">
          <Container className="py-16">
            <SectionHeading
              eyebrow="Experimental / creative studies"
              title="Дополнительная frontend-компетенция"
              description="Не ядро профиля и не READY live. Nova и Aurelia — исследования интерфейса, пока без production-претензии."
            />
            <div className="mt-8 border-t border-border">
              {studies.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  variant="study"
                />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section id="experience" className="scroll-mt-20 border-b border-border">
        <Container className="py-16">
          <SectionHeading
            eyebrow="Коммерческий опыт"
            title="Класс задач под NDA"
            description="Без названий клиентов, скриншотов прод-админок и выдуманных метрик."
          />
          <ul className="mt-8 divide-y divide-border border border-border">
            {commercialExperience.map((item) => (
              <li key={item} className="px-4 py-4 text-muted">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-2xl text-sm text-muted">{NDA_NOTICE}</p>
          <p className="mt-4 text-sm text-muted">
            WordPress и Bitrix — коммерческий опыт. Публичного demo-кейса по ним нет,
            и я его не имитирую.
          </p>
        </Container>
      </section>

      <section id="capabilities" className="scroll-mt-20 border-b border-border">
        <Container className="py-16">
          <SectionHeading
            eyebrow="Capabilities"
            title="Какие инженерные задачи закрываю"
            description="Не меню услуг и не «сайт под ключ»."
          />
          <ol className="mt-8 divide-y divide-border border border-border">
            {capabilities.map((item) => (
              <li
                key={item.index}
                className="grid gap-2 px-4 py-5 sm:grid-cols-[4rem_minmax(0,14rem)_minmax(0,1fr)] sm:items-baseline"
              >
                <span className="font-mono text-xs text-accent">{item.index}</span>
                <h3 className="font-medium text-foreground">{item.title}</h3>
                <p className="text-sm text-muted">{item.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section id="about" className="scroll-mt-20 border-b border-border">
        <Container className="py-16">
          <SectionHeading
            eyebrow="Обо мне"
            title="Сначала контракт системы, потом интерфейс"
            description="Фиксирую URL, роли и данные, которые нельзя ломать. Legacy не переписываю без причины. LLM не получает право отправки клиенту, пока это не задано отдельно."
          />
          <div className="mt-8">
            <ButtonLink href="/about" variant="secondary">
              Опыт и подход
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section id="contact" className="scroll-mt-20">
        <Container className="py-16">
          <SectionHeading
            eyebrow="Контакты"
            title={hasContacts ? "Связаться" : "Публичные контакты пока не открыты"}
            description={
              hasContacts
                ? "Коротко: контур, ограничения, есть ли NDA."
                : "Пока смотрите проекты и описание опыта. Контакты появятся вместе с публичной публикацией."
            }
          />
          <div className="mt-8">
            {hasContacts ? (
              <ButtonLink href="/contact">Контакты</ButtonLink>
            ) : (
              <Link
                href="/projects"
                className="font-mono text-xs tracking-wide text-accent uppercase hover:text-accent-strong"
              >
                К проектам →
              </Link>
            )}
          </div>
        </Container>
      </section>
    </main>
  );
}
