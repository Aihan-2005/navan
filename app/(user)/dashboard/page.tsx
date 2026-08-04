import {
  Flame,
  Gauge,
  TimerReset,
} from "lucide-react";

import {
  AIInsightCard,
  AITutorCTA,
  ContinueLearningCard,
  DailyPlanCard,
  DashboardHeader,
  getDashboardOverview,
  OverviewStatCard,
  QuickPracticeGrid,
  RecentActivitiesCard,
  ReviewQueueCard,
  SkillProgressOverview,
  WeeklyGoalCard,
} from "../../../features/dashboard";

const persianNumberFormatter = new Intl.NumberFormat("fa-IR");

function formatNumber(value: number): string {
  return persianNumberFormatter.format(value);
}

export default async function DashboardPage() {
  const dashboard = await getDashboardOverview();

  const {
    user,
    summary,
    continueLearning,
    dailyPlan,
    skillProgress,
    reviewQueue,
    primaryInsight,
    recentActivities,
  } = dashboard;

  const currentLevel = user.cefrLevel ?? "نامشخص";

  return (
    <main
      className="mx-auto w-full max-w-7xl space-y-6"
      aria-labelledby="dashboard-page-title"
    >
      <h1 id="dashboard-page-title" className="sr-only">
        داشبورد یادگیری زبان
      </h1>

      <DashboardHeader user={user} />

      <section
        aria-label="خلاصه وضعیت یادگیری"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        <OverviewStatCard
          title="سطح فعلی"
          value={currentLevel}
          description={
            user.cefrLevel
              ? `سطح فعلی زبان ${user.targetLanguage.name}`
              : "برای مشخص‌شدن سطح، آزمون تعیین سطح را انجام بده."
          }
          icon={Gauge}
          tone="cyan"
        />

        <OverviewStatCard
          title="تمرین امروز"
          value={`${formatNumber(
            summary.todayCompletedMinutes,
          )} دقیقه`}
          description={`${formatNumber(
            summary.todayCompletedMinutes,
          )} دقیقه از هدف روزانه ${formatNumber(
            summary.dailyGoalMinutes,
          )} دقیقه‌ای`}
          icon={TimerReset}
          tone="violet"
        />

        <OverviewStatCard
          title="روزهای متوالی"
          value={`${formatNumber(summary.streakDays)} روز`}
          description={`${formatNumber(
            summary.completedActivitiesThisWeek,
          )} فعالیت در هفته جاری انجام شده است.`}
          icon={Flame}
          tone="amber"
        />
      </section>

      <section
        aria-label="ادامه یادگیری و هدف هفتگی"
        className="grid gap-6 lg:grid-cols-12"
      >
        <div className="lg:col-span-8">
          <ContinueLearningCard
            activity={continueLearning}
          />
        </div>

        <div className="lg:col-span-4">
          <WeeklyGoalCard summary={summary} />
        </div>
      </section>

      <section
        aria-label="برنامه و مرورهای امروز"
        className="grid gap-6 lg:grid-cols-12"
      >
        <div className="lg:col-span-8">
          <DailyPlanCard plan={dailyPlan} />
        </div>

        <div className="lg:col-span-4">
          <ReviewQueueCard queue={reviewQueue} />
        </div>
      </section>

      <section
        aria-label="پیشرفت و تحلیل هوشمند"
        className="grid gap-6 lg:grid-cols-12"
      >
        <div className="lg:col-span-8">
          <SkillProgressOverview skills={skillProgress} />
        </div>

        <div className="lg:col-span-4">
          <AIInsightCard insight={primaryInsight} />
        </div>
      </section>

      <section
        aria-label="فعالیت‌ها و تمرین سریع"
        className="grid gap-6 lg:grid-cols-12"
      >
        <div className="lg:col-span-8">
          <RecentActivitiesCard
            activities={recentActivities}
          />
        </div>

        <div className="space-y-6 lg:col-span-4">
          <AITutorCTA />
          <QuickPracticeGrid />
        </div>
      </section>
    </main>
  );
}