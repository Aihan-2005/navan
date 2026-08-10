import { z } from "zod";

import {
  assessmentLearnerContextSchema,
} from "./assessment-context.schema";

import {
  assessmentCefrLevelSchema,
  assessmentSkillSchema,
} from "./assessment-question.schema";

import {
  assessmentModeSchema,
} from "./assessment.schema";

export const assessmentMiniQuizStatusSchema =
  z.enum([
    "available",
    "coming_soon",
  ]);

export const assessmentPlacementSummarySchema =
  z.object({
    assessmentId: z
      .string()
      .trim()
      .min(1),

    title: z
      .string()
      .trim()
      .min(1),

    description: z
      .string()
      .trim()
      .min(1),

    estimatedMinutes: z
      .number()
      .int()
      .positive(),

    questionCount: z
      .number()
      .int()
      .positive(),

    mode:
      assessmentModeSchema,

    skills: z
      .array(
        assessmentSkillSchema,
      )
      .min(1),

    recommendedStartingLevel:
      assessmentCefrLevelSchema
        .nullable(),

    href: z
      .string()
      .trim()
      .min(1),
  });

export const assessmentMiniQuizSummarySchema =
  z.object({
    id: z
      .string()
      .trim()
      .min(1),

    title: z
      .string()
      .trim()
      .min(1),

    description: z
      .string()
      .trim()
      .min(1),

    skill:
      assessmentSkillSchema,

    cefrLevel:
      assessmentCefrLevelSchema,

    estimatedMinutes: z
      .number()
      .int()
      .positive(),

    questionCount: z
      .number()
      .int()
      .positive(),

    xpReward: z
      .number()
      .int()
      .nonnegative(),

    focusTags: z
      .array(
        z
          .string()
          .trim()
          .min(1),
      )
      .default([]),

    status:
      assessmentMiniQuizStatusSchema,

    href: z
      .string()
      .trim()
      .min(1)
      .nullable(),
  });

export const assessmentOverviewSchema =
  z.object({
    learner:
      assessmentLearnerContextSchema,

    placement:
      assessmentPlacementSummarySchema,

    miniQuizzes: z
      .array(
        assessmentMiniQuizSummarySchema,
      )
      .default([]),

    generatedAt:
      z.string().datetime(),
  });