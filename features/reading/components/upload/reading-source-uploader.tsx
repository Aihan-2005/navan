"use client";

import Link from "next/link";

import {
  Check,
  CheckCircle2,
  ChevronLeft,
  FileText,
  Image as ImageIcon,
  LoaderCircle,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Trash2,
  UploadCloud,
} from "lucide-react";

import {
  useRef,
  useState,
} from "react";

import {
  cn,
} from "../../../../lib/utils/cn";

import {
  uploadReadingSource,
} from "../../api/upload-reading-source";

import {
  READING_SOURCE_ACCEPT,
  READING_SOURCE_FILE_KIND_LABELS,
  READING_SUPPORTED_UPLOAD_LABELS,
} from "../../constants/reading.constants";

import type {
  ReadingCefrLevel,
} from "../../types/reading.types";

import type {
  ReadingUploadMetadata,
  ReadingUploadResult,
} from "../../types/reading-upload.types";

import {
  validateReadingSourceFile,
} from "../../utils/validate-reading-source-file";

type UploadPhase =
  | "idle"
  | "uploading"
  | "processing"
  | "error";

const DEFAULT_METADATA:
  ReadingUploadMetadata = {
  title:null,

  languageCode:
    "en",

  cefrLevel:
    null,

  options: {
    analysisMode:
      "deep",

    sectionLength:
      "balanced",

    generateAudio:
      true,

    extractVocabulary:
      true,

    extractGrammar:
      true,

    generateQuestions:
      true,

    questionsPerSection:
      3,
  },
};const CEFR_LEVELS:
  readonly ReadingCefrLevel[] =
    [
      "A1",
      "A2",
      "B1",
      "B2",
      "C1",
      "C2",
    ];

const numberFormatter =
  new Intl.NumberFormat(
    "fa-IR",
    {
      maximumFractionDigits:
        1,
    },
  );

function formatFileSize(
  bytes:
    number,
): string {
  const megabytes =
    bytes /
    (1024 * 1024);

  if (megabytes >= 1) {
    return `${numberFormatter.format(
      megabytes,    )} مگابایت`;
  }

  return `${numberFormatter.format(
    bytes / 1024,
  )} کیلوبایت`;
}

function getFileTitle(
  filename:
    string,
): string {
  return filename.replace(
    /\.[^.]+$/u,
    "",
  );
}

