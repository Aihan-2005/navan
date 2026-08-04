import type { ZodType } from "zod";

export class ListeningApiError extends Error {
  readonly statusCode: number;

  constructor(
    message: string,
    statusCode: number,
  ) {
    super(message);

    this.name = "ListeningApiError";
    this.statusCode = statusCode;
  }
}

async function readJsonSafely(
  response: Response,
): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function getErrorMessage(
  payload: unknown,
): string | null {
  if (
    typeof payload !== "object" ||
    payload === null
  ) {
    return null;
  }

  if (
    "error" in payload &&
    typeof payload.error === "string"
  ) {
    return payload.error;
  }

  if (
    "message" in payload &&
    typeof payload.message === "string"
  ) {
    return payload.message;
  }

  return null;
}

export async function parseListeningApiResponse<T>(
  response: Response,
  schema: ZodType<T>,
  fallbackErrorMessage: string,
): Promise<T> {
  const payload =
    await readJsonSafely(response);

  if (!response.ok) {
    throw new ListeningApiError(
      getErrorMessage(payload) ??
        fallbackErrorMessage,

      response.status,
    );
  }

  const parsedResult =
    schema.safeParse(payload);

  if (!parsedResult.success) {
    console.error(
      "Invalid Listening API response:",
      parsedResult.error.flatten(),
    );

    throw new ListeningApiError(
      "ساختار پاسخ سرویس Listening معتبر نیست.",
      500,
    );
  }

  return parsedResult.data;
}