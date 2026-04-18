"use client";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-3 focus-visible:outline-warm-500 focus-visible:outline-offset-3 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] select-none";

    const variants = {
      primary:
        "bg-warm-500 text-white hover:bg-warm-600 shadow-md hover:shadow-lg",
      secondary:
        "bg-sage-500 text-white hover:bg-sage-600 shadow-md hover:shadow-lg",
      ghost:
        "bg-transparent text-warm-700 hover:bg-warm-100 border-2 border-transparent hover:border-warm-200",
      danger:
        "bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-lg",
      outline:
        "bg-white text-warm-700 border-2 border-warm-300 hover:border-warm-500 hover:bg-warm-50 shadow-sm",
    };

    const sizes = {
      sm: "text-sm px-4 py-2 min-h-[40px]",
      md: "text-base px-6 py-3 min-h-[48px]",
      lg: "text-lg px-8 py-4 min-h-[56px]",
      xl: "text-xl px-10 py-5 min-h-[68px]",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
