import {
  BrainCircuit,
  Clock3,
  Ear,
  GraduationCap,
  Lightbulb,
  ListChecks,
  MessageSquareWarning,
  Sparkles,
  Target,
  Volume2,
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
  ListeningErrorPatternSeverity,
} from "../../types/listening.types";

type ListeningAiDiagnosisPanelProps =
  Readonly<{
    analysis:
      ListeningAttemptAnalysis;
  }>;

const numberFormatter =
  new Intl.NumberFormat(
    "fa-IR",
  );

const SKILL_LABELS = {
  mainIdea:
    "ایده اصلی",

  details:
    "جزئیات",

  numbersAndNames:
    "اعداد و نام‌ها",

  connectedSpeech:
    "Connected Speech",

  vocabularyInContext:
    "واژگان در Context",

  inference:
    "استنباط",
} as const;

function getSeverityLabel(
  severity:
    ListeningErrorPatternSeverity,
): string {
  switch (severity
  ) {
    case "high":
      return "مهم";

    case "medium":
      return "متوسط";

    case "low":
      return "کم";
  }
}

function getSeverityClass(
  severity:
    ListeningErrorPatternSeverity,
): string {
  switch (
    severity
  ) {
    case "high":
      return "border-red-400/15 bg-red-400/[0.05] text-red-200";

    case "medium":
      return "border-amber-400/15 bg-amber-400/[0.05] text-amber-200";

    case "low":
      return "border-cyan-400/15 bg-cyan-400/[0.05] text-cyan-200";
  }
}

function formatTime(
  seconds:
    number,
): string {
  const minutes =
    Math.floor(
      seconds /
        60,
    );

  const remaining =
    Math.floor(
      seconds %
        60,
    );

  return `${minutes}:${remaining
    .toString()
    .padStart(
      2,
      "0",
    )}`;
}

