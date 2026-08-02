import {
  readingSourceUploadMetadataSchema,
  readingSourceUploadResultSchema,
} from "../schemas/reading.schema";

import type {
  ReadingSourceUploadMetadata,
  ReadingSourceUploadResult,
} from "../types/reading.types";

export class ReadingSourceUploadError extends Error {
  readonly statusCode: number;

  constructor(
    message: string,
    statusCode: number,
  ) {
    super(message);

    this.name =
      "ReadingSourceUploadError";

    this.statusCode =
      statusCode;
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

function validateUploadFile(
  file: File,
): void {
  if (!(file instanceof File)) {
    throw new ReadingSourceUploadError(
      "فایل انتخاب‌شده معتبر نیست.",
      400,
    );
  }

  if (file.size <= 0) {
    throw new ReadingSourceUploadError(
      "فایل انتخاب‌شده خالی است.",
      400,
    );
  }

  if (!file.name.trim()) {
    throw new ReadingSourceUploadError(
      "نام فایل معتبر نیست.",
      400,
    );
  }
}

export async function uploadReadingSource(
  file: File,
  metadata: ReadingSourceUploadMetadata,
  signal?: AbortSignal,
): Promise<ReadingSourceUploadResult> {
  validateUploadFile(file);

  const metadataResult =
    readingSourceUploadMetadataSchema.safeParse(
      metadata,
    );

  if (!metadataResult.success) {
    throw new ReadingSourceUploadError(
      metadataResult.error.issues[0]
        ?.message ??
        "اطلاعات منبع معتبر نیست.",

      400,
    );
  }

  const formData =
    new FormData();

  formData.append(
    "file",
    file,
    file.name,
  );

  if (metadataResult.data.title) {
    formData.append(
      "title",
      metadataResult.data.title,
    );
  }

  formData.append(
    "languageCode",
    metadataResult.data.languageCode,
  );

  if (
    metadataResult.data.cefrLevel
  ) {
    formData.append(
      "cefrLevel",
      metadataResult.data.cefrLevel,
    );
  }

  let response: Response;

  try {
    response = await fetch(
      "/api/reading/sources/upload",
      {
        method: "POST",

        headers: {
          Accept: "application/json",
        },

        body: formData,
        signal,
      },
    );
  } catch (error) {
    if (
      error instanceof DOMException &&
      error.name === "AbortError"
    ) {
      throw error;
    }

    console.error(
      "Reading source upload network error:",
      error,
    );

    throw new ReadingSourceUploadError(
      "ارتباط با سرویس آپلود برقرار نشد.",
      0,
    );
  }

  const payload =
    await readJsonSafely(response);

  if (!response.ok) {
    throw new ReadingSourceUploadError(
      getErrorMessage(payload) ??
        "آپلود منبع Reading ناموفق بود.",

      response.status,
    );
  }

  const result =
    readingSourceUploadResultSchema.safeParse(
      payload,
    );

  if (!result.success) {
    console.error(
      "Invalid reading upload response:",
      result.error.flatten(),
    );

    throw new ReadingSourceUploadError(
      "پاسخ سرویس آپلود معتبر نیست.",
      500,
    );
  }

  return result.data;
}