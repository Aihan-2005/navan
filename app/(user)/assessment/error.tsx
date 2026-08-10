"use client";

import Link from "next/link";

import {
  CircleAlert,
  Home,
  RefreshCw,
} from "lucide-react";

import {
  Card,
} from "../../../components/ui/card";

type AssessmentErrorProps =
  Readonly<{
    error: Error & {
      digest?: string;
    };

    reset: () => void;
  }>;

export default function AssessmentError({
  error,
  reset,
}: AssessmentErrorProps) {
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
          w-full
          border-red-400/15
          bg-red-400/[0.035]
          p-8 text-center
        "
      >
        <span
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
        </span>

        <h1
          className="
            mt-5 text-2xl
            font-bold text-white
          "
        >
          مرکز ارزیابی بارگذاری نشد
        </h1>

        <p
          className="
            mx-auto mt-3
            max-w-lg
            text-sm leading-7
            text-slate-500
          "
        >
          هنگام دریافت اطلاعات
          Assessment مشکلی رخ داده است.
        </p>

        {error.digest ? (
          <code
            dir="ltr"
            className="
              mt-4 inline-block
              rounded-lg
              bg-black/20
              px-3 py-2
              text-xs
              text-slate-600
            "
          >
            {error.digest}
          </code>
        ) : null}

        <div
          className="
            mt-7 flex
            flex-wrap
            justify-center gap-3
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
            "
          >
            <RefreshCw
              aria-hidden="true"
              className="h-4 w-4"
            />

            تلاش دوباره
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
              text-sm
              text-slate-300
            "
          >
            <Home
              aria-hidden="true"
              className="h-4 w-4"
            />

            داشبورد
          </Link>
        </div>
      </Card>
    </main>
  );
}