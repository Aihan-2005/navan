
"use client";

import {
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Headphones,
  Lightbulb,
  Send,
} from "lucide-react";

import { Card } from "../../../../components/ui/card";

import {
  LISTENING_ACCENT_LABELS,
  LISTENING_CONTENT_TYPE_LABELS,
  LISTENING_PRACTICE_MODE_LABELS,
} from "../../constants/listening.constants";

import {
  useListeningDraft,
} from "../../hooks/use-listening-draft";

import type {
  ListeningAnswerSource,
  ListeningContentDetail,
  ListeningNotesUploadResult,
  ListeningPracticeMode,
} from "../../types/listening.types";

import {
  ListeningNotesUploader,
} from "../notes-upload/listening-notes-uploader";

import {
  ListeningAudioPlayer,
} from "../player/listening-audio-player";

import {
  TranscriptionEditor,
} from "./transcription-editor";

type ListeningPracticeWorkspaceProps =
  Readonly<{
    content: ListeningContentDetail;
  }>;

const numberFormatter =
  new Intl.NumberFormat("fa-IR");

const ANSWER_SOURCE_LABELS = {
  typed: "تایپ مستقیم",
  document: "فایل متنی",
  image: "تصویر نوشته",
} satisfies Record<
  ListeningAnswerSource,
  string
>;

function getWordCount(
  value: string,
): number {
  const normalizedValue =
    value.trim();

  if (!normalizedValue) {
    return 0;
  }

  return normalizedValue
    .split(/\s+/u)
    .filter(Boolean).length;
}

function mapUploadResultToAnswerSource(
  result: ListeningNotesUploadResult,
): ListeningAnswerSource {
  return result.fileKind === "image"
    ? "image"
    : "document";
}

