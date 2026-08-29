import {
  dailyPracticeMock,
} from "../mocks/daily-practice.mock";

import {
  dailyPracticeOverviewSchema,
} from "../schemas/daily-practice.schema";

import type {
  DailyPracticeOverview,
} from "../types/daily-practice.types";

const DAILY_PRACTICE_OVERVIEW_PATH =
  "/api/v1/daily-practice/overview";

function shouldUseMockData(): boolean {
  return process.env.USE_MOCKS !== "false";
}

function getApiBaseUrl(): string {
  const apiBaseUrl =
    process.env.API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error(
      "API_BASE_URL is required when USE_MOCKS is disabled.",
    );
  }

  return apiBaseUrl;
}

function parseDailyPracticeOverview(
  payload: unknown,
): DailyPracticeOverview {
  const result =
    dailyPracticeOverviewSchema.safeParse(
      payload,
    );

  if (!result.success) {
    console.error(
      "Invalid daily practice overview payload:",
      result.error.flatten(),
    );

    throw new Error(
      "Daily practice overview payload is invalid.",
    );
  }

  return result.data;
}

export async function getDailyPracticeOverview(): Promise<DailyPracticeOverview> {
  if (shouldUseMockData()) {
    return parseDailyPracticeOverview(
      dailyPracticeMock,
    );
  }

  const requestUrl = new URL(
    DAILY_PRACTICE_OVERVIEW_PATH,
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
      `Daily practice overview request failed with status ${response.status}.`,
    );
  }

  const payload: unknown =
    await response.json();

  return parseDailyPracticeOverview(
    payload,
  );
}