"use client";

import {
  ArrowLeft,
  BrainCircuit,
  Send,
} from "lucide-react";

import {
  Card,
} from "../../../../components/ui/card";

type AnalysisSubmitBarProps =
  Readonly<{
    canSubmit:
      boolean;

    onSubmit:
      () => void;

    onClear:
      () => void;

    wordCount:
      number;

    isSubmitting?:
      boolean;

    errorMessage?:
      string | null;
  }>;

const numberFormatter =
  new Intl.NumberFormat(
    "fa-IR",
  );

export function AnalysisSubmitBar({
  canSubmit,
  onSubmit,
  onClear,
  wordCount,
  isSubmitting =
    false,
  errorMessage =
    null,
}: AnalysisSubmitBarProps) {
  return (
    <Card
      className="p-4"
      dir="rtl"
    >
      <div
        className="
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div>
          <div
            className="
              flex
              items-center
              gap-2
              text-sm
              text-cyan-300
            "
          >
            <BrainCircuit
              aria-hidden="true"
              className="h-4 w-4"
            />

            تحلیل هوشمند نوشته
          </div>

          <p
            className="
              mt-2
              text-sm
              leading-6
              text-slate-500
            "
          >
            {isSubmitting
              ? "در حال آماده‌سازی تحلیل نوشته..."
              : canSubmit
                ? `${numberFormatter.format(
                    wordCount,
                  )} کلمه نوشته‌ای. متن در همین وضعیت قابل ارسال برای تحلیل است.`
                : "نوشتن را شروع کن؛ هیچ حداقل یا حداکثر تعداد کلمه‌ای برای تحلیل وجود ندارد."}
          </p>
        </div>

        <div
          className="
            flex
            flex-wrap
            gap-2
          "
        >
          <button
            type="button"
            onClick={
              onSubmit
            }
            disabled={
              !canSubmit ||
              isSubmitting
            }
            className="
              inline-flex
              min-h-11
              items-center
              gap-2
              rounded-2xl
              border
              border-cyan-300/20
              bg-cyan-400/10
              px-4
              py-2.5
              text-sm
              font-semibold
              text-cyan-200
              transition
              hover:bg-cyan-400/15
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            {isSubmitting ? (
              <>
                <span
                  aria-hidden="true"
                  className="
                    h-4
                    w-4
                    animate-spin
                    rounded-full
                    border-2
                    border-cyan-200
                    border-t-transparent
                  "
                />

                در حال تحلیل
              </>
            ) : (
              <>
                <Send
                  aria-hidden="true"
                  className="h-4 w-4"
                />

                ارسال برای تحلیل
              </>
            )}
          </button>

          <button
            type="button"
            onClick={
              onClear
            }
            disabled={
              isSubmitting
            }
            className="
              inline-flex
              min-h-11
              items-center
              gap-2
              rounded-2xl
              border
              border-white/10
              bg-white/5
              px-4
              py-2.5
              text-sm
              font-semibold
              text-slate-100
              transition
              hover:bg-white/10
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <ArrowLeft
              aria-hidden="true"
              className="h-4 w-4"
            />

            پاک کردن متن
          </button>
        </div>
      </div>

      {errorMessage ? (
        <div
          role="alert"
          className="
            mt-4
            rounded-xl
            border
            border-red-400/15
            bg-red-400/[0.05]
            px-4
            py-3
            text-sm
            leading-6
            text-red-200
          "
        >
          {errorMessage}
        </div>
      ) : null}
    </Card>
  );
}