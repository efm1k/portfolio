import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { stackGroups } from "@/data/stack";

export const metadata: Metadata = {
  title: "Технологический стек",
  description:
    "PHP, WordPress, Bitrix, TypeScript, React, Next.js, Telegram Mini Apps, SQL, Python, n8n и LLM-интеграции — с тем, для чего каждый слой используется.",
  alternates: { canonical: "/stack" },
};

export default function StackPage() {
  return (
    <main id="main">
      <Container className="py-16">
        <PageHeader
          eyebrow="Стек"
          title="Чем собираю web-приложения и интеграции"
          description="Не облако логотипов. Для каждого слоя — зачем он нужен. WordPress и Bitrix указаны как коммерческий опыт, не как публичный кейс."
        />
        <div className="mt-12 space-y-12">
          {stackGroups.map((group) => (
            <section key={group.id} aria-labelledby={group.id}>
              <h2
                id={group.id}
                className="font-mono text-xs tracking-[0.16em] text-accent uppercase"
              >
                {group.title}
              </h2>
              <ul className="mt-4 divide-y divide-border border border-border">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="grid gap-2 px-4 py-4 sm:grid-cols-[14rem_minmax(0,1fr)]"
                  >
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-sm text-muted sm:text-base">{item.usage}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Container>
    </main>
  );
}
