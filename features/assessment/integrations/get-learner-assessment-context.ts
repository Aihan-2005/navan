import {
  getDashboardOverview,
} from "../../dashboard/api/get-dashboard-overview";

import type {
  AssessmentLearnerContext,
} from "../types/assessment-context.types";

import {
  createAssessmentContextFromDashboard,
} from "./dashboard-context.adapter";

export async function getLearnerAssessmentContext(): Promise<AssessmentLearnerContext> {
  const dashboard =
    await getDashboardOverview();

  return createAssessmentContextFromDashboard(
    dashboard,
  );
}