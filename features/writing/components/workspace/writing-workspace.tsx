"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  FileText,
  PenSquare,
  UploadCloud,
  X,
} from "lucide-react";

import { Card } from "../../../../components/ui/card";

import { useWritingDraft } from "../../hooks/use-writing-draft";
import type { WritingDraft, WritingExercise } from "../../types/writing.types";
import { submitWritingAnalysis } from "../../api/submit-writing-analysis";
import { AnalysisSubmitBar } from "./analysis-submit-bar";
import { DraftStatus } from "./draft-status";
import { LiveWritingStats } from "./live-writing-stats";
import { WritingEditor } from "./writing-editor";
import { WritingPromptPanel } from "./writing-prompt-panel";
import { WritingToolbar } from "./writing-toolbar";

type WritingMode = "free" | "exercise" | "draft";

type WritingWorkspaceProps = Readonly<{
  mode?: WritingMode;
  exercise?: WritingExercise;
  draft?: WritingDraft;
  showHeader?: boolean;
}>;

function getWordCount(value: string): number {
  const normalized = value.trim();

  if (!normalized) {
    return 0;
  }

  return normalized.split(/\s+/u).filter(Boolean).length;
}

const defaultInstructions = [
  "یک مقدمه‌ی روشن و جذاب برای متن بنویس.",
  "به‌صورت منظم و روان ایده‌ها را پیش ببر.",
  "در پایان، یک جمع‌بندی کوتاه و قوی اضافه کن.",
];

