import {
  CheckCircle2,
  ListOrdered,
  SpellCheck2,
  Target,
  type LucideIcon,
} from "lucide-react";

import type {
  ListeningScoreBreakdown,
} from "../../types/listening.types";

type ListeningScoreOverviewProps =
  Readonly<{
    score:
      ListeningScoreBreakdown;
  }>;

const numberFormatter =
  new Intl.NumberFormat(
    "fa-IR",
  );

type ScoreTone =
  "teal" |
  "blue" |
  "purple" |
  "orange";

const scoreItems:
  readonly Readonly<{
    key:
      keyof ListeningScoreBreakdown;

    label:
      string;

    icon:
      LucideIcon;

    tone:
      ScoreTone;
  }>[] = [
    {
      key:
        "overall",

      label:
        "امتیاز کلی",

      icon:
        Target,

      tone:
        "teal",
    },

    {
      key:
        "wordAccuracy",

      label:
        "دقت واژگان",

      icon:
        CheckCircle2,

      tone:
        "blue",
    },

    {
      key:
        "sequenceAccuracy",

      label:
        "ترتیب جمله",

      icon:
        ListOrdered,

      tone:
        "purple",
    },

    {
      key:
        "spellingAccuracy",

      label:
        "املای کلمات",

      icon:
        SpellCheck2,

      tone:
        "orange",
    },
  ];

const toneStyles:
  Record<
    ScoreTone,
    Readonly<{
      surface:
        string;

      text:
        string;

      bar:
        string;
    }>
  > = {
  teal: {
    surface:
      "bg-[#E7F4F2]",

    text:
      "text-[#00685F]",

    bar:
      "bg-[#0D9488]",
  },

  blue: {
    surface:
      "bg-[#EAF2FF]",

    text:
      "text-[#2563EB]",

    bar:
      "bg-[#3B82F6]",
  },

  purple: {
    surface:
      "bg-[#F4EFFF]",

    text:
      "text-[#712AE2]",

    bar:
      "bg-[#8B5CF6]",
  },

  orange: {
    surface:
      "bg-[#FFF1E8]",

    text:
      "text-[#F97316]",

    bar:
      "bg-[#F97316]",
  },
};

function getScoreDescription(
  score:
    number,
): string {
  if (score >= 90) {
    return "عالی";
  }

  if (score >= 80) {
    return "خیلی خوب";
  }

  if (score >= 70) {
    return "خوب";
  }

  if (score >= 55) {
    return "متوسط";
  }

  return "نیازمند تمرین";
}

export function ListeningScoreOverview({
  score,
}: ListeningScoreOverviewProps) {
  return (
    <section
      aria-label="امتیازهای تمرین شنیداری"
      className="
        grid
        gap-4
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >
      {scoreItems.map(
        (item) => {
          const Icon =
            item.icon;

          const value =
            score[
              item.key
            ];

          const style =
            toneStyles[
              item.tone
            ];

          return (
            <article
              key={
                item.key
              }
              className="
                rounded-2xl
                border
                border-[#DCE5E3]
                bg-white
                p-5
                shadow-[0_5px_20px_rgba(15,23,42,0.035)]
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
                <span
                  className={`
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    ${style.surface}
                    ${style.text}
                  `}
                >
                  <Icon
                    aria-hidden="true"
                    className="h-5 w-5"
                  />
                </span>

                <span
                  className="
                    rounded-full
                    bg-[#F1F5F4]
                    px-2.5
                    py-1
                    text-[10px]
                    font-bold
                    text-[#64748B]
                  "
                >
                  {getScoreDescription(
                    value,
                  )}
                </span>
              </div>

              <p
                className="
                  mt-5
                  text-xs
                  text-[#64748B]
                "
              >
                {item.label}
              </p>

              <p
                className="
                  mt-1
                  text-3xl
                  font-black
                  text-[#0F172A]
                "
              >
                {numberFormatter.format(
                  value,
                )}

                <span
                  className="
                    mr-1
                    text-sm
                    font-medium
                    text-[#94A3B8]
                  "
                >
                  ٪
                </span>
              </p>

              <div
                className="
                  mt-4
                  h-1.5
                  overflow-hidden
                  rounded-full
                  bg-[#E8EFED]
                "
              >
                <div
                  className={`
                    h-full
                    rounded-full
                    ${style.bar}
                  `}
                  style={{
                    width:
                      `${value}%`,
                  }}
                />
              </div>
            </article>
          );
        },
      )}
    </section>
  );
}
