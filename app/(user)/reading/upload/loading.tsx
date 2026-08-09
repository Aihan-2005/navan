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

export default function ReadingUploadLoading() {
  return (
    <main
      aria-busy="true"
      aria-label="در حال آماده‌سازی صفحه آپلود Reading"
      className="
        mx-auto w-full
        max-w-6xl space-y-6
      "
    >
      <section
        className="
          relative overflow-hidden
          rounded-3xl border
          border-cyan-400/15
          bg-white/[0.035]
          p-6 sm:p-8
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -left-24 -top-24
            h-64 w-64
            rounded-full
            bg-cyan-500/10
            blur-3xl
          "
        />

        <div className="relative">
          <Skeleton
            className="
              h-5 w-36
            "
          />

          <Skeleton
            className="
              mt-5 h-10
              w-full max-w-xl
            "
          />

          <div
            className="
              mt-5 space-y-2
            "
          >
            <Skeleton
              className="
                h-4 w-full
                max-w-3xl
              "
            />

            <Skeleton
              className="
                h-4 w-4/5
                max-w-2xl
              "
            />
          </div>

          <div
            className="
              mt-5 flex
              flex-wrap gap-2
            "
          >
            {Array.from({
              length: 6,
            }).map((_, index) => (
              <Skeleton
                key={index}
                className="
                  h-6 w-16
                  rounded-full
                "
              />
            ))}
          </div>
        </div>
      </section>

      <div
        className="
          grid gap-6
          lg:grid-cols-12
        "
      >
        <div
          className="
            rounded-2xl border
            border-white/[0.07]
            bg-white/[0.03]
            p-5 sm:p-6
            lg:col-span-7
          "
        >
          <div
            className="
              rounded-2xl border-2
              border-dashed
              border-white/[0.07]
              p-10
            "
          >
            <Skeleton
              className="
                mx-auto h-16 w-16
                rounded-2xl
              "
            />

            <Skeleton
              className="
                mx-auto mt-5
                h-5 w-44
              "
            />

            <Skeleton
              className="
                mx-auto mt-3
                h-4 w-56
              "
            />

            <Skeleton
              className="
                mx-auto mt-5
                h-3 w-52
              "
            />
          </div>
        </div>

        <div
          className="
            rounded-2xl border
            border-white/[0.07]
            bg-white/[0.03]
            p-5 sm:p-6
            lg:col-span-5
          "
        >
          <Skeleton
            className="
              h-6 w-52
            "
          />

          <div
            className="
              mt-6 space-y-5
            "
          >
            {Array.from({
              length: 4,
            }).map((_, index) => (
              <div
                key={index}
                className="
                  flex items-start
                  gap-3
                "
              >
                <Skeleton
                  className="
                    h-8 w-8
                    shrink-0
                  "
                />

                <div
                  className="flex-1"
                >
                  <Skeleton
                    className="
                      h-4 w-32
                    "
                  />

                  <Skeleton
                    className="
                      mt-2 h-3
                      w-full
                    "
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section
        className="
          rounded-2xl border
          border-white/[0.07]
          bg-white/[0.025]
          p-5 sm:p-6
        "
      >
        <Skeleton
          className="
            h-6 w-40
          "
        />

        <div
          className="
            mt-6 grid gap-4
            md:grid-cols-2
          "
        >
          <Skeleton className="h-11 w-full" />

          <Skeleton className="h-11 w-full" />

          <Skeleton className="h-24 w-full" />

          <Skeleton className="h-24 w-full" />
        </div>
      </section>

      <span className="sr-only">
        صفحه آپلود Reading در حال بارگذاری است.
      </span>
    </main>
  );
}