import {
  BookOpenText,
  Languages,
  Lightbulb,
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
    content: readonly ReadingTextBlock[];

    languageCode: string;

    showTranslations: boolean;

    fontSize: ReadingFontSize;
  }>;

const numberFormatter =
  new Intl.NumberFormat("fa-IR");

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
  content,
  languageCode,
  showTranslations,
  fontSize,
}: ReadingContentPanelProps) {
  const sortedContent = [
    ...content,
  ].sort(
    (first, second) =>
      first.order - second.order,
  );

  return (
    <Card className="overflow-hidden">
      <div
        className="
          flex flex-col gap-3
          border-b
          border-white/[0.06]
          px-5 py-5
          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:px-7
        "
      >
        <div className="flex items-center gap-3">
          <span
            className="
              flex h-10 w-10
              items-center justify-center
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
            <h2 className="font-bold text-white">
              متن اصلی
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              متن را با تمرکز روی مفهوم
              کلی و جزئیات بخوان.
            </p>
          </div>
        </div>

        <div
          className={cn(
            "inline-flex w-fit",
            "items-center gap-2",
            "rounded-full px-3",
            "py-1.5 text-xs",

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
            ? "ترجمه پاراگراف‌ها فعال است"
            : "ترجمه پاراگراف‌ها مخفی است"}
        </div>
      </div>

      <article
        className="
          divide-y
          divide-white/[0.06]
        "
        aria-label="محتوای بخش Reading"
      >
        {sortedContent.map(
          (block) => (
            <section
              key={block.id}
              id={block.id}
              className="
                scroll-mt-28
                px-5 py-7
                sm:px-7
                sm:py-9
              "
            >
              <div
                className="
                  mb-4 flex
                  items-center gap-2
                "
              >
                <span
                  className="
                    inline-flex h-7
                    min-w-7 items-center
                    justify-center
                    rounded-lg
                    bg-white/[0.045]
                    px-2 text-xs
                    font-bold
                    text-slate-500
                  "
                >
                  {numberFormatter.format(
                    block.order,
                  )}
                </span>

                <span className="text-xs text-slate-600">
                  پاراگراف
                </span>
              </div>

              <p
                lang={languageCode}
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

              {showTranslations &&
              block.translation ? (
                <div
                  className="
                    mt-6 rounded-2xl
                    border
                    border-violet-400/15
                    bg-violet-400/[0.045]
                    p-4 sm:p-5
                  "
                >
                  <div
                    className="
                      flex items-center
                      gap-2 text-xs
                      font-medium
                      text-violet-200
                    "
                  >
                    <Languages
                      aria-hidden="true"
                      className="h-4 w-4"
                    />

                    ترجمه
                  </div>

                  <p
                    dir="rtl"
                    className="
                      mt-3 text-sm
                      leading-8
                      text-slate-300
                      sm:text-base
                    "
                  >
                    {block.translation}
                  </p>
                </div>
              ) : null}

              {block.note ? (
                <aside
                  className="
                    mt-5 flex
                    items-start gap-3
                    rounded-2xl
                    border
                    border-amber-400/15
                    bg-amber-400/[0.04]
                    p-4
                  "
                >
                  <span
                    className="
                      mt-0.5 flex
                      h-8 w-8
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

                  <div>
                    <p
                      className="
                        text-xs font-bold
                        text-amber-200
                      "
                    >
                      نکته آموزشی
                    </p>

                    <p
                      className="
                        mt-1 text-xs
                        leading-7
                        text-amber-100/65
                        sm:text-sm
                      "
                    >
                      {block.note}
                    </p>
                  </div>
                </aside>
              ) : null}
            </section>
          ),
        )}
      </article>
    </Card>
  );
}