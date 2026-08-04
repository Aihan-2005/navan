import {
  readingResourcesMock,
} from "../mocks/reading-resources.mock";

import {
  readingLibrarySchema,
} from "../schemas/reading.schema";

import type {
  ReadingLibrary,
} from "../types/reading.types";

const READING_LIBRARY_ENDPOINT =
  "/api/v1/reading/library";

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

function parseReadingLibrary(
  payload: unknown,
): ReadingLibrary {
  const result =
    readingLibrarySchema.safeParse(
      payload,
    );

  if (!result.success) {
    console.error(
      "Invalid reading library payload:",
      result.error.flatten(),
    );

    throw new Error(
      "Reading library payload is invalid.",
    );
  }

  return result.data;
}

function getMockReadingLibrary(): ReadingLibrary {
  const libraryResources =
    readingResourcesMock.filter(
      (resource) =>
        resource.id !==
        "uploaded-reading-demo",
    );

  return parseReadingLibrary({
    resources: libraryResources,
    total: libraryResources.length,
  });
}

export async function getReadingLibrary(): Promise<ReadingLibrary> {
  if (shouldUseMockData()) {
    return getMockReadingLibrary();
  }

  const requestUrl = new URL(
    READING_LIBRARY_ENDPOINT,
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
      `Reading library request failed with status ${response.status}.`,
    );
  }

  let payload: unknown;

  try {
    payload = await response.json();
  } catch {
    throw new Error(
      "Reading library response is not valid JSON.",
    );
  }

  return parseReadingLibrary(payload);
}