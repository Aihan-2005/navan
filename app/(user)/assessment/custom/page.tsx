import type {
  Metadata,
} from "next";

import {
  CustomAssessmentBuilder,
} from "../../../../features/assessment/components/custom/custom-assessment-builder";

import {
  getLearnerAssessmentContext,
} from "../../../../features/assessment/integrations/get-learner-assessment-context";

export const metadata: Metadata = {
  title:
    "ساخت آزمون سفارشی",

  description:
    "ساخت Quiz یا Exam سفارشی برای یک یا چند مهارت زبان.",
};

export default async function CustomAssessmentPage() {
  const learner =
    await getLearnerAssessmentContext();

  return (
    <CustomAssessmentBuilder
      learner={learner}
    />
  );
}