"use client";

import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Image as ImageIcon,
  LoaderCircle,
  RotateCcw,
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
  READING_SOURCE_ACCEPT,
  READING_SOURCE_FILE_KIND_LABELS,
} from "../../constants/reading.constants";

import {
  uploadReadingSource,
} from "../../api/upload-reading-source";

import type {
  ReadingCefrLevel,
  ReadingSourceUploadResult,
} from "../../types/reading.types";

import {
  validateReadingSourceFile,
} from "../../utils/validate-reading-source-file";

const numberFormatter =
  new Intl.NumberFormat("fa-IR", {
    maximumFractionDigits: 1,
  });

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

export function ReadingSourceUploader() {
  const inputRef =
    useRef<HTMLInputElement | null>(
      null,
    );

  const abortControllerRef =
    useRef<AbortController | null>(
      null,
    );

  const [file, setFile] =
    useState<File | null>(null);

  const [title, setTitle] =
    useState("");

  const [languageCode, setLanguageCode] =
    useState("en");

  const [cefrLevel, setCefrLevel] =
    useState<
      ReadingCefrLevel | ""
    >("");

  const [isDragging, setIsDragging] =
    useState(false);

  const [isUploading, setIsUploading] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  const [result, setResult] =
    useState<ReadingSourceUploadResult | null>(
      null,
    );

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

      return;
    }

    setFile(selectedFile);
    setResult(null);
    setErrorMessage(null);

    if (!title.trim()) {
      setTitle(
        selectedFile.name.replace(
          /\.[^.]+$/u,
          "",
        ),
      );
    }
  }

  function resetForm(): void {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;

    setFile(null);
    setTitle("");
    setLanguageCode("en");
    setCefrLevel("");

    setIsUploading(false);
    setErrorMessage(null);
    setResult(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function handleSubmit(): Promise<void> {
    if (!file) {
      setErrorMessage(
        "ابتدا فایل موردنظر را انتخاب کن.",
      );

      return;
    }

    abortControllerRef.current?.abort();

    const controller =
      new AbortController();

    abortControllerRef.current =
      controller;

    setIsUploading(true);
    setErrorMessage(null);
    setResult(null);

    try {
      const uploadResult =
        await uploadReadingSource(
          file,
          {
            title:
              title.trim() || null,

            languageCode,

            cefrLevel:
              cefrLevel || null,
          },

          controller.signal,
        );

      if (controller.signal.aborted) {
        return;
      }

      setResult(uploadResult);
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
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
    } finally {
      if (
        abortControllerRef.current ===
        controller
      ) {
        abortControllerRef.current =
          null;
      }

      setIsUploading(false);
    }
  }

  return (
    <main
      className="mx-auto w-full max-w-5xl space-y-6"
      aria-labelledby="reading-upload-title"
    >
      <section
        className="
          rounded-3xl border
          border-cyan-400/15
          bg-white/[0.035]
          p-6 sm:p-8
        "
      >
        <div className="flex items-center gap-2 text-cyan-300">
          <UploadCloud
            aria-hidden="true"
            className="h-5 w-5"
          />

          منبع شخصی
        </div>

        <h1
          id="reading-upload-title"
          className="mt-3 text-3xl font-bold text-white"
        >
          کتاب، متن یا تصویر خودت را وارد کن
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">
          فایل پس از آپلود به متن تبدیل می‌شود، با AI
          تحلیل می‌شود، به بخش‌های کوتاه تقسیم می‌شود و
          برای هر بخش صوت، واژگان و نکات گرامری ساخته
          خواهد شد.
        </p>
      </section>

      <Card className="p-5 sm:p-6">
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

            event.target.value = "";
          }}
        />

        <div
          role="button"
          tabIndex={0}
          onClick={() =>
            inputRef.current?.click()
          }
          onKeyDown={(event) => {
            if (
              event.key === "Enter" ||
              event.key === " "
            ) {
              event.preventDefault();

              inputRef.current?.click();
            }
          }}
          onDragOver={(event) => {
            event.preventDefault();

            event.dataTransfer.dropEffect =
              "copy";

            setIsDragging(true);
          }}
          onDragLeave={() =>
            setIsDragging(false)
          }
          onDrop={(event) => {
            event.preventDefault();

            setIsDragging(false);

            const droppedFile =
              event.dataTransfer.files[0];

            if (droppedFile) {
              selectFile(
                droppedFile,
              );
            }
          }}
          className={cn(
            "cursor-pointer rounded-2xl",
            "border-2 border-dashed",
            "px-5 py-10 text-center",
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
              items-center justify-center
              rounded-2xl bg-cyan-400/10
              text-cyan-300
            "
          >
            <UploadCloud
              aria-hidden="true"
              className="h-8 w-8"
            />
          </div>

          <p className="mt-4 text-sm font-bold text-slate-200">
            فایل را اینجا رها کن
          </p>

          <p className="mt-2 text-xs text-slate-500">
            یا برای انتخاب فایل کلیک کن
          </p>

          <p className="mt-4 text-[11px] text-slate-700">
            PDF، DOCX، TXT، JPG، PNG و WEBP
          </p>
        </div>

        {file ? (
          <div
            className="
              mt-5 flex items-center gap-3
              rounded-xl border
              border-white/[0.07]
              bg-white/[0.025] p-4
            "
          >
            <div
              className="
                flex h-11 w-11 shrink-0
                items-center justify-center
                rounded-xl bg-cyan-400/10
                text-cyan-300
              "
            >
              {file.type.startsWith(
                "image/",
              ) ? (
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

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-300">
                {file.name}
              </p>

              <p className="mt-1 text-xs text-slate-600">
                {formatFileSize(
                  file.size,
                )}
              </p>
            </div>
          </div>
        ) : null}

        {file ? (
          <div
            className="
              mt-6 grid gap-4
              md:grid-cols-2
            "
          >
            <label className="md:col-span-2">
              <span className="text-xs font-medium text-slate-400">
                عنوان منبع
              </span>

              <input
                value={title}
                maxLength={160}
                onChange={(event) =>
                  setTitle(
                    event.target.value,
                  )
                }
                placeholder="عنوان کتاب یا متن"
                className="
                  mt-2 h-11 w-full
                  rounded-xl border
                  border-white/[0.08]
                  bg-black/15 px-4
                  text-sm text-slate-200
                  outline-none
                  placeholder:text-slate-700
                  focus:border-cyan-400/25
                "
              />
            </label>

            <label>
              <span className="text-xs font-medium text-slate-400">
                زبان متن
              </span>

              <select
                value={languageCode}
                onChange={(event) =>
                  setLanguageCode(
                    event.target.value,
                  )
                }
                className="
                  mt-2 h-11 w-full
                  rounded-xl border
                  border-white/[0.08]
                  bg-[#0B1221] px-3
                  text-sm text-slate-200
                  outline-none
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
              <span className="text-xs font-medium text-slate-400">
                سطح تقریبی
              </span>

              <select
                value={cefrLevel}
                onChange={(event) =>
                  setCefrLevel(
                    event.target
                      .value as
                      | ReadingCefrLevel
                      | "",
                  )
                }
                className="
                  mt-2 h-11 w-full
                  rounded-xl border
                  border-white/[0.08]
                  bg-[#0B1221] px-3
                  text-sm text-slate-200
                  outline-none
                "
              >
                <option value="">
                  تشخیص خودکار
                </option>

                <option value="A1">
                  A1
                </option>

                <option value="A2">
                  A2
                </option>

                <option value="B1">
                  B1
                </option>

                <option value="B2">
                  B2
                </option>

                <option value="C1">
                  C1
                </option>

                <option value="C2">
                  C2
                </option>
              </select>
            </label>
          </div>
        ) : null}

        {errorMessage ? (
          <div
            role="alert"
            className="
              mt-5 rounded-xl
              border border-red-400/15
              bg-red-400/[0.05]
              px-4 py-3 text-xs
              leading-6 text-red-200
            "
          >
            {errorMessage}
          </div>
        ) : null}

        {file ? (
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              disabled={isUploading}
              onClick={() => {
                void handleSubmit();
              }}
              className="
                inline-flex min-h-11
                items-center justify-center
                gap-2 rounded-xl
                bg-cyan-400 px-5 py-2.5
                text-sm font-bold
                text-slate-950 transition
                hover:bg-cyan-300
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {isUploading ? (
                <LoaderCircle
                  aria-hidden="true"
                  className="h-4 w-4 animate-spin"
                />
              ) : (
                <UploadCloud
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              )}

              {isUploading
                ? "در حال آپلود..."
                : "شروع پردازش"}
            </button>

            <button
              type="button"
              onClick={resetForm}
              disabled={isUploading}
              className="
                inline-flex min-h-11
                items-center justify-center
                gap-2 rounded-xl
                border border-white/[0.08]
                bg-white/[0.04]
                px-4 py-2.5
                text-sm text-slate-400
                transition
                hover:bg-white/[0.08]
              "
            >
              <RotateCcw
                aria-hidden="true"
                className="h-4 w-4"
              />

              انتخاب فایل دیگر
            </button>
          </div>
        ) : null}

        {result ? (
          <div
            className="
              mt-6 rounded-2xl
              border border-emerald-400/15
              bg-emerald-400/[0.05]
              p-5
            "
          >
            <h2 className="text-lg font-bold text-emerald-100">
              فایل با موفقیت ثبت شد
            </h2>

            <p className="mt-2 text-sm text-emerald-200/70">
              وضعیت فعلی:{" "}
              {result.processingProgress}٪
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span
                className="
                  rounded-lg
                  bg-white/[0.05]
                  px-3 py-1.5 text-xs
                  text-slate-400
                "
              >
                {
                  READING_SOURCE_FILE_KIND_LABELS[
                    result.sourceFileKind
                  ]
                }
              </span>

              <span
                className="
                  rounded-lg
                  bg-white/[0.05]
                  px-3 py-1.5 text-xs
                  text-slate-400
                "
              >
                {result.originalFilename}
              </span>
            </div>

            {result.warnings.length > 0 ? (
              <ul className="mt-4 space-y-1.5">
                {result.warnings.map(
                  (warning) => (
                    <li
                      key={warning}
                      className="text-xs leading-6 text-amber-200/70"
                    >
                      • {warning}
                    </li>
                  ),
                )}
              </ul>
            ) : null}

            <Link
              href={`/reading/resources/${result.resourceId}`}
              className="
                mt-5 inline-flex min-h-10
                items-center justify-center
                gap-2 rounded-xl
                bg-emerald-400
                px-4 py-2 text-xs
                font-bold text-slate-950
                transition hover:bg-emerald-300
              "
            >
              مشاهده وضعیت پردازش

              <ArrowLeft
                aria-hidden="true"
                className="h-4 w-4"
              />
            </Link>
          </div>
        ) : null}
      </Card>
    </main>
  );
}