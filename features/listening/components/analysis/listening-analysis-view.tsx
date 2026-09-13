import Link from "next/link";

import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Headphones,
  RefreshCw,
  TriangleAlert,
  XCircle,
  type LucideIcon,
} from "lucide-react";

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

type ComparisonStyle =
  Readonly<{
    label:
      string;

    icon:
      LucideIcon;

    surface:
      string;

    border:
      string;

    text:
      string;
  }>;

const comparisonStyles:
  Record<
    ListeningComparisonKind,
    ComparisonStyle
  > = {
  match: {
    label:
      "درست",

    icon:
      CheckCircle2,

    surface:
      "bg-[#F0FDF4]",

    border:
      "border-[#BBE8C9]",

    text:
      "text-[#15803D]",
  },

  omission: {
    label:
      "جاافتاده",

    icon:
      TriangleAlert,

    surface:
      "bg-[#FFFBEB]",

    border:
      "border-[#F5D997]",

    text:
      "text-[#B45309]",
  },

  substitution: {
    label:
      "جایگزینی",

    icon:
      XCircle,

    surface:
      "bg-[#FEF2F2]",

    border:
      "border-[#FECACA]",

    text:
      "text-[#B91C1C]",
  },

  addition: {
    label:
      "اضافه",

    icon:
      TriangleAlert,

    surface:
      "bg-[#F8F5FF]",

    border:
      "border-[#DED2F6]",

    text:
      "text-[#712AE2]",
  },
};

