import { z } from "zod";

export const listeningNoteFileKindSchema = z.enum([
  "text",
  "document",
  "image",
]);

export const listeningNoteExtractionStatusSchema = z.enum([
  "idle",
  "uploading",
  "extracting",
  "ready",
  "error",
]);

export const listeningNotesUploadResultSchema = z.object({
  id: z.string().trim().min(1),

  originalFilename: z.string().trim().min(1),
  mimeType: z.string().trim().min(1),
  sizeBytes: z.number().int().positive(),

  fileKind: listeningNoteFileKindSchema,

  extractedText: z.string().max(25_000),

  extractionConfidence: z
    .number()
    .min(0)
    .max(1)
    .nullable(),

  warnings: z
    .array(z.string().trim().min(1))
    .default([]),

  createdAt: z.string().datetime(),
});