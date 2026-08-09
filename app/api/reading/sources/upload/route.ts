import {
  NextResponse,
} from "next/server";

import {
  readingUploadMetadataSchema,
  readingUploadOptionsSchema,
  readingUploadResultSchema,
} from "../../../../../features/reading/schemas/reading-upload.schema";

import {
  readingSourceUploadResultSchema,
} from "../../../../../features/reading/schemas/reading.schema";

import {
  validateReadingSourceFile,
} from "../../../../../features/reading/utils/validate-reading-source-file";

import type {
  ReadingSourceFileExtension,
} from "../../../../../features/reading/constants/reading.constants";

import type {
  ReadingUploadMetadata,
} from "../../../../../features/reading/types/reading-upload.types";

export const runtime = "nodejs";

const BACKEND_READING_UPLOAD_ENDPOINT =
  "/api/v1/reading/resources";

function shouldUseMockData(): boolean {
  return (
    process.env.USE_MOCKS !==
    "false"
  );
}

function getApiBaseUrl(): string {
  const apiBaseUrl =
    process.env.API_BASE_URL?.trim();

  if (!apiBaseUrl) {
    throw new Error(
      "API_BASE_URL is required when USE_MOCKS is disabled.",
    );
  }

  try {
    return new URL(
      apiBaseUrl,
    ).toString();
  } catch {
    throw new Error(
      "API_BASE_URL is not a valid URL.",
    );
  }
}

function startsWithBytes(
  source: Uint8Array,
  signature:
    readonly number[],
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
  extension:
    ReadingSourceFileExtension,
): Promise<boolean> {
  const header =
    new Uint8Array(
      await file
        .slice(0, 512)
        .arrayBuffer(),
    );

  switch (extension) {
    case ".pdf":
      return startsWithBytes(
        header,
        [
          0x25,
          0x50,
          0x44,
          0x46,
          0x2d,
        ],
      );

    case ".docx":
      return startsWithBytes(
        header,
        [
          0x50,
          0x4b,
          0x03,
          0x04,
        ],
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
        [
          0xff,
          0xd8,
          0xff,
        ],
      );

    case ".webp":
      return (
        readAscii(
          header,
          0,
          4,
        ) === "RIFF" &&
        readAscii(
          header,
          8,
          4,
        ) === "WEBP"
      );

    case ".txt":
      return !header.includes(0);

    default:
      return false;
  }
}

function getDefaultTitle(
  filename: string,
): string {
  return filename.replace(
    /\.[^.]+$/u,
    "",
  );
}

function readFormString(
  formData: FormData,
  key: string,
): string | null {
  const value =
    formData.get(key);

  if (
    typeof value !== "string"
  ) {
    return null;
  }

  const normalizedValue =
    value.trim();

  return normalizedValue ||
    null;
}

