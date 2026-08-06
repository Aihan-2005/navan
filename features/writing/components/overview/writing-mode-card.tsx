import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

import { Card } from "../../../../components/ui/card";

import type { WritingExercise } from "../../types/writing.types";

type WritingModeCardProps = Readonly<{
  exercise: WritingExercise;
}>;

export function WritingModeCard({ exercise }: WritingModeCardProps) {
  return (
    <Card className="flex h-full flex-col p-6" dir="rtl">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-cyan-300">{exercise.category}</p>
          <h3 className="mt-2 text-lg font-bold text-white">
            {exercise.title}
          </h3>
        </div>

        {exercise.isFeatured ? (
          <span className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-2.5 py-1 text-[11px] font-semibold text-cyan-200">
            پیشنهادی امروز
          </span>
        ) : null}
      </div>

      <p className="mt-4 flex-1 text-sm leading-7 text-slate-400">
        {exercise.description}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <Sparkles aria-hidden="true" className="h-4 w-4 text-cyan-300" />
          <span>{exercise.difficulty}</span>
        </div>
        <span>{exercise.estimatedMinutes} دقیقه</span>
      </div>

      <Link
        href={`/writing/exercises/${exercise.id}`}
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
      >
        شروع تمرین
        <ArrowLeft aria-hidden="true" className="h-4 w-4" />
      </Link>
    </Card>
  );
}
