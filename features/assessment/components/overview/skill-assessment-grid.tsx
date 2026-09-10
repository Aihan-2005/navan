import Link from "next/link";

import {
  ArrowLeft,
  BookOpenText,
  BrainCircuit,
  Headphones,
  Languages,
  Mic2,
  PenLine,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import {
  SKILL_ASSESSMENT_CATALOG,
} from "../../constants/skill-assessment.catalog";

import {
  ASSESSMENT_SKILL_LABELS,
} from "../../constants/assessment.constants";

import type {
  AssessmentSkill,
} from "../../types/assessment-question.types";

const numberFormatter =
  new Intl.NumberFormat(
    "fa-IR",
  );

const skillIcons:
  Record<
    AssessmentSkill,
    LucideIcon
  > = {
  speaking:
    Mic2,

  listening:
    Headphones,

  reading:
    BookOpenText,

  writing:
    PenLine,

  grammar:
    BrainCircuit,

  vocabulary:
    Languages,
};

const skillStyles:
  Record<
    AssessmentSkill,
    Readonly<{
      surface: string;
      icon: string;
      border: string;
    }>
  > = {
  speaking: {
    surface:
      "bg-[#F4EFFF]",

    icon:
      "text-[#712AE2]",

    border:
      "hover:border-[#CDB7F3]",
  },

  listening: {
    surface:
      "bg-[#EAF2FF]",

    icon:
      "text-[#2563EB]",

    border:
      "hover:border-[#BBD0F7]",
  },

  reading: {
    surface:
      "bg-[#E7F4F2]",

    icon:
      "text-[#00685F]",

    border:
      "hover:border-[#A9D4CD]",
  },

  writing: {
    surface:
      "bg-[#FFF1E8]",

    icon:
      "text-[#F97316]",

    border:
      "hover:border-[#F7C6A5]",
  },

  grammar: {
    surface:
      "bg-[#FFF8E6]",

    icon:
      "text-[#B7791F]",

    border:
      "hover:border-[#E7CC84]",
  },

  vocabulary: {
    surface:
      "bg-[#ECFDF5]",

    icon:
      "text-[#047857]",

    border:
      "hover:border-[#A7DCC7]",
  },
};

export function SkillAssessmentGrid() {
  return (
    <section
      aria-labelledby="skill-assessment-title"
      className="
        mx-auto
        mt-8
        w-full
        max-w-7xl
        pb-12
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
              text-[#00685F]
            "
          >
            <Sparkles
              aria-hidden="true"
              className="h-5 w-5"
            />

            Skill Assessment
          </div>

          <h2
            id="skill-assessment-title"
            className="
              mt-2
              text-2xl
              font-black
              text-[#0F172A]
            "
          >
            فقط یک مهارت را ارزیابی کن
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
            اگر تعیین سطح کلی نمی‌خواهی،
            یکی از شش مهارت را انتخاب کن.
            هر آزمون مستقل است و نتیجه‌اش
            روی همان Skill Signal تمرکز دارد.
          </p>
        </div>
      </div>

      <div
        className="
          mt-6
          grid
          gap-4
          md:grid-cols-2
          xl:grid-cols-3
        "
      >
        {SKILL_ASSESSMENT_CATALOG.map(
          (item) => {
            const Icon =
              skillIcons[
                item.skill
              ];

            const style =
              skillStyles[
                item.skill
              ];

            const pendingAnalysis =
              item.capability ===
              "pending_analysis";

            return (
              <article
                key={item.id}
                className={`
                  group
                  flex
                  h-full
                  flex-col
                  rounded-2xl
                  border
                  border-[#DFE8E6]
                  bg-white
                  p-5
                  shadow-[0_7px_24px_rgba(15,23,42,0.04)]
                  transition
                  duration-200
                  hover:-translate-y-0.5
                  hover:shadow-[0_12px_30px_rgba(15,23,42,0.07)]
                  ${style.border}
                `}
              >
                <div
                  className="
                    flex
                    items-start
                    justify-between
                    gap-4
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
                      ${style.surface}
                      ${style.icon}
                    `}
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-5 w-5"
                    />
                  </span>

                  <span
                    className={
                      pendingAnalysis
                        ? `
                          rounded-full
                          bg-[#F4EFFF]
                          px-2.5
                          py-1
                          text-[9px]
                          font-bold
                          text-[#712AE2]
                        `
                        : `
                          rounded-full
                          bg-[#ECFDF5]
                          px-2.5
                          py-1
                          text-[9px]
                          font-bold
                          text-[#047857]
                        `
                    }
                  >
                    {pendingAnalysis
                      ? "تحلیل تکمیلی"
                      : "نتیجه فوری"}
                  </span>
                </div>

                <p
                  className="
                    mt-4
                    text-[10px]
                    font-bold
                    text-[#64748B]
                  "
                >
                  {
                    ASSESSMENT_SKILL_LABELS[
                      item.skill
                    ]
                  }{" "}
                  • {item.cefrLevel}
                </p>

                <h3
                  className="
                    mt-1
                    text-lg
                    font-black
                    text-[#0F172A]
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    mt-2
                    flex-1
                    text-xs
                    leading-6
                    text-[#64748B]
                  "
                >
                  {item.description}
                </p>

                <div
                  className="
                    mt-5
                    flex
                    items-center
                    justify-between
                    gap-3
                    border-t
                    border-[#E8EEEC]
                    pt-4
                    text-[10px]
                    text-[#7C8987]
                  "
                >
                  <span>
                    {numberFormatter.format(
                      item.questionCount,
                    )}{" "}
                    سؤال
                  </span>

                  <span>
                    {numberFormatter.format(
                      item.estimatedMinutes,
                    )}{" "}
                    دقیقه
                  </span>

                  <span>
                    +
                    {numberFormatter.format(
                      item.xpReward,
                    )}{" "}
                    XP
                  </span>
                </div>

                <Link
                  href={item.href}
                  className="
                    mt-4
                    inline-flex
                    min-h-10
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#00685F]
                    px-4
                    text-xs
                    font-black
                    text-[#FFFFFF]
                    transition
                    hover:bg-[#005A52]
                  "
                >
                  شروع ارزیابی

                  <ArrowLeft
                    aria-hidden="true"
                    className="h-3.5 w-3.5"
                  />
                </Link>
              </article>
            );
          },
        )}
      </div>

      <div
        className="
          mt-4
          rounded-2xl
          border
          border-[#E4DCF7]
          bg-[#F8F5FF]
          p-4
          text-xs
          leading-6
          text-[#64748B]
        "
      >
        Speaking و Writing پاسخ را کامل
        دریافت و ثبت می‌کنند، اما تا زمان
        اتصال Speech Analysis و Writing
        Analysis، نتیجه عددی ساختگی نمایش
        داده نمی‌شود.
      </div>
    </section>
  );
}
