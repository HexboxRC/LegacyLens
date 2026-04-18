import { cn } from "@/lib/utils";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}

export default function PageWrapper({ children, className, narrow = false }: PageWrapperProps) {
  return (
    <main
      className={cn(
        "min-h-screen px-4 sm:px-6 py-8 sm:py-12 mx-auto",
        narrow ? "max-w-3xl" : "max-w-6xl",
        className
      )}
    >
      {children}
    </main>
  );
}
