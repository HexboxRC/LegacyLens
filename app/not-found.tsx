import Link from "next/link";
import { Home, BookOpen } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-warm-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">📖</div>
        <h1 className="text-4xl font-bold text-warm-900 mb-3">Page Not Found</h1>
        <p className="text-xl text-warm-600 mb-8">
          This page seems to have wandered off, like a memory just out of reach.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button size="lg">
              <Home className="w-5 h-5" />
              Go Home
            </Button>
          </Link>
          <Link href="/stories">
            <Button variant="outline" size="lg">
              <BookOpen className="w-5 h-5" />
              View Stories
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
