"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  ArrowLeft,
  Lightbulb,
  PenLine,
  Sparkles,
  X,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  ContinueDraftCard,
} from "./continue-draft-card";

import {
  RecentWritingList,
} from "./recent-writing-list";

import {
  WritingHero,
} from "./writing-hero";

import {
  WritingModeCard,
} from "./writing-mode-card";

import {
  WritingStatCards,
} from "./writing-stat-card";

import {
  WritingWeakPoints,
} from "./writing-weak-points";

import type {
  WritingOverviewData,
} from "../../types/writing.types";

type WritingOverviewProps =
  Readonly<{
    overview: WritingOverviewData;
  }>;

export function WritingOverview({
  overview,
}: WritingOverviewProps) {
  const [
    isDailyTipOpen,
    setIsDailyTipOpen,
  ] = useState(false);

  const closeDailyTip =
    useCallback((): void => {
      setIsDailyTipOpen(false);
    }, []);

  const catalogExercises =
    overview.exercises.slice(
      0,
      4,
    );

  const firstExercise =
    catalogExercises[0];

  const remainingExercises =
    catalogExercises.slice(1);

  return (
    <>
      <main
        className="
          mx-auto
          flex
          min-h-[1125px]
          w-full
          max-w-[936px]
          flex-col
          gap-[54px]
          pb-8
        "
        aria-labelledby="writing-page-title"
        dir="rtl"
      >
        <section className="space-y-6">
          <WritingHero />

          <WritingStatCards
            stats={overview.stats}
          />
        </section>

        <section
          aria-label="ادامه نوشتن"
          className="
            grid
            gap-6
            lg:grid-cols-3
          "
        >
          <div className="lg:col-span-2">
            <ContinueDraftCard
              draft={
                overview.currentDraft
              }
            />
          </div>

          <WritingModeCard
            exercise={
              overview.recommendedExercise
            }
            variant="recommended"
          />
        </section>

        <section
          aria-labelledby="writing-exercises-title"
        >
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
                id="writing-exercises-title"
                className="
                  text-[22px]
                  font-semibold
                  leading-[44px]
                  tracking-[-0.72px]
                  text-[#191C1E]
                "
              >
                تمرین‌های نوشتاری
              </h2>

              <p
                className="
                  mt-1
                  max-w-[650px]
                  text-base
                  font-normal
                  leading-7
                  text-[#545C72]
                  sm:text-lg
                "
              >
                برای هدف امروز خود، مناسب‌ترین گزینه را
                از میان تمرین‌های متنوع انتخاب کنید.
              </p>
            </div>

            <button
              type="button"
              aria-label="نمایش نکته روزانه"
              aria-haspopup="dialog"
              onClick={() => {
                setIsDailyTipOpen(
                  true,
                );
              }}
              className="
                flex
                h-10
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                text-[#00685F]
                transition
                hover:bg-[#D6EDEB]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#00685F]/25
              "
            >
              <Lightbulb
                aria-hidden="true"
                className="h-5 w-5"
              />
            </button>
          </div>

          <div
            className="
              mt-6
              grid
              grid-cols-1
              gap-6
              lg:grid-cols-12
            "
          >
            <FreeWritingCard />

            {firstExercise ? (
              <WritingModeCard
                exercise={
                  firstExercise
                }
                className="
                  lg:col-span-4
                  lg:min-h-[302px]
                "
              />
            ) : null}

            {remainingExercises.map(
              (exercise) => (
                <WritingModeCard
                  key={exercise.id}
                  exercise={
                    exercise
                  }
                  className="
                    lg:col-span-4
                  "
                />
              ),
            )}
          </div>
        </section>

        <section
          aria-labelledby="writing-dashboard-title"
        >
          <header>
            <h2
              id="writing-dashboard-title"
              className="
                text-[26px]
                font-bold
                leading-9
                text-[#111827]
                sm:text-[30px]
              "
            >
              داشبورد نوشتن
            </h2>

            <p
              className="
                mt-2
                text-base
                font-normal
                leading-6
                text-[#6B7280]
              "
            >
              خلاصه وضعیت و تمرین‌های اخیر شما
            </p>
          </header>

          <div
            className="
              mt-6
              grid
              gap-6
              lg:grid-cols-12
            "
          >
            <div className="lg:col-span-7">
              <RecentWritingList
                writings={
                  overview.recentWritings
                }
              />
            </div>

            <WritingWeakPoints
              weakPoints={
                overview.weakPoints
              }
              className="
                lg:col-span-5
              "
            />
          </div>
        </section>
      </main>

      <DailyTipDialog
        open={isDailyTipOpen}
        onClose={closeDailyTip}
      />
    </>
  );
}

function FreeWritingCard() {
  return (
    <article
      className="
        flex
        h-full
        min-h-[292px]
        flex-col
        rounded-2xl
        border
        border-[#E2E8F0]
        bg-white
        p-6
        shadow-[0_4px_20px_rgba(0,0,0,0.04)]
        lg:col-span-8
      "
      dir="rtl"
    >
      <div>
        <div
          className="
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <span
            className="
              inline-flex
              items-center
              gap-1
              rounded-full
              border
              border-[#00685F33]
              bg-[#00685F1A]
              px-3
              py-1
              text-sm
              font-bold
              leading-4
              tracking-[0.14px]
              text-[#00685F]
            "
          >
            نوشتن آزاد
          </span>

          <PenLine
            aria-hidden="true"
            className="
              h-6
              w-6
              text-[#00685F]
            "
          />
        </div>

        <h3
          className="
            mt-4
            text-[24px]
            font-bold
            leading-9
            tracking-[-0.28px]
            text-[#191C1E]
            sm:text-[28px]
          "
        >
          بدون محدودیت شروع به نوشتن کنید
        </h3>

        <p
          className="
            mt-3
            max-w-[576px]
            text-base
            font-normal
            leading-6
            text-[#3D4947]
          "
        >
          متون آزاد، ایده‌های روزانه و تمرین‌های بدون فشار
          را همین حالا شروع کنید. اجازه دهید افکارتان برای
          بهبود روانی کلام جاری شوند.
        </p>
      </div>

      <div
        className="
          mt-auto
          flex
          pt-7
        "
      >
        <Link
          href="/writing/new"
          className="
            inline-flex
            min-h-10
            items-center
            justify-center
            gap-2
            rounded-lg
            bg-[#0D9488]
            px-6
            py-3
            text-sm
            font-bold
            leading-4
            tracking-[0.14px]
            text-white
            shadow-[0_0_15px_rgba(13,148,136,0.1)]
            transition
            hover:bg-[#0F766E]
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#0D9488]/30
            focus-visible:ring-offset-2
          "
        >
          شروع نوشتن آزاد

          <ArrowLeft
            aria-hidden="true"
            className="h-4 w-4"
          />
        </Link>
      </div>
    </article>
  );
}

function DailyTipDialog({
  open,
  onClose,
}: Readonly<{
  open: boolean;
  onClose: () => void;
}>) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    function handleKeyDown(
      event: KeyboardEvent,
    ): void {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );

      document.body.style.overflow =
        previousOverflow;
    };
  }, [
    open,
    onClose,
  ]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="writing-daily-tip-overlay"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              onClose();
            }
          }}
          className="
            fixed
            inset-0
            z-[120]
            flex
            items-center
            justify-center
            bg-[#0F172A]/25
            p-4
            backdrop-blur-sm
          "
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="writing-daily-tip-title"
            initial={{
              opacity: 0,
              scale: 0.97,
              y: 8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.97,
              y: 8,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            className="
              relative
              w-full
              max-w-md
              rounded-3xl
              border
              border-[#E2E8F0]
              bg-white
              p-6
              text-right
              shadow-[0_24px_60px_rgba(15,23,42,0.14)]
            "
            dir="rtl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="بستن نکته روزانه"
              className="
                absolute
                left-4
                top-4
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                text-[#64748B]
                transition
                hover:bg-[#F1F5F9]
              "
            >
              <X
                aria-hidden="true"
                className="h-5 w-5"
              />
            </button>

            <span
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-[#D6EDEB]
                text-[#00685F]
              "
            >
              <Sparkles
                aria-hidden="true"
                className="h-5 w-5"
              />
            </span>

            <h2
              id="writing-daily-tip-title"
              className="
                mt-5
                text-xl
                font-bold
                text-[#191C1E]
              "
            >
              نکته‌ی امروز
            </h2>

            <p
              className="
                mt-3
                text-sm
                leading-7
                text-[#475569]
              "
            >
              قبل از ویرایش جمله‌ها، ابتدا ایده‌ی اصلی هر
              پاراگراف را مشخص کنید. ساختار روشن معمولاً
              بیشتر از انتخاب واژه‌های پیچیده به خوانایی
              متن کمک می‌کند.
            </p>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}