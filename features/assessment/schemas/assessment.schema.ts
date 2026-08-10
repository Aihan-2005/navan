import { z } from "zod";

import {
  ASSESSMENT_MODES,
  ASSESSMENT_STATUSES,
  ASSESSMENT_TYPES,
} from "../constants/assessment.constants";

import {
  assessmentCefrLevelSchema,
  assessmentDifficultySchema,
  assessmentQuestionSchema,
  assessmentSkillSchema,
} from "./assessment-question.schema";

export const assessmentTypeSchema =
  z.enum(
    ASSESSMENT_TYPES,
  );

export const assessmentModeSchema =
  z.enum(
    ASSESSMENT_MODES,
  );

export const assessmentStatusSchema =
  z.enum(
    ASSESSMENT_STATUSES,
  );

export const assessmentAdaptiveConfigSchema =
  z.object({
    startingCefrLevel:
      assessmentCefrLevelSchema,

    initialDifficulty:
      assessmentDifficultySchema
        .default("medium"),

    minimumQuestions: z
      .number()
      .int()
      .positive(),

    maximumQuestions: z
      .number()
      .int()
      .positive(),

    promoteAfterCorrectStreak: z
      .number()
      .int()
      .positive()
      .default(2),

    demoteAfterIncorrectStreak: z
      .number()
      .int()
      .positive()
      .default(2),

    targetConfidence: z
      .number()
      .min(0)
      .max(100)
      .default(85),
  })
  .superRefine(
    (
      config,
      context,
    ) => {
      if (
        config.minimumQuestions >
        config.maximumQuestions
      ) {
        context.addIssue({
          code: "custom",

          path: [
            "minimumQuestions",
          ],

          message:
            "minimumQuestions cannot exceed maximumQuestions.",
        });
      }
    },
  );

export const assessmentSectionSchema =
  z.object({
    id: z
      .string()
      .trim()
      .min(1),

    title: z
      .string()
      .trim()
      .min(1),

    description: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .default(null),

    order: z
      .number()
      .int()
      .positive(),

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

    estimatedMinutes: z
      .number()
      .int()
      .positive(),
  });

