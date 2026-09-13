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
  cn,
} from "../../../../lib/utils/cn";

import {
  LISTENING_PRACTICE_MODE_LABELS,
} from "../../constants/listening.constants";

import type {
  ListeningAttemptAnalysis,
  ListeningErrorPatternSeverity,
  ListeningSkillProfile,
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

const SKILL_LABELS:
  Readonly<
    Record<
      keyof ListeningSkillProfile,
      string
    >
  > = {
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
};

function getSeverityLabel(
  severity:
    ListeningErrorPatternSeverity,
): string {
  switch (
    severity
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
      return "border-[#FECACA] bg-[#FEF2F2] text-[#B91C1C]";

    case "medium":
      return "border-[#F6D99B] bg-[#FFFBEB] text-[#B45309]";

    case "low":
      return "border-[#B9E4DC] bg-[#F0FDF9] text-[#047857]";
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
  } =
    analysis;

  return (
    <section
      aria-label="تحلیل عمیق Listening"
      className="space-y-6"
    >
      {analysis.engine ===
      "mock" ? (
        <div
          className="
            rounded-xl
            border
            border-[#F3D7A1]
            bg-[#FFFBEB]
            px-4
            py-3
            text-xs
            leading-6
            text-[#92400E]
          "
        >
          داده‌های این گزارش در حالت Mock
          هستند. Backend واقعی باید همین
          Contract را با
          {" "}
          <code>engine: "ai"</code>
          {" "}
          برگرداند.
        </div>
      ) : null}

      {aiCoach ? (
        <section
          className="
            relative
            overflow-hidden
            rounded-[24px]
            border
            border-[#DDD3F4]
            bg-[linear-gradient(135deg,#F8F5FF_0%,#FFFFFF_72%)]
            p-6
            shadow-[0_6px_22px_rgba(15,23,42,0.035)]
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
              bg-[#8B5CF6]/10
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
                    text-[#712AE2]
                  "
                >
                  <BrainCircuit
                    aria-hidden="true"
                    className="h-5 w-5"
                  />

                  <span
                    className="
                      text-sm
                      font-black
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
                    font-black
                    leading-8
                    text-[#0F172A]
                  "
                >
                  {
                    aiCoach.headline
                  }
                </h2>

                <p
                  className="
                    mt-4
                    max-w-3xl
                    text-sm
                    leading-8
                    text-[#64748B]
                  "
                >
                  {
                    aiCoach.diagnosis
                  }
                </p>
              </div>

              <div
                className="
                  shrink-0
                  rounded-2xl
                  border
                  border-[#E0D6F7]
                  bg-white
                  p-4
                  shadow-sm
                "
              >
                <p
                  className="
                    text-xs
                    text-[#64748B]
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
                      font-black
                      text-[#712AE2]
                    "
                  >
                    {aiCoach
                      .estimatedCefrLevel ??
                      "—"}
                  </strong>

                  <span
                    className="
                      pb-1
                      text-xs
                      text-[#64748B]
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
              />
            </div>

            <div
              className="
                mt-5
                rounded-xl
                border
                border-[#DDD3F4]
                bg-[#F8F5FF]
                px-4
                py-3
                text-sm
                leading-7
                text-[#5B5270]
              "
            >
              {
                aiCoach.encouragement
              }
            </div>
          </div>
        </section>
      ) : null}

      {skillProfile ? (
        <section
          className="
            rounded-2xl
            border
            border-[#DCE5E3]
            bg-white
            p-6
            shadow-[0_5px_20px_rgba(15,23,42,0.035)]
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <Ear
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
              پروفایل مهارت شنیداری
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
            نوع اطلاعاتی که در سیگنال صوتی
            تشخیص می‌دهی به‌صورت جداگانه
            بررسی شده است.
          </p>

          <div
            className="
              mt-6
              grid
              gap-4
              sm:grid-cols-2
              xl:grid-cols-3
            "
          >
            {(
              Object.keys(
                SKILL_LABELS,
              ) as
                Array<
                  keyof ListeningSkillProfile
                >
            ).map(
              (key) => (
                <SkillMetric
                  key={key}
                  label={
                    SKILL_LABELS[
                      key
                    ]
                  }
                  value={
                    skillProfile[
                      key
                    ]
                  }
                />
              ),
            )}
          </div>
        </section>
      ) : null}

      {errorPatterns.length >
      0 ? (
        <section
          className="
            rounded-2xl
            border
            border-[#DCE5E3]
            bg-white
            p-6
            shadow-[0_5px_20px_rgba(15,23,42,0.035)]
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <MessageSquareWarning
              aria-hidden="true"
              className="
                h-5
                w-5
                text-[#D97706]
              "
            />

            <h2
              className="
                text-lg
                font-black
                text-[#0F172A]
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
                    border-[#E2E8F0]
                    bg-[#FAFCFB]
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
                        font-black
                        text-[#0F172A]
                      "
                    >
                      {
                        pattern.title
                      }
                    </h3>

                    <span
                      className={cn(
                        "rounded-full",
                        "border",
                        "px-2.5",
                        "py-1",
                        "text-[10px]",
                        "font-bold",
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
                      text-[#64748B]
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
                              border
                              border-[#E2E8F0]
                              bg-white
                              px-3
                              py-2
                              text-xs
                              text-[#334155]
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
                      bg-[#EFFAF8]
                      px-3
                      py-3
                      text-xs
                      leading-6
                      text-[#52615F]
                    "
                  >
                    <Lightbulb
                      aria-hidden="true"
                      className="
                        mt-1
                        h-4
                        w-4
                        shrink-0
                        text-[#00685F]
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
        </section>
      ) : null}

      {difficultSegments.length >
      0 ? (
        <section
          className="
            rounded-2xl
            border
            border-[#DCE5E3]
            bg-white
            p-6
            shadow-[0_5px_20px_rgba(15,23,42,0.035)]
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <Volume2
              aria-hidden="true"
              className="
                h-5
                w-5
                text-[#7C3AED]
              "
            />

            <h2
              className="
                text-lg
                font-black
                text-[#0F172A]
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
                    border-[#E2E8F0]
                    bg-[#FAFCFB]
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
                    <span
                      dir="ltr"
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        rounded-full
                        bg-[#F1F5F4]
                        px-2.5
                        py-1
                        text-xs
                        text-[#52615F]
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
                          font-bold
                          text-[#7C3AED]
                        "
                      >
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
                      font-bold
                      leading-7
                      text-[#0F172A]
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
                      text-[#64748B]
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
                      border-[#DDD3F4]
                      bg-[#F8F5FF]
                      px-3
                      py-3
                      text-xs
                      leading-6
                      text-[#5B5270]
                    "
                  >
                    {
                      segment.tipFa
                    }
                  </div>
                </article>
              ),
            )}
          </div>
        </section>
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
          <section
            className="
              rounded-2xl
              border
              border-[#DCE5E3]
              bg-white
              p-6
              shadow-[0_5px_20px_rgba(15,23,42,0.035)]
            "
          >
            <h2
              className="
                text-lg
                font-black
                text-[#0F172A]
              "
            >
              کلمات از دست‌رفته
            </h2>

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
                  <article
                    key={`${item.word}-${item.heardAs ?? "none"}`}
                    className="
                      rounded-xl
                      border
                      border-[#E2E8F0]
                      bg-[#FAFCFB]
                      p-4
                    "
                  >
                    <div
                      className="
                        flex
                        flex-wrap
                        items-center
                        gap-3
                      "
                    >
                      <strong
                        dir="ltr"
                        className="
                          text-sm
                          text-[#B91C1C]
                        "
                      >
                        {item.word}
                      </strong>

                      {item.heardAs ? (
                        <span
                          dir="ltr"
                          className="
                            text-xs
                            text-[#64748B]
                          "
                        >
                          شنیده شد:
                          {" "}
                          {item.heardAs}
                        </span>
                      ) : null}
                    </div>

                    <p
                      className="
                        mt-2
                        text-xs
                        font-bold
                        text-[#00685F]
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
                        text-[#64748B]
                      "
                    >
                      {
                        item.reasonFa
                      }
                    </p>
                  </article>
                ),
              )}
            </div>
          </section>
        ) : null}

        {vocabularyDiscoveries.length >
        0 ? (
          <section
            className="
              rounded-2xl
              border
              border-[#DCE5E3]
              bg-white
              p-6
              shadow-[0_5px_20px_rgba(15,23,42,0.035)]
            "
          >
            <h2
              className="
                text-lg
                font-black
                text-[#0F172A]
              "
            >
              واژگان جدید از همین فایل
            </h2>

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
                  <article
                    key={
                      item.word
                    }
                    className="
                      rounded-xl
                      border
                      border-[#E2E8F0]
                      bg-[#FAFCFB]
                      p-4
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
                      <strong
                        dir="ltr"
                        className="
                          text-sm
                          text-[#0F172A]
                        "
                      >
                        {
                          item.word
                        }
                      </strong>

                      <span
                        className="
                          rounded-full
                          bg-[#E7F4F2]
                          px-2.5
                          py-1
                          text-[9px]
                          font-bold
                          text-[#00685F]
                        "
                      >
                        {
                          item.masteryStatus
                        }
                      </span>
                    </div>

                    <p
                      className="
                        mt-2
                        text-xs
                        font-bold
                        text-[#00685F]
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
                        leading-6
                        text-[#334155]
                      "
                    >
                      {
                        item.phrase
                      }
                    </p>

                    <p
                      className="
                        mt-3
                        text-xs
                        leading-6
                        text-[#64748B]
                      "
                    >
                      {
                        item.noteFa
                      }
                    </p>
                  </article>
                ),
              )}
            </div>
          </section>
        ) : null}
      </div>

      {actionPlan.length >
      0 ? (
        <section
          className="
            rounded-[24px]
            border
            border-[#CBE1DD]
            bg-[#F5FBF9]
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
            <ListChecks
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
                      border-[#D8E5E2]
                      bg-white
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
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-lg
                          bg-[#00685F]
                          text-xs
                          font-black
                          text-white
                        "
                      >
                        {numberFormatter.format(
                          item.priority,
                        )}
                      </span>

                      <span
                        className="
                          inline-flex
                          items-center
                          gap-1
                          text-[10px]
                          text-[#64748B]
                        "
                      >
                        <Clock3
                          aria-hidden="true"
                          className="h-3 w-3"
                        />

                        {numberFormatter.format(
                          item.durationMinutes,
                        )}{" "}
                        دقیقه
                      </span>
                    </div>

                    <h3
                      className="
                        mt-4
                        text-sm
                        font-black
                        text-[#0F172A]
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
                        text-[#64748B]
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
                        bg-[#F4EFFF]
                        px-2.5
                        py-1
                        text-[10px]
                        font-bold
                        text-[#712AE2]
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
        </section>
      ) : null}
    </section>
  );
}

function DiagnosisItem({
  icon: Icon,
  label,
  value,
}: Readonly<{
  icon:
    typeof Sparkles;

  label:
    string;

  value:
    string;
}>) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-[#E2E8F0]
        bg-white
        p-4
      "
    >
      <div
        className="
          flex
          items-center
          gap-2
          text-[#712AE2]
        "
      >
        <Icon
          aria-hidden="true"
          className="h-4 w-4"
        />

        <span
          className="
            text-xs
            font-bold
          "
        >
          {label}
        </span>
      </div>

      <p
        className="
          mt-3
          text-sm
          font-medium
          leading-7
          text-[#334155]
        "
      >
        {value}
      </p>
    </div>
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
    <article
      className="
        rounded-xl
        border
        border-[#E2E8F0]
        bg-[#FAFCFB]
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
        <span
          className="
            text-xs
            font-bold
            text-[#52615F]
          "
        >
          {label}
        </span>

        <strong
          className="
            text-sm
            font-black
            text-[#00685F]
          "
        >
          {numberFormatter.format(
            value,
          )}
          ٪
        </strong>
      </div>

      <div
        className="
          mt-3
          h-2
          overflow-hidden
          rounded-full
          bg-[#E5EEEC]
        "
      >
        <div
          className="
            h-full
            rounded-full
            bg-[#0D9488]
          "
          style={{
            width:
              `${value}%`,
          }}
        />
      </div>
    </article>
  );
}
