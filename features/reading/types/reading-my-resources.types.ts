import type {
  z,
} from "zod";

import type {
  readingMyResourceItemSchema,
  readingMyResourceSourceKindSchema,
  readingMyResourcesSchema,
  readingMyResourcesStatsSchema,
  readingMyResourceStatusSchema,
} from "../schemas/reading-my-resources.schema";

export type ReadingMyResourceSourceKind =
  z.infer<
    typeof readingMyResourceSourceKindSchema
  >;

export type ReadingMyResourceStatus =
  z.infer<
    typeof readingMyResourceStatusSchema
  >;

export type ReadingMyResourceItem =
  z.infer<
    typeof readingMyResourceItemSchema
  >;export type ReadingMyResourcesStats =
  z.infer<
    typeof readingMyResourcesStatsSchema
  >;

export type ReadingMyResources =
  z.output<
    typeof readingMyResourcesSchema
  >;

export type ReadingMyResourcesInput =
  z.input<
    typeof readingMyResourcesSchema
  >;