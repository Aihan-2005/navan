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

export default function ReadingUploadLoading() {
  return (
    <main
      aria-busy="true"
      aria-label="در حال آماده‌سازی صفحه آپلود Reading"
      style={{
        fontFamily:
          "var(--font-vazirmatn)",
      }}
      className="
        mx-auto
        w-full max-w-[936px]
        pb-8
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
            w-36
          "
        />

        <Skeleton
          className="
            mt-3
            h-6
            w-full
            max-w-[520px]
          "
        />
      </header>

      <section
        className="
          mt-6
          rounded-2xlborder
          border-[#BCC9C6]/40
          bg-white
          p-8
        "
      >
        <div
          className="
            flex
            min-h-[260px]
            flex-col
            items-center
            justify-center
            rounded-2xl
            border-2
            border-dashed
            border-[#BCC9C6]
            bg-[#F7F9FB]
          "
        >
          <Skeleton
            className="
              h-16
              w-16
              rounded-full
            "
          />

          <Skeleton
            className="
              mt-5
              h-7
              w-44
            "
          />

          <Skeleton
            className="
              mt-3
              h-5
              w-56
            "
          />

          <Skeleton
            className="
              mt-5
              h-9
              w-28
            "
          />
        </div>
      </section>

      <section
        className="
          mt-6
          rounded-2xl
          borderborder-[#BCC9C6]/40
          bg-white
          p-6
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <Skeleton
            className="
              h-10
              w-10
              rounded-xl
            "
          />

          <div>
            <Skeleton
              className="
                h-5
                w-40
              "
            />

            <Skeleton
              className="
                mt-2
                h-4
                w-64
              "
            />
          </div>
        </div>

        <div
          className="
            mt-6
            grid
            gap-4
            md:grid-cols-2
          "
        >
          <Skeleton
            className="
              h-11
              w-full
         md:col-span-2
            "
          /><Skeleton
            className="
              h-11
              w-full
            "
          />

          <Skeleton
            className="
              h-11
              w-full
            "
          />

          <Skeleton
            className="
              h-44
              w-full
            "
          />

          <Skeleton
            className="
              h-44
              w-full
            "
          />
        </div>
      </section>
    </main>
  );}