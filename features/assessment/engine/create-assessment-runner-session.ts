import {
  assessmentQuestionViewSchema,
} from "../schemas/assessment-question.schema";

import {
  assessmentRunnerSessionSchema,
} from "../schemas/assessment-runner.schema";

import type {
  AssessmentQuestion,
  AssessmentQuestionView,
} from "../types/assessment-question.types";

import type {
  AssessmentRunnerSession,
} from "../types/assessment-runner.types";

import type {
  AssessmentDefinition,
} from "../types/assessment.types";

function removePrivateQuestionFields(
  question:
    AssessmentQuestion,
): Record<
  string,
  unknown
> {
  const copy:
    Record<
      string,
      unknown
    > = {
    ...question,
  };

  switch (
    question.type
  ) {
    case "multiple_choice":
    case "reading_comprehension":
      delete copy.correctOptionId;
      delete copy.explanation;

      break;

    case "listening_comprehension":
      delete copy.correctOptionId;
      delete copy.explanation;

      /**
       * Transcript نباید قبل از پاسخ
       * در اختیار Client باشد.
       */
      delete copy.transcript;

      break; case "multiple_select":
      delete copy.correctOptionIds;
      delete copy.explanation;

      break;

    case "fill_blank":
      delete copy.acceptedAnswers;
      delete copy.caseSensitive;
      delete copy.explanation;

      break;

    case "ordering":
      delete copy.correctOrderItemIds;
      delete copy.explanation;

      break;

    case "short_text":
      delete copy.referenceAnswer;
      delete copy.evaluationCriteria;
      delete copy.explanation;

      break;

    case "speaking_response":
      delete copy.referenceText;
      delete copy.evaluationCriteria;
      delete copy.explanation;

      break;
  }

  return copy;
}

function createQuestionView(
  question:
    AssessmentQuestion,
): AssessmentQuestionView {
  const result =
    assessmentQuestionViewSchema.safeParse(
      removePrivateQuestionFields(
        question,
      ),
    );

  if (
    !result.success
  ) { console.error(
      "Failed to create client-safe assessment question:",
      result.error.flatten(),
    );

    throw new Error(
      `Unable to create safe view for question ${question.id}.`,
    );
  }

  return result.data;
}

function resolveTimeLimitMinutes(
  assessment:
    AssessmentDefinition,
): number | null {
  switch (
    assessment.type
  ) {
    case "mini_quiz":
      return Math.max(
        3,
        assessment.estimatedMinutes +
          2,
      );

    case "custom":
    case "skill_check":
    case "review":
      return assessment.estimatedMinutes;

    case "placement":
      /**
       * Placement تطبیقی است و زمان سخت
       * فعلاً برای آن اعمال نمی‌کنیم.
       */
      return null;
  }
}

export function createAssessmentRunnerSession(
  assessment:
    AssessmentDefinition,
): AssessmentRunnerSession {
  const payload = {
    assessmentId:
      assessment.id,

    title:
      assessment.title,

    description:
      assessment.description,

     assessmentType:
      assessment.type,

    targetLanguageCode:
      assessment.targetLanguageCode,

    estimatedMinutes:
      assessment.estimatedMinutes,

    timeLimitMinutes:
      resolveTimeLimitMinutes(
        assessment,
      ),

    questionCount:
      assessment.questionCount,

    xpReward:
      assessment.xpReward,

    skills: [
      ...assessment.skills,
    ],

    sections:
      [...assessment.sections]
        .sort(
          (
            first,
            second,
          ) =>
            first.order -
            second.order,
        )
        .map(
          (
            section,
          ) => ({
            id:
              section.id,

            title:
              section.title,

            skill:
              section.skill,

            questionIds: [
              ...section.questionIds,
            ],
          }),
        ),

    questions:
      assessment.questions.map(
       createQuestionView,
      ),

    allowSkip:
      true,

    showExplanationsAfterSubmit:
      true,
  };

  const result =
    assessmentRunnerSessionSchema.safeParse(
      payload,
    );

  if (
    !result.success
  ) {
    console.error(
      "Invalid assessment runner session:",
      result.error.flatten(),
    );

    throw new Error(
      "Assessment runner session is invalid.",
    );
  }

  return result.data;
}