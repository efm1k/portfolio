import { cn } from "@/lib/cn";

type CalloutProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export function Callout({ title, children, className }: CalloutProps) {
  return (
    <aside
      className={cn(
        "border-l-2 border-accent bg-elevated px-4 py-3 text-sm text-muted",
        className,
      )}
    >
      {title ? (
        <p className="font-mono text-xs tracking-wide text-accent uppercase">
          {title}
        </p>
      ) : null}
      <div className={title ? "mt-2" : undefined}>{children}</div>
    </aside>
  );
}
