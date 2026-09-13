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

import {
  cn,
} from "../../../../lib/utils/cn";

import type {
  ListeningNotesUploadResult,
} from "../../types/listening.types";

type ExtractedNoteEditorProps =
  Readonly<{
    result:
      ListeningNotesUploadResult;

    onReplaceTranscript:
      (
        text:
          string,
        result:
          ListeningNotesUploadResult,
      ) => void;

    onAppendTranscript:
      (
        text:
          string,
        result:
          ListeningNotesUploadResult,
      ) => void;

    onReset:
      () => void;
  }>;

const percentageFormatter =
  new Intl.NumberFormat(
    "fa-IR",
    {
      maximumFractionDigits:
        0,
    },
  );

export function ExtractedNoteEditor({
  result,
  onReplaceTranscript,
  onAppendTranscript,
  onReset,
}: ExtractedNoteEditorProps) {
  const [
    extractedText,
    setExtractedText,
  ] =
    useState(
      result.extractedText,
    );

  const [
    copied,
    setCopied,
  ] =
    useState(
      false,
    );

  useEffect(() => {
    setExtractedText(
      result.extractedText,
    );

    setCopied(
      false,
    );
  }, [
    result.id,
    result.extractedText,
  ]);

  const normalizedText =
    extractedText.trim();

  async function copyText(): Promise<void> {
    if (
      !normalizedText
    ) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        normalizedText,
      );

      setCopied(
        true,
      );

      window.setTimeout(
        () => {
          setCopied(
            false,
          );
        },
        1500,
      );
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
        mt-5
        rounded-2xl
        border
        border-[#B8E3D0]
        bg-[#F1FCF6]
        p-4
        sm:p-5
      "
    >
      <div
        className="
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-start
          sm:justify-between
        "
      >
        <div>
          <div
            className="
              flex
              items-center
              gap-2
              text-[#047857]
            "
          >
            <FileCheck2
              aria-hidden="true"
              className="h-5 w-5"
            />

            <span
              className="
                text-sm
                font-black
              "
            >
              متن استخراج شد
            </span>
          </div>

          <p
            className="
              mt-2
              text-xs
              leading-6
              text-[#64748B]
            "
          >
            قبل از ورود به Transcript،
            خطاهای احتمالی OCR را اصلاح کن.
          </p>
        </div>

        {result.extractionConfidence !==
        null ? (
          <span
            className="
              self-start
              rounded-full
              border
              border-[#A7DCC7]
              bg-white
              px-3
              py-1.5
              text-xs
              font-bold
              text-[#047857]
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

      {result.warnings.length >
      0 ? (
        <div
          className="
            mt-4
            rounded-xl
            border
            border-[#F5D7A1]
            bg-[#FFF9EB]
            px-4
            py-3
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
              text-xs
              font-black
              text-[#B45309]
            "
          >
            <TriangleAlert
              aria-hidden="true"
              className="h-4 w-4"
            />

            نکات استخراج
          </div>

          <ul
            className="
              mt-2
              space-y-1.5
            "
          >
            {result.warnings.map(
              (
                warning,
              ) => (
                <li
                  key={
                    warning
                  }
                  className="
                    text-xs
                    leading-6
                    text-[#7C5B28]
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
        value={
          extractedText
        }
        onChange={(
          event,
        ) =>
          setExtractedText(
            event.target.value,
          )
        }
        maxLength={
          25_000
        }
        spellCheck={false}
        aria-label="متن استخراج‌شده از فایل"
        className="
          mt-4
          min-h-56
          w-full
          resize-y
          rounded-xl
          border
          border-[#CFE0DC]
          bg-white
          px-4
          py-3
          text-left
          text-sm
          leading-7
          text-[#334155]
          outline-none
          transition
          focus:border-[#0D9488]
          focus:ring-4
          focus:ring-[#14B8A6]/10
        "
        dir="ltr"
      />

      <div
        className="
          mt-4
          flex
          flex-col
          gap-3
          sm:flex-row
          sm:flex-wrap
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
          disabled={
            !normalizedText
          }
          className="
            inline-flex
            min-h-10
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#00685F]
            px-4
            py-2
            text-xs
            font-black
            text-white
            transition
            hover:bg-[#005A52]
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
          disabled={
            !normalizedText
          }
          className="
            inline-flex
            min-h-10
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-[#A9D4CD]
            bg-[#E7F4F2]
            px-4
            py-2
            text-xs
            font-bold
            text-[#00685F]
            transition
            hover:bg-[#D8EFEB]
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
          disabled={
            !normalizedText
          }
          className={cn(
            "inline-flex",
            "min-h-10",
            "items-center",
            "justify-center",
            "gap-2",
            "rounded-xl",
            "border",
            "border-[#D8E2E0]",
            "bg-white",
            "px-4",
            "py-2",
            "text-xs",
            "font-medium",
            "text-[#64748B]",
            "transition",
            "hover:bg-[#F8FAF9]",
          )}
        >
          {copied ? (
            <Check
              aria-hidden="true"
              className="
                h-4
                w-4
                text-[#047857]
              "
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
          onClick={
            onReset
          }
          className="
            inline-flex
            min-h-10
            items-center
            justify-center
            gap-2
            rounded-xl
            px-3
            py-2
            text-xs
            font-medium
            text-[#64748B]
            transition
            hover:bg-white
            hover:text-[#334155]
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
