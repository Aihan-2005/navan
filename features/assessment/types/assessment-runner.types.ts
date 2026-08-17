import type {
  z,
} from "zod";

import type {
  assessmentQuestionReviewSchema,
  assessmentRunnerAnswerEntrySchema,
  assessmentRunnerDraftSchema,
  assessmentRunnerSectionSchema,
  assessmentRunnerSessionSchema,
  assessmentSubmissionResultSchema,
  assessmentSubmissionSchema,
} from "../schemas/assessment-runner.schema";

export type AssessmentRunnerSection =
  z.infer<
    typeof assessmentRunnerSectionSchema
  >;

export type AssessmentRunnerSession =
  z.infer<
    typeof assessmentRunnerSessionSchema
  >;

export type AssessmentRunnerAnswerEntry =
  z.infer<
    typeof assessmentRunnerAnswerEntrySchema
  >;

export type AssessmentRunnerDraft =
  z.infer<
    typeof assessmentRunnerDraftSchema
  >;

export type AssessmentSubmission =
  z.infer<
    typeof assessmentSubmissionSchema
  >;

export type AssessmentQuestionReview =
  z.infer<
    typeof assessmentQuestionReviewSchema
  >;

export type AssessmentSubmissionResult =
  z.infer<
    typeof assessmentSubmissionResultSchema
  >;