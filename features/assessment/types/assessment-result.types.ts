import type { z } from "zod";

import type {
  assessmentCategoryScoreSchema,
  assessmentRecommendedActionSchema,
  assessmentResultInsightSchema,
  assessmentResultSchema,
  assessmentScoreSummarySchema,
  assessmentSkillScoreSchema,
} from "../schemas/assessment-result.schema";

export type AssessmentCategoryScore =
  z.infer<
    typeof assessmentCategoryScoreSchema
  >;

export type AssessmentSkillScore =
  z.infer<
    typeof assessmentSkillScoreSchema
  >;

export type AssessmentScoreSummary =
  z.infer<
    typeof assessmentScoreSummarySchema
  >;

export type AssessmentResultInsight =
  z.infer<
    typeof assessmentResultInsightSchema
  >;

export type AssessmentRecommendedAction =
  z.infer<
    typeof assessmentRecommendedActionSchema
  >;

export type AssessmentResult =
  z.infer<
    typeof assessmentResultSchema
  >;