import { z } from "zod";

export const customAudioProcessingStatusSchema = z.enum([
  "queued",
  "validating",
  "transcribing",
  "ready",
  "failed",
]);

export const customAudioUploadMetadataSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1)
    .max(120)
    .nullable()
    .default(null),

  languageCode: z
    .string()
    .trim()
    .regex(
      /^[a-z]{2}(?:-[A-Z]{2})?$/,
      "Invalid language code.",
    )
    .default("en"),
});

export const customAudioUploadResultSchema = z.object({
  jobId: z.string().trim().min(1),

  contentId: z
    .string()
    .trim()
    .min(1)
    .nullable(),

  sourceType: z.literal("user_upload"),

  title: z.string().trim().min(1),

  originalFilename: z.string().trim().min(1),
  mimeType: z.string().trim().min(1),
  sizeBytes: z.number().int().positive(),

  languageCode: z.string().trim().min(2).max(10),

  durationSeconds: z
    .number()
    .nonnegative()
    .nullable(),

  status: customAudioProcessingStatusSchema,

  warnings: z
    .array(z.string().trim().min(1))
    .default([]),

  createdAt: z.string().datetime(),
});

export const customAudioUrlImportRequestSchema = z.object({
  url: z
    .string()
    .trim()
    .url("لینک واردشده معتبر نیست.")
    .max(2_048),

  title: z
    .string()
    .trim()
    .min(1)
    .max(120)
    .nullable()
    .default(null),

  languageCode: z
    .string()
    .trim()
    .regex(
      /^[a-z]{2}(?:-[A-Z]{2})?$/,
      "Invalid language code.",
    )
    .default("en"),
});

export const customAudioUrlImportResultSchema = z.object({
  jobId: z.string().trim().min(1),

  contentId: z
    .string()
    .trim()
    .min(1)
    .nullable(),

  sourceType: z.literal("external_url"),

  title: z.string().trim().min(1),

  submittedUrl: z.string().url(),
  hostname: z.string().trim().min(1),

  languageCode: z.string().trim().min(2).max(10),

  durationSeconds: z
    .number()
    .nonnegative()
    .nullable(),

  status: customAudioProcessingStatusSchema,

  warnings: z
    .array(z.string().trim().min(1))
    .default([]),

  createdAt: z.string().datetime(),
});