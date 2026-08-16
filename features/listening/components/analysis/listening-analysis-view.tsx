import Link from "next/link";

import {
  ArrowRight,
  CheckCircle2,
  Headphones,
  RefreshCw,
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
  ListeningAiDiagnosisPanel,
} from "./listening-ai-diagnosis-panel";

import {
  ListeningScoreOverview,
} from "./listening-score-overview";

type ListeningAnalysisViewProps =
  Readonly<{
    analysis:
      ListeningAttemptAnalysis;
  }>;

const comparisonStyles = {
  match: {
    container:
      "border-emerald-400/15 bg-emerald-400/[0.04]",

    label:
      "درست",

    labelClass:
      "text-emerald-300",

    icon:
      CheckCircle2,
  },

  omission: {
    container:
      "border-amber-400/15 bg-amber-400/[0.04]",

    label:
      "جاافتاده",

    labelClass:
      "text-amber-300",

    icon:      TriangleAlert,
  },

  substitution: {
    container:
      "border-red-400/15 bg-red-400/[0.04]",

    label:
      "جایگزینی",

    labelClass:
      "text-red-300",

    icon:
      XCircle,
  },

  addition: {
    container:
      "border-violet-400/15 bg-violet-400/[0.04]",

    label:
      "اضافه",

    labelClass:
      "text-violet-300",

    icon:
      TriangleAlert,
  },
} satisfies Record<
  ListeningComparisonKind,
  {
    container:
      string;

    label:
      string;

    labelClass:
      string;

    icon:
      typeof CheckCircle2;
  }
>;

export function ListeningAnalysisView({
  analysis,
}: ListeningAnalysisViewProps) {
  return (
    <main
      className="
        mx-auto
        w-full
        max-w-7xl
        space-y-6
      "  aria-labelledby="listening-analysis-title"
    >
      <Link
        href="/listening"
        className="
          inline-flex
          items-center
          gap-2
          text-sm
          text-slate-400
          transition
          hover:text-white
        "
      >
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4"
        />

        بازگشت به شنیداری
      </Link>

      <section
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-cyan-400/15
          bg-white/[0.035]
          p-6
          sm:p-8
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -left-24
            -top-24
            h-64
            w-64
            rounded-full
            bg-cyan-500/15
            blur-3xl
          "
        />

        <div className="relative">
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-2
            "
          >
            <span  className="
                inline-flex
                items-center
                gap-1.5
                rounded-full
                bg-cyan-400/10
                px-3
                py-1
                text-xs
                text-cyan-200
              "
            >
              <Headphones
                aria-hidden="true"
                className="h-3.5 w-3.5"
              />

              تحلیل Listening
            </span>

            <span
              className="
                rounded-full
                bg-white/[0.05]
                px-3
                py-1
                text-xs
                text-slate-400
              "
            >
              {
                LISTENING_PRACTICE_MODE_LABELS[
                  analysis.practiceMode
                ]
              }
            </span>
  <span
              className={cn(
                "rounded-full",
                "px-3",
                "py-1",
                "text-xs",

                analysis.engine ===
                  "ai"
                  ? "bg-violet-400/10 text-violet-200"
                  : "bg-amber-400/10 text-amber-200",
              )}
            >
              {analysis.engine ===
              "ai"
                ? "AI Analysis"
                : "Mock Analysis"}
            </span>
          </div>

          <p
            className="
              mt-5
              text-sm
              font-medium
              text-cyan-300
            "
          >
            نتیجه تمرین شنیداری
          </p>

          <h1
            id="listening-analysis-title"
            className="
              mt-2
              text-3xl
              font-bold
              leading-tight
              text-white
              sm:text-4xl
            "
          >
            {
              analysis.contentTitle
            }
          </h1>

          <p
            className="
              mt-4
              max-w-3xl
              text-sm
              leading-7
              text-slate-400
            "
          >
            این گزارش فقط دقت رونویسی را نشان نمی‌دهد؛ نوع اطلاعاتی که شنیده‌ای، الگوهای خطا، بخش‌های دشوار و بهترین مسیر تمرین بعدی نیز بررسی شده‌اند.
          </p>
        </div>
      </section>
      <ListeningScoreOverview
        score={
          analysis.score
        }
      />

      <section
        className="
          grid
          gap-6
          xl:grid-cols-12
        "
      >
        <div
          className="
            space-y-6
            xl:col-span-8
          "
        >
          <Card className="p-5 sm:p-6">
            <h2
              className="
                text-lg
                font-bold
                text-white
              "
            >
              مقایسه پاسخ با متن اصلی
            </h2>

            <p
              className="
                mt-2
                text-xs
                leading-6
                text-slate-500
              "
            >
              تفاوت‌ها به چهار گروه درست، حذف، جایگزینی و اضافه تقسیم شده‌اند.
            </p>

            <div
              className="
                mt-5
                space-y-3
              "
            >
              {analysis.comparison.map(
                (
                  segment,
                ) => {
                  const config =
                    comparisonStyles[
                      segment.kind
                    ];
const Icon =
                    config.icon;

                  return (
                    <article
                      key={
                        segment.id
                      }
                      className={cn(
                        "rounded-2xl",
                        "border",
                        "p-4",
                        config.container,
                      )}
                    >
                      <div
                        className="
                          flex
                          items-center
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

                      <div
                        dir="ltr"
                        className="
                          mt-4
                          grid
                          gap-3
                          text-left
                          md:grid-cols-2
                        "
                      >
                        <ComparisonText
                          label="متن اصلی"
                          value={
                            segment.expected
                          }
                        />
 <ComparisonText
                          label="پاسخ شما"
                          value={
                            segment.actual
                          }
                        />
                      </div>
                    </article>
                  );
                },
              )}
            </div>
          </Card>

          <Card className="p-5 sm:p-6">
            <h2
              className="
                text-lg
                font-bold
                text-white
              "
            >
              Transcript کامل
            </h2>

            <div
              className="
                mt-5
                grid
                gap-4
                lg:grid-cols-2
              "
            >
              <div
                className="
                  rounded-2xl
                  border
                  border-emerald-400/10
                  bg-emerald-400/[0.035]
                  p-5
                "
              >
                <p
                  className="
                    text-xs
                    text-emerald-300
                  "
                >
                  متن مرجع
                </p>

                <p
                  dir="ltr"
                  className="
                    mt-3
                    text-left
                    text-sm
                    leading-8
                    text-slate-300
                  "
                >
                  {
                    analysis.referenceTranscript
                  }
                </p> </div>

              <div
                className="
                  rounded-2xl
                  border
                  border-cyan-400/10
                  bg-cyan-400/[0.035]
                  p-5
                "
              >
                <p
                  className="
                    text-xs
                    text-cyan-300
                  "
                >
                  متن شما
                </p>

                <p
                  dir="ltr"
                  className="
                    mt-3
                    text-left
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
            <h2
              className="
                text-sm
                font-medium
                text-violet-300
              "
             >
              بازخورد مدرس
            </h2>

            <p
              className="
                mt-4
                text-sm
                leading-8
                text-slate-400
              "
            >
              {
                analysis.feedback.summary
              }
            </p>
          </Card>

          <FeedbackCard
            title="نقاط قوت"
            tone="success"
            items={
              analysis.feedback.strengths
            }
          />

          <FeedbackCard
            title="اولویت‌های تمرین"
            tone="warning"
            items={
              analysis.feedback.priorities
            }
          />
 <Link
            href={`/listening/practice/${analysis.contentId}`}
            className="
              inline-flex
              min-h-11
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-cyan-400
              px-5
              text-sm
              font-bold
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
        </aside>
      </section>

      <ListeningAiDiagnosisPanel
        analysis={
          analysis
        }
      />
    </main>
  );
}

