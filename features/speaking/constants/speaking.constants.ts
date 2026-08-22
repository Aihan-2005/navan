import type {
  SpeakingCoachStyle,
  SpeakingDifficulty,
  SpeakingMode,
} from "../types/speaking.types";

export const SPEAKING_MODE_LABELS = {
  roleplay: "نقش‌آفرینی",
  pronunciation: "آزمایشگاه تلفظ",
  shadowing: "Shadowing",
  quick_response: "پاسخ سریع",
  storytelling: "داستان‌گویی",
  debate: "مربی مناظره",
} satisfies Record<SpeakingMode, string>;

export const SPEAKING_MODE_DESCRIPTIONS = {
  roleplay:
    "مکالمه در موقعیت‌های واقعی مانند رستوران، فرودگاه و مصاحبه",

  pronunciation:
    "تمرکز روی تلفظ صحیح صداها، کلمات و عبارت‌های دشوار",

  shadowing:
    "گوش‌دادن، تقلید هم‌زمان و نزدیک‌شدن به ریتم طبیعی زبان",

  quick_response:
    "پاسخ به پرسش‌های کوتاه برای افزایش سرعت فکر و صحبت",

  storytelling:
    "تعریف داستان و تقویت پیوستگی، واژگان و ساختار جمله",

  debate:
    "دفاع از دیدگاه و یادگیری بیان استدلال به زبان انگلیسی",
} satisfies Record<SpeakingMode, string>;

export const SPEAKING_DIFFICULTY_LABELS = {
  beginner: "مقدماتی",
  intermediate: "متوسط",
  advanced: "پیشرفته",
} satisfies Record<SpeakingDifficulty, string>;

export const SPEAKING_COACH_STYLE_LABELS = {
  supportive: "حمایتی",
  balanced: "متعادل",
  strict: "سخت‌گیرانه",
} satisfies Record<SpeakingCoachStyle, string>;

export const SPEAKING_MODE_FILTERS = [
  {
    value: "all",
    label: "همه تمرین‌ها",
  },
  {
    value: "roleplay",
    label: "نقش‌آفرینی",
  },
  {
    value: "pronunciation",
    label: "تلفظ",
  },
  {
    value: "shadowing",
    label: "Shadowing",
  },
  {
    value: "quick_response",
    label: "پاسخ سریع",
  },
  {
    value: "storytelling",
    label: "داستان‌گویی",
  },
  {
    value: "debate",
    label: "مناظره",
  },
] as const;

export type SpeakingModeFilter =
  (typeof SPEAKING_MODE_FILTERS)[number]["value"];