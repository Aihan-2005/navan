function SkeletonBlock({
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

export default function ReadingSectionLoading() {
  return (
    <main
      aria-busy="true"
      aria-label="در حال آماده‌سازی فضای مطالعه"
      className="
        mx-auto w-full
        max-w-7xl
        space-y-6
      "
    >
      <section
        className="
          relative overflow-hidden
          rounded-3xl border
          border-white/[0.07]
          bg-white/[0.03]
          p-5 sm:p-7
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
          <div
            className="
              flex flex-col gap-5
              lg:flex-row
              lg:items-start
              lg:justify-between
            "
          >
            <div className="flex-1">
              <SkeletonBlock
                className="
                  h-10 w-36
                "
              />

              <div
                className="
                  mt-5 flex gap-2
                "
              >
                <SkeletonBlock
                  className="
                    h-7 w-20
                    rounded-full
                  "
                />

                <SkeletonBlock
                  className="
                    h-7 w-24
                    rounded-full
                  "
                />

                <SkeletonBlock
                  className="
                    h-7 w-16
                    rounded-full
                  "
                />
              </div>

              <SkeletonBlock
                className="
                  mt-5 h-4 w-48
                "
              />

              <SkeletonBlock
                className="
                  mt-4 h-10
                  w-full max-w-lg
                "
              />

              <div
                className="
                  mt-5 space-y-2
                "
              >
                <SkeletonBlock
                  className="
                    h-4 w-full
                    max-w-2xl
                  "
                />

                <SkeletonBlock
                  className="
                    h-4 w-4/5
                    max-w-xl
                  "
                />
              </div>

              <div
                className="
                  mt-5 flex gap-5
                "
              >
                <SkeletonBlock
                  className="h-4 w-20"
                />

                <SkeletonBlock
                  className="h-4 w-24"
                />

                <SkeletonBlock
                  className="h-4 w-16"
                />
              </div>
            </div>

            <div
              className="
                flex gap-2
              "
            >
              <SkeletonBlock
                className="
                  h-11 w-32
                "
              />

              <SkeletonBlock
                className="
                  h-11 w-40
                "
              />
            </div>
          </div>

          <div className="mt-8">
            <SkeletonBlock
              className="
                h-2 w-full
                rounded-full
              "
            />
          </div>
        </div>
      </section>

      <section
        className="
          rounded-2xl border
          border-white/[0.07]
          bg-white/[0.03]
          p-5
        "
      >
        <div
          className="
            flex flex-col gap-5
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          <div className="flex items-center gap-3">
            <SkeletonBlock
              className="
                h-11 w-11
              "
            />

            <div>
              <SkeletonBlock
                className="
                  h-4 w-24
                "
              />

              <SkeletonBlock
                className="
                  mt-2 h-3 w-44
                "
              />
            </div>
          </div>

          <div className="flex gap-2">
            <SkeletonBlock
              className="
                h-11 w-28
              "
            />

            <SkeletonBlock
              className="
                h-11 w-20
              "
            />

            <SkeletonBlock
              className="
                h-11 w-24
              "
            />
          </div>
        </div>
      </section>

      <div
        className="
          grid grid-cols-2
          gap-2 rounded-2xl
          border
          border-white/[0.07]
          bg-white/[0.025]
          p-2
          lg:grid-cols-4
        "
      >
        {Array.from({
          length: 4,
        }).map((_, index) => (
          <SkeletonBlock
            key={index}
            className="
              h-12 w-full
            "
          />
        ))}
      </div>

      <section
        className="
          overflow-hidden
          rounded-2xl border
          border-white/[0.07]
          bg-white/[0.03]
        "
      >
        <div
          className="
            border-b
            border-white/[0.06]
            p-6
          "
        >
          <div className="flex items-center gap-3">
            <SkeletonBlock
              className="
                h-10 w-10
              "
            />

            <div>
              <SkeletonBlock
                className="
                  h-4 w-24
                "
              />

              <SkeletonBlock
                className="
                  mt-2 h-3 w-52
                "
              />
            </div>
          </div>
        </div>

        {Array.from({
          length: 3,
        }).map((_, index) => (
          <div
            key={index}
            className="
              border-b
              border-white/[0.06]
              p-6 last:border-b-0
              sm:p-8
            "
          >
            <SkeletonBlock
              className="
                h-7 w-7
              "
            />

            <div
              className="
                mt-5 space-y-3
              "
            >
              <SkeletonBlock
                className="
                  h-5 w-full
                "
              />

              <SkeletonBlock
                className="
                  h-5 w-[94%]
                "
              />

              <SkeletonBlock
                className="
                  h-5 w-[82%]
                "
              />

              <SkeletonBlock
                className="
                  h-5 w-[65%]
                "
              />
            </div>

            <SkeletonBlock
              className="
                mt-6 h-24
                w-full
                rounded-2xl
              "
            />
          </div>
        ))}
      </section>

      <span className="sr-only">
        فضای مطالعه در حال بارگذاری است.
      </span>
    </main>
  );
}