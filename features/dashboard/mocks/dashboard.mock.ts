import type { DashboardOverview } from "../types/dashboard.types";

export const dashboardMock = {
  user: {
    id: "user_001",
    firstName: "نیکا",
    lastName: null,
    avatarUrl: null,

    targetLanguage: {
      code: "en",
      name: "انگلیسی",
    },

    nativeLanguage: {
      code: "fa",
      name: "فارسی",
    },

    cefrLevel: "B1",

    learningGoal:
      "تقویت مکالمه روزمره و افزایش اعتمادبه‌نفس",
  },

  summary: {
    streakDays: 7,

    todayCompletedMinutes: 18,
    dailyGoalMinutes: 30,

    weeklyCompletedMinutes: 95,
    weeklyGoalMinutes: 150,

    completedActivitiesThisWeek: 12,
  },

  continueLearning: {
    activityId: "restaurant-roleplay",
    title: "مکالمه در رستوران",

    description:
      "در این تمرین، سفارش غذا و صحبت با پیشخدمت را تمرین می‌کنی.",

    skill: "speaking",

    progressPercent: 65,
    estimatedMinutesRemaining: 8,

    lastActivityAt: "2026-07-24T16:30:00.000Z",

    href: "/speaking/practice/restaurant-roleplay",
  },

  dailyPlan: {
    date: "2026-07-25",

    completionPercent: 25,
    completedTasks: 1,
    totalTasks: 4,
    estimatedRemainingMinutes: 28,

    tasks: [
      {
        id: "daily-vocabulary-001",
        title: "مرور ۱۰ لغت روزانه",

        description:
          "مرور واژگان مربوط به سفر و رستوران",

        skill: "vocabulary",
        status: "completed",

        estimatedMinutes: 5,
        xpReward: 10,

        href: null,
      },

      {
        id: "daily-listening-001",
        title: "تمرین شنیداری سطح B1",

        description:
          "گوش‌دادن به یک گفت‌وگوی کوتاه روزمره",

        skill: "listening",
        status: "pending",

        estimatedMinutes: 8,
        xpReward: 20,

        href: "/listening",
      },

      {
        id: "daily-speaking-001",
        title: "مکالمه با معلم هوشمند",

        description:
          "تمرین مکالمه درباره سفارش غذا",

        skill: "speaking",
        status: "in_progress",

        estimatedMinutes: 10,
        xpReward: 30,

        href: "/speaking",
      },

      {
        id: "daily-writing-001",
        title: "نوشتن یک متن کوتاه",

        description:
          "توصیف یک تجربه از سفر گذشته",

        skill: "writing",
        status: "pending",

        estimatedMinutes: 10,
        xpReward: 20,

        href: "/writing",
      },
    ],
  },

  skillProgress: [
    {
      skill: "speaking",
      score: 72,
      previousScore: 66,
      cefrLevel: "B1",
      completedActivities: 18,
      totalPracticeMinutes: 210,
    },

    {
      skill: "listening",
      score: 64,
      previousScore: 61,
      cefrLevel: "B1",
      completedActivities: 14,
      totalPracticeMinutes: 165,
    },

    {
      skill: "reading",
      score: 78,
      previousScore: 76,
      cefrLevel: "B1",
      completedActivities: 11,
      totalPracticeMinutes: 130,
    },

    {
      skill: "writing",
      score: 55,
      previousScore: 58,
      cefrLevel: "A2",
      completedActivities: 9,
      totalPracticeMinutes: 105,
    },

    {
      skill: "grammar",
      score: 69,
      previousScore: 65,
      cefrLevel: "B1",
      completedActivities: 16,
      totalPracticeMinutes: 180,
    },

    {
      skill: "vocabulary",
      score: 74,
      previousScore: 70,
      cefrLevel: "B1",
      completedActivities: 22,
      totalPracticeMinutes: 240,
    },
  ],

  reviewQueue: {
    totalItems: 17,

    vocabularyCount: 12,
    grammarCount: 3,
    mistakeCount: 2,

    estimatedMinutes: 10,

    href: null,
  },

  primaryInsight: {
    id: "insight-001",

    type: "weakness",

    title:
      "زمان گذشته نیاز به تمرین بیشتری دارد",

    description:
      "در تمرین‌های اخیر چند اشتباه تکراری در استفاده از Past Simple مشاهده شده است. پیشنهاد می‌شود امروز یک تمرین کوتاه نوشتاری انجام بدهی.",

    relatedSkill: "grammar",

    actionLabel: "شروع تمرین نوشتاری",
    actionHref: "/writing",

    createdAt: "2026-07-25T08:00:00.000Z",
  },

  recentActivities: [
    {
      id: "recent-speaking-001",
      title: "مکالمه در فرودگاه",

      skill: "speaking",
      status: "completed",

      score: 76,
      durationMinutes: 14,

      occurredAt: "2026-07-24T18:20:00.000Z",

      href: "/speaking",
    },

    {
      id: "recent-listening-001",
      title: "گفت‌وگوی روزمره شماره ۴",

      skill: "listening",
      status: "completed",

      score: 68,
      durationMinutes: 9,

      occurredAt: "2026-07-23T15:40:00.000Z",

      href: "/listening",
    },

    {
      id: "recent-writing-001",
      title: "توصیف آخر هفته",

      skill: "writing",
      status: "completed",

      score: 71,
      durationMinutes: 18,

      occurredAt: "2026-07-22T11:15:00.000Z",

      href: "/writing",
    },
  ],
} satisfies DashboardOverview;