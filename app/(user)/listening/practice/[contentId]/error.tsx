"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

type ListeningPracticeErrorProps = Readonly<{
  error: Error & {
    digest?: string;
  };

  reset: () => void;
}>;

export default function ListeningPracticeError({
  error,
  reset,
}: ListeningPracticeErrorProps) {
  useEffect(() => {
    console.error("Listening practice error:", {
      name: error.name,
      message: error.message,
      digest: error.digest,
    });
  }, [error]);

  return (
    <main
      className="
        mx-auto flex min-h-[65vh]
        w-full max-w-3xl
        items-center justify-center
        px-4 py-12
      "
    >
      <section
        role="alert"
        aria-labelledby="listening-practice-error-title"
        className="
          relative w-full overflow-hidden
          rounded-3xl border border-red-400/15
          bg-white/[0.035] p-8 text-center
          shadow-[0_24px_80px_rgba(0,0,0,0.25)]
          sm:p-12
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute
            -left-24 -top-24
            h-64 w-64 rounded-full
            bg-red-500/10 blur-3xl
          "
        />

        <div className="relative">
          <div
            className="
              mx-auto flex h-16 w-16
              items-center justify-center
              rounded-2xl bg-red-400/10
              text-red-300
            "
          >
            <AlertTriangle
              aria-hidden="true"
              className="h-8 w-8"
            />
          </div>

          <h1
            id="listening-practice-error-title"
            className="mt-6 text-2xl font-bold text-white"
          >
            تمرین شنیداری بارگذاری نشد
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-400">
            هنگام دریافت فایل صوتی یا اطلاعات تمرین مشکلی
            رخ داده است. دوباره تلاش کن یا به فهرست تمرین‌ها
            برگرد.
          </p>

          {error.digest ? (
            <p
              className="
                mx-auto mt-5 w-fit rounded-xl
                bg-black/20 px-4 py-2
                font-mono text-xs text-slate-600
              "
              dir="ltr"
            >
              Error ID: {error.digest}
            </p>
          ) : null}

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={reset}
              className="
                inline-flex min-h-11 items-center
                justify-center gap-2 rounded-xl
                bg-cyan-400 px-5 py-2.5
                text-sm font-bold text-slate-950
                transition hover:bg-cyan-300
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-cyan-300
              "
            >
              <RefreshCw
                aria-hidden="true"
                className="h-4 w-4"
              />

              تلاش مجدد
            </button>

            <Link
              href="/listening"
              className="
                inline-flex min-h-11 items-center
                justify-center gap-2 rounded-xl
                border border-white/[0.08]
                bg-white/[0.04] px-5 py-2.5
                text-sm font-medium text-slate-300
                transition hover:bg-white/[0.08]
                hover:text-white
              "
            >
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4"
              />

              بازگشت به Listening
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}