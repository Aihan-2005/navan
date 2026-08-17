"use client";

import {
  useMemo,
  useState,
} from "react";

import Link from "next/link";

import {
  useRouter,
} from "next/navigation";

import {
  ArrowRight,
  Clock,
  Infinity,
  PenSquare,
  Sparkles,
} from "lucide-react";

import {
  WritingPromptPanel,
} from "../workspace/writing-prompt-panel";

import {
  DraftStatus,
} from "../workspace/draft-status";

import {
  LiveWritingStats,
} from "../workspace/live-writing-stats";

import {
  WritingToolbar,
} from "../workspace/writing-toolbar";

import {
  WritingEditor,
} from "../workspace/writing-editor";

import {
  AnalysisSubmitBar,
} from "../workspace/analysis-submit-bar";

import {
  useWritingDraft,
} from "../../hooks/use-writing-draft";

import {
  submitWritingAnalysis,
} from "../../api/submit-writing-analysis";

import type {
  WritingExercise,
} from "../../types/writing.types";

type ExerciseWritingViewProps =
  Readonly<{
    exercise:
      WritingExercise;
  }>;

function getWordCount(
  value:
    string,
): number {
  const normalized =
    value.trim();

  if (!normalized) {
    return 0;
  }

  return normalized
    .split(/\s+/u)
    .filter(Boolean)
    .length;
}

function getSentenceCount(
  value:
    string,
): number {
  const normalized =
    value.trim();

  if (!normalized) {
    return 0;
  }

  const sentences =
    normalized
      .split(
        /[.!?]+(?:\s+|$)/u,
      )
      .map(
        (
          sentence,
        ) =>
          sentence.trim(),
      )
      .filter(Boolean);

  return Math.max(
    1,
    sentences.length,
  );
}

