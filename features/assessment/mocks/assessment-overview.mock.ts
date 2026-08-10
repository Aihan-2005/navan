import type {
  AssessmentMiniQuizSummary,
} from "../types/assessment-overview.types";

export const assessmentMiniQuizzesMock = [
  {
    id:
      "grammar-b1-quick-check",

    title:
      "Grammar Quick Check",

    description:
      "یک ارزیابی کوتاه برای زمان‌ها، ساختار جمله و Conditionals سطح B1.",

    skill: "grammar",

    cefrLevel: "B1",

    estimatedMinutes: 4,

    questionCount: 5,

    xpReward: 40,

    focusTags: [
      "Tenses",
      "Conditionals",
      "Sentence Structure",
    ],

    status:
      "coming_soon",

    href: null,
  },

  {
    id:
      "vocabulary-b1-context",

    title:
      "Vocabulary in Context",

    description:
      "کوییز کوتاه برای بررسی معنی واژه، Collocation و انتخاب واژه در Context.",

    skill: "vocabulary",

    cefrLevel: "B1",

    estimatedMinutes: 4,

    questionCount: 6,

    xpReward: 45,

    focusTags: [
      "Meaning",
      "Context",
      "Collocations",
    ],

    status:
      "coming_soon",

    href: null,
  },

  {
    id:
      "reading-b1-inference",

    title:
      "Reading Inference Check",

    description:
      "تمرکز روی Main Idea، Detail Accuracy و استنتاج از متن.",

    skill: "reading",

    cefrLevel: "B1",

    estimatedMinutes: 6,

    questionCount: 5,

    xpReward: 55,

    focusTags: [
      "Main Idea",
      "Detail",
      "Inference",
    ],

    status:
      "coming_soon",

    href: null,
  },

  {
    id:
      "listening-b1-detail",

    title:
      "Listening Detail Check",

    description:
      "ارزیابی کوتاه درک جزئیات و پیام اصلی فایل شنیداری.",

    skill: "listening",

    cefrLevel: "B1",

    estimatedMinutes: 6,

    questionCount: 5,

    xpReward: 55,

    focusTags: [
      "Main Idea",
      "Detail",
      "Listening",
    ],

    status:
      "coming_soon",

    href: null,
  },
] satisfies readonly AssessmentMiniQuizSummary[];