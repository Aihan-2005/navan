"use client";

import {
  FileText,
  Image as ImageIcon,
  LoaderCircle,
  RotateCcw,
  ShieldCheck,
  Trash2,
  UploadCloud,
} from "lucide-react";

import {
  useRef,
  useState,
} from "react";

import {
  Card,
} from "../../../../components/ui/card";

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
  ReadingUploadMetadata,
  ReadingUploadResult,
} from "../../types/reading-upload.types";

import {
  validateReadingSourceFile,
} from "../../utils/validate-reading-source-file";

import {
  ReadingUploadProgress,
  type ReadingUploadUiPhase,
} from "./reading-upload-progress";

import {
  ReadingUploadSettings,
} from "./reading-upload-settings";

const DEFAULT_METADATA:
  ReadingUploadMetadata = {
  title: null,

  languageCode: "en",

  cefrLevel: null,

  options: {
    analysisMode: "deep",

    sectionLength:
      "balanced",

    generateAudio: true,

    extractVocabulary: true,

    extractGrammar: true,

    generateQuestions: true,

    questionsPerSection: 3,
  },
};

const numberFormatter =
  new Intl.NumberFormat(
    "fa-IR",
    {
      maximumFractionDigits: 1,
    },
  );

function formatFileSize(
  bytes: number,
): string {
  const megabytes =
    bytes / (1024 * 1024);

  if (megabytes >= 1) {
    return `${numberFormatter.format(
      megabytes,
    )} مگابایت`;
  }

  return `${numberFormatter.format(
    bytes / 1024,
  )} کیلوبایت`;
}

