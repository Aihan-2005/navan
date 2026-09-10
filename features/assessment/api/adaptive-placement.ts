import {
  adaptivePlacementSessionViewSchema,
} from "../schemas/adaptive-placement.schema";

import type {
  AssessmentAnswerPayload,
} from "../types/assessment-attempt.types";

import type {
  AdaptivePlacementSessionView,
} from "../types/adaptive-placement.types";

export class AdaptivePlacementApiError extends Error {
  readonly statusCode:
    number;

  constructor(
    message:
      string,
    statusCode:
      number,
  ) {
    super(message);

    this.name =
      "AdaptivePlacementApiError";

    this.statusCode =
      statusCode;
  }
}

function getErrorMessage(
  payload:
    unknown,
): string | null {
  if (
    typeof payload !==
      "object" ||
    payload ===
      null
  ) {
    return null;
  }

  if (
    "error" in payload &&
    typeof payload.error ===
      "string"
  ) {
    return payload.error;
  }

  return null;
}

async function parseResponse(
  response:
    Response,
): Promise<AdaptivePlacementSessionView> {
  let payload:
    unknown =
    null;

  try {
    payload =
      await response.json();
  } catch {
    payload =
      null;
  }

  if (
    !response.ok
  ) {
    throw new AdaptivePlacementApiError(
      getErrorMessage(
        payload,
      ) ??
        "ارتباط با سرویس تعیین سطح ناموفق بود.",
      response.status,
    );
  }

  const result =
    adaptivePlacementSessionViewSchema.safeParse(
      payload,
    );

  if (
    !result.success
  ) {
    console.error(
      "Invalid adaptive placement response:",
      result.error.flatten(),
    );

    throw new AdaptivePlacementApiError(
      "پاسخ سرویس تعیین سطح معتبر نیست.",
      500,
    );
  }

  return result.data;
}

export async function startAdaptivePlacement(
  assessmentId:
    string,
): Promise<AdaptivePlacementSessionView> {
  const response =
    await fetch(
      "/api/assessment/placement",
      {
        method:
          "POST",

        headers: {
          Accept:
            "application/json",

          "Content-Type":
            "application/json",
        },

        body:
          JSON.stringify({
            assessmentId,
          }),

        cache:
          "no-store",
      },
    );

  return parseResponse(
    response,
  );
}

export async function answerAdaptivePlacementQuestion(
  input:
    Readonly<{
      sessionId:
        string;

      questionId:
        string;

      payload:
        AssessmentAnswerPayload;

      elapsedSeconds:
        number;
    }>,
): Promise<AdaptivePlacementSessionView> {
  const response =
    await fetch(
      "/api/assessment/placement",
      {
        method:
          "PATCH",

        headers: {
          Accept:
            "application/json",

          "Content-Type":
            "application/json",
        },

        body:
          JSON.stringify(
            input,
          ),

        cache:
          "no-store",
      },
    );

  return parseResponse(
    response,
  );
}