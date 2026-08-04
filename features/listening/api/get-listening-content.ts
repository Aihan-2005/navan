import {
  listeningContentsMock,
} from "../mocks/listening-content.mock";

import {
  listeningContentDetailSchema,
} from "../schemas/listening.schema";

import type {
  ListeningContentDetail,
} from "../types/listening.types";

const LISTENING_CONTENT_ENDPOINT =
  "/api/v1/listening/contents";

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

function parseListeningContent(
  payload: unknown,
): ListeningContentDetail {
  const result =
    listeningContentDetailSchema.safeParse(
      payload,
    );

  if (!result.success) {
    console.error(
      "Invalid listening content payload:",
      result.error.flatten(),
    );

    throw new Error(
      "Listening content payload is invalid.",
    );
  }

  return result.data;
}

export async function getListeningContent(
  contentId: string,
): Promise<ListeningContentDetail | null> {
  if (shouldUseMockData()) {
    const content =
      listeningContentsMock.find(
        (item) => item.id === contentId,
      );

    if (!content) {
      return null;
    }

    return parseListeningContent(content);
  }

  const requestUrl = new URL(
    `${LISTENING_CONTENT_ENDPOINT}/${encodeURIComponent(
      contentId,
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
      `Listening content request failed with status ${response.status}.`,
    );
  }

  const payload: unknown =
    await response.json();

  return parseListeningContent(payload);
}