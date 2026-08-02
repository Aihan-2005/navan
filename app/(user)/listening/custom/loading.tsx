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

export default function CustomListeningLoading() {
  return (
    <main
      className="mx-auto w-full max-w-6xl space-y-6"
      aria-label="در حال بارگذاری محتوای شخصی"
      aria-busy="true"
    >
      <Skeleton className="h-72 rounded-3xl" />

      <Skeleton className="h-16" />

      <Skeleton className="h-[42rem]" />
    </main>
  );
}