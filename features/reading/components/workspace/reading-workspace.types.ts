export type ReadingFontSize =
  | "compact"
  | "comfortable"
  | "large";

export type ReadingWorkspaceTab =
  | "content"
  | "vocabulary"
  | "grammar"
  | "expressions"
  | "quiz";

export type ReadingPlaybackState =
  | "idle"
  | "playing"
  | "paused";

export type ReadingPlaybackRate =
  | 0.75
  | 1
  | 1.25
  | 1.5;

export const READING_FONT_SIZE_OPTIONS = [
  {
    value:
      "compact",

    label:
      "کوچک",
  },

  {
    value:
      "comfortable",

    label:
      "متوسط",
  },

  {
    value:
      "large",

    label:
      "بزرگ",
  },
] as const satisfies readonly {
  value:
    ReadingFontSize;

  label:
    string;
}[];

export const READING_PLAYBACK_RATE_OPTIONS = [
  0.75,
  1,
  1.25,
  1.5,
] as const satisfies readonly ReadingPlaybackRate[];