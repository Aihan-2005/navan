import {
  Bookmark,
  BookmarkCheck,
  BookOpenText,
  Languages,
  Lightbulb,
  Sparkles,
} from "lucide-react";

import {
  Card,
} from "../../../../components/ui/card";

import {
  cn,
} from "../../../../lib/utils/cn";

import type {
  ReadingTextBlock,
} from "../../types/reading.types";

import type {
  ReadingFontSize,
} from "./reading-workspace.types";

type ReadingContentPanelProps =
  Readonly<{
    block:
      ReadingTextBlock;

    blockIndex:
      number;

    totalBlocks:
      number;

    languageCode:
      string;

    showTranslations:
      boolean;

    fontSize:
      ReadingFontSize;

    isMeaningSaved:
      boolean;

    isNoteSaved:
      boolean;

    onToggleMeaning:
      () => void;

    onToggleNote:
      () => void;
  }>;

const numberFormatter =
  new Intl.NumberFormat(
    "fa-IR",
  );

const READING_TEXT_SIZE_CLASSES = {
  compact: [
    "text-base",
    "leading-8",
    "sm:text-lg",
    "sm:leading-9",
  ],

  comfortable: [
    "text-lg",
    "leading-9",
    "sm:text-xl",
    "sm:leading-10",
  ],

  large: [
    "text-xl",
    "leading-10",
    "sm:text-2xl",
    "sm:leading-[2.1]",
  ],
} satisfies Record<
  ReadingFontSize,
  readonly string[]
>;

