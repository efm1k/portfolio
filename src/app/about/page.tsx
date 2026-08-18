import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Callout } from "@/components/ui/callout";
import { siteConfig } from "@/config/site";
import { commercialExperience } from "@/data/capabilities";
import { NDA_NOTICE } from "@/data/copy";

export const metadata: Metadata = {
  title: "Опыт",
  description:
    "Full-stack разработка web-приложений, внутренних систем, AI-интеграций и Telegram Mini Apps. Коммерческий опыт в WordPress и Bitrix ограничен NDA.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main id="main">
      <Container className="py-16">
        <PageHeader
          eyebrow="Опыт"
          title={`${siteConfig.name} — ${siteConfig.role}`}
          description={siteConfig.summary}
        />

        <div className="mt-12 max-w-3xl space-y-12 text-muted">
          <section id="about" className="scroll-mt-24">
            <h2 className="font-mono text-xs tracking-[0.16em] text-accent uppercase">
              Какие задачи решаю
            </h2>
            <div className="mt-3 space-y-4">
              <p>
                Собираю web-приложения и внутренние контуры: заявки, роли, статусы,
                интеграции. PHP и TypeScript — в зависимости от того, где живёт
                система. Отдельно — Telegram Mini Apps и AI внутри процесса, а не
                чат на главной.
              </p>
              <p>
                Специализация: операционные системы, автоматизация, модернизация
                legacy PHP. Nova и Aurelia — дополнительная frontend-компетенция,
                не ядро профиля.
              </p>
            </div>
          </section>

          <section id="experience" className="scroll-mt-24">
            <h2 className="font-mono text-xs tracking-[0.16em] text-accent uppercase">
              Коммерческий опыт
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              {commercialExperience.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm">
              WordPress и Bitrix не вынесены в публичный кейс: это коммерческий
              опыт, детали ограничены NDA.
            </p>
          </section>

          <Callout title="Commercial experience / NDA">{NDA_NOTICE}</Callout>

          <section>
            <h2 className="font-mono text-xs tracking-[0.16em] text-accent uppercase">
              Как подхожу к проектам
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Сначала фиксирую, что нельзя ломать: URL, формы, роли, данные.</li>
              <li>Контракт API и статусы живут на сервере, не только в интерфейсе.</li>
              <li>Legacy не переписываю «с нуля» без причины.</li>
              <li>LLM не отправляет клиенту, пока это не задано отдельно.</li>
            </ul>
          </section>

          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/projects">Смотреть проекты</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Контакты
            </ButtonLink>
          </div>
        </div>
      </Container>
    </main>
  );
}
