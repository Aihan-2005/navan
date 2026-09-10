import {
  ASSESSMENT_CEFR_ORDER,
} from "../constants/assessment.constants";

import type {
  AssessmentAnswerPayload,
} from "../types/assessment-attempt.types";

import type {
  AssessmentCefrLevel,
  AssessmentDifficulty,
  AssessmentQuestion,
  AssessmentSkill,
} from "../types/assessment-question.types";

import type {
  AssessmentAdaptiveConfig,
} from "../types/assessment.types";

export const ADAPTIVE_PLACEMENT_SKILLS = [
  "grammar",
  "vocabulary",
  "reading",
  "listening",
] as const;

export type AdaptivePlacementSkill =
  (typeof ADAPTIVE_PLACEMENT_SKILLS)[number];

export type AdaptivePlacementSkillStat =
  Readonly<{
    answered: number;
    correct: number;
  }>;

export type AdaptivePlacementEngineState =
  Readonly<{
    currentCefrLevel:
      AssessmentCefrLevel;

    abilityScore:
      number;

    confidence:
      number;

    correctStreak:
      number;

    incorrectStreak:
      number;

    askedQuestionIds:
      readonly string[];

    skillStats:
      Readonly<
        Record<
          AdaptivePlacementSkill,
          AdaptivePlacementSkillStat
        >
      >;
  }>;

type AdaptivePlacementQuestion =
  AssessmentQuestion & {
    skill:
      AdaptivePlacementSkill;
  };

const CEFR_ABILITY_SCORE:
  Record<
    AssessmentCefrLevel,
    number
  > = {
  A1: 15,
  A2: 30,
  B1: 50,
  B2: 68,
  C1: 84,
  C2: 96,
};

const DIFFICULTY_ORDER:
  readonly AssessmentDifficulty[] = [
    "very_easy",
    "easy",
    "medium",
    "hard",
    "very_hard",
  ];

function clamp(
  value: number,
  minimum: number,
  maximum: number,
): number {
  return Math.min(
    maximum,
    Math.max(
      minimum,
      value,
    ),
  );
}

function getCefrIndex(
  level:
    AssessmentCefrLevel,
): number {
  return Math.max(
    0,
    ASSESSMENT_CEFR_ORDER.indexOf(
      level,
    ),
  );
}

function getDifficultyIndex(
  difficulty:
    AssessmentDifficulty,
): number {
  return Math.max(
    0,
    DIFFICULTY_ORDER.indexOf(
      difficulty,
    ),
  );
}

function getTargetDifficulty(
  abilityScore: number,
): AssessmentDifficulty {
  if (
    abilityScore <
    25
  ) {
    return "easy";
  }

  if (
    abilityScore <
    58
  ) {
    return "medium";
  }

  if (
    abilityScore <
    82
  ) {
    return "hard";
  }

  return "very_hard";
}

export function isAdaptivePlacementSkill(
  skill:
    AssessmentSkill,
): skill is AdaptivePlacementSkill {
  return (
    ADAPTIVE_PLACEMENT_SKILLS as
      readonly AssessmentSkill[]
  ).includes(
    skill,
  );
}

export function isAdaptivePlacementQuestion(
  question:
    AssessmentQuestion,
): question is AdaptivePlacementQuestion {
  if (
    !isAdaptivePlacementSkill(
      question.skill,
    )
  ) {
    return false;
  }

  if (
    question.type ===
      "short_text" ||
    question.type ===
      "speaking_response"
  ) {
    return false;
  }

  if (
    question.type ===
      "listening_comprehension" &&
    !question.audioUrl
  ) {
    return false;
  }

  return true;
}

export function getAvailableAdaptivePlacementSkills(
  questions:
    readonly AssessmentQuestion[],
): readonly AdaptivePlacementSkill[] {
  return ADAPTIVE_PLACEMENT_SKILLS.filter(
    (skill) =>
      questions.some(
        (question) =>
          isAdaptivePlacementQuestion(
            question,
          ) &&
          question.skill ===
            skill,
      ),
  );
}

