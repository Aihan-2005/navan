import type {
  z,
} from "zod";

import {
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


export type SkillType =
  z.infer<typeof skillTypeSchema>;

export type ActivityStatus =
  z.infer<typeof activityStatusSchema>;

export type InsightType =
  z.infer<typeof insightTypeSchema>;

export type CefrLevel =
  z.infer<typeof cefrLevelSchema>;

export type DashboardLanguage =
  z.infer<typeof dashboardLanguageSchema>;

export type DashboardUser =
  z.infer<typeof dashboardUserSchema>;

export type DashboardSummary =
  z.infer<typeof dashboardSummarySchema>;

export type ContinueLearning =
  z.infer<typeof continueLearningSchema>;

export type DailyTask =
  z.infer<typeof dailyTaskSchema>;

export type DailyPlan =
  z.infer<typeof dailyPlanSchema>;

export type SkillProgress =
  z.infer<typeof skillProgressSchema>;

export type ReviewQueue =
  z.infer<typeof reviewQueueSchema>;

export type AIInsight =
  z.infer<typeof aiInsightSchema>;

export type RecentActivity =
  z.infer<typeof recentActivitySchema>;

export type DashboardOverview =
  z.infer<typeof dashboardOverviewSchema>;

  
  

export type ContinueLearningData = {
  title: string;
  subtitle: string;
  remainingMinutes: number;
  href?: string;
};

export type WeeklyGoalId =
  | "words"
  | "listening"
  | "speaking";

export type WeeklyGoalItem = {
  id: WeeklyGoalId;
  label: string;
  current: number;
  target: number;
  displayValue?: string;
};

export type SkillId =
  | "listening"
  | "speaking"
  | "writing"
  | "vocabulary"
  | "reading";

export type SkillProgressItem = {
  id: SkillId;
  title: string;
  score: number;
  status: string;
};

export type DailyPlanStatus =
  | ActivityStatus
  | "available"
  | "locked";

export type DailyPlanIcon =
  | "vocabulary"
  | "listening"
  | "dialogue"
  | "grammar"
  | "writing"
  | "speaking";

export type DailyPlanItem = {
  id: string;
  title: string;
  duration: string;
  reward: string;
  status: DailyPlanStatus;
  icon: DailyPlanIcon;
  href?: string;
};

export type RecentActivityTone =
  | "teal"
  | "slate";