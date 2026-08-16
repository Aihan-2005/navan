"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Brain,
  Check,
  Clock3,
  Headphones,
  ListChecks,
  Repeat2,
  Sparkles,
  Target,
} from "lucide-react";

import {
  Card,
} from "../../../../components/ui/card";

import {
  cn,
} from "../../../../lib/utils/cn";

import type {
  ListeningContentDetail,
  ListeningPlaybackSnapshot,
} from "../../types/listening.types";

type ListeningListenOnlySessionProps =
  Readonly<{
    content:
      ListeningContentDetail;

    playback:
      ListeningPlaybackSnapshot;

    completedPasses:
      number;
  }>;

const numberFormatter =
  new Intl.NumberFormat(
    "fa-IR",
  );

const RATING_LABELS = [
  {
    value: 1,
    label:
      "خیلی سخت",
  },

  {
    value: 2,
    label:
      "سخت",
  },

  {
    value: 3,
    label:
      "متوسط",
  },

  {
    value: 4,
    label:
      "خوب",
  },

  {
    value: 5,
    label:
      "تقریباً کامل",
  },
] as const;

function formatListeningTime(
  seconds:
    number,
): string {
  const minutes =
    Math.floor(
      seconds /
        60,
    );

  const remainingSeconds =
    seconds %
    60;  if (
    minutes ===
    0
  ) {
    return `${numberFormatter.format(
      remainingSeconds,
    )} ثانیه`;
  }

  return `${numberFormatter.format(
    minutes,
  )} دقیقه و ${numberFormatter.format(
    remainingSeconds,
  )} ثانیه`;
}

