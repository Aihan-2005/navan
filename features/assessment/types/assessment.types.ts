import type { z } from "zod";

import type {
  assessmentAdaptiveConfigSchema,
  assessmentDefinitionSchema,
  assessmentModeSchema,
  assessmentSectionSchema,
  assessmentStatusSchema,
  assessmentTypeSchema,
} from "../schemas/assessment.schema";

export type AssessmentType =
  z.infer<
    typeof assessmentTypeSchema
  >;

export type AssessmentMode =
  z.infer<
    typeof assessmentModeSchema
  >;

export type AssessmentStatus =
  z.infer<
    typeof assessmentStatusSchema
  >;

export type AssessmentAdaptiveConfig =
  z.infer<
    typeof assessmentAdaptiveConfigSchema
  >;

export type AssessmentSection =
  z.infer<
    typeof assessmentSectionSchema
  >;

export type AssessmentDefinition =
  z.infer<
    typeof assessmentDefinitionSchema
  >;