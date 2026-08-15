import {
  z,
} from "zod";

import {
  readingCefrLevelSchema,
} from "./reading.schema";

export const readingMyResourceSourceKindSchema =
  z.enum([
    "pdf",
    "docx",
    "link",
    "text",
    "image",
  ]);

export const readingMyResourceStatusSchema =
  z.enum([
    "ready",
    "processing",
    "failed",
  ]);

export const readingMyResourceItemSchema =
  z.object({
    id: z
      .string()
      .trim()
      .min(1),
title: z
      .string()
      .trim()
      .min(1),

    sourceKind:
      readingMyResourceSourceKindSchema,

    cefrLevel:
      readingCefrLevelSchema,

    status:
      readingMyResourceStatusSchema,

    progressPercent: z
      .number()
      .min(0)
      .max(100),

    analyzedVocabularyCount: z
      .number()
      .int()
      .nonnegative(),

    uploadedAt:
      z.string().datetime(),

    completedAt: z
      .string().datetime()
      .nullable(),

    href: z
      .string()
      .trim()
      .min(1)
      .nullable(),
  });

export const readingMyResourcesStatsSchema =
  z.object({
    totalResources: z
      .number()
      .int()
      .nonnegative(),

    completedResources: z
      .number()
      .int()
      .nonnegative(),

    analyzedVocabularyCount: z
      .number()
      .int()
      .nonnegative(),
  });

export const readingMyResourcesSchema =
  z.object({
    stats:
      readingMyResourcesStatsSchema,

    resources: z
      .array(
        readingMyResourceItemSchema,
      )
      .default([]),
  });