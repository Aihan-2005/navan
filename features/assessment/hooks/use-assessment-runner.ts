"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  assessmentRunnerDraftSchema,
} from "../schemas/assessment-runner.schema";

import type {
  AssessmentAnswerPayload,
} from "../types/assessment-attempt.types";

import type {
  AssessmentRunnerDraft,
  AssessmentRunnerSession,
} from "../types/assessment-runner.types";

const STORAGE_PREFIX =
  "navan:assessment:runner";

function createAttemptId(
  assessmentId:
    string,
): string {
  if (
    typeof crypto !==
      "undefined" &&
    typeof crypto.randomUUID ===
      "function"
  ) {
    return `attempt-${assessmentId}-${crypto.randomUUID()}`;
  }

  return `attempt-${assessmentId}-${Date.now()}-${Math.random()
    .toString(
      36,
    )
    .slice(
      2,
    )}`;
}

function getStorageKey(
  assessmentId:
    string,
): string {
  return `${STORAGE_PREFIX}:${assessmentId}`;
}

function createFreshDraft(
  assessment:AssessmentRunnerSession,
): AssessmentRunnerDraft {
  const now =
    new Date()
      .toISOString();

  return {
    assessmentId:
      assessment.assessmentId,

    attemptId:
      createAttemptId(
        assessment.assessmentId,
      ),

    startedAt:
      now,

    currentQuestionIndex:
      0,

    answers:
      [],

    flaggedQuestionIds:
      [],

    updatedAt:
      now,
  };
}

function readStoredDraft(
  assessment:
    AssessmentRunnerSession,
): AssessmentRunnerDraft | null {
  if (
    typeof window ===
    "undefined"
  ) {
    return null;
  }

  try {
    const serialized =
      window.localStorage.getItem(
        getStorageKey(
          assessment.assessmentId,
        ),
      );

    if (!serialized) {
      return null;
    }

    const payload:
      unknown =
         JSON.parse(
          serialized,
        );

    const result =
      assessmentRunnerDraftSchema.safeParse(
        payload,
      );

    if (
      !result.success ||
      result.data.assessmentId !==
        assessment.assessmentId
    ) {
      return null;
    }

    const currentQuestionIndex =
      Math.min(
        assessment.questionCount -
          1,
        result.data
          .currentQuestionIndex,
      );

    const validQuestionIds =
      new Set(
        assessment.questions.map(
          (
            question,
          ) =>
            question.id,
        ),
      );

    return {
      ...result.data,

      currentQuestionIndex,

      answers:
        result.data.answers.filter(
          (
            answer,
          ) =>
            validQuestionIds.has(
              answer.questionId,
            ),
        ),

      flaggedQuestionIds:
        result.data.flaggedQuestionIds.filter(
          (
            questionId,
         ) =>
            validQuestionIds.has(
              questionId,
            ),
        ),
    };
  } catch {
    return null;
  }
}

