import {
  BookOpenText,
  Flame,
  Sparkles,
  TimerReset,
  TrendingUp,
} from "lucide-react";

import type {
  WritingOverviewStats,
} from "../../types/writing.types";

type Props = Readonly<{
  stats: WritingOverviewStats;
}>;

const englishNumberFormatter =
  new Intl.NumberFormat("en-US");

const persianNumberFormatter =
  new Intl.NumberFormat("fa-IR");

export function WritingStatCards({
  stats,
}: Props) {
  const items = [
    {
      title: "تعداد نوشته‌ها",
      value: englishNumberFormatter.format(
        stats.totalWritings,
      ),
      icon: BookOpenText,
      cardClass:
        "border-[#00685F]",
      iconClass:
        "bg-[#D6EDEB] text-[#00685F]",
      numericFont: false,
    },
    {
      title: "واژگان تولید شده",
      value: englishNumberFormatter.format(
        stats.weeklyWords,
      ),
      icon: Sparkles,
      cardClass:
        "border-[#712AE2]",
      iconClass:
        "bg-[#E7DDF8] text-[#712AE2]",
      numericFont: true,
    },
    {
      title: "میانگین امتیاز",
      value: `${englishNumberFormatter.format(
        stats.averageScore,
      )}%`,
      icon: TimerReset,
      cardClass:
        "border-[#00685F]",
      iconClass:
        "bg-[#00837833] text-[#00685F]",
      numericFont: true,
      trend: "+3%",
    },
    {
      title: "تداوم تمرین",
      value: `${persianNumberFormatter.format(
        stats.currentStreak,
      )} روز`,
      icon: Flame,
      cardClass:
        "border-[#F97316]",
      iconClass:
        "bg-[#FFF7ED] text-[#F97316]",
      numericFont: false,
    },
  ] as const;

  return (
    <section
      aria-label="آمار نوشتن"
      className="
        grid
        gap-6
        sm:grid-cols-2
        lg:grid-cols-4
      "
      dir="rtl"
    >
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <article
            key={item.title}
            className={`
              flex
              min-h-[104px]
              items-center
              gap-4
              rounded-3xl
              border-y
              border-x-4
              bg-[#FFFFFFB2]
              p-6
              shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]
              backdrop-blur-[12px]
              ${item.cardClass}
            `}
          >
            <span
              className={`
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-full
                ${item.iconClass}
              `}
            >
              <Icon
                aria-hidden="true"
                className="h-5 w-5"
                strokeWidth={1.8}
              />
            </span>

            <div className="min-w-0 text-right">
              <p
                className="
                  whitespace-nowrap
                  text-xs
                  font-medium
                  leading-[14px]
                  tracking-[0.6px]
                  text-[#3D4947]
                "
              >
                {item.title}
              </p>

              <div
                className="
                  mt-1
                  flex
                  items-center
                  gap-2
                "
              >
                <strong
                  dir={
                    item.numericFont
                      ? "ltr"
                      : undefined
                  }
                  className={`
                    text-xl
                    font-bold
                    leading-8
                    text-[#191C1E]
                    ${
                      item.numericFont
                        ? "[font-family:var(--font-plus-jakarta-sans)]"
                        : ""
                    }
                  `}
                >
                  {item.value}
                </strong>

                {"trend" in item ? (
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-0.5
                      text-xs
                      font-medium
                      leading-4
                      text-[#00685F]
                    "
                    dir="ltr"
                  >
                    <TrendingUp
                      aria-hidden="true"
                      className="h-3 w-3"
                    />
                    {item.trend}
                  </span>
                ) : null}
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}