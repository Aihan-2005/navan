import type { z } from "zod";

import type {
  cefrLevelSchema,
  continueLearningSchema,
  dashboardLanguageSchema,
  dashboardOverviewSchema,
  dashboardSummarySchema,
  dashboardUserSchema,
  skillTypeSchema,
} from "../schemas/dashboard.schema";

export type SkillType = z.infer<typeof skillTypeSchema>;

export type CefrLevel = z.infer<typeof cefrLevelSchema>;

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

export type DashboardOverview = z.infer<
  typeof dashboardOverviewSchema
>;