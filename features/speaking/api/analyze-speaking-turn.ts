import {
  speakingTurnAnalysisSchema,
  speakingTurnAnalyzeMetadataSchema,
} from "../schemas/speaking-turn.schema";

import type {
  RecordedAudio,
} from "../types/speaking.types";

import type {
  SpeakingTurnAnalysis,
  SpeakingTurnMode,
} from "../types/speaking-turn.types";

export class SpeakingTurnAnalysisError extends Error {
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
      "SpeakingTurnAnalysisError";

    this.statusCode =
      statusCode;
  }
}

type AnalyzeSpeakingTurnInput =
  Readonly<{
    recording:
      RecordedAudio;

    mode:
      SpeakingTurnMode;

    scenarioId:
      string | null;

    turnIndex:
      number;

    previousTurnId?:
      string | null;

    signal?:
      AbortSignal;
  }>;

function getAudioExtension( mimeType:
    string,
): string {
  if (
    mimeType.includes(
      "mp4",
    )
  ) {
    return "m4a";
  }

  if (
    mimeType.includes(
      "ogg",
    )
  ) {
    return "ogg";
  }

  return "webm";
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
    "message" in payload &&
    typeof payload.message ===
      "string"
  ) {
    return payload.message;
  }

  return null;
}

export async function analyzeSpeakingTurn({
  recording,
  mode,
  scenarioId,
  turnIndex,previousTurnId =
    null,
  signal,
}: AnalyzeSpeakingTurnInput): Promise<SpeakingTurnAnalysis> {
  const metadata =
    speakingTurnAnalyzeMetadataSchema.parse(
      {
        mode,

        scenarioId,

        durationSeconds:
          recording.durationSeconds,

        mimeType:
          recording.mimeType,

        turnIndex,

        previousTurnId,
      },
    );

  const formData =
    new FormData();

  formData.append(
    "audio",
    recording.blob,
    `speaking-turn-${Date.now()}.${getAudioExtension(
      recording.mimeType,
    )}`,
  );

  formData.append(
    "metadata",
    JSON.stringify(
      metadata,
    ),
  );

  let response:
    Response;

  try {
    response =
      await fetch(
        "/api/speaking/turns/analyze",
        {
          method:
            "POST",

          body:
            formData,

          signal,

        cache:
            "no-store",
        },
      );
  } catch (
    error
  ) {
    if (
      error instanceof
        DOMException &&
      error.name ===
        "AbortError"
    ) {
      throw error;
    }

    throw new SpeakingTurnAnalysisError(
      "ارتباط با سرویس تحلیل مکالمه برقرار نشد.",
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

  if (!response.ok) {
    throw new SpeakingTurnAnalysisError(
      getErrorMessage(
        payload,
      ) ??
        "تحلیل پاسخ صوتی ناموفق بود.",
      response.status,
    );
  }

  const result =
    speakingTurnAnalysisSchema.safeParse(
      payload, );

  if (
    !result.success
  ) {
    console.error(
      "Invalid speaking analysis response:",
      result.error.flatten(),
    );

    throw new SpeakingTurnAnalysisError(
      "ساختار پاسخ تحلیل مکالمه معتبر نیست.",
      500,
    );
  }

  return result.data;
}