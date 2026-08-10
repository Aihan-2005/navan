import {
  randomUUID,
} from "node:crypto";

import {
  NextResponse,
} from "next/server";

import {
  auth,
} from "../../../../auth";

import {
  DEFAULT_PLACEMENT_START_LEVEL,
} from "../../../../features/assessment/constants/assessment.constants";

import {
  getLearnerAssessmentContext,
} from "../../../../features/assessment/integrations/get-learner-assessment-context";

import {
  assessmentGenerationRequestSchema,
  createAssessmentGenerationRequestInputSchema,
} from "../../../../features/assessment/schemas/assessment-generation.schema";

export const runtime =
  "nodejs";

function isMockMode(): boolean {
  return (
    process.env.USE_MOCKS !==
    "false"
  );
}

export async function POST(
  request: Request,
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
            "برای ساخت آزمون باید وارد حساب کاربری شوید.",
        },
        {
          status: 401,
        },
      );
    }

    let requestPayload:
      unknown;

    try {
      requestPayload =
        await request.json();
    } catch {
      return NextResponse.json(
        {
          error:
            "بدنه درخواست JSON معتبر نیست.",
        },
        {
          status: 400,
        },
      );
    }

    const inputResult =
      createAssessmentGenerationRequestInputSchema.safeParse(
        requestPayload,
      );

    if (!inputResult.success) {
      return NextResponse.json(
        {
          error:
            inputResult.error
              .issues[0]
              ?.message ??
            "تنظیمات آزمون معتبر نیست.",
        },
        {
          status: 400,
        },
      );
    }

 


    
    if (!isMockMode()) {
      return NextResponse.json(
        {
          error:
            "سرویس Backend تولید آزمون هنوز به این Route متصل نشده است.",
        },
        {
          status: 503,
        },
      );
    }

    const learner =
      await getLearnerAssessmentContext();

    const {
      configuration,
    } = inputResult.data;

    const suggestedCefrLevel =
      configuration.levelStrategy ===
        "fixed" &&
      configuration.targetCefrLevel
        ? configuration.targetCefrLevel
        : learner.currentCefrLevel ??
          DEFAULT_PLACEMENT_START_LEVEL;

    const selectedSkillSignals =
      configuration.selectedSkills.map(
        (skill) => {
          const signal =
            learner.skills.find(
              (item) =>
                item.skill ===
                skill,
            );

          return {
            skill,

            score:
              signal?.score ??
              null,

            cefrLevel:
              signal?.cefrLevel ??
              null,

            evidenceCount:
              signal
                ?.recentEvidenceCount ??
              0,
          };
        },
      );

    const now =
      new Date().toISOString();

    const generationRequest =
      assessmentGenerationRequestSchema.parse(
        {
          id:
            `assessment-generation-${randomUUID()}`,

          kind:
            "custom",

          userId:
            session.user.id,

          status:
            "queued",

          configuration,

          contextSummary: {
            currentCefrLevel:
              learner.currentCefrLevel,

            suggestedCefrLevel,

            selectedSkillSignals,

            reviewItemCount:
              learner.review
                .totalItems,

            recentCompletedActivityCount:
              learner
                .recentCompletedActivityCount,
          },

          message:
            "درخواست آزمون معتبر است. در مرحله بعد این Job به Backend و سرویس تولید سؤال AI متصل می‌شود.",

          createdAt: now,

          updatedAt: now,
        },
      );

    return NextResponse.json(
      generationRequest,
      {
        status: 202,
      },
    );
  } catch (error) {
    console.error(
      "Assessment generation request failed:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "ساخت درخواست آزمون با خطای غیرمنتظره مواجه شد.",
      },
      {
        status: 500,
      },
    );
  }
}