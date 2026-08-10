import { z } from "zod";

import {
  ASSESSMENT_CEFR_LEVELS,
  ASSESSMENT_DIFFICULTIES,
  ASSESSMENT_QUESTION_TYPES,
  ASSESSMENT_SKILLS,
  ASSESSMENT_SOURCE_FEATURES,
} from "../constants/assessment.constants";

export const assessmentSkillSchema =
  z.enum(
    ASSESSMENT_SKILLS,
  );

export const assessmentCefrLevelSchema =
  z.enum(
    ASSESSMENT_CEFR_LEVELS,
  );

export const assessmentDifficultySchema =
  z.enum(
    ASSESSMENT_DIFFICULTIES,
  );

export const assessmentQuestionTypeSchema =
  z.enum(
    ASSESSMENT_QUESTION_TYPES,
  );

export const assessmentSourceFeatureSchema =
  z.enum(
    ASSESSMENT_SOURCE_FEATURES,
  );

export const assessmentQuestionSourceSchema =
  z.object({
    feature:
      assessmentSourceFeatureSchema,

    sourceId: z
      .string()
      .trim()
      .min(1),

    resourceId: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .default(null),

    sectionId: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .default(null),

    href: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .default(null),
  });

export const assessmentOptionSchema =
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

export const assessmentOrderingItemSchema =
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

export const assessmentReadingPassageSchema =
  z.object({
    id: z
      .string()
      .trim()
      .min(1),

    title: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .default(null),

    text: z
      .string()
      .trim()
      .min(1),

    sourceLabel: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .default(null),
  });

const assessmentQuestionBaseSchema =
  z.object({
    id: z
      .string()
      .trim()
      .min(1),

    skill:
      assessmentSkillSchema,

    cefrLevel:
      assessmentCefrLevelSchema,

    difficulty:
      assessmentDifficultySchema,

    topic: z
      .string()
      .trim()
      .min(1),

    prompt: z
      .string()
      .trim()
      .min(1),

    instruction: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .default(null),

    points: z
      .number()
      .int()
      .positive()
      .max(20)
      .default(1),

    estimatedSeconds: z
      .number()
      .int()
      .positive()
      .max(600),

    source:
      assessmentQuestionSourceSchema
        .nullable()
        .default(null),

    tags: z
      .array(
        z
          .string()
          .trim()
          .min(1),
      )
      .default([]),
  });

const scoredQuestionBaseSchema =
  assessmentQuestionBaseSchema.extend(
    {
      explanation: z
        .string()
        .trim()
        .min(1),
    },
  );

export const multipleChoiceQuestionSchema =
  scoredQuestionBaseSchema.extend({
    type: z.literal(
      "multiple_choice",
    ),

    options: z
      .array(
        assessmentOptionSchema,
      )
      .min(2)
      .max(6),

    correctOptionId: z
      .string()
      .trim()
      .min(1),
  });

export const multipleSelectQuestionSchema =
  scoredQuestionBaseSchema.extend({
    type: z.literal(
      "multiple_select",
    ),

    options: z
      .array(
        assessmentOptionSchema,
      )
      .min(2)
      .max(8),

    correctOptionIds: z
      .array(
        z
          .string()
          .trim()
          .min(1),
      )
      .min(1),
  });

export const fillBlankQuestionSchema =
  scoredQuestionBaseSchema.extend({
    type: z.literal(
      "fill_blank",
    ),

    acceptedAnswers: z
      .array(
        z
          .string()
          .trim()
          .min(1),
      )
      .min(1),

    caseSensitive: z
      .boolean()
      .default(false),
  });

export const orderingQuestionSchema =
  scoredQuestionBaseSchema.extend({
    type: z.literal(
      "ordering",
    ),

    items: z
      .array(
        assessmentOrderingItemSchema,
      )
      .min(2)
      .max(8),

    correctOrderItemIds: z
      .array(
        z
          .string()
          .trim()
          .min(1),
      )
      .min(2),
  });

export const readingComprehensionQuestionSchema =
  scoredQuestionBaseSchema.extend({
    type: z.literal(
      "reading_comprehension",
    ),

    passage:
      assessmentReadingPassageSchema,

    options: z
      .array(
        assessmentOptionSchema,
      )
      .min(2)
      .max(6),

    correctOptionId: z
      .string()
      .trim()
      .min(1),
  });

