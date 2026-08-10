import { z } from "zod";

import {
  assessmentCefrLevelSchema,
  assessmentQuestionViewSchema,
} from "./assessment-question.schema";

import {
  assessmentTypeSchema,
} from "./assessment.schema";

export const assessmentAttemptStatusSchema =
  z.enum([
    "created",
    "in_progress",
    "submitted",
    "completed",
    "abandoned",
  ]);

export const assessmentAnswerEvaluationStatusSchema =
  z.enum([
    "pending",
    "scored",
    "manual_review",
  ]);

export const singleOptionAnswerPayloadSchema =
  z.object({
    kind: z.literal(
      "single_option",
    ),

    selectedOptionId: z
      .string()
      .trim()
      .min(1),
  });

export const multipleOptionsAnswerPayloadSchema =
  z.object({
    kind: z.literal(
      "multiple_options",
    ),

    selectedOptionIds: z
      .array(
        z
          .string()
          .trim()
          .min(1),
      )
      .min(1),
  });

export const textAnswerPayloadSchema =
  z.object({
    kind: z.literal(
      "text",
    ),

    value: z
      .string()
      .trim()
      .min(1),
  });

export const orderingAnswerPayloadSchema =
  z.object({
    kind: z.literal(
      "ordering",
    ),

    orderedItemIds: z
      .array(
        z
          .string()
          .trim()
          .min(1),
      )
      .min(2),
  });

export const recordingAnswerPayloadSchema =
  z.object({
    kind: z.literal(
      "recording",
    ),

    recordingId: z
      .string()
      .trim()
      .min(1),

    durationSeconds: z
      .number()
      .int()
      .positive(),
  });

export const assessmentAnswerPayloadSchema =
  z.discriminatedUnion(
    "kind",
    [
      singleOptionAnswerPayloadSchema,
      multipleOptionsAnswerPayloadSchema,
      textAnswerPayloadSchema,
      orderingAnswerPayloadSchema,
      recordingAnswerPayloadSchema,
    ],
  );

export const assessmentAnswerRecordSchema =
  z.object({
    questionId: z
      .string()
      .trim()
      .min(1),

    payload:
      assessmentAnswerPayloadSchema,

    answeredAt:
      z.string().datetime(),

    elapsedSeconds: z
      .number()
      .int()
      .nonnegative(),

    evaluationStatus:
      assessmentAnswerEvaluationStatusSchema,

    isCorrect: z
      .boolean()
      .nullable()
      .default(null),

    earnedPoints: z
      .number()
      .min(0)
      .nullable()
      .default(null),

    maxPoints: z
      .number()
      .positive(),

    feedback: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .default(null),
  });

export const assessmentAdaptiveStateSchema =
  z.object({
    currentCefrLevel:
      assessmentCefrLevelSchema,

    abilityScore: z
      .number()
      .min(0)
      .max(100),

    confidence: z
      .number()
      .min(0)
      .max(100),

    correctStreak: z
      .number()
      .int()
      .nonnegative(),

    incorrectStreak: z
      .number()
      .int()
      .nonnegative(),

    askedQuestionIds: z
      .array(
        z
          .string()
          .trim()
          .min(1),
      )
      .default([]),
  });

export const assessmentAttemptSchema =
  z.object({
    id: z
      .string()
      .trim()
      .min(1),

    assessmentId: z
      .string()
      .trim()
      .min(1),

    assessmentType:
      assessmentTypeSchema,

    userId: z
      .string()
      .trim()
      .min(1),

    targetLanguageCode: z
      .string()
      .trim()
      .min(2)
      .max(10),

    status:
      assessmentAttemptStatusSchema,

    startedAt: z
      .string()
      .datetime()
      .nullable()
      .default(null),

    lastSavedAt: z
      .string()
      .datetime()
      .nullable()
      .default(null),

    submittedAt: z
      .string()
      .datetime()
      .nullable()
      .default(null),

    completedAt: z
      .string()
      .datetime()
      .nullable()
      .default(null),

    currentQuestionId: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .default(null),

    currentQuestionIndex: z
      .number()
      .int()
      .nonnegative()
      .default(0),

    questionOrder: z
      .array(
        z
          .string()
          .trim()
          .min(1),
      )
      .min(1),

    totalQuestionTarget: z
      .number()
      .int()
      .positive(),

    answers: z
      .array(
        assessmentAnswerRecordSchema,
      )
      .default([]),

    adaptiveState:
      assessmentAdaptiveStateSchema
        .nullable()
        .default(null),

    contextSnapshotId: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .default(null),
  });

export const createAssessmentAttemptInputSchema =
  z.object({
    assessmentId: z
      .string()
      .trim()
      .min(1),

    targetLanguageCode: z
      .string()
      .trim()
      .min(2)
      .max(10),
  });

export const saveAssessmentAnswerInputSchema =
  z.object({
    questionId: z
      .string()
      .trim()
      .min(1),

    payload:
      assessmentAnswerPayloadSchema,

    elapsedSeconds: z
      .number()
      .int()
      .nonnegative(),
  });


export const assessmentAttemptViewSchema =
  z.object({
    attempt:
      assessmentAttemptSchema,

    currentQuestion:
      assessmentQuestionViewSchema
        .nullable(),

    answeredQuestions: z
      .number()
      .int()
      .nonnegative(),

    progressPercent: z
      .number()
      .min(0)
      .max(100),
  });