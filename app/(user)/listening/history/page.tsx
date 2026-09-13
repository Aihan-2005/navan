import type {
  Metadata,
} from "next";

import Link from "next/link";

import {
  ArrowLeft,
  BarChart3,
  Clock3,
  Eye,
  Headphones,
  History,
  RotateCcw,
  Target,
} from "lucide-react";

import {
  getListeningHistory,
} from "../../../../features/listening/api/get-listening-history";

import {
  LISTENING_CONTENT_TYPE_LABELS,
  LISTENING_PRACTICE_MODE_LABELS,
} from "../../../../features/listening/constants/listening.constants";

export const metadata:
  Metadata = {
  title:
    "تاریخچه Listening",

  description:
    "مرور تمرین‌ها، تحلیل‌ها و نتایج قبلی مهارت شنیداری",
};

export const dynamic =
  "force-dynamic";

const numberFormatter =
  new Intl.NumberFormat(
    "fa-IR",
  );

const dateFormatter =
  new Intl.DateTimeFormat(
    "fa-IR",
    {
      year:
        "numeric",

      month:
        "short",

      day:
        "numeric",

      hour:
        "2-digit",

      minute:
        "2-digit",
    },
  );

export default async function ListeningHistoryPage() {
  const history =
    await getListeningHistory();

  const averageAccuracy =
    history.items.length >
    0
      ? Math.round(
          history.items.reduce(
            (
              total,
              item,
            ) =>
              total +
              item.accuracyScore,
            0,
          ) /
            history.items.length,
        )
      : 0;

  const totalMinutes =
    history.items.reduce(
      (
        total,
        item,
      ) =>
        total +
        item.durationMinutes,
      0,
    );

  return (
    <main
      dir="rtl"
      className="
        mx-auto
        w-full
        max-w-[1120px]
        space-y-7
        pb-12
      "
    >
      <section
        className="
          relative
          overflow-hidden
          rounded-[28px]
          border
          border-[#DDD8F0]
          bg-[linear-gradient(135deg,#F8F5FF_0%,#FFFFFF_60%,#EAF8F5_100%)]
          p-6
          shadow-[0_14px_40px_rgba(15,23,42,0.05)]
          sm:p-8
        "
      >
        <span
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-[#EEE8FC]
            text-[#712AE2]
          "
        >
          <History
            aria-hidden="true"
            className="h-6 w-6"
          />
        </span>

        <p
          className="
            mt-5
            text-xs
            font-black
            text-[#712AE2]
          "
        >
          Listening History
        </p>

        <h1
          className="
            mt-2
            text-3xl
            font-black
            text-[#0F172A]
            sm:text-4xl
          "
        >
          تاریخچه تمرین‌های شنیداری
        </h1>

        <p
          className="
            mt-4
            max-w-2xl
            text-sm
            leading-8
            text-[#64748B]
          "
        >
          نتیجه‌های قبلی را مقایسه کن،
          تحلیل تمرین را دوباره ببین و
          مواردی را که نیاز به تکرار
          دارند ادامه بده.
        </p>
      </section>

      <section
        aria-label="خلاصه تاریخچه شنیداری"
        className="
          grid
          gap-4
          sm:grid-cols-3
        "
      >
        <SummaryMetric
          icon={Headphones}
          label="تمرین تکمیل‌شده"
          value={numberFormatter.format(
            history.total,
          )}
          tone="teal"
        />

        <SummaryMetric
          icon={Target}
          label="میانگین دقت"
          value={`${numberFormatter.format(
            averageAccuracy,
          )}٪`}
          tone="purple"
        />

        <SummaryMetric
          icon={Clock3}
          label="زمان تمرین"
          value={`${numberFormatter.format(
            totalMinutes,
          )} دقیقه`}
          tone="orange"
        />
      </section>

      {history.items.length >
      0 ? (
        <section
          aria-labelledby="listening-history-list-title"
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
              <p
                className="
                  text-xs
                  font-black
                  text-[#00685F]
                "
              >
                فعالیت‌ها
              </p>

              <h2
                id="listening-history-list-title"
                className="
                  mt-1
                  text-xl
                  font-black
                  text-[#0F172A]
                "
              >
                آخرین تمرین‌ها
              </h2>
            </div>

            <Link
              href="/listening/library"
              className="
                inline-flex
                items-center
                gap-2
                text-xs
                font-bold
                text-[#00685F]
              "
            >
              کتابخانه

              <ArrowLeft
                aria-hidden="true"
                className="h-4 w-4"
              />
            </Link>
          </div>

          <div
            className="
              mt-5
              space-y-4
            "
          >
            {history.items.map(
              (activity) => (
                <article
                  key={
                    activity.id
                  }
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
                      flex-col
                      gap-5
                      lg:flex-row
                      lg:items-center
                      lg:justify-between
                    "
                  >
                    <div className="min-w-0">
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
                            bg-[#E7F4F2]
                            px-2.5
                            py-1
                            text-[10px]
                            font-bold
                            text-[#00685F]
                          "
                        >
                          {
                            LISTENING_CONTENT_TYPE_LABELS[
                              activity.contentType
                            ]
                          }
                        </span>

                        <span
                          className="
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
                              activity.practiceMode
                            ]
                          }
                        </span>

                        <span
                          className="
                            rounded-full
                            bg-[#ECFDF5]
                            px-2.5
                            py-1
                            text-[10px]
                            font-bold
                            text-[#047857]
                          "
                        >
                          تکمیل‌شده
                        </span>
                      </div>

                      <h3
                        className="
                          mt-3
                          text-lg
                          font-black
                          text-[#0F172A]
                        "
                      >
                        {
                          activity.title
                        }
                      </h3>

                      <div
                        className="
                          mt-4
                          flex
                          flex-wrap
                          gap-x-5
                          gap-y-2
                          text-xs
                          text-[#64748B]
                        "
                      >
                        <span
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                          "
                        >
                          <Target
                            aria-hidden="true"
                            className="
                              h-4
                              w-4
                              text-[#00685F]
                            "
                          />

                          دقت{" "}
                          {numberFormatter.format(
                            activity.accuracyScore,
                          )}
                          ٪
                        </span>

                        <span
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                          "
                        >
                          <Clock3
                            aria-hidden="true"
                            className="
                              h-4
                              w-4
                              text-[#712AE2]
                            "
                          />

                          {numberFormatter.format(
                            activity.durationMinutes,
                          )}{" "}
                          دقیقه
                        </span>

                        <span>
                          {dateFormatter.format(
                            new Date(
                              activity.completedAt,
                            ),
                          )}
                        </span>
                      </div>
                    </div>

                    <div
                      className="
                        flex
                        flex-wrap
                        gap-2
                      "
                    >
                      {activity.attemptId ? (
                        <Link
                          href={`/listening/attempts/${encodeURIComponent(
                            activity.attemptId,
                          )}`}
                          className="
                            inline-flex
                            min-h-10
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-[#00685F]
                            px-4
                            text-xs
                            font-black
                            text-white
                            transition
                            hover:bg-[#005A52]
                          "
                        >
                          <Eye
                            aria-hidden="true"
                            className="h-4 w-4"
                          />

                          مشاهده تحلیل
                        </Link>
                      ) : null}

                      <Link
                        href={`/listening/practice/${encodeURIComponent(
                          activity.contentId,
                        )}`}
                        className="
                          inline-flex
                          min-h-10
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          border
                          border-[#D8E2E0]
                          bg-white
                          px-4
                          text-xs
                          font-bold
                          text-[#52615F]
                          transition
                          hover:bg-[#F8FAF9]
                        "
                      >
                        <RotateCcw
                          aria-hidden="true"
                          className="h-4 w-4"
                        />

                        تمرین دوباره
                      </Link>
                    </div>
                  </div>
                </article>
              ),
            )}
          </div>
        </section>
      ) : (
        <section
          className="
            rounded-2xl
            border
            border-dashed
            border-[#CAD8D5]
            bg-[#FAFCFB]
            p-10
            text-center
          "
        >
          <History
            aria-hidden="true"
            className="
              mx-auto
              h-8
              w-8
              text-[#94A3B8]
            "
          />

          <p
            className="
              mt-4
              text-sm
              font-bold
              text-[#334155]
            "
          >
            هنوز تمرین تکمیل‌شده‌ای نداری
          </p>

          <Link
            href="/listening/library"
            className="
              mt-5
              inline-flex
              min-h-10
              items-center
              justify-center
              rounded-xl
              bg-[#00685F]
              px-4
              text-xs
              font-black
              text-white
            "
          >
            شروع اولین تمرین
          </Link>
        </section>
      )}
    </main>
  );
}

function SummaryMetric({
  icon: Icon,
  label,
  value,
  tone,
}: Readonly<{
  icon:
    typeof BarChart3;

  label:
    string;

  value:
    string;

  tone:
    "teal" |
    "purple" |
    "orange";
}>) {
  const styles = {
    teal: {
      surface:
        "bg-[#E7F4F2]",

      text:
        "text-[#00685F]",

      border:
        "border-r-[#00685F]",
    },

    purple: {
      surface:
        "bg-[#F4EFFF]",

      text:
        "text-[#712AE2]",

      border:
        "border-r-[#712AE2]",
    },

    orange: {
      surface:
        "bg-[#FFF1E8]",

      text:
        "text-[#F97316]",

      border:
        "border-r-[#F97316]",
    },
  } as const;

  const style =
    styles[tone];

  return (
    <article
      className={`
        rounded-2xl
        border
        border-[#DCE5E3]
        border-r-[3px]
        bg-white
        p-5
        shadow-[0_5px_20px_rgba(15,23,42,0.035)]
        ${style.border}
      `}
    >
      <span
        className={`
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          ${style.surface}
          ${style.text}
        `}
      >
        <Icon
          aria-hidden="true"
          className="h-5 w-5"
        />
      </span>

      <p
        className="
          mt-4
          text-xs
          text-[#64748B]
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          text-2xl
          font-black
          text-[#0F172A]
        "
      >
        {value}
      </p>
    </article>
  );
}