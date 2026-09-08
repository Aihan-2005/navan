import type {
  DashboardOverview,
  SkillProgress,
  SkillType,
} from "../../dashboard";

export type ProfileCoreSkill =
  | "listening"
  | "speaking"
  | "reading"
  | "writing";

export type ProfileSkillTone =
  | "blue"
  | "slate"
  | "purple"
  | "orange";

export type ProfileTrendPoint =
  Readonly<{
    label: string;
    value: number;
  }>;

export type ProfileBarPoint =
  Readonly<{
    label: string;
    value: number;
  }>;

export type ProfileSkillViewModel =
  Readonly<{
    skill:
      ProfileCoreSkill;

    label: string;

    score: number;

    delta: number | null;

    tone:
      ProfileSkillTone;
  }>;

export type ProfileRecentActivityViewModel =
  Readonly<{
    id: string;

    title: string;

    meta: string;

    skill:
      SkillType;

    href:
      string | null;
  }>;

export type ProfileProgressViewModel =
  Readonly<{
    learnerName: string;

    learningGoal:
      string | null;

    cefrLevel:
      string;

    overallProgress: number;

    overallDelta: number;

    weeklyMinutes: number;

    weeklyGoalMinutes: number;

    weeklyMinutesProgress:
      number;

    completedActivities: number;

    streakDays: number;

    trend:
      readonly ProfileTrendPoint[];

    trendTarget: number;

    skills:
      readonly ProfileSkillViewModel[];

    bestSkillLabel: string;

    vocabulary:
      Readonly<{
        score: number;

        completedActivities:
          number;

        reviewItems: number;

        practiceMinutes: number;

        weeks:
          readonly ProfileBarPoint[];
      }>;

    learningTime:
      Readonly<{
        totalMinutes: number;

        averageMinutes: number;

        days:
          readonly ProfileBarPoint[];
      }>;

    recentActivities:
      readonly ProfileRecentActivityViewModel[];

    insight:
      Readonly<{
        title: string;

        description: string;

        actionLabel: string;

        actionHref: string;
      }>;
  }>;

const CORE_SKILLS =
  [
    "listening",
    "speaking",
    "reading",
    "writing",
  ] as const satisfies
    readonly ProfileCoreSkill[];

const skillPresentation:
  Record<
    ProfileCoreSkill,
    Readonly<{
      label: string;
      tone:
        ProfileSkillTone;
    }>
  > = {
  listening: {
    label: "شنیداری",
    tone: "blue",
  },

  speaking: {
    label: "مکالمه",
    tone: "slate",
  },

  reading: {
    label: "خواندن",
    tone: "purple",
  },

  writing: {
    label: "نوشتاری",
    tone: "orange",
  },
};

const numberFormatter =
  new Intl.NumberFormat(
    "fa-IR",
  );

const dateFormatter =
  new Intl.DateTimeFormat(
    "fa-IR",
    {
      day: "numeric",
      month: "short",
    },
  );

function clamp(
  value: number,
  minimum: number,
  maximum: number,
): number {
  return Math.min(
    Math.max(
      value,
      minimum,
    ),
    maximum,
  );
}

function average(
  values:
    readonly number[],
): number {
  if (
    values.length === 0
  ) {
    return 0;
  }

  const total =
    values.reduce(
      (
        sum,
        current,
      ) =>
        sum + current,
      0,
    );

  return Math.round(
    total /
      values.length,
  );
}

function findSkill(
  overview:
    DashboardOverview,
  skill:
    SkillType,
): SkillProgress | undefined {
  return overview.skillProgress.find(
    (item) =>
      item.skill === skill,
  );
}

