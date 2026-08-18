import Link from "next/link";
import { siteConfig } from "@/config/site";
import { navItems } from "@/data/nav";
import { githubUrl, telegramUrl } from "@/lib/url";
import { Container } from "@/components/ui/container";

export function Footer() {
  const { email, telegram, github } = siteConfig.contacts;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border">
      <Container className="flex flex-col gap-8 py-10 sm:flex-row sm:justify-between">
        <div>
          <p className="font-mono text-sm tracking-[0.14em] uppercase">
            {siteConfig.name}
          </p>
          <p className="mt-2 max-w-sm text-sm text-muted">
            {siteConfig.role}. Публичные кейсы — самостоятельные demo-проекты,
            не клиентские работы.
          </p>
        </div>
        <div className="flex flex-wrap gap-12">
          <div>
            <p className="font-mono text-xs tracking-wide text-muted uppercase">
              Разделы
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {email || telegram || github ? (
            <div>
              <p className="font-mono text-xs tracking-wide text-muted uppercase">
                Связь
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {email ? (
                  <li>
                    <a href={`mailto:${email}`} className="text-muted hover:text-accent">
                      {email}
                    </a>
                  </li>
                ) : null}
                {telegram ? (
                  <li>
                    <a
                      href={telegramUrl(telegram)}
                      className="text-muted hover:text-accent"
                    >
                      Telegram
                    </a>
                  </li>
                ) : null}
                {github ? (
                  <li>
                    <a
                      href={githubUrl(github)}
                      className="text-muted hover:text-accent"
                    >
                      GitHub
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>
          ) : null}
        </div>
      </Container>
      <Container className="border-t border-border py-4">
        <p className="font-mono text-xs text-muted">
          © {year} {siteConfig.name}. Demo-проекты помечены отдельно от
          коммерческого опыта под NDA.
        </p>
      </Container>
    </footer>
  );
}
