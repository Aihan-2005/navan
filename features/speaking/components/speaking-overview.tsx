"use client";

import Link from "next/link";

import {
  useMemo,
  useState,
} from "react";

import {
  AudioWaveform,
  Flame,
  Mic2,
  TimerReset,
  TrendingUp,
} from "lucide-react";

import {
  Card,
} from "../../../components/ui/card";

import {
  cn,
} from "../../../lib/utils/cn";

import {
  ListeningStatCard,
} from "../../listening/components/overview/listening-stat-card";

import {
  SPEAKING_MODE_DESCRIPTIONS,
  SPEAKING_MODE_FILTERS,
  type SpeakingModeFilter,
} from "../constants/speaking.constants";

import type {
  SpeakingMode,
  SpeakingOverview as SpeakingOverviewData,
} from "../types/speaking.types";

import {
  FreeSpeakingCard,
} from "./free-speaking-card";

import {
  ScenarioCard,
} from "./scenario-card";

type SpeakingOverviewProps =
  Readonly<{
    overview: SpeakingOverviewData;
  }>;

const numberFormatter =
  new Intl.NumberFormat("fa-IR");

const SCENARIO_ORDER = [
  "job-interview",
  "restaurant-roleplay",
  "sixty-second-story",
  "coffee-shop-shadowing",
  "th-sound-pronunciation",
  "social-media-debate",
] as const;

