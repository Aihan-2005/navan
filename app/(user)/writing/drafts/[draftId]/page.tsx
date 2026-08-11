import { writingOverviewMock } from "../../../../../features/writing";
import { WritingWorkspace } from "../../../../../features/writing/components/workspace/writing-workspace";

type WritingDraftPageProps = Readonly<{
  params: Promise<{ draftId: string }>;
}>;

export default async function WritingDraftPage({
  params,
}: WritingDraftPageProps) {
  const { draftId } = await params;
  const draft = writingOverviewMock.currentDraft.id === draftId
    ? writingOverviewMock.currentDraft
    : undefined;

  if (!draft) {
    return (
      <main className="mx-auto w-full max-w-6xl space-y-6" dir="rtl">
        <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
          <h1 className="text-2xl font-bold text-white">پیش‌نویس یافت نشد</h1>
          <p className="mt-4 text-sm leading-8 text-slate-400">
            پیش‌نویس مورد نظر شما وجود ندارد.
          </p>
        </section>
      </main>
    );
  }

  return (
    <WritingWorkspace
      mode="draft"
      exercise={undefined}
      draft={draft}
    />
  );
}
