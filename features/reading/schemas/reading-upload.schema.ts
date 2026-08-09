import { z } from "zod";

import {
  readingCefrLevelSchema,
  readingProcessingStatusSchema,
  readingSourceFileKindSchema,
} from "./reading.schema";

export const readingUploadAnalysisModeSchema =
  z.enum([
    "standard",
    "deep",
  ]);

export const readingUploadSectionLengthSchema =
  z.enum([
    "short",
    "balanced",
    "long",
  ]);

export const readingUploadOptionsSchema =
  z.object({
    analysisMode:
      readingUploadAnalysisModeSchema
        .default("deep"),

    sectionLength:
      readingUploadSectionLengthSchema
        .default("balanced"),

    generateAudio:
      z.boolean().default(true),

    extractVocabulary:
      z.boolean().default(true),

    extractGrammar:
      z.boolean().default(true),

    generateQuestions:
      z.boolean().default(true),

    questionsPerSection:
      z
        .number()
        .int()
        .min(1)
        .max(8)
        .default(3),
  });

export const readingUploadMetadataSchema =
  z.object({
    title: z
      .string()
      .trim()
      .min(
        1,
        "عنوان منبع نمی‌تواند خالی باشد.",
      )
      .max(
        160,
        "عنوان منبع بیش از حد طولانی است.",
      )
      .nullable()
      .default(null),

    languageCode: z
      .string()
      .trim()
      .min(2)
      .max(10)
      .default("en"),

    cefrLevel:
      readingCefrLevelSchema
        .nullable()
        .default(null),

    options:
      readingUploadOptionsSchema,
  });

export const readingUploadFileInfoSchema =
  z.object({
    receivedBytes: z
      .number()
      .int()
      .positive(),

    mimeType: z
      .string()
      .trim()
      .min(1),
  });

export const readingUploadResultSchema =
  z.object({
    resourceId: z
      .string()
      .trim()
      .min(1),

    title: z
      .string()
      .trim()
      .min(1),

    status:
      z.literal("processing"),

    processingStatus:
      readingProcessingStatusSchema,

    processingProgress: z
      .number()
      .min(0)
      .max(100),

    originalFilename: z
      .string()
      .trim()
      .min(1),

    sourceFileKind:
      readingSourceFileKindSchema,

    warnings: z
      .array(
        z.string().trim().min(1),
      )
      .default([]),

    upload:
      readingUploadFileInfoSchema,

    options:
      readingUploadOptionsSchema,

    createdAt:
      z.string().datetime(),
  });