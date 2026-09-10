import type {
  AssessmentSkill,
} from "../types/assessment-question.types";

export type SkillAssessmentCapability =
  | "instant"
  | "pending_analysis";

export type SkillAssessmentCatalogItem =
  Readonly<{
    id: string;

    skill:
      AssessmentSkill;

    title:
      string;

    description:
      string;

    cefrLevel:
      string;

    estimatedMinutes:
      number;

    questionCount:
      number;

    xpReward:
      number;

    capability:
      SkillAssessmentCapability;

    href:
      string;
  }>;

export const SKILL_ASSESSMENT_CATALOG =
  [
    {
      id:
        "skill-check-listening-b1",

      skill:
        "listening",

      title:
        "ارزیابی مهارت شنیداری",

      description:
        "سنجش درک کلی، Context و جزئیات فایل‌های صوتی واقعی.",

      cefrLevel:
        "B1",

      estimatedMinutes:
        8,

      questionCount:
        4,

      xpReward:
        60,

      capability:
        "instant",

      href:
        "/assessment/run/skill-check-listening-b1",
    },

    {
      id:
        "skill-check-speaking-b1",

      skill:
        "speaking",

      title:
        "ارزیابی مهارت مکالمه",

      description:
        "پاسخ صوتی به موقعیت‌های واقعی برای تحلیل Fluency، Grammar و Pronunciation.",

      cefrLevel:
        "B1",

      estimatedMinutes:
        8,

      questionCount:
        4,

      xpReward:
        70,

      capability:
        "pending_analysis",

      href:
        "/assessment/run/skill-check-speaking-b1",
    },

    {
      id:
        "skill-check-reading-b1",

      skill:
        "reading",

      title:
        "ارزیابی مهارت خواندن",

      description:
        "Main Idea، Detail، Inference و درک متن در سطح B1.",

      cefrLevel:
        "B1",

      estimatedMinutes:
        9,

      questionCount:
        4,

      xpReward:
        60,

      capability:
        "instant",

      href:
        "/assessment/run/skill-check-reading-b1",
    },

    {
      id:
        "skill-check-writing-b1",

      skill:
        "writing",

      title:
        "ارزیابی مهارت نوشتن",

      description:
        "نوشتن پاسخ‌های کوتاه برای تحلیل ساختار، واژگان و انسجام متن.",

      cefrLevel:
        "B1",

      estimatedMinutes:
        12,

      questionCount:
        4,

      xpReward:
        70,

      capability:
        "pending_analysis",

      href:
        "/assessment/run/skill-check-writing-b1",
    },

    {
      id:
        "skill-check-grammar-b1",

      skill:
        "grammar",

      title:
        "ارزیابی گرامر",

      description:
        "زمان‌ها، ساختار جمله، شرطی‌ها و ترتیب زمانی.",

      cefrLevel:
        "B1",

      estimatedMinutes:
        6,

      questionCount:
        4,

      xpReward:
        50,

      capability:
        "instant",

      href:
        "/assessment/run/skill-check-grammar-b1",
    },

    {
      id:
        "skill-check-vocabulary-b1",

      skill:
        "vocabulary",

      title:
        "ارزیابی واژگان",

      description:
        "معنی، Context، Collocation و واژگان کاربردی.",

      cefrLevel:
        "B1",

      estimatedMinutes:
        6,

      questionCount:
        4,

      xpReward:
        50,

      capability:
        "instant",

      href:
        "/assessment/run/skill-check-vocabulary-b1",
    },
  ] as const satisfies
    readonly SkillAssessmentCatalogItem[];

    
    