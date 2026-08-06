function Skeleton({
  className,
}: {
  className: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`
        animate-pulse rounded-2xl
        bg-white/[0.06]
        ${className}
      `}
    />
  );
}

export default function WritingLoading() {
  return (
    <main
      className="mx-auto w-full max-w-7xl space-y-6"
      aria-label="در حال بارگذاری بخش نوشتاری"
      aria-busy="true"
    >
      <Skeleton className="h-72 w-full rounded-3xl" />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
      </section>

      <section>
        <Skeleton className="h-16 w-72" />

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <Skeleton className="h-[26rem]" />
          <Skeleton className="h-[26rem]" />
          <Skeleton className="h-[26rem]" />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-12">
        <Skeleton className="h-72 lg:col-span-7" />
        <Skeleton className="h-72 lg:col-span-5" />
      </section>

      <section className="grid gap-6 lg:grid-cols-12">
        <Skeleton className="h-80 lg:col-span-8" />
        <Skeleton className="h-80 lg:col-span-4" />
      </section>
    </main>
  );
}