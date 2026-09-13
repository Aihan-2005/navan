import "server-only";

import {
  listeningAttemptAnalysisSchema,
} from "../schemas/listening-analysis.schema";

import type {
  ListeningAttemptSubmitInput,
} from "../types/listening-attempt-command.types";

import type {
  CefrLevel,
  ListeningAttemptAnalysis,
  ListeningComparisonKind,
  ListeningComparisonSegment,
} from "../types/listening.types";

const MOCK_CONTENT_REFERENCE = {
  "daily-routine-podcast": {
    title:
      "یک روز معمولی در لندن",

    transcript:
      "I usually wake up at seven and have a quick breakfast before leaving home. I take the underground to work because driving through central London takes too long. In the evening I often walk around my neighborhood before going home.",
  },

  "airport-check-in-conversation": {
    title:
      "گفت‌وگو در فرودگاه",

    transcript:
      "Good morning. May I see your passport and ticket, please? I have one piece of luggage. I would like a window seat if possible. Your flight leaves at ten thirty from gate twelve.",
  },

  "small-act-of-kindness-story": {
    title:
      "یک کار کوچک و مهربانانه",

    transcript:
      "One morning I noticed an elderly woman struggling with several bags near the station. I offered to help her carry them. She smiled and told me that the small act of kindness had changed her entire morning.",
  },

  "remote-work-interview": {
    title:
      "مصاحبه درباره دورکاری",

    transcript:
      "Remote work gives employees more flexibility and removes commuting time, but it can also create distractions. A dedicated workspace, clear communication and regular breaks can help people stay productive.",
  },

  "technology-news-brief": {
    title:
      "خبر کوتاه فناوری",

    transcript:
      "The company announced a new research program. Researchers say the technology could help software developers work faster.",
  },
} as const;

