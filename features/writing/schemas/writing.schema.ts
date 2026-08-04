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
});

export const recentWritingSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string(),
  score: z.number(),
  feedback: z.string(),
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
