import {
  BrainCircuit,
  ClipboardCheck,
  RotateCcw,
  Sparkles,
  Target,
} from "lucide-react";

import {
  Card,
} from "../../../../components/ui/card";

import type {
  AssessmentOverview as AssessmentOverviewData,
} from "../../types/assessment-overview.types";

import {
  CustomAssessmentCard,
} from "./custom-assessment-card";

import {
  MiniQuizCard,
} from "./mini-quiz-card";

import {
  PlacementTestCard,
} from "./placement-test-card";

import {
  SkillEstimateCard,
} from "./skill-estimate-card";

type AssessmentOverviewProps =
  Readonly<{
    overview:
      AssessmentOverviewData;
  }>;

const numberFormatter =
  new Intl.NumberFormat(
    "fa-IR",
  );

export function AssessmentOverview({
  overview,
}: AssessmentOverviewProps) {
  const {
    learner,
  } = overview;

  const availableSkillSignals =
    learner.skills.filter(
      (skill) =>
        skill.score !== null,
    );

  return (
    <main
      className="
        mx-auto w-full
        max-w-7xl space-y-8
      "
    >
      <section
        className="
          relative overflow-hidden
          rounded-3xl border
          border-cyan-400/15
          bg-white/[0.035]
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
            bg-cyan-500/15
            blur-3xl
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -bottom-32 right-0
            h-72 w-72
            rounded-full
            bg-violet-500/10
            blur-3xl
          "
        />

        <div className="relative">
          <div
            className="
              flex items-center
              gap-2 text-cyan-300
            "
          >
            <BrainCircuit
              aria-hidden="true"
              className="h-5 w-5"
            />

            <span
              className="
                text-sm font-medium
              "
            >
              Assessment Center
            </span>
          </div>

          <div
            className="
              mt-4 flex
              flex-col gap-6
              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >
            <div
              className="
                max-w-3xl
              "
            >
              <h1
                className="
                  text-3xl font-bold
                  text-white
                  sm:text-4xl
                "
              >
                ارزیابی هوشمند سطح زبان
              </h1>

              <p
                className="
                  mt-4 text-sm
                  leading-8
                  text-slate-400
                "
              >
                آزمون تعیین سطح، آزمون‌های
                سفارشی و کوییزهای کوتاه در
                یک سیستم مشترک اجرا
                می‌شوند تا Skill Score و
                مسیر یادگیری کاربر
                دقیق‌تر شود.
              </p>
            </div>

            <div
              className="
                grid grid-cols-2
                gap-3
                sm:grid-cols-3
              "
            >
              <HeroMetric
                label="سطح فعلی"
                value={
                  learner.currentCefrLevel ??
                  "—"
                }
              />

              <HeroMetric
                label="Skill دارای داده"
                value={numberFormatter.format(
                  availableSkillSignals.length,
                )}
              />

              <HeroMetric
                label="موارد مرور"
                value={numberFormatter.format(
                  learner.review
                    .totalItems,
                )}
              />
            </div>
          </div>

          {learner.learningGoal ? (
            <div
              className="
                mt-6 inline-flex
                max-w-3xl
                items-start gap-2
                rounded-xl border
                border-white/[0.06]
                bg-black/10
                px-4 py-3
              "
            >
              <Target
                aria-hidden="true"
                className="
                  mt-0.5 h-4 w-4
                  shrink-0
                  text-violet-300
                "
              />

              <p
                className="
                  text-xs leading-6
                  text-slate-500
                "
              >
                هدف یادگیری:{" "}
                {learner.learningGoal}
              </p>
            </div>
          ) : null}
        </div>
      </section>

      <section
        aria-labelledby="assessment-main-paths"
        className="space-y-5"
      >
        <div>
          <h2
            id="assessment-main-paths"
            className="
              text-2xl font-bold
              text-white
            "
          >
            مسیر ارزیابی را انتخاب کن
          </h2>

          <p
            className="
              mt-2 text-sm
              leading-7
              text-slate-500
            "
          >
            تعیین سطح برای سنجش کلی
            زبان است؛ آزمون سفارشی برای
            ارزیابی یک یا چند Skill
            دلخواه.
          </p>
        </div>

        <PlacementTestCard
          placement={
            overview.placement
          }
        />

        <CustomAssessmentCard
          currentCefrLevel={
            learner.currentCefrLevel
          }
        />
      </section>

      <section
        aria-labelledby="assessment-skill-estimates"
      >
        <div
          className="
            flex items-end
            justify-between gap-4
          "
        >
          <div>
            <div
              className="
                flex items-center
                gap-2 text-cyan-300
              "
            >
              <ClipboardCheck
                aria-hidden="true"
                className="h-5 w-5"
              />

              <span
                className="
                  text-sm font-medium
                "
              >
                Skill Signals
              </span>
            </div>

            <h2
              id="assessment-skill-estimates"
              className="
                mt-2 text-2xl
                font-bold text-white
              "
            >
              برآورد فعلی مهارت‌ها
            </h2>

            <p
              className="
                mt-2 text-sm
                leading-7
                text-slate-500
              "
            >
              این Signalها از سابقه
              یادگیری می‌آیند و بعداً
              همراه با نتایج Assessment
              ورودی موتور شخصی‌سازی
              خواهند شد.
            </p>
          </div>
        </div>

        <div
          className="
            mt-5 grid gap-4
            sm:grid-cols-2
            xl:grid-cols-3
          "
        >
          {learner.skills.map(
            (signal) => (
              <SkillEstimateCard
                key={
                  signal.skill
                }
                signal={signal}
              />
            ),
          )}
        </div>
      </section>

      <section
        aria-labelledby="assessment-mini-quizzes"
      >
        <div
          className="
            flex items-center gap-2
            text-violet-300
          "
        >
          <Sparkles
            aria-hidden="true"
            className="h-5 w-5"
          />

          <span
            className="
              text-sm font-medium
            "
          >
            Quick Assessments
          </span>
        </div>

        <h2
          id="assessment-mini-quizzes"
          className="
            mt-2 text-2xl
            font-bold text-white
          "
        >
          کوییزهای پیشنهادی
        </h2>

        <p
          className="
            mt-2 max-w-2xl
            text-sm leading-7
            text-slate-500
          "
        >
          این بخش بعداً با داده‌های
          واقعی کاربر و AI پویا خواهد
          شد و برای ضعف‌های شناسایی‌شده
          Quiz پیشنهاد می‌دهد.
        </p>

        <div
          className="
            mt-5 grid gap-4
            md:grid-cols-2
            xl:grid-cols-4
          "
        >
          {overview.miniQuizzes.map(
            (quiz) => (
              <MiniQuizCard
                key={quiz.id}
                quiz={quiz}
              />
            ),
          )}
        </div>
      </section>

      {learner.review.totalItems >
      0 ? (
        <Card className="p-5 sm:p-6">
          <div
            className="
              flex items-start gap-3
            "
          >
            <span
              className="
                flex h-10 w-10
                shrink-0 items-center
                justify-center
                rounded-xl
                bg-amber-400/10
                text-amber-300
              "
            >
              <RotateCcw
                aria-hidden="true"
                className="h-5 w-5"
              />
            </span>

            <div>
              <h2
                className="
                  font-bold text-white
                "
              >
                سیگنال‌های مرور
              </h2>

              <p
                className="
                  mt-2 text-sm
                  leading-7
                  text-slate-500
                "
              >
                سیستم فعلاً{" "}
                {numberFormatter.format(
                  learner.review
                    .totalItems,
                )}{" "}
                مورد برای مرور دارد؛ شامل{" "}
                {numberFormatter.format(
                  learner.review
                    .vocabularyCount,
                )}{" "}
                مورد واژگان،{" "}
                {numberFormatter.format(
                  learner.review
                    .grammarCount,
                )}{" "}
                مورد گرامر و{" "}
                {numberFormatter.format(
                  learner.review
                    .mistakeCount,
                )}{" "}
                اشتباه ثبت‌شده.
              </p>
            </div>
          </div>
        </Card>
      ) : null}
    </main>
  );
}

function HeroMetric({
  label,
  value,
}: Readonly<{
  label: string;
  value: string;
}>) {
  return (
    <div
      className="
        min-w-28
        rounded-2xl border
        border-white/[0.07]
        bg-black/10
        p-4
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
        className="
          mt-2 text-xl
          font-black text-white
        "
      >
        {value}
      </p>
    </div>
  );
}