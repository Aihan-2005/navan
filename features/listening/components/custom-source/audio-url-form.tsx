"use client";

import {
  Link2,
  LoaderCircle,
  RotateCcw,
  Send,
} from "lucide-react";
import { useState } from "react";

import { Card } from "../../../../components/ui/card";

import {
  useCustomAudioUrlImport,
} from "../../hooks/use-custom-listening-source";

import {
  CustomSourceResultCard,
} from "./custom-source-result-card";

export function AudioUrlForm() {
  const [url, setUrl] =
    useState("");

  const [title, setTitle] =
    useState("");

  const [languageCode, setLanguageCode] =
    useState("en");

  const {
    status,
    result,
    errorMessage,

    submit,
    reset,
  } = useCustomAudioUrlImport();

  const isSubmitting =
    status === "submitting";

  function resetForm(): void {
    reset();

    setUrl("");
    setTitle("");
    setLanguageCode("en");
  }

  return (
    <Card className="p-5 sm:p-6">
      <div className="flex items-center gap-2 text-violet-300">
        <Link2
          aria-hidden="true"
          className="h-5 w-5"
        />

        <span className="text-sm font-medium">
          واردکردن لینک
        </span>
      </div>

      <h2 className="mt-2 text-xl font-bold text-white">
        لینک صوت یا پادکست را ثبت کن
      </h2>

      <p className="mt-2 text-xs leading-6 text-slate-500">
        لینک برای استخراج Metadata، دریافت کنترل‌شده
        فایل و ساخت Transcript به Backend ارسال می‌شود.
      </p>

      <form
        className="mt-5 space-y-4"
        onSubmit={(event) => {
          event.preventDefault();

          void submit({
            url,
            title:
              title.trim() || null,
            languageCode,
          });
        }}
      >
        <div>
          <label
            htmlFor="custom-audio-url"
            className="text-xs font-medium text-slate-400"
          >
            لینک HTTPS
          </label>

          <input
            id="custom-audio-url"
            type="url"
            required
            value={url}
            onChange={(event) =>
              setUrl(event.target.value)
            }
            placeholder="https://example.com/podcast.mp3"
            className="
              mt-2 h-11 w-full rounded-xl
              border border-white/[0.08]
              bg-black/15 px-4
              text-left text-sm text-slate-200
              outline-none transition
              placeholder:text-slate-700
              focus:border-violet-400/25
            "
            dir="ltr"
          />
        </div>

        <div>
          <label
            htmlFor="custom-url-title"
            className="text-xs font-medium text-slate-400"
          >
            عنوان اختیاری
          </label>

          <input
            id="custom-url-title"
            value={title}
            maxLength={120}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            placeholder="عنوان تمرین"
            className="
              mt-2 h-11 w-full rounded-xl
              border border-white/[0.08]
              bg-black/15 px-4
              text-sm text-slate-200
              outline-none
              placeholder:text-slate-700
            "
          />
        </div>

        <div>
          <label
            htmlFor="custom-url-language"
            className="text-xs font-medium text-slate-400"
          >
            زبان صوت
          </label>

          <select
            id="custom-url-language"
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
            disabled={
              isSubmitting ||
              !url.trim()
            }
            className="
              inline-flex min-h-11 items-center
              justify-center gap-2 rounded-xl
              bg-violet-400 px-5 py-2.5
              text-sm font-bold text-slate-950
              transition hover:bg-violet-300
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {isSubmitting ? (
              <LoaderCircle
                aria-hidden="true"
                className="h-4 w-4 animate-spin"
              />
            ) : (
              <Send
                aria-hidden="true"
                className="h-4 w-4"
              />
            )}

            {isSubmitting
              ? "در حال ثبت لینک..."
              : "ثبت و پردازش لینک"}
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

            پاک‌کردن فرم
          </button>
        </div>
      </form>

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