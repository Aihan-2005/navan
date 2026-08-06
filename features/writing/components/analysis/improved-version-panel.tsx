import type { WritingAnalysisResult } from "../../types/writing.types";

type ImprovedVersionPanelProps = Readonly<{
  analysis: WritingAnalysisResult;
}>;

export function ImprovedVersionPanel({ analysis }: ImprovedVersionPanelProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
      <h2 className="text-xl font-bold text-white">نسخه‌ی بازنویسی‌شده</h2>
      <p className="mt-4 text-sm leading-8 text-slate-400">
        {analysis.rewrittenVersion}
      </p>
    </div>
  );
}
