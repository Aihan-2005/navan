import type {
  ReadingAudioStatus,
  ReadingProcessingStatus,
  ReadingResourceStatus,
  ReadingResourceType,
  ReadingSectionStatus,
  ReadingSourceFileKind,
  ReadingSourceType,
} from "../types/reading.types";

export const READING_RESOURCE_TYPE_LABELS = {
  book: "کتاب",
  graded_reader: "کتاب سطح‌بندی‌شده",
  short_story: "داستان کوتاه",
  article: "مقاله",
  lesson: "درس آموزشی",
  image_text: "متن تصویری",
  document: "فایل شخصی",
} satisfies Record<
  ReadingResourceType,
  string
>;

export const READING_SOURCE_TYPE_LABELS = {
  platform: "کتابخانه MeowLingo",
  user_upload: "منبع شخصی",
} satisfies Record<
  ReadingSourceType,
  string
>;

export const READING_RESOURCE_STATUS_LABELS = {
  ready: "آماده مطالعه",
  processing: "در حال آماده‌سازی",
  coming_soon: "به‌زودی",
  failed: "پردازش ناموفق",
} satisfies Record<
  ReadingResourceStatus,
  string
>;

export const READING_PROCESSING_STATUS_LABELS = {
  queued: "در صف پردازش",
  extracting: "در حال استخراج متن",
  analyzing: "در حال تحلیل متن",
  segmenting: "در حال بخش‌بندی",
  generating_audio: "در حال تولید صوت",
  ready: "آماده مطالعه",
  failed: "پردازش ناموفق",
} satisfies Record<
  ReadingProcessingStatus,
  string
>;

export const READING_SECTION_STATUS_LABELS = {
  locked: "قفل‌شده",
  available: "آماده شروع",
  in_progress: "در حال مطالعه",
  completed: "تکمیل‌شده",
} satisfies Record<
  ReadingSectionStatus,
  string
>;

export const READING_AUDIO_STATUS_LABELS = {
  not_started: "تولید نشده",
  generating: "در حال تولید",
  ready: "آماده پخش",
  failed: "تولید ناموفق",
} satisfies Record<
  ReadingAudioStatus,
  string
>;

export const READING_SOURCE_FILE_KIND_LABELS = {
  pdf: "PDF",
  docx: "Word",
  txt: "Text",
  image: "تصویر",
} satisfies Record<
  ReadingSourceFileKind,
  string
>;

export const READING_SUPPORTED_UPLOAD_LABELS = [
  "PDF",
  "DOCX",
  "TXT",
  "JPG",
  "PNG",
  "WEBP",
] as const;

const MEBIBYTE = 1024 * 1024;

export const READING_SOURCE_FILE_RULES = {
  ".pdf": {
    fileKind: "pdf",
    maxSizeBytes: 20 * MEBIBYTE,
    mimeTypes: ["application/pdf"],
  },

  ".docx": {
    fileKind: "docx",
    maxSizeBytes: 15 * MEBIBYTE,

    mimeTypes: [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
  },

  ".txt": {
    fileKind: "txt",
    maxSizeBytes: 5 * MEBIBYTE,
    mimeTypes: ["text/plain"],
  },

  ".jpg": {
    fileKind: "image",
    maxSizeBytes: 10 * MEBIBYTE,
    mimeTypes: ["image/jpeg"],
  },

  ".jpeg": {
    fileKind: "image",
    maxSizeBytes: 10 * MEBIBYTE,
    mimeTypes: ["image/jpeg"],
  },

  ".png": {
    fileKind: "image",
    maxSizeBytes: 10 * MEBIBYTE,
    mimeTypes: ["image/png"],
  },

  ".webp": {
    fileKind: "image",
    maxSizeBytes: 10 * MEBIBYTE,
    mimeTypes: ["image/webp"],
  },
} as const;

export type ReadingSourceFileExtension =
  keyof typeof READING_SOURCE_FILE_RULES;

export const READING_SOURCE_ACCEPT =
  Object.keys(
    READING_SOURCE_FILE_RULES,
  ).join(",");

export const READING_MAX_FILENAME_LENGTH =
  180;

export const READING_PROCESSING_PIPELINE = [
  "queued",
  "extracting",
  "analyzing",
  "segmenting",
  "generating_audio",
  "ready",
] as const satisfies readonly ReadingProcessingStatus[];