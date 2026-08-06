import Link from "next/link";

import { getWritingHistory } from "../../../../features/writing/api/get-writing-history";

export default async function WritingHistoryPage() {
  const writings = await getWritingHistory();

  return (
    <main className="mx-auto w-full max-w-5xl space-y-6" dir="rtl">
      <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
        <h1 className="text-2xl font-bold text-white">تاریخچه نوشته‌ها</h1>
        <p className="mt-3 text-sm leading-8 text-slate-400">
          این بخش برای مشاهده‌ی نوشته‌های قبلی و بازگشت به آن‌ها در آینده آماده
          شده است.
        </p>
      </section>

      <section className="space-y-3">
        {writings.map((writing) => (
          <Link
            key={writing.id}
            href={`/writing/submissions/${writing.id}`}
            className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-slate-950/60 p-4 transition hover:bg-white/5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-semibold text-white">{writing.title}</p>
              <p className="mt-1 text-sm text-slate-500">{writing.date}</p>
            </div>
            <span className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-sm font-semibold text-cyan-200">
              امتیاز {writing.score}٪
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}
