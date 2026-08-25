export const WRITING_CATEGORIES = [
  {
    id: "free-writing",
    title: "نوشتن آزاد",
    description:
      "بدون محدودیت شروع به نوشتن کنید و افکار خود را ثبت کنید.",
  },

  {
    id: "formal-email",
    title: "نامه رسمی",
    description:
      "یک متن رسمی با ساختار مناسب و دقیق بنویسید.",
  },

  {
    id: "argument",
    title: "استدلال و نظر",
    description:
      "دیدگاه خود را با دلیل و ساختار منطقی بیان کنید.",
  },

  {
    id: "memory",
    title: "توصیف یک خاطره",
    description:
      "یک تجربه شخصی را با جزئیات توصیفی بنویسید.",
  },

  {
    id: "daily-problem",
    title: "تحلیل یک مشکل",
    description:
      "یک موضوع روزمره را بررسی و تحلیل کنید.",
  },
] as const;

export type WritingCategory =
  (typeof WRITING_CATEGORIES)[number];

export type WritingCategoryId =
  WritingCategory["id"];

/**
 * Compatibility alias for older imports.
 *
 * کد جدید بهتر است WritingCategoryId
 * را مستقیماً استفاده کند.
 */
export type WritingCategoryFilter =
  WritingCategoryId;

export const WRITING_DIFFICULTY_STYLES = {
  beginner: {
    label: "مبتدی",
    color: "#475569",
    background: "#F1F5F9",
  },

  intermediate: {
    label: "متوسط",
    color: "#3D4947",
    background: "#ECEEF0",
  },

  advanced: {
    label: "پیشرفته",
    color: "#93000A",
    background: "#FFDAD6",
  },
} as const;

export const WRITING_LEVELS = {
  suggested: {
    label: "پیشنهادی",
    color: "#7E22CE",
    background: "#F3E8FF",
  },

  formal: {
    label: "رسمی",
    color: "#0D9488",
    background: "#F0FDFA",
  },

  analytical: {
    label: "تحلیلی",
    color: "#131B2E",
    background: "#DAE2FD",
  },
} as const;