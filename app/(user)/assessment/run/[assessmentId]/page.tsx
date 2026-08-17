import type {
  Metadata,
} from "next";

import {
  notFound,
  redirect,
} from "next/navigation";

import {
  getAssessmentDefinition,
} from "../../../../../features/assessment/api/get-assessment-definition";

import {
  AssessmentRunner,
} from "../../../../../features/assessment/components/runner/assessment-runner";

import {
  createAssessmentRunnerSession,
} from "../../../../../features/assessment/engine/create-assessment-runner-session";

type AssessmentRunPageProps =
  Readonly<{
    params:
      Promise<{
        assessmentId:
          string;
      }>;
  }>;

export async function generateMetadata({
  params,
}: AssessmentRunPageProps): Promise<Metadata> {
  const {
    assessmentId,
  } =
    await params;

  const assessment =
    await getAssessmentDefinition(
      assessmentId,
    );

  if (!assessment) {
    return {
      title:
        "آزمون پیدا نشد",
    };
  }

  return {
    title:
      assessment.title,

    description:
      assessment.description,
  };
}export default async function AssessmentRunPage({
  params,
}: AssessmentRunPageProps) {
  const {
    assessmentId,
  } =
    await params;

  const assessment =
    await getAssessmentDefinition(
      assessmentId,
    );

  if (!assessment) {
    notFound();
  }

  /**
   * Placement مسیر Adaptive مستقلی دارد.
   * نباید آن را با Fixed Runner اجرا کنیم.
   */
  if (
    assessment.type ===
    "placement"
  ) {
    redirect(
      "/assessment/placement",
    );
  }

  const runnerSession =
    createAssessmentRunnerSession(
      assessment,
    );

  return (
    <AssessmentRunner
      assessment={
        runnerSession
      }
    />
  );
}