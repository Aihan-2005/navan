import Link from "next/link";

import {
  ArrowLeft,
  BarChart3,
  BookOpenText,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Flame,
  Headphones,
  Languages,
  MessageCircle,
  PenLine,
  Sparkles,
  Target,
  Trophy,
  type LucideIcon,
} from "lucide-react";

import type {
  ProfileBarPoint,
  ProfileCoreSkill,
  ProfileProgressViewModel,
  ProfileSkillTone,
  ProfileSkillViewModel,
  ProfileTrendPoint,
} from "../lib/build-profile-progress";

type ProfileProgressOverviewProps =
  Readonly<{
    data:
      ProfileProgressViewModel;
  }>;

const numberFormatter =
  new Intl.NumberFormat(
    "fa-IR",
  );

const skillIcons:
  Record<
    ProfileCoreSkill,
    LucideIcon
  > = {
  listening:
    Headphones,

  speaking:
    MessageCircle,

  reading:
    BookOpenText,

  writing:
    PenLine,
};

const skillStyles:
  Record<
    ProfileSkillTone,
    Readonly<{
      iconSurface: string;
      iconColor: string;
      progress: string;
      border: string;
    }>
  > = {
  blue: {
    iconSurface:
      "bg-[#EAF2FF]",

    iconColor:
      "text-[#2563EB]",

    progress:
      "bg-[#3B82F6]",

    border:
      "border-[#D9E6FF]",
  },

  slate: {
    iconSurface:
      "bg-[#EFF2F2]",

    iconColor:
      "text-[#374746]",

    progress:
      "bg-[#374746]",

    border:
      "border-[#DFE5E4]",
  },

  purple: {
    iconSurface:
      "bg-[#F4EFFF]",

    iconColor:
      "text-[#9333EA]",

    progress:
      "bg-[#B13BFF]",

    border:
      "border-[#E8D8FA]",
  },

  orange: {
    iconSurface:
      "bg-[#FFF1E8]",

    iconColor:
      "text-[#F97316]",

    progress:
      "bg-[#FF6B00]",

    border:
      "border-[#FFE1CC]",
  },
};

function formatNumber(
  value: number,
): string {
  return numberFormatter.format(
    value,
  );
}

function formatMinutes(
  minutes: number,
): string {
  const hours =
    Math.floor(
      minutes / 60,
    );

  const remaining =
    minutes % 60;

  if (
    hours === 0
  ) {
    return `${formatNumber(
      remaining,
    )} دقیقه`;
  }

  if (
    remaining === 0
  ) {
    return `${formatNumber(
      hours,
    )} ساعت`;
  }

  return `${formatNumber(
    hours,
  )} ساعت و ${formatNumber(
    remaining,
  )} دقیقه`;
}

