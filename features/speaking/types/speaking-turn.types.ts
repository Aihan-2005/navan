import type {
  z,
} from "zod";

import type {
  speakingCoachStyleSchema,
  speakingDifficultySchema,
  speakingModeSchema,
  speakingOverviewSchema,
  speakingScenarioSchema,
  speakingStatsSchema,
} from "../schemas/speaking.schema";

export type SpeakingMode =
  z.infer<
    typeof speakingModeSchema
  >;

export type SpeakingDifficulty =
  z.infer<
    typeof speakingDifficultySchema
  >;

export type SpeakingCoachStyle =
  z.infer<
    typeof speakingCoachStyleSchema
  >;

export type SpeakingScenario =
  z.infer<
    typeof speakingScenarioSchema
  >;

export type SpeakingStats =
  z.infer<
    typeof speakingStatsSchema
  >;

export type SpeakingOverview =
  z.infer<
    typeof speakingOverviewSchema
  >;

export type RecordedAudio =
  Readonly<{
    /**
     * فایل صوتی واقعی ساخته‌شده توسط MediaRecorder.
     */
    blob:
      Blob;

    /**
     * Object URL موقت برای Preview داخل Browser.
     */
    url:
      string;

    /**
     * MIME type واقعی فایل ضبط‌شده.
     *
     * مثال:
     * audio/webm;codecs=opus
     */
    mimeType:
      string;

    /**
     * مدت واقعی ضبط بدون احتساب زمان Pause.
     */
    durationSeconds:
      number;

    /**
     * حجم Blob برای نمایش UI و Validation قبل از Upload.
     */
    sizeBytes:
      number;

    /** * زمان ایجاد Recording.
     */
    createdAt:
      string;
  }>;