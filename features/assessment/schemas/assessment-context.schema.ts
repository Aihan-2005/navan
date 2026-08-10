import { z } from "zod";

import {
  assessmentCefrLevelSchema,
  assessmentSkillSchema,
} from "./assessment-question.schema";

export const assessmentLearnerSkillSignalSchema =
  z.object({
    skill:
      assessmentSkillSchema,

    score: z
      .number()
      .min(0)
      .max(100)
      .nullable(),

    previousScore: z
      .number()
      .min(0)
      .max(100)
      .nullable(),

    cefrLevel:
      assessmentCefrLevelSchema
        .nullable(),

    completedActivities: z
      .number()
      .int()
      .nonnegative(),

    totalPracticeMinutes: z
      .number()
      .int()
      .nonnegative(),

    recentScore: z
      .number()
      .min(0)
      .max(100)
      .nullable(),

    recentEvidenceCount: z
      .number()
      .int()
      .nonnegative(),
  });

export const assessmentReviewSignalSchema =
  z.object({
    totalItems: z
      .number()
      .int()
      .nonnegative(),

    vocabularyCount: z
      .number()
      .int()
      .nonnegative(),

    grammarCount: z
      .number()
      .int()
      .nonnegative(),

    mistakeCount: z
      .number()
      .int()
      .nonnegative(),

    estimatedMinutes: z
      .number()
      .int()
      .nonnegative(),
  });

export const assessmentLearnerContextSchema =
  z.object({
    userId: z
      .string()
      .trim()
      .min(1),

    targetLanguageCode: z
      .string()
      .trim()
      .min(2)
      .max(10),

    nativeLanguageCode: z
      .string()
      .trim()
      .min(2)
      .max(10),

    currentCefrLevel:
      assessmentCefrLevelSchema
        .nullable(),

    learningGoal: z
      .string()
      .trim()
      .min(1)
      .nullable(),

    skills: z
      .array(
        assessmentLearnerSkillSignalSchema,
      )
      .default([]),

    review:
      assessmentReviewSignalSchema,

    recentCompletedActivityCount: z
      .number()
      .int()
      .nonnegative(),

    generatedAt:
      z.string().datetime(),
  });