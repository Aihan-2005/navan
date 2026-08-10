import {
  assessmentMiniQuizzesMock,
} from "../mocks/assessment-overview.mock";

import {
  assessmentOverviewSchema,
} from "../schemas/assessment-overview.schema";

import type {
  AssessmentOverview,
} from "../types/assessment-overview.types";

import {
  getLearnerAssessmentContext,
} from "../integrations/get-learner-assessment-context";

import {
  getAssessmentDefinition,
} from "./get-assessment-definition";

const PLACEMENT_ASSESSMENT_ID =
  "english-placement-foundation-v1";

export async function getAssessmentOverview(): Promise<AssessmentOverview> {
  const [
    learner,
    placementAssessment,
  ] = await Promise.all([
    getLearnerAssessmentContext(),

    getAssessmentDefinition(
      PLACEMENT_ASSESSMENT_ID,
    ),
  ]);

  if (!placementAssessment) {
    throw new Error(
      "Placement assessment definition was not found.",
    );
  }

  const recommendedStartingLevel =
    learner.currentCefrLevel ??
    placementAssessment
      .adaptiveConfig
      ?.startingCefrLevel ??
    null;

  const payload = {
    learner,

    placement: {
      assessmentId:
        placementAssessment.id,

      title:
        placementAssessment.title,

      description:
        placementAssessment
          .description,

      estimatedMinutes:
        placementAssessment
          .estimatedMinutes,

      questionCount:
        placementAssessment
          .questionCount,

      mode:
        placementAssessment.mode,

      skills:
        placementAssessment.skills,

      recommendedStartingLevel,

      href:
        "/assessment/placement",
    },

    miniQuizzes:
      assessmentMiniQuizzesMock,

    generatedAt:
      new Date().toISOString(),
  };

  const result =
    assessmentOverviewSchema.safeParse(
      payload,
    );

  if (!result.success) {
    console.error(
      "Invalid Assessment overview:",
      result.error.flatten(),
    );

    throw new Error(
      "Assessment overview payload is invalid.",
    );
  }

  return result.data;
}