export function ListeningAiDiagnosisPanel({
  analysis,
}: ListeningAiDiagnosisPanelProps) {
  const {
    skillProfile,
    errorPatterns,
    difficultSegments,
    missedWords,
    vocabularyDiscoveries,
    actionPlan,
    aiCoach,
  } =  analysis;

  return (
    <section
      aria-label="تحلیل عمیق هوش مصنوعی"
      className="space-y-6"
    >
      {analysis.engine ===
      "mock" ? (
        <div
          className="
            rounded-xl
            border
            border-amber-400/15
            bg-amber-400/[0.04]
            px-4
            py-3
            text-xs
            leading-6
            text-amber-200
          "
        >
          این بخش فعلاً با داده Mock نمایش داده می‌شود. Contract نهایی برای اتصال AI آماده است و Backend واقعی بعداً باید همین ساختار را با `engine: "ai"` برگرداند.
        </div>
      ) : null}

      {aiCoach ? (
        <Card
          className="
            relative
            overflow-hidden
            border-violet-400/15
            p-6
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -left-20
              -top-20
              h-56
              w-56
              rounded-full
              bg-violet-500/10
              blur-3xl
            "
          />

          <div className="relative">
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
                    تشخیص مربی AI
                  </span>
                </div>

                <h2
                  className="
                    mt-3
                    max-w-3xl
                    text-xl
                    font-bold
                    leading-8
                    text-white
                  "
                >
                  {aiCoach.headline}
                </h2>

                <p
                  className="
                    mt-4
                    max-w-3xl
                    text-sm
                    leading-8
                    text-slate-400
                  "
                >
                  {aiCoach.diagnosis}
                </p>
              </div>

              <div
                className="
                  shrink-0
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
 سطح تخمینی Listening
                </p>

                <div
                  className="
                    mt-2
                    flex
                    items-end
                    gap-2
                  "
                >
                  <strong
                    className="
                      text-3xl
                      text-white
                    "
                  >
                    {aiCoach.estimatedCefrLevel ??
                      "—"}
                  </strong>

                  <span
                    className="
                      pb-1
                      text-xs
                      text-slate-500
                    "
                  >
                    اطمینان{" "}
                    {numberFormatter.format(
                      aiCoach.confidencePercent,
                    )}
                    ٪
                  </span>
                </div>
              </div>
            </div>

            <div
              className="
                mt-6
                grid
                gap-4
                md:grid-cols-2
              "
            >
              <DiagnosisItem
                icon={
                  Target
                }
                label="تمرکز بعدی"
                value={
                  aiCoach.nextFocus
                }
              />

              <DiagnosisItem
                icon={
                  GraduationCap
                }
                label="هدف جلسه بعد"
                value={
                  aiCoach.nextSessionGoal
                }
              /> </div>

            <div
              className="
                mt-5
                rounded-xl
                border
                border-violet-400/10
                bg-violet-400/[0.04]
                px-4
                py-3
                text-sm
                leading-7
                text-violet-100/80
              "
            >
              {aiCoach.encouragement}
            </div>
          </div>
        </Card>
      ) : null}

      {skillProfile ? (
        <Card className="p-6">
          <div
            className="
              flex
              items-center
              gap-2
              text-cyan-300
            "
          >
            <Ear
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
              پروفایل مهارت شنیداری
            </h2>
          </div>

          <p
            className="
              mt-2
              text-xs
              leading-6
              text-slate-500
            "
          >
            این بخش فقط دقت نوشتن را نمی‌سنجد؛ نوع اطلاعاتی که در سیگنال صوتی تشخیص می‌دهی را جداگانه بررسی می‌کند.
          </p>

          <div
            className="
              mt-6
              grid
              gap-4
              sm:grid-cols-2
              xl:grid-cols-3
            "
          > {Object.entries(
              SKILL_LABELS,
            ).map(
              ([
                key,
                label,
              ]) => {
                const typedKey =
                  key as keyof typeof skillProfile;

                const value =
                  skillProfile[
                    typedKey
                  ];

                return (
                  <SkillMetric
                    key={
                      key
                    }
                    label={
                      label
                    }
                    value={
                      value
                    }
                  />
                );
              },
            )}
          </div>
        </Card>
      ) : null}

      {errorPatterns.length >
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
            <MessageSquareWarning
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
              الگوهای خطای شنیداری
             </h2>
          </div>

          <div
            className="
              mt-5
              space-y-4
            "
          >
            {errorPatterns.map(
              (
                pattern,
              ) => (
                <article
                  key={
                    pattern.id
                  }
                  className="
                    rounded-2xl
                    border
                    border-white/[0.06]
                    bg-white/[0.025]
                    p-5
                  "
                >
                  <div
                    className="
                      flex
                      flex-wrap
                      items-center
                      justify-between
                      gap-3
                    "
                  >
                    <h3
                      className="
                        font-bold
                        text-white
                      "
                    >
                      {pattern.title}
                    </h3>

                    <span
                      className={cn(
                        "rounded-full",
                        "border",
                        "px-2.5",
                        "py-1",
                        "text-[10px]",
                        getSeverityClass(
                          pattern.severity,
                        ),
                      )}
                    >
                      {getSeverityLabel(
                        pattern.severity,
                      )}
                    </span>
                  </div>

                  <p
                    className="
                      mt-3
                      text-sm
                      leading-7
                       text-slate-400
                    "
                  >
                    {
                      pattern.description
                    }
                  </p>

                  {pattern.evidence.length >
                  0 ? (
                    <div
                      dir="ltr"
                      className="
                        mt-4
                        space-y-2
                        text-left
                      "
                    >
                      {pattern.evidence.map(
                        (
                          evidence,
                        ) => (
                          <code
                            key={
                              evidence
                            }
                            className="
                              block
                              rounded-lg
                              bg-black/15
                              px-3
                              py-2
                              text-xs
                              text-slate-300
                            "
                          >
                            {
                              evidence
                            }
                          </code>
                        ),
                      )}
                    </div>
                  ) : null}
<div
                    className="
                      mt-4
                      flex
                      items-start
                      gap-2
                      rounded-xl
                      bg-cyan-400/[0.04]
                      px-3
                      py-3
                      text-xs
                      leading-6
                      text-cyan-100/70
                    "
                  >
                    <Lightbulb
                      aria-hidden="true"
                      className="
                        mt-1
                        h-4
                        w-4
                        shrink-0
                        text-cyan-300
                      "
                    />

                    {
                      pattern.recommendation
                    }
                  </div>
                </article>
              ),
            )}
          </div>
        </Card>
      ) : null}

      {difficultSegments.length >
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
              بخش‌های دشوار صوت
            </h2>
          </div>
<div
            className="
              mt-5
              grid
              gap-4
              lg:grid-cols-2
            "
          >
            {difficultSegments.map(
              (
                segment,
              ) => (
                <article
                  key={
                    segment.id
                  }
                  className="
                    rounded-2xl
                    border
                    border-white/[0.06]
                    bg-white/[0.025]
                    p-5
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-3
                    "
                  >
                    <span
                      dir="ltr"
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        rounded-full
                        bg-white/[0.04]
                        px-2.5
                        py-1
                        text-xs
                        text-slate-400
                      "
                    >
                      <Clock3
                        aria-hidden="true"
                        className="h-3.5 w-3.5"
                      />

                      {formatTime(
                        segment.startSecond,
                      )}
                      {" – "}
                      {formatTime(
                        segment.endSecond,
                      )}
                    </span>

                    {segment.focusPhrase ? (
                      <span
                        dir="ltr"
                        className="
                          text-xs
                          text-fuchsia-300
                        "  >
                        {
                          segment.focusPhrase
                        }
                      </span>
                    ) : null}
                  </div>

                  <p
                    dir="ltr"
                    className="
                      mt-4
                      text-left
                      text-sm
                      font-medium
                      leading-7
                      text-white
                    "
                  >
                    {
                      segment.transcript
                    }
                  </p>

                  <p
                    className="
                      mt-4
                      text-xs
                      leading-6
                      text-slate-500
                    "
                  >
                    {
                      segment.reasonFa
                    }
                  </p>

                  <div
                    className="
                      mt-3
                      rounded-xl
                      border
                      border-fuchsia-400/10
                      bg-fuchsia-400/[0.035]
                      px-3
                      py-3
                      text-xs
                      leading-6
                      text-fuchsia-100/70
                    "
                  >
                    {
                      segment.tipFa
                    }
                  </div>
                </article> ),
            )}
          </div>
        </Card>
      ) : null}

      <div
        className="
          grid
          gap-6
          xl:grid-cols-2
        "
      >
        {missedWords.length >
        0 ? (
          <Card className="p-6">
            <div
              className="
                flex
                items-center
                gap-2
                text-red-300
              "
            >
              <Target
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
                کلمات ازدست‌رفته
              </h2>
            </div>

            <div
              className="
                mt-5
                space-y-3
              "
            >
              {missedWords.map(
                (
                  item,
                ) => (
                  <div
                    key={`${item.word}-${item.heardAs ?? "none"}`}
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
                        flex-wrap
                        items-center
                        gap-2
                      "
                    >
                      <strong
                        dir="ltr"
                        className="
                          text-sm
                          text-white
                        "
                      >
                        {
                          item.word
                        }
                      </strong>

                      {item.heardAs ? (
                        <span
                          dir="ltr"
                          className="
                            text-xs
                            text-red-300
                          "
                        >
                              شنیدی:{" "}
                          {
                            item.heardAs
                          }
                        </span>
                      ) : null}
                    </div>

                    <p
                      className="
                        mt-2
                        text-xs
                        text-cyan-200/70
                      "
                    >
                      {
                        item.meaningFa
                      }
                    </p>

                    <p
                      className="
                        mt-2
                        text-xs
                        leading-6
                        text-slate-500
                      "
                    >
                      {
                        item.reasonFa
                      }
                    </p>
                  </div>
                ),
              )}
            </div>
          </Card>
        ) : null}

        {vocabularyDiscoveries.length >
        0 ? (
          <Card className="p-6">
            <div
              className="
                flex
                items-center
                gap-2
                text-emerald-300
              "
            >
              <Sparkles
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
                واژگان کشف‌شده
              </h2>
            </div>

            <div
              className="
                mt-5
                space-y-3
              "
            >
              {vocabularyDiscoveries.map(
                (
                  item,
                ) => (
                  <div
                    key={
                      item.word
                    }
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
                        gap-3
                      "
                    >
                      <strong
                        dir="ltr"
                        className="
                          text-sm
                          text-white
                        "
                      >
                        {
                          item.word
                        }
                      </strong>

                      <span
                        className="
                          rounded-full
                          bg-emerald-400/[0.07]
                          px-2
                          py-1
                          text-[10px]
                          text-emerald-300
                        "
                      >
                        {item.masteryStatus ===
                        "new"
                          ? "جدید"
                          : item.masteryStatus===
                              "review"
                            ? "مرور"
                            : "آشنا"}
                      </span>
                    </div>  <p
                      className="
                        mt-2
                        text-xs
                        text-cyan-200/70
                      "
                    >
                      {
                        item.meaningFa
                      }
                    </p>

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
                      “
                      {
                        item.phrase
                      }
                      ”
                    </p>

                    <p
                      className="
                        mt-2
                        text-xs
                        leading-6
                        text-slate-600
                      "
                    >
                      {
                        item.noteFa
                      }
                    </p>
                  </div>
                ),
              )}
            </div>
          </Card>
        ) : null}
      </div> {actionPlan.length >
      0 ? (
        <Card className="p-6">
          <div
            className="
              flex
              items-center
              gap-2
              text-emerald-300
            "
          >
            <ListChecks
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
              برنامه تمرین بعدی
            </h2>
          </div>

          <div
            className="
              mt-5
              grid
              gap-4
              lg:grid-cols-3
            "
          >
            {[...actionPlan]
              .sort(
                (
                  first,
                  second,
                ) =>
                  first.priority -
                  second.priority,
              )
              .map(
                (
                  item,
                ) => (
                  <article
                    key={
                      item.id
                    }
                    className="
                      rounded-2xl
                      border
                      border-white/[0.06]
                      bg-white/[0.025]
                      p-5
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        gap-3
                     "
                    >
                      <span
                        className="
                          flex
                          h-7
                          w-7
                          items-center
                          justify-center
                          rounded-full
                          bg-emerald-400/10
                          text-xs
                          font-bold
                          text-emerald-300
                        "
                      >
                        {
                          item.priority
                        }
                      </span>

                      <span
                        className="
                          text-[10px]
                          text-slate-500
                        "
                      >
                        {numberFormatter.format(
                          item.durationMinutes,
                        )}{" "}
                        دقیقه
                      </span>
                    </div>

                    <h3
                      className="
                        mt-4
                        font-bold
                        text-white
                      "
                    >
                      {
                        item.title
                      }
                    </h3>
 <p
                      className="
                        mt-2
                        text-xs
                        leading-6
                        text-slate-500
                      "
                    >
                      {
                        item.description
                      }
                    </p>

                    <span
                      className="
                        mt-4
                        inline-flex
                        rounded-full
                        bg-cyan-400/[0.06]
                        px-2.5
                        py-1
                        text-[10px]
                        text-cyan-300
                      "
                    >
                      {
                        LISTENING_PRACTICE_MODE_LABELS[
                          item.practiceMode
                        ]
                      }
                    </span>
                  </article>
                ),
              )}
          </div>
        </Card>
      ) : null}
    </section>
  );
}

function SkillMetric({
  label,
  value,
}: Readonly<{
  label:
    string;

  value:
    number;
}>) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/[0.06]
        bg-white/[0.025]
        p-4
      "
    ><div
        className="
          flex
          items-center
          justify-between
          gap-3
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
          {Math.round(
            value,
          )}
          ٪
        </strong>
      </div>

      <div
        className="
          mt-3
          h-1.5
          overflow-hidden
          rounded-full
          bg-white/[0.05]
        "
      >
        <div
          className="
            h-full
            rounded-full
            bg-cyan-400
          "
          style={{
            width:
              `${value}%`,
          }}
        />
      </div>
    </div>
  );
}
function DiagnosisItem({
  icon: Icon,
  label,
  value,
}: Readonly<{
  icon:
    typeof Target;

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
      <div
        className="
          flex
          items-center
          gap-2
          text-xs
          text-slate-500
        "
      >
        <Icon
          aria-hidden="true"
          className="h-4 w-4"
        />

        {label}
      </div>

      <p
        className="
          mt-2
          text-sm
          leading-6
          text-slate-200
        "
      >
        {value}
      </p>
    </div>
  );
}