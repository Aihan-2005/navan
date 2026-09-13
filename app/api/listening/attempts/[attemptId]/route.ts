import {
  NextResponse,
} from "next/server";

import {
  getListeningAttempt,
} from "../../../../../features/listening/api/get-listening-attempt";

import {
  parseListeningApiResponse,
} from "../../../../../features/listening/api/listening-api-client";

import {
  fetchListeningBackend,
} from "../../../../../features/listening/api/listening-server-client";

import {
  updateListeningDraftInputSchema,
  updateListeningDraftResponseSchema,
} from "../../../../../features/listening/schemas/listening-bff.schema";

import {
  updateMockListeningAttemptDraft,
} from "../../../../../features/listening/server/listening-mock-attempt-store";

export const runtime =
  "nodejs";

export const dynamic =
  "force-dynamic";

const BACKEND_ATTEMPTS_ENDPOINT =
  "/api/v1/listening/attempts";

type ListeningAttemptRouteContext =
  Readonly<{
    params:
      Promise<{
        attemptId:
          string;
      }>;
  }>;

function shouldUseMockData(): boolean {
  return (
    process.env.USE_MOCKS !==
    "false"
  );
}

function normalizeAttemptId(
  attemptId:
    string,
): string {
  return attemptId.trim();
}

export async function GET(
  _request:
    Request,

  context:
    ListeningAttemptRouteContext,
) {
  try {
    const {
      attemptId,
    } =
      await context.params;

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
          status:
            400,
        },
      );
    }

    const attempt =
      await getListeningAttempt(
        normalizedAttemptId,
      );

    if (!attempt) {
      return NextResponse.json(
        {
          error:
            "Attempt موردنظر پیدا نشد.",
        },
        {
          status:
            404,
        },
      );
    }

    return NextResponse.json(
      attempt,
      {
        status:
          200,

        headers: {
          "Cache-Control":
            "no-store",
        },
      },
    );
  } catch (error) {
    console.error(
      "Listening attempt GET route failed:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "دریافت Attempt شنیداری با خطا مواجه شد.",
      },
      {
        status:
          500,
      },
    );
  }
}

export async function PATCH(
  request:
    Request,

  context:
    ListeningAttemptRouteContext,
) {
  try {
    const {
      attemptId,
    } =
      await context.params;

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
          status:
            400,
        },
      );
    }

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
      updateListeningDraftInputSchema.safeParse(
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
            "اطلاعات Draft معتبر نیست.",
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
      const updated =
        updateMockListeningAttemptDraft(
          normalizedAttemptId,
          inputResult.data,
        );

      if (!updated) {
        return NextResponse.json(
          {
            error:
              "Draft موردنظر پیدا نشد.",
          },
          {
            status:
              404,
          },
        );
      }

      return NextResponse.json(
        updated,
        {
          status:
            200,

          headers: {
            "Cache-Control":
              "no-store",
          },
        },
      );
    }

    const backendResponse =
      await fetchListeningBackend(
        `${BACKEND_ATTEMPTS_ENDPOINT}/${encodeURIComponent(
          normalizedAttemptId,
        )}`,
        {
          method:
            "PATCH",

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

    const updated =
      await parseListeningApiResponse(
        backendResponse,
        updateListeningDraftResponseSchema,
        "Backend نتوانست Draft شنیداری را ذخیره کند.",
      );

    return NextResponse.json(
      updated,
      {
        status:
          200,

        headers: {
          "Cache-Control":
            "no-store",
        },
      },
    );
  } catch (error) {
    console.error(
      "Listening attempt PATCH route failed:",
      error,
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "ذخیره Draft شنیداری با خطا مواجه شد.",
      },
      {
        status:
          500,
      },
    );
  }
}