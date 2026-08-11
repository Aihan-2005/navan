import { z } from "zod";

export const writingOverviewStatsSchema = z.object({
  totalWritings: z.number(),
  weeklyWords: z.number(),
  averageScore: z.number(),
  currentStreak: z.number(),
});

export const writingDraftSchema = z.object({
  id: z.string(),
  title: z.string(),
  updatedAt: z.string(),
  excerpt: z.string(),
  wordCount: z.number(),
});

export const writingExerciseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  difficulty: z.enum(["مبتدی", "متوسط", "پیشرفته"]),
  estimatedMinutes: z.number(),
  category: z.string(),
  isFeatured: z.boolean().optional(),
  prompt: z.string(),
  instructions: z.array(z.string()),
  targetWritingGoal: z.string(),
  expectedWordCount: z.number(),
});

export const writingAnalysisMetricSchema = z.object({
  label: z.string(),
  score: z.number().min(0).max(100),
  detail: z.string(),
});

export const writingAnalysisIssueSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  severity: z.enum(["کم", "متوسط", "زیاد"]),
  suggestion: z.string(),
});

export const writingAnalysisResultSchema = z.object({
  overallScore: z.number(),
  grammar: writingAnalysisMetricSchema,
  vocabulary: writingAnalysisMetricSchema,
  coherence: writingAnalysisMetricSchema,
  clarity: writingAnalysisMetricSchema,
  tone: writingAnalysisMetricSchema,
  highlightedMistakes: z.array(z.string()),
  issues: z.array(writingAnalysisIssueSchema),
  repeatedWords: z.array(z.string()),
  betterVocabulary: z.array(z.string()),
  rewrittenVersion: z.string(),
  nextPractice: z.string(),
});

export const recentWritingSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string(),
  score: z.number(),
  feedback: z.string(),
  excerpt: z.string(),
  mode: z.enum(["free", "exercise", "draft"]),
  analysis: writingAnalysisResultSchema,
});

export const writingWeakPointSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  severity: z.enum(["کم", "متوسط", "زیاد"]),
});

export const writingOverviewSchema = z.object({
  stats: writingOverviewStatsSchema,
  currentDraft: writingDraftSchema,
  recommendedExercise: writingExerciseSchema,
  exercises: z.array(writingExerciseSchema),
  recentWritings: z.array(recentWritingSchema),
  weakPoints: z.array(writingWeakPointSchema),
});