export function estimateCefrFromAbility(
  abilityScore: number,
): AssessmentCefrLevel {
  const score =
    clamp(
      abilityScore,
      0,
      100,
    );

  if (score < 23) {
    return "A1";
  }

  if (score < 40) {
    return "A2";
  }

  if (score < 59) {
    return "B1";
  }

  if (score < 76) {
    return "B2";
  }

  if (score < 90) {
    return "C1";
  }

  return "C2";
}

export function createInitialAdaptivePlacementState(
  startingLevel:
    AssessmentCefrLevel,
): AdaptivePlacementEngineState {
  return {
    currentCefrLevel:
      startingLevel,

    abilityScore:
      CEFR_ABILITY_SCORE[
        startingLevel
      ],

    confidence:
      0,

    correctStreak:
      0,

    incorrectStreak:
      0,

    askedQuestionIds:
      [],

    skillStats: {
      grammar: {
        answered: 0,
        correct: 0,
      },

      vocabulary: {
        answered: 0,
        correct: 0,
      },

      reading: {
        answered: 0,
        correct: 0,
      },

      listening: {
        answered: 0,
        correct: 0,
      },
    },
  };
}

export function markAdaptiveQuestionAsked(
  state:
    AdaptivePlacementEngineState,
  questionId:
    string,
): AdaptivePlacementEngineState {
  if (
    state.askedQuestionIds.includes(
      questionId,
    )
  ) {
    return state;
  }

  return {
    ...state,

    askedQuestionIds: [
      ...state.askedQuestionIds,
      questionId,
    ],
  };
}

function normalizeText(
  value: string,
  caseSensitive = false,
): string {
  const normalized =
    value
      .trim()
      .replace(
        /\s+/gu,
        " ",
      );

  return caseSensitive
    ? normalized
    : normalized.toLowerCase();
}

function setsMatch(
  first:
    readonly string[],
  second:
    readonly string[],
): boolean {
  if (
    first.length !==
    second.length
  ) {
    return false;
  }

  const firstSet =
    new Set(first);

  return second.every(
    (value) =>
      firstSet.has(
        value,
      ),
  );
}

function arraysMatch(
  first:
    readonly string[],
  second:
    readonly string[],
): boolean {
  return (
    first.length ===
      second.length &&
    first.every(
      (
        item,
        index,
      ) =>
        item ===
        second[index],
    )
  );
}

export function evaluateAdaptivePlacementAnswer(
  question:
    AssessmentQuestion,
  answer:
    AssessmentAnswerPayload,
): boolean | null {
  switch (
    question.type
  ) {
    case "multiple_choice":
    case "reading_comprehension":
    case "listening_comprehension":
      return (
        answer.kind ===
          "single_option" &&
        answer.selectedOptionId ===
          question.correctOptionId
      );

    case "multiple_select":
      return (
        answer.kind ===
          "multiple_options" &&
        setsMatch(
          answer.selectedOptionIds,
          question.correctOptionIds,
        )
      );

    case "fill_blank":
      return (
        answer.kind ===
          "text" &&
        question.acceptedAnswers.some(
          (acceptedAnswer) =>
            normalizeText(
              answer.value,
              question.caseSensitive,
            ) ===
            normalizeText(
              acceptedAnswer,
              question.caseSensitive,
            ),
        )
      );

    case "ordering":
      return (
        answer.kind ===
          "ordering" &&
        arraysMatch(
          answer.orderedItemIds,
          question.correctOrderItemIds,
        )
      );

    case "short_text":
    case "speaking_response":
      return null;
  }
}

