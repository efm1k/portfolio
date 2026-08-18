import { Container } from "@/components/ui/container";

export default function ProjectLoading() {
  return (
    <main id="main">
      <Container className="py-16">
        <p className="font-mono text-sm text-muted" role="status">
          Загружаю кейс…
        </p>
        <div className="mt-8 h-10 w-64 bg-elevated" />
        <div className="mt-4 h-24 max-w-3xl bg-elevated" />
      </Container>
    </main>
  );
}
