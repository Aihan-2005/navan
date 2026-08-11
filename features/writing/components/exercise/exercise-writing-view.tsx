"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, PenSquare, Sparkles, Target, Clock } from "lucide-react";

import { WritingPromptPanel } from "../workspace/writing-prompt-panel";
import { DraftStatus } from "../workspace/draft-status";
import { LiveWritingStats } from "../workspace/live-writing-stats";
import { WritingToolbar } from "../workspace/writing-toolbar";
import { WritingEditor } from "../workspace/writing-editor";
import { AnalysisSubmitBar } from "../workspace/analysis-submit-bar";
import { useWritingDraft } from "../../hooks/use-writing-draft";
import { submitWritingAnalysis } from "../../api/submit-writing-analysis";
import type { WritingExercise } from "../../types/writing.types";

type ExerciseWritingViewProps = Readonly<{
  exercise: WritingExercise;
}>;

function getWordCount(value: string): number {
  const normalized = value.trim();
  if (!normalized) {
    return 0;
  }
  return normalized.split(/\s+/u).filter(Boolean).length;
}

export function ExerciseWritingView({ exercise }: ExerciseWritingViewProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sessionKey = exercise.id;
  const { content, setContent, saveStatus, lastSavedAt, saveNow, clearDraft } =
    useWritingDraft(sessionKey);

  const wordCount = useMemo(() => getWordCount(content), [content]);
  const characterCount = content.length;

  const targetWords = exercise.expectedWordCount;
  const minimumWords = Math.max(targetWords - 20, 100);
  const canSubmit = wordCount >= minimumWords;

  const tips = exercise.instructions;

  async function handleSubmit() {
    if (!canSubmit || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    saveNow();

    try {
      const response = await submitWritingAnalysis({
        content,
        exerciseId: exercise.id,
        mode: "exercise",
      });

      if (response.success && response.submissionId) {
        router.push(`/writing/submissions/${response.submissionId}`);
      }
    } catch (error) {
      console.error("Error submitting for analysis:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleClear() {
    clearDraft();
  }

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6" dir="rtl">
      <Link
        href="/writing"
        className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
      >
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
        بازگشت به صفحه نوشتن
      </Link>

      <section className="relative overflow-hidden rounded-3xl border border-cyan-400/15 bg-[linear-gradient(135deg,rgba(8,47,73,0.75),rgba(15,23,42,0.85))] p-6 sm:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 right-10 h-64 w-64 rounded-full bg-violet-500/15 blur-3xl"
        />

        <div className="relative">
          <div className="flex flex-wrap items-center gap-2 text-sm text-cyan-300">
            <PenSquare aria-hidden="true" className="h-4 w-4" />
            <span>{exercise.category}</span>
          </div>

          <h1 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
            {exercise.title}
          </h1>

          <p className="mt-4 text-sm leading-8 text-slate-300 sm:text-base">
            {exercise.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Sparkles aria-hidden="true" className="h-4 w-4 text-cyan-300" />
              <span>{exercise.difficulty}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock aria-hidden="true" className="h-4 w-4 text-cyan-300" />
              <span>{exercise.estimatedMinutes} دقیقه</span>
            </div>
            <div className="flex items-center gap-2">
              <Target aria-hidden="true" className="h-4 w-4 text-cyan-300" />
              <span>{exercise.expectedWordCount} کلمه هدف</span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <WritingPromptPanel
            title={exercise.title}
            description={exercise.description}
            prompt={exercise.prompt}
            tips={tips}
            modeLabel="تمرین هدف‌مند"
            instructions={exercise.instructions}
            writingGoal={exercise.targetWritingGoal}
            targetWordCount={exercise.expectedWordCount}
            category={exercise.category}
            difficulty={exercise.difficulty}
            estimatedMinutes={exercise.estimatedMinutes}
          />

          <LiveWritingStats
            wordCount={wordCount}
            characterCount={characterCount}
            targetWords={targetWords}
            requiredWords={minimumWords}
          />

          <DraftStatus status={saveStatus} lastSavedAt={lastSavedAt} />
        </div>

        <div className="space-y-6">
          <WritingToolbar
            onSaveNow={saveNow}
            onClear={handleClear}
            saveStatus={saveStatus}
          />

          <WritingEditor
            value={content}
            onChange={setContent}
            placeholder="متن خودت را اینجا شروع کن..."
          />

          <AnalysisSubmitBar
            canSubmit={canSubmit}
            onSubmit={handleSubmit}
            onClear={handleClear}
            analysisReady={false}
            wordCount={wordCount}
            targetWords={targetWords}
            requiredWords={minimumWords}
            isSubmitting={isSubmitting}
          />
        </div>
      </section>
    </main>
  );
}
