import {
  assessmentSubmissionResultSchema,
  assessmentSubmissionSchema,
} from "../schemas/assessment-runner.schema";

import type {
  AssessmentSubmission,
  AssessmentSubmissionResult,
} from "../types/assessment-runner.types";

export class AssessmentSubmissionError extends Error {
  readonly statusCode:
    number;

  constructor(
    message:
      string,
    statusCode:
      number,
  ) {
    super(
      message,
    );

    this.name =
      "AssessmentSubmissionError";

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

  if (
    "message" in payload && typeof payload.message ===
      "string"
  ) {
    return payload.message;
  }

  return null;
}

export async function submitAssessmentAttempt(
  submission:
    AssessmentSubmission,
): Promise<AssessmentSubmissionResult> {
  const inputResult =
    assessmentSubmissionSchema.safeParse(
      submission,
    );

  if (
    !inputResult.success
  ) {
    throw new AssessmentSubmissionError(
      inputResult.error
        .issues[0]
        ?.message ??
        "اطلاعات آزمون معتبر نیست.",
      400,
    );
  }

  let response:
    Response;

  try {
    response =
      await fetch(
        "/api/assessment/attempts/submit",
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
            JSON.stringify(
              inputResult.data,
            ),

          cache:
            "no-store",
        },
      ); } catch {
    throw new AssessmentSubmissionError(
      "ارتباط با سرویس ثبت آزمون برقرار نشد.",
      0,
    );
  }

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
    throw new AssessmentSubmissionError(
      getErrorMessage(
        payload,
      ) ??
        "ثبت آزمون ناموفق بود.",
      response.status,
    );
  }

  const result =
    assessmentSubmissionResultSchema.safeParse(
      payload,
    );

  if (
    !result.success
  ) {
    console.error(
      "Invalid assessment submission result:",
      result.error.flatten(),
    );

    throw new AssessmentSubmissionError(
      "پاسخ سرویس نتیجه آزمون معتبر نیست.",
      500,
    );
  }

  return result.data;
}