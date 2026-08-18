import { cn } from "@/lib/cn";

type CaseSectionProps = {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function CaseSection({
  id,
  title,
  children,
  className,
}: CaseSectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-24", className)}>
      <h2 className="font-mono text-xs tracking-[0.16em] text-accent uppercase">
        {title}
      </h2>
      <div className="mt-3 text-muted">{children}</div>
    </section>
  );
}
