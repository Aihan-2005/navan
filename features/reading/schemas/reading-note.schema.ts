import {
  z,
} from "zod";

export const readingSavedItemKindSchema =
  z.enum([
    "vocabulary",
    "meaning",
    "educational_note",
    "grammar",
    "expression",
  ]);

const readingSavedItemBaseSchema =
  z.object({
    id: z
      .string()
      .trim()
      .min(1),

    kind:
      readingSavedItemKindSchema,

    resourceId: z
      .string()
      .trim()
      .min(1),

    resourceTitle: z
      .string()
      .trim()
      .min(1),

    sectionId: z
      .string()
      .trim()
      .min(1),

    sectionTitle: z
      .string()
      .trim()
      .min(1),

    blockId: z
      .string()
      .trim()
      .min(1)
      .nullable(),

    title: z
      .string()
      .trim()
      .min(1),

    content: z
      .string()
      .trim()
      .min(1),

    secondaryText: z
      .string()
      .trim()
      .min(1)
      .nullable(),

    href: z
      .string()
      .trim()
      .min(1),
  });

export const readingSavedItemInputSchema =
  readingSavedItemBaseSchema;

export const readingSavedItemSchema =
  readingSavedItemBaseSchema.extend({
    savedAt:
      z.string().datetime(),
  });

export const readingSavedItemsCollectionSchema =
  z.object({
    version:
      z.literal(1),

    items: z
      .array(
        readingSavedItemSchema,
      ),
  });