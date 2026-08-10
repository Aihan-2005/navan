import {
  ASSESSMENT_SKILLS,
} from "../constants/assessment.constants";

import {
  assessmentLearnerContextSchema,
} from "../schemas/assessment-context.schema";

import type {
  AssessmentLearnerContext,
  AssessmentLearnerSkillSignal,
} from "../types/assessment-context.types";

import type {
  DashboardOverview,
} from "../../dashboard/types/dashboard.types";

function getRecentScore(
  dashboard:
    DashboardOverview,
  skill:
    AssessmentLearnerSkillSignal["skill"],
): {
  score: number | null;
  evidenceCount: number;
} {
  const completedActivities =
    dashboard.recentActivities
      .filter(
        (activity) =>
          activity.skill ===
            skill &&
          activity.status ===
            "completed" &&
          activity.score !==
            null,
      )
      .sort(
        (
          firstActivity,
          secondActivity,
        ) =>
          new Date(
            secondActivity
              .occurredAt,
          ).getTime() -
          new Date(
            firstActivity
              .occurredAt,
          ).getTime(),
      );

  const latestActivity =
    completedActivities[0];

  return {
    score:
      latestActivity?.score ??
      null,

    evidenceCount:
      completedActivities.length,
  };
}

function createSkillSignal(
  dashboard:
    DashboardOverview,
  skill:
    AssessmentLearnerSkillSignal["skill"],
): AssessmentLearnerSkillSignal {
  const progress =
    dashboard.skillProgress.find(
      (item) =>
        item.skill === skill,
    );

  const recent =
    getRecentScore(
      dashboard,
      skill,
    );

  return {
    skill,

    score:
      progress?.score ??
      recent.score,

    previousScore:
      progress?.previousScore ??
      null,

    cefrLevel:
      progress?.cefrLevel ??
      null,

    completedActivities:
      progress
        ?.completedActivities ??
      0,

    totalPracticeMinutes:
      progress
        ?.totalPracticeMinutes ??
      0,

    recentScore:
      recent.score,

    recentEvidenceCount:
      recent.evidenceCount,
  };
}

export function createAssessmentContextFromDashboard(
  dashboard:
    DashboardOverview,
): AssessmentLearnerContext {
  const context = {
    userId:
      dashboard.user.id,

    targetLanguageCode:
      dashboard.user
        .targetLanguage.code,

    nativeLanguageCode:
      dashboard.user
        .nativeLanguage.code,

    currentCefrLevel:
      dashboard.user.cefrLevel,

    learningGoal:
      dashboard.user
        .learningGoal,

    skills:
      ASSESSMENT_SKILLS.map(
        (skill) =>
          createSkillSignal(
            dashboard,
            skill,
          ),
      ),

    review: {
      totalItems:
        dashboard.reviewQueue
          .totalItems,

      vocabularyCount:
        dashboard.reviewQueue
          .vocabularyCount,

      grammarCount:
        dashboard.reviewQueue
          .grammarCount,

      mistakeCount:
        dashboard.reviewQueue
          .mistakeCount,

      estimatedMinutes:
        dashboard.reviewQueue
          .estimatedMinutes,
    },

    recentCompletedActivityCount:
      dashboard.recentActivities.filter(
        (activity) =>
          activity.status ===
          "completed",
      ).length,

    generatedAt:
      new Date().toISOString(),
  };

  return assessmentLearnerContextSchema.parse(
    context,
  );
}