function normalizeToken(
  value:
    string,
): string {
  return value
    .toLowerCase()
    .replace(
      /[^\p{L}\p{N}'-]+/gu,
      "",
    )
    .trim();
}

function tokenize(
  value:
    string,
): string[] {
  return value
    .split(/\s+/u)
    .map(
      normalizeToken,
    )
    .filter(
      Boolean,
    );
}

function splitSentences(
  value:
    string,
): string[] {
  return value
    .split(
      /(?<=[.!?])\s+/u,
    )
    .map(
      (sentence) =>
        sentence.trim(),
    )
    .filter(
      Boolean,
    );
}

function clampScore(
  value:
    number,
): number {
  return Math.min(
    100,
    Math.max(
      0,
      Math.round(
        value,
      ),
    ),
  );
}

function calculateWordAccuracy(
  expected:
    string,
  actual:
    string,
): number {
  const expectedWords =
    tokenize(
      expected,
    );

  const actualWords =
    tokenize(
      actual,
    );

  if (
    expectedWords.length ===
    0
  ) {
    return 0;
  }

  const remaining =
    [...actualWords];

  let matches =
    0;

  for (
    const expectedWord
    of expectedWords
  ) {
    const index =
      remaining.indexOf(
        expectedWord,
      );

    if (
      index === -1
    ) {
      continue;
    }

    matches +=
      1;

    remaining.splice(
      index,
      1,
    );
  }

  return clampScore(
    (
      matches /
      expectedWords.length
    ) *
      100,
  );
}

function calculateSequenceAccuracy(
  expected:
    string,
  actual:
    string,
): number {
  const expectedWords =
    tokenize(
      expected,
    );

  const actualWords =
    tokenize(
      actual,
    );

  const comparableCount =
    Math.min(
      expectedWords.length,
      actualWords.length,
    );

  if (
    expectedWords.length ===
      0 ||
    comparableCount ===
      0
  ) {
    return 0;
  }

  let matches =
    0;

  for (
    let index =
      0;
    index <
    comparableCount;
    index +=
      1
  ) {
    if (
      expectedWords[index] ===
      actualWords[index]
    ) {
      matches +=
        1;
    }
  }

  return clampScore(
    (
      matches /
      expectedWords.length
    ) *
      100,
  );
}

function buildComparison(
  expected:
    string,
  actual:
    string,
): ListeningComparisonSegment[] {
  const expectedSentences =
    splitSentences(
      expected,
    );

  const actualSentences =
    splitSentences(
      actual,
    );

  const count =
    Math.max(
      expectedSentences.length,
      actualSentences.length,
      1,
    );

  const segments:
    ListeningComparisonSegment[] =
    [];

  for (
    let index =
      0;
    index <
    count;
    index +=
      1
  ) {
    const expectedSentence =
      expectedSentences[
        index
      ] ??
      null;

    const actualSentence =
      actualSentences[
        index
      ] ??
      null;

    let kind:
      ListeningComparisonKind;

    if (
      expectedSentence &&
      actualSentence
    ) {
      kind =
        normalizeToken(
          expectedSentence,
        ) ===
        normalizeToken(
          actualSentence,
        )
          ? "match"
          : "substitution";
    } else if (
      expectedSentence
    ) {
      kind =
        "omission";
    } else {
      kind =
        "addition";
    }

    segments.push({
      id:
        `mock-segment-${index + 1}`,

      kind,

      expected:
        expectedSentence,

      actual:
        actualSentence,
    });
  }

  return segments;
}

function estimateCefr(
  score:
    number,
): CefrLevel {
  if (
    score >=
    88
  ) {
    return "B2";
  }

  if (
    score >=
    65
  ) {
    return "B1";
  }

  return "A2";
}

export function createMockListeningAnalysis(
  attemptId:
    string,
  input:
    ListeningAttemptSubmitInput,
): ListeningAttemptAnalysis {
  const reference =
    MOCK_CONTENT_REFERENCE[
      input.contentId as
        keyof typeof MOCK_CONTENT_REFERENCE
    ];

  if (!reference) {
    throw new Error(
      `No mock listening reference exists for content ${input.contentId}.`,
    );
  }

  const wordAccuracy =
    calculateWordAccuracy(
      reference.transcript,
      input.transcript,
    );

  const sequenceAccuracy =
    calculateSequenceAccuracy(
      reference.transcript,
      input.transcript,
    );

  const spellingAccuracy =
    clampScore(
      wordAccuracy * 0.9 +
        sequenceAccuracy *
          0.1,
    );

  const overall =
    clampScore(
      wordAccuracy *
        0.55 +
        sequenceAccuracy *
          0.3 +
        spellingAccuracy *
          0.15,
    );

  const estimatedCefr =
    estimateCefr(
      overall,
    );

  const createdAt =
    new Date()
      .toISOString();

  const priorities =
    overall >=
    85
      ? [
          "روی connected speech و جزئیات کم‌استرس تمرکز کن.",
        ]
      : [
          "فایل را با سرعت ۰٫۷۵ دوباره گوش بده.",
          "بخش‌های دشوار را کوتاه‌کوتاه Dictation کن.",
        ];

  const payload = {
    attemptId,

    contentId:
      input.contentId,

    contentTitle:
      reference.title,

    practiceMode:
      input.practiceMode,

    status:
      "completed",

    engine:
      "mock",

    submittedTranscript:
      input.transcript,

    referenceTranscript:
      reference.transcript,

    score: {
      overall,

      wordAccuracy,

      sequenceAccuracy,

      spellingAccuracy,
    },

    comparison:
      buildComparison(
        reference.transcript,
        input.transcript,
      ),

    feedback: {
      summary:
        overall >=
        80
          ? "ایده اصلی و بخش زیادی از جزئیات را خوب شنیدی. تمرکز بعدی روی دقت واژه‌های کوتاه و connected speech باشد."
          : "ساختار کلی را دریافت کرده‌ای، اما هنوز بخشی از واژه‌ها و ترتیب آن‌ها در گفتار طبیعی از دست می‌رود.",

      strengths:
        overall >=
        75
          ? [
              "بخش قابل توجهی از واژه‌های اصلی درست ثبت شده است.",
              "ترتیب کلی جمله‌ها قابل دنبال‌کردن است.",
            ]
          : [
              "برای تکمیل تمرین تلاش پیوسته داشته‌ای.",
            ],

      priorities,
    },

    skillProfile: {
      mainIdea:
        clampScore(
          overall + 8,
        ),

      details:
        overall,

      numbersAndNames:
        clampScore(
          overall - 4,
        ),

      connectedSpeech:
        clampScore(
          overall - 7,
        ),

      vocabularyInContext:
        clampScore(
          overall + 2,
        ),

      inference:
        clampScore(
          overall + 4,
        ),
    },

    errorPatterns:
      overall <
      90
        ? [
            {
              id:
                "mock-connected-speech",

              category:
                "connected_speech",

              severity:
                overall <
                65
                  ? "high"
                  : "medium",

              title:
                "Connected speech",

              description:
                "بخشی از اختلاف‌ها زمانی رخ می‌دهد که واژه‌ها در گفتار طبیعی به هم متصل می‌شوند.",

              evidence: [
                "مقایسه Transcript کاربر با متن مرجع",
              ],

              recommendation:
                "بخش‌های کوتاه ۵ تا ۱۰ ثانیه‌ای را چند بار گوش بده و بعد همان Chunk را تکرار کن.",
            },
          ]
        : [],

    difficultSegments:
      [],

    missedWords:
      [],

    vocabularyDiscoveries:
      [],

    actionPlan: [
      {
        id:
          "mock-plan-listen-again",

        priority:
          1,

        title:
          "شنیدن دوباره هدفمند",

        description:
          "یک دور دیگر فایل را فقط برای بخش‌هایی که در Transcript اختلاف داشته‌اند گوش بده.",

        durationMinutes:
          5,

        practiceMode:
          "guided_dictation",
      },

      {
        id:
          "mock-plan-listen-only",

        priority:
          2,

        title:
          "یک دور بدون نوشتن",

        description:
          "فایل را یک بار بدون توقف برای ریتم، استرس و ایده اصلی گوش بده.",

        durationMinutes:
          4,

        practiceMode:
          "listen_only",
      },
    ],

    aiCoach: {
      headline:
        overall >=
        80
          ? "درک کلی خوب است؛ حالا باید شنیدن دقیق‌تر شود."
          : "مسیر اصلی رشد، شنیدن Chunkهای کوتاه و تکرار هدفمند است.",

      diagnosis:
        "این تحلیل در Mock Mode ساخته شده و فقط برای توسعه UI است. در Production همین ساختار باید توسط سرویس تحلیل Listening Backend پر شود.",

      nextFocus:
        "Connected speech و word boundaries",

      estimatedCefrLevel:
        estimatedCefr,

      confidencePercent:
        72,

      nextSessionGoal:
        "در تمرین بعدی دقت واژه‌ها را حداقل ۵ درصد افزایش بده.",

      encouragement:
        "تمرکز روی بخش‌های دشوار کوتاه، سریع‌تر از تکرار کامل فایل نتیجه می‌دهد.",
    },

    createdAt,

    completedAt:
      createdAt,
  };

  return listeningAttemptAnalysisSchema.parse(
    payload,
  );
}