import {
  randomUUID,
} from "node:crypto";

import {
  ASSESSMENT_CEFR_ORDER,
  ASSESSMENT_SKILL_LABELS,
} from "../constants/assessment.constants";

import {
  applyAdaptivePlacementAnswer,
  createInitialAdaptivePlacementState,
  estimateFinalAdaptiveCefrLevel,
  evaluateAdaptivePlacementAnswer,
  getAdaptivePlacementAnsweredCount,
  markAdaptiveQuestionAsked,
  selectNextAdaptivePlacementQuestion,
  shouldCompleteAdaptivePlacement,
  ADAPTIVE_PLACEMENT_SKILLS,
  type AdaptivePlacementEngineState,
} from "../engine/adaptive-placement.engine";

import {
  createAssessmentRunnerSession,
} from "../engine/create-assessment-runner-session";

import {
  normalizeAssessmentSubmissionResult,
} from "../engine/normalize-assessment-submission-result";

import {
  scoreAssessmentSubmission,
} from "../engine/score-assessment-submission";

import {
  adaptivePlacementSessionViewSchema,
} from "../schemas/adaptive-placement.schema";

import {
  assessmentSubmissionResultSchema,
} from "../schemas/assessment-runner.schema";

import type {
  AssessmentAnswerPayload,
} from "../types/assessment-attempt.types";

import type {
  AdaptivePlacementSessionView,
} from "../types/adaptive-placement.types";

import type {
  AssessmentCefrLevel,
  AssessmentQuestion,
} from "../types/assessment-question.types";

import type {
  AssessmentRunnerAnswerEntry,
  AssessmentSubmissionResult,
} from "../types/assessment-runner.types";

import type {
  AssessmentDefinition,
} from "../types/assessment.types";

const SESSION_TTL_MS =
  2 * 60 * 60 * 1000;

type StoredAdaptivePlacementSession = {
  id:
    string;

  userId:
    string;

  assessment:
    AssessmentDefinition;

  startedAt:
    string;

  updatedAt:
    string;

  expiresAt:
    number;

  elapsedSeconds:
    number;

  currentQuestionId:
    string | null;

  state:
    AdaptivePlacementEngineState;

  answers:
    AssessmentRunnerAnswerEntry[];

  status:
    "in_progress" | "completed";

  result:
    AssessmentSubmissionResult | null;
};

const adaptiveSessions =
  new Map<
    string,
    StoredAdaptivePlacementSession
  >();

export class AdaptivePlacementSessionError extends Error {
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
      "AdaptivePlacementSessionError";

    this.statusCode =
      statusCode;
  }
}

function cleanupExpiredSessions(): void {
  const now =
    Date.now();

  for (
    const [
      sessionId,
      session,
    ] of adaptiveSessions
  ) {
    if (
      session.expiresAt <=
      now
    ) {
      adaptiveSessions.delete(
        sessionId,
      );
    }
  }
}

function touchSession(
  session:
    StoredAdaptivePlacementSession,
): void {
  session.updatedAt =
    new Date()
      .toISOString();

  session.expiresAt =
    Date.now() +
    SESSION_TTL_MS;
}

function getQuestionById(
  assessment:
    AssessmentDefinition,
  questionId:
    string,
): AssessmentQuestion | null {
  return (
    assessment.questions.find(
      (question) =>
        question.id ===
        questionId,
    ) ??
    null
  );
}

function getSafeQuestion(
  assessment:
    AssessmentDefinition,
  questionId:
    string | null,
) {
  if (!questionId) {
    return null;
  }

  const runnerSession =
    createAssessmentRunnerSession(
      assessment,
    );

  return (
    runnerSession.questions.find(
      (question) =>
        question.id ===
        questionId,
    ) ??
    null
  );
}

function createScopedAssessment(
  session:
    StoredAdaptivePlacementSession,
): AssessmentDefinition {
  const questionIds =
    new Set(
      session.answers.map(
        (answer) =>
          answer.questionId,
      ),
    );

  const questionMap =
    new Map(
      session.assessment
        .questions
        .map(
          (question) => [
            question.id,
            question,
          ],
        ),
    );

  const questions =
    session.answers
      .map(
        (answer) =>
          questionMap.get(
            answer.questionId,
          ),
      )
      .filter(
        (
          question,
        ): question is AssessmentQuestion =>
          Boolean(question),
      );

  if (
    questions.length ===
    0
  ) {
    throw new AdaptivePlacementSessionError(
      "برای محاسبه نتیجه، پاسخ کافی وجود ندارد.",
      422,
    );
  }

  const sections =
    session.assessment
      .sections
      .map(
        (section) => ({
          ...section,

          questionIds:
            section.questionIds.filter(
              (questionId) =>
                questionIds.has(
                  questionId,
                ),
            ),
        }),
      )
      .filter(
        (section) =>
          section.questionIds
            .length > 0,
      );

  const skills =
    Array.from(
      new Set(
        questions.map(
          (question) =>
            question.skill,
        ),
      ),
    );

  return {
    ...session.assessment,

    mode:
      "fixed",

    adaptiveConfig:
      null,

    passingScore:
      null,

    questionCount:
      questions.length,

    questions,

    sections,

    skills,
  };
}

