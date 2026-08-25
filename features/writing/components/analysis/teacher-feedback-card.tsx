import {
  Lightbulb,
  MessageSquareText,
  Target,
} from "lucide-react";

import type {
  WritingAnalysisResult,
} from "../../types/writing.types";

type TeacherFeedbackCardProps =
  Readonly<{
    analysis:
      WritingAnalysisResult;
  }>;

export function TeacherFeedbackCard({
  analysis,
}: TeacherFeedbackCardProps) {
  const coach =
    analysis.aiCoach;

  const headline =
    coach?.headline ??
    "بازخورد نوشته";

  const feedback =
    coach?.diagnosis ??
    analysis.nextPractice ??
    "بازخوردی برای این نوشته ثبت نشده است.";

  const nextFocus =
    coach?.nextFocus ??
    null;

  const nextSessionGoal =
    coach?.nextSessionGoal ??
    analysis.nextPractice ??
    null;

  const encouragement =
    coach?.encouragement ??
    null;

  return (
    <section
      dir="rtl"
      className="
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-slate-950/60
      "
    >
      <header
        className="
          border-b
          border-white/10
          p-6
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <span
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-cyan-400/10
              text-cyan-300
            "
          >
            <MessageSquareText
              aria-hidden="true"
              className="
                h-5
                w-5
              "
              strokeWidth={1.8}
            />
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
                font-medium
                text-cyan-300
              "
            >
              بازخورد مدرس
            </p>

            <h3
              className="
                mt-1
                text-lg
                font-bold
                leading-7
                text-white
              "
            >
              {headline}
            </h3>
          </div>
        </div>
      </header>

      <div
        className="
          space-y-5
          p-6
        "
      >
        <p
          className="
            text-sm
            leading-8
            text-slate-300
          "
        >
          {feedback}
        </p>

        {nextFocus ? (
          <FeedbackInfoCard
            icon={Target}
            label="تمرکز بعدی"
            value={nextFocus}
          />
        ) : null}

        {nextSessionGoal ? (
          <FeedbackInfoCard
            icon={Lightbulb}
            label="هدف تمرین بعدی"
            value={nextSessionGoal}
          />
        ) : null}

        {encouragement ? (
          <div
            className="
              rounded-2xl
              border
              border-emerald-400/15
              bg-emerald-400/[0.06]
              px-4
              py-3
            "
          >
            <p
              className="
                text-sm
                leading-7
                text-emerald-200
              "
            >
              {encouragement}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

type FeedbackInfoCardProps =
  Readonly<{
    icon:
      typeof Target;

    label:
      string;

    value:
      string;
  }>;

function FeedbackInfoCard({
  icon: Icon,
  label,
  value,
}: FeedbackInfoCardProps) {
  return (
    <div
      className="
        flex
        items-start
        gap-3
        rounded-2xl
        border
        border-white/[0.08]
        bg-white/[0.04]
        p-4
      "
    >
      <span
        className="
          mt-0.5
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-violet-400/10
          text-violet-300
        "
      >
        <Icon
          aria-hidden="true"
          className="
            h-4
            w-4
          "
          strokeWidth={1.8}
        />
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
            font-medium
            text-slate-500
          "
        >
          {label}
        </p>

        <p
          className="
            mt-1
            text-sm
            font-medium
            leading-7
            text-slate-200
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
}
