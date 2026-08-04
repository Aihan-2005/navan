import {
  randomUUID,
} from "node:crypto";
import {
  isIP,
} from "node:net";

import {
  NextResponse,
} from "next/server";

import {
  customAudioUrlImportRequestSchema,
  customAudioUrlImportResultSchema,
} from "../../../../../features/listening/schemas/listening-custom-source.schema";

export const runtime = "nodejs";

const BACKEND_IMPORT_ENDPOINT =
  "/api/v1/listening/imports";

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

function normalizeHostname(
  hostname: string,
): string {
  return hostname
    .replace(/^\[/u, "")
    .replace(/\]$/u, "")
    .toLowerCase();
}

function isPrivateIpv4(
  hostname: string,
): boolean {
  const octets = hostname
    .split(".")
    .map(Number);

  if (
    octets.length !== 4 ||
    octets.some(
      (value) =>
        !Number.isInteger(value) ||
        value < 0 ||
        value > 255,
    )
  ) {
    return true;
  }

  const [first, second] =
    octets;

  return (
    first === 0 ||
    first === 10 ||
    first === 127 ||
    (first === 169 &&
      second === 254) ||
    (first === 172 &&
      second >= 16 &&
      second <= 31) ||
    (first === 192 &&
      second === 168) ||
    first >= 224
  );
}

function isPrivateIpv6(
  hostname: string,
): boolean {
  const normalized =
    hostname.toLowerCase();

  return (
    normalized === "::1" ||
    normalized === "::" ||
    normalized.startsWith("fc") ||
    normalized.startsWith("fd") ||
    normalized.startsWith("fe8") ||
    normalized.startsWith("fe9") ||
    normalized.startsWith("fea") ||
    normalized.startsWith("feb")
  );
}

function isAllowedHostname(
  hostname: string,
): boolean {
  const configuredHosts =
    process.env
      .LISTENING_ALLOWED_AUDIO_HOSTS
      ?.split(",")
      .map((host) =>
        host.trim().toLowerCase(),
      )
      .filter(Boolean) ?? [];

  if (
    configuredHosts.length === 0
  ) {
    return true;
  }

  return configuredHosts.some(
    (allowedHost) =>
      hostname === allowedHost ||
      hostname.endsWith(
        `.${allowedHost}`,
      ),
  );
}

function validateExternalAudioUrl(
  value: string,
):
  | {
      success: true;
      url: URL;
    }
  | {
      success: false;
      message: string;
    } {
  let parsedUrl: URL;

  try {
    parsedUrl = new URL(value);
  } catch {
    return {
      success: false,
      message:
        "ساختار لینک معتبر نیست.",
    };
  }

  if (
    parsedUrl.protocol !== "https:"
  ) {
    return {
      success: false,

      message:
        "فقط لینک‌های امن HTTPS پذیرفته می‌شوند.",
    };
  }

  if (
    parsedUrl.username ||
    parsedUrl.password
  ) {
    return {
      success: false,

      message:
        "لینک نباید شامل نام کاربری یا رمز عبور باشد.",
    };
  }

  if (
    parsedUrl.port &&
    parsedUrl.port !== "443"
  ) {
    return {
      success: false,

      message:
        "پورت لینک مجاز نیست.",
    };
  }

  const hostname =
    normalizeHostname(
      parsedUrl.hostname,
    );

  const blockedHostnames = [
    "localhost",
    "localhost.localdomain",
  ];

  if (
    blockedHostnames.includes(
      hostname,
    ) ||
    hostname.endsWith(
      ".localhost",
    ) ||
    hostname.endsWith(".local") ||
    hostname.endsWith(".internal")
  ) {
    return {
      success: false,

      message:
        "این مقصد شبکه مجاز نیست.",
    };
  }

  const ipVersion = isIP(hostname);

  if (
    (ipVersion === 4 &&
      isPrivateIpv4(hostname)) ||
    (ipVersion === 6 &&
      isPrivateIpv6(hostname))
  ) {
    return {
      success: false,

      message:
        "آدرس‌های IP خصوصی یا محلی پذیرفته نمی‌شوند.",
    };
  }

  if (!isAllowedHostname(hostname)) {
    return {
      success: false,

      message:
        "دامنه این لینک در فهرست سرویس‌های مجاز نیست.",
    };
  }

  return {
    success: true,
    url: parsedUrl,
  };
}

async function forwardToBackend(
  input: {
    url: string;
    title: string | null;
    languageCode: string;
  },
) {
  const requestUrl = new URL(
    BACKEND_IMPORT_ENDPOINT,
    getApiBaseUrl(),
  );

  const response = await fetch(
    requestUrl,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify(input),

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
          "Backend نتوانست لینک صوتی را پردازش کند.",
      },
      {
        status: response.status,
      },
    );
  }

  const parsedResult =
    customAudioUrlImportResultSchema.safeParse(
      payload,
    );

  if (!parsedResult.success) {
    return NextResponse.json(
      {
        error:
          "پاسخ Backend لینک صوتی معتبر نیست.",
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
    const payload: unknown =
      await request.json();

    const inputResult =
      customAudioUrlImportRequestSchema.safeParse(
        payload,
      );

    if (!inputResult.success) {
      return NextResponse.json(
        {
          error:
            inputResult.error.issues[0]
              ?.message ??
            "اطلاعات لینک معتبر نیست.",
        },
        {
          status: 400,
        },
      );
    }

    const urlValidation =
      validateExternalAudioUrl(
        inputResult.data.url,
      );

    if (!urlValidation.success) {
      return NextResponse.json(
        {
          error:
            urlValidation.message,
        },
        {
          status: 400,
        },
      );
    }

    const normalizedInput = {
      url:
        urlValidation.url.toString(),

      title:
        inputResult.data.title,

      languageCode:
        inputResult.data
          .languageCode,
    };

    if (!shouldUseMockData()) {
      return forwardToBackend(
        normalizedInput,
      );
    }

    const title =
      normalizedInput.title ??
      `Audio from ${urlValidation.url.hostname}`;

    const responsePayload = {
      jobId: `url_job_${randomUUID()}`,

      contentId: null,

      sourceType: "external_url",

      title,

      submittedUrl:
        urlValidation.url.toString(),

      hostname:
        urlValidation.url.hostname,

      languageCode:
        normalizedInput.languageCode,

      durationSeconds: null,

      status: "transcribing",

      warnings: [
        "پروژه در حالت Mock اجرا می‌شود و لینک واقعاً دانلود نشده است.",
        "Backend واقعی باید پس از DNS Resolution و Redirect نیز مقصد را دوباره اعتبارسنجی کند.",
      ],

      createdAt:
        new Date().toISOString(),
    };

    return NextResponse.json(
      customAudioUrlImportResultSchema.parse(
        responsePayload,
      ),
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(
      "Custom audio URL route failed:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "ثبت لینک با خطای غیرمنتظره مواجه شد.",
      },
      {
        status: 500,
      },
    );
  }
}