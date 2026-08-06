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
  targetWordCount?: number;
  progressPercent?: number;
}>;

export type WritingExercise = Readonly<{
  id: string;
  title: string;
  description: string;
  difficulty: "مبتدی" | "متوسط" | "پیشرفته";
  estimatedMinutes: number;
  category: string;
  isFeatured?: boolean;
  prompt: string;
  instructions: readonly string[];
  targetWritingGoal: string;
  expectedWordCount: number;
}>;

export type WritingAnalysisMetric = Readonly<{
  label: string;
  score: number;
  detail: string;
}>;

export type WritingAnalysisIssue = Readonly<{
  id: string;
  title: string;
  description: string;
  severity: "کم" | "متوسط" | "زیاد";
  suggestion: string;
}>;

export type WritingAnalysisResult = Readonly<{
  overallScore: number;
  grammar: WritingAnalysisMetric;
  vocabulary: WritingAnalysisMetric;
  coherence: WritingAnalysisMetric;
  clarity: WritingAnalysisMetric;
  tone: WritingAnalysisMetric;
  highlightedMistakes: readonly string[];
  issues: readonly WritingAnalysisIssue[];
  repeatedWords: readonly string[];
  betterVocabulary: readonly string[];
  rewrittenVersion: string;
  nextPractice: string;
}>;

export type RecentWriting = Readonly<{
  id: string;
  title: string;
  date: string;
  score: number;
  feedback: string;
  excerpt: string;
  mode: "free" | "exercise" | "draft";
  analysis: WritingAnalysisResult;
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

export type WritingOverview = WritingOverviewData;
