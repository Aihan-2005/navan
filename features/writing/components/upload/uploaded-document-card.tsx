"use client";

import { FileText, Calendar, FileText as FileIcon, X, CheckCircle2 } from "lucide-react";

import { Card } from "../../../../components/ui/card";
import { cn } from "../../../../lib/utils/cn";

type UploadedDocumentCardProps = Readonly<{
  fileName: string;
  fileSize?: number;
  uploadedAt?: string;
  wordCount?: number;
  status?: "uploading" | "ready" | "error";
  onRemove?: () => void;
  onView?: () => void;
}>;

export function UploadedDocumentCard({
  fileName,
  fileSize,
  uploadedAt,
  wordCount,
  status = "ready",
  onRemove,
  onView,
}: UploadedDocumentCardProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) {
      return `${bytes} بایت`;
    }
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} کیلوبایت`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} مگابایت`;
  };

  return (
    <Card
      className={cn(
        "relative overflow-hidden p-4 transition-all",
        status === "uploading" && "border-cyan-400/20 bg-cyan-400/5",
        status === "ready" && "border-emerald-400/20 bg-emerald-400/5",
        status === "error" && "border-red-400/20 bg-red-400/5",
      )}
      dir="rtl"
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
            status === "uploading" && "bg-cyan-400/10 text-cyan-300",
            status === "ready" && "bg-emerald-400/10 text-emerald-300",
            status === "error" && "bg-red-400/10 text-red-300",
          )}
        >
          {status === "uploading" ? (
            <FileIcon aria-hidden="true" className="h-6 w-6" />
          ) : status === "ready" ? (
            <CheckCircle2 aria-hidden="true" className="h-6 w-6" />
          ) : (
            <FileIcon aria-hidden="true" className="h-6 w-6" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white truncate">
                {fileName}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                {fileSize && (
                  <span className="flex items-center gap-1.5">
                    <FileText aria-hidden="true" className="h-3 w-3" />
                    {formatFileSize(fileSize)}
                  </span>
                )}

                {uploadedAt && (
                  <span className="flex items-center gap-1.5">
                    <Calendar aria-hidden="true" className="h-3 w-3" />
                    {uploadedAt}
                  </span>
                )}

                {wordCount !== undefined && (
                  <span className="flex items-center gap-1.5">
                    <FileText aria-hidden="true" className="h-3 w-3" />
                    {wordCount} کلمه
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {status === "ready" && onView && (
                <button
                  type="button"
                  onClick={onView}
                  className="rounded-lg border border-white/10 bg-white/5 p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                  aria-label="مشاهده متن"
                >
                  <FileText aria-hidden="true" className="h-4 w-4" />
                </button>
              )}

              {onRemove && (
                <button
                  type="button"
                  onClick={onRemove}
                  className="rounded-lg border border-white/10 p-2 text-slate-400 transition hover:bg-white/10 hover:text-red-300"
                  aria-label="حذف فایل"
                >
                  <X aria-hidden="true" className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {status === "uploading" && (
            <div className="mt-3">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-2/3 animate-pulse rounded-full bg-cyan-400" />
              </div>
              <p className="mt-2 text-xs text-cyan-200">
                در حال پردازش فایل...
              </p>
            </div>
          )}

          {status === "error" && (
            <p className="mt-3 text-xs text-red-200">
              خطا در پردازش فایل. لطفاً دوباره تلاش کنید.
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
