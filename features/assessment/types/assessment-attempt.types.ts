import type { z } from "zod";

import type {
  assessmentAdaptiveStateSchema,
  assessmentAnswerPayloadSchema,
  assessmentAnswerRecordSchema,
  assessmentAttemptSchema,
  assessmentAttemptStatusSchema,
  assessmentAttemptViewSchema,
  createAssessmentAttemptInputSchema,
  saveAssessmentAnswerInputSchema,
} from "../schemas/assessment-attempt.schema";

export type AssessmentAttemptStatus =
  z.infer<
    typeof assessmentAttemptStatusSchema
  >;

export type AssessmentAnswerPayload =
  z.infer<
    typeof assessmentAnswerPayloadSchema
  >;

export type AssessmentAnswerRecord =
  z.infer<
    typeof assessmentAnswerRecordSchema
  >;

export type AssessmentAdaptiveState =
  z.infer<
    typeof assessmentAdaptiveStateSchema
  >;

export type AssessmentAttempt =
  z.infer<
    typeof assessmentAttemptSchema
  >;

export type AssessmentAttemptView =
  z.infer<
    typeof assessmentAttemptViewSchema
  >;

export type CreateAssessmentAttemptInput =
  z.infer<
    typeof createAssessmentAttemptInputSchema
  >;

export type SaveAssessmentAnswerInput =
  z.infer<
    typeof saveAssessmentAnswerInputSchema
  >;