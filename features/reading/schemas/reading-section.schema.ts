import {
  z,
} from "zod";

import {
  readingCefrLevelSchema,
  readingSectionSummarySchema,
} from "./reading.schema";

export const readingTextBlockSchema =
  z.object({
    id: z
      .string()
      .trim()
      .min(1),

    order: z
      .number()
      .int()
      .positive(),

    text: z
      .string()
      .trim()
      .min(1),

    translation: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .default(null),

    note: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .default(null),

    /**
     * خلاصه مفهومی AI برای همین پاراگراف.
     *
     * Optional است تا Mock/Backend قدیمی
     * همچنان بدون Migration اجباری کار کند.
     */
    conceptSummary: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .optional(),
  });

export const readingVocabularyItemSchema =
  z.object({
    id: z
      .string()
      .trim()
      .min(1),

    term: z
      .string()
      .trim()
      .min(1),

    pronunciation: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .default(null),

    partOfSpeech: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .default(null),

    meaning: z
      .string()
      .trim()
      .min(1),

    contextualMeaning: z
      .string()
      .trim()
      .min(1),

    example: z
      .string()
      .trim()
      .min(1),

    exampleTranslation: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .default(null),

    isCore:
      z.boolean()
        .default(false),

    /**
     * مشخص می‌کند این واژه توسط AI
     * از کدام پاراگراف استخراج شده است.
     */
    sourceBlockId: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .optional(),
  });

export const readingGrammarExampleSchema =
  z.object({
    id: z
      .string()
      .trim()
      .min(1),

    source: z
      .string()
      .trim()
      .min(1),

    translation: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .default(null),
  });

export const readingGrammarPointSchema =
  z.object({
    id: z
      .string()
      .trim()
      .min(1),

    title: z
      .string()
      .trim()
      .min(1),

    explanation: z
      .string()
      .trim()
      .min(1),

    pattern: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .default(null),

    examples: z
      .array(
        readingGrammarExampleSchema,
      )
      .min(1),

    sourceBlockId: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .optional(),

    masteryTip: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .optional(),

    commonMistake: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .optional(),

    practicePrompt: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .optional(),
  });

export const readingExpressionRegisterSchema =
  z.enum([
    "casual",
    "neutral",
    "formal",
    "literary",
    "academic",
  ]);

export const readingExpressionItemSchema =
  z.object({
    id: z
      .string()
      .trim()
      .min(1),

    sourceBlockId: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .optional(),

    expression: z
      .string()
      .trim()
      .min(1),

    meaning: z
      .string()
      .trim()
      .min(1),

    usageNote: z
      .string()
      .trim()
      .min(1),

    example: z
      .string()
      .trim()
      .min(1),

    exampleTranslation: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .optional(),

    register:
      readingExpressionRegisterSchema
        .default("neutral"),

    isHighlighted:
      z.boolean()
        .default(false),
  });

export const readingComprehensionOptionSchema =
  z.object({
    id: z
      .string()
      .trim()
      .min(1),

    label: z
      .string()
      .trim()
      .min(1),
  });

export const readingComprehensionQuestionSchema =
  z
    .object({
      id: z
        .string()
        .trim()
        .min(1),

      prompt: z
        .string()
        .trim()
        .min(1),

      options: z
        .array(
          readingComprehensionOptionSchema,
        )
        .min(2),

      correctOptionId: z
        .string()
        .trim()
        .min(1),

      explanation: z
        .string()
        .trim()
        .min(1),
    })
    .superRefine(
      (
        question,
        context,
      ) => {
        const hasCorrectOption =
          question.options.some(
            (
              option,
            ) =>
              option.id ===
              question.correctOptionId,
          );

        if (
          !hasCorrectOption
        ) {
          context.addIssue({
            code:
              "custom",

            path: [
              "correctOptionId",
            ],

            message:
              "correctOptionId must reference one of the question options.",
          });
        }
      },
    );

export const readingSectionDetailSchema =
  readingSectionSummarySchema.extend({
    resourceId: z
      .string()
      .trim()
      .min(1),

    resourceTitle: z
      .string()
      .trim()
      .min(1),

    resourceAuthor: z
      .string()
      .trim()
      .min(1)
      .nullable(),

    languageCode: z
      .string()
      .trim()
      .min(2)
      .max(10),

    cefrLevel:
      readingCefrLevelSchema,

    audioUrl: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .default(null),

    previousSectionId: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .default(null),

    nextSectionId: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .default(null),

    content: z
      .array(
        readingTextBlockSchema,
      )
      .min(1),

    vocabulary: z
      .array(
        readingVocabularyItemSchema,
      )
      .default([]),

    grammarPoints: z
      .array(
        readingGrammarPointSchema,
      )
      .default([]),

    /**
     * Optional برای backward compatibility
     * با Section mockهای قبلی.
     */
    expressions: z
      .array(
        readingExpressionItemSchema,
      )
      .optional(),

    comprehensionQuestions: z
      .array(
        readingComprehensionQuestionSchema,
      )
      .default([]),
  });