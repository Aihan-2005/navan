import {
  customAudioUrlImportRequestSchema,
  customAudioUrlImportResultSchema,
} from "../schemas/listening-custom-source.schema";

import type {
  CustomAudioUrlImportRequest,
  CustomAudioUrlImportResult,
} from "../types/listening-custom-source.types";

import {
  ListeningApiError,
  parseListeningApiResponse,
} from "./listening-api-client";

export async function importCustomListeningUrl(
  input: CustomAudioUrlImportRequest,
  signal?: AbortSignal,
): Promise<CustomAudioUrlImportResult> {
  const parsedInput =
    customAudioUrlImportRequestSchema.safeParse(
      input,
    );

  if (!parsedInput.success) {
    const firstIssue =
      parsedInput.error.issues[0];

    throw new ListeningApiError(
      firstIssue?.message ??
        "اطلاعات لینک معتبر نیست.",

      400,
    );
  }

  const response = await fetch(
    "/api/listening/audio/import-url",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(
        parsedInput.data,
      ),

      signal,
    },
  );

  return parseListeningApiResponse(
    response,
    customAudioUrlImportResultSchema,

    "ثبت لینک صوتی با خطا مواجه شد.",
  );
}