export function useAssessmentRunner(
  assessment:
    AssessmentRunnerSession,
) {
  const [
    draft,
    setDraft,
  ] =
    useState<AssessmentRunnerDraft | null>(
      null,
    );

  const [
    now,
    setNow,
  ] =
    useState(
      Date.now(),
    );

  useEffect(() => {
    const stored =
      readStoredDraft(
        assessment,
      );

    setDraft(
      stored ??
      createFreshDraft(
        assessment,
      ),
    );
  }, [
    assessment,
  ]);

  useEffect(() => {
    if (!draft) {
      return;
    }
 try {
      window.localStorage.setItem(
        getStorageKey(
          assessment.assessmentId,
        ),
        JSON.stringify(
          {
            ...draft,

            updatedAt:
              new Date()
                .toISOString(),
          },
        ),
      );
    } catch {
      // Autosave is best-effort until Backend persistence is connected.
    }
  }, [
    assessment.assessmentId,
    draft,
  ]);

  useEffect(() => {
    if (!draft) {
      return;
    }

    const intervalId =
      window.setInterval(
        () => {
          setNow(
            Date.now(),
          );
        },
        1000,
      );

    return () => {
      window.clearInterval(
        intervalId,
      );
    };
  }, [
    draft,
  ]);

  const answers =
    draft?.answers ??
    [];

  const answerMap =
    useMemo(
      () =>
        new Map(
          answers.map(
            (
               answer,
            ) => [
              answer.questionId,
              answer.payload,
            ],
          ),
        ),
      [
        answers,
      ],
    );

  const currentQuestionIndex =
    draft?.currentQuestionIndex ??
    0;

  const currentQuestion =
    assessment.questions[
      currentQuestionIndex
    ] ??
    assessment.questions[0];

  const answeredCount =
    answers.length;

  const elapsedSeconds =
    draft
      ? Math.max(
          0,
          Math.floor(
            (
              now -
              Date.parse(
                draft.startedAt,
              )
            ) /
              1000,
          ),
        )
      : 0;

  const remainingSeconds =
    assessment.timeLimitMinutes ===
    null
      ? null
      : Math.max(
          0,
          assessment.timeLimitMinutes *
            60 -
            elapsedSeconds,
        );

  const isExpired =
    remainingSeconds !==
      null &&
    remainingSeconds <=
      0; const setAnswer =
    useCallback(
      (
        questionId:
          string,

        payload:
          AssessmentAnswerPayload | null,
      ): void => {
        setDraft(
          (
            current,
          ) => {
            if (!current) {
              return current;
            }

            const nextAnswers =
              current.answers.filter(
                (
                  answer,
                ) =>
                  answer.questionId !==
                  questionId,
              );

            if (
              payload
            ) {
              nextAnswers.push({
                questionId,

                payload,
              });
            }

            return {
              ...current,

              answers:
                nextAnswers,

              updatedAt:
                new Date()
                  .toISOString(),
            };
          },
        );
      },
      [],
    );


  const goToQuestion =
    useCallback(
      (
        index:
          number,
      ): void => {
        setDraft(
          (
            current,
          ) => {
            if (!current) {
              return current;
            }

            return {
              ...current,

              currentQuestionIndex:
                Math.min(
                  assessment.questionCount -
                    1,
                  Math.max(
                    0,
                    index,
                  ),
                ),
            };
          },
        );
      },
      [
        assessment.questionCount,
      ],
    );

  const goNext =
    useCallback(
      (): void => {
        goToQuestion(
          currentQuestionIndex +
            1,
        );
      },
      [
        currentQuestionIndex,
        goToQuestion,
      ],
    );

  const goPrevious =
    useCallback(
      (): void => {
        goToQuestion(
          currentQuestionIndex -
  1,
        );
      },
      [
        currentQuestionIndex,
        goToQuestion,
      ],
    );

  const toggleFlag =
    useCallback(
      (
        questionId:
          string,
      ): void => {
        setDraft(
          (
            current,
          ) => {
            if (!current) {
              return current;
            }

            const exists =
              current.flaggedQuestionIds.includes(
                questionId,
              );

            return {
              ...current,

              flaggedQuestionIds:
                exists
                  ? current.flaggedQuestionIds.filter(
                      (
                        id,
                      ) =>
                        id !==
                        questionId,
                    )
                  : [
                      ...current.flaggedQuestionIds,
                      questionId,
                    ],
            };
          },
        );
      },
      [],);

  const clearStoredDraft =
    useCallback(
      (): void => {
        try {
          window.localStorage.removeItem(
            getStorageKey(
              assessment.assessmentId,
            ),
          );
        } catch {
          // Ignore storage cleanup error.
        }
      },
      [
        assessment.assessmentId,
      ],
    );

  const reset =
    useCallback(
      (): void => {
        clearStoredDraft();

        setNow(
          Date.now(),
        );

        setDraft(
          createFreshDraft(
            assessment,
          ),
        );
      },
      [
        assessment,
        clearStoredDraft,
      ],
    );

  return {
    isReady:
      draft !==
      null,

    draft,

    answers,

    answerMap,

    currentQuestion,

    currentQuestionIndex,

     answeredCount,

    unansweredCount:
      assessment.questionCount -
      answeredCount,

    elapsedSeconds,

    remainingSeconds,

    isExpired,

    flaggedQuestionIds:
      draft?.flaggedQuestionIds ??
      [],

    setAnswer,

    goToQuestion,

    goNext,

    goPrevious,

    toggleFlag,

    clearStoredDraft,

    reset,
  };
}