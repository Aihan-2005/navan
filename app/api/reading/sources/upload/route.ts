import {
  NextResponse,
} from "next/server";

import {
  readingSourceUploadMetadataSchema,
  readingSourceUploadResultSchema,
} from "../../../../../features/reading/schemas/reading.schema";

import {
  validateReadingSourceFile,
} from "../../../../../features/reading/utils/validate-reading-source-file";

import type {
  ReadingSourceFileExtension,
} from "../../../../../features/reading/constants/reading.constants";

export const runtime = "nodejs";

const BACKEND_READING_UPLOAD_ENDPOINT =
  "/api/v1/reading/resources";

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
  extension: ReadingSourceFileExtension,
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

    case ".docx":
      return startsWithBytes(
        header,
        [0x50, 0x4b, 0x03, 0x04],
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

async function forwardToBackend(
  file: File,
  metadata: {
    title: string | null;
    languageCode: string;
    cefrLevel: string | null;
  },
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

  const requestUrl = new URL(
    BACKEND_READING_UPLOAD_ENDPOINT,
    getApiBaseUrl(),
  );

  const response = await fetch(
    requestUrl,
    {
      method: "POST",
      body: formData,
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
    return NextResponse.json(
      {
        error:
          "Backend نتوانست منبع Reading را پردازش کند.",
      },
      {
        status: response.status,
      },
    );
  }

  const result =
    readingSourceUploadResultSchema.safeParse(
      payload,
    );

  if (!result.success) {
    console.error(
      "Invalid reading backend response:",
      result.error.flatten(),
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

  return NextResponse.json(
    result.data,
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

    if (!fileValidation.success) {
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
      readingSourceUploadMetadataSchema.safeParse(
        {
          title:
            formData.get("title") ||
            null,

          languageCode:
            formData.get(
              "languageCode",
            ) || "en",

          cefrLevel:
            formData.get(
              "cefrLevel",
            ) || null,
        },
      );

    if (!metadataResult.success) {
      return NextResponse.json(
        {
          error:
            metadataResult.error
              .issues[0]?.message ??
            "اطلاعات منبع معتبر نیست.",
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

    if (!shouldUseMockData()) {
      return forwardToBackend(
        fileEntry,
        metadataResult.data,
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

      processingProgress:
        18,

      originalFilename:
        fileEntry.name,

      sourceFileKind:
        fileValidation.fileKind,

      warnings: [
        "پروژه در حالت Mock اجرا می‌شود.",
        "در Backend واقعی متن استخراج، تحلیل و بخش‌بندی خواهد شد.",
      ],

      createdAt:
        new Date().toISOString(),
    };

    return NextResponse.json(
      readingSourceUploadResultSchema.parse(
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