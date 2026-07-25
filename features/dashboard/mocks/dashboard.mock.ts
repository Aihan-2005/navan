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
    learningGoal: "تقویت مکالمه روزمره و افزایش اعتمادبه‌نفس",
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
    activityId: "speaking_restaurant_001",
    title: "مکالمه در رستوران",
    description:
      "در این تمرین، سفارش غذا و صحبت با پیشخدمت را تمرین می‌کنی.",

    skill: "speaking",

    progressPercent: 65,
    estimatedMinutesRemaining: 8,

    lastActivityAt: "2026-07-24T16:30:00.000Z",
    href: "/speaking/speaking_restaurant_001",
  },
} satisfies DashboardOverview;