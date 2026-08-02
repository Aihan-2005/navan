"use client";

import {
  FileAudio,
  LoaderCircle,
  RotateCcw,
  UploadCloud,
} from "lucide-react";
import {
  useRef,
  useState,
} from "react";

import { Card } from "../../../../components/ui/card";
import { cn } from "../../../../lib/utils/cn";

import {
  CUSTOM_AUDIO_ACCEPT,
} from "../../constants/listening-custom-source.constants";

import {
  useCustomAudioUpload,
} from "../../hooks/use-custom-listening-source";

import {
  ListeningAudioPlayer,
} from "../player/listening-audio-player";

import {
  CustomSourceResultCard,
} from "./custom-source-result-card";

const numberFormatter =
  new Intl.NumberFormat("fa-IR", {
    maximumFractionDigits: 1,
  });

function formatFileSize(
  sizeBytes: number,
): string {
  const sizeInMegabytes =
    sizeBytes / (1024 * 1024);

  return `${numberFormatter.format(
    sizeInMegabytes,
  )} مگابایت`;
}

export function AudioUploadForm() {
  const inputRef =
    useRef<HTMLInputElement | null>(
      null,
    );

  const [title, setTitle] =
    useState("");

  const [languageCode, setLanguageCode] =
    useState("en");

  const [isDragging, setIsDragging] =
    useState(false);

  const {
    file,
    previewUrl,

    status,
    result,
    errorMessage,

    selectFile,
    submit,
    reset,
  } = useCustomAudioUpload();

  const isUploading =
    status === "uploading";

  function resetForm(): void {
    reset();

    setTitle("");
    setLanguageCode("en");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <Card className="p-5 sm:p-6">
      <div className="flex items-center gap-2 text-cyan-300">
        <UploadCloud
          aria-hidden="true"
          className="h-5 w-5"
        />

        <span className="text-sm font-medium">
          آپلود فایل صوتی
        </span>
      </div>

      <h2 className="mt-2 text-xl font-bold text-white">
        فایل خودت را برای تمرین اضافه کن
      </h2>

      <p className="mt-2 text-xs leading-6 text-slate-500">
        فایل پس از آپلود برای ساخت Transcript مرجع و
        Segmentهای زمانی پردازش می‌شود.
      </p>

      <input
        ref={inputRef}
        type="file"
        accept={CUSTOM_AUDIO_ACCEPT}
        disabled={isUploading}
        className="sr-only"
        aria-label="انتخاب فایل صوتی"
        onChange={(event) => {
          const selectedFile =
            event.target.files?.[0];

          if (selectedFile) {
            selectFile(selectedFile);
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
            selectFile(droppedFile);
          }
        }}
        className={cn(
          "mt-5 cursor-pointer rounded-2xl",
          "border-2 border-dashed",
          "px-5 py-9 text-center",
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
        )}
      >
        <div
          className="
            mx-auto flex h-14 w-14
            items-center justify-center
            rounded-2xl bg-cyan-400/10
            text-cyan-300
          "
        >
          <FileAudio
            aria-hidden="true"
            className="h-7 w-7"
          />
        </div>

        <p className="mt-4 text-sm font-semibold text-slate-200">
          فایل صوتی را اینجا رها کن
        </p>

        <p className="mt-2 text-xs text-slate-500">
          یا برای انتخاب فایل کلیک کن
        </p>

        <p className="mt-4 text-[11px] text-slate-700">
          MP3، WAV، M4A، OGG و WEBM تا ۲۵ مگابایت
        </p>
      </div>

      {file ? (
        <div
          className="
            mt-4 rounded-xl
            border border-white/[0.07]
            bg-white/[0.025] p-4
          "
        >
          <p className="truncate text-sm font-medium text-slate-300">
            {file.name}
          </p>

          <p className="mt-1 text-xs text-slate-600">
            {formatFileSize(file.size)}
          </p>
        </div>
      ) : null}

      {previewUrl && file ? (
        <div className="mt-5">
          <ListeningAudioPlayer
            audioUrl={previewUrl}
            title={file.name}
          />
        </div>
      ) : null}

      {file ? (
        <form
          className="mt-5 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();

            void submit({
              title:
                title.trim() || null,

              languageCode,
            });
          }}
        >
          <div>
            <label
              htmlFor="custom-audio-title"
              className="text-xs font-medium text-slate-400"
            >
              عنوان تمرین
            </label>

            <input
              id="custom-audio-title"
              value={title}
              maxLength={120}
              onChange={(event) =>
                setTitle(
                  event.target.value,
                )
              }
              placeholder="مثلاً پادکست مورد علاقه من"
              className="
                mt-2 h-11 w-full rounded-xl
                border border-white/[0.08]
                bg-black/15 px-4
                text-sm text-slate-200
                outline-none transition
                placeholder:text-slate-700
                focus:border-cyan-400/25
              "
            />
          </div>

          <div>
            <label
              htmlFor="custom-audio-language"
              className="text-xs font-medium text-slate-400"
            >
              زبان فایل
            </label>

            <select
              id="custom-audio-language"
              value={languageCode}
              onChange={(event) =>
                setLanguageCode(
                  event.target.value,
                )
              }
              className="
                mt-2 h-11 w-full rounded-xl
                border border-white/[0.08]
                bg-[#0B1221] px-4
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
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={isUploading}
              className="
                inline-flex min-h-11 items-center
                justify-center gap-2 rounded-xl
                bg-cyan-400 px-5 py-2.5
                text-sm font-bold text-slate-950
                transition hover:bg-cyan-300
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
                : "آپلود و ساخت Transcript"}
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="
                inline-flex min-h-11 items-center
                justify-center gap-2 rounded-xl
                border border-white/[0.08]
                bg-white/[0.04] px-4 py-2.5
                text-sm text-slate-400
                transition hover:bg-white/[0.08]
              "
            >
              <RotateCcw
                aria-hidden="true"
                className="h-4 w-4"
              />

              انتخاب فایل دیگر
            </button>
          </div>
        </form>
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

      {result ? (
        <CustomSourceResultCard
          result={result}
        />
      ) : null}
    </Card>
  );
}