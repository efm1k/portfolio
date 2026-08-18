"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ProjectError({ reset }: ErrorProps) {
  return (
    <main id="main">
      <Container className="py-16">
        <h1 className="text-2xl font-semibold tracking-tight">
          Не получилось открыть кейс
        </h1>
        <p className="mt-3 max-w-xl text-muted">
          Страница кейса не загрузилась. Можно попробовать ещё раз или
          вернуться к списку проектов.
        </p>
        <div className="mt-6">
          <Button onClick={reset}>Попробовать снова</Button>
        </div>
      </Container>
    </main>
  );
}
