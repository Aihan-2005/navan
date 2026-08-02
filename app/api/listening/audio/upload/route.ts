import {
  randomUUID,
} from "node:crypto";

import {
  NextResponse,
} from "next/server";

import {
  CUSTOM_AUDIO_FILE_RULES,
  type CustomAudioFileExtension,
} from "../../../../../features/listening/constants/listening-custom-source.constants";

import {
  customAudioUploadMetadataSchema,
  customAudioUploadResultSchema,
} from "../../../../../features/listening/schemas/listening-custom-source.schema";

import {
  validateListeningAudioFile,
} from "../../../../../features/listening/utils/validate-listening-audio-file";

export const runtime = "nodejs";

const BACKEND_AUDIO_ENDPOINT =
  "/api/v1/listening/audio";

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

async function validateAudioSignature(
  file: File,
  extension: CustomAudioFileExtension,
): Promise<boolean> {
  const header = new Uint8Array(
    await file
      .slice(0, 64)
      .arrayBuffer(),
  );

  switch (extension) {
    case ".mp3":
      return (
        readAscii(header, 0, 3) ===
          "ID3" ||
        (header[0] === 0xff &&
          (header[1] & 0xe0) === 0xe0)
      );

    case ".wav":
      return (
        readAscii(header, 0, 4) ===
          "RIFF" &&
        readAscii(header, 8, 4) ===
          "WAVE"
      );

    case ".m4a":
      return (
        readAscii(header, 4, 4) ===
        "ftyp"
      );

    case ".ogg":
      return (
        readAscii(header, 0, 4) ===
        "OggS"
      );

    case ".webm":
      return startsWithBytes(
        header,
        [
          0x1a,
          0x45,
          0xdf,
          0xa3,
        ],
      );

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
  title: string,
  languageCode: string,
) {
  const backendFormData =
    new FormData();

  backendFormData.append(
    "file",
    file,
    file.name,
  );

  backendFormData.append(
    "title",
    title,
  );

  backendFormData.append(
    "languageCode",
    languageCode,
  );

  const requestUrl = new URL(
    BACKEND_AUDIO_ENDPOINT,
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
    return NextResponse.json(
      {
        error:
          "Backend نتوانست فایل صوتی را پردازش کند.",
      },
      {
        status: response.status,
      },
    );
  }

  const parsedResult =
    customAudioUploadResultSchema.safeParse(
      payload,
    );

  if (!parsedResult.success) {
    console.error(
      "Invalid custom audio backend response:",
      parsedResult.error.flatten(),
    );

    return NextResponse.json(
      {
        error:
          "پاسخ Backend فایل صوتی معتبر نیست.",
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

    const fileEntry =
      formData.get("file");

    if (!(fileEntry instanceof File)) {
      return NextResponse.json(
        {
          error:
            "فایل صوتی در درخواست وجود ندارد.",
        },
        {
          status: 400,
        },
      );
    }

    const validationResult =
      validateListeningAudioFile(
        fileEntry,
      );

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error:
            validationResult.message,
        },
        {
          status: 415,
        },
      );
    }

    const metadataResult =
      customAudioUploadMetadataSchema.safeParse(
        {
          title:
            formData.get("title") ||
            null,

          languageCode:
            formData.get(
              "languageCode",
            ) || "en",
        },
      );

    if (!metadataResult.success) {
      return NextResponse.json(
        {
          error:
            "اطلاعات فایل صوتی معتبر نیست.",
        },
        {
          status: 400,
        },
      );
    }

    const signatureIsValid =
      await validateAudioSignature(
        fileEntry,
        validationResult.extension,
      );

    if (!signatureIsValid) {
      return NextResponse.json(
        {
          error:
            "محتوای فایل با فرمت اعلام‌شده هماهنگ نیست.",
        },
        {
          status: 415,
        },
      );
    }

    const title =
      metadataResult.data.title ??
      getDefaultTitle(
        fileEntry.name,
      );

    if (!shouldUseMockData()) {
      return forwardToBackend(
        fileEntry,
        title,
        metadataResult.data
          .languageCode,
      );
    }

    const payload = {
      jobId: `audio_job_${randomUUID()}`,

      contentId: null,

      sourceType: "user_upload",

      title,

      originalFilename:
        fileEntry.name,

      mimeType:
        fileEntry.type ||
        (
          CUSTOM_AUDIO_FILE_RULES[
            validationResult.extension
          ].mimeTypes as readonly string[]
        )[0],

      sizeBytes: fileEntry.size,

      languageCode:
        metadataResult.data
          .languageCode,

      durationSeconds: null,

      status: "transcribing",

      warnings: [
        "پروژه در حالت Mock اجرا می‌شود؛ فایل دائماً ذخیره نشده است.",
        "اتصال Speech-to-Text در Backend مرحله بعد انجام می‌شود.",
      ],

      createdAt:
        new Date().toISOString(),
    };

    return NextResponse.json(
      customAudioUploadResultSchema.parse(
        payload,
      ),
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(
      "Custom audio upload route failed:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "پردازش فایل صوتی با خطای غیرمنتظره مواجه شد.",
      },
      {
        status: 500,
      },
    );
  }
}