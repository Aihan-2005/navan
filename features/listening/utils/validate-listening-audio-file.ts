import {
  CUSTOM_AUDIO_FILE_RULES,
  CUSTOM_AUDIO_MAX_FILENAME_LENGTH,
  CUSTOM_AUDIO_MAX_SIZE_BYTES,
  type CustomAudioFileExtension,
} from "../constants/listening-custom-source.constants";

export type AudioFileValidationResult =
  | {
      success: true;

      extension: CustomAudioFileExtension;
      normalizedMimeType: string;
    }
  | {
      success: false;

      message: string;
    };

export function getCustomAudioFileExtension(
  filename: string,
): CustomAudioFileExtension | null {
  const normalizedFilename =
    filename.trim().toLowerCase();

  const extension = (
    Object.keys(
      CUSTOM_AUDIO_FILE_RULES,
    ) as CustomAudioFileExtension[]
  ).find((candidate) =>
    normalizedFilename.endsWith(candidate),
  );

  return extension ?? null;
}

export function validateListeningAudioFile(
  file: File | null | undefined,
): AudioFileValidationResult {
  if (!file) {
    return {
      success: false,
      message: "هیچ فایل صوتی انتخاب نشده است.",
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
    CUSTOM_AUDIO_MAX_FILENAME_LENGTH
  ) {
    return {
      success: false,

      message:
        "نام فایل بیش از حد طولانی است.",
    };
  }

  if (
    file.size >
    CUSTOM_AUDIO_MAX_SIZE_BYTES
  ) {
    return {
      success: false,

      message:
        "حجم فایل صوتی نباید بیشتر از ۲۵ مگابایت باشد.",
    };
  }

  const extension =
    getCustomAudioFileExtension(file.name);

  if (!extension) {
    return {
      success: false,

      message:
        "فرمت صوتی پشتیبانی نمی‌شود. از MP3، WAV، M4A، OGG یا WEBM استفاده کن.",
    };
  }

  const rule =
    CUSTOM_AUDIO_FILE_RULES[extension];

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
        "نوع واقعی فایل با پسوند انتخاب‌شده هماهنگ نیست.",
    };
  }

  return {
    success: true,

    extension,

    normalizedMimeType:
      normalizedMimeType ||
      allowedMimeTypes[0],
  };
}