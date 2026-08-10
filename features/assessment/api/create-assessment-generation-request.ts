import {
  assessmentGenerationRequestSchema,
  createAssessmentGenerationRequestInputSchema,
} from "../schemas/assessment-generation.schema";

import type {
  AssessmentGenerationRequest,
  CreateAssessmentGenerationRequestInput,
} from "../types/assessment-generation.types";

export class AssessmentGenerationRequestError extends Error {
  readonly statusCode: number;

  constructor(
    message: string,
    statusCode: number,
  ) {
    super(message);

    this.name =
      "AssessmentGenerationRequestError";

    this.statusCode =
      statusCode;
  }
}

function getErrorMessage(
  payload: unknown,
): string | null {
  if (
    typeof payload !== "object" ||
    payload === null
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
    "message" in payload &&
    typeof payload.message ===
      "string"
  ) {
    return payload.message;
  }

  return null;
}

export async function createAssessmentGenerationRequest(
  input:
    CreateAssessmentGenerationRequestInput,
): Promise<AssessmentGenerationRequest> {
  const inputResult =
    createAssessmentGenerationRequestInputSchema.safeParse(
      input,
    );

  if (!inputResult.success) {
    throw new AssessmentGenerationRequestError(
      inputResult.error
        .issues[0]?.message ??
        "تنظیمات آزمون معتبر نیست.",
      400,
    );
  }

  const response =
    await fetch(
      "/api/assessment/generation-requests",
      {
        method: "POST",

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
      },
    );

  let payload: unknown =
    null;

  try {
    payload =
      await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    throw new AssessmentGenerationRequestError(
      getErrorMessage(
        payload,
      ) ??
        "ساخت درخواست آزمون ناموفق بود.",
      response.status,
    );
  }

  const result =
    assessmentGenerationRequestSchema.safeParse(
      payload,
    );

  if (!result.success) {
    console.error(
      "Invalid assessment generation response:",
      result.error.flatten(),
    );

    throw new AssessmentGenerationRequestError(
      "پاسخ سرویس تولید آزمون معتبر نیست.",
      500,
    );
  }

  return result.data;
}