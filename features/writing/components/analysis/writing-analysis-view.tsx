import Link from "next/link";
import type { RecentWriting } from "../../types/writing.types";
import { AnalysisScoreOverview } from "./analysis-score-overview";
import { WritingIssueList } from "./writing-issue-list";
import { RepetitionAnalysis } from "./repetition-analysis";
import { VocabularyUpgrades } from "./vocabulary-upgrades";
import { ImprovedVersionPanel } from "./improved-version-panel";
import { WritingActionPlan } from "./writing-action-plan";

type WritingAnalysisViewProps = Readonly<{
  submission: RecentWriting;
}>;

export function WritingAnalysisView({ submission }: WritingAnalysisViewProps) {
  const analysis = submission.analysis;

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6" dir="rtl">
      <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
        <p className="text-sm text-cyan-300">جزئیات نوشته</p>
        <h1 className="mt-2 text-2xl font-bold text-white">
          {submission.title}
        </h1>
        <p className="mt-4 text-sm leading-8 text-slate-400">
          {submission.excerpt}
        </p>
      </section>

      <AnalysisScoreOverview analysis={analysis} date={submission.date} />

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <WritingIssueList analysis={analysis} />

        <div className="space-y-6">
          <RepetitionAnalysis analysis={analysis} />
          <VocabularyUpgrades analysis={analysis} />
          <ImprovedVersionPanel analysis={analysis} />
          <WritingActionPlan analysis={analysis} />
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/writing/history"
          className="inline-flex items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/15"
        >
          بازگشت به تاریخچه
        </Link>
        <Link
          href="/writing"
          className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </main>
  );
}
