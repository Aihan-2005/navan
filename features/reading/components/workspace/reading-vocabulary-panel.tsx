import {
  Bookmark,
  BookmarkCheck,
  Languages,
  Sparkles,
} from "lucide-react";

import {
  Card,
} from "../../../../components/ui/card";

import {
  cn,
} from "../../../../lib/utils/cn";

import type {
  ReadingVocabularyItem,
} from "../../types/reading.types";

type ReadingVocabularyPanelProps =
  Readonly<{
    vocabulary:
      readonly ReadingVocabularyItem[];

    savedVocabularyIds:
      readonly string[];

    onToggleSaved: (
      vocabularyId: string,
    ) => void;
  }>;

export function ReadingVocabularyPanel({
  vocabulary,
  savedVocabularyIds,
  onToggleSaved,
}: ReadingVocabularyPanelProps) {
  if (vocabulary.length === 0) {
    return (
      <Card className="p-8 text-center">
        <Languages
          aria-hidden="true"
          className="
            mx-auto h-7 w-7
            text-slate-600
          "
        />

        <h2
          className="
            mt-4 font-bold text-white
          "
        >
          واژه‌ای برای این بخش ثبت نشده است
        </h2>

        <p
          className="
            mt-2 text-sm
            leading-7 text-slate-500
          "
        >
          واژگان کلیدی پس از تحلیل متن در
          این قسمت نمایش داده می‌شوند.
        </p>
      </Card>
    );
  }

  return (
    <section
      aria-labelledby="reading-vocabulary-title"
    >
      <div
        className="
          mb-5 flex flex-col gap-3
          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >
        <div>
          <div
            className="
              flex items-center gap-2
              text-cyan-300
            "
          >
            <Languages
              aria-hidden="true"
              className="h-5 w-5"
            />

            <span className="text-sm font-medium">
              Vocabulary
            </span>
          </div>

          <h2
            id="reading-vocabulary-title"
            className="
              mt-2 text-2xl
              font-bold text-white
            "
          >
            واژگان کلیدی متن
          </h2>

          <p
            className="
              mt-2 max-w-2xl
              text-sm leading-7
              text-slate-500
            "
          >
            معنی کلمه را در همان بافتی که
            داخل متن استفاده شده یاد بگیر.
          </p>
        </div>

        <span
          className="
            text-xs text-slate-600
          "
        >
          {savedVocabularyIds.length} واژه
          ذخیره‌شده
        </span>
      </div>

      <div
        className="
          grid gap-4
          xl:grid-cols-2
        "
      >
        {vocabulary.map(
          (item) => {
            const isSaved =
              savedVocabularyIds.includes(
                item.id,
              );

            return (
              <Card
                key={item.id}
                className={cn(
                  "relative overflow-hidden",
                  "p-5 sm:p-6",

                  item.isCore &&
                    [
                      "border-cyan-400/15",
                      "bg-cyan-400/[0.035]",
                    ],
                )}
              >
                {item.isCore ? (
                  <div
                    className="
                      absolute left-4
                      top-4
                    "
                  >
                    <span
                      className="
                        inline-flex
                        items-center gap-1
                        rounded-full
                        bg-cyan-400/10
                        px-2.5 py-1
                        text-[10px]
                        font-medium
                        text-cyan-200
                      "
                    >
                      <Sparkles
                        aria-hidden="true"
                        className="h-3 w-3"
                      />

                      واژه مهم
                    </span>
                  </div>
                ) : null}

                <div
                  className="
                    flex items-start
                    justify-between gap-4
                  "
                >
                  <div
                    className="
                      min-w-0 flex-1
                    "
                  >
                    <div
                      dir="ltr"
                      className="text-left"
                    >
                      <h3
                        className="
                          text-xl font-bold
                          text-white
                        "
                      >
                        {item.term}
                      </h3>

                      <div
                        className="
                          mt-2 flex
                          flex-wrap
                          items-center gap-2
                        "
                      >
                        {item.pronunciation ? (
                          <span
                            className="
                              font-mono text-xs
                              text-violet-300
                            "
                          >
                            {
                              item.pronunciation
                            }
                          </span>
                        ) : null}

                        {item.partOfSpeech ? (
                          <span
                            className="
                              rounded-full
                              bg-white/[0.05]
                              px-2 py-0.5
                              text-[10px]
                              text-slate-500
                            "
                          >
                            {
                              item.partOfSpeech
                            }
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <div
                      className="
                        mt-5 space-y-4
                      "
                    >
                      <div>
                        <p
                          className="
                            text-xs
                            text-slate-600
                          "
                        >
                          معنی
                        </p>

                        <p
                          className="
                            mt-1 text-sm
                            font-medium
                            text-slate-200
                          "
                        >
                          {item.meaning}
                        </p>
                      </div>

                      <div>
                        <p
                          className="
                            text-xs
                            text-slate-600
                          "
                        >
                          معنی در این متن
                        </p>

                        <p
                          className="
                            mt-1 text-sm
                            leading-7
                            text-slate-400
                          "
                        >
                          {
                            item.contextualMeaning
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-pressed={isSaved}
                    aria-label={
                      isSaved
                        ? `حذف ${item.term} از واژگان ذخیره‌شده`
                        : `ذخیره ${item.term} برای مرور`
                    }
                    onClick={() => {
                      onToggleSaved(
                        item.id,
                      );
                    }}
                    className={cn(
                      "inline-flex h-10 w-10",
                      "shrink-0 items-center",
                      "justify-center",
                      "rounded-xl border",
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
                </div>

                <div
                  className="
                    mt-5 rounded-2xl
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
                      uppercase
                      tracking-wider
                      text-slate-600
                    "
                  >
                    Example
                  </p>

                  <p
                    dir="ltr"
                    className="
                      mt-2 text-left
                      text-sm leading-7
                      text-slate-200
                    "
                  >
                    {item.example}
                  </p>

                  {item.exampleTranslation ? (
                    <p
                      className="
                        mt-2 border-t
                        border-white/[0.05]
                        pt-2 text-xs
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