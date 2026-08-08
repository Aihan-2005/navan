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

export default function ListeningAttemptLoading() {
  return (
    <main
      aria-busy="true"
      aria-label="در حال آماده‌سازی تحلیل تمرین شنیداری"
      className="
        mx-auto w-full
        max-w-7xl space-y-6
      "
    >
      <Skeleton
        className="
          h-5 w-36
        "
      />

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
          className="
            flex flex-col gap-6
            lg:flex-row
            lg:items-end
            lg:justify-between
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
                  h-7 w-28
                  rounded-full
                "
              />

              <Skeleton
                className="
                  h-7 w-24
                  rounded-full
                "
              />
            </div>

            <Skeleton
              className="
                mt-5 h-4 w-32
              "
            />

            <Skeleton
              className="
                mt-4 h-10
                w-full max-w-xl
              "
            />

            <Skeleton
              className="
                mt-5 h-4 w-44
              "
            />
          </div>

          <div>
            <Skeleton
              className="
                h-4 w-20
              "
            />

            <Skeleton
              className="
                mt-2 h-14 w-28
              "
            />
          </div>
        </div>
      </section>

      <section
        className="
          grid gap-4
          sm:grid-cols-2
          xl:grid-cols-4
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
              p-5
            "
          >
            <Skeleton
              className="
                h-10 w-10
              "
            />

            <Skeleton
              className="
                mt-5 h-4 w-24
              "
            />

            <Skeleton
              className="
                mt-3 h-9 w-20
              "
            />

            <Skeleton
              className="
                mt-4 h-1.5
                w-full
                rounded-full
              "
            />
          </div>
        ))}
      </section>

      <section
        className="
          grid gap-6
          xl:grid-cols-12
        "
      >
        <div
          className="
            space-y-6
            xl:col-span-8
          "
        >
          <div
            className="
              rounded-2xl border
              border-white/[0.07]
              bg-white/[0.03]
            "
          >
            <div
              className="
                border-b
                border-white/[0.06]
                p-5 sm:p-6
              "
            >
              <div
                className="
                  flex items-center gap-3
                "
              >
                <Skeleton className="h-10 w-10" />

                <div>
                  <Skeleton className="h-5 w-36" />

                  <Skeleton
                    className="
                      mt-2 h-3 w-48
                    "
                  />
                </div>
              </div>
            </div>

            <div
              className="
                space-y-3
                p-5 sm:p-6
              "
            >
              {Array.from({
                length: 4,
              }).map((_, index) => (
                <div
                  key={index}
                  className="
                    rounded-2xl border
                    border-white/[0.06]
                    bg-white/[0.025]
                    p-4
                  "
                >
                  <Skeleton
                    className="
                      h-4 w-20
                    "
                  />

                  <Skeleton
                    className="
                      mt-4 h-4 w-full
                    "
                  />

                  <Skeleton
                    className="
                      mt-2 h-4 w-4/5
                    "
                  />
                </div>
              ))}
            </div>
          </div>

          <Skeleton
            className="
              h-72 w-full
              rounded-2xl
            "
          />
        </div>

        <aside
          className="
            space-y-6
            xl:col-span-4
          "
        >
          <Skeleton
            className="
              h-56 w-full
              rounded-2xl
            "
          />

          <Skeleton
            className="
              h-64 w-full
              rounded-2xl
            "
          />

          <Skeleton
            className="
              h-64 w-full
              rounded-2xl
            "
          />
        </aside>
      </section>

      <span className="sr-only">
        تحلیل تمرین شنیداری در حال بارگذاری است.
      </span>
    </main>
  );
}