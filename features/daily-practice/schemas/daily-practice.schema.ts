import { z } from "zod";

export const dailyPracticeTaskKindSchema = z.enum([
  "vocabulary",
  "speaking",
  "grammar",
  "writing",
  "assessment",
]);

export const dailyPracticeTaskStatusSchema = z.enum([
  "pending",
  "in_progress",
  "completed",
]);

export const dailyPracticeSummarySchema = z.object({
  todayMinutes: z.number().int().nonnegative(),
  dailyGoalMinutes: z.number().int().positive(),
  completionPercent: z.number().min(0).max(100),
  completedTasks: z.number().int().nonnegative(),
  totalTasks: z.number().int().positive(),
  todayXp: z.number().int().nonnegative(),
  streakDays: z.number().int().nonnegative(),
});

export const dailyPracticeTaskSchema = z.object({
  id: z.string().trim().min(1),
  kind: dailyPracticeTaskKindSchema,
  title: z.string().trim().min(1),
  status: dailyPracticeTaskStatusSchema,
  durationMinutes: z.number().int().positive(),
  xpReward: z.number().int().nonnegative(),
  href: z.string().trim().min(1).nullable(),
});

export const dailyPracticeRecommendationSchema = z.object({
  id: z.string().trim().min(1),
  title: z.string().trim().min(1),
  descriptionBeforeHighlight: z.string().trim().min(1),
  highlightedSkill: z.string().trim().min(1),
  descriptionAfterHighlight: z.string().trim().min(1),
  actionLabel: z.string().trim().min(1),
  actionHref: z.string().trim().min(1),
});

export const dailyPracticeOverviewSchema = z.object({
  date: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Daily practice date must use YYYY-MM-DD format.",
    ),

  summary: dailyPracticeSummarySchema,
  tasks: z.array(dailyPracticeTaskSchema),
  recommendation: dailyPracticeRecommendationSchema.nullable(),
});