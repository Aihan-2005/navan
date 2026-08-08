import Link from "next/link";

import {
  ArrowRight,
  BookOpenText,
  CheckCircle2,
  Clock3,
  Languages,
  Lock,
  Minus,
  Plus,
  Type,
} from "lucide-react";

import {
  Progress,
} from "../../../../components/ui/progress";

import {
  cn,
} from "../../../../lib/utils/cn";

import {
  READING_SECTION_STATUS_LABELS,
} from "../../constants/reading.constants";

import type {
  ReadingSectionDetail,
} from "../../types/reading.types";

import {
  READING_FONT_SIZE_OPTIONS,
  type ReadingFontSize,
} from "./reading-workspace.types";

type ReadingWorkspaceHeaderProps =
  Readonly<{
    section: ReadingSectionDetail;

    progressPercent: number;

    showTranslations: boolean;

    fontSize: ReadingFontSize;

    onToggleTranslations: () => void;

    onFontSizeChange: (
      fontSize: ReadingFontSize,
    ) => void;
  }>;

const numberFormatter =
  new Intl.NumberFormat("fa-IR");

function clampProgress(
  value: number,
): number {
  return Math.min(
    Math.max(value, 0),
    100,
  );
}

function getPreviousFontSize(
  fontSize: ReadingFontSize,
): ReadingFontSize {
  const currentIndex =
    READING_FONT_SIZE_OPTIONS.findIndex(
      (option) =>
        option.value === fontSize,
    );

  const previousIndex = Math.max(
    currentIndex - 1,
    0,
  );

  return (
    READING_FONT_SIZE_OPTIONS[
      previousIndex
    ]?.value ?? "compact"
  );
}

function getNextFontSize(
  fontSize: ReadingFontSize,
): ReadingFontSize {
  const currentIndex =
    READING_FONT_SIZE_OPTIONS.findIndex(
      (option) =>
        option.value === fontSize,
    );

  const nextIndex = Math.min(
    currentIndex + 1,
    READING_FONT_SIZE_OPTIONS.length -
      1,
  );

  return (
    READING_FONT_SIZE_OPTIONS[
      nextIndex
    ]?.value ?? "large"
  );
}

