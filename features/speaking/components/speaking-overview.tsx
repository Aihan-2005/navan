"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import {
  AudioWaveform,
  Flame,
  Mic2,
  TimerReset,
  TrendingUp,
} from "lucide-react";

import { Card } from "../../../components/ui/card";
import { cn } from "../../../lib/utils/cn";

import { FreeSpeakingCard } from "./free-speaking-card";
import {
  SPEAKING_MODE_DESCRIPTIONS,
  SPEAKING_MODE_FILTERS,
  type SpeakingModeFilter,
} from "../constants/speaking.constants";

import type {
  SpeakingMode,
  SpeakingOverview as SpeakingOverviewData,
} from "../types/speaking.types";

import { ScenarioCard } from "./scenario-card";

type SpeakingOverviewProps = {
  overview: SpeakingOverviewData;
};

const numberFormatter = new Intl.NumberFormat("fa-IR");

export function SpeakingOverview({ overview }: SpeakingOverviewProps) {
  const [activeMode, setActiveMode] = useState<SpeakingModeFilter>("all");

  const filteredScenarios = useMemo(() => {
    if (activeMode === "all") {
      return overview.scenarios;
    }

    return overview.scenarios.filter(
      (scenario) => scenario.mode === activeMode,
    );
  }, [activeMode, overview.scenarios]);

  const activeModeDescription =
    activeMode === "all"
      ? "از میان تمرین‌های متنوع، مناسب‌ترین گزینه را برای هدف امروزت انتخاب کن."
      : SPEAKING_MODE_DESCRIPTIONS[activeMode as SpeakingMode];

  const orderedScenarios = useMemo(() => {
    const order = [
      "job-interview",
      "restaurant-roleplay",
      "sixty-second-story",
      "coffee-shop-shadowing",
      "th-sound-pronunciation",
      "social-media-debate",
    ];

    return [...filteredScenarios].sort(
      (left, right) =>
        order.indexOf(left.id) - order.indexOf(right.id),
    );
  }, [filteredScenarios]);

  return (
    <main
      className="-mx-4 -my-24 min-h-[calc(100dvh+8rem)] bg-[#f7f9fa] px-4 py-28 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
      aria-labelledby="speaking-page-title"
    >
      <div className="mx-auto w-full max-w-[936px] space-y-[54px] pb-10">
      <section
        className="
          relative min-h-64 overflow-hidden rounded-3xl
          bg-[linear-gradient(135deg,#0d9488_0%,#00685f_100%)]
          px-6 py-8 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.22)]
          sm:px-10 sm:py-10
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute -left-20 -top-24 h-64 w-64
            rounded-full bg-teal-300/20 blur-3xl
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute -bottom-24 right-1/3 h-56 w-56
            rounded-full bg-cyan-300/10 blur-3xl
          "
        />

        <div
          className="
            relative flex h-full flex-col justify-center gap-7
            md:flex-row md:items-center md:justify-between
          "
        >
          <div className="max-w-2xl text-right">
            <h1
              id="speaking-page-title"
              className="
                text-3xl font-bold leading-[1.3] tracking-[-0.03em] text-white
                sm:text-4xl
              "
            >
              انگلیسی را فقط یاد نگیر؛ واقعاً صحبت کن
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-8 text-white/90 sm:text-lg">
              صدایت را ضبط کن، وارد موقعیت‌های واقعی شو و درباره تلفظ، روانی،
              گرامر و واژگان بازخورد شخصی دریافت کن.
            </p>
          </div>

          <Link
            href="/speaking/free"
            aria-label="رفتن به صفحه گفت‌وگوی آزاد"
            className="group inline-flex shrink-0 items-center justify-center self-start rounded-full bg-[#f97316] px-8 py-3 text-[22px] font-bold leading-[30px] text-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:bg-[#ea580c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 md:self-auto"
          >
            شروع مکالمه آزاد
          </Link>
        </div>
      </section>

      <section
        aria-label="آمار مکالمه"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        <SpeakingStat
          title="جلسه‌های مکالمه"
          value={numberFormatter.format(overview.stats.totalSessions)}
          icon={AudioWaveform}
          tone="slate"
        />

        <SpeakingStat
          title="تمرین این هفته"
          value={`${numberFormatter.format(
            overview.stats.weeklyMinutes,
          )} دقیقه`}
          icon={TimerReset}
          tone="violet"
        />

        <SpeakingStat
          title="روانی گفتار"
          value={`${numberFormatter.format(
            overview.stats.averageFluencyScore,
          )}٪`}
          icon={TrendingUp}
          tone="teal"
        />

        <SpeakingStat
          title="تداوم تمرین"
          value={`${numberFormatter.format(overview.stats.currentStreak)} روز`}
          icon={Flame}
          tone="orange"
        />
      </section>

      <section>
        <div className="overflow-x-auto pb-2">
          <div className="flex min-w-max items-center gap-3 lg:justify-start">
            {SPEAKING_MODE_FILTERS.map((filter) => {
              const isActive = activeMode === filter.value;

              return (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setActiveMode(filter.value)}
                  className={cn(
                    "shrink-0 rounded-full border px-5 py-2.5",
                    "text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00685f]",
                    isActive
                      ? "border-[#00685f] bg-[#00685f] text-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.16)]"
                      : "border-[#bcc9c6] bg-white text-[#3d4947] hover:border-[#0d9488] hover:text-[#00685f]",
                  )}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 text-right">
          <h2 className="text-2xl font-bold tracking-[-0.02em] text-[#191c1e]">
            تمرین مناسب امروز
          </h2>

          <p className="mt-2 text-sm leading-7 text-[#3d4947] sm:text-base">
            {activeModeDescription}
          </p>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activeMode === "all" ? (
            <>
              {orderedScenarios.slice(0, 2).map((scenario) => (
                <ScenarioCard key={scenario.id} scenario={scenario} />
              ))}

              <FreeSpeakingCard />

              {orderedScenarios.slice(2).map((scenario) => (
                <ScenarioCard key={scenario.id} scenario={scenario} />
              ))}
            </>
          ) : (
            orderedScenarios.map((scenario) => (
              <ScenarioCard key={scenario.id} scenario={scenario} />
            ))
          )}
        </div>

        {filteredScenarios.length === 0 ? (
          <Card className="mt-6 px-6 py-12 text-center">
            <p className="text-sm text-slate-400">
              تمرینی برای این دسته پیدا نشد.
            </p>
          </Card>
        ) : null}
      </section>
      </div>
    </main>
  );
}

type SpeakingStatProps = {
  title: string;
  value: string;
  icon: typeof Mic2;
  tone: "slate" | "violet" | "teal" | "orange";
};

function SpeakingStat({
  title,
  value,
  icon: Icon,
  tone,
}: SpeakingStatProps) {
  const toneClasses = {
    slate: "border-[#545c72] bg-[#eef2f7] text-[#545c72]",
    violet: "border-[#712ae2] bg-[#e7ddf8] text-[#712ae2]",
    teal: "border-[#00685f] bg-[#f0fdfa] text-[#00685f]",
    orange: "border-[#f97316] bg-[#fff7ed] text-[#f97316]",
  }[tone];

  return (
    <Card className={cn("min-h-[106px] border-x-4 bg-white px-5 py-6 shadow-sm", toneClasses)}>
      <div className="flex items-center justify-between gap-4">
        <div className="text-right">
          <p className="text-sm text-[#64748b]">{title}</p>

          <p className="mt-1 text-2xl font-bold text-[#0f172a]">{value}</p>
        </div>

        <div
          className="
            flex h-12 w-12 items-center justify-center rounded-full
            border border-current/10 bg-current/10
          "
        >
          <Icon aria-hidden="true" className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}
