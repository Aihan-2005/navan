import {
  listeningOverviewMock,
} from "../mocks/listening-overview.mock";

import {
  listeningOverviewSchema,
} from "../schemas/listening.schema";

import type {
  ListeningOverview,
} from "../types/listening.types";

import {
  parseListeningApiResponse,
} from "./listening-api-client";

import {
  fetchListeningBackend,
} from "./listening-server-client";


const LISTENING_OVERVIEW_ENDPOINT =
  "/api/v1/listening/overview";


function shouldUseMockData(): boolean {
  return (
    process.env.USE_MOCKS !==
    "false"
  );
}


export async function getListeningOverview(): Promise<ListeningOverview> {
  if (shouldUseMockData()) {
    return parseMockOverview(
      listeningOverviewMock,
    );
  }

  const response =
    await fetchListeningBackend(
      LISTENING_OVERVIEW_ENDPOINT,
      {
        method: "GET",
        cache: "no-store",
      },
      {
        requireAuthentication: true,
      },
    );

  return parseListeningApiResponse(
    response,
    listeningOverviewSchema,
    "دریافت اطلاعات Listening ناموفق بود.",
  );
}


function parseMockOverview(
  payload: unknown,
): ListeningOverview {
  const result =
    listeningOverviewSchema.safeParse(
      payload,
    );

  if (!result.success) {
    console.error(
      "Invalid listening overview mock:",
      result.error.flatten(),
    );

    throw new Error(
      "Listening overview mock is invalid.",
    );
  }

  return result.data;
}