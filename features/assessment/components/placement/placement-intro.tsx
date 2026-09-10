import Link from "next/link";

import {
  ArrowLeft,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Ear,
  Gauge,
  ListChecks,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import type {
  ReactNode,
} from "react";


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
  const config =
    assessment.adaptiveConfig;

  if (!config) {
    throw new Error(
      "Placement assessment requires adaptive configuration.",
    );
  }

  const startingLevel =
    learner.currentCefrLevel ??
    config.startingCefrLevel;

  const orderedSections =
    [...assessment.sections]
      .sort(
        (
          first,
          second,
        ) =>
          first.order -
          second.order,
      );

  return (
    <main
      dir="rtl"
      className="
        mx-auto
        w-full
        max-w-[1120px]
        space-y-6
        pb-12
      "
    >
      <Link
        href="/assessment"
        className="
          inline-flex
          items-center
          gap-2
          text-sm
          font-medium
          text-[#64748B]
          transition
          hover:text-[#00685F]
        "
      >
        بازگشت به ارزیابی‌ها

        <ArrowLeft
          aria-hidden="true"
          className="h-4 w-4"
        />
      </Link>

      <section
        className="
          relative
          overflow-hidden
          rounded-[28px]
          border
          border-[#C6E2DD]
          bg-[linear-gradient(135deg,#E7F6F3_0%,#FFFFFF_55%,#F4EFFF_100%)]
          p-6
          shadow-[0_14px_40px_rgba(15,23,42,0.055)]
          sm:p-8
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-20
            -top-24
            h-64
            w-64
            rounded-full
            bg-[#14B8A6]/10
            blur-3xl
          "
        />

        <div
          className="
            relative
            grid
            gap-8
            lg:grid-cols-[minmax(0,1fr)_300px]
            lg:items-center
          "
        >
          <div>
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-[#E7F4F2]
                px-3
                py-1.5
                text-xs
                font-black
                text-[#00685F]
              "
            >
              <Target
                aria-hidden="true"
                className="h-4 w-4"
              />

              Adaptive Placement
            </div>

            <h1
              className="
                mt-5
                text-3xl
                font-black
                leading-tight
                text-[#0F172A]
                sm:text-4xl
              "
            >
              {assessment.title}
            </h1>

            <p
              className="
                mt-4
                max-w-3xl
                text-sm
                leading-8
                text-[#52615F]
              "
            >
              {assessment.description}
            </p>

            <div
              className="
                mt-6
                flex
                flex-wrap
                gap-2
              "
            >
              <FeaturePill>
                سؤال بعدی بر اساس پاسخ قبلی
              </FeaturePill>

              <FeaturePill>
                بدون نمره منفی برای Skip
              </FeaturePill>

              <FeaturePill>
                توقف خودکار با Confidence کافی
              </FeaturePill>
            </div>
          </div>

          <div
            className="
              rounded-2xl
              border
              border-[#D7E5E2]
              bg-white
              p-5
              shadow-sm
            "
          >
            <p
              className="
                text-xs
                font-black
                text-[#0F172A]
              "
            >
              آماده شروعی؟
            </p>

            <p
              className="
                mt-2
                text-xs
                leading-6
                text-[#64748B]
              "
            >
              سطح شروع پیشنهادی تو{" "}
              <strong
                className="
                  text-[#00685F]
                "
              >
                {startingLevel}
              </strong>{" "}
              است. موتور آزمون در صورت
              نیاز سطح را بالا یا پایین
              می‌برد.
            </p>

            <Link
              href="/assessment/placement/run"
              className="
                mt-5
                inline-flex
                min-h-12
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#00685F]
                px-5
                text-sm
                font-black
                text-[#FFFFFF]
                transition
                hover:bg-[#005A52]
              "
            >
              شروع تعیین سطح

              <ArrowLeft
                aria-hidden="true"
                className="h-4 w-4"
              />
            </Link>
          </div>
        </div>

        <div
          className="
            relative
            mt-7
            grid
            gap-3
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
            label="تعداد سؤال"
            value={`${numberFormatter.format(
              config.minimumQuestions,
            )} تا ${numberFormatter.format(
              config.maximumQuestions,
            )}`}
          />

          <IntroMetric
            icon={Gauge}
            label="هدف Confidence"
            value={`${numberFormatter.format(
              config.targetConfidence,
            )}٪`}
          />

          <IntroMetric
            icon={BrainCircuit}
            label="سطح شروع"
            value={startingLevel}
          />
        </div>
      </section>

      <section
        className="
          rounded-3xl
          border
          border-[#DFE8E6]
          bg-white
          p-5
          shadow-[0_8px_28px_rgba(15,23,42,0.04)]
          sm:p-6
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
              items-center
              justify-center
              rounded-xl
              bg-[#E7F4F2]
              text-[#00685F]
            "
          >
            <ShieldCheck
              aria-hidden="true"
              className="h-5 w-5"
            />
          </span>

          <div>
            <h2
              className="
                text-lg
                font-black
                text-[#0F172A]
              "
            >
              چه چیزهایی سنجیده می‌شوند؟
            </h2>

            <p
              className="
                mt-1
                text-xs
                text-[#64748B]
              "
            >
              موتور تلاش می‌کند بین مهارت‌ها
              Evidence متعادل جمع کند.
            </p>
          </div>
        </div>

        <div
          className="
            mt-5
            grid
            gap-4
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >
          {orderedSections.map(
            (section) => (
              <article
                key={section.id}
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
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#E7F4F2]
                      text-[#00685F]
                    "
                  >
                    {section.skill ===
                    "listening" ? (
                      <Ear
                        aria-hidden="true"
                        className="h-4 w-4"
                      />
                    ) : (
                      <CheckCircle2
                        aria-hidden="true"
                        className="h-4 w-4"
                      />
                    )}
                  </span>

                  <span
                    className="
                      text-[10px]
                      font-bold
                      text-[#94A3B8]
                    "
                  >
                    بانک{" "}
                    {numberFormatter.format(
                      section.questionIds
                        .length,
                    )}
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
                  {
                    ASSESSMENT_SKILL_LABELS[
                      section.skill
                    ]
                  }
                </h3>

                <p
                  className="
                    mt-2
                    text-xs
                    leading-6
                    text-[#64748B]
                  "
                >
                  {section.description}
                </p>
              </article>
            ),
          )}
        </div>
      </section>

      <section
        className="
          rounded-2xl
          border
          border-[#E4DCF7]
          bg-[#F8F5FF]
          p-5
        "
      >
        <div
          className="
            flex
            items-start
            gap-3
          "
        >
          <Sparkles
            aria-hidden="true"
            className="
              mt-0.5
              h-5
              w-5
              shrink-0
              text-[#712AE2]
            "
          />

          <div>
            <h2
              className="
                text-sm
                font-black
                text-[#0F172A]
              "
            >
              چرا نمی‌توانی به سؤال قبلی برگردی؟
            </h2>

            <p
              className="
                mt-2
                text-xs
                leading-7
                text-[#64748B]
              "
            >
              در آزمون تطبیقی، پاسخ هر سؤال
              ورودی انتخاب سؤال بعدی است.
              تغییر جواب قبلی بعد از مشاهده
              سؤال بعدی اعتبار Adaptive
              Algorithm را کاهش می‌دهد؛ برای
              همین هر پاسخ پس از ثبت نهایی
              می‌شود.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function FeaturePill({
  children,
}: Readonly<{
  children:
    ReactNode;
}>) {
  return (
    <span
      className="
        rounded-full
        border
        border-[#CAE1DD]
        bg-white/80
        px-3
        py-1.5
        text-[11px]
        font-medium
        text-[#52615F]
      "
    >
      {children}
    </span>
  );
}

function IntroMetric({
  icon: Icon,
  label,
  value,
}: Readonly<{
  icon:
    typeof Clock3;

  label:
    string;

  value:
    string;
}>) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-[#DCE7E5]
        bg-white/90
        p-4
      "
    >
      <Icon
        aria-hidden="true"
        className="
          h-4
          w-4
          text-[#00685F]
        "
      />

      <p
        className="
          mt-3
          text-[10px]
          text-[#64748B]
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          font-black
          text-[#0F172A]
        "
      >
        {value}
      </p>
    </div>
  );
}