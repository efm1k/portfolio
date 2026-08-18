import { Container } from "@/components/ui/container";

export default function ProjectsLoading() {
  return (
    <main id="main">
      <Container className="py-16">
        <p className="font-mono text-sm text-muted" role="status">
          Загружаю список проектов…
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="h-72 border border-border bg-elevated" />
          <div className="h-72 border border-border bg-elevated" />
        </div>
      </Container>
    </main>
  );
}
