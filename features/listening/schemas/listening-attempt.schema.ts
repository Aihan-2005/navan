import { z } from "zod";

import {
  listeningPracticeModeSchema,
} from "./listening.schema";

export const listeningAnswerSourceSchema = z.enum([
  "typed",
  "document",
  "image",
]);

export const listeningAttemptStatusSchema = z.enum([
  "draft",
  "extracting_notes",
  "ready",
  "submitted",
  "analyzing",
  "completed",
  "failed",
]);

export const listeningDraftSaveStatusSchema = z.enum([
  "idle",
  "dirty",
  "saving",
  "saved",
  "error",
]);

export const listeningAttemptDraftSchema = z.object({
  attemptId: z.string().trim().min(1).nullable(),
  contentId: z.string().trim().min(1),

  practiceMode: listeningPracticeModeSchema,
  answerSource: listeningAnswerSourceSchema,

  transcript: z.string().max(20_000),

  currentPositionSeconds: z
    .number()
    .nonnegative(),

  playbackRate: z
    .number()
    .min(0.5)
    .max(2),

  status: listeningAttemptStatusSchema,

  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});