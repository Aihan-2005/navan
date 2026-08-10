import {
  BookOpenText,
  BrainCircuit,
  Ear,
  Languages,
  MessageCircle,
  PenLine,
} from "lucide-react";

import {
  Card,
} from "../../../../components/ui/card";

import {
  Progress,
} from "../../../../components/ui/progress";

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
  new Intl.NumberFormat(
    "fa-IR",
  );

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
    getSkillIcon(
      signal.skill,
    );

  const delta =
    signal.score !== null &&
    signal.previousScore !==
      null
      ? signal.score -
        signal.previousScore
      : null;

  return (
    <Card
      className="
        p-5
        transition
        hover:border-cyan-400/15
        hover:bg-white/[0.055]
      "
    >
      <div
        className="
          flex items-start
          justify-between gap-4
        "
      >
        <div
          className="
            flex items-center gap-3
          "
        >
          <span
            className="
              flex h-10 w-10
              shrink-0 items-center
              justify-center
              rounded-xl
              bg-cyan-400/10
              text-cyan-300
            "
          >
            <Icon
              aria-hidden="true"
              className="h-5 w-5"
            />
          </span>

          <div>
            <h3
              className="
                text-sm font-bold
                text-white
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
                mt-1 text-[11px]
                text-slate-600
              "
            >
              برآورد فعلی
            </p>
          </div>
        </div>

        <span
          className="
            rounded-lg
            bg-white/[0.05]
            px-2.5 py-1
            text-xs font-bold
            text-slate-300
          "
        >
          {signal.cefrLevel ??
            "—"}
        </span>
      </div>

      {signal.score !== null ? (
        <>
          <div
            className="
              mt-5 flex
              items-end
              justify-between
            "
          >
            <div>
              <strong
                className="
                  text-2xl
                  font-black
                  text-white
                "
              >
                {numberFormatter.format(
                  signal.score,
                )}
              </strong>

              <span
                className="
                  mr-1 text-xs
                  text-slate-600
                "
              >
                / 100
              </span>
            </div>

            {delta !== null ? (
              <span
                className={
                  delta >= 0
                    ? "text-xs text-emerald-300"
                    : "text-xs text-amber-300"
                }
              >
                {delta > 0
                  ? "+"
                  : ""}
                {numberFormatter.format(
                  delta,
                )}
              </span>
            ) : null}
          </div>

          <Progress
            value={signal.score}
            label={`امتیاز ${
              ASSESSMENT_SKILL_LABELS[
                signal.skill
              ]
            }`}
            className="mt-3"
          />
        </>
      ) : (
        <div
          className="
            mt-5 rounded-xl
            border
            border-dashed
            border-white/[0.07]
            bg-white/[0.02]
            px-4 py-3
          "
        >
          <p
            className="
              text-xs leading-6
              text-slate-600
            "
          >
            هنوز داده کافی برای تخمین
            این مهارت نداریم.
          </p>
        </div>
      )}

      <div
        className="
          mt-4 flex
          justify-between
          text-[10px]
          text-slate-700
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
    </Card>
  );
}