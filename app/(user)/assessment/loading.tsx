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

export default function AssessmentLoading() {
  return (
    <main
      aria-busy="true"
      aria-label="در حال بارگذاری مرکز ارزیابی"
      className="
        mx-auto w-full
        max-w-7xl space-y-8
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
            w-full max-w-lg
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

      <Skeleton
        className="
          h-80 w-full
          rounded-3xl
        "
      />

      <section>
        <Skeleton className="h-7 w-48" />

        <div
          className="
            mt-5 grid gap-4
            sm:grid-cols-2
            xl:grid-cols-3
          "
        >
          {Array.from({
            length: 6,
          }).map((_, index) => (
            <Skeleton
              key={index}
              className="
                h-48 w-full
                rounded-2xl
              "
            />
          ))}
        </div>
      </section>

      <section>
        <Skeleton className="h-7 w-44" />

        <div
          className="
            mt-5 grid gap-4
            md:grid-cols-2
            xl:grid-cols-4
          "
        >
          {Array.from({
            length: 4,
          }).map((_, index) => (
            <Skeleton
              key={index}
              className="
                h-64 w-full
                rounded-2xl
              "
            />
          ))}
        </div>
      </section>
    </main>
  );
}