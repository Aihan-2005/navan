
"use client";

import {
  BookOpenText,
  BrainCircuit,
  Check,
  Clock3,
  Ear,
  FileQuestion,
  Languages,
  LoaderCircle,
  MessageCircle,
  PenLine,
  Settings2,
  Sparkles,
  Target,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  Card,
} from "../../../../components/ui/card";

import {
  cn,
} from "../../../../lib/utils/cn";

import {
  createAssessmentGenerationRequest,
} from "../../api/create-assessment-generation-request";

import {
  ASSESSMENT_CEFR_LEVELS,
  ASSESSMENT_DIFFICULTY_PROFILE_LABELS,
  ASSESSMENT_SKILLS,
  ASSESSMENT_SKILL_LABELS,
  DEFAULT_CUSTOM_EXAM_MINUTES,
  DEFAULT_CUSTOM_EXAM_QUESTION_COUNT,
  DEFAULT_CUSTOM_QUIZ_MINUTES,
  DEFAULT_CUSTOM_QUIZ_QUESTION_COUNT,
} from "../../constants/assessment.constants";

import {
  customAssessmentConfigurationSchema,
} from "../../schemas/assessment-generation.schema";

import type {
  AssessmentLearnerContext,
} from "../../types/assessment-context.types";

import type {
  AssessmentGenerationRequest,
  CustomAssessmentConfiguration,
} from "../../types/assessment-generation.types";

import type {
  AssessmentSkill,
} from "../../types/assessment-question.types";

import {
  CustomAssessmentRequestSummary,
} from "./custom-assessment-request-summary";

type CustomAssessmentBuilderProps =
  Readonly<{
    learner:
      AssessmentLearnerContext;
  }>;

const QUIZ_QUESTION_COUNTS = [
  5,
  8,
  10,
  12,
] as const;

const EXAM_QUESTION_COUNTS = [
  10,
  15,
  20,
  30,
  40,
] as const;

const QUIZ_TIME_LIMITS = [
  5,
  8,
  10,
  15,
  20,
] as const;

const EXAM_TIME_LIMITS = [
  10,
  20,
  30,
  45,
  60,
  90,
] as const;

function getSkillIcon(
  skill: AssessmentSkill,
) {
  switch (skill) {
    case "reading":
      return BookOpenText;

    case "listening":
      return Ear;

    case "speaking":
      return MessageCircle;

    case "writing":
      return PenLine;

    case "grammar":
      return BrainCircuit;

    case "vocabulary":
      return Languages;
  }
}

