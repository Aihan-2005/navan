"use client";

import Link from "next/link";

import {
  useMemo,
  useState,
} from "react";

import {
  BarChart3,
  BookMarked,
  Brain,
  CalendarClock,
  CheckCircle2,
  ChevronLeft,
  Clock3,
  Flame,
  FolderOpen,
  Layers3,
  ListFilter,
  Plus,
  RotateCcw,
  Search,
  Sparkles,
  Target,
  Volume2,
} from "lucide-react";

import {
  AddWordDialog,
} from "./add-word-dialog";






import {
  calculateVocabularyStats,
  getLeitnerBoxes,
} from "../domain/leitner";

import {
  useVocabularyStore,
} from "../store/use-vocabulary-store";

import type {
  LeitnerBoxNumber,
  VocabularyDifficulty,
  VocabularyStatus,
} from "../types/vocabulary.types";

type VocabularyTab =
  | "overview"
  | "words"
  | "collections"
  | "stats";

const tabs: {
  id: VocabularyTab;
  label: string;
  icon: typeof BookMarked;
}[] = [
  {
    id: "overview",
    label: "مرور کلی",
    icon: BookMarked,
  },
  {
    id: "words",
    label: "واژه‌های من",
    icon: Layers3,
  },
  {
    id: "collections",
    label: "مجموعه‌ها",
    icon: FolderOpen,
  },
  {
    id: "stats",
    label: "آمار یادگیری",
    icon: BarChart3,
  },
];

const boxTheme = {
  1: {
    accent: "#F97316",
    background: "#FFF7ED",
  },
  2: {
    accent: "#8A4CFC",
    background: "#F8F3FF",
  },
  3: {
    accent: "#4285F4",
    background: "#EFF6FF",
  },
  4: {
    accent: "#14B8A6",
    background: "#EAFFFD",
  },
  5: {
    accent: "#0D9488",
    background: "#F0FDFA",
  },
} satisfies Record<
  LeitnerBoxNumber,
  {
    accent: string;
    background: string;
  }
