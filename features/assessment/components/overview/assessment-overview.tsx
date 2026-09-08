import Link from "next/link";

import {
  ArrowLeft,
  BrainCircuit,
  CheckCircle2,
  ClipboardCheck,
  Gauge,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

import {
  ASSESSMENT_SKILL_LABELS,
} from "../../constants/assessment.constants";

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
    overview: AssessmentOverviewData;
  }>;

const numberFormatter =
  new Intl.NumberFormat("fa-IR");

function calculateAverageScore(
  scores: readonly number[],
): number | null {
  if (scores.length === 0) {
    return null;
  }

  const total = scores.reduce(
    (sum, score) => sum + score,
    0,
  );

  return Math.round(
    total / scores.length,
  );
}

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

  const averageScore =
    calculateAverageScore(
      availableSkillSignals
        .map((skill) => skill.score)
        .filter(
          (score): score is number =>
            score !== null,
        ),
    );

  const weakestSkill =
    [...availableSkillSignals]
      .sort(
        (left, right) =>
          (left.score ?? 0) -
          (right.score ?? 0),
      )
      .at(0) ?? null;

  const recommendedQuiz =
    overview.miniQuizzes.find(
      (quiz) =>
        quiz.status === "available" &&
        Boolean(quiz.href),
    ) ?? null;

  const recommendationHref =
    recommendedQuiz?.href ??
    "/assessment/custom";

  return (
    <main
      className="
        mx-auto
        w-full
        max-w-7xl
        space-y-8
      "
    >
      <section
        className="
          relative
          overflow-hidden
          rounded-[28px]
          border
          border-[#CBE2DE]
          bg-[linear-gradient(135deg,#E6F7F4_0%,#FFFFFF_52%,#F5F0FF_100%)]
          p-6
          shadow-[0_16px_50px_rgba(15,23,42,0.06)]
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
          aria-hidden="true"
          className="
            pointer-events-none
            -bottom-28
            absolute
            right-16
            h-64
            w-64
            rounded-full
            bg-[#712AE2]/10
            blur-3xl
          "
        />

        <div className="relative">
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#A8D8D1]
              bg-white/80
              px-3
              py-1.5
              text-xs
              font-bold
              text-[#00685F]
              shadow-sm
            "
          >
            <BrainCircuit
              aria-hidden="true"
              className="h-4 w-4"
            />

            مرکز ارزیابی هوشمند
          </div>

          <div
            className="
              mt-5
              grid
              gap-8
              lg:grid-cols-[minmax(0,1fr)_390px]
              lg:items-end
            "
          >
            <div className="max-w-3xl">
              <h1
                className="
                  text-3xl
                  font-black
                  leading-tight
                  text-[#0F172A]
                  sm:text-4xl
                "
              >
                سطح واقعی زبانت را دقیق‌تر بشناس
              </h1>

              <p
                className="
                  mt-4
                  max-w-2xl
                  text-sm
                  leading-8
                  text-[#52615F]
                "
              >
                تعیین سطح، آزمون‌های
                مهارتی، کوییزهای کوتاه و
                سیگنال‌های تمرینی در یک
                مسیر واحد کنار هم قرار
                می‌گیرند تا نتیجه ارزیابی
                فقط یک نمره نباشد؛ بلکه
                مستقیماً روی برنامه یادگیری
                بعدی تو اثر بگذارد.
              </p>

              {learner.learningGoal ? (
                <div
                  className="
                    mt-5
                    flex
                    max-w-2xl
                    items-start
                    gap-3
                    rounded-2xl
                    border
                    border-[#CBE2DE]
                    bg-white/80
                    px-4
                    py-3
                  "
                >
                  <Target
                    aria-hidden="true"
                    className="
                      mt-0.5
                      h-5
                      w-5
                      shrink-0
                      text-[#00685F]
                    "
                  />

                  <div>
                    <p
                      className="
                        text-xs
                        font-bold
                        text-[#0F172A]
                      "
                    >
                      هدف یادگیری
                    </p>

                    <p
                      className="
                        mt-1
                        text-xs
                        leading-6
                        text-[#64748B]
                      "
                    >
                      {learner.learningGoal}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>

            <div
              className="
                grid
                grid-cols-3
                gap-3
              "
            >
              <HeroMetric
                label="سطح فعلی"
                value={
                  learner.currentCefrLevel ??
                  "—"
                }
                accent="teal"
              />

              <HeroMetric
                label="میانگین مهارت"
                value={
                  averageScore === null
                    ? "—"
                    : `${numberFormatter.format(
                        averageScore,
                      )}٪`
                }
                accent="purple"
              />

              <HeroMetric
                label="موارد مرور"
                value={numberFormatter.format(
                  learner.review.totalItems,
                )}
                accent="orange"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="assessment-flow-title"
        className="
          rounded-3xl
          border
          border-[#DFE8E6]
          bg-white
          p-5
          shadow-[0_10px_30px_rgba(15,23,42,0.045)]
          sm:p-6
        "
      >
        <div
          className="
            flex
            flex-col
            gap-3
            sm:flex-row
            sm:items-end
            sm:justify-between
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
                text-[#712AE2]
              "
            >
              <ShieldCheck
                aria-hidden="true"
                className="h-5 w-5"
              />

              مسیر آزمون
            </div>

            <h2
              id="assessment-flow-title"
              className="
                mt-2
                text-xl
                font-black
                text-[#0F172A]
                sm:text-2xl
              "
            >
              از شروع آزمون تا برنامه بعدی
            </h2>
          </div>

          <span
            className="
              rounded-full
              bg-[#E7F4F2]
              px-3
              py-1.5
              text-xs
              font-bold
              text-[#00685F]
            "
          >
            نتیجه قابل استفاده در مسیر یادگیری
          </span>
        </div>

        <div
          className="
            mt-6
            grid
            gap-3
            md:grid-cols-3
          "
        >
          <AssessmentFlowStep
            number="۱"
            icon={ClipboardCheck}
            title="قبل از آزمون"
            description="سطح شروع، هدف و مهارت‌های مورد سنجش مشخص می‌شوند."
          />

          <AssessmentFlowStep
            number="۲"
            icon={Gauge}
            title="حین آزمون"
            description="سؤال‌ها بر اساس پاسخ‌ها و سطح فعلی تو تنظیم می‌شوند."
          />

          <AssessmentFlowStep
            number="۳"
            icon={Sparkles}
            title="بعد از آزمون"
            description="Skill Score، نقاط ضعف و پیشنهاد تمرین بعدی به‌روزرسانی می‌شود."
          />
        </div>
      </section>

      <section
        aria-labelledby="assessment-main-paths"
        className="space-y-5"
      >
        <div>
          <p
            className="
              text-sm
              font-bold
              text-[#00685F]
            "
          >
            مسیرهای اصلی
          </p>

          <h2
            id="assessment-main-paths"
            className="
              mt-2
              text-2xl
              font-black
              text-[#0F172A]
            "
          >
            نوع ارزیابی را انتخاب کن
          </h2>

          <p
            className="
              mt-2
              max-w-2xl
              text-sm
              leading-7
              text-[#64748B]
            "
          >
            اگر سطح کلی خودت را نمی‌دانی
            از تعیین سطح شروع کن. اگر روی
            یک مهارت مشخص تمرکز داری،
            آزمون دلخواه انتخاب بهتری است.
          </p>
        </div>

        <PlacementTestCard
          placement={overview.placement}
        />

        <CustomAssessmentCard
          currentCefrLevel={
            learner.currentCefrLevel
          }
        />
      </section>

      <section
        className="
          grid
          gap-5
          lg:grid-cols-[minmax(0,1fr)_340px]
        "
      >
        <div
          className="
            rounded-3xl
            border
            border-[#DFE8E6]
            bg-white
            p-6
            shadow-[0_10px_30px_rgba(15,23,42,0.04)]
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
              text-[#00685F]
            "
          >
            <Sparkles
              aria-hidden="true"
              className="h-5 w-5"
            />

            <span
              className="
                text-sm
                font-bold
              "
            >
              پیشنهاد هوشمند بعدی
            </span>
          </div>

          <h2
            className="
              mt-3
              text-xl
              font-black
              text-[#0F172A]
            "
          >
            {weakestSkill
              ? `تمرکز بعدی: ${
                  ASSESSMENT_SKILL_LABELS[
                    weakestSkill.skill
                  ]
                }`
              : "اولین ارزیابی را شروع کن"}
          </h2>

          <p
            className="
              mt-3
              text-sm
              leading-7
              text-[#64748B]
            "
          >
            {weakestSkill
              ? `بر اساس داده‌های فعلی، این مهارت با امتیاز ${numberFormatter.format(
                  weakestSkill.score ?? 0,
                )} از ۱۰۰ بیشترین ظرفیت رشد را دارد. یک ارزیابی کوتاه می‌تواند تصویر دقیق‌تری بدهد.`
              : "هنوز داده کافی برای تشخیص نقطه تمرکز نداریم. تعیین سطح بهترین نقطه شروع است."}
          </p>

          <Link
            href={recommendationHref}
            className="
              mt-5
              inline-flex
              min-h-11
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#00685F]
              px-5
              text-sm
              font-bold
              text-[#FFFFFF]
              transition
              hover:bg-[#005A52]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#14B8A6]/40
            "
          >
            {recommendedQuiz
              ? "شروع ارزیابی پیشنهادی"
              : "ساخت آزمون مهارتی"}

            <ArrowLeft
              aria-hidden="true"
              className="h-4 w-4"
            />
          </Link>
        </div>

        <div
          className="
            rounded-3xl
            border
            border-[#E4DCF7]
            bg-[#F8F5FF]
            p-6
          "
        >
          <CheckCircle2
            aria-hidden="true"
            className="
              h-8
              w-8
              text-[#712AE2]
            "
          />

          <h3
            className="
              mt-4
              text-lg
              font-black
              text-[#0F172A]
            "
          >
            آزمون قابل اعتماد
          </h3>

          <p
            className="
              mt-2
              text-sm
              leading-7
              text-[#64748B]
            "
          >
            نتیجه فقط از یک پاسخ ساخته
            نمی‌شود. سطح، سابقه تمرین،
            عملکرد مهارتی و پاسخ‌های
            آزمون با هم در نظر گرفته
            می‌شوند.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="assessment-skill-estimates"
      >
        <div>
          <div
            className="
              flex
              items-center
              gap-2
              text-[#00685F]
            "
          >
            <ClipboardCheck
              aria-hidden="true"
              className="h-5 w-5"
            />

            <span
              className="
                text-sm
                font-bold
              "
            >
              Skill Signals
            </span>
          </div>

          <h2
            id="assessment-skill-estimates"
            className="
              mt-2
              text-2xl
              font-black
              text-[#0F172A]
            "
          >
            برآورد فعلی مهارت‌ها
          </h2>

          <p
            className="
              mt-2
              max-w-2xl
              text-sm
              leading-7
              text-[#64748B]
            "
          >
            این امتیازها از سابقه تمرین و
            ارزیابی‌های قبلی ساخته می‌شوند
            و با هر فعالیت جدید دقیق‌تر
            خواهند شد.
          </p>
        </div>

        <div
          className="
            mt-5
            grid
            gap-4
            sm:grid-cols-2
            xl:grid-cols-3
          "
        >
          {learner.skills.map(
            (signal) => (
              <SkillEstimateCard
                key={signal.skill}
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
            flex
            items-center
            gap-2
            text-[#712AE2]
          "
        >
          <Sparkles
            aria-hidden="true"
            className="h-5 w-5"
          />

          <span
            className="
              text-sm
              font-bold
            "
          >
            Quick Assessments
          </span>
        </div>

        <h2
          id="assessment-mini-quizzes"
          className="
            mt-2
            text-2xl
            font-black
            text-[#0F172A]
          "
        >
          کوییزهای کوتاه پیشنهادی
        </h2>

        <p
          className="
            mt-2
            max-w-2xl
            text-sm
            leading-7
            text-[#64748B]
          "
        >
          برای بررسی سریع یک نقطه ضعف،
          لازم نیست همیشه آزمون کامل
          بدهی. این کوییزها سریع‌تر هستند
          و مستقیماً روی Skill Score اثر
          می‌گذارند.
        </p>

        <div
          className="
            mt-5
            grid
            gap-4
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

      {learner.review.totalItems > 0 ? (
        <section
          className="
            rounded-3xl
            border
            border-[#F3D8A2]
            bg-[#FFFBEB]
            p-5
            sm:p-6
          "
        >
          <div
            className="
              flex
              items-start
              gap-3
            "
          >
            <span
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[#F97316]/10
                text-[#F97316]
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
                  font-black
                  text-[#0F172A]
                "
              >
                سیگنال‌های مرور
              </h2>

              <p
                className="
                  mt-2
                  text-sm
                  leading-7
                  text-[#665748]
                "
              >
                در حال حاضر{" "}
                {numberFormatter.format(
                  learner.review.totalItems,
                )}{" "}
                مورد برای مرور داری؛ شامل{" "}
                {numberFormatter.format(
                  learner.review
                    .vocabularyCount,
                )}{" "}
                واژه،{" "}
                {numberFormatter.format(
                  learner.review
                    .grammarCount,
                )}{" "}
                نکته گرامری و{" "}
                {numberFormatter.format(
                  learner.review
                    .mistakeCount,
                )}{" "}
                اشتباه ثبت‌شده.
              </p>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}

function HeroMetric({
  label,
  value,
  accent,
}: Readonly<{
  label: string;
  value: string;
  accent:
    | "teal"
    | "purple"
    | "orange";
}>) {
  const accentClass =
    accent === "teal"
      ? "text-[#00685F]"
      : accent === "purple"
        ? "text-[#712AE2]"
        : "text-[#F97316]";

  return (
    <div
      className="
        min-w-0
        rounded-2xl
        border
        border-[#DCE7E5]
        bg-white/90
        p-4
        shadow-sm
      "
    >
      <p
        className="
          text-[10px]
          font-medium
          text-[#64748B]
        "
      >
        {label}
      </p>

      <p
        className={`
          mt-2
          truncate
          text-xl
          font-black
          ${accentClass}
        `}
      >
        {value}
      </p>
    </div>
  );
}

function AssessmentFlowStep({
  number,
  icon: Icon,
  title,
  description,
}: Readonly<{
  number: string;
  icon: typeof ClipboardCheck;
  title: string;
  description: string;
}>) {
  return (
    <article
      className="
        rounded-2xl
        border
        border-[#E2E8F0]
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
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-[#E7F4F2]
            text-[#00685F]
          "
        >
          <Icon
            aria-hidden="true"
            className="h-5 w-5"
          />
        </span>

        <span
          className="
            text-xs
            font-black
            text-[#94A3B8]
          "
        >
          مرحله {number}
        </span>
      </div>

      <h3
        className="
          mt-4
          text-sm
          font-black
          text-[#0F172A]
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-2
          text-xs
          leading-6
          text-[#64748B]
        "
      >
        {description}
      </p>
    </article>
  );
}