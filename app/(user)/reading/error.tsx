"use client";

import {
  useEffect,
} from "react";
import {
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

type ReadingErrorProps = Readonly<{
  error: Error & {
    digest?: string;
  };

  reset: () => void;
}>;

export default function ReadingError({
  error,
  reset,
}: ReadingErrorProps) {
  useEffect(() => {
    console.error(
      "Reading page error:",
      {
        name: error.name,
        message: error.message,
        digest: error.digest,
      },
    );
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
        aria-labelledby="reading-error-title"
        className="
          w-full rounded-3xl
          border border-red-400/15
          bg-white/[0.04]
          p-8 text-center
          shadow-[0_24px_80px_rgba(0,0,0,0.25)]
          backdrop-blur-sm
          sm:p-12
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

        <h1
          id="reading-error-title"
          className="mt-6 text-2xl font-bold text-white"
        >
          بخش خواندن بارگذاری نشد
        </h1>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-400">
          دریافت منابع Reading با مشکل مواجه شده است.
          دوباره تلاش کن.
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

        <button
          type="button"
          onClick={reset}
          className="
            mt-8 inline-flex items-center
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
      </section>
    </main>
  );
}