import type { z } from "zod";

import type {
  activityStatusSchema,
  aiInsightSchema,
  cefrLevelSchema,
  continueLearningSchema,
  dailyPlanSchema,
  dailyTaskSchema,
  dashboardLanguageSchema,
  dashboardOverviewSchema,
  dashboardSummarySchema,
  dashboardUserSchema,
  insightTypeSchema,
  recentActivitySchema,
  reviewQueueSchema,
  skillProgressSchema,
  skillTypeSchema,
} from "../schemas/dashboard.schema";

export type SkillType = z.infer<typeof skillTypeSchema>;

export type CefrLevel = z.infer<typeof cefrLevelSchema>;

export type ActivityStatus = z.infer<
  typeof activityStatusSchema
>;

export type InsightType = z.infer<
  typeof insightTypeSchema
>;

export type DashboardLanguage = z.infer<
  typeof dashboardLanguageSchema
>;

export type DashboardUser = z.infer<
  typeof dashboardUserSchema
>;

export type DashboardSummary = z.infer<
  typeof dashboardSummarySchema
>;

export type ContinueLearning = z.infer<
  typeof continueLearningSchema
>;

export type DailyTask = z.infer<
  typeof dailyTaskSchema
>;

export type DailyPlan = z.infer<
  typeof dailyPlanSchema
>;

export type SkillProgress = z.infer<
  typeof skillProgressSchema
>;

export type ReviewQueue = z.infer<
  typeof reviewQueueSchema
>;

export type AIInsight = z.infer<
  typeof aiInsightSchema
>;

export type RecentActivity = z.infer<
  typeof recentActivitySchema
>;

export type DashboardOverview = z.infer<
  typeof dashboardOverviewSchema
>;