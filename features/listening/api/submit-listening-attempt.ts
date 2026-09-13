import {
  listeningAttemptAnalysisSchema,
} from "../schemas/listening-analysis.schema";

import type {
  SubmitListeningAttemptInput,
} from "../types/listening-bff.types";

import type {
  ListeningAttemptAnalysis,
} from "../types/listening.types";

import {
  parseListeningApiResponse,
} from "./listening-api-client";

export async function submitListeningAttempt(
  attemptId:
    string,

  input:
    SubmitListeningAttemptInput,

  signal?:
    AbortSignal,
): Promise<ListeningAttemptAnalysis> {
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
      )}/submit`,
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
    listeningAttemptAnalysisSchema,
    "ارسال تمرین برای تحلیل ناموفق بود.",
  );
}