"use client";
import { useState, useRef, useCallback } from "react";
import { Mic, MicOff, Square, Sparkles, RotateCcw, CheckCircle, Volume2, BookOpen } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import PageWrapper from "@/components/layout/PageWrapper";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import AIFollowUp from "@/components/story/AIFollowUp";
import WaveformVisualizer from "@/components/story/WaveformVisualizer";

type Stage = "idle" | "recording" | "transcribing" | "followup" | "generating" | "done";

interface GeneratedStory {
  title: string;
  summary: string;
  fullText: string;
  followUpQuestion: string;
  tags: string[];
  year: string;
  location: string;
}

export default function CapturePage() {
  const [stage, setStage] = useState<Stage>("idle");
  const [transcript, setTranscript] = useState("");
  const [followUpAnswers, setFollowUpAnswers] = useState<string[]>([]);
  const [generatedStory, setGeneratedStory] = useState<GeneratedStory | null>(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function startRecording() {
    setStage("recording");
    setRecordingSeconds(0);
    timerRef.current = setInterval(() => setRecordingSeconds((s) => s + 1), 1000);
  }

  async function stopRecording() {
    if (timerRef.current) clearInterval(timerRef.current);
    setStage("transcribing");

    // REAL AI INTEGRATION: Call browser MediaRecorder API, then POST audio to /api/transcribe
    // const response = await fetch("/api/transcribe", {
    //   method: "POST",
    //   body: audioBlob,
    // });
    // const { transcript } = await response.json();

    const res = await fetch("/api/transcribe", { method: "POST" });
    const data = await res.json();
    setTranscript(data.transcript);
    setStage("followup");
  }

  function handleFollowUpAnswer(answer: string) {
    setFollowUpAnswers((prev) => [...prev, answer]);
  }

  async function generateStory() {
    setStage("generating");

    const res = await fetch("/api/generate-story", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcript, followUpAnswers }),
    });
    const data = await res.json();
    setGeneratedStory(data.story);
    setStage("done");
  }

  function reset() {
    setStage("idle");
    setTranscript("");
    setFollowUpAnswers([]);
    setGeneratedStory(null);
    setRecordingSeconds(0);
  }

  function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  return (
    <>
      <Navbar />
      <PageWrapper narrow>
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-warm-900 mb-3">
            Tell Your Story
          </h1>
          <p className="text-xl text-warm-600 max-w-lg mx-auto">
            Just press the button and start talking. Say whatever comes to mind —
            a memory, a feeling, a moment you don&rsquo;t want to forget.
          </p>
        </div>

        {/* ── IDLE: Big microphone button ── */}
        {stage === "idle" && (
          <div className="flex flex-col items-center gap-8 animate-fade-in">
            <button
              onClick={startRecording}
              className="w-40 h-40 rounded-full bg-warm-500 hover:bg-warm-600 active:scale-95 transition-all shadow-2xl shadow-warm-300 flex flex-col items-center justify-center gap-2 text-white"
              aria-label="Start recording your story"
            >
              <Mic className="w-16 h-16" />
              <span className="text-sm font-bold uppercase tracking-wider">Start Talking</span>
            </button>

            <div className="text-center">
              <p className="text-warm-600 text-lg mb-1">Or type your memory below</p>
              <p className="text-warm-400 text-sm">Both work — choose what&rsquo;s easiest for you</p>
            </div>

            <div className="w-full">
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Start typing your memory here… What do you remember? Who was there? What did it feel like?"
                rows={6}
                className="w-full rounded-3xl border-2 border-warm-200 bg-white px-6 py-5 text-lg text-warm-900 placeholder:text-warm-300 focus:outline-none focus:border-warm-400 resize-none shadow-sm"
                aria-label="Type your memory"
              />
              {transcript.trim() && (
                <div className="mt-4 flex justify-center">
                  <Button onClick={() => setStage("followup")} size="lg">
                    <Sparkles className="w-5 h-5" />
                    Continue with AI
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── RECORDING ── */}
        {stage === "recording" && (
          <div className="flex flex-col items-center gap-8 animate-fade-in">
            <div className="relative">
              <button
                onClick={stopRecording}
                className="w-40 h-40 rounded-full bg-red-500 hover:bg-red-600 active:scale-95 transition-all recording-pulse flex flex-col items-center justify-center gap-2 text-white"
                aria-label="Stop recording"
              >
                <Square className="w-10 h-10 fill-white" />
                <span className="text-sm font-bold uppercase tracking-wider">Stop</span>
              </button>
            </div>

            <WaveformVisualizer active={true} />

            <div className="text-center">
              <p className="text-3xl font-bold text-red-500 tabular-nums mb-1">
                {formatTime(recordingSeconds)}
              </p>
              <p className="text-warm-600 text-lg">Recording… keep talking!</p>
              <p className="text-warm-400 text-sm mt-1">Press Stop when you&rsquo;re done</p>
            </div>

            <div className="bg-warm-100 rounded-2xl px-6 py-4 text-center max-w-sm">
              <p className="text-warm-700 text-base italic">
                &ldquo;Take your time. There&rsquo;s no rush. Just tell us what you remember.&rdquo;
              </p>
            </div>
          </div>
        )}

        {/* ── TRANSCRIBING ── */}
        {stage === "transcribing" && (
          <div className="flex flex-col items-center gap-6 py-12 animate-fade-in">
            <div className="w-20 h-20 rounded-full border-4 border-warm-200 border-t-warm-500 animate-spin" />
            <p className="text-2xl font-bold text-warm-900">Listening to your story…</p>
            <p className="text-warm-600 text-lg">AI is transcribing your words</p>
          </div>
        )}

        {/* ── FOLLOW-UP ── */}
        {(stage === "followup") && (
          <div className="space-y-6 animate-fade-in">
            {/* Transcript */}
            <Card>
              <h2 className="text-lg font-bold text-warm-900 mb-3 flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-warm-500" />
                What you said
              </h2>
              <p className="text-warm-700 text-lg leading-relaxed italic">
                &ldquo;{transcript}&rdquo;
              </p>
              <button
                onClick={() => {
                  const newTranscript = prompt("Edit your story:", transcript);
                  if (newTranscript !== null) setTranscript(newTranscript);
                }}
                className="mt-3 text-sm text-warm-400 hover:text-warm-600 transition-colors"
              >
                ✏️ Edit transcript
              </button>
            </Card>

            {/* AI follow-up */}
            <AIFollowUp onAnswer={handleFollowUpAnswer} />

            {/* Generate button */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                onClick={generateStory}
                size="xl"
                className="flex-1"
              >
                <Sparkles className="w-5 h-5" />
                Generate My Story Chapter
              </Button>
              <Button variant="ghost" onClick={reset}>
                <RotateCcw className="w-5 h-5" />
                Start over
              </Button>
            </div>
          </div>
        )}

        {/* ── GENERATING ── */}
        {stage === "generating" && (
          <div className="flex flex-col items-center gap-6 py-12 animate-fade-in">
            <div className="relative w-24 h-24">
              <div className="w-24 h-24 rounded-full border-4 border-warm-100 border-t-warm-500 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-warm-500" />
              </div>
            </div>
            <p className="text-2xl font-bold text-warm-900">Writing your story…</p>
            <div className="space-y-2 text-center text-warm-600">
              <p>✨ Polishing your words</p>
              <p>📖 Shaping your narrative</p>
              <p>💛 Making it beautiful</p>
            </div>
          </div>
        )}

        {/* ── DONE ── */}
        {stage === "done" && generatedStory && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3 text-sage-600">
              <CheckCircle className="w-6 h-6" />
              <p className="text-lg font-semibold">Your story is ready!</p>
            </div>

            <Card>
              <div className="flex flex-wrap gap-2 mb-4">
                {generatedStory.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-warm-100 text-warm-700 text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-3xl font-bold text-warm-900 mb-2">{generatedStory.title}</h2>
              <p className="text-warm-500 text-sm mb-6">
                {generatedStory.year} · {generatedStory.location}
              </p>
              <div className="prose prose-warm max-w-none">
                {generatedStory.fullText.split("\n\n").map((para, i) => (
                  <p key={i} className="text-warm-800 text-lg leading-relaxed mb-4">
                    {para}
                  </p>
                ))}
              </div>
            </Card>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => (window.location.href = "/stories")}
                size="lg"
                className="flex-1"
              >
                <BookOpen className="w-5 h-5" />
                Save to My Stories
              </Button>
              <Button variant="outline" size="lg" onClick={reset}>
                <RotateCcw className="w-4 h-4" />
                Record Another
              </Button>
            </div>
          </div>
        )}
      </PageWrapper>
    </>
  );
}
