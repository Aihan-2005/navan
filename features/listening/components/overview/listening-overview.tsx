import Link from "next/link";
import {
  ArrowLeft,
  BrainCircuit,
  BrainCog,
  CheckCircle2,
  FileText,
  Flame,
  Headphones,
  History,
  Link2,
  Target,
  TimerReset,
  Trophy,
  Upload,
} from "lucide-react";

import { Card } from "../../../../components/ui/card";

import {
  LISTENING_CONTENT_TYPE_LABELS,
  LISTENING_PRACTICE_MODE_LABELS,
} from "../../constants/listening.constants";

import type { ListeningOverview as ListeningOverviewData } from "../../types/listening.types";

import { ListeningContentCard } from "./listening-content-card";
import { ListeningStatCard } from "./listening-stat-card";

type ListeningOverviewProps = Readonly<{
  overview: ListeningOverviewData;
}>;

const numberFormatter = new Intl.NumberFormat("fa-IR");

const dateFormatter = new Intl.DateTimeFormat("fa-IR", {
  month: "short",
  day: "numeric",
});

export function ListeningOverview({ overview }: ListeningOverviewProps) {
  const {
    stats,
    featuredContents,
    recommendedContents,
    primaryInsight,
    recentActivities,
  } = overview;

  return (
    <main
      className="@container mx-auto w-full max-w-7xl space-y-[54px] bg-[#F7F9FB]"
      aria-labelledby="listening-page-title"
      dir="rtl"
    >
      <section
        className="
          relative mx-auto min-h-[286px] w-full max-w-7xl overflow-hidden
          lg:-mr-[17px] lg:w-[calc(100%+17px)] lg:max-w-none
          rounded-2xl border border-[#99F6E4]
          bg-[linear-gradient(90deg,#F0FDFA_0%,#CCFBF1_100%)]
          p-8 shadow-[0px_1px_2px_0px_#0000000D]
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute -left-28 -top-28
            h-80 w-80 rounded-full
            bg-[#99F6E4] blur-3xl
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute -bottom-32 right-10
            h-72 w-72 rounded-full
            bg-[#14B8A6]/20 blur-3xl
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
            <div className="inline-flex h-7 items-center gap-2 rounded-full bg-[#99F6E4]/50 px-3 py-1 font-[Vazirmatn] text-sm text-[#115E59]">
              <BrainCog aria-hidden="true" className="h-4 w-4 stroke-[2.5]" />
              مربی هوشمند مهارت شنیداری
            </div>

            <h1
              id="listening-page-title"
              className="
                mt-4 font-[Vazirmatn] text-[30px] font-bold
                leading-9 text-[#042F2E]
              "
            >
              گوش بده، بنویس و
              <span className="text-[#0D9488]"> دقیق‌تر بشنو</span>
            </h1>

            <p className="mt-4 max-w-2xl font-[Vazirmatn] text-base font-normal leading-[26px] text-[#115E59CC]">
              پادکست‌ها و مکالمه‌های واقعی را گوش بده، چیزی را که می‌شنوی بنویس
              و بازخورد دقیق درباره کلمات حذف‌شده، اشتباهات و بخش‌های دشوار
              دریافت کن.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3 sm:justify-start">
              <Link
                href="#featured-listening"
                className="
                  inline-flex min-h-11 items-center
                  justify-center gap-2 rounded-xl
                  h-11 rounded-lg bg-[#F97316] px-6 py-2.5
                  font-[Vazirmatn] text-base font-medium leading-6 text-white
                  transition hover:bg-[#EA580C]
                "
              >
                مشاهده تمرین‌ها
                <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              </Link>

              <Link
                href="/listening/custom"
                className="
    inline-flex h-[46px] items-center
    justify-center gap-2 rounded-xl
    border border-[#99F6E4]
    bg-white/50 px-6 py-2.5
    font-[Vazirmatn] text-base font-medium leading-6 text-[#134E4A]
    transition hover:bg-white
    hover:text-[#0D9488]
  "
              >
                <Upload aria-hidden="true" className="h-4 w-4" />
                تمرین با فایل شخصی
              </Link>
            </div>
          </div>

          <div
            className="
              hidden h-[149px] w-[147px] shrink-0 self-center
              lg:flex
              items-center justify-center rounded-full
              bg-[linear-gradient(to_bottom,#14B8A6_100%,#54B5A6_100%)]
              shadow-[0px_8px_10px_0px_#0000001A,0px_20px_25px_0px_#0000001A]
            "
          >
            <div
              className="
                flex h-[124px] w-[124px] items-center justify-center
                rounded-full bg-[linear-gradient(to_bottom,#14B8A6_0%,#419c96_100%)]
              "
            >
              <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full border-[12px] border-white bg-[#99F6E4] text-[#0D9488]">
                <Headphones
                  aria-hidden="true"
                  className="h-11 w-11 stroke-[2.5]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-label="آمار تمرین شنیداری"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        <ListeningStatCard
          title="جلسه‌های شنیداری"
          value={numberFormatter.format(stats.totalSessions)}
          icon={Headphones}
          tone="orange"
        />

        <ListeningStatCard
          title="تمرین این هفته"
          value={`${numberFormatter.format(stats.weeklyMinutes)} دقیقه`}
          icon={TimerReset}
          tone="teal"
        />

        <ListeningStatCard
          title="میانگین دقت"
          value={`${numberFormatter.format(stats.averageAccuracyScore)}٪`}
          icon={Target}
          tone="violet"
        />

        <ListeningStatCard
          title="تداوم تمرین"
          value={`${numberFormatter.format(stats.currentStreakDays)} روز`}
          icon={Flame}
          tone="slate"
        />
      </section>

      <section
        id="featured-listening"
        aria-labelledby="featured-listening-title"
      >
        <div>
          {/* <p className="text-sm font-medium text-cyan-300">
            انتخاب‌های پیشنهادی
          </p> */}

          <h2
            id="featured-listening-title"
            className="mt-2 font-[Vazirmatn] text-[20px] font-bold leading-7 text-[#0F172A]"
          >
            تمرین مناسب امروز
          </h2>

          <p className="mt-2 max-w-2xl font-[Vazirmatn] text-[14px] font-normal leading-5 text-[#64748B]">
            از محتوای کوتاه و سطح‌بندی‌شده شروع کن و Transcript خودت را با متن
            مرجع مقایسه کن.
          </p>
        </div>

        <div className="mt-6 grid w-full items-stretch grid-cols-1 gap-6 @sm:grid-cols-2 @md:grid-cols-3">
          {[...featuredContents].reverse().map((content) => (
            <ListeningContentCard key={content.id} content={content} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 @md:gap-8 @md:grid-cols-12" dir="ltr">
        <aside
          className="space-y-6 @md:space-y-8 @md:col-span-4 @md:col-start-1"
          dir="rtl"
        >
          <Card className="border-[#E5E7EB] bg-[#FFF7ED] p-6 shadow-none">
            <div className="flex items-center gap-2 text-[#F97316]">
              <Trophy aria-hidden="true" className="h-5 w-5" />
              <span className="font-[Vazirmatn] text-sm font-bold text-[#1E293B]">
                هدف بعدی
              </span>
            </div>
            <h2 className="mt-5 font-[Vazirmatn] text-xl font-bold text-[#0F172A]">
              رسیدن به دقت ۸۰٪
            </h2>
            <p className="mt-3 font-[Vazirmatn] text-sm leading-7 text-[#64748B]">
              با انجام دو تمرین رونویسی دیگر در سطح B1، میانگین دقت این هفته را
              به بالای ۸۰٪ برسان.
            </p>
            <div className="mt-6 rounded-xl border border-[#FEF08A] bg-[#FEFCE8] p-4">
              <p className="font-[Vazirmatn] text-xs leading-6 text-[#854D0E]">
                پیشنهاد: ابتدا صوت را با سرعت عادی گوش بده، سپس فقط برای بخش‌های
                دشوار از سرعت ۰٫۷۵ استفاده کن.
              </p>
            </div>
          </Card>

          <Card className="border-[#E5E7EB] bg-[#F0FDFA] p-6 shadow-none">
            <div className="flex items-center gap-2 text-[#0D9488]">
              <History aria-hidden="true" className="h-5 w-5" />
              <h2 className="font-[Vazirmatn] text-base font-bold text-[#0F172A]">
                آخرین تمرین‌های شنیداری
              </h2>
            </div>
            {recentActivities.length > 0 ? (
              <div className="mt-4 divide-y divide-[#E2E8F0]">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-[Vazirmatn] text-sm font-bold text-[#0F172A]">
                        {activity.title}
                      </h3>
                      <p className="mt-1 font-[Vazirmatn] text-[11px] leading-5 text-[#64748B]">
                        {LISTENING_CONTENT_TYPE_LABELS[activity.contentType]} •{" "}
                        {LISTENING_PRACTICE_MODE_LABELS[activity.practiceMode]}{" "}
                        • {dateFormatter.format(new Date(activity.completedAt))}
                      </p>
                    </div>
                    <div className="shrink-0 text-center">
                      <p className="font-[Vazirmatn] text-lg font-bold text-[#0D9488]">
                        {numberFormatter.format(activity.accuracyScore)}٪
                      </p>
                      <p className="font-[Vazirmatn] text-[10px] text-[#64748B]">
                        دقت
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 font-[Vazirmatn] text-sm text-[#64748B]">
                هنوز تمرین شنیداری انجام نداده‌ای.
              </p>
            )}
          </Card>
        </aside>

        <div
          className="space-y-6 @md:space-y-8 @md:col-span-8 @md:col-start-5"
          dir="rtl"
        >
          {recommendedContents.length > 0 ? (
            <section aria-labelledby="recommended-listening-title">
              <div className="flex items-end justify-between gap-4">
                <h2
                  id="recommended-listening-title"
                  className="font-[Vazirmatn] text-2xl font-bold text-[#0F172A]"
                >
                  تمرین‌های بیشتر
                </h2>
                <p className="font-[Vazirmatn] text-sm font-medium text-[#0D9488]">
                  مرحله بعدی
                </p>
              </div>
              <div className="mt-5 grid items-stretch gap-6 @sm:grid-cols-2">
                {recommendedContents.map((content) => (
                  <ListeningContentCard key={content.id} content={content} />
                ))}
              </div>
            </section>
          ) : null}

          <Card className="border-[#DDD6FE] bg-[#F4EEFF] p-6 shadow-none">
            <h2 className="font-[Vazirmatn] text-lg font-bold text-[#0F172A]">
              با محتوای خودت تمرین کن
            </h2>
            <p className="mt-2 font-[Vazirmatn] text-sm leading-7 text-[#64748B]">
              در مرحله بعد امکان آپلود صوت، وارد کردن لینک و بارگذاری تصویر یا
              Word نوشته‌ها فعال می‌شود.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <CustomSourceItem
                icon={Upload}
                title="آپلود فایل صوتی"
                description="WebM، MP3، WAV، M4A"
              />
              <CustomSourceItem
                icon={Link2}
                title="وارد کردن لینک"
                description="لینک مستقیم یا پادکست"
              />
            </div>
          </Card>
        </div>
      </section>

      <div className="hidden">
        <section
          aria-label="تحلیل و منابع شخصی"
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
                <BrainCircuit aria-hidden="true" className="h-5 w-5" />

                <span className="text-sm font-medium">تحلیل معلم هوشمند</span>
              </div>

              {primaryInsight ? (
                <>
                  <h2 className="mt-4 text-xl font-bold leading-8 text-white">
                    {primaryInsight.title}
                  </h2>

                  <p className="mt-3 text-sm leading-8 text-slate-400">
                    {primaryInsight.description}
                  </p>

                  {primaryInsight.actionHref && primaryInsight.actionLabel ? (
                    <Link
                      href={primaryInsight.actionHref}
                      className="
                      mt-6 inline-flex items-center
                      gap-2 text-sm font-semibold
                      text-cyan-300 transition
                      hover:text-cyan-200
                    "
                    >
                      {primaryInsight.actionLabel}

                      <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                    </Link>
                  ) : null}
                </>
              ) : (
                <p className="mt-4 text-sm leading-7 text-slate-500">
                  بعد از انجام چند تمرین، تحلیل شخصی تو در این قسمت نمایش داده
                  می‌شود.
                </p>
              )}
            </div>
          </Card>

          <Card className="p-6 lg:col-span-5">
            <h2 className="text-lg font-bold text-white">
              با محتوای خودت تمرین کن
            </h2>

            <p className="mt-2 text-sm leading-7 text-slate-500">
              در مرحله بعد امکان آپلود صوت، واردکردن لینک و بارگذاری تصویر یا
              Word نوشته‌ها فعال می‌شود.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <CustomSourceItem
                icon={Upload}
                title="آپلود فایل صوتی"
                description="MP3، WAV، M4A و WebM"
              />

              <CustomSourceItem
                icon={Link2}
                title="واردکردن لینک"
                description="لینک مستقیم یا پادکست"
              />

              <CustomSourceItem
                icon={FileText}
                title="آپلود نوشته"
                description="تصویر، Word، PDF یا Text"
              />
            </div>
          </Card>
        </section>

        {recommendedContents.length > 0 ? (
          <section aria-labelledby="recommended-listening-title">
            <div>
              <p className="text-sm font-medium text-violet-300">مرحله بعدی</p>

              <h2
                id="recommended-listening-title"
                className="mt-2 text-2xl font-bold text-white"
              >
                تمرین‌های بیشتر
              </h2>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {recommendedContents.map((content) => (
                <ListeningContentCard key={content.id} content={content} />
              ))}
            </div>
          </section>
        ) : null}

        <section
          aria-label="فعالیت‌های اخیر"
          className="grid gap-6 lg:grid-cols-12"
        >
          <Card className="p-6 lg:col-span-8">
            <div className="flex items-center gap-2 text-cyan-300">
              <History aria-hidden="true" className="h-5 w-5" />

              <span className="text-sm font-medium">فعالیت‌های اخیر</span>
            </div>

            <h2 className="mt-2 text-xl font-bold text-white">
              آخرین تمرین‌های شنیداری
            </h2>

            {recentActivities.length > 0 ? (
              <div className="mt-5 divide-y divide-white/[0.06]">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="
                      flex items-center gap-3 py-4
                    "
                  >
                    <div
                      className="
                        flex h-10 w-10 shrink-0
                        items-center justify-center
                        rounded-xl bg-emerald-400/10
                        text-emerald-300
                      "
                    >
                      <CheckCircle2 aria-hidden="true" className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-semibold text-slate-200">
                        {activity.title}
                      </h3>

                      <div className="mt-1.5 flex flex-wrap gap-3 text-xs text-slate-600">
                        <span>
                          {LISTENING_CONTENT_TYPE_LABELS[activity.contentType]}
                        </span>

                        <span>
                          {
                            LISTENING_PRACTICE_MODE_LABELS[
                              activity.practiceMode
                            ]
                          }
                        </span>

                        <span>
                          {dateFormatter.format(new Date(activity.completedAt))}
                        </span>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-sm font-bold text-white">
                        {numberFormatter.format(activity.accuracyScore)}٪
                      </p>

                      <p className="text-[10px] text-slate-600">دقت</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-5 text-sm text-slate-500">
                هنوز تمرین شنیداری انجام نداده‌ای.
              </p>
            )}
          </Card>

          <Card className="p-6 lg:col-span-4">
            <div className="flex items-center gap-2 text-amber-300">
              <Trophy aria-hidden="true" className="h-5 w-5" />

              <span className="text-sm font-medium">هدف بعدی</span>
            </div>

            <h2 className="mt-4 text-xl font-bold text-white">
              رسیدن به دقت ۸۰٪
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-500">
              با انجام دو تمرین رونویسی دیگر در سطح B1، میانگین دقت این هفته را
              به بالای ۸۰٪ برسان.
            </p>

            <div
              className="
              mt-6 rounded-2xl
              border border-amber-400/10
              bg-amber-400/[0.05] p-4
            "
            >
              <p className="text-xs leading-6 text-amber-100/70">
                پیشنهاد: ابتدا صوت را با سرعت عادی گوش بده، سپس فقط برای بخش‌های
                دشوار از سرعت ۰٫۷۵ استفاده کن.
              </p>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}

type CustomSourceItemProps = {
  icon: typeof Upload;
  title: string;
  description: string;
};

function CustomSourceItem({
  icon: Icon,
  title,
  description,
}: CustomSourceItemProps) {
  return (
    <div
      className="
        flex items-center gap-3 rounded-xl
        border border-dashed border-[#C4B5FD]
        bg-white/50 p-4 opacity-60
      "
      dir="ltr"
    >
      <div
        className="
          flex h-10 w-10 shrink-0
          items-center justify-center rounded-full
          bg-[#E5E7EB] text-[#64748B]
        "
      >
        <Icon aria-hidden="true" className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1" dir="rtl">
        <p className="font-[Vazirmatn] text-sm font-semibold text-[#6B7280]">
          {title}
        </p>

        <p className="mt-1 font-[Vazirmatn] text-[11px] text-[#94A3B8]">
          {description}
        </p>
      </div>
    </div>
  );
}
