import type { z } from "zod";

import type {
  assessmentMiniQuizStatusSchema,
  assessmentMiniQuizSummarySchema,
  assessmentOverviewSchema,
  assessmentPlacementSummarySchema,
} from "../schemas/assessment-overview.schema";

export type AssessmentMiniQuizStatus =
  z.infer<
    typeof assessmentMiniQuizStatusSchema
  >;

export type AssessmentPlacementSummary =
  z.infer<
    typeof assessmentPlacementSummarySchema
  >;

export type AssessmentMiniQuizSummary =
  z.infer<
    typeof assessmentMiniQuizSummarySchema
  >;

export type AssessmentOverview =
  z.infer<
    typeof assessmentOverviewSchema
  >;