import {
  miniQuizAssessmentsMock,
} from "../mocks/mini-quiz-assessments.mock";

import {
  placementAssessmentMock,
} from "../mocks/placement-assessment.mock";

import {
  assessmentDefinitionSchema,
} from "../schemas/assessment.schema";

import type {
  AssessmentDefinition,
} from "../types/assessment.types";

const ASSESSMENTS_ENDPOINT =
  "/api/v1/assessments";

function shouldUseMockData(): boolean {
  return (
    process.env.USE_MOCKS !==
    "false"
  );
}

function getApiBaseUrl(): string {
  const apiBaseUrl =
    process.env.API_BASE_URL
      ?.trim();

  if (!apiBaseUrl) {
    throw new Error(
      "API_BASE_URL is required when USE_MOCKS is disabled.",
    );
  }

  try {
    return new URL(
      apiBaseUrl,
    ).toString();
  } catch {
    throw new Error(
      "API_BASE_URL is not a valid URL.",
    );
  }
}

function parseAssessmentDefinition(
  payload:
    unknown,
): AssessmentDefinition {
  const result =
    assessmentDefinitionSchema.safeParse(
      payload,
    );

  if (!result.success
  ) {
    console.error(
      "Invalid Assessment definition:",
      result.error.flatten(),
    );

    throw new Error(
      "Assessment definition payload is invalid.",
    );
  }

  return result.data;
}

function findMockAssessment(
  identifier:
    string,
): AssessmentDefinition | null {
  const assessments = [
    placementAssessmentMock,
    ...miniQuizAssessmentsMock,
  ];

  const assessment =
    assessments.find(
      (
        candidate,
      ) =>
        candidate.id ===
          identifier ||
        candidate.slug ===
          identifier,
    );

  return assessment
    ? parseAssessmentDefinition(
        assessment,
      )
    : null;
}

export async function getAssessmentDefinition(
  assessmentIdOrSlug:
    string,
): Promise<AssessmentDefinition | null> {
  const identifier =
    assessmentIdOrSlug.trim();

  if (!identifier) {
    return null;
  }

  if (
    shouldUseMockData()
  ) { return findMockAssessment(
      identifier,
    );
  }

  const requestUrl =
    new URL(
      `${ASSESSMENTS_ENDPOINT}/${encodeURIComponent(
        identifier,
      )}`,
      getApiBaseUrl(),
    );

  const response =
    await fetch(
      requestUrl,
      {
        method:
          "GET",

        headers: {
          Accept:
            "application/json",
        },

        cache:
          "no-store",
      },
    );

  if (
    response.status ===
    404
  ) {
    return null;
  }

  if (
    !response.ok
  ) {
    throw new Error(
      `Assessment definition request failed with status ${response.status}.`,
    );
  }

  const payload:
    unknown =
      await response.json();

  return parseAssessmentDefinition(
    payload,
  );
}