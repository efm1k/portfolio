"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function RootError({ reset }: ErrorProps) {
  return (
    <main id="main">
      <Container className="py-24">
        <h1 className="text-2xl font-semibold tracking-tight">
          Что-то пошло не так
        </h1>
        <p className="mt-3 max-w-xl text-muted">
          Страница не загрузилась. Попробуйте обновить или вернуться позже.
        </p>
        <div className="mt-6">
          <Button onClick={reset}>Обновить</Button>
        </div>
      </Container>
    </main>
  );
}
