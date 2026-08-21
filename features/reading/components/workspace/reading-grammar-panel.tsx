import {
  Bookmark,
  BookmarkCheck,
  BrainCircuit,
  Braces,
  CheckCircle2,
  Circle,
  Lightbulb,
  Target,
  TriangleAlert,
} from "lucide-react";

import {
  Card,
} from "../../../../components/ui/card";

import {
  cn,
} from "../../../../lib/utils/cn";

import type {
  ReadingGrammarPoint,
} from "../../types/reading.types";

type ReadingGrammarPanelProps =
  Readonly<{
    grammarPoints:
      readonly ReadingGrammarPoint[];

    savedGrammarIds:
      readonly string[];

    masteredGrammarIds:
      readonly string[];

    onToggleSaved:
      (
        grammarId:
          string,
      ) => void;

    onToggleMastered:
      (
        grammarId:
          string,
      ) => void;
  }>;

const numberFormatter =
  new Intl.NumberFormat(
    "fa-IR",
  );

export function ReadingGrammarPanel({
  grammarPoints,
  savedGrammarIds,
  masteredGrammarIds,
  onToggleSaved,
  onToggleMastered,
}: ReadingGrammarPanelProps) {
  if (
    grammarPoints.length ===
    0
  ) {
    return (
      <Card
        className="
          p-8
          text-center
        "
      >
        <BrainCircuit
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
          نکته گرامری برای این پاراگراف ثبت نشده است
        </h2>

        <p
          className="
            mt-2
            text-sm
            leading-7
            text-slate-500
          "
        >
          وقتی AI ساختار مهمی در این قسمت پیدا کند، تحلیل کامل آن اینجا نمایش داده می‌شود.
        </p>
      </Card>
    );
  }

  const masteredCount =
    grammarPoints.filter(
      (
        point,
      ) =>
        masteredGrammarIds.includes(
          point.id,
        ),
    ).length;

  return (
    <section
      aria-labelledby="reading-grammar-title"
    >
      <div
        className="
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >
        <div>
          <div
            className="
              flex
              items-center
              gap-2
              text-violet-300
            "
          >
            <BrainCircuit
              aria-hidden="true"
              className="h-5 w-5"
            />

            <span
              className="
                text-sm
                font-medium
              "
            >
              Grammar in Context
            </span>
          </div>

          <h2
            id="reading-grammar-title"
            className="
              mt-2
              text-2xl
              font-bold
              text-white
            "
          >
            گرامر در دل همین پاراگراف
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
            ساختار را از مثال واقعی متن یاد بگیر، اشتباه رایج را ببین و زمانی که احساس کردی مسلط شده‌ای آن را علامت بزن.
          </p>
        </div>

        <div
          className="
            rounded-xl
            border
            border-violet-400/10
            bg-violet-400/[0.04]
            px-4
            py-3
          "
        >
          <p
            className="
              text-[10px]
              text-slate-600
            "
          >
            تسلط این پاراگراف
          </p>

          <p
            className="
              mt-1
              text-sm
              font-bold
              text-violet-200
            "
          >
            {numberFormatter.format(
              masteredCount,
            )}{" "}
            از{" "}
            {numberFormatter.format(
              grammarPoints.length,
            )}
          </p>
        </div>
      </div>

      <div
        className="
          mt-6
          space-y-5
        "
      >
        {grammarPoints.map(
          (
            grammarPoint,
            index,
          ) => {
            const isSaved =
              savedGrammarIds.includes(
                grammarPoint.id,
              );

            const isMastered =
              masteredGrammarIds.includes(
                grammarPoint.id,
              );

            return (
              <Card
                key={
                  grammarPoint.id
                }
                className="
                  overflow-hidden
                  border-violet-400/10
                "
              >
                <div
                  className="
                    border-b
                    border-white/[0.06]
                    p-5
                    sm:p-6
                  "
                >
                  <div
                    className="
                      flex
                      items-start
                      gap-4
                    "
                  >
                    <span
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-violet-400/10
                        text-sm
                        font-bold
                        text-violet-300
                      "
                    >
                      {numberFormatter.format(
                        index +
                          1,
                      )}
                    </span>

                    <div
                      className="
                        min-w-0
                        flex-1
                      "
                    >
                      <h3
                        className="
                          text-lg
                          font-bold
                          text-white
                        "
                      >
                        {
                          grammarPoint.title
                        }
                      </h3>

                      <p
                        className="
                          mt-2
                          text-sm
                          leading-8
                          text-slate-400
                        "
                      >
                        {
                          grammarPoint.explanation
                        }
                      </p>
                    </div>

                    <button
                      type="button"
                      aria-pressed={
                        isSaved
                      }
                      aria-label={
                        isSaved
                          ? "حذف گرامر از یادداشت‌ها"
                          : "ذخیره گرامر"
                      }
                      onClick={() => {
                        onToggleSaved(
                          grammarPoint.id,
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

                  {grammarPoint.pattern ? (
                    <div
                      className="
                        mt-5
                        rounded-xl
                        border
                        border-violet-400/15
                        bg-violet-400/[0.05]
                        p-4
                      "
                    >
                      <div
                        className="
                          flex
                          items-center
                          gap-2
                          text-xs
                          text-violet-300
                        "
                      >
                        <Braces
                          aria-hidden="true"
                          className="h-4 w-4"
                        />

                        الگو
                      </div>

                      <code
                        dir="ltr"
                        className="
                          mt-3
                          block
                          overflow-x-auto
                          text-left
                          font-mono
                          text-sm
                          text-violet-100
                        "
                      >
                        {
                          grammarPoint.pattern
                        }
                      </code>
                    </div>
                  ) : null}

                  <div
                    className="
                      mt-4
                      grid
                      gap-3
                      lg:grid-cols-2
                    "
                  >
                    {grammarPoint.masteryTip ? (
                      <div
                        className="
                          rounded-xl
                          border
                          border-emerald-400/10
                          bg-emerald-400/[0.035]
                          p-4
                        "
                      >
                        <div
                          className="
                            flex
                            items-center
                            gap-2
                            text-xs
                            text-emerald-300
                          "
                        >
                          <Lightbulb
                            aria-hidden="true"
                            className="h-4 w-4"
                          />

                          نکته تسلط
                        </div>

                        <p
                          className="
                            mt-2
                            text-xs
                            leading-6
                            text-slate-400
                          "
                        >
                          {
                            grammarPoint.masteryTip
                          }
                        </p>
                      </div>
                    ) : null}

                    {grammarPoint.commonMistake ? (
                      <div
                        className="
                          rounded-xl
                          border
                          border-amber-400/10
                          bg-amber-400/[0.035]
                          p-4
                        "
                      >
                        <div
                          className="
                            flex
                            items-center
                            gap-2
                            text-xs
                            text-amber-300
                          "
                        >
                          <TriangleAlert
                            aria-hidden="true"
                            className="h-4 w-4"
                          />

                          اشتباه رایج
                        </div>

                        <p
                          className="
                            mt-2
                            text-xs
                            leading-6
                            text-slate-400
                          "
                        >
                          {
                            grammarPoint.commonMistake
                          }
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div
                  className="
                    p-5
                    sm:p-6
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-xs
                      font-medium
                      text-amber-200
                    "
                  >
                    <Lightbulb
                      aria-hidden="true"
                      className="h-4 w-4"
                    />

                    مثال‌ها
                  </div>

                  <div
                    className="
                      mt-4
                      space-y-3
                    "
                  >
                    {grammarPoint.examples.map(
                      (
                        example,
                      ) => (
                        <div
                          key={
                            example.id
                          }
                          className="
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
                            {
                              example.source
                            }
                          </p>

                          {example.translation ? (
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
                                example.translation
                              }
                            </p>
                          ) : null}
                        </div>
                      ),
                    )}
                  </div>

                  {grammarPoint.practicePrompt ? (
                    <div
                      className="
                        mt-5
                        rounded-xl
                        border
                        border-cyan-400/10
                        bg-cyan-400/[0.035]
                        p-4
                      "
                    >
                      <div
                        className="
                          flex
                          items-center
                          gap-2
                          text-xs
                          text-cyan-300
                        "
                      >
                        <Target
                          aria-hidden="true"
                          className="h-4 w-4"
                        />

                        تمرین کوتاه
                      </div>

                      <p
                        className="
                          mt-2
                          text-sm
                          leading-7
                          text-cyan-100/70
                        "
                      >
                        {
                          grammarPoint.practicePrompt
                        }
                      </p>
                    </div>
                  ) : null}

                  <button
                    type="button"
                    aria-pressed={
                      isMastered
                    }
                    onClick={() => {
                      onToggleMastered(
                        grammarPoint.id,
                      );
                    }}
                    className={cn(
                      "mt-5",
                      "inline-flex",
                      "min-h-11",
                      "items-center",
                      "justify-center",
                      "gap-2",
                      "rounded-xl",
                      "border",
                      "px-4",
                      "text-sm",
                      "font-medium",
                      "transition",

                      isMastered
                        ? [
                            "border-emerald-400/20",
                            "bg-emerald-400/10",
                            "text-emerald-200",
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
                    {isMastered ? (
                      <CheckCircle2
                        aria-hidden="true"
                        className="h-4 w-4"
                      />
                    ) : (
                      <Circle
                        aria-hidden="true"
                        className="h-4 w-4"
                      />
                    )}

                    {isMastered
                      ? "این ساختار را یاد گرفتم"
                      : "علامت‌گذاری به‌عنوان یادگرفته‌شده"}
                  </button>
                </div>
              </Card>
            );
          },
        )}
      </div>
    </section>
  );
}