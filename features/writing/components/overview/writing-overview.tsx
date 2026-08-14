"use client";

import Link from "next/link";
import { ArrowLeft, BookOpenText, History, PenTool } from "lucide-react";

import { Card } from "../../../../components/ui/card";

import { ContinueDraftCard } from "./continue-draft-card";
import { RecentWritingList } from "./recent-writing-list";
import { WritingHero } from "./writing-hero";
import { WritingModeCard } from "./writing-mode-card";
import { WritingStatCards } from "./writing-stat-card";

import type { WritingOverviewData } from "../../types/writing.types";

type WritingOverviewProps = Readonly<{
  overview: WritingOverviewData;
}>;

export function WritingOverview({ overview }: WritingOverviewProps) {
  return (
    <main
      className="mx-auto w-full max-w-7xl space-y-6"
      aria-labelledby="writing-page-title"
      dir="rtl"
    >
      <WritingHero />

      <WritingStatCards stats={overview.stats} />

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <ContinueDraftCard draft={overview.currentDraft} />

        <WritingModeCard exercise={overview.recommendedExercise} />
      </section>

      <section>
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-white">تمرین‌های نوشتاری</h2>
            <p className="mt-2 text-sm leading-7 text-slate-500">
              از میان تمرین‌های متنوع، مناسب‌ترین گزینه را برای هدف امروزت
              انتخاب کن.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <Card className="flex h-full flex-col justify-between p-6" dir="rtl">
            <div>
              <div className="flex items-center gap-2 text-sm text-cyan-300">
                <PenTool aria-hidden="true" className="h-4 w-4" />
                نوشتن آزاد
              </div>
              <h3 className="mt-4 text-lg font-bold text-white">
                شروع نوشتن بدون محدودیت
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                متن‌های آزاد، ایده‌های روزانه و تمرین‌های بدون فشار را همین حالا
                شروع کن.
              </p>
            </div>

            <Link
              href="/writing/new"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/15"
            >
              باز کردن نوشتن آزاد
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            </Link>
          </Card>

          {overview.exercises.map((exercise) => (
            <WritingModeCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <RecentWritingList writings={overview.recentWritings} />

        <Card className="p-6" dir="rtl">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-white">نقاط ضعف نوشتاری</h3>
              <p className="mt-2 text-sm text-slate-400">
                حوزه‌هایی که برای رشد بیشتر ارزش دارند.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {overview.weakPoints.map((weakPoint) => (
              <div
                key={weakPoint.id}
                className="rounded-2xl border border-white/8 bg-white/3 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-white">{weakPoint.title}</p>
                  <span className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-2.5 py-1 text-[11px] font-semibold text-cyan-200">
                    {weakPoint.severity}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-400">
                  {weakPoint.description}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section>
        <Card className="p-6" dir="rtl">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                <History aria-hidden="true" className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">تاریخچه نوشته‌ها</h3>
                <p className="mt-2 text-sm leading-7 text-slate-400">
                  مشاهده نوشته‌های قبلی، تحلیل‌های AI، اشتباهات و اصلاحات گذشته
                </p>
              </div>
            </div>
            <Link
              href="/writing/history"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-950 transition hover:bg-cyan-300"
              aria-label="مشاهده تاریخچه نوشته‌ها"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </Card>
      </section>

      <section
        className="rounded-3xl border border-cyan-400/15 bg-slate-950/60 p-6 text-center"
        dir="rtl"
      >
        <h2 className="text-2xl font-bold text-white">
          آماده‌ای برای شروع یک نوشته‌ی جدید؟
        </h2>
        <p className="mt-3 text-sm leading-8 text-slate-400">
          با یک کلیک وارد فضای نوشتن شو و متن خودت را با راهنمایی‌های هوشمند
          ساختار بده.
        </p>
        <Link
          href="/writing/new"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/15"
        >
          شروع نوشتن آزاد
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
}