function calculateConfidence(
  state:
    AdaptivePlacementEngineState,
): number {
  const stats =
    ADAPTIVE_PLACEMENT_SKILLS.map(
      (skill) =>
        state.skillStats[
          skill
        ],
    );

  const answered =
    stats.reduce(
      (
        total,
        stat,
      ) =>
        total +
        stat.answered,
      0,
    );

  const coveredSkills =
    stats.filter(
      (stat) =>
        stat.answered > 0,
    ).length;

  const minimumEvidence =
    Math.min(
      ...stats.map(
        (stat) =>
          stat.answered,
      ),
    );

  const evidenceScore =
    Math.min(
      56,
      answered * 6,
    );

  const coverageScore =
    (
      coveredSkills /
      ADAPTIVE_PLACEMENT_SKILLS.length
    ) * 20;

  const balanceScore =
    Math.min(
      8,
      minimumEvidence * 4,
    );

  const answeredStats =
    stats.filter(
      (stat) =>
        stat.answered > 0,
    );

  const certaintyScore =
    answeredStats.length ===
    0
      ? 0
      : answeredStats.reduce(
          (
            total,
            stat,
          ) => {
            const accuracy =
              stat.correct /
              stat.answered;

            return (
              total +
              Math.abs(
                accuracy - 0.5,
              ) *
                20
            );
          },
          0,
        ) /
        answeredStats.length;

  return clamp(
    Math.round(
      evidenceScore +
        coverageScore +
        balanceScore +
        certaintyScore,
    ),
    0,
    96,
  );
}

export function applyAdaptivePlacementAnswer({
  state,
  question,
  isCorrect,
  config,
}: Readonly<{
  state:
    AdaptivePlacementEngineState;

  question:
    AssessmentQuestion;

  isCorrect:
    boolean;

  config:
    AssessmentAdaptiveConfig;
}>): AdaptivePlacementEngineState {
  if (
    !isAdaptivePlacementSkill(
      question.skill,
    )
  ) {
    throw new Error(
      "Unsupported skill in adaptive placement.",
    );
  }

  const skill =
    question.skill;

  let correctStreak =
    isCorrect
      ? state.correctStreak +
        1
      : 0;

  let incorrectStreak =
    isCorrect
      ? 0
      : state.incorrectStreak +
        1;

  const questionAbility =
    CEFR_ABILITY_SCORE[
      question.cefrLevel
    ];

  let abilityDelta =
    isCorrect
      ? 6
      : -6;

  if (
    isCorrect &&
    questionAbility >
      state.abilityScore + 7
  ) {
    abilityDelta +=
      2;
  }

  if (
    !isCorrect &&
    questionAbility <
      state.abilityScore - 7
  ) {
    abilityDelta -=
      2;
  }

  if (
    correctStreak >=
    config.promoteAfterCorrectStreak
  ) {
    abilityDelta +=
      3;

    correctStreak = 0;
  }

  if (
    incorrectStreak >=
    config.demoteAfterIncorrectStreak
  ) {
    abilityDelta -=
      3;

    incorrectStreak = 0;
  }

  const abilityScore =
    clamp(
      state.abilityScore +
        abilityDelta,
      0,
      100,
    );

  const currentSkillStat =
    state.skillStats[
      skill
    ];

  const nextState:
    AdaptivePlacementEngineState = {
    ...state,

    abilityScore,

    currentCefrLevel:
      estimateCefrFromAbility(
        abilityScore,
      ),

    correctStreak,

    incorrectStreak,

    skillStats: {
      ...state.skillStats,

      [skill]: {
        answered:
          currentSkillStat.answered +
          1,

        correct:
          currentSkillStat.correct +
          (
            isCorrect
              ? 1
              : 0
          ),
      },
    },
  };

  return {
    ...nextState,

    confidence:
      calculateConfidence(
        nextState,
      ),
  };
}

function getQuestionPriority(
  question:
    AdaptivePlacementQuestion,
  state:
    AdaptivePlacementEngineState,
): number {
  const levelDistance =
    Math.abs(
      getCefrIndex(
        question.cefrLevel,
      ) -
        getCefrIndex(
          state.currentCefrLevel,
        ),
    );

  const targetDifficulty =
    getTargetDifficulty(
      state.abilityScore,
    );

  const difficultyDistance =
    Math.abs(
      getDifficultyIndex(
        question.difficulty,
      ) -
        getDifficultyIndex(
          targetDifficulty,
        ),
    );

  return (
    levelDistance * 10 +
    difficultyDistance * 2 +
    question.estimatedSeconds /
      10_000
  );
}

