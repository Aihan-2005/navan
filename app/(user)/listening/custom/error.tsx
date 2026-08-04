"use client";

import { useEffect } from "react";
import {
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

type CustomListeningErrorProps =
  Readonly<{
    error: Error & {
      digest?: string;
    };

    reset: () => void;
  }>;

export default function CustomListeningError({
  error,
  reset,
}: CustomListeningErrorProps) {
  useEffect(() => {
    console.error(
      "Custom listening page error:",
      error,
    );
  }, [error]);

  return (
    <main
      className="
        mx-auto flex min-h-[65vh]
        w-full max-w-2xl
        items-center justify-center
        px-4 py-12
      "
    >
      <section
        role="alert"
        className="
          w-full rounded-3xl
          border border-red-400/15
          bg-white/[0.035]
          p-8 text-center sm:p-12
        "
      >
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

        <h1 className="mt-6 text-2xl font-bold text-white">
          بخش محتوای شخصی بارگذاری نشد
        </h1>

        <p className="mt-3 text-sm leading-7 text-slate-500">
          هنگام آماده‌سازی فرم آپلود یا لینک مشکلی رخ داده
          است.
        </p>

        <button
          type="button"
          onClick={reset}
          className="
            mt-7 inline-flex min-h-11
            items-center justify-center gap-2
            rounded-xl bg-cyan-400
            px-5 py-2.5 text-sm
            font-bold text-slate-950
            transition hover:bg-cyan-300
          "
        >
          <RefreshCw
            aria-hidden="true"
            className="h-4 w-4"
          />

          تلاش مجدد
        </button>
      </section>
    </main>
  );
}