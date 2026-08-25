import Link from "next/link";

import {
  BookOpenText,
  CheckCircle2,
  Clock3,
  TimerReset,
  WholeWord,
} from "lucide-react";

import type {
  ReadingOverview as ReadingOverviewData,
} from "../../types/reading.types";

import {
  ReadingLearningJourneyCard,
} from "./reading-learning-journey-card";

import {
  ReadingOverviewSidePanel,
} from "./reading-overview-side-panel";

import {
  ReadingRecentActivityCard,
} from "./reading-recent-activity-card";

import {
  ReadingStatCard,
} from "./reading-stat-card";

type ReadingOverviewProps =
  Readonly<{
    overview: ReadingOverviewData;
  }>;

const numberFormatter =
  new Intl.NumberFormat("fa-IR");

export function ReadingOverview({
  overview,
}: ReadingOverviewProps) {
  const {
    stats,
    continueReading,
    weeklyGoal,
    learningJourney,
    primaryInsight,
    recentActivities,
  } = overview;

  const continueHref =
    continueReading?.currentSectionId
      ? `/reading/resources/${encodeURIComponent(
          continueReading.resourceId,
        )}/sections/${encodeURIComponent(
          continueReading.currentSectionId,
        )}`
      : continueReading
        ? `/reading/resources/${encodeURIComponent(
            continueReading.resourceId,
          )}`
        : "/reading/library";

  const detailsHref =
    continueReading
      ? `/reading/resources/${encodeURIComponent(
          continueReading.resourceId,
        )}`
      : "/reading/library";

  return (
    <main
      aria-labelledby="reading-page-title"
      style={{
        fontFamily:
          "var(--font-vazirmatn)",
      }}
      className="
        mx-auto
        w-full
        max-w-[936px]
        space-y-8
        pb-8
        text-[#191C1E]
      "
    >
      {continueReading ? (
        <section
          className="
            relative
            min-h-[279px]
            overflow-hidden
            rounded-2xl
            border
            border-[#A8C4C0]/45
            bg-[linear-gradient(135deg,#F1FAF8_0%,#DCEFEB_100%)]
            p-6
            shadow-[0_8px_30px_rgba(0,104,95,0.08)]
            sm:p-8
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -bottom-24
              right-[24%]
              h-56
              w-56
              rounded-full
              bg-[#0D9488]/10
              blur-3xl
            "
          />

          <div
            className="
              relative
              flex
              min-h-[213px]
              flex-col
              gap-8
              md:flex-row
              md:items-center
              md:gap-[62px]
            "
          >
            <div
              className="
                min-w-0
                flex-1
              "
            >
              <span
                className="
                  inline-flex
                  min-h-[24px]
                  items-center
                  rounded-md
                  bg-[#00685F]/10
                  px-2.5
                  text-xs
                  font-medium
                  leading-[14px]
                  tracking-[0.04em]
                  text-[#00685F]
                "
              >
                ادامه مطالعه
              </span>

              <h1
                id="reading-page-title"
                dir="ltr"
                style={{
                  fontFamily:
                    "var(--font-plus-jakarta-sans)",
                }}
                className="
                  mt-3
                  max-w-[646px]
                  text-right
                  text-[24px]
                  font-bold
                  leading-9
                  tracking-[-0.01em]
                  text-[#13201E]
                  sm:text-[28px]
                "
              >
                {continueReading.title}
              </h1>

              <p
                className="
                  mt-1
                  text-base
                  font-medium
                  leading-6
                  text-[#475569]
                "
              >
                بخش{" "}
                {numberFormatter.format(
                  continueReading.currentSectionOrder,
                )}{" "}
                از{" "}
                {numberFormatter.format(
                  continueReading.totalSections,
                )}
              </p>

              <div
                className="
                  mt-5
                  w-full
                  max-w-[448px]
                "
              >
                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    justify-between
                    gap-2
                    text-sm
                    font-medium
                    leading-5
                  "
                >
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      text-[#475569]
                    "
                  >
                    <Clock3
                      aria-hidden="true"
                      className="h-4 w-4"
                    />

                    حدود{" "}
                    {numberFormatter.format(
                      continueReading.remainingMinutes,
                    )}{" "}
                    دقیقه باقی مانده
                  </span>

                  {continueReading.comprehensionScore !==
                  null ? (
                    <span
                      className="
                        font-bold
                        text-[#00685F]
                      "
                    >
                      {numberFormatter.format(
                        continueReading.comprehensionScore,
                      )}
                      ٪ درک متن
                    </span>
                  ) : null}
                </div>

                <div
                  role="progressbar"
                  aria-label="پیشرفت مطالعه"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={
                    continueReading.progressPercent
                  }
                  className="
                    mt-3
                    h-2
                    overflow-hidden
                    rounded-full
                    bg-white
                    shadow-[inset_0_1px_2px_rgba(15,23,42,0.08)]
                  "
                >
                  <div
                    className="
                      h-full
                      rounded-full
                      bg-[#0D9488]
                      transition-[width]
                      duration-500
                    "
                    style={{
                      width: `${continueReading.progressPercent}%`,
                    }}
                  />
                </div>
              </div>

              <div
                className="
                  mt-6
                  flex
                  flex-wrap
                  items-center
                  gap-3
                "
              >
                <Link
                  href={continueHref}
                  className="
                    inline-flex
                    h-11
                    min-w-[153px]
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    bg-[#00685F]
                    px-6
                    text-sm
                    font-bold
                    leading-4
                    tracking-[0.01em]
                    text-white
                    shadow-[0_2px_6px_rgba(0,104,95,0.2)]
                    transition
                    hover:bg-[#005A52]
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#00685F]/30
                    focus-visible:ring-offset-2
                  "
                >
                  <BookOpenText
                    aria-hidden="true"
                    className="h-4 w-4"
                  />

                  ادامه مطالعه
                </Link>

                <Link
                  href={detailsHref}
                  className="
                    inline-flex
                    h-11
                    min-w-[143px]
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-[#64748B]
                    bg-white/55
                    px-6
                    text-sm
                    font-bold
                    leading-4
                    tracking-[0.01em]
                    text-[#1E293B]
                    transition
                    hover:border-[#00685F]
                    hover:bg-white
                    hover:text-[#00685F]
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#00685F]/20
                  "
                >
                  مشاهده جزئیات
                </Link>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="
                mx-auto
                hidden
                h-[169px]
                w-[134px]
                shrink-0
                -rotate-[9.9deg]
                rounded-xl
                border
                border-[#AFC7C3]
                bg-white
                shadow-[0_12px_30px_rgba(15,23,42,0.12)]
                md:block
              "
            >
              <div
                className="
                  mx-auto
                  mt-7
                  h-2
                  w-16
                  rounded-full
                  bg-[#9ABBB6]
                "
              />

              <div
                className="
                  mx-auto
                  mt-4
                  h-1.5
                  w-[84px]
                  rounded-full
                  bg-[#CBDAD8]
                "
              />

              <div
                className="
                  mx-auto
                  mt-2
                  h-1.5
                  w-[72px]
                  rounded-full
                  bg-[#CBDAD8]
                "
              />

              <div
                className="
                  mx-auto
                  mt-2
                  h-1.5
                  w-20
                  rounded-full
                  bg-[#CBDAD8]
                "
              />
            </div>
          </div>
        </section>
      ) : null}

      <section
        aria-label="آمار مطالعه"
        className="
          grid
          gap-4
          sm:grid-cols-2
          lg:grid-cols-4
          lg:gap-6
        "
      >
        <ReadingStatCard
          title="جلسه‌های مطالعه"
          value={numberFormatter.format(
            stats.totalSessions,
          )}
          description="تعداد جلسه‌های مطالعه ثبت‌شده"
          icon={BookOpenText}
          tone="teal"
        />

        <ReadingStatCard
          title="مطالعه این هفته"
          value={`${numberFormatter.format(
            stats.weeklyMinutes,
          )} دقیقه`}
          description="زمان مطالعه در هفته جاری"
          icon={TimerReset}
          tone="violet"
        />

        <ReadingStatCard
          title="واژگان تثبیت‌شده"
          value={numberFormatter.format(
            stats.masteredWords,
          )}
          description="تعداد واژگان یادگرفته‌شده"
          icon={WholeWord}
          tone="slate"
        />

        <ReadingStatCard
          title="بخش‌های تکمیل‌شده"
          value={numberFormatter.format(
            stats.completedSections,
          )}
          description="تعداد بخش‌هایی که مطالعه آن‌ها کامل شده است"
          icon={CheckCircle2}
          tone="emerald"
        />
      </section>

      <section
        className="
          grid
          items-start
          gap-8
          lg:grid-cols-[minmax(0,2.11fr)_minmax(250px,1fr)]
        "
      >
        <div
          className="
            min-w-0
            space-y-8
          "
        >
          <ReadingLearningJourneyCard
            journey={learningJourney}
          />

          <ReadingRecentActivityCard
            activities={
              recentActivities
            }
          />
        </div>

        <ReadingOverviewSidePanel
          weeklyGoal={weeklyGoal}
          insight={primaryInsight}
        />
      </section>
    </main>
  );
}