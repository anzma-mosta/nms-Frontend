import { type ReactNode } from "react";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card = ({ children, className, hover = true }: CardProps) => {
  return (
    <motion.div
      whileHover={hover ? { y: -5, shadow: "var(--shadow-xl)" } : {}}
      className={cn(
        "bg-card border border-border/50 rounded-3xl shadow-sm transition-all duration-300",
        hover && "hover:shadow-xl hover:border-primary/20",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const CardHeader = ({ children, className }: CardProps) => {
  return <div className={cn("p-8 pb-0", className)}>{children}</div>;
};

export const CardContent = ({ children, className }: CardProps) => {
  return <div className={cn("p-8", className)}>{children}</div>;
};

export const CardFooter = ({ children, className }: CardProps) => {
  return <div className={cn("p-8 pt-0", className)}>{children}</div>;
};
