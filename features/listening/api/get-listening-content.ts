import {
  listeningContentsMock,
} from "../mocks/listening-content.mock";

import {
  listeningContentDetailSchema,
} from "../schemas/listening.schema";

import type {
  ListeningContentDetail,
} from "../types/listening.types";

import {
  parseListeningApiResponse,
} from "./listening-api-client";

import {
  fetchListeningBackend,
} from "./listening-server-client";


const LISTENING_CONTENT_ENDPOINT =
  "/api/v1/listening/contents";


function shouldUseMockData(): boolean {
  return (
    process.env.USE_MOCKS !==
    "false"
  );
}


function parseMockContent(
  payload: unknown,
): ListeningContentDetail {
  const result =
    listeningContentDetailSchema
      .safeParse(payload);

  if (!result.success) {
    console.error(
      "Invalid listening content mock:",
      result.error.flatten(),
    );

    throw new Error(
      "Listening content mock is invalid.",
    );
  }

  return result.data;
}


export async function getListeningContent(
  contentId: string,
): Promise<
  ListeningContentDetail | null
> {
  const normalizedContentId =
    contentId.trim();

  if (!normalizedContentId) {
    return null;
  }

  if (shouldUseMockData()) {
    const content =
      listeningContentsMock.find(
        (item) =>
          item.id ===
          normalizedContentId,
      );

    if (!content) {
      return null;
    }

    return parseMockContent(
      content,
    );
  }

  const response =
    await fetchListeningBackend(
      `${LISTENING_CONTENT_ENDPOINT}/${encodeURIComponent(
        normalizedContentId,
      )}`,
      {
        method: "GET",
        cache: "no-store",
      },
      {
        /**
         * Optional:
         * public content works anonymously,
         * but authenticated users get
         * isCompleted/progress context.
         */
        requireAuthentication: false,
      },
    );

  if (response.status === 404) {
    return null;
  }

  return parseListeningApiResponse(
    response,
    listeningContentDetailSchema,
    "دریافت تمرین شنیداری ناموفق بود.",
  );
}