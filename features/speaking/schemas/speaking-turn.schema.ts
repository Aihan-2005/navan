import {
  z,
} from "zod";

export const speakingTurnModeSchema =
  z.enum([
    "scenario",
    "free",
  ]);

export const speakingAnalysisEngineSchema =
  z.enum([
    "mock",
    "ai",
  ]);

export const speakingCorrectionCategorySchema =
  z.enum([
    "grammar",
    "vocabulary",
    "naturalness",
    "pronunciation",
  ]);

export const speakingCorrectionSeveritySchema =
  z.enum([
    "minor",
    "important",
  ]);

export const speakingTurnAnalyzeMetadataSchema =
  z.object({
    mode:
      speakingTurnModeSchema,

    scenarioId: z
      .string()
      .trim()
      .min(1).nullable(),

    durationSeconds: z
      .number()
      .min(0.1)
      .max(900),

    mimeType: z
      .string()
      .trim()
      .min(1),

    turnIndex: z
      .number()
      .int()
      .positive()
      .default(1),

    previousTurnId: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .default(null),
  })
  .superRefine(
    (
      value,
      context,
    ) => {
      if (
        value.mode ===
          "scenario" &&
        !value.scenarioId
      ) {
        context.addIssue({
          code:
            "custom",path: [
            "scenarioId",
          ],

          message:
            "برای تمرین سناریویی، scenarioId الزامی است.",
        });
      }

      if (
        value.mode ===
          "free" &&
        value.scenarioId !==
          null
      ) {
        context.addIssue({
          code:
            "custom",

          path: [
            "scenarioId",
          ],

          message:
            "در گفت‌وگوی آزاد scenarioId باید null باشد.",
        });
      }
    },
  );

export const speakingTranscriptSegmentSchema =
  z.object({
    id: z
      .string()
      .trim()
      .min(1),

    startMs: z
      .number()
      .int()
      .nonnegative(),

    endMs: z
      .number()
      .int()
      .nonnegative(),

    text: z
      .string()
      .trim()
      .min(1),

    confidencePercent: z
      .number()
      .int()
      .min(0)
      .max(100),
  })
  .refine(
    (
      value,
    ) =>
      value.endMs >=
      value.startMs,
    {
      message:
        "Transcript segment endMs must be greater than or equal to startMs.",
      path: [
        "endMs",
      ],
    },
  );export const speakingScoreBreakdownSchema =
  z.object({
    overall: z
      .number()
      .int()
      .min(0)
      .max(100),

    pronunciation: z
      .number()
      .int()
      .min(0)
      .max(100),

    fluency: z
      .number()
      .int()
      .min(0)
      .max(100),

    grammar: z
      .number()
      .int()
      .min(0)
      .max(100),

    vocabulary: z
      .number()
      .int().min(0)
      .max(100),

    coherence: z
      .number()
      .int()
      .min(0)
      .max(100),
  });

export const speakingCorrectionSchema =
  z.object({
    id: z
      .string()
      .trim()
      .min(1),

    category:
      speakingCorrectionCategorySchema,

    severity:
      speakingCorrectionSeveritySchema,

    original: z
      .string()
      .trim()
      .min(1),

    corrected: z
      .string()
      .trim()
      .min(1),

    explanationFa: z
      .string()
      .trim()
      .min(1),
  });

export const speakingPronunciationFindingSchema =
  z.object({
    id: z
      .string()
      .trim()
      .min(1),

    target: z
      .string()
      .trim()
      .min(1),

    ipa: z
      .string()
      .trim()
      .min(1)
      .nullable(),

    feedbackFa: z
      .string()
      .trim()
      .min(1),

    score: z
      .number()
      .int()
      .min(0)
      .max(100),
  });
export const speakingAiReplySchema =
  z.object({
    text: z
      .string()
      .trim()
      .min(1),

    translationFa: z
      .string()
      .trim()
      .min(1),

    followUpQuestion: z
      .string()
      .trim()
      .min(1),

    suggestedReplies: z
      .array(
        z
          .string()
          .trim()
          .min(1),
      )
      .max(4)
      .default([]),

    audioUrl: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .default(null),
  });

export const speakingTurnAnalysisSchema =
  z.object({
    turnId: z
      .string() .trim()
      .min(1),

    scenarioId: z
      .string()
      .trim()
      .min(1)
      .nullable(),

    turnIndex: z
      .number()
      .int()
      .positive(),

    engine:
      speakingAnalysisEngineSchema,

    languageCode: z
      .string()
      .trim()
      .min(2)
      .max(10),

    durationSeconds: z
      .number()
      .positive(),

    transcript: z
      .string()
      .trim()
      .min(1),

    transcriptConfidencePercent: z
      .number()
      .int()
      .min(0).max(100),

    transcriptSegments: z
      .array(
        speakingTranscriptSegmentSchema,
      )
      .default([]),

    wordCount: z
      .number()
      .int()
      .nonnegative(),

    wordsPerMinute: z
      .number()
      .int()
      .nonnegative(),

    scores:
      speakingScoreBreakdownSchema,

    summaryFa: z
      .string()
      .trim()
      .min(1),

    strengths: z
      .array(
        z
          .string()
          .trim().min(1),
      )
      .default([]),

    priorities: z
      .array(
        z
          .string()
          .trim()
          .min(1),
      )
      .default([]),

    corrections: z
      .array(
        speakingCorrectionSchema,
      )
      .default([]),

    pronunciationFindings: z
      .array(
        speakingPronunciationFindingSchema,
      )
      .default([]),

    aiReply:
      speakingAiReplySchema,

    createdAt:
      z.string().datetime(),
  });