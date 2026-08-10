import type { z } from "zod";

import type {
  assessmentContextPreferencesSchema,
  assessmentCustomExperienceModeSchema,
  assessmentDifficultyProfileSchema,
  assessmentGenerationContextSummarySchema,
  assessmentGenerationRequestSchema,
  assessmentGenerationStatusSchema,
  assessmentLevelStrategySchema,
  createAssessmentGenerationRequestInputSchema,
  customAssessmentConfigurationSchema,
} from "../schemas/assessment-generation.schema";

export type AssessmentCustomExperienceMode =
  z.infer<
    typeof assessmentCustomExperienceModeSchema
  >;

export type AssessmentLevelStrategy =
  z.infer<
    typeof assessmentLevelStrategySchema
  >;

export type AssessmentDifficultyProfile =
  z.infer<
    typeof assessmentDifficultyProfileSchema
  >;

export type AssessmentGenerationStatus =
  z.infer<
    typeof assessmentGenerationStatusSchema
  >;

export type AssessmentContextPreferences =
  z.infer<
    typeof assessmentContextPreferencesSchema
  >;

export type CustomAssessmentConfiguration =
  z.infer<
    typeof customAssessmentConfigurationSchema
  >;

export type CreateAssessmentGenerationRequestInput =
  z.infer<
    typeof createAssessmentGenerationRequestInputSchema
  >;

export type AssessmentGenerationContextSummary =
  z.infer<
    typeof assessmentGenerationContextSummarySchema
  >;

export type AssessmentGenerationRequest =
  z.infer<
    typeof assessmentGenerationRequestSchema
  >;