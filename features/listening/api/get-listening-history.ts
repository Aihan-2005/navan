import {
  z,
} from "zod";

import {
  listeningOverviewMock,
} from "../mocks/listening-overview.mock";

import {
  listeningHistoryItemSchema,
  listeningHistoryResponseSchema,
} from "../schemas/listening-catalog.schema";

import type {
  ListeningHistoryItem,
  ListeningHistoryResponse,
} from "../types/listening-catalog.types";

import {
  parseListeningApiResponse,
} from "./listening-api-client";

import {
  fetchListeningBackend,
} from "./listening-server-client";

const LISTENING_HISTORY_ENDPOINT =
  "/api/v1/listening/history";

const MOCK_ATTEMPT_IDS:
  Readonly<
    Record<
      string,
      string | null
    >
  > = {
  "airport-check-in-conversation":
    "attempt-airport-check-in-001",

  "technology-news-brief":
    "attempt-technology-news-001",
};

const backendHistoryPayloadSchema =
  z.union([
    listeningHistoryResponseSchema,

    z.array(
      listeningHistoryItemSchema,
    ),
  ]);

function shouldUseMockData(): boolean {
  return (
    process.env.USE_MOCKS !==
    "false"
  );
}

function getMockHistory(): ListeningHistoryResponse {
  const items:
    ListeningHistoryItem[] =
    listeningOverviewMock
      .recentActivities
      .map(
        (activity) =>
          listeningHistoryItemSchema.parse(
            {
              ...activity,

              attemptId:
                MOCK_ATTEMPT_IDS[
                  activity.contentId
                ] ??
                null,

              status:
                "completed",
            },
          ),
      )
      .sort(
        (
          first,
          second,
        ) =>
          new Date(
            second.completedAt,
          ).getTime() -
          new Date(
            first.completedAt,
          ).getTime(),
      );

  return listeningHistoryResponseSchema.parse(
    {
      items,

      total:
        items.length,
    },
  );
}

export async function getListeningHistory(): Promise<ListeningHistoryResponse> {
  if (
    shouldUseMockData()
  ) {
    return getMockHistory();
  }

  const response =
    await fetchListeningBackend(
      LISTENING_HISTORY_ENDPOINT,
      {
        method:
          "GET",

        cache:
          "no-store",
      },
      {
        requireAuthentication:
          true,
      },
    );

  const payload =
    await parseListeningApiResponse(
      response,
      backendHistoryPayloadSchema,
      "دریافت تاریخچه Listening ناموفق بود.",
    );

  if (
    Array.isArray(
      payload,
    )
  ) {
    return listeningHistoryResponseSchema.parse(
      {
        items:
          payload,

        total:
          payload.length,
      },
    );
  }

  return payload;
}