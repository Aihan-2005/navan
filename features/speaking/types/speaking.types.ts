import type { z } from "zod";

import type {
  speakingCoachStyleSchema,
  speakingDifficultySchema,
  speakingModeSchema,
  speakingOverviewSchema,
  speakingScenarioSchema,
  speakingStatsSchema,
} from "../schemas/speaking.schema";

export type SpeakingMode = z.infer<
  typeof speakingModeSchema
>;

export type SpeakingDifficulty = z.infer<
  typeof speakingDifficultySchema
>;

export type SpeakingCoachStyle = z.infer<
  typeof speakingCoachStyleSchema
>;

export type SpeakingScenario = z.infer<
  typeof speakingScenarioSchema
>;

export type SpeakingStats = z.infer<
  typeof speakingStatsSchema
>;

export type SpeakingOverview = z.infer<
  typeof speakingOverviewSchema
>;

export type RecordedAudio = {
  blob: Blob;
  url: string;
  mimeType: string;
  durationSeconds: number;
};