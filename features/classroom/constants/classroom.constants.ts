export const CLASSROOM_CHAT_MESSAGE_MAX_LENGTH =
  4_000;

export const CLASSROOM_SHARED_TEXT_MAX_LENGTH =
  4_000;

export const CLASSROOM_SHARED_TITLE_MAX_LENGTH =
  180;

export const CLASSROOM_SHARED_FILE_MAX_BYTES =
  20 *
  1024 *
  1024;

export const CLASSROOM_SHARED_AUDIO_MAX_BYTES =
  30 *
  1024 *
  1024;

export const CLASSROOM_SPEAKING_ACTIVITY_THRESHOLD =
  0.065;

export const CLASSROOM_BROADCAST_PROTOCOL_VERSION =
  1;

export const CLASSROOM_ALLOWED_DOCUMENT_EXTENSIONS =
  [
    ".pdf",
    ".txt",
    ".doc",
    ".docx",
    ".ppt",
    ".pptx",
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
  ] as const;

export const CLASSROOM_SHARED_FILE_ACCEPT =
  CLASSROOM_ALLOWED_DOCUMENT_EXTENSIONS.join(
    ",",
  );