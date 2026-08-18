import Link from "next/link";
import { Container } from "@/components/ui/container";
import { buttonClassName } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main id="main">
      <Container className="py-24">
        <p className="font-mono text-xs tracking-wide text-accent uppercase">
          404
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          Страница не найдена
        </h1>
        <p className="mt-3 max-w-xl text-muted">
          Такого адреса на сайте нет. Откройте проекты или главную.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className={buttonClassName({})}>
            На главную
          </Link>
          <Link
            href="/projects"
            className={buttonClassName({ variant: "secondary" })}
          >
            Проекты
          </Link>
        </div>
      </Container>
    </main>
  );
}
