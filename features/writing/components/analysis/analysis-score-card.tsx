import type { WritingAnalysisMetric } from "../../types/writing.types";

type AnalysisScoreCardProps = Readonly<{
  metric: WritingAnalysisMetric;
}>;

export function AnalysisScoreCard({ metric }: AnalysisScoreCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-sm text-slate-400">{metric.label}</p>
      <p className="mt-2 text-2xl font-bold text-white">{metric.score}٪</p>
      <p className="mt-2 text-sm leading-7 text-slate-500">{metric.detail}</p>
    </div>
  );
}
