import {
  NextResponse,
} from "next/server";

import {
  getListeningAttempt,
} from "../../../../../features/listening/api/get-listening-attempt";

export const runtime = "nodejs";

type ListeningAttemptRouteContext =
  Readonly<{
    params: Promise<{
      attemptId: string;
    }>;
  }>;

function normalizeAttemptId(
  attemptId: string,
): string {
  return attemptId.trim();
}

export async function GET(
  _request: Request,
  context: ListeningAttemptRouteContext,
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
          status: 404,
        },
      );
    }

    return NextResponse.json(
      attempt,
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
      "Listening attempt GET route failed:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "دریافت Attempt شنیداری با خطای غیرمنتظره مواجه شد.",
      },
      {
        status: 500,
      },
    );
  }
}