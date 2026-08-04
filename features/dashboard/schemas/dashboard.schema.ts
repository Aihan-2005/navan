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

export const activityStatusSchema = z.enum([
  "pending",
  "in_progress",
  "completed",
  "skipped",
]);

export const insightTypeSchema = z.enum([
  "weakness",
  "recommendation",
  "achievement",
  "warning",
  "motivation",
]);

export const dashboardLanguageSchema = z.object({
  code: z.string().trim().min(2).max(10),
  name: z.string().trim().min(1),
});

export const dashboardUserSchema = z.object({
  id: z.string().trim().min(1),
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
  activityId: z.string().trim().min(1),
  title: z.string().trim().min(1),
  description: z.string().trim().min(1).nullable(),

  skill: skillTypeSchema,

  progressPercent: z.number().min(0).max(100),
  estimatedMinutesRemaining: z.number().int().nonnegative(),

  lastActivityAt: z.string().datetime(),
  href: z.string().trim().min(1),
});

export const dailyTaskSchema = z.object({
  id: z.string().trim().min(1),
  title: z.string().trim().min(1),
  description: z.string().trim().min(1).nullable(),

  skill: skillTypeSchema,
  status: activityStatusSchema,

  estimatedMinutes: z.number().int().positive(),
  xpReward: z.number().int().nonnegative(),

  href: z.string().trim().min(1).nullable(),
});

export const dailyPlanSchema = z.object({
  date: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Daily plan date must use YYYY-MM-DD format.",
    ),

  completionPercent: z.number().min(0).max(100),
  completedTasks: z.number().int().nonnegative(),
  totalTasks: z.number().int().nonnegative(),
  estimatedRemainingMinutes: z.number().int().nonnegative(),

  tasks: z.array(dailyTaskSchema),
});

export const skillProgressSchema = z.object({
  skill: skillTypeSchema,

  score: z.number().min(0).max(100),
  previousScore: z.number().min(0).max(100).nullable(),

  cefrLevel: cefrLevelSchema,

  completedActivities: z.number().int().nonnegative(),
  totalPracticeMinutes: z.number().int().nonnegative(),
});

export const reviewQueueSchema = z.object({
  totalItems: z.number().int().nonnegative(),

  vocabularyCount: z.number().int().nonnegative(),
  grammarCount: z.number().int().nonnegative(),
  mistakeCount: z.number().int().nonnegative(),

  estimatedMinutes: z.number().int().nonnegative(),

  href: z.string().trim().min(1).nullable(),
});

export const aiInsightSchema = z.object({
  id: z.string().trim().min(1),

  type: insightTypeSchema,
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),

  relatedSkill: skillTypeSchema.nullable(),

  actionLabel: z.string().trim().min(1).nullable(),
  actionHref: z.string().trim().min(1).nullable(),

  createdAt: z.string().datetime(),
});

export const recentActivitySchema = z.object({
  id: z.string().trim().min(1),
  title: z.string().trim().min(1),

  skill: skillTypeSchema,
  status: activityStatusSchema,

  score: z.number().min(0).max(100).nullable(),
  durationMinutes: z.number().int().nonnegative(),

  occurredAt: z.string().datetime(),

  href: z.string().trim().min(1).nullable(),
});

const EMPTY_DAILY_PLAN = {
  date: "1970-01-01",
  completionPercent: 0,
  completedTasks: 0,
  totalTasks: 0,
  estimatedRemainingMinutes: 0,
  tasks: [],
} satisfies z.output<typeof dailyPlanSchema>;

const EMPTY_REVIEW_QUEUE = {
  totalItems: 0,
  vocabularyCount: 0,
  grammarCount: 0,
  mistakeCount: 0,
  estimatedMinutes: 0,
  href: null,
} satisfies z.output<typeof reviewQueueSchema>;

export const dashboardOverviewSchema = z.object({
  user: dashboardUserSchema,
  summary: dashboardSummarySchema,

  continueLearning: continueLearningSchema
    .nullable()
    .default(null),

  dailyPlan: dailyPlanSchema.default(
    EMPTY_DAILY_PLAN,
  ),

  skillProgress: z
    .array(skillProgressSchema)
    .default([]),

  reviewQueue: reviewQueueSchema.default(
    EMPTY_REVIEW_QUEUE,
  ),

  primaryInsight: aiInsightSchema
    .nullable()
    .default(null),

  recentActivities: z
    .array(recentActivitySchema)
    .default([]),
});