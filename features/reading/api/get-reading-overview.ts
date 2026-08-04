import {
  readingOverviewMock,
} from "../mocks/reading-overview.mock";

import {
  readingOverviewSchema,
} from "../schemas/reading.schema";

import type {
  ReadingOverview,
} from "../types/reading.types";

const READING_OVERVIEW_ENDPOINT =
  "/api/v1/reading/overview";

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
    return new URL(apiBaseUrl).toString();
  } catch {
    throw new Error(
      "API_BASE_URL is not a valid URL.",
    );
  }
}

function parseReadingOverview(
  payload: unknown,
): ReadingOverview {
  const result =
    readingOverviewSchema.safeParse(
      payload,
    );

  if (!result.success) {
    console.error(
      "Invalid reading overview payload:",
      result.error.flatten(),
    );

    throw new Error(
      "Reading overview payload is invalid.",
    );
  }

  return result.data;
}

export async function getReadingOverview(): Promise<ReadingOverview> {
  if (shouldUseMockData()) {
    return parseReadingOverview(
      readingOverviewMock,
    );
  }

  const requestUrl = new URL(
    READING_OVERVIEW_ENDPOINT,
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

  if (!response.ok) {
    throw new Error(
      `Reading overview request failed with status ${response.status}.`,
    );
  }

  let payload: unknown;

  try {
    payload = await response.json();
  } catch {
    throw new Error(
      "Reading overview response is not valid JSON.",
    );
  }

  return parseReadingOverview(payload);
}