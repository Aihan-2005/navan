import Link from "next/link";

import {
  BookOpenText,
  FileText,
} from "lucide-react";

import type {
  RecentReadingActivity,
} from "../../types/reading.types";

type ReadingRecentActivityCardProps =
  Readonly<{
    activities:
      readonly RecentReadingActivity[];
  }>;

const numberFormatter =
  new Intl.NumberFormat(
    "fa-IR",
  );

const dateFormatter =
  new Intl.DateTimeFormat(
    "fa-IR",
    {
      month:
        "short",

      day:
      "numeric",
    },
  );

function formatActivityDate(
  value:
    string,
): string {
  const date =
    new Date(
      value,
    );

  const now =
    new Date();

  const difference =
    now.getTime() -
    date.getTime();

  const days =
    Math.max(
      0,
      Math.floor(
        difference/
          86_400_000,
      ),
    );

  if (days === 0) {
    return "امروز";
  }

  if (days === 1) {
    return "دیروز";
  }

  if (days < 7) {
    return `${numberFormatter.format(
      days,
    )} روز پیش`;
  }

  if (days < 14) {
    return "هفته پیش";
  }

  return dateFormatter.format(
    date,
  );
}

export function ReadingRecentActivityCard({
  activities,
}: ReadingRecentActivityCardProps) {
  return (
    <section
      id="recent-reading"
      className="
        rounded-2xl
        border
        border-[#E2E8F0]
        bg-white
        p-6
        shadow-[0_2px_6px_rgba(15,23,42,0.035)]
      "
      aria-labelledby="recent-reading-title"
    >
      <header
        className="
          flex
          items-center
          justify-between
          gap-4
        "
      >
        <h2
          id="recent-reading-title"
          className="
            text-lg
            font-bold
    leading-7
            text-[#1E293B]
          "
        >
          فعالیت‌های اخیر
        </h2>

        <span
          className="
            text-xs
            font-bold
            tracking-[0.05em]
            text-[#0D9488]
          "
        >
          مشاهده همه
        </span>
      </header>

      {activities.length >
      0 ? (
        <div
          className="
            mt-5
            space-y-4
          "
        >
          {activities
            .slice(
              0,
           2,
            )
            .map(
              (
                activity,
                index,
              ) => {
                const Icon =
                  index === 0
                    ? BookOpenText
                    : FileText;

                return (
                  <Link
                    key={
                      activity.id
                    }
                    href={`/reading/resources/${activity.resourceId}`}
                    className="
                      group
                      flex
                      min-h-[88px]
                      items-center
                      gap-4
                      rounded-xl
                      transition
                      hover:bg-[#F8FAFC]
                    "
                  >
                    <span
                      className="
                        flex
                        h-16
                        w-14
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-[#E2E8F0]/80
                        bg-[#F1F5F9]
                        text-[#64748B]
                        shadow-[0_1px_2px_rgba(0,0,0,0.05)]
                        transition
                        group-hover:text-[#0D9488]
                      "
                    >
                      <Icon
                        aria-hidden="true"
                        className="h-5 w-5"
                      />
                    </span>

                    <div
                      className="
                        min-w-0
                        flex-1
                      "
                     >
                      <h3
                        dir="ltr"
                        style={{
                          fontFamily:
                            "var(--font-plus-jakarta-sans)",
                        }}
                        className="
                          truncate
                          text-right
                          text-sm
                          font-bold
                          text-[#1E293B]
                        "
                      >
                        {
                          activity.title
                        }
                      </h3>

                      <div
                        className="
                          mt-2
                          flex
                          flex-wrap
                          items-center
                          gap-x-3
                          gap-y-1
                          text-xs
                          text-[#64748B]
              "
                      >
                        <span
                          className={
                            activity.comprehensionScore >=
                            90
                              ? "text-[#0D9488]"
                              : ""
                          }
                        >
                          {numberFormatter.format(
                            activity.comprehensionScore,
                          )}
                          ٪ دقت
                        </span>

                        <span
                          aria-hidden="true"
                          className="
                            h-1
                            w-1
                            rounded-full
                            bg-[#CBD5E1]
                          "
                        />

                        <span>
                          {formatActivityDate(
                           activity.completedAt,
                          )}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              },
            )}
        </div>
      ) : (
        <p
          className="
            mt-5
            text-sm
            text-[#64748B]
          "
        >
          هنوز فعالیتی ثبت نشده است.
        </p>
      )}
    </section>
  );
}