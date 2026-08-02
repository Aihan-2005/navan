import {
  randomUUID,
} from "node:crypto";

import {
  NextResponse,
} from "next/server";

import {
  LISTENING_MAX_EXTRACTED_TEXT_LENGTH,
} from "../../../../../features/listening/constants/listening.constants";

import {
  listeningNotesUploadResultSchema,
} from "../../../../../features/listening/schemas/listening-upload.schema";

import type {
  ListeningNotesFileExtension,
} from "../../../../../features/listening/constants/listening.constants";

import {
  validateListeningNotesFile,
} from "../../../../../features/listening/utils/validate-listening-notes-file";

export const runtime = "nodejs";

const LISTENING_NOTES_BACKEND_ENDPOINT =
  "/api/v1/listening/notes";

function shouldUseMockData(): boolean {
  return process.env.USE_MOCKS !== "false";
}

function getApiBaseUrl(): string {
  const apiBaseUrl =
    process.env.API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error(
      "API_BASE_URL is required when USE_MOCKS is disabled.",
    );
  }

  return apiBaseUrl;
}

function startsWithBytes(
  source: Uint8Array,
  signature: readonly number[],
): boolean {
  if (
    source.length <
    signature.length
  ) {
    return false;
  }

  return signature.every(
    (value, index) =>
      source[index] === value,
  );
}

function readAscii(
  source: Uint8Array,
  start: number,
  length: number,
): string {
  return String.fromCharCode(
    ...source.slice(
      start,
      start + length,
    ),
  );
}

async function validateFileSignature(
  file: File,
  extension: ListeningNotesFileExtension,
): Promise<boolean> {
  const header = new Uint8Array(
    await file
      .slice(0, 512)
      .arrayBuffer(),
  );

  switch (extension) {
    case ".pdf":
      return startsWithBytes(
        header,
        [0x25, 0x50, 0x44, 0x46, 0x2d],
      );

    case ".png":
      return startsWithBytes(
        header,
        [
          0x89,
          0x50,
          0x4e,
          0x47,
          0x0d,
          0x0a,
          0x1a,
          0x0a,
        ],
      );

    case ".jpg":
    case ".jpeg":
      return startsWithBytes(
        header,
        [0xff, 0xd8, 0xff],
      );

    case ".webp":
      return (
        readAscii(header, 0, 4) ===
          "RIFF" &&
        readAscii(header, 8, 4) ===
          "WEBP"
      );

    case ".docx":
      return startsWithBytes(
        header,
        [0x50, 0x4b, 0x03, 0x04],
      );

    case ".txt":
      return !header.includes(0);

    default:
      return false;
  }
}

function normalizeExtractedText(
  value: string,
): string {
  return value
    .replace(/\u0000/gu, "")
    .replace(/\r\n?/gu, "\n")
    .replace(/[ \t]+\n/gu, "\n")
    .replace(/\n{3,}/gu, "\n\n")
    .trim();
}

function createMockExtractedText(
  filename: string,
): string {
  return [
    `Imported notes from ${filename}`,
    "",
    "I usually wake up early in the morning and prepare breakfast before going to work.",
    "The journey normally takes about thirty minutes, but it can take longer when the traffic is heavy.",
    "After work, I often meet my friends or spend some time reading at home.",
  ].join("\n");
}

