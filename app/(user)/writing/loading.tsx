function Skeleton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`
        animate-pulse
        rounded-2xl
        bg-[#F1F5F9]
        ${className}
      `}
    />
  );
}

export default function WritingLoading() {
  return (
    <main
      dir="rtl"
      aria-label="در حال بارگذاری بخش نوشتاری"
      aria-busy="true"
      className="
        min-h-screen
        w-full
        bg-white
      "
    >
      <div
        className="
          mx-auto
          flex
          w-full
          max-w-[1000px]
          flex-col
          gap-[54px]
          px-4
          pb-8
          pt-5
          sm:px-5
          md:px-6
          lg:px-8
        "
      >
        {/* Hero */}
        <section className="mx-auto w-full max-w-[936px]">
          <Skeleton className="h-[256px] w-full rounded-2xl" />

          {/* Stats */}
          <div
            className="
              mt-6
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
              lg:grid-cols-4
              lg:gap-6
            "
          >
            <Skeleton className="h-[106px] rounded-[24px]" />
            <Skeleton className="h-[106px] rounded-[24px]" />
            <Skeleton className="h-[106px] rounded-[24px]" />
            <Skeleton className="h-[106px] rounded-[24px]" />
          </div>
        </section>

        {/* Continue section */}
        <section
          className="
            mx-auto
            grid
            w-full
            max-w-[928px]
            grid-cols-1
            gap-6
            lg:grid-cols-[minmax(0,610.667px)_minmax(0,293.333px)]
          "
        >
          <Skeleton className="h-[270px] rounded-[24px]" />
          <Skeleton className="h-[271px] rounded-[24px]" />
        </section>

        {/* Exercises */}
        <section className="mx-auto w-full max-w-[936px]">
          <div className="mb-6 space-y-2">
            <Skeleton className="h-11 w-[156px]" />
            <Skeleton className="h-7 w-full max-w-[561px]" />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <Skeleton className="h-[292px] lg:col-span-8" />
            <Skeleton className="h-[292px] lg:col-span-4" />

            <Skeleton className="h-[221px] lg:col-span-4" />
            <Skeleton className="h-[221px] lg:col-span-4" />
            <Skeleton className="h-[221px] lg:col-span-4" />
          </div>
        </section>

        {/* Dashboard */}
        <section className="mx-auto w-full max-w-[928px]">
          <div className="mb-6 space-y-2">
            <Skeleton className="h-9 w-[180px]" />
            <Skeleton className="h-6 w-[238px]" />
          </div>

          <div
            className="
              grid
              grid-cols-1
              gap-6
              lg:grid-cols-[minmax(0,531.333px)_minmax(0,372.667px)]
            "
          >
            <Skeleton className="h-[470px] rounded-[24px]" />
            <Skeleton className="h-[470px] rounded-[24px]" />
          </div>
        </section>
      </div>
    </main>
  );
}