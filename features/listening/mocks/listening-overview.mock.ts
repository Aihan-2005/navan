import type {
  ListeningOverviewInput,
} from "../types/listening.types";

export const listeningOverviewMock = {
  stats: {
    totalSessions: 24,
    weeklyMinutes: 68,

    averageAccuracyScore: 74,
    bestAccuracyScore: 91,

    currentStreakDays: 6,
  },

  continueListening: null,

  featuredContents: [
    {
      id: "daily-routine-podcast",

      title: "یک روز معمولی در لندن",

      description:
        "یک پادکست کوتاه درباره برنامه روزانه، رفت‌وآمد و فعالیت‌های معمول زندگی.",

      contentType: "podcast",
      sourceType: "platform",

      cefrLevel: "B1",
      accent: "british",

      durationSeconds: 284,
      estimatedPracticeMinutes: 14,

      averageWordsPerMinute: 128,
      speakerCount: 1,

      topics: [
        "زندگی روزمره",
        "حمل‌ونقل",
        "برنامه روزانه",
      ],

      vocabularyPreview: [
        "commute",
        "usually",
        "neighborhood",
      ],

      availablePracticeModes: [
        "full_dictation",
        "guided_dictation",
        "comprehension",
      ],

      status: "ready",

      isFeatured: true,
      isCompleted: false,

      bestAccuracyScore: null,
    },

    {
      id: "airport-check-in-conversation",

      title: "گفت‌وگو در فرودگاه",

      description:
        "مکالمه‌ای واقعی میان مسافر و مسئول پذیرش درباره چمدان، صندلی و کارت پرواز.",

      contentType: "conversation",
      sourceType: "platform",

      cefrLevel: "A2",
      accent: "american",

      durationSeconds: 196,
      estimatedPracticeMinutes: 10,

      averageWordsPerMinute: 116,
      speakerCount: 2,

      topics: [
        "سفر",
        "فرودگاه",
        "مکالمه روزمره",
      ],

      vocabularyPreview: [
        "boarding pass",
        "luggage",
        "window seat",
      ],

      availablePracticeModes: [
        "full_dictation",
        "guided_dictation",
        "fill_in_the_blank",
      ],

      status: "ready",

      isFeatured: true,
      isCompleted: true,

      bestAccuracyScore: 82,
    },

    {
      id: "small-act-of-kindness-story",

      title: "یک کار کوچک و مهربانانه",

      description:
        "داستانی کوتاه با سرعت متوسط درباره اتفاقی ساده که روز یک فرد را تغییر می‌دهد.",

      contentType: "story",
      sourceType: "platform",

      cefrLevel: "B1",
      accent: "american",

      durationSeconds: 342,
      estimatedPracticeMinutes: 17,

      averageWordsPerMinute: 122,
      speakerCount: 1,

      topics: [
        "داستان",
        "احساسات",
        "روابط انسانی",
      ],

      vocabularyPreview: [
        "generous",
        "unexpected",
        "grateful",
      ],

      availablePracticeModes: [
        "full_dictation",
        "comprehension",
        "shadowing",
      ],

      status: "ready",

      isFeatured: true,
      isCompleted: false,

      bestAccuracyScore: null,
    },
  ],

  recommendedContents: [
    {
      id: "remote-work-interview",

      title: "مصاحبه درباره دورکاری",

      description:
        "مصاحبه‌ای کوتاه درباره مزایا، چالش‌ها و عادت‌های مناسب برای کار از خانه.",

      contentType: "interview",
      sourceType: "platform",

      cefrLevel: "B2",
      accent: "mixed",

      durationSeconds: 428,
      estimatedPracticeMinutes: 21,

      averageWordsPerMinute: 142,
      speakerCount: 2,

      topics: [
        "کار",
        "فناوری",
        "سبک زندگی",
      ],

      vocabularyPreview: [
        "productivity",
        "flexibility",
        "distraction",
      ],

      availablePracticeModes: [
        "guided_dictation",
        "comprehension",
      ],

      status: "ready",

      isFeatured: false,
      isCompleted: false,

      bestAccuracyScore: null,
    },

    {
      id: "technology-news-brief",

      title: "خبر کوتاه فناوری",

      description:
        "یک گزارش خبری کوتاه برای تمرین شنیدن اعداد، اسامی و اصطلاحات فناوری.",

      contentType: "news",
      sourceType: "platform",

      cefrLevel: "B2",
      accent: "british",

      durationSeconds: 164,
      estimatedPracticeMinutes: 9,

      averageWordsPerMinute: 154,
      speakerCount: 1,

      topics: [
        "فناوری",
        "اخبار",
        "هوش مصنوعی",
      ],

      vocabularyPreview: [
        "announcement",
        "researcher",
        "development",
      ],

      availablePracticeModes: [
        "full_dictation",
        "guided_dictation",
      ],

      status: "ready",

      isFeatured: false,
      isCompleted: true,

      bestAccuracyScore: 77,
    },
  ],

  primaryInsight: {
    id: "listening-insight-001",

    type: "weakness",

    title:
      "کلمات کوتاه در گفتار پیوسته از دست می‌روند",

    description:
      "در تمرین‌های اخیر بیشتر خطاهای تو مربوط به کلماتی مانند a، the، to و of بوده است. تمرین‌های مکالمه با سرعت متوسط برای بهبود این بخش مناسب‌اند.",

    actionLabel: null,
    actionHref: null,

    createdAt:
      "2026-08-01T05:00:00.000Z",
  },

  recentActivities: [
    {
      id: "activity-listening-001",
      contentId: "airport-check-in-conversation",

      title: "گفت‌وگو در فرودگاه",

      contentType: "conversation",
      practiceMode: "full_dictation",

      durationMinutes: 12,
      accuracyScore: 82,

      completedAt:
        "2026-07-31T17:25:00.000Z",
    },

    {
      id: "activity-listening-002",
      contentId: "technology-news-brief",

      title: "خبر کوتاه فناوری",

      contentType: "news",
      practiceMode: "guided_dictation",

      durationMinutes: 9,
      accuracyScore: 77,

      completedAt:
        "2026-07-29T13:10:00.000Z",
    },
  ],
} satisfies ListeningOverviewInput;