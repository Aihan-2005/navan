import { z } from "zod";

export const skillTypeSchema = z.enum([
  "speaking",
  "listening",
  "reading",
  "writing",
  "grammar",
  "vocabulary",
]);

export const cefrLevelSchema = z
  .enum(["A1", "A2", "B1", "B2", "C1", "C2"])
  .nullable();

export const dashboardLanguageSchema = z.object({
  code: z.string().trim().min(2).max(10),
  name: z.string().trim().min(1),
});

export const dashboardUserSchema = z.object({
  id: z.string().min(1),
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1).nullable(),
  avatarUrl: z.string().url().nullable(),

  targetLanguage: dashboardLanguageSchema,
  nativeLanguage: dashboardLanguageSchema,

  cefrLevel: cefrLevelSchema,
  learningGoal: z.string().trim().min(1).nullable(),
});

export const dashboardSummarySchema = z.object({
  streakDays: z.number().int().nonnegative(),

  todayCompletedMinutes: z.number().int().nonnegative(),
  dailyGoalMinutes: z.number().int().positive(),

  weeklyCompletedMinutes: z.number().int().nonnegative(),
  weeklyGoalMinutes: z.number().int().positive(),

  completedActivitiesThisWeek: z.number().int().nonnegative(),
});

export const continueLearningSchema = z.object({
  activityId: z.string().min(1),
  title: z.string().trim().min(1),
  description: z.string().trim().min(1).nullable(),

  skill: skillTypeSchema,

  progressPercent: z.number().min(0).max(100),
  estimatedMinutesRemaining: z.number().int().nonnegative(),

  lastActivityAt: z.string().datetime(),
  href: z.string().trim().min(1),
});

export const dashboardOverviewSchema = z.object({
  user: dashboardUserSchema,
  summary: dashboardSummarySchema,
  continueLearning: continueLearningSchema.nullable(),
});