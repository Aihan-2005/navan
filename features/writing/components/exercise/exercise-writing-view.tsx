"use client";

import { Card } from "../../../../components/ui/card";
import { WritingWorkspace } from "../workspace/writing-workspace";
import type { WritingExercise } from "../../types/writing.types";

type ExerciseWritingViewProps = Readonly<{
  exercise: WritingExercise;
}>;

export function ExerciseWritingView({ exercise }: ExerciseWritingViewProps) {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-6" dir="rtl">
      <section className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">
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
        </div>

        <div>
          <WritingWorkspace
            mode="exercise"
            exercise={exercise}
            draft={undefined}
            showHeader={false}
          />
        </div>
      </section>
    </main>
  );
}
