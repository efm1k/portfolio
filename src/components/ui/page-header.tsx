import { cn } from "@/lib/cn";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="max-w-3xl">
      {eyebrow ? (
        <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h1
        className={cn(
          "mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl",
          "text-balance",
        )}
      >
        {title}
      </h1>
      {description ? (
        <p className="mt-4 text-base text-muted sm:text-lg">{description}</p>
      ) : null}
    </header>
  );
}
