export type DashboardUser = {
  name: string;
  cefrLevel?: string;
};


export type ContinueLearningData = {
  title: string;
  subtitle: string;
  remainingMinutes: number;
};


export type DashboardSummary = {
  completedExercises: number;
  totalExercises: number;
  xp: number;
};


export type SkillProgressItem = {
  id: string;
  title: string;
  score: number;
  status: string;
};


export type DailyPlanItem = {
  id: string;
  title: string;
  duration: string;
  reward: string;
  completed: boolean;
};


export type RecentActivity = {
  id: string;
  title: string;
  date: string;
  score?: string;
};


export type DashboardOverview = {
  user: DashboardUser;

  continueLearning:
    ContinueLearningData;

  summary:
    DashboardSummary;

  skillProgress:
    SkillProgressItem[];

  dailyPlan:
    DailyPlanItem[];

  recentActivities:
    RecentActivity[];
};