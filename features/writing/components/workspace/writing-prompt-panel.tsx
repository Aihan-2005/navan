"use client";

import {
  BookOpenText,
  Clock3,
  Infinity,
  Lightbulb,
  Sparkles,
} from "lucide-react";

import {
  Card,
} from "../../../../components/ui/card";

type WritingPromptPanelProps =
  Readonly<{
    title:
      string;

    description:
      string;

    prompt:
      string;

    tips:
      readonly string[];

    modeLabel:
      string;

    instructions:
      readonly string[];

    writingGoal:
      string;

    category:
      string;

    difficulty:
      string;

    estimatedMinutes:
      number;
  }>;

export function WritingPromptPanel({
  title,
  description,
  prompt,
  tips,
  modeLabel,
  instructions,
  writingGoal,
  category,
  difficulty,
  estimatedMinutes,
}: WritingPromptPanelProps) {
  return (
    <Card
      className="p-6"
      dir="rtl"
    >
      <div
        className="
          flex
          items-center
          gap-2
          text-sm
          text-violet-300
        "
      >
        <BookOpenText
          aria-hidden="true"
          className="h-4 w-4"
        />

        {modeLabel}
      </div>

      <h2
        className="
          mt-4
          text-xl
          font-bold
          text-white
        "
      >
        {title}
      </h2>

      <p
        className="
          mt-3
          text-sm
          leading-8
          text-slate-400
        "
      >
        {description}
      </p>

      <div
        className="
          mt-6
          rounded-2xl
          border
          border-cyan-400/15
          bg-cyan-400/10
          p-4
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
            text-sm
            font-semibold
            text-cyan-200
          "
        >
          <Sparkles
            aria-hidden="true"
            className="h-4 w-4"
          />

          پرامپت اصلی
        </div>

        <p
          className="
            mt-3
            text-sm
            leading-8
            text-slate-200
          "
        >
          {prompt}
        </p>
      </div>

      <div
        className="
          mt-6
          grid
          gap-3
          md:grid-cols-2
        "
      >
        <div
          className="
            rounded-2xl
            border
            border-white/[0.08]
            bg-white/[0.03]
            p-4
          "
        >
          <p
            className="
              text-sm
              font-semibold
              text-white
            "
          >
            هدف نوشتن
          </p>

          <p
            className="
              mt-2
              text-sm
              leading-7
              text-slate-400
            "
          >
            {writingGoal}
          </p>
        </div>

        <div
          className="
            rounded-2xl
            border
            border-white/[0.08]
            bg-white/[0.03]
            p-4
          "
        >
          <p
            className="
              text-sm
              font-semibold
              text-white
            "
          >
            اطلاعات تمرین
          </p>

          <div
            className="
              mt-3
              flex
              flex-wrap
              gap-2
            "
          >
            <span
              className="
                rounded-lg
                bg-white/[0.04]
                px-2.5
                py-1
                text-xs
                text-slate-400
              "
            >
              {category}
            </span>

            <span
              className="
                rounded-lg
                bg-white/[0.04]
                px-2.5
                py-1
                text-xs
                text-slate-400
              "
            >
              {difficulty}
            </span>
          </div>

          <div
            className="
              mt-4
              flex
              flex-wrap
              gap-4
              text-xs
              text-slate-500
            "
          >
            <span
              className="
                inline-flex
                items-center
                gap-1.5
              "
            >
              <Clock3
                aria-hidden="true"
                className="h-3.5 w-3.5"
              />

              حدود{" "}
              {estimatedMinutes}{" "}
              دقیقه
            </span>

            <span
              className="
                inline-flex
                items-center
                gap-1.5
                text-cyan-300
              "
            >
              <Infinity
                aria-hidden="true"
                className="h-3.5 w-3.5"
              />

              بدون محدودیت کلمه
            </span>
          </div>
        </div>
      </div>

      <GuideList
        title="راهنمایی‌های تمرین"
        items={
          instructions
        }
      />

      <GuideList
        title="نکته‌های کاربردی"
        items={
          tips
        }
      />
    </Card>
  );
}

function GuideList({
  title,
  items,
}: Readonly<{
  title:
    string;

  items:
    readonly string[];
}>) {
  return (
    <div
      className="
        mt-6
        rounded-2xl
        border
        border-white/[0.08]
        bg-white/[0.03]
        p-4
      "
    >
      <div
        className="
          flex
          items-center
          gap-2
          text-sm
          font-semibold
          text-white
        "
      >
        <Lightbulb
          aria-hidden="true"
          className="
            h-4
            w-4
            text-cyan-300
          "
        />

        {title}
      </div>

      <ul
        className="
          mt-3
          space-y-2
          text-sm
          leading-7
          text-slate-400
        "
      >
        {items.map(
          (
            item,
          ) => (
            <li
              key={
                item
              }
              className="
                flex
                gap-2
              "
            >
              <span
                aria-hidden="true"
                className="
                  mt-3
                  h-1.5
                  w-1.5
                  shrink-0
                  rounded-full
                  bg-cyan-300
                "
              />

              <span>
                {item}
              </span>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}