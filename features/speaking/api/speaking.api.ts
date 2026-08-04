import {
  speakingOverviewMock,
  speakingScenariosMock,
} from "../mocks/speaking.mock";

import {
  speakingOverviewSchema,
  speakingScenarioSchema,
} from "../schemas/speaking.schema";

import type {
  SpeakingOverview,
  SpeakingScenario,
} from "../types/speaking.types";

const SPEAKING_OVERVIEW_ENDPOINT =
  "/api/v1/speaking/overview";

const SPEAKING_SCENARIOS_ENDPOINT =
  "/api/v1/speaking/scenarios";

function shouldUseMockData(): boolean {
  return process.env.USE_MOCKS !== "false";
}

function getApiBaseUrl(): string {
  const apiBaseUrl = process.env.API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error(
      "API_BASE_URL is required when USE_MOCKS is disabled.",
    );
  }

  return apiBaseUrl;
}

export async function getSpeakingOverview(): Promise<SpeakingOverview> {
  if (shouldUseMockData()) {
    return speakingOverviewSchema.parse(
      speakingOverviewMock,
    );
  }

  const requestUrl = new URL(
    SPEAKING_OVERVIEW_ENDPOINT,
    getApiBaseUrl(),
  );

  const response = await fetch(requestUrl, {
    method: "GET",

    headers: {
      Accept: "application/json",
    },

    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Speaking overview request failed with status ${response.status}.`,
    );
  }

  const payload: unknown = await response.json();

  return speakingOverviewSchema.parse(payload);
}

export async function getSpeakingScenario(
  scenarioId: string,
): Promise<SpeakingScenario | null> {
  if (shouldUseMockData()) {
    const scenario = speakingScenariosMock.find(
      (item) => item.id === scenarioId,
    );

    if (!scenario) {
      return null;
    }

    return speakingScenarioSchema.parse(scenario);
  }

  const requestUrl = new URL(
    `${SPEAKING_SCENARIOS_ENDPOINT}/${encodeURIComponent(
      scenarioId,
    )}`,
    getApiBaseUrl(),
  );

  const response = await fetch(requestUrl, {
    method: "GET",

    headers: {
      Accept: "application/json",
    },

    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      `Speaking scenario request failed with status ${response.status}.`,
    );
  }

  const payload: unknown = await response.json();

  return speakingScenarioSchema.parse(payload);
}