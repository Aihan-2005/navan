import type { WritingAnalysisResult } from "../../types/writing.types";

type WritingActionPlanProps = Readonly<{
  analysis: WritingAnalysisResult;
}>;

export function WritingActionPlan({ analysis }: WritingActionPlanProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
      <h2 className="text-xl font-bold text-white">تمرین بعدی</h2>
      <p className="mt-4 text-sm leading-8 text-slate-400">
        {analysis.nextPractice}
      </p>
    </div>
  );
}
