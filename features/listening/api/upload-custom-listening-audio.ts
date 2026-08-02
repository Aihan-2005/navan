import {
  customAudioUploadResultSchema,
} from "../schemas/listening-custom-source.schema";

import type {
  CustomAudioUploadMetadata,
  CustomAudioUploadResult,
} from "../types/listening-custom-source.types";

import {
  parseListeningApiResponse,
} from "./listening-api-client";

export async function uploadCustomListeningAudio(
  file: File,
  metadata: CustomAudioUploadMetadata,
  signal?: AbortSignal,
): Promise<CustomAudioUploadResult> {
  const formData = new FormData();

  formData.append(
    "file",
    file,
    file.name,
  );

  if (metadata.title?.trim()) {
    formData.append(
      "title",
      metadata.title.trim(),
    );
  }

  formData.append(
    "languageCode",
    metadata.languageCode ?? "en",
  );

  const response = await fetch(
    "/api/listening/audio/upload",
    {
      method: "POST",
      body: formData,
      signal,
    },
  );

  return parseListeningApiResponse(
    response,
    customAudioUploadResultSchema,

    "آپلود فایل صوتی با خطا مواجه شد.",
  );
}