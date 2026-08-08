import type {
  Metadata,
} from "next";

import Link from "next/link";

import {
  ArrowLeft,
  Clock3,
  History,
  RotateCcw,
  Target,
} from "lucide-react";

import {
  Card,
} from "../../../../components/ui/card";

import {
  getListeningOverview,
} from "../../../../features/listening";

import {
  LISTENING_CONTENT_TYPE_LABELS,
  LISTENING_PRACTICE_MODE_LABELS,
} from "../../../../features/listening/constants/listening.constants";

export const metadata: Metadata = {
  title: "تاریخچه Listening",

  description:
    "مرور تمرین‌ها و نتایج قبلی مهارت شنیداری",
};

const numberFormatter =
  new Intl.NumberFormat("fa-IR");

const dateFormatter =
  new Intl.DateTimeFormat(
    "fa-IR",
    {
      dateStyle: "medium",
    },
  );

export default async function ListeningHistoryPage() {
  const overview =
    await getListeningOverview();

  const activities =
    overview.recentActivities;

  return (
    <main
      className="
        mx-auto w-full
        max-w-6xl space-y-8
      "
    >
      <section
        className="
          rounded-3xl border
          border-white/[0.08]
          bg-white/[0.035]
          p-6 sm:p-8
        "
      >
        <div
          className="
            flex h-12 w-12
            items-center
            justify-center
            rounded-2xl
            bg-violet-400/10
            text-violet-300
          "
        >
          <History
            aria-hidden="true"
            className="h-6 w-6"
          />
        </div>

        <p
          className="
            mt-5 text-sm
            font-medium
            text-violet-300
          "
        >
          Listening History
        </p>

        <h1
          className="
            mt-2 text-3xl
            font-bold text-white
            sm:text-4xl
          "
        >
          تاریخچه تمرین‌ها
        </h1>

        <p
          className="
            mt-4 max-w-2xl
            text-sm leading-8
            text-slate-400
          "
        >
          نتیجه تمرین‌های قبلی را مرور
          کن و تمرین‌هایی را که نیاز به
          تکرار دارند دوباره انجام بده.
        </p>
      </section>

      {activities.length > 0 ? (
        <section
          className="
            space-y-4
          "
        >
          {activities.map(
            (activity) => (
              <Card
                key={activity.id}
                className="p-5 sm:p-6"
              >
                <div
                  className="
                    flex flex-col gap-5
                    md:flex-row
                    md:items-center
                    md:justify-between
                  "
                >
                  <div>
                    <div
                      className="
                        flex flex-wrap
                        items-center gap-2
                      "
                    >
                      <span
                        className="
                          rounded-full
                          bg-cyan-400/10
                          px-2.5 py-1
                          text-[10px]
                          text-cyan-200
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
                          bg-white/[0.05]
                          px-2.5 py-1
                          text-[10px]
                          text-slate-500
                        "
                      >
                        {
                          LISTENING_PRACTICE_MODE_LABELS[
                            activity.practiceMode
                          ]
                        }
                      </span>
                    </div>

                    <h2
                      className="
                        mt-3 text-lg
                        font-bold text-white
                      "
                    >
                      {activity.title}
                    </h2>

                    <div
                      className="
                        mt-3 flex
                        flex-wrap gap-4
                        text-xs
                        text-slate-500
                      "
                    >
                      <span
                        className="
                          inline-flex
                          items-center gap-1.5
                        "
                      >
                        <Target
                          aria-hidden="true"
                          className="h-4 w-4"
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
                          items-center gap-1.5
                        "
                      >
                        <Clock3
                          aria-hidden="true"
                          className="h-4 w-4"
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

                  <Link
                    href={`/listening/practice/${encodeURIComponent(
                      activity.contentId,
                    )}`}
                    className="
                      inline-flex min-h-11
                      shrink-0 items-center
                      justify-center gap-2
                      rounded-xl border
                      border-white/[0.08]
                      bg-white/[0.035]
                      px-4 py-2.5
                      text-sm font-medium
                      text-slate-300
                      transition
                      hover:bg-white/[0.07]
                      hover:text-white
                    "
                  >
                    <RotateCcw
                      aria-hidden="true"
                      className="h-4 w-4"
                    />

                    تمرین دوباره

                    <ArrowLeft
                      aria-hidden="true"
                      className="h-4 w-4"
                    />
                  </Link>
                </div>
              </Card>
            ),
          )}
        </section>
      ) : (
        <Card className="p-10 text-center">
          <p
            className="
              text-sm
              text-slate-500
            "
          >
            هنوز تمرین شنیداری تکمیل‌شده‌ای
            وجود ندارد.
          </p>
        </Card>
      )}
    </main>
  );
}