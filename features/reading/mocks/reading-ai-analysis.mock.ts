import type {
  ReadingResourceAiAnalysis,
} from "../types/reading-ai-analysis.types";

export const readingAiAnalysisMock = [
  {
    resourceId:
      "sherlock-holmes-blue-carbuncle",

    status: "ready",

    modelVersion:
      "reading-analyzer-v1",

    analyzedAt:
      "2026-08-08T11:20:00.000Z",

    summary:
      "این داستان برای زبان‌آموز سطح B1 مناسب است و بخش مهمی از دشواری آن از واژگان توصیفی، روایت گذشته و استنتاج از جزئیات متن ایجاد می‌شود. ساختار جمله‌ها عمدتاً متوسط است اما برخی جمله‌های روایی طولانی نیازمند توجه بیشتری هستند.",

    detectedLanguageCode: "en",

    detectedCefrLevel: "B1",

    cefrConfidence: 94,

    difficulty: {
      overall: 58,
      vocabulary: 62,
      grammar: 54,
      sentenceComplexity: 61,
      inference: 72,
      cohesion: 49,
    },

    quality: {
      extractionConfidence: 100,
      languageConfidence: 99,
      structureConfidence: 96,
      educationalValue: 91,
    },

    vocabularyProfile: {
      academicWordPercent: 4.1,
      uncommonWordPercent: 12.8,
      estimatedUniqueWords: 734,
      estimatedCoreWords: 59,
    },

    estimatedReadingMinutes: 55,

    suggestedSectionCount: 4,

    topics: [
      "Detective Fiction",
      "Deduction",
      "Character Description",
      "Past Narrative",
    ],

    learningObjectives: [
      "درک جزئیات و سرنخ‌های داخل متن",
      "تمرین Past Simple و ساختارهای روایی",
      "تقویت واژگان توصیف شخصیت و اشیا",
      "تمرین Inference از اطلاعات غیرمستقیم",
    ],

    keyVocabulary: [
      "deduce",
      "remarkable",
      "owner",
      "condition",
      "evidence",
      "investigation",
    ],

    insights: [
      {
        id:
          "sherlock-ai-insight-1",

        type: "strength",

        priority: "medium",

        title:
          "منبع مناسب برای تمرین Inference",

        description:
          "متن اطلاعات زیادی را به‌صورت مستقیم بیان نمی‌کند و خواننده باید از جزئیات به نتیجه برسد.",

        evidence:
          "بخش استنتاج هولمز از روی کلاه نمونه واضحی از inference-based reading است.",
      },

      {
        id:
          "sherlock-ai-insight-2",

        type: "challenge",

        priority: "high",

        title:
          "واژگان توصیفی نسبتاً سنگین",

        description:
          "تعداد واژه‌های کم‌کاربرد برای سطح B1 بالاتر از یک متن روزمره است.",

        evidence:
          "واژگان مرتبط با ظاهر، وضعیت اشیا و استنتاج بیشترین بار واژگانی را ایجاد می‌کنند.",
      },

      {
        id:
          "sherlock-ai-insight-3",

        type: "recommendation",

        priority: "high",

        title:
          "مطالعه Section به Section",

        description:
          "بهتر است قبل از رفتن به Section بعدی، واژگان Core و سؤال‌های درک مطلب همان بخش مرور شوند.",

        evidence: null,
      },
    ],
  },

  {
    resourceId:
      "everyday-english-cafe",

    status: "ready",

    modelVersion:
      "reading-analyzer-v1",

    analyzedAt:
      "2026-08-08T11:22:00.000Z",

    summary:
      "این منبع A2 برای Reading کاربردی طراحی شده و بیشتر بر عبارت‌های روزمره، درخواست مؤدبانه و واژگان مربوط به کافه تمرکز دارد. جمله‌ها کوتاه و ساختار متن مستقیم است.",

    detectedLanguageCode: "en",

    detectedCefrLevel: "A2",

    cefrConfidence: 97,

    difficulty: {
      overall: 32,
      vocabulary: 36,
      grammar: 29,
      sentenceComplexity: 24,
      inference: 21,
      cohesion: 31,
    },

    quality: {
      extractionConfidence: 100,
      languageConfidence: 100,
      structureConfidence: 98,
      educationalValue: 93,
    },

    vocabularyProfile: {
      academicWordPercent: 0.8,
      uncommonWordPercent: 5.4,
      estimatedUniqueWords: 301,
      estimatedCoreWords: 30,
    },

    estimatedReadingMinutes: 28,

    suggestedSectionCount: 3,

    topics: [
      "Café",
      "Food",
      "Polite Requests",
      "Daily English",
    ],

    learningObjectives: [
      "سفارش نوشیدنی و غذا",
      "درک سؤال‌های رایج کارکنان کافه",
      "تمرین I'd like و Could I have",
    ],

    keyVocabulary: [
      "barista",
      "menu",
      "pastry",
      "counter",
      "for here",
      "to go",
    ],

    insights: [
      {
        id:
          "cafe-ai-insight-1",

        type: "strength",

        priority: "medium",

        title:
          "کاربرد مستقیم در مکالمه روزمره",

        description:
          "بخش زیادی از عبارات متن مستقیماً در موقعیت واقعی قابل استفاده هستند.",

        evidence: null,
      },

      {
        id:
          "cafe-ai-insight-2",

        type: "recommendation",

        priority: "medium",

        title:
          "عبارت‌ها را به شکل Chunk یاد بگیر",

        description:
          "عبارت‌هایی مانند Would you like anything else? بهتر است به شکل یک واحد زبانی تمرین شوند.",

        evidence: null,
      },
    ],
  },

  {
    resourceId:
      "science-of-habits",

    status: "ready",

    modelVersion:
      "reading-analyzer-v1",

    analyzedAt:
      "2026-08-08T11:25:00.000Z",

    summary:
      "این مقاله در محدوده B2 قرار می‌گیرد. واژگان نیمه‌آکادمیک، اسم‌های انتزاعی و رابطه علت و معلولی میان جمله‌ها مهم‌ترین عوامل دشواری متن هستند.",

    detectedLanguageCode: "en",

    detectedCefrLevel: "B2",

    cefrConfidence: 92,

    difficulty: {
      overall: 69,
      vocabulary: 73,
      grammar: 63,
      sentenceComplexity: 68,
      inference: 65,
      cohesion: 71,
    },

    quality: {
      extractionConfidence: 100,
      languageConfidence: 99,
      structureConfidence: 95,
      educationalValue: 96,
    },

    vocabularyProfile: {
      academicWordPercent: 14.2,
      uncommonWordPercent: 16.8,
      estimatedUniqueWords: 491,
      estimatedCoreWords: 42,
    },

    estimatedReadingMinutes: 24,

    suggestedSectionCount: 3,

    topics: [
      "Habit Formation",
      "Psychology",
      "Behavior",
      "Self Improvement",
    ],

    learningObjectives: [
      "درک Cause and Effect",
      "تقویت Academic Vocabulary",
      "تشخیص Main Idea و Supporting Detail",
      "درک Linking Words",
    ],

    keyVocabulary: [
      "behavior",
      "repetition",
      "cue",
      "routine",
      "reward",
      "association",
      "consistent",
    ],

    insights: [
      {
        id:
          "habits-ai-insight-1",

        type: "challenge",

        priority: "high",

        title:
          "تراکم بالاتر واژگان آکادمیک",

        description:
          "در مقایسه با منابع روزمره، نسبت واژگان انتزاعی و علمی بیشتر است.",

        evidence:
          "behavior, association, repetition و consistent از واژگان محوری متن هستند.",
      },

      {
        id:
          "habits-ai-insight-2",

        type: "strength",

        priority: "high",

        title:
          "ساختار منطقی و آموزشی قوی",

        description:
          "متن ایده‌ها را به شکل مرحله‌ای توضیح می‌دهد و برای تمرین Reading دانشگاهی مناسب است.",

        evidence: null,
      },

      {
        id:
          "habits-ai-insight-3",

        type: "recommendation",

        priority: "medium",

        title:
          "روی Linking Words تمرکز کن",

        description:
          "شناخت روابط علت، نتیجه و زمان باعث افزایش سرعت درک متن می‌شود.",

        evidence: null,
      },
    ],
  },

  {
    resourceId:
      "uploaded-reading-demo",

    status: "ready",

    modelVersion:
      "reading-analyzer-v1",

    analyzedAt:
      "2026-08-08T11:30:00.000Z",

    summary:
      "فایل آپلودشده عمدتاً شامل متن انگلیسی سطح B1 است. کیفیت استخراج متن مناسب ارزیابی شده، اما چند بخش از ساختار فایل احتمالاً به دلیل Layout سند نیازمند بازبینی است. AI پیشنهاد می‌کند محتوا در پنج Section کوتاه تقسیم شود.",

    detectedLanguageCode: "en",

    detectedCefrLevel: "B1",

    cefrConfidence: 88,

    difficulty: {
      overall: 56,
      vocabulary: 61,
      grammar: 52,
      sentenceComplexity: 58,
      inference: 48,
      cohesion: 55,
    },

    quality: {
      extractionConfidence: 91,
      languageConfidence: 98,
      structureConfidence: 82,
      educationalValue: 87,
    },

    vocabularyProfile: {
      academicWordPercent: 8.7,
      uncommonWordPercent: 11.4,
      estimatedUniqueWords: 892,
      estimatedCoreWords: 74,
    },

    estimatedReadingMinutes: 35,

    suggestedSectionCount: 5,

    topics: [
      "Uploaded Content",
      "General English",
      "Vocabulary Development",
    ],

    learningObjectives: [
      "گسترش واژگان متن",
      "تحلیل Grammar در Context",
      "تمرین Main Idea",
      "تمرین Reading Comprehension",
    ],

    keyVocabulary: [
      "context",
      "specific",
      "approach",
      "result",
      "process",
      "develop",
    ],

    insights: [
      {
        id:
          "uploaded-ai-insight-1",

        type: "warning",

        priority: "medium",

        title:
          "اطمینان ساختاری کمتر از متن ساده",

        description:
          "برخی Layoutهای PDF ممکن است ترتیب استخراج پاراگراف‌ها را تحت تأثیر قرار دهند.",

        evidence:
          "Structure confidence برابر 82٪ تشخیص داده شده است.",
      },

      {
        id:
          "uploaded-ai-insight-2",

        type: "recommendation",

        priority: "high",

        title:
          "تقسیم متن به پنج بخش",

        description:
          "این تقسیم‌بندی حجم هر Session را متعادل نگه می‌دارد و مرور واژگان را ساده‌تر می‌کند.",

        evidence: null,
      },

      {
        id:
          "uploaded-ai-insight-3",

        type: "strength",

        priority: "medium",

        title:
          "کیفیت استخراج قابل قبول",

        description:
          "متن برای تحلیل آموزشی و تولید سؤال به اندازه کافی خوانا تشخیص داده شده است.",

        evidence: null,
      },
    ],
  },
] satisfies readonly ReadingResourceAiAnalysis[];

export function findReadingAiAnalysisMock(
  resourceId: string,
): ReadingResourceAiAnalysis | null {
  const normalizedResourceId =
    resourceId.trim();

  if (!normalizedResourceId) {
    return null;
  }

  return (
    readingAiAnalysisMock.find(
      (analysis) =>
        analysis.resourceId ===
        normalizedResourceId,
    ) ?? null
  );
}