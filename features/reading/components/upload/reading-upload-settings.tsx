

import {
  BrainCircuit,
  FileQuestion,
  Headphones,
  Languages,
  ListTree,
  Sparkles,
} from "lucide-react";

import {
  cn,
} from "../../../../lib/utils/cn";

import type {
  ReadingCefrLevel,
} from "../../types/reading.types";

import type {
  ReadingUploadAnalysisMode,
  ReadingUploadMetadata,
  ReadingUploadSectionLength,
} from "../../types/reading-upload.types";

type ReadingUploadSettingsProps =
  Readonly<{
    metadata:
      ReadingUploadMetadata;

    disabled?: boolean;

    onChange: (
      metadata:
        ReadingUploadMetadata,
    ) => void;
  }>;

const ANALYSIS_MODES =
  [
    {
      value: "standard",
      title: "استاندارد",
      description:
        "تحلیل سریع سطح، واژگان، گرامر و Sectionها.",
    },
    {
      value: "deep",
      title: "تحلیل عمیق",
      description:
        "تحلیل دقیق‌تر AI برای سختی متن، Inference، واژگان و ساختار.",
    },
  ] as const satisfies readonly {
    value:
      ReadingUploadAnalysisMode;

    title: string;
    description: string;
  }[];

const SECTION_LENGTHS =
  [
    {
      value: "short",
      label: "کوتاه",
    },
    {
      value: "balanced",
      label: "متعادل",
    },
    {
      value: "long",
      label: "بلند",
    },
  ] as const satisfies readonly {
    value:
      ReadingUploadSectionLength;

    label: string;
  }[];

