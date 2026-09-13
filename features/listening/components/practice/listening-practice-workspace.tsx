"use client";

import Link from "next/link";

import {
  useRouter,
} from "next/navigation";

import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  ArrowRight,
  BookOpenCheck,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Headphones,
  Lightbulb,
  LoaderCircle,
  LockKeyhole,
  Save,
  Send,
} from "lucide-react";

import {
  createListeningAttempt,
} from "../../api/create-listening-attempt";

import {
  submitListeningAttempt,
} from "../../api/submit-listening-attempt";

import {
  updateListeningDraft,
} from "../../api/update-listening-draft";

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
  ListeningPlaybackSnapshot,
  ListeningPracticeMode,
} from "../../types/listening.types";

import {
  ListeningNotesUploader,
} from "../notes-upload/listening-notes-uploader";

import {
  ListeningAudioPlayer,
} from "../player/listening-audio-player";

import {
  ListeningListenOnlySession,
} from "./listening-listen-only-session";

import {
  TranscriptionEditor,
} from "./transcription-editor";

type ListeningPracticeWorkspaceProps =
  Readonly<{
    content:
      ListeningContentDetail;
  }>;

type RemoteSaveStatus =
  | "idle"
  | "saving"
  | "saved"
  | "error";

const numberFormatter =
  new Intl.NumberFormat(
    "fa-IR",
  );

const ANSWER_SOURCE_LABELS = {
  typed:
    "تایپ مستقیم",

  document:
    "فایل متنی",

  image:
    "تصویر نوشته",
} satisfies Record<
  ListeningAnswerSource,
  string
>;

const INITIAL_PLAYBACK_SNAPSHOT:
  ListeningPlaybackSnapshot = {
    isReady:
      false,

    isPlaying:
      false,

    currentTime:
      0,

    duration:
      0,

    playbackRate:
      1,

    progressPercent:
      0,
  };

const LISTEN_ONLY_INSTRUCTIONS = [
  "بار اول بدون توقف فقط برای فهم ایده اصلی گوش بده.",
  "در بار دوم روی جزئیات، اعداد، نام‌ها و کلمات کلیدی تمرکز کن.",
  "برای بخش سخت فقط همان چند ثانیه را تکرار کن.",
  "در پایان میزان درکت را ثبت کن.",
] as const;

const TRANSCRIPT_ANALYSIS_MODES:
  readonly ListeningPracticeMode[] = [
    "full_dictation",
    "guided_dictation",
  ];

const BACKEND_TASK_MODES:
  readonly ListeningPracticeMode[] = [
    "fill_in_the_blank",
    "comprehension",
    "shadowing",
  ];

const MODE_DESCRIPTIONS:
  Record<
    ListeningPracticeMode,
    string
  > = {
  listen_only:
    "گوش دادن فعال بدون نیاز به نوشتن.",

  full_dictation:
    "هر چیزی را که می‌شنوی به‌صورت کامل بنویس.",

  guided_dictation:
    "Dictation همراه با Hint و راهنمای واژگان.",

  fill_in_the_blank:
    "جمله یا Transcript ناقص از Backend دریافت می‌شود و جاهای خالی تکمیل می‌شوند.",

  comprehension:
    "سؤال‌های درک مطلب براساس Audio Task از Backend دریافت می‌شوند.",

  shadowing:
    "تکرار هم‌زمان با گوینده و ارسال Audio Response برای Speech Analysis.",
};

function getWordCount(
  value:
    string,
): number {
  const normalizedValue =
    value.trim();

  if (
    !normalizedValue
  ) {
    return 0;
  }

  return normalizedValue
    .split(
      /\s+/u,
    )
    .filter(
      Boolean,
    )
    .length;
}

function mapUploadResultToAnswerSource(
  result:
    ListeningNotesUploadResult,
): ListeningAnswerSource {
  return result.fileKind ===
    "image"
    ? "image"
    : "document";
}

function isTranscriptAnalysisMode(
  mode:
    ListeningPracticeMode,
): boolean {
  return TRANSCRIPT_ANALYSIS_MODES.includes(
    mode,
  );
}

