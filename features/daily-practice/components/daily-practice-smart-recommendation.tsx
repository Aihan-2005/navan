"use client";

import Link from "next/link";

import {
  BrainCircuit,
  Mic2,
  Sparkles,
} from "lucide-react";

import {
  useState,
} from "react";

import type {
  DailyPracticeRecommendation,
} from "../types/daily-practice.types";

type DailyPracticeSmartRecommendationProps =
  Readonly<{
    recommendation: DailyPracticeRecommendation;
  }>;

export function DailyPracticeSmartRecommendation({
  recommendation,
}: DailyPracticeSmartRecommendationProps) {
  const [
    isDeferred,
    setIsDeferred,
  ] = useState(false);

  if (isDeferred) {
    return (
      <section
        dir="rtl"
        className="
          flex
          flex-col
          gap-4
          rounded-2xl
          border
          border-[#00685F33]
          bg-[#00685F0D]
          px-5
          py-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
        aria-live="polite"
      >
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <span
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[#00685F]
              text-white
              shadow-[0_3px_12px_rgba(0,104,95,0.12)]
            "
          >
            <Sparkles
              aria-hidden="true"
              className="h-5 w-5"
            />
          </span>

          <p className="text-sm text-[#3D4947]">
            پیشنهاد هوشمند برای بعد نگه داشته شد.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsDeferred(false);
          }}
          className="
            self-start
            rounded-xl
            border
            border-[#00685F33]
            bg-white
            px-4
            py-2
            text-sm
            font-medium
            text-[#00685F]
            transition
            hover:bg-[#F0FDFA]
            sm:self-auto
          "
        >
          نمایش دوباره
        </button>
      </section>
    );
  }

  return (
    <section
      dir="rtl"
      aria-labelledby="daily-smart-recommendation-title"
      className="
        flex
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-[#00685F33]
        bg-[#00685F0D]
        shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]
        lg:min-h-[226px]
        lg:flex-row
      "
    >
      <div
        aria-hidden="true"
        className="
          relative
          flex
          h-28
          w-full
          shrink-0
          items-center
          justify-center
          overflow-hidden
          lg:h-auto
          lg:w-[160px]
        "
      >
        <div
          className="
            absolute
            h-28
            w-28
            rounded-full
            border
            border-[#00685F1A]
          "
        />

        <div
          className="
            absolute
            h-20
            w-20
            rounded-full
            bg-[#00685F12]
          "
        />

        <span
          className="
            relative
            flex
            h-[58px]
            w-[58px]
            items-center
            justify-center
            rounded-2xl
            bg-[#00685F]
            text-white
            shadow-[0_10px_28px_rgba(0,104,95,0.2)]
          "
        >
          <BrainCircuit
            className="h-8 w-8"
          />
        </span>
      </div>

      <div
        className="
          flex
          min-w-0
          flex-1
          flex-col
          justify-center
          p-6
          sm:p-8
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
            text-[#00685F]
          "
        >
          <Sparkles
            aria-hidden="true"
            className="h-[22px] w-[22px]"
          />

          <h2
            id="daily-smart-recommendation-title"
            className="
              text-base
              font-medium
            "
          >
            {recommendation.title}
          </h2>
        </div>

        <p
          className="
            mt-4
            max-w-[672px]
            text-base
            leading-[26px]
            text-[#3D4947]
          "
        >
          {recommendation.descriptionBeforeHighlight}{" "}

          <strong
            className="
              font-bold
              text-[#191C1E]
            "
          >
            {recommendation.highlightedSkill}
          </strong>{" "}

          {recommendation.descriptionAfterHighlight}
        </p>

        <div
          className="
            mt-6
            flex
            flex-col
            gap-3
            sm:flex-row
            sm:items-center
          "
        >
          <Link
            href={recommendation.actionHref}
            className="
              inline-flex
              min-h-12
              items-center
              justify-center
              gap-3
              rounded-2xl
              bg-[#00685F]
              px-8
              text-base
              font-medium
              text-white
              shadow-[0_8px_22px_rgba(0,104,95,0.16)]
              transition
              hover:bg-[#005A52]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#00685F]/30
              focus-visible:ring-offset-2
            "
          >
            <Mic2
              aria-hidden="true"
              className="h-4 w-4"
            />

            {recommendation.actionLabel}
          </Link>

          <button
            type="button"
            onClick={() => {
              setIsDeferred(true);
            }}
            className="
              inline-flex
              min-h-10
              items-center
              justify-center
              rounded-2xl
              border
              border-[#CBD5E1]
              bg-transparent
              px-4
              text-base
              text-[#3D4947]
              transition
              hover:bg-white/70
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#00685F]/20
            "
          >
            بعداً انجام می‌دهم
          </button>
        </div>
      </div>
    </section>
  );
}