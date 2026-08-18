import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button-link";
import { buttonClassName } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { siteConfig } from "@/config/site";
import { emailAddress, githubUrl, mailtoHref, telegramHandle, telegramUrl } from "@/lib/url";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Контакты разработчика. Публичные каналы показываются только если заданы.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const { email, telegram, github } = siteConfig.contacts;
  const hasLinks = Boolean(email || telegram || github);
  const telegramHref = telegram ? telegramUrl(telegram) : "";
  const githubHref = github ? githubUrl(github) : "";

  return (
    <main id="main">
      <Container className="py-16">
        <PageHeader
          eyebrow="Контакты"
          title={hasLinks ? "Напишите по задаче" : "Публичные контакты пока не открыты"}
          description={
            hasLinks
              ? "Выберите удобный способ связи. Кратко: что нужно сделать, какой контур уже есть, есть ли NDA."
              : "Каналы связи появятся вместе с публичной публикацией. Пока можно смотреть проекты и описание опыта."
          }
        />

        {hasLinks ? (
          <ul className="mt-12 max-w-xl divide-y divide-border border border-border">
            {email ? (
              <li className="flex flex-col gap-4 bg-elevated px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-mono text-xs tracking-wide text-muted uppercase">
                    Email
                  </p>
                  <p className="mt-1 text-foreground">{emailAddress(email)}</p>
                </div>
                <a href={mailtoHref(email)} className={buttonClassName({ size: "sm" })}>
                  Написать
                </a>
              </li>
            ) : null}
            {telegram ? (
              <li className="flex flex-col gap-4 bg-elevated px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-mono text-xs tracking-wide text-muted uppercase">
                    Telegram
                  </p>
                  <p className="mt-1 text-foreground">
                    @{telegramHandle(telegram)}
                  </p>
                </div>
                <ButtonLink href={telegramHref} external size="sm">
                  Открыть
                </ButtonLink>
              </li>
            ) : null}
            {github ? (
              <li className="flex flex-col gap-4 bg-elevated px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-mono text-xs tracking-wide text-muted uppercase">
                    GitHub
                  </p>
                  <p className="mt-1 break-all text-foreground">{githubHref}</p>
                </div>
                <ButtonLink href={githubHref} external variant="secondary" size="sm">
                  Открыть
                </ButtonLink>
              </li>
            ) : null}
          </ul>
        ) : (
          <p className="mt-10 max-w-xl text-sm text-muted">
            Публичные каналы появятся вместе с публикацией сайта. Пока можно
            смотреть проекты и описание опыта.
          </p>
        )}
      </Container>
    </main>
  );
}
