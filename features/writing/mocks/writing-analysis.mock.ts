import type {
  WritingAnalysisIssue,
  WritingAnalysisMetric,
  WritingAnalysisResult,
  WritingCefrLevel,
  WritingIssueCategory,
  WritingMode,
  WritingVocabularyUpgrade,
} from "../types/writing.types";

type WritingAnalysisMockContext =
  Readonly<{
    mode?:
      WritingMode;

    prompt?:
      string;

    writingGoal?:
      string;
  }>;

const STOP_WORDS =
  new Set([
    "a",
    "an",
    "the",
    "and",
    "or",
    "but",
    "if",
    "to",
    "of",
    "in",
    "on",
    "at",
    "for",
    "from",
    "with",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "being",
    "i",
    "you",
    "he",
    "she",
    "it",
    "we",
    "they",
    "this",
    "that",
    "these",
    "those",
    "my",
    "your",
    "his",
    "her",
    "our",
    "their",
    "as",
    "so",
    "very",
  ]);

const VOCABULARY_UPGRADE_MAP:
  Readonly<
    Record<
      string,
      readonly string[]
    >
  > = {
    good: [
      "effective",
      "beneficial",
      "valuable",
    ],

    important: [
      "significant",
      "essential",
      "crucial",
    ],

    bad: [
      "harmful",
      "ineffective",
      "unfavorable",
    ],

    big: [
      "significant",
      "substantial",
      "considerable",
    ],

    small: [
      "minor",
      "limited",
      "modest",
    ],

    thing: [
      "factor",
      "aspect",
      "issue",
    ],

    get: [
      "obtain",
      "receive",
      "become",
    ],

    make: [
      "create",
      "produce",
      "develop",
    ],

    nice: [
      "pleasant",
      "appealing",
      "enjoyable",
    ],

    interesting: [
      "engaging",
      "compelling",
      "thought-provoking",
    ],
  };

function clampScore(
  value:
    number,
): number {
  return Math.round(
    Math.min(
      98,
      Math.max(
        35,
        value,
      ),
    ),
  );
}

