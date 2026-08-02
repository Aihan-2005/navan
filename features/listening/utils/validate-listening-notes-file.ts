import {
  LISTENING_MAX_NOTES_FILENAME_LENGTH,
  LISTENING_NOTES_FILE_RULES,
  type ListeningNotesFileExtension,
} from "../constants/listening.constants";

import type {
  ListeningNoteFileKind,
} from "../types/listening.types";

export type ListeningNotesFileValidationErrorCode =
  | "missing_file"
  | "empty_file"
  | "filename_too_long"
  | "unsupported_extension"
  | "invalid_mime_type"
  | "file_too_large";

export type ListeningNotesFileValidationResult =
  | {
      success: true;

      extension: ListeningNotesFileExtension;
      fileKind: ListeningNoteFileKind;

      normalizedMimeType: string;
      maximumSizeBytes: number;
    }
  | {
      success: false;

      code: ListeningNotesFileValidationErrorCode;
      message: string;
    };

export function getListeningNotesFileExtension(
  filename: string,
): ListeningNotesFileExtension | null {
  const normalizedFilename =
    filename.trim().toLowerCase();

  const matchingExtension = (
    Object.keys(
      LISTENING_NOTES_FILE_RULES,
    ) as ListeningNotesFileExtension[]
  ).find((extension) =>
    normalizedFilename.endsWith(extension),
  );

  return matchingExtension ?? null;
}

export function validateListeningNotesFile(
  file: File | null | undefined,
): ListeningNotesFileValidationResult {
  if (!file) {
    return {
      success: false,
      code: "missing_file",
      message: "هیچ فایلی انتخاب نشده است.",
    };
  }

  if (file.size <= 0) {
    return {
      success: false,
      code: "empty_file",
      message: "فایل انتخاب‌شده خالی است.",
    };
  }

  if (
    file.name.length >
    LISTENING_MAX_NOTES_FILENAME_LENGTH
  ) {
    return {
      success: false,
      code: "filename_too_long",

      message:
        "نام فایل بیش از حد طولانی است. نام کوتاه‌تری انتخاب کن.",
    };
  }

  const extension =
    getListeningNotesFileExtension(
      file.name,
    );

  if (!extension) {
    return {
      success: false,
      code: "unsupported_extension",

      message:
        "فرمت فایل پشتیبانی نمی‌شود. از TXT، DOCX، PDF، JPG، PNG یا WEBP استفاده کن.",
    };
  }

  const rule =
    LISTENING_NOTES_FILE_RULES[
      extension
    ];

  if (file.size > rule.maxSizeBytes) {
    const maximumSizeInMegabytes =
      Math.floor(
        rule.maxSizeBytes /
          (1024 * 1024),
      );

    return {
      success: false,
      code: "file_too_large",

      message:
        `حجم فایل نباید بیشتر از ${maximumSizeInMegabytes} مگابایت باشد.`,
    };
  }

  const normalizedMimeType =
    file.type.trim().toLowerCase();

  const allowedMimeTypes =
    rule.mimeTypes as readonly string[];

  if (
    normalizedMimeType &&
    !allowedMimeTypes.includes(
      normalizedMimeType,
    )
  ) {
    return {
      success: false,
      code: "invalid_mime_type",

      message:
        "نوع واقعی فایل با پسوند آن هماهنگ نیست.",
    };
  }

  return {
    success: true,

    extension,
    fileKind: rule.fileKind,

    normalizedMimeType:
      normalizedMimeType ||
      allowedMimeTypes[0],

    maximumSizeBytes:
      rule.maxSizeBytes,
  };
}