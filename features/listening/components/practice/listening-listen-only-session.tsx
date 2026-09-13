"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Brain,
  Clock3,
  Headphones,
  ListChecks,
  Repeat2,
  Sparkles,
  Target,
} from "lucide-react";

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
    value:
      1,

    label:
      "خیلی سخت",
  },

  {
    value:
      2,

    label:
      "سخت",
  },

  {
    value:
      3,

    label:
      "متوسط",
  },

  {
    value:
      4,

    label:
      "خوب",
  },

  {
    value:
      5,

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
    60;

  if (
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
    useState(
      0,
    );

  const [
    maximumCoverage,
    setMaximumCoverage,
  ] =
    useState(
      0,
    );

  const [
    comprehensionRating,
    setComprehensionRating,
  ] =
    useState<number | null>(
      null,
    );

  const [
    capturedMainIdea,
    setCapturedMainIdea,
  ] =
    useState(
      false,
    );

  const [
    capturedDetails,
    setCapturedDetails,
  ] =
    useState(
      false,
    );

  const [
    noticedUnknownWords,
    setNoticedUnknownWords,
  ] =
    useState(
      false,
    );

  const [
    notes,
    setNotes,
  ] =
    useState(
      "",
    );

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
        ? "یک بار دیگر با سرعت ۰٫۷۵ گوش بده و فقط روی ایده اصلی و کلمات کلیدی تمرکز کن."
        : comprehensionRating ===
            3
          ? "دور بعدی را با سرعت طبیعی گوش بده و روی جزئیات، اعداد و نام‌ها تمرکز کن."
          : "درک خوبی داری؛ حالا می‌توانی وارد Dictation یا Shadowing شوی.";

  return (
    <section
      aria-labelledby="listen-only-session-title"
      className="space-y-5"
    >
      <section
        className="
          rounded-2xl
          border
          border-[#DCE7E5]
          bg-white
          p-5
          shadow-[0_7px_24px_rgba(15,23,42,0.04)]
          sm:p-6
        "
      >
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
                text-[#00685F]
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
                  font-black
                  text-[#172321]
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
                text-[#64748B]
              "
            >
              در این حالت لازم نیست چیزی
              رونویسی کنی. هدف، فهم ایده
              اصلی، جزئیات و تشخیص بخش‌های
              دشوار است.
            </p>
          </div>

          <span
            className="
              self-start
              rounded-full
              border
              border-[#B8DDD7]
              bg-[#EEF8F6]
              px-3
              py-1.5
              text-xs
              font-bold
              text-[#00685F]
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
            icon={Clock3}
            label="زمان گوش دادن"
            value={
              formatListeningTime(
                focusedSeconds,
              )
            }
          />

          <MetricCard
            icon={Target}
            label="بیشترین پوشش"
            value={`${numberFormatter.format(
              Math.round(
                maximumCoverage,
              ),
            )}٪`}
          />

          <MetricCard
            icon={Repeat2}
            label="پخش کامل"
            value={`${numberFormatter.format(
              completedPasses,
            )} بار`}
          />

          <MetricCard
            icon={Sparkles}
            label="سرعت فعلی"
            value={`${playback.playbackRate}×`}
          />
        </div>
      </section>

      <div
        className="
          grid
          gap-5
          xl:grid-cols-2
        "
      >
        <section
          className="
            rounded-2xl
            border
            border-[#DCE7E5]
            bg-white
            p-5
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
            <ListChecks
              aria-hidden="true"
              className="
                h-5
                w-5
                text-[#712AE2]
              "
            />

            <h2
              className="
                text-base
                font-black
                text-[#172321]
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
              text-[#64748B]
            "
          >
            هر دور فقط روی یک لایه از محتوا
            تمرکز کن.
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
              description="زمان، مکان، عدد، دلیل یا اتفاق مهم را شنیدم."
            />

            <ChecklistItem
              checked={
                noticedUnknownWords
              }
              onChange={
                setNoticedUnknownWords
              }
              title="بخش‌های نامفهوم را پیدا کردم"
              description="می‌دانم کجای فایل برای من سخت‌تر بود."
            />
          </div>

          <div
            className="
              mt-5
              rounded-xl
              bg-[#F8FAF9]
              px-4
              py-3
              text-xs
              font-medium
              text-[#64748B]
            "
          >
            {numberFormatter.format(
              checklistScore,
            )}{" "}
            از ۳ مرحله ثبت شده
          </div>
        </section>

        <section
          className="
            rounded-2xl
            border
            border-[#DCE7E5]
            bg-white
            p-5
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
            <Brain
              aria-hidden="true"
              className="
                h-5
                w-5
                text-[#F97316]
              "
            />

            <h2
              className="
                text-base
                font-black
                text-[#172321]
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
              text-[#64748B]
            "
          >
            این امتیاز رسمی نیست و فقط
            ارزیابی شخصی تو از همین دور است.
          </p>

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
                            "border-[#A9D4CD]",
                            "bg-[#E7F4F2]",
                            "text-[#00685F]",
                          ]
                        : [
                            "border-[#E2E8E6]",
                            "bg-[#FAFCFB]",
                            "text-[#64748B]",
                            "hover:bg-[#F3F7F6]",
                          ],
                    )}
                  >
                    <span
                      className="
                        block
                        text-base
                        font-black
                      "
                    >
                      {rating.value}
                    </span>

                    <span
                      className="
                        mt-1
                        block
                      "
                    >
                      {
                        rating.label
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
              border-[#DED3F5]
              bg-[#F8F5FF]
              p-4
              text-xs
              leading-6
              text-[#5F5A6A]
            "
          >
            {recommendation}
          </div>
        </section>
      </div>

      <section
        className="
          rounded-2xl
          border
          border-[#DCE7E5]
          bg-white
          p-5
          sm:p-6
        "
      >
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
                font-black
                text-[#172321]
              "
            >
              یادداشت شخصی
            </h2>

            <p
              className="
                mt-1
                text-xs
                text-[#64748B]
              "
            >
              فقط نکات مهم را بنویس؛ این
              بخش برای Dictation نیست.
            </p>
          </div>

          <span
            className="
              text-xs
              text-[#94A3B8]
            "
          >
            {numberFormatter.format(
              notes.length,
            )}{" "}
            کاراکتر
          </span>
        </div>

        <textarea
          value={notes}
          onChange={(
            event,
          ) => {
            setNotes(
              event.target.value,
            );
          }}
          placeholder={`مثلاً: موضوع ${content.topics[0] ?? "فایل"} بود، چند عدد را واضح نشنیدم...`}
          className="
            mt-4
            min-h-32
            w-full
            resize-y
            rounded-2xl
            border
            border-[#D8E2E0]
            bg-[#FBFCFC]
            px-4
            py-3
            text-sm
            leading-7
            text-[#334155]
            outline-none
            transition
            placeholder:text-[#A3AFAD]
            focus:border-[#0D9488]
            focus:ring-2
            focus:ring-[#14B8A6]/10
          "
        />
      </section>
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
    <article
      className="
        rounded-xl
        border
        border-[#E2E8E6]
        bg-[#F8FAF9]
        p-4
      "
    >
      <Icon
        aria-hidden="true"
        className="
          h-4
          w-4
          text-[#00685F]
        "
      />

      <p
        className="
          mt-3
          text-[10px]
          text-[#64748B]
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          text-sm
          font-black
          text-[#172321]
        "
      >
        {value}
      </p>
    </article>
  );
}

function ChecklistItem({
  checked,
  onChange,
  title,
  description,
}: Readonly<{
  checked:
    boolean;

  onChange:
    (
      value:
        boolean,
    ) => void;

  title:
    string;

  description:
    string;
}>) {
  return (
    <label
      className="
        flex
        cursor-pointer
        items-start
        gap-3
        rounded-xl
        border
        border-[#E2E8E6]
        bg-[#FAFCFB]
        p-3
        transition
        hover:border-[#B9D7D1]
      "
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(
          event,
        ) => {
          onChange(
            event.target.checked,
          );
        }}
        className="
          mt-1
          h-4
          w-4
          accent-[#00685F]
        "
      />

      <span>
        <strong
          className="
            block
            text-sm
            text-[#334155]
          "
        >
          {title}
        </strong>

        <span
          className="
            mt-1
            block
            text-xs
            leading-6
            text-[#64748B]
          "
        >
          {description}
        </span>
      </span>
    </label>
  );
}