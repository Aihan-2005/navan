import type { SkillType } from "../types/dashboard.types";

export const DASHBOARD_SKILL_LABELS = {
  speaking: "مکالمه",
  listening: "شنیداری",
  reading: "خواندن",
  writing: "نوشتن",
  grammar: "گرامر",
  vocabulary: "واژگان",
} satisfies Record<SkillType, string>;