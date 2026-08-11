function Skeleton({
  className = "",
}: Readonly<{
  className?: string;
}>) {
  return (
    <div
      aria-hidden="true"
      className={[
        "animate-pulse",
        "rounded-xl",
        "bg-white/[0.06]",
        className,
      ].join(" ")}
    />
  );
}

export default function WritingHistoryLoading() {
  return (
    <main
      dir="rtl"
      aria-busy="true"
      aria-label="در حال بارگذاری تاریخچه نوشته‌ها"
      className="
        mx-auto w-full
        max-w-5xl space-y-6
      "
    >
      <section
        className="
          rounded-3xl border
          border-white/10
          bg-slate-950/60
          p-6
        "
      >
        <Skeleton className="h-8 w-48" />

        <div className="mt-4 space-y-3">
          <Skeleton className="h-4 w-full max-w-3xl" />

          <Skeleton className="h-4 w-4/5 max-w-2xl" />
        </div>
      </section>

      <section
        aria-label="در حال بارگذاری نوشته‌های قبلی"
        className="space-y-3"
      >
        {Array.from({
          length: 5,
        }).map((_, index) => (
          <article
            key={index}
            className="
              flex flex-col gap-4
              rounded-2xl border
              border-white/10
              bg-slate-950/60
              p-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div className="min-w-0 flex-1">
              <Skeleton className="h-5 w-52 max-w-full" />

              <Skeleton className="mt-3 h-4 w-28" />
            </div>

            <Skeleton
              className="
                h-8 w-24
                shrink-0
                rounded-full
              "
            />
          </article>
        ))}
      </section>

      <span className="sr-only">
        تاریخچه نوشته‌ها در حال بارگذاری است.
      </span>
    </main>
  );
}