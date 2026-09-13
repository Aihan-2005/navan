import {
  createListeningAttemptResponseSchema,
} from "../schemas/listening-bff.schema";

import type {
  CreateListeningAttemptInput,
  CreateListeningAttemptResponse,
} from "../types/listening-bff.types";

import {
  parseListeningApiResponse,
} from "./listening-api-client";

export async function createListeningAttempt(
  input:
    CreateListeningAttemptInput,
  signal?:
    AbortSignal,
): Promise<CreateListeningAttemptResponse> {
  const response =
    await fetch(
      "/api/listening/attempts",
      {
        method:
          "POST",

        headers: {
          Accept:
            "application/json",

          "Content-Type":
            "application/json",
        },

        body:
          JSON.stringify(
            input,
          ),

        signal,

        cache:
          "no-store",
      },
    );

  return parseListeningApiResponse(
    response,
    createListeningAttemptResponseSchema,
    "شروع Attempt شنیداری ناموفق بود.",
  );
}