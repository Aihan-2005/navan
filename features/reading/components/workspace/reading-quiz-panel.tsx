import {
  CheckCircle2,
  CircleAlert,
  ListChecks,
  RotateCcw,
  Trophy,
  XCircle,
} from "lucide-react";

import {
  Card,
} from "../../../../components/ui/card";

import {
  cn,
} from "../../../../lib/utils/cn";

import type {
  ReadingComprehensionQuestion,
} from "../../types/reading.types";

type ReadingQuizPanelProps =
  Readonly<{
    questions:
      readonly ReadingComprehensionQuestion[];

    answers:
      Readonly<Record<string, string>>;

    submitted: boolean;

    scorePercent: number;

    onAnswer: (
      questionId: string,
      optionId: string,
    ) => void;

    onSubmit: () => void;

    onReset: () => void;
  }>;

const numberFormatter =
  new Intl.NumberFormat("fa-IR");

export function ReadingQuizPanel({
  questions,
  answers,
  submitted,
  scorePercent,
  onAnswer,
  onSubmit,
  onReset,
}: ReadingQuizPanelProps) {
  if (questions.length === 0) {
    return (
      <Card className="p-8 text-center">
        <ListChecks
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
          آزمونی برای این بخش وجود ندارد
        </h2>
      </Card>
    );
  }

  const answeredCount =
    questions.filter(
      (question) =>
        Boolean(
          answers[question.id],
        ),
    ).length;

  const hasAnsweredAll =
    answeredCount ===
    questions.length;

  const hasPassed =
    scorePercent >= 70;

  return (
    <section
      aria-labelledby="reading-quiz-title"
    >
      <div
        className="
          flex flex-col gap-4
          sm:flex-row
          sm:items-start
          sm:justify-between
        "
      >
        <div>
          <div
            className="
              flex items-center gap-2
              text-amber-300
            "
          >
            <ListChecks
              aria-hidden="true"
              className="h-5 w-5"
            />

            <span className="text-sm font-medium">
              Comprehension Check
            </span>
          </div>

          <h2
            id="reading-quiz-title"
            className="
              mt-2 text-2xl
              font-bold text-white
            "
          >
            بررسی درک مطلب
          </h2>

          <p
            className="
              mt-2 max-w-2xl
              text-sm leading-7
              text-slate-500
            "
          >
            به سؤال‌ها پاسخ بده تا مطمئن
            شویم مفهوم اصلی متن را درک
            کرده‌ای.
          </p>
        </div>

        {!submitted ? (
          <span
            className="
              rounded-full
              bg-white/[0.04]
              px-3 py-1.5
              text-xs text-slate-500
            "
          >
            {numberFormatter.format(
              answeredCount,
            )}{" "}
            از{" "}
            {numberFormatter.format(
              questions.length,
            )}{" "}
            پاسخ داده شده
          </span>
        ) : null}
      </div>

      {submitted ? (
        <Card
          className={cn(
            "mt-6 p-5",

            hasPassed
              ? [
                  "border-emerald-400/20",
                  "bg-emerald-400/[0.05]",
                ]
              : [
                  "border-amber-400/20",
                  "bg-amber-400/[0.05]",
                ],
          )}
        >
          <div
            className="
              flex flex-col gap-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div className="flex items-center gap-4">
              <span
                className={cn(
                  "flex h-12 w-12",
                  "items-center justify-center",
                  "rounded-2xl",

                  hasPassed
                    ? [
                        "bg-emerald-400/10",
                        "text-emerald-300",
                      ]
                    : [
                        "bg-amber-400/10",
                        "text-amber-300",
                      ],
                )}
              >
                {hasPassed ? (
                  <Trophy
                    aria-hidden="true"
                    className="h-6 w-6"
                  />
                ) : (
                  <CircleAlert
                    aria-hidden="true"
                    className="h-6 w-6"
                  />
                )}
              </span>

              <div>
                <p
                  className="
                    text-xs
                    text-slate-500
                  "
                >
                  نتیجه آزمون
                </p>

                <p
                  className="
                    mt-1 text-xl
                    font-bold text-white
                  "
                >
                  {numberFormatter.format(
                    scorePercent,
                  )}
                  ٪
                </p>

                <p
                  className="
                    mt-1 text-xs
                    text-slate-500
                  "
                >
                  {hasPassed
                    ? "بسیار خوب؛ این بخش را با موفقیت درک کرده‌ای."
                    : "بهتر است متن و نکات آموزشی را یک‌بار دیگر مرور کنی."}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onReset}
              className="
                inline-flex min-h-10
                items-center
                justify-center gap-2
                rounded-xl border
                border-white/[0.08]
                bg-white/[0.035]
                px-4 py-2
                text-xs font-medium
                text-slate-400
                transition
                hover:bg-white/[0.07]
                hover:text-white
              "
            >
              <RotateCcw
                aria-hidden="true"
                className="h-4 w-4"
              />

              تلاش دوباره
            </button>
          </div>
        </Card>
      ) : null}

      <div className="mt-6 space-y-5">
        {questions.map(
          (question, questionIndex) => {
            const selectedOptionId =
              answers[
                question.id
              ];

            const isCorrect =
              submitted &&
              selectedOptionId ===
                question.correctOptionId;

            return (
              <Card
                key={question.id}
                className="p-5 sm:p-6"
              >
                <div
                  className="
                    flex items-start
                    gap-3
                  "
                >
                  <span
                    className="
                      flex h-8 w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-white/[0.05]
                      text-xs font-bold
                      text-slate-400
                    "
                  >
                    {numberFormatter.format(
                      questionIndex + 1,
                    )}
                  </span>

                  <h3
                    dir="ltr"
                    className="
                      pt-1 text-left
                      text-base font-bold
                      leading-7 text-white
                    "
                  >
                    {question.prompt}
                  </h3>
                </div>

                <div
                  className="
                    mt-5 space-y-2
                  "
                >
                  {question.options.map(
                    (option) => {
                      const isSelected =
                        selectedOptionId ===
                        option.id;

                      const isCorrectOption =
                        submitted &&
                        option.id ===
                          question.correctOptionId;

                      const isWrongSelected =
                        submitted &&
                        isSelected &&
                        option.id !==
                          question.correctOptionId;

                      return (
                        <button
                          key={option.id}
                          type="button"
                          disabled={
                            submitted
                          }
                          onClick={() => {
                            onAnswer(
                              question.id,
                              option.id,
                            );
                          }}
                          className={cn(
                            "flex w-full",
                            "items-center",
                            "justify-between",
                            "gap-4 rounded-xl",
                            "border p-4",
                            "text-left",
                            "transition",
                            "disabled:cursor-default",

                            !submitted &&
                              isSelected && [
                                "border-cyan-400/30",
                                "bg-cyan-400/[0.07]",
                              ],

                            !submitted &&
                              !isSelected && [
                                "border-white/[0.07]",
                                "bg-white/[0.025]",
                                "hover:bg-white/[0.05]",
                              ],

                            isCorrectOption && [
                              "border-emerald-400/25",
                              "bg-emerald-400/[0.06]",
                            ],

                            isWrongSelected && [
                              "border-red-400/25",
                              "bg-red-400/[0.05]",
                            ],
                          )}
                        >
                          <span
                            dir="ltr"
                            className={cn(
                              "text-sm",
                              "leading-7",

                              isSelected
                                ? "text-white"
                                : "text-slate-400",

                              isCorrectOption &&
                                "text-emerald-200",

                              isWrongSelected &&
                                "text-red-200",
                            )}
                          >
                            {option.label}
                          </span>

                          {isCorrectOption ? (
                            <CheckCircle2
                              aria-hidden="true"
                              className="
                                h-5 w-5
                                shrink-0
                                text-emerald-300
                              "
                            />
                          ) : isWrongSelected ? (
                            <XCircle
                              aria-hidden="true"
                              className="
                                h-5 w-5
                                shrink-0
                                text-red-300
                              "
                            />
                          ) : (
                            <span
                              className={cn(
                                "h-4 w-4",
                                "shrink-0",
                                "rounded-full",
                                "border",

                                isSelected
                                  ? [
                                      "border-cyan-300",
                                      "bg-cyan-300",
                                      "shadow-[inset_0_0_0_3px_#0f172a]",
                                    ]
                                  : "border-slate-600",
                              )}
                            />
                          )}
                        </button>
                      );
                    },
                  )}
                </div>

                {submitted ? (
                  <div
                    className={cn(
                      "mt-4 rounded-xl",
                      "border px-4 py-3",
                      "text-xs leading-6",

                      isCorrect
                        ? [
                            "border-emerald-400/15",
                            "bg-emerald-400/[0.04]",
                            "text-emerald-100/70",
                          ]
                        : [
                            "border-amber-400/15",
                            "bg-amber-400/[0.04]",
                            "text-amber-100/70",
                          ],
                    )}
                  >
                    {question.explanation}
                  </div>
                ) : null}
              </Card>
            );
          },
        )}
      </div>

      {!submitted ? (
        <div className="mt-6">
          <button
            type="button"
            disabled={!hasAnsweredAll}
            onClick={onSubmit}
            className="
              inline-flex min-h-12
              items-center justify-center
              gap-2 rounded-xl
              bg-cyan-400
              px-6 py-3
              text-sm font-bold
              text-slate-950
              transition
              hover:bg-cyan-300
              disabled:cursor-not-allowed
              disabled:opacity-40
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-cyan-200
            "
          >
            <CheckCircle2
              aria-hidden="true"
              className="h-4 w-4"
            />

            ثبت پاسخ‌ها
          </button>
        </div>
      ) : null}
    </section>
  );
}