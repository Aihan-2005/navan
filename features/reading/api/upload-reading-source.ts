import {
  readingUploadMetadataSchema,
  readingUploadResultSchema,
} from "../schemas/reading-upload.schema";

import type {
  ReadingUploadMetadata,
  ReadingUploadRequestOptions,
  ReadingUploadResult,
} from "../types/reading-upload.types";

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

function parseJsonSafely(
  value: string,
): unknown {
  if (!value.trim()) {
    return null;
  }

  try {
    return JSON.parse(value);
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

function createAbortError(): DOMException {
  return new DOMException(
    "Reading upload was aborted.",
    "AbortError",
  );
}

function buildUploadFormData(
  file: File,
  metadata: ReadingUploadMetadata,
): FormData {
  const formData =
    new FormData();

  formData.append(
    "file",
    file,
    file.name,
  );

  if (metadata.title) {
    formData.append(
      "title",
      metadata.title,
    );
  }

  formData.append(
    "languageCode",
    metadata.languageCode,
  );

  if (metadata.cefrLevel) {
    formData.append(
      "cefrLevel",
      metadata.cefrLevel,
    );
  }

  /**
   * تنظیمات AI را به‌صورت JSON
   * ارسال می‌کنیم تا FormData
   * تبدیل به مجموعه‌ای از فیلدهای
   * شکننده نشود.
   */
  formData.append(
    "options",
    JSON.stringify(
      metadata.options,
    ),
  );

  return formData;
}

export async function uploadReadingSource(
  file: File,
  metadata: ReadingUploadMetadata,
  options: ReadingUploadRequestOptions = {},
): Promise<ReadingUploadResult> {
  validateUploadFile(file);

  const metadataResult =
    readingUploadMetadataSchema.safeParse(
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

  if (options.signal?.aborted) {
    throw createAbortError();
  }

  const formData =
    buildUploadFormData(
      file,
      metadataResult.data,
    );

  return new Promise<
    ReadingUploadResult
  >(
    (
      resolve,
      reject,
    ) => {
      const request =
        new XMLHttpRequest();

      let settled = false;

      const cleanup = () => {
        options.signal?.removeEventListener(
          "abort",
          handleExternalAbort,
        );
      };

      const finishResolve = (
        result: ReadingUploadResult,
      ) => {
        if (settled) {
          return;
        }

        settled = true;
        cleanup();
        resolve(result);
      };

      const finishReject = (
        error: unknown,
      ) => {
        if (settled) {
          return;
        }

        settled = true;
        cleanup();
        reject(error);
      };

      const handleExternalAbort =
        () => {
          request.abort();
        };

      options.signal?.addEventListener(
        "abort",
        handleExternalAbort,
        {
          once: true,
        },
      );

      request.open(
        "POST",
        "/api/reading/sources/upload",
        true,
      );

      request.setRequestHeader(
        "Accept",
        "application/json",
      );

      request.upload.onprogress =
        (event) => {
          if (
            !event.lengthComputable ||
            event.total <= 0
          ) {
            return;
          }

          const progress =
            Math.min(
              100,
              Math.max(
                0,
                Math.round(
                  (event.loaded /
                    event.total) *
                    100,
                ),
              ),
            );

          options.onProgress?.(
            progress,
          );
        };

      request.onload = () => {
        const payload =
          parseJsonSafely(
            request.responseText,
          );

        if (
          request.status < 200 ||
          request.status >= 300
        ) {
          finishReject(
            new ReadingSourceUploadError(
              getErrorMessage(
                payload,
              ) ??
                "آپلود منبع Reading ناموفق بود.",
              request.status,
            ),
          );

          return;
        }

        const result =
          readingUploadResultSchema.safeParse(
            payload,
          );

        if (!result.success) {
          console.error(
            "Invalid Reading upload response:",
            result.error.flatten(),
          );

          finishReject(
            new ReadingSourceUploadError(
              "پاسخ سرویس آپلود معتبر نیست.",
              500,
            ),
          );

          return;
        }

        options.onProgress?.(
          100,
        );

        finishResolve(
          result.data,
        );
      };

      request.onerror = () => {
        finishReject(
          new ReadingSourceUploadError(
            "ارتباط با سرویس آپلود برقرار نشد.",
            0,
          ),
        );
      };

      request.onabort = () => {
        finishReject(
          createAbortError(),
        );
      };

      try {
        request.send(
          formData,
        );
      } catch (error) {
        finishReject(
          error instanceof Error
            ? error
            : new ReadingSourceUploadError(
                "ارسال فایل آغاز نشد.",
                0,
              ),
        );
      }
    },
  );
}
