export function ReadingSourceUploader() {
  const inputRef =
    useRef<HTMLInputElement | null>(
      null,
    );

  const abortControllerRef =
    useRef<AbortController | null>(
      null,
    );const [
    file,
    setFile,
  ] =
    useState<File | null>(
      null,
    );

  const [
    metadata,
    setMetadata,
  ] =
    useState<ReadingUploadMetadata>(
      DEFAULT_METADATA,
    );

  const [
    phase,
    setPhase,
  ] =
    useState<UploadPhase>(
      "idle",
    );

  const [
    uploadProgress,
    setUploadProgress,
  ] =
    useState(0);
const [
    isDragging,
    setIsDragging,
  ] =
    useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] =
    useState<string | null>(
      null,
    );

  const [
    result,
    setResult,
  ] =
    useState<ReadingUploadResult | null>(
      null,
    );

  const isUploading =
    phase ===
    "uploading";

  const fileValidation =
    file
      ? validateReadingSourceFile(
          file,
        ): null;

  function updateMetadata(
    patch:
      Partial<ReadingUploadMetadata>,
  ): void {
    setMetadata(
      (current) => ({
        ...current,
        ...patch,
      }),
    );
  }

  function updateOption<
    TKey extends keyof ReadingUploadMetadata["options"],
  >(
    key:
      TKey,
    value:
      ReadingUploadMetadata["options"][TKey],
  ): void {
    setMetadata(
      (current) => ({
        ...current,

        options: {
          ...current.options,

          [key]:
            value,
        },
      }),
    );
  }

  function selectFile(
    selectedFile:
      File,
  ): void {
    const validation =
      validateReadingSourceFile(
        selectedFile,
      );

    if (!validation.success) {
      setFile(
        null,
      );

      setResult(
        null,
      );

      setErrorMessage(
        validation.message,
      );
setPhase(
        "error",
      );

      return;
    }

    abortControllerRef.current?.abort();

    setFile(
      selectedFile,
    );

    setUploadProgress(
      0,
    );

    setResult(
      null,
    );

    setErrorMessage(
      null,
    );

    setPhase(
      "idle",
    );
setMetadata(
      (current) => ({
        ...current,

        title:
          current.title ??
          getFileTitle(
            selectedFile.name,
          ),
      }),
    );
  }

  function removeFile(): void {
    if (
      isUploading
    ) {
      return;
    }

    setFile(
      null,
    );

    setResult(
      null,
    );

    setUploadProgress(
      0,
    );setErrorMessage(
      null,
    );

    setPhase(
      "idle",
    );

    setMetadata(
      DEFAULT_METADATA,
    );

    if (
      inputRef.current
    ) {
      inputRef.current.value =
        "";
    }
  }

  function resetForm(): void {
    abortControllerRef.current?.abort();

    abortControllerRef.current =
      null;

    setFile(
      null,
    );

    setMetadata( DEFAULT_METADATA,
    );

    setPhase(
      "idle",
    );

    setUploadProgress(
      0,
    );

    setIsDragging(
      false,
    );

    setErrorMessage(
      null,
    );

    setResult(
      null,
    ); if (
      inputRef.current
    ) {
      inputRef.current.value =
        "";
    }
  }

  function cancelUpload(): void {
    abortControllerRef.current?.abort();

    abortControllerRef.current =
      null;

    setPhase(
      "idle",
    );

    setUploadProgress(
      0,
    );

    setErrorMessage(
      null,
    );
  }

  async function handleSubmit(): Promise<void> {
    if (!file) {
      setErrorMessage(
        "ابتدا فایل موردنظر را انتخاب کابتدا فایل موردنظر را انتخاب کن.",
      );

      setPhase(
        "error",
      );

      return;
    }

    const validation =
      validateReadingSourceFile(
        file,
      );

    if (!validation.success) {
      setErrorMessage(
        validation.message,
      );

      setPhase(
        "error",
      );

      return;
    }

    abortControllerRef.current?.abort();

    const controller =
      new AbortController();

    abortControllerRef.current =
      controller;

    setUploadProgress(
      0,
    );

    setErrorMessage(
      null,
    );

    setResult(
      null,
    );

    setPhase(
      "uploading",
    );

    try {
      const uploadResult =
        await uploadReadingSource(
          file,
          metadata,
          {
            signal:
              controller.signal,

            onProgress:
              (progress) => {
                setUploadProgress(
                  progress,
                );
              },
          },
        );

      if (
        controller.signal.aborted
      ) {
        return;
      }

      setUploadProgress(
        100,
      );

      setResult(
        uploadResult,
      );

      setPhase(
        "processing",
      );
    } catch (error) {
      if (
        error instanceof
          DOMException &&
        error.name ===
          "AbortError"
      ) {
        setPhase(
          "idle",
        );

        return;
      }

      console.error(
        "Reading source upload failed:",
        error,
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "آپلود فایل ناموفق بود.",
      );

      setPhase(
        "error",
      );
    } finally {
      if (
        abortControllerRef.current ===
        controller
      ) {
        abortControllerRef.current =
          null;
      }
    }
  }

  return (
    <main
      aria-labelledby="reading-upload-title"
      style={{
        fontFamily:
          "var(--font-vazirmatn)",
      }}
      className="
        mx-auto
        w-full
        max-w-[936px]
        pb-8
        text-[#191C1E]
      "
    >
      <header
        className="
          min-h-[72px]
          pb-2
        "
      >
        <h1
          id="reading-upload-title"
          className="
            text-[28px]
            font-bold
            leading-9
            tracking-[-0.01em]
            text-[#191C1E]
          "
        >
          افزودن منبع
        </h1>

        <p
          className="
            mt-3
            text-base
            font-normal
            leading-6
            text-[#3D4947]
          "
        >
          فایل شخصی خود را اضافه کن تا متن استخراج، سطح‌بندی و برای مطالعه آماده شود.
        </p>
      </header>

      <input
        ref={
          inputRef
        }
        type="file"
        accept={
          READING_SOURCE_ACCEPT
        }
        disabled={
          isUploading
        }
        className="sr-only"
        aria-label="انتخاب فایل Reading"
        onChange={(
          event,
        ) => {
          const selectedFile =
            event.target.files?.[0];

          if (
            selectedFile
          ) {
            selectFile(
              selectedFile,
            );
          }

          event.target.value =
            "";
        }}
      />

      <section
        className="
          mt-6
          rounded-2xl
          border
          border-[#BCC9C6]/40
          bg-white
          p-6
          shadow-[0_4px_20px_rgba(0,0,0,0.04)]
          sm:p-8
        "
      >
        <div
          role="button"
          tabIndex={
            isUploading
              ? -1
              : 0
          }
          aria-disabled={
            isUploading
          }
          onClick={() => {
            if (
              !isUploading
            ) {
              inputRef.current?.click();
            }
          }}
          onKeyDown={(
            event,
          ) => {
            if (
              isUploading
            ) {
              return;
            }

            if (
              event.key ===
                "Enter" ||
              event.key ===
                " "
            ) {
              event.preventDefault();

              inputRef.current?.click();
            }
          }}
          onDragOver={(
            event,
          ) => {
            event.preventDefault();

            if (
              isUploading
            ) {
              return;
            }

            event.dataTransfer.dropEffect =
              "copy";

            setIsDragging(
              true,
            );
          }}
          onDragLeave={() => {
            setIsDragging(
              false,
            );
          }}
          onDrop={(
            event,
          ) => {
            event.preventDefault();

            setIsDragging(
              false,
            );

            if (
              isUploading
            ) {
              return;
            }

            const droppedFile =
              event.dataTransfer.files[0];

            if (
              droppedFile
            ) {
              selectFile(
                droppedFile,
              );
            }
          }}
          className={cn(
            "flex",
            "min-h-[260px]",
            "cursor-pointer",
            "flex-col",
            "items-center",
            "justify-center",
            "rounded-2xl",
            "border-2",
            "border-dashed",
            "px-6",
            "text-center",
            "transition",

            isDragging
              ? [
                  "border-[#008378]",
                  "bg-[#EDF8F6]",
                ]
              : [
                  "border-[#BCC9C6]",
                  "bg-[#F7F9FB]",
                  "hover:border-[#008378]",
                  "hover:bg-[#F0F8F7]",
                ],

            isUploading &&
              "cursor-not-allowed opacity-70",
          )}
        >
          <span
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-white
              text-[#00685F]
              shadow-[0_1px_2px_rgba(0,0,0,0.06)]
            "
          >
            <UploadCloud
              aria-hidden="true"
              className="
                h-7
                w-7
              "
            />
          </span>

          <h2
            className="
              mt-5
              text-[20px]
              font-bold
              leading-7
              text-[#191C1E]
            "
          >
            فایل را اینجا رها کن
          </h2>

          <p
            className="
              mt-2
              text-sm
              leading-6
              text-[#64748B]
            "
          >
            یا برای انتخاب فایل از سیستم کلیک کن
          </p>

          <span
            className="
              mt-5
              inline-flex
              h-9
              items-center
              justify-center
              rounded-lg
              bg-[#00685F]
              px-5
              text-sm
              font-bold
              text-white
              shadow-[0_1px_2px_rgba(0,0,0,0.05)]
            "
          >
            انتخاب فایل
          </span>

          <div
            className="
              mt-5
              flex
              flex-wrap
              items-center
              justify-center
              gap-2
            "
          >
            {READING_SUPPORTED_UPLOAD_LABELS.map(
              (label) => (
                <span
                  key={
                    label
                  }
                  className="
                    rounded
                    border
                    border-[#BCC9C6]/50
                    bg-white
                    px-2
                    py-1
                    text-[10px]
                    font-medium
                    tracking-[0.05em]
                    text-[#64748B]
                  "
                >
                  {label}
                </span>
              ),
            )}
          </div>
        </div>

        {file &&
        fileValidation?.success ? (
          <div
            className="
              mt-5
              flex
              items-center
              gap-4
              rounded-xl
              border
              border-[#BCC9C6]/40
              bg-[#F7F9FB]
              p-4
            "
          >
            <span
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[#008378]/10
                text-[#00685F]
              "
            >
              {fileValidation.fileKind ===
              "image" ? (
                <ImageIcon
                  aria-hidden="true"
                  className="
                    h-5
                    w-5
                  "
                />
              ) : (
                <FileText
                  aria-hidden="true"
                  className="
                    h-5
                    w-5
                  "
                />
              )}
            </span>

            <div
              className="
                min-w-0
                flex-1
              "
            >
              <p
                dir="ltr"
                className="
                  truncate
                  text-left
                  text-sm
                  font-bold
                  text-[#191C1E]
                "
              >
                {file.name}
              </p>

              <div
                className="
                  mt-1
                  flex
                  flex-wrap
                  gap-3
                  text-xs
                  text-[#64748B]
                "
              >
                <span>
                  {formatFileSize(
                    file.size,
                  )}
                </span>

                <span>
                  {
                    READING_SOURCE_FILE_KIND_LABELS[
                      fileValidation.fileKind
                    ]
                  }
                </span>
              </div>
            </div>

            {!isUploading ? (
              <button
                type="button"
                onClick={(
                  event,
                ) => {
                  event.stopPropagation();

                  removeFile();
                }}
                aria-label="حذف فایل انتخاب شده"
                className="
                  inline-flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-[#DCE5E3]
                  bg-white
                  text-[#64748B]
                  transition
                  hover:border-red-200
                  hover:bg-red-50
                  hover:text-red-600
                "
              >
                <Trash2
                  aria-hidden="true"
                  className="
                    h-4
                    w-4
                  "
                />
              </button>
            ) : null}
          </div>
        ) : null}
      </section>

      {file ? (
        <section
          className="
            mt-6
            rounded-2xl
            border
            border-[#BCC9C6]/40
            bg-white
            p-6
            shadow-[0_4px_20px_rgba(0,0,0,0.04)]
          "
        >
          <div
            className="
              flex
              items-start
              gap-3
            "
          >
            <span
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[#008378]/10
                text-[#00685F]
              "
            >
              <Sparkles
                aria-hidden="true"
                className="
                  h-5
                  w-5
                "
              />
            </span>

            <div>
              <h2
                className="
                  text-lg
                  font-bold
                  text-[#191C1E]
                "
              >
                تنظیمات تحلیل
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  leading-6
                  text-[#64748B]
                "
              >
                قبل از شروع تحلیل، اطلاعات و نحوه آماده‌سازی متن را مشخص کن.
              </p>
            </div>
          </div>

          <div
            className="
              mt-6
              grid
              gap-4
              md:grid-cols-2
            "
          >
            <label
              className="
                md:col-span-2
              "
            >
              <span
                className="
                  text-sm
                  font-medium
                  text-[#3D4947]
                "
              >
                عنوان منبع
              </span>

              <input
                type="text"
                value={
                  metadata.title ??
                  ""
                }
                disabled={
                  isUploading
                }
                onChange={(
                  event,
                ) => {
                  updateMetadata({
                    title:
                      event.target.value ||
                      null,
                  });
                }}
                className="
                  mt-2
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-[#BCC9C6]
                  bg-white
                  px-4
                  text-sm
                  text-[#191C1E]
                  outline-none
                  transition
                  focus:border-[#008378]
                  focus:ring-2
                  focus:ring-[#008378]/10
                "
              />
            </label>

            <label>
              <span
                className="
                  text-sm
                  font-medium
                  text-[#3D4947]
                "
              >
                زبان متن
              </span>

              <select
                value={
                  metadata.languageCode
                }
                disabled={
                  isUploading
                }
                onChange={(
                  event,
                ) => {
                  updateMetadata({
                    languageCode:
                      event.target.value,
                  });
                }}
                className="
                  mt-2
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-[#BCC9C6]
                  bg-white
                  px-3
                  text-sm
                  text-[#191C1E]
                  outline-none
                  focus:border-[#008378]
                "
              >
                <option value="en">
                  انگلیسی
                </option>

                <option value="de">
                  آلمانی
                </option>

                <option value="fr">
                  فرانسوی
                </option>

                <option value="es">
                  اسپانیایی
                </option>
              </select>
            </label>

            <label>
              <span
                className="
                  text-sm
                  font-medium
                  text-[#3D4947]
                "
              >
                سطح CEFR
              </span>

              <select
                value={
                  metadata.cefrLevel ??
                  ""
                }
                disabled={
                  isUploading
                }
                onChange={(
                  event,
                ) => {
                  updateMetadata({
                    cefrLevel:
                      event.target.value
                        ? event.target.value as ReadingCefrLevel
                        : null,
                  });
                }}
                className="
                  mt-2
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-[#BCC9C6]
                  bg-white
                  px-3
                  text-sm
                  text-[#191C1E]
                  outline-none
                  focus:border-[#008378]
                "
              >
                <option value="">
                  تشخیص خودکار
                </option>

                {CEFR_LEVELS.map(
                  (level) => (
                    <option
                      key={
                        level
                      }
                      value={
                        level
                      }
                    >
                      {level}
                    </option>
                  ),
                )}
              </select>
            </label>
          </div>

          <div
            className="
              mt-6
              grid
              gap-4
              md:grid-cols-2
            "
          >
            <ChoiceGroup
              title="نوع تحلیل"
              options={[
                {
                  value:
                    "standard",

                  label:
                    "استاندارد",

                  description:
                    "تحلیل سریع‌تر برای متن‌های ساده",
                },

                {
                  value:
                    "deep",

                  label:
                    "تحلیل عمیق",

                  description:
                    "واژگان، گرامر، سؤال و ساختار متن",
                },
              ]}
              value={
                metadata.options.analysisMode
              }
              disabled={
                isUploading
              }
              onChange={(
                value,
              ) => {
                updateOption(
                  "analysisMode",
                  value as ReadingUploadMetadata["options"]["analysisMode"],
                );
              }}
            />

            <ChoiceGroup
              title="طول بخش‌ها"
              options={[
                {
                  value:
                    "short",

                  label:
                    "کوتاه",

                  description:
                    "بخش‌های کوچک و سریع",
                },

                {
                  value:
                    "balanced",

                  label:
                    "متعادل",

                  description:
                    "مناسب مطالعه روزانه",
                },

                {
                  value:
                    "long",

                  label:
                    "بلند",

                  description:
                    "بخش‌های طولانی‌تر",
                },
              ]}
              value={
                metadata.options.sectionLength
              }
              disabled={
                isUploading
              }
              onChange={(
                value,
              ) => {
                updateOption(
                  "sectionLength",
                  value as ReadingUploadMetadata["options"]["sectionLength"],
                );
              }}
            />
          </div>

          <div
            className="
              mt-6
              grid
              gap-3
              sm:grid-cols-2
            "
          >
            <SettingToggle
              title="استخراج واژگان"
              checked={
                metadata.options.extractVocabulary
              }
              disabled={
                isUploading
              }
              onChange={(
                checked,
              ) => {
                updateOption(
                  "extractVocabulary",
                  checked,
                );
              }}
            />

            <SettingToggle
              title="تحلیل گرامر"
              checked={
                metadata.options.extractGrammar
              }
              disabled={
                isUploading
              }
              onChange={(
                checked,
              ) => {
                updateOption(
                  "extractGrammar",
                  checked,
                );
              }}
            />

            <SettingToggle
              title="تولید صوت"
              checked={
                metadata.options.generateAudio
              }
              disabled={
                isUploading
              }
              onChange={(
                checked,
              ) => {
                updateOption(
                  "generateAudio",
                  checked,
                );
              }}
            />

            <SettingToggle
              title="ساخت سؤال تمرینی"
              checked={
                metadata.options.generateQuestions
              }
              disabled={
                isUploading
              }
              onChange={(
                checked,
              ) => {
                updateOption(
                  "generateQuestions",
                  checked,
                );
              }}
            />
          </div>

          {metadata.options.generateQuestions ? (
            <label
              className="
                mt-5
                block
                max-w-[280px]
              "
            >
              <span
                className="
                  text-sm
                  font-medium
                  text-[#3D4947]
                "
              >
                تعداد سؤال در هر بخش
              </span>

              <select
                value={
                  metadata.options.questionsPerSection
                }
                disabled={
                  isUploading
                }
                onChange={(
                  event,
                ) => {
                  updateOption(
                    "questionsPerSection",
                    Number(
                      event.target.value,
                    ),
                  );
                }}
                className="
                  mt-2
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-[#BCC9C6]
                  bg-white
                  px-3
                  text-sm
                  text-[#191C1E]
                  outline-none
                  focus:border-[#008378]
                "
              >
                {[
                  1,
                  2,
                  3,
                  4,
                  5,
                  6,
                  7,
                  8,
                ].map(
                  (count) => (
                    <option
                      key={
                        count
                      }
                      value={
                        count
                      }
                    >
                      {numberFormatter.format(
                        count,
                      )} سؤال
                    </option>
                  ),
                )}
              </select>
            </label>
          ) : null}
        </section>
      ) : null}

      {phase ===
      "uploading" ? (
        <section
          className="
            mt-6
            rounded-2xl
            border
            border-[#BCC9C6]/40
            bg-white
            p-6
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              gap-4
            "
          >
            <div>
              <h2
                className="
                  text-base
                  font-bold
                  text-[#191C1E]
                "
              >
                در حال آپلود فایل
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-[#64748B]
                "
              >
                تا پایان ارسال فایل این صفحه را نبند.
              </p>
            </div>

            <strong
              className="
                text-sm
                text-[#00685F]
              "
            >
              {numberFormatter.format(
                uploadProgress,
              )}
              ٪
            </strong>
          </div>

          <div
            className="
              mt-4
              h-2
              overflow-hidden
              rounded-full
              bg-[#E0E3E5]
            "
          >
            <div
              className="
                h-full
                rounded-full
                bg-[#00685F]
                transition-[width]
              "
              style={{
                width:
                  `${uploadProgress}%`,
              }}
            />
          </div>
        </section>
      ) : null}

      {phase ===
        "processing" &&
      result ? (
        <section
          className="
            mt-6
            rounded-2xl
            border
            border-[#A7DED8]
            bg-[#F0FDFA]
            p-6
          "
        >
          <div
            className="
              flex
              items-start
              gap-3
            "
          >
            <span
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#D6EDEB]
                text-[#00685F]
              "
            >
              <CheckCircle2
                aria-hidden="true"
                className="
                  h-5
                  w-5
                "
              />
            </span>

            <div
              className="
                min-w-0
                flex-1
              "
            >
              <h2
                className="
                  text-base
                  font-bold
                  text-[#191C1E]
                "
              >
                فایل با موفقیت دریافت شد
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  leading-6
                  text-[#3D4947]
                "
              >
                تحلیل AI آغاز شده و منبع بعد از آماده‌شدن در بخش «منابع من» نمایش داده می‌شود.
              </p>

              <div
                className="
                  mt-4
                  flex
                  flex-wrap
                  items-center
                  gap-3
                "
              >
                <Link
                  href={`/reading/resources/${result.resourceId}`}
                  className="
                    inline-flex
                    h-9
                    items-center
                    justify-center
                    gap-1.5
                    rounded-lg
                    bg-[#00685F]
                    px-4
                    text-sm
                    font-bold
                    text-white
                  "
                >
                  مشاهده وضعیت

                  <ChevronLeft
                    aria-hidden="true"
                    className="
                      h-4
                      w-4
                    "
                  />
                </Link>

                <button
                  type="button"
                  onClick={
                    resetForm
                  }
                  className="
                    inline-flex
                    h-9
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    border
                    border-[#BCC9C6]
                    bg-white
                    px-4
                    text-sm
                    font-medium
                    text-[#3D4947]
                  "
                >
                  <RotateCcw
                    aria-hidden="true"
                    className="
                      h-4
                      w-4
                    "
                  />

                  افزودن منبع دیگر
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {errorMessage ? (
        <div
          role="alert"
          className="
            mt-6
            rounded-xl
            border
            border-red-200
            bg-red-50
            px-4
            py-3
            text-sm
            leading-6
            text-red-700
          "
        >
          {errorMessage}
        </div>
      ) : null}

      {file &&
      phase !==
        "processing" ? (
        <div
          className="
            mt-6
            flex
            flex-wrap
            items-center
            gap-3
          "
        >
          {isUploading ? (
            <button
              type="button"
              onClick={
                cancelUpload
              }
              className="
                inline-flex
                min-h-11
                items-center
                justify-center
                rounded-lg
                border
                border-red-200
                bg-white
                px-5
                text-sm
                font-bold
                text-red-600
              "
            >
              توقف آپلود
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                void handleSubmit();
              }}
              className="
                inline-flex
                min-h-11
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-[#00685F]
                px-6
                text-sm
                font-bold
                text-white
                shadow-[0_1px_2px_rgba(0,0,0,0.05)]
                transition
                hover:bg-[#005B53]
              "
            >
              {isUploading ? (
                <LoaderCircle
                  aria-hidden="true"
                  className="
                    h-4
                    w-4
                    animate-spin
                  "
                />
              ) : (
                <Sparkles
                  aria-hidden="true"
                  className="
                    h-4
                    w-4
                  "
                />
              )}

              شروع آپلود و تحلیل AI
            </button>
          )}

          {!isUploading ? (
            <button
              type="button"
              onClick={
                resetForm
              }
              className="
                inline-flex
                min-h-11
                items-center
                justify-center
                gap-2
                rounded-lg
                border
                border-[#BCC9C6]
                bg-white
                px-5
                text-sm
                font-medium
                text-[#3D4947]
                transition
                hover:border-[#008378]
                hover:text-[#00685F]
              "
            >
              <RotateCcw
                aria-hidden="true"
                className="
                  h-4
                  w-4
                "
              />

              پاک کردن
            </button>
          ) : null}
        </div>
      ) : null}

      <section
        className="
          mt-8
          grid
          gap-4
          sm:grid-cols-3
        "
      >
        <InfoCard
          icon={
            ShieldCheck
          }
          title="فایل امن"
          description="نوع و حجم فایل قبل از ارسال اعتبارسنجی می‌شود."
        />

        <InfoCard
          icon={
            Sparkles
          }
          title="تحلیل هوشمند"
          description="سطح، واژگان و ساختار متن توسط AI بررسی می‌شود."
        />

        <InfoCard
          icon={
            FileText
          }
          title="درس آماده"
          description="منبع بعد از پردازش به بخش‌های قابل مطالعه تبدیل می‌شود."
        />
      </section>
    </main>
  );
}

function ChoiceGroup({
  title,
  options,
  value,
  disabled,
  onChange,
}: Readonly<{
  title:
    string;

  options:
    readonly {
      value:
        string;

      label:
        string;

      description:
        string;
    }[];

  value:
    string;

  disabled:
    boolean;

  onChange:
    (
      value:
        string,
    ) => void;
}>) {
  return (
    <fieldset
      disabled={
        disabled
      }
      className="
        rounded-xl
        border
        border-[#DCE5E3]
        bg-[#F7F9FB]
        p-4
      "
    >
      <legend
        className="
          px-1
          text-sm
          font-medium
          text-[#3D4947]
        "
      >
        {title}
      </legend>

      <div
        className="
          mt-2
          space-y-2
        "
      >
        {options.map(
          (option) => {
            const selected =
              option.value ===
              value;

            return (
              <button
                key={
                  option.value
                }
                type="button"
                disabled={
                  disabled
                }
                onClick={() => {
                  onChange(
                    option.value,
                  );
                }}
                className={cn(
                  "flex",
                  "w-full",
                  "items-start",
                  "gap-3",
                  "rounded-lg",
                  "border",
                  "p-3",
                  "text-right",
                  "transition",

                  selected
                    ? [
                        "border-[#008378]",
                        "bg-white",
                      ]
                    : [
                        "border-transparent",
                        "hover:bg-white",
                      ],
                )}
              >
                <span
                  className={cn(
                    "mt-0.5",
                    "flex",
                    "h-5",
                    "w-5",
                    "shrink-0",
                    "items-center",
                    "justify-center",
                    "rounded-full",
                    "border",

                    selected
                      ? [
                          "border-[#008378]",
                          "bg-[#008378]",
                          "text-white",
                        ]
                      : [
                          "border-[#BCC9C6]",
                          "bg-white",
                        ],
                  )}
                >
                  {selected ? (
                    <Check
                      aria-hidden="true"
                      className="
                        h-3
                        w-3
                      "
                    />
                  ) : null}
                </span>

                <span>
                  <span
                    className="
                      block
                      text-sm
                      font-bold
                      text-[#191C1E]
                    "
                  >
                    {
                      option.label
                    }
                  </span>

                  <span
                    className="
                      mt-1
                      block
                      text-xs
                      leading-5
                      text-[#64748B]
                    "
                  >
                    {
                      option.description
                    }
                  </span>
                </span>
              </button>
            );
          },
        )}
      </div>
    </fieldset>
  );
}

function SettingToggle({
  title,
  checked,
  disabled,
  onChange,
}: Readonly<{
  title:
    string;

  checked:
    boolean;

  disabled:
    boolean;

  onChange:
    (
      checked:
        boolean,
    ) => void;
}>) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={
        checked
      }
      disabled={
        disabled
      }
      onClick={() => {
        onChange(
          !checked,
        );
      }}
      className="
        flex
        min-h-[56px]
        items-center
        justify-between
        gap-4
        rounded-xl
        border
        border-[#DCE5E3]
        bg-[#F7F9FB]
        px-4
        text-right
        transition
        hover:bg-[#F1F6F5]
        disabled:opacity-60
      "
    >
      <span
        className="
          text-sm
          font-medium
          text-[#3D4947]
        "
      >
        {title}
      </span>

      <span
        aria-hidden="true"
        className={cn(
          "relative",
          "h-6",
          "w-11",
          "shrink-0",
          "rounded-full",
          "transition",

          checked
            ? "bg-[#008378]"
            : "bg-[#C8D1CF]",
        )}
      >
        <span
          className={cn(
            "absolute",
            "top-1",
            "h-4",
            "w-4",
            "rounded-full",
            "bg-white",
            "shadow-sm",
            "transition-all",

            checked
              ? "left-1"
              : "left-6",
          )}
        />
      </span>
    </button>
  );
}

function InfoCard({
  icon: Icon,
  title,
  description,
}: Readonly<{
  icon:
    typeof ShieldCheck;

  title:
    string;

  description:
    string;
}>) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-[#DCE5E3]
        bg-white
        p-5
      "
    >
      <span
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          bg-[#008378]/10
          text-[#00685F]
        "
      >
        <Icon
          aria-hidden="true"
          className="
            h-5
            w-5
          "
        />
      </span>

      <h3
        className="
          mt-4
          text-sm
          font-bold
          text-[#191C1E]
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-2
          text-xs
          leading-5
          text-[#64748B]
        "
      >
        {description}
      </p>
    </div>
  );
}