import {
  z,
} from "zod";

import {
  cefrLevelSchema,
  listeningPracticeModeSchema,
} from "./listening.schema";

export const listeningAnalysisEngineSchema =
  z.enum([
    "mock",
    "ai",
  ]);

export const listeningComparisonKindSchema =
  z.enum([
    "match",
    "omission",
    "substitution",
    "addition",
  ]);

export const listeningComparisonSegmentSchema =
  z
    .object({
      id: z
        .string()
        .trim()
        .min(1),

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
      (
        segment,
        context,
      ) => {
        if (
          segment.expected ===
            null &&
          segment.actual ===
            null
        ) {
          context.addIssue({
            code:
              "custom",

            message:
              "A comparison segment must contain expected or actual text.",
          });
        }
      },  );

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
        z
          .string()
          .trim()
          .min(1),
      ) .default([]),

    priorities: z
      .array(
        z
          .string()
          .trim()
          .min(1),
      )
      .default([]),
  });

/**
 * مهارت‌های Listening که Dictation ساده
 * به تنهایی نمی‌تواند کامل نشان دهد.
 */
export const listeningSkillProfileSchema =
  z.object({
    mainIdea: z
      .number()
      .min(0)
      .max(100),

    details: z
      .number()
      .min(0)
      .max(100),

    numbersAndNames: z
      .number()
      .min(0)
      .max(100),

    connectedSpeech: z
      .number()
      .min(0)
      .max(100),

    vocabularyInContext: z
      .number()
      .min(0)
      .max(100),

    inference: z
      .number()
      .min(0)
      .max(100),
  });

export const listeningErrorPatternCategorySchema =
  z.enum([
    "function_words",
    "connected_speech",
    "numbers_names",
    "word_boundary", "vocabulary",
    "grammar_signal",
    "attention",
    "spelling",
  ]);

export const listeningErrorPatternSeveritySchema =
  z.enum([
    "low",
    "medium",
    "high",
  ]);

export const listeningErrorPatternSchema =
  z.object({
    id: z
      .string()
      .trim()
      .min(1),

    category:
      listeningErrorPatternCategorySchema,

    severity:
      listeningErrorPatternSeveritySchema,

    title: z
      .string()
      .trim()
      .min(1),

    description: z
      .string()
      .trim()
      .min(1),

    evidence: z
      .array(
        z
          .string()
          .trim()
          .min(1),
      )
      .default([]),

    recommendation: z
      .string()
      .trim()   .min(1),
  });

export const listeningDifficultSegmentSchema =
  z
    .object({
      id: z
        .string()
        .trim()
        .min(1),

      startSecond: z
        .number()
        .nonnegative(),

      endSecond: z
        .number()
        .positive(),

      transcript: z
        .string()
        .trim()
        .min(1),

      focusPhrase: z
        .string()
        .trim()
        .min(1)
        .nullable(),

      reasonFa: z
        .string()
        .trim()
        .min(1),

      tipFa: z
        .string()
        .trim()
        .min(1),
    })
    .refine(
      (
        segment,
      ) =>
        segment.endSecond >
        segment.startSecond,
      {
        path: [
          "endSecond",
        ],

         message:
          "Difficult segment endSecond must be after startSecond.",
      },
    );

export const listeningMissedWordSchema =
  z.object({
    word: z
      .string()
      .trim()
      .min(1),

    heardAs: z
      .string()
      .trim()
      .min(1)
      .nullable(),

    meaningFa: z
      .string()
      .trim()
      .min(1),

    reasonFa: z
      .string()
      .trim()
      .min(1),
  });

export const listeningVocabularyMasterySchema =
  z.enum([
    "new",
    "review",
    "familiar",
  ]);

export const listeningVocabularyDiscoverySchema =
  z.object({
    word: z
      .string()
      .trim()
      .min(1),

    meaningFa: z
      .string()
      .trim()
      .min(1),

    phrase: z
      .string()
      .trim()
      .min(1),

    noteFa: z
      .string()
      .trim()
      .min(1),

    masteryStatus:
      listeningVocabularyMasterySchema,
  });

export const listeningActionPlanItemSchema =
  z.object({
    id: z
      .string()
      .trim()
      .min(1), priority: z
      .number()
      .int()
      .min(1)
      .max(5),

    title: z
      .string()
      .trim()
      .min(1),

    description: z
      .string()
      .trim()
      .min(1),

    durationMinutes: z
      .number()
      .int()
      .min(1)
      .max(60),

    practiceMode:
      listeningPracticeModeSchema,
  });

export const listeningAiCoachSchema =
  z.object({
    headline: z
      .string()
      .trim()
      .min(1),

    diagnosis: z
      .string()
      .trim()
      .min(1),

    nextFocus: z
      .string()
      .trim()
      .min(1),

    estimatedCefrLevel:
      cefrLevelSchema
        .nullable(),

    confidencePercent: z
      .number()
      .min(0)
      .max(100),

    nextSessionGoal: z
      .string()
      .trim()
      .min(1),

    encouragement: z
      .string()
      .trim()
      .min(1),
  });

export const listeningAttemptAnalysisSchema =
  z.object({
    attemptId: z
      .string() .trim()
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

    status:
      z.literal(
        "completed",
      ),

    /**
     * Backend بعداً صراحتاً ai برمی‌گرداند.
     *
     * default باعث می‌شود payloadهای قدیمی
     * Frontend هنوز معتبر بمانند.
     */
    engine:
      listeningAnalysisEngineSchema
        .default(
          "mock",
        ),

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

    /**
     * خروجی‌های AI توسعه‌یافته.
     *
     * nullable/default باعث Backward Compatibility
     * با API فعلی می‌شود.
     */
    skillProfile:
      listeningSkillProfileSchema
        .nullable()
        .default(null),

    errorPatterns: z.array(
        listeningErrorPatternSchema,
      )
      .default([]),

    difficultSegments: z
      .array(
        listeningDifficultSegmentSchema,
      )
      .default([]),

    missedWords: z
      .array(
        listeningMissedWordSchema,
      )
      .default([]),

    vocabularyDiscoveries: z
      .array(
        listeningVocabularyDiscoverySchema,
      )
      .default([]),

    actionPlan: z
      .array(
        listeningActionPlanItemSchema,
      )
      .default([]),

    aiCoach:
      listeningAiCoachSchema
        .nullable()
        .default(null),

    createdAt:
      z.string().datetime(),

    completedAt:
      z.string().datetime(),
  });