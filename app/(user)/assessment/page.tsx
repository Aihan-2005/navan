import type {
  Metadata,
} from "next";

import {
  getAssessmentOverview,
} from "../../../features/assessment/api/get-assessment-overview";

import {
  AssessmentOverview,
} from "../../../features/assessment/components/overview/assessment-overview";

export const metadata: Metadata = {
  title: "ارزیابی سطح زبان",

  description:
    "آزمون تعیین سطح، Skill Assessment و کوییزهای کوتاه هوشمند.",
};

export default async function AssessmentPage() {
  const overview =
    await getAssessmentOverview();

  return (
    <AssessmentOverview
      overview={overview}
    />
  );
}