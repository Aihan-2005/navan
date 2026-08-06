import type { WritingAnalysisResult } from "../../types/writing.types";
import { WritingIssueCard } from "./writing-issue-card";

type WritingIssueListProps = Readonly<{
  analysis: WritingAnalysisResult;
}>;

export function WritingIssueList({ analysis }: WritingIssueListProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
      <h2 className="text-xl font-bold text-white">اشکالات برجسته</h2>
      <ul className="mt-4 space-y-3">
        {analysis.highlightedMistakes.map((item) => (
          <li key={item} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-slate-300">
            {item}
          </li>
        ))}
      </ul>

      <h2 className="mt-6 text-xl font-bold text-white">لیست مسائل</h2>
      <div className="mt-4 space-y-3">
        {analysis.issues.map((issue) => (
          <WritingIssueCard key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
}
