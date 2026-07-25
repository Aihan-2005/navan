import {
  ArrowDown,
  ArrowUp,
  Minus,
  TrendingUp,
} from "lucide-react";

import { Card } from "../../../components/ui/card";
import { Progress } from "../../../components/ui/progress";
import { cn } from "../../../lib/utils/cn";

import { DASHBOARD_SKILL_LABELS } from "../constants/dashboard.constants";

import type { SkillProgress } from "../types/dashboard.types";

type SkillProgressOverviewProps = {
  skills: SkillProgress[];
};

const numberFormatter = new Intl.NumberFormat("fa-IR");

function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

function SkillTrend({
  currentScore,
  previousScore,
}: {
  currentScore: number;
  previousScore: number | null;
}) {
  if (previousScore === null) {
    return (
      <span className="flex items-center gap-1 text-xs text-slate-600">
        <Minus aria-hidden="true" className="h-3 w-3" />
        بدون داده قبلی
      </span>
    );
  }

  const difference = currentScore - previousScore;

  if (difference === 0) {
    return (
      <span className="flex items-center gap-1 text-xs text-slate-500">
        <Minus aria-hidden="true" className="h-3 w-3" />
        بدون تغییر
      </span>
    );
  }

  const isPositive = difference > 0;
  const Icon = isPositive ? ArrowUp : ArrowDown;

  return (
    <span
      className={cn(
        "flex items-center gap-1 text-xs",
        isPositive ? "text-emerald-300" : "text-red-300",
      )}
    >
      <Icon aria-hidden="true" className="h-3 w-3" />
      {formatNumber(Math.abs(difference))}٪
    </span>
  );
}

export function SkillProgressOverview({
  skills,
}: SkillProgressOverviewProps) {
  return (
    <Card className="h-full p-5 sm:p-6">
      <div>
        <div className="flex items-center gap-2 text-emerald-300">
          <TrendingUp
            aria-hidden="true"
            className="h-5 w-5"
          />

          <span className="text-sm font-medium">
            وضعیت مهارت‌ها
          </span>
        </div>

        <h2 className="mt-2 text-xl font-bold text-white">
          نمای کلی پیشرفت
        </h2>

        <p className="mt-2 text-sm leading-7 text-slate-500">
          نتیجه تمرین‌ها و ارزیابی‌های اخیر در هر مهارت
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {skills.map((skill) => (
          <div
            key={skill.skill}
            className="
              rounded-2xl border border-white/[0.06]
              bg-white/[0.02] p-4
            "
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-200">
                  {DASHBOARD_SKILL_LABELS[skill.skill]}
                </h3>

                <p className="mt-1 text-xs text-slate-600">
                  سطح {skill.cefrLevel ?? "نامشخص"}
                </p>
              </div>

              <div className="text-left">
                <span className="text-lg font-bold text-white">
                  {formatNumber(skill.score)}٪
                </span>

                <SkillTrend
                  currentScore={skill.score}
                  previousScore={skill.previousScore}
                />
              </div>
            </div>

            <Progress
              value={skill.score}
              label={`پیشرفت مهارت ${
                DASHBOARD_SKILL_LABELS[skill.skill]
              }`}
              className="mt-4"
              indicatorClassName="from-emerald-300 to-cyan-400"
            />

            <div className="mt-4 flex items-center justify-between text-[11px] text-slate-600">
              <span>
                {formatNumber(skill.completedActivities)} تمرین
              </span>

              <span>
                {formatNumber(skill.totalPracticeMinutes)} دقیقه
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}