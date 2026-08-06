export default function WritingExerciseLoading() {
  return (
    <main className="mx-auto w-full max-w-6xl space-y-6" dir="rtl">
      <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
        <div className="animate-pulse">
          <div className="h-8 w-3/4 rounded-lg bg-white/10" />
          <div className="mt-4 h-4 w-1/2 rounded-lg bg-white/10" />
          <div className="mt-2 h-4 w-1/3 rounded-lg bg-white/10" />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
            <div className="animate-pulse">
              <div className="h-6 w-1/3 rounded-lg bg-white/10" />
              <div className="mt-4 space-y-3">
                <div className="h-4 w-full rounded-lg bg-white/10" />
                <div className="h-4 w-5/6 rounded-lg bg-white/10" />
                <div className="h-4 w-4/6 rounded-lg bg-white/10" />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
            <div className="animate-pulse">
              <div className="h-6 w-1/3 rounded-lg bg-white/10" />
              <div className="mt-4 h-4 w-full rounded-lg bg-white/10" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
            <div className="animate-pulse">
              <div className="h-6 w-1/3 rounded-lg bg-white/10" />
              <div className="mt-4 h-4 w-full rounded-lg bg-white/10" />
              <div className="mt-2 h-4 w-5/6 rounded-lg bg-white/10" />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
            <div className="animate-pulse">
              <div className="h-6 w-1/3 rounded-lg bg-white/10" />
              <div className="mt-4 space-y-3">
                <div className="h-4 w-full rounded-lg bg-white/10" />
                <div className="h-4 w-full rounded-lg bg-white/10" />
                <div className="h-4 w-full rounded-lg bg-white/10" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
