import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LegacyLens — Preserve Your Life Story",
  description:
    "An AI-powered platform helping seniors capture, preserve, and share their life stories with the next generation.",
  keywords: ["senior", "life story", "family memories", "AI storytelling", "legacy"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-warm-50 text-warm-900 antialiased">
        {children}
      </body>
    </html>
  );
}
