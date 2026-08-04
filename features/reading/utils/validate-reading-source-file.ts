import {
  READING_MAX_FILENAME_LENGTH,
  READING_SOURCE_FILE_RULES,
  type ReadingSourceFileExtension,
} from "../constants/reading.constants";

import type {
  ReadingSourceFileKind,
} from "../types/reading.types";

export type ReadingSourceFileValidationResult =
  | {
      success: true;

      extension: ReadingSourceFileExtension;
      fileKind: ReadingSourceFileKind;

      normalizedMimeType: string;
      maximumSizeBytes: number;
    }
  | {
      success: false;

      message: string;
    };

export function getReadingSourceFileExtension(
  filename: string,
): ReadingSourceFileExtension | null {
  const normalizedFilename =
    filename.trim().toLowerCase();

  const extension = (
    Object.keys(
      READING_SOURCE_FILE_RULES,
    ) as ReadingSourceFileExtension[]
  ).find((candidate) =>
    normalizedFilename.endsWith(candidate),
  );

  return extension ?? null;
}

export function validateReadingSourceFile(
  file: File | null | undefined,
): ReadingSourceFileValidationResult {
  if (!file) {
    return {
      success: false,
      message: "هیچ فایلی انتخاب نشده است.",
    };
  }

  if (file.size <= 0) {
    return {
      success: false,
      message: "فایل انتخاب‌شده خالی است.",
    };
  }

  if (
    file.name.length >
    READING_MAX_FILENAME_LENGTH
  ) {
    return {
      success: false,

      message:
        "نام فایل بیش از حد طولانی است.",
    };
  }

  const extension =
    getReadingSourceFileExtension(
      file.name,
    );

  if (!extension) {
    return {
      success: false,

      message:
        "فرمت فایل پشتیبانی نمی‌شود. از PDF، DOCX، TXT، JPG، PNG یا WEBP استفاده کن.",
    };
  }

  const rule =
    READING_SOURCE_FILE_RULES[
      extension
    ];

  if (file.size > rule.maxSizeBytes) {
    const maximumMegabytes =
      Math.floor(
        rule.maxSizeBytes /
          (1024 * 1024),
      );

    return {
      success: false,

      message:
        `حجم فایل نباید بیشتر از ${maximumMegabytes} مگابایت باشد.`,
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

      message:
        "نوع واقعی فایل با پسوند آن هماهنگ نیست.",
    };
  }

  return {
    success: true,

    extension,

    fileKind:
      rule.fileKind as ReadingSourceFileKind,

    normalizedMimeType:
      normalizedMimeType ||
      allowedMimeTypes[0],

    maximumSizeBytes:
      rule.maxSizeBytes,
  };
}