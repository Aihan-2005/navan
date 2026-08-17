import {
  ASSESSMENT_CEFR_ORDER,
  ASSESSMENT_SKILL_LABELS,
} from "../constants/assessment.constants";

import {
  assessmentSubmissionResultSchema,
} from "../schemas/assessment-runner.schema";

import type {
  AssessmentAnswerPayload,
} from "../types/assessment-attempt.types";

import type {
  AssessmentCefrLevel,
  AssessmentQuestion,
  AssessmentSkill,
} from "../types/assessment-question.types";

import type {
  AssessmentQuestionReview,
  AssessmentSubmission,
  AssessmentSubmissionResult,
} from "../types/assessment-runner.types";

import type {
  AssessmentDefinition,
} from "../types/assessment.types";

type QuestionEvaluation =
  Readonly<{
    question:
      AssessmentQuestion;

    answer:
      AssessmentAnswerPayload | null;

    answerProvided:
      boolean;

    isCorrect:
      boolean | null;

    earnedPoints:
      number | null;

    maximumPoints:
      number;

    manuallyReviewed:
      boolean;

    feedback:
      string;

    review:AssessmentQuestionReview;
  }>;

function normalizeText(
  value:
    string,
  caseSensitive =
    false,
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

function arraysMatchExactly(
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

  return first.every(
    (
      value,
      index,
    ) =>
      value ===
      second[index],
  );
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
    new Set(
      first,
    );

  return second.every(
    (
      item,
    ) =>
      firstSet.has(
        item,
      ),
  );
}

function getSubmittedAnswerLabel(
  question:
    AssessmentQuestion,
  answer:
    AssessmentAnswerPayload | null,
): string | null {
  if (!answer) {
    return null;
  }

  switch (
    answer.kind
  ) {
    case "single_option": {
      if (
        question.type !==
          "multiple_choice" &&
        question.type !==
          "reading_comprehension" &&
        question.type !==
          "listening_comprehension"
      ) {
        return null;
      }

return (
        question.options.find(
          (
            option,
          ) =>
            option.id ===
            answer.selectedOptionId,
        )?.label ??
        answer.selectedOptionId
      );
    }

    case "multiple_options": {
      if (
        question.type !==
        "multiple_select"
      ) {
        return null;
      }

      return answer.selectedOptionIds
        .map(
          (
            optionId,
          ) =>
            question.options.find(
              (
                option,
              ) =>
                option.id ===
                optionId,
            )?.label ??
            optionId,
        )
        .join(
          "، ",
        );
    }

    case "text":
      return answer.value;

    case "ordering": {
      if (
        question.type !==
        "ordering"
      ) {
        return null;
      }

      return answer.orderedItemIds
             .map(
          (
            itemId,
          ) =>
            question.items.find(
              (
                item,
              ) =>
                item.id ===
                itemId,
            )?.label ??
            itemId,
        )
        .join(
          " ← ",
        );
    }

    case "recording":
      return `${answer.durationSeconds} ثانیه پاسخ صوتی`;
  }
}

function getCorrectAnswerLabel(
  question:
    AssessmentQuestion,
): string | null {
  switch (
    question.type
  ) {
    case "multiple_choice":
    case "reading_comprehension":
    case "listening_comprehension":
      return (
        question.options.find(
          (
            option,
          ) =>
            option.id ===
            question.correctOptionId,
        )?.label ??
        question.correctOptionId
      );

    case "multiple_select":
      return question.correctOptionIds
        .map(
          (
            optionId,
          ) =>
            question.options.find(
              (
                option,
              ) =>
                option.id ===
                optionId,
            )?.label ??
            optionId,
        )
        .join(
          "، ",
        );

    case "fill_blank":
      return question.acceptedAnswers.join(
        " / ",
      );

    case "ordering":
      return question.correctOrderItemIds
        .map(
          (
            itemId,
          ) =>
            question.items.find(
              (
                item,
              ) =>
                item.id ===
                itemId,
            )?.label ??
            itemId,
        )
        .join(
          " ← ",
        );

    case "short_text":
      return question.referenceAnswer;

    case "speaking_response":
      return question.referenceText;
  }
}

function evaluateQuestion(
  question:
    AssessmentQuestion,
  answer:
    AssessmentAnswerPayload | null,
): QuestionEvaluation {
  const answerProvided =
    answer !==
    null;

  const maximumPoints =
    question.points;

  let isCorrect:
    boolean | null =
      false;

  let earnedPoints:
    number | null =
      0;

  let manuallyReviewed =
    false;

  let feedback =
    "پاسخ صحیح نیست.";

  if (!answer) {
    feedback =
      "برای این سؤال پاسخی ثبت نشده است.";
  } else {
    switch (
      question.type
    ) {
      case "multiple_choice":
      case "reading_comprehension":
      case "listening_comprehension": {
        isCorrect =
          answer.kind ===
            "single_option" &&
          answer.selectedOptionId ===
            question.correctOptionId;

        earnedPoints =
          isCorrect
            ? maximumPoints
            : 0;

        feedback =
          isCorrect
            ? "پاسخ درست است."
            : "گزینه انتخاب‌شده صحیح نیست.";

        break;
      }

      case "multiple_select": {
        isCorrect =
          answer.kind ===
            "multiple_options" &&
          setsMatch(
            answer.selectedOptionIds,
            question.correctOptionIds,
          );

        earnedPoints =
          isCorrect
            ? maximumPoints
            : 0;

        feedback =
          isCorrect
            ? "تمام گزینه‌های صحیح را انتخاب کردی."
            : "ترکیب گزینه‌های انتخاب‌شده کامل یا صحیح نیست.";

        break;
      }

      case "fill_blank": {
        isCorrect =
          answer.kind ===
            "text" &&
          question.acceptedAnswers.some(
            (
              acceptedAnswer,
            ) =>
              normalizeText(
                answer.value,
                question.caseSensitive,
              ) ===
              normalizeText(
                acceptedAnswer,
                question.caseSensitive,
              ),
          );

        earnedPoints =
          isCorrect
            ? maximumPoints
            : 0;

        feedback =
          isCorrect
            ? "پاسخ جای خالی درست است."
            : "پاسخ واردشده با جواب پذیرفته‌شده مطابقت ندارد.";

        break;
      }

      case "ordering": {
        isCorrect =
          answer.kind ===
            "ordering" &&
          arraysMatchExactly(
 answer.orderedItemIds,
            question.correctOrderItemIds,
          );

        earnedPoints =
          isCorrect
            ? maximumPoints
            : 0;

        feedback =
          isCorrect
            ? "ترتیب کاملاً صحیح است."
            : "ترتیب آیتم‌ها صحیح نیست.";

        break;
      }

      case "short_text": {
        isCorrect =
          null;

        earnedPoints =
          null;

        manuallyReviewed =
          true;

        feedback =
          answer.kind ===
          "text"
            ? "پاسخ متنی ثبت شد و برای ارزیابی AI/Backend آماده است."
            : "نوع پاسخ ارسال‌شده با سؤال مطابقت ندارد.";

        break;
      }

      case "speaking_response": {
        isCorrect =
          null;

        earnedPoints =
     null;

        manuallyReviewed =
          true;

        feedback =
          answer.kind ===
          "recording"
            ? "پاسخ صوتی ثبت شد و پس از اتصال Speech Analysis ارزیابی خواهد شد."
            : "پاسخ صوتی معتبری ثبت نشده است.";

        break;
      }
    }
  }

  return {
    question,

    answer,

    answerProvided,

    isCorrect,

    earnedPoints,

    maximumPoints,

    manuallyReviewed,

    feedback,

    review: {
      questionId:
        question.id,

      questionType:
        question.type,

      skill:
        question.skill,

      prompt:
        question.prompt,

      isCorrect,

      earnedPoints,

      maximumPoints,

      submittedAnswerLabel:
        getSubmittedAnswerLabel(
          question,
          answer,
        ),correctAnswerLabel:
        getCorrectAnswerLabel(
          question,
        ),

      feedback,

      explanation:
        question.explanation,
    },
  };
}

function calculatePercentage(
  earned:
    number,
  maximum:
    number,
): number {
  if (
    maximum <=
    0
  ) {
    return 0;
  }

  return Math.round(
    (
      earned /
      maximum
    ) *
      100,
  );
}

function clampIndex(
  index:
    number,
): number {
  return Math.min(
    ASSESSMENT_CEFR_ORDER.length -
      1,
    Math.max(
      0,
      index,
    ),
  );
}

function estimateCefrLevel(
  questions:
    readonly AssessmentQuestion[],
  score:
    number,
): AssessmentCefrLevel {
  const levelIndexes =
questions.map(
      (
        question,
      ) =>
        ASSESSMENT_CEFR_ORDER.indexOf(
          question.cefrLevel,
        ),
    );

  const averageIndex =
    levelIndexes.length >
    0
      ? Math.round(
          levelIndexes.reduce(
            (
              sum,
              value,
            ) =>
              sum +
              value,
            0,
          ) /
            levelIndexes.length,
        )
      : 2;

  let adjustment =
    0;

  if (
    score >=
    88
  ) {
    adjustment =
      1;
  } else if (
    score <
    50
  ) {
    adjustment =
      -1;
  }

  return ASSESSMENT_CEFR_ORDER[
    clampIndex(
      averageIndex +
        adjustment,
    )
  ];
}

function buildSkillScores(
  assessment:
    AssessmentDefinition,
  evaluations:
    readonly QuestionEvaluation[],
) {
  return assessment.skills.map(
(
      skill,
    ) => {
      const skillEvaluations =
        evaluations.filter(
          (
            evaluation,
          ) =>
            evaluation.question
              .skill ===
            skill,
        );

      const scorable =
        skillEvaluations.filter(
          (
            evaluation,
          ) =>
            !evaluation.manuallyReviewed,
        );

      const maximumPoints =
        scorable.reduce(
          (
            sum,
            evaluation,
          ) =>
            sum +
            evaluation.maximumPoints,
          0,
        );

      const earnedPoints =
        scorable.reduce(
          (
            sum,
            evaluation,
          ) =>
            sum +
            (
              evaluation.earnedPoints ??
              0
            ),
          0,
        );

      const score =
        calculatePercentage(
          earnedPoints,
          maximumPoints,
        );const topics =
        Array.from(
          new Set(
            skillEvaluations.map(
              (
                evaluation,
              ) =>
                evaluation.question
                  .topic,
            ),
          ),
        );

      const categories =
        topics.map(
          (
            topic,
          ) => {
            const topicEvaluations =
              scorable.filter(
                (
                  evaluation,
                ) =>
                  evaluation.question
                    .topic ===
                  topic,
              );

            const topicMaximum =
              topicEvaluations.reduce(
                (
                  sum,
                  evaluation,
                ) =>
                  sum +
                  evaluation.maximumPoints,
                0,
              );

            const topicEarned =
              topicEvaluations.reduce(
                (
                  sum,
                  evaluation,
                ) =>
                  sum +
                  (
                    evaluation.earnedPoints ??
                    0
                  ),
                0,
              );

            return {
              key:
                topic,

              label:
                topic
                  .replace(
                    /_/gu,
                    " ",
                  ),

              score:
                calculatePercentage(
                  topicEarned,
                  topicMaximum,
                ),

              evidenceCount:
                topicEvaluations.length,
            };
          },
        );

      return {
        skill,

        score,

        cefrLevel:
          estimateCefrLevel(
            skillEvaluations.map(
              (
                evaluation,
              ) =>
                evaluation.question,
            ),
            score,
          ),

        confidence:
          Math.min(
            95,
            55 +
              skillEvaluations.length *
                8,
          ),

        correctCount:
          scorable.filter(
            (
              evaluation,
            ) =>
              evaluation.isCorrect ===
              true,
          ).length,

        totalCount:
          scorable.length,

        categories,
      };
    },
  );
}

function createInsightId(
  prefix:
    string,
  skill:
    AssessmentSkill,
): string {
  return `${prefix}-${skill}`;
}

export function scoreAssessmentSubmission(
  assessment:
    AssessmentDefinition,
  submission:
    AssessmentSubmission,
): AssessmentSubmissionResult {
  const answerMap =
    new Map(
      submission.answers.map(
        (
          answer,
        ) => [
          answer.questionId,
          answer.payload,
        ],
      ),
    );

  const evaluations =
    assessment.questions.map(
      (
        question,
      ) =>
        evaluateQuestion(
          question,
          answerMap.get(
            question.id,
          ) ??
            null,
        ),
    );

  const objectiveEvaluations =
    evaluations.filter(
      (
        evaluation,
      ) =>
        !evaluation.manuallyReviewed,
    );
const maximumPoints =
    objectiveEvaluations.reduce(
      (
        sum,
        evaluation,
      ) =>
        sum +
        evaluation.maximumPoints,
      0,
    );

  const earnedPoints =
    objectiveEvaluations.reduce(
      (
        sum,
        evaluation,
      ) =>
        sum +
        (
          evaluation.earnedPoints ??
          0
        ),
      0,
    );

  const overallScore =
    calculatePercentage(
      earnedPoints,
      maximumPoints,
    );

  const skillScores =
    buildSkillScores(
      assessment,
      evaluations,
    );

  const strengths =
    skillScores
      .filter(
        (
          skill,
        ) =>
          skill.score >=
          75,
      )
      .map(
        (
          skill,
        ) => ({
          id:
            createInsightId(
              "strength",
              skill.skill,
            ),type:
            "strength" as const,

          priority:
            "medium" as const,

          relatedSkill:
            skill.skill,

          title:
            `عملکرد خوب در ${ASSESSMENT_SKILL_LABELS[skill.skill]}`,

          description:
            `امتیاز ${skill.score}٪ نشان می‌دهد در این بخش عملکرد پایداری داشته‌ای.`,

          evidence:
            `${skill.correctCount} پاسخ صحیح از ${skill.totalCount} سؤال قابل امتیازدهی`,
        }),
      );

  const weaknesses =
    skillScores
      .filter(
        (
          skill,
        ) =>
          skill.score <
          60,
      )
      .map(
        (
          skill,
        ) => ({
          id:
            createInsightId(
              "weakness",
              skill.skill,
            ),

          type:
            "weakness" as const,

          priority:
            skill.score <
            40
              ? "high" as const
              : "medium" as const,

          relatedSkill:
            skill.skill,

          title:
            `نیاز به تمرین بیشتر در ${ASSESSMENT_SKILL_LABELS[skill.skill]}`,

             description:
            "چند الگوی خطا در پاسخ‌های این مهارت دیده می‌شود و بهتر است قبل از آزمون بعدی مرور هدفمند داشته باشی.",

          evidence:
            `امتیاز فعلی: ${skill.score}٪`,
        }),
      );

  const recommendations =
    skillScores
      .filter(
        (
          skill,
        ) =>
          skill.score >=
            60 &&
          skill.score <
            75,
      )
      .map(
        (
          skill,
        ) => ({
          id:
            createInsightId(
              "recommendation",
              skill.skill,
            ),

          type:
            "recommendation" as const,

          priority:
            "medium" as const,

          relatedSkill:
            skill.skill,

          title:
            `تثبیت ${ASSESSMENT_SKILL_LABELS[skill.skill]}`,

          description:
            "پایه این مهارت مناسب است؛ با یک مرور کوتاه می‌توانی دقت پاسخ‌ها را بیشتر کنی.",

          evidence:
            `امتیاز فعلی: ${skill.score}٪`,
        }),
      );
const weakestSkills =
    [...skillScores]
      .sort(
        (
          first,
          second,
        ) =>
          first.score -
          second.score,
      )
      .slice(
        0,
        2,
      );

  const recommendedActions =
    weakestSkills.map(
      (
        skill,
        index,
      ) => ({
        id:
          `assessment-action-${skill.skill}`,

        type:
          "practice" as const,

        skill:
          skill.skill,

        title:
          `تمرین ${ASSESSMENT_SKILL_LABELS[skill.skill]}`,

        description:
          "قبل از ارزیابی بعدی چند تمرین کوتاه و هدفمند روی این مهارت انجام بده.",

        reason:
          `این مهارت با امتیاز ${skill.score}٪ یکی از پایین‌ترین نتایج این آزمون است.`,

        href:
          index ===
          0
            ? "/dashboard"
            : "/assessment",
      }),
    );

  const correctCount =
    objectiveEvaluations.filter(
      (
        evaluation,
      ) =>
        evaluation.answerProvided &&
        evaluation.isCorrect ===
          true,).length;

  const incorrectCount =
    objectiveEvaluations.filter(
      (
        evaluation,
      ) =>
        evaluation.answerProvided &&
        evaluation.isCorrect ===
          false,
    ).length;

  const unansweredCount =
    evaluations.filter(
      (
        evaluation,
      ) =>
        !evaluation.answerProvided,
    ).length;

  const manualReviewCount =
    evaluations.filter(
      (
        evaluation,
      ) =>
        evaluation.answerProvided &&
        evaluation.manuallyReviewed,
    ).length;

  const completedAt =
    new Date()
      .toISOString();

  const passed =
    assessment.passingScore ===
    null
      ? null
      : overallScore >=
        assessment.passingScore;

  const result =
    assessmentSubmissionResultSchema.parse(
      {
        result: {
          id:
            `result-${submission.attemptId}`,

          attemptId:
            submission.attemptId,

          assessmentId:
            assessment.id,

          assessmentType:
            assessment.type,

           overallScore,

          estimatedCefrLevel:
            estimateCefrLevel(
              assessment.questions,
              overallScore,
            ),

          confidence:
            Math.min(
              96,
              58 +
                objectiveEvaluations.length *
                  3,
            ),

          passed,

          scoreSummary: {
            correctCount,

            incorrectCount,

            partiallyCorrectCount:
              manualReviewCount,

            unansweredCount,

            earnedPoints,

            maximumPoints:
              Math.max(
                1,
                maximumPoints,
              ),
          },

          skillScores,

          strengths,

          weaknesses,

          recommendations,

          recommendedActions,

          aiSummary:
            `امتیاز کلی شما ${overallScore}٪ است. ${
              weakestSkills[0]
                ? `تمرکز پیشنهادی بعدی روی ${ASSESSMENT_SKILL_LABELS[weakestSkills[0].skill]} است.`
                : "برای برآورد دقیق‌تر، آزمون‌های بیشتری تکمیل کن."
            }`,

          xpAwarded:
            passed ===
            false
              ? Math.floor(
                  assessment.xpReward *
                    0.4,
                )
              : assessment.xpReward,

          completedAt,
        },

        review:
          evaluations.map(
            (
              evaluation,
            ) =>
              evaluation.review,
          ),
      },
    );

  return result;
}