export function ListeningPracticeWorkspace({
  content,
}: ListeningPracticeWorkspaceProps) {
  const [practiceMode, setPracticeMode] =
    useState<ListeningPracticeMode>(
      content.availablePracticeModes[0] ??
        "full_dictation",
    );

  const [answerSource, setAnswerSource] =
    useState<ListeningAnswerSource>(
      "typed",
    );

  const [submissionReady, setSubmissionReady] =
    useState(false);

  const {
    transcript,
    saveStatus,
    lastSavedAt,

    setTranscript,
    saveNow,
    clearDraft,
  } = useListeningDraft({
    contentId: content.id,
  });

  const wordCount = useMemo(
    () => getWordCount(transcript),
    [transcript],
  );

  const canSubmit =
    wordCount >=
    content.minimumTranscriptWords;

  function invalidateSubmission(): void {
    if (submissionReady) {
      setSubmissionReady(false);
    }
  }

  function handleTranscriptChange(
    value: string,
  ): void {
    setTranscript(value);
    invalidateSubmission();
  }

  function handleReplaceTranscript(
    text: string,
    result: ListeningNotesUploadResult,
  ): void {
    setTranscript(text);

    setAnswerSource(
      mapUploadResultToAnswerSource(
        result,
      ),
    );

    setSubmissionReady(false);
  }

  function handleAppendTranscript(
    text: string,
    result: ListeningNotesUploadResult,
  ): void {
    const normalizedCurrentTranscript =
      transcript.trim();

    const nextTranscript =
      normalizedCurrentTranscript
        ? `${normalizedCurrentTranscript}\n\n${text}`
        : text;

    setTranscript(nextTranscript);

    setAnswerSource(
      mapUploadResultToAnswerSource(
        result,
      ),
    );

    setSubmissionReady(false);
  }

  function handleClearTranscript(): void {
    clearDraft();

    setAnswerSource("typed");
    setSubmissionReady(false);
  }

  function handlePrepareAnalysis(): void {
    if (!canSubmit) {
      return;
    }

    saveNow();
    setSubmissionReady(true);
  }

  return (
    <main
      className="mx-auto w-full max-w-7xl space-y-6"
      aria-labelledby="listening-practice-title"
    >
      <Link
        href="/listening"
        className="
          inline-flex items-center gap-2
          text-sm text-slate-400
          transition hover:text-white
        "
      >
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4"
        />

        بازگشت به تمرین‌های شنیداری
      </Link>

      <section
        className="
          relative overflow-hidden rounded-3xl
          border border-cyan-400/15
          bg-white/[0.035]
          p-6 sm:p-8
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute
            -left-24 -top-24
            h-64 w-64 rounded-full
            bg-cyan-500/15 blur-3xl
          "
        />

        <div className="relative">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="
                rounded-full bg-cyan-400/10
                px-3 py-1 text-xs
                text-cyan-200
              "
            >
              {
                LISTENING_CONTENT_TYPE_LABELS[
                  content.contentType
                ]
              }
            </span>

            <span
              className="
                rounded-full bg-white/[0.05]
                px-3 py-1 text-xs
                text-slate-400
              "
            >
              سطح {content.cefrLevel}
            </span>

            <span
              className="
                rounded-full bg-white/[0.05]
                px-3 py-1 text-xs
                text-slate-400
              "
            >
              {
                LISTENING_ACCENT_LABELS[
                  content.accent
                ]
              }
            </span>

            <span
              className="
                inline-flex items-center gap-1.5
                rounded-full bg-white/[0.05]
                px-3 py-1 text-xs
                text-slate-400
              "
            >
              <Clock3
                aria-hidden="true"
                className="h-3.5 w-3.5"
              />

              حدود{" "}
              {numberFormatter.format(
                content.estimatedPracticeMinutes,
              )}{" "}
              دقیقه
            </span>
          </div>

          <h1
            id="listening-practice-title"
            className="
              mt-5 text-3xl font-bold
              leading-tight text-white
              sm:text-4xl
            "
          >
            {content.title}
          </h1>

          {content.description ? (
            <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-400 sm:text-base">
              {content.description}
            </p>
          ) : null}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-12">
        <aside className="space-y-6 xl:col-span-4">
          <Card className="p-5 sm:p-6">
            <div className="flex items-center gap-2 text-violet-300">
              <BookOpenCheck
                aria-hidden="true"
                className="h-5 w-5"
              />

              <h2 className="text-sm font-medium">
                نوع تمرین
              </h2>
            </div>

            <div className="mt-4 space-y-2">
              {content.availablePracticeModes.map(
                (mode) => {
                  const active =
                    practiceMode === mode;

                  return (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => {
                        setPracticeMode(
                          mode,
                        );

                        setSubmissionReady(
                          false,
                        );
                      }}
                      className={`
                        flex w-full items-center
                        justify-between rounded-xl
                        border px-4 py-3
                        text-right text-sm
                        transition
                        ${
                          active
                            ? "border-cyan-300/20 bg-cyan-400/10 text-cyan-100"
                            : "border-white/[0.06] bg-white/[0.025] text-slate-400 hover:bg-white/[0.05]"
                        }
                      `}
                    >
                      <span>
                        {
                          LISTENING_PRACTICE_MODE_LABELS[
                            mode
                          ]
                        }
                      </span>

                      {active ? (
                        <CheckCircle2
                          aria-hidden="true"
                          className="h-4 w-4 text-cyan-300"
                        />
                      ) : null}
                    </button>
                  );
                },
              )}
            </div>
          </Card>

          <Card className="p-5 sm:p-6">
            <div className="flex items-center gap-2 text-cyan-300">
              <Headphones
                aria-hidden="true"
                className="h-5 w-5"
              />

              <h2 className="text-sm font-medium">
                روش انجام تمرین
              </h2>
            </div>

            <ol className="mt-4 space-y-4">
              {content.instructions.map(
                (instruction, index) => (
                  <li
                    key={instruction}
                    className="
                      flex items-start gap-3
                      text-sm leading-7
                      text-slate-400
                    "
                  >
                    <span
                      className="
                        mt-1 flex h-6 w-6
                        shrink-0 items-center
                        justify-center rounded-lg
                        bg-white/[0.05]
                        text-[10px]
                        text-slate-500
                      "
                    >
                      {numberFormatter.format(
                        index + 1,
                      )}
                    </span>

                    <span>
                      {instruction}
                    </span>
                  </li>
                ),
              )}
            </ol>
          </Card>

          {content.hintWords.length > 0 ? (
            <Card className="p-5 sm:p-6">
              <div className="flex items-center gap-2 text-amber-300">
                <Lightbulb
                  aria-hidden="true"
                  className="h-5 w-5"
                />

                <h2 className="text-sm font-medium">
                  واژگان راهنما
                </h2>
              </div>

              <div
                dir="ltr"
                className="
                  mt-4 flex flex-wrap
                  justify-end gap-2
                "
              >
                {content.hintWords.map(
                  (word) => (
                    <span
                      key={word}
                      className="
                        rounded-lg border
                        border-amber-400/10
                        bg-amber-400/[0.05]
                        px-3 py-1.5
                        text-xs
                        text-amber-100/80
                      "
                    >
                      {word}
                    </span>
                  ),
                )}
              </div>
            </Card>
          ) : null}
        </aside>

        <div className="space-y-6 xl:col-span-8">
          <ListeningAudioPlayer
            audioUrl={content.audioUrl}
            title={content.title}
          />

          <TranscriptionEditor
            value={transcript}
            minimumWords={
              content.minimumTranscriptWords
            }
            saveStatus={saveStatus}
            lastSavedAt={lastSavedAt}
            onChange={
              handleTranscriptChange
            }
            onSave={saveNow}
            onClear={
              handleClearTranscript
            }
          />

          <ListeningNotesUploader
            onReplaceTranscript={
              handleReplaceTranscript
            }
            onAppendTranscript={
              handleAppendTranscript
            }
          />

          <Card className="p-5 sm:p-6">
            <div
              className="
                flex flex-col gap-5
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div>
                <div className="flex items-center gap-2 text-violet-300">
                  <BrainCircuit
                    aria-hidden="true"
                    className="h-5 w-5"
                  />

                  <span className="text-sm font-medium">
                    تحلیل هوشمند
                  </span>
                </div>

                <h2 className="mt-2 text-lg font-bold text-white">
                  پاسخ را برای بررسی آماده کن
                </h2>

                <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
                  <span>
                    روش پاسخ:{" "}
                    <strong className="font-medium text-slate-300">
                      {
                        ANSWER_SOURCE_LABELS[
                          answerSource
                        ]
                      }
                    </strong>
                  </span>

                  <span>
                    تعداد کلمات:{" "}
                    <strong className="font-medium text-slate-300">
                      {numberFormatter.format(
                        wordCount,
                      )}
                    </strong>
                  </span>
                </div>

                <p className="mt-3 text-xs leading-6 text-slate-600">
                  در فاز تحلیل، Transcript با متن مرجع
                  مقایسه و کلمات حذف‌شده، اضافه‌شده و
                  جایگزین‌شده مشخص خواهند شد.
                </p>
              </div>

              <button
                type="button"
                onClick={
                  handlePrepareAnalysis
                }
                disabled={!canSubmit}
                className="
                  inline-flex min-h-11 shrink-0
                  items-center justify-center
                  gap-2 rounded-xl
                  bg-cyan-400 px-5 py-2.5
                  text-sm font-bold
                  text-slate-950 transition
                  hover:bg-cyan-300
                  disabled:cursor-not-allowed
                  disabled:bg-white/[0.05]
                  disabled:text-slate-600
                "
              >
                <Send
                  aria-hidden="true"
                  className="h-4 w-4"
                />

                آماده‌سازی تحلیل
              </button>
            </div>

            {submissionReady ? (
              <div
                role="status"
                className="
                  mt-5 rounded-2xl
                  border border-emerald-400/15
                  bg-emerald-400/[0.05]
                  px-5 py-4
                "
              >
                <div className="flex items-center gap-2 text-sm font-medium text-emerald-200">
                  <CheckCircle2
                    aria-hidden="true"
                    className="h-4 w-4"
                  />

                  Transcript آماده ارسال است
                </div>

                <p className="mt-2 text-xs leading-6 text-slate-500">
                  نوع تمرین، روش ثبت پاسخ و متن فعلی
                  آماده ساخت Attempt و ارسال به سرویس
                  تحلیل هستند.
                </p>
              </div>
            ) : null}
          </Card>
        </div>
      </section>
    </main>
  );
}