import {
  BrainCircuit,
  Braces,
  Lightbulb,
} from "lucide-react";

import {
  Card,
} from "../../../../components/ui/card";

import type {
  ReadingGrammarPoint,
} from "../../types/reading.types";

type ReadingGrammarPanelProps =
  Readonly<{
    grammarPoints:
      readonly ReadingGrammarPoint[];
  }>;

const numberFormatter =
  new Intl.NumberFormat("fa-IR");

export function ReadingGrammarPanel({
  grammarPoints,
}: ReadingGrammarPanelProps) {
  if (grammarPoints.length === 0) {
    return (
      <Card className="p-8 text-center">
        <BrainCircuit
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
          نکته گرامری ثبت نشده است
        </h2>

        <p
          className="
            mt-2 text-sm
            leading-7 text-slate-500
          "
        >
          تحلیل ساختارهای گرامری این متن
          در این قسمت نمایش داده می‌شود.
        </p>
      </Card>
    );
  }

  return (
    <section
      aria-labelledby="reading-grammar-title"
    >
      <div
        className="
          flex items-center gap-2
          text-violet-300
        "
      >
        <BrainCircuit
          aria-hidden="true"
          className="h-5 w-5"
        />

        <span className="text-sm font-medium">
          Grammar in Context
        </span>
      </div>

      <h2
        id="reading-grammar-title"
        className="
          mt-2 text-2xl
          font-bold text-white
        "
      >
        گرامر در دل متن
      </h2>

      <p
        className="
          mt-2 max-w-3xl
          text-sm leading-7
          text-slate-500
        "
      >
        ساختارها را نه به‌صورت قانون جدا،
        بلکه با همان جمله‌هایی که در متن
        دیده‌ای یاد بگیر.
      </p>

      <div className="mt-6 space-y-5">
        {grammarPoints.map(
          (grammarPoint, index) => (
            <Card
              key={grammarPoint.id}
              className="
                overflow-hidden
                border-violet-400/10
              "
            >
              <div
                className="
                  border-b
                  border-white/[0.06]
                  p-5 sm:p-6
                "
              >
                <div
                  className="
                    flex items-start gap-4
                  "
                >
                  <span
                    className="
                      flex h-10 w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-violet-400/10
                      text-sm font-bold
                      text-violet-300
                    "
                  >
                    {numberFormatter.format(
                      index + 1,
                    )}
                  </span>

                  <div>
                    <h3
                      className="
                        text-lg font-bold
                        text-white
                      "
                    >
                      {grammarPoint.title}
                    </h3>

                    <p
                      className="
                        mt-2 text-sm
                        leading-8
                        text-slate-400
                      "
                    >
                      {
                        grammarPoint.explanation
                      }
                    </p>
                  </div>
                </div>

                {grammarPoint.pattern ? (
                  <div
                    className="
                      mt-5 rounded-xl
                      border
                      border-violet-400/15
                      bg-violet-400/[0.05]
                      p-4
                    "
                  >
                    <div
                      className="
                        flex items-center
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
                        mt-3 block
                        overflow-x-auto
                        text-left
                        font-mono
                        text-sm
                        text-violet-100
                      "
                    >
                      {grammarPoint.pattern}
                    </code>
                  </div>
                ) : null}
              </div>

              <div className="p-5 sm:p-6">
                <div
                  className="
                    flex items-center
                    gap-2 text-xs
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
                    mt-4 space-y-3
                  "
                >
                  {grammarPoint.examples.map(
                    (example) => (
                      <div
                        key={example.id}
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
                            text-sm leading-7
                            text-slate-200
                          "
                        >
                          {example.source}
                        </p>

                        {example.translation ? (
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
                              example.translation
                            }
                          </p>
                        ) : null}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </Card>
          ),
        )}
      </div>
    </section>
  );
}