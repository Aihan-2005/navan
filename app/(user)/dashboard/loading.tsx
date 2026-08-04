function Skeleton({
  className,
}: {
  className: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-2xl bg-white/[0.06] ${className}`}
    />
  );
}

export default function DashboardLoading() {
  return (
    <main
      className="mx-auto w-full max-w-7xl space-y-6"
      aria-busy="true"
      aria-label="در حال بارگذاری داشبورد"
    >
      <Skeleton className="h-48 w-full" />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
      </section>

      <section className="grid gap-6 lg:grid-cols-12">
        <Skeleton className="h-72 lg:col-span-8" />
        <Skeleton className="h-72 lg:col-span-4" />
      </section>

      <section className="grid gap-6 lg:grid-cols-12">
        <Skeleton className="h-[32rem] lg:col-span-8" />
        <Skeleton className="h-[32rem] lg:col-span-4" />
      </section>

      <section className="grid gap-6 lg:grid-cols-12">
        <Skeleton className="h-[30rem] lg:col-span-8" />
        <Skeleton className="h-[30rem] lg:col-span-4" />
      </section>

      <section className="grid gap-6 lg:grid-cols-12">
        <Skeleton className="h-80 lg:col-span-8" />

        <div className="space-y-6 lg:col-span-4">
          <Skeleton className="h-64" />
          <Skeleton className="h-96" />
        </div>
      </section>
    </main>
  );
}