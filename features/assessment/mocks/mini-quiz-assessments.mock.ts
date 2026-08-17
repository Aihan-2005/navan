import {
  assessmentDefinitionSchema,
} from "../schemas/assessment.schema";

import type {
  AssessmentSkill,
} from "../types/assessment-question.types";

import type {
  AssessmentDefinition,
} from "../types/assessment.types";

import {
  placementAssessmentMock,
} from "./placement-assessment.mock";

const CREATED_AT =
  "2026-08-17T00:00:00.000Z";

type MiniQuizDefinitionInput =
  Readonly<{
    id:
      string;

    slug:
      string;

    title:
      string;

    description:
      string;

    skill:
      AssessmentSkill;

    questionIds:
      readonly string[];

    estimatedMinutes:
      number;

    xpReward:
      number;
  }>;

function createMiniQuizDefinition({
  id,
  slug,
  title,description,
  skill,
  questionIds,
  estimatedMinutes,
  xpReward,
}: MiniQuizDefinitionInput): AssessmentDefinition {
  const questions =
    questionIds.map(
      (
        questionId,
      ) => {
        const question =
          placementAssessmentMock.questions.find(
            (
              candidate,
            ) =>
              candidate.id ===
              questionId,
          );

        if (!question) {
          throw new Error(
            `Mini quiz question not found: ${questionId}`,
          );
        }

        if (
          question.skill !==
          skill
        ) {
          throw new Error(
            `Mini quiz question ${questionId} does not belong to ${skill}.`,
          );
        }

        return question;
      },
    );

  return assessmentDefinitionSchema.parse(
    {
      id,

      slug,

      type:
        "mini_quiz",

      status:
        "published",
mode:
        "fixed",

      title,

      description,

      targetLanguageCode:
        "en",

      nativeLanguageCode:
        "fa",

      estimatedMinutes,

      questionCount:
        questions.length,

      passingScore:
        70,

      xpReward,

      skills: [
        skill,
      ],

      sections: [
        {
          id:
            `${id}-section`,

          title,

          description,

          order:
            1,

          skill,

          questionIds: [
            ...questionIds,
          ],

          estimatedMinutes,
        },
      ],

      questions,

      adaptiveConfig:
        null,

      version:
        1,

      createdAt:
        CREATED_AT,
         updatedAt:
        CREATED_AT,
    },
  );
}

export const grammarB1QuickCheckMock =
  createMiniQuizDefinition({
    id:
      "grammar-b1-quick-check",

    slug:
      "grammar-b1-quick-check",

    title:
      "Grammar Quick Check",

    description:
      "کوییز کوتاه گرامر با تمرکز روی زمان‌ها، شرطی‌ها و ترتیب زمانی سطح B1.",

    skill:
      "grammar",

    questionIds: [
      "placement-grammar-001",
      "placement-grammar-002",
      "placement-grammar-003",
      "placement-grammar-004",
    ],

    estimatedMinutes:
      5,

    xpReward:
      40,
  });

export const vocabularyB1ContextMock =
  createMiniQuizDefinition({
    id:
      "vocabulary-b1-context",

    slug:
      "vocabulary-b1-context",

    title:
      "Vocabulary in Context",

    description:
      "کوییز واژگان برای معنی، کاربرد واژه و تشخیص بهترین انتخاب در Context.",

    skill:
      "vocabulary",

    questionIds: [
      "placement-vocabulary-001",
       "placement-vocabulary-002",
      "placement-vocabulary-003",
      "placement-vocabulary-004",
    ],

    estimatedMinutes:
      5,

    xpReward:
      45,
  });

export const readingB1InferenceMock =
  createMiniQuizDefinition({
    id:
      "reading-b1-inference",

    slug:
      "reading-b1-inference",

    title:
      "Reading Inference Check",

    description:
      "ارزیابی کوتاه Main Idea، Detail و Inference با سؤال‌های Reading سطح B1.",

    skill:
      "reading",

    questionIds: [
      "placement-reading-001",
      "placement-reading-002",
      "placement-reading-003",
      "placement-reading-004",
    ],

    estimatedMinutes:
      7,
 xpReward:
      55,
  });

export const miniQuizAssessmentsMock:
  readonly AssessmentDefinition[] =
  [
    grammarB1QuickCheckMock,
    vocabularyB1ContextMock,
    readingB1InferenceMock,
  ];