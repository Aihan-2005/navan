"use client";

import Link from "next/link";

import {
  Award,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CircleX,
  RefreshCw,
  Sparkles,
  Target,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  Card,
} from "../../../../components/ui/card";

import {
  cn,
} from "../../../../lib/utils/cn";

import {
  ASSESSMENT_SKILL_LABELS,
} from "../../constants/assessment.constants";

import type {
  AssessmentSubmissionResult,
} from "../../types/assessment-runner.types";

type AssessmentResultViewProps =
  Readonly<{
    title:
      string;

    submission:
      AssessmentSubmissionResult;

    onRetake:
      () => void;
  }>;

const numberFormatter =
  new Intl.NumberFormat(
    "fa-IR",
  );

export function AssessmentResultView({
  title,
  submission,
  onRetake,
}: AssessmentResultViewProps) {
   const {
    result,
    review,
  } =
    submission;

  const [
    expandedQuestionId,
    setExpandedQuestionId,
  ] =
    useState<string | null>(
      null,
    );

  return (
    <main
      className="
        mx-auto
        w-full
        max-w-6xl
        space-y-6
      "
    >
      <section
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-emerald-400/15
          bg-emerald-400/[0.035]
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
            h-72
            w-72
            rounded-full
            bg-emerald-500/10
            blur-3xl
          "
        />

        <div
          className="
             relative
            flex
            flex-col
            gap-7
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          <div>
            <div
              className="
                flex
                items-center
                gap-2
                text-emerald-300
              "
            >
              <Award
                aria-hidden="true"
                className="h-5 w-5"
              />

              نتیجه آزمون
            </div>

            <h1
              dir="ltr"
              className="
                mt-3
                text-left
                text-3xl
                font-bold
                text-white
              "
            >
              {title}
            </h1>

            <p
              className="
                mt-4
                max-w-2xl
                text-sm
                leading-8
                text-slate-400
              "
            >
              {result.aiSummary}
            </p>
          </div>

          <div
            className="
              flex
              h-36
              w-36
            shrink-0
              flex-col
              items-center
              justify-center
              rounded-full
              border
              border-emerald-300/20
              bg-emerald-400/[0.07]
            "
          >
            <strong
              className="
                text-4xl
                text-white
              "
            >
              {numberFormatter.format(
                result.overallScore,
              )}
            </strong>

            <span
              className="
                mt-1
                text-xs
                text-emerald-300
              "
            >
              از ۱۰۰
            </span>
          </div>
        </div>

        <div
          className="
            relative
            mt-7
            grid
            gap-3
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          <ResultMetric
            label="سطح تخمینی"
            value={
              result.estimatedCefrLevel
            }
          />

          <ResultMetric
            label="پاسخ صحیح"
            value={numberFormatter.format(
              result.scoreSummary
                .correctCount,
            )}
          />
 <ResultMetric
            label="بدون پاسخ"
            value={numberFormatter.format(
              result.scoreSummary
                .unansweredCount,
            )}
          />

          <ResultMetric
            label="XP"
            value={`+${numberFormatter.format(
              result.xpAwarded,
            )}`}
          />
        </div>
      </section>

      <Card className="p-5 sm:p-6">
        <div
          className="
            flex
            items-center
            gap-2
            text-cyan-300
          "
        >
          <BrainCircuit
            aria-hidden="true"
            className="h-5 w-5"
          />

          <h2
            className="
              text-lg
              font-bold
              text-white
            "
          >
            عملکرد مهارت‌ها
          </h2>
        </div>

        <div
          className="
            mt-5
            grid
            gap-4
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {result.skillScores.map(
            (
              skill,
            ) => (
              <div
                key={
               skill.skill
                }
                className="
                  rounded-2xl
                  border
                  border-white/[0.06]
                  bg-white/[0.025]
                  p-4
                "
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
                    className="
                      text-sm
                      font-medium
                      text-slate-300
                    "
                  >
                    {
                      ASSESSMENT_SKILL_LABELS[
                        skill.skill
                      ]
                    }
                  </span>

                  <strong
                    className="
                      text-white
                    "
                  >
                    {
                      skill.score
                    }
                    ٪
                  </strong>
                </div>

                <div
                  className="
                    mt-4
                    h-2
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
                    "
                    style={{
                      width:
                        `${skill.score}%`,
                    }}
                  />
                </div>

                <div
                  className="
                    mt-3
                    flex
                    justify-between
                    text-xs
                    text-slate-600
                  "
                >
                  <span>
                    سطح{" "}
                    {
                      skill.cefrLevel
                    }
                  </span>

                  <span>
                    {
                      skill.correctCount
                    }
                    /
                    {
                      skill.totalCount
                    }
                  </span>
                </div>
              </div>
            ),
          )}
        </div>
      </Card>

      {result.weaknesses.length >
      0 ? (
        <Card className="p-5 sm:p-6">
          <div
            className="
              flex
              items-center
              gap-2
              text-amber-300
            "
          >
            <Target
               aria-hidden="true"
              className="h-5 w-5"
            />

            <h2
              className="
                text-lg
                font-bold
                text-white
              "
            >
              اولویت‌های تمرین
            </h2>
          </div>

          <div
            className="
              mt-5
              grid
              gap-3
              md:grid-cols-2
            "
          >
            {result.weaknesses.map(
              (
                insight,
              ) => (
                <div
                  key={
                    insight.id
                  }
                  className="
                    rounded-xl
                    border
                    border-amber-400/10
                    bg-amber-400/[0.035]
                    p-4
                  "
                >
                  <p
                    className="
                      font-bold
                      text-white
                    "
                  >
                    {
                      insight.title
                    }
                  </p>

                  <p
                    className="
                      mt-2
                      text-xs
                      leading-6 text-slate-500
                    "
                  >
                    {
                      insight.description
                    }
                  </p>
                </div>
              ),
            )}
          </div>
        </Card>
      ) : null}

      <Card className="p-5 sm:p-6">
        <div
          className="
            flex
            items-center
            gap-2
            text-violet-300
          "
        >
          <Sparkles
            aria-hidden="true"
            className="h-5 w-5"
          />

          <h2
            className="
              text-lg
              font-bold
              text-white
            "
          >
            مرور سؤال‌ها
          </h2>
        </div>

        <div
          className="
            mt-5
            space-y-3
          "
        >
          {review.map(
            (
              item,
              index,
            ) => {
              const expanded =
                expandedQuestionId ===
                item.questionId;

              return (
                <article
                  key={
                     item.questionId
                  }
                  className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/[0.06]
                    bg-white/[0.02]
                  "
                >
                  <button
                    type="button"
                    onClick={() => {
                      setExpandedQuestionId(
                        expanded
                          ? null
                          : item.questionId,
                      );
                    }}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      p-4
                      text-right
                    "
                  >
                    <span
                      className={cn(
                        "flex",
                        "h-8",
                        "w-8",
                        "shrink-0",
                        "items-center",
                        "justify-center",
                        "rounded-lg",

                        item.isCorrect ===
                        true
                          ? "bg-emerald-400/10 text-emerald-300"
                          : item.isCorrect ===
                              false
                            ? "bg-red-400/10 text-red-300"
                            : "bg-amber-400/10 text-amber-300",
                      )}
                    >
                      {item.isCorrect ===
                      true ? (
                        <CheckCircle2
                          aria-hidden="true"
                          className="h-4 w-4"
                        />
                      ) : item.isCorrect ===
                        false ? (
                        <CircleX
                           aria-hidden="true"
                          className="h-4 w-4"
                        />
                      ) : (
                        <BrainCircuit
                          aria-hidden="true"
                          className="h-4 w-4"
                        />
                      )}
                    </span>

                    <div
                      className="
                        min-w-0
                        flex-1
                      "
                    >
                      <p
                        className="
                          text-xs
                          text-slate-600
                        "
                      >
                        سؤال{" "}
                        {
                          index +
                          1
                        }
                      </p>

                      <p
                        dir="ltr"
                        className="
                          mt-1
                          truncate
                          text-left
                          text-sm
                          text-slate-200
                        "
                      >
                        {
                          item.prompt
                        }
                      </p>
                    </div> {expanded ? (
                      <ChevronUp
                        aria-hidden="true"
                        className="
                          h-4
                          w-4
                          text-slate-500
                        "
                      />
                    ) : (
                      <ChevronDown
                        aria-hidden="true"
                        className="
                          h-4
                          w-4
                          text-slate-500
                        "
                      />
                    )}
                  </button>

                  {expanded ? (
                    <div
                      className="
                        border-t
                        border-white/[0.05]
                        p-4
                      "
                    >
                      <div
                        className="
                          grid
                          gap-3
                          md:grid-cols-2
                        "
                      >
                        <ReviewValue
                          label="پاسخ شما"
                          value={
                            item.submittedAnswerLabel ??
                            "بدون پاسخ"
                          }
                        />

                        <ReviewValue
                          label="پاسخ صحیح"
                          value={
                            item.correctAnswerLabel ??
                            "نیازمند ارزیابی AI"
                          }
                        />
                      </div>

                      <p
                        className="
                          mt-4
                          text-sm
                                                    leading-7
                          text-slate-400
                        "
                      >
                        {
                          item.feedback
                        }
                      </p>

                      {item.explanation ? (
                        <div
                          className="
                            mt-4
                            rounded-xl
                            border
                            border-cyan-400/10
                            bg-cyan-400/[0.035]
                            p-4
                          "
                        >
                          <p
                            className="
                              text-xs
                              font-medium
                              text-cyan-300
                            "
                          >
                            توضیح
                          </p>

                          <p
                            className="
                              mt-2
                              text-sm
                              leading-7
                              text-slate-400
                            "
                          >
                            {
                              item.explanation
                            }
                          </p>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </article>
              );
            },
          )}
        </div>
      </Card>

      <div
        className="
          flex
          flex-wrap
          justify-center
          gap-3
        "
      >
        <button
          type="button"
          onClick={
            onRetake
          }
          className="
            inline-flex
            min-h-11
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-cyan-400
            px-5
            text-sm
            font-bold
            text-slate-950
            transition
            hover:bg-cyan-300
          "
        >
          <RefreshCw
            aria-hidden="true"
            className="h-4 w-4"
          />

          تلاش دوباره
        </button>

        <Link
          href="/assessment"
          className="
            inline-flex
            min-h-11
            items-center
            justify-center
            rounded-xl
            border
            border-white/[0.07]
            bg-white/[0.025]
            px-5
            text-sm
            text-slate-300
          "
        >
          بازگشت به ارزیابی‌ها
        </Link>
      </div>
    </main>
  );
}
function ResultMetric({
  label,
  value,
}: Readonly<{
  label:
    string;

  value:
    string;
}>) {
  return (
    <div
      className="
        rounded-xl
        border
        border-white/[0.06]
        bg-black/10
        p-4
      "
    >
      <p
        className="
          text-xs
          text-slate-600
        "
      >
        {label}
      </p>

      <p
        className="
          mt-2
          text-xl
          font-bold
          text-white
        "
      >
        {value}
      </p>
    </div>
  );
}

function ReviewValue({
  label,
  value,
}: Readonly<{
  label:
    string;

  value:
    string;
}>) {
  return (
    <div
      className="
        rounded-xl
 border
        border-white/[0.05]
        bg-black/10
        p-3
      "
    >
      <p
        className="
          text-[10px]
          text-slate-600
        "
      >
        {label}
      </p>

      <p
        dir="ltr"
        className="
          mt-2
          text-left
          text-sm
          leading-6
          text-slate-300
        "
      >
        {value}
      </p>
    </div>
  );
}