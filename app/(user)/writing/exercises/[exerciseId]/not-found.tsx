import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function WritingExerciseNotFound() {
  return (
    <main className="mx-auto w-full max-w-6xl space-y-6" dir="rtl">
      <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
        <h1 className="text-2xl font-bold text-white">تمرین یافت نشد</h1>
        <p className="mt-4 text-sm leading-8 text-slate-400">
          تمرین مورد نظر شما وجود ندارد یا حذف شده است.
        </p>
        <Link
          href="/writing"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/15"
        >
          بازگشت به صفحه نوشتن
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
}
