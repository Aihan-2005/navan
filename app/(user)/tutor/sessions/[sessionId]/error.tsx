"use client";

import Link from "next/link";

import {
  CircleAlert,
  RefreshCw,
  LayoutDashboard,
} from "lucide-react";

type TutorSessionErrorProps = Readonly<{
  error: Error & {
    digest?: string;
  };

  reset: () => void;
}>;

export default function TutorSessionError({
  error,
  reset,
}: TutorSessionErrorProps) {
  return (
    <main
      className="
        mx-auto flex
        min-h-[65vh]
        w-full max-w-3xl
        items-center
        justify-center
        px-4 py-10
      "
    >
      <section
        role="alert"
        className="
          relative w-full
          overflow-hidden
          rounded-3xl border
          border-red-400/15
          bg-white/[0.035]
          p-7 text-center
          sm:p-12
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -left-24 -top-24
            h-64 w-64
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
            خطا در AI Tutor
          </p>

          <h1
            className="
              mt-2 text-2xl
              font-bold text-white
              sm:text-3xl
            "
          >
            جلسه Tutor بارگذاری نشد
          </h1>

          <p
            className="
              mx-auto mt-4
              max-w-xl
              text-sm leading-8
              text-slate-500
            "
          >
            هنگام آماده‌سازی جلسه مدرس
            هوشمند مشکلی رخ داده است.
          </p>

          {error.digest ? (
            <code
              dir="ltr"
              className="
                mt-5 inline-block
                rounded-xl
                bg-black/20
                px-4 py-2
                font-mono text-xs
                text-slate-500
              "
            >
              {error.digest}
            </code>
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
              "
            >
              <RefreshCw
                aria-hidden="true"
                className="h-4 w-4"
              />

              تلاش مجدد
            </button>

            <Link
              href="/dashboard"
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
              <LayoutDashboard
                aria-hidden="true"
                className="h-4 w-4"
              />

              داشبورد
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}