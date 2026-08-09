"use client";

import Link from "next/link";

import {
  ArrowRight,
  CircleAlert,
  LibraryBig,
  RefreshCw,
} from "lucide-react";

import {
  Card,
} from "../../../../components/ui/card";

type ReadingUploadErrorProps =
  Readonly<{
    error: Error & {
      digest?: string;
    };

    reset: () => void;
  }>;

export default function ReadingUploadError({
  error,
  reset,
}: ReadingUploadErrorProps) {
  return (
    <main
      className="
        mx-auto flex
        min-h-[60vh]
        w-full max-w-3xl
        items-center
        justify-center
      "
    >
      <Card
        role="alert"
        className="
          relative w-full
          overflow-hidden
          border-red-400/15
          bg-red-400/[0.035]
          p-7 text-center
          sm:p-10
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -left-20 -top-20
            h-56 w-56
            rounded-full
            bg-red-500/10
            blur-3xl
          "
        />

        <div className="relative">
          <div
            className="
              mx-auto flex
              h-16 w-16
              items-center
              justify-center
              rounded-2xl
              border
              border-red-400/15
              bg-red-400/10
              text-red-300
            "
          >
            <CircleAlert
              aria-hidden="true"
              className="h-7 w-7"
            />
          </div>

          <p
            className="
              mt-6 text-sm
              font-medium
              text-red-300
            "
          >
            Reading Upload
          </p>

          <h1
            className="
              mt-2 text-2xl
              font-bold text-white
              sm:text-3xl
            "
          >
            صفحه آپلود با خطا مواجه شد
          </h1>

          <p
            className="
              mx-auto mt-4
              max-w-xl text-sm
              leading-8
              text-slate-500
            "
          >
            هنگام آماده‌سازی فرم یا
            پردازش فایل مشکلی رخ داده است.
            می‌توانی صفحه را دوباره
            بارگذاری کنی.
          </p>

          {error.digest ? (
            <div
              className="
                mx-auto mt-5
                w-fit rounded-xl
                border
                border-white/[0.06]
                bg-black/20
                px-4 py-2
              "
            >
              <span
                className="
                  text-xs
                  text-slate-600
                "
              >
                شناسه خطا:
              </span>

              <code
                dir="ltr"
                className="
                  mr-2 font-mono
                  text-xs
                  text-slate-400
                "
              >
                {error.digest}
              </code>
            </div>
          ) : null}

          <div
            className="
              mt-8 flex
              flex-col
              justify-center gap-3
              sm:flex-row
            "
          >
            <button
              type="button"
              onClick={reset}
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
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-cyan-200
              "
            >
              <RefreshCw
                aria-hidden="true"
                className="h-4 w-4"
              />

              تلاش دوباره
            </button>

            <Link
              href="/reading/library"
              className="
                inline-flex min-h-11
                items-center
                justify-center gap-2
                rounded-xl border
                border-white/[0.08]
                bg-white/[0.04]
                px-5 py-2.5
                text-sm font-medium
                text-slate-300
                transition
                hover:bg-white/[0.08]
                hover:text-white
              "
            >
              <LibraryBig
                aria-hidden="true"
                className="h-4 w-4"
              />

              کتابخانه
            </Link>

            <Link
              href="/reading"
              className="
                inline-flex min-h-11
                items-center
                justify-center gap-2
                rounded-xl border
                border-white/[0.08]
                bg-white/[0.04]
                px-5 py-2.5
                text-sm font-medium
                text-slate-300
                transition
                hover:bg-white/[0.08]
                hover:text-white
              "
            >
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4"
              />

              Reading
            </Link>
          </div>
        </div>
      </Card>
    </main>
  );
}