function getHighestQuestionLevel(
  questions:
    readonly AssessmentQuestion[],
): AssessmentCefrLevel {
  return questions.reduce(
    (
      highest,
      question,
    ) => {
      const currentIndex =
        ASSESSMENT_CEFR_ORDER.indexOf(
          question.cefrLevel,
        );

      const highestIndex =
        ASSESSMENT_CEFR_ORDER.indexOf(
          highest,
        );

      return currentIndex >
        highestIndex
        ? question.cefrLevel
        : highest;
    },
    "A1" as AssessmentCefrLevel,
  );
}

function buildCompletedResult(
  session:
    StoredAdaptivePlacementSession,
): AssessmentSubmissionResult {
  const scopedAssessment =
    createScopedAssessment(
      session,
    );

  const rawResult =
    scoreAssessmentSubmission(
      scopedAssessment,
      {
        assessmentId:
          scopedAssessment.id,

        attemptId:
          session.id,

        elapsedSeconds:
          session.elapsedSeconds,

        answers:
          session.answers,

        flaggedQuestionIds:
          [],
      },
    );

  const normalizedResult =
    normalizeAssessmentSubmissionResult(
      rawResult,
    );

  const estimatedCefrLevel =
    estimateFinalAdaptiveCefrLevel(
      session.state,
      scopedAssessment.questions,
    );

  const highestTestedLevel =
    getHighestQuestionLevel(
      scopedAssessment.questions,
    );

  const reachedCurrentBankCeiling =
    estimatedCefrLevel ===
      highestTestedLevel &&
    highestTestedLevel ===
      "B2" &&
    session.state.abilityScore >=
      76;

  const strongestSkill =
    [...normalizedResult.result.skillScores]
      .filter(
        (skill) =>
          skill.totalCount > 0,
      )
      .sort(
        (
          first,
          second,
        ) =>
          second.score -
          first.score,
      )[0];

  const strongestSkillText =
    strongestSkill
      ? ` بهترین عملکرد فعلی در ${ASSESSMENT_SKILL_LABELS[strongestSkill.skill]} ثبت شده است.`
      : "";

  const ceilingText =
    reachedCurrentBankCeiling
      ? " به سقف سطح بانک سؤال فعلی رسیده‌ای؛ برای تفکیک دقیق C1 باید سؤال‌های سطح بالاتر به بانک اضافه شوند."
      : "";

  return assessmentSubmissionResultSchema.parse(
    {
      ...normalizedResult,

      result: {
        ...normalizedResult.result,

        estimatedCefrLevel,

        confidence:
          session.state.confidence,

        passed:
          null,

        aiSummary:
          `سطح برآوردی شما ${estimatedCefrLevel} است و موتور تطبیقی با اطمینان ${session.state.confidence}٪ به این نتیجه رسیده است.${strongestSkillText}${ceilingText}`,
      },
    },
  );
}

function buildView(
  session:
    StoredAdaptivePlacementSession,
): AdaptivePlacementSessionView {
  const config =
    session.assessment
      .adaptiveConfig;

  if (!config) {
    throw new AdaptivePlacementSessionError(
      "تنظیمات آزمون تطبیقی پیدا نشد.",
      500,
    );
  }

  const answeredCount =
    getAdaptivePlacementAnsweredCount(
      session.state,
    );

  const progressPercent =
    session.status ===
    "completed"
      ? 100
      : Math.min(
          99,
          Math.round(
            (
              answeredCount /
              config.maximumQuestions
            ) *
              100,
          ),
        );

  const coverage =
    ADAPTIVE_PLACEMENT_SKILLS.map(
      (skill) => {
        const stat =
          session.state
            .skillStats[
              skill
            ];

        return {
          skill,

          answered:
            stat.answered,

          correct:
            stat.correct,

          accuracy:
            stat.answered ===
            0
              ? null
              : Math.round(
                  (
                    stat.correct /
                    stat.answered
                  ) *
                    100,
                ),
        };
      },
    );

  return adaptivePlacementSessionViewSchema.parse(
    {
      sessionId:
        session.id,

      assessmentId:
        session.assessment.id,

      status:
        session.status,

      startedAt:
        session.startedAt,

      currentQuestion:
        session.status ===
        "completed"
          ? null
          : getSafeQuestion(
              session.assessment,
              session.currentQuestionId,
            ),

      currentCefrLevel:
        session.state
          .currentCefrLevel,

      abilityScore:
        session.state
          .abilityScore,

      confidence:
        session.state
          .confidence,

      answeredCount,

      minimumQuestions:
        config.minimumQuestions,

      maximumQuestions:
        config.maximumQuestions,

      progressPercent,

      coverage,

      result:
        session.result,
    },
  );
}

