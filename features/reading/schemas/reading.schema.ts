import { z } from "zod";

export const readingCefrLevelSchema = z.enum([
  "A1",
  "A2",
  "B1",
  "B2",
  "C1",
  "C2",
]);

export const readingResourceTypeSchema = z.enum([
  "book",
  "graded_reader",
  "short_story",
  "article",
  "lesson",
  "image_text",
  "document",
]);

export const readingSourceTypeSchema = z.enum([
  "platform",
  "user_upload",
]);

export const readingResourceStatusSchema = z.enum([
  "ready",
  "processing",
  "coming_soon",
  "failed",
]);

export const readingInsightTypeSchema = z.enum([
  "strength",
  "weakness",
  "recommendation",
  "achievement",
]);

export const readingProcessingStatusSchema = z.enum([
  "queued",
  "extracting",
  "analyzing",
  "segmenting",
  "generating_audio",
  "ready",
  "failed",
]);

export const readingSectionStatusSchema = z.enum([
  "locked",
  "available",
  "in_progress",
  "completed",
]);

export const readingAudioStatusSchema = z.enum([
  "not_started",
  "generating",
  "ready",
  "failed",
]);

export const readingSourceFileKindSchema = z.enum([
  "pdf",
  "docx",
  "txt",
  "image",
]);

export const readingResourceSummarySchema = z.object({
  id: z.string().trim().min(1),

  title: z.string().trim().min(1),
  author: z.string().trim().min(1).nullable(),
  description: z.string().trim().min(1).nullable(),

  resourceType: readingResourceTypeSchema,
  sourceType: readingSourceTypeSchema,
  status: readingResourceStatusSchema,

  languageCode: z.string().trim().min(2).max(10),
  cefrLevel: readingCefrLevelSchema,

  coverImageUrl: z.string().trim().min(1).nullable(),

  estimatedMinutes: z.number().int().positive(),
  totalSections: z.number().int().positive(),
  completedSections: z.number().int().nonnegative(),
  progressPercent: z.number().min(0).max(100),

  topics: z
    .array(z.string().trim().min(1))
    .default([]),

  learningFocuses: z
    .array(z.string().trim().min(1))
    .default([]),

  isFeatured: z.boolean(),
});

export const readingSectionSummarySchema = z.object({
  id: z.string().trim().min(1),
  order: z.number().int().positive(),

  title: z.string().trim().min(1),
  summary: z.string().trim().min(1),

  wordCount: z.number().int().nonnegative(),
  estimatedMinutes: z.number().int().positive(),

  status: readingSectionStatusSchema,
  audioStatus: readingAudioStatusSchema,

  vocabularyCount: z.number().int().nonnegative(),
  grammarPointCount: z.number().int().nonnegative(),
});

export const readingResourceDetailSchema =
  readingResourceSummarySchema.extend({
    processingStatus: readingProcessingStatusSchema,
    processingProgress: z.number().min(0).max(100),

    originalFilename: z
      .string()
      .trim()
      .min(1)
      .nullable(),

    sourceFileKind: readingSourceFileKindSchema.nullable(),

    mimeType: z
      .string()
      .trim()
      .min(1)
      .nullable(),

    sizeBytes: z
      .number()
      .int()
      .positive()
      .nullable(),

    totalWords: z.number().int().nonnegative(),

    sections: z
      .array(readingSectionSummarySchema)
      .default([]),

    processingWarnings: z
      .array(z.string().trim().min(1))
      .default([]),

    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  });

export const readingStatsSchema = z.object({
  totalSessions: z.number().int().nonnegative(),
  weeklyMinutes: z.number().int().nonnegative(),
  completedSections: z.number().int().nonnegative(),
  masteredWords: z.number().int().nonnegative(),
  currentStreakDays: z.number().int().nonnegative(),
});

export const continueReadingSchema = z.object({
  resourceId: z.string().trim().min(1),

  title: z.string().trim().min(1),
  currentSectionTitle: z.string().trim().min(1),

  completedSections: z.number().int().nonnegative(),
  totalSections: z.number().int().positive(),
  progressPercent: z.number().min(0).max(100),

  updatedAt: z.string().datetime(),
});

export const readingJourneyStepSchema = z.object({
  id: z.string().trim().min(1),
  order: z.number().int().positive(),

  title: z.string().trim().min(1),
  description: z.string().trim().min(1),

  status: z.enum([
    "completed",
    "active",
    "upcoming",
  ]),
});

export const readingLearningJourneySchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),

  steps: z
    .array(readingJourneyStepSchema)
    .min(1),
});

export const readingInsightSchema = z.object({
  id: z.string().trim().min(1),
  type: readingInsightTypeSchema,

  title: z.string().trim().min(1),
  description: z.string().trim().min(1),

  actionLabel: z.string().trim().min(1).nullable(),
  actionHref: z.string().trim().min(1).nullable(),

  createdAt: z.string().datetime(),
});

export const recentReadingActivitySchema = z.object({
  id: z.string().trim().min(1),
  resourceId: z.string().trim().min(1),

  title: z.string().trim().min(1),
  sectionTitle: z.string().trim().min(1),

  durationMinutes: z.number().int().nonnegative(),
  learnedWords: z.number().int().nonnegative(),

  comprehensionScore: z
    .number()
    .min(0)
    .max(100),

  completedAt: z.string().datetime(),
});

export const readingOverviewSchema = z.object({
  stats: readingStatsSchema,

  continueReading: continueReadingSchema
    .nullable()
    .default(null),

  featuredResources: z
    .array(readingResourceSummarySchema)
    .default([]),

  recommendedResources: z
    .array(readingResourceSummarySchema)
    .default([]),

  learningJourney: readingLearningJourneySchema,

  primaryInsight: readingInsightSchema
    .nullable()
    .default(null),

  recentActivities: z
    .array(recentReadingActivitySchema)
    .default([]),
});

export const readingLibrarySchema = z.object({
  resources: z
    .array(readingResourceSummarySchema)
    .default([]),

  total: z.number().int().nonnegative(),
});

export const readingSourceUploadMetadataSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1)
    .max(160)
    .nullable()
    .default(null),

  languageCode: z
    .string()
    .trim()
    .min(2)
    .max(10)
    .default("en"),

  cefrLevel: readingCefrLevelSchema
    .nullable()
    .default(null),
});

export const readingSourceUploadResultSchema = z.object({
  resourceId: z.string().trim().min(1),

  title: z.string().trim().min(1),

  status: z.literal("processing"),
  processingStatus: readingProcessingStatusSchema,
  processingProgress: z.number().min(0).max(100),

  originalFilename: z.string().trim().min(1),
  sourceFileKind: readingSourceFileKindSchema,

  warnings: z
    .array(z.string().trim().min(1))
    .default([]),

  createdAt: z.string().datetime(),
});