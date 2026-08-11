import Link from "next/link";

import { getWritingSubmission } from "../../../../../features/writing/api/get-writing-submission";
import { WritingAnalysisView } from "../../../../../features/writing/components/analysis/writing-analysis-view";

type WritingSubmissionPageProps = Readonly<{
  params: Promise<{ submissionId: string }>;
}>;

export default async function WritingSubmissionPage({
  params,
}: WritingSubmissionPageProps) {
  const { submissionId } = await params;
  const submission = await getWritingSubmission(submissionId);

  if (!submission) {
    return (
      <main className="mx-auto w-full max-w-6xl space-y-6" dir="rtl">
        <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
          <h1 className="text-2xl font-bold text-white">نوشته یافت نشد</h1>
          <p className="mt-4 text-sm leading-8 text-slate-400">
            نوشته مورد نظر شما وجود ندارد.
          </p>
          <Link
            href="/writing/history"
            className="mt-6 inline-flex items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/15"
          >
            بازگشت به تاریخچه
          </Link>
        </section>
      </main>
    );
  }

  return <WritingAnalysisView submission={submission} />;
}

