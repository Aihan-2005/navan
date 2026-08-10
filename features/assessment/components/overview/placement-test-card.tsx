import Link from "next/link";

import {
  ArrowLeft,
  BrainCircuit,
  Clock3,
  ListChecks,
  Sparkles,
  Target,
} from "lucide-react";

import {
  Card,
} from "../../../../components/ui/card";

import {
  ASSESSMENT_SKILL_LABELS,
} from "../../constants/assessment.constants";

import type {
  AssessmentPlacementSummary,
} from "../../types/assessment-overview.types";

type PlacementTestCardProps =
  Readonly<{
    placement:
      AssessmentPlacementSummary;
  }>;

const numberFormatter =
  new Intl.NumberFormat(
    "fa-IR",
  );

export function PlacementTestCard({
  placement,
}: PlacementTestCardProps) {
  return (
    <Card
      className="
        relative overflow-hidden
        border-violet-400/20
        bg-violet-400/[0.045]
        p-6 sm:p-7
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -left-20 -top-20
          h-56 w-56
          rounded-full
          bg-violet-500/10
          blur-3xl
        "
      />

      <div className="relative">
        <div
          className="
            flex flex-col gap-6
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          <div
            className="
              max-w-3xl
            "
          >
            <div
              className="
                flex items-center
                gap-2 text-violet-300
              "
            >
              <Target
                aria-hidden="true"
                className="h-5 w-5"
              />

              <span
                className="
                  text-sm font-medium
                "
              >
                Placement Test
              </span>
            </div>

            <h2
              className="
                mt-3 text-2xl
                font-bold text-white
              "
            >
              {placement.title}
            </h2>

            <p
              className="
                mt-3 text-sm
                leading-8
                text-slate-400
              "
            >
              {placement.description}
            </p>

            <div
              className="
                mt-5 flex
                flex-wrap gap-2
              "
            >
              {placement.skills.map(
                (skill) => (
                  <span
                    key={skill}
                    className="
                      rounded-full
                      border
                      border-white/[0.07]
                      bg-white/[0.04]
                      px-3 py-1.5
                      text-xs
                      text-slate-400
                    "
                  >
                    {
                      ASSESSMENT_SKILL_LABELS[
                        skill
                      ]
                    }
                  </span>
                ),
              )}
            </div>
          </div>

          <div
            className="
              w-full shrink-0
              lg:w-72
            "
          >
            <div
              className="
                grid grid-cols-2
                gap-3
              "
            >
              <Metric
                icon={Clock3}
                label="زمان تقریبی"
                value={`${numberFormatter.format(
                  placement.estimatedMinutes,
                )} دقیقه`}
              />

              <Metric
                icon={ListChecks}
                label="بانک سؤال"
                value={`${numberFormatter.format(
                  placement.questionCount,
                )} سؤال`}
              />

              <Metric
                icon={BrainCircuit}
                label="نوع آزمون"
                value={
                  placement.mode ===
                  "adaptive"
                    ? "تطبیقی"
                    : "ثابت"
                }
              />

              <Metric
                icon={Sparkles}
                label="شروع پیشنهادی"
                value={
                  placement
                    .recommendedStartingLevel ??
                  "خودکار"
                }
              />
            </div>

            <Link
              href={
                placement.href
              }
              className="
                mt-4 inline-flex
                min-h-12 w-full
                items-center
                justify-center gap-2
                rounded-xl
                bg-violet-400
                px-5 py-3
                text-sm font-bold
                text-slate-950
                transition
                hover:bg-violet-300
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-violet-200
              "
            >
              مشاهده آزمون

              <ArrowLeft
                aria-hidden="true"
                className="h-4 w-4"
              />
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: Readonly<{
  icon: typeof Clock3;

  label: string;
  value: string;
}>) {
  return (
    <div
      className="
        rounded-xl border
        border-white/[0.07]
        bg-black/10
        p-3
      "
    >
      <Icon
        aria-hidden="true"
        className="
          h-4 w-4
          text-violet-300
        "
      />

      <p
        className="
          mt-2 text-[10px]
          text-slate-600
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1 text-xs
          font-bold text-white
        "
      >
        {value}
      </p>
    </div>
  );
}