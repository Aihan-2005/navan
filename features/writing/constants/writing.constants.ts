export const WRITING_DIFFICULTY_STYLES = {
  "مبتدی":
    "border-emerald-400/15 bg-emerald-400/10 text-emerald-200",

  "متوسط":
    "border-amber-400/15 bg-amber-400/10 text-amber-200",

  "پیشرفته":
    "border-red-400/15 bg-red-400/10 text-red-200",
} satisfies Record<string, string>;

export const WRITING_CATEGORIES = [
  {
    value: "all",
    label: "همه تمرین‌ها",
  },
  {
    value: "تحلیل",
    label: "تحلیل",
  },
  {
    value: "دیدگاه",
    label: "دیدگاه",
  },
  {
    value: "داستان",
    label: "داستان",
  },
  {
    value: "رسمی",
    label: "رسمی",
  },
  {
    value: "توصیف",
    label: "توصیف",
  },
  {
    value: "استدلال",
    label: "استدلال",
  },
] as const;

export type WritingCategoryFilter =
  (typeof WRITING_CATEGORIES)[number]["value"];
