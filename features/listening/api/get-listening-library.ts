import {
  z,
} from "zod";

import {
  listeningContentsMock,
} from "../mocks/listening-content.mock";

import {
  listeningLibraryQuerySchema,
  listeningLibraryResponseSchema,
} from "../schemas/listening-catalog.schema";

import {
  listeningContentSummarySchema,
} from "../schemas/listening.schema";

import type {
  ListeningLibraryQuery,
  ListeningLibraryQueryInput,
  ListeningLibraryResponse,
} from "../types/listening-catalog.types";

import type {
  ListeningContentSummary,
} from "../types/listening.types";

import {
  parseListeningApiResponse,
} from "./listening-api-client";

import {
  fetchListeningBackend,
} from "./listening-server-client";

const LISTENING_LIBRARY_ENDPOINT =
  "/api/v1/listening/contents";

const LEVEL_ORDER = {
  A1: 1,
  A2: 2,
  B1: 3,
  B2: 4,
  C1: 5,
  C2: 6,
} as const;

const backendLibraryPayloadSchema =
  z.union([
    listeningLibraryResponseSchema,

    z.array(
      listeningContentSummarySchema,
    ),
  ]);

function shouldUseMockData(): boolean {
  return (
    process.env.USE_MOCKS !==
    "false"
  );
}

function normalizeSearchValue(
  value:
    string,
): string {
  return value
    .trim()
    .toLocaleLowerCase(
      "fa",
    );
}

function matchesSearch(
  content:
    ListeningContentSummary,

  search:
    string,
): boolean {
  if (!search) {
    return true;
  }

  const haystack =
    [
      content.title,
      content.description ??
        "",
      ...content.topics,
      ...content.vocabularyPreview,
    ]
      .join(" ")
      .toLocaleLowerCase(
        "fa",
      );

  return haystack.includes(
    search,
  );
}

function filterContents(
  contents:
    readonly ListeningContentSummary[],

  query:
    ListeningLibraryQuery,
): ListeningContentSummary[] {
  const search =
    normalizeSearchValue(
      query.search,
    );

  return contents.filter(
    (content) => {
      if (
        !matchesSearch(
          content,
          search,
        )
      ) {
        return false;
      }

      if (
        query.levels.length >
          0 &&
        !query.levels.includes(
          content.cefrLevel,
        )
      ) {
        return false;
      }

      if (
        query.accents.length >
          0 &&
        !query.accents.includes(
          content.accent,
        )
      ) {
        return false;
      }

      if (
        query.contentTypes
          .length > 0 &&
        !query.contentTypes.includes(
          content.contentType,
        )
      ) {
        return false;
      }

      if (
        query.practiceModes
          .length > 0 &&
        !query.practiceModes.some(
          (mode) =>
            content
              .availablePracticeModes
              .includes(
                mode,
              ),
        )
      ) {
        return false;
      }

      if (
        query.maxDurationMinutes !==
          null &&
        content.durationSeconds >
          query.maxDurationMinutes *
            60
      ) {
        return false;
      }

      return true;
    },
  );
}

function sortContents(
  contents:
    readonly ListeningContentSummary[],

  query:
    ListeningLibraryQuery,
): ListeningContentSummary[] {
  const result =
    [...contents];

  result.sort(
    (
      first,
      second,
    ) => {
      switch (
        query.sort
      ) {
        case "duration_asc":
          return (
            first.durationSeconds -
            second.durationSeconds
          );

        case "duration_desc":
          return (
            second.durationSeconds -
            first.durationSeconds
          );

        case "level_asc":
          return (
            LEVEL_ORDER[
              first.cefrLevel
            ] -
            LEVEL_ORDER[
              second.cefrLevel
            ]
          );

        case "accuracy_desc":
          return (
            (
              second.bestAccuracyScore ??
              -1
            ) -
            (
              first.bestAccuracyScore ??
              -1
            )
          );

        case "recommended":
        default: {
          if (
            first.isFeatured !==
            second.isFeatured
          ) {
            return first.isFeatured
              ? -1
              : 1;
          }

          if (
            first.status !==
            second.status
          ) {
            return first.status ===
              "ready"
              ? -1
              : 1;
          }

          return (
            first.estimatedPracticeMinutes -
            second.estimatedPracticeMinutes
          );
        }
      }
    },
  );

  return result;
}

function getMockLibrary(
  query:
    ListeningLibraryQuery,
): ListeningLibraryResponse {
  const parsedContents =
    listeningContentsMock.map(
      (content) =>
        listeningContentSummarySchema.parse(
          content,
        ),
    );

  const filteredContents =
    filterContents(
      parsedContents,
      query,
    );

  const sortedContents =
    sortContents(
      filteredContents,
      query,
    );

  return listeningLibraryResponseSchema.parse(
    {
      items:
        sortedContents,

      total:
        sortedContents.length,
    },
  );
}

function buildBackendPath(
  query:
    ListeningLibraryQuery,
): string {
  const params =
    new URLSearchParams();

  if (query.search) {
    params.set(
      "search",
      query.search,
    );
  }

  for (
    const level
    of query.levels
  ) {
    params.append(
      "level",
      level,
    );
  }

  for (
    const accent
    of query.accents
  ) {
    params.append(
      "accent",
      accent,
    );
  }

  for (
    const contentType
    of query.contentTypes
  ) {
    params.append(
      "contentType",
      contentType,
    );
  }

  for (
    const mode
    of query.practiceModes
  ) {
    params.append(
      "practiceMode",
      mode,
    );
  }

  if (
    query.maxDurationMinutes !==
    null
  ) {
    params.set(
      "maxDurationMinutes",
      String(
        query.maxDurationMinutes,
      ),
    );
  }

  params.set(
    "sort",
    query.sort,
  );

  const queryString =
    params.toString();

  return queryString
    ? `${LISTENING_LIBRARY_ENDPOINT}?${queryString}`
    : LISTENING_LIBRARY_ENDPOINT;
}

export async function getListeningLibrary(
  input:
    ListeningLibraryQueryInput = {},
): Promise<ListeningLibraryResponse> {
  const query =
    listeningLibraryQuerySchema.parse(
      input,
    );

  if (
    shouldUseMockData()
  ) {
    return getMockLibrary(
      query,
    );
  }

  const response =
    await fetchListeningBackend(
      buildBackendPath(
        query,
      ),
      {
        method:
          "GET",

        cache:
          "no-store",
      },
      {
        requireAuthentication:
          false,
      },
    );

  const payload =
    await parseListeningApiResponse(
      response,
      backendLibraryPayloadSchema,
      "دریافت کتابخانه Listening ناموفق بود.",
    );

  if (
    Array.isArray(
      payload,
    )
  ) {
    return listeningLibraryResponseSchema.parse(
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