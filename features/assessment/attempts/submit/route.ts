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
  scoreAssessmentSubmission,
} from "../../../../features/assessment/engine/score-assessment-submission";

import {
  assessmentSubmissionSchema,
} from "../../../../features/assessment/schemas/assessment-runner.schema";

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
            "برای ثبت آزمون باید وارد حساب کاربری شوید.",
        },
        {
          status:
            401,
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
      assessmentSubmissionSchema.safeParse(
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
            "اطلاعات آزمون معتبر نیست.",
        },
        {
          status:
            400,
        },
      );
    }

    if (
      !isMockMode()
    ) {
      return NextResponse.json(
        {
          error:
            "سرویس Backend ثبت و ارزیابی آزمون هنوز به این Route متصل نشده است.",
        },
        {
          status:
            503,
        },
      );
    }

    const assessment =
      await getAssessmentDefinition(
     inputResult.data
          .assessmentId,
      );

    if (!assessment) {
      return NextResponse.json(
        {
          error:
            "آزمون موردنظر پیدا نشد.",
        },
        {
          status:
            404,
        },
      );
    }

    const allowedQuestionIds =
      new Set(
        assessment.questions.map(
          (
            question,
          ) =>
            question.id,
        ),
      );

    const invalidAnswer =
      inputResult.data.answers.find(
        (
          answer,
        ) =>
          !allowedQuestionIds.has(
            answer.questionId,
          ),
      );

    if (
      invalidAnswer
    ) {
      return NextResponse.json(
        {
          error:
            "یکی از پاسخ‌ها مربوط به این آزمون نیست.",
        },
        {
          status:
            400,
        },
      );
    }

    const result =
      scoreAssessmentSubmission(
        assessment,
        inputResult.data,
      );

    return NextResponse.json(
      result,
      {
        status:
          200,
      },
    );
  } catch (
    error
  ) {
    console.error(
      "Assessment submission failed:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "ثبت نتیجه آزمون با خطای غیرمنتظره مواجه شد.",
      },
      {
        status:
          500,
      },
    );
  }
}