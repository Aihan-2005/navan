import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Headphones,
  RefreshCw,
  Sparkles,
  Target,
  TriangleAlert,
  XCircle,
} from "lucide-react";

import {
  Card,
} from "../../../../components/ui/card";

import {
  cn,
} from "../../../../lib/utils/cn";

import {
  LISTENING_PRACTICE_MODE_LABELS,
} from "../../constants/listening.constants";

import type {
  ListeningAttemptAnalysis,
  ListeningComparisonKind,
} from "../../types/listening.types";

import {
  ListeningScoreOverview,
} from "./listening-score-overview";

type ListeningAnalysisViewProps =
  Readonly<{
    analysis: ListeningAttemptAnalysis;
  }>;

const comparisonStyles = {
  match: {
    container:
      "border-emerald-400/15 bg-emerald-400/[0.04]",
    label: "درست",
    labelClass:
      "text-emerald-300",
    icon: CheckCircle2,
  },

  omission: {
    container:
      "border-amber-400/15 bg-amber-400/[0.04]",
    label: "جاافتاده",
    labelClass:
      "text-amber-300",
    icon: TriangleAlert,
  },

  substitution: {
    container:
      "border-red-400/15 bg-red-400/[0.04]",
    label: "جایگزینی",
    labelClass:
      "text-red-300",
    icon: XCircle,
  },

  addition: {
    container:
      "border-violet-400/15 bg-violet-400/[0.04]",
    label: "اضافه‌شده",
    labelClass:
      "text-violet-300",
    icon: Sparkles,
  },
} satisfies Record<
  ListeningComparisonKind,
  {
    container: string;
    label: string;
    labelClass: string;
    icon: typeof CheckCircle2;
  }
>;

const dateFormatter =
  new Intl.DateTimeFormat(
    "fa-IR",
    {
      dateStyle: "medium",
      timeStyle: "short",
    },
  );