export function SpeakingOverview({
  overview,
}: SpeakingOverviewProps) {
  const [
    activeMode,
    setActiveMode,
  ] =
    useState<SpeakingModeFilter>(
      "all",
    );

  const filteredScenarios =
    useMemo(() => {
      if (
        activeMode === "all"
      ) {
        return overview.scenarios;
      }

      return overview.scenarios.filter(
        (scenario) =>
          scenario.mode ===
          activeMode,
      );
    }, [
      activeMode,
      overview.scenarios,
    ]);

  const orderedScenarios =
    useMemo(() => {
      return [
        ...filteredScenarios,
      ].sort(
        (left, right) =>
          SCENARIO_ORDER.indexOf(
            left.id as
              (typeof SCENARIO_ORDER)[number],
          ) -
          SCENARIO_ORDER.indexOf(
            right.id as
              (typeof SCENARIO_ORDER)[number],
          ),
      );
    }, [filteredScenarios]);

  const activeModeDescription =
    activeMode === "all"
      ? "از میان تمرین‌های متنوع، مناسب‌ترین گزینه را برای هدف امروزت انتخاب کن."
      : SPEAKING_MODE_DESCRIPTIONS[
          activeMode as SpeakingMode
        ];

  return (
    <main
      dir="rtl"
      aria-labelledby="speaking-page-title"
      className="
        mx-auto
        w-full
        max-w-[936px]
        space-y-10
        pb-10
        [font-family:var(--font-vazirmatn)]
        sm:space-y-12
      "
    >
      <section
        className="
          relative
          min-h-[218px]
          overflow-hidden
          rounded-[28px]
          bg-[linear-gradient(105.3deg,#0D9488_0%,#00685F_100%)]
          px-6
          py-7
          shadow-[0_14px_34px_rgba(0,104,95,0.16)]
          sm:px-8
          sm:py-8
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -left-20
            -top-24
            h-64
            w-64
            rounded-full
            bg-teal-300/20
            blur-3xl
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -bottom-24
            right-1/3
            h-56
            w-56
            rounded-full
            bg-cyan-300/10
            blur-3xl
          "
        />

        <div
          className="
            relative
            flex
            min-h-[162px]
            flex-col
            justify-between
            gap-7
            lg:flex-row
            lg:items-center
          "
        >
          <div className="max-w-[630px] text-right">
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-white/10
                px-3
                py-1.5
                text-sm
                font-medium
                text-white/90
              "
            >
              <Mic2
                aria-hidden="true"
                className="h-4 w-4"
              />

              تمرین مکالمه
            </div>

            <h1
              id="speaking-page-title"
              className="
                mt-4
                text-[28px]
                font-bold
                leading-[1.45]
                tracking-[-0.025em]
                text-white
                sm:text-[34px]
              "
            >
              انگلیسی را فقط یاد نگیر؛ واقعاً صحبت کن
            </h1>

            <p
              className="
                mt-3
                max-w-[620px]
                text-sm
                leading-7
                text-white/90
                sm:text-base
              "
            >
              صدایت را ضبط کن، وارد موقعیت‌های واقعی شو و درباره تلفظ، روانی،
              گرامر و واژگان بازخورد شخصی دریافت کن.
            </p>
          </div>

          <Link
            href="/speaking/free"
            aria-label="رفتن به صفحه گفت‌وگوی آزاد"
            className="
              inline-flex
              min-h-12
              shrink-0
              self-start
              items-center
              justify-center
              rounded-2xl
              bg-[#F97316]
              px-6
              text-base
              font-bold
              text-white
              shadow-[0_8px_20px_rgba(194,65,12,0.2)]
              transition
              hover:-translate-y-0.5
              hover:bg-[#EA580C]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-white/80
              lg:self-auto
            "
          >
            شروع مکالمه آزاد
          </Link>
        </div>
      </section>

      <section
        aria-label="آمار مکالمه"
        className="
          grid
          gap-4
          sm:grid-cols-2
          lg:grid-cols-4
          lg:gap-5
        "
      >
        <ListeningStatCard
          title="تداوم تمرین"
          value={`${numberFormatter.format(
            overview.stats.currentStreak,
          )} روز`}
          icon={Flame}
          tone="orange"
        />

        <ListeningStatCard
          title="روان بودن گفتار"
          value={`${numberFormatter.format(
            overview.stats.averageFluencyScore,
          )}٪`}
          icon={TrendingUp}
          tone="teal"
        />

        <ListeningStatCard
          title="تمرین این هفته"
          value={`${numberFormatter.format(
            overview.stats.weeklyMinutes,
          )} دقیقه`}
          icon={TimerReset}
          tone="violet"
        />

        <ListeningStatCard
          title="جلسه‌های مکالمه"
          value={numberFormatter.format(
            overview.stats.totalSessions,
          )}
          icon={AudioWaveform}
          tone="slate"
        />
      </section>

      <section
        aria-labelledby="speaking-practice-section-title"
      >
        <div
          className="
            overflow-x-auto
            pb-2
          "
        >
          <div
            className="
              flex
              min-w-max
              items-center
              gap-2.5
            "
          >
            {SPEAKING_MODE_FILTERS.map(
              (filter) => {
                const isActive =
                  activeMode ===
                  filter.value;

                return (
                  <button
                    key={filter.value}
                    type="button"
                    aria-pressed={
                      isActive
                    }
                    onClick={() => {
                      setActiveMode(
                        filter.value,
                      );
                    }}
                    className={cn(
                      "inline-flex min-h-9 shrink-0 items-center",
                      "justify-center rounded-full border px-4",
                      "text-sm font-bold transition",
                      "focus-visible:outline-none",
                      "focus-visible:ring-2",
                      "focus-visible:ring-[#00685F]/25",

                      isActive
                        ? [
                            "border-[#00685F]",
                            "bg-[#00685F]",
                            "text-white",
                            "shadow-[0_4px_12px_rgba(0,104,95,0.16)]",
                          ]
                        : [
                            "border-[#BCC9C6]",
                            "bg-white",
                            "text-[#3D4947]",
                            "hover:border-[#0D9488]",
                            "hover:text-[#00685F]",
                          ],
                    )}
                  >
                    {filter.label}
                  </button>
                );
              },
            )}
          </div>
        </div>

        <div className="mt-6 text-right">
          <h2
            id="speaking-practice-section-title"
            className="
              text-[24px]
              font-bold
              leading-9
              tracking-[-0.02em]
              text-[#191C1E]
            "
          >
            تمرین مناسب امروز
          </h2>

          <p
            className="
              mt-2
              max-w-2xl
              text-sm
              leading-7
              text-[#3D4947]
              sm:text-base
            "
          >
            {activeModeDescription}
          </p>
        </div>

        <div
          className="
            mt-6
            grid
            grid-cols-1
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {activeMode === "all" ? (
            <>
              {orderedScenarios
                .slice(0, 2)
                .map(
                  (scenario) => (
                    <ScenarioCard
                      key={
                        scenario.id
                      }
                      scenario={
                        scenario
                      }
                    />
                  ),
                )}

              <FreeSpeakingCard />

              {orderedScenarios
                .slice(2)
                .map(
                  (scenario) => (
                    <ScenarioCard
                      key={
                        scenario.id
                      }
                      scenario={
                        scenario
                      }
                    />
                  ),
                )}
            </>
          ) : (
            orderedScenarios.map(
              (scenario) => (
                <ScenarioCard
                  key={scenario.id}
                  scenario={scenario}
                />
              ),
            )
          )}
        </div>

        {filteredScenarios.length ===
        0 ? (
          <Card
            className="
              mt-6
              border-[#E2E8F0]
              bg-white
              px-6
              py-12
              text-center
            "
          >
            <p className="text-sm text-[#64748B]">
              تمرینی برای این دسته پیدا نشد.
            </p>
          </Card>
        ) : null}
      </section>
    </main>
  );
}

