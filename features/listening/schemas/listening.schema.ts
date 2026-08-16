import {
  z,
} from "zod";

export const listeningContentTypeSchema =
  z.enum([
    "podcast",
    "conversation",
    "story",
    "news",
    "interview",
    "lecture",
    "exam",
    "custom",
  ]);

export const listeningSourceTypeSchema =
  z.enum([
    "platform",
    "user_upload",
    "external_url",
  ]);

export const listeningPracticeModeSchema =
  z.enum([
    /**
     * فقط گوش دادن.
     *
     * در این Mode هیچ Transcript یا Submit
     * اجباری نیست.
     */
    "listen_only",

    "full_dictation",
    "guided_dictation",
    "fill_in_the_blank",
    "comprehension",
    "shadowing",
  ]);

export const listeningAccentSchema =
  z.enum([
    "american",
    "british","australian",
    "canadian",
    "mixed",
    "unknown",
  ]);

export const cefrLevelSchema =
  z.enum([
    "A1",
    "A2",
    "B1",
    "B2",
    "C1",
    "C2",
  ]);

export const listeningContentStatusSchema =
  z.enum([
    "ready",
    "processing",
    "coming_soon",
  ]);

export const listeningInsightTypeSchema =
  z.enum([
    "strength",
    "weakness",
    "recommendation",
    "achievement",
  ]);
export const listeningContentSummarySchema =
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
      .min(1)
      .nullable(),

    contentType:
      listeningContentTypeSchema,

    sourceType:
      listeningSourceTypeSchema,

    cefrLevel:
      cefrLevelSchema,

    accent:
      listeningAccentSchema,

    durationSeconds: z
      .number()
      .int()
      .positive(),

    estimatedPracticeMinutes: z
      .number()
      .int()
      .positive(),

    averageWordsPerMinute: z
      .number()
      .int()
      .positive()
      .nullable(),

    speakerCount: z
      .number()
      .int()
      .positive()
      .nullable(),

    topics: z
      .array(
        z
          .string()
          .trim()
          .min(1),
      )
      .default([]),

    vocabularyPreview: z
      .array(
        z
          .string()
          .trim()
          .min(1),
      )
      .default([]),

    availablePracticeModes: z
      .array(
        listeningPracticeModeSchema,
      )
      .min(1),

    status:
      listeningContentStatusSchema,

    isFeatured:
      z.boolean(),

    isCompleted:
      z.boolean(),bestAccuracyScore: z
      .number()
      .min(0)
      .max(100)
      .nullable(),
  });

export const listeningContentDetailSchema =
  listeningContentSummarySchema.extend({
    audioUrl: z
      .string()
      .trim()
      .min(1),

    coverImageUrl: z
      .string()
      .trim()
      .min(1)
      .nullable(),

    transcriptionLanguage: z
      .string()
      .trim()
      .min(2)
      .max(10),

    instructions: z
      .array(
        z
          .string()
          .trim()
          .min(1),
      )
      .default([]),

    hintWords: z
      .array(
        z
          .string()
          .trim()
          .min(1),
      )
      .default([]),
  minimumTranscriptWords: z
      .number()
      .int()
      .positive(),

    transcriptAvailable:
      z.boolean(),

    audioAttribution: z
      .string()
      .trim()
      .min(1)
      .nullable(),
  });

export const listeningStatsSchema =
  z.object({
    totalSessions: z
      .number()
      .int()
      .nonnegative(),

    weeklyMinutes: z
      .number()
      .int()
      .nonnegative(),

    averageAccuracyScore: z
      .number()
      .min(0)
      .max(100),

    bestAccuracyScore: z
      .number()
      .min(0)
      .max(100),

    currentStreakDays: z
      .number()
      .int()
      .nonnegative(),
  });export const continueListeningSchema =
  z.object({
    attemptId: z
      .string()
      .trim()
      .min(1),

    contentId: z
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
      .min(1)
      .nullable(),

    practiceMode:
      listeningPracticeModeSchema,

    progressPercent: z
      .number()
      .min(0)
      .max(100),

    currentPositionSeconds: z
      .number()
      .int()
      .nonnegative(),

    durationSeconds: z
      .number()
      .int()
      .positive(),

    updatedAt:z.string().datetime(),
  });

export const listeningInsightSchema =
  z.object({
    id: z
      .string()
      .trim()
      .min(1),

    type:
      listeningInsightTypeSchema,

    title: z
      .string()
      .trim()
      .min(1),

    description: z
      .string()
      .trim()
      .min(1),

    actionLabel: z
      .string()
      .trim()
      .min(1)
      .nullable(),

    actionHref: z
      .string()
      .trim()
      .min(1)
      .nullable(),

    createdAt:
      z.string().datetime(),
  });

export const recentListeningActivitySchema =
  z.object({
    id: z
      .string()
      .trim()
      .min(1),

    contentId: z
      .string()
      .trim()
      .min(1),

    title: z
      .string()
      .trim()
      .min(1),

    contentType:
      listeningContentTypeSchema,

    practiceMode:
      listeningPracticeModeSchema,

    durationMinutes: z
      .number()
      .int()
      .nonnegative(),

    accuracyScore: z
      .number()
      .min(0)
      .max(100),

    completedAt:
      z.string().datetime(),
  });

export const listeningOverviewSchema =
  z.object({
    stats:
      listeningStatsSchema,

    continueListening:
      continueListeningSchema
        .nullable()
        .default(null),

    featuredContents: z
      .array(
        listeningContentSummarySchema,
      )
      .default([]),

    recommendedContents: z
      .array(
        listeningContentSummarySchema,
      )
      .default([]),

    primaryInsight:
      listeningInsightSchema
        .nullable()
        .default(null),

    recentActivities: z
      .array(
        recentListeningActivitySchema,
      )
      .default([]),
  });