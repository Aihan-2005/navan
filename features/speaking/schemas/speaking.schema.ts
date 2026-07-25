import { z } from "zod";

export const speakingModeSchema = z.enum([
  "roleplay",
  "pronunciation",
  "shadowing",
  "quick_response",
  "storytelling",
  "debate",
]);

export const speakingDifficultySchema = z.enum([
  "beginner",
  "intermediate",
  "advanced",
]);

export const speakingCoachStyleSchema = z.enum([
  "supportive",
  "balanced",
  "strict",
]);

export const speakingScenarioSchema = z.object({
  id: z.string().trim().min(1),

  title: z.string().trim().min(1),
  description: z.string().trim().min(1),

  mode: speakingModeSchema,
  difficulty: speakingDifficultySchema,
  coachStyle: speakingCoachStyleSchema,

  cefrLevel: z.enum([
    "A1",
    "A2",
    "B1",
    "B2",
    "C1",
    "C2",
  ]),

  estimatedMinutes: z.number().int().positive(),

  prompt: z.string().trim().min(1),
  aiRole: z.string().trim().min(1),

  focusAreas: z.array(z.string().trim().min(1)).min(1),
  starterPhrases: z.array(z.string().trim().min(1)),

  isFeatured: z.boolean(),
  isAvailable: z.boolean(),
});

export const speakingStatsSchema = z.object({
  totalSessions: z.number().int().nonnegative(),
  weeklyMinutes: z.number().int().nonnegative(),

  averageFluencyScore: z.number().min(0).max(100),
  pronunciationScore: z.number().min(0).max(100),

  currentStreak: z.number().int().nonnegative(),
});

export const speakingOverviewSchema = z.object({
  stats: speakingStatsSchema,
  scenarios: z.array(speakingScenarioSchema),
});