export type WritingOverviewStats = Readonly<{
  totalWritings: number;
  weeklyWords: number;
  averageScore: number;
  currentStreak: number;
}>;

export type WritingDraft = Readonly<{
  id: string;
  title: string;
  updatedAt: string;
  excerpt: string;
  wordCount: number;
}>;

export type WritingExercise = Readonly<{
  id: string;
  title: string;
  description: string;
  difficulty: "مبتدی" | "متوسط" | "پیشرفته";
  estimatedMinutes: number;
  category: string;
  isFeatured?: boolean;
}>;

export type RecentWriting = Readonly<{
  id: string;
  title: string;
  date: string;
  score: number;
  feedback: string;
}>;

export type WritingWeakPoint = Readonly<{
  id: string;
  title: string;
  description: string;
  severity: "کم" | "متوسط" | "زیاد";
}>;
export type WritingOverviewData = Readonly<{
  stats: WritingOverviewStats;
  currentDraft: WritingDraft;
  recommendedExercise: WritingExercise;
  exercises: readonly WritingExercise[];
  recentWritings: readonly RecentWriting[];
  weakPoints: readonly WritingWeakPoint[];
}>;
