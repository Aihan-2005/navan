import Link from "next/link";
import { ArrowLeft, Sparkles, Clock3 } from "lucide-react";

import { Card } from "../../../../components/ui/card";
import { cn } from "../../../../lib/utils/cn";
import { WRITING_DIFFICULTY_STYLES } from "../../constants/writing.constants";
import type { WritingExercise } from "../../types/writing.types";

type WritingModeCardProps = Readonly<{
  exercise: WritingExercise;
}>;

export function WritingModeCard({ exercise }: WritingModeCardProps) {
  return (
    <Card
      className={cn(
        "group relative flex h-full flex-col overflow-hidden p-5",
        "transition duration-300",
        "hover:-translate-y-1 hover:border-cyan-400/20",
      )}
      dir="rtl"
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -left-20 -top-20
          h-44 w-44 rounded-full bg-cyan-500/10
          opacity-0 blur-3xl transition
          group-hover:opacity-100
        "
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap justify-end gap-2">
            {exercise.isFeatured ? (
              <span
                className="
                  inline-flex items-center gap-1 rounded-full
                  border border-violet-400/15
                  bg-violet-400/10 px-2.5 py-1
                  text-[10px] font-medium text-violet-200
                "
              >
                <Sparkles
                  aria-hidden="true"
                  className="h-3 w-3"
                />

                پیشنهادی
              </span>
            ) : null}

            <span
              className={cn(
                "rounded-full border px-2.5 py-1",
                "text-[10px] font-medium",
                WRITING_DIFFICULTY_STYLES[exercise.difficulty],
              )}
            >
              {exercise.difficulty}
            </span>
          </div>
        </div>

        <p className="mt-5 text-xs font-medium text-cyan-300">
          {exercise.category}
        </p>

        <h3 className="mt-2 text-lg font-bold leading-8 text-white">
          {exercise.title}
        </h3>

        <p className="mt-2 flex-1 text-sm leading-7 text-slate-400">
          {exercise.description}
        </p>

        <div
          className="
            mt-5 flex items-center justify-between
            border-t border-white/[0.06] pt-4
          "
        >
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Clock3
                aria-hidden="true"
                className="h-3.5 w-3.5"
              />

              {exercise.estimatedMinutes} دقیقه
            </span>

            <span>{exercise.expectedWordCount} کلمه</span>
          </div>

          <Link
            href={`/writing/exercises/${exercise.id}`}
            aria-label={`شروع تمرین ${exercise.title}`}
            className="
              inline-flex h-10 w-10 items-center
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
