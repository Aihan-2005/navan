import Link from "next/link";

export default function WritingNewPage() {
  return (
    <main
      className="mx-auto flex min-h-[60vh] w-full max-w-5xl flex-col items-center justify-center rounded-3xl border border-white/10 bg-slate-950/60 px-6 py-12 text-center"
      dir="rtl"
    >
      <h1 className="text-2xl font-bold text-white">نوشتن آزاد</h1>
      <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-400">
        این صفحه در آینده برای شروع نوشته‌های آزاد و تمرین‌های نوشتاری جدید
        آماده خواهد شد.
      </p>
      <Link
        href="/writing"
        className="mt-6 inline-flex items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/15"
      >
        بازگشت به صفحه نوشتن
      </Link>
    </main>
  );
}
