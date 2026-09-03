import Link from "next/link";

import {
  CheckCircle2,
  Headphones,
  Languages,
  Lock,
  MessageSquare,
  PenLine,
} from "lucide-react";

import type {
  DailyPlan,
  DailyTask,
} from "../types/dashboard.types";

type DailyPlanCardProps = {
  plan: DailyPlan;
};

function TaskIcon({
  task,
}: {
  task: DailyTask;
}) {
  if (
    task.skill ===
    "listening"
  ) {
    return (
      <Headphones
        className="h-5 w-5"
        strokeWidth={1.8}
      />
    );
  }

  if (
    task.skill ===
    "speaking"
  ) {
    return (
      <MessageSquare
        className="h-5 w-5"
        strokeWidth={1.8}
      />
    );
  }

  if (
    task.skill ===
    "grammar"
  ) {
    return (
      <Languages
        className="h-[22px] w-[22px]"
        strokeWidth={1.7}
      />
    );
  }

  if (
    task.skill ===
    "writing"
  ) {
    return (
      <PenLine
        className="h-5 w-5"
        strokeWidth={1.8}
      />
    );
  }

  return (
    <CheckCircle2
      className="h-5 w-5"
      strokeWidth={2}
    />
  );
}

function DailyTaskRow({
  task,
}: {
  task: DailyTask;
}) {
  const completed =
    task.status ===
    "completed";

  const active =
    task.status ===
    "in_progress";

  return (
    <div
      className="
        flex
        h-[73px]
        items-center
        justify-between
        border-t
        border-[#BCC9C6]
        px-4
      "
    >
      <div
        className="
          flex
          min-w-0
          items-center
          gap-4
        "
      >
        <div
          className={`
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-full
            ${
              completed
                ? "bg-[#DCFCE7] text-[#16A34A]"
                : active
                  ? "bg-[#DDF4F2] text-[#0D9488]"
                  : "bg-[#ECEEF0] text-[#6D7A77]"
            }
          `}
        >
          <TaskIcon
            task={task}
          />
        </div>

        <div className="min-w-0">
          <h3
            className="
              truncate
              text-sm
              font-bold
              leading-5
              text-[#191C1E]
            "
          >
            {task.title}
          </h3>

          <p
            className="
              text-[11px]
              font-normal
              leading-[17px]
              text-[#3D4947]
            "
          >
            {task.estimatedMinutes} دقیقه
            {" • "}
            {task.xpReward} امتیاز
          </p>
        </div>
      </div>

      {completed ? (
        <span
          className="
            inline-flex
            h-[27px]
            items-center
            rounded-lg
            border
            border-[#DCFCE7]
            bg-[#F0FDF4]
            px-2
            text-[10px]
            text-[#15803D]
          "
        >
          تکمیل شده
        </span>
      ) : null}

      {active ? (
        <Link
          href={
            task.href ??
            "/practice"
          }
          className="
            inline-flex
            h-[27px]
            min-w-[67px]
            items-center
            justify-center
            rounded-lg
            bg-[#0D9488]
            px-4
            text-[10px]
            font-bold
            text-white
          "
        >
          شروع
        </Link>
      ) : null}

      {!completed &&
      !active ? (
        <Lock
          aria-label="قفل شده"
          className="
            h-4
            w-4
            text-[#6D7A77]
          "
        />
      ) : null}
    </div>
  );
}

export function DailyPlanCard({
  plan,
}: DailyPlanCardProps) {
  return (
    <section
      dir="rtl"
      className="
        h-[439px]
        w-full
        overflow-hidden
        rounded-2xl
        border
        border-[#BCC9C6]
        bg-[#FFFFFFCC]
        shadow-[0_4px_20px_0_rgba(0,0,0,0.04)]
        backdrop-blur-[12px]
      "
    >
      <header
        className="
          flex
          h-[73px]
          items-center
          justify-between
          px-6
        "
      >
        <h2
          className="
            text-base
            font-bold
            leading-6
            text-[#191C1E]
          "
        >
          تمرین‌های امروز
        </h2>

        <Link
          href="/practice"
          className="
            text-sm
            font-bold
            leading-5
            text-[#00685F]
          "
        >
          مشاهده کامل
        </Link>
      </header>

      {plan.tasks
        .slice(0, 5)
        .map(
          (task) => (
            <DailyTaskRow
              key={task.id}
              task={task}
            />
          ),
        )}
    </section>
  );
}