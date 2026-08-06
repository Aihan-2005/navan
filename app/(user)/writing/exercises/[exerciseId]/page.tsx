import Link from "next/link";
import { ArrowRight, PenSquare, Sparkles } from "lucide-react";

import { Card } from "../../../../../components/ui/card";
import { getWritingPromptById } from "../../../../../features/writing/api/get-writing-prompts";
import type { WritingExercise } from "../../../../../features/writing/types/writing.types";

type WritingExercisePageProps = Readonly<{
  params: Promise<{ exerciseId: string }>;
}>;

export default async function WritingExercisePage({
  params,
}: WritingExercisePageProps) {
  const { exerciseId } = await params;
  const exercise = await getWritingPromptById(exerciseId);

  if (!exercise) {
    return (
      <main className="mx-auto w-full max-w-6xl space-y-6" dir="rtl">
        <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
          <h1 className="text-2xl font-bold text-white">تمرین یافت نشد</h1>
          <p className="mt-4 text-sm leading-8 text-slate-400">
            تمرین مورد نظر شما وجود ندارد.
          </p>
          <Link
            href="/writing"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/15"
          >
            بازگشت به صفحه نوشتن
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6" dir="rtl">
      <Link
        href="/writing"
        className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
      >
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
        بازگشت به صفحه نوشتن
      </Link>

      <section className="relative overflow-hidden rounded-3xl border border-cyan-400/15 bg-[linear-gradient(135deg,rgba(8,47,73,0.75),rgba(15,23,42,0.85))] p-6 sm:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 right-10 h-64 w-64 rounded-full bg-violet-500/15 blur-3xl"
        />

        <div className="relative">
          <div className="flex flex-wrap items-center gap-2 text-sm text-cyan-300">
            <PenSquare aria-hidden="true" className="h-4 w-4" />
            <span>{exercise.category}</span>
          </div>

          <h1 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
            {exercise.title}
          </h1>

          <p className="mt-4 text-sm leading-8 text-slate-300 sm:text-base">
            {exercise.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Sparkles aria-hidden="true" className="h-4 w-4 text-cyan-300" />
              <span>{exercise.difficulty}</span>
            </div>
            <span>{exercise.estimatedMinutes} دقیقه</span>
            <span>{exercise.expectedWordCount} کلمه هدف</span>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <Card className="p-6" dir="rtl">
            <h2 className="text-xl font-bold text-white">دستورالعمل</h2>
            <ul className="mt-4 space-y-3">
              {exercise.instructions.map((instruction, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-sm leading-7 text-slate-300"
                >
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-cyan-400" />
                  {instruction}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6" dir="rtl">
            <h2 className="text-xl font-bold text-white">هدف نوشتاری</h2>
            <p className="mt-4 text-sm leading-8 text-slate-400">
              {exercise.targetWritingGoal}
            </p>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6" dir="rtl">
            <h2 className="text-xl font-bold text-white">موضوع تمرین</h2>
            <p className="mt-4 text-sm leading-8 text-slate-400">
              {exercise.prompt}
            </p>
          </Card>

          <Card className="p-6" dir="rtl">
            <h2 className="text-xl font-bold text-white">اطلاعات تکمیلی</h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-400">سطح دشواری</span>
                <span className="font-semibold text-white">
                  {exercise.difficulty}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-400">زمان پیشنهادی</span>
                <span className="font-semibold text-white">
                  {exercise.estimatedMinutes} دقیقه
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-400">تعداد کلمات هدف</span>
                <span className="font-semibold text-white">
                  {exercise.expectedWordCount} کلمه
                </span>
              </div>
            </div>
          </Card>

          <Link
            href={`/writing/exercises/${exercise.id}/workspace`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/15"
          >
            شروع نوشتن
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
