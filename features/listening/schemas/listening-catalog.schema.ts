import {
  z,
} from "zod";

import {
  cefrLevelSchema,
  listeningAccentSchema,
  listeningContentSummarySchema,
  listeningContentTypeSchema,
  listeningPracticeModeSchema,
  recentListeningActivitySchema,
} from "./listening.schema";

export const listeningLibrarySortSchema =
  z.enum([
    "recommended",
    "duration_asc",
    "duration_desc",
    "level_asc",
    "accuracy_desc",
  ]);

export const listeningLibraryQuerySchema =
  z.object({
    search:
      z
        .string()
        .trim()
        .max(120)
        .default(""),

    levels:
      z
        .array(
          cefrLevelSchema,
        )
        .default([]),

    accents:
      z
        .array(
          listeningAccentSchema,
        )
        .default([]),

    contentTypes:
      z
        .array(
          listeningContentTypeSchema,
        )
        .default([]),

    practiceModes:
      z
        .array(
          listeningPracticeModeSchema,
        )
        .default([]),

    maxDurationMinutes:
      z
        .number()
        .int()
        .positive()
        .max(180)
        .nullable()
        .default(null),

    sort:
      listeningLibrarySortSchema
        .default(
          "recommended",
        ),
  });

export const listeningLibraryResponseSchema =
  z.object({
    items:
      z.array(
        listeningContentSummarySchema,
      ),

    total:
      z
        .number()
        .int()
        .nonnegative(),
  });

export const listeningHistoryStatusSchema =
  z.enum([
    "completed",
    "analyzing",
    "failed",
  ]);

export const listeningHistoryItemSchema =
  recentListeningActivitySchema.extend({
    attemptId:
      z
        .string()
        .trim()
        .min(1)
        .nullable(),

    status:
      listeningHistoryStatusSchema
        .default(
          "completed",
        ),
  });

export const listeningHistoryResponseSchema =
  z.object({
    items:
      z.array(
        listeningHistoryItemSchema,
      ),

    total:
      z
        .number()
        .int()
        .nonnegative(),
  });
  