import Link from "next/link";

import {
  BarChart3,
  BookOpenText,
  Check,
  Clock3,
  Languages,
  MessageCircle,
  PenLine,
  Play,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import {
  cn,
} from "../../../lib/utils/cn";

import type {
  DailyPracticeTask,
  DailyPracticeTaskKind,
} from "../types/daily-practice.types";

type DailyPracticeTaskCardProps =
  Readonly<{
    task: DailyPracticeTask;
  }>;

const numberFormatter =
  new Intl.NumberFormat("fa-IR");

const TASK_PRESENTATION = {
  vocabulary: {
    label: "واژگان",
    icon: BookOpenText,

    iconClassName:
      "bg-[#CCFBF1] text-[#0F8F82]",

    badgeClassName:
      "bg-[#14B8A617] text-[#0F766E]",
  },

  speaking: {
    label: "مکالمه",
    icon: MessageCircle,

    iconClassName:
      "bg-[#6C748B1A] text-[#596174]",

    badgeClassName:
      "bg-[#DAE2FD] text-[#3F465C]",
  },

  grammar: {
    label: "گرامر",
    icon: Languages,

    iconClassName:
      "bg-[#EADDFF4D] text-[#712AE2]",

    badgeClassName:
      "bg-[#EADDFF] text-[#5A00C6]",
  },

  writing: {
    label: "نوشتاری",
    icon: PenLine,

    iconClassName:
      "bg-[#FFEDD5] text-[#EA580C]",

    badgeClassName:
      "bg-[#FFEDD5] text-[#C2410C]",
  },

  assessment: {
    label: "ارزیابی",
    icon: BarChart3,

    iconClassName:
      "bg-[#FFDAD633] text-[#B42318]",

    badgeClassName:
      "bg-[#FFDAD6] text-[#93000A]",
  },
} satisfies Record<
  DailyPracticeTaskKind,
  {
    label: string;
    icon: LucideIcon;
    iconClassName: string;
    badgeClassName: string;
  }
>;

function formatNumber(
  value: number,
): string {
  return numberFormatter.format(value);
}

export function DailyPracticeTaskCard({
  task,
}: DailyPracticeTaskCardProps) {
  const presentation =
    TASK_PRESENTATION[task.kind];

  const Icon =
    presentation.icon;

  const isCompleted =
    task.status === "completed";

  const isInProgress =
    task.status === "in_progress";

  return (
    <article
      dir="rtl"
      className={cn(
        "flex min-h-[106px] flex-col",
        "gap-5 rounded-2xl border",
        "bg-white/80 p-5",
        "shadow-[0_4px_20px_rgba(0,0,0,0.04)]",
        "backdrop-blur-lg",
        "transition duration-200",
        "md:flex-row md:items-center",
        "md:justify-between md:p-6",

        isCompleted && [
          "border-[#E2E8F0CC]",
          "border-r-4",
          "border-r-[#14B8A6]",
          "opacity-80",
        ],

        isInProgress && [
          "border-[#8BCBC3]",
          "shadow-[0_8px_24px_rgba(13,148,136,0.08)]",
        ],

        !isCompleted &&
          !isInProgress &&
          "border-[#E2E8F0CC]",
      )}
    >
      <div
        className="
          flex
          min-w-0
          items-start
          gap-4
          sm:gap-6
        "
      >
        <span
          className={cn(
            "flex h-14 w-14 shrink-0",
            "items-center justify-center",
            "rounded-xl",
            presentation.iconClassName,
          )}
        >
          <Icon
            aria-hidden="true"
            className="h-6 w-6"
            strokeWidth={1.8}
          />
        </span>

        <div className="min-w-0">
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-2
            "
          >
            <span
              className={cn(
                "rounded px-2 py-0.5",
                "text-[10px] font-bold",
                "leading-[15px]",
                presentation.badgeClassName,
              )}
            >
              {presentation.label}
            </span>

            <h3
              className={cn(
                "text-base leading-6",
                "text-[#191C1E]",

                isCompleted &&
                  "text-[#3D4947] line-through",
              )}
            >
              {task.title}
            </h3>
          </div>

          <div
            className="
              mt-1
              flex
              flex-wrap
              items-center
              gap-x-4
              gap-y-1
            "
          >
            <span
              className="
                inline-flex
                items-center
                gap-1
                text-base
                text-[#3D4947]
              "
            >
              <Clock3
                aria-hidden="true"
                className="h-3.5 w-3.5"
              />

              {formatNumber(
                task.durationMinutes,
              )}{" "}
              دقیقه
            </span>

            <span
              className="
                inline-flex
                items-center
                gap-1
                text-base
                text-[#712AE2]
              "
            >
              <Sparkles
                aria-hidden="true"
                className="h-3.5 w-3.5"
              />

              +
              {formatNumber(
                task.xpReward,
              )}{" "}
              امتیاز
            </span>
          </div>
        </div>
      </div>

      <TaskAction
        task={task}
      />
    </article>
  );
}

function TaskAction({
  task,
}: Readonly<{
  task: DailyPracticeTask;
}>) {
  if (
    task.status ===
    "completed"
  ) {
    return (
      <div
        className="
          inline-flex
          min-h-10
          items-center
          gap-2
          self-start
          text-sm
          font-medium
          text-[#16A266]
          md:self-auto
        "
      >
        <Check
          aria-hidden="true"
          className="h-4 w-4"
        />

        انجام‌شده
      </div>
    );
  }

  if (!task.href) {
    return null;
  }

  if (
    task.status ===
    "in_progress"
  ) {
    return (
      <Link
        href={task.href}
        className="
          inline-flex
          min-h-12
          min-w-[104px]
          self-start
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-[#F97316]
          px-6
          text-base
          text-white
          shadow-[0_6px_16px_rgba(249,115,22,0.16)]
          transition
          hover:bg-[#EA580C]
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#F97316]/30
          focus-visible:ring-offset-2
          md:self-auto
        "
      >
        <Play
          aria-hidden="true"
          className="h-4 w-4"
          fill="currentColor"
        />

        ادامه
      </Link>
    );
  }

  return (
    <Link
      href={task.href}
      className="
        inline-flex
        min-h-12
        min-w-[100px]
        self-start
        items-center
        justify-center
        rounded-xl
        bg-[#00685F1A]
        px-6
        text-base
        text-[#00685F]
        transition
        hover:bg-[#00685F26]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#00685F]/25
        md:self-auto
      "
    >
      شروع
    </Link>
  );
}
