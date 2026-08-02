import type {
  ListeningContentDetail,
} from "../types/listening.types";

export const listeningContentsMock = [
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
    ],

    status: "ready",

    isFeatured: true,
    isCompleted: false,

    bestAccuracyScore: null,

    audioUrl:
      "/audio/listening/daily-routine-podcast.mp3",

    coverImageUrl: null,

    transcriptionLanguage: "en",

    instructions: [
      "یک‌بار صوت را بدون توقف گوش بده.",
      "در بار دوم، چیزهایی را که می‌شنوی بنویس.",
      "برای بخش‌های دشوار از عقب‌رفتن پنج‌ثانیه‌ای استفاده کن.",
      "قبل از ارسال، Transcript خودت را یک‌بار مرور کن.",
    ],

    hintWords: [
      "commute",
      "underground",
      "neighborhood",
    ],

    minimumTranscriptWords: 20,
    transcriptAvailable: true,

    audioAttribution: null,
  },

  {
    id: "airport-check-in-conversation",

    title: "گفت‌وگو در فرودگاه",

    description:
      "مکالمه‌ای میان مسافر و مسئول پذیرش درباره چمدان، صندلی و کارت پرواز.",

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

    audioUrl:
      "/audio/listening/airport-check-in-conversation.mp3",

    coverImageUrl: null,

    transcriptionLanguage: "en",

    instructions: [
      "به تفاوت صدای دو گوینده توجه کن.",
      "نام‌ها، اعداد و اطلاعات پرواز را دقیق بنویس.",
      "لازم نیست نام گوینده‌ها را در متن وارد کنی.",
    ],

    hintWords: [
      "destination",
      "boarding",
      "luggage",
    ],

    minimumTranscriptWords: 15,
    transcriptAvailable: true,

    audioAttribution: null,
  },

  {
    id: "small-act-of-kindness-story",

    title: "یک کار کوچک و مهربانانه",

    description:
      "داستانی کوتاه درباره اتفاقی ساده که روز یک فرد را تغییر می‌دهد.",

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
      "guided_dictation",
      "shadowing",
    ],

    status: "ready",

    isFeatured: true,
    isCompleted: false,

    bestAccuracyScore: null,

    audioUrl:
      "/audio/listening/small-act-of-kindness-story.mp3",

    coverImageUrl: null,

    transcriptionLanguage: "en",

    instructions: [
      "به زمان افعال و ترتیب اتفاقات توجه کن.",
      "کلمات ربط مانند then و finally را فراموش نکن.",
      "علائم نگارشی فعلاً در امتیاز اصلی اثر زیادی ندارند.",
    ],

    hintWords: [
      "unexpected",
      "kindness",
      "grateful",
    ],

    minimumTranscriptWords: 25,
    transcriptAvailable: true,

    audioAttribution: null,
  },

  {
    id: "remote-work-interview",

    title: "مصاحبه درباره دورکاری",

    description:
      "مصاحبه‌ای درباره مزایا، چالش‌ها و عادت‌های مناسب برای کار از خانه.",

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

    audioUrl:
      "/audio/listening/remote-work-interview.mp3",

    coverImageUrl: null,

    transcriptionLanguage: "en",

    instructions: [
      "روی عبارات مربوط به محیط کار تمرکز کن.",
      "در صورت دشواربودن مکالمه از سرعت ۰٫۷۵ استفاده کن.",
      "کلمات کلیدی هر پاسخ را کامل ثبت کن.",
    ],

    hintWords: [
      "productivity",
      "flexibility",
      "workspace",
    ],

    minimumTranscriptWords: 30,
    transcriptAvailable: true,

    audioAttribution: null,
  },

  {
    id: "technology-news-brief",

    title: "خبر کوتاه فناوری",

    description:
      "گزارشی کوتاه برای تمرین شنیدن اعداد، اسامی و اصطلاحات فناوری.",

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

    audioUrl:
      "/audio/listening/technology-news-brief.mp3",

    coverImageUrl: null,

    transcriptionLanguage: "en",

    instructions: [
      "اعداد، تاریخ‌ها و نام سازمان‌ها را دقیق بنویس.",
      "ابتدا خبر را کامل گوش بده و سپس Transcribe کن.",
      "سرعت بالای گوینده بخشی از تمرین است.",
    ],

    hintWords: [
      "researcher",
      "announcement",
      "technology",
    ],

    minimumTranscriptWords: 20,
    transcriptAvailable: true,

    audioAttribution: null,
  },
] satisfies ListeningContentDetail[];