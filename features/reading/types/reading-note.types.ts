import type {
  z,
} from "zod";

import type {
  readingSavedItemInputSchema,
  readingSavedItemKindSchema,
  readingSavedItemSchema,
  readingSavedItemsCollectionSchema,
} from "../schemas/reading-note.schema";

export type ReadingSavedItemKind =
  z.infer<
    typeof readingSavedItemKindSchema
  >;

export type ReadingSavedItemInput =
  z.infer<
    typeof readingSavedItemInputSchema
  >;

export type ReadingSavedItem =
  z.infer<
    typeof readingSavedItemSchema
  >;

export type ReadingSavedItemsCollection =
  z.infer<
    typeof readingSavedItemsCollectionSchema
  >;