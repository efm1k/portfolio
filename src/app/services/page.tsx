import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ButtonLink } from "@/components/ui/button-link";
import { capabilities } from "@/data/capabilities";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Web applications, business automation, AI integrations, Telegram Mini Apps и модернизация PHP/legacy.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main id="main">
      <Container className="py-16">
        <PageHeader
          eyebrow="Capabilities"
          title="Инженерные контуры, не меню услуг"
          description="Это не лендинг «закажите сайт». Здесь — классы задач, которые закрываю как разработчик."
        />
        <ol className="mt-12 divide-y divide-border border border-border">
          {capabilities.map((item) => (
            <li
              key={item.index}
              className="grid gap-2 px-4 py-5 sm:grid-cols-[4rem_minmax(0,16rem)_minmax(0,1fr)] sm:items-baseline"
            >
              <span className="font-mono text-xs text-accent">{item.index}</span>
              <h2 className="text-lg font-medium text-foreground">{item.title}</h2>
              <p className="text-sm text-muted">{item.description}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/projects">Смотреть проекты</ButtonLink>
          <ButtonLink href="/about" variant="secondary">
            Опыт
          </ButtonLink>
        </div>
      </Container>
    </main>
  );
}
