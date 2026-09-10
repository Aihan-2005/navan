import type {
  Metadata,
} from "next";

import {
  notFound,
} from "next/navigation";

import {
  getAssessmentDefinition,
} from "../../../../../features/assessment/api/get-assessment-definition";

import {
  AdaptivePlacementRunner,
} from "../../../../../features/assessment/components/placement/adaptive-placement-runner";

export const metadata:
  Metadata = {
  title:
    "تعیین سطح تطبیقی",

  description:
    "آزمون تطبیقی تعیین سطح زبان انگلیسی.",
};

const PLACEMENT_ASSESSMENT_ID =
  "english-placement-foundation-v1";

export default async function AdaptivePlacementRunPage() {
  const assessment =
    await getAssessmentDefinition(
      PLACEMENT_ASSESSMENT_ID,
    );

  if (
    !assessment ||
    assessment.type !==
      "placement" ||
    assessment.mode !==
      "adaptive"
  ) {
    notFound();
  }

  return (
    <AdaptivePlacementRunner
      assessmentId={
        assessment.id
      }
      title={
        assessment.title
      }
    />
  );
}