export const listeningComprehensionQuestionSchema =
  scoredQuestionBaseSchema.extend({
    type: z.literal(
      "listening_comprehension",
    ),

    audioUrl: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .default(null),

    audioAssetId: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .default(null),

    transcript: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .default(null),

    options: z
      .array(
        assessmentOptionSchema,
      )
      .min(2)
      .max(6),

    correctOptionId: z
      .string()
      .trim()
      .min(1),
  });

export const shortTextQuestionSchema =
  assessmentQuestionBaseSchema.extend({
    type: z.literal(
      "short_text",
    ),

    minimumWords: z
      .number()
      .int()
      .nonnegative()
      .default(0),

    maximumWords: z
      .number()
      .int()
      .positive()
      .max(1000),

    referenceAnswer: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .default(null),

    evaluationCriteria: z
      .array(
        z
          .string()
          .trim()
          .min(1),
      )
      .min(1),

    explanation: z
      .string()
      .trim()
      .min(1),
  });

export const speakingResponseQuestionSchema =
  assessmentQuestionBaseSchema.extend({
    type: z.literal(
      "speaking_response",
    ),

    minimumSeconds: z
      .number()
      .int()
      .positive(),

    maximumSeconds: z
      .number()
      .int()
      .positive()
      .max(600),

    referenceText: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .default(null),

    evaluationCriteria: z
      .array(
        z
          .string()
          .trim()
          .min(1),
      )
      .min(1),

    explanation: z
      .string()
      .trim()
      .min(1),
  });

const assessmentQuestionUnionSchema =
  z.discriminatedUnion(
    "type",
    [
      multipleChoiceQuestionSchema,
      multipleSelectQuestionSchema,
      fillBlankQuestionSchema,
      orderingQuestionSchema,
      readingComprehensionQuestionSchema,
      listeningComprehensionQuestionSchema,
      shortTextQuestionSchema,
      speakingResponseQuestionSchema,
    ],
  );

function hasUniqueIds(
  ids: readonly string[],
): boolean {
  return (
    new Set(ids).size ===
    ids.length
  );
}

