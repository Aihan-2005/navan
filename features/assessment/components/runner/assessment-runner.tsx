"use client";

import Link from "next/link";

import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  Send,
  X,
} from "lucide-react";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Card,
} from "../../../../components/ui/card";

import {
  cn,
} from "../../../../lib/utils/cn";

import {
  submitAssessmentAttempt,
} from "../../api/submit-assessment-attempt";

import {
  ASSESSMENT_SKILL_LABELS,
} from "../../constants/assessment.constants";

import {
  useAssessmentRunner,
} from "../../hooks/use-assessment-runner";

import type {
  AssessmentSubmissionResult,
  AssessmentRunnerSession,
} from "../../types/assessment-runner.types";

import {
  AssessmentQuestionRenderer,
} from "./assessment-question-renderer";

import {
  AssessmentResultView,
} from "./assessment-result-view";

type AssessmentRunnerProps =
  Readonly<{
     assessment:
      AssessmentRunnerSession;
  }>;

const numberFormatter =
  new Intl.NumberFormat(
    "fa-IR",
  );

function formatTimer(
  seconds:
    number,
): string {
  const safeSeconds =
    Math.max(
      0,
      Math.floor(
        seconds,
      ),
    );

  const minutes =
    Math.floor(
      safeSeconds /
        60,
    );

  const remaining =
    safeSeconds %
    60;

  return `${minutes
    .toString()
    .padStart(
      2,
      "0",
    )}:${remaining
    .toString()
    .padStart(
      2,
      "0",
    )}`;
}

