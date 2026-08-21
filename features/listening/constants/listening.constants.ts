import type {
  ListeningAccent,
  ListeningContentStatus,
  ListeningContentType,
  ListeningPracticeMode,
  ListeningSourceType,
} from "../types/listening.types";


export const LISTENING_CONTENT_TYPE_LABELS = {
  podcast: "پادکست",
  conversation: "مکالمه",
  story: "داستان",
  news: "خبر کوتاه",
  interview: "مصاحبه",
  lecture: "سخنرانی",
  exam: "تمرین آزمون",
  custom: "محتوای شخصی",
} satisfies Record<
  ListeningContentType,
  string
>;


export const LISTENING_SOURCE_TYPE_LABELS = {
  platform: "محتوای برنامه",
  user_upload: "فایل آپلودشده",
  external_url: "لینک خارجی",
} satisfies Record<
  ListeningSourceType,
  string
>;


export const LISTENING_PRACTICE_MODE_LABELS = {
  listen_only: "فقط گوش دادن",
  full_dictation: "رونویسی کامل",
  guided_dictation: "رونویسی هدایت‌شده",
  fill_in_the_blank: "جای خالی",
  comprehension: "درک مطلب",
  shadowing: "Shadowing",
} satisfies Record<
  ListeningPracticeMode,
  string
>;


export const LISTENING_ACCENT_LABELS = {
  american: "آمریکایی",
  british: "بریتانیایی",
  australian: "استرالیایی",
  canadian: "کانادایی",
  mixed: "ترکیبی",
  unknown: "نامشخص",
} satisfies Record<
  ListeningAccent,
  string
>;


export const LISTENING_CONTENT_STATUS_LABELS = {
  ready: "آماده تمرین",
  processing: "در حال آماده‌سازی",
  coming_soon: "به‌زودی",
} satisfies Record<
  ListeningContentStatus,
  string
>;


export const LISTENING_PLAYBACK_SPEEDS = [
  0.5,
  0.75,
  1,
  1.25,
  1.5,
] as const;


export const LISTENING_DEFAULT_REWIND_SECONDS =
  5;


export const LISTENING_MAX_AUDIO_DURATION_SECONDS =
  20 * 60;


export const LISTENING_MAX_AUDIO_SIZE_BYTES =
  25 * 1024 * 1024;


export const LISTENING_MAX_NOTES_SIZE_BYTES =
  10 * 1024 * 1024;


export const LISTENING_MAX_EXTRACTED_TEXT_LENGTH =
  25_000;


export const LISTENING_MAX_NOTES_FILENAME_LENGTH =
  180;


const MEBIBYTE =
  1024 * 1024;


export const LISTENING_NOTES_FILE_RULES = {
  ".txt": {
    fileKind: "text",
    maxSizeBytes:
      2 * MEBIBYTE,
    mimeTypes: [
      "text/plain",
    ],
  },

  ".docx": {
    fileKind: "document",
    maxSizeBytes:
      10 * MEBIBYTE,

    mimeTypes: [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
  },

  ".pdf": {
    fileKind: "document",
    maxSizeBytes:
      10 * MEBIBYTE,

    mimeTypes: [
      "application/pdf",
    ],
  },

  ".jpg": {
    fileKind: "image",
    maxSizeBytes:
      8 * MEBIBYTE,

    mimeTypes: [
      "image/jpeg",
    ],
  },

  ".jpeg": {
    fileKind: "image",
    maxSizeBytes:
      8 * MEBIBYTE,

    mimeTypes: [
      "image/jpeg",
    ],
  },

  ".png": {
    fileKind: "image",
    maxSizeBytes:
      8 * MEBIBYTE,

    mimeTypes: [
      "image/png",
    ],
  },

  ".webp": {
    fileKind: "image",
    maxSizeBytes:
      8 * MEBIBYTE,

    mimeTypes: [
      "image/webp",
    ],
  },
} as const;


export type ListeningNotesFileExtension =
  keyof typeof LISTENING_NOTES_FILE_RULES;


export const LISTENING_NOTES_ACCEPT =
  Object.keys(
    LISTENING_NOTES_FILE_RULES,
  ).join(",");