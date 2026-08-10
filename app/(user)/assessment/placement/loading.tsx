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

export default function PlacementLoading() {
  return (
    <main
      aria-busy="true"
      className="
        mx-auto w-full
        max-w-5xl space-y-6
      "
    >
      <Skeleton className="h-5 w-40" />

      <section
        className="
          rounded-3xl border
          border-white/[0.07]
          bg-white/[0.03]
          p-6 sm:p-8
        "
      >
        <Skeleton className="h-5 w-36" />

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

        <div
          className="
            mt-6 grid gap-3
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {Array.from({
            length: 4,
          }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-28"
            />
          ))}
        </div>
      </section>

      <Skeleton
        className="
          h-72 w-full
          rounded-2xl
        "
      />

      <Skeleton
        className="
          h-40 w-full
          rounded-2xl
        "
      />
    </main>
  );
}