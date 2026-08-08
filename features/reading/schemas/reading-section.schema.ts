import { z } from "zod";

import {readingCefrLevelSchema,readingSectionSummarySchema,} from "./reading.schema";

/**

A single paragraph or text block displayed inside

the interactive reading workspace.*/export const readingTextBlockSchema = z.object({id: z.string().trim().min(1),

order: z.number().int().positive(),

text: z.string().trim().min(1),

translation: z.string().trim().min(1).nullable().default(null),

note: z.string().trim().min(1).nullable().default(null),});

/**

A vocabulary item extracted from the reading section.*/export const readingVocabularyItemSchema = z.object({id: z.string().trim().min(1),

term: z.string().trim().min(1),

pronunciation: z.string().trim().min(1).nullable().default(null),

partOfSpeech: z.string().trim().min(1).nullable().default(null),

meaning: z.string().trim().min(1),

contextualMeaning: z.string().trim().min(1),

example: z.string().trim().min(1),

exampleTranslation: z.string().trim().min(1).nullable().default(null),

isCore: z.boolean().default(false),});

/**

An example sentence used by a grammar explanation.*/export const readingGrammarExampleSchema = z.object({id: z.string().trim().min(1),

source: z.string().trim().min(1),

translation: z.string().trim().min(1).nullable().default(null),});

/**

A grammar concept detected inside the reading text.*/export const readingGrammarPointSchema = z.object({id: z.string().trim().min(1),

title: z.string().trim().min(1),

explanation: z.string().trim().min(1),

pattern: z.string().trim().min(1).nullable().default(null),

examples: z.array(readingGrammarExampleSchema).min(1),});

/**

A selectable answer inside a comprehension question.*/export const readingComprehensionOptionSchema = z.object({id: z.string().trim().min(1),

label: z.string().trim().min(1),});

/**

A multiple-choice reading comprehension question.



The refinement ensures that correctOptionId points

to one of the question's own options.*/export const readingComprehensionQuestionSchema = z.object({id: z.string().trim().min(1),

prompt: z.string().trim().min(1),

options: z.array(readingComprehensionOptionSchema,).min(2),

correctOptionId: z.string().trim().min(1),

explanation: z.string().trim().min(1),}).superRefine((question,context,) => {const hasCorrectOption =question.options.some((option) =>option.id ===question.correctOptionId,);

if (!hasCorrectOption) {context.addIssue({code: "custom",

   path: [
     "correctOptionId",
   ],

   message:
     "correctOptionId must reference one of the question options.",
 });

}},);

/**

Complete data contract used by the interactive

reading workspace route.*/export const readingSectionDetailSchema =readingSectionSummarySchema.extend({resourceId: z.string().trim().min(1),

resourceTitle: z.string().trim().min(1),

resourceAuthor: z.string().trim().min(1).nullable(),

languageCode: z.string().trim().min(2).max(10),

cefrLevel:readingCefrLevelSchema,

audioUrl: z.string().trim().min(1).nullable().default(null),

previousSectionId: z.string().trim().min(1).nullable().default(null),

nextSectionId: z.string().trim().min(1).nullable().default(null),

content: z.array(readingTextBlockSchema,).min(1),

vocabulary: z.array(readingVocabularyItemSchema,).default([]),

grammarPoints: z.array(readingGrammarPointSchema,).default([]),

comprehensionQuestions: z.array(readingComprehensionQuestionSchema,).default([]),});