async function createMockResponse(
  file: File,
  extension: ListeningNotesFileExtension,
) {
  const warnings: string[] = [];

  let extractedText: string;
  let extractionConfidence: number;

  if (extension === ".txt") {
    extractedText =
      normalizeExtractedText(
        await file.text(),
      );

    extractionConfidence = 1;
  } else {
    extractedText =
      createMockExtractedText(
        file.name,
      );

    extractionConfidence =
      extension === ".jpg" ||
      extension === ".jpeg" ||
      extension === ".png" ||
      extension === ".webp"
        ? 0.86
        : 0.94;

    warnings.push(
      "پروژه در حالت Mock اجرا می‌شود؛ متن نمایش‌داده‌شده نمونه است و از فایل واقعی استخراج نشده است.",
    );

    warnings.push(
      "استخراج واقعی Word، PDF و تصویر پس از اتصال سرویس Backend/OCR فعال می‌شود.",
    );
  }

  if (!extractedText) {
    return NextResponse.json(
      {
        error:
          "هیچ متن قابل استفاده‌ای از فایل استخراج نشد.",
      },
      {
        status: 422,
      },
    );
  }

  if (
    extractedText.length >
    LISTENING_MAX_EXTRACTED_TEXT_LENGTH
  ) {
    extractedText =
      extractedText.slice(
        0,
        LISTENING_MAX_EXTRACTED_TEXT_LENGTH,
      );

    warnings.push(
      "متن استخراج‌شده به دلیل طول زیاد کوتاه شده است.",
    );
  }

  const payload = {
    id: `note_${randomUUID()}`,

    originalFilename: file.name,

    mimeType:
      file.type ||
      "application/octet-stream",

    sizeBytes: file.size,

    fileKind:
      extension === ".txt"
        ? "text"
        : extension === ".jpg" ||
            extension === ".jpeg" ||
            extension === ".png" ||
            extension === ".webp"
          ? "image"
          : "document",

    extractedText,
    extractionConfidence,

    warnings,

    createdAt:
      new Date().toISOString(),
  };

  return NextResponse.json(
    listeningNotesUploadResultSchema.parse(
      payload,
    ),
    {
      status: 201,
    },
  );
}

async function forwardToBackend(
  file: File,
) {
  const backendFormData =
    new FormData();

  backendFormData.append(
    "file",
    file,
    file.name,
  );

  const requestUrl = new URL(
    LISTENING_NOTES_BACKEND_ENDPOINT,
    getApiBaseUrl(),
  );

  const response = await fetch(
    requestUrl,
    {
      method: "POST",

      body: backendFormData,

      cache: "no-store",
    },
  );

  let payload: unknown = null;

  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const errorMessage =
      typeof payload === "object" &&
      payload !== null &&
      "error" in payload &&
      typeof payload.error === "string"
        ? payload.error
        : "سرویس استخراج نوشته با خطا مواجه شد.";

    return NextResponse.json(
      {
        error: errorMessage,
      },
      {
        status: response.status,
      },
    );
  }

  const parsedResult =
    listeningNotesUploadResultSchema.safeParse(
      payload,
    );

  if (!parsedResult.success) {
    console.error(
      "Invalid listening notes backend response:",
      parsedResult.error.flatten(),
    );

    return NextResponse.json(
      {
        error:
          "پاسخ Backend استخراج نوشته معتبر نیست.",
      },
      {
        status: 502,
      },
    );
  }

  return NextResponse.json(
    parsedResult.data,
    {
      status: 201,
    },
  );
}

export async function POST(
  request: Request,
) {
  try {
    const formData =
      await request.formData();

    const formDataEntry =
      formData.get("file");

    if (
      !(formDataEntry instanceof File)
    ) {
      return NextResponse.json(
        {
          error:
            "فایل نوشته در درخواست وجود ندارد.",
        },
        {
          status: 400,
        },
      );
    }

    const validationResult =
      validateListeningNotesFile(
        formDataEntry,
      );

    if (!validationResult.success) {
      const status =
        validationResult.code ===
        "file_too_large"
          ? 413
          : validationResult.code ===
                "unsupported_extension" ||
              validationResult.code ===
                "invalid_mime_type"
            ? 415
            : 400;

      return NextResponse.json(
        {
          error:
            validationResult.message,
        },
        {
          status,
        },
      );
    }

    const signatureIsValid =
      await validateFileSignature(
        formDataEntry,
        validationResult.extension,
      );

    if (!signatureIsValid) {
      return NextResponse.json(
        {
          error:
            "محتوای واقعی فایل با فرمت اعلام‌شده هماهنگ نیست.",
        },
        {
          status: 415,
        },
      );
    }

    if (shouldUseMockData()) {
      return createMockResponse(
        formDataEntry,
        validationResult.extension,
      );
    }

    return forwardToBackend(
      formDataEntry,
    );
  } catch (error) {
    console.error(
      "Listening notes upload route failed:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "پردازش فایل نوشته با خطای غیرمنتظره مواجه شد.",
      },
      {
        status: 500,
      },
    );
  }
}