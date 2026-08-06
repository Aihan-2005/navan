import type { WritingAnalysisIssue } from "../../types/writing.types";

type WritingIssueCardProps = Readonly<{
  issue: WritingAnalysisIssue;
}>;

export function WritingIssueCard({ issue }: WritingIssueCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="font-semibold text-white">{issue.title}</p>
        <span className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-2.5 py-1 text-[11px] font-semibold text-cyan-200">
          {issue.severity}
        </span>
      </div>
      <p className="mt-2 text-sm leading-7 text-slate-400">{issue.description}</p>
      <p className="mt-2 text-sm text-cyan-200">{issue.suggestion}</p>
    </div>
  );
}
