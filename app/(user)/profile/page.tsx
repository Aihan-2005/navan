import type {
  Metadata,
} from "next";

import Link from "next/link";

import {
  ArrowLeft,
  BookOpenText,
  Clock3,
  Flame,
  GraduationCap,
  Headphones,
  Languages,
  Mic2,
  Target,
  UserRound,
} from "lucide-react";

import {
  Card,
} from "../../../components/ui/card";

import {
  Progress,
} from "../../../components/ui/progress";

import {
  getDashboardOverview,
} from "../../../features/dashboard";

export const metadata: Metadata = {
  title: "پروفایل من",
  description:
    "مشاهده اطلاعات حساب، زبان هدف و خلاصه پیشرفت یادگیری",
};

const numberFormatter =
  new Intl.NumberFormat("fa-IR");

function formatNumber(
  value: number,
): string {
  return numberFormatter.format(
    value,
  );
}

function calculateProgress(
  completed: number,
  goal: number,
): number {
  if (goal <= 0) {
    return 0;
  }

  return Math.min(
    Math.round(
      (completed / goal) * 100,
    ),
    100,
  );
}

function getInitials(
  firstName: string,
  lastName: string | null,
): string {
  const firstInitial =
    Array.from(
      firstName.trim(),
    )[0] ?? "";

  const lastInitial =
    lastName
      ? Array.from(
          lastName.trim(),
        )[0] ?? ""
      : "";

  return (
    firstInitial + lastInitial
  ).toUpperCase();
}

