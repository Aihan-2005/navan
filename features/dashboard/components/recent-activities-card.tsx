import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  History,
  PlayCircle,
} from "lucide-react";

import { Card } from "../../../components/ui/card";

import { DASHBOARD_SKILL_LABELS } from "../constants/dashboard.constants";

import type { RecentActivity } from "../types/dashboard.types";

type RecentActivitiesCardProps = {
  activities: RecentActivity[];
};

const numberFormatter = new Intl.NumberFormat("fa-IR");

function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

function formatActivityDate(value: string): string {
  return new Intl.DateTimeFormat("fa-IR", {
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

export function RecentActivitiesCard({
  activities,
}: RecentActivitiesCardProps) {
  return (
    <Card className="h-full p-5 sm:p-6">
      <div className="flex items-center gap-2 text-cyan-300">
        <History aria-hidden="true" className="h-5 w-5" />

        <span className="text-sm font-medium">
          فعالیت‌های اخیر
        </span>
      </div>

      <h2 className="mt-2 text-xl font-bold text-white">
        آخرین تمرین‌های انجام‌شده
      </h2>

      {activities.length > 0 ? (
        <div className="mt-6 divide-y divide-white/[0.06]">
          {activities.map((activity) => {
            const StatusIcon =
              activity.status === "completed"
                ? CheckCircle2
                : PlayCircle;

            const content = (
              <div
                className="
                  flex items-center gap-3 py-4
                  transition hover:bg-white/[0.02]
                "
              >
                <div
                  className="
                    flex h-10 w-10 shrink-0
                    items-center justify-center rounded-xl
                    bg-white/[0.04]
                  "
                >
                  <StatusIcon
                    aria-hidden="true"
                    className="h-5 w-5 text-emerald-300"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-slate-200">
                    {activity.title}
                  </h3>

                  <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-slate-600">
                    <span>
                      {DASHBOARD_SKILL_LABELS[activity.skill]}
                    </span>

                    <span className="flex items-center gap-1">
                      <Clock3
                        aria-hidden="true"
                        className="h-3.5 w-3.5"
                      />
                      {formatNumber(activity.durationMinutes)} دقیقه
                    </span>

                    <span>
                      {formatActivityDate(activity.occurredAt)}
                    </span>
                  </div>
                </div>

                {activity.score !== null ? (
                  <div className="text-center">
                    <p className="text-sm font-bold text-white">
                      {formatNumber(activity.score)}
                    </p>

                    <p className="text-[10px] text-slate-600">
                      امتیاز
                    </p>
                  </div>
                ) : null}

                {activity.href ? (
                  <ArrowLeft
                    aria-hidden="true"
                    className="h-4 w-4 text-slate-700"
                  />
                ) : null}
              </div>
            );

            if (!activity.href) {
              return <div key={activity.id}>{content}</div>;
            }

            return (
              <Link
                key={activity.id}
                href={activity.href}
                className="block"
              >
                {content}
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-white/10 px-5 py-10 text-center">
          <p className="text-sm font-medium text-slate-400">
            هنوز فعالیتی انجام نداده‌ای
          </p>
        </div>
      )}
    </Card>
  );
}