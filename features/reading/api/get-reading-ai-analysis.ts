import {
  findReadingAiAnalysisMock,
} from "../mocks/reading-ai-analysis.mock";

import {
  readingResourceAiAnalysisSchema,
} from "../schemas/reading-ai-analysis.schema";

import type {
  ReadingResourceAiAnalysis,
} from "../types/reading-ai-analysis.types";

const BACKEND_ENDPOINT =
  "/api/v1/reading/resources";

function shouldUseMockData(): boolean {
  return (
    process.env.USE_MOCKS !==
    "false"
  );
}

function getApiBaseUrl(): string {
  const apiBaseUrl =
    process.env.API_BASE_URL?.trim();

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

function parseAnalysis(
  payload: unknown,
): ReadingResourceAiAnalysis {
  const result =
    readingResourceAiAnalysisSchema.safeParse(
      payload,
    );

  if (!result.success) {
    console.error(
      "Invalid Reading AI analysis payload:",
      result.error.flatten(),
    );

    throw new Error(
      "Reading AI analysis payload is invalid.",
    );
  }

  return result.data;
}

export async function getReadingAiAnalysis(
  resourceId: string,
): Promise<ReadingResourceAiAnalysis | null> {
  const normalizedResourceId =
    resourceId.trim();

  if (!normalizedResourceId) {
    return null;
  }

  if (shouldUseMockData()) {
    const analysis =
      findReadingAiAnalysisMock(
        normalizedResourceId,
      );

    if (!analysis) {
      return null;
    }

    return parseAnalysis(
      analysis,
    );
  }

  const requestUrl =
    new URL(
      `${BACKEND_ENDPOINT}/${encodeURIComponent(
        normalizedResourceId,
      )}/analysis`,
      getApiBaseUrl(),
    );

  const response =
    await fetch(
      requestUrl,
      {
        method: "GET",

        headers: {
          Accept:
            "application/json",
        },

        cache: "no-store",
      },
    );

  if (
    response.status === 404 ||
    response.status === 204
  ) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      `Reading AI analysis request failed with status ${response.status}.`,
    );
  }

  let payload: unknown;

  try {
    payload =
      await response.json();
  } catch {
    throw new Error(
      "Reading AI analysis response is not valid JSON.",
    );
  }

  return parseAnalysis(
    payload,
  );
}