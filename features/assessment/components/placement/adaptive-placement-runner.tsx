"use client";

import Link from "next/link";

import {
  AlertCircle,
  BrainCircuit,
  CheckCircle2,
  Gauge,
  LoaderCircle,
  LockKeyhole,
  RotateCcw,
  ShieldCheck,
  X,
} from "lucide-react";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  answerAdaptivePlacementQuestion,
  startAdaptivePlacement,
} from "../../api/adaptive-placement";

import {
  ASSESSMENT_SKILL_LABELS,
} from "../../constants/assessment.constants";

import type {
  AssessmentAnswerPayload,
} from "../../types/assessment-attempt.types";

import type {
  AdaptivePlacementSessionView,
} from "../../types/adaptive-placement.types";

import {
  AssessmentQuestionRenderer,
} from "../runner/assessment-question-renderer";

import {
  AssessmentResultView,
} from "../runner/assessment-result-view";

type AdaptivePlacementRunnerProps =
  Readonly<{
    assessmentId:
      string;

    title:
      string;
  }>;

const numberFormatter =
  new Intl.NumberFormat(
    "fa-IR",
  );

export function AdaptivePlacementRunner({
  assessmentId,
  title,
}: AdaptivePlacementRunnerProps) {
  const [
    session,
    setSession,
  ] =
    useState<AdaptivePlacementSessionView | null>(
      null,
    );

  const [
    answer,
    setAnswer,
  ] =
    useState<AssessmentAnswerPayload | null>(
      null,
    );

  const [
    errorMessage,
    setErrorMessage,
  ] =
    useState<string | null>(
      null,
    );

  const [
    isStarting,
    setIsStarting,
  ] =
    useState(true);

  const [
    isSubmitting,
    setIsSubmitting,
  ] =
    useState(false);

  const startedAtRef =
    useRef<number>(
      Date.now(),
    );

  const hasStartedRef =
    useRef(false);

  const startSession =
    useCallback(
      async (): Promise<void> => {
        setErrorMessage(
          null,
        );

        setIsStarting(
          true,
        );

        setAnswer(
          null,
        );

        try {
          const result =
            await startAdaptivePlacement(
              assessmentId,
            );

          startedAtRef.current =
            Date.now();

          setSession(
            result,
          );
        } catch (error) {
          console.error(
            "Start adaptive placement failed:",
            error,
          );

          setErrorMessage(
            error instanceof Error
              ? error.message
              : "شروع آزمون تعیین سطح ناموفق بود.",
          );
        } finally {
          setIsStarting(
            false,
          );
        }
      },
      [
        assessmentId,
      ],
    );

  useEffect(() => {
    if (
      hasStartedRef.current
    ) {
      return;
    }

    hasStartedRef.current =
      true;

    void startSession();
  }, [
    startSession,
  ]);

  useEffect(() => {
    setAnswer(
      null,
    );
  }, [
    session
      ?.currentQuestion
      ?.id,
  ]);

  async function submitAnswer(): Promise<void> {
    if (
      !session ||
      !session.currentQuestion ||
      !answer ||
      isSubmitting
    ) {
      return;
    }

    setErrorMessage(
      null,
    );

    setIsSubmitting(
      true,
    );

    try {
      const elapsedSeconds =
        Math.max(
          0,
          Math.floor(
            (
              Date.now() -
              startedAtRef.current
            ) /
              1000,
          ),
        );

      const result =
        await answerAdaptivePlacementQuestion(
          {
            sessionId:
              session.sessionId,

            questionId:
              session.currentQuestion.id,

            payload:
              answer,

            elapsedSeconds,
          },
        );

      setSession(
        result,
      );

      setAnswer(
        null,
      );
    } catch (error) {
      console.error(
        "Adaptive answer failed:",
        error,
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "ثبت پاسخ ناموفق بود.",
      );
    } finally {
      setIsSubmitting(
        false,
      );
    }
  }

  if (
    isStarting
  ) {
    return (
      <main
        className="
          mx-auto
          flex
          min-h-[60vh]
          w-full
          max-w-5xl
          items-center
          justify-center
        "
      >
        <div className="text-center">
          <LoaderCircle
            aria-hidden="true"
            className="
              mx-auto
              h-9
              w-9
              animate-spin
              text-[#00685F]
            "
          />

          <p
            className="
              mt-4
              text-sm
              font-bold
              text-[#334155]
            "
          >
            در حال آماده‌سازی اولین سؤال...
          </p>
        </div>
      </main>
    );
  }

  if (
    errorMessage &&
    !session
  ) {
    return (
      <main
        className="
          mx-auto
          w-full
          max-w-xl
        "
      >
        <div
          className="
            rounded-2xl
            border
            border-[#FECACA]
            bg-[#FEF2F2]
            p-6
            text-center
          "
        >
          <AlertCircle
            aria-hidden="true"
            className="
              mx-auto
              h-8
              w-8
              text-[#DC2626]
            "
          />

          <h1
            className="
              mt-4
              text-lg
              font-black
              text-[#0F172A]
            "
          >
            شروع آزمون ممکن نشد
          </h1>

          <p
            className="
              mt-2
              text-sm
              leading-7
              text-[#64748B]
            "
          >
            {errorMessage}
          </p>

          <button
            type="button"
            onClick={() => {
              void startSession();
            }}
            className="
              mt-5
              inline-flex
              min-h-11
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#00685F]
              px-5
              text-sm
              font-bold
              text-[#FFFFFF]
            "
          >
            <RotateCcw
              aria-hidden="true"
              className="h-4 w-4"
            />

            تلاش دوباره
          </button>
        </div>
      </main>
    );
  }

  if (!session) {
    return null;
  }

  if (
    session.status ===
      "completed" &&
    session.result
  ) {
    return (
      <AssessmentResultView
        title={title}
        submission={
          session.result
        }
        onRetake={() => {
          void startSession();
        }}
      />
    );
  }

  const question =
    session.currentQuestion;

  if (!question) {
    return null;
  }

  return (
    <main
      dir="rtl"
      className="
        mx-auto
        w-full
        max-w-[1120px]
        space-y-5
        pb-12
      "
    >
      <header
        className="
          flex
          flex-col
          gap-4
          rounded-2xl
          border
          border-[#DCE7E5]
          bg-white
          p-5
          shadow-[0_8px_28px_rgba(15,23,42,0.04)]
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
              border-[#DCE7E5]
              bg-[#F8FAFC]
              text-[#64748B]
              transition
              hover:bg-[#F1F5F4]
              hover:text-[#00685F]
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
                font-bold
                text-[#00685F]
              "
            >
              تعیین سطح تطبیقی
            </p>

            <h1
              className="
                mt-1
                truncate
                text-lg
                font-black
                text-[#0F172A]
              "
            >
              {title}
            </h1>
          </div>
        </div>

        <div
          className="
            flex
            flex-wrap
            gap-2
          "
        >
          <HeaderMetric
            icon={BrainCircuit}
            label="سطح فعلی"
            value={
              session.currentCefrLevel
            }
          />

          <HeaderMetric
            icon={Gauge}
            label="اطمینان"
            value={`${numberFormatter.format(
              session.confidence,
            )}٪`}
          />

          <HeaderMetric
            icon={CheckCircle2}
            label="پاسخ"
            value={`${numberFormatter.format(
              session.answeredCount,
            )}/${numberFormatter.format(
              session.maximumQuestions,
            )}`}
          />
        </div>
      </header>

      <div
        className="
          h-2
          overflow-hidden
          rounded-full
          bg-[#E7EFED]
        "
      >
        <div
          className="
            h-full
            rounded-full
            bg-[#00685F]
            transition-[width]
            duration-500
          "
          style={{
            width:
              `${session.progressPercent}%`,
          }}
        />
      </div>

      <section
        className="
          grid
          gap-5
          xl:grid-cols-[260px_minmax(0,1fr)]
        "
      >
        <aside
          className="
            order-2
            space-y-4
            xl:order-1
          "
        >
          <div
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
              <ShieldCheck
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
                  text-[#0F172A]
                "
              >
                پوشش مهارت‌ها
              </h2>
            </div>

            <div
              className="
                mt-4
                space-y-3
              "
            >
              {session.coverage.map(
                (item) => (
                  <div
                    key={item.skill}
                    className="
                      flex
                      items-center
                      justify-between
                      gap-3
                      rounded-xl
                      bg-[#F8FAFC]
                      px-3
                      py-2.5
                    "
                  >
                    <span
                      className="
                        text-xs
                        font-medium
                        text-[#475569]
                      "
                    >
                      {
                        ASSESSMENT_SKILL_LABELS[
                          item.skill
                        ]
                      }
                    </span>

                    <span
                      className="
                        text-xs
                        font-black
                        text-[#00685F]
                      "
                    >
                      {numberFormatter.format(
                        item.answered,
                      )}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>

          <div
            className="
              rounded-2xl
              border
              border-[#E4DCF7]
              bg-[#F8F5FF]
              p-4
            "
          >
            <div
              className="
                flex
                items-start
                gap-2
              "
            >
              <LockKeyhole
                aria-hidden="true"
                className="
                  mt-0.5
                  h-4
                  w-4
                  shrink-0
                  text-[#712AE2]
                "
              />

              <p
                className="
                  text-xs
                  leading-6
                  text-[#5B6472]
                "
              >
                در تعیین سطح Adaptive
                برگشت به سؤال قبلی غیرفعال
                است؛ چون سؤال بعدی بر اساس
                پاسخ فعلی انتخاب می‌شود.
              </p>
            </div>
          </div>
        </aside>

        <div
          className="
            order-1
            min-w-0
            xl:order-2
          "
        >
          <section
            className="
              rounded-2xl
              border
              border-[#DCE7E5]
              bg-white
              p-5
              shadow-[0_8px_28px_rgba(15,23,42,0.04)]
              sm:p-7
            "
          >
            <div
              className="
                flex
                flex-wrap
                items-center
                justify-between
                gap-3
                border-b
                border-[#E8EEEC]
                pb-5
              "
            >
              <div>
                <p
                  className="
                    text-xs
                    text-[#64748B]
                  "
                >
                  سؤال بعدی بر اساس عملکرد تو
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
                      bg-[#E7F4F2]
                      px-3
                      py-1
                      text-[10px]
                      font-bold
                      text-[#00685F]
                    "
                  >
                    {
                      ASSESSMENT_SKILL_LABELS[
                        question.skill
                      ]
                    }
                  </span>

                  <span
                    className="
                      rounded-full
                      bg-[#F4EFFF]
                      px-3
                      py-1
                      text-[10px]
                      font-bold
                      text-[#712AE2]
                    "
                  >
                    {question.cefrLevel}
                  </span>
                </div>
              </div>

              <span
                className="
                  rounded-xl
                  bg-[#F8FAFC]
                  px-3
                  py-2
                  text-xs
                  text-[#64748B]
                "
              >
                حداقل{" "}
                {numberFormatter.format(
                  session.minimumQuestions,
                )}{" "}
                سؤال
              </span>
            </div>

            <div className="mt-6">
              <AssessmentQuestionRenderer
                question={
                  question
                }
                answer={
                  answer
                }
                onAnswer={
                  setAnswer
                }
              />
            </div>

            {errorMessage ? (
              <div
                role="alert"
                className="
                  mt-5
                  flex
                  items-start
                  gap-2
                  rounded-xl
                  border
                  border-[#FECACA]
                  bg-[#FEF2F2]
                  p-3
                  text-xs
                  leading-6
                  text-[#B91C1C]
                "
              >
                <AlertCircle
                  aria-hidden="true"
                  className="
                    mt-1
                    h-4
                    w-4
                    shrink-0
                  "
                />

                {errorMessage}
              </div>
            ) : null}

            <div
              className="
                mt-7
                flex
                justify-end
                border-t
                border-[#E8EEEC]
                pt-5
              "
            >
              <button
                type="button"
                disabled={
                  !answer ||
                  isSubmitting
                }
                onClick={() => {
                  void submitAnswer();
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
                  text-[#FFFFFF]
                  transition
                  hover:bg-[#005A52]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle
                      aria-hidden="true"
                      className="
                        h-4
                        w-4
                        animate-spin
                      "
                    />

                    در حال بررسی...
                  </>
                ) : (
                  "ثبت پاسخ و ادامه"
                )}
              </button>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function HeaderMetric({
  icon: Icon,
  label,
  value,
}: Readonly<{
  icon:
    typeof BrainCircuit;

  label:
    string;

  value:
    string;
}>) {
  return (
    <div
      className="
        min-w-[104px]
        rounded-xl
        border
        border-[#E2E8F0]
        bg-[#F8FAFC]
        px-3
        py-2
      "
    >
      <div
        className="
          flex
          items-center
          gap-1.5
          text-[#64748B]
        "
      >
        <Icon
          aria-hidden="true"
          className="h-3.5 w-3.5"
        />

        <span className="text-[9px]">
          {label}
        </span>
      </div>

      <p
        className="
          mt-1
          text-sm
          font-black
          text-[#0F172A]
        "
      >
        {value}
      </p>
    </div>
  );
}
