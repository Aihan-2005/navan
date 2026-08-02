import { listeningOverviewMock } from "../mocks/listening-overview.mock";

import {
  listeningOverviewSchema,
} from "../schemas/listening.schema";

import type {
  ListeningOverview,
} from "../types/listening.types";

const LISTENING_OVERVIEW_ENDPOINT =
  "/api/v1/listening/overview";

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

function parseListeningOverview(
  payload: unknown,
): ListeningOverview {
  const result =
    listeningOverviewSchema.safeParse(payload);

  if (!result.success) {
    console.error(
      "Invalid listening overview payload:",
      result.error.flatten(),
    );

    throw new Error(
      "Listening overview payload is invalid.",
    );
  }

  return result.data;
}

export async function getListeningOverview(): Promise<ListeningOverview> {
  if (shouldUseMockData()) {
    return parseListeningOverview(
      listeningOverviewMock,
    );
  }

  const requestUrl = new URL(
    LISTENING_OVERVIEW_ENDPOINT,
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
      `Listening overview request failed with status ${response.status}.`,
    );
  }

  const payload: unknown =
    await response.json();

  return parseListeningOverview(payload);
}