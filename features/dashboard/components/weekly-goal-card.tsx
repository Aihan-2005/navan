import {
  Trophy,
} from "lucide-react";

import type {
  WeeklyGoalItem,
} from "../types/dashboard.types";

type WeeklyGoalCardProps = {
  goals?:
    readonly WeeklyGoalItem[];
};

const defaultGoals:
  readonly WeeklyGoalItem[] = [
    {
      id:
        "words",

      label:
        "یادگیری ۱۰۰ واژه جدید",

      current:
        65,

      target:
        100,

      displayValue:
        "۶۵/۱۰۰",
    },

    {
      id:
        "listening",

      label:
        "۱۰ ساعت گوش دادن",

      current:
        4,

      target:
        10,

      displayValue:
        "۴/۱۰",
    },

    {
      id:
        "speaking",

      label:
        "۵ جلسه مکالمه با AI",

      current:
        2,

      target:
        5,

      displayValue:
        "۲/۵",
    },
  ];

export function WeeklyGoalCard({
  goals =
    defaultGoals,
}: WeeklyGoalCardProps) {
  return (
    <article
      dir="rtl"
      className="
        h-[250px]
        w-full
        rounded-2xl
        border
        border-[#BCC9C6]
        bg-[#FFFFFFCC]
        p-8
        shadow-[0_4px_20px_0_rgba(0,0,0,0.04)]
        backdrop-blur-[12px]
      "
    >
      <header
        className="
          flex
          h-6
          items-center
          gap-2
        "
      >
        <Trophy
          className="
            h-[18px]
            w-[18px]
            text-[#14B8A6]
          "
        />

        <h2
          className="
            text-base
            font-bold
            leading-6
            text-[#191C1E]
          "
        >
          اهداف هفتگی
        </h2>
      </header>

      <div
        className="
          mt-5
          flex
          flex-col
          gap-5
        "
      >
        {goals.map(
          (goal) => {
            const progress =
              goal.target > 0
                ? Math.min(
                    100,
                    (
                      goal.current /
                      goal.target
                    ) * 100,
                  )
                : 0;

            return (
              <div
                key={
                  goal.id
                }
                className="
                  flex
                  flex-col
                  gap-2
                "
              >
                <div
                  className="
                    flex
                    h-4
                    items-center
                    justify-between
                  "
                >
                  <span
                    className="
                      text-xs
                      font-bold
                      leading-4
                      text-[#191C1E]
                    "
                  >
                    {
                      goal.label
                    }
                  </span>

                  <span
                    className="
                      text-xs
                      font-bold
                      text-[#14B8A6]
                    "
                  >
                    {
                      goal.displayValue
                    }
                  </span>
                </div>

                <div
                  className="
                    h-2
                    w-full
                    overflow-hidden
                    rounded-full
                    bg-[#ECEEF0]
                  "
                >
                  <div
                    className="
                      h-full
                      rounded-full
                      bg-[#14B8A6]
                    "
                    style={{
                      width:
                        `${progress}%`,
                    }}
                  />
                </div>
              </div>
            );
          },
        )}
      </div>
    </article>
  );
}