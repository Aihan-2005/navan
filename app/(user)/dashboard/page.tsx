import {
  DashboardHero,
  OverviewStatCard,
  ContinueLearningCard,
  WeeklyGoalCard,
  DailyPlanCard,
  SkillProgressOverview,
  RecentActivitiesCard,
  AITutorCTA,
  getDashboardOverview,
} from "../../../features/dashboard";


export default async function DashboardPage() {

  const dashboard =
    await getDashboardOverview();


  return (
    <main
      dir="rtl"
      className="
        mx-auto
        w-full
        max-w-[936px]
        space-y-8
        pb-20
      "
    >

      <DashboardHero />


      <section
        className="
          grid
          gap-6
          xl:grid-cols-3
        "
      >

        <OverviewStatCard
          title="سطح فعلی"
          value={
            dashboard.user.cefrLevel ?? "B1"
          }
          variant="teal"
          progress={75}
          subtitle="۷۵٪ تکمیل شده تا سطح B2"
        />


        <OverviewStatCard
          title="تمرین امروز"
          value="۲۵ دقیقه"
          variant="purple"
          progress={55}
          subtitle="هدف: ۴۵ دقیقه"
        />


        <OverviewStatCard
          title="توالی یادگیری"
          value="۱۲ روز"
          variant="orange"
          progress={80}
          subtitle="۳ روز تا جایزه ویژه"
        />

      </section>



      <section
        className="
          grid
          gap-6
          lg:grid-cols-[1fr_296px]
        "
      >

        <ContinueLearningCard
          activity={{
            title:
              dashboard.continueLearning.title,

            grammar:
              dashboard.continueLearning.subtitle,

            remainingTime:
              `${dashboard.continueLearning.remainingMinutes} دقیقه`,
          }}
        />


        <WeeklyGoalCard
          summary={
            dashboard.summary
          }
        />

      </section>




      <section
        className="
          grid
          gap-6
          lg:grid-cols-[552px_360px]
        "
      >

        <SkillProgressOverview
          skills={
            dashboard.skillProgress
          }
        />


        <AITutorCTA />

      </section>




      <DailyPlanCard
        plan={
          dashboard.dailyPlan
        }
      />



      <RecentActivitiesCard
        activities={
          dashboard.recentActivities
        }
      />

    </main>
  );
}