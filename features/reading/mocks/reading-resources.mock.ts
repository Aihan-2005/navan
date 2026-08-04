import type {
  ReadingResourceDetail,
} from "../types/reading.types";

export const readingResourcesMock = [
  {
    id: "sherlock-holmes-blue-carbuncle",

    title:
      "The Adventure of the Blue Carbuncle",

    author:
      "Arthur Conan Doyle",

    description:
      "داستان کلاسیک شرلوک هولمز، بخش‌بندی‌شده برای آموزش روایت گذشته، واژگان توصیفی و درک جزئیات.",

    resourceType: "short_story",
    sourceType: "platform",
    status: "ready",

    languageCode: "en",
    cefrLevel: "B1",

    coverImageUrl: null,

    estimatedMinutes: 55,
    totalSections: 4,
    completedSections: 1,
    progressPercent: 25,

    topics: [
      "داستان کارآگاهی",
      "روایت گذشته",
      "توصیف اشخاص",
    ],

    learningFocuses: [
      "Past Simple",
      "Context Clues",
      "Descriptive Vocabulary",
    ],

    isFeatured: true,

    processingStatus: "ready",
    processingProgress: 100,

    originalFilename: null,
    sourceFileKind: null,
    mimeType: null,
    sizeBytes: null,

    totalWords: 1_860,

    sections: [
      {
        id: "blue-carbuncle-section-1",
        order: 1,

        title:
          "بخش اول: یک کلاه قدیمی",

        summary:
          "واتسون در روز کریسمس به دیدن هولمز می‌رود و با یک کلاه کهنه و یک غاز روبه‌رو می‌شود.",

        wordCount: 420,
        estimatedMinutes: 12,

        status: "completed",
        audioStatus: "ready",

        vocabularyCount: 12,
        grammarPointCount: 3,
      },

      {
        id: "blue-carbuncle-section-2",
        order: 2,

        title:
          "بخش دوم: صاحب ناشناس",

        summary:
          "هولمز با مشاهده کلاه، اطلاعات زیادی درباره صاحب آن نتیجه‌گیری می‌کند.",

        wordCount: 455,
        estimatedMinutes: 13,

        status: "available",
        audioStatus: "ready",

        vocabularyCount: 14,
        grammarPointCount: 4,
      },

      {
        id: "blue-carbuncle-section-3",
        order: 3,

        title:
          "بخش سوم: سنگ آبی",

        summary:
          "یک سنگ قیمتی گمشده در مکان غیرمنتظره‌ای پیدا می‌شود.",

        wordCount: 480,
        estimatedMinutes: 14,

        status: "locked",
        audioStatus: "ready",

        vocabularyCount: 16,
        grammarPointCount: 3,
      },

      {
        id: "blue-carbuncle-section-4",
        order: 4,

        title:
          "بخش چهارم: حل معما",

        summary:
          "هولمز سرنخ‌ها را کنار هم می‌گذارد و حقیقت پرونده را آشکار می‌کند.",

        wordCount: 505,
        estimatedMinutes: 16,

        status: "locked",
        audioStatus: "ready",

        vocabularyCount: 17,
        grammarPointCount: 5,
      },
    ],

    processingWarnings: [],

    createdAt:
      "2026-07-20T09:00:00.000Z",

    updatedAt:
      "2026-08-01T18:20:00.000Z",
  },

  {
    id: "everyday-english-cafe",

    title:
      "Everyday English: At the Café",

    author:
      "MeowLingo Original",

    description:
      "یک درس کاربردی درباره سفارش غذا، درخواست مؤدبانه و اصطلاحات رایج در کافه.",

    resourceType: "lesson",
    sourceType: "platform",
    status: "ready",

    languageCode: "en",
    cefrLevel: "A2",

    coverImageUrl: null,

    estimatedMinutes: 28,
    totalSections: 3,
    completedSections: 0,
    progressPercent: 0,

    topics: [
      "کافه",
      "سفارش غذا",
      "مکالمه روزمره",
    ],

    learningFocuses: [
      "Polite Requests",
      "Food Vocabulary",
      "Useful Expressions",
    ],

    isFeatured: true,

    processingStatus: "ready",
    processingProgress: 100,

    originalFilename: null,
    sourceFileKind: null,
    mimeType: null,
    sizeBytes: null,

    totalWords: 780,

    sections: [
      {
        id: "cafe-section-1",
        order: 1,

        title:
          "بخش اول: ورود و سفارش",

        summary:
          "عبارت‌های ضروری برای سلام‌کردن و سفارش نوشیدنی.",

        wordCount: 240,
        estimatedMinutes: 8,

        status: "available",
        audioStatus: "ready",

        vocabularyCount: 9,
        grammarPointCount: 2,
      },

      {
        id: "cafe-section-2",
        order: 2,

        title:
          "بخش دوم: سؤال درباره منو",

        summary:
          "روش سؤال‌کردن درباره مواد غذایی و پیشنهادهای منو.",

        wordCount: 260,
        estimatedMinutes: 9,

        status: "locked",
        audioStatus: "ready",

        vocabularyCount: 11,
        grammarPointCount: 3,
      },

      {
        id: "cafe-section-3",
        order: 3,

        title:
          "بخش سوم: پرداخت",

        summary:
          "عبارت‌های مربوط به درخواست صورت‌حساب و پرداخت.",

        wordCount: 280,
        estimatedMinutes: 11,

        status: "locked",
        audioStatus: "ready",

        vocabularyCount: 10,
        grammarPointCount: 2,
      },
    ],

    processingWarnings: [],

    createdAt:
      "2026-07-22T10:00:00.000Z",

    updatedAt:
      "2026-07-22T10:00:00.000Z",
  },

  {
    id: "science-of-habits",

    title:
      "The Science of Small Habits",

    author:
      "MeowLingo Original",

    description:
      "مقاله‌ای سطح‌بندی‌شده درباره شکل‌گیری عادت‌ها با تمرکز بر واژگان دانشگاهی و Linking Words.",

    resourceType: "article",
    sourceType: "platform",
    status: "ready",

    languageCode: "en",
    cefrLevel: "B2",

    coverImageUrl: null,

    estimatedMinutes: 24,
    totalSections: 3,
    completedSections: 0,
    progressPercent: 0,

    topics: [
      "روان‌شناسی",
      "عادت‌ها",
      "سبک زندگی",
    ],

    learningFocuses: [
      "Academic Vocabulary",
      "Linking Words",
      "Main Idea",
    ],

    isFeatured: false,

    processingStatus: "ready",
    processingProgress: 100,

    originalFilename: null,
    sourceFileKind: null,
    mimeType: null,
    sizeBytes: null,

    totalWords: 1_140,

    sections: [
      {
        id: "habits-section-1",
        order: 1,

        title:
          "بخش اول: عادت چگونه شکل می‌گیرد؟",

        summary:
          "توضیح چرخه نشانه، رفتار و پاداش.",

        wordCount: 365,
        estimatedMinutes: 8,

        status: "available",
        audioStatus: "ready",

        vocabularyCount: 13,
        grammarPointCount: 2,
      },

      {
        id: "habits-section-2",
        order: 2,

        title:
          "بخش دوم: تغییرات کوچک",

        summary:
          "چرا تغییرات کوچک در طول زمان نتیجه بزرگ ایجاد می‌کنند.",

        wordCount: 380,
        estimatedMinutes: 8,

        status: "locked",
        audioStatus: "ready",

        vocabularyCount: 15,
        grammarPointCount: 3,
      },

      {
        id: "habits-section-3",
        order: 3,

        title:
          "بخش سوم: ساخت محیط مناسب",

        summary:
          "چگونه محیط می‌تواند انجام یک رفتار را آسان‌تر کند.",

        wordCount: 395,
        estimatedMinutes: 8,

        status: "locked",
        audioStatus: "ready",

        vocabularyCount: 14,
        grammarPointCount: 3,
      },
    ],

    processingWarnings: [],

    createdAt:
      "2026-07-25T11:00:00.000Z",

    updatedAt:
      "2026-07-25T11:00:00.000Z",
  },

  {
    id: "uploaded-reading-demo",

    title:
      "My Uploaded Reading Source",

    author: null,

    description:
      "فایل شخصی در حال استخراج، تحلیل، بخش‌بندی و آماده‌سازی صوت است.",

    resourceType: "document",
    sourceType: "user_upload",
    status: "processing",

    languageCode: "en",
    cefrLevel: "B1",

    coverImageUrl: null,

    estimatedMinutes: 35,
    totalSections: 5,
    completedSections: 0,
    progressPercent: 0,

    topics: [
      "منبع شخصی",
      "تحلیل هوشمند",
    ],

    learningFocuses: [
      "Vocabulary",
      "Grammar in Context",
      "Reading Comprehension",
    ],

    isFeatured: false,

    processingStatus: "segmenting",
    processingProgress: 68,

    originalFilename:
      "my-reading-source.pdf",

    sourceFileKind: "pdf",

    mimeType:
      "application/pdf",

    sizeBytes: 1_248_500,

    totalWords: 2_640,

    sections: [],

    processingWarnings: [
      "این منبع در حالت Mock نمایش داده می‌شود.",
      "متن و صوت واقعی پس از اتصال Backend تولید خواهند شد.",
    ],

    createdAt:
      "2026-08-02T15:00:00.000Z",

    updatedAt:
      "2026-08-02T15:04:00.000Z",
  },
] satisfies readonly ReadingResourceDetail[];