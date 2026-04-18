import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "warm" | "sage" | "blue" | "rose" | "default";
  className?: string;
}

export default function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    warm: "bg-warm-100 text-warm-800 border-warm-200",
    sage: "bg-sage-100 text-sage-800 border-sage-200",
    blue: "bg-blue-100 text-blue-800 border-blue-200",
    rose: "bg-rose-100 text-rose-800 border-rose-200",
    default: "bg-warm-50 text-warm-700 border-warm-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
