import {
  WritingModeCard,
} from "./writing-mode-card";

import type {
  WritingExercise,
} from "../../types/writing.types";

type WritingExercisesGridProps =
  Readonly<{
    exercises?:
      readonly WritingExercise[];
    className?: string;
  }>;

export function WritingExercisesGrid({
  exercises = [],
  className,
}: WritingExercisesGridProps) {
  if (exercises.length === 0) {
    return null;
  }

  return (
    <div
      className={[
        "grid gap-6 md:grid-cols-2 xl:grid-cols-3",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      dir="rtl"
    >
      {exercises.map(
        (exercise) => (
          <WritingModeCard
            key={exercise.id}
            exercise={exercise}
          />
        ),
      )}
    </div>
  );
}