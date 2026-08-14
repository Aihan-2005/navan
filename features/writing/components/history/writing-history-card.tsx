import Link from "next/link";
import { ArrowLeft, BookOpenText, FileText } from "lucide-react";

import { Card } from "../../../../components/ui/card";
import { cn } from "../../../../lib/utils/cn";

import type { WritingHistoryItem } from "../../api/get-writing-history";

type WritingHistoryCardProps = Readonly<{
  writing: WritingHistoryItem;
}>;

const modeBadgeStyles = {
  exercise: "border-violet-400/15 bg-violet-400/10 text-violet-200",
  free: "border-cyan-400/15 bg-cyan-400/10 text-cyan-200",
  draft: "border-amber-400/15 bg-amber-400/10 text-amber-200",
};

const modeLabels = {
  exercise: "تمرین",
  free: "نوشتن آزاد",
  draft: "پیش‌نویس",
};

export function WritingHistoryCard({ writing }: WritingHistoryCardProps) {
  return (
    <Card
      className={cn(
        "group flex h-full flex-col overflow-hidden p-5",
        "transition duration-300",
        "hover:-translate-y-1 hover:border-cyan-400/20",
      )}
      dir="rtl"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <span
              className={cn(
                "rounded-full border px-2.5 py-1 text-[10px] font-medium",
                modeBadgeStyles[writing.mode],
              )}
            >
              {modeLabels[writing.mode]}
            </span>

            {writing.exercise ? (
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-slate-400">
                {writing.exercise.category}
              </span>
            ) : null}
          </div>

          <span className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-2.5 py-1 text-[11px] font-semibold text-cyan-200">
            امتیاز {writing.score}٪
          </span>
        </div>

        <h3 className="mt-4 text-lg font-bold leading-8 text-white">
          {writing.title}
        </h3>

        {writing.exercise ? (
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
            <BookOpenText aria-hidden="true" className="h-3.5 w-3.5" />
            <span>{writing.exercise.title}</span>
          </div>
        ) : null}

        <p className="mt-3 text-sm leading-7 text-slate-400">
          {writing.excerpt}
        </p>

        <p className="mt-2 text-xs text-slate-500">{writing.date}</p>

        <div
          className="
            mt-5 flex items-center justify-between
            border-t border-white/[0.06] pt-4
          "
        >
          <div className="flex gap-2">
            <Link
              href={`/writing/submissions/${writing.id}`}
              className="
                inline-flex items-center gap-1.5 rounded-xl
                border border-cyan-300/20 bg-cyan-400/10
                px-3 py-2 text-xs font-medium text-cyan-200
                transition hover:bg-cyan-400/15
              "
            >
              <FileText aria-hidden="true" className="h-3.5 w-3.5" />
              مشاهده تحلیل
            </Link>

            <Link
              href={`/writing/submissions/${writing.id}`}
              className="
                inline-flex items-center gap-1.5 rounded-xl
                border border-white/10 bg-white/5
                px-3 py-2 text-xs font-medium text-slate-400
                transition hover:bg-white/10
              "
            >
              مشاهده متن کامل
            </Link>
          </div>

          <Link
            href={`/writing/submissions/${writing.id}`}
            aria-label={`مشاهده ${writing.title}`}
            className="
              inline-flex h-9 w-9 items-center
              justify-center rounded-xl
              bg-white text-slate-950
              transition hover:bg-cyan-300
            "
          >
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
