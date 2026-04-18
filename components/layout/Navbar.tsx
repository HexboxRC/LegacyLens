"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Camera, Home, Users, Mic } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/capture", label: "Record", icon: Mic },
  { href: "/photos", label: "Photos", icon: Camera },
  { href: "/stories", label: "Stories", icon: BookOpen },
  { href: "/family", label: "Family", icon: Users },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-warm-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-warm-700 hover:text-warm-900 transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-warm-500 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-warm-900 hidden sm:block">
              LegacyLens
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-base font-medium transition-all",
                    active
                      ? "bg-warm-100 text-warm-800"
                      : "text-warm-600 hover:bg-warm-50 hover:text-warm-800"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Mobile nav */}
          <div className="flex md:hidden items-center gap-1">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-xs font-medium transition-all min-w-[48px]",
                    active
                      ? "text-warm-700 bg-warm-100"
                      : "text-warm-500 hover:text-warm-700"
                  )}
                  aria-label={label}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px]">{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
