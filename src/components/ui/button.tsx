import { cn } from "@/lib/cn";

const variants = {
  primary:
    "bg-accent text-[#1a1408] hover:bg-accent-strong border-transparent",
  secondary:
    "bg-transparent text-foreground border-border-strong hover:border-accent hover:text-accent",
  ghost:
    "bg-transparent text-muted border-transparent hover:text-foreground",
} as const;

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
} as const;

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

type Common = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function buttonClassName({
  variant = "primary",
  size = "md",
  className,
}: Pick<Common, "variant" | "size" | "className">): string {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-sm border font-medium transition-colors",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
}

type ButtonProps = Common &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClassName({ variant, size, className })}
      {...props}
    />
  );
}
