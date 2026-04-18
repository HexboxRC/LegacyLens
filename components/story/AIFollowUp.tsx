"use client";
import { useState } from "react";
import { Sparkles, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { FOLLOW_UP_QUESTIONS } from "@/lib/mock-data";

interface AIFollowUpProps {
  onAnswer: (answer: string) => void;
}

export default function AIFollowUp({ onAnswer }: AIFollowUpProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answered, setAnswered] = useState(false);

  const question = FOLLOW_UP_QUESTIONS[currentIndex % FOLLOW_UP_QUESTIONS.length];

  function handleSubmit() {
    if (!answer.trim()) return;
    onAnswer(answer);
    setAnswered(true);
  }

  function handleNext() {
    setCurrentIndex((i) => i + 1);
    setAnswer("");
    setAnswered(false);
  }

  return (
    <Card className="border-2 border-warm-200 bg-warm-50 animate-slide-up">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-warm-500 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-warm-600 mb-1">AI Follow-up Question</p>
          <p className="text-xl font-semibold text-warm-900 mb-4 leading-snug">{question}</p>

          {!answered ? (
            <div className="space-y-3">
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here, or speak it above…"
                rows={3}
                className="w-full rounded-2xl border-2 border-warm-200 bg-white px-4 py-3 text-base text-warm-900 placeholder:text-warm-400 focus:outline-none focus:border-warm-400 resize-none"
                aria-label="Answer to follow-up question"
              />
              <Button onClick={handleSubmit} disabled={!answer.trim()}>
                Add This to My Story
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="rounded-2xl bg-white border border-warm-200 px-4 py-3 text-warm-700 text-base">
                {answer}
              </div>
              <div className="flex items-center gap-2 text-sage-600">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Added to your story!</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleNext} className="flex items-center gap-1">
                Next question <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