function parseUploadOptions(
  value: FormDataEntryValue | null,
): unknown {
  if (
    typeof value !== "string" ||
    !value.trim()
  ) {
    return {};
  }

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function parseMetadata(
  formData: FormData,
) {
  const optionsPayload =
    parseUploadOptions(
      formData.get("options"),
    );

  if (
    optionsPayload === null
  ) {
    return {
      success: false as const,

      error:
        "تنظیمات AI ساختار JSON معتبر ندارد.",
    };
  }

  const optionsResult =
    readingUploadOptionsSchema.safeParse(
      optionsPayload,
    );

  if (!optionsResult.success) {
    return {
      success: false as const,

      error:
        optionsResult.error
          .issues[0]?.message ??
        "تنظیمات AI معتبر نیست.",
    };
  }

  const metadataResult =
    readingUploadMetadataSchema.safeParse(
      {
        title:
          readFormString(
            formData,
            "title",
          ),

        languageCode:
          readFormString(
            formData,
            "languageCode",
          ) ?? "en",

        cefrLevel:
          readFormString(
            formData,
            "cefrLevel",
          ),

        options:
          optionsResult.data,
      },
    );

  if (!metadataResult.success) {
    return {
      success: false as const,

      error:
        metadataResult.error
          .issues[0]?.message ??
        "اطلاعات منبع معتبر نیست.",
    };
  }

  return {
    success: true as const,

    data:
      metadataResult.data,
  };
}

async function forwardToBackend(
  file: File,
  normalizedMimeType: string,
  metadata:
    ReadingUploadMetadata,
) {
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

  formData.append(
    "options",
    JSON.stringify(
      metadata.options,
    ),
  );

  const requestUrl =
    new URL(
      BACKEND_READING_UPLOAD_ENDPOINT,
      getApiBaseUrl(),
    );

  const response =
    await fetch(
      requestUrl,
      {
        method: "POST",

        headers: {
          Accept:
            "application/json",
        },

        body:
          formData,

        cache:
          "no-store",
      },
    );

  let payload: unknown =
    null;

  try {
    payload =
      await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    return NextResponse.json(
      {
        error:
          "Backend نتوانست منبع Reading را پردازش کند.",
      },
      {
        status:
          response.status,
      },
    );
  }

  /**
   * ابتدا قرارداد جدید را امتحان می‌کنیم.
   */
  const newResult =
    readingUploadResultSchema.safeParse(
      payload,
    );

  if (newResult.success) {
    return NextResponse.json(
      newResult.data,
      {
        status: 201,
      },
    );
  }

  /**
   * سازگاری موقت با Backend قدیمی.
   *
   * اگر Backend هنوز response قدیمی
   * را برگرداند، آن را به Contract
   * جدید Normalize می‌کنیم.
   */
  const legacyResult =
    readingSourceUploadResultSchema.safeParse(
      payload,
    );

  if (!legacyResult.success) {
    console.error(
      "Invalid Reading backend upload response:",
      {
        newContract:
          newResult.error.flatten(),

        legacyContract:
          legacyResult.error.flatten(),
      },
    );

    return NextResponse.json(
      {
        error:
          "ساختار پاسخ Backend معتبر نیست.",
      },
      {
        status: 502,
      },
    );
  }

  const normalizedResult =
    readingUploadResultSchema.parse(
      {
        ...legacyResult.data,

        upload: {
          receivedBytes:
            file.size,

          mimeType:
            normalizedMimeType,
        },

        options:
          metadata.options,
      },
    );

  return NextResponse.json(
    normalizedResult,
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

    const fileEntry =
      formData.get("file");

    if (
      !(fileEntry instanceof File)
    ) {
      return NextResponse.json(
        {
          error:
            "فایل منبع در درخواست وجود ندارد.",
        },
        {
          status: 400,
        },
      );
    }

    const fileValidation =
      validateReadingSourceFile(
        fileEntry,
      );

    if (
      !fileValidation.success
    ) {
      return NextResponse.json(
        {
          error:
            fileValidation.message,
        },
        {
          status: 415,
        },
      );
    }

    const metadataResult =
      parseMetadata(
        formData,
      );

    if (
      !metadataResult.success
    ) {
      return NextResponse.json(
        {
          error:
            metadataResult.error,
        },
        {
          status: 400,
        },
      );
    }

    const signatureIsValid =
      await validateFileSignature(
        fileEntry,
        fileValidation.extension,
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

    if (
      !shouldUseMockData()
    ) {
      return forwardToBackend(
        fileEntry,
        fileValidation
          .normalizedMimeType,
        metadataResult.data,
      );
    }

    const warnings: string[] = [
      "پروژه در حالت Mock اجرا می‌شود.",
    ];

    if (
      fileValidation.fileKind ===
      "image"
    ) {
      warnings.push(
        "کیفیت استخراج متن تصویر در Backend واقعی به وضوح تصویر وابسته خواهد بود.",
      );
    }

    if (
      metadataResult.data.options
        .analysisMode === "deep"
    ) {
      warnings.push(
        "تحلیل عمیق AI فعال است و در محیط Production می‌تواند زمان پردازش بیشتری نیاز داشته باشد.",
      );
    }

    const payload = {
      resourceId:
        "uploaded-reading-demo",

      title:
        metadataResult.data.title ??
        getDefaultTitle(
          fileEntry.name,
        ),

      status:
        "processing",

      processingStatus:
        "extracting",

      processingProgress: 18,

      originalFilename:
        fileEntry.name,

      sourceFileKind:
        fileValidation.fileKind,

      warnings,

      upload: {
        receivedBytes:
          fileEntry.size,

        mimeType:
          fileValidation
            .normalizedMimeType,
      },

      options:
        metadataResult.data.options,

      createdAt:
        new Date().toISOString(),
    };

    return NextResponse.json(
      readingUploadResultSchema.parse(
        payload,
      ),
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(
      "Reading upload route failed:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "پردازش فایل با خطای غیرمنتظره مواجه شد.",
      },
      {
        status: 500,
      },
    );
  }
}