export default async function ProfilePage() {
  const dashboard =
    await getDashboardOverview();

  const {
    user,
    summary,
    skillProgress,
  } = dashboard;

  const fullName = [
    user.firstName,
    user.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  const initials =
    getInitials(
      user.firstName,
      user.lastName,
    );

  const dailyProgress =
    calculateProgress(
      summary.todayCompletedMinutes,
      summary.dailyGoalMinutes,
    );

  const weeklyProgress =
    calculateProgress(
      summary.weeklyCompletedMinutes,
      summary.weeklyGoalMinutes,
    );

  return (
    <main
      className="
        mx-auto w-full
        max-w-7xl space-y-6
      "
      aria-labelledby="profile-page-title"
    >
      <section
        className="
          relative overflow-hidden
          rounded-3xl border
          border-cyan-400/15
          bg-white/[0.035]
          p-6 sm:p-8
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -left-24 -top-24
            h-64 w-64
            rounded-full
            bg-cyan-500/15
            blur-3xl
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -bottom-24 right-16
            h-56 w-56
            rounded-full
            bg-violet-500/10
            blur-3xl
          "
        />

        <div
          className="
            relative flex
            flex-col gap-6
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          <div
            className="
              flex flex-col
              gap-5
              sm:flex-row
              sm:items-center
            "
          >
            <div
              className="
                flex h-24 w-24
                shrink-0 items-center
                justify-center
                rounded-3xl
                border
                border-cyan-300/20
                bg-gradient-to-br
                from-cyan-400/20
                to-blue-500/20
                text-3xl
                font-black
                text-cyan-100
                shadow-lg
                shadow-cyan-950/20
              "
              aria-label={`تصویر پروفایل ${fullName}`}
            >
              {initials || (
                <UserRound
                  aria-hidden="true"
                  className="h-10 w-10"
                />
              )}
            </div>

            <div>
              <p
                className="
                  text-sm font-medium
                  text-cyan-300
                "
              >
                پروفایل یادگیری
              </p>

              <h1
                id="profile-page-title"
                className="
                  mt-2 text-3xl
                  font-bold text-white
                  sm:text-4xl
                "
              >
                {fullName}
              </h1>

              <div
                className="
                  mt-4 flex
                  flex-wrap gap-2
                "
              >
                <span
                  className="
                    inline-flex
                    items-center gap-1.5
                    rounded-full
                    bg-white/[0.05]
                    px-3 py-1.5
                    text-xs
                    text-slate-400
                  "
                >
                  <Languages
                    aria-hidden="true"
                    className="h-3.5 w-3.5"
                  />

                  زبان هدف:
                  <strong
                    className="
                      font-medium
                      text-slate-200
                    "
                  >
                    {
                      user.targetLanguage
                        .name
                    }
                  </strong>
                </span>

                <span
                  className="
                    inline-flex
                    items-center gap-1.5
                    rounded-full
                    bg-white/[0.05]
                    px-3 py-1.5
                    text-xs
                    text-slate-400
                  "
                >
                  <GraduationCap
                    aria-hidden="true"
                    className="h-3.5 w-3.5"
                  />

                  سطح:
                  <strong
                    className="
                      font-medium
                      text-slate-200
                    "
                  >
                    {user.cefrLevel ??
                      "نامشخص"}
                  </strong>
                </span>
              </div>
            </div>
          </div>

          <Link
            href="/dashboard"
            className="
              inline-flex min-h-11
              items-center
              justify-center gap-2
              rounded-xl border
              border-white/[0.08]
              bg-white/[0.04]
              px-4 py-2.5
              text-sm font-medium
              text-slate-300
              transition
              hover:bg-white/[0.08]
              hover:text-white
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-cyan-300
            "
          >
            بازگشت به داشبورد

            <ArrowLeft
              aria-hidden="true"
              className="h-4 w-4"
            />
          </Link>
        </div>
      </section>

      <section
        aria-label="اطلاعات یادگیری"
        className="
          grid gap-4
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        <Card className="p-5">
          <div
            className="
              flex h-10 w-10
              items-center
              justify-center
              rounded-xl
              bg-cyan-400/10
              text-cyan-300
            "
          >
            <GraduationCap
              aria-hidden="true"
              className="h-5 w-5"
            />
          </div>

          <p
            className="
              mt-4 text-xs
              text-slate-500
            "
          >
            سطح فعلی
          </p>

          <p
            className="
              mt-1 text-2xl
              font-bold text-white
            "
          >
            {user.cefrLevel ??
              "نامشخص"}
          </p>

          <p
            className="
              mt-2 text-xs
              leading-6
              text-slate-600
            "
          >
            سطح زبان{" "}
            {
              user.targetLanguage.name
            }
          </p>
        </Card>

        <Card className="p-5">
          <div
            className="
              flex h-10 w-10
              items-center
              justify-center
              rounded-xl
              bg-orange-400/10
              text-orange-300
            "
          >
            <Flame
              aria-hidden="true"
              className="h-5 w-5"
            />
          </div>

          <p
            className="
              mt-4 text-xs
              text-slate-500
            "
          >
            استمرار یادگیری
          </p>

          <p
            className="
              mt-1 text-2xl
              font-bold text-white
            "
          >
            {formatNumber(
              summary.streakDays,
            )}{" "}
            روز
          </p>

          <p
            className="
              mt-2 text-xs
              leading-6
              text-slate-600
            "
          >
            روزهای متوالی تمرین
          </p>
        </Card>

        <Card className="p-5">
          <div
            className="
              flex h-10 w-10
              items-center
              justify-center
              rounded-xl
              bg-violet-400/10
              text-violet-300
            "
          >
            <Clock3
              aria-hidden="true"
              className="h-5 w-5"
            />
          </div>

          <p
            className="
              mt-4 text-xs
              text-slate-500
            "
          >
            تمرین این هفته
          </p>

          <p
            className="
              mt-1 text-2xl
              font-bold text-white
            "
          >
            {formatNumber(
              summary.weeklyCompletedMinutes,
            )}{" "}
            دقیقه
          </p>

          <p
            className="
              mt-2 text-xs
              leading-6
              text-slate-600
            "
          >
            مجموع زمان یادگیری
          </p>
        </Card>

        <Card className="p-5">
          <div
            className="
              flex h-10 w-10
              items-center
              justify-center
              rounded-xl
              bg-emerald-400/10
              text-emerald-300
            "
          >
            <Target
              aria-hidden="true"
              className="h-5 w-5"
            />
          </div>

          <p
            className="
              mt-4 text-xs
              text-slate-500
            "
          >
            فعالیت‌های هفته
          </p>

          <p
            className="
              mt-1 text-2xl
              font-bold text-white
            "
          >
            {formatNumber(
              summary.completedActivitiesThisWeek,
            )}
          </p>

          <p
            className="
              mt-2 text-xs
              leading-6
              text-slate-600
            "
          >
            فعالیت تکمیل‌شده
          </p>
        </Card>
      </section>

      <section
        className="
          grid gap-6
          lg:grid-cols-12
        "
      >
        <Card
          className="
            p-5 sm:p-6
            lg:col-span-7
          "
        >
          <div
            className="
              flex items-start
              justify-between gap-4
            "
          >
            <div>
              <h2
                className="
                  text-lg font-bold
                  text-white
                "
              >
                هدف‌های یادگیری
              </h2>

              <p
                className="
                  mt-1 text-xs
                  leading-6
                  text-slate-500
                "
              >
                وضعیت پیشرفت روزانه و
                هفتگی تو
              </p>
            </div>

            <Target
              aria-hidden="true"
              className="
                h-5 w-5
                text-cyan-300
              "
            />
          </div>

          <div
            className="
              mt-6 space-y-6
            "
          >
            <div>
              <div
                className="
                  flex items-center
                  justify-between
                  gap-4
                "
              >
                <span
                  className="
                    text-sm
                    text-slate-300
                  "
                >
                  هدف امروز
                </span>

                <span
                  className="
                    text-xs
                    text-slate-500
                  "
                >
                  {formatNumber(
                    summary.todayCompletedMinutes,
                  )}{" "}
                  /{" "}
                  {formatNumber(
                    summary.dailyGoalMinutes,
                  )}{" "}
                  دقیقه
                </span>
              </div>

              <Progress
                value={dailyProgress}
                label="پیشرفت هدف روزانه"
                className="mt-3"
              />

              <p
                className="
                  mt-2 text-xs
                  text-slate-600
                "
              >
                {formatNumber(
                  dailyProgress,
                )}
                ٪ از هدف امروز تکمیل شده
                است.
              </p>
            </div>

            <div>
              <div
                className="
                  flex items-center
                  justify-between
                  gap-4
                "
              >
                <span
                  className="
                    text-sm
                    text-slate-300
                  "
                >
                  هدف این هفته
                </span>

                <span
                  className="
                    text-xs
                    text-slate-500
                  "
                >
                  {formatNumber(
                    summary.weeklyCompletedMinutes,
                  )}{" "}
                  /{" "}
                  {formatNumber(
                    summary.weeklyGoalMinutes,
                  )}{" "}
                  دقیقه
                </span>
              </div>

              <Progress
                value={weeklyProgress}
                label="پیشرفت هدف هفتگی"
                className="mt-3"
              />

              <p
                className="
                  mt-2 text-xs
                  text-slate-600
                "
              >
                {formatNumber(
                  weeklyProgress,
                )}
                ٪ از هدف هفتگی تکمیل شده
                است.
              </p>
            </div>
          </div>
        </Card>

        <Card
          className="
            p-5 sm:p-6
            lg:col-span-5
          "
        >
          <h2
            className="
              text-lg font-bold
              text-white
            "
          >
            تنظیمات یادگیری
          </h2>

          <div
            className="
              mt-5 space-y-4
            "
          >
            <div
              className="
                flex items-center
                justify-between gap-4
                rounded-xl
                border
                border-white/[0.06]
                bg-white/[0.025]
                p-4
              "
            >
              <div
                className="
                  flex items-center gap-3
                "
              >
                <Languages
                  aria-hidden="true"
                  className="
                    h-5 w-5
                    text-cyan-300
                  "
                />

                <div>
                  <p
                    className="
                      text-xs
                      text-slate-500
                    "
                  >
                    زبان هدف
                  </p>

                  <p
                    className="
                      mt-1 text-sm
                      font-medium
                      text-white
                    "
                  >
                    {
                      user.targetLanguage
                        .name
                    }
                  </p>
                </div>
              </div>

              <span
                className="
                  font-mono text-xs
                  uppercase
                  text-slate-600
                "
              >
                {
                  user.targetLanguage
                    .code
                }
              </span>
            </div>

            <div
              className="
                flex items-center
                justify-between gap-4
                rounded-xl
                border
                border-white/[0.06]
                bg-white/[0.025]
                p-4
              "
            >
              <div
                className="
                  flex items-center gap-3
                "
              >
                <BookOpenText
                  aria-hidden="true"
                  className="
                    h-5 w-5
                    text-violet-300
                  "
                />

                <div>
                  <p
                    className="
                      text-xs
                      text-slate-500
                    "
                  >
                    زبان مادری
                  </p>

                  <p
                    className="
                      mt-1 text-sm
                      font-medium
                      text-white
                    "
                  >
                    {
                      user.nativeLanguage
                        .name
                    }
                  </p>
                </div>
              </div>

              <span
                className="
                  font-mono text-xs
                  uppercase
                  text-slate-600
                "
              >
                {
                  user.nativeLanguage
                    .code
                }
              </span>
            </div>

            <div
              className="
                rounded-xl
                border
                border-white/[0.06]
                bg-white/[0.025]
                p-4
              "
            >
              <div
                className="
                  flex items-center gap-3
                "
              >
                <Target
                  aria-hidden="true"
                  className="
                    h-5 w-5
                    text-emerald-300
                  "
                />

                <div>
                  <p
                    className="
                      text-xs
                      text-slate-500
                    "
                  >
                    هدف یادگیری
                  </p>

                  <p
                    className="
                      mt-1 text-sm
                      leading-7
                      text-white
                    "
                  >
                    {user.learningGoal ??
                      "هنوز هدف مشخصی ثبت نشده است."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <section
        aria-labelledby="profile-skills-title"
      >
        <div
          className="
            flex items-end
            justify-between gap-4
          "
        >
          <div>
            <h2
              id="profile-skills-title"
              className="
                text-xl font-bold
                text-white
              "
            >
              وضعیت مهارت‌ها
            </h2>

            <p
              className="
                mt-1 text-sm
                text-slate-500
              "
            >
              نمای کلی پیشرفت در مهارت‌های
              مختلف
            </p>
          </div>
        </div>

        {skillProgress.length > 0 ? (
          <div
            className="
              mt-5 grid gap-4
              md:grid-cols-2
              xl:grid-cols-3
            "
          >
            {skillProgress.map(
              (skill) => {
                const skillConfig = {
                  speaking: {
                    label: "مکالمه",
                    icon: Mic2,
                  },

                  listening: {
                    label: "شنیداری",
                    icon: Headphones,
                  },

                  reading: {
                    label: "خواندن",
                    icon: BookOpenText,
                  },

                  writing: {
                    label: "نوشتن",
                    icon: BookOpenText,
                  },

                  grammar: {
                    label: "گرامر",
                    icon: GraduationCap,
                  },

                  vocabulary: {
                    label: "واژگان",
                    icon: Languages,
                  },
                } as const;

                const config =
                  skillConfig[
                    skill.skill
                  ];

                const Icon =
                  config.icon;

                return (
                  <Card
                    key={skill.skill}
                    className="p-5"
                  >
                    <div
                      className="
                        flex items-center
                        justify-between
                        gap-4
                      "
                    >
                      <div
                        className="
                          flex items-center
                          gap-3
                        "
                      >
                        <span
                          className="
                            flex h-10 w-10
                            items-center
                            justify-center
                            rounded-xl
                            bg-cyan-400/10
                            text-cyan-300
                          "
                        >
                          <Icon
                            aria-hidden="true"
                            className="h-5 w-5"
                          />
                        </span>

                        <div>
                          <h3
                            className="
                              text-sm
                              font-bold
                              text-white
                            "
                          >
                            {config.label}
                          </h3>

                          <p
                            className="
                              mt-1 text-xs
                              text-slate-600
                            "
                          >
                            سطح{" "}
                            {skill.cefrLevel ??
                              "نامشخص"}
                          </p>
                        </div>
                      </div>

                      <span
                        className="
                          text-xl
                          font-bold
                          text-white
                        "
                      >
                        {formatNumber(
                          skill.score,
                        )}
                      </span>
                    </div>

                    <Progress
                      value={skill.score}
                      label={`پیشرفت مهارت ${config.label}`}
                      className="mt-5"
                    />

                    <div
                      className="
                        mt-4 flex
                        items-center
                        justify-between
                        gap-3
                        text-xs
                        text-slate-600
                      "
                    >
                      <span>
                        {formatNumber(
                          skill.completedActivities,
                        )}{" "}
                        فعالیت
                      </span>

                      <span>
                        {formatNumber(
                          skill.totalPracticeMinutes,
                        )}{" "}
                        دقیقه
                      </span>
                    </div>
                  </Card>
                );
              },
            )}
          </div>
        ) : (
          <Card
            className="
              mt-5 p-8
              text-center
            "
          >
            <p
              className="
                text-sm
                text-slate-500
              "
            >
              هنوز اطلاعات کافی برای نمایش
              پیشرفت مهارت‌ها وجود ندارد.
            </p>
          </Card>
        )}
      </section>
    </main>
  );
}