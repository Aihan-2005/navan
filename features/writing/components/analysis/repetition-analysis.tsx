import type { WritingAnalysisResult } from "../../types/writing.types";

type RepetitionAnalysisProps = Readonly<{
  analysis: WritingAnalysisResult;
}>;

export function RepetitionAnalysis({ analysis }: RepetitionAnalysisProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
      <h2 className="text-xl font-bold text-white">کلمات تکراری</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {analysis.repeatedWords.map((word) => (
          <span key={word} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
