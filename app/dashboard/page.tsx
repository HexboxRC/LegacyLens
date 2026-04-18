import Link from "next/link";
import { Mic, Camera, BookOpen, Users, Sparkles, Clock, Heart } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import PageWrapper from "@/components/layout/PageWrapper";
import { MOCK_STORIES } from "@/lib/mock-data";

export default function DashboardPage() {
  const recentStories = MOCK_STORIES.slice(0, 2);

  return (
    <>
      <Navbar />
      <PageWrapper>
        {/* Greeting */}
        <div className="mb-10 sm:mb-14">
          <p className="text-lg text-warm-500 mb-1">Welcome back,</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-warm-900 mb-3">
            Hello, Eleanor 👋
          </h1>
          <p className="text-xl text-warm-600 max-w-lg">
            You have <span className="font-bold text-warm-800">{MOCK_STORIES.length} stories</span> saved.
            Ready to add another memory?
          </p>
        </div>

        {/* Main action buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
          {[
            {
              href: "/capture",
              icon: Mic,
              title: "Start Talking",
              desc: "Record a new memory in your own voice",
              bg: "bg-gradient-to-br from-rose-50 to-warm-100 border-rose-200",
              iconBg: "bg-rose-100",
              iconColor: "text-rose-500",
              badge: "New Memory",
            },
            {
              href: "/photos",
              icon: Camera,
              title: "Upload Photos",
              desc: "Add old photos and let AI write the story",
              bg: "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200",
              iconBg: "bg-blue-100",
              iconColor: "text-blue-500",
              badge: "Photo Story",
            },
            {
              href: "/stories",
              icon: BookOpen,
              title: "My Stories",
              desc: "Read and edit your saved memory chapters",
              bg: "bg-gradient-to-br from-warm-50 to-amber-50 border-warm-200",
              iconBg: "bg-warm-100",
              iconColor: "text-warm-500",
              badge: `${MOCK_STORIES.length} chapters`,
            },
            {
              href: "/family",
              icon: Users,
              title: "Share with Family",
              desc: "Give your family access to your storybook",
              bg: "bg-gradient-to-br from-sage-50 to-green-50 border-sage-200",
              iconBg: "bg-sage-100",
              iconColor: "text-sage-600",
              badge: "Family Portal",
            },
          ].map(({ href, icon: Icon, title, desc, bg, iconBg, iconColor, badge }) => (
            <Link key={href} href={href} className="block group">
              <div
                className={`rounded-3xl border-2 p-7 sm:p-8 flex flex-col gap-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${bg}`}
              >
                <div className="flex items-start justify-between">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${iconBg}`}>
                    <Icon className={`w-7 h-7 ${iconColor}`} />
                  </div>
                  <span className="text-sm font-semibold text-warm-500 bg-white/70 px-3 py-1 rounded-full">
                    {badge}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-warm-900 mb-1 group-hover:text-warm-700 transition-colors">
                    {title}
                  </h2>
                  <p className="text-base text-warm-600">{desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent stories */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-warm-900">Recent Stories</h2>
            <Link
              href="/stories"
              className="text-warm-600 hover:text-warm-900 font-medium transition-colors text-base"
            >
              View all →
            </Link>
          </div>

          <div className="space-y-4">
            {recentStories.map((story) => (
              <Link key={story.id} href={`/stories/${story.id}`} className="block group">
                <div className="bg-white rounded-2xl border border-warm-100 p-5 sm:p-6 flex items-start gap-4 hover:shadow-sm hover:border-warm-200 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-warm-100 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-warm-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-warm-900 group-hover:text-warm-700 transition-colors mb-1">
                      {story.title}
                    </h3>
                    <p className="text-warm-600 text-sm line-clamp-1">{story.summary}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-warm-400">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{story.year}</span>
                      <span>{story.location}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* AI tip */}
        <div className="mt-10 bg-gradient-to-r from-warm-800 to-warm-700 rounded-3xl p-7 text-white flex items-start gap-5">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-warm-200" />
          </div>
          <div>
            <p className="text-sm font-semibold text-warm-300 mb-1">Today&rsquo;s Prompt</p>
            <p className="text-xl font-bold text-white mb-1">
              &ldquo;What&rsquo;s the best meal you ever had, and who made it?&rdquo;
            </p>
            <p className="text-warm-300 text-sm">
              Tap &ldquo;Start Talking&rdquo; and tell that story — your family will love it.
            </p>
          </div>
        </div>
      </PageWrapper>
    </>
  );
}
