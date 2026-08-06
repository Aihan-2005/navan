import { getWritingPromptById } from "../../../../../../features/writing/api/get-writing-prompts";
import { WritingWorkspace } from "../../../../../../features/writing/components/workspace/writing-workspace";

type WritingExerciseWorkspacePageProps = Readonly<{
  params: Promise<{ exerciseId: string }>;
}>;

export default async function WritingExerciseWorkspacePage({
  params,
}: WritingExerciseWorkspacePageProps) {
  const { exerciseId } = await params;
  const exercise = await getWritingPromptById(exerciseId);

  if (!exercise) {
    return (
      <main className="mx-auto w-full max-w-6xl space-y-6" dir="rtl">
        <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
          <h1 className="text-2xl font-bold text-white">تمرین یافت نشد</h1>
          <p className="mt-4 text-sm leading-8 text-slate-400">
            تمرین مورد نظر شما وجود ندارد.
          </p>
        </section>
      </main>
    );
  }

  return (
    <WritingWorkspace
      mode="exercise"
      exercise={exercise}
      draft={undefined}
    />
  );
}
