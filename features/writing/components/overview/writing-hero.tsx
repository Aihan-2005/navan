import Link from "next/link";
import { BookOpenText, PenTool, Sparkles } from "lucide-react";

export function WritingHero() {
  return (
    <section
      className="
        relative overflow-hidden rounded-3xl
        border border-cyan-400/15
        bg-[linear-gradient(135deg,rgba(8,47,73,0.75),rgba(15,23,42,0.85))]
        px-6 py-8 shadow-2xl
        sm:px-8 sm:py-10
      "
      dir="rtl"
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -left-24 -top-24
          h-72 w-72 rounded-full
          bg-cyan-500/20 blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -bottom-28 right-12
          h-72 w-72 rounded-full
          bg-violet-500/15 blur-3xl
        "
      />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-sm text-cyan-300">
            <Sparkles aria-hidden="true" className="h-4 w-4" />
            مربی هوشمند نوشتن
          </div>

          <h1 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
            از ایده تا متن حرفه‌ای
            <span className="text-cyan-300"> با تمرین‌های هدفمند</span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-300 sm:text-base">
            در اینجا می‌توانی متن‌های خودت را بنویسی، بازخورد بگیری و مهارت‌های
            نوشتاری‌ات را در مسیر رشد واقعی تقویت کنی.
          </p>
        </div>

        <Link
          href="/writing/new"
          aria-label="رفتن به صفحه نوشتن آزاد"
          className="group flex h-32 w-32 shrink-0 items-center justify-center self-center rounded-full border border-cyan-300/20 bg-cyan-400/10 shadow-[0_0_60px_rgba(34,211,238,0.18)] transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-cyan-300/15"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cyan-300 text-slate-950 transition duration-300 group-hover:scale-105">
            <PenTool aria-hidden="true" className="h-9 w-9" />
          </div>
        </Link>
      </div>
    </section>
  );
}
