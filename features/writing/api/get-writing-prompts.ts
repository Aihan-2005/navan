import { writingOverviewMock } from "../mocks/writing-overview.mock";
import type { WritingExercise } from "../types/writing.types";

export async function getWritingPrompts(): Promise<readonly WritingExercise[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return writingOverviewMock.exercises;
}

export async function getWritingPromptById(
  id: string,
): Promise<WritingExercise | undefined> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return writingOverviewMock.exercises.find((exercise) => exercise.id === id);
}
