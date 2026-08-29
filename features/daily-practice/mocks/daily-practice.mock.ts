import type {
  DailyPracticeOverview,
} from "../types/daily-practice.types";

export const dailyPracticeMock: DailyPracticeOverview = {
  date: "2026-11-15",

  summary: {
    todayMinutes: 25,
    dailyGoalMinutes: 45,
    completionPercent: 55,
    completedTasks: 3,
    totalTasks: 6,
    todayXp: 150,
    streakDays: 12,
  },

  tasks: [
    {
      id: "daily-vocabulary-travel",
      kind: "vocabulary",
      title: "مرور کلمات سفر",
      status: "completed",
      durationMinutes: 10,
      xpReward: 20,
      href: null,
    },
    {
      id: "daily-speaking-dialogue",
      kind: "speaking",
      title: "دیالوگ‌های روزمره",
      status: "in_progress",
      durationMinutes: 8,
      xpReward: 30,
      href: "/speaking/free",
    },
    {
      id: "daily-grammar-past-perfect",
      kind: "grammar",
      title: "زمان افعال: گذشته دور",
      status: "pending",
      durationMinutes: 12,
      xpReward: 40,
      href: "/assessment/custom",
    },
    {
      id: "daily-writing-prepositions",
      kind: "writing",
      title: "تمرین حروف اضافه",
      status: "pending",
      durationMinutes: 5,
      xpReward: 15,
      href: "/writing/new",
    },
    {
      id: "daily-vocabulary-quiz",
      kind: "assessment",
      title: "کوییز سریع واژگان",
      status: "pending",
      durationMinutes: 3,
      xpReward: 10,
      href: "/assessment",
    },
  ],

  recommendation: {
    id: "daily-ai-speaking-focus",
    title: "تمرین پیشنهادی هوشمند",
    descriptionBeforeHighlight:
      "بر اساس تحلیل عملکرد اخیر شما، سیستم هوش مصنوعی ما پیشنهاد می‌کند روی",
    highlightedSkill: "مهارت مکالمه",
    descriptionAfterHighlight:
      "تمرکز کنید. این تمرین به شما کمک می‌کند تا اعتماد به نفس بیشتری در استفاده از واژگان جدید پیدا کنید.",
    actionLabel: "شروع تمرین اختصاصی",
    actionHref: "/speaking/free",
  },
};