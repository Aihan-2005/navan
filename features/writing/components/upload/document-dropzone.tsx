"use client";

import { useCallback, useRef, useState } from "react";
import { UploadCloud, FileText, X, CheckCircle2, AlertCircle } from "lucide-react";

import { Card } from "../../../../components/ui/card";
import { cn } from "../../../../lib/utils/cn";

type DocumentDropzoneProps = Readonly<{
  onFileSelect: (file: File) => void;
  maxSize?: number; // in bytes
  acceptedTypes?: string[];
}>;

export function DocumentDropzone({
  onFileSelect,
  maxSize = 5 * 1024 * 1024, // 5MB default
  acceptedTypes = [".txt", ".md", ".doc", ".docx", ".pdf"],
}: DocumentDropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      setIsDragging(false);
      setError(null);

      const file = event.dataTransfer.files[0];
      if (!file) {
        return;
      }

      if (file.size > maxSize) {
        setError("حجم فایل باید کمتر از ۵ مگابایت باشد");
        return;
      }

      onFileSelect(file);
    },
    [maxSize, onFileSelect],
  );

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setError(null);
      const file = event.target.files?.[0];
      if (!file) {
        return;
      }

      if (file.size > maxSize) {
        setError("حجم فایل باید کمتر از ۵ مگابایت باشد");
        return;
      }

      onFileSelect(file);
    },
    [maxSize, onFileSelect],
  );

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <Card
      className={cn(
        "relative overflow-hidden p-6 transition-all",
        isDragging && "border-cyan-400/40 bg-cyan-400/5",
      )}
      dir="rtl"
    >
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={cn(
          "flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 transition-all cursor-pointer",
          isDragging
            ? "border-cyan-400/60 bg-cyan-400/10"
            : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]",
        )}
      >
        <div
          className={cn(
            "flex h-16 w-16 items-center justify-center rounded-2xl transition-all",
            isDragging
              ? "bg-cyan-400/20 text-cyan-300"
              : "bg-white/5 text-slate-400",
          )}
        >
          <UploadCloud aria-hidden="true" className="h-8 w-8" />
        </div>

        <p className="mt-4 text-center text-sm font-semibold text-white">
          فایل را اینجا بکش و رها کن
        </p>

        <p className="mt-2 text-center text-xs text-slate-500">
          یا برای انتخاب فایل کلیک کن
        </p>

        <p className="mt-4 text-center text-[10px] text-slate-600">
          فرمت‌های مجاز: {acceptedTypes.join(", ")}
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes.join(",")}
          onChange={handleFileSelect}
          className="sr-only"
          aria-label="انتخاب فایل برای آپلود"
        />
      </div>

      {error && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-400/15 bg-red-400/10 px-3 py-2 text-xs text-red-200">
          <AlertCircle aria-hidden="true" className="h-4 w-4 shrink-0" />
          <span>{error}</span>
          <button
            type="button"
            onClick={() => setError(null)}
            className="mr-auto rounded-lg p-1 text-red-200/80 hover:bg-red-400/20"
          >
            <X aria-hidden="true" className="h-3 w-3" />
          </button>
        </div>
      )}
    </Card>
  );
}
