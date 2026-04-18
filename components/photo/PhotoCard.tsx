"use client";
import { useState } from "react";
import { Sparkles, Trash2, Edit3 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface PhotoCardProps {
  file?: File;
  previewUrl: string;
  title?: string;
  caption?: string;
  isGenerating?: boolean;
  onGenerate?: () => void;
  onRemove?: () => void;
  demoMode?: boolean;
}

export default function PhotoCard({
  file,
  previewUrl,
  title,
  caption,
  isGenerating = false,
  onGenerate,
  onRemove,
  demoMode = false,
}: PhotoCardProps) {
  const [localTitle, setLocalTitle] = useState(title || "");
  const [localCaption, setLocalCaption] = useState(caption || "");
  const [editing, setEditing] = useState(false);
  const [generated, setGenerated] = useState(!!(title && caption));

  async function handleGenerate() {
    if (onGenerate) {
      onGenerate();
    }
    // Simulate AI generation delay
    await new Promise((r) => setTimeout(r, 1800));
    setLocalTitle("A Cherished Memory");
    setLocalCaption(
      "This photograph captures a moment that speaks of warmth, connection, and the quiet joy of everyday life. The people here carry stories worth telling."
    );
    setGenerated(true);
  }

  return (
    <Card padded={false} className="overflow-hidden flex flex-col">
      {/* Photo */}
      <div className="relative aspect-video bg-warm-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={previewUrl}
          alt={localTitle || "Uploaded photo"}
          className="w-full h-full object-cover"
        />
        {onRemove && (
          <button
            onClick={onRemove}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
            aria-label="Remove photo"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        {generated ? (
          <>
            <div className="flex items-start justify-between gap-2">
              {editing ? (
                <input
                  value={localTitle}
                  onChange={(e) => setLocalTitle(e.target.value)}
                  className="flex-1 text-lg font-bold text-warm-900 border-b-2 border-warm-300 focus:outline-none focus:border-warm-500 bg-transparent"
                />
              ) : (
                <h3 className="text-lg font-bold text-warm-900 flex-1">{localTitle}</h3>
              )}
              <button
                onClick={() => setEditing((e) => !e)}
                className="text-warm-400 hover:text-warm-600 transition-colors p-1"
                aria-label="Edit title"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
            {editing ? (
              <textarea
                value={localCaption}
                onChange={(e) => setLocalCaption(e.target.value)}
                rows={3}
                className="w-full text-sm text-warm-600 border rounded-xl px-3 py-2 focus:outline-none focus:border-warm-400 resize-none"
              />
            ) : (
              <p className="text-sm text-warm-600 leading-relaxed">{localCaption}</p>
            )}
            <div className="flex items-center gap-1 text-sage-600 text-xs font-medium mt-auto">
              <Sparkles className="w-3 h-3" />
              AI-generated caption
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 py-4">
            <p className="text-warm-600 text-sm text-center">
              Let AI write a title and caption for this photo
            </p>
            <Button
              onClick={handleGenerate}
              loading={isGenerating}
              size="sm"
              className="w-full"
            >
              <Sparkles className="w-4 h-4" />
              Generate Caption
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
