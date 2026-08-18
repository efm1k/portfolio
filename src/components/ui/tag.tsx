import { cn } from "@/lib/cn";

type TagProps = {
  children: React.ReactNode;
  className?: string;
};

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-border bg-background px-2 py-0.5 font-mono text-xs text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
