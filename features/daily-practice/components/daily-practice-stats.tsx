import {
  CheckCircle2,
  Flame,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type {
  ReactNode,
} from "react";

import {
  cn,
} from "../../../lib/utils/cn";

import type {
  DailyPracticeSummary,
} from "../types/daily-practice.types";

type DailyPracticeStatsProps =
  Readonly<{
    summary: DailyPracticeSummary;
  }>;

const numberFormatter =
  new Intl.NumberFormat("fa-IR");

function formatNumber(
  value: number,
): string {
  return numberFormatter.format(value);
}

export function DailyPracticeStats({
  summary,
}: DailyPracticeStatsProps) {
  return (
    <section
      dir="rtl"
      aria-label="خلاصه تمرین روزانه"
      className="
        grid
        gap-4
        sm:grid-cols-2
        xl:grid-cols-4
        xl:gap-6
      "
    >
      <PracticeTimeStat
        completedMinutes={
          summary.todayMinutes
        }
        goalMinutes={
          summary.dailyGoalMinutes
        }
        progress={
          summary.completionPercent
        }
      />

      <SimpleStatCard
        title={
          <>
            تمرین‌های
            <br />
            انجام‌شده
          </>
        }
        value={`${formatNumber(
          summary.completedTasks,
        )} / ${formatNumber(
          summary.totalTasks,
        )}`}
        suffix="تمرین"
        icon={CheckCircle2}
        iconClassName="bg-[#00685F1A] text-[#0F8F82]"
      />

      <SimpleStatCard
        title="امتیاز امروز (XP)"
        value={`+${formatNumber(
          summary.todayXp,
        )} XP`}
        icon={Zap}
        valueClassName="text-[#712AE2]"
        iconClassName="bg-[#712AE21A] text-[#712AE2]"
      />

      <SimpleStatCard
        title="استریک روزانه"
        value={`${formatNumber(
          summary.streakDays,
        )} روز`}
        icon={Flame}
        valueClassName="text-[#F97316]"
        iconClassName="bg-[#FFEDD5] text-[#F97316]"
        accentClassName="border-l-4 border-l-[#F97316]"
      />
    </section>
  );
}

function PracticeTimeStat({
  completedMinutes,
  goalMinutes,
  progress,
}: Readonly<{
  completedMinutes: number;
  goalMinutes: number;
  progress: number;
}>) {
  return (
    <article
      dir="rtl"
      className="
        flex
        min-h-[122px]
        items-center
        gap-4
        rounded-2xl
        border
        border-[#E2E8F0CC]
        bg-white/80
        p-6
        shadow-[0_4px_20px_rgba(0,0,0,0.04)]
        backdrop-blur-lg
      "
    >
      <ProgressRing
        value={progress}
      />

      <div
        className="
          min-w-0
          flex-1
          text-right
        "
      >
        <p
          className="
            text-base
            leading-6
            text-[#3D4947]
          "
        >
          زمان تمرین
          <br />
          امروز
        </p>

        <p
          className="
            mt-1
            whitespace-nowrap
            text-xl
            font-bold
            leading-6
            text-[#191C1E]
          "
        >
          {formatNumber(
            completedMinutes,
          )}{" "}
          /{" "}
          {formatNumber(goalMinutes)}{" "}
          <span className="text-[#3D4947]">
            دقیقه
          </span>
        </p>
      </div>
    </article>
  );
}

function ProgressRing({
  value,
}: Readonly<{
  value: number;
}>) {
  const safeValue = Math.max(
    0,
    Math.min(100, value),
  );

  const radius = 27;
  const circumference =
    2 * Math.PI * radius;
  const offset =
    circumference *
    (1 - safeValue / 100);

  return (
    <div
      role="progressbar"
      aria-label="درصد پیشرفت زمان تمرین امروز"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={safeValue}
      className="
        relative
        h-[68px]
        w-[68px]
        shrink-0
      "
    >
      <svg
        viewBox="0 0 68 68"
        className="
          h-full
          w-full
          -rotate-90
        "
        aria-hidden="true"
      >
        <circle
          cx="34"
          cy="34"
          r={radius}
          fill="none"
          stroke="#DCEBE8"
          strokeWidth="6"
        />

        <circle
          cx="34"
          cy="34"
          r={radius}
          fill="none"
          stroke="#0D9488"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={
            circumference
          }
          strokeDashoffset={offset}
        />
      </svg>

      <span
        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          text-base
          font-medium
          text-[#00685F]
        "
      >
        {formatNumber(
          Math.round(safeValue),
        )}
        ٪
      </span>
    </div>
  );
}

function SimpleStatCard({
  title,
  value,
  suffix,
  icon: Icon,
  iconClassName,
  valueClassName,
  accentClassName,
}: Readonly<{
  title: ReactNode;
  value: string;
  suffix?: string;
  icon: LucideIcon;
  iconClassName: string;
  valueClassName?: string;
  accentClassName?: string;
}>) {
  return (
    <article
      dir="rtl"
      className={cn(
        "flex min-h-[122px] items-center gap-4",
        "rounded-2xl border border-[#E2E8F0CC]",
        "bg-white/80 p-6",
        "shadow-[0_4px_20px_rgba(0,0,0,0.04)]",
        "backdrop-blur-lg",
        accentClassName,
      )}
    >
      <span
        className={cn(
          "flex h-12 w-12 shrink-0",
          "items-center justify-center",
          "rounded-full",
          iconClassName,
        )}
      >
        <Icon
          aria-hidden="true"
          className="h-5 w-5"
          strokeWidth={1.9}
        />
      </span>

      <div
        className="
          min-w-0
          flex-1
          text-right
        "
      >
        <p
          className="
            text-base
            leading-6
            text-[#3D4947]
          "
        >
          {title}
        </p>

        <p
          className={cn(
            "mt-1 whitespace-nowrap",
            "text-xl font-bold leading-6",
            "text-[#191C1E]",
            valueClassName,
          )}
        >
          {value}

          {suffix ? (
            <span className="text-[#3D4947]">
              {" "}
              {suffix}
            </span>
          ) : null}
        </p>
      </div>
    </article>
  );
}