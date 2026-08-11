import type { WritingAnalysisResult } from "../../types/writing.types";
import { AnalysisScoreCard } from "./analysis-score-card";

type AnalysisScoreOverviewProps = Readonly<{
  analysis: WritingAnalysisResult;
  date: string;
}>;

export function AnalysisScoreOverview({
  analysis,
  date,
}: AnalysisScoreOverviewProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-slate-400">امتیاز نهایی</p>
          <p className="mt-2 text-3xl font-bold text-white">
            {analysis.overallScore}٪
          </p>
        </div>
        <div className="text-sm text-slate-400">
          تاریخ: {date}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <AnalysisScoreCard metric={analysis.grammar} />
        <AnalysisScoreCard metric={analysis.vocabulary} />
        <AnalysisScoreCard metric={analysis.coherence} />
        <AnalysisScoreCard metric={analysis.clarity} />
        <AnalysisScoreCard metric={analysis.tone} />
      </div>
    </section>
  );
}
