"use client";

import {
  Check,
  Clock3,
  FilePenLine,
  Save,
  Trash2,
} from "lucide-react";

import {
  useMemo,
} from "react";

import {
  cn,
} from "../../../../lib/utils/cn";

import type {
  ListeningDraftSaveStatus,
} from "../../types/listening.types";

type TranscriptionEditorProps =
  Readonly<{
    value:
      string;

    minimumWords:
      number;

    saveStatus:
      ListeningDraftSaveStatus;

    lastSavedAt:
      string | null;

    remoteStatus?:
      "idle" |
      "saving" |
      "saved" |
      "error";

    onChange:
      (
        value:
          string,
      ) => void;

    onSave:
      () => void;

    onClear:
      () => void;
  }>;

const numberFormatter =
  new Intl.NumberFormat(
    "fa-IR",
  );

const timeFormatter =
  new Intl.DateTimeFormat(
    "fa-IR",
    {
      hour:
        "2-digit",

      minute:
        "2-digit",
    },
  );

const saveStatusLabels = {
  idle:
    "در انتظار نوشتن",

  dirty:
    "تغییرات ذخیره‌نشده",

  saving:
    "در حال ذخیره...",

  saved:
    "ذخیره شد",

  error:
    "خطا در ذخیره",
} satisfies Record<
  ListeningDraftSaveStatus,
  string
>;

function calculateTextStatistics(
  value:
    string,
) {
  const normalizedValue =
    value.trim();

  if (
    !normalizedValue
  ) {
    return {
      wordCount:
        0,

      characterCount:
        0,

      sentenceCount:
        0,
    };
  }

  const words =
    normalizedValue.split(
      /\s+/u,
    );

  const sentences =
    normalizedValue
      .split(
        /[.!?]+/u,
      )
      .map(
        (sentence) =>
          sentence.trim(),
      )
      .filter(
        Boolean,
      );

  return {
    wordCount:
      words.length,

    characterCount:
      value.length,

    sentenceCount:
      sentences.length,
  };
}

