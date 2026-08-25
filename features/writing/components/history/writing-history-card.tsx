import Link from "next/link";

import {
  ArrowLeft,
  FilePenLine,
} from "lucide-react";

import type {
  RecentWriting,
} from "../../types/writing.types";

type WritingHistoryCardProps =
  Readonly<{
    writing: RecentWriting;
  }>;

const numberFormatter =
  new Intl.NumberFormat("fa-IR");

function getModeLabel(
  mode: RecentWriting["mode"],
): string {
  switch (mode) {
    case "free":
      return "نوشتن آزاد";

    case "exercise":
      return "تمرین نوشتاری";

    case "draft":
      return "پیش‌نویس";
  }
}

function getScoreStyles(
  score: number,
): string {
  if (score >= 80) {
    return [
      "border-emerald-400/20",
      "bg-emerald-400/10",
      "text-emerald-200",
    ].join(" ");
  }

  if (score >= 60) {
    return [
      "border-amber-400/20",
      "bg-amber-400/10",
      "text-amber-200",
    ].join(" ");
  }

  return [
    "border-rose-400/20",
    "bg-rose-400/10",
    "text-rose-200",
  ].join(" ");
}

export function WritingHistoryCard({
  writing,
}: WritingHistoryCardProps) {
  const score =
    Math.max(
      0,
      Math.min(
        100,
        writing.score,
      ),
    );

  return (
    <Link
      href={`/writing/submissions/${encodeURIComponent(
        writing.id,
      )}`}
      dir="rtl"
      className="
        group
        block
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-slate-950/55
        transition
        duration-200
        hover:-translate-y-0.5
        hover:border-cyan-300/20
        hover:bg-slate-950/75
        hover:shadow-[0_12px_30px_rgba(0,0,0,0.18)]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-cyan-300/30
      "
    >
      <div
        className="
          flex
          flex-col
          gap-5
          p-5
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div
          className="
            flex
            min-w-0
            items-start
            gap-4
          "
        >
          <span
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-cyan-300/10
              bg-cyan-400/10
              text-cyan-300
              transition
              group-hover:bg-cyan-400/15
            "
          >
            <FilePenLine
              aria-hidden="true"
              className="h-5 w-5"
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
              <h3
                className="
                  text-base
                  font-bold
                  leading-6
                  text-white
                  sm:text-lg
                "
              >
                {writing.title}
              </h3>

              <span
                className="
                  rounded-full
                  border
                  border-white/[0.08]
                  bg-white/[0.04]
                  px-2.5
                  py-1
                  text-[10px]
                  font-medium
                  text-slate-400
                "
              >
                {getModeLabel(
                  writing.mode,
                )}
              </span>
            </div>

            <p
              className="
                mt-2
                line-clamp-2
                max-w-2xl
                text-sm
                leading-7
                text-slate-400
              "
            >
              {writing.excerpt}
            </p>

            <div
              className="
                mt-3
                flex
                flex-wrap
                items-center
                gap-x-4
                gap-y-2
                text-xs
                text-slate-500
              "
            >
              <span>
                {writing.date}
              </span>

              {writing.feedback ? (
                <span
                  className="
                    line-clamp-1
                    max-w-md
                  "
                >
                  {writing.feedback}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        <div
          className="
            flex
            shrink-0
            items-center
            justify-between
            gap-4
            sm:justify-end
          "
        >
          <span
            className={`
              inline-flex
              min-w-[72px]
              items-center
              justify-center
              rounded-full
              border
              px-3
              py-1.5
              text-sm
              font-bold
              ${getScoreStyles(
                score,
              )}
            `}
          >
            {numberFormatter.format(
              score,
            )}
            ٪
          </span>

          <span
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-white/[0.08]
              bg-white/[0.04]
              text-slate-400
              transition
              group-hover:border-cyan-300/20
              group-hover:bg-cyan-400/10
              group-hover:text-cyan-200
            "
          >
            <ArrowLeft
              aria-hidden="true"
              className="h-4 w-4"
            />
          </span>
        </div>
      </div>

      <div
        className="
          h-1
          w-full
          bg-white/[0.04]
        "
      >
        <div
          className="
            h-full
            bg-cyan-400
            transition-[width]
            duration-500
          "
          style={{
            width: `${score}%`,
          }}
        />
      </div>
    </Link>
  );
}