export function ReadingContentPanel({
  block,
  blockIndex,
  totalBlocks,
  languageCode,
  showTranslations,
  fontSize,
  isMeaningSaved,
  isNoteSaved,
  onToggleMeaning,
  onToggleNote,
}: ReadingContentPanelProps) {
  const hasMeaningSection =
    Boolean(
      block.conceptSummary,
    ) ||
    (
      showTranslations &&
      Boolean(
        block.translation,
      )
    );

  return (
    <Card
      id={
        block.id
      }
      className="
        overflow-hidden
      "
    >
      <div
        className="
          flex
          flex-col
          gap-3
          border-b
          border-white/[0.06]
          px-5
          py-5
          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:px-7
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <span
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-cyan-400/10
              text-cyan-300
            "
          >
            <BookOpenText
              aria-hidden="true"
              className="h-5 w-5"
            />
          </span>

          <div>
            <h2
              className="
                font-bold
                text-white
              "
            >
              پاراگراف{" "}
              {numberFormatter.format(
                blockIndex +
                  1,
              )}
            </h2>

            <p
              className="
                mt-1
                text-xs
                text-slate-500
              "
            >
              {numberFormatter.format(
                blockIndex +
                  1,
              )}{" "}
              از{" "}
              {numberFormatter.format(
                totalBlocks,
              )}
            </p>
          </div>
        </div>

        <div
          className={cn(
            "inline-flex",
            "w-fit",
            "items-center",
            "gap-2",
            "rounded-full",
            "px-3",
            "py-1.5",
            "text-xs",

            showTranslations
              ? [
                  "bg-violet-400/10",
                  "text-violet-200",
                ]
              : [
                  "bg-white/[0.04]",
                  "text-slate-500",
                ],
          )}
        >
          <Languages
            aria-hidden="true"
            className="h-3.5 w-3.5"
          />

          {showTranslations
            ? "ترجمه فعال است"
            : "ترجمه مخفی است"}
        </div>
      </div>

      <article
        className="
          px-5
          py-7
          sm:px-7
          sm:py-9
        "
      >
        <p
          lang={
            languageCode
          }
          dir="ltr"
          className={cn(
            "text-left",
            "font-medium",
            "tracking-[0.01em]",
            "text-slate-100",

            READING_TEXT_SIZE_CLASSES[
              fontSize
            ],
          )}
        >
          {block.text}
        </p>

        {hasMeaningSection ? (
          <section
            className="
              relative
              mt-7
              rounded-2xl
              border
              border-violet-400/15
              bg-violet-400/[0.045]
              p-4
              sm:p-5
            "
          >
            <div
              className="
                flex
                items-start
                justify-between
                gap-4
              "
            >
              <div
                className="
                  min-w-0
                  flex-1
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-xs
                    font-medium
                    text-violet-200
                  "
                >
                  <Sparkles
                    aria-hidden="true"
                    className="h-4 w-4"
                  />

                  معنی و مفهوم
                </div>

                {block.conceptSummary ? (
                  <div
                    className="
                      mt-4
                    "
                  >
                    <p
                      className="
                        text-[10px]
                        font-medium
                        text-violet-300/70
                      "
                    >
                      مفهوم پاراگراف
                    </p>

                    <p
                      className="
                        mt-2
                        text-sm
                        leading-8
                        text-slate-300
                        sm:text-base
                      "
                    >
                      {
                        block.conceptSummary
                      }
                    </p>
                  </div>
                ) : null}

                {showTranslations &&
                block.translation ? (
                  <div
                    className={cn(
                      block.conceptSummary
                        ? [
                            "mt-4",
                            "border-t",
                            "border-violet-300/10",
                            "pt-4",
                          ]
                        : null,
                    )}
                  >
                    <p
                      className="
                        text-[10px]
                        font-medium
                        text-violet-300/70
                      "
                    >
                      ترجمه
                    </p>

                    <p
                      dir="rtl"
                      className="
                        mt-2
                        text-sm
                        leading-8
                        text-slate-300
                        sm:text-base
                      "
                    >
                      {
                        block.translation
                      }
                    </p>
                  </div>
                ) : null}
              </div>

              <SaveButton
                isSaved={
                  isMeaningSaved
                }
                label="ذخیره معنی و مفهوم"
                onClick={
                  onToggleMeaning
                }
              />
            </div>
          </section>
        ) : null}

        {block.note ? (
          <aside
            className="
              mt-5
              flex
              items-start
              gap-3
              rounded-2xl
              border
              border-amber-400/15
              bg-amber-400/[0.04]
              p-4
            "
          >
            <span
              className="
                mt-0.5
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-amber-400/10
                text-amber-300
              "
            >
              <Lightbulb
                aria-hidden="true"
                className="h-4 w-4"
              />
            </span>

            <div
              className="
                min-w-0
                flex-1
              "
            >
              <p
                className="
                  text-xs
                  font-bold
                  text-amber-200
                "
              >
                نکته آموزشی
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  leading-7
                  text-amber-100/65
                  sm:text-sm
                "
              >
                {block.note}
              </p>
            </div>

            <SaveButton
              isSaved={
                isNoteSaved
              }
              label="ذخیره نکته آموزشی"
              onClick={
                onToggleNote
              }
            />
          </aside>
        ) : null}
      </article>
    </Card>
  );
}

function SaveButton({
  isSaved,
  label,
  onClick,
}: Readonly<{
  isSaved:
    boolean;

  label:
    string;

  onClick:
    () => void;
}>) {
  return (
    <button
      type="button"
      aria-pressed={
        isSaved
      }
      aria-label={
        label
      }
      onClick={
        onClick
      }
      className={cn(
        "inline-flex",
        "h-10",
        "w-10",
        "shrink-0",
        "items-center",
        "justify-center",
        "rounded-xl",
        "border",
        "transition",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-cyan-300",

        isSaved
          ? [
              "border-cyan-400/20",
              "bg-cyan-400/10",
              "text-cyan-200",
            ]
          : [
              "border-white/[0.08]",
              "bg-white/[0.035]",
              "text-slate-500",
              "hover:bg-white/[0.07]",
              "hover:text-white",
            ],
      )}
    >
      {isSaved ? (
        <BookmarkCheck
          aria-hidden="true"
          className="h-4 w-4"
        />
      ) : (
        <Bookmark
          aria-hidden="true"
          className="h-4 w-4"
        />
      )}
    </button>
  );
}