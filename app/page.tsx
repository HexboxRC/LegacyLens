import Link from "next/link";
import { BookOpen, Mic, Camera, Users, Heart, Star, ArrowRight, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import { MOCK_STORIES } from "@/lib/mock-data";
import { truncate } from "@/lib/utils";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-warm-50">
      {/* ── Header ── */}
      <header className="bg-white/80 backdrop-blur border-b border-warm-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-warm-500 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-warm-900">LegacyLens</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-base text-warm-600">
            <Link href="#how-it-works" className="hover:text-warm-900 transition-colors">How it works</Link>
            <Link href="#stories" className="hover:text-warm-900 transition-colors">Stories</Link>
            <Link href="/family" className="hover:text-warm-900 transition-colors">Family Portal</Link>
          </nav>
          <Link href="/dashboard">
            <Button size="md">Get Started</Button>
          </Link>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-4 sm:px-6 pt-16 sm:pt-24 pb-20 sm:pb-32">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-warm-100 opacity-60" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-sage-100 opacity-40" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warm-100 text-warm-700 text-sm font-medium mb-6">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            Built for GenLink Hacks — Intergenerational Connection
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-warm-900 leading-tight mb-6 text-balance">
            Your Life is a{" "}
            <span className="text-warm-500 italic">Story</span>{" "}
            Worth Telling
          </h1>

          <p className="text-xl sm:text-2xl text-warm-700 leading-relaxed mb-10 max-w-2xl mx-auto text-balance">
            LegacyLens helps seniors capture their memories, polish their stories with AI, and share
            them with the next generation — so nothing is ever lost.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="xl" className="w-full sm:w-auto shadow-lg">
                <Mic className="w-5 h-5" />
                Start Your Story
              </Button>
            </Link>
            <Link href="/family">
              <Button variant="outline" size="xl" className="w-full sm:w-auto">
                <Users className="w-5 h-5" />
                View Family Memories
              </Button>
            </Link>
          </div>

          {/* Scroll hint */}
          <div className="mt-16 flex flex-col items-center gap-2 text-warm-400 animate-bounce">
            <span className="text-sm">Discover how it works</span>
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      </section>

      {/* ── Feature highlights ── */}
      <section id="how-it-works" className="bg-white py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-warm-900 mb-4">
              Simple. Gentle. Powerful.
            </h2>
            <p className="text-xl text-warm-600 max-w-2xl mx-auto">
              LegacyLens is designed so anyone can use it — no tech experience needed.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Mic,
                title: "Just Talk",
                desc: "Press one big button. Tell your story in your own words. AI handles the rest.",
                color: "bg-rose-50 text-rose-500",
              },
              {
                icon: Camera,
                title: "Add Photos",
                desc: "Upload old photos. AI creates captions and weaves them into your story.",
                color: "bg-blue-50 text-blue-500",
              },
              {
                icon: BookOpen,
                title: "Beautiful Chapters",
                desc: "AI turns your words into polished, moving story chapters — in your voice.",
                color: "bg-warm-50 text-warm-500",
              },
              {
                icon: Users,
                title: "Share with Family",
                desc: "One link gives your family a beautiful portal to read, listen, and cherish.",
                color: "bg-sage-50 text-sage-600",
              },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div
                key={title}
                className="flex flex-col items-center text-center gap-4 p-6 sm:p-8 rounded-3xl bg-warm-50 border border-warm-100"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${color}`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-warm-900">{title}</h3>
                <p className="text-base text-warm-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sample stories ── */}
      <section id="stories" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-warm-900 mb-2">
                Real Stories. Real Lives.
              </h2>
              <p className="text-xl text-warm-600">
                Here&rsquo;s a taste of the memories LegacyLens helps preserve.
              </p>
            </div>
            <Link
              href="/stories"
              className="hidden sm:flex items-center gap-1 text-warm-600 hover:text-warm-900 font-medium transition-colors"
            >
              See all stories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {MOCK_STORIES.slice(0, 2).map((story) => (
              <Link
                key={story.id}
                href={`/stories/${story.id}`}
                className="group block bg-white rounded-3xl border border-warm-100 p-7 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="flex gap-3 mb-4 flex-wrap">
                  {story.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-warm-100 text-warm-700 text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-warm-900 mb-3 group-hover:text-warm-700 transition-colors leading-tight">
                  {story.title}
                </h3>
                <p className="text-warm-600 leading-relaxed text-base">
                  {truncate(story.summary, 160)}
                </p>
                <div className="mt-4 flex items-center gap-1 text-warm-500 text-sm font-medium">
                  {story.year} · {story.location}
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/stories">
              <Button variant="outline" size="lg">
                See all stories <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonial / Quote ── */}
      <section className="bg-warm-800 text-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center gap-1 mb-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-6 h-6 text-warm-300 fill-warm-300" />
            ))}
          </div>
          <blockquote className="text-2xl sm:text-3xl font-serif italic text-warm-100 leading-relaxed mb-8">
            &ldquo;My granddaughter read my story and called me in tears. She said she finally
            understood where she came from. That&rsquo;s the greatest gift I&rsquo;ve ever given.&rdquo;
          </blockquote>
          <p className="text-warm-300 text-lg">— Eleanor, 78 · Pittsburgh, PA</p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-warm-900 mb-6">
            Your memories deserve to live forever.
          </h2>
          <p className="text-xl text-warm-600 mb-10">
            Start today. It takes less than five minutes to capture your first story.
            No account required.
          </p>
          <Link href="/dashboard">
            <Button size="xl" className="shadow-lg">
              <BookOpen className="w-5 h-5" />
              Open LegacyLens — It&rsquo;s Free
            </Button>
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-white border-t border-warm-100 py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-warm-500 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-warm-500 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-warm-700">LegacyLens</span>
            <span>· Built for GenLink Hacks</span>
          </div>
          <p>Made with <Heart className="inline w-4 h-4 text-rose-400 fill-rose-400" /> for seniors and families everywhere</p>
        </div>
      </footer>
    </div>
  );
}
