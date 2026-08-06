"use client";

import { Card } from "../../../../components/ui/card";

type WritingEditorProps = Readonly<{
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}>;

export function WritingEditor({
  value,
  onChange,
  placeholder,
}: WritingEditorProps) {
  return (
    <Card className="p-4 sm:p-5" dir="rtl">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">فضای نوشتن</h3>
        <span className="text-sm text-slate-500">نویسنده‌ی متن خودت</span>
      </div>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="min-h-[360px] w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-4 text-sm leading-8 text-slate-100 outline-none transition focus:border-cyan-400/35 focus:bg-slate-950"
      />
    </Card>
  );
}
