"use client";
import Link from "next/link";
import {
  Heart,
  BookOpen,
  Calendar,
  MapPin,
  Volume2,
  Clock,
  Users,
  Star,
  Share2,
} from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";
import { Card } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { MOCK_STORIES, MOCK_FAMILY_MEMBERS } from "@/lib/mock-data";
import { getReadingTime, truncate } from "@/lib/utils";

export default function FamilyPortalPage() {
  const featured = MOCK_STORIES[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-50 to-white">
      {/* ── Portal header ── */}
      <header className="bg-white border-b border-warm-100 py-5 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-warm-500 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-warm-500 font-medium uppercase tracking-wider">Family Portal</p>
              <h1 className="text-xl font-bold text-warm-900">Eleanor&rsquo;s Life Stories</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 bg-sage-50 text-sage-700 px-3 py-1.5 rounded-full text-sm font-medium">
              <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
              Shared with love
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-warm-100 text-warm-700 hover:bg-warm-200 transition-colors text-sm font-medium"
              aria-label="Share this family portal"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>
      </header>

      <PageWrapper>
        {/* ── Introduction ── */}
        <div className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-warm-200 to-warm-400 flex items-center justify-center mx-auto mb-5 text-4xl font-serif text-white">
            E
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-warm-900 mb-3">
            Eleanor Romano
          </h2>
          <p className="text-lg text-warm-500 mb-4">Pittsburgh, PA · Born 1937</p>
          <p className="text-xl text-warm-700 leading-relaxed italic font-serif">
            &ldquo;These are my memories — the moments that made me who I am.
            I&rsquo;m sharing them so that even after I&rsquo;m gone, you can
            still hear my voice.&rdquo;
          </p>
        </div>

        {/* ── Family members ── */}
        <div className="mb-12">
          <p className="text-sm font-semibold text-warm-500 uppercase tracking-wider mb-4 text-center">
            Shared with
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {MOCK_FAMILY_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="flex flex-col items-center gap-2"
                aria-label={`${member.name}, ${member.relation}`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-base ${member.color}`}
                >
                  {member.avatarInitials}
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-warm-800">{member.name}</p>
                  <p className="text-xs text-warm-500">{member.relation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Featured story ── */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <Star className="w-5 h-5 text-warm-400 fill-warm-300" />
            <h2 className="text-xl font-bold text-warm-700">Featured Memory</h2>
          </div>
          <Link href={`/stories/${featured.id}`} className="block group">
            <div className="bg-gradient-to-br from-warm-800 to-warm-700 rounded-3xl p-7 sm:p-10 text-white hover:shadow-xl transition-all">
              <div className="flex flex-wrap gap-2 mb-4">
                {featured.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-white/10 text-warm-200 text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-3 group-hover:text-warm-200 transition-colors leading-tight">
                {featured.title}
              </h3>
              <p className="text-warm-200 text-lg leading-relaxed mb-6 max-w-2xl">
                {featured.summary}
              </p>
              <div className="flex flex-wrap gap-4 text-warm-300 text-sm">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />{featured.year}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />{featured.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />{getReadingTime(featured.fullText)} min read
                </span>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-warm-900 font-semibold text-base hover:bg-warm-50 transition-colors">
                  <BookOpen className="w-4 h-4" />
                  Read Story
                </span>
                {/* REAL AI INTEGRATION: Connect to ElevenLabs / Web Speech API */}
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 text-white font-semibold text-base hover:bg-white/20 transition-colors border border-white/20">
                  <Volume2 className="w-4 h-4" />
                  Listen
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* ── Timeline / All stories ── */}
        <div>
          <h2 className="text-3xl font-bold text-warm-900 mb-6">All Memories</h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 sm:left-6 top-0 bottom-0 w-0.5 bg-warm-200" aria-hidden="true" />

            <div className="space-y-6">
              {MOCK_STORIES.map((story, i) => (
                <div key={story.id} className="relative flex gap-5 sm:gap-7">
                  {/* Timeline dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-warm-300 flex items-center justify-center shadow-sm">
                      <span className="text-base font-bold text-warm-500">{story.year.slice(-2)}</span>
                    </div>
                  </div>

                  {/* Story card */}
                  <Link href={`/stories/${story.id}`} className="flex-1 block group">
                    <div className="bg-white rounded-3xl border border-warm-100 p-5 sm:p-6 hover:shadow-md hover:border-warm-200 transition-all -mt-1">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {story.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="warm">{tag}</Badge>
                        ))}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-warm-900 group-hover:text-warm-700 transition-colors mb-2 leading-snug">
                        {story.title}
                      </h3>
                      <p className="text-warm-600 text-base leading-relaxed mb-4">
                        {truncate(story.summary, 160)}
                      </p>
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex gap-3 text-warm-400 text-sm">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />{story.year}
                          </span>
                          {story.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />{story.location}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />{getReadingTime(story.fullText)} min
                          </span>
                        </div>

                        {/* Listen button */}
                        {/* REAL AI INTEGRATION: Pass story.fullText to TTS API and play */}
                        <button
                          onClick={(e) => e.preventDefault()}
                          className="ml-auto flex items-center gap-1.5 text-warm-500 hover:text-warm-700 transition-colors text-sm font-medium px-3 py-1.5 rounded-xl hover:bg-warm-50"
                          aria-label={`Listen to ${story.title}`}
                        >
                          <Volume2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Listen</span>
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Footer note ── */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-warm-400 text-sm">
            <Heart className="w-4 h-4 fill-rose-300 text-rose-300" />
            <span>Created with LegacyLens · These stories belong to Eleanor Romano</span>
          </div>
        </div>
      </PageWrapper>
    </div>
  );
}