>;

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  accent,
  background,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: typeof Brain;
  accent: string;
  background: string;
}) {
  return (
    <article
      className="
        flex
        min-h-[128px]
        items-center
        justify-between
        rounded-2xl
        border
        border-[#BCC9C6]
        bg-white
        p-5
        shadow-[0_4px_18px_rgba(0,0,0,0.035)]
      "
    >
      <div>
        <p
          className="
            text-sm
            font-bold
            text-[#3D4947]
          "
        >
          {title}
        </p>

        <strong
          className="
            mt-1
            block
            text-2xl
            font-black
          "
          style={{
            color: accent,
          }}
        >
          {value}
        </strong>

        <p
          className="
            mt-1
            text-[11px]
            text-[#6D7A77]
          "
        >
          {subtitle}
        </p>
      </div>

      <div
        className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
        "
        style={{
          backgroundColor:
            background,
          color: accent,
        }}
      >
        <Icon
          className="h-6 w-6"
        />
      </div>
    </article>
  );
}

function WordStatusBadge({
  status,
}: {
  status: VocabularyStatus;
}) {
  const map: Record<
    VocabularyStatus,
    {
      label: string;
      className: string;
    }
  > = {
    new: {
      label: "جدید",
      className:
        "bg-[#EFF6FF] text-[#2563EB]",
    },

    learning: {
      label: "در حال یادگیری",
      className:
        "bg-[#FFF7ED] text-[#EA580C]",
    },

    review: {
      label: "نیاز به مرور",
      className:
        "bg-[#F8F3FF] text-[#712AE2]",
    },

    mastered: {
      label: "یاد گرفته شده",
      className:
        "bg-[#F0FDF4] text-[#15803D]",
    },
  };

  return (
    <span
      className={`
        inline-flex
        h-6
        items-center
        rounded-full
        px-2.5
        text-[10px]
        font-bold
        ${map[status].className}
      `}
    >
      {map[status].label}
    </span>
  );
}

function DifficultyBadge({
  difficulty,
}: {
  difficulty:
    VocabularyDifficulty;
}) {
  const values = {
    easy: {
      label: "آسان",
      className:
        "text-[#15803D]",
    },
    medium: {
      label: "متوسط",
      className:
        "text-[#D97706]",
    },
    hard: {
      label: "سخت",
      className:
        "text-[#DC2626]",
    },
  };

  return (
    <span
      className={`
        text-[10px]
        font-bold
        ${values[difficulty].className}
      `}
    >
      {
        values[difficulty]
          .label
      }
    </span>
  );
}

export function VocabularyWorkspace() {
  const words =
    useVocabularyStore(
      (state) =>
        state.words,
    );

  const collections =
    useVocabularyStore(
      (state) =>
        state.collections,
    );

  const reviewLog =
    useVocabularyStore(
      (state) =>
        state.reviewLog,
    );

  const dailyGoal =
    useVocabularyStore(
      (state) =>
        state.dailyGoal,
    );

  const addWord =
    useVocabularyStore(
      (state) =>
        state.addWord,
    );

  const stats =
    useMemo(
      () =>
        calculateVocabularyStats(
          words,
          reviewLog,
          dailyGoal,
        ),
      [
        words,
        reviewLog,
        dailyGoal,
      ],
    );

  const leitnerBoxes =
    useMemo(
      () =>
        getLeitnerBoxes(
          words,
        ),
      [words],
    );

  const [
    activeTab,
    setActiveTab,
  ] =
    useState<VocabularyTab>(
      "overview",
    );

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    selectedBox,
    setSelectedBox,
  ] = useState<
    "all" | LeitnerBoxNumber
  >("all");

  const [
    selectedStatus,
    setSelectedStatus,
  ] = useState<
    "all" | VocabularyStatus
  >("all");

  const [
    isAddWordOpen,
    setIsAddWordOpen,
  ] = useState(false);

  const filteredWords =
    useMemo(() => {
      const normalizedSearch =
        search
          .trim()
          .toLowerCase();

      return words.filter(
        (word) => {
          const matchesSearch =
            !normalizedSearch ||
            word.word
              .toLowerCase()
              .includes(
                normalizedSearch,
              ) ||
            word.translation.includes(
              normalizedSearch,
            );

          const matchesBox =
            selectedBox ===
              "all" ||
            word.leitnerBox ===
              selectedBox;

          const matchesStatus =
            selectedStatus ===
              "all" ||
            word.status ===
              selectedStatus;

          return (
            matchesSearch &&
            matchesBox &&
            matchesStatus
          );
        },
      );
    }, [
      words,
      search,
      selectedBox,
      selectedStatus,
    ]);

  const dailyProgress =
    stats.dailyGoal > 0
      ? Math.min(
          100,
          Math.round(
            (
              stats.dailyReviewed /
              stats.dailyGoal
            ) *
              100,
          ),
        )
      : 0;

  return (
    <>
      <main
        dir="rtl"
        className="
          mx-auto
          flex
          w-full
          max-w-[1120px]
          flex-col
          gap-6
          pb-10
        "
      >
        {/* Header */}

        <section
          className="
            relative
            overflow-hidden
            rounded-[24px]
            border
            border-[#BFD8D4]
            bg-[linear-gradient(135deg,#F0FDFA_0%,#D9F3EF_55%,#C4EBE5_100%)]
            p-6
            shadow-[0_8px_30px_rgba(0,104,95,0.06)]
            lg:p-8
          "
        >
          <div
            aria-hidden="true"
            className="
              absolute
              -left-16
              -top-20
              h-52
              w-52
              rounded-full
              bg-[#14B8A6]/10
              blur-3xl
            "
          />

          <div
            className="
              relative
              z-10
              flex
              flex-col
              gap-6
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            <div>
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[#14B8A6]/20
                  bg-white/60
                  px-3
                  py-1.5
                  text-xs
                  font-bold
                  text-[#00685F]
                "
              >
                <Sparkles
                  className="h-4 w-4"
                />
                سیستم مرور هوشمند
              </div>

              <h1
                className="
                  mt-3
                  text-[28px]
                  font-black
                  leading-[1.55]
                  text-[#173330]
                "
              >
                واژگان و جعبه لایتنر
              </h1>

              <p
                className="
                  mt-1
                  max-w-[590px]
                  text-sm
                  leading-7
                  text-[#52615E]
                "
              >
                واژه‌های جدید را ذخیره کن، در زمان مناسب
                مرور کن و روند انتقال آن‌ها به حافظه
                بلندمدت را ببین.
              </p>
            </div>

            <div
              className="
                flex
                flex-wrap
                gap-3
              "
            >
              <button
                type="button"
                onClick={() =>
                  setIsAddWordOpen(
                    true,
                  )
                }
                className="
                  inline-flex
                  h-11
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-[#A8C4C0]
                  bg-white
                  px-5
                  text-sm
                  font-bold
                  text-[#00685F]
                  hover:bg-[#F8FCFB]
                "
              >
                <Plus
                  className="h-4 w-4"
                />
                افزودن واژه
              </button>

              <Link
                href="/vocabulary/review"
                className="
                  inline-flex
                  h-11
                  items-center
                  gap-2
                  rounded-xl
                  bg-[#0D9488]
                  px-6
                  text-sm
                  font-bold
                  text-white
                  shadow-sm
                  hover:bg-[#0F766E]
                "
              >
                <RotateCcw
                  className="h-4 w-4"
                />
                شروع مرور امروز
              </Link>
            </div>
          </div>
        </section>

        {/* Daily goal */}

        <section
          className="
            grid
            grid-cols-1
            gap-4
            lg:grid-cols-[1fr_310px]
          "
        >
          <div
            className="
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-3
            "
          >
            <StatCard
              title="کل واژه‌ها"
              value={`${stats.totalWords}`}
              subtitle="در کتابخانه شما"
              icon={BookMarked}
              accent="#14B8A6"
              background="#EAFFFD"
            />

            <StatCard
              title="مرور امروز"
              value={`${stats.dueToday}`}
              subtitle="واژه آماده مرور"
              icon={RotateCcw}
              accent="#F97316"
              background="#FFF7ED"
            />

            <StatCard
              title="میزان تسلط"
              value={`${stats.masteryPercent}٪`}
              subtitle="در مسیر پیشرفت"
              icon={Brain}
              accent="#712AE2"
              background="#F8F3FF"
            />
          </div>

          <article
            className="
              rounded-2xl
              border
              border-[#BCC9C6]
              bg-white
              p-5
              shadow-[0_4px_18px_rgba(0,0,0,0.035)]
            "
          >
            <div
              className="
                flex
                items-start
                justify-between
              "
            >
              <div>
                <p
                  className="
                    text-sm
                    font-bold
                    text-[#191C1E]
                  "
                >
                  هدف روزانه
                </p>

                <p
                  className="
                    mt-1
                    text-[11px]
                    text-[#6D7A77]
                  "
                >
                  امروز{" "}
                  {
                    stats.dailyReviewed
                  }{" "}
                  از{" "}
                  {
                    stats.dailyGoal
                  }{" "}
                  واژه را مرور کردی.
                </p>
              </div>

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#F0FDFA]
                  text-[#0D9488]
                "
              >
                <Target
                  className="h-5 w-5"
                />
              </div>
            </div>

            <div
              className="
                mt-5
                h-2.5
                overflow-hidden
                rounded-full
                bg-[#ECEEF0]
              "
            >
              <div
                className="
                  h-full
                  rounded-full
                  bg-[#14B8A6]
                "
                style={{
                  width:
                    `${dailyProgress}%`,
                }}
              />
            </div>

            <div
              className="
                mt-3
                flex
                items-center
                justify-between
              "
            >
              <span
                className="
                  text-xs
                  font-bold
                  text-[#14B8A6]
                "
              >
                {dailyProgress}٪
              </span>

              <span
                className="
                  flex
                  items-center
                  gap-1
                  text-[11px]
                  font-bold
                  text-[#F97316]
                "
              >
                <Flame
                  className="h-3.5 w-3.5"
                />
                {
                  stats.currentStreak
                }{" "}
                روز متوالی
              </span>
            </div>
          </article>
        </section>

        {/* Tabs */}

        <section
          className="
            overflow-hidden
            rounded-2xl
            border
            border-[#BCC9C6]
            bg-white
          "
        >
          <div
            className="
              flex
              gap-1
              overflow-x-auto
              border-b
              border-[#E0E3E5]
              px-3
              pt-2
            "
          >
            {tabs.map(
              (tab) => {
                const Icon =
                  tab.icon;

                const selected =
                  tab.id ===
                  activeTab;

                return (
                  <button
                    key={
                      tab.id
                    }
                    type="button"
                    onClick={() =>
                      setActiveTab(
                        tab.id,
                      )
                    }
                    className={`
                      relative
                      flex
                      h-12
                      shrink-0
                      items-center
                      gap-2
                      px-4
                      text-sm
                      font-bold
                      transition
                      ${
                        selected
                          ? "text-[#0D9488]"
                          : "text-[#6D7A77] hover:text-[#191C1E]"
                      }
                    `}
                  >
                    <Icon
                      className="h-4 w-4"
                    />

                    {tab.label}

                    {selected ? (
                      <span
                        className="
                          absolute
                          bottom-0
                          left-3
                          right-3
                          h-[3px]
                          rounded-t-full
                          bg-[#14B8A6]
                        "
                      />
                    ) : null}
                  </button>
                );
              },
            )}
          </div>

          {/* Overview */}

          {activeTab ===
          "overview" ? (
            <div
              className="
                space-y-7
                p-5
                lg:p-6
              "
            >
              <div>
                <div
                  className="
                    flex
                    items-end
                    justify-between
                    gap-4
                  "
                >
                  <div>
                    <h2
                      className="
                        text-lg
                        font-black
                        text-[#191C1E]
                      "
                    >
                      جعبه‌های لایتنر
                    </h2>

                    <p
                      className="
                        mt-1
                        text-xs
                        leading-5
                        text-[#6D7A77]
                      "
                    >
                      با پاسخ صحیح، واژه به جعبه بالاتر
                      منتقل می‌شود.
                    </p>
                  </div>

                  <Link
                    href="/vocabulary/review"
                    className="
                      hidden
                      items-center
                      gap-1
                      text-xs
                      font-bold
                      text-[#0D9488]
                      sm:flex
                    "
                  >
                    مرور کارت‌های امروز
                    <ChevronLeft
                      className="h-4 w-4"
                    />
                  </Link>
                </div>

                <div
                  className="
                    mt-4
                    grid
                    grid-cols-1
                    gap-3
                    sm:grid-cols-2
                    xl:grid-cols-5
                  "
                >
                  {leitnerBoxes.map(
                    (box) => {
                      const theme =
                        boxTheme[
                          box.box
                        ];

                      return (
                        <button
                          key={
                            box.box
                          }
                          type="button"
                          onClick={() => {
                            setSelectedBox(
                              box.box,
                            );
                            setActiveTab(
                              "words",
                            );
                          }}
                          className="
                            group
                            min-h-[180px]
                            rounded-2xl
                            border
                            border-[#BCC9C6]
                            p-4
                            text-right
                            transition
                            hover:-translate-y-0.5
                            hover:shadow-[0_10px_24px_rgba(0,0,0,0.07)]
                          "
                          style={{
                            backgroundColor:
                              theme.background,
                          }}
                        >
                          <div
                            className="
                              flex
                              items-start
                              justify-between
                            "
                          >
                            <span
                              className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-xl
                                bg-white/75
                              "
                              style={{
                                color:
                                  theme.accent,
                              }}
                            >
                              <Layers3
                                className="h-5 w-5"
                              />
                            </span>

                            <span
                              className="
                                rounded-full
                                bg-white/70
                                px-2
                                py-1
                                text-[9px]
                                font-bold
                                text-[#52615E]
                              "
                            >
                              {
                                box.intervalLabel
                              }
                            </span>
                          </div>

                          <h3
                            className="
                              mt-4
                              text-base
                              font-black
                              text-[#191C1E]
                            "
                          >
                            {box.title}
                          </h3>

                          <p
                            className="
                              mt-1
                              text-[11px]
                              text-[#6D7A77]
                            "
                          >
                            {
                              box.description
                            }
                          </p>

                          <div
                            className="
                              mt-5
                              flex
                              items-end
                              justify-between
                            "
                          >
                            <div>
                              <strong
                                className="
                                  text-2xl
                                  font-black
                                "
                                style={{
                                  color:
                                    theme.accent,
                                }}
                              >
                                {
                                  box.totalCards
                                }
                              </strong>

                              <span
                                className="
                                  mr-1
                                  text-[10px]
                                  text-[#6D7A77]
                                "
                              >
                                واژه
                              </span>
                            </div>

                            {box.dueCards >
                            0 ? (
                              <span
                                className="
                                  flex
                                  items-center
                                  gap-1
                                  rounded-lg
                                  bg-white/80
                                  px-2
                                  py-1
                                  text-[10px]
                                  font-bold
                                "
                                style={{
                                  color:
                                    theme.accent,
                                }}
                              >
                                <Clock3
                                  className="h-3 w-3"
                                />
                                {
                                  box.dueCards
                                }{" "}
                                مرور
                              </span>
                            ) : (
                              <CheckCircle2
                                className="
                                  h-5
                                  w-5
                                  text-[#0D9488]
                                "
                              />
                            )}
                          </div>
                        </button>
                      );
                    },
                  )}
                </div>
              </div>

              {/* Due + hard words */}

              <div
                className="
                  grid
                  grid-cols-1
                  gap-5
                  lg:grid-cols-2
                "
              >
                <article
                  className="
                    rounded-2xl
                    border
                    border-[#E0E3E5]
                    bg-[#FAFCFC]
                    p-5
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-3
                      "
                    >
                      <span
                        className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-xl
                          bg-[#FFF7ED]
                          text-[#F97316]
                        "
                      >
                        <CalendarClock
                          className="h-5 w-5"
                        />
                      </span>

                      <div>
                        <h3
                          className="
                            text-sm
                            font-black
                            text-[#191C1E]
                          "
                        >
                          آماده مرور
                        </h3>

                        <p
                          className="
                            text-[10px]
                            text-[#6D7A77]
                          "
                        >
                          اولویت امروز
                        </p>
                      </div>
                    </div>

                    <span
                      className="
                        text-sm
                        font-black
                        text-[#F97316]
                      "
                    >
                      {stats.dueToday} واژه
                    </span>
                  </div>

                  <div
                    className="
                      mt-4
                      space-y-2
                    "
                  >
                    {words
                      .filter(
                        (word) =>
                          word.status ===
                            "review" ||
                          word.leitnerBox <=
                            2,
                      )
                      .slice(
                        0,
                        3,
                      )
                      .map(
                        (word) => (
                          <div
                            key={
                              word.id
                            }
                            className="
                              flex
                              items-center
                              justify-between
                              rounded-xl
                              border
                              border-[#E8EDEE]
                              bg-white
                              px-3
                              py-2.5
                            "
                          >
                            <div
                              dir="ltr"
                              className="
                                text-left
                              "
                            >
                              <p
                                className="
                                  text-sm
                                  font-bold
                                  text-[#191C1E]
                                "
                              >
                                {
                                  word.word
                                }
                              </p>

                              <p
                                className="
                                  text-[10px]
                                  text-[#9CA3AF]
                                "
                              >
                                {
                                  word.phonetic
                                }
                              </p>
                            </div>

                            <span
                              className="
                                text-xs
                                text-[#52615E]
                              "
                            >
                              {
                                word.translation
                              }
                            </span>
                          </div>
                        ),
                      )}
                  </div>
                </article>

                <article
                  className="
                    rounded-2xl
                    border
                    border-[#E0E3E5]
                    bg-[#FAFCFC]
                    p-5
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-3
                      "
                    >
                      <span
                        className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-xl
                          bg-[#FFF1F2]
                          text-[#E11D48]
                        "
                      >
                        <Brain
                          className="h-5 w-5"
                        />
                      </span>

                      <div>
                        <h3
                          className="
                            text-sm
                            font-black
                            text-[#191C1E]
                          "
                        >
                          واژه‌های سخت
                        </h3>

                        <p
                          className="
                            text-[10px]
                            text-[#6D7A77]
                          "
                        >
                          نیازمند تمرین بیشتر
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="
                      mt-4
                      space-y-2
                    "
                  >
                    {words
                      .filter(
                        (word) =>
                          word.difficulty ===
                          "hard",
                      )
                      .map(
                        (word) => (
                          <div
                            key={
                              word.id
                            }
                            className="
                              flex
                              items-center
                              justify-between
                              rounded-xl
                              border
                              border-[#E8EDEE]
                              bg-white
                              px-3
                              py-3
                            "
                          >
                            <div
                              dir="ltr"
                              className="
                                text-left
                              "
                            >
                              <p
                                className="
                                  text-sm
                                  font-bold
                                  text-[#191C1E]
                                "
                              >
                                {
                                  word.word
                                }
                              </p>

                              <p
                                className="
                                  text-[10px]
                                  text-[#9CA3AF]
                                "
                              >
                                موفقیت{" "}
                                {
                                  word.correctCount
                                }
                                /
                                {
                                  word.reviewCount
                                }
                              </p>
                            </div>

                            <span
                              className="
                                rounded-lg
                                bg-[#FFF1F2]
                                px-2
                                py-1
                                text-[10px]
                                font-bold
                                text-[#BE123C]
                              "
                            >
                              سخت
                            </span>
                          </div>
                        ),
                      )}
                  </div>
                </article>
              </div>
            </div>
          ) : null}

          {/* Words */}

          {activeTab ===
          "words" ? (
            <div
              className="
                p-5
                lg:p-6
              "
            >
              <div
                className="
                  flex
                  flex-col
                  gap-3
                  lg:flex-row
                  lg:items-center
                  lg:justify-between
                "
              >
                <div
                  className="
                    relative
                    w-full
                    lg:max-w-[380px]
                  "
                >
                  <Search
                    className="
                      absolute
                      right-3
                      top-1/2
                      h-4
                      w-4
                      -translate-y-1/2
                      text-[#8A9693]
                    "
                  />

                  <input
                    value={
                      search
                    }
                    onChange={
                      (event) =>
                        setSearch(
                          event.target.value,
                        )
                    }
                    placeholder="جستجوی واژه یا معنی..."
                    className="
                      h-11
                      w-full
                      rounded-xl
                      border
                      border-[#BCC9C6]
                      bg-[#F9FBFB]
                      pr-10
                      pl-4
                      text-sm
                      outline-none
                      focus:border-[#14B8A6]
                      focus:bg-white
                      focus:ring-4
                      focus:ring-[#14B8A6]/10
                    "
                  />
                </div>

                <div
                  className="
                    flex
                    flex-wrap
                    gap-2
                  "
                >
                  <div
                    className="
                      flex
                      h-11
                      items-center
                      gap-2
                      rounded-xl
                      border
                      border-[#BCC9C6]
                      bg-white
                      px-3
                    "
                  >
                    <ListFilter
                      className="
                        h-4
                        w-4
                        text-[#6D7A77]
                      "
                    />

                    <select
                      value={
                        selectedBox
                      }
                      onChange={
                        (event) =>
                          setSelectedBox(
                            event
                              .target
                              .value ===
                              "all"
                              ? "all"
                              : (Number(
                                  event
                                    .target
                                    .value,
                                ) as LeitnerBoxNumber),
                          )
                      }
                      className="
                        bg-transparent
                        text-xs
                        font-bold
                        text-[#3D4947]
                        outline-none
                      "
                    >
                      <option value="all">
                        همه جعبه‌ها
                      </option>

                      {[
                        1,
                        2,
                        3,
                        4,
                        5,
                      ].map(
                        (box) => (
                          <option
                            key={
                              box
                            }
                            value={
                              box
                            }
                          >
                            جعبه{" "}
                            {
                              box
                            }
                          </option>
                        ),
                      )}
                    </select>
                  </div>

                  <select
                    value={
                      selectedStatus
                    }
                    onChange={
                      (event) =>
                        setSelectedStatus(
                          event
                            .target
                            .value as
                            | "all"
                            | VocabularyStatus,
                        )
                    }
                    className="
                      h-11
                      rounded-xl
                      border
                      border-[#BCC9C6]
                      bg-white
                      px-3
                      text-xs
                      font-bold
                      text-[#3D4947]
                      outline-none
                    "
                  >
                    <option value="all">
                      همه وضعیت‌ها
                    </option>
                    <option value="new">
                      جدید
                    </option>
                    <option value="learning">
                      در حال یادگیری
                    </option>
                    <option value="review">
                      نیاز به مرور
                    </option>
                    <option value="mastered">
                      یاد گرفته شده
                    </option>
                  </select>
                </div>
              </div>

              <div
                className="
                  mt-5
                  overflow-hidden
                  rounded-2xl
                  border
                  border-[#E0E3E5]
                "
              >
                {filteredWords.length >
                0 ? (
                  filteredWords.map(
                    (
                      word,
                      index,
                    ) => (
                      <div
                        key={
                          word.id
                        }
                        className={`
                          grid
                          gap-4
                          bg-white
                          px-4
                          py-4
                          md:grid-cols-[minmax(180px,1.1fr)_minmax(150px,1fr)_110px_110px]
                          md:items-center
                          ${
                            index >
                            0
                              ? "border-t border-[#E8EDEE]"
                              : ""
                          }
                        `}
                      >
                        <div
                          className="
                            flex
                            items-center
                            gap-3
                          "
                        >
                          <button
                            type="button"
                            aria-label={`تلفظ ${word.word}`}
                            className="
                              flex
                              h-9
                              w-9
                              shrink-0
                              items-center
                              justify-center
                              rounded-xl
                              bg-[#EAF9F7]
                              text-[#0D9488]
                              hover:bg-[#DDF4F1]
                            "
                          >
                            <Volume2
                              className="h-4 w-4"
                            />
                          </button>

                          <div
                            dir="ltr"
                            className="
                              min-w-0
                              text-left
                            "
                          >
                            <p
                              className="
                                truncate
                                text-sm
                                font-black
                                text-[#191C1E]
                              "
                            >
                              {
                                word.word
                              }
                            </p>

                            <p
                              className="
                                truncate
                                text-[10px]
                                text-[#9CA3AF]
                              "
                            >
                              {
                                word.phonetic
                              }
                            </p>
                          </div>
                        </div>

                        <div>
                          <p
                            className="
                              text-sm
                              font-medium
                              text-[#3D4947]
                            "
                          >
                            {
                              word.translation
                            }
                          </p>

                          <DifficultyBadge
                            difficulty={
                              word.difficulty
                            }
                          />
                        </div>

                        <div>
                          <span
                            className="
                              inline-flex
                              rounded-lg
                              bg-[#F2F4F6]
                              px-2.5
                              py-1.5
                              text-[10px]
                              font-bold
                              text-[#52615E]
                            "
                          >
                            جعبه{" "}
                            {
                              word.leitnerBox
                            }
                          </span>
                        </div>

                        <WordStatusBadge
                          status={
                            word.status
                          }
                        />
                      </div>
                    ),
                  )
                ) : (
                  <div
                    className="
                      flex
                      min-h-[220px]
                      flex-col
                      items-center
                      justify-center
                      bg-white
                      p-6
                      text-center
                    "
                  >
                    <Search
                      className="
                        h-8
                        w-8
                        text-[#BCC9C6]
                      "
                    />

                    <p
                      className="
                        mt-3
                        text-sm
                        font-bold
                        text-[#3D4947]
                      "
                    >
                      واژه‌ای پیدا نشد
                    </p>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-[#8A9693]
                      "
                    >
                      فیلتر یا عبارت جستجو را تغییر بده.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : null}

          {/* Collections */}

          {activeTab ===
          "collections" ? (
            <div
              className="
                p-5
                lg:p-6
              "
            >
              <div
                className="
                  flex
                  items-end
                  justify-between
                "
              >
                <div>
                  <h2
                    className="
                      text-lg
                      font-black
                      text-[#191C1E]
                    "
                  >
                    مجموعه‌های واژگان
                  </h2>

                  <p
                    className="
                      mt-1
                      text-xs
                      text-[#6D7A77]
                    "
                  >
                    واژه‌ها را بر اساس موضوع دسته‌بندی کن.
                  </p>
                </div>

                <button
                  type="button"
                  className="
                    inline-flex
                    h-9
                    items-center
                    gap-2
                    rounded-lg
                    border
                    border-[#BCC9C6]
                    px-3
                    text-xs
                    font-bold
                    text-[#0D9488]
                  "
                >
                  <Plus
                    className="h-4 w-4"
                  />
                  مجموعه جدید
                </button>
              </div>

              <div
                className="
                  mt-5
                  grid
                  grid-cols-1
                  gap-4
                  md:grid-cols-2
                "
              >
                {collections.map(
                  (
                    collection,
                  ) => {
                    const progress =
                      collection.totalWords > 0
                        ? Math.round(
                            (
                              collection.learnedWords /
                              collection.totalWords
                            ) *
                              100,
                          )
                        : 0;

                    return (
                      <article
                        key={
                          collection.id
                        }
                        className="
                          rounded-2xl
                          border
                          border-[#BCC9C6]
                          bg-[#FAFCFC]
                          p-5
                          transition
                          hover:bg-white
                          hover:shadow-[0_8px_22px_rgba(0,0,0,0.05)]
                        "
                      >
                        <div
                          className="
                            flex
                            items-start
                            justify-between
                          "
                        >
                          <div
                            className="
                              flex
                              items-center
                              gap-3
                            "
                          >
                            <span
                              className="
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-2xl
                                bg-white
                                text-2xl
                                shadow-sm
                              "
                            >
                              {
                                collection.emoji
                              }
                            </span>

                            <div>
                              <h3
                                className="
                                  text-sm
                                  font-black
                                  text-[#191C1E]
                                "
                              >
                                {
                                  collection.title
                                }
                              </h3>

                              <p
                                className="
                                  mt-1
                                  text-[10px]
                                  text-[#6D7A77]
                                "
                              >
                                {
                                  collection.totalWords
                                }{" "}
                                واژه
                              </p>
                            </div>
                          </div>

                          <span
                            className="
                              text-xs
                              font-black
                              text-[#14B8A6]
                            "
                          >
                            {
                              progress
                            }
                            ٪
                          </span>
                        </div>

                        <p
                          className="
                            mt-4
                            text-xs
                            leading-5
                            text-[#52615E]
                          "
                        >
                          {
                            collection.description
                          }
                        </p>

                        <div
                          className="
                            mt-4
                            h-2
                            overflow-hidden
                            rounded-full
                            bg-[#E8EDEE]
                          "
                        >
                          <div
                            className="
                              h-full
                              rounded-full
                              bg-[#14B8A6]
                            "
                            style={{
                              width:
                                `${progress}%`,
                            }}
                          />
                        </div>
                      </article>
                    );
                  },
                )}
              </div>
            </div>
          ) : null}

          {/* Stats */}

          {activeTab ===
          "stats" ? (
            <div
              className="
                grid
                grid-cols-1
                gap-5
                p-5
                lg:grid-cols-2
                lg:p-6
              "
            >
              <article
                className="
                  rounded-2xl
                  border
                  border-[#E0E3E5]
                  bg-[#FAFCFC]
                  p-5
                "
              >
                <h2
                  className="
                    text-sm
                    font-black
                    text-[#191C1E]
                  "
                >
                  عملکرد این هفته
                </h2>

                <div
                  className="
                    mt-5
                    grid
                    grid-cols-2
                    gap-3
                  "
                >
                  <div
                    className="
                      rounded-xl
                      bg-white
                      p-4
                    "
                  >
                    <span
                      className="
                        text-2xl
                        font-black
                        text-[#14B8A6]
                      "
                    >
                      {
                        stats.weeklyReviewed
                      }
                    </span>

                    <p
                      className="
                        mt-1
                        text-[10px]
                        text-[#6D7A77]
                      "
                    >
                      مرور انجام شده
                    </p>
                  </div>

                  <div
                    className="
                      rounded-xl
                      bg-white
                      p-4
                    "
                  >
                    <span
                      className="
                        text-2xl
                        font-black
                        text-[#4285F4]
                      "
                    >
                      {
                        stats.weeklyAdded
                      }
                    </span>

                    <p
                      className="
                        mt-1
                        text-[10px]
                        text-[#6D7A77]
                      "
                    >
                      واژه جدید
                    </p>
                  </div>

                  <div
                    className="
                      rounded-xl
                      bg-white
                      p-4
                    "
                  >
                    <span
                      className="
                        text-2xl
                        font-black
                        text-[#712AE2]
                      "
                    >
                      {
                        stats.masteredWords
                      }
                    </span>

                    <p
                      className="
                        mt-1
                        text-[10px]
                        text-[#6D7A77]
                      "
                    >
                      واژه مسلط
                    </p>
                  </div>

                  <div
                    className="
                      rounded-xl
                      bg-white
                      p-4
                    "
                  >
                    <span
                      className="
                        text-2xl
                        font-black
                        text-[#F97316]
                      "
                    >
                      {
                        stats.currentStreak
                      }
                    </span>

                    <p
                      className="
                        mt-1
                        text-[10px]
                        text-[#6D7A77]
                      "
                    >
                      روز متوالی
                    </p>
                  </div>
                </div>
              </article>

              <article
                className="
                  rounded-2xl
                  border
                  border-[#E0E3E5]
                  bg-[#FAFCFC]
                  p-5
                "
              >
                <h2
                  className="
                    text-sm
                    font-black
                    text-[#191C1E]
                  "
                >
                  توزیع واژه‌ها
                </h2>

                <div
                  className="
                    mt-5
                    space-y-4
                  "
                >
                  {leitnerBoxes.map(
                    (box) => {
                      const theme =
                        boxTheme[
                          box.box
                        ];

                      const percent =
                        stats.totalWords > 0
                          ? Math.round(
                              (
                                box.totalCards /
                                stats.totalWords
                              ) *
                                100,
                            )
                          : 0;

                      return (
                        <div
                          key={
                            box.box
                          }
                        >
                          <div
                            className="
                              flex
                              items-center
                              justify-between
                              text-xs
                            "
                          >
                            <span
                              className="
                                font-bold
                                text-[#3D4947]
                              "
                            >
                              {
                                box.title
                              }
                            </span>

                            <span
                              style={{
                                color:
                                  theme.accent,
                              }}
                              className="
                                font-black
                              "
                            >
                              {
                                box.totalCards
                              }{" "}
                              واژه
                            </span>
                          </div>

                          <div
                            className="
                              mt-2
                              h-2
                              overflow-hidden
                              rounded-full
                              bg-[#E8EDEE]
                            "
                          >
                            <div
                              className="
                                h-full
                                rounded-full
                              "
                              style={{
                                width:
                                  `${percent}%`,
                                backgroundColor:
                                  theme.accent,
                              }}
                            />
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              </article>
            </div>
          ) : null}
        </section>
      </main>

      <AddWordDialog
        open={isAddWordOpen}
        collections={collections}
        onClose={() => {
          setIsAddWordOpen(false);
        }}
        onSubmit={addWord}
      />
    </>
  );
}