function buildTrend(
  currentScore: number,
  previousScore: number,
): readonly ProfileTrendPoint[] {
  const labels = [
    "هفته ۱",
    "هفته ۲",
    "هفته ۳",
    "هفته ۴",
    "هفته ۵",
    "هفته ۶",
    "هفته ۷",
    "هفته ۸",
  ] as const;

  const ratios = [
    0,
    0.16,
    0.1,
    0.36,
    0.54,
    0.49,
    0.76,
    1,
  ] as const;

  const start =
    clamp(
      Math.min(
        currentScore,
        previousScore,
      ) - 15,
      20,
      92,
    );

  const distance =
    currentScore - start;

  return labels.map(
    (
      label,
      index,
    ) => ({
      label,

      value:
        clamp(
          Math.round(
            start +
              distance *
                ratios[index],
          ),
          0,
          100,
        ),
    }),
  );
}

function distributeWeeklyMinutes(
  totalMinutes: number,
): readonly ProfileBarPoint[] {
  const labels = [
    "ش",
    "ی",
    "د",
    "س",
    "چ",
    "پ",
    "ج",
  ] as const;

  const weights = [
    0.11,
    0.15,
    0.09,
    0.21,
    0.16,
    0.13,
    0.15,
  ] as const;

  const values =
    weights.map(
      (weight) =>
        Math.floor(
          totalMinutes *
            weight,
        ),
    );

  let remaining =
    totalMinutes -
    values.reduce(
      (
        sum,
        value,
      ) => sum + value,
      0,
    );

  let index = 0;

  while (
    remaining > 0
  ) {
    values[index] += 1;

    remaining -= 1;

    index =
      (
        index + 1
      ) % values.length;
  }

  return labels.map(
    (
      label,
      dayIndex,
    ) => ({
      label,
      value:
        values[dayIndex],
    }),
  );
}

function buildVocabularyWeeks(
  completedActivities:
    number,
): readonly ProfileBarPoint[] {
  const ratios = [
    0.46,
    0.63,
    0.81,
    1,
  ] as const;

  return ratios.map(
    (
      ratio,
      index,
    ) => ({
      label:
        numberFormatter.format(
          index + 1,
        ),

      value:
        Math.round(
          completedActivities *
            ratio,
        ),
    }),
  );
}

function formatActivityMeta(
  score:
    number | null,
  durationMinutes:
    number,
  occurredAt:
    string,
): string {
  const parts:
    string[] = [];

  if (score !== null) {
    parts.push(
      `${numberFormatter.format(
        score,
      )}٪`,
    );
  }

  parts.push(
    `${numberFormatter.format(
      durationMinutes,
    )} دقیقه`,
  );

  parts.push(
    dateFormatter.format(
      new Date(
        occurredAt,
      ),
    ),
  );

  return parts.join(
    " • ",
  );
}

function buildRecentActivities(
  overview:
    DashboardOverview,
): readonly ProfileRecentActivityViewModel[] {
  const activities:
    ProfileRecentActivityViewModel[] =
      overview.recentActivities
        .slice(0, 5)
        .map(
          (activity) => ({
            id:
              activity.id,

            title:
              activity.title,

            meta:
              formatActivityMeta(
                activity.score,
                activity.durationMinutes,
                activity.occurredAt,
              ),

            skill:
              activity.skill,

            href:
              activity.href,
          }),
        );

  if (
    activities.length >=
    5
  ) {
    return activities;
  }

  for (
    const task
    of overview.dailyPlan.tasks
  ) {
    if (
      task.status !==
        "completed" &&
      task.status !==
        "in_progress"
    ) {
      continue;
    }

    const alreadyExists =
      activities.some(
        (activity) =>
          activity.title ===
          task.title,
      );

    if (alreadyExists) {
      continue;
    }

    activities.push({
      id:
        `daily-${task.id}`,

      title:
        task.title,

      meta:
        `${
          task.status ===
          "completed"
            ? "تکمیل شد"
            : "در حال انجام"
        } • ${numberFormatter.format(
          task.estimatedMinutes,
        )} دقیقه`,

      skill:
        task.skill,

      href:
        task.href,
    });

    if (
      activities.length ===
      5
    ) {
      break;
    }
  }

  return activities;
}