export function ListeningAnalysisView({
  analysis,
}: ListeningAnalysisViewProps) {
  return (
    <main
      dir="rtl"
      className="
        mx-auto
        w-full
        max-w-[1240px]
        space-y-6
        pb-14
      "
      aria-labelledby="listening-analysis-title"
    >
      <Link
        href="/listening"
        className="
          inline-flex
          items-center
          gap-2
          text-sm
          font-medium
          text-[#64748B]
          transition
          hover:text-[#00685F]
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
          rounded-[28px]
          border
          border-[#CBE1DD]
          bg-[linear-gradient(135deg,#EAF8F5_0%,#FFFFFF_56%,#F7F3FF_100%)]
          p-6
          shadow-[0_14px_40px_rgba(15,23,42,0.05)]
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
            h-72
            w-72
            rounded-full
            bg-[#14B8A6]/10
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
            <span
              className="
                inline-flex
                items-center
                gap-1.5
                rounded-full
                bg-[#E7F4F2]
                px-3
                py-1
                text-xs
                font-black
                text-[#00685F]
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
                bg-[#F1F5F4]
                px-3
                py-1
                text-xs
                font-medium
                text-[#52615F]
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
                "font-bold",

                analysis.engine ===
                  "ai"
                  ? [
                      "bg-[#F4EFFF]",
                      "text-[#712AE2]",
                    ]
                  : [
                      "bg-[#FFF7ED]",
                      "text-[#C2410C]",
                    ],
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
              text-xs
              font-black
              text-[#00685F]
            "
          >
            نتیجه تمرین شنیداری
          </p>

          <h1
            id="listening-analysis-title"
            className="
              mt-2
              text-3xl
              font-black
              leading-tight
              text-[#0F172A]
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
              leading-8
              text-[#64748B]
            "
          >
            علاوه بر نمره Dictation،
            الگوهای شنیداری، بخش‌های دشوار،
            واژگان از دست‌رفته و مسیر تمرین
            بعدی نیز بررسی شده‌اند.
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
          xl:grid-cols-[minmax(0,1fr)_340px]
        "
      >
        <div className="space-y-6">
          <section
            className="
              rounded-2xl
              border
              border-[#DCE5E3]
              bg-white
              p-5
              shadow-[0_5px_20px_rgba(15,23,42,0.035)]
              sm:p-6
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <ClipboardCheck
                aria-hidden="true"
                className="
                  h-5
                  w-5
                  text-[#00685F]
                "
              />

              <h2
                className="
                  text-lg
                  font-black
                  text-[#0F172A]
                "
              >
                مقایسه پاسخ با متن اصلی
              </h2>
            </div>

            <p
              className="
                mt-2
                text-xs
                leading-6
                text-[#64748B]
              "
            >
              تفاوت‌ها به چهار گروه درست،
              حذف، جایگزینی و اضافه تقسیم
              شده‌اند.
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
                        config.surface,
                        config.border,
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
                            "h-4",
                            "w-4",
                            config.text,
                          )}
                        />

                        <span
                          className={cn(
                            "text-xs",
                            "font-black",
                            config.text,
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
                          label="Reference"
                          value={
                            segment.expected
                          }
                        />

                        <ComparisonText
                          label="Your answer"
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
          </section>

          <section
            className="
              rounded-2xl
              border
              border-[#DCE5E3]
              bg-white
              p-5
              shadow-[0_5px_20px_rgba(15,23,42,0.035)]
              sm:p-6
            "
          >
            <h2
              className="
                text-lg
                font-black
                text-[#0F172A]
              "
            >
              Transcript کامل
            </h2>

            <p
              className="
                mt-2
                text-xs
                text-[#64748B]
              "
            >
              متن مرجع و پاسخ خودت را کنار
              هم مقایسه کن.
            </p>

            <div
              className="
                mt-5
                grid
                gap-4
                lg:grid-cols-2
              "
            >
              <TranscriptPanel
                label="متن مرجع"
                value={
                  analysis.referenceTranscript
                }
                tone="reference"
              />

              <TranscriptPanel
                label="متن شما"
                value={
                  analysis.submittedTranscript
                }
                tone="answer"
              />
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <section
            className="
              rounded-2xl
              border
              border-[#DED2F6]
              bg-[#F8F5FF]
              p-5
            "
          >
            <p
              className="
                text-xs
                font-black
                text-[#712AE2]
              "
            >
              بازخورد مدرس
            </p>

            <p
              className="
                mt-3
                text-sm
                leading-8
                text-[#52615F]
              "
            >
              {
                analysis.feedback.summary
              }
            </p>
          </section>

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
            href={`/listening/practice/${encodeURIComponent(
              analysis.contentId,
            )}`}
            className="
              inline-flex
              min-h-11
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#00685F]
              px-5
              text-sm
              font-black
              text-white
              transition
              hover:bg-[#005A52]
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
        border
        border-black/[0.05]
        bg-white/80
        p-3
      "
    >
      <p
        className="
          text-[10px]
          font-bold
          uppercase
          tracking-wide
          text-[#94A3B8]
        "
      >
        {label}
      </p>

      <p
        className="
          mt-2
          text-sm
          leading-7
          text-[#334155]
        "
      >
        {value ??
          "—"}
      </p>
    </div>
  );
}

function TranscriptPanel({
  label,
  value,
  tone,
}: Readonly<{
  label:
    string;

  value:
    string;

  tone:
    "reference" |
    "answer";
}>) {
  const reference =
    tone ===
    "reference";

  return (
    <div
      className={cn(
        "rounded-2xl",
        "border",
        "p-5",

        reference
          ? [
              "border-[#B9E4D4]",
              "bg-[#F0FDF7]",
            ]
          : [
              "border-[#B9DDE8]",
              "bg-[#F1FAFC]",
            ],
      )}
    >
      <p
        className={cn(
          "text-xs",
          "font-black",

          reference
            ? "text-[#047857]"
            : "text-[#0369A1]",
        )}
      >
        {label}
      </p>

      <p
        dir="ltr"
        className="
          mt-3
          whitespace-pre-wrap
          text-left
          text-sm
          leading-8
          text-[#334155]
        "
      >
        {value}
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
    "success" |
    "warning";

  items:
    readonly string[];
}>) {
  const success =
    tone ===
    "success";

  return (
    <section
      className={cn(
        "rounded-2xl",
        "border",
        "p-5",

        success
          ? [
              "border-[#B9E4D4]",
              "bg-[#F0FDF7]",
            ]
          : [
              "border-[#F4D9A4]",
              "bg-[#FFFBEB]",
            ],
      )}
    >
      <h2
        className={cn(
          "text-sm",
          "font-black",

          success
            ? "text-[#047857]"
            : "text-[#B45309]",
        )}
      >
        {title}
      </h2>

      <ul
        className="
          mt-4
          space-y-3
        "
      >
        {items.map(
          (item) => (
            <li
              key={item}
              className="
                flex
                items-start
                gap-3
                text-xs
                leading-6
                text-[#52615F]
              "
            >
              <span
                aria-hidden="true"
                className={cn(
                  "mt-2.5",
                  "h-1.5",
                  "w-1.5",
                  "shrink-0",
                  "rounded-full",

                  success
                    ? "bg-[#10B981]"
                    : "bg-[#F59E0B]",
                )}
              />

              {item}
            </li>
          ),
        )}
      </ul>
    </section>
  );
}