export const assessmentDefinitionSchema =
  z
    .object({
      id: z
        .string()
        .trim()
        .min(1),

      slug: z
        .string()
        .trim()
        .min(1)
        .regex(
          /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
          "Assessment slug must be kebab-case.",
        ),

      type:
        assessmentTypeSchema,

      status:
        assessmentStatusSchema,

      mode:
        assessmentModeSchema,

      title: z
        .string()
        .trim()
        .min(1),

      description: z
        .string()
        .trim()
        .min(1),

      targetLanguageCode: z
        .string()
        .trim()
        .min(2)
        .max(10),

      nativeLanguageCode: z
        .string()
        .trim()
        .min(2)
        .max(10)
        .nullable()
        .default(null),

      estimatedMinutes: z
        .number()
        .int()
        .positive(),

      questionCount: z
        .number()
        .int()
        .positive(),

      passingScore: z
        .number()
        .min(0)
        .max(100)
        .nullable()
        .default(null),

      xpReward: z
        .number()
        .int()
        .nonnegative()
        .default(0),

      skills: z
        .array(
          assessmentSkillSchema,
        )
        .min(1),

      sections: z
        .array(
          assessmentSectionSchema,
        )
        .min(1),

      questions: z
        .array(
          assessmentQuestionSchema,
        )
        .min(1),

      adaptiveConfig:
        assessmentAdaptiveConfigSchema
          .nullable()
          .default(null),

      version: z
        .number()
        .int()
        .positive(),

      createdAt:
        z.string().datetime(),

      updatedAt:
        z.string().datetime(),
    })
    .superRefine(
      (
        assessment,
        context,
      ) => {
        if (
          assessment.questionCount !==
          assessment.questions.length
        ) {
          context.addIssue({
            code: "custom",

            path: [
              "questionCount",
            ],

            message:
              "questionCount must equal the number of questions.",
          });
        }

        const questionIds =
          assessment.questions.map(
            (question) =>
              question.id,
          );

        if (
          new Set(questionIds)
            .size !==
          questionIds.length
        ) {
          context.addIssue({
            code: "custom",

            path: [
              "questions",
            ],

            message:
              "Question IDs must be unique.",
          });
        }

        const sectionIds =
          assessment.sections.map(
            (section) =>
              section.id,
          );

        if (
          new Set(sectionIds)
            .size !==
          sectionIds.length
        ) {
          context.addIssue({
            code: "custom",

            path: [
              "sections",
            ],

            message:
              "Section IDs must be unique.",
          });
        }

        const sectionOrders =
          assessment.sections.map(
            (section) =>
              section.order,
          );

        if (
          new Set(sectionOrders)
            .size !==
          sectionOrders.length
        ) {
          context.addIssue({
            code: "custom",

            path: [
              "sections",
            ],

            message:
              "Section orders must be unique.",
          });
        }

        const assignedQuestionIds:
          string[] = [];

        assessment.sections.forEach(
          (
            section,
            sectionIndex,
          ) => {
            section.questionIds.forEach(
              (
                questionId,
              ) => {
                const question =
                  assessment.questions.find(
                    (
                      candidate,
                    ) =>
                      candidate.id ===
                      questionId,
                  );

                if (!question) {
                  context.addIssue({
                    code: "custom",

                    path: [
                      "sections",
                      sectionIndex,
                      "questionIds",
                    ],

                    message:
                      `Unknown question ID: ${questionId}`,
                  });

                  return;
                }

                if (
                  question.skill !==
                  section.skill
                ) {
                  context.addIssue({
                    code: "custom",

                    path: [
                      "sections",
                      sectionIndex,
                      "skill",
                    ],

                    message:
                      `Question ${questionId} does not match section skill.`,
                  });
                }

                assignedQuestionIds.push(
                  questionId,
                );
              },
            );

            if (
              !assessment.skills.includes(
                section.skill,
              )
            ) {
              context.addIssue({
                code: "custom",

                path: [
                  "sections",
                  sectionIndex,
                  "skill",
                ],

                message:
                  "Section skill must exist in assessment skills.",
              });
            }
          },
        );

        if (
          new Set(
            assignedQuestionIds,
          ).size !==
          assignedQuestionIds.length
        ) {
          context.addIssue({
            code: "custom",

            path: [
              "sections",
            ],

            message:
              "A question cannot belong to multiple sections.",
          });
        }

        const unassignedQuestion =
          questionIds.find(
            (questionId) =>
              !assignedQuestionIds.includes(
                questionId,
              ),
          );

        if (
          unassignedQuestion
        ) {
          context.addIssue({
            code: "custom",

            path: [
              "sections",
            ],

            message:
              `Question ${unassignedQuestion} is not assigned to a section.`,
          });
        }

        if (
          assessment.mode ===
            "adaptive" &&
          !assessment.adaptiveConfig
        ) {
          context.addIssue({
            code: "custom",

            path: [
              "adaptiveConfig",
            ],

            message:
              "Adaptive assessments require adaptiveConfig.",
          });
        }

        if (
          assessment.mode ===
            "fixed" &&
          assessment.adaptiveConfig
        ) {
          context.addIssue({
            code: "custom",

            path: [
              "adaptiveConfig",
            ],

            message:
              "Fixed assessments must not define adaptiveConfig.",
          });
        }

        if (
          assessment.adaptiveConfig &&
          assessment
            .adaptiveConfig
            .maximumQuestions >
            assessment.questions
              .length
        ) {
          context.addIssue({
            code: "custom",

            path: [
              "adaptiveConfig",
              "maximumQuestions",
            ],

            message:
              "maximumQuestions cannot exceed available questions.",
          });
        }
      },
    );