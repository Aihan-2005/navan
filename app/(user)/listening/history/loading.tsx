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

export default function ListeningHistoryLoading() {
  return (
    <main
      aria-busy="true"
      aria-label="در حال بارگذاری تاریخچه تمرین‌های شنیداری"
      className="
        mx-auto w-full
        max-w-6xl space-y-8
      "
    >
      <section
        className="
          relative overflow-hidden
          rounded-3xl border
          border-white/[0.08]
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
            bg-violet-500/10
            blur-3xl
          "
        />

        <div className="relative">
          <Skeleton
            className="
              h-12 w-12
              rounded-2xl
            "
          />

          <Skeleton
            className="
              mt-5 h-4 w-32
            "
          />

          <Skeleton
            className="
              mt-4 h-10
              w-full max-w-sm
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
                max-w-2xl
              "
            />

            <Skeleton
              className="
                h-4 w-4/5
                max-w-xl
              "
            />
          </div>
        </div>
      </section>

      <section
        className="
          space-y-4
        "
      >
        {Array.from({
          length: 4,
        }).map((_, index) => (
          <div
            key={index}
            className="
              rounded-2xl border
              border-white/[0.07]
              bg-white/[0.03]
              p-5 sm:p-6
            "
          >
            <div
              className="
                flex flex-col gap-5
                md:flex-row
                md:items-center
                md:justify-between
              "
            >
              <div className="flex-1">
                <div
                  className="
                    flex gap-2
                  "
                >
                  <Skeleton
                    className="
                      h-6 w-20
                      rounded-full
                    "
                  />

                  <Skeleton
                    className="
                      h-6 w-24
                      rounded-full
                    "
                  />
                </div>

                <Skeleton
                  className="
                    mt-4 h-6
                    w-full max-w-xs
                  "
                />

                <div
                  className="
                    mt-4 flex
                    flex-wrap gap-4
                  "
                >
                  <Skeleton
                    className="
                      h-4 w-20
                    "
                  />

                  <Skeleton
                    className="
                      h-4 w-24
                    "
                  />

                  <Skeleton
                    className="
                      h-4 w-28
                    "
                  />
                </div>
              </div>

              <Skeleton
                className="
                  h-11 w-full
                  md:w-36
                "
              />
            </div>
          </div>
        ))}
      </section>

      <span className="sr-only">
        تاریخچه تمرین‌های شنیداری در حال بارگذاری است.
      </span>
    </main>
  );
}