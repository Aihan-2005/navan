import Link from "next/link";
import {
  ArrowLeft,
  BookOpenCheck,
  Clock3,
  MessageCircleMore,
} from "lucide-react";

import { Card } from "../../../components/ui/card";
import { Progress } from "../../../components/ui/progress";

import { DASHBOARD_SKILL_LABELS } from "../constants/dashboard.constants";
import type { ContinueLearning } from "../types/dashboard.types";

type ContinueLearningCardProps = {
  activity: ContinueLearning | null;
};

const numberFormatter = new Intl.NumberFormat("fa-IR");

function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

function EmptyContinueLearningCard() {
  return (
    <Card className="relative h-full overflow-hidden p-6 sm:p-7">
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -left-16 -top-16
          h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl
        "
      />

      <div className="relative flex h-full flex-col justify-between gap-8">
        <div>
          <div
            className="
              flex h-12 w-12 items-center justify-center rounded-2xl
              bg-cyan-400/10 text-cyan-300
            "
          >
            <MessageCircleMore
              aria-hidden="true"
              className="h-6 w-6"
            />
          </div>

          <h2 className="mt-5 text-xl font-bold text-white">
            اولین جلسه‌ات را شروع کن
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-7 text-slate-400">
            هنوز فعالیت نیمه‌تمامی نداری. با معلم هوشمند گفتگو کن تا
            اولین برنامه تمرینی شخصی تو ساخته شود.
          </p>
        </div>

        <Link
          href="/tutor"
          className="
            inline-flex w-fit items-center justify-center gap-2
            rounded-xl bg-cyan-400 px-4 py-2.5
            text-sm font-bold text-slate-950
            transition hover:bg-cyan-300
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-cyan-300 focus-visible:ring-offset-2
            focus-visible:ring-offset-slate-950
          "
        >
          شروع با معلم هوشمند

          <ArrowLeft
            aria-hidden="true"
            className="h-4 w-4"
          />
        </Link>
      </div>
    </Card>
  );
}

export function ContinueLearningCard({
  activity,
}: ContinueLearningCardProps) {
  if (!activity) {
    return <EmptyContinueLearningCard />;
  }

  const skillLabel = DASHBOARD_SKILL_LABELS[activity.skill];

  return (
    <Card className="relative h-full overflow-hidden p-6 sm:p-7">
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -left-20 -top-24
          h-64 w-64 rounded-full bg-blue-500/10 blur-3xl
        "
      />

      <div className="relative flex h-full flex-col">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-cyan-300">
              <BookOpenCheck
                aria-hidden="true"
                className="h-4 w-4"
              />

              <span>ادامه یادگیری</span>
            </div>

            <h2 className="mt-3 text-xl font-bold text-white sm:text-2xl">
              {activity.title}
            </h2>

            {activity.description ? (
              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-400">
                {activity.description}
              </p>
            ) : null}
          </div>

          <span
            className="
              inline-flex w-fit shrink-0 rounded-full
              border border-cyan-400/20 bg-cyan-400/10
              px-3 py-1 text-xs font-medium text-cyan-200
            "
          >
            {skillLabel}
          </span>
        </div>

        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between gap-4">
            <span className="text-sm text-slate-400">
              پیشرفت جلسه
            </span>

            <span className="text-sm font-bold text-white">
              {formatNumber(activity.progressPercent)}٪
            </span>
          </div>

          <Progress
            value={activity.progressPercent}
            label={`پیشرفت جلسه ${activity.title}`}
          />
        </div>

        <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Clock3
              aria-hidden="true"
              className="h-4 w-4"
            />

            <span>
              حدود {formatNumber(activity.estimatedMinutesRemaining)} دقیقه
              باقی مانده
            </span>
          </div>

          <Link
            href={activity.href}
            className="
              inline-flex items-center justify-center gap-2
              rounded-xl bg-white px-4 py-2.5
              text-sm font-bold text-slate-950
              transition hover:bg-slate-200
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-white focus-visible:ring-offset-2
              focus-visible:ring-offset-slate-950
            "
          >
            ادامه جلسه

            <ArrowLeft
              aria-hidden="true"
              className="h-4 w-4"
            />
          </Link>
        </div>
      </div>
    </Card>
  );
}