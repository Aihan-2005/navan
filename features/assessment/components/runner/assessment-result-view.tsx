"use client";

import Link from "next/link";

import {
  Award,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CircleX,
  Clock3,
  RefreshCw,
  Sparkles,
  Target,
} from "lucide-react";

import {
  useState,
} from "react";

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

  const hasObjectiveScore =
    result.skillScores.some(
      (skill) =>
        skill.totalCount > 0,
    );

  const pendingReviewCount =
    review.filter(
      (item) =>
        item.isCorrect ===
          null &&
        item.submittedAnswerLabel !==
          null,
    ).length;

  return (
    <main
      dir="rtl"
      className="
        mx-auto
        w-full
        max-w-[1120px]
        space-y-6
        pb-12
      "
    >
      <section
        className="
          relative
          overflow-hidden
          rounded-[28px]
          border
          border-[#C7E1DC]
          bg-[linear-gradient(135deg,#EAF8F5_0%,#FFFFFF_55%,#F5F0FF_100%)]
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
            -left-20
            -top-24
            h-64
            w-64
            rounded-full
            bg-[#14B8A6]/10
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
                text-sm
                font-bold
                text-[#00685F]
              "
            >
              <Award
                aria-hidden="true"
                className="h-5 w-5"
              />

              نتیجه ارزیابی
            </div>

            <h1
              className="
                mt-3
                text-2xl
                font-black
                text-[#0F172A]
                sm:text-3xl
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
                text-[#64748B]
              "
            >
              {result.aiSummary ??
                "ارزیابی تکمیل شد و نتیجه برای مسیر یادگیری آماده است."}
            </p>
          </div>

          {hasObjectiveScore ? (
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
                border-[6px]
                border-[#BFE0DA]
                bg-white
                shadow-sm
              "
            >
              <strong
                className="
                  text-4xl
                  font-black
                  text-[#00685F]
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
                  text-[#64748B]
                "
              >
                از ۱۰۰
              </span>
            </div>
          ) : (
            <div
              className="
                flex
                min-h-36
                w-full
                max-w-[210px]
                shrink-0
                flex-col
                items-center
                justify-center
                rounded-2xl
                border
                border-[#DED2F6]
                bg-[#F8F5FF]
                p-5
                text-center
              "
            >
              <Clock3
                aria-hidden="true"
                className="
                  h-8
                  w-8
                  text-[#712AE2]
                "
              />

              <strong
                className="
                  mt-3
                  text-sm
                  font-black
                  text-[#0F172A]
                "
              >
                در انتظار تحلیل
              </strong>

              <span
                className="
                  mt-1
                  text-[10px]
                  leading-5
                  text-[#64748B]
                "
              >
                هیچ نمره ساختگی نمایش داده
                نمی‌شود
              </span>
            </div>
          )}
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
              hasObjectiveScore
                ? result.estimatedCefrLevel
                : "در انتظار تحلیل"
            }
          />

          <ResultMetric
            label="پاسخ صحیح"
            value={
              hasObjectiveScore
                ? numberFormatter.format(
                    result.scoreSummary
                      .correctCount,
                  )
                : "—"
            }
          />

          <ResultMetric
            label="نیازمند تحلیل"
            value={numberFormatter.format(
              pendingReviewCount,
            )}
          />

          <ResultMetric
            label="Confidence"
            value={`${numberFormatter.format(
              result.confidence,
            )}٪`}
          />
        </div>
      </section>

      <section
        className="
          rounded-3xl
          border
          border-[#DFE8E6]
          bg-white
          p-5
          shadow-[0_8px_28px_rgba(15,23,42,0.04)]
          sm:p-6
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <BrainCircuit
            aria-hidden="true"
            className="
              h-5
              w-5
              text-[#00685F]
            "
          />

          <h2
            className="
              text-lg
              font-black
              text-[#0F172A]
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
            (skill) => {
              const pending =
                skill.totalCount ===
                0;

              return (
                <article
                  key={skill.skill}
                  className="
                    rounded-2xl
                    border
                    border-[#DFE8E6]
                    bg-[#FAFCFC]
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
                        font-bold
                        text-[#334155]
                      "
                    >
                      {
                        ASSESSMENT_SKILL_LABELS[
                          skill.skill
                        ]
                      }
                    </span>

                    {pending ? (
                      <span
                        className="
                          rounded-full
                          bg-[#F4EFFF]
                          px-2.5
                          py-1
                          text-[9px]
                          font-bold
                          text-[#712AE2]
                        "
                      >
                        در انتظار تحلیل
                      </span>
                    ) : (
                      <strong
                        className="
                          text-lg
                          font-black
                          text-[#00685F]
                        "
                      >
                        {numberFormatter.format(
                          skill.score,
                        )}
                        ٪
                      </strong>
                    )}
                  </div>

                  {pending ? (
                    <div
                      className="
                        mt-4
                        rounded-xl
                        border
                        border-dashed
                        border-[#D9CDF5]
                        bg-[#F8F5FF]
                        p-3
                      "
                    >
                      <p
                        className="
                          text-xs
                          leading-6
                          text-[#64748B]
                        "
                      >
                        پاسخ ثبت شده و پس از
                        اتصال موتور تحلیل
                        تخصصی، نمره و CEFR
                        این مهارت نمایش داده
                        می‌شود.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div
                        className="
                          mt-4
                          h-2
                          overflow-hidden
                          rounded-full
                          bg-[#E8EFED]
                        "
                      >
                        <div
                          className="
                            h-full
                            rounded-full
                            bg-[#00685F]
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
                          gap-3
                          text-[10px]
                          text-[#64748B]
                        "
                      >
                        <span>
                          سطح{" "}
                          {skill.cefrLevel}
                        </span>

                        <span>
                          {numberFormatter.format(
                            skill.correctCount,
                          )}
                          /
                          {numberFormatter.format(
                            skill.totalCount,
                          )}
                        </span>
                      </div>
                    </>
                  )}
                </article>
              );
            },
          )}
        </div>
      </section>

      {result.weaknesses.length >
      0 ? (
        <section
          className="
            rounded-3xl
            border
            border-[#F5D9A0]
            bg-[#FFFBEB]
            p-5
            sm:p-6
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <Target
              aria-hidden="true"
              className="
                h-5
                w-5
                text-[#D97706]
              "
            />

            <h2
              className="
                text-lg
                font-black
                text-[#0F172A]
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
              (insight) => (
                <article
                  key={insight.id}
                  className="
                    rounded-2xl
                    border
                    border-[#F3D8A2]
                    bg-white/70
                    p-4
                  "
                >
                  <p
                    className="
                      text-sm
                      font-black
                      text-[#0F172A]
                    "
                  >
                    {insight.title}
                  </p>

                  <p
                    className="
                      mt-2
                      text-xs
                      leading-6
                      text-[#64748B]
                    "
                  >
                    {insight.description}
                  </p>
                </article>
              ),
            )}
          </div>
        </section>
      ) : null}

      {result.strengths.length >
      0 ? (
        <section
          className="
            rounded-3xl
            border
            border-[#B8E4D1]
            bg-[#ECFDF5]
            p-5
            sm:p-6
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <CheckCircle2
              aria-hidden="true"
              className="
                h-5
                w-5
                text-[#047857]
              "
            />

            <h2
              className="
                text-lg
                font-black
                text-[#0F172A]
              "
            >
              نقاط قوت
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
            {result.strengths.map(
              (insight) => (
                <article
                  key={insight.id}
                  className="
                    rounded-2xl
                    border
                    border-[#C7E8D7]
                    bg-white/70
                    p-4
                  "
                >
                  <p
                    className="
                      text-sm
                      font-black
                      text-[#0F172A]
                    "
                  >
                    {insight.title}
                  </p>

                  <p
                    className="
                      mt-2
                      text-xs
                      leading-6
                      text-[#64748B]
                    "
                  >
                    {insight.description}
                  </p>
                </article>
              ),
            )}
          </div>
        </section>
      ) : null}

      <section
        className="
          rounded-3xl
          border
          border-[#DFE8E6]
          bg-white
          p-5
          shadow-[0_8px_28px_rgba(15,23,42,0.04)]
          sm:p-6
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
              h-5
              w-5
              text-[#712AE2]
            "
          />

          <h2
            className="
              text-lg
              font-black
              text-[#0F172A]
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

              const pending =
                item.isCorrect ===
                null;

              return (
                <article
                  key={item.questionId}
                  className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-[#E2E8F0]
                    bg-[#FAFCFC]
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
                      transition
                      hover:bg-[#F5F8F7]
                    "
                  >
                    <span
                      className={
                        item.isCorrect ===
                        true
                          ? `
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-[#ECFDF5]
                            text-[#047857]
                          `
                          : item.isCorrect ===
                            false
                            ? `
                              flex
                              h-9
                              w-9
                              shrink-0
                              items-center
                              justify-center
                              rounded-xl
                              bg-[#FEF2F2]
                              text-[#DC2626]
                            `
                            : `
                              flex
                              h-9
                              w-9
                              shrink-0
                              items-center
                              justify-center
                              rounded-xl
                              bg-[#F4EFFF]
                              text-[#712AE2]
                            `
                      }
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
                            text-[10px]
                            text-[#64748B]
                          "
                        >
                          سؤال{" "}
                          {numberFormatter.format(
                            index + 1,
                          )}
                        </span>

                        {pending ? (
                          <span
                            className="
                              rounded-full
                              bg-[#F4EFFF]
                              px-2
                              py-0.5
                              text-[9px]
                              font-bold
                              text-[#712AE2]
                            "
                          >
                            تحلیل تکمیلی
                          </span>
                        ) : null}
                      </div>

                      <p
                        dir="ltr"
                        className="
                          mt-1
                          truncate
                          text-left
                          text-sm
                          font-medium
                          text-[#334155]
                        "
                      >
                        {item.prompt}
                      </p>
                    </div>

                    {expanded ? (
                      <ChevronUp
                        aria-hidden="true"
                        className="
                          h-4
                          w-4
                          text-[#64748B]
                        "
                      />
                    ) : (
                      <ChevronDown
                        aria-hidden="true"
                        className="
                          h-4
                          w-4
                          text-[#64748B]
                        "
                      />
                    )}
                  </button>

                  {expanded ? (
                    <div
                      className="
                        border-t
                        border-[#E2E8F0]
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
                          label={
                            pending
                              ? "وضعیت"
                              : "پاسخ صحیح"
                          }
                          value={
                            pending
                              ? "در انتظار ارزیابی تخصصی"
                              : item.correctAnswerLabel ??
                                "—"
                          }
                        />
                      </div>

                      <p
                        className="
                          mt-4
                          text-sm
                          leading-7
                          text-[#64748B]
                        "
                      >
                        {item.feedback}
                      </p>

                      {item.explanation ? (
                        <div
                          className="
                            mt-4
                            rounded-xl
                            border
                            border-[#BFE0DA]
                            bg-[#F1FAF8]
                            p-4
                          "
                        >
                          <p
                            className="
                              text-xs
                              font-bold
                              text-[#00685F]
                            "
                          >
                            توضیح
                          </p>

                          <p
                            className="
                              mt-2
                              text-sm
                              leading-7
                              text-[#52615F]
                            "
                          >
                            {item.explanation}
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
      </section>

      {result.recommendedActions.length >
      0 ? (
        <section
          className="
            rounded-2xl
            border
            border-[#E4DCF7]
            bg-[#F8F5FF]
            p-5
          "
        >
          <h2
            className="
              text-sm
              font-black
              text-[#0F172A]
            "
          >
            قدم بعدی پیشنهادی
          </h2>

          <div
            className="
              mt-4
              flex
              flex-wrap
              gap-3
            "
          >
            {result.recommendedActions.map(
              (action) =>
                action.href ? (
                  <Link
                    key={action.id}
                    href={action.href}
                    className="
                      rounded-xl
                      bg-[#712AE2]
                      px-4
                      py-2.5
                      text-xs
                      font-bold
                      text-[#FFFFFF]
                      transition
                      hover:bg-[#5F20C5]
                    "
                  >
                    {action.title}
                  </Link>
                ) : null,
            )}
          </div>
        </section>
      ) : null}

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
            bg-[#00685F]
            px-5
            text-sm
            font-black
            text-[#FFFFFF]
            transition
            hover:bg-[#005A52]
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
            border-[#D8E2E0]
            bg-white
            px-5
            text-sm
            font-medium
            text-[#52615F]
            transition
            hover:bg-[#F8FAF9]
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
        rounded-2xl
        border
        border-[#DFE8E6]
        bg-white/90
        p-4
      "
    >
      <p
        className="
          text-[10px]
          text-[#64748B]
        "
      >
        {label}
      </p>

      <p
        className="
          mt-2
          text-lg
          font-black
          text-[#0F172A]
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
        border-[#E2E8F0]
        bg-white
        p-3
      "
    >
      <p
        className="
          text-[10px]
          text-[#64748B]
        "
      >
        {label}
      </p>

      <p
        dir="auto"
        className="
          mt-2
          whitespace-pre-wrap
          break-words
          text-sm
          leading-7
          text-[#334155]
        "
      >
        {value}
      </p>
    </div>
  );
}
