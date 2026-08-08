import { z } from "zod";

import {
  listeningPracticeModeSchema,
} from "./listening.schema";

export const listeningComparisonKindSchema = z.enum([
  "match",
  "omission",
  "substitution",
  "addition",
]);

export const listeningComparisonSegmentSchema =
  z
    .object({
      id: z.string().trim().min(1),

      kind:
        listeningComparisonKindSchema,

      expected: z
        .string()
        .trim()
        .min(1)
        .nullable(),

      actual: z
        .string()
        .trim()
        .min(1)
        .nullable(),
    })
    .superRefine(
      (segment, context) => {
        if (
          segment.expected === null &&
          segment.actual === null
        ) {
          context.addIssue({
            code: "custom",
            message:
              "A comparison segment must contain expected or actual text.",
          });
        }
      },
    );

export const listeningScoreBreakdownSchema =
  z.object({
    overall: z
      .number()
      .min(0)
      .max(100),

    wordAccuracy: z
      .number()
      .min(0)
      .max(100),

    sequenceAccuracy: z
      .number()
      .min(0)
      .max(100),

    spellingAccuracy: z
      .number()
      .min(0)
      .max(100),
  });

export const listeningTeacherFeedbackSchema =
  z.object({
    summary: z
      .string()
      .trim()
      .min(1),

    strengths: z
      .array(
        z.string().trim().min(1),
      )
      .default([]),

    priorities: z
      .array(
        z.string().trim().min(1),
      )
      .default([]),
  });

export const listeningAttemptAnalysisSchema =
  z.object({
    attemptId: z
      .string()
      .trim()
      .min(1),

    contentId: z
      .string()
      .trim()
      .min(1),

    contentTitle: z
      .string()
      .trim()
      .min(1),

    practiceMode:
      listeningPracticeModeSchema,

    status: z.literal("completed"),

    submittedTranscript: z
      .string()
      .trim()
      .min(1),

    referenceTranscript: z
      .string()
      .trim()
      .min(1),

    score:
      listeningScoreBreakdownSchema,

    comparison: z
      .array(
        listeningComparisonSegmentSchema,
      )
      .min(1),

    feedback:
      listeningTeacherFeedbackSchema,

    createdAt: z
      .string()
      .datetime(),

    completedAt: z
      .string()
      .datetime(),
  });