"use client";

import { RotateCcw, Save } from "lucide-react";

import { Card } from "../../../../components/ui/card";

type WritingToolbarProps = Readonly<{
  onSaveNow: () => void;
  onClear: () => void;
  saveStatus: "idle" | "saving" | "saved";
}>;

export function WritingToolbar({
  onSaveNow,
  onClear,
  saveStatus,
}: WritingToolbarProps) {
  return (
    <Card
      className="flex flex-wrap items-center justify-between gap-3 p-4"
      dir="rtl"
    >
      <div className="text-sm text-slate-400">
        وضعیت ذخیره: <span className="text-white">{saveStatus}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onSaveNow}
          className="inline-flex items-center gap-2 rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-2.5 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/15"
        >
          <Save aria-hidden="true" className="h-4 w-4" />
          ذخیره‌ی سریع
        </button>

        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
        >
          <RotateCcw aria-hidden="true" className="h-4 w-4" />
          پاک کردن
        </button>
      </div>
    </Card>
  );
}
