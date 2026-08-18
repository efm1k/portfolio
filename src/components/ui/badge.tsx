import { cn } from "@/lib/cn";

type BadgeProps = {
  children: React.ReactNode;
  tone?: "neutral" | "accent" | "warning";
  className?: string;
};

const tones: Record<NonNullable<BadgeProps["tone"]>, string> = {
  neutral:
    "border-border text-muted bg-elevated",
  accent:
    "border-accent/30 text-accent bg-accent/10",
  warning:
    "border-accent/40 text-accent-strong bg-transparent",
};

export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-2 py-0.5 font-mono text-[0.7rem] tracking-wide uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
