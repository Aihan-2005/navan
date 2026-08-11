"use client";

import { Clock3, FileText, Sparkles } from "lucide-react";

import { Card } from "../../../../components/ui/card";

type LiveWritingStatsProps = Readonly<{
  wordCount: number;
  characterCount: number;
  targetWords: number;
  requiredWords: number;
}>;

export function LiveWritingStats({
  wordCount,
  characterCount,
  targetWords,
  requiredWords,
}: LiveWritingStatsProps) {
  return (
    <Card className="p-5" dir="rtl">
      <div className="flex items-center gap-2 text-sm text-cyan-300">
        <Sparkles aria-hidden="true" className="h-4 w-4" />
        آمار لحظه‌ای
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/8 bg-white/3 p-3">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <FileText aria-hidden="true" className="h-4 w-4" />
            کلمه
          </div>
          <p className="mt-2 text-xl font-bold text-white">{wordCount}</p>
        </div>

        <div className="rounded-2xl border border-white/8 bg-white/3 p-3">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <FileText aria-hidden="true" className="h-4 w-4" />
           کاراکتر ها
          </div>
          <p className="mt-2 text-xl font-bold text-white">{characterCount}</p>
        </div>

        <div className="rounded-2xl border border-white/8 bg-white/3 p-3">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Clock3 aria-hidden="true" className="h-4 w-4" />
            هدف
          </div>
          <p className="mt-2 text-xl font-bold text-white">{targetWords}</p>
          <p className="mt-1 text-xs text-slate-500">حداقل لازم: {requiredWords}</p>
        </div>
      </div>
    </Card>
  );
}