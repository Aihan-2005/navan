import {
  Calendar,
} from "lucide-react";

import type {
  DailyPracticeOverview as DailyPracticeOverviewData,
} from "../types/daily-practice.types";

import {
  DailyPracticeSmartRecommendation,
} from "./daily-practice-smart-recommendation";

import {
  DailyPracticeStats,
} from "./daily-practice-stats";

import {
  DailyPracticeTaskCard,
} from "./daily-practice-task-card";

type DailyPracticeOverviewProps =
  Readonly<{
    overview: DailyPracticeOverviewData;
  }>;

const persianDateFormatter =
  new Intl.DateTimeFormat(
    "fa-IR-u-ca-persian",
    {
      day: "numeric",
      month: "long",
    },
  );

function formatDateLabel(
  date: string,
): string {
  const parsedDate = new Date(
    `${date}T12:00:00`,
  );

  if (
    Number.isNaN(
      parsedDate.getTime(),
    )
  ) {
    return "امروز";
  }

  return `امروز، ${persianDateFormatter.format(
    parsedDate,
  )}`;
}

export function DailyPracticeOverview({
  overview,
}: DailyPracticeOverviewProps) {
  return (
    <main
      dir="rtl"
      aria-labelledby="daily-practice-page-title"
      className="
        mx-auto
        w-full
        max-w-[943px]
        space-y-10
        pb-10
        [font-family:var(--font-vazirmatn)]
        sm:space-y-12
      "
    >
      <header
        className="
          flex
          min-h-[128px]
          flex-col
          gap-5
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div className="max-w-[560px]">
          <h1
            id="daily-practice-page-title"
            className="
              text-[30px]
              font-bold
              leading-[1.35]
              text-[#00685F]
              sm:text-[36px]
            "
          >
            تمرین روزانه
          </h1>

          <p
            className="
              mt-3
              text-base
              leading-7
              text-[#3D4947]
              sm:text-lg
            "
          >
            تمرین‌های امروز برای حفظ روند یادگیری و تقویت مهارت‌ها
          </p>
        </div>

        <div
          className="
            inline-flex
            min-h-[42px]
            self-start
            items-center
            gap-2
            rounded-full
            border
            border-[#00685F1A]
            bg-[#00685F0D]
            px-4
            text-[#00685F]
            sm:self-auto
          "
        >
          <Calendar
            aria-hidden="true"
            className="h-5 w-5"
            strokeWidth={1.8}
          />

          <span className="text-base">
            {formatDateLabel(
              overview.date,
            )}
          </span>
        </div>
      </header>

      <DailyPracticeStats
        summary={overview.summary}
      />

      <section
        aria-labelledby="daily-practice-tasks-title"
      >
        <h2
          id="daily-practice-tasks-title"
          className="sr-only"
        >
          تمرین‌های امروز
        </h2>

        <div className="space-y-[15px]">
          {overview.tasks.map(
            (task) => (
              <DailyPracticeTaskCard
                key={task.id}
                task={task}
              />
            ),
          )}
        </div>
      </section>

      {overview.recommendation ? (
        <DailyPracticeSmartRecommendation
          recommendation={
            overview.recommendation
          }
        />
      ) : null}
    </main>
  );
}