function getWords(
  content:
    string,
): string[] {
  return (
    content
      .toLowerCase()
      .match(
        /[\p{L}\p{N}'’-]+/gu,
      ) ??
    []
  );
}

function getSentences(
  content:
    string,
): string[] {
  return content
    .split(
      /[.!?]+(?:\s+|$)/u,
    )
    .map(
      (
        sentence,
      ) =>
        sentence.trim(),
    )
    .filter(
      Boolean,
    );
}

function getParagraphs(
  content:
    string,
): string[] {
  return content
    .split(
      /\n\s*\n/u,
    )
    .map(
      (
        paragraph,
      ) =>
        paragraph.trim(),
    )
    .filter(
      Boolean,
    );
}

function normalizeWriting(
  content:
    string,
): string {
  return content
    .replace(
      /[ \t]+/gu,
      " ",
    )
    .replace(
      /\s+([,.!?;:])/gu,
      "$1",
    )
    .replace(
      /\n{3,}/gu,
      "\n\n",
    )
    .trim();
}

function getRepeatedWords(
  words:
    readonly string[],
): string[] {
  const frequencies =
    new Map<
      string,
      number
    >();

  words.forEach(
    (
      word,
    ) => {
      if (
        word.length <
          4 ||
        STOP_WORDS.has(
          word,
        )
      ) {
        return;
      }

      frequencies.set(
        word,
        (
          frequencies.get(
            word,
          ) ??
          0
        ) +
          1,
      );
    },
  );

  return [
    ...frequencies.entries(),
  ]
    .filter(
      ([
        ,
        count,
      ]) =>
        count >=
        3,
    )
    .sort(
      (
        first,
        second,
      ) =>
        second[1] -
        first[1],
    )
    .slice(
      0,
      6,
    )
    .map(
      ([
        word,
      ]) =>
        word,
    );
}

function createMetric(
  label:
    string,
  score:
    number,
  detail:
    string,
): WritingAnalysisMetric {
  return {
    label,

    score:
      clampScore(
        score,
      ),

    detail,
  };
}

function estimateCefrLevel(
  score:
    number,
): WritingCefrLevel {
  if (
    score >=
    92
  ) {
    return "C1";
  }

  if (
    score >=
    82
  ) {
    return "B2";
  }

  if (
    score >=
    68
  ) {
    return "B1";
  }

  if (
    score >=
    52
  ) {
    return "A2";
  }

  return "A1";
}

function getVocabularyUpgrades(
  words:
    readonly string[],
): WritingVocabularyUpgrade[] {
  const uniqueWords =
    Array.from(
      new Set(
        words,
      ),
    );

  return uniqueWords
    .filter(
      (
        word,
      ) =>
        Boolean(
          VOCABULARY_UPGRADE_MAP[
            word
          ],
        ),
    )
    .slice(
      0,
      5,
    )
    .map(
      (
        word,
      ) => ({
        original:
          word,

        alternatives: [
          ...VOCABULARY_UPGRADE_MAP[
            word
          ],
        ],

        reason:
          "برای افزایش دقت واژگانی، جایگزین را براساس Context و لحن متن انتخاب کن.",

        example:
          null,
      }),
    );
}

export function createWritingAnalysisMock(
  content:
    string,
  context:
    WritingAnalysisMockContext =
      {},
): WritingAnalysisResult {
  const normalizedContent =
    normalizeWriting(
      content,
    );

  const words =
    getWords(
      normalizedContent,
    );

  const sentences =
    getSentences(
      normalizedContent,
    );

  const paragraphs =
    getParagraphs(
      normalizedContent,
    );

  const wordCount =
    words.length;

  const sentenceCount =
    sentences.length;

  const paragraphCount =
    paragraphs.length;

  const uniqueWords =
    new Set(
      words,
    );

  const uniqueWordRatio =
    wordCount >
    0
      ? (
          uniqueWords.size /
          wordCount
        ) *
        100
      : 0;

  const contentWords =
    words.filter(
      (
        word,
      ) =>
        !STOP_WORDS.has(
          word,
        ),
    );

  const lexicalDensity =
    wordCount >
    0
      ? (
          contentWords.length /
          wordCount
        ) *
        100
      : 0;

  const averageSentenceLength =
    sentenceCount >
    0
      ? wordCount /
        sentenceCount
      : wordCount;

  const repeatedWords =
    getRepeatedWords(
      words,
    );

  const vocabularyUpgrades =
    getVocabularyUpgrades(
      words,
    );

  const hasParagraphStructure =
    paragraphCount >
    1;

  const hasSentencePunctuation =
    sentenceCount >
      1 ||
    wordCount <=
      20;

  const sentenceLengthHealthy =
    averageSentenceLength >=
      7 &&
    averageSentenceLength <=
      24;

  const grammarScore =
    clampScore(
      78 +
        Math.min(
          8,
          sentenceCount,
        ) -
        (
          hasSentencePunctuation
            ? 0
            : 8
        ),
    );

  const vocabularyScore =
    clampScore(
      64 +
        uniqueWordRatio *
          0.28 +
        lexicalDensity *
          0.1 -
        repeatedWords.length *
          2,
    );

  const coherenceScore =
    clampScore(
      72 +
        (
          hasParagraphStructure
            ? 9
            : 2
        ) +
        Math.min(
          7,
          sentenceCount,
        ),
    );

  const clarityScore =
    clampScore(
      sentenceLengthHealthy
        ? 86
        : averageSentenceLength >
            30
          ? 68
          : 78,
    );

  const toneScore =
    clampScore(
      context.mode ===
      "exercise"
        ? 82
        : 85,
    );

  const taskResponseScore =
    clampScore(
      wordCount <
      15
        ? 58
        : wordCount <
            40
          ? 72
          : 86,
    );

  const organizationScore =
    clampScore(
      wordCount >
        100 &&
      !hasParagraphStructure
        ? 67
        : hasParagraphStructure
          ? 88
          : 80,
    );

  const styleScore =
    clampScore(
      76 +
        (
          uniqueWordRatio >
          65
            ? 8
            : 3
        ) -
        repeatedWords.length,
    );

  const scores = [
    grammarScore,
    vocabularyScore,
    coherenceScore,
    clarityScore,
    toneScore,
    taskResponseScore,
    organizationScore,
    styleScore,
  ];

  const overallScore =
    clampScore(
      scores.reduce(
        (
          sum,
          score,
        ) =>
          sum +
          score,
        0,
      ) /
        scores.length,
    );

  const grammar =
    createMetric(
      "دستور زبان",
      grammarScore,
      "ساختار جمله، نشانه‌گذاری و الگوی کلی جمله‌ها بررسی شده است.",
    );

  const vocabulary =
    createMetric(
      "واژگان",
      vocabularyScore,
      repeatedWords.length >
      0
        ? "دامنه واژگان مناسب است اما چند الگوی تکرار واژه دیده می‌شود."
        : "تنوع واژگانی متن مناسب است و تکرار برجسته‌ای تشخیص داده نشد.",
    );

  const coherence =
    createMetric(
      "انسجام",
      coherenceScore,
      hasParagraphStructure
        ? "متن از چند بخش مشخص تشکیل شده و جریان کلی ایده‌ها قابل دنبال کردن است."
        : "جریان کلی متن قابل فهم است؛ در نوشته‌های طولانی‌تر پاراگراف‌بندی می‌تواند ارتباط ایده‌ها را روشن‌تر کند.",
    );

  const clarity =
    createMetric(
      "وضوح",
      clarityScore,
      sentenceLengthHealthy
        ? "طول متوسط جمله‌ها برای خوانایی مناسب است."
        : "برخی جمله‌ها می‌توانند کوتاه‌تر یا کامل‌تر شوند تا پیام سریع‌تر منتقل شود.",
    );

  const tone =
    createMetric(
      "لحن",
      toneScore,
      "لحن کلی متن پایدار است؛ تحلیل دقیق تناسب لحن با مخاطب بعداً توسط مدل AI انجام می‌شود.",
    );

  const taskResponse =
    createMetric(
      "پاسخ به موضوع",
      taskResponseScore,
      wordCount <
      15
        ? "متن بسیار کوتاه است و شواهد کافی برای ارزیابی کامل پاسخ به موضوع وجود ندارد."
        : "متن یک پاسخ قابل ارزیابی ارائه می‌دهد؛ پوشش دقیق Prompt توسط AI Backend تکمیل خواهد شد.",
    );

  const organization =
    createMetric(
      "سازمان‌دهی",
      organizationScore,
      hasParagraphStructure
        ? "تقسیم متن به پاراگراف‌ها به خوانایی و ساختار کمک کرده است."
        : "برای متن کوتاه ساختار فعلی قابل قبول است؛ نوشته‌های طولانی از پاراگراف‌بندی بیشتر سود می‌برند.",
    );

  const style =
    createMetric(
      "سبک نوشتار",
      styleScore,
      "تنوع واژگان، طول جمله‌ها و تکرارهای قابل مشاهده برای ارزیابی سبک بررسی شده‌اند.",
    );

  /**
   * این Array هنگام ساخت Analysis تغییر می‌کند،
   * بنابراین باید mutable باشد.
   *
   * WritingAnalysisResult در خروجی readonly است،
   * اما local builder نباید readonly باشد.
   */
  const issues:
    WritingAnalysisIssue[] =
    [];

  if (
    repeatedWords.length >
    0
  ) {
    const repeated =
      repeatedWords[0];

    issues.push({
      id:
        "writing-issue-repetition",

      title:
        "تکرار واژگان",

      description:
        `واژه «${repeated}» چند بار در متن تکرار شده است.`,

      severity:
        "متوسط",

      suggestion:
        "در بخش‌هایی که معنی اجازه می‌دهد از مترادف، ضمیر یا بازسازی جمله استفاده کن.",

      category:
        "vocabulary",

      originalText:
        repeated,

      correctedText:
        null,

      explanation:
        "تکرار بیش از حد واژه‌های محتوایی می‌تواند دامنه واژگانی متن را محدود نشان دهد.",
    });
  }

  if (
    averageSentenceLength >
    28
  ) {
    issues.push({
      id:
        "writing-issue-long-sentences",

      title:
        "جمله‌های نسبتاً طولانی",

      description:
        "میانگین طول جمله‌ها بالاست و ممکن است بعضی ایده‌ها دیرتر منتقل شوند.",

      severity:
        "متوسط",

      suggestion:
        "در محل تغییر ایده اصلی، جمله را به دو جمله مستقل تقسیم کن.",

      category:
        "clarity",

      originalText:
        null,

      correctedText:
        null,

      explanation:
        "تنوع طول جمله خوب است، اما جمله‌های بسیار طولانی می‌توانند خوانایی را کاهش دهند.",
    });
  }

  if (
    wordCount >
      100 &&
    paragraphCount <=
      1
  ) {
    issues.push({
      id:
        "writing-issue-paragraphs",

      title:
        "پاراگراف‌بندی محدود",

      description:
        "متن نسبتاً طولانی است اما تقریباً تمام ایده‌ها در یک پاراگراف قرار گرفته‌اند.",

      severity:
        "متوسط",

      suggestion:
        "هر ایده اصلی را در یک پاراگراف مستقل قرار بده و برای انتقال بین آن‌ها از جمله رابط استفاده کن.",

      category:
        "organization",

      originalText:
        null,

      correctedText:
        null,

      explanation:
        "تقسیم منطقی متن به پاراگراف‌ها ساختار استدلال یا روایت را قابل‌مشاهده‌تر می‌کند.",
    });
  }

  if (
    !hasSentencePunctuation
  ) {
    issues.push({
      id:
        "writing-issue-punctuation",

      title:
        "نشانه‌گذاری جمله‌ها",

      description:
        "متن چندین کلمه دارد اما مرز جمله‌ها به‌وضوح قابل تشخیص نیست.",

      severity:
        "زیاد",

      suggestion:
        "پایان ایده‌های مستقل را با نقطه، علامت سؤال یا نشانه مناسب مشخص کن.",

      category:
        "punctuation",

      originalText:
        null,

      correctedText:
        null,

      explanation:
        "نشانه‌گذاری مناسب هم خوانایی و هم تحلیل ساختار جمله را بهتر می‌کند.",
    });
  }

  const metrics = [
    {
      key:
        "grammar",

      metric:
        grammar,
    },

    {
      key:
        "vocabulary",

      metric:
        vocabulary,
    },

    {
      key:
        "coherence",

      metric:
        coherence,
    },

    {
      key:
        "clarity",

      metric:
        clarity,
    },

    {
      key:
        "tone",

      metric:
        tone,
    },

    {
      key:
        "task_response",

      metric:
        taskResponse,
    },

    {
      key:
        "organization",

      metric:
        organization,
    },

    {
      key:
        "style",

      metric:
        style,
    },
  ] satisfies readonly {
    key:
      WritingIssueCategory;

    metric:
      WritingAnalysisMetric;
  }[];

  const sortedMetrics =
    [...metrics].sort(
      (
        first,
        second,
      ) =>
        second.metric.score -
        first.metric.score,
    );

  const strengths =
    sortedMetrics
      .slice(
        0,
        2,
      )
      .map(
        (
          item,
          index,
        ) => ({
          id:
            `strength-${index + 1}`,

          title:
            `نقطه قوت: ${item.metric.label}`,

          description:
            item.metric.detail,

          evidence:
            `امتیاز ${item.metric.score} از ۱۰۰`,
        }),
      );

  const priorities =
    [...sortedMetrics]
      .reverse()
      .slice(
        0,
        2,
      )
      .map(
        (
          item,
          index,
        ) => ({
          id:
            `priority-${index + 1}`,

          title:
            `اولویت: ${item.metric.label}`,

          description:
            `برای نوشته بعدی روی ${item.metric.label} تمرکز بیشتری داشته باش.`,

          evidence:
            `امتیاز فعلی ${item.metric.score} از ۱۰۰`,
        }),
      );

  const errorPatterns =
    issues.map(
      (
        issue,
      ) => ({
        id:
          `pattern-${issue.id}`,

        category:
          issue.category ??
          "clarity",

        title:
          issue.title,

        occurrenceCount:
          1,

        explanation:
          issue.explanation ??
          issue.description,

        recommendation:
          issue.suggestion,
      }),
    );

  const paragraphFeedback =
    paragraphs.map(
      (
        paragraph,
        index,
      ) => {
        const isSingle =
          paragraphs.length ===
          1;

        const isFirst =
          index ===
          0;

        const isLast =
          index ===
          paragraphs.length -
          1;

        const role =
          isSingle
            ? "single" as const
            : isFirst
              ? "introduction" as const
              : isLast
                ? "conclusion" as const
                : "body" as const;

        const paragraphWords =
          getWords(
            paragraph,
          ).length;

        return {
          paragraphIndex:
            index +
            1,

          role,

          score:
            clampScore(
              paragraphWords >
              15
                ? 84
                : 74,
            ),

          summary:
            paragraphWords >
            15
              ? "این پاراگراف برای انتقال یک ایده اصلی حجم مناسبی دارد."
              : "این پاراگراف کوتاه است و می‌تواند با توضیح یا مثال بیشتری توسعه پیدا کند.",

          suggestion:
            role ===
            "introduction"
              ? "هدف یا جهت اصلی متن را در پایان مقدمه روشن‌تر کن."
              : role ===
                "conclusion"
                ? "در جمع‌بندی، نتیجه اصلی را بدون تکرار کامل متن برجسته کن."
                : "مطمئن شو هر پاراگراف فقط یک ایده مرکزی دارد.",
        };
      },
    );

  const normalizedChanged =
    normalizedContent !==
    content.trim();

  const rewriteChanges =
    normalizedChanged
      ? [
          {
            id:
              "rewrite-formatting",

            before:
              content.trim(),

            after:
              normalizedContent,

            reason:
              "فاصله‌ها و نشانه‌گذاری پایه برای خوانایی بهتر Normalize شده‌اند.",

            category:
              "style" as const,
          },
        ]
      : [];

  const lowestMetrics =
    [...metrics]
      .sort(
        (
          first,
          second,
        ) =>
          first.metric.score -
          second.metric.score,
      )
      .slice(
        0,
        3,
      );

  const actionPlan =
    lowestMetrics.map(
      (
        item,
        index,
      ) => ({
        id:
          `writing-action-${index + 1}`,

        priority:
          index +
          1,

        title:
          `تمرین ${item.metric.label}`,

        description:
          `در نوشته بعدی یک بار فقط برای بررسی ${item.metric.label} متن را بازخوانی و اصلاح کن.`,

        focus:
          item.key,

        estimatedMinutes:
          5 +
          index *
            2,
      }),
    );

  const estimatedCefrLevel =
    estimateCefrLevel(
      overallScore,
    );

  const confidencePercent =
    clampScore(
      55 +
        Math.min(
          30,
          wordCount /
            5,
        ),
    );

  const betterVocabulary =
    vocabularyUpgrades
      .flatMap(
        (
          upgrade,
        ) =>
          upgrade.alternatives,
      )
      .slice(
        0,
        8,
      );

  const nextPractice =
    lowestMetrics[0]
      ? `در نوشته بعدی روی ${lowestMetrics[0].metric.label} تمرکز کن و بعد از پایان، متن را فقط از همین زاویه بازخوانی کن.`
      : "یک متن جدید بنویس و ساختار، واژگان و وضوح آن را دوباره ارزیابی کن.";

  return {
    overallScore,

    grammar,

    vocabulary,

    coherence,

    clarity,

    tone,

    taskResponse,

    organization,

    style,

    engine:
      "mock",

    estimatedCefrLevel,

    confidencePercent,

    highlightedMistakes:
      issues
        .map(
          (
            issue,
          ) =>
            issue.originalText,
        )
        .filter(
          (
            value,
          ): value is string =>
            Boolean(
              value,
            ),
        ),

    issues,

    repeatedWords,

    betterVocabulary,

    rewrittenVersion:
      normalizedContent,

    nextPractice,

    documentStats: {
      wordCount,

      characterCount:
        normalizedContent.length,

      sentenceCount,

      paragraphCount,

      averageSentenceLength:
        Math.round(
          averageSentenceLength *
            10,
        ) /
        10,

      uniqueWordRatio:
        Math.round(
          uniqueWordRatio,
        ),

      lexicalDensity:
        Math.round(
          lexicalDensity,
        ),
    },

    strengths,

    priorities,

    errorPatterns,

    taskAchievement: {
      score:
        taskResponse.score,

      summary:
        context.prompt
          ? "متن نسبت به Prompt تمرین ارزیابی اولیه شده است. بررسی معنایی دقیق Prompt در نسخه AI Backend انجام خواهد شد."
          : "در حالت Free Writing، تمرکز اصلی روی وضوح هدف، توسعه ایده و کیفیت کلی نوشته است.",

      coveredPoints: [
        wordCount >
        0
          ? "یک پاسخ قابل تحلیل ثبت شده است."
          : "متن ثبت نشده است.",

        sentenceCount >
        1
          ? "متن بیش از یک جمله دارد و امکان بررسی جریان ایده فراهم است."
          : "متن فعلاً بسیار کوتاه است.",
      ],

      missingPoints:
        wordCount <
        20
          ? [
              "برای تحلیل عمیق‌تر، ایده را با جزئیات بیشتری توسعه بده.",
            ]
          : [],
    },

    paragraphFeedback,

    vocabularyUpgrades,

    rewriteChanges,

    actionPlan,

    aiCoach: {
      headline:
        priorities[0]?.title ??
        "ساختار کلی نوشته قابل ارزیابی است.",

      diagnosis:
        issues.length >
        0
          ? `در تحلیل اولیه ${issues.length} الگوی قابل بهبود شناسایی شد. این خروجی فعلاً Mock/Heuristic است و بعداً با مدل AI جایگزین خواهد شد.`
          : "در بررسی اولیه الگوی ساختاری برجسته‌ای پیدا نشد. تحلیل معنایی و گرامری عمیق‌تر بعداً توسط AI Backend انجام می‌شود.",

      nextFocus:
        lowestMetrics[0]
          ?.metric
          .label ??
        "وضوح و تنوع ساختار",

      estimatedCefrLevel,

      confidencePercent,

      nextSessionGoal:
        lowestMetrics[0]
          ? `امتیاز ${lowestMetrics[0].metric.label} را در نوشته بعدی به بالای ۸۰ برسان.`
          : "یک نوشته جدید با موضوع متفاوت تکمیل کن.",

      encouragement:
        "بهترین استفاده از این گزارش این است که هر بار فقط یک یا دو الگوی مشخص را در نوشته بعدی اصلاح کنی.",
    },
  };
}

export const writingAnalysisMock =
  [
    {
      id:
        "writing-1",

      ...createWritingAnalysisMock(
        "Yesterday I went to school and had a good experience. The experience was interesting because I met new people. It was important for me because I learned something new.",
        {
          mode:
            "exercise",

          writingGoal:
            "روایت یک تجربه با ساختار واضح",
        },
      ),
    },
  ] as const;