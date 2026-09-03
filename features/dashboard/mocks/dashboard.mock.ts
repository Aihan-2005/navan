import type {
  DashboardOverview,
} from "../types/dashboard.types";

export const dashboardMock: DashboardOverview = {
  user: {
    id: "user-001",

    firstName: "نازی",

    lastName: "Meow",

    avatarUrl: null,

    targetLanguage: {
      code: "en",
      name: "English",
    },

    nativeLanguage: {
      code: "fa",
      name: "فارسی",
    },

    cefrLevel: "B1",

    learningGoal:
      "تقویت مکالمه و رسیدن به سطح پیشرفته",
  },

  summary: {
    streakDays: 12,

    todayCompletedMinutes: 25,

    dailyGoalMinutes: 45,

    weeklyCompletedMinutes: 180,

    weeklyGoalMinutes: 300,

    completedActivitiesThisWeek: 14,
  },

  continueLearning: {
    activityId:
      "work-conversation-part-3",

    title:
      "مکالمه در محیط کار - بخش ۳",

    description:
      "گرامر: حال کامل استمراری",

    skill: "speaking",

    progressPercent: 75,

    estimatedMinutesRemaining: 12,

    lastActivityAt:
      "2026-09-02T08:30:00.000Z",

    href:
      "/speaking",
  },

  dailyPlan: {
    date:
      "2026-09-02",

    completionPercent: 20,

    completedTasks: 1,

    totalTasks: 5,

    estimatedRemainingMinutes: 40,

    tasks: [
      {
        id:
          "travel-vocabulary",

        title:
          "مرور واژگان سفر",

        description:
          "مرور واژگان مرتبط با سفر",

        skill:
          "vocabulary",

        status:
          "completed",

        estimatedMinutes:
          10,

        xpReward:
          30,

        href:
          "/vocabulary",
      },

      {
        id:
          "iranian-culture-podcast",

        title:
          "پادکست: فرهنگ ایرانی",

        description:
          "تمرین شنیداری",

        skill:
          "listening",

        status:
          "in_progress",

        estimatedMinutes:
          15,

        xpReward:
          50,

        href:
          "/listening",
      },

      {
        id:
          "daily-dialogues",

        title:
          "دیالوگ‌های روزمره",

        description:
          "مکالمات روزانه",

        skill:
          "speaking",

        status:
          "pending",

        estimatedMinutes:
          8,

        xpReward:
          20,

        href:
          "/speaking",
      },

      {
        id:
          "past-tense",

        title:
          "زمان افعال: گذشته دور",

        description:
          "تمرین گرامر",

        skill:
          "grammar",

        status:
          "pending",

        estimatedMinutes:
          12,

        xpReward:
          40,

        href:
          "/grammar",
      },

      {
        id:
          "prepositions",

        title:
          "تمرین حروف اضافه",

        description:
          "تمرین نوشتاری",

        skill:
          "writing",

        status:
          "pending",

        estimatedMinutes:
          5,

        xpReward:
          15,

        href:
          "/writing",
      },
    ],
  },

  skillProgress: [
    {
      skill:
        "listening",

      score:
        88,

      previousScore:
        82,

      cefrLevel:
        "B2",

      completedActivities:
        31,

      totalPracticeMinutes:
        480,
    },

    {
      skill:
        "speaking",

      score:
        62,

      previousScore:
        58,

      cefrLevel:
        "B1",

      completedActivities:
        24,

      totalPracticeMinutes:
        420,
    },

    {
      skill:
        "writing",

      score:
        74,

      previousScore:
        68,

      cefrLevel:
        "B1",

      completedActivities:
        18,

      totalPracticeMinutes:
        310,
    },

    {
      skill:
        "vocabulary",

      score:
        91,

      previousScore:
        87,

      cefrLevel:
        "B2",

      completedActivities:
        45,

      totalPracticeMinutes:
        600,
    },

    {
      skill:
        "reading",

      score:
        80,

      previousScore:
        76,

      cefrLevel:
        "B1",

      completedActivities:
        26,

      totalPracticeMinutes:
        390,
    },
  ],

  reviewQueue: {
    totalItems:
      8,

    vocabularyCount:
      5,

    grammarCount:
      2,

    mistakeCount:
      1,

    estimatedMinutes:
      20,

    href:
      "/review",
  },

  primaryInsight: {
    id:
      "insight-001",

    type:
      "recommendation",

    title:
      "تمرین مکالمه را بیشتر کن",

    description:
      "تمرین مکالمه منظم باعث رشد سریع‌تر مهارت گفتاری می‌شود.",

    relatedSkill:
      "speaking",

    actionLabel:
      "شروع تمرین",

    actionHref:
      "/speaking",

    createdAt:
      "2026-09-02T09:00:00.000Z",
  },

  recentActivities: [
    {
      id:
        "b1-test",

      title:
        "آزمون جامع سطح B1",

      skill:
        "grammar",

      status:
        "completed",

      score:
        85,

      durationMinutes:
        30,

      occurredAt:
        "2026-09-01T10:00:00.000Z",

      href:
        "/assessment",
    },

    {
      id:
        "shopping-speaking",

      title:
        "مکالمه در مورد خرید",

      skill:
        "speaking",

      status:
        "completed",

      score:
        null,

      durationMinutes:
        15,

      occurredAt:
        "2026-08-31T16:00:00.000Z",

      href:
        "/speaking",
    },

    {
      id:
        "restaurant-vocabulary",

      title:
        "تمرین لغات رستوران",

      skill:
        "vocabulary",

      status:
        "completed",

      score:
        100,

      durationMinutes:
        12,

      occurredAt:
        "2026-08-30T16:00:00.000Z",

      href:
        "/vocabulary",
    },
  ],
};