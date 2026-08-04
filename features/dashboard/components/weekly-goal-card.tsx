import {
  CalendarDays,
  CheckCircle2,
  Flame,
} from "lucide-react";

import { Card } from "../../../components/ui/card";
import { Progress } from "../../../components/ui/progress";

import type { DashboardSummary } from "../types/dashboard.types";

type WeeklyGoalCardProps = {
  summary: DashboardSummary;
};

const numberFormatter = new Intl.NumberFormat("fa-IR");

function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

function calculatePercentage(completed: number, target: number): number {
  if (target <= 0) {
    return 0;
  }

  return Math.min(100, Math.round((completed / target) * 100));
}

export function WeeklyGoalCard({
  summary,
}: WeeklyGoalCardProps) {
  const progressPercentage = calculatePercentage(
    summary.weeklyCompletedMinutes,
    summary.weeklyGoalMinutes,
  );

  const remainingMinutes = Math.max(
    0,
    summary.weeklyGoalMinutes - summary.weeklyCompletedMinutes,
  );

  const isCompleted = remainingMinutes === 0;

  return (
    <Card className="h-full p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-400">
            هدف هفتگی
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            {formatNumber(summary.weeklyCompletedMinutes)}
            <span className="mr-1 text-sm font-normal text-slate-400">
              از {formatNumber(summary.weeklyGoalMinutes)} دقیقه
            </span>
          </h2>
        </div>

        <div
          className="
            flex h-11 w-11 shrink-0 items-center justify-center
            rounded-xl bg-violet-400/10 text-violet-300
          "
        >
          <CalendarDays
            aria-hidden="true"
            className="h-5 w-5"
          />
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            پیشرفت این هفته
          </span>

          <span className="text-sm font-bold text-white">
            {formatNumber(progressPercentage)}٪
          </span>
        </div>

        <Progress
          value={progressPercentage}
          label="پیشرفت هدف هفتگی"
          indicatorClassName="from-violet-300 to-fuchsia-500"
        />
      </div>

      <div className="mt-6 space-y-3">
        <div
          className="
            flex items-center justify-between gap-3
            rounded-xl bg-white/[0.03] px-3 py-2.5
          "
        >
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Flame
              aria-hidden="true"
              className="h-4 w-4 text-amber-300"
            />

            <span>روزهای متوالی</span>
          </div>

          <span className="text-sm font-semibold text-white">
            {formatNumber(summary.streakDays)} روز
          </span>
        </div>

        <div
          className="
            flex items-center justify-between gap-3
            rounded-xl bg-white/[0.03] px-3 py-2.5
          "
        >
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <CheckCircle2
              aria-hidden="true"
              className="h-4 w-4 text-emerald-300"
            />

            <span>فعالیت‌های انجام‌شده</span>
          </div>

          <span className="text-sm font-semibold text-white">
            {formatNumber(summary.completedActivitiesThisWeek)}
          </span>
        </div>
      </div>

      <p
        className="
          mt-5 rounded-xl border border-white/[0.06]
          bg-black/10 px-3 py-3 text-xs leading-6 text-slate-400
        "
      >
        {isCompleted
          ? "هدف این هفته کامل شده است. عملکرد فوق‌العاده‌ای داشتی."
          : `${formatNumber(
              remainingMinutes,
            )} دقیقه دیگر تا تکمیل هدف هفتگی باقی مانده است.`}
      </p>
    </Card>
  );
}