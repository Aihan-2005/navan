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

export default function ListeningPracticeLoading() {
  return (
    <main
      className="mx-auto w-full max-w-7xl space-y-6"
      aria-label="در حال بارگذاری تمرین شنیداری"
      aria-busy="true"
    >
      <Skeleton className="h-8 w-44" />

      <Skeleton className="h-64 w-full rounded-3xl" />

      <section className="grid gap-6 xl:grid-cols-12">
        <div className="space-y-6 xl:col-span-4">
          <Skeleton className="h-56" />
          <Skeleton className="h-80" />
          <Skeleton className="h-48" />
        </div>

        <div className="space-y-6 xl:col-span-8">
          <Skeleton className="h-80" />
          <Skeleton className="h-[38rem]" />
          <Skeleton className="h-48" />
        </div>
      </section>
    </main>
  );
}