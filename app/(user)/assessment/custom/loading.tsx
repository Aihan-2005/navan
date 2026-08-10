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
        "bg-white/[0.055]",
        className,
      ].join(" ")}
    />
  );
}

export default function CustomAssessmentLoading() {
  return (
    <main
      aria-busy="true"
      aria-label="در حال آماده‌سازی تنظیمات آزمون"
      className="
        mx-auto w-full
        max-w-6xl space-y-6
      "
    >
      <section
        className="
          rounded-3xl border
          border-white/[0.07]
          bg-white/[0.03]
          p-6 sm:p-8
        "
      >
        <Skeleton className="h-5 w-40" />

        <Skeleton
          className="
            mt-5 h-10
            w-full max-w-xl
          "
        />

        <Skeleton
          className="
            mt-4 h-4
            w-full max-w-2xl
          "
        />

        <Skeleton
          className="
            mt-2 h-4
            w-4/5 max-w-xl
          "
        />
      </section>

      <div
        className="
          grid gap-6
          lg:grid-cols-12
        "
      >
        <Skeleton
          className="
            h-52
            lg:col-span-8
          "
        />

        <Skeleton
          className="
            h-52
            lg:col-span-4
          "
        />
      </div>

      <Skeleton className="h-80" />

      <Skeleton className="h-72" />

      <Skeleton className="h-52" />

      <Skeleton className="h-72" />
    </main>
  );
}