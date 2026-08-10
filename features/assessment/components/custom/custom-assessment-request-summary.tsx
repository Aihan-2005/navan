import {
  BrainCircuit,
  CheckCircle2,
  Clock3,
  ListChecks,
  Sparkles,
} from "lucide-react";

import {
  Card,
} from "../../../../components/ui/card";

import {
  ASSESSMENT_CUSTOM_EXPERIENCE_MODE_LABELS,
  ASSESSMENT_GENERATION_STATUS_LABELS,
  ASSESSMENT_SKILL_LABELS,
} from "../../constants/assessment.constants";

import type {
  AssessmentGenerationRequest,
} from "../../types/assessment-generation.types";

type CustomAssessmentRequestSummaryProps =
  Readonly<{
    request:
      AssessmentGenerationRequest;
  }>;

const numberFormatter =
  new Intl.NumberFormat(
    "fa-IR",
  );

export function CustomAssessmentRequestSummary({
  request,
}: CustomAssessmentRequestSummaryProps) {
  return (
    <Card
      className="
        border-emerald-400/15
        bg-emerald-400/[0.035]
        p-5 sm:p-6
      "
    >
      <div
        className="
          flex items-start gap-3
        "
      >
        <span
          className="
            flex h-11 w-11
            shrink-0 items-center
            justify-center
            rounded-xl
            bg-emerald-400/10
            text-emerald-300
          "
        >
          <CheckCircle2
            aria-hidden="true"
            className="h-5 w-5"
          />
        </span>

        <div className="min-w-0">
          <p
            className="
              text-xs font-medium
              text-emerald-300
            "
          >
            درخواست معتبر ساخته شد
          </p>

          <h2
            className="
              mt-1 text-lg
              font-bold text-white
            "
          >
            {
              ASSESSMENT_GENERATION_STATUS_LABELS[
                request.status
              ]
            }
          </h2>

          <p
            className="
              mt-2 text-sm
              leading-7
              text-slate-500
            "
          >
            {request.message}
          </p>
        </div>
      </div>

      <div
        className="
          mt-6 grid gap-3
          sm:grid-cols-2
          lg:grid-cols-4
        "
      >
        <SummaryMetric
          icon={BrainCircuit}
          label="نوع"
          value={
            ASSESSMENT_CUSTOM_EXPERIENCE_MODE_LABELS[
              request.configuration
                .experienceMode
            ]
          }
        />

        <SummaryMetric
          icon={Sparkles}
          label="سطح پیشنهادی"
          value={
            request.contextSummary
              .suggestedCefrLevel
          }
        />

        <SummaryMetric
          icon={ListChecks}
          label="تعداد سؤال"
          value={numberFormatter.format(
            request.configuration
              .questionCount,
          )}
        />

        <SummaryMetric
          icon={Clock3}
          label="زمان"
          value={`${numberFormatter.format(
            request.configuration
              .timeLimitMinutes,
          )} دقیقه`}
        />
      </div>

      <div
        className="
          mt-5 rounded-xl
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
          مهارت‌های انتخاب‌شده
        </p>

        <div
          className="
            mt-3 flex
            flex-wrap gap-2
          "
        >
          {request.configuration
            .selectedSkills.map(
              (skill) => (
                <span
                  key={skill}
                  className="
                    rounded-full
                    bg-cyan-400/10
                    px-3 py-1.5
                    text-xs
                    text-cyan-200
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
          mt-4 rounded-xl
          border
          border-violet-400/10
          bg-violet-400/[0.035]
          p-4
        "
      >
        <p
          className="
            text-xs leading-6
            text-violet-200/70
          "
        >
          شناسه درخواست:
        </p>

        <code
          dir="ltr"
          className="
            mt-1 block
            overflow-x-auto
            text-xs
            text-violet-200
          "
        >
          {request.id}
        </code>
      </div>
    </Card>
  );
}

function SummaryMetric({
  icon: Icon,
  label,
  value,
}: Readonly<{
  icon: typeof BrainCircuit;

  label: string;
  value: string;
}>) {
  return (
    <div
      className="
        rounded-xl border
        border-white/[0.06]
        bg-white/[0.025]
        p-4
      "
    >
      <Icon
        aria-hidden="true"
        className="
          h-4 w-4
          text-emerald-300
        "
      />

      <p
        className="
          mt-3 text-[10px]
          text-slate-600
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1 text-sm
          font-bold text-white
        "
      >
        {value}
      </p>
    </div>
  );
}