export function buildProfileProgress(
  overview:
    DashboardOverview,
): ProfileProgressViewModel {
  const coreSignals =
    CORE_SKILLS.map(
      (skill) => ({
        skill,
        signal:
          findSkill(
            overview,
            skill,
          ),
      }),
    );

  const currentScores =
    coreSignals
      .map(
        ({ signal }) =>
          signal?.score,
      )
      .filter(
        (
          score,
        ): score is number =>
          typeof score ===
          "number",
      );

  const previousScores =
    coreSignals
      .map(
        ({ signal }) =>
          signal?.previousScore,
      )
      .filter(
        (
          score,
        ): score is number =>
          typeof score ===
          "number",
      );

  const overallProgress =
    average(
      currentScores,
    );

  const previousProgress =
    previousScores.length > 0
      ? average(
          previousScores,
        )
      : overallProgress;

  const overallDelta =
    overallProgress -
    previousProgress;

  const weeklyMinutesProgress =
    clamp(
      Math.round(
        (
          overview.summary
            .weeklyCompletedMinutes /
          overview.summary
            .weeklyGoalMinutes
        ) * 100,
      ),
      0,
      100,
    );

  const skills:
    readonly ProfileSkillViewModel[] =
      coreSignals.map(
        ({
          skill,
          signal,
        }) => {
          const presentation =
            skillPresentation[
              skill
            ];

          return {
            skill,

            label:
              presentation.label,

            score:
              signal?.score ?? 0,

            delta:
              signal?.previousScore !==
                null &&
              signal?.previousScore !==
                undefined
                ? Math.round(
                    (
                      signal.score -
                      signal.previousScore
                    ) *
                      10,
                  ) / 10
                : null,

            tone:
              presentation.tone,
          };
        },
      );

  const bestSkill =
    [...skills].sort(
      (
        left,
        right,
      ) =>
        right.score -
        left.score,
    )[0];

  const vocabulary =
    findSkill(
      overview,
      "vocabulary",
    );

  const vocabularyActivities =
    vocabulary
      ?.completedActivities ??
    0;

  const vocabularyMinutes =
    vocabulary
      ?.totalPracticeMinutes ??
    0;

  const insight =
    overview.primaryInsight;

  return {
    learnerName:
      overview.user.firstName,

    learningGoal:
      overview.user.learningGoal,

    cefrLevel:
      overview.user.cefrLevel ??
      "—",

    overallProgress,

    overallDelta,

    weeklyMinutes:
      overview.summary
        .weeklyCompletedMinutes,

    weeklyGoalMinutes:
      overview.summary
        .weeklyGoalMinutes,

    weeklyMinutesProgress,

    completedActivities:
      overview.summary
        .completedActivitiesThisWeek,

    streakDays:
      overview.summary
        .streakDays,

    trend:
      buildTrend(
        overallProgress,
        previousProgress,
      ),

    trendTarget:
      clamp(
        Math.max(
          80,
          overallProgress + 8,
        ),
        0,
        100,
      ),

    skills,

    bestSkillLabel:
      bestSkill?.label ??
      "—",

    vocabulary: {
      score:
        vocabulary?.score ?? 0,

      completedActivities:
        vocabularyActivities,

      reviewItems:
        overview.reviewQueue
          .vocabularyCount,

      practiceMinutes:
        vocabularyMinutes,

      weeks:
        buildVocabularyWeeks(
          vocabularyActivities,
        ),
    },

    learningTime: {
      totalMinutes:
        overview.summary
          .weeklyCompletedMinutes,

      averageMinutes:
        Math.round(
          overview.summary
            .weeklyCompletedMinutes /
            7,
        ),

      days:
        distributeWeeklyMinutes(
          overview.summary
            .weeklyCompletedMinutes,
        ),
    },

    recentActivities:
      buildRecentActivities(
        overview,
      ),

    insight: {
      title:
        insight?.title ??
        "یک تمرین کوتاه برای امروز",

      description:
        insight?.description ??
        "با چند دقیقه تمرین هدفمند می‌توانی روند یادگیری این هفته را حفظ کنی.",

      actionLabel:
        insight?.actionLabel ??
        "شروع تمرین پیشنهادی",

      actionHref:
        insight?.actionHref ??
        "/daily-practice",
    },
  };
}