export function ReadingWorkspaceHeader({
  section,
  progressPercent,
  showTranslations,
  fontSize,
  onToggleTranslations,
  onFontSizeChange,
}: ReadingWorkspaceHeaderProps) {
  const safeProgress =
    clampProgress(progressPercent);

  const currentFontSizeLabel =
    READING_FONT_SIZE_OPTIONS.find(
      (option) =>
        option.value === fontSize,
    )?.label ?? "متوسط";

  const isMinimumFontSize =
    fontSize ===
    READING_FONT_SIZE_OPTIONS[0].value;

  const isMaximumFontSize =
    fontSize ===
    READING_FONT_SIZE_OPTIONS[
      READING_FONT_SIZE_OPTIONS.length - 1
    ].value;

  const resourceHref =
    `/reading/resources/` +
    encodeURIComponent(
      section.resourceId,
    );

  return (
    <header
      className="
        relative overflow-hidden
        rounded-3xl border
        border-cyan-400/15
        bg-white/[0.035]
        p-5 sm:p-7
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -left-20 -top-24
          h-64 w-64 rounded-full
          bg-cyan-500/15 blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -bottom-28 right-10
          h-56 w-56 rounded-full
          bg-blue-500/10 blur-3xl
        "
      />

      <div className="relative">
        <div
          className="
            flex flex-col gap-4
            lg:flex-row
            lg:items-start
            lg:justify-between
          "
        >
          <div className="min-w-0">
            <Link
              href={resourceHref}
              className="
                inline-flex min-h-10
                items-center gap-2
                rounded-xl
                border border-white/[0.07]
                bg-white/[0.035]
                px-3 py-2
                text-xs font-medium
                text-slate-400
                transition
                hover:border-white/[0.12]
                hover:bg-white/[0.07]
                hover:text-white
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-cyan-300
              "
            >
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4"
              />

              بازگشت به منبع
            </Link>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span
                className="
                  inline-flex items-center
                  gap-1.5 rounded-full
                  bg-cyan-400/10
                  px-3 py-1
                  text-xs text-cyan-200
                "
              >
                <BookOpenText
                  aria-hidden="true"
                  className="h-3.5 w-3.5"
                />

                بخش{" "}
                {numberFormatter.format(
                  section.order,
                )}
              </span>

              <span
                className={cn(
                  "inline-flex items-center",
                  "gap-1.5 rounded-full",
                  "px-3 py-1 text-xs",

                  section.status ===
                    "completed" && [
                    "bg-emerald-400/10",
                    "text-emerald-300",
                  ],

                  section.status ===
                    "in_progress" && [
                    "bg-amber-400/10",
                    "text-amber-200",
                  ],

                  section.status ===
                    "available" && [
                    "bg-blue-400/10",
                    "text-blue-200",
                  ],

                  section.status ===
                    "locked" && [
                    "bg-white/[0.05]",
                    "text-slate-500",
                  ],
                )}
              >
                {section.status ===
                "completed" ? (
                  <CheckCircle2
                    aria-hidden="true"
                    className="h-3.5 w-3.5"
                  />
                ) : section.status ===
                  "locked" ? (
                  <Lock
                    aria-hidden="true"
                    className="h-3.5 w-3.5"
                  />
                ) : null}

                {
                  READING_SECTION_STATUS_LABELS[
                    section.status
                  ]
                }
              </span>

              <span
                className="
                  rounded-full
                  bg-white/[0.05]
                  px-3 py-1
                  text-xs text-slate-400
                "
              >
                سطح {section.cefrLevel}
              </span>
            </div>

            <p
              className="
                mt-5 text-sm
                font-medium text-cyan-300
              "
              dir="ltr"
            >
              {section.resourceTitle}
            </p>

            <h1
              className="
                mt-2 text-2xl
                font-bold leading-tight
                text-white
                sm:text-3xl
                lg:text-4xl
              "
            >
              {section.title}
            </h1>

            <p
              className="
                mt-4 max-w-3xl
                text-sm leading-8
                text-slate-400
              "
            >
              {section.summary}
            </p>

            <div
              className="
                mt-5 flex flex-wrap
                items-center gap-x-5
                gap-y-2 text-xs
                text-slate-500
              "
            >
              <span className="inline-flex items-center gap-1.5">
                <Clock3
                  aria-hidden="true"
                  className="h-4 w-4"
                />

                {numberFormatter.format(
                  section.estimatedMinutes,
                )}{" "}
                دقیقه
              </span>

              <span className="inline-flex items-center gap-1.5">
                <BookOpenText
                  aria-hidden="true"
                  className="h-4 w-4"
                />

                {numberFormatter.format(
                  section.wordCount,
                )}{" "}
                کلمه
              </span>

              <span className="inline-flex items-center gap-1.5">
                <Languages
                  aria-hidden="true"
                  className="h-4 w-4"
                />

                {section.languageCode.toUpperCase()}
              </span>
            </div>
          </div>

          <div
            className="
              flex shrink-0
              flex-wrap gap-2
            "
          >
            <button
              type="button"
              aria-pressed={
                showTranslations
              }
              onClick={
                onToggleTranslations
              }
              className={cn(
                "inline-flex min-h-11",
                "items-center gap-2",
                "rounded-xl border",
                "px-4 py-2.5",
                "text-sm font-medium",
                "transition",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-cyan-300",

                showTranslations
                  ? [
                      "border-cyan-400/25",
                      "bg-cyan-400/10",
                      "text-cyan-200",
                    ]
                  : [
                      "border-white/[0.08]",
                      "bg-white/[0.035]",
                      "text-slate-400",
                      "hover:bg-white/[0.07]",
                      "hover:text-white",
                    ],
              )}
            >
              <Languages
                aria-hidden="true"
                className="h-4 w-4"
              />

              {showTranslations
                ? "ترجمه فعال"
                : "نمایش ترجمه"}
            </button>

            <div
              className="
                inline-flex min-h-11
                items-center
                rounded-xl border
                border-white/[0.08]
                bg-white/[0.035]
                p-1
              "
              role="group"
              aria-label="تنظیم اندازه متن"
            >
              <button
                type="button"
                disabled={
                  isMinimumFontSize
                }
                onClick={() => {
                  onFontSizeChange(
                    getPreviousFontSize(
                      fontSize,
                    ),
                  );
                }}
                aria-label="کوچک‌تر کردن متن"
                className="
                  inline-flex h-9 w-9
                  items-center justify-center
                  rounded-lg
                  text-slate-400
                  transition
                  hover:bg-white/[0.07]
                  hover:text-white
                  disabled:cursor-not-allowed
                  disabled:opacity-30
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-cyan-300
                "
              >
                <Minus
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              </button>

              <span
                className="
                  inline-flex min-w-24
                  items-center justify-center
                  gap-2 px-2
                  text-xs text-slate-300
                "
              >
                <Type
                  aria-hidden="true"
                  className="h-4 w-4"
                />

                {currentFontSizeLabel}
              </span>

              <button
                type="button"
                disabled={
                  isMaximumFontSize
                }
                onClick={() => {
                  onFontSizeChange(
                    getNextFontSize(
                      fontSize,
                    ),
                  );
                }}
                aria-label="بزرگ‌تر کردن متن"
                className="
                  inline-flex h-9 w-9
                  items-center justify-center
                  rounded-lg
                  text-slate-400
                  transition
                  hover:bg-white/[0.07]
                  hover:text-white
                  disabled:cursor-not-allowed
                  disabled:opacity-30
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-cyan-300
                "
              >
                <Plus
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-7">
          <div
            className="
              mb-2 flex
              items-center justify-between
            "
          >
            <span className="text-xs text-slate-500">
              پیشرفت مطالعه این بخش
            </span>

            <span className="text-sm font-bold text-white">
              {numberFormatter.format(
                Math.round(safeProgress),
              )}
              ٪
            </span>
          </div>

          <Progress
            value={safeProgress}
            label="پیشرفت مطالعه این بخش"
          />
        </div>
      </div>
    </header>
  );
}