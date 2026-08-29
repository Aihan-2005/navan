import type { z } from "zod";

import type {
  dailyPracticeOverviewSchema,
  dailyPracticeRecommendationSchema,
  dailyPracticeSummarySchema,
  dailyPracticeTaskKindSchema,
  dailyPracticeTaskSchema,
  dailyPracticeTaskStatusSchema,
} from "../schemas/daily-practice.schema";

export type DailyPracticeTaskKind = z.infer<
  typeof dailyPracticeTaskKindSchema
>;

export type DailyPracticeTaskStatus = z.infer<
  typeof dailyPracticeTaskStatusSchema
>;

export type DailyPracticeSummary = z.infer<
  typeof dailyPracticeSummarySchema
>;

export type DailyPracticeTask = z.infer<
  typeof dailyPracticeTaskSchema
>;

export type DailyPracticeRecommendation = z.infer<
  typeof dailyPracticeRecommendationSchema
>;

export type DailyPracticeOverview = z.output<
  typeof dailyPracticeOverviewSchema
>;