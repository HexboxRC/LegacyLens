import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Clock,
  Volume2,
  Share2,
  Edit3,
  Sparkles,
  Heart,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import PageWrapper from "@/components/layout/PageWrapper";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { MOCK_STORIES } from "@/lib/mock-data";
import { formatDate, getReadingTime } from "@/lib/utils";

interface StoryPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return MOCK_STORIES.map((s) => ({ id: s.id }));
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { id } = await params;
  const story = MOCK_STORIES.find((s) => s.id === id);
  if (!story) notFound();

  const paragraphs = story.fullText.split("\n\n").filter(Boolean);
  const readingTime = getReadingTime(story.fullText);

  // Related stories (all others)
  const related = MOCK_STORIES.filter((s) => s.id !== story.id).slice(0, 2);

  return (
    <>
      <Navbar />
      <PageWrapper narrow>
        {/* Back link */}
        <Link
          href="/stories"
          className="inline-flex items-center gap-2 text-warm-600 hover:text-warm-900 transition-colors mb-8 text-base font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Stories
        </Link>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {story.tags.map((tag) => (
            <Badge key={tag} variant="warm">{tag}</Badge>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-warm-900 leading-tight mb-4">
          {story.title}
        </h1>

        {/* Meta row */}
        <div className="flex flex-wrap gap-4 text-warm-500 text-base mb-6 pb-6 border-b border-warm-100">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />{story.year}
          </span>
          {story.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />{story.location}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />{readingTime} min read
          </span>
          {story.people.length > 0 && (
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />{story.people.join(", ")}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          {/* REAL AI INTEGRATION: Wire to Web Speech API or ElevenLabs TTS */}
          <Button variant="outline" size="sm">
            <Volume2 className="w-4 h-4" />
            Listen to Story
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4" />
            Share with Family
          </Button>
          <Button variant="ghost" size="sm">
            <Edit3 className="w-4 h-4" />
            Edit
          </Button>
        </div>

        {/* Photo */}
        {story.photoUrl && (
          <div className="rounded-3xl overflow-hidden mb-8 bg-warm-100 aspect-video flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-br from-warm-200 via-warm-300 to-warm-400 flex flex-col items-center justify-center gap-2">
              <span className="text-4xl">📷</span>
              <span className="text-warm-700 font-medium text-sm">
                {story.photoCaption || `Photo from ${story.year}`}
              </span>
            </div>
          </div>
        )}

        {/* Summary callout */}
        <blockquote className="border-l-4 border-warm-400 pl-6 py-2 mb-8 bg-warm-50 rounded-r-2xl">
          <p className="text-lg sm:text-xl text-warm-700 italic leading-relaxed">
            {story.summary}
          </p>
        </blockquote>

        {/* Full story */}
        <article className="prose max-w-none">
          {paragraphs.map((para, i) => (
            <p
              key={i}
              className="text-lg sm:text-xl text-warm-800 leading-relaxed mb-6 font-serif"
            >
              {para}
            </p>
          ))}
        </article>

        {/* Emotion tag */}
        {story.emotion && (
          <div className="mt-8 flex items-center gap-2 text-warm-500 text-sm">
            <Heart className="w-4 h-4 text-rose-400" />
            <span className="italic">{story.emotion}</span>
          </div>
        )}

        {/* AI-generated note */}
        <div className="mt-8 p-5 rounded-2xl bg-warm-50 border border-warm-200 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-warm-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-warm-600">
            This story was lovingly shaped by AI from Eleanor&rsquo;s own words and memories.
            Every detail comes from her — we just helped polish the telling.
          </p>
        </div>

        {/* Divider */}
        <div className="my-12 border-t border-warm-100" />

        {/* Related stories */}
        {related.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-warm-900 mb-5">More Memories</h2>
            <div className="space-y-4">
              {related.map((s) => (
                <Link
                  key={s.id}
                  href={`/stories/${s.id}`}
                  className="block group bg-white rounded-2xl border border-warm-100 p-5 hover:shadow-sm hover:border-warm-200 transition-all"
                >
                  <div className="flex flex-wrap gap-2 mb-2">
                    {s.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-warm-100 text-warm-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-bold text-warm-900 group-hover:text-warm-700 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-warm-500 text-sm mt-1">{s.year} · {s.location}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </PageWrapper>
    </>
  );
}
