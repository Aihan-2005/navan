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

export default function ListeningLibraryLoading() {
  return (
    <main
      aria-busy="true"
      aria-label="در حال بارگذاری کتابخانه Listening"
      className="
        mx-auto w-full
        max-w-7xl space-y-8
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
              h-12 w-12
              rounded-2xl
            "
          />

          <Skeleton
            className="
              mt-5 h-4 w-36
            "
          />

          <Skeleton
            className="
              mt-4 h-10
              w-full max-w-md
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
        </div>
      </section>

      <section>
        <div
          className="
            flex items-center
            gap-3
          "
        >
          <Skeleton
            className="
              h-5 w-5
            "
          />

          <Skeleton
            className="
              h-6 w-40
            "
          />
        </div>

        <div
          className="
            mt-5 grid gap-5
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {Array.from({
            length: 6,
          }).map((_, index) => (
            <div
              key={index}
              className="
                overflow-hidden
                rounded-2xl border
                border-white/[0.07]
                bg-white/[0.03]
              "
            >
              <Skeleton
                className="
                  h-40 w-full
                  rounded-none
                "
              />

              <div className="p-5">
                <div
                  className="
                    flex gap-2
                  "
                >
                  <Skeleton
                    className="
                      h-6 w-16
                      rounded-full
                    "
                  />

                  <Skeleton
                    className="
                      h-6 w-20
                      rounded-full
                    "
                  />
                </div>

                <Skeleton
                  className="
                    mt-4 h-6
                    w-4/5
                  "
                />

                <div
                  className="
                    mt-4 space-y-2
                  "
                >
                  <Skeleton className="h-4 w-full" />

                  <Skeleton className="h-4 w-3/4" />
                </div>

                <div
                  className="
                    mt-5 flex
                    items-center
                    justify-between
                  "
                >
                  <Skeleton
                    className="
                      h-4 w-20
                    "
                  />

                  <Skeleton
                    className="
                      h-10 w-28
                    "
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <span className="sr-only">
        کتابخانه Listening در حال بارگذاری است.
      </span>
    </main>
  );
}