export function CustomAssessmentBuilder({
  learner,
}: CustomAssessmentBuilderProps) {
  const [
    configuration,
    setConfiguration,
  ] =
    useState<CustomAssessmentConfiguration>(
      {
        experienceMode:
          "quiz",

        selectedSkills: [
          "grammar",
          "vocabulary",
        ],

        levelStrategy:
          "auto",

        targetCefrLevel:
          null,

        difficultyProfile:
          "balanced",

        questionCount:
          DEFAULT_CUSTOM_QUIZ_QUESTION_COUNT,

        timeLimitMinutes:
          DEFAULT_CUSTOM_QUIZ_MINUTES,

        focusPrompt: null,

        includeExplanations:
          true,

        includeAiFeedback:
          true,

        contextPreferences: {
          useLearnerProfile:
            true,

          useSkillHistory:
            true,

          useReviewMistakes:
            true,

          useReadingSignals:
            true,

          useListeningSignals:
            true,

          useSpeakingSignals:
            true,
        },
      },
    );

  const [
    requestResult,
    setRequestResult,
  ] =
    useState<AssessmentGenerationRequest | null>(
      null,
    );

  const [
    errorMessage,
    setErrorMessage,
  ] =
    useState<string | null>(
      null,
    );

  const [
    isSubmitting,
    setIsSubmitting,
  ] =
    useState(false);

  const questionCountOptions =
    configuration.experienceMode ===
    "quiz"
      ? QUIZ_QUESTION_COUNTS
      : EXAM_QUESTION_COUNTS;

  const timeLimitOptions =
    configuration.experienceMode ===
    "quiz"
      ? QUIZ_TIME_LIMITS
      : EXAM_TIME_LIMITS;

  function updateConfiguration(
    patch: Partial<
      CustomAssessmentConfiguration
    >,
  ): void {
    setConfiguration(
      (current) => ({
        ...current,
        ...patch,
      }),
    );

    setRequestResult(null);
    setErrorMessage(null);
  }

  function toggleSkill(
    skill: AssessmentSkill,
  ): void {
    const exists =
      configuration.selectedSkills.includes(
        skill,
      );

    const nextSkills =
      exists
        ? configuration.selectedSkills.filter(
            (item) =>
              item !== skill,
          )
        : [
            ...configuration.selectedSkills,
            skill,
          ];

    updateConfiguration({
      selectedSkills:
        nextSkills,
    });
  }

  async function handleSubmit(): Promise<void> {
    if (isSubmitting) {
      return;
    }

    setErrorMessage(null);
    setRequestResult(null);

    const validation =
      customAssessmentConfigurationSchema.safeParse(
        configuration,
      );

    if (!validation.success) {
      setErrorMessage(
        validation.error
          .issues[0]?.message ??
          "تنظیمات آزمون معتبر نیست.",
      );

      return;
    }

    try {
      setIsSubmitting(true);

      const result =
        await createAssessmentGenerationRequest(
          {
            kind:
              "custom",

            configuration:
              validation.data,
          },
        );

      setRequestResult(
        result,
      );
    } catch (error) {
      console.error(
        "Create custom assessment request failed:",
        error,
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "ساخت درخواست آزمون ناموفق بود.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main
      className="
        mx-auto w-full
        max-w-6xl space-y-6
      "
    >
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
            h-72 w-72
            rounded-full
            bg-cyan-500/15
            blur-3xl
          "
        />

        <div className="relative">
          <div
            className="
              flex items-center
              gap-2 text-cyan-300
            "
          >
            <Settings2
              aria-hidden="true"
              className="h-5 w-5"
            />

            Custom Assessment
          </div>

          <h1
            className="
              mt-4 text-3xl
              font-bold text-white
              sm:text-4xl
            "
          >
            آزمون خودت را بساز
          </h1>

          <p
            className="
              mt-4 max-w-3xl
              text-sm leading-8
              text-slate-400
            "
          >
            یک یا چند مهارت را انتخاب کن
            و مشخص کن آزمون کوتاه باشد یا
            کامل. در مرحله بعد Backend و AI
            بر اساس همین Configuration،
            سطح کاربر و سابقه یادگیری سؤال
            تولید خواهند کرد.
          </p>
        </div>
      </section>

      <section
        className="
          grid gap-6
          lg:grid-cols-12
        "
      >
        <Card
          className="
            p-5 sm:p-6
            lg:col-span-8
          "
        >
          <SectionTitle
            icon={FileQuestion}
            title="نوع ارزیابی"
            description="مشخص کن یک Quiz سریع می‌خواهی یا یک Exam کامل."
          />

          <div
            className="
              mt-5 grid gap-3
              sm:grid-cols-2
            "
          >
            <ModeButton
              selected={
                configuration.experienceMode ===
                "quiz"
              }
              title="کوییز کوتاه"
              description="برای بررسی سریع یک یا چند Skill."
              onClick={() => {
                updateConfiguration(
                  {
                    experienceMode:
                      "quiz",

                    questionCount:
                      DEFAULT_CUSTOM_QUIZ_QUESTION_COUNT,

                    timeLimitMinutes:
                      DEFAULT_CUSTOM_QUIZ_MINUTES,
                  },
                );
              }}
            />

            <ModeButton
              selected={
                configuration.experienceMode ===
                "exam"
              }
              title="آزمون کامل"
              description="ارزیابی عمیق‌تر با تعداد سؤال و زمان بیشتر."
              onClick={() => {
                updateConfiguration(
                  {
                    experienceMode:
                      "exam",

                    questionCount:
                      DEFAULT_CUSTOM_EXAM_QUESTION_COUNT,

                    timeLimitMinutes:
                      DEFAULT_CUSTOM_EXAM_MINUTES,
                  },
                );
              }}
            />
          </div>
        </Card>

        <Card
          className="
            p-5 sm:p-6
            lg:col-span-4
          "
        >
          <div
            className="
              flex items-center
              gap-2 text-violet-300
            "
          >
            <Target
              aria-hidden="true"
              className="h-5 w-5"
            />

            <h2
              className="
                font-bold text-white
              "
            >
              وضعیت فعلی
            </h2>
          </div>

          <div
            className="
              mt-5 space-y-3
            "
          >
            <CurrentMetric
              label="سطح فعلی"
              value={
                learner.currentCefrLevel ??
                "نامشخص"
              }
            />

            <CurrentMetric
              label="موارد مرور"
              value={
                String(
                  learner.review
                    .totalItems,
                )
              }
            />

            <CurrentMetric
              label="فعالیت‌های اخیر"
              value={
                String(
                  learner
                    .recentCompletedActivityCount,
                )
              }
            />
          </div>
        </Card>
      </section>

      <Card className="p-5 sm:p-6">
        <SectionTitle
          icon={BrainCircuit}
          title="مهارت‌ها"
          description="می‌توانی فقط یک Skill یا چند Skill را همزمان انتخاب کنی."
        />

        <div
          className="
            mt-5 grid gap-3
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {ASSESSMENT_SKILLS.map(
            (skill) => {
              const selected =
                configuration
                  .selectedSkills
                  .includes(
                    skill,
                  );

              const Icon =
                getSkillIcon(
                  skill,
                );

              const signal =
                learner.skills.find(
                  (item) =>
                    item.skill ===
                    skill,
                );

              return (
                <button
                  key={skill}
                  type="button"
                  aria-pressed={
                    selected
                  }
                  onClick={() => {
                    toggleSkill(
                      skill,
                    );
                  }}
                  className={cn(
                    "rounded-2xl border",
                    "p-4 text-right",
                    "transition",

                    selected
                      ? [
                          "border-cyan-400/25",
                          "bg-cyan-400/[0.07]",
                        ]
                      : [
                          "border-white/[0.07]",
                          "bg-white/[0.02]",
                          "hover:bg-white/[0.045]",
                        ],
                  )}
                >
                  <div
                    className="
                      flex items-center
                      justify-between
                      gap-3
                    "
                  >
                    <span
                      className={cn(
                        "flex h-10 w-10",
                        "items-center",
                        "justify-center",
                        "rounded-xl",

                        selected
                          ? [
                              "bg-cyan-400/10",
                              "text-cyan-300",
                            ]
                          : [
                              "bg-white/[0.04]",
                              "text-slate-600",
                            ],
                      )}
                    >
                      <Icon
                        aria-hidden="true"
                        className="h-5 w-5"
                      />
                    </span>

                    {selected ? (
                      <Check
                        aria-hidden="true"
                        className="
                          h-4 w-4
                          text-cyan-300
                        "
                      />
                    ) : null}
                  </div>

                  <p
                    className="
                      mt-4 text-sm
                      font-bold text-white
                    "
                  >
                    {
                      ASSESSMENT_SKILL_LABELS[
                        skill
                      ]
                    }
                  </p>

                  <p
                    className="
                      mt-2 text-xs
                      text-slate-600
                    "
                  >
                    {signal?.score !==
                    null &&
                    signal?.score !==
                      undefined
                      ? `امتیاز فعلی: ${signal.score}`
                      : "داده کافی نداریم"}
                  </p>
                </button>
              );
            },
          )}
        </div>
      </Card>

      <Card className="p-5 sm:p-6">
        <SectionTitle
          icon={Sparkles}
          title="سطح و سختی"
          description="AI می‌تواند سطح را از سابقه یادگیری تشخیص دهد یا سطح مشخصی را انتخاب کنی."
        />

        <div
          className="
            mt-5 grid gap-5
            lg:grid-cols-2
          "
        >
          <div>
            <p
              className="
                text-xs font-medium
                text-slate-400
              "
            >
              نحوه انتخاب سطح
            </p>

            <div
              className="
                mt-3 grid
                grid-cols-2 gap-3
              "
            >
              <ModeButton
                selected={
                  configuration.levelStrategy ===
                  "auto"
                }
                title="خودکار"
                description="سطح از Context کاربر پیشنهاد می‌شود."
                onClick={() => {
                  updateConfiguration(
                    {
                      levelStrategy:
                        "auto",

                      targetCefrLevel:
                        null,
                    },
                  );
                }}
              />

              <ModeButton
                selected={
                  configuration.levelStrategy ===
                  "fixed"
                }
                title="سطح ثابت"
                description="CEFR را خودت مشخص می‌کنی."
                onClick={() => {
                  updateConfiguration(
                    {
                      levelStrategy:
                        "fixed",

                      targetCefrLevel:
                        learner
                          .currentCefrLevel ??
                        "B1",
                    },
                  );
                }}
              />
            </div>

            {configuration.levelStrategy ===
            "fixed" ? (
              <label
                className="
                  mt-4 block
                "
              >
                <span
                  className="
                    text-xs
                    text-slate-400
                  "
                >
                  سطح CEFR
                </span>

                <select
                  value={
                    configuration.targetCefrLevel ??
                    "B1"
                  }
                  onChange={(
                    event,
                  ) => {
                    updateConfiguration(
                      {
                        targetCefrLevel:
                          event
                            .target
                            .value as CustomAssessmentConfiguration["targetCefrLevel"],
                      },
                    );
                  }}
                  className="
                    mt-2 h-11 w-full
                    rounded-xl border
                    border-white/[0.08]
                    bg-[#0B1221]
                    px-3 text-sm
                    text-slate-200
                    outline-none
                  "
                >
                  {ASSESSMENT_CEFR_LEVELS.map(
                    (level) => (
                      <option
                        key={level}
                        value={level}
                      >
                        {level}
                      </option>
                    ),
                  )}
                </select>
              </label>
            ) : (
              <div
                className="
                  mt-4 rounded-xl
                  border
                  border-cyan-400/10
                  bg-cyan-400/[0.035]
                  px-4 py-3
                "
              >
                <p
                  className="
                    text-xs
                    leading-6
                    text-cyan-100/60
                  "
                >
                  سطح فعلی پیشنهادی:{" "}
                  <strong
                    className="
                      text-cyan-200
                    "
                  >
                    {learner.currentCefrLevel ??
                      "B1"}
                  </strong>
                </p>
              </div>
            )}
          </div>

          <div>
            <p
              className="
                text-xs font-medium
                text-slate-400
              "
            >
              پروفایل سختی
            </p>

            <div
              className="
                mt-3 space-y-3
              "
            >
              {(
                [
                  "comfortable",
                  "balanced",
                  "challenging",
                ] as const
              ).map(
                (profile) => (
                  <button
                    key={profile}
                    type="button"
                    onClick={() => {
                      updateConfiguration(
                        {
                          difficultyProfile:
                            profile,
                        },
                      );
                    }}
                    className={cn(
                      "flex w-full",
                      "items-center",
                      "justify-between",
                      "rounded-xl border",
                      "px-4 py-3",
                      "text-right transition",

                      configuration.difficultyProfile ===
                        profile
                        ? [
                            "border-violet-400/20",
                            "bg-violet-400/[0.06]",
                            "text-violet-200",
                          ]
                        : [
                            "border-white/[0.06]",
                            "bg-white/[0.02]",
                            "text-slate-400",
                          ],
                    )}
                  >
                    {
                      ASSESSMENT_DIFFICULTY_PROFILE_LABELS[
                        profile
                      ]
                    }

                    {configuration.difficultyProfile ===
                    profile ? (
                      <Check
                        aria-hidden="true"
                        className="h-4 w-4"
                      />
                    ) : null}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-5 sm:p-6">
        <SectionTitle
          icon={Clock3}
          title="اندازه آزمون"
          description="تعداد سؤال و زمان آزمون را مشخص کن."
        />

        <div
          className="
            mt-5 grid gap-4
            sm:grid-cols-2
          "
        >
          <label>
            <span
              className="
                text-xs
                text-slate-400
              "
            >
              تعداد سؤال
            </span>

            <select
              value={
                configuration.questionCount
              }
              onChange={(
                event,
              ) => {
                updateConfiguration(
                  {
                    questionCount:
                      Number(
                        event.target
                          .value,
                      ),
                  },
                );
              }}
              className="
                mt-2 h-11 w-full
                rounded-xl border
                border-white/[0.08]
                bg-[#0B1221]
                px-3 text-sm
                text-slate-200
                outline-none
              "
            >
              {questionCountOptions.map(
                (count) => (
                  <option
                    key={count}
                    value={count}
                  >
                    {count} سؤال
                  </option>
                ),
              )}
            </select>
          </label>

          <label>
            <span
              className="
                text-xs
                text-slate-400
              "
            >
              محدودیت زمانی
            </span>

            <select
              value={
                configuration.timeLimitMinutes
              }
              onChange={(
                event,
              ) => {
                updateConfiguration(
                  {
                    timeLimitMinutes:
                      Number(
                        event.target
                          .value,
                      ),
                  },
                );
              }}
              className="
                mt-2 h-11 w-full
                rounded-xl border
                border-white/[0.08]
                bg-[#0B1221]
                px-3 text-sm
                text-slate-200
                outline-none
              "
            >
              {timeLimitOptions.map(
                (minutes) => (
                  <option
                    key={minutes}
                    value={minutes}
                  >
                    {minutes} دقیقه
                  </option>
                ),
              )}
            </select>
          </label>
        </div>
      </Card>

      <Card className="p-5 sm:p-6">
        <SectionTitle
          icon={Target}
          title="تمرکز اختیاری آزمون"
          description="می‌توانی به AI بگویی روی چه موضوع یا ضعفی بیشتر تمرکز کند."
        />

        <textarea
          value={
            configuration.focusPrompt ??
            ""
          }
          maxLength={500}
          rows={4}
          onChange={(event) => {
            updateConfiguration(
              {
                focusPrompt:
                  event.target.value ||
                  null,
              },
            );
          }}
          placeholder="مثلاً روی Conditionals و Reading Inference تمرکز بیشتری داشته باشد..."
          className="
            mt-5 w-full
            resize-y rounded-xl
            border
            border-white/[0.08]
            bg-black/15
            px-4 py-3
            text-sm leading-7
            text-slate-200
            outline-none
            placeholder:text-slate-700
            focus:border-cyan-400/30
          "
        />
      </Card>

      <Card className="p-5 sm:p-6">
        <SectionTitle
          icon={BrainCircuit}
          title="Context برای AI"
          description="مشخص کن هنگام تولید آزمون چه سیگنال‌هایی از سابقه کاربر قابل استفاده باشند."
        />

        <div
          className="
            mt-5 grid gap-3
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          <ContextToggle
            title="پروفایل یادگیری"
            checked={
              configuration
                .contextPreferences
                .useLearnerProfile
            }
            onChange={(
              checked,
            ) => {
              updateConfiguration(
                {
                  contextPreferences:
                    {
                      ...configuration.contextPreferences,

                      useLearnerProfile:
                        checked,
                    },
                },
              );
            }}
          />

          <ContextToggle
            title="سابقه Skillها"
            checked={
              configuration
                .contextPreferences
                .useSkillHistory
            }
            onChange={(
              checked,
            ) => {
              updateConfiguration(
                {
                  contextPreferences:
                    {
                      ...configuration.contextPreferences,

                      useSkillHistory:
                        checked,
                    },
                },
              );
            }}
          />

          <ContextToggle
            title="اشتباهات و Review"
            checked={
              configuration
                .contextPreferences
                .useReviewMistakes
            }
            onChange={(
              checked,
            ) => {
              updateConfiguration(
                {
                  contextPreferences:
                    {
                      ...configuration.contextPreferences,

                      useReviewMistakes:
                        checked,
                    },
                },
              );
            }}
          />

          <ContextToggle
            title="سیگنال Reading"
            checked={
              configuration
                .contextPreferences
                .useReadingSignals
            }
            onChange={(
              checked,
            ) => {
              updateConfiguration(
                {
                  contextPreferences:
                    {
                      ...configuration.contextPreferences,

                      useReadingSignals:
                        checked,
                    },
                },
              );
            }}
          />

          <ContextToggle
            title="سیگنال Listening"
            checked={
              configuration
                .contextPreferences
                .useListeningSignals
            }
            onChange={(
              checked,
            ) => {
              updateConfiguration(
                {
                  contextPreferences:
                    {
                      ...configuration.contextPreferences,

                      useListeningSignals:
                        checked,
                    },
                },
              );
            }}
          />

          <ContextToggle
            title="سیگنال Speaking"
            checked={
              configuration
                .contextPreferences
                .useSpeakingSignals
            }
            onChange={(
              checked,
            ) => {
              updateConfiguration(
                {
                  contextPreferences:
                    {
                      ...configuration.contextPreferences,

                      useSpeakingSignals:
                        checked,
                    },
                },
              );
            }}
          />
        </div>
      </Card>

      {errorMessage ? (
        <div
          role="alert"
          className="
            rounded-xl border
            border-red-400/15
            bg-red-400/[0.04]
            px-4 py-3
            text-sm
            text-red-300
          "
        >
          {errorMessage}
        </div>
      ) : null}

      <button
        type="button"
        disabled={
          isSubmitting ||
          configuration
            .selectedSkills
            .length === 0
        }
        onClick={() => {
          void handleSubmit();
        }}
        className="
          inline-flex min-h-12
          w-full items-center
          justify-center gap-2
          rounded-xl
          bg-cyan-400
          px-6 py-3
          text-sm font-bold
          text-slate-950
          transition
          hover:bg-cyan-300
          disabled:cursor-not-allowed
          disabled:opacity-50
          sm:w-auto
        "
      >
        {isSubmitting ? (
          <LoaderCircle
            aria-hidden="true"
            className="
              h-4 w-4
              animate-spin
            "
          />
        ) : (
          <Sparkles
            aria-hidden="true"
            className="h-4 w-4"
          />
        )}

        {isSubmitting
          ? "در حال ساخت درخواست..."
          : "ساخت درخواست آزمون"}
      </button>

      {requestResult ? (
        <CustomAssessmentRequestSummary
          request={
            requestResult
          }
        />
      ) : null}
    </main>
  );
}

function SectionTitle({
  icon: Icon,
  title,
  description,
}: Readonly<{
  icon: typeof BrainCircuit;

  title: string;
  description: string;
}>) {
  return (
    <div
      className="
        flex items-start gap-3
      "
    >
      <span
        className="
          flex h-10 w-10
          shrink-0 items-center
          justify-center
          rounded-xl
          bg-cyan-400/10
          text-cyan-300
        "
      >
        <Icon
          aria-hidden="true"
          className="h-5 w-5"
        />
      </span>

      <div>
        <h2
          className="
            font-bold text-white
          "
        >
          {title}
        </h2>

        <p
          className="
            mt-1 text-xs
            leading-6
            text-slate-600
          "
        >
          {description}
        </p>
      </div>
    </div>
  );
}

function ModeButton({
  selected,
  title,
  description,
  onClick,
}: Readonly<{
  selected: boolean;

  title: string;
  description: string;

  onClick: () => void;
}>) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "rounded-xl border",
        "p-4 text-right",
        "transition",

        selected
          ? [
              "border-cyan-400/25",
              "bg-cyan-400/[0.07]",
            ]
          : [
              "border-white/[0.07]",
              "bg-white/[0.02]",
              "hover:bg-white/[0.04]",
            ],
      )}
    >
      <div
        className="
          flex items-center
          justify-between gap-3
        "
      >
        <span
          className="
            text-sm font-bold
            text-white
          "
        >
          {title}
        </span>

        {selected ? (
          <Check
            aria-hidden="true"
            className="
              h-4 w-4
              text-cyan-300
            "
          />
        ) : null}
      </div>

      <p
        className="
          mt-2 text-xs
          leading-6
          text-slate-600
        "
      >
        {description}
      </p>
    </button>
  );
}

function CurrentMetric({
  label,
  value,
}: Readonly<{
  label: string;
  value: string;
}>) {
  return (
    <div
      className="
        flex items-center
        justify-between
        rounded-xl border
        border-white/[0.06]
        bg-white/[0.025]
        px-4 py-3
      "
    >
      <span
        className="
          text-xs
          text-slate-600
        "
      >
        {label}
      </span>

      <strong
        className="
          text-sm text-white
        "
      >
        {value}
      </strong>
    </div>
  );
}

function ContextToggle({
  title,
  checked,
  onChange,
}: Readonly<{
  title: string;

  checked: boolean;

  onChange: (
    checked: boolean,
  ) => void;
}>) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => {
        onChange(!checked);
      }}
      className={cn(
        "flex items-center",
        "justify-between gap-3",
        "rounded-xl border",
        "px-4 py-3",
        "text-right transition",

        checked
          ? [
              "border-cyan-400/15",
              "bg-cyan-400/[0.045]",
            ]
          : [
              "border-white/[0.06]",
              "bg-white/[0.02]",
            ],
      )}
    >
      <span
        className="
          text-xs font-medium
          text-slate-300
        "
      >
        {title}
      </span>

      <span
        aria-hidden="true"
        className={cn(
          "relative h-6 w-11",
          "shrink-0",
          "rounded-full",
          "transition",

          checked
            ? "bg-cyan-400"
            : "bg-white/[0.08]",
        )}
      >
        <span
          className={cn(
            "absolute top-1",
            "h-4 w-4",
            "rounded-full",
            "bg-white transition-all",

            checked
              ? "left-1"
              : "left-6",
          )}
        />
      </span>
    </button>
  );
}