export function ReadingUploadSettings({
  metadata,
  disabled = false,
  onChange,
}: ReadingUploadSettingsProps) {
  function updateMetadata(
    patch: Partial<
      ReadingUploadMetadata
    >,
  ): void {
    onChange({
      ...metadata,
      ...patch,
    });
  }

  function updateOptions(
    patch: Partial<
      ReadingUploadMetadata["options"]
    >,
  ): void {
    onChange({
      ...metadata,

      options: {
        ...metadata.options,
        ...patch,
      },
    });
  }

  return (
    <section
      aria-labelledby="reading-upload-settings-title"
      className="
        rounded-2xl border
        border-white/[0.07]
        bg-white/[0.02]
        p-5 sm:p-6
      "
    >
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
            id="reading-upload-settings-title"
            className="
              font-bold text-white
            "
          >
            تنظیمات تحلیل AI
          </h2>

          <p
            className="
              mt-1 text-xs
              leading-6 text-slate-500
            "
          >
            مشخص کن بعد از Upload،
            AI چه نوع تحلیل و محتوای
            آموزشی تولید کند.
          </p>
        </div>
      </div>

      <div
        className="
          mt-6 grid gap-4
          md:grid-cols-2
        "
      >
        <label
          className="
            md:col-span-2
          "
        >
          <span
            className="
              text-xs font-medium
              text-slate-400
            "
          >
            عنوان منبع
          </span>

          <input
            value={
              metadata.title ?? ""
            }
            maxLength={160}
            disabled={disabled}
            onChange={(event) => {
              updateMetadata({
                title:
                  event.target.value ||
                  null,
              });
            }}
            placeholder="مثلاً Atomic Habits - Chapter 1"
            className="
              mt-2 h-11 w-full
              rounded-xl border
              border-white/[0.08]
              bg-black/15
              px-4 text-sm
              text-slate-200
              outline-none
              transition
              placeholder:text-slate-700
              focus:border-cyan-400/30
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          />
        </label>

        <label>
          <span
            className="
              flex items-center gap-1.5
              text-xs font-medium
              text-slate-400
            "
          >
            <Languages
              aria-hidden="true"
              className="h-3.5 w-3.5"
            />

            زبان متن
          </span>

          <select
            value={
              metadata.languageCode
            }
            disabled={disabled}
            onChange={(event) => {
              updateMetadata({
                languageCode:
                  event.target.value,
              });
            }}
            className="
              mt-2 h-11 w-full
              rounded-xl border
              border-white/[0.08]
              bg-[#0B1221]
              px-3 text-sm
              text-slate-200
              outline-none
              disabled:opacity-50
            "
          >
            <option value="en">
              انگلیسی
            </option>

            <option value="de">
              آلمانی
            </option>

            <option value="fr">
              فرانسوی
            </option>

            <option value="es">
              اسپانیایی
            </option>
          </select>
        </label>

        <label>
          <span
            className="
              text-xs font-medium
              text-slate-400
            "
          >
            سطح تقریبی
          </span>

          <select
            value={
              metadata.cefrLevel ?? ""
            }
            disabled={disabled}
            onChange={(event) => {
              updateMetadata({
                cefrLevel:
                  event.target.value
                    ? (event.target
                        .value as ReadingCefrLevel)
                    : null,
              });
            }}
            className="
              mt-2 h-11 w-full
              rounded-xl border
              border-white/[0.08]
              bg-[#0B1221]
              px-3 text-sm
              text-slate-200
              outline-none
              disabled:opacity-50
            "
          >
            <option value="">
              تشخیص خودکار AI
            </option>

            <option value="A1">
              A1
            </option>

            <option value="A2">
              A2
            </option>

            <option value="B1">
              B1
            </option>

            <option value="B2">
              B2
            </option>

            <option value="C1">
              C1
            </option>

            <option value="C2">
              C2
            </option>
          </select>
        </label>
      </div>

      <div className="mt-6">
        <div
          className="
            flex items-center gap-2
          "
        >
          <Sparkles
            aria-hidden="true"
            className="
              h-4 w-4
              text-violet-300
            "
          />

          <p
            className="
              text-xs font-medium
              text-slate-400
            "
          >
            عمق تحلیل
          </p>
        </div>

        <div
          className="
            mt-3 grid gap-3
            md:grid-cols-2
          "
        >
          {ANALYSIS_MODES.map(
            (mode) => {
              const selected =
                metadata.options
                  .analysisMode ===
                mode.value;

              return (
                <button
                  key={mode.value}
                  type="button"
                  disabled={disabled}
                  aria-pressed={
                    selected
                  }
                  onClick={() => {
                    updateOptions({
                      analysisMode:
                        mode.value,
                    });
                  }}
                  className={cn(
                    "rounded-xl border",
                    "p-4 text-right",
                    "transition",
                    "disabled:opacity-50",

                    selected
                      ? [
                          "border-violet-400/25",
                          "bg-violet-400/[0.07]",
                        ]
                      : [
                          "border-white/[0.06]",
                          "bg-white/[0.02]",
                          "hover:bg-white/[0.04]",
                        ],
                  )}
                >
                  <span
                    className={cn(
                      "text-sm font-bold",

                      selected
                        ? "text-violet-200"
                        : "text-slate-300",
                    )}
                  >
                    {mode.title}
                  </span>

                  <p
                    className="
                      mt-2 text-xs
                      leading-6
                      text-slate-600
                    "
                  >
                    {
                      mode.description
                    }
                  </p>
                </button>
              );
            },
          )}
        </div>
      </div>

      <div
        className="
          mt-6 grid gap-4
          md:grid-cols-2
        "
      >
        <label>
          <span
            className="
              flex items-center gap-1.5
              text-xs font-medium
              text-slate-400
            "
          >
            <ListTree
              aria-hidden="true"
              className="h-3.5 w-3.5"
            />

            طول Sectionها
          </span>

          <select
            value={
              metadata.options
                .sectionLength
            }
            disabled={disabled}
            onChange={(event) => {
              updateOptions({
                sectionLength:
                  event.target
                    .value as
                    ReadingUploadSectionLength,
              });
            }}
            className="
              mt-2 h-11 w-full
              rounded-xl border
              border-white/[0.08]
              bg-[#0B1221]
              px-3 text-sm
              text-slate-200
              outline-none
              disabled:opacity-50
            "
          >
            {SECTION_LENGTHS.map(
              (item) => (
                <option
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </option>
              ),
            )}
          </select>
        </label>

        <label>
          <span
            className="
              flex items-center gap-1.5
              text-xs font-medium
              text-slate-400
            "
          >
            <FileQuestion
              aria-hidden="true"
              className="h-3.5 w-3.5"
            />

            سؤال برای هر Section
          </span>

          <select
            value={
              metadata.options
                .questionsPerSection
            }
            disabled={
              disabled ||
              !metadata.options
                .generateQuestions
            }
            onChange={(event) => {
              updateOptions({
                questionsPerSection:
                  Number(
                    event.target.value,
                  ),
              });
            }}
            className="
              mt-2 h-11 w-full
              rounded-xl border
              border-white/[0.08]
              bg-[#0B1221]
              px-3 text-sm
              text-slate-200
              outline-none
              disabled:opacity-40
            "
          >
            {[1, 2, 3, 4, 5].map(
              (count) => (
                <option
                  key={count}
                  value={count}
                >
                  {count}
                </option>
              ),
            )}
          </select>
        </label>
      </div>

      <div
        className="
          mt-6 grid gap-3
          sm:grid-cols-2
        "
      >
        <SettingToggle
          icon={Headphones}
          title="تولید صوت"
          description="ساخت Audio برای Sectionهای استخراج‌شده"
          checked={
            metadata.options
              .generateAudio
          }
          disabled={disabled}
          onChange={(checked) => {
            updateOptions({
              generateAudio:
                checked,
            });
          }}
        />

        <SettingToggle
          icon={Languages}
          title="تحلیل واژگان"
          description="استخراج واژگان Core و معنی در Context"
          checked={
            metadata.options
              .extractVocabulary
          }
          disabled={disabled}
          onChange={(checked) => {
            updateOptions({
              extractVocabulary:
                checked,
            });
          }}
        />

        <SettingToggle
          icon={BrainCircuit}
          title="تحلیل گرامر"
          description="استخراج ساختارهای مهم Grammar"
          checked={
            metadata.options
              .extractGrammar
          }
          disabled={disabled}
          onChange={(checked) => {
            updateOptions({
              extractGrammar:
                checked,
            });
          }}
        />

        <SettingToggle
          icon={FileQuestion}
          title="سؤالات درک مطلب"
          description="ساخت Quiz برای هر Section"
          checked={
            metadata.options
              .generateQuestions
          }
          disabled={disabled}
          onChange={(checked) => {
            updateOptions({
              generateQuestions:
                checked,
            });
          }}
        />
      </div>
    </section>
  );
}

function SettingToggle({
  icon: Icon,
  title,
  description,
  checked,
  disabled,
  onChange,
}: Readonly<{
  icon: typeof BrainCircuit;

  title: string;
  description: string;

  checked: boolean;
  disabled: boolean;

  onChange: (
    checked: boolean,
  ) => void;
}>) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => {
        onChange(!checked);
      }}
      className={cn(
        "flex items-center",
        "justify-between gap-4",
        "rounded-xl border p-4",
        "text-right transition",
        "disabled:cursor-not-allowed",
        "disabled:opacity-50",

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
      <div
        className="
          flex items-start gap-3
        "
      >
        <Icon
          aria-hidden="true"
          className={cn(
            "mt-0.5 h-4 w-4",
            checked
              ? "text-cyan-300"
              : "text-slate-600",
          )}
        />

        <div>
          <p
            className="
              text-sm font-medium
              text-slate-300
            "
          >
            {title}
          </p>

          <p
            className="
              mt-1 text-[11px]
              leading-5
              text-slate-600
            "
          >
            {description}
          </p>
        </div>
      </div>

      <span
        aria-hidden="true"
        className={cn(
          "relative h-6 w-11",
          "shrink-0 rounded-full",
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