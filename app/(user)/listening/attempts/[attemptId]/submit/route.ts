import {
  NextResponse,
} from "next/server";

import {
  listeningAnalysisMock,
} from "../../../../../../features/listening/mocks/listening-analysis.mock";

import {
  listeningAttemptAnalysisSchema,
} from "../../../../../../features/listening/schemas/listening-analysis.schema";

export const runtime = "nodejs";

const BACKEND_ATTEMPTS_ENDPOINT =
  "/api/v1/listening/attempts";

type ListeningAttemptSubmitRouteContext =
  Readonly<{
    params: Promise<{
      attemptId: string;
    }>;
  }>;

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

function normalizeAttemptId(
  attemptId: string,
): string {
  return attemptId.trim();
}

function getMockAnalysis(
  attemptId: string,
) {
  const analysis =
    listeningAnalysisMock.find(
      (item) =>
        item.attemptId ===
        attemptId,
    );

  if (!analysis) {
    return null;
  }

  const result =
    listeningAttemptAnalysisSchema.safeParse(
      analysis,
    );

  if (!result.success) {
    console.error(
      "Invalid Listening analysis mock:",
      result.error.flatten(),
    );

    throw new Error(
      "Listening analysis mock is invalid.",
    );
  }

  return result.data;
}

async function forwardSubmitToBackend(
  request: Request,
  attemptId: string,
) {
  const backendUrl = new URL(
    `${BACKEND_ATTEMPTS_ENDPOINT}/${encodeURIComponent(
      attemptId,
    )}/submit`,
    getApiBaseUrl(),
  );

  const requestBody =
    await request.text();

  const headers =
    new Headers();

  headers.set(
    "Accept",
    "application/json",
  );

  if (requestBody) {
    headers.set(
      "Content-Type",
      request.headers.get(
        "content-type",
      ) ?? "application/json",
    );
  }

  const response =
    await fetch(
      backendUrl,
      {
        method: "POST",

        headers,

        body:
          requestBody ||
          undefined,

        cache: "no-store",
      },
    );

  let payload: unknown = null;

  try {
    payload =
      await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const errorMessage =
      typeof payload ===
        "object" &&
      payload !== null &&
      "error" in payload &&
      typeof payload.error ===
        "string"
        ? payload.error
        : "Backend نتوانست Attempt را تحلیل کند.";

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
    listeningAttemptAnalysisSchema.safeParse(
      payload,
    );

  if (!parsedResult.success) {
    console.error(
      "Invalid Listening submit backend response:",
      parsedResult.error.flatten(),
    );

    return NextResponse.json(
      {
        error:
          "ساختار پاسخ تحلیل Listening از Backend معتبر نیست.",
      },
      {
        status: 502,
      },
    );
  }

  return NextResponse.json(
    parsedResult.data,
    {
      status: 200,

      headers: {
        "Cache-Control":
          "no-store",
      },
    },
  );
}

export async function POST(
  request: Request,
  context: ListeningAttemptSubmitRouteContext,
) {
  try {
    const {
      attemptId,
    } = await context.params;

    const normalizedAttemptId =
      normalizeAttemptId(
        attemptId,
      );

    if (!normalizedAttemptId) {
      return NextResponse.json(
        {
          error:
            "شناسه Attempt معتبر نیست.",
        },
        {
          status: 400,
        },
      );
    }

    if (!shouldUseMockData()) {
      return forwardSubmitToBackend(
        request,
        normalizedAttemptId,
      );
    }

    const analysis =
      getMockAnalysis(
        normalizedAttemptId,
      );

    if (!analysis) {
      return NextResponse.json(
        {
          error:
            "برای این Attempt داده Mock تحلیل وجود ندارد.",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      analysis,
      {
        status: 200,

        headers: {
          "Cache-Control":
            "no-store",
        },
      },
    );
  } catch (error) {
    console.error(
      "Listening attempt submit route failed:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "ارسال Attempt برای تحلیل با خطای غیرمنتظره مواجه شد.",
      },
      {
        status: 500,
      },
    );
  }
}