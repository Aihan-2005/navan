import {
  NextResponse,
} from "next/server";

import {
  parseListeningApiResponse,
} from "../../../../features/listening/api/listening-api-client";

import {
  fetchListeningBackend,
} from "../../../../features/listening/api/listening-server-client";

import {
  createListeningAttemptInputSchema,
  createListeningAttemptResponseSchema,
} from "../../../../features/listening/schemas/listening-bff.schema";

import {
  createMockListeningAttempt,
} from "../../../../features/listening/server/listening-mock-attempt-store";

export const runtime =
  "nodejs";

export const dynamic =
  "force-dynamic";

const BACKEND_ATTEMPTS_ENDPOINT =
  "/api/v1/listening/attempts";

function shouldUseMockData(): boolean {
  return (
    process.env.USE_MOCKS !==
    "false"
  );
}

export async function POST(
  request:
    Request,
) {
  try {
    let payload:
      unknown;

    try {
      payload =
        await request.json();
    } catch {
      return NextResponse.json(
        {
          error:
            "بدنه درخواست JSON معتبر نیست.",
        },
        {
          status:
            400,
        },
      );
    }

    const inputResult =
      createListeningAttemptInputSchema.safeParse(
        payload,
      );

    if (
      !inputResult.success
    ) {
      return NextResponse.json(
        {
          error:
            inputResult.error
              .issues[0]
              ?.message ??
            "اطلاعات شروع تمرین معتبر نیست.",
        },
        {
          status:
            400,
        },
      );
    }

    if (
      shouldUseMockData()
    ) {
      const attempt =
        createMockListeningAttempt(
          inputResult.data,
        );

      return NextResponse.json(
        attempt,
        {
          status:
            201,

          headers: {
            "Cache-Control":
              "no-store",
          },
        },
      );
    }

    const backendResponse =
      await fetchListeningBackend(
        BACKEND_ATTEMPTS_ENDPOINT,
        {
          method:
            "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify(
              inputResult.data,
            ),

          cache:
            "no-store",
        },
        {
          requireAuthentication:
            true,
        },
      );

    const attempt =
      await parseListeningApiResponse(
        backendResponse,
        createListeningAttemptResponseSchema,
        "Backend نتوانست Attempt شنیداری را ایجاد کند.",
      );

    return NextResponse.json(
      attempt,
      {
        status:
          backendResponse.status,

        headers: {
          "Cache-Control":
            "no-store",
        },
      },
    );
  } catch (error) {
    console.error(
      "Create listening attempt route failed:",
      error,
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "شروع تمرین شنیداری با خطا مواجه شد.",
      },
      {
        status:
          500,
      },
    );
  }
}