import Link from "next/link";
import {
    ArrowLeft,
    BrainCircuit,
    CheckCircle2,
    FileText,
    Flame,
    Headphones,
    History,
    Link2,
    Sparkles,
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

import type {
    ListeningOverview as ListeningOverviewData,
} from "../../types/listening.types";

import { ListeningContentCard } from "./listening-content-card";
import { ListeningStatCard } from "./listening-stat-card";

type ListeningOverviewProps = Readonly<{
    overview: ListeningOverviewData;
}>;

const numberFormatter =
    new Intl.NumberFormat("fa-IR");

const dateFormatter =
    new Intl.DateTimeFormat("fa-IR", {
        month: "short",
        day: "numeric",
    });

export function ListeningOverview({
    overview,
}: ListeningOverviewProps) {
    const {
        stats,
        featuredContents,
        recommendedContents,
        primaryInsight,
        recentActivities,
    } = overview;

    return (
        <main
            className="mx-auto w-full max-w-7xl space-y-6"
            aria-labelledby="listening-page-title"
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

                            مربی هوشمند مهارت شنیداری
                        </div>

                        <h1
                            id="listening-page-title"
                            className="
                mt-4 text-3xl font-bold
                leading-tight text-white sm:text-4xl
              "
                        >
                            گوش بده، بنویس و
                            <span className="text-cyan-300">
                                {" "}
                                دقیق‌تر بشنو
                            </span>
                        </h1>

                        <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-300 sm:text-base">
                            پادکست‌ها و مکالمه‌های واقعی را گوش بده،
                            چیزی را که می‌شنوی بنویس و بازخورد دقیق
                            درباره کلمات حذف‌شده، اشتباهات و بخش‌های
                            دشوار دریافت کن.
                        </p>

                        <div className="mt-7 flex flex-wrap gap-3">
                            <Link
                                href="#featured-listening"
                                className="
                  inline-flex min-h-11 items-center
                  justify-center gap-2 rounded-xl
                  bg-cyan-400 px-5 py-2.5
                  text-sm font-bold text-slate-950
                  transition hover:bg-cyan-300
                "
                            >
                                مشاهده تمرین‌ها

                                <ArrowLeft
                                    aria-hidden="true"
                                    className="h-4 w-4"
                                />
                            </Link>

                            <Link
                                href="/listening/custom"
                                className="
    inline-flex min-h-11 items-center
    justify-center gap-2 rounded-xl
    border border-white/10
    bg-white/[0.04] px-5 py-2.5
    text-sm font-medium text-slate-300
    transition hover:bg-white/[0.08]
    hover:text-white
  "
                            >
                                <Upload
                                    aria-hidden="true"
                                    className="h-4 w-4"
                                />

                                تمرین با فایل شخصی
                            </Link>
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
                            <Headphones
                                aria-hidden="true"
                                className="h-11 w-11"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section
                aria-label="آمار تمرین شنیداری"
                className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            >
                <ListeningStatCard
                    title="جلسه‌های شنیداری"
                    value={numberFormatter.format(
                        stats.totalSessions,
                    )}
                    description="تعداد کل تمرین‌های انجام‌شده"
                    icon={Headphones}
                    tone="orange"
                />

                <ListeningStatCard
                    title="تمرین این هفته"
                    value={`${numberFormatter.format(
                        stats.weeklyMinutes,
                    )} دقیقه`}
                    description="مجموع زمان گوش‌دادن و رونویسی"
                    icon={TimerReset}
                    tone="emerald"
                />

                <ListeningStatCard
                    title="میانگین دقت"
                    value={`${numberFormatter.format(
                        stats.averageAccuracyScore,
                    )}٪`}
                    description="میانگین تطابق Transcriptهای اخیر"
                    icon={Target}
                    tone="violet"
                />

                <ListeningStatCard
                    title="تداوم تمرین"
                    value={`${numberFormatter.format(
                        stats.currentStreakDays,
                    )} روز`}
                    description={`بهترین امتیاز: ${numberFormatter.format(
                        stats.bestAccuracyScore,
                    )}٪`}
                    icon={Flame}
                    tone="gray"
                />
            </section>

            <section
                id="featured-listening"
                aria-labelledby="featured-listening-title"
            >
                <div>
                    <p className="text-sm font-medium text-cyan-300">
                        انتخاب‌های پیشنهادی
                    </p>

                    <h2
                        id="featured-listening-title"
                        className="mt-2 text-2xl font-bold text-white"
                    >
                        تمرین مناسب امروز
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">
                        از محتوای کوتاه و سطح‌بندی‌شده شروع کن و
                        Transcript خودت را با متن مرجع مقایسه کن.
                    </p>
                </div>

                <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {featuredContents.map(
                        (content) => (
                            <ListeningContentCard
                                key={content.id}
                                content={content}
                            />
                        ),
                    )}
                </div>
            </section>

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
                            <BrainCircuit
                                aria-hidden="true"
                                className="h-5 w-5"
                            />

                            <span className="text-sm font-medium">
                                تحلیل معلم هوشمند
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

                                {primaryInsight.actionHref &&
                                    primaryInsight.actionLabel ? (
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

                                        <ArrowLeft
                                            aria-hidden="true"
                                            className="h-4 w-4"
                                        />
                                    </Link>
                                ) : null}
                            </>
                        ) : (
                            <p className="mt-4 text-sm leading-7 text-slate-500">
                                بعد از انجام چند تمرین، تحلیل شخصی تو در این
                                قسمت نمایش داده می‌شود.
                            </p>
                        )}
                    </div>
                </Card>

                <Card className="p-6 lg:col-span-5">
                    <h2 className="text-lg font-bold text-white">
                        با محتوای خودت تمرین کن
                    </h2>

                    <p className="mt-2 text-sm leading-7 text-slate-500">
                        در مرحله بعد امکان آپلود صوت، واردکردن لینک و
                        بارگذاری تصویر یا Word نوشته‌ها فعال می‌شود.
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
                        <p className="text-sm font-medium text-violet-300">
                            مرحله بعدی
                        </p>

                        <h2
                            id="recommended-listening-title"
                            className="mt-2 text-2xl font-bold text-white"
                        >
                            تمرین‌های بیشتر
                        </h2>
                    </div>

                    <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {recommendedContents.map(
                            (content) => (
                                <ListeningContentCard
                                    key={content.id}
                                    content={content}
                                />
                            ),
                        )}
                    </div>
                </section>
            ) : null}

            <section
                aria-label="فعالیت‌های اخیر"
                className="grid gap-6 lg:grid-cols-12"
            >
                <Card className="p-6 lg:col-span-8">
                    <div className="flex items-center gap-2 text-cyan-300">
                        <History
                            aria-hidden="true"
                            className="h-5 w-5"
                        />

                        <span className="text-sm font-medium">
                            فعالیت‌های اخیر
                        </span>
                    </div>

                    <h2 className="mt-2 text-xl font-bold text-white">
                        آخرین تمرین‌های شنیداری
                    </h2>

                    {recentActivities.length > 0 ? (
                        <div className="mt-5 divide-y divide-white/[0.06]">
                            {recentActivities.map(
                                (activity) => (
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
                                            <CheckCircle2
                                                aria-hidden="true"
                                                className="h-5 w-5"
                                            />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <h3 className="truncate text-sm font-semibold text-slate-200">
                                                {activity.title}
                                            </h3>

                                            <div className="mt-1.5 flex flex-wrap gap-3 text-xs text-slate-600">
                                                <span>
                                                    {
                                                        LISTENING_CONTENT_TYPE_LABELS[
                                                        activity.contentType
                                                        ]
                                                    }
                                                </span>

                                                <span>
                                                    {
                                                        LISTENING_PRACTICE_MODE_LABELS[
                                                        activity.practiceMode
                                                        ]
                                                    }
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
                                                    activity.accuracyScore,
                                                )}
                                                ٪
                                            </p>

                                            <p className="text-[10px] text-slate-600">
                                                دقت
                                            </p>
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    ) : (
                        <p className="mt-5 text-sm text-slate-500">
                            هنوز تمرین شنیداری انجام نداده‌ای.
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
                            هدف بعدی
                        </span>
                    </div>

                    <h2 className="mt-4 text-xl font-bold text-white">
                        رسیدن به دقت ۸۰٪
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-slate-500">
                        با انجام دو تمرین رونویسی دیگر در سطح B1،
                        میانگین دقت این هفته را به بالای ۸۰٪ برسان.
                    </p>

                    <div
                        className="
              mt-6 rounded-2xl
              border border-amber-400/10
              bg-amber-400/[0.05] p-4
            "
                    >
                        <p className="text-xs leading-6 text-amber-100/70">
                            پیشنهاد: ابتدا صوت را با سرعت عادی گوش بده،
                            سپس فقط برای بخش‌های دشوار از سرعت ۰٫۷۵
                            استفاده کن.
                        </p>
                    </div>
                </Card>
            </section>
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

            <span
                className="
          rounded-full bg-white/[0.04]
          px-2 py-1 text-[9px] text-slate-600
        "
            >
                فاز بعد
            </span>
        </div>
    );
}