import {
  AITutorCTA,
  ContinueLearningCard,
  DailyPlanCard,
  DashboardHero,
  LanguageRadar,
  OverviewStatCard,
  QuickPracticeGrid,
  RecentActivitiesCard,
  SkillProgressOverview,
  WeeklyGoalCard,
  getDashboardOverview,
} from "../../../features/dashboard";

export default async function DashboardPage() {
  const dashboard =
    await getDashboardOverview();

  const {
    user,
    summary,
    continueLearning,
    dailyPlan,
    skillProgress,
    recentActivities,
  } = dashboard;

  const getSkillScore = (
    skill:
      | "listening"
      | "speaking"
      | "writing"
      | "vocabulary"
      | "reading",
    fallback: number,
  ): number =>
    skillProgress.find(
      (item) =>
        item.skill === skill,
    )?.score ?? fallback;

  const listening =
    getSkillScore(
      "listening",
      88,
    );

  const speaking =
    getSkillScore(
      "speaking",
      62,
    );

  const writing =
    getSkillScore(
      "writing",
      74,
    );

  const vocabulary =
    getSkillScore(
      "vocabulary",
      91,
    );

  const reading =
    getSkillScore(
      "reading",
      80,
    );

  const dailyProgress =
    summary.dailyGoalMinutes > 0
      ? Math.min(
          100,
          Math.round(
            (
              summary.todayCompletedMinutes /
              summary.dailyGoalMinutes
            ) *
              100,
          ),
        )
      : 0;

  return (
    <main
      dir="rtl"
      className="
        mx-auto
        flex
        w-full
        max-w-[1120px]
        flex-col
        gap-8
        pb-10
      "
    >
      <DashboardHero
        user={user}
      />

      {/* Top statistics */}

      <section
        aria-label="وضعیت یادگیری"
        className="
          grid
          grid-cols-1
          gap-5
          md:grid-cols-3
        "
      >
        <OverviewStatCard
          title="سطح فعلی"
          value="B1 Intermediate"
          subtitle="۷۵٪ تکمیل شده تا سطح B2"
          progress={75}
          variant="teal"
        />

        <OverviewStatCard
          title="تمرین امروز"
          value={`${summary.todayCompletedMinutes} دقیقه`}
          subtitle={`هدف: ${summary.dailyGoalMinutes} دقیقه`}
          progress={
            dailyProgress
          }
          variant="purple"
        />

        <OverviewStatCard
          title="توالی یادگیری (Streak)"
          value={`${summary.streakDays} روز`}
          subtitle="۳ روز تا جایزه ویژه"
          progress={80}
          variant="orange"
        />
      </section>

      {/* Continue learning */}

      <section
        aria-label="ادامه درس و اهداف هفتگی"
        className="
          grid
          grid-cols-1
          gap-5
          lg:grid-cols-[minmax(0,1.55fr)_minmax(300px,1fr)]
        "
      >
        <ContinueLearningCard
          activity={
            continueLearning
              ? {
                  title:
                    continueLearning.title,

                  grammar:
                    continueLearning.description ??
                    "گرامر: حال کامل استمراری",

                  remainingTime:
                    `${continueLearning.estimatedMinutesRemaining} دقیقه`,

                  href:
                    continueLearning.href,
                }
              : undefined
          }
        />

        <WeeklyGoalCard />
      </section>

      {/* Daily plan */}

      <DailyPlanCard
        plan={dailyPlan}
      />

      {/* Skills */}

      <section
        aria-label="تحلیل مهارت‌ها"
        className="
          grid
          grid-cols-1
          gap-5
          lg:grid-cols-[minmax(0,1.55fr)_minmax(300px,1fr)]
        "
      >
        <SkillProgressOverview
          skills={
            skillProgress
          }
        />

        <LanguageRadar
          listening={listening}
          speaking={speaking}
          writing={writing}
          vocabulary={vocabulary}
          reading={reading}
        />
      </section>

      {/* Bottom cards */}

      <section
        aria-label="فعالیت‌ها و ابزارهای سریع"
        className="
          grid
          grid-cols-1
          gap-5
          md:grid-cols-3
        "
      >
        <RecentActivitiesCard
          activities={
            recentActivities
          }
        />

        <AITutorCTA />

        <QuickPracticeGrid />
      </section>
    </main>
  );
}