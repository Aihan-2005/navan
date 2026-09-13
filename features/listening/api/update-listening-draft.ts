import {
  updateListeningDraftResponseSchema,
} from "../schemas/listening-bff.schema";

import type {
  UpdateListeningDraftInput,
  UpdateListeningDraftResponse,
} from "../types/listening-bff.types";

import {
  parseListeningApiResponse,
} from "./listening-api-client";

export async function updateListeningDraft(
  attemptId:
    string,

  input:
    UpdateListeningDraftInput,

  signal?:
    AbortSignal,
): Promise<UpdateListeningDraftResponse> {
  const normalizedAttemptId =
    attemptId.trim();

  if (!normalizedAttemptId) {
    throw new Error(
      "شناسه Attempt معتبر نیست.",
    );
  }

  const response =
    await fetch(
      `/api/listening/attempts/${encodeURIComponent(
        normalizedAttemptId,
      )}`,
      {
        method:
          "PATCH",

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
    updateListeningDraftResponseSchema,
    "ذخیره Draft شنیداری ناموفق بود.",
  );
}