function ComparisonText({
  label,
  value,
}: Readonly<{
  label:
    string;

  value:
    string | null;
}>) {
  return (
    <div
      className="
        rounded-xl
        bg-black/10
        p-3
      "
    >
      <p
        className="
          text-[10px]
          uppercase
          tracking-wider
          text-slate-600
        "
      >
        {label}
      </p>  <p
        className="
          mt-2
          text-sm
          leading-6
          text-slate-300
        "
      >
        {value ??
          "—"}
      </p>
    </div>
  );
}

function FeedbackCard({
  title,
  tone,
  items,
}: Readonly<{
  title:
    string;

  tone:
    "success" | "warning";

  items:
    readonly string[];
}>) {
  return (
    <Card className="p-5 sm:p-6">
      <h2
        className={cn(
          "text-sm",
          "font-medium",

          tone ===
            "success"
            ? "text-emerald-300"
            : "text-amber-300",
        )}
      > {title}
      </h2>

      <ul
        className="
          mt-4
          space-y-3
        "
      >
        {items.map(
          (
            item,
          ) => (
            <li
              key={
                item
              }
              className="
                flex
                items-start
                gap-3
                text-sm
                leading-7
                text-slate-400
              "
            >
              <span
                aria-hidden="true"
                className={cn(
                  "mt-3",
                  "h-1.5",
                  "w-1.5",
                  "shrink-0",
                  "rounded-full",

                  tone ===
                    "success"
                    ? "bg-emerald-300"
                    : "bg-amber-300",
                )}
              />

              {item}
            </li>
          ),
        )}
      </ul>
    </Card>
  );
}