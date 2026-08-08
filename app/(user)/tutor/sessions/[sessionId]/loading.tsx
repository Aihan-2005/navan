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

export default function TutorSessionLoading() {
  return (
    <main
      aria-busy="true"
      aria-label="در حال آماده‌سازی جلسه مدرس هوشمند"
      className="
        mx-auto w-full
        max-w-7xl space-y-6
      "
    >
      <Skeleton className="h-5 w-32" />

      <section
        className="
          rounded-3xl border
          border-white/[0.07]
          bg-white/[0.03]
          p-6 sm:p-8
        "
      >
        <div className="flex gap-2">
          <Skeleton
            className="
              h-7 w-20
              rounded-full
            "
          />

          <Skeleton
            className="
              h-7 w-28
              rounded-full
            "
          />
        </div>

        <Skeleton
          className="
            mt-6 h-4 w-32
          "
        />

        <Skeleton
          className="
            mt-4 h-10
            w-full max-w-xl
          "
        />

        <div
          className="
            mt-5 space-y-2
          "
        >
          <Skeleton className="h-4 w-full max-w-2xl" />
          <Skeleton className="h-4 w-4/5 max-w-xl" />
        </div>
      </section>

      <section
        className="
          grid gap-6
          xl:grid-cols-12
        "
      >
        <div className="xl:col-span-8">
          <div
            className="
              min-h-[500px]
              rounded-2xl border
              border-white/[0.07]
              bg-white/[0.03]
            "
          >
            <div
              className="
                flex items-center
                gap-3 border-b
                border-white/[0.06]
                p-5
              "
            >
              <Skeleton className="h-10 w-10" />

              <div>
                <Skeleton className="h-4 w-32" />
                <Skeleton className="mt-2 h-3 w-44" />
              </div>
            </div>

            <div
              className="
                flex min-h-[330px]
                items-center
                justify-center
                p-6
              "
            >
              <div
                className="
                  w-full max-w-md
                  space-y-3
                "
              >
                <Skeleton
                  className="
                    mx-auto h-16 w-16
                  "
                />

                <Skeleton
                  className="
                    mx-auto h-5 w-52
                  "
                />

                <Skeleton className="h-4 w-full" />

                <Skeleton
                  className="
                    mx-auto h-4 w-4/5
                  "
                />
              </div>
            </div>

            <div
              className="
                border-t
                border-white/[0.06]
                p-5
              "
            >
              <Skeleton className="h-16 w-full" />
            </div>
          </div>
        </div>

        <div
          className="
            space-y-5
            xl:col-span-4
          "
        >
          <Skeleton className="h-64 w-full rounded-2xl" />

          <Skeleton className="h-72 w-full rounded-2xl" />
        </div>
      </section>

      <span className="sr-only">
        جلسه Tutor در حال بارگذاری است.
      </span>
    </main>
  );
}