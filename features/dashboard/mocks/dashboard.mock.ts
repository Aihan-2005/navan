import type { DashboardOverview } from "../types/dashboard.types";

export const dashboardMock: DashboardOverview = {
  user: {
    id: "user-001",

    firstName: "مجتبی",
    lastName: "شبانی",

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
      "بهبود مکالمه و درک زبان انگلیسی",
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
    activityId: "activity-speaking-001",

    title: "تمرین مکالمه روزانه",

    description:
      "تمرین مکالمه برای افزایش سرعت پاسخ‌گویی",

    skill: "speaking",

    progressPercent: 65,

    estimatedMinutesRemaining: 15,

    lastActivityAt:
      "2026-07-25T10:30:00.000Z",

    href: "/speaking/activity-speaking-001",
  },


  dailyPlan: {
    date: "2026-07-25",

    completionPercent: 40,

    completedTasks: 2,

    totalTasks: 5,

    estimatedRemainingMinutes: 35,


    tasks: [
      {
        id: "task-001",

        title: "مرور لغات جدید",

        description:
          "مرور لغات ذخیره شده امروز",

        skill: "vocabulary",

        status: "completed",

        estimatedMinutes: 10,

        xpReward: 50,

        href: "/vocabulary",
      },


      {
        id: "task-002",

        title: "تمرین شنیداری",

        description:
          "گوش دادن به فایل صوتی سطح B1",

        skill: "listening",

        status: "in_progress",

        estimatedMinutes: 15,

        xpReward: 70,

        href: "/listening",
      },


      {
        id: "task-003",

        title: "تمرین گرامر",

        description:
          "مرور زمان‌های انگلیسی",

        skill: "grammar",

        status: "pending",

        estimatedMinutes: 10,

        xpReward: 40,

        href: "/grammar",
      },
    ],
  },


  skillProgress: [
    {
      skill: "speaking",

      score: 72,

      previousScore: 65,

      cefrLevel: "B1",

      completedActivities: 24,

      totalPracticeMinutes: 420,
    },


    {
      skill: "listening",

      score: 68,

      previousScore: 60,

      cefrLevel: "B1",

      completedActivities: 20,

      totalPracticeMinutes: 350,
    },


    {
      skill: "vocabulary",

      score: 80,

      previousScore: 75,

      cefrLevel: "B2",

      completedActivities: 45,

      totalPracticeMinutes: 600,
    },
  ],


  reviewQueue: {
    totalItems: 8,

    vocabularyCount: 5,

    grammarCount: 2,

    mistakeCount: 1,

    estimatedMinutes: 20,

    href: "/review",
  },


  primaryInsight: {
    id: "insight-001",

    type: "recommendation",

    title:
      "تمرین مکالمه را بیشتر کن",

    description:
      "بر اساس فعالیت‌های اخیر، افزایش تمرین مکالمه باعث رشد سریع‌تر سطح زبان می‌شود.",

    relatedSkill: "speaking",

    actionLabel:
      "شروع تمرین",

    actionHref:
      "/speaking",

    createdAt:
      "2026-07-25T09:00:00.000Z",
  },


  recentActivities: [
    {
      id: "recent-001",

      title:
        "تمرین مکالمه انگلیسی",

      skill: "speaking",

      status: "completed",

      score: 85,

      durationMinutes: 20,

      occurredAt:
        "2026-07-25T08:30:00.000Z",

      href:
        "/speaking/recent-001",
    },


    {
      id: "recent-002",

      title:
        "مرور لغات",

      skill: "vocabulary",

      status: "completed",

      score: 90,

      durationMinutes: 15,

      occurredAt:
        "2026-07-24T18:00:00.000Z",

      href:
        "/vocabulary",
    },
  ],
};