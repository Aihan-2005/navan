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

export default function SpeakingLoading() {
  return (
    <main
      className="mx-auto w-full max-w-7xl space-y-6"
      aria-label="در حال بارگذاری تمرین‌های مکالمه"
      aria-busy="true"
    >
      <Skeleton className="h-72 w-full rounded-3xl" />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
      </section>

      <div className="flex justify-between gap-4">
        <Skeleton className="h-16 w-64" />
        <Skeleton className="h-12 w-96" />
      </div>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <Skeleton className="h-96" />
        <Skeleton className="h-96" />
        <Skeleton className="h-96" />
        <Skeleton className="h-96" />
        <Skeleton className="h-96" />
        <Skeleton className="h-96" />
      </section>
    </main>
  );
}