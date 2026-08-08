import {
  findReadingSectionMock,
} from "../mocks/reading-sections.mock";

import {
  readingSectionDetailSchema,
} from "../schemas/reading-section.schema";

import type {
  ReadingSectionDetail,
} from "../types/reading.types";

const READING_RESOURCES_ENDPOINT =
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

function parseReadingSection(
  payload: unknown,
): ReadingSectionDetail {
  const result =
    readingSectionDetailSchema.safeParse(
      payload,
    );

  if (!result.success) {
    console.error(
      "Invalid reading section payload:",
      result.error.flatten(),
    );

    throw new Error(
      "Reading section payload is invalid.",
    );
  }

  return result.data;
}

function getMockReadingSection(
  resourceId: string,
  sectionId: string,
): ReadingSectionDetail | null {
  const section =
    findReadingSectionMock(
      resourceId,
      sectionId,
    );

  if (!section) {
    return null;
  }

  return parseReadingSection(
    section,
  );
}

export async function getReadingSection(
  resourceId: string,
  sectionId: string,
): Promise<
  ReadingSectionDetail | null
> {
  const normalizedResourceId =
    resourceId.trim();

  const normalizedSectionId =
    sectionId.trim();

  if (
    !normalizedResourceId ||
    !normalizedSectionId
  ) {
    return null;
  }

  if (shouldUseMockData()) {
    return getMockReadingSection(
      normalizedResourceId,
      normalizedSectionId,
    );
  }

  const encodedResourceId =
    encodeURIComponent(
      normalizedResourceId,
    );

  const encodedSectionId =
    encodeURIComponent(
      normalizedSectionId,
    );

  const requestPath =
    `${READING_RESOURCES_ENDPOINT}` +
    `/${encodedResourceId}` +
    `/sections/${encodedSectionId}`;

  const requestUrl = new URL(
    requestPath,
    getApiBaseUrl(),
  );

  const response = await fetch(
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

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      `Reading section request failed with status ${response.status}.`,
    );
  }

  let payload: unknown;

  try {
    payload =
      await response.json();
  } catch {
    throw new Error(
      "Reading section response is not valid JSON.",
    );
  }

  return parseReadingSection(
    payload,
  );
}