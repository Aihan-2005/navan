import type { WritingOverviewData } from "../types/writing.types";

export const writingOverviewMock: WritingOverviewData = {
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
  },
  recommendedExercise: {
    id: "exercise-1",
    title: "توصیه‌شده امروز: توصیف تجربه",
    description:
      "با استفاده از زمان، مکان و احساسات، یک متن روان و قابل‌فهم درباره یک تجربه‌ی شخصی بنویس.",
    difficulty: "متوسط",
    estimatedMinutes: 12,
    category: "توصیف",
    isFeatured: true,
  },
  exercises: [
    {
      id: "exercise-2",
      title: "نوشتن ایمیل حرفه‌ای",
      description: "یک ایمیل رسمی و دقیق برای درخواست اطلاعات بنویس.",
      difficulty: "مبتدی",
      estimatedMinutes: 8,
      category: "رسمی",
    },
    {
      id: "exercise-3",
      title: "پاسخ به یک نظر",
      description: "به یک دیدگاه مخالف با لحن محترمانه و دقیق پاسخ بده.",
      difficulty: "متوسط",
      estimatedMinutes: 10,
      category: "استدلال",
    },
    {
      id: "exercise-4",
      title: "تحلیل یک مشکل روزمره",
      description:
        "در مورد یک موضوع اجتماعی یا کاری با جزئیات و ساختار منطقی بنویس.",
      difficulty: "پیشرفته",
      estimatedMinutes: 15,
      category: "تحلیل",
    },
  ],
  recentWritings: [
    {
      id: "writing-1",
      title: "شرح یک رویداد مهم",
      date: "دیروز",
      score: 86,
      feedback: "جملات روان و ساختار منظم داشت.",
    },
    {
      id: "writing-2",
      title: "پاسخ به یک سوال عمومی",
      date: "۲ روز پیش",
      score: 79,
      feedback: "به‌تدریج از واژگان بیشتری استفاده کن.",
    },
    {
      id: "writing-3",
      title: "پیشنهاد برای یک پروژه",
      date: "۳ روز پیش",
      score: 84,
      feedback: "ایده‌ها روشن و قابل‌فهم بود.",
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
