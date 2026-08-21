import {
  Bookmark,
  BookmarkCheck,
  Sparkles,
} from "lucide-react";

import {
  Card,
} from "../../../../components/ui/card";

import {
  cn,
} from "../../../../lib/utils/cn";

import type {
  ReadingExpressionItem,
  ReadingExpressionRegister,
} from "../../types/reading.types";

type ReadingExpressionsPanelProps =
  Readonly<{
    expressions:
      readonly ReadingExpressionItem[];

    savedExpressionIds:
      readonly string[];

    onToggleSaved:
      (
        expressionId:
          string,
      ) => void;
  }>;

function getRegisterLabel(
  register:
    ReadingExpressionRegister,
): string {
  switch (
    register
  ) {
    case "casual":
      return "Casual";

    case "neutral":
      return "Neutral";

    case "formal":
      return "Formal";

    case "literary":
      return "Literary";

    case "academic":
      return "Academic";
  }
}

export function ReadingExpressionsPanel({
  expressions,
  savedExpressionIds,
  onToggleSaved,
}: ReadingExpressionsPanelProps) {
  if (
    expressions.length ===
    0
  ) {
    return (
      <Card
        className="
          p-8
          text-center
        "
      >
        <Sparkles
          aria-hidden="true"
          className="
            mx-auto
            h-7
            w-7
            text-slate-600
          "
        />

        <h2
          className="
            mt-4
            font-bold
            text-white
          "
        >
          عبارت برجسته‌ای برای این پاراگراف ثبت نشده است
        </h2>

        <p
          className="
            mt-2
            text-sm
            leading-7
            text-slate-500
          "
        >
          جمله‌ها و اصطلاح‌های طبیعی و کاربردی که AI در متن تشخیص دهد در این قسمت نمایش داده می‌شوند.
        </p>
      </Card>
    );
  }

  return (
    <section
      aria-labelledby="reading-expressions-title"
    >
      <div
        className="
          flex
          items-center
          gap-2
          text-cyan-300
        "
      >
        <Sparkles
          aria-hidden="true"
          className="h-5 w-5"
        />

        <span
          className="
            text-sm
            font-medium
          "
        >
          Useful Language
        </span>
      </div>

      <h2
        id="reading-expressions-title"
        className="
          mt-2
          text-2xl
          font-bold
          text-white
        "
      >
        جمله‌ها و عبارت‌های کاربردی
      </h2>

      <p
        className="
          mt-2
          max-w-3xl
          text-sm
          leading-7
          text-slate-500
        "
      >
        عبارت‌هایی که ارزش یادگرفتن به‌صورت Chunk دارند و می‌توانی مستقیم در Speaking یا Writing استفاده کنی.
      </p>

      <div
        className="
          mt-6
          grid
          gap-4
          xl:grid-cols-2
        "
      >
        {expressions.map(
          (
            item,
          ) => {
            const isSaved =
              savedExpressionIds.includes(
                item.id,
              );

            return (
              <Card
                key={
                  item.id
                }
                className={cn(
                  "relative",
                  "overflow-hidden",
                  "p-5",
                  "sm:p-6",

                  item.isHighlighted
                    ? [
                        "border-cyan-400/15",
                        "bg-cyan-400/[0.035]",
                      ]
                    : null,
                )}
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
                        flex-wrap
                        items-center
                        gap-2
                      "
                    >
                      <span
                        dir="ltr"
                        className="
                          rounded-full
                          bg-violet-400/10
                          px-2.5
                          py-1
                          text-[10px]
                          text-violet-300
                        "
                      >
                        {getRegisterLabel(
                          item.register,
                        )}
                      </span>

                      {item.isHighlighted ? (
                        <span
                          className="
                            rounded-full
                            bg-cyan-400/10
                            px-2.5
                            py-1
                            text-[10px]
                            text-cyan-200
                          "
                        >
                          پیشنهاد AI
                        </span>
                      ) : null}
                    </div>

                    <h3
                      dir="ltr"
                      className="
                        mt-4
                        text-left
                        text-xl
                        font-bold
                        text-white
                      "
                    >
                      {
                        item.expression
                      }
                    </h3>

                    <p
                      className="
                        mt-3
                        text-sm
                        font-medium
                        text-cyan-100/80
                      "
                    >
                      {item.meaning}
                    </p>
                  </div>

                  <button
                    type="button"
                    aria-pressed={
                      isSaved
                    }
                    aria-label={
                      isSaved
                        ? "حذف عبارت از یادداشت‌ها"
                        : "ذخیره عبارت"
                    }
                    onClick={() => {
                      onToggleSaved(
                        item.id,
                      );
                    }}
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
                </div>

                <div
                  className="
                    mt-5
                    rounded-xl
                    border
                    border-white/[0.06]
                    bg-black/10
                    p-4
                  "
                >
                  <p
                    className="
                      text-[10px]
                      font-medium
                      text-slate-600
                    "
                  >
                    نحوه استفاده
                  </p>

                  <p
                    className="
                      mt-2
                      text-xs
                      leading-6
                      text-slate-400
                    "
                  >
                    {
                      item.usageNote
                    }
                  </p>
                </div>

                <div
                  className="
                    mt-3
                    rounded-xl
                    border
                    border-white/[0.06]
                    bg-white/[0.025]
                    p-4
                  "
                >
                  <p
                    dir="ltr"
                    className="
                      text-left
                      text-sm
                      leading-7
                      text-slate-200
                    "
                  >
                    {item.example}
                  </p>

                  {item.exampleTranslation ? (
                    <p
                      className="
                        mt-2
                        border-t
                        border-white/[0.05]
                        pt-2
                        text-xs
                        leading-6
                        text-slate-500
                      "
                    >
                      {
                        item.exampleTranslation
                      }
                    </p>
                  ) : null}
                </div>
              </Card>
            );
          },
        )}
      </div>
    </section>
  );
}