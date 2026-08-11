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
    description: "همه دسته‌بندی‌های نوشتاری",
  },
  {
    value: "تحلیل",
    label: "تحلیل",
    description: "تحلیل موضوعات و ارائه راه‌حل",
  },
  {
    value: "دیدگاه",
    label: "دیدگاه",
    description: "بیان دیدگاه‌های شخصی",
  },
  {
    value: "داستان",
    label: "داستان",
    description: "نوشتن داستان و روایت",
  },
  {
    value: "رسمی",
    label: "رسمی",
    description: "نوشتن متن‌های رسمی",
  },
  {
    value: "توصیف",
    label: "توصیف",
    description: "توصیف تجربیات و مکان‌ها",
  },
  {
    value: "استدلال",
    label: "استدلال",
    description: "ارائه استدلال و منطق",
  },
] as const;

export type WritingCategoryFilter =
  (typeof WRITING_CATEGORIES)[number]["value"];
