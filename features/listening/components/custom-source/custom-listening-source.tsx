"use client";

import {
  FileAudio,
  Link2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

import { cn } from "../../../../lib/utils/cn";

import {
  AudioUploadForm,
} from "./audio-upload-form";

import {
  AudioUrlForm,
} from "./audio-url-form";

type CustomSourceTab =
  | "upload"
  | "url";

export function CustomListeningSource() {
  const [activeTab, setActiveTab] =
    useState<CustomSourceTab>(
      "upload",
    );

  return (
    <main
      className="mx-auto w-full max-w-6xl space-y-6"
      aria-labelledby="custom-listening-title"
    >
      <section
        className="
          relative overflow-hidden rounded-3xl
          border border-cyan-400/15
          bg-white/[0.035]
          px-6 py-8 sm:px-8 sm:py-10
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute
            -left-24 -top-24
            h-72 w-72 rounded-full
            bg-cyan-500/15 blur-3xl
          "
        />

        <div className="relative max-w-3xl">
          <div className="flex items-center gap-2 text-cyan-300">
            <Sparkles
              aria-hidden="true"
              className="h-4 w-4"
            />

            <span className="text-sm font-medium">
              محتوای شخصی
            </span>
          </div>

          <h1
            id="custom-listening-title"
            className="
              mt-4 text-3xl font-bold
              leading-tight text-white
              sm:text-4xl
            "
          >
            با هر فایل صوتی
            تمرین Listening بساز
          </h1>

          <p className="mt-4 text-sm leading-8 text-slate-400 sm:text-base">
            فایل خودت را آپلود کن یا لینک یک فایل صوتی
            را بده. سیستم پس از ساخت Transcript مرجع،
            آن را به یک تمرین کامل شنیداری تبدیل می‌کند.
          </p>

          <div
            className="
              mt-6 inline-flex items-center
              gap-2 rounded-xl
              border border-emerald-400/10
              bg-emerald-400/[0.04]
              px-4 py-3 text-xs
              text-emerald-100/70
            "
          >
            <ShieldCheck
              aria-hidden="true"
              className="h-4 w-4"
            />

            فایل‌ها قبل از پردازش اعتبارسنجی می‌شوند.
          </div>
        </div>
      </section>

      <div
        className="
          grid grid-cols-2 gap-2
          rounded-2xl border
          border-white/[0.07]
          bg-white/[0.025] p-2
        "
      >
        <button
          type="button"
          onClick={() =>
            setActiveTab("upload")
          }
          className={cn(
            "inline-flex min-h-12",
            "items-center justify-center",
            "gap-2 rounded-xl",
            "text-sm font-medium transition",

            activeTab === "upload"
              ? [
                  "bg-cyan-400/10",
                  "text-cyan-200",
                ]
              : [
                  "text-slate-500",
                  "hover:bg-white/[0.04]",
                  "hover:text-slate-300",
                ],
          )}
        >
          <FileAudio
            aria-hidden="true"
            className="h-4 w-4"
          />

          آپلود فایل
        </button>

        <button
          type="button"
          onClick={() =>
            setActiveTab("url")
          }
          className={cn(
            "inline-flex min-h-12",
            "items-center justify-center",
            "gap-2 rounded-xl",
            "text-sm font-medium transition",

            activeTab === "url"
              ? [
                  "bg-violet-400/10",
                  "text-violet-200",
                ]
              : [
                  "text-slate-500",
                  "hover:bg-white/[0.04]",
                  "hover:text-slate-300",
                ],
          )}
        >
          <Link2
            aria-hidden="true"
            className="h-4 w-4"
          />

          واردکردن لینک
        </button>
      </div>

      {activeTab === "upload" ? (
        <AudioUploadForm />
      ) : (
        <AudioUrlForm />
      )}
    </main>
  );
}