function requiresBackendTask(
  mode:
    ListeningPracticeMode,
): boolean {
  return BACKEND_TASK_MODES.includes(
    mode,
  );
}

export function ListeningPracticeWorkspace({
  content,
}: ListeningPracticeWorkspaceProps) {
  const router =
    useRouter();

  const availablePracticeModes =
    useMemo<ListeningPracticeMode[]>(
      () => {
        const modes =
          new Set<ListeningPracticeMode>([
            "listen_only",
            ...content.availablePracticeModes,
          ]);

        return Array.from(
          modes,
        );
      },
      [
        content.availablePracticeModes,
      ],
    );

  const [
    practiceMode,
    setPracticeMode,
  ] =
    useState<ListeningPracticeMode>(
      "listen_only",
    );

  const [
    answerSource,
    setAnswerSource,
  ] =
    useState<ListeningAnswerSource>(
      "typed",
    );

  const [
    playbackSnapshot,
    setPlaybackSnapshot,
  ] =
    useState<ListeningPlaybackSnapshot>(
      INITIAL_PLAYBACK_SNAPSHOT,
    );

  const [
    completedListenPasses,
    setCompletedListenPasses,
  ] =
    useState(
      0,
    );

  const [
    attemptId,
    setAttemptId,
  ] =
    useState<string | null>(
      null,
    );

  const [
    remoteSaveStatus,
    setRemoteSaveStatus,
  ] =
    useState<RemoteSaveStatus>(
      "idle",
    );

  const [
    submissionError,
    setSubmissionError,
  ] =
    useState<string | null>(
      null,
    );

  const [
    isSubmitting,
    setIsSubmitting,
  ] =
    useState(
      false,
    );

  /**
   * مانع ایجاد چند Attempt هم‌زمان
   * هنگام چند کلیک یا چند عملیات async می‌شود.
   */
  const createPromiseRef =
    useRef<Promise<string> | null>(
      null,
    );

  /**
   * آخرین request مربوط به autosave.
   * قبل از request جدید cancel می‌شود.
   */
  const remoteSaveAbortRef =
    useRef<AbortController | null>(
      null,
    );

  /**
   * Playback را جدا از state نگه می‌داریم
   * تا autosave مجبور نباشد با هر tick پلیر
   * دوباره schedule شود.
   */
  const playbackSnapshotRef =
    useRef<ListeningPlaybackSnapshot>(
      INITIAL_PLAYBACK_SNAPSHOT,
    );

  const {
    transcript,

    saveStatus,
    lastSavedAt,

    setTranscript,
    saveNow,
    clearDraft,
  } =
    useListeningDraft({
      contentId:
        content.id,
    });

  const wordCount =
    useMemo(
      () =>
        getWordCount(
          transcript,
        ),
      [
        transcript,
      ],
    );

  const isListenOnly =
    practiceMode ===
    "listen_only";

  const transcriptMode =
    isTranscriptAnalysisMode(
      practiceMode,
    );

  const backendTaskRequired =
    requiresBackendTask(
      practiceMode,
    );

  const canSubmit =
    transcriptMode &&
    wordCount >=
      content.minimumTranscriptWords &&
    !isSubmitting;

  const instructions =
    isListenOnly
      ? LISTEN_ONLY_INSTRUCTIONS
      : content.instructions;

  const handlePlaybackSnapshot =
    useCallback(
      (
        snapshot:
          ListeningPlaybackSnapshot,
      ): void => {
        playbackSnapshotRef.current =
          snapshot;

        setPlaybackSnapshot(
          snapshot,
        );
      },
      [],
    );

  const handleAudioEnded =
    useCallback(
      (): void => {
        setCompletedListenPasses(
          (
            current,
          ) =>
            current +
            1,
        );
      },
      [],
    );

  useEffect(() => {
    return () => {
      remoteSaveAbortRef.current?.abort();
    };
  }, []);

  /**
   * Remote autosave
   *
   * نکته:
   * contentId متعلق به Attempt است و بعد از create
   * دیگر در PATCH ارسال نمی‌شود.
   */
  useEffect(() => {
    if (
      !attemptId ||
      !transcriptMode
    ) {
      return;
    }

    const timeoutId =
      window.setTimeout(
        () => {
          remoteSaveAbortRef.current?.abort();

          const controller =
            new AbortController();

          remoteSaveAbortRef.current =
            controller;

          const currentPlayback =
            playbackSnapshotRef.current;

          setRemoteSaveStatus(
            "saving",
          );

          void updateListeningDraft(
            attemptId,
            {
              practiceMode,

              answerSource,

              transcript,

              currentPositionSeconds:
                currentPlayback.currentTime,

              playbackRate:
                currentPlayback.playbackRate,
            },
            controller.signal,
          )
            .then(
              () => {
                if (
                  controller.signal.aborted
                ) {
                  return;
                }

                setRemoteSaveStatus(
                  "saved",
                );
              },
            )
            .catch(
              (error) => {
                if (
                  controller.signal.aborted
                ) {
                  return;
                }

                console.error(
                  "Listening remote autosave failed:",
                  error,
                );

                setRemoteSaveStatus(
                  "error",
                );
              },
            );
        },
        1500,
      );

    return () => {
      window.clearTimeout(
        timeoutId,
      );
    };
  }, [
    answerSource,
    attemptId,
    practiceMode,
    transcript,
    transcriptMode,
  ]);

  /**
   * Attempt فقط با فیلدهای immutable موردنیاز
   * create می‌شود.
   *
   * Draft data بلافاصله بعد از create
   * از طریق PATCH ذخیره می‌شود.
   */
  async function ensureAttempt(): Promise<string> {
    if (
      attemptId
    ) {
      return attemptId;
    }

    if (
      createPromiseRef.current
    ) {
      return createPromiseRef.current;
    }

    const promise =
      createListeningAttempt({
        contentId:
          content.id,

        practiceMode,
      }).then(
        (
          result,
        ) => {
          const createdAttemptId =
            result.attemptId?.trim();

          if (
            !createdAttemptId
          ) {
            throw new Error(
              "Backend شناسه Attempt معتبری برنگرداند.",
            );
          }

          setAttemptId(
            createdAttemptId,
          );

          return createdAttemptId;
        },
      );

    createPromiseRef.current =
      promise;

    try {
      return await promise;
    } finally {
      if (
        createPromiseRef.current ===
        promise
      ) {
        createPromiseRef.current =
          null;
      }
    }
  }

  function handlePracticeModeChange(
    mode:
      ListeningPracticeMode,
  ): void {
    if (
      mode ===
      practiceMode
    ) {
      return;
    }

    remoteSaveAbortRef.current?.abort();

    setPracticeMode(
      mode,
    );

    /**
     * هر Practice Mode یک Attempt مستقل دارد.
     */
    setAttemptId(
      null,
    );

    setRemoteSaveStatus(
      "idle",
    );

    setSubmissionError(
      null,
    );
  }

  function handleTranscriptChange(
    value:
      string,
  ): void {
    setTranscript(
      value,
    );

    if (
      answerSource !==
      "typed"
    ) {
      setAnswerSource(
        "typed",
      );
    }
  }

  function handleReplaceTranscript(
    text:
      string,

    result:
      ListeningNotesUploadResult,
  ): void {
    setTranscript(
      text,
    );

    setAnswerSource(
      mapUploadResultToAnswerSource(
        result,
      ),
    );
  }

  function handleAppendTranscript(
    text:
      string,

    result:
      ListeningNotesUploadResult,
  ): void {
    const normalizedCurrent =
      transcript.trim();

    setTranscript(
      normalizedCurrent
        ? `${normalizedCurrent}\n\n${text}`
        : text,
    );

    setAnswerSource(
      mapUploadResultToAnswerSource(
        result,
      ),
    );
  }

  function handleClearTranscript(): void {
    clearDraft();

    setAnswerSource(
      "typed",
    );

    setSubmissionError(
      null,
    );
  }

  async function handleSaveDraft(): Promise<void> {
    saveNow();

    if (
      !transcriptMode
    ) {
      return;
    }

    setSubmissionError(
      null,
    );

    try {
      setRemoteSaveStatus(
        "saving",
      );

      const id =
        await ensureAttempt();

      const currentPlayback =
        playbackSnapshotRef.current;

      await updateListeningDraft(
        id,
        {
          practiceMode,

          answerSource,

          transcript,

          currentPositionSeconds:
            currentPlayback.currentTime,

          playbackRate:
            currentPlayback.playbackRate,
        },
      );

      setRemoteSaveStatus(
        "saved",
      );
    } catch (error) {
      console.error(
        "Listening draft save failed:",
        error,
      );

      setRemoteSaveStatus(
        "error",
      );

      setSubmissionError(
        error instanceof Error
          ? error.message
          : "ذخیره Draft ناموفق بود.",
      );
    }
  }

  async function handleSubmit(): Promise<void> {
    if (
      !canSubmit
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
      const id =
        await ensureAttempt();

      const currentPlayback =
        playbackSnapshotRef.current;

      /**
       * قبل از submit آخرین Draft را sync می‌کنیم.
       */
      await updateListeningDraft(
        id,
        {
          practiceMode,

          answerSource,

          transcript,

          currentPositionSeconds:
            currentPlayback.currentTime,

          playbackRate:
            currentPlayback.playbackRate,
        },
      );

      /**
       * Submit contract:
       *
       * completedListenPasses و clientCompletedAt
       * فعلاً جزو schema نیستند.
       * وقتی Backend این metadataها را پشتیبانی کند
       * باید ابتدا schema/type گسترش داده شود.
       */
      await submitListeningAttempt(
        id,
        {
          contentId:
            content.id,

          practiceMode,

          answerSource,

          transcript,

          currentPositionSeconds:
            currentPlayback.currentTime,

          playbackRate:
            currentPlayback.playbackRate,
        },
      );

      router.push(
        `/listening/attempts/${encodeURIComponent(
          id,
        )}`,
      );
    } catch (error) {
      console.error(
        "Listening submit failed:",
        error,
      );

      setSubmissionError(
        error instanceof Error
          ? error.message
          : "ارسال تمرین برای تحلیل ناموفق بود.",
      );
    } finally {
      setIsSubmitting(
        false,
      );
    }
  }

  return (
    <main
      dir="rtl"
      aria-labelledby="listening-practice-title"
      className="
        mx-auto
        w-full
        max-w-[1180px]
        space-y-6
        pb-14
      "
    >
      <Link
        href="/listening"
        className="
          inline-flex
          items-center
          gap-2
          text-sm
          font-medium
          text-[#64748B]
          transition
          hover:text-[#00685F]
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
          relative
          overflow-hidden
          rounded-[28px]
          border
          border-[#CBE3DF]
          bg-[linear-gradient(135deg,#EAF8F5_0%,#FFFFFF_56%,#F6F1FF_100%)]
          p-6
          shadow-[0_14px_40px_rgba(15,23,42,0.055)]
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
            bg-[#14B8A6]/10
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
            "
          >
            <Badge tone="teal">
              {
                LISTENING_CONTENT_TYPE_LABELS[
                  content.contentType
                ]
              }
            </Badge>

            <Badge tone="purple">
              سطح{" "}
              {
                content.cefrLevel
              }
            </Badge>

            <Badge tone="neutral">
              {
                LISTENING_ACCENT_LABELS[
                  content.accent
                ]
              }
            </Badge>

            <Badge tone="neutral">
              <Clock3
                aria-hidden="true"
                className="h-3.5 w-3.5"
              />

              حدود{" "}
              {numberFormatter.format(
                content.estimatedPracticeMinutes,
              )}{" "}
              دقیقه
            </Badge>
          </div>

          <h1
            id="listening-practice-title"
            className="
              mt-5
              text-3xl
              font-black
              leading-tight
              text-[#172321]
              sm:text-4xl
            "
          >
            {content.title}
          </h1>

          {content.description ? (
            <p
              className="
                mt-4
                max-w-3xl
                text-sm
                leading-8
                text-[#5F6D6A]
                sm:text-base
              "
            >
              {
                content.description
              }
            </p>
          ) : null}
        </div>
      </section>

      <section
        className="
          grid
          gap-6
          xl:grid-cols-[300px_minmax(0,1fr)]
        "
      >
        <aside className="space-y-5">
          <section
            className="
              rounded-2xl
              border
              border-[#DCE7E5]
              bg-white
              p-5
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <BookOpenCheck
                aria-hidden="true"
                className="
                  h-5
                  w-5
                  text-[#712AE2]
                "
              />

              <h2
                className="
                  text-sm
                  font-black
                  text-[#172321]
                "
              >
                نوع تمرین
              </h2>
            </div>

            <div className="mt-4 space-y-2">
              {availablePracticeModes.map(
                (
                  mode,
                ) => {
                  const active =
                    practiceMode ===
                    mode;

                  const backendMode =
                    requiresBackendTask(
                      mode,
                    );

                  return (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => {
                        handlePracticeModeChange(
                          mode,
                        );
                      }}
                      className={`
                        w-full
                        rounded-xl
                        border
                        px-4
                        py-3
                        text-right
                        transition
                        ${
                          active
                            ? "border-[#A9D4CD] bg-[#EAF7F5]"
                            : "border-[#E2E8E6] bg-[#FAFCFB] hover:border-[#B9D7D1]"
                        }
                      `}
                    >
                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          gap-3
                        "
                      >
                        <span
                          className={`
                            text-sm
                            font-bold
                            ${
                              active
                                ? "text-[#00685F]"
                                : "text-[#334155]"
                            }
                          `}
                        >
                          {
                            LISTENING_PRACTICE_MODE_LABELS[
                              mode
                            ]
                          }
                        </span>

                        {active ? (
                          <CheckCircle2
                            aria-hidden="true"
                            className="
                              h-4
                              w-4
                              text-[#00685F]
                            "
                          />
                        ) : null}
                      </div>

                      <p
                        className="
                          mt-2
                          text-[10px]
                          leading-5
                          text-[#64748B]
                        "
                      >
                        {
                          MODE_DESCRIPTIONS[
                            mode
                          ]
                        }
                      </p>

                      {backendMode ? (
                        <span
                          className="
                            mt-2
                            inline-flex
                            rounded-full
                            bg-[#F4EFFF]
                            px-2
                            py-0.5
                            text-[9px]
                            font-bold
                            text-[#712AE2]
                          "
                        >
                          Backend Task
                        </span>
                      ) : null}
                    </button>
                  );
                },
              )}
            </div>
          </section>

          <section
            className="
              rounded-2xl
              border
              border-[#DCE7E5]
              bg-white
              p-5
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <Headphones
                aria-hidden="true"
                className="
                  h-5
                  w-5
                  text-[#00685F]
                "
              />

              <h2
                className="
                  text-sm
                  font-black
                  text-[#172321]
                "
              >
                روش انجام تمرین
              </h2>
            </div>

            <ol className="mt-4 space-y-4">
              {instructions.map(
                (
                  instruction,
                  index,
                ) => (
                  <li
                    key={`${index}-${instruction}`}
                    className="
                      flex
                      items-start
                      gap-3
                      text-sm
                      leading-7
                      text-[#64748B]
                    "
                  >
                    <span
                      className="
                        mt-1
                        flex
                        h-6
                        w-6
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-[#F1F5F4]
                        text-[10px]
                        font-black
                        text-[#52615F]
                      "
                    >
                      {numberFormatter.format(
                        index +
                          1,
                      )}
                    </span>

                    <span>
                      {instruction}
                    </span>
                  </li>
                ),
              )}
            </ol>
          </section>

          {practiceMode ===
            "guided_dictation" &&
          content.hintWords.length >
            0 ? (
            <section
              className="
                rounded-2xl
                border
                border-[#F4D8A5]
                bg-[#FFF9EC]
                p-5
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-[#B45309]
                "
              >
                <Lightbulb
                  aria-hidden="true"
                  className="h-5 w-5"
                />

                <h2
                  className="
                    text-sm
                    font-black
                  "
                >
                  واژه‌های راهنما
                </h2>
              </div>

              <div
                dir="ltr"
                className="
                  mt-4
                  flex
                  flex-wrap
                  gap-2
                "
              >
                {content.hintWords.map(
                  (
                    word,
                  ) => (
                    <span
                      key={word}
                      className="
                        rounded-lg
                        border
                        border-[#E8C98E]
                        bg-white
                        px-2.5
                        py-1.5
                        text-xs
                        font-medium
                        text-[#7C5B28]
                      "
                    >
                      {word}
                    </span>
                  ),
                )}
              </div>
            </section>
          ) : null}
        </aside>

        <div className="min-w-0 space-y-5">
          <ListeningAudioPlayer
            audioUrl={
              content.audioUrl
            }
            title={
              content.title
            }
            variant={
              isListenOnly
                ? "listen_only"
                : "practice"
            }
            onPlaybackSnapshot={
              handlePlaybackSnapshot
            }
            onEnded={
              handleAudioEnded
            }
          />

          {isListenOnly ? (
            <ListeningListenOnlySession
              content={
                content
              }
              playback={
                playbackSnapshot
              }
              completedPasses={
                completedListenPasses
              }
            />
          ) : transcriptMode ? (
            <>
              <TranscriptionEditor
                value={
                  transcript
                }
                minimumWords={
                  content.minimumTranscriptWords
                }
                saveStatus={
                  saveStatus
                }
                lastSavedAt={
                  lastSavedAt
                }
                remoteStatus={
                  remoteSaveStatus
                }
                onChange={
                  handleTranscriptChange
                }
                onSave={() => {
                  void handleSaveDraft();
                }}
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

              <section
                className="
                  rounded-2xl
                  border
                  border-[#DCE7E5]
                  bg-white
                  p-5
                "
              >
                <div
                  className="
                    flex
                    flex-col
                    gap-4
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                >
                  <div>
                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        text-[#00685F]
                      "
                    >
                      <BrainCircuit
                        aria-hidden="true"
                        className="h-5 w-5"
                      />

                      <h2
                        className="
                          text-sm
                          font-black
                          text-[#172321]
                        "
                      >
                        آماده تحلیل
                      </h2>
                    </div>

                    <p
                      className="
                        mt-2
                        text-xs
                        leading-6
                        text-[#64748B]
                      "
                    >
                      منبع پاسخ:{" "}
                      {
                        ANSWER_SOURCE_LABELS[
                          answerSource
                        ]
                      }

                      {" • "}

                      {numberFormatter.format(
                        wordCount,
                      )}{" "}
                      کلمه

                      {" • "}

                      {numberFormatter.format(
                        completedListenPasses,
                      )}{" "}
                      بار شنیدن کامل
                    </p>
                  </div>

                  <div
                    className="
                      flex
                      flex-wrap
                      gap-2
                    "
                  >
                    <button
                      type="button"
                      disabled={
                        isSubmitting
                      }
                      onClick={() => {
                        void handleSaveDraft();
                      }}
                      className="
                        inline-flex
                        min-h-11
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-[#B8DCD6]
                        bg-[#EEF8F6]
                        px-4
                        text-sm
                        font-bold
                        text-[#00685F]
                        transition
                        hover:bg-[#E1F2EF]
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    >
                      <Save
                        aria-hidden="true"
                        className="h-4 w-4"
                      />

                      ذخیره Draft
                    </button>

                    <button
                      type="button"
                      disabled={
                        !canSubmit
                      }
                      onClick={() => {
                        void handleSubmit();
                      }}
                      className="
                        inline-flex
                        min-h-11
                        min-w-40
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-[#00685F]
                        px-5
                        text-sm
                        font-black
                        text-white
                        transition
                        hover:bg-[#005A52]
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                      "
                    >
                      {isSubmitting ? (
                        <LoaderCircle
                          aria-hidden="true"
                          className="
                            h-4
                            w-4
                            animate-spin
                          "
                        />
                      ) : (
                        <Send
                          aria-hidden="true"
                          className="h-4 w-4"
                        />
                      )}

                      {isSubmitting
                        ? "در حال تحلیل..."
                        : "ارسال برای تحلیل"}
                    </button>
                  </div>
                </div>

                {!canSubmit &&
                !isSubmitting ? (
                  <p
                    className="
                      mt-4
                      text-xs
                      leading-6
                      text-[#64748B]
                    "
                  >
                    برای ارسال، حداقل{" "}
                    {numberFormatter.format(
                      content.minimumTranscriptWords,
                    )}{" "}
                    کلمه نیاز است.
                  </p>
                ) : null}

                {submissionError ? (
                  <div
                    role="alert"
                    className="
                      mt-4
                      rounded-xl
                      border
                      border-[#FECACA]
                      bg-[#FEF2F2]
                      px-4
                      py-3
                      text-xs
                      leading-6
                      text-[#B91C1C]
                    "
                  >
                    {submissionError}
                  </div>
                ) : null}
              </section>
            </>
          ) : backendTaskRequired ? (
            <BackendPracticeModeCard
              mode={
                practiceMode
              }
            />
          ) : null}
        </div>
      </section>
    </main>
  );
}

function BackendPracticeModeCard({
  mode,
}: Readonly<{
  mode:
    ListeningPracticeMode;
}>) {
  return (
    <section
      className="
        rounded-2xl
        border
        border-[#DED3F5]
        bg-[#F9F7FF]
        p-6
      "
    >
      <div
        className="
          flex
          items-start
          gap-3
        "
      >
        <span
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[#F0E8FF]
            text-[#712AE2]
          "
        >
          <LockKeyhole
            aria-hidden="true"
            className="h-5 w-5"
          />
        </span>

        <div className="min-w-0 flex-1">
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-2
            "
          >
            <h2
              className="
                text-lg
                font-black
                text-[#172321]
              "
            >
              {
                LISTENING_PRACTICE_MODE_LABELS[
                  mode
                ]
              }
            </h2>

            <span
              className="
                rounded-full
                bg-[#E8DDFB]
                px-2.5
                py-1
                text-[10px]
                font-black
                text-[#712AE2]
              "
            >
              Backend-ready
            </span>
          </div>

          <p
            className="
              mt-3
              max-w-2xl
              text-sm
              leading-7
              text-[#64748B]
            "
          >
            UI این حالت آماده است، اما برای
            شروع واقعی باید Backend،
            Task Payload مخصوص همین Mode را
            همراه Content برگرداند. تا قبل
            از آن سؤال یا امتیاز ساختگی
            نمایش داده نمی‌شود.
          </p>

          <div
            className="
              mt-5
              rounded-xl
              border
              border-[#E2DBF1]
              bg-white
              p-4
            "
          >
            <p
              className="
                text-xs
                font-black
                text-[#334155]
              "
            >
              قرارداد مورد انتظار Backend
            </p>

            <ul
              className="
                mt-3
                space-y-2
                text-xs
                leading-6
                text-[#64748B]
              "
            >
              {mode ===
              "fill_in_the_blank" ? (
                <>
                  <li>
                    • segmentId و start/end
                    زمان صوت
                  </li>

                  <li>
                    • متن Mask شده و شناسه
                    Blankها
                  </li>

                  <li>
                    • Answer Key فقط سمت
                    Server
                  </li>
                </>
              ) : mode ===
                "comprehension" ? (
                <>
                  <li>
                    • questionId، prompt و
                    options
                  </li>

                  <li>
                    • single/multiple choice
                    capability
                  </li>

                  <li>
                    • scoring و feedback سمت
                    Backend
                  </li>
                </>
              ) : (
                <>
                  <li>
                    • Shadowing Segmentهای
                    زمانی
                  </li>

                  <li>
                    • Upload URL یا Audio
                    Token
                  </li>

                  <li>
                    • Pronunciation / Fluency
                    analysis
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Badge({
  tone,
  children,
}: Readonly<{
  tone:
    | "teal"
    | "purple"
    | "neutral";

  children:
    ReactNode;
}>) {
  const classes =
    tone ===
    "teal"
      ? "bg-[#E7F4F2] text-[#00685F]"
      : tone ===
          "purple"
        ? "bg-[#F4EFFF] text-[#712AE2]"
        : "bg-[#F1F5F4] text-[#52615F]";

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-full
        px-3
        py-1.5
        text-xs
        font-bold
        ${classes}
      `}
    >
      {children}
    </span>
  );
}