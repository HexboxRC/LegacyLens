"use client";
import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { Upload, ImagePlus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhotoUploadZoneProps {
  onFilesSelected: (files: File[]) => void;
}

export default function PhotoUploadZone({ onFilesSelected }: PhotoUploadZoneProps) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleDrag(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragging(e.type === "dragenter" || e.type === "dragover");
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/")
    );
    if (files.length) onFilesSelected(files);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length) onFilesSelected(files);
    e.target.value = "";
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Upload photos — click or drag and drop"
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
      className={cn(
        "relative rounded-3xl border-3 border-dashed transition-all duration-200 cursor-pointer",
        "flex flex-col items-center justify-center gap-4 px-8 py-16 text-center",
        dragging
          ? "border-warm-500 bg-warm-50 scale-[1.01]"
          : "border-warm-300 bg-white hover:border-warm-400 hover:bg-warm-50"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        className="sr-only"
        aria-hidden="true"
      />

      <div
        className={cn(
          "w-20 h-20 rounded-3xl flex items-center justify-center transition-colors",
          dragging ? "bg-warm-500" : "bg-warm-100"
        )}
      >
        {dragging ? (
          <Upload className="w-10 h-10 text-white" />
        ) : (
          <ImagePlus className="w-10 h-10 text-warm-500" />
        )}
      </div>

      <div>
        <p className="text-2xl font-bold text-warm-900 mb-1">
          {dragging ? "Drop your photos here" : "Upload Your Photos"}
        </p>
        <p className="text-base text-warm-600">
          Drag and drop, or tap to browse your device
        </p>
        <p className="text-sm text-warm-400 mt-1">
          Accepts JPG, PNG, HEIC — any size
        </p>
      </div>
    </div>
  );
}
