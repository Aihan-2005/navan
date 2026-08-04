"use client";

import {
  FileText,
  Image as ImageIcon,
  LoaderCircle,
  UploadCloud,
  X,
} from "lucide-react";
import {
  useRef,
  useState,
} from "react";

import { Card } from "../../../../components/ui/card";
import { cn } from "../../../../lib/utils/cn";

import {
  LISTENING_NOTES_ACCEPT,
} from "../../constants/listening.constants";

import {
  useListeningNotesUpload,
} from "../../hooks/use-listening-notes-upload";

import type {
  ListeningNotesUploadResult,
} from "../../types/listening.types";

import {
  ExtractedNoteEditor,
} from "./extracted-note-editor";

type ListeningNotesUploaderProps =
  Readonly<{
    onReplaceTranscript: (
      text: string,
      result: ListeningNotesUploadResult,
    ) => void;

    onAppendTranscript: (
      text: string,
      result: ListeningNotesUploadResult,
    ) => void;
  }>;

const numberFormatter =
  new Intl.NumberFormat("fa-IR", {
    maximumFractionDigits: 1,
  });

function formatFileSize(
  sizeBytes: number,
): string {
  const sizeInMegabytes =
    sizeBytes / (1024 * 1024);

  if (sizeInMegabytes >= 1) {
    return `${numberFormatter.format(
      sizeInMegabytes,
    )} مگابایت`;
  }

  const sizeInKilobytes =
    sizeBytes / 1024;

  return `${numberFormatter.format(
    sizeInKilobytes,
  )} کیلوبایت`;
}

