"use client";

import Link from "next/link";

import {
  useMemo,
  useRef,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  ArrowRight,
  PenSquare,
} from "lucide-react";

import {
  submitWritingAnalysis,
} from "../../api/submit-writing-analysis";

import {
  useWritingDraft,
} from "../../hooks/use-writing-draft";

import type {
  WritingDraft,
  WritingExercise,
  WritingMode,
} from "../../types/writing.types";

import {
  DocumentDropzone,
} from "../upload/document-dropzone";

import {
  DocumentExtractionState,
} from "../upload/document-extraction-state";

import {
  UploadedDocumentCard,
} from "../upload/uploaded-document-card";

import {
  AnalysisSubmitBar,
} from "./analysis-submit-bar";

import {
  DraftStatus,
} from "./draft-status";

import {
  LiveWritingStats,
} from "./live-writing-stats";

import {
  WritingEditor,
} from "./writing-editor";

import {
  WritingPromptPanel,
} from "./writing-prompt-panel";

import {
  WritingToolbar,
} from "./writing-toolbar";

type WritingWorkspaceProps =
  Readonly<{
    mode?:
      WritingMode;

    exercise?:
      WritingExercise;

    draft?:
      WritingDraft;

    showHeader?:
      boolean;

    category?:
      string;
  }>;

type UploadState =
  | "idle"
  | "uploading"
  | "done";

type ExtractionState =
  | "idle"
  | "extracting"
  | "success"
  | "error";

function getWordCount(
  value:
    string,
): number {
  const normalized =
    value.trim();

  if (
    !normalized
  ) {
    return 0;
  }

  return normalized
    .split(
      /\s+/u,
    )
    .filter(
      Boolean,
    )
    .length;
}

