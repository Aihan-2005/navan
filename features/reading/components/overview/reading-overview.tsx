import Link from "next/link";
import {
  ArrowLeft,
  BookOpenText,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  FileUp,
  Flame,
  ImagePlus,
  LibraryBig,
  Sparkles,
  TimerReset,
  Trophy,
  Upload,
  WholeWord,
} from "lucide-react";

import {
  Card,
} from "../../../../components/ui/card";

import {
  Progress,
} from "../../../../components/ui/progress";

import {
  READING_SUPPORTED_UPLOAD_LABELS,
} from "../../constants/reading.constants";

import type {
  ReadingOverview as ReadingOverviewData,
} from "../../types/reading.types";

import {
  ReadingLearningJourneyCard,
} from "./reading-learning-journey-card";

import {
  ReadingResourceCard,
} from "./reading-resource-card";

import {
  ReadingStatCard,
} from "./reading-stat-card";

type ReadingOverviewProps = Readonly<{
  overview: ReadingOverviewData;
}>;

const numberFormatter =
  new Intl.NumberFormat("fa-IR");

const dateFormatter =
  new Intl.DateTimeFormat("fa-IR", {
    month: "short",
    day: "numeric",
  });

export function ReadingOverview({
  overview,
}: ReadingOverviewProps) {
  const {
    stats,
    continueReading,
    featuredResources,
    recommendedResources,
    learningJourney,
    primaryInsight,
    recentActivities,
  } = overview;

  return (
    <main
      className="mx-auto w-full max-w-7xl space-y-6"
      aria-labelledby="reading-page-title"
    >
      <section
        className="
          relative overflow-hidden rounded-3xl
          border border-cyan-400/15
          bg-[linear-gradient(135deg,rgba(8,47,73,0.75),rgba(15,23,42,0.9))]
          px-6 py-8 shadow-2xl
          sm:px-8 sm:py-10
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute -left-28 -top-28
            h-80 w-80 rounded-full
            bg-cyan-500/20 blur-3xl
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute -bottom-32 right-10
            h-72 w-72 rounded-full
            bg-violet-500/15 blur-3xl
          "
        />

        <div
          className="
            relative flex flex-col gap-8
            lg:flex-row lg:items-center
            lg:justify-between
          "
        >
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm text-cyan-300">
              <Sparkles
                aria-hidden="true"
                className="h-4 w-4"
              />

              مربی هوشمند مهارت خواندن
            </div>

            <h1
              id="reading-page-title"
              className="
                mt-4 text-3xl font-bold
                leading-tight text-white sm:text-4xl
              "
            >
              متن را مرحله‌به‌مرحله
              <span className="text-cyan-300">
                {" "}
                عمیق یاد بگیر
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-300 sm:text-base">
              کتاب، مقاله یا تصویر خودت را وارد کن؛ هوش
              مصنوعی متن را به بخش‌های کوتاه تبدیل می‌کند،
              صوت هر بخش را پخش می‌کند و جمله‌های مهم،
              گرامر و واژگان کلیدی را توضیح می‌دهد.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="#featured-reading"
                className="
                  inline-flex min-h-11 items-center
                  justify-center gap-2 rounded-xl
                  bg-cyan-400 px-5 py-2.5
                  text-sm font-bold text-slate-950
                  transition hover:bg-cyan-300
                "
              >
                مشاهده منابع

                <ArrowLeft
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              </Link>

              <span
                className="
                  inline-flex min-h-11 items-center
                  justify-center gap-2 rounded-xl
                  border border-white/10
                  bg-white/[0.04] px-5 py-2.5
                  text-sm font-medium text-slate-400
                "
              >
                <Upload
                  aria-hidden="true"
                  className="h-4 w-4"
                />

                آپلود منبع در مرحله بعد
              </span>
            </div>
          </div>

          <div
            className="
              flex h-36 w-36 shrink-0 self-center
              items-center justify-center rounded-full
              border border-cyan-300/20
              bg-cyan-400/10
              shadow-[0_0_70px_rgba(34,211,238,0.18)]
            "
          >
            <div
              className="
                flex h-24 w-24 items-center justify-center
                rounded-full bg-cyan-300 text-slate-950
              "
            >
              <BookOpenText
                aria-hidden="true"
                className="h-11 w-11"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        aria-label="آمار تمرین خواندن"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <ReadingStatCard
          title="جلسه‌های مطالعه"
          value={numberFormatter.format(
            stats.totalSessions,
          )}
          description="تعداد کل جلسه‌های خواندن"
          icon={LibraryBig}
          tone="cyan"
        />

        <ReadingStatCard
          title="مطالعه این هفته"
          value={`${numberFormatter.format(
            stats.weeklyMinutes,
          )} دقیقه`}
          description="زمان مطالعه و مرور تحلیل‌ها"
          icon={TimerReset}
          tone="violet"
        />

        <ReadingStatCard
          title="واژگان تثبیت‌شده"
          value={numberFormatter.format(
            stats.masteredWords,
          )}
          description="لغت‌هایی که در متن یاد گرفته‌ای"
          icon={WholeWord}
          tone="emerald"
        />

        <ReadingStatCard
          title="تداوم مطالعه"
          value={`${numberFormatter.format(
            stats.currentStreakDays,
          )} روز`}
          description={`${numberFormatter.format(
            stats.completedSections,
          )} بخش کامل شده`}
          icon={Flame}
          tone="amber"
        />
      </section>

      {continueReading ? (
        <Card className="relative overflow-hidden p-5 sm:p-6">
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute -left-20 -top-20
              h-56 w-56 rounded-full
              bg-cyan-500/10 blur-3xl
            "
          />

          <div
            className="
              relative flex flex-col gap-5
              lg:flex-row lg:items-center
              lg:justify-between
            "
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-cyan-300">
                ادامه مطالعه
              </p>

              <h2
                className="mt-2 truncate text-xl font-bold text-white"
                dir="ltr"
              >
                {continueReading.title}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {continueReading.currentSectionTitle}
              </p>

              <div className="mt-5 max-w-2xl">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-600">
                    {numberFormatter.format(
                      continueReading.completedSections,
                    )}{" "}
                    از{" "}
                    {numberFormatter.format(
                      continueReading.totalSections,
                    )}{" "}
                    بخش
                  </span>

                  <span className="text-xs font-semibold text-white">
                    {numberFormatter.format(
                      continueReading.progressPercent,
                    )}
                    ٪
                  </span>
                </div>

                <Progress
                  value={continueReading.progressPercent}
                  label="پیشرفت منبع در حال مطالعه"
                />
              </div>
            </div>

            <span
              className="
                inline-flex min-h-11 shrink-0 items-center
                justify-center rounded-xl
                border border-white/[0.08]
                bg-white/[0.04] px-5 py-2.5
                text-sm font-medium text-slate-500
              "
            >
              ادامه مطالعه در مرحله بعد
            </span>
          </div>
        </Card>
      ) : null}

      <ReadingLearningJourneyCard
        journey={learningJourney}
      />

      <section
        id="featured-reading"
        aria-labelledby="featured-reading-title"
      >
        <div>
          <p className="text-sm font-medium text-cyan-300">
            کتابخانه پیشنهادی
          </p>

          <h2
            id="featured-reading-title"
            className="mt-2 text-2xl font-bold text-white"
          >
            برای شروع یکی را انتخاب کن
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">
            منابع بر اساس سطح، زمان مطالعه و مهارت‌هایی که
            نیاز به تقویت دارند پیشنهاد می‌شوند.
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredResources.map(
            (resource) => (
              <ReadingResourceCard
                key={resource.id}
                resource={resource}
              />
            ),
          )}
        </div>
      </section>

      <section
        aria-label="منابع شخصی و تحلیل هوشمند"
        className="grid gap-6 lg:grid-cols-12"
      >
        <Card className="relative overflow-hidden p-6 lg:col-span-7">
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute -left-20 -top-20
              h-52 w-52 rounded-full
              bg-violet-500/10 blur-3xl
            "
          />

          <div className="relative">
            <div className="flex items-center gap-2 text-violet-300">
              <BrainCircuit
                aria-hidden="true"
                className="h-5 w-5"
              />

              <span className="text-sm font-medium">
                پیشنهاد مربی هوشمند
              </span>
            </div>

            {primaryInsight ? (
              <>
                <h2 className="mt-4 text-xl font-bold leading-8 text-white">
                  {primaryInsight.title}
                </h2>

                <p className="mt-3 text-sm leading-8 text-slate-400">
                  {primaryInsight.description}
                </p>
              </>
            ) : (
              <p className="mt-4 text-sm leading-7 text-slate-500">
                پس از چند جلسه، پیشنهادهای شخصی Reading در
                این بخش نمایش داده می‌شوند.
              </p>
            )}
          </div>
        </Card>

        <Card className="p-6 lg:col-span-5">
          <h2 className="text-lg font-bold text-white">
            منبع خودت را وارد کن
          </h2>

          <p className="mt-2 text-sm leading-7 text-slate-500">
            در مرحله دوم، فایل یا تصاویر تو استخراج و به
            یک مسیر مطالعه بخش‌بندی‌شده تبدیل خواهند شد.
          </p>

          <div className="mt-5 grid gap-3">
            <SourceCapability
              icon={FileUp}
              title="کتاب و فایل متنی"
              description="PDF، DOCX و TXT"
            />

            <SourceCapability
              icon={ImagePlus}
              title="تصویر صفحه یا جزوه"
              description="JPG، PNG و WEBP"
            />

            <SourceCapability
              icon={BrainCircuit}
              title="بخش‌بندی با AI"
              description="متن، صوت، گرامر و واژگان هر فاز"
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {READING_SUPPORTED_UPLOAD_LABELS.map(
              (label) => (
                <span
                  key={label}
                  className="
                    rounded-lg bg-white/[0.04]
                    px-2.5 py-1 text-[10px]
                    font-medium text-slate-600
                  "
                >
                  {label}
                </span>
              ),
            )}
          </div>
        </Card>
      </section>

      {recommendedResources.length > 0 ? (
        <section aria-labelledby="recommended-reading-title">
          <div>
            <p className="text-sm font-medium text-violet-300">
              پیشنهادهای بیشتر
            </p>

            <h2
              id="recommended-reading-title"
              className="mt-2 text-2xl font-bold text-white"
            >
              منابع مناسب مرحله بعد
            </h2>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {recommendedResources.map(
              (resource) => (
                <ReadingResourceCard
                  key={resource.id}
                  resource={resource}
                />
              ),
            )}
          </div>
        </section>
      ) : null}

      <section
        aria-label="فعالیت‌های اخیر Reading"
        className="grid gap-6 lg:grid-cols-12"
      >
        <Card className="p-6 lg:col-span-8">
          <div className="flex items-center gap-2 text-cyan-300">
            <Clock3
              aria-hidden="true"
              className="h-5 w-5"
            />

            <span className="text-sm font-medium">
              فعالیت‌های اخیر
            </span>
          </div>

          <h2 className="mt-2 text-xl font-bold text-white">
            آخرین بخش‌های مطالعه‌شده
          </h2>

          {recentActivities.length > 0 ? (
            <div className="mt-5 divide-y divide-white/[0.06]">
              {recentActivities.map(
                (activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center gap-3 py-4"
                  >
                    <div
                      className="
                        flex h-10 w-10 shrink-0
                        items-center justify-center
                        rounded-xl bg-emerald-400/10
                        text-emerald-300
                      "
                    >
                      <CheckCircle2
                        aria-hidden="true"
                        className="h-5 w-5"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3
                        className="truncate text-sm font-semibold text-slate-200"
                        dir="ltr"
                      >
                        {activity.title}
                      </h3>

                      <div className="mt-1.5 flex flex-wrap gap-3 text-xs text-slate-600">
                        <span>
                          {activity.sectionTitle}
                        </span>

                        <span>
                          {numberFormatter.format(
                            activity.durationMinutes,
                          )}{" "}
                          دقیقه
                        </span>

                        <span>
                          {numberFormatter.format(
                            activity.learnedWords,
                          )}{" "}
                          لغت
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

                    <div className="text-center">
                      <p className="text-sm font-bold text-white">
                        {numberFormatter.format(
                          activity.comprehensionScore,
                        )}
                        ٪
                      </p>

                      <p className="text-[10px] text-slate-600">
                        درک متن
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          ) : (
            <p className="mt-5 text-sm text-slate-500">
              هنوز فعالیت Reading ثبت نشده است.
            </p>
          )}
        </Card>

        <Card className="p-6 lg:col-span-4">
          <div className="flex items-center gap-2 text-amber-300">
            <Trophy
              aria-hidden="true"
              className="h-5 w-5"
            />

            <span className="text-sm font-medium">
              هدف این هفته
            </span>
          </div>

          <h2 className="mt-4 text-xl font-bold text-white">
            تکمیل ۴ بخش جدید
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            دو بخش دیگر از داستان فعلی را کامل کن و حداقل
            ۲۰ واژه جدید را در Context مرور کن.
          </p>

          <div
            className="
              mt-6 rounded-2xl
              border border-amber-400/10
              bg-amber-400/[0.05] p-4
            "
          >
            <p className="text-xs leading-6 text-amber-100/70">
              برای تسلط بهتر، ابتدا بدون ترجمه بخوان، سپس
              تحلیل AI را باز کن و در پایان صوت را همراه
              متن پخش کن.
            </p>
          </div>
        </Card>
      </section>
    </main>
  );
}

type SourceCapabilityProps = Readonly<{
  icon: typeof FileUp;
  title: string;
  description: string;
}>;

function SourceCapability({
  icon: Icon,
  title,
  description,
}: SourceCapabilityProps) {
  return (
    <div
      className="
        flex items-center gap-3 rounded-xl
        border border-white/[0.06]
        bg-white/[0.025] p-3
      "
    >
      <div
        className="
          flex h-10 w-10 shrink-0
          items-center justify-center rounded-xl
          bg-cyan-400/10 text-cyan-300
        "
      >
        <Icon
          aria-hidden="true"
          className="h-5 w-5"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-300">
          {title}
        </p>

        <p className="mt-1 text-[11px] text-slate-600">
          {description}
        </p>
      </div>
    </div>
  );
}