export const assessmentQuestionSchema =
  assessmentQuestionUnionSchema
    .superRefine(
      (
        question,
        context,
      ) => {
        switch (
          question.type
        ) {
          case "multiple_choice":
          case "reading_comprehension":
          case "listening_comprehension": {
            const optionIds =
              question.options.map(
                (option) =>
                  option.id,
              );

            if (
              !hasUniqueIds(
                optionIds,
              )
            ) {
              context.addIssue({
                code: "custom",

                path: [
                  "options",
                ],

                message:
                  "Question option IDs must be unique.",
              });
            }

            if (
              !optionIds.includes(
                question.correctOptionId,
              )
            ) {
              context.addIssue({
                code: "custom",

                path: [
                  "correctOptionId",
                ],

                message:
                  "correctOptionId must reference an existing option.",
              });
            }

            break;
          }

          case "multiple_select": {
            const optionIds =
              question.options.map(
                (option) =>
                  option.id,
              );

            if (
              !hasUniqueIds(
                optionIds,
              )
            ) {
              context.addIssue({
                code: "custom",

                path: [
                  "options",
                ],

                message:
                  "Question option IDs must be unique.",
              });
            }

            if (
              !hasUniqueIds(
                question.correctOptionIds,
              )
            ) {
              context.addIssue({
                code: "custom",

                path: [
                  "correctOptionIds",
                ],

                message:
                  "Correct option IDs must be unique.",
              });
            }

            const invalidCorrectId =
              question.correctOptionIds.find(
                (optionId) =>
                  !optionIds.includes(
                    optionId,
                  ),
              );

            if (
              invalidCorrectId
            ) {
              context.addIssue({
                code: "custom",

                path: [
                  "correctOptionIds",
                ],

                message:
                  "Every correct option ID must reference an existing option.",
              });
            }

            break;
          }

          case "fill_blank": {
            const normalizedAnswers =
              question.acceptedAnswers.map(
                (answer) =>
                  question.caseSensitive
                    ? answer
                    : answer.toLowerCase(),
              );

            if (
              !hasUniqueIds(
                normalizedAnswers,
              )
            ) {
              context.addIssue({
                code: "custom",

                path: [
                  "acceptedAnswers",
                ],

                message:
                  "Accepted answers must be unique.",
              });
            }

            break;
          }

          case "ordering": {
            const itemIds =
              question.items.map(
                (item) =>
                  item.id,
              );

            if (
              !hasUniqueIds(
                itemIds,
              )
            ) {
              context.addIssue({
                code: "custom",

                path: [
                  "items",
                ],

                message:
                  "Ordering item IDs must be unique.",
              });
            }

            if (
              !hasUniqueIds(
                question.correctOrderItemIds,
              )
            ) {
              context.addIssue({
                code: "custom",

                path: [
                  "correctOrderItemIds",
                ],

                message:
                  "Correct ordering IDs must be unique.",
              });
            }

            const hasSameLength =
              itemIds.length ===
              question
                .correctOrderItemIds
                .length;

            const containsAllItems =
              itemIds.every(
                (itemId) =>
                  question
                    .correctOrderItemIds
                    .includes(
                      itemId,
                    ),
              );

            if (
              !hasSameLength ||
              !containsAllItems
            ) {
              context.addIssue({
                code: "custom",

                path: [
                  "correctOrderItemIds",
                ],

                message:
                  "Correct order must contain every ordering item exactly once.",
              });
            }

            break;
          }

          case "short_text": {
            if (
              question.minimumWords >
              question.maximumWords
            ) {
              context.addIssue({
                code: "custom",

                path: [
                  "minimumWords",
                ],

                message:
                  "minimumWords cannot exceed maximumWords.",
              });
            }

            break;
          }

          case "speaking_response": {
            if (
              question.minimumSeconds >
              question.maximumSeconds
            ) {
              context.addIssue({
                code: "custom",

                path: [
                  "minimumSeconds",
                ],

                message:
                  "minimumSeconds cannot exceed maximumSeconds.",
              });
            }

            break;
          }
        }
      },
    );

/**
 * Client-safe question schemas.
 *
 * Answer keys, explanations and private
 * evaluation rubrics are intentionally
 * removed from the version sent while
 * an assessment attempt is active.
 */

export const multipleChoiceQuestionViewSchema =
  multipleChoiceQuestionSchema.omit({
    correctOptionId: true,
    explanation: true,
  });

export const multipleSelectQuestionViewSchema =
  multipleSelectQuestionSchema.omit({
    correctOptionIds: true,
    explanation: true,
  });

export const fillBlankQuestionViewSchema =
  fillBlankQuestionSchema.omit({
    acceptedAnswers: true,
    caseSensitive: true,
    explanation: true,
  });

export const orderingQuestionViewSchema =
  orderingQuestionSchema.omit({
    correctOrderItemIds: true,
    explanation: true,
  });

export const readingComprehensionQuestionViewSchema =
  readingComprehensionQuestionSchema.omit({
    correctOptionId: true,
    explanation: true,
  });

export const listeningComprehensionQuestionViewSchema =
  listeningComprehensionQuestionSchema.omit({
    transcript: true,
    correctOptionId: true,
    explanation: true,
  });

export const shortTextQuestionViewSchema =
  shortTextQuestionSchema.omit({
    referenceAnswer: true,
    evaluationCriteria: true,
    explanation: true,
  });

export const speakingResponseQuestionViewSchema =
  speakingResponseQuestionSchema.omit({
    referenceText: true,
    evaluationCriteria: true,
    explanation: true,
  });

export const assessmentQuestionViewSchema =
  z.discriminatedUnion(
    "type",
    [
      multipleChoiceQuestionViewSchema,
      multipleSelectQuestionViewSchema,
      fillBlankQuestionViewSchema,
      orderingQuestionViewSchema,
      readingComprehensionQuestionViewSchema,
      listeningComprehensionQuestionViewSchema,
      shortTextQuestionViewSchema,
      speakingResponseQuestionViewSchema,
    ],
  );