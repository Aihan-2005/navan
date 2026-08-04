import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#041121] text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
          AI Language Learning Assistant
        </div>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
          دستیار هوشمند یادگیری زبان
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
          تمرین مکالمه، نوشتار، شنیدار و آمادگی آزمون با بازخورد هوشمند و مسیر
          یادگیری شخصی‌سازی‌شده.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/login"
            className="rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-400"
          >
            ورود به حساب
          </Link>

          <Link
            href="/register"
            className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            ساخت حساب جدید
          </Link>
        </div>
      </section>
    </main>
  );
}