export function ListeningNotesUploader({
  onReplaceTranscript,
  onAppendTranscript,
}: ListeningNotesUploaderProps) {
  const inputRef =
    useRef<HTMLInputElement | null>(
      null,
    );

  const dragCounterRef =
    useRef(0);

  const [isDragging, setIsDragging] =
    useState(false);

  const {
    status,

    selectedFile,
    selectedFileKind,

    result,
    errorMessage,

    upload,
    reset,
  } = useListeningNotesUpload();

  const isProcessing =
    status === "uploading" ||
    status === "extracting";

  function openFilePicker(): void {
    inputRef.current?.click();
  }

  function processFile(
    file: File | undefined,
  ): void {
    if (!file) {
      return;
    }

    void upload(file);
  }

  function handleReset(): void {
    reset();

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <Card className="p-5 sm:p-6">
      <div>
        <div className="flex items-center gap-2 text-violet-300">
          <UploadCloud
            aria-hidden="true"
            className="h-5 w-5"
          />

          <span className="text-sm font-medium">
            آپلود نوشته
          </span>
        </div>

        <h2 className="mt-2 text-xl font-bold text-white">
          نوشته دستی یا فایل متنی را وارد کن
        </h2>

        <p className="mt-2 text-xs leading-6 text-slate-500">
          تصویر نوشته، فایل Word، PDF یا TXT را آپلود
          کن. متن استخراج‌شده قبل از ورود به Transcript
          قابل ویرایش خواهد بود.
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={LISTENING_NOTES_ACCEPT}
        disabled={isProcessing}
        onChange={(event) => {
          processFile(
            event.target.files?.[0],
          );

          event.target.value = "";
        }}
        className="sr-only"
        aria-label="انتخاب فایل نوشته"
      />

      {!result ? (
        <div
          role="button"
          tabIndex={0}
          aria-label="محل رهاکردن فایل نوشته"
          onClick={openFilePicker}
          onKeyDown={(event) => {
            if (
              event.key === "Enter" ||
              event.key === " "
            ) {
              event.preventDefault();
              openFilePicker();
            }
          }}
          onDragEnter={(event) => {
            event.preventDefault();

            dragCounterRef.current += 1;

            setIsDragging(true);
          }}
          onDragOver={(event) => {
            event.preventDefault();

            event.dataTransfer.dropEffect =
              "copy";
          }}
          onDragLeave={(event) => {
            event.preventDefault();

            dragCounterRef.current -= 1;

            if (
              dragCounterRef.current <= 0
            ) {
              dragCounterRef.current = 0;
              setIsDragging(false);
            }
          }}
          onDrop={(event) => {
            event.preventDefault();

            dragCounterRef.current = 0;
            setIsDragging(false);

            processFile(
              event.dataTransfer.files[0],
            );
          }}
          className={cn(
            "mt-5 cursor-pointer rounded-2xl",
            "border-2 border-dashed",
            "px-5 py-10 text-center",
            "transition duration-200",
            "focus-visible:outline-none",
            "focus-visible:ring-2",
            "focus-visible:ring-violet-300/60",

            isDragging
              ? [
                  "border-violet-300/50",
                  "bg-violet-400/10",
                ]
              : [
                  "border-white/[0.09]",
                  "bg-white/[0.02]",
                  "hover:border-violet-300/25",
                  "hover:bg-violet-400/[0.04]",
                ],

            isProcessing &&
              "pointer-events-none opacity-70",
          )}
        >
          <div
            className="
              mx-auto flex h-14 w-14
              items-center justify-center
              rounded-2xl bg-violet-400/10
              text-violet-300
            "
          >
            {isProcessing ? (
              <LoaderCircle
                aria-hidden="true"
                className="h-7 w-7 animate-spin"
              />
            ) : (
              <UploadCloud
                aria-hidden="true"
                className="h-7 w-7"
              />
            )}
          </div>

          <p className="mt-4 text-sm font-semibold text-slate-200">
            {status === "uploading"
              ? "در حال آپلود فایل..."
              : status === "extracting"
                ? "در حال استخراج متن..."
                : "فایل را اینجا رها کن"}
          </p>

          {!isProcessing ? (
            <>
              <p className="mt-2 text-xs text-slate-500">
                یا برای انتخاب فایل کلیک کن
              </p>

              <p className="mt-4 text-[11px] leading-6 text-slate-700">
                TXT، DOCX، PDF، JPG، PNG و WEBP
              </p>
            </>
          ) : null}
        </div>
      ) : null}

      {selectedFile && !result ? (
        <div
          className="
            mt-4 flex items-center gap-3
            rounded-xl border
            border-white/[0.07]
            bg-white/[0.025] p-3
          "
        >
          <div
            className="
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-xl bg-white/[0.05]
              text-slate-400
            "
          >
            {selectedFileKind ===
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

          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-slate-300">
              {selectedFile.name}
            </p>

            <p className="mt-1 text-[10px] text-slate-600">
              {formatFileSize(
                selectedFile.size,
              )}
            </p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            aria-label="لغو آپلود"
            className="
              flex h-9 w-9 items-center
              justify-center rounded-lg
              text-slate-500 transition
              hover:bg-white/[0.05]
              hover:text-white
            "
          >
            <X
              aria-hidden="true"
              className="h-4 w-4"
            />
          </button>
        </div>
      ) : null}

      {errorMessage ? (
        <div
          role="alert"
          className="
            mt-4 flex items-start
            justify-between gap-3
            rounded-xl border
            border-red-400/15
            bg-red-400/[0.05]
            px-4 py-3
          "
        >
          <p className="text-xs leading-6 text-red-200">
            {errorMessage}
          </p>

          <button
            type="button"
            onClick={handleReset}
            className="
              shrink-0 text-xs font-medium
              text-red-300 transition
              hover:text-red-100
            "
          >
            تلاش مجدد
          </button>
        </div>
      ) : null}

      {result ? (
        <ExtractedNoteEditor
          result={result}
          onReplaceTranscript={
            onReplaceTranscript
          }
          onAppendTranscript={
            onAppendTranscript
          }
          onReset={handleReset}
        />
      ) : null}
    </Card>
  );
}