export function ListeningListenOnlySession({
  content,
  playback,
  completedPasses,
}: ListeningListenOnlySessionProps) {
  const [
    focusedSeconds,
    setFocusedSeconds,
  ] =
    useState(0);

  const [
    maximumCoverage,
    setMaximumCoverage,
  ] =
    useState(0);

  const [
    comprehensionRating,
    setComprehensionRating,
  ] =
    useState<
      number | null
    >(
      null,
    );

  const [
    capturedMainIdea,
    setCapturedMainIdea,
  ] =
    useState(false);

  const [
    capturedDetails,
    setCapturedDetails,
  ] =
    useState(false);

  const [
    noticedUnknownWords,
    setNoticedUnknownWords,
  ] =
    useState(false);

  const [
    notes,
    setNotes,
  ] =
    useState("");
 useEffect(() => {
    setMaximumCoverage(
      (
        current,
      ) =>
        Math.max(
          current,
          playback.progressPercent,
        ),
    );
  }, [
    playback.progressPercent,
  ]);

  useEffect(() => {
    if (
      !playback.isPlaying
    ) {
      return;
    }

    const timerId =
      window.setInterval(
        () => {
          setFocusedSeconds(
            (
              current,
            ) =>
              current +
              1,
          );
        },
        1000,
      );

    return () => {
      window.clearInterval(
        timerId,
      );
    };
  }, [
    playback.isPlaying,
  ]);

  const checklistScore =
    [
      capturedMainIdea,
      capturedDetails,
      noticedUnknownWords,
    ].filter(
      Boolean,
    ).length;

  const recommendation =
    comprehensionRating ===
      null
      ? "بعد از یک دور کامل، میزان درکت را ثبت کن تا پیشنهاد مناسب‌تری ببینی."
      : comprehensionRating <=
          2
        ? "یک بار دیگر با سرعت ۰٫۷۵ گوش بده و این بار فقط روی ایده اصلی و کلمات کلیدی تمرکز کن."
        : comprehensionRating ===
            3
          ? "دور بعدی را با سرعت طبیعی گوش بده و روی جزئیات، اعداد و نام‌ها تمرکز کن."
          : "درک خوبی داری؛ حالا می‌توانی وارد Dictation یا Shadowing شوی تا شنیدن دقیق‌تر را تمرین کنی.";

  return (
    <section
      aria-labelledby="listen-only-session-title"
 className="space-y-6"
    >
      <Card className="p-5 sm:p-6">
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
                text-cyan-300
              "
            >
              <Headphones
                aria-hidden="true"
                className="h-5 w-5"
              />

              <h2
                id="listen-only-session-title"
                className="
                  text-lg
                  font-bold
                  text-white
                "
              >
                جلسه شنیدن متمرکز
              </h2>
            </div>

            <p
              className="
                mt-3
                max-w-2xl
                text-sm
                leading-7
                text-slate-400
              "
            >
              در این حالت لازم نیست چیزی رونویسی کنی. هدف این است که چند بار با تمرکز گوش بدهی، میزان درکت را ارزیابی کنی و فقط نکات مهم را ثبت کنی.
            </p>
          </div>

          <span
            className="
              rounded-fullborder
              border-cyan-400/15
              bg-cyan-400/[0.05]
              px-3
              py-1.5
              text-xs
              text-cyan-200
            "
          >
            Listening Only
          </span>
        </div>

        <div
          className="
            mt-6
            grid
            gap-3
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >
          <MetricCard
            icon={
              Clock3
            }
            label="زمان گوش دادن"
            value={
              formatListeningTime(
                focusedSeconds,
              )
            }
          />

          <MetricCard
            icon={
              Target
            }
            label="بیشترین پوشش"
            value={`${numberFormatter.format(
              Math.round(
                maximumCoverage,
              ),
            )}٪`}
          />

          <MetricCard
            icon={
              Repeat2
            }
            label="پخش کامل"
            value={`${numberFormatter.format(
              completedPasses,
            )} بار`}
          />

          <MetricCard
            icon={
              Sparkles
            }
            label="سرعت فعلی"
            value={`${playback.playbackRate}×`}
          />
        </div>
      </Card>

      <div
        className=" grid
          gap-6
          xl:grid-cols-2
        "
      >
        <Card className="p-5 sm:p-6">
          <div
            className="
              flex
              items-center
              gap-2
              text-violet-300
            "
          >
            <ListChecks
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
              چک‌لیست شنیدن فعال
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
            لازم نیست همه چیز را در دور اول بفهمی. هر بار روی یک لایه از محتوا تمرکز کن.
          </p>

          <div
            className="
              mt-5
              space-y-3
            "
          >
            <ChecklistItem
              checked={
                capturedMainIdea
              }
              onChange={
                setCapturedMainIdea
              }
              title="ایده اصلی را فهمیدم"
              description="می‌توانم در یک جمله بگویم فایل درباره چه چیزی بود."
            />

            <ChecklistItem
              checked={
                capturedDetails
              }
              onChange={
                setCapturedDetails
              }
              title="چند جزئیات مهم را تشخیص دادم"
              description="مثلاً زمان، مکان، دلیل، عدد یا اتفاق مهم."
            />   <ChecklistItem
              checked={
                noticedUnknownWords
              }
              onChange={
                setNoticedUnknownWords
              }
              title="کلمات نامفهوم را مشخص کردم"
              description="قرار نیست معنی آن‌ها را حدس قطعی بزنم؛ فقط متوجه شدم کجا شنیدن سخت بود."
            />
          </div>

          <div
            className="
              mt-5
              rounded-xl
              border
              border-white/[0.06]
              bg-white/[0.025]
              px-4
              py-3
              text-xs
              text-slate-500
            "
          >
            {numberFormatter.format(
              checklistScore,
            )}{" "}
            از ۳ مرحله ثبت شده
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <div
            className="
              flex
              items-center
              gap-2
              text-amber-300
            "
          >
            <Brain
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
              چقدر متوجه شدی؟
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
            این امتیاز رسمی نیست؛ ارزیابی شخصی تو از میزان درک همین دور شنیدن </p>

          <div
            className="
              mt-5
              grid
              grid-cols-2
              gap-2
              sm:grid-cols-5
              xl:grid-cols-2
              2xl:grid-cols-5
            "
          >
            {RATING_LABELS.map(
              (
                rating,
              ) => {
                const active =
                  comprehensionRating ===
                  rating.value;

                return (
                  <button
                    key={
                      rating.value
                    }
                    type="button"
                    onClick={() => {
                      setComprehensionRating(
                        rating.value,
                      );
                    }}
                    className={cn(
                      "rounded-xl",
                      "border",
                      "px-2",
                      "py-3",
                      "text-xs",
                      "transition",

                      active
                        ? [
                            "border-cyan-300/30",
                            "bg-cyan-400/10",
                            "text-cyan-100",
                          ]
                        : [
                            "border-white/[0.06]",
                            "bg-white/[0.025]",
                            "text-slate-500",
                            "hover:bg-white/[0.05]",
                          ],
                    )}
                  >
                    <span
                      className="
                        block
                        text-base
                        font-bold
                      "
                    >
                      {rating.value}
                    </span>

                    <span className="mt-1 block">
                      { rating.label
                      }
                    </span>
                  </button>
                );
              },
            )}
          </div>

          <div
            className="
              mt-5
              rounded-xl
              border
              border-violet-400/10
              bg-violet-400/[0.04]
              p-4
              text-xs
              leading-6
              text-slate-400
            "
          >
            {recommendation}
          </div>
        </Card>
      </div>

      <Card className="p-5 sm:p-6">
        <div
          className="
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <div>
            <h2
              className="
                text-base
                font-bold
                text-white
              "
            >
              یادداشت شخصی
            </h2>

            <p
              className="
                mt-1
                text-xs
                text-slate-500
              "
            >
              فقط نکات مهم را بنویس؛ این قسمت برای Dictation نیست.
            </p>
          </div>

          <span
            className="
              text-xs
              text-slate-600
            "
          >
            {numberFormatter.format(
              notes.length,
            )}{" "}
            کاراکتر
          </span> </div>

        <textarea
          value={
            notes
          }
          onChange={(
            event,
          ) => {
            setNotes(
              event.target.value,
            );
          }}
          placeholder="مثلاً: درباره سفر بود، ساعت پرواز 10:30 بود، عبارت boarding pass را واضح نشنیدم..."
          className="
            mt-4
            min-h-32
            w-full
            resize-y
            rounded-2xl
            border
            border-white/[0.07]
            bg-black/15
            px-4
            py-3
            text-sm
            leading-7
            text-slate-200
            outline-none
            transition
            placeholder:text-slate-700
            focus:border-cyan-300/25
            focus:ring-2
            focus:ring-cyan-400/10
          "
        />

        <p
          className="
            mt-3
            text-xs
            leading-6
            text-slate-600
          "
        >
          فایل فعلی حدود{" "}
          {numberFormatter.format(
            content.estimatedPracticeMinutes,
          )}{" "}
          دقیقه زمان تمرین پیشنهادی دارد.
        </p>
      </Card>
    </section>
  );
}
function MetricCard({
  icon: Icon,
  label,
  value,
}: Readonly<{
  icon:
    typeof Clock3;

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
        border-white/[0.06]
        bg-white/[0.025]
        p-4
      "
    >
      <Icon
        aria-hidden="true"
        className="
          h-4
          w-4
          text-cyan-300
        "
      />

      <p
        className="
          mt-3
          text-xs
          text-slate-500
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          text-lg
          font-bold
          text-white
        "
      >
        {value}
      </p>
    </div>
  );
}

function ChecklistItem({
  checked,
  onChange,
  title,
  description,
}: Readonly<{
  checked:
    boolean; onChange:
    (
      checked:
        boolean,
    ) => void;

  title:
    string;

  description:
    string;
}>) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={
        checked
      }
      onClick={() => {
        onChange(
          !checked,
        );
      }}
      className={cn(
        "flex",
        "w-full",
        "items-start",
        "gap-3",
        "rounded-xl",
        "border",
        "p-4",
        "text-right",
        "transition",

        checked
          ? [
              "border-emerald-400/15",
              "bg-emerald-400/[0.04]",
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
          "mt-0.5",
          "flex",
          "h-5",
          "w-5",
          "shrink-0",
          "items-center",
          "justify-center",
          "rounded-md",
          "border",

          checked
            ? [
                "border-emerald-300/30",
                "bg-emerald-400/15",
            "text-emerald-300",
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

      <span>
        <span
          className="
            block
            text-sm
            font-medium
            text-slate-200
          "
        >
          {title}
        </span>

        <span
          className="
            mt-1
            block
            text-xs
            leading-6
            text-slate-600
          "
        >
          {description}
        </span>
      </span>
    </button>
  );
}