import type { WritingAnalysisResult } from "../../types/writing.types";

type VocabularyUpgradesProps = Readonly<{
  analysis: WritingAnalysisResult;
}>;

export function VocabularyUpgrades({ analysis }: VocabularyUpgradesProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
      <h2 className="text-xl font-bold text-white">پیشنهاد واژگان بهتر</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {analysis.betterVocabulary.map((word) => (
          <span key={word} className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200">
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