export function selectNextAdaptivePlacementQuestion(
  questions:
    readonly AssessmentQuestion[],
  state:
    AdaptivePlacementEngineState,
): AssessmentQuestion | null {
  const candidates =
    questions
      .filter(
        isAdaptivePlacementQuestion,
      )
      .filter(
        (question) =>
          !state.askedQuestionIds.includes(
            question.id,
          ),
      );

  if (
    candidates.length ===
    0
  ) {
    return null;
  }

  const availableSkills =
    ADAPTIVE_PLACEMENT_SKILLS
      .filter(
        (skill) =>
          candidates.some(
            (question) =>
              question.skill ===
              skill,
          ),
      )
      .sort(
        (
          first,
          second,
        ) => {
          const evidenceDifference =
            state.skillStats[
              first
            ].answered -
            state.skillStats[
              second
            ].answered;

          if (
            evidenceDifference !==
            0
          ) {
            return evidenceDifference;
          }

          return (
            ADAPTIVE_PLACEMENT_SKILLS.indexOf(
              first,
            ) -
            ADAPTIVE_PLACEMENT_SKILLS.indexOf(
              second,
            )
          );
        },
      );

  const selectedSkill =
    availableSkills[0];

  if (!selectedSkill) {
    return null;
  }

  const skillCandidates =
    candidates
      .filter(
        (question) =>
          question.skill ===
          selectedSkill,
      )
      .sort(
        (
          first,
          second,
        ) => {
          const priorityDifference =
            getQuestionPriority(
              first,
              state,
            ) -
            getQuestionPriority(
              second,
              state,
            );

          if (
            priorityDifference !==
            0
          ) {
            return priorityDifference;
          }

          return first.id.localeCompare(
            second.id,
          );
        },
      );

  return (
    skillCandidates[0] ??
    null
  );
}

export function getAdaptivePlacementAnsweredCount(
  state:
    AdaptivePlacementEngineState,
): number {
  return ADAPTIVE_PLACEMENT_SKILLS.reduce(
    (
      total,
      skill,
    ) =>
      total +
      state.skillStats[
        skill
      ].answered,
    0,
  );
}

export function shouldCompleteAdaptivePlacement({
  state,
  config,
  questions,
}: Readonly<{
  state:
    AdaptivePlacementEngineState;

  config:
    AssessmentAdaptiveConfig;

  questions:
    readonly AssessmentQuestion[];
}>): boolean {
  const answeredCount =
    getAdaptivePlacementAnsweredCount(
      state,
    );

  if (
    answeredCount >=
    config.maximumQuestions
  ) {
    return true;
  }

  const nextQuestion =
    selectNextAdaptivePlacementQuestion(
      questions,
      state,
    );

  if (!nextQuestion) {
    return true;
  }

  if (
    answeredCount <
    config.minimumQuestions
  ) {
    return false;
  }

  const availableSkills =
    getAvailableAdaptivePlacementSkills(
      questions,
    );

  const hasRequiredCoverage =
    availableSkills.every(
      (skill) =>
        state.skillStats[
          skill
        ].answered > 0,
    );

  if (
    !hasRequiredCoverage
  ) {
    return false;
  }

  return (
    state.confidence >=
    config.targetConfidence
  );
}

export function estimateFinalAdaptiveCefrLevel(
  state:
    AdaptivePlacementEngineState,
  answeredQuestions:
    readonly AssessmentQuestion[],
): AssessmentCefrLevel {
  const inferredLevel =
    estimateCefrFromAbility(
      state.abilityScore,
    );

  if (
    answeredQuestions.length ===
    0
  ) {
    return inferredLevel;
  }

  const highestEvidenceIndex =
    Math.max(
      ...answeredQuestions.map(
        (question) =>
          getCefrIndex(
            question.cefrLevel,
          ),
      ),
    );

  const inferredIndex =
    getCefrIndex(
      inferredLevel,
    );

  if (
    inferredIndex <=
    highestEvidenceIndex
  ) {
    return inferredLevel;
  }

  return (
    ASSESSMENT_CEFR_ORDER[
      highestEvidenceIndex
    ] ??
    inferredLevel
  );
}