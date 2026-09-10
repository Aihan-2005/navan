import type {
  Metadata,
} from "next";

import {
  getAssessmentOverview,
} from "../../../features/assessment/api/get-assessment-overview";

import {
  AssessmentOverview,
} from "../../../features/assessment/components/overview/assessment-overview";

import {
  SkillAssessmentGrid,
} from "../../../features/assessment/components/overview/skill-assessment-grid";

export const metadata:
  Metadata = {
  title:
    "ارزیابی سطح زبان",

  description:
    "تعیین سطح تطبیقی، ارزیابی مهارت و کوییزهای کوتاه زبان.",
};

export default async function AssessmentPage() {
  const overview =
    await getAssessmentOverview();

  return (
    <>
      <AssessmentOverview
        overview={overview}
      />

      <SkillAssessmentGrid />
    </>
  );
}