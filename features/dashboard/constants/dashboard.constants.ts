import type {
  ActivityStatus,
  InsightType,
  SkillType,
} from "../types/dashboard.types";

export const DASHBOARD_SKILL_LABELS = {
  speaking: "مکالمه",
  listening: "شنیداری",
  reading: "خواندن",
  writing: "نوشتن",
  grammar: "گرامر",
  vocabulary: "واژگان",
} satisfies Record<SkillType, string>;

export const DASHBOARD_ACTIVITY_STATUS_LABELS = {
  pending: "در انتظار",
  in_progress: "در حال انجام",
  completed: "انجام‌شده",
  skipped: "ردشده",
} satisfies Record<ActivityStatus, string>;

export const DASHBOARD_INSIGHT_LABELS = {
  weakness: "نقطه قابل بهبود",
  recommendation: "پیشنهاد معلم",
  achievement: "دستاورد",
  warning: "نیازمند توجه",
  motivation: "پیام انگیزشی",
} satisfies Record<InsightType, string>;

export type QuickPracticeItem = {
  id: string;
  title: string;
  description: string;
  skill: SkillType;
  href: string | null;
  isAvailable: boolean;
};

export const QUICK_PRACTICE_ITEMS = [
  {
    id: "quick-speaking",
    title: "مکالمه",
    description: "تمرین مکالمه و تلفظ",
    skill: "speaking",
    href: "/dashboard/speaking",
    isAvailable: true,
  },
  {
    id: "quick-listening",
    title: "شنیداری",
    description: "درک فایل‌های صوتی",
    skill: "listening",
    href: "/dashboard/listening",
    isAvailable: true,
  },
  {
    id: "quick-writing",
    title: "نوشتن",
    description: "تمرین و اصلاح متن",
    skill: "writing",
    href: "/dashboard/writing",
    isAvailable: true,
  },
  {
    id: "quick-reading",
    title: "خواندن",
    description: "درک مطلب و تحلیل متن",
    skill: "reading",
    href: null,
    isAvailable: false,
  },
  {
    id: "quick-grammar",
    title: "گرامر",
    description: "یادگیری ساختارهای زبان",
    skill: "grammar",
    href: null,
    isAvailable: false,
  },
  {
    id: "quick-vocabulary",
    title: "واژگان",
    description: "یادگیری و مرور لغات",
    skill: "vocabulary",
    href: null,
    isAvailable: false,
  },
] satisfies QuickPracticeItem[];