export function ExerciseWritingView({
  exercise,
}: ExerciseWritingViewProps) {
  const router =
    useRouter();

  const [
    isSubmitting,
    setIsSubmitting,
  ] =
    useState(false);

  const [
    submissionError,
    setSubmissionError,
  ] =
    useState<string | null>(
      null,
    );

  const sessionKey =
    exercise.id;

  const {
    content,
    setContent,

    saveStatus,
    lastSavedAt,

    saveNow,
    clearDraft,
  } =
    useWritingDraft(
      sessionKey,
    );

  const wordCount =
    useMemo(
      () =>
        getWordCount(
          content,
        ),
      [
        content,
      ],
    );

  const sentenceCount =
    useMemo(
      () =>
        getSentenceCount(
          content,
        ),
      [
        content,
      ],
    );

  const characterCount =
    content.length;

  /**
   * Writing دیگر Minimum/Maximum Word Limit ندارد.
   *
   * تنها شرط ارسال این است که متن واقعاً
   * محتوایی غیر از whitespace داشته باشد.
   */
  const canSubmit =
    content.trim().length >
    0;

  const tips =
    exercise.instructions;

  async function handleSubmit():
    Promise<void> {
    if (
      !canSubmit ||
      isSubmitting
    ) {
      return;
    }

    setSubmissionError(
      null,
    );

    setIsSubmitting(
      true,
    );

    saveNow();

    try {
      const response =
        await submitWritingAnalysis({
          content,

          exerciseId:
            exercise.id,

          mode:
            "exercise",

          context: {
            title:
              exercise.title,

            prompt:
              exercise.prompt,

            writingGoal:
              exercise.targetWritingGoal,
          },
        });

      if (
        response.success &&
        response.submissionId
      ) {
        router.push(
          `/writing/submissions/${response.submissionId}`,
        );

        return;
      }

      setSubmissionError(
        response.error ??
          "ارسال متن برای تحلیل انجام نشد.",
      );
    } catch (
      error
    ) {
      console.error(
        "Error submitting writing exercise for analysis:",
        error,
      );

      setSubmissionError(
        error instanceof Error
          ? error.message
          : "در زمان تحلیل متن خطای غیرمنتظره‌ای رخ داد.",
      );
    } finally {
      setIsSubmitting(
        false,
      );
    }
  }

  function handleClear():
    void {
    clearDraft();

    setSubmissionError(
      null,
    );
  }

  function handleContentChange(
    value:
      string,
  ): void {
    setContent(
      value,
    );

    if (
      submissionError
    ) {
      setSubmissionError(
        null,
      );
    }
  }

  return (
    <main
      className="
        mx-auto
        w-full
        max-w-7xl
        space-y-6
      "
      dir="rtl"
    >
      <Link
        href="/writing"
        className="
          inline-flex
          items-center
          gap-2
          text-sm
          text-slate-400
          transition
          hover:text-white
        "
      >
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4"
        />

        بازگشت به صفحه نوشتن
      </Link>

      <section
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-cyan-400/15
          bg-[linear-gradient(135deg,rgba(8,47,73,0.75),rgba(15,23,42,0.85))]
          p-6
          sm:p-8
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -left-24
            -top-24
            h-64
            w-64
            rounded-full
            bg-cyan-500/20
            blur-3xl
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -bottom-24
            right-10
            h-64
            w-64
            rounded-full
            bg-violet-500/15
            blur-3xl
          "
        />

        <div className="relative">
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-2
              text-sm
              text-cyan-300
            "
          >
            <PenSquare
              aria-hidden="true"
              className="h-4 w-4"
            />

            <span>
              {exercise.category}
            </span>
          </div>

          <h1
            className="
              mt-4
              text-3xl
              font-bold
              leading-tight
              text-white
              sm:text-4xl
            "
          >
            {exercise.title}
          </h1>

          <p
            className="
              mt-4
              max-w-4xl
              text-sm
              leading-8
              text-slate-300
              sm:text-base
            "
          >
            {exercise.description}
          </p>

          <div
            className="
              mt-6
              flex
              flex-wrap
              items-center
              gap-4
              text-sm
              text-slate-400
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <Sparkles
                aria-hidden="true"
                className="
                  h-4
                  w-4
                  text-cyan-300
                "
              />

              <span>
                {exercise.difficulty}
              </span>
            </div>

            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <Clock
                aria-hidden="true"
                className="
                  h-4
                  w-4
                  text-cyan-300
                "
              />

              <span>
                حدود{" "}
                {exercise.estimatedMinutes}{" "}
                دقیقه
              </span>
            </div>

            <div
              className="
                flex
                items-center
                gap-2
                text-cyan-300
              "
            >
              <Infinity
                aria-hidden="true"
                className="h-4 w-4"
              />

              <span>
                بدون محدودیت تعداد کلمه
              </span>
            </div>
          </div>
        </div>
      </section>

      <section
        className="
          grid
          gap-6
          xl:grid-cols-[0.95fr_1.05fr]
        "
      >
        <div className="space-y-6">
          <WritingPromptPanel
            title={
              exercise.title
            }
            description={
              exercise.description
            }
            prompt={
              exercise.prompt
            }
            tips={
              tips
            }
            modeLabel="تمرین هدف‌مند"
            instructions={
              exercise.instructions
            }
            writingGoal={
              exercise.targetWritingGoal
            }
            category={
              exercise.category
            }
            difficulty={
              exercise.difficulty
            }
            estimatedMinutes={
              exercise.estimatedMinutes
            }
          />

          <LiveWritingStats
            wordCount={
              wordCount
            }
            characterCount={
              characterCount
            }
            sentenceCount={
              sentenceCount
            }
          />

          <DraftStatus
            status={
              saveStatus
            }
            lastSavedAt={
              lastSavedAt
            }
          />
        </div>

        <div className="space-y-6">
          <WritingToolbar
            onSaveNow={
              saveNow
            }
            onClear={
              handleClear
            }
            saveStatus={
              saveStatus
            }
          />

          <WritingEditor
            value={
              content
            }
            onChange={
              handleContentChange
            }
            placeholder="متن خودت را اینجا شروع کن..."
          />

          <AnalysisSubmitBar
            canSubmit={
              canSubmit
            }
            onSubmit={() => {
              void handleSubmit();
            }}
            onClear={
              handleClear
            }
            wordCount={
              wordCount
            }
            isSubmitting={
              isSubmitting
            }
            errorMessage={
              submissionError
            }
          />
        </div>
      </section>
    </main>
  );
}