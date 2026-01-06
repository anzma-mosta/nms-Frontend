import { type ReactNode } from "react";
import { cn } from "../../utils/cn";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={cn(
        "bg-card border rounded-2xl shadow-sm overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className }: CardProps) => {
  return <div className={cn("p-6 pb-0", className)}>{children}</div>;
};

export const CardContent = ({ children, className }: CardProps) => {
  return <div className={cn("p-6", className)}>{children}</div>;
};

export const CardFooter = ({ children, className }: CardProps) => {
  return <div className={cn("p-6 pt-0", className)}>{children}</div>;
};
