import {
  z,
} from "zod";

import {
  listeningAnswerSourceSchema,
  listeningAttemptStatusSchema,
} from "./listening-attempt.schema";

import {
  listeningPracticeModeSchema,
} from "./listening.schema";

export const listeningAttemptCreateInputSchema =
  z.object({
    contentId: z
      .string()
      .trim()
      .min(1),

    practiceMode:
      listeningPracticeModeSchema,

    answerSource:
      listeningAnswerSourceSchema
        .default("typed"),

    transcript: z
      .string()
      .max(20_000)
      .default(""),

    currentPositionSeconds: z
      .number()
      .nonnegative()
      .default(0),

    playbackRate: z
      .number()
      .min(0.5)
      .max(2)
      .default(1),
  });

export const listeningAttemptCreateResultSchema =
  z.object({
    attemptId: z
      .string()
      .trim()
      .min(1),

    status:
      listeningAttemptStatusSchema,

    createdAt:
      z.string().datetime(),

    updatedAt:
      z.string().datetime(),
  });

export const listeningAttemptDraftUpdateInputSchema =
  z.object({
    contentId: z
      .string()
      .trim()
      .min(1),

    practiceMode:
      listeningPracticeModeSchema,

    answerSource:
      listeningAnswerSourceSchema,

    transcript: z
      .string()
      .max(20_000),

    currentPositionSeconds: z
      .number()
      .nonnegative(),

    playbackRate: z
      .number()
      .min(0.5)
      .max(2),
  });

export const listeningAttemptDraftSaveResultSchema =
  z.object({
    attemptId: z
      .string()
      .trim()
      .min(1),

    status:
      listeningAttemptStatusSchema,

    updatedAt:
      z.string().datetime(),
  });

export const listeningAttemptSubmitInputSchema =
  z.object({
    contentId: z
      .string()
      .trim()
      .min(1),

    practiceMode:
      listeningPracticeModeSchema,

    answerSource:
      listeningAnswerSourceSchema,

    transcript: z
      .string()
      .trim()
      .min(
        1,
        "Transcript برای این نوع تمرین خالی است.",
      )
      .max(20_000),

    currentPositionSeconds: z
      .number()
      .nonnegative(),

    playbackRate: z
      .number()
      .min(0.5)
      .max(2),

    completedListenPasses: z
      .number()
      .int()
      .nonnegative(),

    clientCompletedAt:
      z.string().datetime(),
  });
  