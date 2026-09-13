import {
  z,
} from "zod";

import {
  listeningAnswerSourceSchema,
  listeningAttemptDraftSchema,
} from "./listening-attempt.schema";

import {
  listeningPracticeModeSchema,
} from "./listening.schema";

export const createListeningAttemptInputSchema =
  z.object({
    contentId:
      z
        .string()
        .trim()
        .min(1),

    practiceMode:
      listeningPracticeModeSchema,
  });

export const createListeningAttemptResponseSchema =
  listeningAttemptDraftSchema;

export const updateListeningDraftInputSchema =
  z
    .object({
      practiceMode:
        listeningPracticeModeSchema
          .optional(),

      answerSource:
        listeningAnswerSourceSchema
          .optional(),

      transcript:
        z
          .string()
          .max(
            20_000,
          )
          .optional(),

      currentPositionSeconds:
        z
          .number()
          .nonnegative()
          .optional(),

      playbackRate:
        z
          .number()
          .min(0.5)
          .max(2)
          .optional(),
    })
    .refine(
      (value) =>
        Object.keys(
          value,
        ).length >
        0,
      {
        message:
          "At least one draft field is required.",
      },
    );

export const updateListeningDraftResponseSchema =
  listeningAttemptDraftSchema;

export const submitListeningAttemptInputSchema =
  z.object({
    contentId:
      z
        .string()
        .trim()
        .min(1),

    practiceMode:
      listeningPracticeModeSchema,

    answerSource:
      listeningAnswerSourceSchema,

    transcript:
      z
        .string()
        .trim()
        .min(
          1,
          "Transcript برای تحلیل الزامی است.",
        )
        .max(
          20_000,
        ),

    currentPositionSeconds:
      z
        .number()
        .nonnegative(),

    playbackRate:
      z
        .number()
        .min(0.5)
        .max(2),
  });