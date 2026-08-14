import Link from "next/link";

import {
  BookOpenText,
  Clock3,
  Flame,
  Headphones,
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
    overview:
      ReadingOverviewData;
  }>;

const numberFormatter =
  new Intl.NumberFormat(
    "fa-IR",
  );

export function ReadingOverview({
  overview,
}: ReadingOverviewProps) {
  const {
    stats,
    continueReading,
    learningJourney,
    primaryInsight,
    recentActivities,
    weeklyGoal,
  } = overview;

  const continueHref =
    continueReading?.currentSectionId
      ? `/reading/resources/${continueReading.resourceId}/sections/${continueReading.currentSectionId}`
      : continueReading
        ? `/reading/resources/${continueReading.resourceId}`
        : "/reading";

  const detailsHref =
    continueReading
      ? `/reading/resources/${continueReading.resourceId}`
      : "/reading";

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
        pb-4
        text-[#191C1E]
      "
    >
      {continueReading ? (
        <section
          className="
            relative
            min-h-[279px]
            overflow-hidden
            rounded-xl
            border
            border-[#BCC9C6]/30
            bg-[linear-gradient(135deg,rgba(0,104,95,0.10)_0%,rgba(0,131,120,0.20)_100%)]
            p-6
            shadow-[0_4px_20px_rgba(13,148,136,0.04)]
            sm:p-8
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -bottom-16
              right-1/3
              h-40
              w-40
              rounded-full
              bg-white/20
              blur-3xl
            "
          />

          <div
            className="
              relative
              flex
 min-h-[213px]
              flex-col
              justify-between
              gap-8
              md:flex-row
              md:items-center
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
                  h-[22px]
                  items-center
                  rounded
                  bg-[#00685F]/10
                  px-2
                  text-xs
                  font-normal
                  tracking-[0.05em]
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
                  text-right
                  text-[24px]
                  font-bold
                  leading-9
                  tracking-[-0.01em]
                  text-[#191C1E]
                  sm:text-[28px]
                "
              >
                {
                  continueReading.title
                }
              </h1>

              <p
                className="
                  mt-1
                  text-base
                  leading-6
                  text-[#3D4947]
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
                  max-w-md
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
                    font-bold
                  "
                >
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      text-[#3D4947]
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
                    bg-white/70
                  "
                >
                  <div
                    className="
                      h-full
                      rounded-full
                   bg-[#00685F]
                      transition-[width]
                      duration-500
                    "
                    style={{
                      width:
                        `${continueReading.progressPercent}%`,
                    }}
                  />
                </div>
              </div>

              <div
                className="
                  mt-6
                  flex
                  flex-wrap
                  gap-3
                "
              >
                <Link
                  href={

                   continueHref
                  }
                  className="
                    inline-flex
                    h-11
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    bg-[#00685F]
                    px-6
                    text-sm
                    font-bold
                    text-white
                    shadow-[0_1px_2px_rgba(0,0,0,0.05)]
                    transition
                    hover:bg-[#005B53]
                  "
                >
                  <BookOpenText
                    aria-hidden="true"
                    className="h-4 w-4"
                  />

                  ادامه مطالعه
                 </Link>

                <Link
                  href={
                    detailsHref
                  }
                  className="
                    inline-flex
                    h-11
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-[#6D7A77]
                    px-6
                    text-sm
                    font-bold
                    text-[#191C1E]
                    transition
                    hover:border-[#00685F]
                    hover:text-[#00685F]
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
                rounded-lg
                border
                border-[#BCC9C6]/20
                bg-[#F7F9FB]
                shadow-[0_4px_6px_-1px_rgba(0,0,0,0.10),0_2px_4px_-2px_rgba(0,0,0,0.10)]
                md:block
              "
            >
              <div
                className="
                  mx-auto
                  mt-6
                  h-2
                  w-16
                  rounded-full
                  bg-[#E2E8F0]
                "
              />

              <div
                className="
                  mx-auto
                  mt-4
               h-1.5
                  w-20
                  rounded-full
                  bg-[#E8EEF2]
                "
              />

              <div
                className="
                  mx-auto
                  mt-2
                  h-1.5
                  w-16
                  rounded-full
                  bg-[#E8EEF2]
                "
              />
            </div>
          </div>
        </section>
      ) : null}

      <section
        aria-label="آمار Reading"
        className="
          grid
          gap-4
          sm:grid-cols-2
          lg:grid-cols-4
          lg:gap-6 "
      >
        <ReadingStatCard
          title="جلسه‌های شنیداری"
          value={
            numberFormatter.format(
              stats.totalSessions,
            )
          }
          description="تعداد جلسه‌های ثبت‌شده"
          icon={
            Headphones
          }
          tone="teal"
        />

        <ReadingStatCard
          title="مطالعه این هفته"
          value={`${numberFormatter.format(
            stats.weeklyMinutes,
          )} دقیقه`}
          description="زمان مطالعه این هفته"
          icon={
            TimerReset
          }
          tone="violet" />

        <ReadingStatCard
          title="واژگان تثبیت شده"
          value={
            numberFormatter.format(
              stats.masteredWords,
            )
          }
          description="واژگان یادگرفته‌شده"
          icon={
            WholeWord
          }
          tone="slate"
        />

        <ReadingStatCard
          title="تداوم تمرین"
          value={`${numberFormatter.format(
            stats.currentStreakDays,
          )} روز`}
          description="تعداد روزهای تداوم"
          icon={
            Flame
          }
          tone="orange"
        />
      </section>

      <section
        className="
          griditems-start
          gap-8
          lg:grid-cols-[minmax(0,2.1fr)_minmax(260px,1fr)]
        "
      >
        <div
          className="
            min-w-0
            space-y-8
          "
        >
          <ReadingLearningJourneyCard
            journey={
              learningJourney
            }
          />

          <ReadingRecentActivityCard
            activities={
              recentActivities
            }
          />
        </div>

        <ReadingOverviewSidePanel
          weeklyGoal={
            weeklyGoal
          }
          insight={
            primaryInsight
          } />
      </section>
    </main>
  );
}