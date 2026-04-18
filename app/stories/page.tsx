import Link from "next/link";
import { Plus, Search, BookOpen } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import PageWrapper from "@/components/layout/PageWrapper";
import Button from "@/components/ui/Button";
import StoryCard from "@/components/story/StoryCard";
import { MOCK_STORIES } from "@/lib/mock-data";

export default function StoriesPage() {
  return (
    <>
      <Navbar />
      <PageWrapper>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-warm-900 mb-2">
              My Stories
            </h1>
            <p className="text-xl text-warm-600">
              {MOCK_STORIES.length} chapters in your life book
            </p>
          </div>
          <Link href="/capture">
            <Button size="lg">
              <Plus className="w-5 h-5" />
              New Story
            </Button>
          </Link>
        </div>

        {/* Story count banner */}
        <div className="bg-gradient-to-r from-warm-800 to-warm-700 text-white rounded-3xl p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-warm-200" />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">{MOCK_STORIES.length} Chapters</p>
              <p className="text-warm-300">
                {MOCK_STORIES.reduce((acc, s) => acc + s.fullText.split(" ").length, 0).toLocaleString()} words of memories preserved
              </p>
            </div>
          </div>
          <Link href="/family">
            <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50">
              Share with Family →
            </Button>
          </Link>
        </div>

        {/* Stories grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {MOCK_STORIES.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>

        {/* Empty state (only shown if no stories) */}
        {MOCK_STORIES.length === 0 && (
          <div className="text-center py-24">
            <div className="w-20 h-20 rounded-3xl bg-warm-100 flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-warm-400" />
            </div>
            <h2 className="text-2xl font-bold text-warm-800 mb-2">No stories yet</h2>
            <p className="text-warm-600 mb-8">Your first story is just one button press away.</p>
            <Link href="/capture">
              <Button size="lg">Start Your First Story</Button>
            </Link>
          </div>
        )}
      </PageWrapper>
    </>
  );
}
