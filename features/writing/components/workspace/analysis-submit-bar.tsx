"use client";

import { ArrowLeft, Send } from "lucide-react";

import { Card } from "../../../../components/ui/card";

type AnalysisSubmitBarProps = Readonly<{
  canSubmit: boolean;
  onSubmit: () => void;
  onClear: () => void;
  analysisReady: boolean;
  wordCount: number;
  targetWords: number;
  requiredWords: number;
}>;

export function AnalysisSubmitBar({
  canSubmit,
  onSubmit,
  onClear,
  analysisReady,
  wordCount,
  targetWords,
  requiredWords,
}: AnalysisSubmitBarProps) {
  return (
    <Card className="p-4" dir="rtl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-slate-400">
          {analysisReady
            ? "تحلیل آماده است و متن شما در پیش‌نویس ذخیره شده است."
            : `${wordCount} کلمه نوشته شده است، برای ارسال به تحلیل حداقل ${requiredWords} کلمه لازم است.`}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onSubmit}
            disabled={!canSubmit}
            className="inline-flex items-center gap-2 rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-2.5 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/15 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send aria-hidden="true" className="h-4 w-4" />
            ارسال برای تحلیل
          </button>

          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            پاک کردن متن
          </button>
        </div>
      </div>
    </Card>
  );
}