export function WritingWorkspace({
  mode = "free",
  exercise,
  draft,
  showHeader = true,
}: WritingWorkspaceProps) {
  const router = useRouter();
  const [analysisReady, setAnalysisReady] = useState(false);
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "done">("idle");
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const sessionKey =
    mode === "exercise" && exercise
      ? exercise.id
      : draft?.id ?? "free-writing";

  const { content, setContent, saveStatus, lastSavedAt, saveNow, clearDraft } =
    useWritingDraft(sessionKey);

  const wordCount = useMemo(() => getWordCount(content), [content]);
  const characterCount = content.length;

  const targetWords =
    mode === "exercise" && exercise
      ? exercise.expectedWordCount
      : mode === "draft" && draft
        ? Math.max(draft.wordCount, 140)
        : 140;

  const minimumWords =
    mode === "free"
      ? 80
      : Math.max(targetWords - 20, 100);

  const canSubmit = wordCount >= minimumWords;

  const modeLabel =
    mode === "exercise"
      ? "تمرین هدف‌مند"
      : mode === "draft"
        ? "ادامه‌ی نوشته"
        : "نوشتن آزاد";

  const title =
    mode === "exercise" && exercise
      ? exercise.title
      : mode === "draft" && draft
        ? draft.title
        : "نوشتن آزاد";

  const description =
    mode === "exercise" && exercise
      ? exercise.description
      : mode === "draft" && draft
        ? `ادامه‌ی متن ${draft.title} با حفظ لحن و ساختار قبلی.`
        : "در این فضا می‌توانی بدون فشار ایده‌ها و جمله‌های خودت را روی کاغذ بیاوری.";

  const prompt =
    mode === "exercise" && exercise
      ? exercise.prompt
      : draft?.excerpt ??
        "یک متن روان و قابل‌فهم درباره‌ی یک تجربه، دغدغه یا ایده‌ی امروز بنویس.";

  const instructions =
    mode === "exercise" && exercise
      ? exercise.instructions
      : defaultInstructions;

  const writingGoal =
    mode === "exercise" && exercise
      ? exercise.targetWritingGoal
      : "نوشتن واضح، منظم و قابل‌فهم";

  const tips =
    mode === "exercise" && exercise
      ? exercise.instructions
      : [
          "از یک جمله‌ی قوی برای شروع استفاده کن.",
          "در پایان، یک جمع‌بندی کوتاه به متن اضافه کن.",
          "اگر نیاز داشتی، جمله‌ها را به‌تدریج بازنویسی کن.",
        ];


  async function handleSubmit() {
    if (!canSubmit || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    saveNow();

    try {
      const response = await submitWritingAnalysis({
        content,
        exerciseId: exercise?.id,
        mode,
      });

      if (response.success && response.submissionId) {
        router.push(`/writing/submissions/${response.submissionId}`);
      } else {
        console.error("Submission failed:", response.error);
        setAnalysisReady(true);
      }
    } catch (error) {
      console.error("Error submitting for analysis:", error);
      setAnalysisReady(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleClear() {
    clearDraft();
    setAnalysisReady(false);
    setUploadState("idle");
    setUploadedFileName(null);
  }

  function handleUpload(file?: File) {
    if (!file) {
      return;
    }

    setUploadState("uploading");

    const reader = new FileReader();

    reader.onload = () => {
      const text = typeof reader.result === "string" ? reader.result : "";

      setContent((previous) => {
        const nextValue = text.trim();

        if (!nextValue) {
          return previous;
        }

        return previous ? `${previous}\n\n---\n\n${nextValue}` : nextValue;
      });

      setUploadedFileName(file.name);
      setUploadState("done");
    };

    reader.onerror = () => {
      setUploadState("idle");
    };

    reader.readAsText(file);
  }

  return (
    <div className="space-y-6" dir="rtl">
      {showHeader && (
        <>
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
                {modeLabel}
              </div>

              <h1 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
                {title}
              </h1>

              <p className="mt-4 text-sm leading-8 text-slate-300 sm:text-base">
                {description}
              </p>
            </div>
          </section>
        </>
      )}

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <WritingPromptPanel
            title={title}
            description={description}
            prompt={prompt}
            tips={tips}
            modeLabel={modeLabel}
            instructions={instructions}
            writingGoal={writingGoal}
            targetWordCount={targetWords}
            category={exercise?.category ?? "نوشتن آزاد"}
            difficulty={exercise?.difficulty ?? "متوسط"}
            estimatedMinutes={exercise?.estimatedMinutes ?? 10}
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

          <Card className="p-4" dir="rtl">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-cyan-300">آپلود فایل</p>
                <p className="mt-1 text-sm text-slate-400">
                  متن یا فایل نوشته‌ی خودت را وارد کن و آن را به فضای نوشتن اضافه کن.
                </p>
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-slate-100"
              >
                <UploadCloud aria-hidden="true" className="h-4 w-4" />
                بارگذاری
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.md,.doc,.docx,.pdf"
              onChange={(event) => {
                handleUpload(event.target.files?.[0]);
                event.target.value = "";
              }}
              className="sr-only"
              aria-label="انتخاب فایل برای واردکردن متن"
            />

            <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              {uploadState === "uploading" ? (
                <p className="text-sm text-cyan-200">در حال خواندن فایل...</p>
              ) : uploadState === "done" && uploadedFileName ? (
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <FileText aria-hidden="true" className="h-4 w-4 text-cyan-300" />
                    {uploadedFileName}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setUploadState("idle");
                      setUploadedFileName(null);
                    }}
                    className="rounded-lg border border-white/10 p-1.5 text-slate-400"
                  >
                    <X aria-hidden="true" className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <p className="text-sm text-slate-400">
                  این بخش برای آینده‌ی API آماده است و همین حالا متن فایل را در فضای نوشتن وارد می‌کند.
                </p>
              )}
            </div>
          </Card>

          <WritingEditor
            value={content}
            onChange={setContent}
            placeholder="متن خودت را اینجا شروع کن..."
          />

          <AnalysisSubmitBar
            canSubmit={canSubmit}
            onSubmit={handleSubmit}
            onClear={handleClear}
            analysisReady={analysisReady}
            wordCount={wordCount}
            targetWords={targetWords}
            requiredWords={minimumWords}
            isSubmitting={isSubmitting}
          />
        </div>
      </section>
    </div>
  );
}
