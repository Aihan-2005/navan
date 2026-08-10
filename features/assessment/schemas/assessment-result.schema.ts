import { z } from "zod";

import {
  assessmentCefrLevelSchema,
  assessmentSkillSchema,
} from "./assessment-question.schema";

import {
  assessmentTypeSchema,
} from "./assessment.schema";

export const assessmentResultInsightTypeSchema =
  z.enum([
    "strength",
    "weakness",
    "recommendation",
  ]);

export const assessmentResultInsightPrioritySchema =
  z.enum([
    "low",
    "medium",
    "high",
  ]);

export const assessmentCategoryScoreSchema =
  z.object({
    key: z
      .string()
      .trim()
      .min(1),

    label: z
      .string()
      .trim()
      .min(1),

    score: z
      .number()
      .min(0)
      .max(100),

    evidenceCount: z
      .number()
      .int()
      .nonnegative(),
  });

export const assessmentSkillScoreSchema =
  z.object({
    skill:
      assessmentSkillSchema,

    score: z
      .number()
      .min(0)
      .max(100),

    cefrLevel:
      assessmentCefrLevelSchema,

    confidence: z
      .number()
      .min(0)
      .max(100),

    correctCount: z
      .number()
      .int()
      .nonnegative(),

    totalCount: z
      .number()
      .int()
      .nonnegative(),

    categories: z
      .array(
        assessmentCategoryScoreSchema,
      )
      .default([]),
  });

export const assessmentScoreSummarySchema =
  z.object({
    correctCount: z
      .number()
      .int()
      .nonnegative(),

    incorrectCount: z
      .number()
      .int()
      .nonnegative(),

    partiallyCorrectCount: z
      .number()
      .int()
      .nonnegative(),

    unansweredCount: z
      .number()
      .int()
      .nonnegative(),

    earnedPoints: z
      .number()
      .nonnegative(),

    maximumPoints: z
      .number()
      .positive(),
  });

export const assessmentResultInsightSchema =
  z.object({
    id: z
      .string()
      .trim()
      .min(1),

    type:
      assessmentResultInsightTypeSchema,

    priority:
      assessmentResultInsightPrioritySchema,

    relatedSkill:
      assessmentSkillSchema
        .nullable()
        .default(null),

    title: z
      .string()
      .trim()
      .min(1),

    description: z
      .string()
      .trim()
      .min(1),

    evidence: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .default(null),
  });

export const assessmentRecommendedActionTypeSchema =
  z.enum([
    "practice",
    "mini_quiz",
    "reading",
    "listening",
    "speaking",
    "review",
  ]);

export const assessmentRecommendedActionSchema =
  z.object({
    id: z
      .string()
      .trim()
      .min(1),

    type:
      assessmentRecommendedActionTypeSchema,

    skill:
      assessmentSkillSchema
        .nullable()
        .default(null),

    title: z
      .string()
      .trim()
      .min(1),

    description: z
      .string()
      .trim()
      .min(1),

    reason: z
      .string()
      .trim()
      .min(1),

    href: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .default(null),
  });

export const assessmentResultSchema =
  z.object({
    id: z
      .string()
      .trim()
      .min(1),

    attemptId: z
      .string()
      .trim()
      .min(1),

    assessmentId: z
      .string()
      .trim()
      .min(1),

    assessmentType:
      assessmentTypeSchema,

    overallScore: z
      .number()
      .min(0)
      .max(100),

    estimatedCefrLevel:
      assessmentCefrLevelSchema,

    confidence: z
      .number()
      .min(0)
      .max(100),

    passed: z
      .boolean()
      .nullable()
      .default(null),

    scoreSummary:
      assessmentScoreSummarySchema,

    skillScores: z
      .array(
        assessmentSkillScoreSchema,
      )
      .min(1),

    strengths: z
      .array(
        assessmentResultInsightSchema,
      )
      .default([]),

    weaknesses: z
      .array(
        assessmentResultInsightSchema,
      )
      .default([]),

    recommendations: z
      .array(
        assessmentResultInsightSchema,
      )
      .default([]),

    recommendedActions: z
      .array(
        assessmentRecommendedActionSchema,
      )
      .default([]),

    aiSummary: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .default(null),

    xpAwarded: z
      .number()
      .int()
      .nonnegative()
      .default(0),

    completedAt:
      z.string().datetime(),
  });