export function AssessmentRunner({
  assessment,
}: AssessmentRunnerProps) {
  const runner =
    useAssessmentRunner(
      assessment,
    );

  const [
    submissionResult,
    setSubmissionResult,
  ] =
    useState<AssessmentSubmissionResult | null>(
      null,
    );

  const [
    isSubmitting,
    setIsSubmitting,
  ] =
    useState(false);

  const [
    submitError,
    setSubmitError,
  ] =
    useState<string | null>(
      null,
    );

  const [
    showSubmitDialog,
    setShowSubmitDialog,
  ] =
    useState(false);

  const automaticSubmissionRef =
    useRef(false);

  const performSubmit =
    useCallback(
      async (): Promise<void> => {
        if (
          !runner.draft ||
          isSubmitting ||
          submissionResult
        ) {
          return;
        }

        setSubmitError(
          null,
        );

        setIsSubmitting(
          true,
        );

        try {
          const result =
            await submitAssessmentAttempt(
              {
                assessmentId:
                  assessment.assessmentId,
 attemptId:
                  runner.draft.attemptId,

                elapsedSeconds:
                  runner.elapsedSeconds,

                answers:
                  runner.answers,

                flaggedQuestionIds:
                  runner.flaggedQuestionIds,
              },
            );

          runner.clearStoredDraft();

          setSubmissionResult(
            result,
          );

          setShowSubmitDialog(
            false,
          );
        } catch (
          error
        ) {
          console.error(
            "Assessment submit failed:",
            error,
          );

          setSubmitError(
            error instanceof
              Error
              ? error.message
              : "ثبت آزمون ناموفق بود.",
          );
        } finally {
          setIsSubmitting(
            false,
          );
        }
      },
      [
        assessment.assessmentId,
        isSubmitting,
        runner,
        submissionResult,
      ],
    );

  useEffect(() => {
    if (
      !runner.isExpired ||
      !runner.isReady ||
      submissionResult ||
      isSubmitting ||
    automaticSubmissionRef.current
    ) {
      return;
    }

    automaticSubmissionRef.current =
      true;

    void performSubmit();
  }, [
    isSubmitting,
    performSubmit,
    runner.isExpired,
    runner.isReady,
    submissionResult,
  ]);

  if (
    submissionResult
  ) {
    return (
      <AssessmentResultView
        title={
          assessment.title
        }
        submission={
          submissionResult
        }
        onRetake={() => {
          automaticSubmissionRef.current =
            false;

          setSubmissionResult(
            null,
          );

          setSubmitError(
            null,
          );

          runner.reset();
        }}
      />
    );
  }

  if (
    !runner.isReady ||
    !runner.draft
  ) {
  return (
      <main
        className="
          mx-auto
          flex
          min-h-[60vh]
          w-full
          max-w-4xl
          items-center
          justify-center
        "
      >
        <LoaderCircle
          aria-hidden="true"
          className="
            h-8
            w-8
            animate-spin
            text-cyan-300
          "
        />
      </main>
    );
  }

  const currentQuestion =
    runner.currentQuestion;

  const currentAnswer =
    runner.answerMap.get(
      currentQuestion.id,
    ) ??
    null;

  const isFlagged =
    runner.flaggedQuestionIds.includes(
      currentQuestion.id,
    );

  const currentSection =
    assessment.sections.find(
      (
        section,
      ) =>
        section.questionIds.includes(
          currentQuestion.id,
        ),
    );

  const progressPercent =
    (
      (
        runner.currentQuestionIndex +
        1
      ) /
      assessment.questionCount
    ) *
    100;
return (
    <main
      className="
        mx-auto
        w-full
        max-w-7xl
        space-y-5
      "
    >
      <header
        className="
          flex
          flex-col
          gap-4
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <div
          className="
            flex
            min-w-0
            items-center
            gap-3
          "
        >
          <Link
            href="/assessment"
            aria-label="خروج از آزمون"
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-white/[0.07]
              bg-white/[0.025]
              text-slate-400
              transition
              hover:text-white
            "
          >
            <X
              aria-hidden="true"
              className="h-4 w-4"
            />
          </Link>

          <div className="min-w-0">
            <p
              className="
                text-xs
                text-cyan-300
              " >
              {currentSection
                ? ASSESSMENT_SKILL_LABELS[
                    currentSection.skill
                  ]
                : "Assessment"}
            </p>

            <h1
              dir="ltr"
              className="
                mt-1
                truncate
                text-left
                text-lg
                font-bold
                text-white
              "
            >
              {assessment.title}
            </h1>
          </div>
        </div>

        <div
          className="
            flex
            flex-wrap
            items-center
            gap-2
          "
        >
          <span
            className="
              rounded-xl
              border
              border-white/[0.06]
              bg-white/[0.025]
              px-3
              py-2
              text-xs
              text-slate-400
            "
          >
            {numberFormatter.format(
              runner.answeredCount,
            )}
            /
            {numberFormatter.format(
              assessment.questionCount,
            )}{" "}
            پاسخ
          </span>

          {runner.remainingSeconds !==
          null ? (
            <span className={cn(
                "inline-flex",
                "items-center",
                "gap-2",
                "rounded-xl",
                "border",
                "px-3",
                "py-2",
                "text-sm",
                "font-bold",
                "tabular-nums",

                runner.remainingSeconds <=
                60
                  ? [
                      "border-red-400/15",
                      "bg-red-400/[0.05]",
                      "text-red-300",
                    ]
                  : [
                      "border-cyan-400/10",
                      "bg-cyan-400/[0.04]",
                      "text-cyan-200",
                    ],
              )}
              dir="ltr"
            >
              <Clock3
                aria-hidden="true"
                className="h-4 w-4"
              />

              {formatTimer(
                runner.remainingSeconds,
              )}
            </span>
          ) : null}
        </div>
      </header>

      <div
        className="
          h-1.5
          overflow-hidden
          rounded-full
          bg-white/[0.05]
        "
      >
        <div
          className="
            h-full
            rounded-full
            bg-cyan-400
            transition-[width]
          "
          style={{
            width:
              `${progressPercent}%`,
 }}
        />
      </div>

      <section
        className="
          grid
          gap-5
          xl:grid-cols-[240px_minmax(0,1fr)]
        "
      >
        <aside
          className="
            order-2
            xl:order-1
          "
        >
          <Card className="p-4">
            <div
              className="
                flex
                items-center
                justify-between
                gap-3
              "
            >
              <h2
                className="
                  text-sm
                  font-bold
                  text-white
                "
              >
                سؤال‌ها
              </h2>

              <span
                className="
                  text-[10px]
                  text-slate-600
                "
              >
                ذخیره خودکار
              </span>
            </div>

            <div
              className="
                mt-4
                grid
                grid-cols-5
                gap-2
                sm:grid-cols-8
                xl:grid-cols-4
              "
            >
              {assessment.questions.map(
                (question,
                  index,
                ) => {
                  const active =
                    index ===
                    runner.currentQuestionIndex;

                  const answered =
                    runner.answerMap.has(
                      question.id,
                    );

                  const flagged =
                    runner.flaggedQuestionIds.includes(
                      question.id,
                    );

                  return (
                    <button
                      key={
                        question.id
                      }
                      type="button"
                      onClick={() => {
                        runner.goToQuestion(
                          index,
                        );
                      }}
                      className={cn(
                        "relative",
                        "flex",
                        "h-10",
                        "items-center",
                        "justify-center",
                        "rounded-xl",
                        "border",
                        "text-xs",
                        "font-bold",
                        "transition",

                        active
                          ? [
                              "border-cyan-300/30",
                              "bg-cyan-400/15",
                              "text-cyan-100",
                            ]
                          : answered
                            ? [
                                "border-emerald-400/15",
                                "bg-emerald-400/[0.05]",
                                "text-emerald-300",
                              ]
                            : [
                                "border-white/[0.06]",
                                "bg-white/[0.025]",
                                "text-slate-600",
                              ],
                      )}
                    > {index +
                        1}

                      {flagged ? (
                        <span
                          aria-hidden="true"
                          className="
                            absolute
                            -right-0.5
                            -top-0.5
                            h-2
                            w-2
                            rounded-full
                            bg-amber-300
                          "
                        />
                      ) : null}
                    </button>
                  );
                },
              )}
            </div>

            <div
              className="
                mt-5
                space-y-2
                border-t
                border-white/[0.05]
                pt-4
                text-[10px]
                text-slate-600
              "
            >
              <p>
                پاسخ داده‌شده:{" "}
                {runner.answeredCount}
              </p>

              <p>
                بدون پاسخ:{" "}
                {runner.unansweredCount}
              </p>

              <p>
                علامت‌گذاری‌شده:{" "}
                {
                  runner.flaggedQuestionIds
                    .length
                }
              </p>
            </div>
          </Card>
        </aside>

        <div
          className=" order-1
            min-w-0
            xl:order-2
          "
        >
          <Card
            className="
              min-h-[560px]
              p-5
              sm:p-7
            "
          >
            <div
              className="
                flex
                items-start
                justify-between
                gap-4
              "
            >
              <div>
                <p
                  className="
                    text-xs
                    text-slate-600
                  "
                >
                  سؤال{" "}
                  {numberFormatter.format(
                    runner.currentQuestionIndex +
                      1,
                  )}{" "}
                  از{" "}
                  {numberFormatter.format(
                    assessment.questionCount,
                  )}
                </p>

                <div
                  className="
                    mt-2
                    flex
                    flex-wrap
                    gap-2
                  "
                >
                  <span
                    className="
                      rounded-full
                      bg-violet-400/10
                      px-2.5
                      py-1
                      text-[10px]
                      text-violet-300
                    "
                  >
                    {
                      currentQuestion.cefrLevel
                    } </span>

                  <span
                    className="
                      rounded-full
                      bg-white/[0.04]
                      px-2.5
                      py-1
                      text-[10px]
                      text-slate-500
                    "
                  >
                    {
                      currentQuestion.points
                    }{" "}
                    امتیاز
                  </span>
                </div>
              </div>

              <button
                type="button"
                aria-pressed={
                  isFlagged
                }
                onClick={() => {
                  runner.toggleFlag(
                    currentQuestion.id,
                  );
                }}
                className={cn(
                  "inline-flex",
                  "h-10",
                  "items-center",
                  "gap-2",
                  "rounded-xl",
                  "border",
                  "px-3",
                  "text-xs",
                  "transition",

                  isFlagged
                    ? [
                        "border-amber-300/20",
                        "bg-amber-400/10",
                        "text-amber-200",
                      ]
                    : [
                        "border-white/[0.06]",
                        "bg-white/[0.025]",
 "text-slate-500",
                      ],
                )}
              >
                {isFlagged ? (
                  <BookmarkCheck
                    aria-hidden="true"
                    className="h-4 w-4"
                  />
                ) : (
                  <Bookmark
                    aria-hidden="true"
                    className="h-4 w-4"
                  />
                )}

                مرور بعداً
              </button>
            </div>

            <div
              className="
                mt-7
                border-t
                border-white/[0.05]
                pt-7
              "
            >
              <AssessmentQuestionRenderer
                question={
                  currentQuestion
                }
                answer={
                  currentAnswer
                }
                onAnswer={(
                  payload,
                ) => {
                  runner.setAnswer(
                    currentQuestion.id,
                    payload,
                  );
                }}
              />
            </div>

            <div
              className="
                mt-10
                flex
                flex-wrap
                items-center
justify-between
                gap-3
                border-t
                border-white/[0.05]
                pt-5
              "
            >
              <button
                type="button"
                disabled={
                  runner.currentQuestionIndex ===
                  0
                }
                onClick={
                  runner.goPrevious
                }
                className="
                  inline-flex
                  min-h-11
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-white/[0.07]
                  bg-white/[0.025]
                  px-4
                  text-sm
                  text-slate-300
                  transition
                  hover:bg-white/[0.06]
                  disabled:cursor-not-allowed
                  disabled:opacity-30
                "
              >
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4"
                />

                قبلی
              </button>

              {runner.currentQuestionIndex <
              assessment.questionCount -
                1 ? (
                <button
                  type="button"
                  onClick={
                    runner.goNext
                  }
                  className="
                    inline-flex
                    min-h-11
                    items-center
                    gap-2
                    rounded-xl
                    bg-cyan-400
                    px-5  text-sm
                    font-bold
                    text-slate-950
                    transition
                    hover:bg-cyan-300
                  "
                >
                  بعدی

                  <ArrowLeft
                    aria-hidden="true"
                    className="h-4 w-4"
                  />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setShowSubmitDialog(
                      true,
                    );
                  }}
                  className="
                    inline-flex
                    min-h-11
                    items-center
                    gap-2
                    rounded-xl
                    bg-emerald-400
                    px-5
                    text-sm
                    font-bold
                    text-slate-950
                    transition
                    hover:bg-emerald-300
                  "
                >
                  <Send
                    aria-hidden="true"
                    className="h-4 w-4"
                  />

                  پایان و ثبت آزمون
                </button>
              )}
            </div>
          </Card>

          {submitError ? (
            <div
              role="alert"
              className="
                mt-4
                rounded-xl
                border
                border-red-400/15
                bg-red-400/[0.05]
 px-4
                py-3
                text-sm
                leading-6
                text-red-200
              "
            >
              {submitError}
            </div>
          ) : null}
        </div>
      </section>

      {showSubmitDialog ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="submit-assessment-title"
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/70
            p-4
            backdrop-blur-sm
          "
        >
          <Card
            className="
              w-full
              max-w-lg
              p-6
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-amber-400/10
                text-amber-300
              "
            >
              <AlertTriangle
                aria-hidden="true"
                className="h-5 w-5"
              />
            </div>
 <h2
              id="submit-assessment-title"
              className="
                mt-5
                text-xl
                font-bold
                text-white
              "
            >
              آزمون ثبت شود؟
            </h2>

            <p
              className="
                mt-3
                text-sm
                leading-7
                text-slate-400
              "
            >
              بعد از ثبت، پاسخ‌ها ارزیابی می‌شوند و نتیجه و توضیح هر سؤال نمایش داده خواهد شد.
            </p>

            {runner.unansweredCount >
            0 ? (
              <div
                className="
                  mt-4
                  rounded-xl
                  border
                  border-amber-400/10
                  bg-amber-400/[0.035]
                  px-4
                  py-3
                  text-sm
                  text-amber-200
                "
              >
                هنوز{" "}
                {
                  runner.unansweredCount
                }{" "}
                سؤال بدون پاسخ است.
              </div>
            ) : (
              <div
                className="
                  mt-4
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-emerald-300
                "
              >
                <CheckCircle2
 aria-hidden="true"
                  className="h-4 w-4"
                />

                به تمام سؤال‌ها پاسخ داده‌ای.
              </div>
            )}

            <div
              className="
                mt-6
                flex
                justify-end
                gap-3
              "
            >
              <button
                type="button"
                disabled={
                  isSubmitting
                }
                onClick={() => {
                  setShowSubmitDialog(
                    false,
                  );
                }}
                className="
                  min-h-11
                  rounded-xl
                  border
                  border-white/[0.07]
                  px-4
                  text-sm
                  text-slate-300
                "
              >
                ادامه آزمون
              </button>

              <button
                type="button"
                disabled={
                  isSubmitting
                }
                onClick={() => {
                  void performSubmit();
                }}
                className="
                  inline-flex
                  min-h-11
                  items-center
                  gap-2 rounded-xl
                  bg-emerald-400
                  px-5
                  text-sm
                  font-bold
                  text-slate-950
                  disabled:opacity-50
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
                  ? "در حال ثبت..."
                  : "ثبت نهایی"}
              </button>
            </div>
          </Card>
        </div>
      ) : null}

      {isSubmitting &&
      runner.isExpired ? (
        <div
          className="
            fixed
            inset-x-0
            bottom-5
            z-40
            mx-auto
            flex
            w-fit
            items-center
            gap-2
            rounded-xl
            border
            border-cyan-400/15
            bg-[#0B1221]
            px-4
            py-3
            text-sm
            text-cyan-200
            shadow-2xl
          "        >
          <LoaderCircle
            aria-hidden="true"
            className="
              h-4
              w-4
              animate-spin
            "
          />

          زمان تمام شد؛ آزمون در حال ثبت است.
        </div>
      ) : null}
    </main>
  );
}