export function ProfileProgressOverview({
  data,
}: ProfileProgressOverviewProps) {
  return (
    <main
      dir="rtl"
      className="
        mx-auto
        w-full
        max-w-[1040px]
        space-y-6
        pb-12
      "
      aria-labelledby="progress-page-title"
    >
      <header
        className="
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >
        <div>
          <h1
            id="progress-page-title"
            className="
              text-2xl
              font-black
              text-[#191C1E]
              sm:text-3xl
            "
          >
            پیشرفت من
          </h1>

          <p
            className="
              mt-2
              text-xs
              leading-6
              text-[#6D7A77]
              sm:text-sm
            "
          >
            روند یادگیری زبان را ببین و
            از پیشرفتت انگیزه بگیر.
            {data.learningGoal
              ? ` هدف فعلی: ${data.learningGoal}`
              : ""}
          </p>
        </div>

        <div
          aria-label="بازه گزارش"
          className="
            inline-flex
            w-fit
            items-center
            rounded-full
            border
            border-[#DCE4E3]
            bg-white
            p-1
          "
        >
          <span
            className="
              rounded-full
              bg-[#EFF3F2]
              px-4
              py-2
              text-[11px]
              font-bold
              text-[#191C1E]
            "
          >
            این هفته
          </span>

          <span
            className="
              px-4
              py-2
              text-[11px]
              text-[#6D7A77]
            "
          >
            این ماه
          </span>

          <span
            className="
              px-4
              py-2
              text-[11px]
              text-[#6D7A77]
            "
          >
            سه ماه اخیر
          </span>
        </div>
      </header>

      <section
        aria-label="خلاصه پیشرفت"
        className="
          grid
          gap-4
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        <MetricCard
          icon={Target}
          label="پیشرفت کلی"
          value={`${formatNumber(
            data.overallProgress,
          )}٪`}
          subtitle={
            data.overallDelta >= 0
              ? `+${formatNumber(
                  data.overallDelta,
                )}٪ نسبت به دوره قبل`
              : `${formatNumber(
                  data.overallDelta,
                )}٪ نسبت به دوره قبل`
          }
          tone="slate"
          progress={
            data.overallProgress
          }
        />

        <MetricCard
          icon={Clock3}
          label="زمان یادگیری"
          value={formatMinutes(
            data.weeklyMinutes,
          )}
          subtitle={`هدف هفتگی: ${formatMinutes(
            data.weeklyGoalMinutes,
          )}`}
          tone="blue"
          progress={
            data.weeklyMinutesProgress
          }
        />

        <MetricCard
          icon={Trophy}
          label="تمرین‌های انجام‌شده"
          value={`${formatNumber(
            data.completedActivities,
          )} تمرین`}
          subtitle="فعالیت‌های تکمیل‌شده این هفته"
          tone="purple"
          progress={Math.min(
            100,
            data.completedActivities *
              5,
          )}
        />

        <MetricCard
          icon={Flame}
          label="تداوم یادگیری"
          value={`${formatNumber(
            data.streakDays,
          )} روز`}
          subtitle={
            data.streakDays < 15
              ? `${formatNumber(
                  15 -
                    data.streakDays,
                )} روز تا رکورد ۱۵ روزه`
              : "روند یادگیریت عالیه"
          }
          tone="orange"
          progress={Math.min(
            100,
            (
              data.streakDays /
              15
            ) * 100,
          )}
        />
      </section>

      <section
        className="
          rounded-2xl
          border
          border-[#DCE4E3]
          bg-white
          p-5
          shadow-[0_6px_22px_rgba(15,23,42,0.035)]
          sm:p-6
        "
      >
        <div
          className="
            flex
            flex-col
            gap-3
            sm:flex-row
            sm:items-start
            sm:justify-between
          "
        >
          <div>
            <h2
              className="
                text-base
                font-black
                text-[#191C1E]
              "
            >
              روند پیشرفت یادگیری
            </h2>

            <p
              className="
                mt-1
                text-[11px]
                text-[#6D7A77]
              "
            >
              تغییر امتیاز کلی در چند
              دوره اخیر
            </p>
          </div>

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-4
              text-[10px]
              text-[#6D7A77]
            "
          >
            <span
              className="
                inline-flex
                items-center
                gap-2
              "
            >
              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-[#009B8F]
                "
              />

              پیشرفت من
            </span>

            <span
              className="
                inline-flex
                items-center
                gap-2
              "
            >
              <span
                className="
                  h-0
                  w-5
                  border-t
                  border-dashed
                  border-[#F59E0B]
                "
              />

              هدف هفتگی
            </span>
          </div>
        </div>

        <ProgressLineChart
          points={data.trend}
          target={
            data.trendTarget
          }
        />
      </section>

      <section
        className="
          rounded-2xl
          border
          border-[#DCE4E3]
          bg-white
          p-5
          shadow-[0_6px_22px_rgba(15,23,42,0.035)]
          sm:p-6
        "
      >
        <div>
          <h2
            className="
              text-base
              font-black
              text-[#191C1E]
            "
          >
            پیشرفت مهارت‌ها
          </h2>

          <p
            className="
              mt-1
              text-[11px]
              text-[#6D7A77]
            "
          >
            عملکردت در چهار مهارت اصلی
            زبان
          </p>
        </div>

        <div
          className="
            mt-5
            grid
            gap-4
            md:grid-cols-2
          "
        >
          {data.skills.map(
            (skill) => (
              <SkillProgressCard
                key={skill.skill}
                skill={skill}
              />
            ),
          )}
        </div>

        <div
          className="
            mt-5
            flex
            flex-col
            gap-3
            border-t
            border-[#E7ECEB]
            pt-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div>
            <p
              className="
                text-[10px]
                text-[#6D7A77]
              "
            >
              بهترین مهارت من
            </p>

            <p
              className="
                mt-1
                text-xs
                font-black
                text-[#191C1E]
              "
            >
              {data.bestSkillLabel}
            </p>
          </div>

          <Link
            href="/assessment"
            className="
              inline-flex
              items-center
              gap-1
              text-xs
              font-bold
              text-[#00685F]
              transition
              hover:text-[#004E47]
            "
          >
            تمرین هدفمند بیشتر

            <ArrowLeft
              aria-hidden="true"
              className="h-3.5 w-3.5"
            />
          </Link>
        </div>
      </section>

      <VocabularyProgressCard
        data={
          data.vocabulary
        }
      />

      <section
        className="
          grid
          gap-5
          lg:grid-cols-2
        "
      >
        <LearningTimeCard
          totalMinutes={
            data.learningTime
              .totalMinutes
          }
          averageMinutes={
            data.learningTime
              .averageMinutes
          }
          days={
            data.learningTime.days
          }
        />

        <RecentActivitiesCard
          activities={
            data.recentActivities
          }
        />
      </section>

      <section
        className="
          flex
          flex-col
          gap-5
          rounded-2xl
          bg-[#EEF2F2]
          p-5
          sm:p-6
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <div
          className="
            flex
            items-start
            gap-4
          "
        >
          <span
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[#00685F]
              text-white
              shadow-[0_6px_18px_rgba(0,104,95,0.18)]
            "
          >
            <Sparkles
              aria-hidden="true"
              className="h-5 w-5"
            />
          </span>

          <div>
            <p
              className="
                text-[10px]
                font-bold
                text-[#00685F]
              "
            >
              پیشنهاد Navan AI
            </p>

            <h2
              className="
                mt-1
                text-sm
                font-black
                text-[#191C1E]
                sm:text-base
              "
            >
              {data.insight.title}
            </h2>

            <p
              className="
                mt-2
                max-w-2xl
                text-xs
                leading-6
                text-[#596765]
              "
            >
              {data.insight.description}
            </p>
          </div>
        </div>

        <div
          className="
            flex
            shrink-0
            flex-wrap
            gap-2
          "
        >
          <Link
            href={
              data.insight
                .actionHref
            }
            className="
              inline-flex
              min-h-10
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-[#00685F]
              px-4
              text-xs
              font-bold
              text-white
              transition
              hover:bg-[#005A52]
            "
          >
            {data.insight.actionLabel}

            <ArrowLeft
              aria-hidden="true"
              className="h-3.5 w-3.5"
            />
          </Link>

          <Link
            href="/dashboard"
            className="
              inline-flex
              min-h-10
              items-center
              justify-center
              rounded-lg
              border
              border-[#CBD5D3]
              bg-white
              px-4
              text-xs
              font-medium
              text-[#52615F]
              transition
              hover:bg-[#F8FAF9]
            "
          >
            بعداً انجام می‌دهم
          </Link>
        </div>
      </section>
    </main>
  );
}

type MetricTone =
  | "slate"
  | "blue"
  | "purple"
  | "orange";

const metricStyles:
  Record<
    MetricTone,
    Readonly<{
      border: string;
      iconSurface: string;
      iconColor: string;
      progress: string;
    }>
  > = {
  slate: {
    border:
      "border-r-[#374746]",

    iconSurface:
      "bg-[#EEF1F1]",

    iconColor:
      "text-[#374746]",

    progress:
      "bg-[#374746]",
  },

  blue: {
    border:
      "border-r-[#2563EB]",

    iconSurface:
      "bg-[#EAF2FF]",

    iconColor:
      "text-[#2563EB]",

    progress:
      "bg-[#2563EB]",
  },

  purple: {
    border:
      "border-r-[#7C3AED]",

    iconSurface:
      "bg-[#F3ECFF]",

    iconColor:
      "text-[#7C3AED]",

    progress:
      "bg-[#7C3AED]",
  },

  orange: {
    border:
      "border-r-[#F97316]",

    iconSurface:
      "bg-[#FFF1E7]",

    iconColor:
      "text-[#F97316]",

    progress:
      "bg-[#F97316]",
  },
};

function MetricCard({
  icon: Icon,
  label,
  value,
  subtitle,
  tone,
  progress,
}: Readonly<{
  icon: LucideIcon;

  label: string;

  value: string;

  subtitle: string;

  tone: MetricTone;

  progress: number;
}>) {
  const style =
    metricStyles[tone];

  return (
    <article
      className={`
        relative
        overflow-hidden
        rounded-2xl
        border
        border-[#DCE4E3]
        border-r-[3px]
        bg-white
        p-5
        shadow-[0_5px_18px_rgba(15,23,42,0.035)]
        ${style.border}
      `}
    >
      <div
        className="
          flex
          items-start
          justify-between
          gap-3
        "
      >
        <div>
          <p
            className="
              text-[10px]
              text-[#6D7A77]
            "
          >
            {label}
          </p>

          <p
            className="
              mt-3
              text-xl
              font-black
              text-[#191C1E]
            "
          >
            {value}
          </p>
        </div>

        <span
          className={`
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            ${style.iconSurface}
            ${style.iconColor}
          `}
        >
          <Icon
            aria-hidden="true"
            className="h-4 w-4"
          />
        </span>
      </div>

      <p
        className="
          mt-3
          min-h-5
          text-[9px]
          leading-5
          text-[#6D7A77]
        "
      >
        {subtitle}
      </p>

      <div
        className="
          mt-3
          h-1
          overflow-hidden
          rounded-full
          bg-[#EEF2F1]
        "
      >
        <div
          className={`
            h-full
            rounded-full
            ${style.progress}
          `}
          style={{
            width:
              `${Math.max(
                0,
                Math.min(
                  100,
                  progress,
                ),
              )}%`,
          }}
        />
      </div>
    </article>
  );
}

function ProgressLineChart({
  points,
  target,
}: Readonly<{
  points:
    readonly ProfileTrendPoint[];

  target: number;
}>) {
  const width = 760;
  const height = 250;

  const padding = {
    top: 22,
    right: 24,
    bottom: 48,
    left: 48,
  };

  const plotWidth =
    width -
    padding.left -
    padding.right;

  const plotHeight =
    height -
    padding.top -
    padding.bottom;

  function getX(
    index: number,
  ): number {
    if (
      points.length <= 1
    ) {
      return (
        padding.left +
        plotWidth / 2
      );
    }

    return (
      padding.left +
      (
        index /
        (
          points.length -
          1
        )
      ) *
        plotWidth
    );
  }

  function getY(
    value: number,
  ): number {
    return (
      padding.top +
      (
        (
          100 -
          value
        ) /
        100
      ) *
        plotHeight
    );
  }

  const normalizedPoints =
    points.map(
      (
        point,
        index,
      ) => ({
        ...point,

        x:
          getX(index),

        y:
          getY(
            point.value,
          ),
      }),
    );

  const polyline =
    normalizedPoints
      .map(
        (point) =>
          `${point.x},${point.y}`,
      )
      .join(" ");

  const ticks = [
    25,
    50,
    75,
    100,
  ] as const;

  return (
    <figure
      className="
        mt-5
        overflow-x-auto
      "
    >
      <svg
        role="img"
        aria-label="نمودار روند پیشرفت یادگیری"
        viewBox={`0 0 ${width} ${height}`}
        className="
          h-auto
          min-w-[620px]
          w-full
        "
      >
        {ticks.map(
          (tick) => {
            const y =
              getY(tick);

            return (
              <g key={tick}>
                <line
                  x1={
                    padding.left
                  }
                  x2={
                    width -
                    padding.right
                  }
                  y1={y}
                  y2={y}
                  stroke="#E6ECEB"
                  strokeWidth="1"
                  strokeDasharray="3 4"
                />

                <text
                  x="20"
                  y={y + 3}
                  fill="#8A9795"
                  fontSize="9"
                  textAnchor="middle"
                >
                  {formatNumber(
                    tick,
                  )}
                </text>
              </g>
            );
          },
        )}

        <line
          x1={padding.left}
          x2={
            width -
            padding.right
          }
          y1={getY(target)}
          y2={getY(target)}
          stroke="#F59E0B"
          strokeWidth="1.5"
          strokeDasharray="6 5"
        />

        <polyline
          points={polyline}
          fill="none"
          stroke="#009B8F"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {normalizedPoints.map(
          (point) => (
            <g key={point.label}>
              <circle
                cx={point.x}
                cy={point.y}
                r="4"
                fill="#009B8F"
              />

              <circle
                cx={point.x}
                cy={point.y}
                r="2"
                fill="#FFFFFF"
              />

              <text
                x={point.x}
                y={
                  height - 15
                }
                fill="#65726F"
                fontSize="8"
                textAnchor="middle"
              >
                {point.label}
              </text>
            </g>
          ),
        )}
      </svg>

      <figcaption className="sr-only">
        نمودار تغییر امتیاز پیشرفت
        کاربر در هشت دوره اخیر.
      </figcaption>
    </figure>
  );
}

function SkillProgressCard({
  skill,
}: Readonly<{
  skill:
    ProfileSkillViewModel;
}>) {
  const style =
    skillStyles[
      skill.tone
    ];

  const Icon =
    skillIcons[
      skill.skill
    ];

  return (
    <article
      className={`
        rounded-xl
        border
        bg-[#FCFDFD]
        p-4
        ${style.border}
      `}
    >
      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div
          className="
            flex
            items-center
            gap-2.5
          "
        >
          <span
            className={`
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              ${style.iconSurface}
              ${style.iconColor}
            `}
          >
            <Icon
              aria-hidden="true"
              className="h-4 w-4"
            />
          </span>

          <div>
            <p
              className="
                text-xs
                font-black
                text-[#191C1E]
              "
            >
              {skill.label}
            </p>
          </div>
        </div>

        <div className="text-left">
          <strong
            className="
              text-base
              font-black
              text-[#191C1E]
            "
          >
            {formatNumber(
              skill.score,
            )}
            ٪
          </strong>

          {skill.delta !== null ? (
            <p
              className="
                mt-1
                text-[9px]
                font-bold
                text-[#0D9B69]
              "
            >
              {skill.delta >= 0
                ? "+"
                : ""}
              {formatNumber(
                skill.delta,
              )}
              ٪
            </p>
          ) : null}
        </div>
      </div>

      <div
        className="
          mt-4
          h-1.5
          overflow-hidden
          rounded-full
          bg-[#EBEFEE]
        "
      >
        <div
          className={`
            h-full
            rounded-full
            ${style.progress}
          `}
          style={{
            width:
              `${skill.score}%`,
          }}
        />
      </div>
    </article>
  );
}

function VocabularyProgressCard({
  data,
}: Readonly<{
  data:
    ProfileProgressViewModel[
      "vocabulary"
    ];
}>) {
  return (
    <section
      className="
        rounded-2xl
        border
        border-[#DCE4E3]
        bg-white
        p-5
        shadow-[0_6px_22px_rgba(15,23,42,0.035)]
        sm:p-6
      "
    >
      <h2
        className="
          text-base
          font-black
          text-[#191C1E]
        "
      >
        پیشرفت واژگان
      </h2>

      <div
        className="
          mt-5
          grid
          gap-7
          lg:grid-cols-[minmax(0,1fr)_320px]
          lg:items-center
        "
      >
        <div>
          <div
            className="
              flex
              items-end
              gap-2
            "
          >
            <strong
              className="
                text-3xl
                font-black
                text-[#191C1E]
              "
            >
              {formatNumber(
                data.score,
              )}
              ٪
            </strong>

            <span
              className="
                pb-1
                text-[10px]
                text-[#8A9795]
              "
            >
              امتیاز واژگان
            </span>
          </div>

          <ul
            className="
              mt-5
              space-y-3
              text-xs
              text-[#52615F]
            "
          >
            <VocabularyStat
              value={`${formatNumber(
                data.completedActivities,
              )} فعالیت تکمیل‌شده`}
            />

            <VocabularyStat
              value={`${formatNumber(
                data.reviewItems,
              )} مورد در صف مرور`}
            />

            <VocabularyStat
              value={`${formatMinutes(
                data.practiceMinutes,
              )} تمرین واژگان`}
            />
          </ul>

          <Link
            href="/vocabulary"
            className="
              mt-5
              inline-flex
              items-center
              gap-1.5
              text-xs
              font-bold
              text-[#00685F]
              hover:text-[#005A52]
            "
          >
            مرور واژگان

            <ArrowLeft
              aria-hidden="true"
              className="h-3.5 w-3.5"
            />
          </Link>
        </div>

        <div
          className="
            border-t
            border-[#E5EBEA]
            pt-5
            lg:border-r
            lg:border-t-0
            lg:pr-7
            lg:pt-0
          "
        >
          <p
            className="
              text-[10px]
              text-[#6D7A77]
            "
          >
            روند فعالیت واژگان
          </p>

          <MiniBarChart
            points={data.weeks}
            maxHeight={120}
          />
        </div>
      </div>
    </section>
  );
}

function VocabularyStat({
  value,
}: Readonly<{
  value: string;
}>) {
  return (
    <li
      className="
        flex
        items-center
        gap-2
      "
    >
      <span
        className="
          h-1.5
          w-1.5
          shrink-0
          rounded-full
          bg-[#394744]
        "
      />

      {value}
    </li>
  );
}

function LearningTimeCard({
  totalMinutes,
  averageMinutes,
  days,
}: Readonly<{
  totalMinutes: number;

  averageMinutes: number;

  days:
    readonly ProfileBarPoint[];
}>) {
  return (
    <section
      className="
        rounded-2xl
        border
        border-[#DCE4E3]
        bg-white
        p-5
        shadow-[0_6px_22px_rgba(15,23,42,0.035)]
      "
    >
      <h2
        className="
          text-base
          font-black
          text-[#191C1E]
        "
      >
        زمان یادگیری
      </h2>

      <MiniBarChart
        points={days}
        maxHeight={130}
      />

      <div
        className="
          mt-4
          border-t
          border-[#E6ECEB]
          pt-4
        "
      >
        <p
          className="
            text-[10px]
            text-[#6D7A77]
          "
        >
          مجموع این هفته
        </p>

        <p
          className="
            mt-1
            text-sm
            font-black
            text-[#191C1E]
          "
        >
          {formatMinutes(
            totalMinutes,
          )}
        </p>

        <p
          className="
            mt-1
            text-[10px]
            text-[#6D7A77]
          "
        >
          میانگین روزانه:{" "}
          {formatNumber(
            averageMinutes,
          )}{" "}
          دقیقه
        </p>
      </div>
    </section>
  );
}

function MiniBarChart({
  points,
  maxHeight,
}: Readonly<{
  points:
    readonly ProfileBarPoint[];

  maxHeight: number;
}>) {
  const maximum =
    Math.max(
      ...points.map(
        (point) =>
          point.value,
      ),
      1,
    );

  return (
    <div
      className="
        mt-5
        flex
        h-[165px]
        items-end
        justify-center
        gap-3
      "
    >
      {points.map(
        (point) => {
          const height =
            Math.max(
              10,
              (
                point.value /
                maximum
              ) *
                maxHeight,
            );

          return (
            <div
              key={point.label}
              className="
                flex
                h-full
                flex-1
                flex-col
                items-center
                justify-end
                gap-2
              "
            >
              <span
                className="
                  text-[8px]
                  text-[#7C8987]
                "
              >
                {formatNumber(
                  point.value,
                )}
              </span>

              <div
                className="
                  w-full
                  max-w-10
                  rounded-t-md
                  bg-[#009B8F]
                  transition-[height]
                "
                style={{
                  height:
                    `${height}px`,
                }}
              />

              <span
                className="
                  text-[9px]
                  text-[#65726F]
                "
              >
                {point.label}
              </span>
            </div>
          );
        },
      )}
    </div>
  );
}

function RecentActivitiesCard({
  activities,
}: Readonly<{
  activities:
    ProfileProgressViewModel[
      "recentActivities"
    ];
}>) {
  return (
    <section
      className="
        rounded-2xl
        border
        border-[#DCE4E3]
        bg-white
        p-5
        shadow-[0_6px_22px_rgba(15,23,42,0.035)]
      "
    >
      <h2
        className="
          text-base
          font-black
          text-[#191C1E]
        "
      >
        فعالیت‌های اخیر
      </h2>

      <div
        className="
          mt-4
          divide-y
          divide-[#ECF0EF]
        "
      >
        {activities.map(
          (activity) => (
            <RecentActivityRow
              key={activity.id}
              activity={
                activity
              }
            />
          ),
        )}
      </div>

      <Link
        href="/daily-practice"
        className="
          mt-4
          inline-flex
          items-center
          gap-1
          text-[10px]
          font-bold
          text-[#394744]
          transition
          hover:text-[#00685F]
        "
      >
        مشاهده همه فعالیت‌ها

        <ArrowLeft
          aria-hidden="true"
          className="h-3 w-3"
        />
      </Link>
    </section>
  );
}

function getActivityIcon(
  skill:
    ProfileProgressViewModel[
      "recentActivities"
    ][number]["skill"],
): LucideIcon {
  switch (skill) {
    case "listening":
      return Headphones;

    case "speaking":
      return MessageCircle;

    case "reading":
      return BookOpenText;

    case "writing":
      return PenLine;

    case "vocabulary":
      return Languages;

    case "grammar":
      return BrainCircuit;
  }
}

function RecentActivityRow({
  activity,
}: Readonly<{
  activity:
    ProfileProgressViewModel[
      "recentActivities"
    ][number];
}>) {
  const Icon =
    getActivityIcon(
      activity.skill,
    );

  const content = (
    <>
      <span
        className="
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-[#F1F4F4]
          text-[#53625F]
        "
      >
        <Icon
          aria-hidden="true"
          className="h-3.5 w-3.5"
        />
      </span>

      <span
        className="
          min-w-0
          flex-1
        "
      >
        <span
          className="
            block
            truncate
            text-xs
            font-bold
            text-[#191C1E]
          "
        >
          {activity.title}
        </span>

        <span
          className="
            mt-1
            block
            truncate
            text-[9px]
            text-[#7C8987]
          "
        >
          {activity.meta}
        </span>
      </span>

      <CheckCircle2
        aria-hidden="true"
        className="
          h-4
          w-4
          shrink-0
          text-[#0D9B69]
        "
      />
    </>
  );

  if (activity.href) {
    return (
      <Link
        href={activity.href}
        className="
          flex
          items-center
          gap-3
          py-3
          transition
          hover:bg-[#FAFCFB]
        "
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      className="
        flex
        items-center
        gap-3
        py-3
      "
    >
      {content}
    </div>
  );
}