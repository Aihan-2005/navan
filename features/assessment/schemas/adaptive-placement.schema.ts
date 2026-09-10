import {
  z,
} from "zod";

import {
  assessmentAnswerPayloadSchema,
} from "./assessment-attempt.schema";

import {
  assessmentCefrLevelSchema,
  assessmentQuestionViewSchema,
  assessmentSkillSchema,
} from "./assessment-question.schema";

import {
  assessmentSubmissionResultSchema,
} from "./assessment-runner.schema";

export const adaptivePlacementStatusSchema =
  z.enum([
    "in_progress",
    "completed",
  ]);

export const adaptivePlacementSkillCoverageSchema =
  z.object({
    skill:
      assessmentSkillSchema,

    answered: z
      .number()
      .int()
      .nonnegative(),

    correct: z
      .number()
      .int()
      .nonnegative(),

    accuracy: z
      .number()
      .min(0)
      .max(100)
      .nullable(),
  });

export const adaptivePlacementStartInputSchema =
  z.object({
    assessmentId: z
      .string()
      .trim()
      .min(1),
  });

export const adaptivePlacementAnswerInputSchema =
  z.object({
    sessionId: z
      .string()
      .trim()
      .min(1),

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

export const adaptivePlacementSessionViewSchema =
  z
    .object({
      sessionId: z
        .string()
        .trim()
        .min(1),

      assessmentId: z
        .string()
        .trim()
        .min(1),

      status:
        adaptivePlacementStatusSchema,

      startedAt:
        z.string().datetime(),

      currentQuestion:
        assessmentQuestionViewSchema
          .nullable(),

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

      answeredCount: z
        .number()
        .int()
        .nonnegative(),

      minimumQuestions: z
        .number()
        .int()
        .positive(),

      maximumQuestions: z
        .number()
        .int()
        .positive(),

      progressPercent: z
        .number()
        .min(0)
        .max(100),

      coverage: z.array(
        adaptivePlacementSkillCoverageSchema,
      ),

      result:
        assessmentSubmissionResultSchema
          .nullable(),
    })
    .superRefine(
      (
        session,
        context,
      ) => {
        if (
          session.status ===
            "in_progress" &&
          !session.currentQuestion
        ) {
          context.addIssue({
            code: "custom",

            path: [
              "currentQuestion",
            ],

            message:
              "An active adaptive session requires a current question.",
          });
        }

        if (
          session.status ===
            "completed" &&
          session.currentQuestion !==
            null
        ) {
          context.addIssue({
            code: "custom",

            path: [
              "currentQuestion",
            ],

            message:
              "A completed adaptive session cannot have a current question.",
          });
        }

        if (
          session.status ===
            "completed" &&
          !session.result
        ) {
          context.addIssue({
            code: "custom",

            path: [
              "result",
            ],

            message:
              "A completed adaptive session requires a result.",
          });
        }
      },
    );