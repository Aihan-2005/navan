const MEBIBYTE = 1024 * 1024;

export const CUSTOM_AUDIO_MAX_SIZE_BYTES =
  25 * MEBIBYTE;

export const CUSTOM_AUDIO_MAX_FILENAME_LENGTH =
  180;

export const CUSTOM_AUDIO_FILE_RULES = {
  ".mp3": {
    mimeTypes: [
      "audio/mpeg",
      "audio/mp3",
    ],
  },

  ".wav": {
    mimeTypes: [
      "audio/wav",
      "audio/x-wav",
      "audio/wave",
    ],
  },

  ".m4a": {
    mimeTypes: [
      "audio/mp4",
      "audio/x-m4a",
      "audio/m4a",
    ],
  },

  ".ogg": {
    mimeTypes: [
      "audio/ogg",
      "application/ogg",
    ],
  },

  ".webm": {
    mimeTypes: [
      "audio/webm",
      "video/webm",
    ],
  },
} as const;

export type CustomAudioFileExtension =
  keyof typeof CUSTOM_AUDIO_FILE_RULES;

export const CUSTOM_AUDIO_ACCEPT = Object.keys(
  CUSTOM_AUDIO_FILE_RULES,
).join(",");

export const CUSTOM_AUDIO_STATUS_LABELS = {
  queued: "در صف پردازش",
  validating: "در حال اعتبارسنجی",
  transcribing: "در حال ساخت Transcript",
  ready: "آماده تمرین",
  failed: "پردازش ناموفق",
} as const;