"use client";
import { useState } from "react";
import { Sparkles, BookOpen, ArrowRight } from "lucide-react";
import { apiPost, apiUpload } from "@/lib/api";
import Navbar from "@/components/layout/Navbar";
import PageWrapper from "@/components/layout/PageWrapper";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import PhotoUploadZone from "@/components/photo/PhotoUploadZone";
import PhotoCard from "@/components/photo/PhotoCard";

interface UploadedPhoto {
  id: string;
  file: File;
  previewUrl: string;
  title?: string;
  caption?: string;
  story?: string;
}

const DEMO_PHOTOS: UploadedPhoto[] = [
  {
    id: "demo-1",
    file: new File([], "demo"),
    previewUrl:
      "https://images.unsplash.com/photo-1511895426328-dc8714191011?w=600&q=80",
    title: "Sunday Morning, 1958",
    caption:
      "This photograph captures a quiet Sunday morning that you still remember clearly — the smell of fresh coffee, the sound of the radio playing softly in the other room, everyone together before the week began again.",
  },
  {
    id: "demo-2",
    file: new File([], "demo"),
    previewUrl:
      "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=600&q=80",
    title: "The Old Neighborhood",
    caption:
      "These streets held everything that mattered. You knew every face on every porch, every shortcut through the alley, every window that would have a light on late at night.",
  },
];

export default function PhotosPage() {
  const [photos, setPhotos] = useState<UploadedPhoto[]>(DEMO_PHOTOS);
  const [storyText, setStoryText] = useState("");
  const [generatingAll, setGeneratingAll] = useState(false);
  const [allGenerated, setAllGenerated] = useState(false);

  function handleFilesSelected(files: File[]) {
    const newPhotos: UploadedPhoto[] = files.map((file) => ({
      id: `photo-${Date.now()}-${Math.random()}`,
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setPhotos((prev) => [...prev, ...newPhotos]);
  }

  function removePhoto(id: string) {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  }

  async function generateAllCaptions() {
    setGeneratingAll(true);
    // Calls FastAPI backend at http://localhost:8000/api/generate-caption for each photo
    const uncaptioned = photos.filter((p) => !p.title && !p.id.startsWith("demo"));
    const results = await Promise.all(
      uncaptioned.map(async (p) => {
        const fd = new FormData();
        fd.append("photo", p.file);
        return apiUpload<{ title: string; caption: string }>("/api/generate-caption", fd)
          .then((data) => ({ id: p.id, ...data }))
          .catch(() => ({ id: p.id, title: "A Cherished Memory", caption: "This photograph holds a world." }));
      })
    );
    setPhotos((prev) =>
      prev.map((p) => {
        const result = results.find((r) => r.id === p.id);
        return result ? { ...p, title: result.title, caption: result.caption } : p;
      })
    );
    setGeneratingAll(false);
    setAllGenerated(true);
  }

  async function generatePhotoStory() {
    const prompt = storyText || "Generate a story for this photo collection.";
    setStoryText("Generating…");
    // Calls FastAPI backend at http://localhost:8000/api/generate-story
    try {
      const data = await apiPost<{ full_text: string }>("/api/generate-story", {
        transcript: prompt,
        follow_up_answers: photos.filter((p) => p.caption).map((p) => p.caption!),
      });
      setStoryText(data.full_text);
    } catch {
      setStoryText(
        "These photographs tell a story that words alone can barely hold.\n\nEach image carries within it not just a moment, but an entire world — the sounds just out of frame, the conversations happening just before and after the shutter clicked.\n\nThis is your life. And it has been, from the very beginning, a story worth telling."
      );
    }
  }

  return (
    <>
      <Navbar />
      <PageWrapper>
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-warm-900 mb-3">
            Your Photo Stories
          </h1>
          <p className="text-xl text-warm-600 max-w-xl">
            Upload old photos and let AI create beautiful captions and story chapters.
            Every picture has a story — let&rsquo;s find it.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Upload + photos */}
          <div className="lg:col-span-2 space-y-6">
            <PhotoUploadZone onFilesSelected={handleFilesSelected} />

            {photos.length > 0 && (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-warm-900">
                    {photos.length} Photo{photos.length !== 1 ? "s" : ""}
                  </h2>
                  <Button
                    onClick={generateAllCaptions}
                    loading={generatingAll}
                    size="sm"
                    variant="outline"
                  >
                    <Sparkles className="w-4 h-4" />
                    Caption All
                  </Button>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {photos.map((photo) => (
                    <PhotoCard
                      key={photo.id}
                      file={photo.file}
                      previewUrl={photo.previewUrl}
                      title={photo.title}
                      caption={photo.caption}
                      onRemove={
                        photo.id.startsWith("demo")
                          ? undefined
                          : () => removePhoto(photo.id)
                      }
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Right: Story generation */}
          <div className="space-y-5">
            <Card className="border-2 border-warm-200">
              <h2 className="text-xl font-bold text-warm-900 mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-warm-500" />
                Add Your Story
              </h2>
              <p className="text-warm-600 text-sm mb-4">
                Add a few words about these photos, or let AI write the whole story.
              </p>
              <textarea
                value={storyText}
                onChange={(e) => setStoryText(e.target.value)}
                placeholder="These photos are from… They remind me of… The people in them are…"
                rows={5}
                className="w-full rounded-2xl border-2 border-warm-200 bg-warm-50 px-4 py-3 text-base text-warm-900 placeholder:text-warm-400 focus:outline-none focus:border-warm-400 resize-none mb-4"
                aria-label="Add context to your photos"
              />
              <Button
                onClick={generatePhotoStory}
                className="w-full"
                loading={storyText === "Generating…"}
              >
                <Sparkles className="w-4 h-4" />
                Generate Photo Story
              </Button>
            </Card>

            {storyText && storyText !== "Generating…" && (
              <Card className="border-2 border-sage-200 bg-sage-50 animate-slide-up">
                <h3 className="text-sm font-semibold text-sage-700 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  AI-Generated Story
                </h3>
                <div className="space-y-3">
                  {storyText.split("\n\n").map((para, i) => (
                    <p key={i} className="text-warm-800 text-sm leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  className="mt-4 w-full"
                  onClick={() => (window.location.href = "/stories")}
                >
                  <BookOpen className="w-4 h-4" />
                  Save to Stories
                </Button>
              </Card>
            )}

            <Card>
              <h3 className="text-lg font-bold text-warm-900 mb-2">Tips</h3>
              <ul className="space-y-2 text-warm-600 text-sm">
                {[
                  "Any photo works — old or new, clear or faded",
                  "HEIC photos from iPhones are supported",
                  "You can add multiple photos and tell one big story",
                  "Edit any AI caption to make it more personal",
                ].map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="text-warm-400 mt-0.5">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </PageWrapper>
    </>
  );
}
