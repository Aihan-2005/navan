import {
  BookOpenText,
  BrainCircuit,
  Ear,
  Languages,
  MessageCircle,
  PenLine,
} from "lucide-react";

import {
  ASSESSMENT_SKILL_LABELS,
} from "../../constants/assessment.constants";

import type {
  AssessmentLearnerSkillSignal,
} from "../../types/assessment-context.types";

type SkillEstimateCardProps =
  Readonly<{
    signal:
      AssessmentLearnerSkillSignal;
  }>;

const numberFormatter =
  new Intl.NumberFormat("fa-IR");

const skillTone: Record<
  AssessmentLearnerSkillSignal["skill"],
  Readonly<{
    iconSurface: string;
    iconColor: string;
    bar: string;
  }>
> = {
  reading: {
    iconSurface: "bg-[#E7F4F2]",
    iconColor: "text-[#00685F]",
    bar: "bg-[#14B8A6]",
  },

  listening: {
    iconSurface: "bg-[#EAF2FF]",
    iconColor: "text-[#2563EB]",
    bar: "bg-[#3B82F6]",
  },

  speaking: {
    iconSurface: "bg-[#F4F0FF]",
    iconColor: "text-[#712AE2]",
    bar: "bg-[#8B5CF6]",
  },

  writing: {
    iconSurface: "bg-[#FFF0E6]",
    iconColor: "text-[#EA580C]",
    bar: "bg-[#F97316]",
  },

  grammar: {
    iconSurface: "bg-[#FFF8E1]",
    iconColor: "text-[#B7791F]",
    bar: "bg-[#EAB308]",
  },

  vocabulary: {
    iconSurface: "bg-[#E9FBF3]",
    iconColor: "text-[#047857]",
    bar: "bg-[#10B981]",
  },
};

function getSkillIcon(
  skill:
    AssessmentLearnerSkillSignal["skill"],
) {
  switch (skill) {
    case "reading":
      return BookOpenText;

    case "listening":
      return Ear;

    case "speaking":
      return MessageCircle;

    case "writing":
      return PenLine;

    case "grammar":
      return BrainCircuit;

    case "vocabulary":
      return Languages;
  }
}

export function SkillEstimateCard({
  signal,
}: SkillEstimateCardProps) {
  const Icon =
    getSkillIcon(signal.skill);

  const tone =
    skillTone[signal.skill];

  const delta =
    signal.score !== null &&
    signal.previousScore !== null
      ? signal.score -
        signal.previousScore
      : null;

  const safeScore =
    signal.score === null
      ? 0
      : Math.min(
          100,
          Math.max(
            0,
            signal.score,
          ),
        );

  return (
    <article
      className="
        rounded-2xl
        border
        border-[#DFE8E6]
        bg-white
        p-5
        shadow-[0_8px_25px_rgba(15,23,42,0.04)]
        transition
        hover:border-[#C4DAD6]
        hover:shadow-[0_12px_30px_rgba(15,23,42,0.06)]
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
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <span
            className={`
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              ${tone.iconSurface}
              ${tone.iconColor}
            `}
          >
            <Icon
              aria-hidden="true"
              className="h-5 w-5"
            />
          </span>

          <div>
            <h3
              className="
                text-sm
                font-black
                text-[#0F172A]
              "
            >
              {
                ASSESSMENT_SKILL_LABELS[
                  signal.skill
                ]
              }
            </h3>

            <p
              className="
                mt-1
                text-[11px]
                text-[#64748B]
              "
            >
              برآورد فعلی مهارت
            </p>
          </div>
        </div>

        <span
          className="
            rounded-lg
            bg-[#F1F5F4]
            px-2.5
            py-1
            text-xs
            font-black
            text-[#334155]
          "
        >
          {signal.cefrLevel ?? "—"}
        </span>
      </div>

      {signal.score !== null ? (
        <>
          <div
            className="
              mt-5
              flex
              items-end
              justify-between
              gap-3
            "
          >
            <div>
              <strong
                className="
                  text-2xl
                  font-black
                  text-[#0F172A]
                "
              >
                {numberFormatter.format(
                  signal.score,
                )}
              </strong>

              <span
                className="
                  mr-1
                  text-xs
                  text-[#94A3B8]
                "
              >
                / 100
              </span>
            </div>

            {delta !== null ? (
              <span
                className={
                  delta >= 0
                    ? "text-xs font-bold text-[#047857]"
                    : "text-xs font-bold text-[#C2410C]"
                }
              >
                {delta > 0 ? "+" : ""}
                {numberFormatter.format(
                  delta,
                )}
              </span>
            ) : null}
          </div>

          <div
            role="progressbar"
            aria-label={`امتیاز ${
              ASSESSMENT_SKILL_LABELS[
                signal.skill
              ]
            }`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={
              signal.score
            }
            className="
              mt-3
              h-2
              w-full
              overflow-hidden
              rounded-full
              bg-[#EDF2F1]
            "
          >
            <div
              className={`
                h-full
                rounded-full
                transition-[width]
                duration-500
                ${tone.bar}
              `}
              style={{
                width:
                  `${safeScore}%`,
              }}
            />
          </div>
        </>
      ) : (
        <div
          className="
            mt-5
            rounded-xl
            border
            border-dashed
            border-[#CBD5E1]
            bg-[#F8FAFC]
            px-4
            py-3
          "
        >
          <p
            className="
              text-xs
              leading-6
              text-[#64748B]
            "
          >
            هنوز داده کافی برای تخمین
            این مهارت وجود ندارد.
          </p>
        </div>
      )}

      <div
        className="
          mt-4
          flex
          justify-between
          gap-3
          text-[10px]
          text-[#64748B]
        "
      >
        <span>
          {numberFormatter.format(
            signal.completedActivities,
          )}{" "}
          فعالیت
        </span>

        <span>
          {numberFormatter.format(
            signal.totalPracticeMinutes,
          )}{" "}
          دقیقه تمرین
        </span>
      </div>
    </article>
  );
}