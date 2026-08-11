"use client";

import { Loader2, CheckCircle2, AlertCircle, X } from "lucide-react";

import { Card } from "../../../../components/ui/card";
import { cn } from "../../../../lib/utils/cn";

type ExtractionState = "idle" | "extracting" | "success" | "error";

type DocumentExtractionStateProps = Readonly<{
  state: ExtractionState;
  fileName?: string;
  error?: string;
  onRetry?: () => void;
  onDismiss?: () => void;
}>;

export function DocumentExtractionState({
  state,
  fileName,
  error,
  onRetry,
  onDismiss,
}: DocumentExtractionStateProps) {
  if (state === "idle") {
    return null;
  }

  return (
    <Card
      className={cn(
        "p-4 transition-all",
        state === "extracting" && "border-cyan-400/20 bg-cyan-400/5",
        state === "success" && "border-emerald-400/20 bg-emerald-400/5",
        state === "error" && "border-red-400/20 bg-red-400/5",
      )}
      dir="rtl"
    >
      <div className="flex items-center gap-3">
        {state === "extracting" && (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
            <Loader2
              aria-hidden="true"
              className="h-5 w-5 animate-spin"
            />
          </div>
        )}

        {state === "success" && (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
            <CheckCircle2 aria-hidden="true" className="h-5 w-5" />
          </div>
        )}

        {state === "error" && (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-400/10 text-red-300">
            <AlertCircle aria-hidden="true" className="h-5 w-5" />
          </div>
        )}

        <div className="flex-1">
          {state === "extracting" && (
            <>
              <p className="text-sm font-semibold text-white">
                در حال استخراج متن...
              </p>
              <p className="mt-1 text-xs text-slate-400">
                {fileName && `پردازش فایل «${fileName}»`}
              </p>
            </>
          )}

          {state === "success" && (
            <>
              <p className="text-sm font-semibold text-white">
                متن با موفقیت استخراج شد
              </p>
              <p className="mt-1 text-xs text-slate-400">
                {fileName && `فایل «${fileName}» به فضای نوشتن اضافه شد`}
              </p>
            </>
          )}

          {state === "error" && (
            <>
              <p className="text-sm font-semibold text-white">
                خطا در استخراج متن
              </p>
              <p className="mt-1 text-xs text-slate-400">
                {error || "متأسفانه نتوانستیم متن را از فایل استخراج کنیم"}
              </p>
            </>
          )}
        </div>

        {state === "error" && onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
          >
            تلاش مجدد
          </button>
        )}

        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="rounded-lg border border-white/10 p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
            aria-label="بستن"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        )}
      </div>
    </Card>
  );
}
