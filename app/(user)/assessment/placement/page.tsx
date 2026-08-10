import type {
  Metadata,
} from "next";

import {
  notFound,
} from "next/navigation";

import {
  getAssessmentDefinition,
} from "../../../../features/assessment/api/get-assessment-definition";

import {
  PlacementIntro,
} from "../../../../features/assessment/components/placement/placement-intro";

import {
  getLearnerAssessmentContext,
} from "../../../../features/assessment/integrations/get-learner-assessment-context";

export const metadata: Metadata = {
  title: "آزمون تعیین سطح",

  description:
    "آزمون تطبیقی تعیین سطح زبان انگلیسی.",
};

const PLACEMENT_ASSESSMENT_ID =
  "english-placement-foundation-v1";

export default async function PlacementPage() {
  const [
    assessment,
    learner,
  ] = await Promise.all([
    getAssessmentDefinition(
      PLACEMENT_ASSESSMENT_ID,
    ),

    getLearnerAssessmentContext(),
  ]);

  if (!assessment) {
    notFound();
  }

  return (
    <PlacementIntro
      assessment={assessment}
      learner={learner}
    />
  );
}