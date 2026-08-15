function Skeleton({
    className = "",
}: Readonly<{
    className?:
    string;
}>) {
    return (
        <div
            aria-hidden="true"
            className={[
                "animate-pulse",
                "rounded-xl",
                "bg-[#E7ECEE]",
                className,
            ].join(" ")}
        />
    );
}

export default function ReadingResourcesLoading() {
    return (
        <main
            dir="rtl"
            aria-busy="true"
            aria-label="در حال بارگذاری منابع Reading"
            style={{
                fontFamily:
                    "var(--font-vazirmatn)",
            }}
            className=" mx-auto
        w-full
        max-w-[936px]
        space-y-6
      "
        >
            <header
                className="
          min-h-[72px]
          pb-2
        "
            >
                <Skeleton
                    className="
            h-9
            w-28
          "
                />

                <Skeleton
                    className="
            mt-3
            h-6
            w-full
            max-w-[390px]
          "
                />
            </header>

            <section className="
          grid
          gap-4
          md:grid-cols-3
          md:gap-6
        "
            >
                {Array.from({
                    length: 3,
                }).map(
                    (
                        _,
                        index,
                    ) => (
                        <div
                            key={
                                index
                            }
                            className="
                flex
                min-h-[104px]
                items-center
                gap-4
                rounded-2xl
                border
                border-[#BCC9C6]/30
                bg-white
                p-6
              "
                        >
                            <Skeleton
                                className="
                  h-12
                  w-12
                  shrink-0
                  rounded-xl
                "
                            />

                            <div>
                                <Skeleton
                                    className="
                    h-3.5
                    w-20
                  "
                                />

                                <Skeleton
                                    className="
                    mt-2
                    h-9
                    w-16
                  "
                                />
                            </div>
                        </div>
                    ),
                )}
            </section>

            <section className="
          grid
          gap-6
          pt-4
          sm:grid-cols-2
          xl:grid-cols-3
        "
            >
                {Array.from({
                    length: 6,
                }).map(
                    (
                        _,
                        index,
                    ) => (
                        <div
                            key={
                                index
                            }
                            className="
                min-h-[298px]
                rounded-2xl
                border
                border-[#BCC9C6]/30
                bg-white
                p-6
              "
                        >
                            <div
                                className="flex
                  justify-between
                "
                            >
                                <Skeleton
                                    className="
                    h-6
                    w-20
                    rounded
                  "
                                />

                                <Skeleton
                                    className="
                    h-5
                    w-5
                  "
                                />
                            </div>

                            <Skeleton
                                className="
                  mt-5
                  h-7
                  w-4/5
                "
                            />

                            <Skeleton
                                className="
                  mt-2
                  h-7
                  w-2/3
                "
                            />

                            <Skeleton
                                className="
                  mt-5
                  h-5
                  w-32
                "
                            />

                            <div className="mt-10">
                                <Skeleton
                                    className="
                    h-3.5
                    w-full
                  "
                                />

                                <Skeleton
                                    className="
                    mt-3
                    h-2
                    w-full
                    rounded-full
                  "
                                />

                                <Skeleton
                                    className="
                    mt-4
                    h-9
                    w-full
                  "
                                />
                            </div>
                        </div>
                    ),
                )}
            </section> </main>
    );
}