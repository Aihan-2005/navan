import Link from "next/link";

import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Info,
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
  AssessmentLearnerContext,
} from "../../types/assessment-context.types";

import type {
  AssessmentDefinition,
} from "../../types/assessment.types";

type PlacementIntroProps =
  Readonly<{
    assessment:
      AssessmentDefinition;

    learner:
      AssessmentLearnerContext;
  }>;

const numberFormatter =
  new Intl.NumberFormat(
    "fa-IR",
  );

export function PlacementIntro({
  assessment,
  learner,
}: PlacementIntroProps) {
  const startingLevel =
    learner.currentCefrLevel ??
    assessment.adaptiveConfig
      ?.startingCefrLevel ??
    "B1";

  return (
    <main
      className="
        mx-auto w-full
        max-w-5xl space-y-6
      "
    >
      <Link
        href="/assessment"
        className="
          inline-flex items-center
          gap-2 text-sm
          text-slate-500
          transition
          hover:text-white
        "
      >
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4"
        />

        بازگشت به ارزیابی‌ها
      </Link>

      <section
        className="
          relative overflow-hidden
          rounded-3xl border
          border-violet-400/20
          bg-violet-400/[0.04]
          p-6 sm:p-8
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -left-24 -top-24
            h-72 w-72
            rounded-full
            bg-violet-500/15
            blur-3xl
          "
        />

        <div className="relative">
          <div
            className="
              flex items-center gap-2
              text-violet-300
            "
          >
            <Target
              aria-hidden="true"
              className="h-5 w-5"
            />

            آزمون تعیین سطح
          </div>

          <h1
            className="
              mt-4 text-3xl
              font-bold text-white
              sm:text-4xl
            "
          >
            {assessment.title}
          </h1>

          <p
            className="
              mt-4 max-w-3xl
              text-sm leading-8
              text-slate-400
            "
          >
            {assessment.description}
          </p>

          <div
            className="
              mt-6 grid gap-3
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            <IntroMetric
              icon={Clock3}
              label="زمان تقریبی"
              value={`${numberFormatter.format(
                assessment.estimatedMinutes,
              )} دقیقه`}
            />

            <IntroMetric
              icon={ListChecks}
              label="بانک سؤال"
              value={`${numberFormatter.format(
                assessment.questionCount,
              )} سؤال`}
            />

            <IntroMetric
              icon={BrainCircuit}
              label="مدل آزمون"
              value={
                assessment.mode ===
                "adaptive"
                  ? "Adaptive"
                  : "Fixed"
              }
            />

            <IntroMetric
              icon={Sparkles}
              label="سطح شروع"
              value={startingLevel}
            />
          </div>
        </div>
      </section>

      <Card className="p-5 sm:p-6">
        <h2
          className="
            text-xl font-bold
            text-white
          "
        >
          مهارت‌های این آزمون
        </h2>

        <p
          className="
            mt-2 text-sm
            leading-7 text-slate-500
          "
        >
          نسخه اول آزمون روی Grammar،
          Vocabulary و Reading تمرکز
          دارد. Listening در مرحله
          اتصال Audio Engine اضافه
          خواهد شد.
        </p>

        <div
          className="
            mt-5 grid gap-3
            md:grid-cols-3
          "
        >
          {[...assessment.sections]
            .sort(
              (
                firstSection,
                secondSection,
              ) =>
                firstSection.order -
                secondSection.order,
            )
            .map(
              (section) => (
                <div
                  key={section.id}
                  className="
                    rounded-2xl border
                    border-white/[0.07]
                    bg-white/[0.025]
                    p-4
                  "
                >
                  <div
                    className="
                      flex items-center
                      justify-between
                      gap-3
                    "
                  >
                    <span
                      className="
                        flex h-9 w-9
                        items-center
                        justify-center
                        rounded-xl
                        bg-cyan-400/10
                        text-cyan-300
                      "
                    >
                      <CheckCircle2
                        aria-hidden="true"
                        className="h-4 w-4"
                      />
                    </span>

                    <span
                      className="
                        text-[10px]
                        text-slate-600
                      "
                    >
                      {numberFormatter.format(
                        section
                          .questionIds
                          .length,
                      )}{" "}
                      سؤال
                    </span>
                  </div>

                  <h3
                    className="
                      mt-4 font-bold
                      text-white
                    "
                  >
                    {
                      ASSESSMENT_SKILL_LABELS[
                        section.skill
                      ]
                    }
                  </h3>

                  <p
                    className="
                      mt-2 text-xs
                      leading-6
                      text-slate-600
                    "
                  >
                    {
                      section.description
                    }
                  </p>
                </div>
              ),
            )}
        </div>
      </Card>

      <Card
        className="
          border-cyan-400/15
          bg-cyan-400/[0.035]
          p-5 sm:p-6
        "
      >
        <div
          className="
            flex items-start gap-3
          "
        >
          <Info
            aria-hidden="true"
            className="
              mt-0.5 h-5 w-5
              shrink-0
              text-cyan-300
            "
          />

          <div>
            <h2
              className="
                font-bold text-white
              "
            >
              موتور اجرای آزمون
            </h2>

            <p
              className="
                mt-2 text-sm
                leading-7 text-slate-500
              "
            >
              تعریف آزمون و بانک سؤال
              آماده است. مرحله بعد
              Create Attempt، ذخیره
              Answer، نمایش سؤال
              Client-safe و Resume
              کردن آزمون را پیاده
              می‌کنیم.
            </p>
          </div>
        </div>
      </Card>
    </main>
  );
}

function IntroMetric({
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
        rounded-2xl border
        border-white/[0.07]
        bg-black/10
        p-4
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
          mt-3 text-[10px]
          text-slate-600
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1 font-bold
          text-white
        "
      >
        {value}
      </p>
    </div>
  );
}