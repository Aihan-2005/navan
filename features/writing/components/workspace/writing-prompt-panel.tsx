"use client";

import { BookOpenText, Lightbulb, Sparkles } from "lucide-react";

import { Card } from "../../../../components/ui/card";

type WritingPromptPanelProps = Readonly<{
  title: string;
  description: string;
  prompt: string;
  tips: readonly string[];
  modeLabel: string;
  instructions: readonly string[];
  writingGoal: string;
  targetWordCount: number;
  category: string;
  difficulty: string;
  estimatedMinutes: number;
}>;

export function WritingPromptPanel({
  title,
  description,
  prompt,
  tips,
  modeLabel,
  instructions,
  writingGoal,
  targetWordCount,
  category,
  difficulty,
  estimatedMinutes,
}: WritingPromptPanelProps) {
  return (
    <Card className="p-6" dir="rtl">
      <div className="flex items-center gap-2 text-sm text-violet-300">
        <BookOpenText aria-hidden="true" className="h-4 w-4" />
        {modeLabel}
      </div>

      <h2 className="mt-4 text-xl font-bold text-white">{title}</h2>
      <p className="mt-3 text-sm leading-8 text-slate-400">{description}</p>

      <div className="mt-6 rounded-2xl border border-cyan-400/15 bg-cyan-400/10 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-cyan-200">
          <Sparkles aria-hidden="true" className="h-4 w-4" />
          پرامپت اصلی
        </div>
        <p className="mt-3 text-sm leading-8 text-slate-200">{prompt}</p>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-white/8 bg-white/3 p-4">
          <p className="text-sm font-semibold text-white">هدف نوشتن</p>
          <p className="mt-2 text-sm leading-7 text-slate-400">{writingGoal}</p>
        </div>

        <div className="rounded-2xl border border-white/8 bg-white/3 p-4">
          <p className="text-sm font-semibold text-white">اطلاعات تمرین</p>
          <p className="mt-2 text-sm leading-7 text-slate-400">
            {category} • {difficulty} • حدود {estimatedMinutes} دقیقه
          </p>
          <p className="mt-2 text-sm text-cyan-200">حدود {targetWordCount} کلمه</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/8 bg-white/3 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Lightbulb aria-hidden="true" className="h-4 w-4 text-cyan-300" />
          راهنمایی‌های تمرین
        </div>

        <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-400">
          {instructions.map((instruction) => (
            <li key={instruction} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
              <span>{instruction}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 rounded-2xl border border-white/8 bg-white/3 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Lightbulb aria-hidden="true" className="h-4 w-4 text-cyan-300" />
          نکته‌های کاربردی
        </div>
        <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-400">
          {tips.map((tip) => (
            <li key={tip} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}