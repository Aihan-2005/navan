import {
  listeningAnalysisMock,
} from "../mocks/listening-analysis.mock";

import {
  listeningAttemptAnalysisSchema,
} from "../schemas/listening-analysis.schema";

import type {
  ListeningAttemptAnalysis,
} from "../types/listening.types";

const LISTENING_ATTEMPTS_ENDPOINT =
  "/api/v1/listening/attempts";

function shouldUseMockData(): boolean {
  return process.env.USE_MOCKS !== "false";
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

function parseListeningAttempt(
  payload: unknown,
): ListeningAttemptAnalysis {
  const result =
    listeningAttemptAnalysisSchema.safeParse(
      payload,
    );

  if (!result.success) {
    console.error(
      "Invalid listening attempt payload:",
      result.error.flatten(),
    );

    throw new Error(
      "Listening attempt payload is invalid.",
    );
  }

  return result.data;
}

export async function getListeningAttempt(
  attemptId: string,
): Promise<ListeningAttemptAnalysis | null> {
  const normalizedAttemptId =
    attemptId.trim();

  if (!normalizedAttemptId) {
    return null;
  }

  if (shouldUseMockData()) {
    const attempt =
      listeningAnalysisMock.find(
        (item) =>
          item.attemptId ===
          normalizedAttemptId,
      );

    if (!attempt) {
      return null;
    }

    return parseListeningAttempt(
      attempt,
    );
  }

  const requestUrl = new URL(
    `${LISTENING_ATTEMPTS_ENDPOINT}/${encodeURIComponent(
      normalizedAttemptId,
    )}`,
    getApiBaseUrl(),
  );

  const response = await fetch(
    requestUrl,
    {
      method: "GET",

      headers: {
        Accept: "application/json",
      },

      cache: "no-store",
    },
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      `Listening attempt request failed with status ${response.status}.`,
    );
  }

  let payload: unknown;

  try {
    payload =
      await response.json();
  } catch {
    throw new Error(
      "Listening attempt response is not valid JSON.",
    );
  }

  return parseListeningAttempt(
    payload,
  );
}