import {
  ASSESSMENT_SKILL_LABELS,
} from "../constants/assessment.constants";

import {
  assessmentSubmissionResultSchema,
} from "../schemas/assessment-runner.schema";

import type {
  AssessmentSubmissionResult,
} from "../types/assessment-runner.types";

export function normalizeAssessmentSubmissionResult(
  submission:
    AssessmentSubmissionResult,
): AssessmentSubmissionResult {
  const pendingSkills =
    new Set(
      submission.result
        .skillScores
        .filter(
          (skill) =>
            skill.totalCount ===
            0,
        )
        .map(
          (skill) =>
            skill.skill,
        ),
    );

  const hasObjectiveEvidence =
    submission.result
      .skillScores
      .some(
        (skill) =>
          skill.totalCount >
          0,
      );

  const pendingReviewCount =
    submission.review.filter(
      (review) =>
        review.isCorrect ===
          null &&
        review.submittedAnswerLabel !==
          null,
    ).length;

  const shouldKeepInsight = (
    relatedSkill:
      (typeof submission.result.strengths)[number]["relatedSkill"],
  ): boolean => {
    return (
      relatedSkill ===
        null ||
      !pendingSkills.has(
        relatedSkill,
      )
    );
  };

  const strengths =
    submission.result
      .strengths
      .filter(
        (insight) =>
          shouldKeepInsight(
            insight.relatedSkill,
          ),
      );

  const weaknesses =
    submission.result
      .weaknesses
      .filter(
        (insight) =>
          shouldKeepInsight(
            insight.relatedSkill,
          ),
      );

  const recommendations =
    submission.result
      .recommendations
      .filter(
        (insight) =>
          shouldKeepInsight(
            insight.relatedSkill,
          ),
      );

  const recommendedActions =
    submission.result
      .recommendedActions
      .filter(
        (action) =>
          action.skill ===
            null ||
          !pendingSkills.has(
            action.skill,
          ),
      );

  const pendingSkillLabels =
    submission.result
      .skillScores
      .filter(
        (skill) =>
          pendingSkills.has(
            skill.skill,
          ),
      )
      .map(
        (skill) =>
          ASSESSMENT_SKILL_LABELS[
            skill.skill
          ],
      );

  let aiSummary =
    submission.result.aiSummary;

  if (
    !hasObjectiveEvidence &&
    pendingReviewCount > 0
  ) {
    aiSummary =
      `پاسخ‌های ${pendingSkillLabels.join(
        " و ",
      )} با موفقیت ثبت شدند. نتیجه عددی این بخش تا انجام تحلیل تکمیلی نمایش داده نمی‌شود.`;
  } else if (
    pendingSkillLabels.length >
    0
  ) {
    aiSummary =
      `${
        aiSummary ??
        "بخش قابل امتیازدهی آزمون تحلیل شد."
      } نتیجه ${pendingSkillLabels.join(
        " و ",
      )} پس از تحلیل تکمیلی اضافه می‌شود.`;
  }

  return assessmentSubmissionResultSchema.parse(
    {
      ...submission,

      result: {
        ...submission.result,

        strengths,

        weaknesses,

        recommendations,

        recommendedActions,

        aiSummary,
      },
    },
  );
}