import { type ReactNode } from "react";
import { cn } from "../../utils/cn";

interface BadgeProps {
  children: ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "outline"
    | "glass";
  className?: string;
}

export const Badge = ({
  children,
  variant = "primary",
  className,
}: BadgeProps) => {
  const variants = {
    primary: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-secondary text-secondary-foreground border-border",
    success:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    warning:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    error: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    outline: "bg-transparent text-foreground border-border",
    glass: "glass text-foreground border-white/20",
  };

  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-black border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
