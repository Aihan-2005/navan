import {
  ArrowLeft,
  BookOpen,
} from "lucide-react";

import type {
  WritingAnalysisResult,
} from "../../types/writing.types";

type VocabularyUpgradesProps =
  Readonly<{
    analysis:
      WritingAnalysisResult;
  }>;

export function VocabularyUpgrades({
  analysis,
}: VocabularyUpgradesProps) {
  const upgrades =
    analysis.vocabularyUpgrades ??
    [];

  return (
    <div
      className="
        rounded-3xl
        border
        border-white/10
        bg-slate-950/60
        p-6
      "
    >
      <div
        className="
          flex
          items-center
          gap-2
        "
      >
        <BookOpen
          aria-hidden="true"
          className="
            h-5
            w-5
            text-cyan-300
          "
        />

        <h2
          className="
            text-xl
            font-bold
            text-white
          "
        >
          پیشنهاد واژگان بهتر
        </h2>
      </div>

      {upgrades.length >
      0 ? (
        <div
          className="
            mt-5
            space-y-3
          "
        >
          {upgrades.map(
            (
              item,
            ) => (
              <article
                key={
                  item.original
                }
                className="
                  rounded-2xl
                  border
                  border-white/[0.06]
                  bg-white/[0.025]
                  p-4
                "
              >
                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    gap-2
                  "
                  dir="ltr"
                >
                  <span
                    className="
                      rounded-lg
                      bg-red-400/[0.07]
                      px-2.5
                      py-1
                      text-sm
                      text-red-200
                    "
                  >
                    {item.original}
                  </span>

                  <ArrowLeft
                    aria-hidden="true"
                    className="
                      h-4
                      w-4
                      text-slate-600
                    "
                  />

                  {item.alternatives.map(
                    (
                      alternative,
                    ) => (
                      <span
                        key={
                          alternative
                        }
                        className="
                          rounded-lg
                          bg-cyan-400/[0.07]
                          px-2.5
                          py-1
                          text-sm
                          text-cyan-200
                        "
                      >
                        {alternative}
                      </span>
                    ),
                  )}
                </div>

                <p
                  className="
                    mt-3
                    text-xs
                    leading-6
                    text-slate-500
                  "
                >
                  {item.reason}
                </p>

                {item.example ? (
                  <p
                    dir="ltr"
                    className="
                      mt-3
                      text-left
                      text-xs
                      italic
                      leading-6
                      text-slate-400
                    "
                  >
                    {item.example}
                  </p>
                ) : null}
              </article>
            ),
          )}
        </div>
      ) : (
        <div
          className="
            mt-4
            flex
            flex-wrap
            gap-2
          "
        >
          {analysis.betterVocabulary.length >
          0 ? (
            analysis.betterVocabulary.map(
              (
                word,
              ) => (
                <span
                  key={
                    word
                  }
                  className="
                    rounded-full
                    border
                    border-cyan-300/20
                    bg-cyan-400/10
                    px-3
                    py-1
                    text-sm
                    text-cyan-200
                  "
                >
                  {word}
                </span>
              ),
            )
          ) : (
            <p
              className="
                text-sm
                leading-7
                text-slate-500
              "
            >
              در این نوشته پیشنهاد واژگانی مشخصی ثبت نشده است.
            </p>
          )}
        </div>
      )}
    </div>
  );
}