import { z } from "zod";

import {
  backendLoginInputSchema,
  backendLoginResponseSchema,
  backendRefreshResponseSchema,
  backendRegisterInputSchema,
  backendRegisterResponseSchema,
} from "../schemas/backend-auth.schema";

import type {
  BackendLoginInput,
  BackendLoginResponse,
  BackendRefreshResponse,
  BackendRegisterInput,
  BackendRegisterResponse,
} from "../types/backend-auth.types";

const AUTH_API_PREFIX =
  "/api/v1/auth";

const DEFAULT_REQUEST_TIMEOUT_MS =
  10_000;

export class BackendAuthError extends Error {
  readonly statusCode: number;

  readonly payload:
    unknown;

  constructor(
    message: string,
    statusCode: number,
    payload: unknown = null,
  ) {
    super(message);

    this.name =
      "BackendAuthError";

    this.statusCode =
      statusCode;

    this.payload =
      payload;
  }
}

function getBackendBaseUrl(): string {
  const rawBaseUrl =
    process.env.API_BASE_URL
      ?.trim();

  if (!rawBaseUrl) {
    throw new BackendAuthError(
      "API_BASE_URL در تنظیمات سرور تعریف نشده است.",
      500,
    );
  }

  let url: URL;

  try {
    url =
      new URL(
        rawBaseUrl,
      );
  } catch {
    throw new BackendAuthError(
      "API_BASE_URL معتبر نیست.",
      500,
    );
  }

  return url
    .toString()
    .replace(
      /\/+$/u,
      "",
    );
}

function getAuthEndpoint(
  path: string,
): string {
  const normalizedPath =
    path.replace(
      /^\/+|\/+$/gu,
      "",
    );

  return [
    getBackendBaseUrl(),
    AUTH_API_PREFIX,
    normalizedPath,
    "",
  ].join("/");
}

async function readJsonSafely(
  response: Response,
): Promise<unknown> {
  const text =
    await response.text();

  if (!text.trim()) {
    return null;
  }

  try {
    return JSON.parse(
      text,
    );
  } catch {
    return null;
  }
}

function collectErrorMessages(
  value: unknown,
): string[] {
  if (
    typeof value === "string"
  ) {
    const normalized =
      value.trim();

    return normalized
      ? [normalized]
      : [];
  }

  if (
    Array.isArray(value)
  ) {
    return value.flatMap(
      (item) =>
        collectErrorMessages(
          item,
        ),
    );
  }

  if (
    typeof value === "object" &&
    value !== null
  ) {
    return Object.values(
      value,
    ).flatMap(
      (item) =>
        collectErrorMessages(
          item,
        ),
    );
  }

  return [];
}

function getBackendErrorMessage(
  payload: unknown,
  fallback: string,
): string {
  const messages =
    collectErrorMessages(
      payload,
    );

  if (
    messages.length === 0
  ) {
    return fallback;
  }

  return messages
    .slice(
      0,
      3,
    )
    .join(" ");
}

async function requestBackendJson<
  TOutput,
>(
  path: string,
  body: unknown,
  schema:
    z.ZodType<TOutput>,
): Promise<TOutput> {
  const controller =
    new AbortController();

  const timeout =
    setTimeout(
      () => {
        controller.abort();
      },
      DEFAULT_REQUEST_TIMEOUT_MS,
    );

  try {
    const response =
      await fetch(
        getAuthEndpoint(
          path,
        ),
        {
          method: "POST",

          headers: {
            Accept:
              "application/json",

            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify(
              body,
            ),

          cache:
            "no-store",

          signal:
            controller.signal,
        },
      );

    const payload =
      await readJsonSafely(
        response,
      );

    if (!response.ok) {
      throw new BackendAuthError(
        getBackendErrorMessage(
          payload,
          "درخواست احراز هویت توسط Backend رد شد.",
        ),
        response.status,
        payload,
      );
    }

    const parsed =
      schema.safeParse(
        payload,
      );

    if (!parsed.success) {
      console.error(
        "Invalid Backend Auth response:",
        parsed.error.flatten(),
      );

      throw new BackendAuthError(
        "ساختار پاسخ سرویس احراز هویت Backend معتبر نیست.",
        502,
        payload,
      );
    }

    return parsed.data;
  } catch (error) {
    if (
      error instanceof
      BackendAuthError
    ) {
      throw error;
    }

    if (
      error instanceof
        DOMException &&
      error.name ===
        "AbortError"
    ) {
      throw new BackendAuthError(
        "زمان پاسخ‌گویی سرویس احراز هویت به پایان رسید.",
        504,
      );
    }

    console.error(
      "Backend auth request failed:",
      error,
    );

    throw new BackendAuthError(
      "ارتباط با Backend احراز هویت برقرار نشد.",
      502,
    );
  } finally {
    clearTimeout(
      timeout,
    );
  }
}

export async function loginBackendUser(
  input:
    BackendLoginInput,
): Promise<BackendLoginResponse> {
  const parsed =
    backendLoginInputSchema.parse(
      input,
    );

  return requestBackendJson(
    "login",
    {
      identifier:
        parsed.identifier,

      password:
        parsed.password,
    },
    backendLoginResponseSchema,
  );
}

export async function registerBackendUser(
  input:
    BackendRegisterInput,
): Promise<BackendRegisterResponse> {
  const parsed =
    backendRegisterInputSchema.parse(
      input,
    );

  return requestBackendJson(
    "register",
    {
      name:
        parsed.name,

      identifier:
        parsed.identifier,

      password:
        parsed.password,

      password_confirm:
        parsed.passwordConfirm,
    },
    backendRegisterResponseSchema,
  );
}

export async function refreshBackendTokens(
  refreshToken: string,
): Promise<BackendRefreshResponse> {
  const normalizedToken =
    refreshToken.trim();

  if (!normalizedToken) {
    throw new BackendAuthError(
      "Refresh Token وجود ندارد.",
      401,
    );
  }

  return requestBackendJson(
    "token/refresh",
    {
      refresh:
        normalizedToken,
    },
    backendRefreshResponseSchema,
  );
}