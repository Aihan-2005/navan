import type {
  LeitnerBox,
  LeitnerBoxNumber,
  ReviewGrade,
  VocabularyReviewLogEntry,
  VocabularyStats,
  VocabularyStatus,
  VocabularyWord,
} from "../types/vocabulary.types";

const BOX_INTERVAL_DAYS: Record<
  LeitnerBoxNumber,
  number
> = {
  1: 1,
  2: 2,
  3: 4,
  4: 8,
  5: 16,
};

const MINUTE =
  60 * 1000;

const HOUR =
  60 * MINUTE;

const DAY =
  24 * HOUR;

function clampBox(
  value: number,
): LeitnerBoxNumber {
  return Math.min(
    5,
    Math.max(
      1,
      value,
    ),
  ) as LeitnerBoxNumber;
}

function addMilliseconds(
  date: Date,
  milliseconds: number,
): Date {
  return new Date(
    date.getTime() +
      milliseconds,
  );
}

function getStatusForBox(
  box: LeitnerBoxNumber,
): VocabularyStatus {
  if (box === 5) {
    return "mastered";
  }

  if (box <= 2) {
    return "learning";
  }

  return "review";
}

export type ReviewPreview = {
  nextBox: LeitnerBoxNumber;

  delayMilliseconds: number;

  label: string;
};

function formatDelay(
  milliseconds: number,
): string {
  const minutes =
    Math.round(
      milliseconds /
        MINUTE,
    );

  if (minutes < 60) {
    return `${minutes} دقیقه`;
  }

  const hours =
    Math.round(
      milliseconds /
        HOUR,
    );

  if (hours < 24) {
    return `${hours} ساعت`;
  }

  const days =
    Math.round(
      milliseconds /
        DAY,
    );

  return `${days} روز`;
}

export function previewReview(
  currentBox: LeitnerBoxNumber,
  grade: ReviewGrade,
): ReviewPreview {
  if (grade === "again") {
    const delay =
      10 * MINUTE;

    return {
      nextBox: 1,
      delayMilliseconds:
        delay,
      label:
        formatDelay(
          delay,
        ),
    };
  }

  if (grade === "hard") {
    const box =
      currentBox;

    const interval =
      BOX_INTERVAL_DAYS[
        box
      ] *
      DAY *
      0.5;

    const delay =
      Math.max(
        12 * HOUR,
        interval,
      );

    return {
      nextBox: box,
      delayMilliseconds:
        delay,
      label:
        formatDelay(
          delay,
        ),
    };
  }

  if (grade === "good") {
    const box =
      clampBox(
        currentBox + 1,
      );

    const delay =
      BOX_INTERVAL_DAYS[
        box
      ] * DAY;

    return {
      nextBox: box,
      delayMilliseconds:
        delay,
      label:
        formatDelay(
          delay,
        ),
    };
  }

  const box =
    clampBox(
      currentBox + 2,
    );

  const delay =
    BOX_INTERVAL_DAYS[
      box
    ] *
    DAY *
    1.25;

  return {
    nextBox: box,
    delayMilliseconds:
      delay,
    label:
      formatDelay(
        delay,
      ),
  };
}

export function applyLeitnerReview(
  word: VocabularyWord,
  grade: ReviewGrade,
  reviewedAt = new Date(),
): {
  word: VocabularyWord;
  log: VocabularyReviewLogEntry;
} {
  const preview =
    previewReview(
      word.leitnerBox,
      grade,
    );

  const isCorrect =
    grade !== "again";

  const nextReview =
    addMilliseconds(
      reviewedAt,
      preview.delayMilliseconds,
    );

  const updatedWord: VocabularyWord =
    {
      ...word,

      leitnerBox:
        preview.nextBox,

      status:
        getStatusForBox(
          preview.nextBox,
        ),

      reviewCount:
        word.reviewCount + 1,

      correctCount:
        word.correctCount +
        (isCorrect ? 1 : 0),

      lapseCount:
        (word.lapseCount ??
          0) +
        (!isCorrect ? 1 : 0),

      lastReviewedAt:
        reviewedAt.toISOString(),

      nextReviewAt:
        nextReview.toISOString(),

      updatedAt:
        reviewedAt.toISOString(),
    };

  const log: VocabularyReviewLogEntry =
    {
      id:
        `review-${word.id}-${reviewedAt.getTime()}`,

      wordId:
        word.id,

      grade,

      previousBox:
        word.leitnerBox,

      nextBox:
        preview.nextBox,

      reviewedAt:
        reviewedAt.toISOString(),

      nextReviewAt:
        nextReview.toISOString(),
    };

  return {
    word:
      updatedWord,

    log,
  };
}

export function isWordDue(
  word: VocabularyWord,
  now = new Date(),
): boolean {
  return (
    new Date(
      word.nextReviewAt,
    ).getTime() <=
    now.getTime()
  );
}