export function startAdaptivePlacementSession({
  userId,
  assessment,
  startingLevel,
}: Readonly<{
  userId:
    string;

  assessment:
    AssessmentDefinition;

  startingLevel:
    AssessmentCefrLevel;
}>): AdaptivePlacementSessionView {
  cleanupExpiredSessions();

  if (
    assessment.type !==
      "placement" ||
    assessment.mode !==
      "adaptive" ||
    !assessment.adaptiveConfig
  ) {
    throw new AdaptivePlacementSessionError(
      "این آزمون برای Adaptive Placement تنظیم نشده است.",
      400,
    );
  }

  let state =
    createInitialAdaptivePlacementState(
      startingLevel,
    );

  const firstQuestion =
    selectNextAdaptivePlacementQuestion(
      assessment.questions,
      state,
    );

  if (!firstQuestion) {
    throw new AdaptivePlacementSessionError(
      "بانک سؤال مناسب برای شروع تعیین سطح وجود ندارد.",
      422,
    );
  }

  state =
    markAdaptiveQuestionAsked(
      state,
      firstQuestion.id,
    );

  const now =
    new Date()
      .toISOString();

  const session:
    StoredAdaptivePlacementSession =
  {
    id:
      `placement-${randomUUID()}`,

    userId,

    assessment,

    startedAt:
      now,

    updatedAt:
      now,

    expiresAt:
      Date.now() +
      SESSION_TTL_MS,

    elapsedSeconds:
      0,

    currentQuestionId:
      firstQuestion.id,

    state,

    answers:
      [],

    status:
      "in_progress",

    result:
      null,
  };

  adaptiveSessions.set(
    session.id,
    session,
  );

  return buildView(
    session,
  );
}

export function submitAdaptivePlacementAnswer({
  userId,
  sessionId,
  questionId,
  payload,
  elapsedSeconds,
}: Readonly<{
  userId:
    string;

  sessionId:
    string;

  questionId:
    string;

  payload:
    AssessmentAnswerPayload;

  elapsedSeconds:
    number;
}>): AdaptivePlacementSessionView {
  cleanupExpiredSessions();

  const session =
    adaptiveSessions.get(
      sessionId,
    );

  if (!session) {
    throw new AdaptivePlacementSessionError(
      "جلسه تعیین سطح پیدا نشد یا منقضی شده است. آزمون را دوباره شروع کن.",
      410,
    );
  }

  if (
    session.userId !==
    userId
  ) {
    throw new AdaptivePlacementSessionError(
      "اجازه دسترسی به این جلسه را نداری.",
      403,
    );
  }

  const existingAnswer =
    session.answers.find(
      (answer) =>
        answer.questionId ===
        questionId,
    );

  if (existingAnswer) {
    return buildView(
      session,
    );
  }

  if (
    session.status ===
    "completed"
  ) {
    return buildView(
      session,
    );
  }

  if (
    session.currentQuestionId !==
    questionId
  ) {
    throw new AdaptivePlacementSessionError(
      "این سؤال، سؤال فعال جلسه تعیین سطح نیست.",
      409,
    );
  }

  const question =
    getQuestionById(
      session.assessment,
      questionId,
    );

  if (!question) {
    throw new AdaptivePlacementSessionError(
      "سؤال موردنظر در بانک تعیین سطح وجود ندارد.",
      404,
    );
  }

  const isCorrect =
    evaluateAdaptivePlacementAnswer(
      question,
      payload,
    );

  if (
    isCorrect ===
    null
  ) {
    throw new AdaptivePlacementSessionError(
      "این نوع سؤال در تعیین سطح Adaptive قابل امتیازدهی فوری نیست.",
      422,
    );
  }

  session.answers.push({
    questionId,

    payload,
  });

  session.elapsedSeconds =
    Math.max(
      session.elapsedSeconds,
      elapsedSeconds,
    );

  session.state =
    applyAdaptivePlacementAnswer({
      state:
        session.state,

      question,

      isCorrect,

      config:
        session.assessment
          .adaptiveConfig!,
    });

  const completed =
    shouldCompleteAdaptivePlacement({
      state:
        session.state,

      config:
        session.assessment
          .adaptiveConfig!,

      questions:
        session.assessment
          .questions,
    });

  if (completed) {
    session.status =
      "completed";

    session.currentQuestionId =
      null;

    session.result =
      buildCompletedResult(
        session,
      );

    touchSession(
      session,
    );

    return buildView(
      session,
    );
  }

  const nextQuestion =
    selectNextAdaptivePlacementQuestion(
      session.assessment
        .questions,
      session.state,
    );

  if (!nextQuestion) {
    session.status =
      "completed";

    session.currentQuestionId =
      null;

    session.result =
      buildCompletedResult(
        session,
      );

    touchSession(
      session,
    );

    return buildView(
      session,
    );
  }

  session.state =
    markAdaptiveQuestionAsked(
      session.state,
      nextQuestion.id,
    );

  session.currentQuestionId =
    nextQuestion.id;

  touchSession(
    session,
  );

  return buildView(
    session,
  );
}
