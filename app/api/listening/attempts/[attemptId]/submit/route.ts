import {
  NextResponse,
} from "next/server";

import {
  parseListeningApiResponse,
} from "../../../../../../features/listening/api/listening-api-client";

import {
  fetchListeningBackend,
} from "../../../../../../features/listening/api/listening-server-client";

import {
  listeningAnalysisMock,
} from "../../../../../../features/listening/mocks/listening-analysis.mock";

import {
  listeningAttemptAnalysisSchema,
} from "../../../../../../features/listening/schemas/listening-analysis.schema";

import {
  submitListeningAttemptInputSchema,
} from "../../../../../../features/listening/schemas/listening-bff.schema";

import {
  getMockListeningAttemptDraft,
  markMockListeningAttemptSubmitted,
} from "../../../../../../features/listening/server/listening-mock-attempt-store";

export const runtime =
  "nodejs";

export const dynamic =
  "force-dynamic";

const BACKEND_ATTEMPTS_ENDPOINT =
  "/api/v1/listening/attempts";

type ListeningAttemptSubmitRouteContext =
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

function getLegacyMockAnalysis(
  attemptId:
    string,
) {
  return (
    listeningAnalysisMock.find(
      (analysis) =>
        analysis.attemptId ===
        attemptId,
    ) ??
    null
  );
}

function getContentMockAnalysis(
  contentId:
    string,
) {
  return (
    listeningAnalysisMock.find(
      (analysis) =>
        analysis.contentId ===
        contentId,
    ) ??
    null
  );
}

export async function POST(
  request:
    Request,

  context:
    ListeningAttemptSubmitRouteContext,
) {
  try {
    const {
      attemptId,
    } =
      await context.params;

    const normalizedAttemptId =
      attemptId.trim();

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
      payload =
        null;
    }

    if (
      !shouldUseMockData()
    ) {
      const inputResult =
        submitListeningAttemptInputSchema.safeParse(
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
              "اطلاعات Submit معتبر نیست.",
          },
          {
            status:
              400,
          },
        );
      }

      const backendResponse =
        await fetchListeningBackend(
          `${BACKEND_ATTEMPTS_ENDPOINT}/${encodeURIComponent(
            normalizedAttemptId,
          )}/submit`,
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

      const analysis =
        await parseListeningApiResponse(
          backendResponse,
          listeningAttemptAnalysisSchema,
          "Backend نتوانست Attempt را تحلیل کند.",
        );

      return NextResponse.json(
        analysis,
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

    const inputResult =
      submitListeningAttemptInputSchema.safeParse(
        payload,
      );

    const storedAttempt =
      getMockListeningAttemptDraft(
        normalizedAttemptId,
      );

    if (
      storedAttempt &&
      inputResult.success
    ) {
      const template =
        getContentMockAnalysis(
          storedAttempt.contentId,
        );

      if (!template) {
        return NextResponse.json(
          {
            error:
              "برای این محتوای Mock هنوز نمونه تحلیل وجود ندارد. قرارداد Submit آماده است و با Backend واقعی برای همه محتواها کار خواهد کرد.",
          },
          {
            status:
              422,
          },
        );
      }

      markMockListeningAttemptSubmitted(
        normalizedAttemptId,
      );

      const analysis =
        listeningAttemptAnalysisSchema.parse(
          {
            ...template,

            attemptId:
              normalizedAttemptId,

            contentId:
              storedAttempt.contentId,

            practiceMode:
              inputResult.data
                .practiceMode,

            submittedTranscript:
              inputResult.data
                .transcript,

            engine:
              "mock",

            createdAt:
              storedAttempt
                .createdAt,

            completedAt:
              new Date()
                .toISOString(),
          },
        );

      return NextResponse.json(
        analysis,
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

    const legacyAnalysis =
      getLegacyMockAnalysis(
        normalizedAttemptId,
      );

    if (
      legacyAnalysis
    ) {
      return NextResponse.json(
        listeningAttemptAnalysisSchema.parse(
          legacyAnalysis,
        ),
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

    return NextResponse.json(
      {
        error:
          "Attempt Mock موردنظر پیدا نشد.",
      },
      {
        status:
          404,
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
          error instanceof Error
            ? error.message
            : "ارسال Attempt برای تحلیل با خطا مواجه شد.",
      },
      {
        status:
          500,
      },
    );
  }
}