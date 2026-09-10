import {
  NextResponse,
} from "next/server";

import {
  auth,
} from "../../../../auth";

import {
  getAssessmentDefinition,
} from "../../../../features/assessment/api/get-assessment-definition";

import {
  getLearnerAssessmentContext,
} from "../../../../features/assessment/integrations/get-learner-assessment-context";

import {
  adaptivePlacementAnswerInputSchema,
  adaptivePlacementStartInputSchema,
} from "../../../../features/assessment/schemas/adaptive-placement.schema";

import {
  AdaptivePlacementSessionError,
  startAdaptivePlacementSession,
  submitAdaptivePlacementAnswer,
} from "../../../../features/assessment/server/adaptive-placement-session.service";

export const runtime =
  "nodejs";

export const dynamic =
  "force-dynamic";

function isMockMode(): boolean {
  return (
    process.env.USE_MOCKS !==
    "false"
  );
}

function handleServiceError(
  error:
    unknown,
) {
  if (
    error instanceof
    AdaptivePlacementSessionError
  ) {
    return NextResponse.json(
      {
        error:
          error.message,
      },
      {
        status:
          error.statusCode,
      },
    );
  }

  console.error(
    "Adaptive placement error:",
    error,
  );

  return NextResponse.json(
    {
      error:
        "اجرای آزمون تعیین سطح با خطای غیرمنتظره مواجه شد.",
    },
    {
      status:
        500,
    },
  );
}

export async function POST(
  request:
    Request,
) {
  try {
    const session =
      await auth();

    if (
      !session?.user?.id
    ) {
      return NextResponse.json(
        {
          error:
            "برای شروع تعیین سطح باید وارد حساب کاربری شوید.",
        },
        {
          status:
            401,
        },
      );
    }

    if (
      !isMockMode()
    ) {
      return NextResponse.json(
        {
          error:
            "Adaptive Placement Backend هنوز به این Route متصل نشده است.",
        },
        {
          status:
            503,
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
            "بدنه درخواست معتبر نیست.",
        },
        {
          status:
            400,
        },
      );
    }

    const inputResult =
      adaptivePlacementStartInputSchema.safeParse(
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
            "درخواست شروع تعیین سطح معتبر نیست.",
        },
        {
          status:
            400,
        },
      );
    }

    const [
      assessment,
      learner,
    ] =
      await Promise.all([
        getAssessmentDefinition(
          inputResult.data
            .assessmentId,
        ),

        getLearnerAssessmentContext(),
      ]);

    if (!assessment) {
      return NextResponse.json(
        {
          error:
            "آزمون تعیین سطح پیدا نشد.",
        },
        {
          status:
            404,
        },
      );
    }

    if (
      assessment.type !==
        "placement" ||
      assessment.mode !==
        "adaptive" ||
      !assessment.adaptiveConfig
    ) {
      return NextResponse.json(
        {
          error:
            "تعریف این آزمون Adaptive Placement نیست.",
        },
        {
          status:
            400,
        },
      );
    }

    const result =
      startAdaptivePlacementSession({
        userId:
          session.user.id,

        assessment,

        startingLevel:
          learner.currentCefrLevel ??
          assessment.adaptiveConfig
            .startingCefrLevel,
      });

    return NextResponse.json(
      result,
      {
        status:
          201,
      },
    );
  } catch (error) {
    return handleServiceError(
      error,
    );
  }
}

export async function PATCH(
  request:
    Request,
) {
  try {
    const session =
      await auth();

    if (
      !session?.user?.id
    ) {
      return NextResponse.json(
        {
          error:
            "برای ادامه تعیین سطح باید وارد حساب کاربری شوید.",
        },
        {
          status:
            401,
        },
      );
    }

    if (
      !isMockMode()
    ) {
      return NextResponse.json(
        {
          error:
            "Adaptive Placement Backend هنوز متصل نشده است.",
        },
        {
          status:
            503,
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
            "بدنه درخواست معتبر نیست.",
        },
        {
          status:
            400,
        },
      );
    }

    const inputResult =
      adaptivePlacementAnswerInputSchema.safeParse(
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
            "پاسخ ارسال‌شده معتبر نیست.",
        },
        {
          status:
            400,
        },
      );
    }

    const result =
      submitAdaptivePlacementAnswer({
        userId:
          session.user.id,

        ...inputResult.data,
      });

    return NextResponse.json(
      result,
      {
        status:
          200,
      },
    );
  } catch (error) {
    return handleServiceError(
      error,
    );
  }
}