function getFileTitle(
  filename: string,
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
    );

  const [
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
    useState<ReadingUploadUiPhase>(
      "idle",
    );

  const [
    uploadProgress,
    setUploadProgress,
  ] = useState(0);

  const [
    isDragging,
    setIsDragging,
  ] = useState(false);

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
    phase === "uploading";

  const fileValidation =
    file
      ? validateReadingSourceFile(
          file,
        )
      : null;

  function selectFile(
    selectedFile: File,
  ): void {
    const validation =
      validateReadingSourceFile(
        selectedFile,
      );

    if (!validation.success) {
      setFile(null);

      setResult(null);

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

    setUploadProgress(0);

    setResult(null);

    setErrorMessage(null);

    setPhase("idle");

    setMetadata(
      (currentMetadata) => ({
        ...currentMetadata,

        title:
          currentMetadata.title ??
          getFileTitle(
            selectedFile.name,
          ),
      }),
    );
  }

  function removeFile(): void {
    if (isUploading) {
      return;
    }

    setFile(null);

    setResult(null);

    setUploadProgress(0);

    setErrorMessage(null);

    setPhase("idle");

    setMetadata(
      DEFAULT_METADATA,
    );

    if (inputRef.current) {
      inputRef.current.value =
        "";
    }
  }

  function resetForm(): void {
    abortControllerRef.current?.abort();

    abortControllerRef.current =
      null;

    setFile(null);

    setMetadata(
      DEFAULT_METADATA,
    );

    setPhase("idle");

    setUploadProgress(0);

    setIsDragging(false);

    setErrorMessage(null);

    setResult(null);

    if (inputRef.current) {
      inputRef.current.value =
        "";
    }
  }

  function cancelUpload(): void {
    abortControllerRef.current?.abort();

    abortControllerRef.current =
      null;

    setPhase("idle");

    setUploadProgress(0);

    setErrorMessage(null);
  }

  async function handleSubmit(): Promise<void> {
    if (!file) {
      setErrorMessage(
        "ابتدا فایل موردنظر را انتخاب کن.",
      );

      setPhase("error");

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

      setPhase("error");

      return;
    }

    abortControllerRef.current?.abort();

    const controller =
      new AbortController();

    abortControllerRef.current =
      controller;

    setUploadProgress(0);

    setErrorMessage(null);

    setResult(null);

    setPhase("uploading");

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

      setUploadProgress(100);

      setResult(
        uploadResult,
      );

      setPhase(
        "processing",
      );
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        setPhase("idle");

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

      setPhase("error");
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
      className="
        mx-auto w-full
        max-w-6xl space-y-6
      "
    >
      <section
        className="
          relative overflow-hidden
          rounded-3xl border
          border-cyan-400/15
          bg-white/[0.035]
          p-6 sm:p-8
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -left-24 -top-24
            h-64 w-64
            rounded-full
            bg-cyan-500/15
            blur-3xl
          "
        />

        <div className="relative">
          <div
            className="
              flex items-center
              gap-2 text-cyan-300
            "
          >
            <UploadCloud
              aria-hidden="true"
              className="h-5 w-5"
            />

            <span
              className="
                text-sm font-medium
              "
            >
              Reading Upload
            </span>
          </div>

          <h1
            id="reading-upload-title"
            className="
              mt-3 text-3xl
              font-bold text-white
              sm:text-4xl
            "
          >
            منبع خودت را به درس تعاملی تبدیل کن
          </h1>

          <p
            className="
              mt-4 max-w-3xl
              text-sm leading-8
              text-slate-400
            "
          >
            فایل را Upload کن؛ AI متن را
            استخراج می‌کند، سطح را تشخیص
            می‌دهد، سختی محتوا را تحلیل
            می‌کند، Section می‌سازد و
            واژگان، Grammar، صوت و سؤال‌های
            درک مطلب تولید می‌کند.
          </p>

          <div
            className="
              mt-5 flex
              flex-wrap gap-2
            "
          >
            {READING_SUPPORTED_UPLOAD_LABELS.map(
              (label) => (
                <span
                  key={label}
                  className="
                    rounded-full
                    border
                    border-white/[0.06]
                    bg-white/[0.03]
                    px-2.5 py-1
                    text-[10px]
                    text-slate-500
                  "
                >
                  {label}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      <div
        className="
          grid gap-6
          lg:grid-cols-12
        "
      >
        <Card
          className="
            p-5 sm:p-6
            lg:col-span-7
          "
        >
          <input
            ref={inputRef}
            type="file"
            accept={
              READING_SOURCE_ACCEPT
            }
            disabled={isUploading}
            className="sr-only"
            aria-label="انتخاب فایل Reading"
            onChange={(event) => {
              const selectedFile =
                event.target.files?.[0];

              if (selectedFile) {
                selectFile(
                  selectedFile,
                );
              }

              event.target.value =
                "";
            }}
          />

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
              if (!isUploading) {
                inputRef.current?.click();
              }
            }}
            onKeyDown={(event) => {
              if (isUploading) {
                return;
              }

              if (
                event.key ===
                  "Enter" ||
                event.key === " "
              ) {
                event.preventDefault();

                inputRef.current?.click();
              }
            }}
            onDragOver={(event) => {
              event.preventDefault();

              if (isUploading) {
                return;
              }

              event.dataTransfer.dropEffect =
                "copy";

              setIsDragging(true);
            }}
            onDragLeave={() => {
              setIsDragging(false);
            }}
            onDrop={(event) => {
              event.preventDefault();

              setIsDragging(false);

              if (isUploading) {
                return;
              }

              const droppedFile =
                event.dataTransfer
                  .files[0];

              if (droppedFile) {
                selectFile(
                  droppedFile,
                );
              }
            }}
            className={cn(
              "rounded-2xl border-2",
              "border-dashed px-5",
              "py-10 text-center",
              "transition",

              isDragging
                ? [
                    "border-cyan-300/50",
                    "bg-cyan-400/10",
                  ]
                : [
                    "border-white/[0.09]",
                    "bg-white/[0.02]",
                    "hover:border-cyan-300/25",
                    "hover:bg-cyan-400/[0.04]",
                  ],

              isUploading &&
                "pointer-events-none opacity-60",
            )}
          >
            <div
              className="
                mx-auto flex h-16 w-16
                items-center
                justify-center
                rounded-2xl
                bg-cyan-400/10
                text-cyan-300
              "
            >
              <UploadCloud
                aria-hidden="true"
                className="h-8 w-8"
              />
            </div>

            <p
              className="
                mt-4 text-sm
                font-bold
                text-slate-200
              "
            >
              فایل را اینجا رها کن
            </p>

            <p
              className="
                mt-2 text-xs
                text-slate-500
              "
            >
              یا برای انتخاب فایل کلیک کن
            </p>

            <p
              className="
                mt-4 text-[11px]
                text-slate-700
              "
            >
              PDF، DOCX، TXT، JPG،
              PNG و WEBP
            </p>
          </div>

          {file &&
          fileValidation?.success ? (
            <div
              className="
                mt-5 flex
                items-center gap-4
                rounded-2xl border
                border-white/[0.07]
                bg-white/[0.025]
                p-4
              "
            >
              <div
                className="
                  flex h-12 w-12
                  shrink-0 items-center
                  justify-center
                  rounded-xl
                  bg-cyan-400/10
                  text-cyan-300
                "
              >
                {fileValidation.fileKind ===
                "image" ? (
                  <ImageIcon
                    aria-hidden="true"
                    className="h-5 w-5"
                  />
                ) : (
                  <FileText
                    aria-hidden="true"
                    className="h-5 w-5"
                  />
                )}
              </div>

              <div
                className="
                  min-w-0 flex-1
                "
              >
                <p
                  className="
                    truncate text-sm
                    font-medium
                    text-slate-200
                  "
                >
                  {file.name}
                </p>

                <div
                  className="
                    mt-1 flex
                    flex-wrap gap-3
                    text-xs
                    text-slate-600
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
                        fileValidation
                          .fileKind
                      ]
                    }
                  </span>
                </div>
              </div>

              {!isUploading ? (
                <button
                  type="button"
                  onClick={removeFile}
                  aria-label="حذف فایل انتخاب‌شده"
                  className="
                    inline-flex h-10 w-10
                    shrink-0 items-center
                    justify-center
                    rounded-xl border
                    border-white/[0.07]
                    bg-white/[0.025]
                    text-slate-500
                    transition
                    hover:bg-red-400/10
                    hover:text-red-300
                  "
                >
                  <Trash2
                    aria-hidden="true"
                    className="h-4 w-4"
                  />
                </button>
              ) : null}
            </div>
          ) : null}
        </Card>

        <Card
          className="
            p-5 sm:p-6
            lg:col-span-5
          "
        >
          <div
            className="
              flex items-center
              gap-2 text-emerald-300
            "
          >
            <ShieldCheck
              aria-hidden="true"
              className="h-5 w-5"
            />

            <h2
              className="
                font-bold text-white
              "
            >
              چه اتفاقی برای فایل می‌افتد؟
            </h2>
          </div>

          <div
            className="
              mt-5 space-y-4
            "
          >
            {[
              [
                "۱",
                "اعتبارسنجی فایل",
                "فرمت، حجم و Signature فایل بررسی می‌شود.",
              ],
              [
                "۲",
                "استخراج متن",
                "متن PDF، Word، TXT یا تصویر استخراج می‌شود.",
              ],
              [
                "۳",
                "تحلیل AI",
                "سطح، سختی، Vocabulary، Grammar و ساختار تحلیل می‌شوند.",
              ],
              [
                "۴",
                "ساخت Lesson",
                "Section، سؤال، Audio و محتوای آموزشی ساخته می‌شود.",
              ],
            ].map(
              ([
                number,
                title,
                description,
              ]) => (
                <div
                  key={number}
                  className="
                    flex items-start
                    gap-3
                  "
                >
                  <span
                    className="
                      flex h-8 w-8
                      shrink-0 items-center
                      justify-center
                      rounded-lg
                      bg-white/[0.05]
                      text-xs font-bold
                      text-cyan-300
                    "
                  >
                    {number}
                  </span>

                  <div>
                    <p
                      className="
                        text-sm font-medium
                        text-slate-300
                      "
                    >
                      {title}
                    </p>

                    <p
                      className="
                        mt-1 text-xs
                        leading-6
                        text-slate-600
                      "
                    >
                      {description}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        </Card>
      </div>

      {file ? (
        <ReadingUploadSettings
          metadata={metadata}
          disabled={isUploading}
          onChange={
            setMetadata
          }
        />
      ) : null}

      <ReadingUploadProgress
        phase={phase}
        uploadProgress={
          uploadProgress
        }
        result={result}
        errorMessage={
          errorMessage
        }
      />

      {file ? (
        <div
          className="
            flex flex-wrap gap-3
          "
        >
          {isUploading ? (
            <button
              type="button"
              onClick={
                cancelUpload
              }
              className="
                inline-flex min-h-11
                items-center
                justify-center gap-2
                rounded-xl border
                border-red-400/15
                bg-red-400/[0.05]
                px-5 py-2.5
                text-sm font-medium
                text-red-200
                transition
                hover:bg-red-400/10
              "
            >
              توقف Upload
            </button>
          ) : (
            <button
              type="button"
              disabled={
                phase ===
                "processing"
              }
              onClick={() => {
                void handleSubmit();
              }}
              className="
                inline-flex min-h-11
                items-center
                justify-center gap-2
                rounded-xl
                bg-cyan-400
                px-5 py-2.5
                text-sm font-bold
                text-slate-950
                transition
                hover:bg-cyan-300
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <UploadCloud
                aria-hidden="true"
                className="h-4 w-4"
              />

              شروع Upload و تحلیل AI
            </button>
          )}

          <button
            type="button"
            disabled={isUploading}
            onClick={resetForm}
            className="
              inline-flex min-h-11
              items-center
              justify-center gap-2
              rounded-xl border
              border-white/[0.08]
              bg-white/[0.035]
              px-5 py-2.5
              text-sm
              text-slate-400
              transition
              hover:bg-white/[0.07]
              hover:text-white
              disabled:opacity-40
            "
          >
            <RotateCcw
              aria-hidden="true"
              className="h-4 w-4"
            />

            پاک‌کردن فرم
          </button>
        </div>
      ) : null}
    </main>
  );
}