import { writingOverviewMock } from "../mocks/writing-overview.mock";
import type { RecentWriting, WritingExercise } from "../types/writing.types";

export type WritingHistoryItem = Readonly<{
  id: string;
  title: string;
  date: string;
  score: number;
  feedback: string;
  excerpt: string;
  mode: "free" | "exercise" | "draft";
  analysis: {
    overallScore: number;
    grammar: { label: string; score: number; detail: string };
    vocabulary: { label: string; score: number; detail: string };
    coherence: { label: string; score: number; detail: string };
    clarity: { label: string; score: number; detail: string };
    tone: { label: string; score: number; detail: string };
    highlightedMistakes: readonly string[];
    issues: readonly Array<{
      id: string;
      title: string;
      description: string;
      severity: "کم" | "متوسط" | "زیاد";
      suggestion: string;
    }>;
    repeatedWords: readonly string[];
    betterVocabulary: readonly string[];
    rewrittenVersion: string;
    nextPractice: string;
  };
  exercise?: WritingExercise;
}>;

export async function getWritingHistory(): Promise<readonly WritingHistoryItem[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  const recentWritings = writingOverviewMock.recentWritings;
  const exercises = writingOverviewMock.exercises;

  // Map recent writings to include exercise information where applicable
  return recentWritings.map((writing) => {
    // If the writing is from an exercise, attach the exercise data
    if (writing.mode === "exercise") {
      // For demo purposes, assign the first exercise as related
      // In production, this would come from the actual relationship in the data
      const relatedExercise = exercises[0];
      return {
        ...writing,
        exercise: relatedExercise,
      };
    }

    return writing;
  });
}
