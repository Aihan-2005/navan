import type { z } from "zod";

import type {
  readingUploadAnalysisModeSchema,
  readingUploadMetadataSchema,
  readingUploadOptionsSchema,
  readingUploadResultSchema,
  readingUploadSectionLengthSchema,
} from "../schemas/reading-upload.schema";

export type ReadingUploadAnalysisMode =
  z.infer<
    typeof readingUploadAnalysisModeSchema
  >;

export type ReadingUploadSectionLength =
  z.infer<
    typeof readingUploadSectionLengthSchema
  >;

export type ReadingUploadOptions =
  z.output<
    typeof readingUploadOptionsSchema
  >;

export type ReadingUploadMetadata =
  z.output<
    typeof readingUploadMetadataSchema
  >;

export type ReadingUploadResult =
  z.output<
    typeof readingUploadResultSchema
  >;

export type ReadingUploadRequestOptions =
  Readonly<{
    signal?: AbortSignal;

    onProgress?: (
      progressPercent: number,
    ) => void;
  }>;