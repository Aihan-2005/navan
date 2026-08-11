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

export default function WritingSubmissionLoading() {
  return (
    <main
      dir="rtl"
      aria-busy="true"
      aria-label="در حال بارگذاری تحلیل نوشته"
      className="
        mx-auto w-full
        max-w-6xl space-y-6
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
        <Skeleton className="h-4 w-28" />

        <Skeleton
          className="
            mt-4 h-8
            w-full max-w-lg
          "
        />

        <div className="mt-5 space-y-3">
          <Skeleton className="h-4 w-full" />

          <Skeleton className="h-4 w-11/12" />

          <Skeleton className="h-4 w-4/5" />
        </div>
      </section>

      <section
        aria-label="در حال بارگذاری امتیازها"
        className="
          grid gap-4
          sm:grid-cols-2
          lg:grid-cols-4
        "
      >
        {Array.from({
          length: 4,
        }).map((_, index) => (
          <div
            key={index}
            className="
              rounded-2xl border
              border-white/10
              bg-slate-950/60
              p-5
            "
          >
            <Skeleton className="h-4 w-24" />

            <Skeleton className="mt-4 h-9 w-20" />

            <Skeleton className="mt-4 h-2 w-full rounded-full" />
          </div>
        ))}
      </section>

      <section
        className="
          grid gap-6
          lg:grid-cols-[1.1fr_0.9fr]
        "
      >
        <div
          className="
            rounded-3xl border
            border-white/10
            bg-slate-950/60
            p-6
          "
        >
          <Skeleton className="h-6 w-40" />

          <div className="mt-6 space-y-4">
            {Array.from({
              length: 5,
            }).map((_, index) => (
              <div
                key={index}
                className="
                  rounded-2xl border
                  border-white/[0.07]
                  bg-white/[0.02]
                  p-4
                "
              >
                <Skeleton className="h-4 w-32" />

                <Skeleton className="mt-3 h-4 w-full" />

                <Skeleton className="mt-2 h-4 w-4/5" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {Array.from({
            length: 4,
          }).map((_, index) => (
            <div
              key={index}
              className="
                rounded-3xl border
                border-white/10
                bg-slate-950/60
                p-6
              "
            >
              <Skeleton className="h-6 w-36" />

              <div className="mt-5 space-y-3">
                <Skeleton className="h-4 w-full" />

                <Skeleton className="h-4 w-5/6" />

                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Skeleton className="h-11 w-36 rounded-2xl" />

        <Skeleton className="h-11 w-40 rounded-2xl" />
      </div>

      <span className="sr-only">
        تحلیل نوشته در حال بارگذاری است.
      </span>
    </main>
  );
}