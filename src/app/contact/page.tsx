import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { siteConfig } from "@/config/site";
import { githubUrl, telegramUrl } from "@/lib/url";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Контакты разработчика. Публичные каналы показываются только если заданы.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const { email, telegram, github } = siteConfig.contacts;
  const hasLinks = Boolean(email || telegram || github);

  return (
    <main id="main">
      <Container className="py-16">
        <PageHeader
          eyebrow="Контакты"
          title={hasLinks ? "Напишите по задаче" : "Публичные контакты пока не открыты"}
          description={
            hasLinks
              ? "Кратко: что нужно сделать, какой контур уже есть, есть ли NDA. Форма не отправляет данные на сторонний сервер."
              : "Каналы связи появятся вместе с публичной публикацией. Пока можно смотреть проекты и описание опыта."
          }
        />

        {hasLinks ? (
          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
            <ContactForm />
            <aside>
              <h2 className="font-mono text-xs tracking-wide text-muted uppercase">
                Прямые ссылки
              </h2>
              <ul className="mt-4 space-y-3 text-sm">
                {email ? (
                  <li>
                    <a href={`mailto:${email}`} className="text-accent hover:text-accent-strong">
                      {email}
                    </a>
                  </li>
                ) : null}
                {telegram ? (
                  <li>
                    <a
                      href={telegramUrl(telegram)}
                      className="text-accent hover:text-accent-strong"
                    >
                      Telegram @{telegram.replace(/^@/, "")}
                    </a>
                  </li>
                ) : null}
                {github ? (
                  <li>
                    <a
                      href={githubUrl(github)}
                      className="text-accent hover:text-accent-strong"
                    >
                      GitHub
                    </a>
                  </li>
                ) : null}
              </ul>
            </aside>
          </div>
        ) : (
          <p className="mt-10 max-w-xl text-sm text-muted">
            Форма скрыта, пока нет публичного канала. Это намеренно: сайт не
            выдумывает email и не показывает инструкции разработчика.
          </p>
        )}
      </Container>
    </main>
  );
}
