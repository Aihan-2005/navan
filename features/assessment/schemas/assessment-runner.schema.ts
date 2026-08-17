import {
  z,
} from "zod";

import {
  assessmentAnswerPayloadSchema,
} from "./assessment-attempt.schema";

import {
  assessmentQuestionTypeSchema,
  assessmentQuestionViewSchema,
  assessmentSkillSchema,
} from "./assessment-question.schema";

import {
  assessmentResultSchema,
} from "./assessment-result.schema";

import {
  assessmentTypeSchema,
} from "./assessment.schema";

export const assessmentRunnerSectionSchema =
  z.object({
    id: z
      .string()
      .trim()
      .min(1),

    title: z
      .string()
      .trim()
      .min(1),

    skill:
      assessmentSkillSchema,

    questionIds: z
      .array(
        z
          .string()
          .trim()
          .min(1),
      )
      .min(1),
  });

export const assessmentRunnerSessionSchema =
  z.object({
    assessmentId: z
      .string()
      .trim()
      .min(1),

    title: z.string()
      .trim()
      .min(1),

    description: z
      .string()
      .trim()
      .min(1),

    assessmentType:
      assessmentTypeSchema,

    targetLanguageCode: z
      .string()
      .trim()
      .min(2)
      .max(10),

    estimatedMinutes: z
      .number()
      .int()
      .positive(),

    timeLimitMinutes: z
      .number()
      .int()
      .positive()
      .nullable(),

    questionCount: z
      .number()
      .int()
      .positive(),

    xpReward: z
      .number()
      .int()
      .nonnegative(),

    skills: z
      .array(
        assessmentSkillSchema,
      )
      .min(1),

    sections: z
      .array(
        assessmentRunnerSectionSchema,
      )
      .min(1),

    questions:z
      .array(
        assessmentQuestionViewSchema,
      )
      .min(1),

    allowSkip:
      z.boolean(),

    showExplanationsAfterSubmit:
      z.boolean(),
  })
  .superRefine(
    (
      session,
      context,
    ) => {
      if (
        session.questionCount !==
        session.questions.length
      ) {
        context.addIssue({
          code:
            "custom",

          path: [
            "questionCount",
          ],

          message:
            "questionCount must match questions length.",
        });
      }

      const questionIds =
        session.questions.map(
          (
            question,
          ) =>
       question.id,
        );

      session.sections.forEach(
        (
          section,
          sectionIndex,
        ) => {
          section.questionIds.forEach(
            (
              questionId,
            ) => {
              if (
                !questionIds.includes(
                  questionId,
                )
              ) {
                context.addIssue({
                  code:
                    "custom",

                  path: [
                    "sections",
                    sectionIndex,
                    "questionIds",
                  ],

                  message:
                    `Unknown question ID: ${questionId}`,
                });
              }
            },
          );
        },
      );
    },
  );

export const assessmentRunnerAnswerEntrySchema =
  z.object({
    questionId: z
      .string()
      .trim()
      .min(1),

    payload:
      assessmentAnswerPayloadSchema,
  });

export const assessmentRunnerDraftSchema =
  z.object({
    assessmentId: z
      .string()
      .trim()
      .min(1),

    attemptId: z
      .string()
      .trim()
      .min(1),

    startedAt:
      z.string().datetime(),

    currentQuestionIndex: z
      .number()
      .int()
      .nonnegative(),

    answers: z
      .array(
        assessmentRunnerAnswerEntrySchema,
      )
      .default([]),

    flaggedQuestionIds: z
      .array(
        z
          .string()
          .trim()
          .min(1),
      )
      .default([]),

    updatedAt:
      z.string().datetime(),
  });

export const assessmentSubmissionSchema =
  z.object({
    assessmentId: z
      .string()
      .trim()
      .min(1),

    attemptId: z
      .string()
      .trim()
      .min(1),

    elapsedSeconds: z
      .number()
      .int()
      .nonnegative(),

    answers: z .array(
        assessmentRunnerAnswerEntrySchema,
      ),

    flaggedQuestionIds: z
      .array(
        z
          .string()
          .trim()
          .min(1),
      )
      .default([]),
  });

export const assessmentQuestionReviewSchema =
  z.object({
    questionId: z
      .string()
      .trim()
      .min(1),

    questionType:
      assessmentQuestionTypeSchema,

    skill:
      assessmentSkillSchema,

    prompt: z
      .string()
      .trim()
      .min(1),

    isCorrect: z
      .boolean()
      .nullable(),

    earnedPoints: z
      .number()
      .nonnegative()
      .nullable(),

    maximumPoints: z
      .number()
      .positive(),

    submittedAnswerLabel: z
      .string()
      .nullable(),

    correctAnswerLabel: z
      .string()
      .nullable(),

    feedback: z .string()
      .trim()
      .min(1),

    explanation: z
      .string()
      .trim()
      .min(1)
      .nullable(),
  });

export const assessmentSubmissionResultSchema =
  z.object({
    result:
      assessmentResultSchema,

    review: z
      .array(
        assessmentQuestionReviewSchema,
      ),
  });