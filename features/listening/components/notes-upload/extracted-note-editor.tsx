"use client";

import {
  Check,
  Clipboard,
  FileCheck2,
  Plus,
  RefreshCcw,
  Replace,
  TriangleAlert,
} from "lucide-react";
import {
  useEffect,
  useState,
} from "react";

import { cn } from "../../../../lib/utils/cn";

import type {
  ListeningNotesUploadResult,
} from "../../types/listening.types";

type ExtractedNoteEditorProps = Readonly<{
  result: ListeningNotesUploadResult;

  onReplaceTranscript: (
    text: string,
    result: ListeningNotesUploadResult,
  ) => void;

  onAppendTranscript: (
    text: string,
    result: ListeningNotesUploadResult,
  ) => void;

  onReset: () => void;
}>;

const percentageFormatter =
  new Intl.NumberFormat("fa-IR", {
    maximumFractionDigits: 0,
  });

export function ExtractedNoteEditor({
  result,
  onReplaceTranscript,
  onAppendTranscript,
  onReset,
}: ExtractedNoteEditorProps) {
  const [extractedText, setExtractedText] =
    useState(result.extractedText);

  const [copied, setCopied] =
    useState(false);

  useEffect(() => {
    setExtractedText(
      result.extractedText,
    );

    setCopied(false);
  }, [
    result.id,
    result.extractedText,
  ]);

  const normalizedText =
    extractedText.trim();

  async function copyText(): Promise<void> {
    if (!normalizedText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        normalizedText,
      );

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1_500);
    } catch (error) {
      console.error(
        "Copy extracted text failed:",
        error,
      );
    }
  }

  return (
    <div
      className="
        mt-5 rounded-2xl
        border border-emerald-400/15
        bg-emerald-400/[0.035]
        p-4 sm:p-5
      "
    >
      <div
        className="
          flex flex-col gap-4
          sm:flex-row sm:items-start
          sm:justify-between
        "
      >
        <div>
          <div className="flex items-center gap-2 text-emerald-300">
            <FileCheck2
              aria-hidden="true"
              className="h-5 w-5"
            />

            <span className="text-sm font-medium">
              متن استخراج شد
            </span>
          </div>

          <p className="mt-2 text-xs leading-6 text-slate-500">
            قبل از واردکردن متن به Transcript،
            اشتباه‌های احتمالی OCR یا استخراج فایل را
            اصلاح کن.
          </p>
        </div>

        {result.extractionConfidence !== null ? (
          <span
            className="
              self-start rounded-full
              border border-emerald-400/15
              bg-emerald-400/10
              px-3 py-1.5 text-xs
              font-medium text-emerald-200
            "
          >
            اطمینان استخراج:{" "}
            {percentageFormatter.format(
              result.extractionConfidence *
                100,
            )}
            ٪
          </span>
        ) : null}
      </div>

      {result.warnings.length > 0 ? (
        <div
          className="
            mt-4 rounded-xl
            border border-amber-400/15
            bg-amber-400/[0.05]
            px-4 py-3
          "
        >
          <div className="flex items-center gap-2 text-xs font-medium text-amber-200">
            <TriangleAlert
              aria-hidden="true"
              className="h-4 w-4"
            />

            نکات استخراج
          </div>

          <ul className="mt-2 space-y-1.5">
            {result.warnings.map(
              (warning) => (
                <li
                  key={warning}
                  className="
                    text-xs leading-6
                    text-amber-100/60
                  "
                >
                  • {warning}
                </li>
              ),
            )}
          </ul>
        </div>
      ) : null}

      <textarea
        value={extractedText}
        onChange={(event) =>
          setExtractedText(
            event.target.value,
          )
        }
        maxLength={25_000}
        spellCheck={false}
        aria-label="متن استخراج‌شده از فایل"
        className="
          mt-4 min-h-56 w-full resize-y
          rounded-xl border border-white/[0.08]
          bg-black/20 px-4 py-3
          text-left text-sm leading-7
          text-slate-200 outline-none
          transition
          focus:border-emerald-400/25
          focus:ring-4
          focus:ring-emerald-400/[0.04]
        "
        dir="ltr"
      />

      <div
        className="
          mt-4 flex flex-col gap-3
          sm:flex-row sm:flex-wrap
          sm:items-center
        "
      >
        <button
          type="button"
          onClick={() =>
            onReplaceTranscript(
              normalizedText,
              result,
            )
          }
          disabled={!normalizedText}
          className="
            inline-flex min-h-10 items-center
            justify-center gap-2 rounded-xl
            bg-cyan-400 px-4 py-2
            text-xs font-bold text-slate-950
            transition hover:bg-cyan-300
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <Replace
            aria-hidden="true"
            className="h-4 w-4"
          />

          جایگزینی Transcript
        </button>

        <button
          type="button"
          onClick={() =>
            onAppendTranscript(
              normalizedText,
              result,
            )
          }
          disabled={!normalizedText}
          className="
            inline-flex min-h-10 items-center
            justify-center gap-2 rounded-xl
            border border-cyan-400/15
            bg-cyan-400/[0.06]
            px-4 py-2 text-xs
            font-semibold text-cyan-200
            transition hover:bg-cyan-400/10
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <Plus
            aria-hidden="true"
            className="h-4 w-4"
          />

          افزودن به Transcript
        </button>

        <button
          type="button"
          onClick={() => {
            void copyText();
          }}
          disabled={!normalizedText}
          className={cn(
            "inline-flex min-h-10 items-center",
            "justify-center gap-2 rounded-xl",
            "border border-white/[0.08]",
            "bg-white/[0.035] px-4 py-2",
            "text-xs font-medium text-slate-400",
            "transition hover:bg-white/[0.07]",
            "hover:text-white",
            "disabled:cursor-not-allowed",
            "disabled:opacity-40",
          )}
        >
          {copied ? (
            <Check
              aria-hidden="true"
              className="h-4 w-4 text-emerald-300"
            />
          ) : (
            <Clipboard
              aria-hidden="true"
              className="h-4 w-4"
            />
          )}

          {copied
            ? "کپی شد"
            : "کپی متن"}
        </button>

        <button
          type="button"
          onClick={onReset}
          className="
            inline-flex min-h-10 items-center
            justify-center gap-2 rounded-xl
            px-3 py-2 text-xs
            font-medium text-slate-500
            transition hover:bg-white/[0.04]
            hover:text-slate-300
            sm:mr-auto
          "
        >
          <RefreshCcw
            aria-hidden="true"
            className="h-4 w-4"
          />

          انتخاب فایل دیگر
        </button>
      </div>
    </div>
  );
}