function getSentenceCount(
  value:
    string,
): number {
  const normalized =
    value.trim();

  if (
    !normalized
  ) {
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
      .filter(
        Boolean,
      );

  return Math.max(
    1,
    sentences.length,
  );
}

const DEFAULT_INSTRUCTIONS =
  [
    "یک شروع روشن برای نوشته انتخاب کن.",
    "هر ایده را تا جایی که لازم است توضیح بده.",
    "در پایان متن را یک بار برای وضوح، ساختار و واژگان بازخوانی کن.",
  ] as const;

const DEFAULT_TIPS =
  [
    "در مرحله اول روی انتقال ایده تمرکز کن، نه کامل بودن متن.",
    "بعد از پایان، جمله‌هایی را که بیش از حد پیچیده شده‌اند دوباره بررسی کن.",
    "برای جلوگیری از تکرار، واژه‌ها را براساس Context جایگزین کن.",
  ] as const;

export function WritingWorkspace({
  mode =
    "free",

  exercise,

  draft,

  showHeader =
    true,

  category,
}: WritingWorkspaceProps) {
  const router =
    useRouter();

  const fileInputRef =
    useRef<HTMLInputElement | null>(
      null,
    );

  const [
    uploadState,
    setUploadState,
  ] =
    useState<UploadState>(
      "idle",
    );

  const [
    extractionState,
    setExtractionState,
  ] =
    useState<ExtractionState>(
      "idle",
    );

  const [
    uploadedFileName,
    setUploadedFileName,
  ] =
    useState<string | null>(
      null,
    );

  const [
    uploadedFileSize,
    setUploadedFileSize,
  ] =
    useState<number | null>(
      null,
    );

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
    mode ===
      "exercise" &&
    exercise
      ? exercise.id
      : draft?.id ??
        "free-writing";

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
   * هیچ Minimum/Maximum Word Limit وجود ندارد.
   *
   * فقط Text کاملاً خالی نباید Submit شود.
   */
  const canSubmit =
    content.trim().length >
    0;

  const modeLabel =
    mode ===
    "exercise"
      ? "تمرین هدف‌مند"
      : mode ===
          "draft"
        ? "ادامه‌ی نوشته"
        : "نوشتن آزاد";

  const title =
    mode ===
      "exercise" &&
    exercise
      ? exercise.title
      : mode ===
          "draft" &&
        draft
        ? draft.title
        : "نوشتن آزاد";

  const description =
    mode ===
      "exercise" &&
    exercise
      ? exercise.description
      : mode ===
          "draft" &&
        draft
        ? `ادامه‌ی متن ${draft.title} با حفظ لحن و ساختار قبلی.`
        : "بدون محدودیت تعداد کلمه بنویس؛ متن تو می‌تواند کوتاه، بلند، تمرینی یا یک نوشته کامل باشد.";

  const prompt =
    mode ===
      "exercise" &&
    exercise
      ? exercise.prompt
      : draft?.excerpt ??
        "درباره یک تجربه، دغدغه، اتفاق یا ایده‌ای که امروز در ذهن داری بنویس.";

  const instructions =
    mode ===
      "exercise" &&
    exercise
      ? exercise.instructions
      : DEFAULT_INSTRUCTIONS;

  const writingGoal =
    mode ===
      "exercise" &&
    exercise
      ? exercise.targetWritingGoal
      : "انتقال روشن ایده با ساختار و واژگان مناسب";

  const tips =
    mode ===
      "exercise" &&
    exercise
      ? exercise.instructions
      : DEFAULT_TIPS;

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
        await submitWritingAnalysis(
          {
            content,

            exerciseId:
              exercise?.id,

            mode,

            context: {
              title,

              prompt,

              writingGoal,
            },
          },
        );

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
        "Writing analysis submission failed:",
        error,
      );

      setSubmissionError(
        error instanceof
          Error
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

    setUploadState(
      "idle",
    );

    setUploadedFileName(
      null,
    );

    setUploadedFileSize(
      null,
    );

    setExtractionState(
      "idle",
    );
  }

  function handleUpload(
    file?:
      File,
  ): void {
    if (
      !file
    ) {
      return;
    }

    setSubmissionError(
      null,
    );

    setUploadState(
      "uploading",
    );

    setExtractionState(
      "extracting",
    );

    setUploadedFileName(
      file.name,
    );

    setUploadedFileSize(
      file.size,
    );

    const reader =
      new FileReader();

    reader.onload =
      (): void => {
        const text =
          typeof reader.result ===
          "string"
            ? reader.result
            : "";

        const nextValue =
          text.trim();

        if (
          !nextValue
        ) {
          setExtractionState(
            "error",
          );

          setUploadState(
            "done",
          );

          return;
        }

        setContent(
          (
            previous,
          ) =>
            previous.trim()
              ? `${previous.trim()}\n\n${nextValue}`
              : nextValue,
        );

        setExtractionState(
          "success",
        );

        setUploadState(
          "done",
        );
      };

    reader.onerror =
      (): void => {
        setExtractionState(
          "error",
        );

        setUploadState(
          "idle",
        );
      };

    reader.readAsText(
      file,
    );
  }

  function handleRemoveUpload():
    void {
    setUploadState(
      "idle",
    );

    setUploadedFileName(
      null,
    );

    setUploadedFileSize(
      null,
    );

    setExtractionState(
      "idle",
    );
  }

  return (
    <div
      className="space-y-6"
      dir="rtl"
    >
      {showHeader ? (
        <>
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

                {modeLabel}
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
                {title}
              </h1>

              <p
                className="
                  mt-4
                  max-w-3xl
                  text-sm
                  leading-8
                  text-slate-300
                  sm:text-base
                "
              >
                {description}
              </p>
            </div>
          </section>
        </>
      ) : null}

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
              title
            }
            description={
              description
            }
            prompt={
              prompt
            }
            tips={
              tips
            }
            modeLabel={
              modeLabel
            }
            instructions={
              instructions
            }
            writingGoal={
              writingGoal
            }
            category={
              category ??
              exercise?.category ??
              "نوشتن آزاد"
            }
            difficulty={
              exercise?.difficulty ??
              "متوسط"
            }
            estimatedMinutes={
              exercise?.estimatedMinutes ??
              10
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

          {uploadState ===
          "idle" ? (
            <DocumentDropzone
              onFileSelect={
                handleUpload
              }
            />
          ) : (
            <>
              <DocumentExtractionState
                state={
                  extractionState
                }
                fileName={
                  uploadedFileName ??
                  undefined
                }
                onDismiss={
                  handleRemoveUpload
                }
                onRetry={() => {
                  fileInputRef.current?.click();
                }}
              />

              {uploadedFileName ? (
                <UploadedDocumentCard
                  fileName={
                    uploadedFileName
                  }
                  fileSize={
                    uploadedFileSize ??
                    undefined
                  }
                  wordCount={
                    wordCount
                  }
                  status={
                    extractionState ===
                    "success"
                      ? "ready"
                      : extractionState ===
                          "error"
                        ? "error"
                        : "uploading"
                  }
                  onRemove={
                    handleRemoveUpload
                  }
                />
              ) : null}

              <input
                ref={
                  fileInputRef
                }
                type="file"
                accept=".txt,.md,.doc,.docx,.pdf"
                onChange={(
                  event,
                ) => {
                  handleUpload(
                    event.target
                      .files?.[0],
                  );

                  event.target.value =
                    "";
                }}
                className="sr-only"
                aria-label="انتخاب فایل برای واردکردن متن"
              />
            </>
          )}

          <WritingEditor
            value={
              content
            }
            onChange={(
              value,
            ) => {
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
            }}
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
    </div>
  );
}