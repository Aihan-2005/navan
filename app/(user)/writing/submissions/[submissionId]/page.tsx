import Link from "next/link";

import { getWritingSubmission } from "../../../../../features/writing/api/get-writing-submission";

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

      <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-slate-400">امتیاز نهایی</p>
            <p className="mt-2 text-3xl font-bold text-white">
              {analysis.overallScore}٪
            </p>
          </div>
          <div className="text-sm text-slate-400">
            تاریخ: {submission.date}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {[
            analysis.grammar,
            analysis.vocabulary,
            analysis.coherence,
            analysis.clarity,
            analysis.tone,
          ].map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <p className="text-sm text-slate-400">{metric.label}</p>
              <p className="mt-2 text-2xl font-bold text-white">{metric.score}٪</p>
              <p className="mt-2 text-sm leading-7 text-slate-500">{metric.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
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
              <div key={issue.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-white">{issue.title}</p>
                  <span className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-2.5 py-1 text-[11px] font-semibold text-cyan-200">
                    {issue.severity}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-400">{issue.description}</p>
                <p className="mt-2 text-sm text-cyan-200">{issue.suggestion}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
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

          <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
            <h2 className="text-xl font-bold text-white">نسخه‌ی بازنویسی‌شده</h2>
            <p className="mt-4 text-sm leading-8 text-slate-400">
              {analysis.rewrittenVersion}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
            <h2 className="text-xl font-bold text-white">تمرین بعدی</h2>
            <p className="mt-4 text-sm leading-8 text-slate-400">
              {analysis.nextPractice}
            </p>
          </div>
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