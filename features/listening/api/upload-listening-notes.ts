import {
  listeningNotesUploadResultSchema,
} from "../schemas/listening-upload.schema";

import type {
  ListeningNotesUploadResult,
} from "../types/listening.types";

export class ListeningNotesUploadError extends Error {
  readonly statusCode: number;

  constructor(
    message: string,
    statusCode: number,
  ) {
    super(message);

    this.name =
      "ListeningNotesUploadError";

    this.statusCode = statusCode;
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

async function readJsonSafely(
  response: Response,
): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export async function uploadListeningNotes(
  file: File,
  signal?: AbortSignal,
): Promise<ListeningNotesUploadResult> {
  const formData = new FormData();

  formData.append(
    "file",
    file,
    file.name,
  );

  const response = await fetch(
    "/api/listening/notes/upload",
    {
      method: "POST",
      body: formData,
      signal,
    },
  );

  const payload =
    await readJsonSafely(response);

  if (!response.ok) {
    throw new ListeningNotesUploadError(
      getErrorMessage(payload) ??
        "آپلود و استخراج نوشته با خطا مواجه شد.",

      response.status,
    );
  }

  const parsedResult =
    listeningNotesUploadResultSchema.safeParse(
      payload,
    );

  if (!parsedResult.success) {
    console.error(
      "Invalid listening notes upload response:",
      parsedResult.error.flatten(),
    );

    throw new ListeningNotesUploadError(
      "پاسخ دریافتی از سرویس استخراج معتبر نیست.",
      500,
    );
  }

  return parsedResult.data;
}