import {
  AlertTriangle,
  BrainCircuit,
  CheckCircle2,
  Gauge,
  Languages,
  Lightbulb,
  ListTree,
  Sparkles,
  Target,
  TriangleAlert,
} from "lucide-react";

import {
  Card,
} from "../../../../components/ui/card";

import {
  Progress,
} from "../../../../components/ui/progress";

import {
  cn,
} from "../../../../lib/utils/cn";

import type {
  ReadingAiInsight,
  ReadingResourceAiAnalysis,
} from "../../types/reading-ai-analysis.types";

type ReadingAiAnalysisPanelProps =
  Readonly<{
    analysis:
      ReadingResourceAiAnalysis;
  }>;

type ScoreItem =
  Readonly<{
    label:
      string;

    value:
      number;

    description:
      string;
  }>;

const numberFormatter =
  new Intl.NumberFormat(
    "fa-IR",
    {
      maximumFractionDigits:
        1,
    },
  );

function getScoreLabel(
  score:
    number,
): string {
  if (
    score >=
    85
  ) {
    return "بسیار بالا";
  }

  if (
    score >=
    70
  ) {
    return "بالا";
  }

  if (
    score >=
    50
  ) {
    return "متوسط";
  }

  if (
    score >=
    30
  ) {
    return "سبک";
  }

  return "بسیار سبک";
}

function getConfidenceLabel(
  score:
    number,
): string {
  if (
    score >=
    90
  ) {
    return "اطمینان بسیار بالا";
  }

  if (
    score >=
    75
  ) {
    return "اطمینان بالا";
  }

  if (
    score >=
    60
  ) {
    return "اطمینان متوسط";
  }

  return "نیازمند بازبینی";
}

function getInsightConfig(
  insight:
    ReadingAiInsight,
) {
  switch (
    insight.type
  ) {
    case "strength":
      return {
        icon:
          CheckCircle2,

        iconClass:
          "text-emerald-300",

        containerClass:
          "border-emerald-400/15 bg-emerald-400/[0.04]",

        label:
          "نقطه قوت",
      };

    case "challenge":
      return {
        icon:
          TriangleAlert,

        iconClass:
          "text-amber-300",

        containerClass:
          "border-amber-400/15 bg-amber-400/[0.04]",

        label:
          "چالش",
      };

    case "recommendation":
      return {
        icon:
          Lightbulb,

        iconClass:
          "text-cyan-300",

        containerClass:
          "border-cyan-400/15 bg-cyan-400/[0.04]",

        label:
          "پیشنهاد AI",
      };

    case "warning":
      return {
        icon:
          AlertTriangle,

        iconClass:
          "text-red-300",

        containerClass:
          "border-red-400/15 bg-red-400/[0.04]",

        label:
          "هشدار",
      };
  }
}

