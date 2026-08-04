import type { z } from "zod";

import type {
  customAudioProcessingStatusSchema,
  customAudioUploadMetadataSchema,
  customAudioUploadResultSchema,
  customAudioUrlImportRequestSchema,
  customAudioUrlImportResultSchema,
} from "../schemas/listening-custom-source.schema";

export type CustomAudioProcessingStatus = z.infer<
  typeof customAudioProcessingStatusSchema
>;

export type CustomAudioUploadMetadata = z.input<
  typeof customAudioUploadMetadataSchema
>;

export type CustomAudioUploadResult = z.infer<
  typeof customAudioUploadResultSchema
>;

export type CustomAudioUrlImportRequest = z.input<
  typeof customAudioUrlImportRequestSchema
>;

export type CustomAudioUrlImportResult = z.infer<
  typeof customAudioUrlImportResultSchema
>;

export type CustomListeningSourceResult =
  | CustomAudioUploadResult
  | CustomAudioUrlImportResult;

export type CustomSourceRequestStatus =
  | "idle"
  | "validating"
  | "uploading"
  | "submitting"
  | "success"
  | "error";