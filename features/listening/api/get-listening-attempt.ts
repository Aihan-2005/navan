import {
  listeningAnalysisMock,
} from "../mocks/listening-analysis.mock";

import {
  listeningAttemptAnalysisSchema,
} from "../schemas/listening-analysis.schema";

import {
  getMockListeningAttemptDraft,
} from "../server/listening-mock-attempt-store";

import type {
  ListeningAttemptAnalysis,
} from "../types/listening.types";

import {
  parseListeningApiResponse,
} from "./listening-api-client";

import {
  fetchListeningBackend,
} from "./listening-server-client";


const LISTENING_ATTEMPTS_ENDPOINT =
  "/api/v1/listening/attempts";


function shouldUseMockData(): boolean {

  return (
    process.env.USE_MOCKS !== "false"
  );

}


function parseListeningAttempt(
  payload: unknown,
): ListeningAttemptAnalysis {

  const result =
    listeningAttemptAnalysisSchema.safeParse(
      payload,
    );


  if (!result.success) {

    console.error(
      "Invalid listening attempt payload:",
      result.error.flatten(),
    );


    throw new Error(
      "Listening attempt payload is invalid.",
    );

  }


  return result.data;

}



export async function getListeningAttempt(
  attemptId: string,
): Promise<ListeningAttemptAnalysis | null> {


  const normalizedAttemptId =
    attemptId.trim();



  if (!normalizedAttemptId) {

    return null;

  }

  if (shouldUseMockData()) {


    const draftAttempt =
      getMockListeningAttemptDraft(
        normalizedAttemptId,
      );

    if (draftAttempt) {

      return parseListeningAttempt({

        attemptId:
          draftAttempt.attemptId,

        contentId:
          draftAttempt.contentId,

        status:
          draftAttempt.status,

        transcript:
          draftAttempt.transcript,

        score:
          0,

        feedback:
          [],

      });

    }



    const staticAttempt =
      listeningAnalysisMock.find(
        (item) =>
          item.attemptId ===
          normalizedAttemptId,
      );

    if (!staticAttempt) {

      return null;

    }

    return parseListeningAttempt(
      staticAttempt,
    );


  }

  const response =
    await fetchListeningBackend(

      `${LISTENING_ATTEMPTS_ENDPOINT}/${encodeURIComponent(
        normalizedAttemptId,
      )}`,

      {

        method:
          "GET",

        cache:
          "no-store",

      },

      {

        requireAuthentication:
          true,

      },

    );



  if (
    response.status === 404
  ) {

    return null;

  }

  return parseListeningApiResponse(

    response,

    listeningAttemptAnalysisSchema,

    "دریافت نتیجه Listening ناموفق بود.",

  );

}