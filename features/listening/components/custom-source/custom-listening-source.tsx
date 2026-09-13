"use client";

import {
  FileAudio,
  Link2,
  ShieldCheck,
  Sparkles,
  WandSparkles,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  cn,
} from "../../../../lib/utils/cn";

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
  const [
    activeTab,
    setActiveTab,
  ] =
    useState<CustomSourceTab>(
      "upload",
    );

  return (
    <main
      dir="rtl"
      className="
        mx-auto
        w-full
        max-w-[1120px]
        space-y-6
        pb-12
      "
      aria-labelledby="custom-listening-title"
    >
      <section
        className="
          relative
          overflow-hidden
          rounded-[28px]
          border
          border-[#CBE1DD]
          bg-[linear-gradient(135deg,#EAF8F5_0%,#FFFFFF_55%,#F8F5FF_100%)]
          px-6
          py-8
          shadow-[0_14px_40px_rgba(15,23,42,0.05)]
          sm:px-8
          sm:py-10
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -left-24
            -top-24
            h-72
            w-72
            rounded-full
            bg-[#14B8A6]/10
            blur-3xl
          "
        />

        <div
          className="
            relative
            max-w-3xl
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
              text-[#00685F]
            "
          >
            <Sparkles
              aria-hidden="true"
              className="h-4 w-4"
            />

            <span
              className="
                text-xs
                font-black
              "
            >
              محتوای شخصی
            </span>
          </div>

          <h1
            id="custom-listening-title"
            className="
              mt-4
              text-3xl
              font-black
              leading-tight
              text-[#0F172A]
              sm:text-4xl
            "
          >
            هر فایل صوتی را به یک تمرین
            Listening تبدیل کن
          </h1>

          <p
            className="
              mt-4
              text-sm
              leading-8
              text-[#64748B]
              sm:text-base
            "
          >
            فایل صوتی را آپلود کن یا لینک
            HTTPS بده. Backend بعداً
            Metadata، Transcript و Segmentها
            را تولید می‌کند و Content آماده
            وارد Library می‌شود.
          </p>

          <div
            className="
              mt-6
              flex
              flex-wrap
              gap-2
            "
          >
            <FeatureBadge
              icon={
                ShieldCheck
              }
              text="اعتبارسنجی فایل"
            />

            <FeatureBadge
              icon={
                WandSparkles
              }
              text="Transcript خودکار"
            />

            <FeatureBadge
              icon={
                FileAudio
              }
              text="Job-based processing"
            />
          </div>
        </div>
      </section>

      <div
        className="
          grid
          grid-cols-2
          gap-2
          rounded-2xl
          border
          border-[#DCE5E3]
          bg-white
          p-2
          shadow-[0_5px_20px_rgba(15,23,42,0.035)]
        "
      >
        <button
          type="button"
          onClick={() => {
            setActiveTab(
              "upload",
            );
          }}
          className={cn(
            "inline-flex",
            "min-h-12",
            "items-center",
            "justify-center",
            "gap-2",
            "rounded-xl",
            "text-sm",
            "font-bold",
            "transition",

            activeTab ===
              "upload"
              ? [
                  "bg-[#E7F4F2]",
                  "text-[#00685F]",
                ]
              : [
                  "text-[#64748B]",
                  "hover:bg-[#F8FAF9]",
                  "hover:text-[#334155]",
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
          onClick={() => {
            setActiveTab(
              "url",
            );
          }}
          className={cn(
            "inline-flex",
            "min-h-12",
            "items-center",
            "justify-center",
            "gap-2",
            "rounded-xl",
            "text-sm",
            "font-bold",
            "transition",

            activeTab ===
              "url"
              ? [
                  "bg-[#F4EFFF]",
                  "text-[#712AE2]",
                ]
              : [
                  "text-[#64748B]",
                  "hover:bg-[#F8FAF9]",
                  "hover:text-[#334155]",
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

      {activeTab ===
      "upload" ? (
        <AudioUploadForm />
      ) : (
        <AudioUrlForm />
      )}
    </main>
  );
}

function FeatureBadge({
  icon: Icon,
  text,
}: Readonly<{
  icon:
    typeof ShieldCheck;

  text:
    string;
}>) {
  return (
    <span
      className="
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        border-[#D7E4E1]
        bg-white/80
        px-3
        py-1.5
        text-[11px]
        font-medium
        text-[#52615F]
      "
    >
      <Icon
        aria-hidden="true"
        className="
          h-3.5
          w-3.5
          text-[#00685F]
        "
      />

      {text}
    </span>
  );
}