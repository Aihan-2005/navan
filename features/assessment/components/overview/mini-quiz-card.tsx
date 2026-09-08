import Link from "next/link";

import {
  ArrowLeft,
  Clock3,
  ListChecks,
  LockKeyhole,
  Sparkles,
} from "lucide-react";

import {
  ASSESSMENT_SKILL_LABELS,
} from "../../constants/assessment.constants";

import type {
  AssessmentMiniQuizSummary,
} from "../../types/assessment-overview.types";

type MiniQuizCardProps =
  Readonly<{
    quiz:
      AssessmentMiniQuizSummary;
  }>;

const numberFormatter =
  new Intl.NumberFormat("fa-IR");

export function MiniQuizCard({
  quiz,
}: MiniQuizCardProps) {
  const isAvailable =
    quiz.status === "available" &&
    Boolean(quiz.href);

  return (
    <article
      className="
        flex
        h-full
        flex-col
        rounded-2xl
        border
        border-[#DFE8E6]
        bg-white
        p-5
        shadow-[0_8px_25px_rgba(15,23,42,0.04)]
        transition
        duration-200
        hover:-translate-y-0.5
        hover:border-[#AED6D0]
        hover:shadow-[0_12px_30px_rgba(15,23,42,0.07)]
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
            rounded-full
            bg-[#E7F4F2]
            px-2.5
            py-1
            text-[10px]
            font-bold
            text-[#00685F]
          "
        >
          {
            ASSESSMENT_SKILL_LABELS[
              quiz.skill
            ]
          }
        </span>

        <span
          className="
            rounded-full
            bg-[#F4F0FF]
            px-2.5
            py-1
            text-[10px]
            font-black
            text-[#712AE2]
          "
        >
          {quiz.cefrLevel}
        </span>
      </div>

      <h3
        className="
          mt-5
          text-lg
          font-black
          leading-7
          text-[#0F172A]
        "
      >
        {quiz.title}
      </h3>

      <p
        className="
          mt-3
          flex-1
          text-sm
          leading-7
          text-[#64748B]
        "
      >
        {quiz.description}
      </p>

      {quiz.focusTags.length > 0 ? (
        <div
          className="
            mt-4
            flex
            flex-wrap
            gap-2
          "
        >
          {quiz.focusTags.map(
            (tag) => (
              <span
                key={tag}
                dir="ltr"
                className="
                  rounded-lg
                  bg-[#F8FAFC]
                  px-2
                  py-1
                  text-[10px]
                  text-[#64748B]
                "
              >
                {tag}
              </span>
            ),
          )}
        </div>
      ) : null}

      <div
        className="
          mt-5
          grid
          grid-cols-3
          gap-2
          border-t
          border-[#E8EEEC]
          pt-4
        "
      >
        <QuizMetric
          icon={Clock3}
          value={`${numberFormatter.format(
            quiz.estimatedMinutes,
          )} دقیقه`}
        />

        <QuizMetric
          icon={ListChecks}
          value={`${numberFormatter.format(
            quiz.questionCount,
          )} سؤال`}
        />

        <QuizMetric
          icon={Sparkles}
          value={`+${numberFormatter.format(
            quiz.xpReward,
          )} XP`}
        />
      </div>

      {isAvailable && quiz.href ? (
        <Link
          href={quiz.href}
          className="
            mt-4
            inline-flex
            min-h-10
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#00685F]
            px-4
            text-xs
            font-black
            text-[#FFFFFF]
            transition
            hover:bg-[#005A52]
          "
        >
          شروع کوییز

          <ArrowLeft
            aria-hidden="true"
            className="h-3.5 w-3.5"
          />
        </Link>
      ) : (
        <div
          className="
            mt-4
            inline-flex
            min-h-10
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#F1F5F4]
            px-4
            text-xs
            font-bold
            text-[#94A3B8]
          "
        >
          <LockKeyhole
            aria-hidden="true"
            className="h-3.5 w-3.5"
          />

          به‌زودی
        </div>
      )}
    </article>
  );
}

function QuizMetric({
  icon: Icon,
  value,
}: Readonly<{
  icon: typeof Clock3;
  value: string;
}>) {
  return (
    <span
      className="
        flex
        min-w-0
        items-center
        justify-center
        gap-1
        text-[10px]
        text-[#64748B]
      "
    >
      <Icon
        aria-hidden="true"
        className="
          h-3.5
          w-3.5
          shrink-0
          text-[#00685F]
        "
      />

      <span className="truncate">
        {value}
      </span>
    </span>
  );
}