export function ListeningAnalysisView({
  analysis,
}: ListeningAnalysisViewProps) {
  return (
    <main
      className="
        mx-auto w-full
        max-w-7xl space-y-6
      "
    >
      <Link
        href="/listening"
        className="
          inline-flex items-center
          gap-2 text-sm
          text-slate-400
          transition
          hover:text-white
        "
      >
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4"
        />

        بازگشت به Listening
      </Link>

      <section
        className="
          relative overflow-hidden
          rounded-3xl border
          border-cyan-400/15
          bg-white/[0.035]
          p-6 sm:p-8
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -left-24 -top-24
            h-64 w-64
            rounded-full
            bg-cyan-500/15
            blur-3xl
          "
        />

        <div className="relative">
          <div
            className="
              flex flex-col gap-5
              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >
            <div>
              <div
                className="
                  flex flex-wrap
                  items-center gap-2
                "
              >
                <span
                  className="
                    inline-flex
                    items-center gap-1.5
                    rounded-full
                    bg-emerald-400/10
                    px-3 py-1
                    text-xs
                    text-emerald-300
                  "
                >
                  <CheckCircle2
                    aria-hidden="true"
                    className="h-3.5 w-3.5"
                  />

                  تحلیل کامل شد
                </span>

                <span
                  className="
                    rounded-full
                    bg-white/[0.05]
                    px-3 py-1
                    text-xs
                    text-slate-400
                  "
                >
                  {
                    LISTENING_PRACTICE_MODE_LABELS[
                      analysis
                        .practiceMode
                    ]
                  }
                </span>
              </div>

              <p
                className="
                  mt-5 text-sm
                  font-medium
                  text-cyan-300
                "
              >
                نتیجه تمرین شنیداری
              </p>

              <h1
                className="
                  mt-2 text-3xl
                  font-bold leading-tight
                  text-white
                  sm:text-4xl
                "
              >
                {analysis.contentTitle}
              </h1>

              <p
                className="
                  mt-4 text-xs
                  text-slate-500
                "
              >
                تکمیل‌شده در{" "}
                {dateFormatter.format(
                  new Date(
                    analysis.completedAt,
                  ),
                )}
              </p>
            </div>

            <div
              className="
                flex items-end gap-3
              "
            >
              <div
                className="
                  text-left
                "
              >
                <p
                  className="
                    text-xs
                    text-slate-500
                  "
                >
                  امتیاز نهایی
                </p>

                <p
                  className="
                    text-5xl
                    font-black
                    text-white
                  "
                >
                  {
                    analysis.score
                      .overall
                  }
                  <span
                    className="
                      text-lg
                      font-medium
                      text-cyan-300
                    "
                  >
                    ٪
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ListeningScoreOverview
        score={analysis.score}
      />

      <section
        className="
          grid gap-6
          xl:grid-cols-12
        "
      >
        <div
          className="
            space-y-6
            xl:col-span-8
          "
        >
          <Card className="overflow-hidden">
            <div
              className="
                border-b
                border-white/[0.06]
                p-5 sm:p-6
              "
            >
              <div
                className="
                  flex items-center
                  gap-3
                "
              >
                <span
                  className="
                    flex h-10 w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-violet-400/10
                    text-violet-300
                  "
                >
                  <BrainCircuit
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
                    مقایسه Transcript
                  </h2>

                  <p
                    className="
                      mt-1 text-xs
                      text-slate-500
                    "
                  >
                    تفاوت پاسخ تو با متن
                    مرجع
                  </p>
                </div>
              </div>
            </div>

            <div
              className="
                space-y-3
                p-5 sm:p-6
              "
            >
              {analysis.comparison.map(
                (segment) => {
                  const config =
                    comparisonStyles[
                      segment.kind
                    ];

                  const Icon =
                    config.icon;

                  return (
                    <div
                      key={segment.id}
                      className={cn(
                        "rounded-2xl",
                        "border p-4",
                        config.container,
                      )}
                    >
                      <div
                        className="
                          flex items-center
                          gap-2
                        "
                      >
                        <Icon
                          aria-hidden="true"
                          className={cn(
                            "h-4 w-4",
                            config.labelClass,
                          )}
                        />

                        <span
                          className={cn(
                            "text-xs",
                            "font-medium",
                            config.labelClass,
                          )}
                        >
                          {
                            config.label
                          }
                        </span>
                      </div>

                      {segment.expected ? (
                        <div className="mt-3">
                          <p
                            className="
                              text-[10px]
                              uppercase
                              tracking-wider
                              text-slate-600
                            "
                          >
                            متن مرجع
                          </p>

                          <p
                            dir="ltr"
                            className="
                              mt-1 text-left
                              text-sm
                              leading-7
                              text-slate-200
                            "
                          >
                            {
                              segment.expected
                            }
                          </p>
                        </div>
                      ) : null}

                      {segment.actual ? (
                        <div className="mt-3">
                          <p
                            className="
                              text-[10px]
                              text-slate-600
                            "
                          >
                            پاسخ تو
                          </p>

                          <p
                            dir="ltr"
                            className="
                              mt-1 text-left
                              text-sm
                              leading-7
                              text-slate-400
                            "
                          >
                            {
                              segment.actual
                            }
                          </p>
                        </div>
                      ) : null}
                    </div>
                  );
                },
              )}
            </div>
          </Card>

          <Card className="p-5 sm:p-6">
            <div
              className="
                flex items-center
                gap-2 text-cyan-300
              "
            >
              <Headphones
                aria-hidden="true"
                className="h-5 w-5"
              />

              <h2
                className="
                  text-sm font-medium
                "
              >
                Transcript کامل
              </h2>
            </div>

            <div
              className="
                mt-5 grid gap-4
                lg:grid-cols-2
              "
            >
              <div
                className="
                  rounded-2xl
                  border
                  border-white/[0.06]
                  bg-white/[0.025]
                  p-4
                "
              >
                <p
                  className="
                    text-xs
                    text-slate-500
                  "
                >
                  متن مرجع
                </p>

                <p
                  dir="ltr"
                  className="
                    mt-3 text-left
                    text-sm
                    leading-8
                    text-slate-200
                  "
                >
                  {
                    analysis.referenceTranscript
                  }
                </p>
              </div>

              <div
                className="
                  rounded-2xl
                  border
                  border-white/[0.06]
                  bg-white/[0.025]
                  p-4
                "
              >
                <p
                  className="
                    text-xs
                    text-slate-500
                  "
                >
                  پاسخ تو
                </p>

                <p
                  dir="ltr"
                  className="
                    mt-3 text-left
                    text-sm
                    leading-8
                    text-slate-300
                  "
                >
                  {
                    analysis.submittedTranscript
                  }
                </p>
              </div>
            </div>
          </Card>
        </div>

        <aside
          className="
            space-y-6
            xl:col-span-4
          "
        >
          <Card className="p-5 sm:p-6">
            <div
              className="
                flex items-center
                gap-2 text-violet-300
              "
            >
              <Sparkles
                aria-hidden="true"
                className="h-5 w-5"
              />

              <h2
                className="
                  text-sm font-medium
                "
              >
                بازخورد مدرس
              </h2>
            </div>

            <p
              className="
                mt-4 text-sm
                leading-8
                text-slate-400
              "
            >
              {
                analysis.feedback
                  .summary
              }
            </p>
          </Card>

          <Card className="p-5 sm:p-6">
            <div
              className="
                flex items-center
                gap-2 text-emerald-300
              "
            >
              <CheckCircle2
                aria-hidden="true"
                className="h-5 w-5"
              />

              <h2
                className="
                  text-sm font-medium
                "
              >
                نقاط قوت
              </h2>
            </div>

            <ul
              className="
                mt-4 space-y-3
              "
            >
              {analysis.feedback.strengths.map(
                (strength) => (
                  <li
                    key={strength}
                    className="
                      flex items-start
                      gap-2 text-sm
                      leading-7
                      text-slate-400
                    "
                  >
                    <span
                      className="
                        mt-2 h-1.5 w-1.5
                        shrink-0
                        rounded-full
                        bg-emerald-300
                      "
                    />

                    {strength}
                  </li>
                ),
              )}
            </ul>
          </Card>

          <Card className="p-5 sm:p-6">
            <div
              className="
                flex items-center
                gap-2 text-amber-300
              "
            >
              <Target
                aria-hidden="true"
                className="h-5 w-5"
              />

              <h2
                className="
                  text-sm font-medium
                "
              >
                تمرکز بعدی
              </h2>
            </div>

            <ul
              className="
                mt-4 space-y-3
              "
            >
              {analysis.feedback.priorities.map(
                (priority) => (
                  <li
                    key={priority}
                    className="
                      flex items-start
                      gap-2 text-sm
                      leading-7
                      text-slate-400
                    "
                  >
                    <span
                      className="
                        mt-2 h-1.5 w-1.5
                        shrink-0
                        rounded-full
                        bg-amber-300
                      "
                    />

                    {priority}
                  </li>
                ),
              )}
            </ul>
          </Card>

          <div
            className="
              grid gap-3
            "
          >
            <Link
              href={`/listening/practice/${encodeURIComponent(
                analysis.contentId,
              )}`}
              className="
                inline-flex min-h-11
                items-center
                justify-center gap-2
                rounded-xl
                bg-cyan-400
                px-4 py-2.5
                text-sm font-bold
                text-slate-950
                transition
                hover:bg-cyan-300
              "
            >
              <RefreshCw
                aria-hidden="true"
                className="h-4 w-4"
              />

              تمرین دوباره
            </Link>

            <Link
              href="/listening/library"
              className="
                inline-flex min-h-11
                items-center
                justify-center gap-2
                rounded-xl border
                border-white/[0.08]
                bg-white/[0.035]
                px-4 py-2.5
                text-sm font-medium
                text-slate-300
                transition
                hover:bg-white/[0.07]
                hover:text-white
              "
            >
              انتخاب تمرین دیگر

              <ArrowLeft
                aria-hidden="true"
                className="h-4 w-4"
              />
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
}