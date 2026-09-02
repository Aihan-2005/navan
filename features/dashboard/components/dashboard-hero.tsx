export function DashboardHero() {
  return (
    <section
      dir="rtl"
      className="
      flex min-h-[192px] items-center justify-between
      rounded-2xl p-8
      bg-gradient-to-l from-[#14B8A6] to-[#E6FFFA]
      shadow-[0_8px_10px_-6px_rgba(0,0,0,.1)]
      "
    >
      <div>
        <span className="rounded-full bg-white/60 px-3 py-1 text-xs text-[#004D40]">
          برنامه اختصاصی برای نازی
        </span>
        <h1 className="mt-4 text-xl font-bold text-[#004D40]">
          سلام نازی! خوش اومدی
        </h1>
        <p className="mt-2 text-sm text-[#004D40]/80">
          امروز روی تقویت مهارت مکالمه تمرکز می‌کنیم.
        </p>
      </div>

      <button className="rounded-lg bg-[#F97316] px-8 py-3 text-white">
        شروع جلسه امروز
      </button>
    </section>
  );
}