export function TranscriptionEditor({
  value,
  minimumWords,
  saveStatus,
  lastSavedAt,
  remoteStatus =
    "idle",
  onChange,
  onSave,
  onClear,
}: TranscriptionEditorProps) {
  const statistics =
    useMemo(
      () =>
        calculateTextStatistics(
          value,
        ),
      [
        value,
      ],
    );

  const minimumReached =
    statistics.wordCount >=
    minimumWords;

  function handleClear(): void {
    if (
      !value.trim()
    ) {
      return;
    }

    const confirmed =
      window.confirm(
        "تمام متن نوشته‌شده حذف شود؟",
      );

    if (
      confirmed
    ) {
      onClear();
    }
  }

  return (
    <section
      className="
        rounded-2xl
        border
        border-[#DCE7E5]
        bg-white
        p-5
        shadow-[0_8px_28px_rgba(15,23,42,0.04)]
        sm:p-6
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
              text-[#00685F]
            "
          >
            <FilePenLine
              aria-hidden="true"
              className="h-5 w-5"
            />

            <span
              className="
                text-sm
                font-black
              "
            >
              Transcript شما
            </span>
          </div>

          <h2
            className="
              mt-2
              text-xl
              font-black
              text-[#172321]
            "
          >
            چیزی را که می‌شنوی بنویس
          </h2>

          <p
            className="
              mt-2
              text-xs
              leading-6
              text-[#64748B]
            "
          >
            Spell Check غیرفعال است تا
            نتیجه تمرین واقعی‌تر باشد.
          </p>
        </div>

        <div
          className="
            flex
            flex-wrap
            gap-2
          "
        >
          <SaveStatusBadge
            status={
              saveStatus
            }
          />

          {remoteStatus !==
          "idle" ? (
            <span
              className={cn(
                "inline-flex",
                "items-center",
                "gap-1.5",
                "rounded-xl",
                "px-3",
                "py-2",
                "text-xs",
                "font-medium",

                remoteStatus ===
                "error"
                  ? [
                      "bg-[#FEF2F2]",
                      "text-[#B91C1C]",
                    ]
                  : [
                      "bg-[#EEF8F6]",
                      "text-[#00685F]",
                    ],
              )}
            >
              Backend:
              {" "}
              {remoteStatus ===
              "saving"
                ? "در حال ذخیره"
                : remoteStatus ===
                    "saved"
                  ? "همگام شد"
                  : "خطا"}
            </span>
          ) : null}
        </div>
      </div>

      <textarea
        value={value}
        onChange={(
          event,
        ) =>
          onChange(
            event.target.value,
          )
        }
        onKeyDown={(
          event,
        ) => {
          const saveShortcut =
            (
              event.metaKey ||
              event.ctrlKey
            ) &&
            event.key.toLowerCase() ===
              "s";

          if (
            !saveShortcut
          ) {
            return;
          }

          event.preventDefault();

          onSave();
        }}
        maxLength={
          20_000
        }
        spellCheck={false}
        autoCorrect="off"
        autoCapitalize="off"
        placeholder="Start typing what you hear..."
        aria-label="متن رونویسی‌شده از فایل صوتی"
        className="
          mt-6
          min-h-[24rem]
          w-full
          resize-y
          rounded-2xl
          border
          border-[#D8E2E0]
          bg-[#FBFCFC]
          px-5
          py-4
          text-left
          text-base
          leading-8
          text-[#1E293B]
          outline-none
          transition
          placeholder:text-[#A3AFAD]
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
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div
          className="
            flex
            flex-wrap
            gap-4
            text-xs
            text-[#64748B]
          "
        >
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

        <div
          className="
            flex
            flex-wrap
            items-center
            gap-2
          "
        >
          <button
            type="button"
            onClick={
              handleClear
            }
            disabled={
              !value.trim()
            }
            className="
              inline-flex
              min-h-10
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-[#FECACA]
              bg-[#FEF2F2]
              px-3
              py-2
              text-xs
              font-bold
              text-[#B91C1C]
              transition
              hover:bg-[#FEE2E2]
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
            onClick={
              onSave
            }
            className="
              inline-flex
              min-h-10
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-[#B8DCD6]
              bg-[#EEF8F6]
              px-3
              py-2
              text-xs
              font-bold
              text-[#00685F]
              transition
              hover:bg-[#E1F2EF]
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
          mt-5
          rounded-xl
          border
          border-[#E2E8E6]
          bg-[#F8FAF9]
          px-4
          py-3
        "
      >
        <div
          className="
            flex
            flex-wrap
            items-center
            justify-between
            gap-2
          "
        >
          <p
            className="
              text-xs
              text-[#64748B]
            "
          >
            حداقل متن برای تحلیل:{" "}
            {numberFormatter.format(
              minimumWords,
            )}{" "}
            کلمه
          </p>

          <p
            className={cn(
              "text-xs",
              "font-black",

              minimumReached
                ? "text-[#047857]"
                : "text-[#B45309]",
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
          <p
            className="
              mt-2
              text-[10px]
              text-[#94A3B8]
            "
          >
            آخرین ذخیره:{" "}
            {timeFormatter.format(
              new Date(
                lastSavedAt,
              ),
            )}
          </p>
        ) : null}
      </div>
    </section>
  );
}

function SaveStatusBadge({
  status,
}: Readonly<{
  status:
    ListeningDraftSaveStatus;
}>) {
  return (
    <span
      className={cn(
        "inline-flex",
        "items-center",
        "gap-2",
        "rounded-xl",
        "px-3",
        "py-2",
        "text-xs",

        status ===
        "error"
          ? [
              "bg-[#FEF2F2]",
              "text-[#B91C1C]",
            ]
          : [
              "bg-[#F1F5F4]",
              "text-[#64748B]",
            ],
      )}
    >
      {status ===
      "saved" ? (
        <Check
          aria-hidden="true"
          className="
            h-3.5
            w-3.5
            text-[#047857]
          "
        />
      ) : (
        <Clock3
          aria-hidden="true"
          className="h-3.5 w-3.5"
        />
      )}

      {
        saveStatusLabels[
          status
        ]
      }
    </span>
  );
}
