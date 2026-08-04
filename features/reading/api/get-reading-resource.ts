import {
  readingResourcesMock,
} from "../mocks/reading-resources.mock";

import {
  readingResourceDetailSchema,
} from "../schemas/reading.schema";

import type {
  ReadingResourceDetail,
} from "../types/reading.types";

const READING_RESOURCES_ENDPOINT =
  "/api/v1/reading/resources";

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

function parseReadingResource(
  payload: unknown,
): ReadingResourceDetail {
  const result =
    readingResourceDetailSchema.safeParse(
      payload,
    );

  if (!result.success) {
    console.error(
      "Invalid reading resource payload:",
      result.error.flatten(),
    );

    throw new Error(
      "Reading resource payload is invalid.",
    );
  }

  return result.data;
}

function getMockReadingResource(
  resourceId: string,
): ReadingResourceDetail | null {
  const resource =
    readingResourcesMock.find(
      (item) =>
        item.id === resourceId,
    );

  if (!resource) {
    return null;
  }

  return parseReadingResource(
    resource,
  );
}

export async function getReadingResource(
  resourceId: string,
): Promise<ReadingResourceDetail | null> {
  const normalizedResourceId =
    resourceId.trim();

  if (!normalizedResourceId) {
    return null;
  }

  if (shouldUseMockData()) {
    return getMockReadingResource(
      normalizedResourceId,
    );
  }

  const requestUrl = new URL(
    `${READING_RESOURCES_ENDPOINT}/${encodeURIComponent(
      normalizedResourceId,
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
      `Reading resource request failed with status ${response.status}.`,
    );
  }

  let payload: unknown;

  try {
    payload = await response.json();
  } catch {
    throw new Error(
      "Reading resource response is not valid JSON.",
    );
  }

  return parseReadingResource(
    payload,
  );
}