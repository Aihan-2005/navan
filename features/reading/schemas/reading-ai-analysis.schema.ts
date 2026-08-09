import { z } from "zod";

import {
  readingCefrLevelSchema,
} from "./reading.schema";

export const readingAiScoreSchema =
  z
    .number()
    .int()
    .min(0)
    .max(100);

export const readingAiConfidenceSchema =
  z
    .number()
    .int()
    .min(0)
    .max(100);

export const readingAiAnalysisStatusSchema =
  z.enum([
    "pending",
    "processing",
    "ready",
    "failed",
  ]);

export const readingAiInsightTypeSchema =
  z.enum([
    "strength",
    "challenge",
    "recommendation",
    "warning",
  ]);

export const readingAiInsightPrioritySchema =
  z.enum([
    "low",
    "medium",
    "high",
  ]);

export const readingAiDifficultyScoresSchema =
  z.object({
    overall: readingAiScoreSchema,

    vocabulary: readingAiScoreSchema,

    grammar: readingAiScoreSchema,

    sentenceComplexity:
      readingAiScoreSchema,

    inference: readingAiScoreSchema,

    cohesion: readingAiScoreSchema,
  });

export const readingAiContentQualitySchema =
  z.object({
    extractionConfidence:
      readingAiConfidenceSchema,

    languageConfidence:
      readingAiConfidenceSchema,

    structureConfidence:
      readingAiConfidenceSchema,

    educationalValue:
      readingAiScoreSchema,
  });

export const readingAiVocabularyProfileSchema =
  z.object({
    academicWordPercent:
      z.number().min(0).max(100),

    uncommonWordPercent:
      z.number().min(0).max(100),

    estimatedUniqueWords:
      z.number().int().nonnegative(),

    estimatedCoreWords:
      z.number().int().nonnegative(),
  });

export const readingAiInsightSchema =
  z.object({
    id: z
      .string()
      .trim()
      .min(1),

    type:
      readingAiInsightTypeSchema,

    priority:
      readingAiInsightPrioritySchema,

    title: z
      .string()
      .trim()
      .min(1),

    description: z
      .string()
      .trim()
      .min(1),

    evidence: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .default(null),
  });

export const readingResourceAiAnalysisSchema =
  z.object({
    resourceId: z
      .string()
      .trim()
      .min(1),

    status:
      readingAiAnalysisStatusSchema,

    modelVersion: z
      .string()
      .trim()
      .min(1),

    analyzedAt: z
      .string()
      .datetime()
      .nullable(),

    summary: z
      .string()
      .trim()
      .min(1),

    detectedLanguageCode: z
      .string()
      .trim()
      .min(2)
      .max(10),

    detectedCefrLevel:
      readingCefrLevelSchema,

    cefrConfidence:
      readingAiConfidenceSchema,

    difficulty:
      readingAiDifficultyScoresSchema,

    quality:
      readingAiContentQualitySchema,

    vocabularyProfile:
      readingAiVocabularyProfileSchema,

    estimatedReadingMinutes:
      z.number().int().positive(),

    suggestedSectionCount:
      z.number().int().positive(),

    topics: z
      .array(
        z.string().trim().min(1),
      )
      .default([]),

    learningObjectives: z
      .array(
        z.string().trim().min(1),
      )
      .default([]),

    keyVocabulary: z
      .array(
        z.string().trim().min(1),
      )
      .default([]),

    insights: z
      .array(
        readingAiInsightSchema,
      )
      .default([]),
  });