export function getDueWords(
  words: readonly VocabularyWord[],
  now = new Date(),
): VocabularyWord[] {
  return words
    .filter(
      (word) =>
        isWordDue(
          word,
          now,
        ),
    )
    .sort(
      (a, b) =>
        new Date(
          a.nextReviewAt,
        ).getTime() -
        new Date(
          b.nextReviewAt,
        ).getTime(),
    );
}

export function getLeitnerBoxes(
  words: readonly VocabularyWord[],
  now = new Date(),
): LeitnerBox[] {
  const definitions = [
    {
      box: 1 as const,
      title:
        "جعبه ۱",
      description:
        "واژه‌های جدید",
      intervalLabel:
        "مرور روزانه",
    },

    {
      box: 2 as const,
      title:
        "جعبه ۲",
      description:
        "در حال یادگیری",
      intervalLabel:
        "هر ۲ روز",
    },

    {
      box: 3 as const,
      title:
        "جعبه ۳",
      description:
        "تثبیت اولیه",
      intervalLabel:
        "هر ۴ روز",
    },

    {
      box: 4 as const,
      title:
        "جعبه ۴",
      description:
        "تثبیت قوی",
      intervalLabel:
        "هر ۸ روز",
    },

    {
      box: 5 as const,
      title:
        "جعبه ۵",
      description:
        "حافظه بلندمدت",
      intervalLabel:
        "هر ۱۶ روز",
    },
  ];

  return definitions.map(
    (definition) => {
      const cards =
        words.filter(
          (word) =>
            word.leitnerBox ===
            definition.box,
        );

      return {
        ...definition,

        totalCards:
          cards.length,

        dueCards:
          cards.filter(
            (word) =>
              isWordDue(
                word,
                now,
              ),
          ).length,
      };
    },
  );
}

function startOfToday(
  date = new Date(),
): Date {
  const result =
    new Date(date);

  result.setHours(
    0,
    0,
    0,
    0,
  );

  return result;
}

function endOfToday(
  date = new Date(),
): Date {
  const result =
    new Date(date);

  result.setHours(
    23,
    59,
    59,
    999,
  );

  return result;
}

function localDateKey(
  date: Date,
): string {
  return [
    date.getFullYear(),
    String(
      date.getMonth() +
        1,
    ).padStart(
      2,
      "0",
    ),
    String(
      date.getDate(),
    ).padStart(
      2,
      "0",
    ),
  ].join("-");
}

function calculateStreak(
  logs: readonly VocabularyReviewLogEntry[],
  now = new Date(),
): number {
  const activeDays =
    new Set(
      logs.map(
        (log) =>
          localDateKey(
            new Date(
              log.reviewedAt,
            ),
          ),
      ),
    );

  let cursor =
    startOfToday(
      now,
    );

  if (
    !activeDays.has(
      localDateKey(
        cursor,
      ),
    )
  ) {
    cursor =
      new Date(
        cursor.getTime() -
          DAY,
      );
  }

  let streak = 0;

  while (
    activeDays.has(
      localDateKey(
        cursor,
      ),
    )
  ) {
    streak += 1;

    cursor =
      new Date(
        cursor.getTime() -
          DAY,
      );
  }

  return streak;
}

export function calculateVocabularyStats(
  words: readonly VocabularyWord[],
  logs: readonly VocabularyReviewLogEntry[],
  dailyGoal: number,
  now = new Date(),
): VocabularyStats {
  const todayStart =
    startOfToday(
      now,
    );

  const todayEnd =
    endOfToday(
      now,
    );

  const sevenDaysAgo =
    new Date(
      now.getTime() -
        7 * DAY,
    );

  const dailyLogs =
    logs.filter(
      (log) => {
        const time =
          new Date(
            log.reviewedAt,
          ).getTime();

        return (
          time >=
            todayStart.getTime() &&
          time <=
            todayEnd.getTime()
        );
      },
    );

  const weeklyLogs =
    logs.filter(
      (log) =>
        new Date(
          log.reviewedAt,
        ).getTime() >=
        sevenDaysAgo.getTime(),
    );

  const weeklyAdded =
    words.filter(
      (word) =>
        new Date(
          word.createdAt,
        ).getTime() >=
        sevenDaysAgo.getTime(),
    ).length;

  const dueToday =
    words.filter(
      (word) =>
        new Date(
          word.nextReviewAt,
        ).getTime() <=
        todayEnd.getTime(),
    ).length;

  const masteredWords =
    words.filter(
      (word) =>
        word.leitnerBox ===
          5 ||
        word.status ===
          "mastered",
    ).length;

  const weightedScore =
    words.reduce(
      (total, word) =>
        total +
        word.leitnerBox /
          5,
      0,
    );

  const masteryPercent =
    words.length > 0
      ? Math.round(
          (weightedScore /
            words.length) *
            100,
        )
      : 0;

  return {
    totalWords:
      words.length,

    dueToday,

    masteredWords,

    learningWords:
      words.length -
      masteredWords,

    weeklyAdded,

    weeklyReviewed:
      weeklyLogs.length,

    currentStreak:
      calculateStreak(
        logs,
        now,
      ),

    dailyGoal,

    dailyReviewed:
      dailyLogs.length,

    masteryPercent,
  };
}