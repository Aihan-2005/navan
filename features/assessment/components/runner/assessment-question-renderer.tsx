"use client";

import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  Check,
  FileAudio2,
  ListOrdered,
  Mic2,
} from "lucide-react";

import {
  Card,
} from "../../../../components/ui/card";

import {
  cn,
} from "../../../../lib/utils/cn";

import {
  VoiceRecorder,
} from "../../../speaking/components/voice-recorder";

import type {
  AssessmentAnswerPayload,
} from "../../types/assessment-attempt.types";

import type {
  AssessmentQuestionView,
} from "../../types/assessment-question.types";

type AssessmentQuestionRendererProps =
  Readonly<{
    question:
      AssessmentQuestionView;

    answer:
      AssessmentAnswerPayload | null;

    onAnswer:
      (
        payload:
          AssessmentAnswerPayload | null,
      ) => void;
  }>;

function countWords(
  value:
    string,
): number {
  const normalized =
    value.trim();

  if (!normalized) {
    return 0;
  }

  return normalized
    .split(
      /\s+/u,
    )
    .filter(
      Boolean,
    )
    .length;
}

export function AssessmentQuestionRenderer({
  question,
  answer,
  onAnswer,
}: AssessmentQuestionRendererProps) {
  return (
    <div>
      {question.instruction ? (
        <p
          className="
            mb-4
            text-sm
            leading-7
            text-cyan-300
          "
        >
          {question.instruction}
        </p>
      ) : null}

      <h2
        dir="ltr"
        className="
          text-left
          text-xl
          font-bold
          leading-9
          text-white
          sm:text-2xl
        "
      >
        {question.prompt}
      </h2>

      <div className="mt-7">
        {question.type ===
        "multiple_choice" ? (
          <SingleChoice
            options={
              question.options
            }
            selectedId={
              answer?.kind ===
             "single_option"
                ? answer.selectedOptionId
                : null
            }
            onChange={(
              selectedOptionId,
            ) => {
              onAnswer({
                kind:
                  "single_option",

                selectedOptionId,
              });
            }}
          />
        ) : null}

        {question.type ===
        "multiple_select" ? (
          <MultipleChoice
            options={
              question.options
            }
            selectedIds={
              answer?.kind ===
              "multiple_options"
                ? answer.selectedOptionIds
                : []
            }
            onChange={(
              selectedOptionIds,
            ) => {
              if (
                selectedOptionIds.length ===
                0
              ) {
                onAnswer(
                  null,
                );

                return;
              }

              onAnswer({
                kind:
                  "multiple_options",

                selectedOptionIds,
              });
            }}
          />
        ) : null}

        {question.type ===
        "fill_blank" ? (
          <TextInput
            value={
              answer?.kind ===
              "text"
                ? answer.value
                : ""
            }
            placeholder="پاسخ را وارد کن..."
            onChange={(
              value,
            ) => {
              onAnswer(
                value.trim()
                  ? {
                      kind:
                        "text",

                      value,
                    }
                  : null,
              );
            }}
          />
        ) : null}

        {question.type ===
        "ordering" ? (
          <OrderingAnswer
            items={
              question.items
            }
            orderedItemIds={
              answer?.kind ===
              "ordering"
                ? answer.orderedItemIds
                : question.items.map(
                    (
                      item,
                    ) =>
                      item.id,
                  )
            }
            hasAnswer={
              answer?.kind ===
              "ordering"
            }
             onChange={(
              orderedItemIds,
            ) => {
              onAnswer({
                kind:
                  "ordering",

                orderedItemIds,
              });
            }}
          />
        ) : null}

        {question.type ===
        "reading_comprehension" ? (
          <div className="space-y-6">
            <Card
              className="
                border-cyan-400/10
                bg-cyan-400/[0.025]
                p-5
              "
            >
              {question.passage.title ? (
                <h3
                  dir="ltr"
                  className="
                    text-left
                    font-bold
                    text-white
                  "
                >
                  {
                    question.passage
                      .title
                  }
                </h3>
              ) : null}

              <p
                dir="ltr"
                className="
                  mt-3
                  whitespace-pre-wrap
                  text-left
                  text-sm
                  leading-8
                  text-slate-300
                "
              >
                {
                  question.passage
                    .text
                }
              </p>
            </Card>
 <SingleChoice
              options={
                question.options
              }
              selectedId={
                answer?.kind ===
                "single_option"
                  ? answer.selectedOptionId
                  : null
              }
              onChange={(
                selectedOptionId,
              ) => {
                onAnswer({
                  kind:
                    "single_option",

                  selectedOptionId,
                });
              }}
            />
          </div>
        ) : null}

        {question.type ===
        "listening_comprehension" ? (
          <div className="space-y-6">
            {question.audioUrl ? (
              <Card className="p-4">
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-xs
                    text-cyan-300
                  "
                >
                  <FileAudio2
                    aria-hidden="true"
                    className="h-4 w-4"
                  />

                  فایل شنیداری
                </div>

                <audio
                  controls
                  preload="metadata"
                  src={
                    question.audioUrl
                  }
                  className="
                    mt-4
                    w-full
                  "
                >

                 مرورگر شما از پخش صوت پشتیبانی نمی‌کند.
                </audio>
              </Card>
            ) : (
              <div
                role="status"
                className="
                  flex
                  items-start
                  gap-2
                  rounded-xl
                  border
                  border-amber-400/15
                  bg-amber-400/[0.04]
                  p-4
                  text-xs
                  leading-6
                  text-amber-200
                "
              >
                <AlertCircle
                  aria-hidden="true"
                  className="
                    mt-1
                    h-4
                    w-4
                    shrink-0
                  "
                />

                Audio Asset این سؤال هنوز از Backend دریافت نشده است.
              </div>
            )}

            <SingleChoice
              options={
                question.options
              }
              selectedId={
                answer?.kind ===
                "single_option"
                  ? answer.selectedOptionId
                  : null
              }
              onChange={(
                selectedOptionId,
              ) => {
                onAnswer({
                  kind:
                    "single_option",

                  selectedOptionId,
                });
              }}
            />
          </div>
        ) : null}

        {question.type ===
        "short_text" ? (
          <ShortTextAnswer
            value={
              answer?.kind ===
              "text"
                ? answer.value
                : ""
            }
            minimumWords={
              question.minimumWords
            }
            maximumWords={
              question.maximumWords
            }
            onChange={(
              value,
            ) => {
              onAnswer(
                value.trim()
                  ? {
                      kind:
                        "text",

                      value,
                    }
                  : null,
              );
            }}
          />
        ) : null}

        {question.type ===
        "speaking_response" ? (
          <div className="space-y-4">
            <div
              className="
                flex
                items-start
                gap-2
                rounded-xl
                border
                border-violet-400/10
                bg-violet-400/[0.035]
                p-4
                text-xs
                leading-6
                text-violet-100/70
              "
            >
              <Mic2
                aria-hidden="true"
                className="  mt-1
                  h-4
                  w-4
                  shrink-0
                "
              />

              پاسخ صوتی در Frontend ضبط می‌شود. ارزیابی تلفظ و محتوای Voice بعد از اتصال Upload و Speech Analysis Backend انجام خواهد شد.
            </div>

            <VoiceRecorder
              maxDurationSeconds={
                question.maximumSeconds
              }
              minimumUsefulDurationSeconds={
                question.minimumSeconds
              }
              onRecordingReady={(
                recording,
              ) => {
                onAnswer({
                  kind:
                    "recording",

                  recordingId:
                    `local-${question.id}-${recording.createdAt}`,

                  durationSeconds:
                    Math.max(
                      1,
                      Math.round(
                        recording.durationSeconds,
                      ),
                    ),
                });
              }}
              onRecordingCleared={() => {
                onAnswer(
                  null,
                );
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function SingleChoice({
  options,
  selectedId,
  onChange,
}: Readonly<{
  options:
    readonly {
      id:
        string;  label:
        string;
    }[];

  selectedId:
    string | null;

  onChange:
    (
      id:
        string,
    ) => void;
}>) {
  return (
    <div className="space-y-3">
      {options.map(
        (
          option,
          index,
        ) => {
          const selected =
            selectedId ===
            option.id;

          return (
            <button
              key={
                option.id
              }
              type="button"
              onClick={() => {
                onChange(
                  option.id,
                );
              }}
              className={cn(
                "flex",
                "w-full",
                "items-center",
                "gap-4",
                "rounded-2xl",
                "border",
                "p-4",
                "text-left",
                "transition",

                selected
                  ? [
                      "border-cyan-300/25",
                      "bg-cyan-400/[0.07]",
                    ]
                  : [
                 "border-white/[0.07]",
                      "bg-white/[0.025]",
                      "hover:bg-white/[0.05]",
                    ],
              )}
              dir="ltr"
            >
              <span
                className={cn(
                  "flex",
                  "h-8",
                  "w-8",
                  "shrink-0",
                  "items-center",
                  "justify-center",
                  "rounded-full",
                  "border",
                  "text-xs",
                  "font-bold",

                  selected
                    ? [
                        "border-cyan-300/30",
                        "bg-cyan-400/15",
                        "text-cyan-200",
                      ]
                    : [
                        "border-white/10",
                        "text-slate-600",
                      ],
                )}
              >
                {String.fromCharCode(
                  65 +
                    index,
                )}
              </span>

              <span
                className="
                  flex-1
                  text-sm
                  leading-7
                  text-slate-200
                "
              >
                {
                  option.label
                }
              </span>

              {selected ? (
                <Check
                  aria-hidden="true"
                  className="h-4
                    w-4
                    text-cyan-300
                  "
                />
              ) : null}
            </button>
          );
        },
      )}
    </div>
  );
}

function MultipleChoice({
  options,
  selectedIds,
  onChange,
}: Readonly<{
  options:
    readonly {
      id:
        string;

      label:
        string;
    }[];

  selectedIds:
    readonly string[];

  onChange:
    (
      ids:
        string[],
    ) => void;
}>) {
  return (
    <div className="space-y-3">
      {options.map(
        (
          option,
        ) => {
          const selected =
            selectedIds.includes(
              option.id,
            );

          return (
            <button
              key={
                option.id
              }
              type="button"
              aria-pressed={
                selected
              }
              onClick={() => {
                onChange(
                  selected
                    ? selectedIds.filter(
                        (
                          id,
                        ) =>
                          id !==
                          option.id,
                      )
                    : [
                        ...selectedIds,
                        option.id,
                      ],
                );
              }}
              className={cn(
                "flex",
                "w-full",
                "items-center",
                "gap-3",
                "rounded-2xl",
                "border",
                "p-4",
                "text-left",
                "transition",

                selected
                  ? [
                      "border-violet-300/25",
                      "bg-violet-400/[0.07]",
                    ]
                  : [
                      "border-white/[0.07]",
                      "bg-white/[0.025]",
                    ],
              )}
              dir="ltr"
            >



 <span
                className={cn(
                  "flex",
                  "h-5",
                  "w-5",
                  "shrink-0",
                  "items-center",
                  "justify-center",
                  "rounded-md",
                  "border",

                  selected
                    ? [
                        "border-violet-300/30",
                        "bg-violet-400/20",
                        "text-violet-200",
                      ]
                    : [
                        "border-white/10",
                        "text-transparent",
                      ],
                )}
              >
                <Check
                  aria-hidden="true"
                  className="h-3 w-3"
                />
              </span>

              <span
                className="
                  text-sm
                  leading-7
                  text-slate-200
                "
              >
                {
                  option.label
                }
              </span>
            </button>
          );
        },
      )}
    </div>
  );
}

function TextInput({
  value,
  placeholder,
  onChange,
}: Readonly<{
  value:
    string;

  placeholder:
    string; onChange:
    (
      value:
        string,
    ) => void;
}>) {
  return (
    <input
      type="text"
      value={
        value
      }
      onChange={(
        event,
      ) => {
        onChange(
          event.target.value,
        );
      }}
      placeholder={
        placeholder
      }
      dir="ltr"
      className="
        h-14
        w-full
        rounded-2xl
        border
        border-white/[0.08]
        bg-white/[0.025]
        px-5
        text-left
        text-base
        text-white
        outline-none
        transition
        placeholder:text-slate-700
        focus:border-cyan-300/30
        focus:ring-2
        focus:ring-cyan-400/10
      "
    />
  );
}

function ShortTextAnswer({
  value,
  minimumWords,
  maximumWords,
  onChange,
}: Readonly<{
  value:
     string;

  minimumWords:
    number;

  maximumWords:
    number;

  onChange:
    (
      value:
        string,
    ) => void;
}>) {
  const wordCount =
    countWords(
      value,
    );

  return (
    <div>
      <textarea
        value={
          value
        }
        onChange={(
          event,
        ) => {
          onChange(
            event.target.value,
          );
        }}
        dir="ltr"
        placeholder="Write your answer..."
        className="
          min-h-48
          w-full
          resize-y
          rounded-2xl
          border
          border-white/[0.08]
          bg-white/[0.025]
          p-5
          text-left
          text-sm
          leading-8
          text-white
          outline-none
          placeholder:text-slate-700
          focus:border-cyan-300/30
        "
      />

      <div
         className="
          mt-2
          flex
          justify-between
          gap-4
          text-xs
          text-slate-600
        "
      >
        <span>
          حداقل{" "}
          {
            minimumWords
          }{" "}
          کلمه
        </span>

        <span>
          {
            wordCount
          }
          /
          {
            maximumWords
          }
        </span>
      </div>
    </div>
  );
}

function OrderingAnswer({
  items,
  orderedItemIds,
  hasAnswer,
  onChange,
}: Readonly<{
  items:
    readonly {
      id:
        string;

      label:
        string;
    }[];

  orderedItemIds:
    readonly string[];

  hasAnswer:
    boolean;

  onChange:
    (
      ids:
        string[],
    ) => void;
}>) {
  const orderedItems  =
    orderedItemIds.map(
      (
        id,
      ) =>
        items.find(
          (
            item,
          ) =>
            item.id ===
            id,
        ),
    )
    .filter(
      (
        item,
      ): item is {
        id:
          string;

        label:
          string;
      } =>
        Boolean(
          item,
        ),
    );

  function move(
    index:
      number,
    direction:
      -1 | 1,
  ): void {
    const targetIndex =
      index +
      direction;

    if (
      targetIndex <
        0 ||
      targetIndex >=
        orderedItems.length
    ) {
      return;
    }

    const next =
      orderedItems.map(
        (
          item,
        ) =>
          item.id,
      );

    [
      next[index],
      next[targetIndex],
    ] = [
      next[targetIndex],
      next[index],
    ];

    onChange(
      next,
    );
  }

  return (
    <div>
      <div
        className="
          mb-4
          flex
          items-center
          gap-2
          text-xs
          text-violet-300
        "
      >
        <ListOrdered
          aria-hidden="true"
          className="h-4 w-4"
        />

        آیتم‌ها را به ترتیب صحیح مرتب کن
      </div>

      <div className="space-y-3">
        {orderedItems.map(
          (
            item,
            index,
          ) => (
            <div
              key={
                item.id
              }
              className={cn(
                "flex",
                "items-center",
                "gap-3",
                "rounded-xl",
                "border",
                "p-3",

                hasAnswer
                  ? "border-violet-400/15 bg-violet-400/[0.04]"
                  : "border-white/[0.07] bg-white/[0.025]",
              )}
            >
              <span
                className="
                   flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-white/[0.05]
                  text-xs
                  font-bold
                  text-slate-400
                "
              >
                {index +
                  1}
              </span>

              <span
                dir="ltr"
                className="
                  flex-1
                  text-left
                  text-sm
                  text-slate-200
                "
              >
                {
                  item.label
                }
              </span>

              <button
                type="button"
                aria-label="انتقال به بالا"
                disabled={
                  index ===
                  0
                }
                onClick={() => {
                  move(
                    index,
                    -1,
                  );
                }}
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-white/[0.04]
                  text-slate-400
                  disabled:opacity-20
                "
              >
                 <ArrowUp
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              </button>

              <button
                type="button"
                aria-label="انتقال به پایین"
                disabled={
                  index ===
                  orderedItems.length -
                    1
                }
                onClick={() => {
                  move(
                    index,
                    1,
                  );
                }}
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-white/[0.04]
                  text-slate-400
                  disabled:opacity-20
                "
              >
                <ArrowDown
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              </button>
            </div>
          ),
        )}
      </div>
    </div>
  );
}