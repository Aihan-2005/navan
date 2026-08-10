import { z } from "zod";

import {
  ASSESSMENT_CUSTOM_EXPERIENCE_MODES,
  ASSESSMENT_DIFFICULTY_PROFILES,
  ASSESSMENT_GENERATION_STATUSES,
  ASSESSMENT_LEVEL_STRATEGIES,
} from "../constants/assessment.constants";

import {
  assessmentCefrLevelSchema,
  assessmentSkillSchema,
} from "./assessment-question.schema";

export const assessmentCustomExperienceModeSchema =
  z.enum(
    ASSESSMENT_CUSTOM_EXPERIENCE_MODES,
  );

export const assessmentLevelStrategySchema =
  z.enum(
    ASSESSMENT_LEVEL_STRATEGIES,
  );

export const assessmentDifficultyProfileSchema =
  z.enum(
    ASSESSMENT_DIFFICULTY_PROFILES,
  );

export const assessmentGenerationStatusSchema =
  z.enum(
    ASSESSMENT_GENERATION_STATUSES,
  );

export const assessmentContextPreferencesSchema =
  z.object({
    useLearnerProfile:
      z.boolean().default(true),

    useSkillHistory:
      z.boolean().default(true),

    useReviewMistakes:
      z.boolean().default(true),

    useReadingSignals:
      z.boolean().default(true),

    useListeningSignals:
      z.boolean().default(true),

    useSpeakingSignals:
      z.boolean().default(true),
  });

export const customAssessmentConfigurationSchema =
  z
    .object({
      experienceMode:
        assessmentCustomExperienceModeSchema,

      selectedSkills: z
        .array(
          assessmentSkillSchema,
        )
        .min(
          1,
          "حداقل یک مهارت باید انتخاب شود.",
        )
        .max(6),

      levelStrategy:
        assessmentLevelStrategySchema,

      targetCefrLevel:
        assessmentCefrLevelSchema
          .nullable()
          .default(null),

      difficultyProfile:
        assessmentDifficultyProfileSchema,

      questionCount: z
        .number()
        .int()
        .min(3)
        .max(40),

      timeLimitMinutes: z
        .number()
        .int()
        .min(3)
        .max(90),

      focusPrompt: z
        .string()
        .trim()
        .max(
          500,
          "توضیحات تمرکز آزمون بیش از حد طولانی است.",
        )
        .nullable()
        .default(null),

      includeExplanations:
        z.boolean().default(true),

      includeAiFeedback:
        z.boolean().default(true),

      contextPreferences:
        assessmentContextPreferencesSchema,
    })
    .superRefine(
      (
        configuration,
        context,
      ) => {
        const uniqueSkills =
          new Set(
            configuration.selectedSkills,
          );

        if (
          uniqueSkills.size !==
          configuration
            .selectedSkills.length
        ) {
          context.addIssue({
            code: "custom",

            path: [
              "selectedSkills",
            ],

            message:
              "مهارت‌های انتخاب‌شده باید یکتا باشند.",
          });
        }

        if (
          configuration.levelStrategy ===
            "fixed" &&
          !configuration.targetCefrLevel
        ) {
          context.addIssue({
            code: "custom",

            path: [
              "targetCefrLevel",
            ],

            message:
              "در حالت سطح ثابت، انتخاب CEFR الزامی است.",
          });
        }

        if (
          configuration.levelStrategy ===
            "auto" &&
          configuration.targetCefrLevel !==
            null
        ) {
          context.addIssue({
            code: "custom",

            path: [
              "targetCefrLevel",
            ],

            message:
              "در حالت خودکار، targetCefrLevel باید null باشد.",
          });
        }

        if (
          configuration.experienceMode ===
          "quiz"
        ) {
          if (
            configuration.questionCount <
              3 ||
            configuration.questionCount >
              12
          ) {
            context.addIssue({
              code: "custom",

              path: [
                "questionCount",
              ],

              message:
                "کوییز باید بین ۳ تا ۱۲ سؤال داشته باشد.",
            });
          }

          if (
            configuration.timeLimitMinutes >
            20
          ) {
            context.addIssue({
              code: "custom",

              path: [
                "timeLimitMinutes",
              ],

              message:
                "زمان کوییز نمی‌تواند بیشتر از ۲۰ دقیقه باشد.",
            });
          }
        }

        if (
          configuration.experienceMode ===
          "exam"
        ) {
          if (
            configuration.questionCount <
            10
          ) {
            context.addIssue({
              code: "custom",

              path: [
                "questionCount",
              ],

              message:
                "آزمون کامل حداقل باید ۱۰ سؤال داشته باشد.",
            });
          }

          if (
            configuration.timeLimitMinutes <
            10
          ) {
            context.addIssue({
              code: "custom",

              path: [
                "timeLimitMinutes",
              ],

              message:
                "زمان آزمون کامل باید حداقل ۱۰ دقیقه باشد.",
            });
          }
        }
      },
    );

export const createAssessmentGenerationRequestInputSchema =
  z.object({
    kind:
      z.literal("custom"),

    configuration:
      customAssessmentConfigurationSchema,
  });

export const assessmentGenerationSkillSignalSchema =
  z.object({
    skill:
      assessmentSkillSchema,

    score: z
      .number()
      .min(0)
      .max(100)
      .nullable(),

    cefrLevel:
      assessmentCefrLevelSchema
        .nullable(),

    evidenceCount: z
      .number()
      .int()
      .nonnegative(),
  });

export const assessmentGenerationContextSummarySchema =
  z.object({
    currentCefrLevel:
      assessmentCefrLevelSchema
        .nullable(),

    suggestedCefrLevel:
      assessmentCefrLevelSchema,

    selectedSkillSignals:
      z.array(
        assessmentGenerationSkillSignalSchema,
      ),

    reviewItemCount: z
      .number()
      .int()
      .nonnegative(),

    recentCompletedActivityCount:
      z
        .number()
        .int()
        .nonnegative(),
  });

export const assessmentGenerationRequestSchema =
  z.object({
    id: z
      .string()
      .trim()
      .min(1),

    kind:
      z.literal("custom"),

    userId: z
      .string()
      .trim()
      .min(1),

    status:
      assessmentGenerationStatusSchema,

    configuration:
      customAssessmentConfigurationSchema,

    contextSummary:
      assessmentGenerationContextSummarySchema,

    message: z
      .string()
      .trim()
      .min(1),

    createdAt:
      z.string().datetime(),

    updatedAt:
      z.string().datetime(),
  });