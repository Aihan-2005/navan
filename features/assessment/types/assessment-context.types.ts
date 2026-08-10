import type { z } from "zod";

import type {
  assessmentLearnerContextSchema,
  assessmentLearnerSkillSignalSchema,
  assessmentReviewSignalSchema,
} from "../schemas/assessment-context.schema";

export type AssessmentLearnerSkillSignal =
  z.infer<
    typeof assessmentLearnerSkillSignalSchema
  >;

export type AssessmentReviewSignal =
  z.infer<
    typeof assessmentReviewSignalSchema
  >;

export type AssessmentLearnerContext =
  z.infer<
    typeof assessmentLearnerContextSchema
  >;