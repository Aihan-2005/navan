"use client";

import Link from "next/link";
import { ArrowRight, PenSquare, Sparkles, Target, Clock, FileText } from "lucide-react";

import { Card } from "../../../../components/ui/card";
import { WritingWorkspace } from "../workspace/writing-workspace";
import type { WritingExercise } from "../../types/writing.types";

type ExerciseWritingViewProps = Readonly<{
  exercise: WritingExercise;
}>;

export function ExerciseWritingView({ exercise }: ExerciseWritingViewProps) {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-6" dir="rtl">
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
            <div className="flex items-center gap-2">
              <Clock aria-hidden="true" className="h-4 w-4 text-cyan-300" />
              <span>{exercise.estimatedMinutes} دقیقه</span>
            </div>
            <div className="flex items-center gap-2">
              <Target aria-hidden="true" className="h-4 w-4 text-cyan-300" />
              <span>{exercise.expectedWordCount} کلمه هدف</span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">
        <div className="space-y-6">
          <Card className="p-6" dir="rtl">
            <div className="flex items-center gap-2 text-sm text-cyan-300">
              <FileText aria-hidden="true" className="h-4 w-4" />
              دستورالعمل
            </div>
            <h2 className="mt-4 text-xl font-bold text-white">راهنمای تمرین</h2>
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
            <div className="flex items-center gap-2 text-sm text-cyan-300">
              <Target aria-hidden="true" className="h-4 w-4" />
              هدف نوشتاری
            </div>
            <h2 className="mt-4 text-xl font-bold text-white">هدف این تمرین</h2>
            <p className="mt-4 text-sm leading-8 text-slate-400">
              {exercise.targetWritingGoal}
            </p>
          </Card>

          <Card className="p-6" dir="rtl">
            <div className="flex items-center gap-2 text-sm text-cyan-300">
              <PenSquare aria-hidden="true" className="h-4 w-4" />
              موضوع تمرین
            </div>
            <h2 className="mt-4 text-xl font-bold text-white">موضوع تمرین</h2>
            <p className="mt-4 text-sm leading-8 text-slate-400">
              {exercise.prompt}
            </p>
          </Card>

          <Card className="p-6" dir="rtl">
            <div className="flex items-center gap-2 text-sm text-cyan-300">
              <Sparkles aria-hidden="true" className="h-4 w-4" />
              اطلاعات تکمیلی
            </div>
            <h2 className="mt-4 text-xl font-bold text-white">اطلاعات تمرین</h2>
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
