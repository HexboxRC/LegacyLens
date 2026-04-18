import Link from "next/link";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { Card } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { Story } from "@/lib/mock-data";
import { formatDate, truncate, getReadingTime } from "@/lib/utils";

interface StoryCardProps {
  story: Story;
  compact?: boolean;
}

export default function StoryCard({ story, compact = false }: StoryCardProps) {
  return (
    <Link href={`/stories/${story.id}`} className="block group">
      <Card hover className="h-full flex flex-col gap-4">
        {/* Photo thumbnail */}
        {story.photoUrl && (
          <div className="rounded-2xl overflow-hidden aspect-video bg-warm-100 flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-br from-warm-200 to-warm-300 flex items-center justify-center">
              <span className="text-warm-600 text-sm font-medium">📷 {story.year}</span>
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {story.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="warm">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-warm-900 group-hover:text-warm-700 transition-colors leading-tight">
          {story.title}
        </h3>

        {/* Summary */}
        {!compact && (
          <p className="text-warm-700 text-base leading-relaxed">
            {truncate(story.summary, 180)}
          </p>
        )}

        {/* Meta */}
        <div className="flex flex-wrap gap-3 text-sm text-warm-500 mt-auto pt-2 border-t border-warm-100">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {story.year}
          </span>
          {story.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {story.location}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {getReadingTime(story.fullText)} min read
          </span>
          {story.people.length > 0 && (
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {story.people.length} people
            </span>
          )}
        </div>
      </Card>
    </Link>
  );
}
