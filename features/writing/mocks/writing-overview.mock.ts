import type { WritingOverviewData } from "../types/writing.types";

export const writingOverviewMock: Omit<WritingOverviewData, 'recommendedExercise'> = {
  stats: {
    totalWritings: 18,
    weeklyWords: 6400,
    averageScore: 81,
    currentStreak: 6,
  },
  currentDraft: {
    id: "draft-1",
    title: "نامه رسمی به استاد",
    updatedAt: "۳ ساعت پیش",
    excerpt:
      "در این متن به‌تدریج نکات اصلی و ساختار مناسب برای نوشتن یک نامه رسمی را مرور می‌کنم...",
    wordCount: 268,
    targetWordCount: 350,
    progressPercent: 77,
  },
  exercises: [
    {
      id: "professional-email-writing",
      title: "نوشتن ایمیل حرفه‌ای",
      description: "یک ایمیل رسمی و دقیق برای درخواست اطلاعات بنویس.",
      difficulty: "مبتدی",
      estimatedMinutes: 8,
      category: "رسمی",
      prompt:
        "برای درخواست اطلاعاتی از یک شرکت، یک ایمیل رسمی با لحن محترمانه بنویس.",
      instructions: [
        "موضوع ایمیل را مشخص کن.",
        "درخواست خود را روشن و کوتاه بیان کن.",
        "در پایان، از گیرنده تشکر کن.",
      ],
      targetWritingGoal: "نوشتن ایمیل رسمی و واضح",
      expectedWordCount: 180,
    },
    {
      id: "opinion-response-writing",
      title: "پاسخ به یک نظر",
      description: "به یک دیدگاه مخالف با لحن محترمانه و دقیق پاسخ بده.",
      difficulty: "متوسط",
      estimatedMinutes: 10,
      category: "استدلال",
      prompt:
        "به یک نظر مخالف پاسخ بده و با دلیل، لحن محترمانه و ساختار منظم از خودت نشان بده.",
      instructions: [
        "نقطه‌ی شروع را با موافقت محدود بیان کن.",
        "دلایل خود را به‌صورت منطقی ارائه بده.",
        "در پایان، نتیجه‌ی اصلی متن را خلاصه کن.",
      ],
      targetWritingGoal: "پاسخ منظم و استدلالی",
      expectedWordCount: 200,
    },
    {
      id: "problem-analysis-writing",
      title: "تحلیل یک مشکل روزمره",
      description:
        "در مورد یک موضوع اجتماعی یا کاری با جزئیات و ساختار منطقی بنویس.",
      difficulty: "پیشرفته",
      estimatedMinutes: 15,
      category: "تحلیل",
      prompt:
        "یک مشکل روزمره را با دلایل، اثرات و راه‌حل پیشنهادی تحلیل کن.",
      instructions: [
        "مشکل را مشخص کن.",
        "دلایل و اثرات آن را جداگانه بیان کن.",
        "در پایان، یک راه‌حل عملی پیشنهاد بده.",
      ],
      targetWritingGoal: "تحلیل دقیق و ساختارمند",
      expectedWordCount: 260,
    },
    {
      id: "memory-description-writing",
      title: "توصیف یک خاطره",
      description: "یک خاطره‌ی شخصی مهم را با جزئیات احساسی و توصیفی بنویس.",
      difficulty: "متوسط",
      estimatedMinutes: 12,
      category: "توصیف",
      prompt:
        "خاطره‌ای را که در زندگی‌ات تأثیر عمیقی داشته، با تمرکز بر احساسات و جزئیات توصیف کن.",
      instructions: [
        "زمان و مکان خاطره را مشخص کن.",
        "احساسات و واکنش‌های خودت را توصیف کن.",
        "تأثیر این خاطره بر زندگی‌ات را بیان کن.",
      ],
      targetWritingGoal: "توصیف احساسی و روایی",
      expectedWordCount: 240,
    },
    {
      id: "short-article-writing",
      title: "نوشتن مقاله کوتاه",
      description: "یک مقاله‌ی کوتاه درباره یک موضوع اجتماعی بنویس.",
      difficulty: "پیشرفته",
      estimatedMinutes: 20,
      category: "تحلیل",
      prompt:
        "درباره یک موضوع اجتماعی مهم در جامعه امروز، یک مقاله تحلیلی کوتاه بنویس.",
      instructions: [
        "موضوع را با یک مقدمه جذاب شروع کن.",
        "دو تا سه نکته اصلی را با مثال توضیح بده.",
        "در پایان، جمع‌بندی و پیشنهاد ارائه بده.",
      ],
      targetWritingGoal: "نوشتن مقاله تحلیلی",
      expectedWordCount: 350,
    },
    {
      id: "short-story-writing",
      title: "داستان کوتاه",
      description: "یک داستان کوتاه با شخصیت و پیام مشخص بنویس.",
      difficulty: "متوسط",
      estimatedMinutes: 15,
      category: "داستان",
      prompt:
        "یک داستان کوتاه درباره یک تصمیم مهم در زندگی یک شخصیت خیالی بنویس.",
      instructions: [
        "شخصیت و موقعیت را معرفی کن.",
        "تصمیم‌گیری و چالش‌ها را توصیف کن.",
        "نتیجه و پیام داستان را بیان کن.",
      ],
      targetWritingGoal: "داستان‌نویسی خلاقانه",
      expectedWordCount: 300,
    },
  ],
  recentWritings: [
    {
      id: "writing-1",
      title: "شرح یک رویداد مهم",
      date: "دیروز",
      score: 86,
      feedback: "جملات روان و ساختار منظم داشت.",
      excerpt: "در این متن، یک تجربه‌ی مهم با تمرکز بر جزئیات و احساسات روایت شده است.",
      mode: "exercise",
      analysis: {
        overallScore: 86,
        grammar: {
          label: "دستور زبان",
          score: 84,
          detail: "بیشتر جملات ساختار درست دارند و فقط در چند نقطه نیاز به اصلاح است.",
        },
        vocabulary: {
          label: "واژگان",
          score: 81,
          detail: "واژگان مناسب و متنوع استفاده شده‌اند.",
        },
        coherence: {
          label: "انسجام",
          score: 88,
          detail: "ایده‌ها به‌خوبی به هم مرتبط‌اند.",
        },
        clarity: {
          label: "وضوح",
          score: 85,
          detail: "پیام اصلی به‌روشنی منتقل شده است.",
        },
        tone: {
          label: "لحن",
          score: 83,
          detail: "لحن طبیعی و مناسب برای متن شخصی است.",
        },
        highlightedMistakes: ["استفاده‌ی نامناسب از زمان گذشته در یک جمله"],
        issues: [
          {
            id: "issue-1",
            title: "تکرار واژه",
            description: "بعضی واژه‌ها در چند بخش تکرار شده‌اند.",
            severity: "متوسط",
            suggestion: "از معادل‌های دقیق‌تر و متنوع‌تر استفاده کن.",
          },
        ],
        repeatedWords: ["خیلی", "روشن"],
        betterVocabulary: ["کاملاً", "به‌وضوح", "قابل‌درک"],
        rewrittenVersion:
          "رویداد موردنظر را با جزئیات بیشتر و لحن رسمی‌تر بازنویسی کن تا متن تاثیرگذارتر شود.",
        nextPractice: "تمرین نوشتن متن تحلیلی با ساختار سه‌پاراگرافی",
      },
    },
    {
      id: "writing-2",
      title: "پاسخ به یک سوال عمومی",
      date: "۲ روز پیش",
      score: 79,
      feedback: "به‌تدریج از واژگان بیشتری استفاده کن.",
      excerpt: "در این متن، پاسخ به یک سؤال عمومی با لحن ساده اما واضح ارائه شده است.",
      mode: "free",
      analysis: {
        overallScore: 79,
        grammar: {
          label: "دستور زبان",
          score: 78,
          detail: "ساختار جمله‌ها قابل قبول است.",
        },
        vocabulary: {
          label: "واژگان",
          score: 74,
          detail: "بعضی واژه‌ها هنوز خیلی ساده‌اند.",
        },
        coherence: {
          label: "انسجام",
          score: 80,
          detail: "انتقال ایده‌ها قابل فهم است.",
        },
        clarity: {
          label: "وضوح",
          score: 82,
          detail: "پیام اصلی روشن است.",
        },
        tone: {
          label: "لحن",
          score: 80,
          detail: "لحن صمیمی و قابل‌قبول است.",
        },
        highlightedMistakes: ["استفاده‌ی زیاد از جمله‌های کوتاه"],
        issues: [
          {
            id: "issue-2",
            title: "تنوع واژگان",
            description: "واژگان تکراری در متن دیده می‌شود.",
            severity: "زیاد",
            suggestion: "از واژه‌های جایگزین برای غنای متن استفاده کن.",
          },
        ],
        repeatedWords: ["ساده", "خوب"],
        betterVocabulary: ["مناسب", "موثر", "شفاف"],
        rewrittenVersion:
          "برای تقویت متن، جمله‌ها را با ساختارهای متنوع‌تر و معانی دقیق‌تر بازنویسی کن.",
        nextPractice: "تمرین پاسخ‌نویسی به دیدگاه‌های مختلف",
      },
    },
  ],
  weakPoints: [
    {
      id: "weak-1",
      title: "استفاده از زمان‌های ساده",
      description:
        "در چند نوشته، زمان‌های پیچیده‌تر می‌توانستند واضح‌تر باشند.",
      severity: "متوسط",
    },
    {
      id: "weak-2",
      title: "پیوند میان پاراگراف‌ها",
      description: "بعضی انتقال‌ها بین ایده‌ها بهتر می‌توانستند انجام شوند.",
      severity: "کم",
    },
    {
      id: "weak-3",
      title: "تنوع واژگان",
      description: "تکرار برخی واژگان در متن‌های کوتاه مشاهده می‌شود.",
      severity: "زیاد",
    },
  ],
};