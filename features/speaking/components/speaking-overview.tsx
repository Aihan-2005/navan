"use client";

import { useMemo, useState } from "react";

import {
  AudioWaveform,
  Flame,
  Mic2,
  Sparkles,
  TimerReset,
  TrendingUp,
} from "lucide-react";

import { Card } from "../../../components/ui/card";
import { cn } from "../../../lib/utils/cn";

import {
  SPEAKING_MODE_DESCRIPTIONS,
  SPEAKING_MODE_FILTERS,
  SPEAKING_MODE_LABELS,
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

export function SpeakingOverview({
  overview,
}: SpeakingOverviewProps) {
  const [activeMode, setActiveMode] =
    useState<SpeakingModeFilter>("all");

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
      : SPEAKING_MODE_DESCRIPTIONS[
          activeMode as SpeakingMode
        ];

  return (
    <main
      className="mx-auto w-full max-w-7xl space-y-6"
      aria-labelledby="speaking-page-title"
    >
      <section
        className="
          relative overflow-hidden rounded-3xl
          border border-cyan-400/15
          bg-[linear-gradient(135deg,rgba(8,47,73,0.75),rgba(15,23,42,0.85))]
          px-6 py-8 shadow-2xl
          sm:px-8 sm:py-10
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute -left-24 -top-24
            h-72 w-72 rounded-full
            bg-cyan-500/20 blur-3xl
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute -bottom-28 right-12
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

              مربی هوشمند مکالمه
            </div>

            <h1
              id="speaking-page-title"
              className="
                mt-4 text-3xl font-bold leading-tight text-white
                sm:text-4xl
              "
            >
              انگلیسی را فقط یاد نگیر؛
              <span className="text-cyan-300">
                {" "}
                واقعاً صحبت کن
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-300 sm:text-base">
              صدایت را ضبط کن، وارد موقعیت‌های واقعی شو و
              درباره تلفظ، روانی، گرامر، واژگان و اعتمادبه‌نفس
              بازخورد شخصی دریافت کن.
            </p>
          </div>

          <div
            className="
              flex h-32 w-32 shrink-0 items-center
              justify-center self-center rounded-full
              border border-cyan-300/20
              bg-cyan-400/10
              shadow-[0_0_60px_rgba(34,211,238,0.18)]
            "
          >
            <div
              className="
                flex h-20 w-20 items-center
                justify-center rounded-full
                bg-cyan-300 text-slate-950
              "
            >
              <Mic2
                aria-hidden="true"
                className="h-9 w-9"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        aria-label="آمار مکالمه"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <SpeakingStat
          title="جلسه‌های مکالمه"
          value={numberFormatter.format(
            overview.stats.totalSessions,
          )}
          description="تعداد کل تمرین‌ها"
          icon={AudioWaveform}
        />

        <SpeakingStat
          title="تمرین این هفته"
          value={`${numberFormatter.format(
            overview.stats.weeklyMinutes,
          )} دقیقه`}
          description="زمان مکالمه فعال"
          icon={TimerReset}
        />

        <SpeakingStat
          title="روانی گفتار"
          value={`${numberFormatter.format(
            overview.stats.averageFluencyScore,
          )}٪`}
          description="میانگین ارزیابی‌های اخیر"
          icon={TrendingUp}
        />

        <SpeakingStat
          title="تداوم تمرین"
          value={`${numberFormatter.format(
            overview.stats.currentStreak,
          )} روز`}
          description="روزهای متوالی"
          icon={Flame}
        />
      </section>

      <section>
        <div
          className="
            flex flex-col gap-4
            lg:flex-row lg:items-end
            lg:justify-between
          "
        >
          <div>
            <h2 className="text-2xl font-bold text-white">
              تمرین مناسب امروز
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">
              {activeModeDescription}
            </p>
          </div>

          <div
            className="
              flex max-w-full gap-2 overflow-x-auto
              pb-2 lg:justify-end
            "
          >
            {SPEAKING_MODE_FILTERS.map((filter) => {
              const isActive =
                activeMode === filter.value;

              return (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() =>
                    setActiveMode(filter.value)
                  }
                  className={cn(
                    "shrink-0 rounded-xl border px-4 py-2",
                    "text-xs font-medium transition",
                    isActive
                      ? "border-cyan-300/30 bg-cyan-400/15 text-cyan-200"
                      : "border-white/[0.06] bg-white/[0.02] text-slate-500 hover:bg-white/[0.05] hover:text-slate-300",
                  )}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredScenarios.map((scenario) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
            />
          ))}
        </div>

        {filteredScenarios.length === 0 ? (
          <Card className="mt-6 px-6 py-12 text-center">
            <p className="text-sm text-slate-400">
              تمرینی برای این دسته پیدا نشد.
            </p>
          </Card>
        ) : null}
      </section>
    </main>
  );
}

type SpeakingStatProps = {
  title: string;
  value: string;
  description: string;
  icon: typeof Mic2;
};

function SpeakingStat({
  title,
  value,
  description,
  icon: Icon,
}: SpeakingStatProps) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">
            {title}
          </p>

          <p className="mt-3 text-2xl font-bold text-white">
            {value}
          </p>

          <p className="mt-2 text-xs text-slate-600">
            {description}
          </p>
        </div>

        <div
          className="
            flex h-11 w-11 items-center justify-center
            rounded-xl bg-cyan-400/10 text-cyan-300
          "
        >
          <Icon
            aria-hidden="true"
            className="h-5 w-5"
          />
        </div>
      </div>
    </Card>
  );
}