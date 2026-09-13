import type {
  z,
} from "zod";

import type {
  listeningHistoryItemSchema,
  listeningHistoryResponseSchema,
  listeningHistoryStatusSchema,
  listeningLibraryQuerySchema,
  listeningLibraryResponseSchema,
  listeningLibrarySortSchema,
} from "../schemas/listening-catalog.schema";

export type ListeningLibrarySort =
  z.infer<
    typeof listeningLibrarySortSchema
  >;

export type ListeningLibraryQueryInput =
  z.input<
    typeof listeningLibraryQuerySchema
  >;

export type ListeningLibraryQuery =
  z.output<
    typeof listeningLibraryQuerySchema
  >;

export type ListeningLibraryResponse =
  z.infer<
    typeof listeningLibraryResponseSchema
  >;

export type ListeningHistoryStatus =
  z.infer<
    typeof listeningHistoryStatusSchema
  >;

export type ListeningHistoryItem =
  z.infer<
    typeof listeningHistoryItemSchema
  >;

export type ListeningHistoryResponse =
  z.infer<
    typeof listeningHistoryResponseSchema
  >;