export function ReadingAiAnalysisPanel({
  analysis,
}: ReadingAiAnalysisPanelProps) {
  const difficultyItems:
    readonly ScoreItem[] =
    [
      {
        label:
          "سختی کلی",

        value:
          analysis.difficulty.overall,

        description:
          "برآورد کلی سختی منبع",
      },

      {
        label:
          "واژگان",

        value:
          analysis.difficulty.vocabulary,

        description:
          "تراکم و دشواری واژگان",
      },

      {
        label:
          "گرامر",

        value:
          analysis.difficulty.grammar,

        description:
          "پیچیدگی ساختارهای گرامری",
      },

      {
        label:
          "پیچیدگی جمله",

        value:
          analysis.difficulty
            .sentenceComplexity,

        description:
          "طول و ساختار جمله‌ها",
      },

      {
        label:
          "استنتاج",

        value:
          analysis.difficulty.inference,

        description:
          "نیاز به درک غیرمستقیم",
      },

      {
        label:
          "انسجام متن",

        value:
          analysis.difficulty.cohesion,

        description:
          "پیوند بین جمله‌ها و ایده‌ها",
      },
    ];

  const uniqueWords =
    analysis.vocabularyProfile
      .estimatedUniqueWords;

  const coreWords =
    analysis.vocabularyProfile
      .estimatedCoreWords;

  const coreCoverage =
    uniqueWords >
    0
      ? Math.min(
          100,
          (
            coreWords /
            uniqueWords
          ) *
            100,
        )
      : 0;

  const advancedShare =
    Math.min(
      100,
      analysis.vocabularyProfile
        .academicWordPercent +
        analysis.vocabularyProfile
          .uncommonWordPercent,
    );

  const nonCoreWords =
    Math.max(
      0,
      uniqueWords -
      coreWords,
    );

  return (
    <section
      aria-labelledby="reading-ai-analysis-title"
      className="
        mx-auto
        w-full
        max-w-7xl
        space-y-6
      "
    >
      <Card
        className="
          relative
          overflow-hidden
          border-violet-400/15
          bg-violet-400/[0.035]
          p-5
          sm:p-7
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -left-20
            -top-24
            h-60
            w-60
            rounded-full
            bg-violet-500/10
            blur-3xl
          "
        />

        <div
          className="
            relative
          "
        >
          <div
            className="
              flex
              flex-col
              gap-5
              lg:flex-row
              lg:items-start
              lg:justify-between
            "
          >
            <div
              className="
                max-w-3xl
              "
            >
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
                  AI Reading Analysis
                </span>
              </div>

              <h2
                id="reading-ai-analysis-title"
                className="
                  mt-3
                  text-2xl
                  font-bold
                  text-white
                "
              >
                تحلیل هوشمند منبع
              </h2>

              <p
                className="
                  mt-3
                  text-sm
                  leading-8
                  text-slate-400
                "
              >
                {analysis.summary}
              </p>
            </div>

            <div
              className="
                grid
                min-w-64
                grid-cols-2
                gap-3
              "
            >
              <Metric
                label="سطح تشخیص‌داده‌شده"
                value={
                  analysis.detectedCefrLevel
                }
              />

              <Metric
                label="Confidence"
                value={`${numberFormatter.format(
                  analysis.cefrConfidence,
                )}٪`}
              />
            </div>
          </div>

          <div
            className="
              mt-6
              flex
              flex-wrap
              gap-2
            "
          >
            <span
              className="
                inline-flex
                items-center
                gap-1.5
                rounded-full
                bg-white/[0.05]
                px-3
                py-1.5
                text-xs
                text-slate-400
              "
            >
              <Languages
                aria-hidden="true"
                className="h-3.5 w-3.5"
              />

              {
                analysis.detectedLanguageCode
              }
            </span>

            <span
              className="
                inline-flex
                items-center
                gap-1.5
                rounded-full
                bg-white/[0.05]
                px-3
                py-1.5
                text-xs
                text-slate-400
              "
            >
              <ListTree
                aria-hidden="true"
                className="h-3.5 w-3.5"
              />

              پیشنهاد{" "}
              {numberFormatter.format(
                analysis.suggestedSectionCount,
              )}{" "}
              بخش
            </span>

            <span
              className="
                rounded-full
                bg-white/[0.05]
                px-3
                py-1.5
                text-xs
                text-slate-400
              "
            >
              {getConfidenceLabel(
                analysis.cefrConfidence,
              )}
            </span>

            <span
              className="
                rounded-full
                bg-white/[0.05]
                px-3
                py-1.5
                text-xs
                text-slate-400
              "
            >
              حدود{" "}
              {numberFormatter.format(
                analysis.estimatedReadingMinutes,
              )}{" "}
              دقیقه مطالعه
            </span>
          </div>
        </div>
      </Card>

      <div
        className="
          grid
          gap-6
          xl:grid-cols-12
        "
      >
        <Card
          className="
            p-5
            sm:p-6
            xl:col-span-7
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
              text-cyan-300
            "
          >
            <Gauge
              aria-hidden="true"
              className="h-5 w-5"
            />

            <h3
              className="
                font-bold
                text-white
              "
            >
              پروفایل سختی متن
            </h3>
          </div>

          <div
            className="
              mt-6
              space-y-5
            "
          >
            {difficultyItems.map(
              (
                item,
              ) => (
                <div
                  key={
                    item.label
                  }
                >
                  <div
                    className="
                      flex
                      items-end
                      justify-between
                      gap-4
                    "
                  >
                    <div>
                      <p
                        className="
                          text-sm
                          font-medium
                          text-slate-300
                        "
                      >
                        {item.label}
                      </p>

                      <p
                        className="
                          mt-1
                          text-xs
                          text-slate-600
                        "
                      >
                        {
                          item.description
                        }
                      </p>
                    </div>

                    <div
                      className="
                        text-left
                      "
                    >
                      <span
                        className="
                          text-lg
                          font-bold
                          text-white
                        "
                      >
                        {numberFormatter.format(
                          item.value,
                        )}
                      </span>

                      <span
                        className="
                          mr-1
                          text-xs
                          text-slate-600
                        "
                      >
                        / 100
                      </span>
                    </div>
                  </div>

                  <Progress
                    value={
                      item.value
                    }
                    label={`امتیاز ${item.label}`}
                    className="mt-3"
                  />

                  <p
                    className="
                      mt-1
                      text-left
                      text-[10px]
                      text-slate-700
                    "
                  >
                    {getScoreLabel(
                      item.value,
                    )}
                  </p>
                </div>
              ),
            )}
          </div>
        </Card>

        <Card
          className="
            p-5
            sm:p-6
            xl:col-span-5
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
              text-violet-300
            "
          >
            <Sparkles
              aria-hidden="true"
              className="h-5 w-5"
            />

            <h3
              className="
                font-bold
                text-white
              "
            >
              پروفایل واژگان
            </h3>
          </div>

          <p
            className="
              mt-2
              text-xs
              leading-6
              text-slate-500
            "
          >
            نمای کلی تنوع، سطح و ارزش آموزشی واژگان این منبع.
          </p>

          <dl
            className="
              mt-5
              grid
              grid-cols-2
              gap-3
            "
          >
            <Metric
              label="واژه منحصربه‌فرد"
              value={numberFormatter.format(
                uniqueWords,
              )}
            />

            <Metric
              label="واژه کلیدی"
              value={numberFormatter.format(
                coreWords,
              )}
            />

            <Metric
              label="واژه غیرکلیدی"
              value={numberFormatter.format(
                nonCoreWords,
              )}
            />

            <Metric
              label="پوشش Core"
              value={`${numberFormatter.format(
                coreCoverage,
              )}٪`}
            />

            <Metric
              label="Academic"
              value={`${numberFormatter.format(
                analysis.vocabularyProfile
                  .academicWordPercent,
              )}٪`}
            />

            <Metric
              label="کم‌کاربرد"
              value={`${numberFormatter.format(
                analysis.vocabularyProfile
                  .uncommonWordPercent,
              )}٪`}
            />
          </dl>

          <div
            className="
              mt-4
              rounded-xl
              border
              border-violet-400/10
              bg-violet-400/[0.035]
              p-4
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                gap-4
              "
            >
              <span
                className="
                  text-xs
                  text-violet-200
                "
              >
                سهم واژگان پیشرفته
              </span>

              <strong
                className="
                  text-sm
                  text-white
                "
              >
                {numberFormatter.format(
                  advancedShare,
                )}
                ٪
              </strong>
            </div>

            <Progress
              value={
                advancedShare
              }
              label="سهم واژگان پیشرفته"
              className="mt-3"
            />
          </div>

          {analysis.keyVocabulary.length >
          0 ? (
            <div
              className="
                mt-5
              "
            >
              <p
                className="
                  text-xs
                  font-medium
                  text-slate-500
                "
              >
                واژه‌های پیشنهادی برای تمرکز
              </p>

              <div
                className="
                  mt-3
                  flex
                  flex-wrap
                  gap-2
                "
              >
                {analysis.keyVocabulary.map(
                  (
                    word,
                  ) => (
                    <span
                      key={
                        word
                      }
                      dir="ltr"
                      className="
                        rounded-lg
                        border
                        border-cyan-400/10
                        bg-cyan-400/[0.05]
                        px-2.5
                        py-1.5
                        text-xs
                        text-cyan-100
                      "
                    >
                      {word}
                    </span>
                  ),
                )}
              </div>
            </div>
          ) : null}
        </Card>
      </div>

      <Card
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
            text-amber-300
          "
        >
          <Target
            aria-hidden="true"
            className="h-5 w-5"
          />

          <h3
            className="
              font-bold
              text-white
            "
          >
            اهداف پیشنهادی یادگیری
          </h3>
        </div>

        <div
          className="
            mt-5
            grid
            gap-3
            md:grid-cols-2
          "
        >
          {analysis.learningObjectives.map(
            (
              objective,
              index,
            ) => (
              <div
                key={
                  objective
                }
                className="
                  flex
                  items-start
                  gap-3
                  rounded-xl
                  border
                  border-white/[0.06]
                  bg-white/[0.025]
                  p-4
                "
              >
                <span
                  className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-amber-400/10
                    text-xs
                    font-bold
                    text-amber-300
                  "
                >
                  {numberFormatter.format(
                    index +
                      1,
                  )}
                </span>

                <p
                  className="
                    text-sm
                    leading-7
                    text-slate-400
                  "
                >
                  {objective}
                </p>
              </div>
            ),
          )}
        </div>
      </Card>

      <section>
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

          <h3
            className="
              text-xl
              font-bold
              text-white
            "
          >
            بینش‌های AI
          </h3>
        </div>

        <div
          className="
            mt-5
            grid
            gap-4
            lg:grid-cols-2
          "
        >
          {analysis.insights.map(
            (
              insight,
            ) => {
              const config =
                getInsightConfig(
                  insight,
                );

              const Icon =
                config.icon;

              return (
                <Card
                  key={
                    insight.id
                  }
                  className={cn(
                    "p-5",
                    config.containerClass,
                  )}
                >
                  <div
                    className="
                      flex
                      items-start
                      gap-3
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
                        bg-black/10
                      "
                    >
                      <Icon
                        aria-hidden="true"
                        className={cn(
                          "h-5 w-5",
                          config.iconClass,
                        )}
                      />
                    </span>

                    <div>
                      <div
                        className="
                          flex
                          flex-wrap
                          items-center
                          gap-2
                        "
                      >
                        <span
                          className={cn(
                            "text-xs",
                            "font-medium",
                            config.iconClass,
                          )}
                        >
                          {config.label}
                        </span>

                        {insight.priority ===
                        "high" ? (
                          <span
                            className="
                              rounded-full
                              bg-white/[0.05]
                              px-2
                              py-0.5
                              text-[10px]
                              text-slate-500
                            "
                          >
                            اولویت بالا
                          </span>
                        ) : null}
                      </div>

                      <h4
                        className="
                          mt-2
                          font-bold
                          text-white
                        "
                      >
                        {insight.title}
                      </h4>

                      <p
                        className="
                          mt-2
                          text-sm
                          leading-7
                          text-slate-400
                        "
                      >
                        {
                          insight.description
                        }
                      </p>

                      {insight.evidence ? (
                        <div
                          className="
                            mt-4
                            rounded-xl
                            border
                            border-white/[0.05]
                            bg-black/10
                            px-3
                            py-2
                          "
                        >
                          <p
                            className="
                              text-[10px]
                              text-slate-600
                            "
                          >
                            Evidence
                          </p>

                          <p
                            className="
                              mt-1
                              text-xs
                              leading-6
                              text-slate-500
                            "
                          >
                            {
                              insight.evidence
                            }
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </Card>
              );
            },
          )}
        </div>
      </section>

      {analysis.topics.length >
      0 ? (
        <Card
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
              text-cyan-300
            "
          >
            <Sparkles
              aria-hidden="true"
              className="h-5 w-5"
            />

            <h3
              className="
                font-bold
                text-white
              "
            >
              موضوع‌های اصلی منبع
            </h3>
          </div>

          <div
            className="
              mt-4
              flex
              flex-wrap
              gap-2
            "
          >
            {analysis.topics.map(
              (
                topic,
              ) => (
                <span
                  key={
                    topic
                  }
                  className="
                    rounded-xl
                    border
                    border-white/[0.06]
                    bg-white/[0.025]
                    px-3
                    py-2
                    text-sm
                    text-slate-300
                  "
                >
                  {topic}
                </span>
              ),
            )}
          </div>
        </Card>
      ) : null}

      <p
        className="
          text-center
          text-[10px]
          text-slate-700
        "
      >
        تحلیل تولیدشده توسط{" "}
        {analysis.modelVersion}

        {analysis.analyzedAt
          ? ` • ${new Intl.DateTimeFormat(
              "fa-IR",
              {
                dateStyle:
                  "medium",
              },
            ).format(
              new Date(
                analysis.analyzedAt,
              ),
            )}`
          : ""}
      </p>
    </section>
  );
}

function Metric({
  label,
  value,
}: Readonly<{
  label:
    string;

  value:
    string;
}>) {
  return (
    <div
      className="
        rounded-xl
        border
        border-white/[0.06]
        bg-white/[0.025]
        p-4
      "
    >
      <dt
        className="
          text-[10px]
          text-slate-600
        "
      >
        {label}
      </dt>

      <dd
        className="
          mt-2
          text-lg
          font-bold
          text-white
        "
      >
        {value}
      </dd>
    </div>
  );
}