import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Circle,
  Clock3,
  ListChecks,
  Play,
  Sparkles,
} from "lucide-react";

import { Card } from "../../../components/ui/card";
import { Progress } from "../../../components/ui/progress";
import { cn } from "../../../lib/utils/cn";

import {
  DASHBOARD_ACTIVITY_STATUS_LABELS,
  DASHBOARD_SKILL_LABELS,
} from "../constants/dashboard.constants";

import type {
  ActivityStatus,
  DailyPlan,
  DailyTask,
} from "../types/dashboard.types";

type DailyPlanCardProps = Readonly<{
  plan?: DailyPlan | null;
}>;

const numberFormatter =
  new Intl.NumberFormat("fa-IR");

const EMPTY_DAILY_PLAN: DailyPlan = {
  date: "",
  completionPercent: 0,
  completedTasks: 0,
  totalTasks: 0,
  estimatedRemainingMinutes: 0,
  tasks: [],
};

const statusStyles = {
  pending: {
    icon: Circle,
    iconClassName: "text-slate-500",

    wrapperClassName:
      "border-white/[0.06] bg-white/[0.02]",
  },

  in_progress: {
    icon: Play,
    iconClassName: "text-cyan-300",

    wrapperClassName:
      "border-cyan-400/15 bg-cyan-400/[0.04]",
  },

  completed: {
    icon: Check,
    iconClassName: "text-emerald-300",

    wrapperClassName:
      "border-emerald-400/15 bg-emerald-400/[0.04]",
  },

  skipped: {
    icon: Circle,
    iconClassName: "text-slate-600",

    wrapperClassName:
      "border-white/[0.04] bg-white/[0.01]",
  },
} satisfies Record<
  ActivityStatus,
  {
    icon: typeof Circle;
    iconClassName: string;
    wrapperClassName: string;
  }
>;

function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

function DailyTaskItem({
  task,
}: {
  task: DailyTask;
}) {
  const statusStyle =
    statusStyles[task.status] ??
    statusStyles.pending;

  const StatusIcon = statusStyle.icon;

  const content = (
    <div
      className={cn(
        "flex items-start gap-3 rounded-2xl border p-3.5",
        "transition duration-200",
        statusStyle.wrapperClassName,

        task.href &&
          "hover:border-white/15 hover:bg-white/[0.05]",
      )}
    >
      <div
        className="
          mt-0.5 flex h-9 w-9 shrink-0
          items-center justify-center rounded-xl
          bg-black/15
        "
      >
        <StatusIcon
          aria-hidden="true"
          className={cn(
            "h-4 w-4",
            statusStyle.iconClassName,
          )}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3
            className={cn(
              "text-sm font-semibold text-slate-100",

              task.status === "completed" &&
                "text-slate-400 line-through",
            )}
          >
            {task.title}
          </h3>

          <span
            className="
              rounded-full bg-white/[0.05]
              px-2 py-0.5 text-[10px]
              text-slate-400
            "
          >
            {DASHBOARD_SKILL_LABELS[
              task.skill
            ]}
          </span>
        </div>

        {task.description ? (
          <p className="mt-1.5 text-xs leading-6 text-slate-500">
            {task.description}
          </p>
        ) : null}

        <div className="mt-2.5 flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1 text-xs text-slate-500">
            <Clock3
              aria-hidden="true"
              className="h-3.5 w-3.5"
            />

            {formatNumber(
              task.estimatedMinutes,
            )}{" "}
            دقیقه
          </span>

          <span className="flex items-center gap-1 text-xs text-amber-300/80">
            <Sparkles
              aria-hidden="true"
              className="h-3.5 w-3.5"
            />

            {formatNumber(task.xpReward)}{" "}
            امتیاز
          </span>

          <span className="text-xs text-slate-600">
            {
              DASHBOARD_ACTIVITY_STATUS_LABELS[
                task.status
              ]
            }
          </span>
        </div>
      </div>

      {task.href ? (
        <ArrowLeft
          aria-hidden="true"
          className="
            mt-2 h-4 w-4 shrink-0
            text-slate-600 transition
            group-hover:text-slate-300
          "
        />
      ) : null}
    </div>
  );

  if (!task.href) {
    return content;
  }

  return (
    <Link
      href={task.href}
      className="
        group block rounded-2xl
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-cyan-300/60
      "
    >
      {content}
    </Link>
  );
}

export function DailyPlanCard({
  plan,
}: DailyPlanCardProps) {
  const safePlan =
    plan ?? EMPTY_DAILY_PLAN;

  const tasks = Array.isArray(
    safePlan.tasks,
  )
    ? safePlan.tasks
    : [];

  const hasTasks = tasks.length > 0;

  return (
    <Card className="h-full p-5 sm:p-6">
      <div
        className="
          flex flex-col gap-4
          sm:flex-row sm:items-start
          sm:justify-between
        "
      >
        <div>
          <div className="flex items-center gap-2 text-cyan-300">
            <ListChecks
              aria-hidden="true"
              className="h-5 w-5"
            />

            <span className="text-sm font-medium">
              برنامه امروز
            </span>
          </div>

          <h2 className="mt-2 text-xl font-bold text-white">
            مسیر یادگیری امروزت
          </h2>

          <p className="mt-2 text-sm leading-7 text-slate-500">
            {formatNumber(
              safePlan.completedTasks,
            )}{" "}
            مورد از{" "}
            {formatNumber(
              safePlan.totalTasks,
            )}{" "}
            تمرین انجام شده است.
          </p>
        </div>

        <div
          className="
            rounded-xl bg-white/[0.04]
            px-3 py-2 text-xs text-slate-400
          "
        >
          حدود{" "}
          {formatNumber(
            safePlan.estimatedRemainingMinutes,
          )}{" "}
          دقیقه باقی مانده
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            پیشرفت برنامه
          </span>

          <span className="text-sm font-bold text-white">
            {formatNumber(
              safePlan.completionPercent,
            )}
            ٪
          </span>
        </div>

        <Progress
          value={
            safePlan.completionPercent
          }
          label="پیشرفت برنامه امروز"
          indicatorClassName="from-emerald-300 to-cyan-400"
        />
      </div>

      {hasTasks ? (
        <div className="mt-6 space-y-3">
          {tasks.map((task) => (
            <DailyTaskItem
              key={task.id}
              task={task}
            />
          ))}
        </div>
      ) : (
        <div
          className="
            mt-6 rounded-2xl border
            border-dashed border-white/10
            bg-white/[0.02]
            px-5 py-8 text-center
          "
        >
          <p className="text-sm font-medium text-slate-300">
            برنامه‌ای برای امروز وجود ندارد
          </p>

          <p className="mt-2 text-xs leading-6 text-slate-500">
            برنامه شخصی تو بعد از اولین
            ارزیابی ساخته می‌شود.
          </p>
        </div>
      )}
    </Card>
  );
}