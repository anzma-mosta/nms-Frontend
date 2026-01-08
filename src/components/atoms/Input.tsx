import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <div className="space-y-2 w-full group">
        {label && (
          <label className="text-sm font-bold text-foreground/80 group-focus-within:text-primary transition-colors">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full bg-secondary/30 border-2 border-transparent rounded-2xl px-4 py-3.5 text-sm outline-none transition-all placeholder:text-muted-foreground focus:bg-background focus:border-primary focus:shadow-lg focus:shadow-primary/5",
              icon && "pl-12",
              error &&
                "border-rose-500 focus:border-rose-500 focus:shadow-rose-500/5",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-rose-500 text-xs font-medium px-2">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
