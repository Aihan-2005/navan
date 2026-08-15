import {
  AlertCircle,
  Bot,
  CheckCircle2,
  Gauge,
  Languages,
  MessageCircle,
  Sparkles,
  Target,
  Volume2,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";

import {
  Card,
} from "../../../components/ui/card";

import {
  cn,
} from "../../../lib/utils/cn";

import type {
  SpeakingCorrectionCategory,
  SpeakingTurnAnalysis,
} from "../types/speaking-turn.types";

type SpeakingTurnAnalysisPanelProps =
  Readonly<{
    analysis:
      SpeakingTurnAnalysis;
  }>;

const numberFormatter =
  new Intl.NumberFormat(
    "fa-IR",
  );

const scoreItems =
  [
    {
      key:
        "pronunciation",

      label:
        "تلفظ",
    },

    {
      key:
        "fluency",

      label:
        "روانی",
    },

    {
      key:
        "grammar",
 label:
        "گرامر",
    },

    {
      key:
        "vocabulary",

      label:
        "واژگان",
    },

    {
      key:
        "coherence",

      label:
        "پیوستگی",
    },
  ] as const;

function getCorrectionLabel(
  category:
    SpeakingCorrectionCategory,
): string {
  switch (
    category
  ) {
    case "grammar":
      return "گرامر";

    case "vocabulary":
      return "واژگان";

    case "pronunciation":
      return "تلفظ";

    case "naturalness":
      return "طبیعی‌تر شدن";
  }
}

export function SpeakingTurnAnalysisPanel({
  analysis,
}: SpeakingTurnAnalysisPanelProps) {
  return (
    <section
      aria-labelledby="speaking-analysis-title"
      className="space-y-6"
    >
      {analysis.engine === "mock" ? (
        <div
          className="
            rounded-xl
            border
            border-amber-400/15
            bg-amber-400/[0.05]
            px-4
            py-3
            text-xs
            leading-6
            text-amber-200
          "
        >
          حالت توسعه‌ای فعال است؛ Transcript و امتیازهای این بخش فعلاً نمونه Mock هستند. فایل صوتی واقعی تا Route تحلیل ارسال شده، اما STT و مدل AI واقعی بعداً در Backend جایگزین این پاسخ می‌شوند.
        </div>
      ) : null}

      <Card className="p-6">
        <div
          className="
            flex
            flex-col
            gap-5
            lg:flex-row
            lg:items-center
            lg:justify-between
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
              <Sparkles
                aria-hidden="true"
                className="h-5 w-5"
              />

              <h2
                id="speaking-analysis-title"
                className="
                  text-lg
                  font-bold
                  text-white
                "
              >
                تحلیل پاسخ شما
              </h2>
            </div>

            <p
              className="
                mt-3
                max-w-3xl
                text-sm
                leading-7
                text-slate-400
              "
            >
              {analysis.summaryFa}
            </p>
          </div>

          <div
            className="
              flex
              shrink-0
              items-center
              gap-4
              rounded-2xl
              border
              border-cyan-400/15
              bg-cyan-400/[0.05]
              px-5
              py-4
            "
          >
            <Gauge
              aria-hidden="true"
              className="
                h-6
                w-6
                text-cyan-300
              "
            />

            <div>
              <p
                className="
                  text-xs
                  text-slate-500
                "
              >
                امتیاز کلی
              </p>

              <p
                className="
                  mt-1
                  text-3xl
                  font-black
                  text-white
                " >
                {numberFormatter.format(
                  analysis.scores
                    .overall,
                )}
              </p>
            </div>
          </div>
        </div>

        <div
          className="
            mt-6
            grid
            gap-3
            sm:grid-cols-2
            xl:grid-cols-5
          "
        >
          {scoreItems.map(
            (
              item,
            ) => (
              <ScoreMetric
                key={
                  item.key
                }
                label={
                  item.label
                }
                score={
                  analysis.scores[
                    item.key
                  ]
                }
              />
            ),
          )}
        </div>
      </Card>

      <Card className="p-6">
        <div
          className="
            flex
            flex-wrap
            items-center
            justify-between
            gap-3
          "
        >
          <div
            className="
              flex
              items-center
              gap-2 text-cyan-300
            "
          >
            <Languages
              aria-hidden="true"
              className="h-5 w-5"
            />

            <h2
              className="
                text-lg
                font-bold
                text-white
              "
            >
              متن تشخیص‌داده‌شده
            </h2>
          </div>

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
            اطمینان{" "}
            {numberFormatter.format(
              analysis.transcriptConfidencePercent,
            )}
            ٪
          </span>
        </div>

        <blockquote
          dir="ltr"
          className="
            mt-5
            rounded-2xl
            border
            border-white/[0.06]
            bg-black/15
            p-5
            text-left
            text-base
            leading-8
                        text-slate-200
 "
        >
          {analysis.transcript}
        </blockquote>

        <div
          className="
            mt-4
            flex
            flex-wrap
            gap-4
            text-xs
            text-slate-500
          "
        >
          <span>
            {numberFormatter.format(
              analysis.wordCount,
            )}{" "}
            کلمه
          </span>

          <span>
            {numberFormatter.format(
              analysis.wordsPerMinute,
            )}{" "}
            کلمه در دقیقه
          </span>

          <span>
            {analysis.durationSeconds.toFixed(
              1,
            )}{" "}
            ثانیه
          </span>
        </div>
      </Card>

      <div
        className="
          grid
          gap-6
          lg:grid-cols-2
        "
      >
        <FeedbackList
          icon={
            CheckCircle2
          }
          title="نقاط قوت"
          items={
            analysis.strengths
          }
          tone="success"
        />

        <FeedbackList icon={
            Target
          }
          title="اولویت‌های تمرین"
          items={
            analysis.priorities
          }
          tone="warning"
        />
      </div>

      {analysis.corrections.length >
      0 ? (
        <Card className="p-6">
          <div
            className="
              flex
              items-center
              gap-2
              text-amber-300
            "
          >
            <WandSparkles
              aria-hidden="true"
              className="h-5 w-5"
            />

            <h2
              className="
                text-lg
                font-bold
                text-white
              "
            >
              اصلاح‌های پیشنهادی
            </h2>
          </div>

          <div
            className="
              mt-5
              space-y-4
            "
          >
            {analysis.corrections.map(
              (
                correction,
              ) => (
                <div
                  key={
                    correction.id
                  }
                  className="
                    rounded-2xl
                    border
                    border-white/[0.06]
                    bg-white/[0.025]
                    p-4
                  "  >
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
                        rounded-full
                        bg-violet-400/10
                        px-2.5
                        py-1
                        text-[10px]
                        font-medium
                        text-violet-200
                      "
                    >
                      {getCorrectionLabel(
                        correction.category,
                      )}
                    </span>

                    {correction.severity ===
                    "important" ? (
                      <span
                        className="
                          inline-flex
                          items-center
                          gap-1
                          text-[10px]
                          text-amber-300
                        "
                 >
                        <AlertCircle
                          aria-hidden="true"
                          className="h-3 w-3"
                        />

                        مهم
                      </span>
                    ) : null}
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
                    <div
                      className="
                        rounded-xl
                        border
                        border-red-400/10
                        bg-red-400/[0.035]
                        p-3
                      "
                    >
                      <p
                        className="
                          text-[10px]
                          uppercase
                          tracking-wider
                          text-red-300
                        "
                      >
                         Original
                      </p>

                      <p
                        className="
                          mt-2
                          text-sm
                          leading-6
                          text-slate-300
                        "
                      >
                        {correction.original}
                      </p>
                    </div>

                    <div
                      className="
                        rounded-xl
                        border
                        border-emerald-400/10
                        bg-emerald-400/[0.035]
                        p-3
                      "
                    >
                      <p
                        className="
                          text-[10px]
                          uppercase
                          tracking-wider
                          text-emerald-300
                        "
                      >
                        Better
                      </p>

                      <p
                        className="
                          mt-2
                          text-sm
                          leading-6
                          text-slate-300
                        "
                      >
                        {correction.corrected}
                      </p>
                    </div>
                  </div>

                  <p
                    className="
                      mt-3
                      text-xs
                      leading-6
                      text-slate-500
                    "
                  >
                    {correction.explanationFa}
                  </p>
                </div>   ),
            )}
          </div>
        </Card>
      ) : null}

      {analysis.pronunciationFindings.length >
      0 ? (
        <Card className="p-6">
          <div
            className="
              flex
              items-center
              gap-2
              text-fuchsia-300
            "
          >
            <Volume2
              aria-hidden="true"
              className="h-5 w-5"
            />

            <h2
              className="
                text-lg
                font-bold
                text-white
              "
            >
              نکات تلفظ
            </h2>
          </div>

          <div
            className="
              mt-5
              grid
              gap-4
              md:grid-cols-2
            "
          >
            {analysis.pronunciationFindings.map(
              (
                finding,
              ) => (
                <div
                  key={
                    finding.id
                  }
                  className="
                    rounded-2xl
                    border
                    border-white/[0.06]
                    bg-white/[0.025]
                    p-4
                  "
                >
                  <div className="
                      flex
                      items-start
                      justify-between
                      gap-3
                    "
                  >
                    <div>
                      <p
                        dir="ltr"
                        className="
                          text-left
                          text-base
                          font-bold
                          text-white
                        "
                      >
                        {finding.target}
                      </p>

                      {finding.ipa ? (
                        <p
                          dir="ltr"
                          className="
                            mt-1
                            text-left
                            text-xs
                            text-fuchsia-300
                          "
                        >
                          {finding.ipa}
                        </p>
                      ) : null}
                    </div>

                    <strong
                      className="
                        text-sm
                        text-white
                      "
                    >
                      {finding.score}
                    </strong>
                  </div>

                  <p
                    className="
                      mt-3
                      text-xs
                      leading-6
                      text-slate-500
                    "
                  >
                    {finding.feedbackFa}
                  </p> </div>
              ),
            )}
          </div>
        </Card>
      ) : null}

      <Card
        className="
          overflow-hidden
          border-violet-400/15
          p-0
        "
      >
        <div
          className="
            bg-[linear-gradient(135deg,rgba(124,58,237,0.12),rgba(34,211,238,0.06))]
            p-6
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <span
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-violet-400/10
                text-violet-300
              "
            >
              <Bot
                aria-hidden="true"
                className="h-5 w-5"
              />
            </span>

            <div>
              <p
                className="
                  text-xs
                  text-violet-300
                "
              >
                پاسخ مربی AI
                            </p>

              <h2
                className="
                  mt-1
                  font-bold
                  text-white
                "
              >
                ادامه طبیعی مکالمه
              </h2>
            </div>
          </div>

          <p
            dir="ltr"
            className="
              mt-5
              text-left
              text-base
              leading-8
              text-slate-100
            "
          >
            {analysis.aiReply.text}
          </p>

          <p
            className="
              mt-4
              rounded-xl
              border
              border-white/[0.06]
              bg-black/10
              p-4
              text-sm
              leading-7
              text-slate-400
            "
          >
            {analysis.aiReply.translationFa}
          </p>

          <div
            className="
              mt-5rounded-xl
              border
              border-cyan-400/10
              bg-cyan-400/[0.04]
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
              <MessageCircle
                aria-hidden="true"
                className="h-4 w-4"
              />

              سؤال بعدی
            </div>

            <p
              dir="ltr"
              className="
                mt-2
                text-left
                text-sm
                font-medium
                leading-7
                text-white
              "
            >
              {analysis.aiReply.followUpQuestion}
            </p>
          </div>

          {analysis.aiReply
            .suggestedReplies
            .length >
          0 ? (
            <div className="mt-5">
              <p
                className="
                  text-xs
                  text-slate-500
                "
              >
                برای شروع پاسخ بعدی می‌توانی از این عبارت‌ها کمک بگیری:
              </p>

              <div
                dir="ltr"
                className="
                  mt-3
                  flex
                  flex-wrap  gap-2
                "
              >
                {analysis.aiReply.suggestedReplies.map(
                  (
                    reply,
                  ) => (
                    <span
                      key={
                        reply
                      }
                      className="
                        rounded-xl
                        border
                        border-white/[0.06]
                        bg-white/[0.035]
                        px-3
                        py-2
                        text-left
                        text-xs
                        leading-5
                        text-slate-300
                      "
                    >
                      {reply}
                    </span>
                  ),
                )}
              </div>
            </div>
          ) : null}
        </div>
      </Card>
    </section>
  );
}

function ScoreMetric({
  label,
  score,
}: Readonly<{
  label:
    string;

  score:
    number;
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
      <div
         className="
          flex
          items-center
          justify-between
          gap-2
        "
      >
        <span
          className="
            text-xs
            text-slate-500
          "
        >
          {label}
        </span>

        <strong
          className="
            text-sm
            text-white
          "
        >
          {score}
        </strong>
      </div>

      <div
        className="
          mt-3
          h-1.5
          overflow-hidden
          rounded-full
          bg-white/[0.06]
        "
      >
        <div
          className="
            h-full
            rounded-full
            bg-cyan-300
          "
          style={{
            width:
              `${score}%`,
          }}
        />  </div>
    </div>
  );
}

function FeedbackList({
  icon: Icon,
  title,
  items,
  tone,
}: Readonly<{
  icon:
    LucideIcon;

  title:
    string;

  items:
    readonly string[];

  tone:
    "success" | "warning";
}>) {
  return (
    <Card className="p-6">
      <div
        className={cn(
          "flex",
          "items-center",
          "gap-2",

          tone ===
            "success"
            ? "text-emerald-300"
            : "text-amber-300",
        )}
      >
        <Icon
          aria-hidden="true"
          className="h-5 w-5"
        />

        <h2
          className="
            text-base
            font-bold
            text-white
          "
        >
          {title}
        </h2>
      </div>

      <ul
        className="
          mt-4
          space-y-3
        "
      >{items.map(
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