import Link from "next/link";

import {
  ArrowLeft,
  Clock3,
  LockKeyhole,
  Sparkles,
} from "lucide-react";

import {
  Card,
} from "../../../../components/ui/card";

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
  new Intl.NumberFormat(
    "fa-IR",
  );

export function MiniQuizCard({
  quiz,
}: MiniQuizCardProps) {
  const isAvailable =
    quiz.status ===
      "available" &&
    Boolean(quiz.href);

  return (
    <Card
      className="
        flex h-full
        flex-col p-5
      "
    >
      <div
        className="
          flex items-center
          justify-between gap-3
        "
      >
        <span
          className="
            rounded-full
            bg-cyan-400/10
            px-2.5 py-1
            text-[10px]
            font-medium
            text-cyan-300
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
            bg-white/[0.05]
            px-2.5 py-1
            text-[10px]
            font-bold
            text-slate-400
          "
        >
          {quiz.cefrLevel}
        </span>
      </div>

      <h3
        dir="ltr"
        className="
          mt-5 text-left
          text-lg font-bold
          text-white
        "
      >
        {quiz.title}
      </h3>

      <p
        className="
          mt-3 flex-1
          text-sm leading-7
          text-slate-500
        "
      >
        {quiz.description}
      </p>

      <div
        className="
          mt-4 flex
          flex-wrap gap-2
        "
      >
        {quiz.focusTags.map(
          (tag) => (
            <span
              key={tag}
              dir="ltr"
              className="
                rounded-lg
                bg-white/[0.035]
                px-2 py-1
                text-[10px]
                text-slate-600
              "
            >
              {tag}
            </span>
          ),
        )}
      </div>

      <div
        className="
          mt-5 flex
          items-center
          justify-between
          border-t
          border-white/[0.06]
          pt-4
        "
      >
        <div
          className="
            flex gap-4
            text-[11px]
            text-slate-600
          "
        >
          <span
            className="
              inline-flex
              items-center gap-1
            "
          >
            <Clock3
              aria-hidden="true"
              className="h-3.5 w-3.5"
            />

            {numberFormatter.format(
              quiz.estimatedMinutes,
            )}{" "}
            دقیقه
          </span>

          <span
            className="
              inline-flex
              items-center gap-1
            "
          >
            <Sparkles
              aria-hidden="true"
              className="h-3.5 w-3.5"
            />

            +{numberFormatter.format(
              quiz.xpReward,
            )} XP
          </span>
        </div>

        {isAvailable &&
        quiz.href ? (
          <Link
            href={quiz.href}
            className="
              inline-flex
              items-center gap-1.5
              text-xs font-bold
              text-cyan-300
              transition
              hover:text-cyan-200
            "
          >
            شروع

            <ArrowLeft
              aria-hidden="true"
              className="h-3.5 w-3.5"
            />
          </Link>
        ) : (
          <span
            className="
              inline-flex
              items-center gap-1.5
              text-[10px]
              text-slate-700
            "
          >
            <LockKeyhole
              aria-hidden="true"
              className="h-3.5 w-3.5"
            />

            به‌زودی
          </span>
        )}
      </div>
    </Card>
  );
}