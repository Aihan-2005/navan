"use client";

import {
  Check,
  Clock3,
  FilePenLine,
  Save,
  Trash2,
} from "lucide-react";
import { useMemo } from "react";

import { Card } from "../../../../components/ui/card";
import { cn } from "../../../../lib/utils/cn";

import type {
  ListeningDraftSaveStatus,
} from "../../types/listening.types";

type TranscriptionEditorProps = Readonly<{
  value: string;

  minimumWords: number;

  saveStatus: ListeningDraftSaveStatus;
  lastSavedAt: string | null;

  onChange: (value: string) => void;
  onSave: () => void;
  onClear: () => void;
}>;

const numberFormatter =
  new Intl.NumberFormat("fa-IR");

const timeFormatter =
  new Intl.DateTimeFormat("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  });

const saveStatusLabels = {
  idle: "در انتظار نوشتن",
  dirty: "تغییرات ذخیره‌نشده",
  saving: "در حال ذخیره...",
  saved: "ذخیره شد",
  error: "خطا در ذخیره",
} satisfies Record<
  ListeningDraftSaveStatus,
  string
>;

function calculateTextStatistics(
  value: string,
) {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return {
      wordCount: 0,
      characterCount: 0,
      sentenceCount: 0,
    };
  }

  const words =
    normalizedValue.split(/\s+/u);

  const sentences =
    normalizedValue
      .split(/[.!?]+/u)
      .map((sentence) => sentence.trim())
      .filter(Boolean);

  return {
    wordCount: words.length,
    characterCount: value.length,
    sentenceCount: sentences.length,
  };
}

export function TranscriptionEditor({
  value,
  minimumWords,
  saveStatus,
  lastSavedAt,
  onChange,
  onSave,
  onClear,
}: TranscriptionEditorProps) {
  const statistics = useMemo(
    () =>
      calculateTextStatistics(value),
    [value],
  );

  const minimumReached =
    statistics.wordCount >=
    minimumWords;

  function handleClear(): void {
    if (!value.trim()) {
      return;
    }

    const confirmed =
      window.confirm(
        "تمام متن نوشته‌شده حذف شود؟",
      );

    if (confirmed) {
      onClear();
    }
  }

  return (
    <Card className="p-5 sm:p-6">
      <div
        className="
          flex flex-col gap-4
          sm:flex-row sm:items-start
          sm:justify-between
        "
      >
        <div>
          <div className="flex items-center gap-2 text-cyan-300">
            <FilePenLine
              aria-hidden="true"
              className="h-5 w-5"
            />

            <span className="text-sm font-medium">
              Transcript شما
            </span>
          </div>

          <h2 className="mt-2 text-xl font-bold text-white">
            چیزی را که می‌شنوی بنویس
          </h2>

          <p className="mt-2 text-xs leading-6 text-slate-500">
            Spell Check مرورگر غیرفعال است تا نتیجه
            تمرین واقعی‌تر باشد.
          </p>
        </div>

        <div
          className={cn(
            "inline-flex items-center gap-2",
            "self-start rounded-xl px-3 py-2",
            "text-xs",

            saveStatus === "error"
              ? "bg-red-400/10 text-red-200"
              : "bg-white/[0.04] text-slate-500",
          )}
        >
          {saveStatus === "saved" ? (
            <Check
              aria-hidden="true"
              className="h-3.5 w-3.5 text-emerald-300"
            />
          ) : (
            <Clock3
              aria-hidden="true"
              className="h-3.5 w-3.5"
            />
          )}

          {saveStatusLabels[saveStatus]}
        </div>
      </div>

      <textarea
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        onKeyDown={(event) => {
          const saveShortcut =
            (event.metaKey ||
              event.ctrlKey) &&
            event.key.toLowerCase() === "s";

          if (!saveShortcut) {
            return;
          }

          event.preventDefault();
          onSave();
        }}
        maxLength={20_000}
        spellCheck={false}
        autoCorrect="off"
        autoCapitalize="off"
        placeholder="Start typing what you hear..."
        aria-label="متن رونویسی‌شده از فایل صوتی"
        className="
          mt-6 min-h-[24rem] w-full resize-y
          rounded-2xl border border-white/[0.08]
          bg-black/15 px-5 py-4
          text-left text-base leading-8
          text-slate-200 outline-none
          transition placeholder:text-slate-700
          focus:border-cyan-400/25
          focus:ring-4 focus:ring-cyan-400/[0.05]
        "
        dir="ltr"
      />

      <div
        className="
          mt-4 flex flex-col gap-4
          sm:flex-row sm:items-center
          sm:justify-between
        "
      >
        <div className="flex flex-wrap gap-4 text-xs text-slate-500">
          <span>
            {numberFormatter.format(
              statistics.wordCount,
            )}{" "}
            کلمه
          </span>

          <span>
            {numberFormatter.format(
              statistics.characterCount,
            )}{" "}
            کاراکتر
          </span>

          <span>
            {numberFormatter.format(
              statistics.sentenceCount,
            )}{" "}
            جمله
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleClear}
            disabled={!value.trim()}
            className="
              inline-flex min-h-10 items-center
              justify-center gap-2 rounded-xl
              border border-red-400/15
              bg-red-400/[0.05] px-3 py-2
              text-xs font-medium text-red-200
              transition hover:bg-red-400/10
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <Trash2
              aria-hidden="true"
              className="h-4 w-4"
            />

            پاک‌کردن
          </button>

          <button
            type="button"
            onClick={onSave}
            className="
              inline-flex min-h-10 items-center
              justify-center gap-2 rounded-xl
              border border-white/[0.08]
              bg-white/[0.04] px-3 py-2
              text-xs font-medium text-slate-300
              transition hover:bg-white/[0.08]
            "
          >
            <Save
              aria-hidden="true"
              className="h-4 w-4"
            />

            ذخیره
          </button>
        </div>
      </div>

      <div
        className="
          mt-5 rounded-xl
          border border-white/[0.06]
          bg-white/[0.025]
          px-4 py-3
        "
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-slate-500">
            حداقل متن برای تحلیل:
            {" "}
            {numberFormatter.format(
              minimumWords,
            )}{" "}
            کلمه
          </p>

          <p
            className={cn(
              "text-xs font-medium",

              minimumReached
                ? "text-emerald-300"
                : "text-amber-300",
            )}
          >
            {minimumReached
              ? "حداقل لازم تکمیل شده"
              : `${numberFormatter.format(
                  Math.max(
                    minimumWords -
                      statistics.wordCount,
                    0,
                  ),
                )} کلمه باقی مانده`}
          </p>
        </div>

        {lastSavedAt ? (
          <p className="mt-2 text-[10px] text-slate-700">
            آخرین ذخیره:
            {" "}
            {timeFormatter.format(
              new Date(lastSavedAt),
            )}
          </p>
        ) : null}
      </div>
    </Card>
  );
}