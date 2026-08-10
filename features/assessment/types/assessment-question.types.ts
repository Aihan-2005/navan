import type { z } from "zod";

import type {
  assessmentCefrLevelSchema,
  assessmentDifficultySchema,
  assessmentOptionSchema,
  assessmentQuestionSchema,
  assessmentQuestionSourceSchema,
  assessmentQuestionTypeSchema,
  assessmentQuestionViewSchema,
  assessmentReadingPassageSchema,
  assessmentSkillSchema,
  assessmentSourceFeatureSchema,
  fillBlankQuestionSchema,
  listeningComprehensionQuestionSchema,
  multipleChoiceQuestionSchema,
  multipleSelectQuestionSchema,
  orderingQuestionSchema,
  readingComprehensionQuestionSchema,
  shortTextQuestionSchema,
  speakingResponseQuestionSchema,
} from "../schemas/assessment-question.schema";

export type AssessmentSkill =
  z.infer<
    typeof assessmentSkillSchema
  >;

export type AssessmentCefrLevel =
  z.infer<
    typeof assessmentCefrLevelSchema
  >;

export type AssessmentDifficulty =
  z.infer<
    typeof assessmentDifficultySchema
  >;

export type AssessmentQuestionType =
  z.infer<
    typeof assessmentQuestionTypeSchema
  >;

export type AssessmentSourceFeature =
  z.infer<
    typeof assessmentSourceFeatureSchema
  >;

export type AssessmentQuestionSource =
  z.infer<
    typeof assessmentQuestionSourceSchema
  >;

export type AssessmentOption =
  z.infer<
    typeof assessmentOptionSchema
  >;

export type AssessmentReadingPassage =
  z.infer<
    typeof assessmentReadingPassageSchema
  >;

export type MultipleChoiceQuestion =
  z.infer<
    typeof multipleChoiceQuestionSchema
  >;

export type MultipleSelectQuestion =
  z.infer<
    typeof multipleSelectQuestionSchema
  >;

export type FillBlankQuestion =
  z.infer<
    typeof fillBlankQuestionSchema
  >;

export type OrderingQuestion =
  z.infer<
    typeof orderingQuestionSchema
  >;

export type ReadingComprehensionQuestion =
  z.infer<
    typeof readingComprehensionQuestionSchema
  >;

export type ListeningComprehensionQuestion =
  z.infer<
    typeof listeningComprehensionQuestionSchema
  >;

export type ShortTextQuestion =
  z.infer<
    typeof shortTextQuestionSchema
  >;

export type SpeakingResponseQuestion =
  z.infer<
    typeof speakingResponseQuestionSchema
  >;

export type AssessmentQuestion =
  z.infer<
    typeof assessmentQuestionSchema
  >;

export type AssessmentQuestionView =
  z.infer<
    typeof assessmentQuestionViewSchema
  >;