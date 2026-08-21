import "server-only";

import {
  auth,
} from "../../../auth";

import {
  ListeningApiError,
} from "./listening-api-client";


type ListeningRequestOptions =
  Readonly<{
    requireAuthentication?: boolean;
  }>;


function getApiBaseUrl(): string {
  const rawBaseUrl =
    process.env.API_BASE_URL?.trim();

  if (!rawBaseUrl) {
    throw new ListeningApiError(
      "API_BASE_URL تعریف نشده است.",
      500,
    );
  }

  let parsedUrl: URL;

  try {
    parsedUrl =
      new URL(rawBaseUrl);
  } catch {
    throw new ListeningApiError(
      "API_BASE_URL معتبر نیست.",
      500,
    );
  }

  return parsedUrl
    .toString()
    .replace(
      /\/+$/u,
      "",
    );
}


function buildBackendUrl(
  path: string,
): URL {
  const normalizedPath =
    path.replace(
      /^\/+/u,
      "",
    );

  return new URL(
    normalizedPath,
    `${getApiBaseUrl()}/`,
  );
}


export async function fetchListeningBackend(
  path: string,
  init: RequestInit = {},
  options: ListeningRequestOptions = {},
): Promise<Response> {
  const session =
    await auth();

  const accessToken =
    session?.backendAccessToken;

  if (
    options.requireAuthentication &&
    !accessToken
  ) {
    throw new ListeningApiError(
      "برای استفاده از این بخش باید وارد حساب کاربری شوید.",
      401,
    );
  }

  const headers =
    new Headers(
      init.headers,
    );

  if (!headers.has("Accept")) {
    headers.set(
      "Accept",
      "application/json",
    );
  }

  if (
    accessToken &&
    !headers.has("Authorization")
  ) {
    headers.set(
      "Authorization",
      `Bearer ${accessToken}`,
    );
  }

  return fetch(
    buildBackendUrl(path),
    {
      ...init,
      headers,
    },
  );
}