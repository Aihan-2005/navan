export const ASSESSMENT_CEFR_LEVELS = [
  "A1",
  "A2",
  "B1",
  "B2",
  "C1",
  "C2",
] as const;

export const ASSESSMENT_SKILLS = [
  "speaking",
  "listening",
  "reading",
  "writing",
  "grammar",
  "vocabulary",
] as const;

export const ASSESSMENT_TYPES = [
  "placement",
  "custom",
  "mini_quiz",
  "skill_check",
  "review",
] as const;

export const ASSESSMENT_MODES = [
  "fixed",
  "adaptive",
] as const;

export const ASSESSMENT_STATUSES = [
  "draft",
  "published",
  "archived",
] as const;

export const ASSESSMENT_DIFFICULTIES = [
  "very_easy",
  "easy",
  "medium",
  "hard",
  "very_hard",
] as const;

export const ASSESSMENT_QUESTION_TYPES = [
  "multiple_choice",
  "multiple_select",
  "fill_blank",
  "ordering",
  "reading_comprehension",
  "listening_comprehension",
  "short_text",
  "speaking_response",
] as const;

export const ASSESSMENT_SOURCE_FEATURES = [
  "assessment",
  "dashboard",
  "reading",
  "listening",
  "speaking",
  "ai",
] as const;

export const ASSESSMENT_CUSTOM_EXPERIENCE_MODES = [
  "quiz",
  "exam",
] as const;

export const ASSESSMENT_LEVEL_STRATEGIES = [
  "auto",
  "fixed",
] as const;

export const ASSESSMENT_DIFFICULTY_PROFILES = [
  "comfortable",
  "balanced",
  "challenging",
] as const;

export const ASSESSMENT_GENERATION_STATUSES = [
  "queued",
  "preparing_context",
  "generating",
  "ready",
  "failed",
] as const;

export const ASSESSMENT_CEFR_ORDER =
  ASSESSMENT_CEFR_LEVELS;

export const ASSESSMENT_SKILL_LABELS: Record<
  (typeof ASSESSMENT_SKILLS)[number],
  string
> = {
  speaking: "مکالمه",
  listening: "شنیداری",
  reading: "خواندن",
  writing: "نوشتن",
  grammar: "گرامر",
  vocabulary: "واژگان",
};

export const ASSESSMENT_TYPE_LABELS: Record<
  (typeof ASSESSMENT_TYPES)[number],
  string
> = {
  placement: "آزمون تعیین سطح",
  custom: "آزمون سفارشی",
  mini_quiz: "کوییز کوتاه",
  skill_check: "ارزیابی مهارت",
  review: "مرور و ارزیابی",
};

export const ASSESSMENT_DIFFICULTY_LABELS: Record<
  (typeof ASSESSMENT_DIFFICULTIES)[number],
  string
> = {
  very_easy: "بسیار آسان",
  easy: "آسان",
  medium: "متوسط",
  hard: "سخت",
  very_hard: "بسیار سخت",
};

export const ASSESSMENT_QUESTION_TYPE_LABELS: Record<
  (typeof ASSESSMENT_QUESTION_TYPES)[number],
  string
> = {
  multiple_choice: "چندگزینه‌ای",
  multiple_select: "چند انتخابی",
  fill_blank: "جای خالی",
  ordering: "مرتب‌سازی",
  reading_comprehension: "درک مطلب",
  listening_comprehension: "درک شنیداری",
  short_text: "پاسخ کوتاه",
  speaking_response: "پاسخ گفتاری",
};

export const ASSESSMENT_CUSTOM_EXPERIENCE_MODE_LABELS: Record<
  (
    typeof ASSESSMENT_CUSTOM_EXPERIENCE_MODES
  )[number],
  string
> = {
  quiz: "کوییز",
  exam: "آزمون کامل",
};

export const ASSESSMENT_DIFFICULTY_PROFILE_LABELS: Record<
  (
    typeof ASSESSMENT_DIFFICULTY_PROFILES
  )[number],
  string
> = {
  comfortable:
    "تمرین مطمئن",
  balanced:
    "متعادل",
  challenging:
    "چالش‌برانگیز",
};

export const ASSESSMENT_GENERATION_STATUS_LABELS: Record<
  (
    typeof ASSESSMENT_GENERATION_STATUSES
  )[number],
  string
> = {
  queued:
    "در صف تولید",
  preparing_context:
    "در حال آماده‌سازی اطلاعات",
  generating:
    "در حال تولید توسط AI",
  ready:
    "آماده",
  failed:
    "ناموفق",
};

export const DEFAULT_PLACEMENT_START_LEVEL =
  "B1" as const;

export const DEFAULT_PLACEMENT_MIN_QUESTIONS =
  6;

export const DEFAULT_PLACEMENT_MAX_QUESTIONS =
  24;

export const DEFAULT_PLACEMENT_TARGET_CONFIDENCE =
  85;

export const DEFAULT_PROMOTE_CORRECT_STREAK =
  2;

export const DEFAULT_DEMOTE_INCORRECT_STREAK =
  2;

export const DEFAULT_CUSTOM_QUIZ_QUESTION_COUNT =
  8;

export const DEFAULT_CUSTOM_EXAM_QUESTION_COUNT =
  20;

export const DEFAULT_CUSTOM_QUIZ_MINUTES =
  8;

export const DEFAULT_CUSTOM_EXAM_MINUTES =
  30;